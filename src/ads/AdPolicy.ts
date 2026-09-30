import { useGameState, GamePhase } from '../core/GameState';
import { AdFrequencyManager } from './AdFrequencyManager';
import { AdConfigManager } from './AdConfig';

export class AdPolicy {
  /**
   * Strict placement validation to protect user experience.
   * Interstitial ads must never interrupt active gameplay.
   */
  static canShowInterstitial(totalLevelsCompleted: number): { allowed: boolean; reason?: string } {
    // 1. Verify production format configuration
    if (!AdConfigManager.isFormatConfigured('interstitial')) {
      return { allowed: false, reason: 'Interstitial ad format not configured in production' };
    }

    // 2. Gameplay Phase Guard: NEVER show ads during active gameplay or countdown
    const currentPhase = useGameState.getState().currentPhase;
    if (
      currentPhase === GamePhase.PLAYING || 
      currentPhase === GamePhase.LEVEL_STARTING || 
      currentPhase === GamePhase.PAUSED
    ) {
      return { allowed: false, reason: 'Cannot show interstitial during active gameplay' };
    }

    // 3. Frequency & Cooldown Rules
    return AdFrequencyManager.canShowInterstitial(totalLevelsCompleted);
  }

  /**
   * Rewarded ads validation: must be user-initiated and configured.
   */
  static canShowRewarded(): { allowed: boolean; reason?: string } {
    if (!AdConfigManager.isFormatConfigured('rewarded')) {
      return { allowed: false, reason: 'Rewarded ad format not configured in production' };
    }
    return { allowed: true };
  }
}
