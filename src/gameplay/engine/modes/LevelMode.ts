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
      
      if (state.timeRemaining !== null) {
        // If time runs out
        if (state.timeRemaining <= 0) {
          if (this.areAllObjectivesMet(state)) {
            state.levelComplete();
          } else {
            state.levelFailed();
          }
        } 
        // If they complete the objectives EARLY, and it's not a survival level, finish instantly
        else if (state.currentPhase === 'PLAYING') {
          const isSurvival = !this.config.objectives || this.config.objectives.length === 0 || this.config.objectives.some(o => 
            o.type === 'SURVIVAL_TIME'
          );
          
          if (!isSurvival && this.areAllObjectivesMet(state)) {
            // Give a generous Time Bonus to ensure they can still hit 3 stars
            const timeBonus = Math.floor(state.timeRemaining) * 50; 
            if (timeBonus > 0) {
              state.updateScore(timeBonus);
              // Small popup could be nice but we'll just add it to score
            }
            state.levelComplete();
          }
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
    // We update max combo, but we DO NOT instantly complete the level here.
    // The player needs the full duration to maximize their score for stars.
  }

  onFruitMiss(_fruitData: any, isBomb: boolean) {
    const state = useGameState.getState();
    if (!isBomb) {
      state.incrementMisses();
      const missLimit = this.config.missLimit ?? 3;
      if (state.misses >= missLimit) {
        state.levelFailed();
      }
    }
  }

  private areAllObjectivesMet(state: any): boolean {
    if (!this.config.objectives || this.config.objectives.length === 0) return true;

    const bestCombo = Math.max(state.combo, this.maxComboAchieved, this.scene.comboSystem.getMaxCombo());
    
    // Evaluate ALL objectives
    for (const obj of this.config.objectives) {
      if (obj.type === 'SCORE' && state.score < (obj.target || 0)) return false;
      if (obj.type === 'FRUIT_COUNT' && state.fruitsCut < (obj.target || 0)) return false;
      if (obj.type === 'COMBO' && bestCombo < (obj.target || 0)) return false;
      // SURVIVAL_TIME is implicitly met if we reached the end of the timer without dying
      if (obj.type === 'NO_BOMB' || obj.type === 'BOMB_AVOIDANCE') {
        // Handled instantly on bomb cut, so if we survived, this is met.
      }
    }
    return true;
  }

  cleanup() {}
}
