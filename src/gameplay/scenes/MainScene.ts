import Phaser from 'phaser';
import { Fruit } from '../fruits/Fruit';
import { FruitHalf } from '../fruits/FruitHalf';
import { SlashTrail } from '../systems/SlashTrail';
import { useGameState, GamePhase } from '../../core/GameState';
import { FruitRegistry, loadAllFruitsAsync } from '../fruits/FruitRegistry';
import type { FruitDefinition } from '../fruits/FruitDefinition';
import { VFXSystem } from '../../vfx/VFXSystem';
import { AudioSystem } from '../../audio/AudioSystem';
import { GameFeelManager } from '../../gamefeel/GameFeelManager';
import { ComboSystem } from '../engine/systems/ComboSystem';
import { SpawnSystem } from '../engine/systems/SpawnSystem';
import type { GameMode } from '../engine/modes/GameMode';
import { LevelMode } from '../engine/modes/LevelMode';
import { TimeAttackMode } from '../engine/modes/TimeAttackMode';
import { EndlessMode } from '../engine/modes/EndlessMode';
import { EventBus } from '../../core/EventBus';

export class MainScene extends Phaser.Scene {
  private fruits!: Phaser.Physics.Arcade.Group;
  private fruitHalves!: Phaser.Physics.Arcade.Group;
  private slashTrail!: SlashTrail;
  private isSwiping = false;
  private lastPointerX = 0;
  private lastPointerY = 0;
  
  public comboSystem!: ComboSystem;
  public spawnSystem!: SpawnSystem;
  private activeMode: GameMode | null = null;
  
