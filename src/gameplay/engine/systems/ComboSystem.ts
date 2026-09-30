import { useGameState } from '../../../core/GameState';
import { GameFeelManager } from '../../../gamefeel/GameFeelManager';

export class ComboSystem {
  private comboTimer: number = 0;
  private currentCombo: number = 0;
  private maxCombo: number = 0;
  private comboTimeoutMs: number = 2200; // 2.2s window to comfortably chain fruit cuts

  update(delta: number) {
    if (this.currentCombo > 0) {
      this.comboTimer -= delta;
      if (this.comboTimer <= 0) {
        this.resetCombo();
      }
    }
  }

  registerCut(x: number, y: number) {
    this.currentCombo++;
    this.maxCombo = Math.max(this.maxCombo, this.currentCombo);
    this.comboTimer = this.comboTimeoutMs;
    
    if (this.currentCombo >= 2) {
      GameFeelManager.onComboUpdated(this.currentCombo, x, y);
    }
    
    useGameState.getState().updateCombo(this.currentCombo);
    return Math.max(1, this.currentCombo); // Returns multiplier
  }

  getMaxCombo() {
    return this.maxCombo;
  }

  resetCombo() {
    this.currentCombo = 0;
    useGameState.getState().updateCombo(0);
  }

  resetAll() {
    this.currentCombo = 0;
    this.maxCombo = 0;
    this.comboTimer = 0;
    useGameState.getState().updateCombo(0);
  }
}
