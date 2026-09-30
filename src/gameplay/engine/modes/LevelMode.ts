import { MainScene } from '../../scenes/MainScene';
import type { GameMode } from './GameMode';
import { useGameState } from '../../../core/GameState';
import type { LevelConfig } from '../../../core/progression/LevelTypes';

export class LevelMode implements GameMode {
  private scene!: MainScene;
  private config!: LevelConfig;
  private maxComboAchieved: number = 0;

  init(scene: MainScene, config: LevelConfig) {
    this.scene = scene;
    this.config = config;
    this.maxComboAchieved = 0;
  }

  update(delta: number) {
    const state = useGameState.getState();
    
    if (this.config.duration > 0) {
      state.tickTime(delta / 1000);
      if (state.timeRemaining !== null && state.timeRemaining <= 0) {
        const hasSurvival = this.config.objectives.some(o => o.type === 'SURVIVAL_TIME');
        if (hasSurvival) {
          // Verify other objectives are also met
          let allMet = true;
          const bestCombo = Math.max(state.combo, this.maxComboAchieved, this.scene.comboSystem.getMaxCombo());
          for (const obj of this.config.objectives) {
             if (obj.type === 'SCORE' && state.score < (obj.target || 0)) allMet = false;
             if (obj.type === 'FRUIT_COUNT' && state.fruitsCut < (obj.target || 0)) allMet = false;
             if (obj.type === 'COMBO' && bestCombo < (obj.target || 0)) allMet = false;
          }
          if (allMet) {
             state.levelComplete();
          } else {
             state.levelFailed();
          }
        } else {
          state.levelFailed();
        }
      }
    }
  }

  onFruitCut(_fruitData: any, isBomb: boolean) {
    const state = useGameState.getState();
    if (isBomb) {
      const avoidsBombs = this.config.objectives.some(o => o.type === 'NO_BOMB' || o.type === 'BOMB_AVOIDANCE');
      if (avoidsBombs) {
        state.levelFailed();
      } else {
        this.scene.comboSystem.resetCombo();
        state.updateScore(-50);
      }
      return;
    }

    this.maxComboAchieved = Math.max(this.maxComboAchieved, state.combo, this.scene.comboSystem.getMaxCombo());
    this.checkLevelObjectives(state);
  }

  onFruitMiss(_fruitData: any, isBomb: boolean) {
    const state = useGameState.getState();
    if (!isBomb) {
      state.incrementMisses();
      
      // Default 3 misses if not explicitly disabled. We can adjust this later.
      if (state.misses >= 3) {
        state.levelFailed();
      }
    }
  }

  private checkLevelObjectives(state: any) {
    if (!this.config.objectives || this.config.objectives.length === 0) return;

    const bestCombo = Math.max(state.combo, this.maxComboAchieved, this.scene.comboSystem.getMaxCombo());
    let allCompleted = true;
    for (const obj of this.config.objectives) {
      if (obj.type === 'SCORE' && state.score < (obj.target || 0)) allCompleted = false;
      if (obj.type === 'FRUIT_COUNT' && state.fruitsCut < (obj.target || 0)) allCompleted = false;
      if (obj.type === 'COMBO' && bestCombo < (obj.target || 0)) allCompleted = false;
    }

    const hasSurvival = this.config.objectives.some(o => o.type === 'SURVIVAL_TIME');
    
    if (allCompleted && !hasSurvival) {
      state.levelComplete();
    }
  }

  cleanup() {}
}