  private freezeTimer: number = 0;
  private currentPlayingLevelId: string | null = null;
  private activeGravityMultiplier = 1.0;
  private lastBombNearMissTime = 0;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Textures are created via FruitCanvasRenderer in create()
  }

  create() {
    // Generate all fruit textures synchronously onto 2D canvases (guarantees APK rendering)
    loadAllFruitsAsync(this);

    GameFeelManager.init(this);
    VFXSystem.init(this);

    this.fruits = this.physics.add.group({
      classType: Fruit,
      runChildUpdate: true
    });
    
    this.fruitHalves = this.physics.add.group({
      classType: FruitHalf,
      runChildUpdate: true
    });

    this.slashTrail = new SlashTrail(this);
    this.comboSystem = new ComboSystem();
    this.spawnSystem = new SpawnSystem(this);

    this.input.on('pointerdown', this.startSlice, this);
    this.input.on('pointermove', this.updateSlice, this);
    this.input.on('pointerup', this.endSlice, this);
    this.input.on('gameout', this.endSlice, this);
    this.scale.on('resize', this.resize, this);
  }

  resize(gameSize: Phaser.Structs.Size) {
    this.physics.world.setBounds(0, 0, gameSize.width, gameSize.height);
  }

  update(_time: number, delta: number) {
    const state = useGameState.getState();
    
    if (state.currentPhase !== GamePhase.PLAYING) {
      this.slashTrail.clear();
      this.isSwiping = false;
      this.currentPlayingLevelId = null;
      if (this.activeMode) {
        this.activeMode.cleanup();
        this.activeMode = null;
      }
      return; 
    }

    const config = state.currentLevelConfig;
    if (!config) return;

    // Initialize Round & Engine
    if (this.currentPlayingLevelId !== state.currentLevelId) {
      this.currentPlayingLevelId = state.currentLevelId;
      
      // Cleanup field
      this.fruits.getChildren().forEach(f => {
        f.setActive(false);
        (f as any).setVisible(false);
        if ((f as any).body) {
           (f as any).body.stop();
           (f as any).body.enable = false;
        }
      });
      this.fruitHalves.getChildren().forEach(h => {
        h.setActive(false);
        (h as any).setVisible(false);
        if ((h as any).body) {
           (h as any).body.stop();
           (h as any).body.enable = false;
        }
      });

      // Initialize Mode
      const modeId = config.id || config.levelId;
      if (modeId === 'time_attack') {
        this.activeMode = new TimeAttackMode();
      } else if (modeId === 'endless') {
        this.activeMode = new EndlessMode();
      } else {
        this.activeMode = new LevelMode();
      }

      this.activeMode.init(this, config);
      this.spawnSystem.init(config);
      this.comboSystem.resetCombo();
      this.freezeTimer = 0;
    }

    // Apply Gravity
    this.activeGravityMultiplier = config.gravityMultiplier || 1.0;
    this.physics.world.gravity.y = 1200 * this.activeGravityMultiplier;

    // Handle Freeze Effect Engine Modifiers
    if (this.freezeTimer > 0) {
      this.freezeTimer -= delta;
      this.physics.world.timeScale = 2.5; 
      if (this.freezeTimer <= 0) {
        this.physics.world.timeScale = 1.0;
      }
    }

    // Delegate Updates
    if (this.activeMode) this.activeMode.update(delta);
    this.comboSystem.update(delta);
    this.spawnSystem.update(delta);

    // Always update visual slash trail so points age out smoothly and do not persist
    this.slashTrail.update();
  }

  private startSlice(pointer: Phaser.Input.Pointer) {
    if (useGameState.getState().currentPhase !== GamePhase.PLAYING) return;
    this.isSwiping = true;
    this.lastPointerX = pointer.x;
    this.lastPointerY = pointer.y;
    this.slashTrail.clear();
    this.slashTrail.addPoint(pointer.x, pointer.y);
    AudioSystem.playSound('whoosh');
  }

  private updateSlice(pointer: Phaser.Input.Pointer) {
    if (!this.isSwiping) return;

    const dist = Phaser.Math.Distance.Between(this.lastPointerX, this.lastPointerY, pointer.x, pointer.y);
    // Ignore micro-jitter or stationary touches - cutting requires active blade movement
    if (dist < 6) return;

    // Active cut segment representing current blade swing
    const sliceLine = new Phaser.Geom.Line(this.lastPointerX, this.lastPointerY, pointer.x, pointer.y);
    this.slashTrail.addPoint(pointer.x, pointer.y);
    this.lastPointerX = pointer.x;
    this.lastPointerY = pointer.y;

    // Slicing is evaluated ONLY on the active motion segment of the blade
    this.checkCuts(sliceLine);
  }

  private endSlice(_pointer: Phaser.Input.Pointer) {
    this.isSwiping = false;
  }

  // Used by SpawnSystem
  public spawnFruitInternal(config: any, overrides: { x?: number, vX?: number, vY?: number, forceBomb?: boolean, forceFruit?: boolean } = {}) {
    let isBomb = overrides.forceBomb || (!overrides.forceFruit && Math.random() < (config.bombChance || 0));
    let isSpecial = !isBomb && Math.random() < (config.specialFruitChance || 0);
    
    let data: FruitDefinition;
    
    if (isBomb) {
      const bombs = Object.values(FruitRegistry).filter(f => f.isBomb);
      data = bombs[Phaser.Math.Between(0, bombs.length - 1)];
    } else if (isSpecial) {
      const specials = Object.values(FruitRegistry).filter(f => f.effect && f.effect !== 'fake');
      data = specials[Phaser.Math.Between(0, specials.length - 1)];
    } else {
      const standardFruits = Object.values(FruitRegistry).filter(f => !f.isBomb && !f.effect);
      data = standardFruits[Phaser.Math.Between(0, standardFruits.length - 1)];
    }
    
    const x = overrides.x !== undefined ? overrides.x : Phaser.Math.Between(Math.floor(this.scale.width * 0.15), Math.floor(this.scale.width * 0.85));
    const y = this.scale.height + 40;
    
    const targetApexY = Phaser.Math.Between(
      Math.floor(this.scale.height * 0.20),
      Math.floor(this.scale.height * 0.32)
    );
    const jumpDistance = y - targetApexY;
    const gravity = (this.physics.world.gravity.y || 1200);
    const calculatedApexVy = -Math.sqrt(2 * gravity * jumpDistance);
    
    let vY = overrides.vY !== undefined ? overrides.vY : calculatedApexVy * Phaser.Math.FloatBetween(0.96, 1.04);
    if (data.id === 'fast_bomb') vY *= 1.15;

    const centerBias = (this.scale.width * 0.5 - x) * Phaser.Math.FloatBetween(0.6, 0.9);
    const vX = overrides.vX !== undefined ? overrides.vX : centerBias + Phaser.Math.Between(-60, 60);

    const textureKey = `fruit_${data.id}_whole`;
    const fruit = this.fruits.get(x, y, textureKey) as Fruit;
    if (fruit) {
      fruit.spawn(x, y, vX, vY, data.id, config.fruitSizeMultiplier, this.onFruitCut.bind(this), this.onFruitMiss.bind(this));
    }
  }

  private checkCuts(sliceLine?: Phaser.Geom.Line) {
    if (!this.isSwiping || !sliceLine) return;

    const activeFruits = this.fruits.getChildren().filter(f => f.active) as Fruit[];
    const now = Date.now();
    
    for (const fruit of activeFruits) {
      if (!fruit.active) continue;

      const baseRadius = fruit.fruitData.baseSize * fruit.scale;
      // Bombs use a tight, fair collision body (inner core) so adjacent fruit cuts don't trigger unfair bomb hits
      const radius = fruit.fruitData.isBomb ? Math.min(baseRadius, 32 * fruit.scale) : baseRadius;
      const fruitCircle = new Phaser.Geom.Circle(fruit.x, fruit.y, radius);
      let wasCut = false;
      
      if (Phaser.Geom.Intersects.LineToCircle(sliceLine, fruitCircle)) {
        fruit.cut(sliceLine);
        wasCut = true;
      }

      // Check for Bomb near miss warning feedback
      if (!wasCut && fruit.fruitData.isBomb && now - this.lastBombNearMissTime > 450) {
        const fruitCenter = new Phaser.Math.Vector2(fruit.x, fruit.y);
        const dist = Phaser.Geom.Line.GetShortestDistance(sliceLine, fruitCenter);
        if (typeof dist === 'number' && dist >= radius && dist < radius * 1.8) {
          this.lastBombNearMissTime = now;
          GameFeelManager.onBombNearMiss(fruit.x, fruit.y);
        }
      }
    }
  }

  private onFruitMiss(fruit: Fruit) {
    if (useGameState.getState().currentPhase !== GamePhase.PLAYING) return;
    if (this.activeMode) {
      this.activeMode.onFruitMiss(fruit.fruitData, !!fruit.fruitData.isBomb);
    }
  }

  private onFruitCut(fruit: Fruit, sliceLine?: Phaser.Geom.Line) {
    const state = useGameState.getState();
    const config = state.currentLevelConfig;
    if (!config || state.currentPhase !== GamePhase.PLAYING) return;

    const data = fruit.fruitData;

    // Delegate to Mode Logic for fails/penalties/goals
    if (this.activeMode) {
      this.activeMode.onFruitCut(data, !!data.isBomb);
    }

    // Handle Bomb Specific Feedback
    if (data.isBomb) {
      GameFeelManager.onBombHit({ x: fruit.x, y: fruit.y });
      return; // Stop processing visuals for bomb cut
    }

    // Calculate Perfect Cut: slice passing very close to fruit center
    let isPerfect = false;
    let sliceAngle = 0;
    if (sliceLine) {
       sliceAngle = Phaser.Math.Angle.Between(sliceLine.x1, sliceLine.y1, sliceLine.x2, sliceLine.y2);
       const fruitCenter = new Phaser.Math.Vector2(fruit.x, fruit.y);
       const distToCenter = Phaser.Geom.Line.GetShortestDistance(sliceLine, fruitCenter);
       const radius = data.baseSize * fruit.scale;
       isPerfect = typeof distToCenter === 'number' && distToCenter < radius * 0.22;
       if (isPerfect) {
         EventBus.emit('PERFECT_CUT');
       }
    }

    // Handle Core Mechanics (Freeze/Frenzy)
    if (data.effect === 'freeze') {
      this.freezeTimer = 4000;
    } else if (data.effect === 'frenzy') {
      for (let i = 0; i < 5; i++) {
        this.time.delayedCall(i * 150, () => this.spawnFruitInternal(config));
      }
    }

    // Visual Split Implementation
    const body = fruit.body as Phaser.Physics.Arcade.Body;
    const vx = body ? body.velocity.x : 0;
    const vy = body ? body.velocity.y : 0;
    const visualRotation = sliceAngle + Math.PI / 2;
    
    const leftHalf = this.fruitHalves.get(fruit.x, fruit.y, `fruit_${data.id}_left`) as FruitHalf;
    if (leftHalf) {
      leftHalf.spawn(fruit.x, fruit.y, data.id, 'left', data.svgLeft, visualRotation, vx, vy, data.baseSize);
      leftHalf.setScale(fruit.scale);
    }
    
    const rightHalf = this.fruitHalves.get(fruit.x, fruit.y, `fruit_${data.id}_right`) as FruitHalf;
    if (rightHalf) {
      rightHalf.spawn(fruit.x, fruit.y, data.id, 'right', data.svgRight, visualRotation, vx, vy, data.baseSize);
      rightHalf.setScale(fruit.scale);
    }

    // Delegate Combo & Score
    const multiplier = this.comboSystem.registerCut(fruit.x, fruit.y);
    const basePoints = data.points || 10;
    const points = (isPerfect ? basePoints * 2 : basePoints) * multiplier;

    // Delegate All Visual/Haptic/Audio Feedback to GameFeelManager
    GameFeelManager.onFruitSliced({
      x: fruit.x,
      y: fruit.y,
      fruitId: data.id,
      sliceAngle: sliceAngle,
      sliceLine: sliceLine ? { x1: sliceLine.x1, y1: sliceLine.y1, x2: sliceLine.x2, y2: sliceLine.y2 } : undefined,
      isBomb: false,
      isSpecial: !!data.effect,
      points: points,
      combo: multiplier,
      isPerfect: isPerfect,
      juiceColor: data.juiceColor
    });

    state.updateScore(points);
    state.incrementFruitsCut();
  }
}
