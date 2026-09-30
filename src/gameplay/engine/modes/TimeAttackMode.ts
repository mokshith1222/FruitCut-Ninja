import { MainScene } from '../../scenes/MainScene';
import type { GameMode } from './GameMode';
import { useGameState, GamePhase } from '../../../core/GameState';
import { GameFeelManager } from '../../../gamefeel/GameFeelManager';

const PHASES = [
  { threshold: 60, name: 'WARMUP', config: { spawnRateMs: 1200, speed: 1.0, bomb: 0.05, pattern: 'SINGLE' } },
  { threshold: 45, name: 'RISING', config: { spawnRateMs: 900, speed: 1.2, bomb: 0.1, pattern: 'PAIR' } },
  { threshold: 30, name: 'INTENSE', config: { spawnRateMs: 700, speed: 1.4, bomb: 0.15, pattern: 'BURST' } },
  { threshold: 15, name: 'EXTREME', config: { spawnRateMs: 500, speed: 1.6, bomb: 0.2, pattern: 'CROSS' } },
  { threshold: 10, name: 'FINAL FRENZY', config: { spawnRateMs: 300, speed: 2.0, bomb: 0.25, pattern: 'MIXED' } },
];

export class TimeAttackMode implements GameMode {
  private scene!: MainScene;
  private currentPhaseIndex = -1;
  private lastUrgencySec = -1;

  init(scene: MainScene, _config: any) {
    this.scene = scene;
    this.currentPhaseIndex = -1;
    this.lastUrgencySec = -1;
  }

  update(delta: number) {
    const state = useGameState.getState();
    
    if (state.currentPhase !== GamePhase.PLAYING) return;

    state.tickTime(delta / 1000);
    
    if (state.timeRemaining !== null) {
      if (state.timeRemaining <= 0) {
        import('../../../core/EventBus').then(m => {
          m.EventBus.emit('TIME_ATTACK_COMPLETED');
          m.EventBus.emit('TIME_ATTACK_SCORE', state.score);
        });
        state.setPhase(GamePhase.TIME_ATTACK_RESULT as any);
        return;
      }

      // Check final seconds urgency (5s down to 1s)
      if (state.timeRemaining <= 5.0) {
        const sec = Math.ceil(state.timeRemaining);
        if (sec !== this.lastUrgencySec) {
          this.lastUrgencySec = sec;
          GameFeelManager.onTimeUrgency();
        }
      }

      this.updateIntensity(state.timeRemaining);
    }
  }

  private updateIntensity(timeRemaining: number) {
    // Find appropriate phase
    let targetPhaseIndex = 0;
    for (let i = PHASES.length - 1; i >= 0; i--) {
       if (timeRemaining <= PHASES[i].threshold) {
          targetPhaseIndex = i;
          break;
       }
    }

    if (this.currentPhaseIndex !== targetPhaseIndex) {
      this.currentPhaseIndex = targetPhaseIndex;
      const phaseData = PHASES[targetPhaseIndex];
      this.scene.spawnSystem.updateConfig({
        spawnRateMs: phaseData.config.spawnRateMs,
        fruitSpeedMultiplier: phaseData.config.speed,
        fruitSizeMultiplier: 1.0,
        bombChance: phaseData.config.bomb,
        specialFruitChance: 0.1,
        maxSimultaneousFruits: 5,
        spawnPattern: phaseData.config.pattern,
      });

      // Show Phase HUD notification (you can hook this into UI later via a Zustand state if needed)
    }
  }

  onFruitCut(_fruitData: any, isBomb: boolean) {
    const state = useGameState.getState();
    if (isBomb) {
      this.scene.comboSystem.resetCombo();
      state.updateScore(-50); 
    }
  }

  onFruitMiss(_fruitData: any, isBomb: boolean) {
    if (!isBomb) {
      useGameState.getState().incrementMisses();
    }
  }

  cleanup() {}
}
