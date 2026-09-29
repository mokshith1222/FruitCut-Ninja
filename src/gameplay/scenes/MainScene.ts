import Phaser from 'phaser';
import { Fruit } from '../entities/Fruit';
import { FruitHalf } from '../entities/FruitHalf';
import { SlashTrail } from '../systems/SlashTrail';
import { useGameState, GamePhase } from '../../core/GameState';
import { FruitTypes, preloadFruitAssets } from '../config/FruitConfig';
import type { FruitConfigData } from '../config/FruitConfig';
import { VFXSystem } from '../../vfx/VFXSystem';
import { HapticSystem } from '../../haptics/HapticSystem';
import { AudioSystem } from '../../audio/AudioSystem';

export class MainScene extends Phaser.Scene {
  private fruits!: Phaser.Physics.Arcade.Group;
  private fruitHalves!: Phaser.Physics.Arcade.Group;
  private slashTrail!: SlashTrail;
  private isSwiping = false;
  
  private comboTimer: number = 0;
  private currentCombo: number = 0;
  private comboTimeoutMs: number = 1000;
  
  private spawnTimer: number = 0;
  private freezeTimer: number = 0;
  private currentPlayingLevelId: string | null = null;
  
  private endlessTimeElapsed: number = 0;

  private activeGravityMultiplier = 1.0;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    preloadFruitAssets(this);
  }

  create() {
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
      return; 
    }

    // Initialize round if new level or fresh start
    if (this.currentPlayingLevelId !== state.currentLevelId) {
      this.currentPlayingLevelId = state.currentLevelId;
      this.spawnTimer = 250; // Quick 250ms buffer before first launch
      this.endlessTimeElapsed = 0;
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
    }

    const config = state.currentLevelConfig;
    if (!config) return;

    // Apply World Gravity
    this.activeGravityMultiplier = config.gravityMultiplier || 1.0;
    this.physics.world.gravity.y = 1200 * this.activeGravityMultiplier;

    // Handle Freeze Effect
    if (this.freezeTimer > 0) {
      this.freezeTimer -= delta;
      this.physics.world.timeScale = 2.5; // Slow down simulation (Phaser uses larger timescale for slower time)
      if (this.freezeTimer <= 0) {
        this.physics.world.timeScale = 1.0;
      }
    }

    // Handle Time limit
    if (config.timeLimit) {
      state.tickTime(delta / 1000);
      if (state.timeRemaining !== null && state.timeRemaining <= 0) {
         if (config.objectiveType === 'SURVIVAL') {
           state.levelComplete();
         } else {
           state.levelFailed();
         }
         return;
      }
    }

    // Handle Combo Timer
    if (this.currentCombo > 0) {
      this.comboTimer -= delta;
      if (this.comboTimer <= 0) {
        this.resetCombo();
      }
    }

    let effectiveConfig = config;
    if (config.levelId === 'endless') {
      this.endlessTimeElapsed += delta / 1000;
      const minutesSurvived = this.endlessTimeElapsed / 60;
      effectiveConfig = {
        ...config,
        spawnRateMs: Math.max(500, config.spawnRateMs - (minutesSurvived * 400)),
        fruitSpeedMultiplier: config.fruitSpeedMultiplier + (minutesSurvived * 0.3),
        bombChance: Math.min(0.5, config.bombChance + (minutesSurvived * 0.15)),
        difficultyTier: Math.floor(1 + minutesSurvived * 2)
      };
    }

    // Spawn Fruits
    this.spawnTimer -= delta;
    if (this.spawnTimer <= 0) {
      this.executeWave(effectiveConfig);
    }

    // Check collisions
    this.checkCuts();

    // Fade trail
    if (!this.isSwiping) {
        this.slashTrail.update();
    }
  }

  private startSlice(pointer: Phaser.Input.Pointer) {
    const state = useGameState.getState();
    if (state.currentPhase !== GamePhase.PLAYING) return;

    this.isSwiping = true;
    this.slashTrail.clear();
    this.slashTrail.addPoint(pointer.x, pointer.y);
    AudioSystem.playSound('whoosh');
  }

  private updateSlice(pointer: Phaser.Input.Pointer) {
    if (!this.isSwiping) return;
    this.slashTrail.addPoint(pointer.x, pointer.y);
  }

  private endSlice(_pointer: Phaser.Input.Pointer) {
    this.isSwiping = false;
  }

  private executeWave(config: any) {
    const isEarlyLevel = config.difficultyTier <= 1;
    // Early levels focus on single and pairs to teach slicing; higher levels introduce cross, bursts, and fountains
    const waveType = isEarlyLevel 
      ? Phaser.Math.Between(0, 2) 
      : Phaser.Math.Between(0, 5);
    
    switch(waveType) {
      case 0: // Single
        this.spawnFruitInternal(config);
        this.spawnTimer = config.spawnRateMs;
        break;
      case 1: // Pair (left and right)
        this.spawnFruitInternal(config, { x: this.scale.width * 0.28, vX: this.scale.width * 0.12 });
        this.spawnFruitInternal(config, { x: this.scale.width * 0.72, vX: -this.scale.width * 0.12 });
        this.spawnTimer = config.spawnRateMs * 1.25;
        break;
      case 2: // Cross (intersecting trajectories)
        this.spawnFruitInternal(config, { x: this.scale.width * 0.15, vX: this.scale.width * 0.25 });
        this.spawnFruitInternal(config, { x: this.scale.width * 0.85, vX: -this.scale.width * 0.25 });
        this.spawnTimer = config.spawnRateMs * 1.3;
        break;
      case 3: // Burst (rapid stream of 3)
        for (let i = 0; i < 3; i++) {
          this.time.delayedCall(i * 180, () => {
            if (useGameState.getState().currentPhase === GamePhase.PLAYING) {
              this.spawnFruitInternal(config);
            }
          });
        }
        this.spawnTimer = config.spawnRateMs * 1.5;
        break;
      case 4: // Fountain (burst from bottom center)
        for (let i = 0; i < 3; i++) {
          this.time.delayedCall(i * 140, () => {
            if (useGameState.getState().currentPhase === GamePhase.PLAYING) {
              const x = this.scale.width * 0.5 + Phaser.Math.Between(-50, 50);
              const vX = Phaser.Math.Between(-180, 180);
              this.spawnFruitInternal(config, { x, vX });
            }
          });
        }
        this.spawnTimer = config.spawnRateMs * 1.6;
        break;
      case 5: // Bomb mix / hazard challenge
        if (config.bombChance > 0) {
          this.spawnFruitInternal(config, { forceBomb: true, x: this.scale.width * 0.35, vX: 60 });
          this.spawnFruitInternal(config, { forceFruit: true, x: this.scale.width * 0.65, vX: -60 });
        } else {
          this.spawnFruitInternal(config);
        }
        this.spawnTimer = config.spawnRateMs * 1.25;
        break;
    }
  }

  private spawnFruitInternal(config: any, overrides: { x?: number, vX?: number, vY?: number, forceBomb?: boolean, forceFruit?: boolean } = {}) {
    let isBomb = overrides.forceBomb || (!overrides.forceFruit && Math.random() < (config.bombChance || 0));
    let isSpecial = !isBomb && Math.random() < (config.specialFruitChance || 0);
    
    let data: FruitConfigData;
    
    if (isBomb) {
      const bombs = Object.values(FruitTypes).filter(f => f.isBomb);
      data = bombs[Phaser.Math.Between(0, bombs.length - 1)];
    } else if (isSpecial) {
      const specials = Object.values(FruitTypes).filter(f => f.effect && f.effect !== 'fake');
      data = specials[Phaser.Math.Between(0, specials.length - 1)];
    } else {
      const standardFruits = Object.values(FruitTypes).filter(f => !f.isBomb && !f.effect);
      data = standardFruits[Phaser.Math.Between(0, standardFruits.length - 1)];
    }
    
    const x = overrides.x !== undefined ? overrides.x : Phaser.Math.Between(Math.floor(this.scale.width * 0.15), Math.floor(this.scale.width * 0.85));
    const y = this.scale.height + 40;
    
    // Dynamic height calculation so fruits arc into the upper 20% - 32% of the viewport on ANY screen size
    const targetApexY = Phaser.Math.Between(
      Math.floor(this.scale.height * 0.20),
      Math.floor(this.scale.height * 0.32)
    );
    const jumpDistance = y - targetApexY;
    const gravity = (this.physics.world.gravity.y || 1200);
    const calculatedApexVy = -Math.sqrt(2 * gravity * jumpDistance);
    
    let vY = overrides.vY !== undefined ? overrides.vY : calculatedApexVy * Phaser.Math.FloatBetween(0.96, 1.04);
    if (data.id === 'fast_bomb') vY *= 1.15;

    // Gently steer fruit toward the center of the play area
    const centerBias = (this.scale.width * 0.5 - x) * Phaser.Math.FloatBetween(0.6, 0.9);
    const vX = overrides.vX !== undefined ? overrides.vX : centerBias + Phaser.Math.Between(-60, 60);

    const fruit = this.fruits.get(x, y, data.id) as Fruit;
    if (fruit) {
      fruit.spawn(x, y, vX, vY, data, config.fruitSizeMultiplier, this.onFruitCut.bind(this), this.onFruitMiss.bind(this));
    }
  }

  private checkCuts() {
    if (!this.isSwiping) return;
    
    const lines = this.slashTrail.getLineSegments();
    if (lines.length === 0) return;

    const activeFruits = this.fruits.getChildren().filter(f => f.active) as Fruit[];
    
    for (const fruit of activeFruits) {
      const radius = fruit.fruitData.baseSize * fruit.scale;
      const fruitCircle = new Phaser.Geom.Circle(fruit.x, fruit.y, radius);
      
      for (const line of lines) {
        if (Phaser.Geom.Intersects.LineToCircle(line, fruitCircle)) {
          fruit.cut(line);
          break; 
        }
      }
    }
  }

  private onFruitMiss(fruit: Fruit) {
    const state = useGameState.getState();
    const config = state.currentLevelConfig;
    if (!config || state.currentPhase !== GamePhase.PLAYING) return;
    
    if (!fruit.fruitData.isBomb) {
      state.incrementMisses();
      this.resetCombo();
      
      if (config.missLimit && state.misses >= config.missLimit) {
        state.levelFailed();
      }
    }
  }

  private onFruitCut(fruit: Fruit, sliceLine?: Phaser.Geom.Line) {
    const state = useGameState.getState();
    const config = state.currentLevelConfig;
    if (!config || state.currentPhase !== GamePhase.PLAYING) return;

    const data = fruit.fruitData;

    // Handle Bomb Cut
    if (data.isBomb) {
      HapticSystem.heavy();
      this.cameras.main.shake(300, 0.02);
      
      if (config.noBombsAllowed) {
        state.levelFailed();
      } else {
        this.resetCombo();
        state.updateScore(-50);
      }
      return;
    }

    HapticSystem.light();

    // Handle Special Effects
    if (data.effect === 'freeze') {
      this.freezeTimer = 4000; // 4 seconds of slow-mo
    } else if (data.effect === 'frenzy') {
      // Trigger a rapid burst of 5 fruits instantly
      for(let i=0; i<5; i++) {
        this.time.delayedCall(i * 150, () => this.spawnFruitInternal(config));
      }
    }

    // Visual split
    const body = fruit.body as Phaser.Physics.Arcade.Body;
    const vx = body ? body.velocity.x : 0;
    const vy = body ? body.velocity.y : 0;
    
    // Directional slicing
    let sliceAngle = 0;
    if (sliceLine) {
       sliceAngle = Phaser.Math.Angle.Between(sliceLine.x1, sliceLine.y1, sliceLine.x2, sliceLine.y2);
    }
    
    // The SVGs are drawn such that the cut is vertical.
    // To align the cut with the swipe, we rotate the halves.
    // Vertical cut = 90 degrees (Math.PI/2) or 270 degrees.
    const visualRotation = sliceAngle - Math.PI / 2;
    
    const sepSpeed = 150;
    const sepX = Math.cos(sliceAngle - Math.PI/2) * sepSpeed;
    const sepY = Math.sin(sliceAngle - Math.PI/2) * sepSpeed;
    
    const leftHalf = this.fruitHalves.get(fruit.x, fruit.y, `${data.id}_left`) as FruitHalf;
    if (leftHalf) {
      leftHalf.spawn(fruit.x + sepX * 0.1, fruit.y + sepY * 0.1, `${data.id}_left`, vx + sepX, vy + sepY, -200);
      leftHalf.setScale(fruit.scale);
      leftHalf.setRotation(visualRotation);
    }
    
    const rightHalf = this.fruitHalves.get(fruit.x, fruit.y, `${data.id}_right`) as FruitHalf;
    if (rightHalf) {
      rightHalf.spawn(fruit.x - sepX * 0.1, fruit.y - sepY * 0.1, `${data.id}_right`, vx - sepX, vy - sepY, 200);
      rightHalf.setScale(fruit.scale);
      rightHalf.setRotation(visualRotation);
    }

    // Scoring & Combo
    this.currentCombo++;
    this.comboTimer = this.comboTimeoutMs;
    
    if (this.currentCombo >= 3) {
      HapticSystem.medium();
      VFXSystem.showComboText(fruit.x, fruit.y - 40, this.currentCombo);
      VFXSystem.triggerComboFeedback(this.currentCombo);
    }
    
    const multiplier = Math.max(1, this.currentCombo);
    const points = data.score * multiplier;

    // Floating floating score popup (+10, +20, etc.)
    VFXSystem.showScorePopup(fruit.x, fruit.y, points, multiplier);

    state.updateScore(points);
    state.updateCombo(this.currentCombo);
    state.incrementFruitsCut();

    // Check Level Objectives
    this.checkLevelObjectives(state, config);
  }

  private checkLevelObjectives(state: any, config: any) {
    let completed = false;
    
    if (config.objectiveType === 'CUT_COUNT' && config.targetCount && state.fruitsCut >= config.targetCount) {
      completed = true;
    } else if (config.objectiveType === 'SCORE_TARGET' && config.targetScore && state.score >= config.targetScore) {
      completed = true;
    } else if (config.objectiveType === 'COMBO_TARGET' && config.targetCombo && state.combo >= config.targetCombo) {
      completed = true;
    }

    if (completed) {
      state.levelComplete();
    }
  }

  private resetCombo() {
    this.currentCombo = 0;
    useGameState.getState().updateCombo(0);
  }
}
