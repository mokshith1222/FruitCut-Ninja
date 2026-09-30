import { AdMobProvider } from './AdMobProvider';
import { InterstitialAdManager } from './InterstitialAdManager';
import { RewardedAdManager } from './RewardedAdManager';
import type { RewardedAdOptions } from './RewardedAdManager';
import { AdFrequencyManager } from './AdFrequencyManager';
import { AdPolicy } from './AdPolicy';
import type { AdProvider } from './AdTypes';

export class AdsManager {
  private static provider: AdProvider = new AdMobProvider();
  private static interstitialManager: InterstitialAdManager = new InterstitialAdManager(this.provider);
  private static rewardedManager: RewardedAdManager = new RewardedAdManager(this.provider);
  private static isInitialized = false;

  static async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;
    try {
      await this.provider.initialize();
      this.isInitialized = true;
      // Preload initial ad formats
      this.interstitialManager.preload().catch(() => {});
      this.rewardedManager.preload().catch(() => {});
      return true;
    } catch (e) {
      console.warn('[AdsManager] Ads initialization failed:', e);
      return false;
    }
  }

  /**
   * Checks whether an interstitial ad should be displayed given policy and frequency rules.
   */
  static shouldShowInterstitial(totalLevelsCompleted: number): boolean {
    const policy = AdPolicy.canShowInterstitial(totalLevelsCompleted);
    return policy.allowed;
  }

  /**
   * Shows an interstitial ad during a valid transition boundary.
   * If rejected by policy or failed, resolves safely without blocking gameplay.
   */
  static async showInterstitial(totalLevelsCompleted: number): Promise<boolean> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    const result = await this.interstitialManager.show(totalLevelsCompleted);
    return result.shown;
  }

  /**
   * Shows user-initiated rewarded ad with verified callback and idempotency protection.
   */
  static async showRewardedAd(options: RewardedAdOptions): Promise<boolean> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    const result = await this.rewardedManager.show(options);
    return result.success && result.rewarded;
  }

  static notifyLevelCompleted() {
    AdFrequencyManager.recordLevelCompleted();
    // Preload next interstitial in background
    this.interstitialManager.preload().catch(() => {});
  }

  static notifyLevelFailed() {
    AdFrequencyManager.recordLevelFailed();
  }

  static getStats() {
    return AdFrequencyManager.getStats();
  }

  /**
   * DEV ONLY: Direct interstitial test that bypasses all policy/frequency checks.
   * Goes straight to the provider's load → show cycle.
   */
  static async testShowInterstitial(): Promise<{ success: boolean; error?: string }> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    try {
      const result = await this.provider.showInterstitial();
      return { success: result.success, error: result.error };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Unknown error' };
    }
  }

  /**
   * DEV ONLY: Direct rewarded test that bypasses all policy/frequency checks.
   * Goes straight to the provider's load → show cycle.
   */
  static async testShowRewarded(): Promise<{ success: boolean; rewarded: boolean; error?: string }> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    try {
      const result = await this.provider.showRewarded('BONUS_COINS', 50, `test_${Date.now()}`);
      return { success: result.success, rewarded: result.rewarded, error: result.error };
    } catch (e: any) {
      return { success: false, rewarded: false, error: e?.message || 'Unknown error' };
    }
  }
}
