import Phaser from 'phaser';
import { MainScene } from '../../scenes/MainScene';
import { useGameState, GamePhase } from '../../../core/GameState';

export class SpawnSystem {
  private scene: MainScene;
  private config: any;
  private spawnTimer: number = 0;

  constructor(scene: MainScene) {
    this.scene = scene;
  }

  init(config: any) {
    this.config = { ...config };
    this.spawnTimer = 250; // Buffer before first wave
  }

  updateConfig(newConfig: any) {
    this.config = { ...this.config, ...newConfig };
  }

  update(delta: number) {
    this.spawnTimer -= delta;
    if (this.spawnTimer <= 0) {
      this.executeWave();
    }
  }

  private executeWave() {
    let waveType: number;
    const hasComboObjective = this.config.objectives?.some((o: any) => o.type === 'COMBO');
    const pattern = this.config.spawnPattern;

    if (pattern === 'BURST') {
      waveType = 3;
    } else if (pattern === 'PAIR') {
      waveType = 1;
    } else if (pattern === 'CROSS') {
      waveType = 2;
    } else if (pattern === 'FOUNTAIN') {
      waveType = 4;
    } else if (hasComboObjective) {
      // In combo objective levels, guarantee multi-fruit waves (Pair, Cross, Burst) so players can combo!
      const comboWaves = [1, 2, 3, 3];
      waveType = comboWaves[Phaser.Math.Between(0, comboWaves.length - 1)];
    } else {
      const isEarlyLevel = (this.config.difficultyTier || 1) <= 1;
      waveType = isEarlyLevel ? Phaser.Math.Between(0, 3) : Phaser.Math.Between(0, 5);
    }

    const baseRate = hasComboObjective ? Math.min(this.config.spawnRateMs || 1000, 850) : (this.config.spawnRateMs || 1200);
    
    switch(waveType) {
      case 0: // Single
        this.scene.spawnFruitInternal(this.config);
        this.spawnTimer = baseRate;
        break;
      case 1: // Pair
        this.scene.spawnFruitInternal(this.config, { x: this.scene.scale.width * 0.28, vX: this.scene.scale.width * 0.12 });
        this.scene.spawnFruitInternal(this.config, { x: this.scene.scale.width * 0.72, vX: -this.scene.scale.width * 0.12 });
        this.spawnTimer = baseRate * 1.1;
        break;
      case 2: // Cross
        this.scene.spawnFruitInternal(this.config, { x: this.scene.scale.width * 0.15, vX: this.scene.scale.width * 0.25 });
        this.scene.spawnFruitInternal(this.config, { x: this.scene.scale.width * 0.85, vX: -this.scene.scale.width * 0.25 });
        this.spawnTimer = baseRate * 1.1;
        break;
      case 3: // Burst (rapid stream of 3 fruits)
        for (let i = 0; i < 3; i++) {
          this.scene.time.delayedCall(i * 160, () => {
            if (useGameState.getState().currentPhase === GamePhase.PLAYING) {
              this.scene.spawnFruitInternal(this.config);
            }
          });
        }
        this.spawnTimer = baseRate * 1.25;
        break;
      case 4: // Fountain (fountain of 3 fruits)
        for (let i = 0; i < 3; i++) {
          this.scene.time.delayedCall(i * 130, () => {
            if (useGameState.getState().currentPhase === GamePhase.PLAYING) {
              const x = this.scene.scale.width * 0.5 + Phaser.Math.Between(-60, 60);
              const vX = Phaser.Math.Between(-180, 180);
              this.scene.spawnFruitInternal(this.config, { x, vX });
            }
          });
        }
        this.spawnTimer = baseRate * 1.3;
        break;
      case 5: // Bomb mix
        if (this.config.bombChance > 0) {
          this.scene.spawnFruitInternal(this.config, { forceBomb: true, x: this.scene.scale.width * 0.35, vX: 60 });
          this.scene.spawnFruitInternal(this.config, { forceFruit: true, x: this.scene.scale.width * 0.65, vX: -60 });
        } else {
          this.scene.spawnFruitInternal(this.config);
        }
        this.spawnTimer = baseRate * 1.15;
        break;
    }
  }
}
