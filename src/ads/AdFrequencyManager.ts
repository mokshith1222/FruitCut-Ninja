import { AdConfigManager } from './AdConfig';

export class AdFrequencyManager {
  private static sessionStartTime = Date.now();
  private static levelsSinceLastAd = 0;
  private static lastInterstitialTime = 0;
  private static interstitialsShown = 0;
  private static rewardedShown = 0;
  private static recentFailsInRow = 0;

  static resetSession() {
    this.sessionStartTime = Date.now();
    this.levelsSinceLastAd = 0;
    this.lastInterstitialTime = 0;
    this.interstitialsShown = 0;
    this.rewardedShown = 0;
    this.recentFailsInRow = 0;
  }

  static recordLevelCompleted() {
    this.levelsSinceLastAd++;
    this.recentFailsInRow = 0;
  }

  static recordLevelFailed() {
    this.recentFailsInRow++;
  }

  static recordInterstitialShown() {
    this.lastInterstitialTime = Date.now();
    this.levelsSinceLastAd = 0;
    this.interstitialsShown++;
  }

  static recordRewardedShown() {
    this.rewardedShown++;
  }

  /**
   * Evaluates all frequency policies to determine if an interstitial can be shown.
   */
  static canShowInterstitial(totalLevelsCompleted: number): { allowed: boolean; reason?: string } {
    const config = AdConfigManager.getFrequencyConfig();

    if (!config.enabled) {
      return { allowed: false, reason: 'Ads disabled in configuration' };
    }

    // 1. First-session / novice protection
    if (totalLevelsCompleted <= config.firstSessionProtectionLevels) {
      return { allowed: false, reason: `First session protection active (${totalLevelsCompleted}/${config.firstSessionProtectionLevels} levels)` };
    }

    // 2. Max interstitials per session cap
    if (this.interstitialsShown >= config.maxPerSession) {
      return { allowed: false, reason: 'Session interstitial limit reached' };
    }

    // 3. Minimum levels completed between ads
    if (this.levelsSinceLastAd < config.minimumLevelsBetweenAds) {
      return { allowed: false, reason: `Level gap not met (${this.levelsSinceLastAd}/${config.minimumLevelsBetweenAds} levels)` };
    }

    // 4. Cooldown time between ads
    const now = Date.now();
    const elapsedSinceLastAd = now - this.lastInterstitialTime;
    if (this.lastInterstitialTime > 0 && elapsedSinceLastAd < config.minimumCooldownMs) {
      return { allowed: false, reason: `Cooldown active (${Math.round((config.minimumCooldownMs - elapsedSinceLastAd) / 1000)}s remaining)` };
    }

    // 5. Failure protection: avoid hitting frustrated players with interstitials on repeated retries
    if (this.recentFailsInRow > 2) {
      return { allowed: false, reason: 'Failure protection active on rapid retries' };
    }

    return { allowed: true };
  }

  static getStats() {
    return {
      sessionStartTime: this.sessionStartTime,
      levelsSinceLastAd: this.levelsSinceLastAd,
      lastInterstitialTime: this.lastInterstitialTime,
      interstitialsShown: this.interstitialsShown,
      rewardedShown: this.rewardedShown,
      recentFailsInRow: this.recentFailsInRow,
    };
  }
}
