import { MainScene } from '../../scenes/MainScene';
import type { GameMode } from './GameMode';
import { useGameState, GamePhase } from '../../../core/GameState';
import { GameFeelManager } from '../../../gamefeel/GameFeelManager';


const MILESTONES = [100, 250, 500, 1000, 2500, 5000];

export class EndlessMode implements GameMode {
  private scene!: MainScene;
  private timeElapsed: number = 0;
  private currentStage: number = 1;
  private lastMilestoneIndex: number = -1;

  init(scene: MainScene, _config: any) {
    this.scene = scene;
    this.timeElapsed = 0;
    this.currentStage = 1;
    this.lastMilestoneIndex = -1;
  }

  update(delta: number) {
    const state = useGameState.getState();
    if (state.currentPhase !== GamePhase.PLAYING) return;

    this.timeElapsed += delta / 1000;
    
    // Scale difficulty based on time and score
    // Every 60 seconds is roughly a stage, up to a soft cap
    const stageByTime = Math.floor(this.timeElapsed / 60) + 1;
    const stageByScore = Math.floor(state.score / 1500) + 1;
    
    const newStage = Math.max(stageByTime, stageByScore);
    
    if (newStage > this.currentStage) {
      this.currentStage = newStage;
      // Emit endless stage changed if we had audio hooked here
    }

    // Evaluate dynamic spawn configuration
    const minutesSurvived = this.timeElapsed / 60;
    const difficultyVal = Math.min(1.0, minutesSurvived / 10); // Cap at 10 minutes

    const spawnRateMs = Math.max(600, 1500 - (difficultyVal * 900));
    const speed = 1.0 + (difficultyVal * 1.5);
    const bomb = Math.min(0.4, 0.05 + (difficultyVal * 0.35));
    
    let pattern = 'RANDOM';
    if (difficultyVal > 0.8) pattern = 'MIXED';
    else if (difficultyVal > 0.5) pattern = 'CROSS';
    else if (difficultyVal > 0.3) pattern = 'BURST';

    this.scene.spawnSystem.updateConfig({
      spawnRateMs,
      fruitSpeedMultiplier: speed,
      fruitSizeMultiplier: 1.0,
      bombChance: bomb,
      specialFruitChance: 0.1,
      maxSimultaneousFruits: 1 + Math.floor(difficultyVal * 5),
      spawnPattern: pattern
    });

    // Check Milestones
    for (let i = this.lastMilestoneIndex + 1; i < MILESTONES.length; i++) {
       if (state.fruitsCut >= MILESTONES[i]) {
          this.lastMilestoneIndex = i;
          GameFeelManager.onMilestoneReached();
          import('../../../core/EventBus').then(m => {
            m.EventBus.emit('ENDLESS_FRUIT_MILESTONE', MILESTONES[i]);
          });
          break;
       }
    }
  }

  onFruitCut(_fruitData: any, isBomb: boolean) {
    const state = useGameState.getState();
    if (isBomb) {
      this.scene.comboSystem.resetCombo();
      state.updateScore(-100);
      state.incrementMisses();

      import('../../../core/EventBus').then(m => {
        m.EventBus.emit('BOMB_HIT');
      });

      if (state.misses >= 3) {
        import('../../../core/EventBus').then(m => {
          m.EventBus.emit('ENDLESS_SCORE', state.score);
        });
        state.setPhase(GamePhase.ENDLESS_RESULT as any);
      }
    }
  }

  onFruitMiss(_fruitData: any, isBomb: boolean) {
    const state = useGameState.getState();
    if (!isBomb) {
      state.incrementMisses();
      
      if (state.misses >= 3) {
        import('../../../core/EventBus').then(m => {
          m.EventBus.emit('ENDLESS_SCORE', state.score);
        });
        state.setPhase(GamePhase.ENDLESS_RESULT as any);
      }
    }
  }

  cleanup() {}
}
