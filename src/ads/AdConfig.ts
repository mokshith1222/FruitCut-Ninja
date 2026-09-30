import type { AdFrequencyConfig, AdUnitConfig, AdEnvironment } from './AdTypes';

// Official Google Mobile Ads Sample / Test IDs for development
export const GOOGLE_TEST_AD_UNITS: AdUnitConfig = {
  appId: 'ca-app-pub-3940256099942544~3347511713',
  interstitialId: 'ca-app-pub-3940256099942544/1033173712',
  rewardedId: 'ca-app-pub-3940256099942544/5224354917',
};

// Default frequency policies to protect user experience
export const DEFAULT_AD_FREQUENCY: AdFrequencyConfig = {
  enabled: true,
  minimumLevelsBetweenAds: 3,       // Player must complete at least 3 levels between interstitials
  minimumCooldownMs: 90 * 1000,      // 90 seconds minimum cooldown between interstitials
  maxPerSession: 8,                  // Cap total interstitials per session to 8
  firstSessionProtectionLevels: 3,   // Brand new players see zero interstitials for first 3 levels
};

export class AdConfigManager {
  // Only consider 'production' if the build is production AND production ad unit IDs are configured.
  // This ensures debug APK builds (which use `npm run build` but lack production ad IDs) correctly stay in dev mode.
  private static environment: AdEnvironment = (
    import.meta.env.PROD &&
    import.meta.env.VITE_ADMOB_INTERSTITIAL_ID &&
    import.meta.env.VITE_ADMOB_REWARDED_ID
  ) ? 'production' : 'development';
  private static frequencyConfig: AdFrequencyConfig = { ...DEFAULT_AD_FREQUENCY };

  static getEnvironment(): AdEnvironment {
    return this.environment;
  }

  static setEnvironment(env: AdEnvironment) {
    this.environment = env;
  }

  static getFrequencyConfig(): AdFrequencyConfig {
    return this.frequencyConfig;
  }

  static updateFrequencyConfig(partial: Partial<AdFrequencyConfig>) {
    this.frequencyConfig = { ...this.frequencyConfig, ...partial };
  }

  /**
   * Resolves the appropriate ad unit ID based on environment.
   * In development: returns official Google Test IDs.
   * In production: returns configured production ID, or empty string if unconfigured.
   */
  static getAdUnit(type: 'interstitial' | 'rewarded'): string {
    const isProd = this.environment === 'production';

    if (isProd) {
      const prodId = type === 'interstitial'
        ? (import.meta.env.VITE_ADMOB_INTERSTITIAL_ID || '')
        : (import.meta.env.VITE_ADMOB_REWARDED_ID || '');

      if (!prodId) {
        console.warn(`[AdConfig] Production ${type} ad ID not set in environment. Ad format will be disabled.`);
        return '';
      }
      return prodId;
    }

    // In development or staging, always use official test IDs
    return type === 'interstitial' 
      ? GOOGLE_TEST_AD_UNITS.interstitialId 
      : GOOGLE_TEST_AD_UNITS.rewardedId;
  }

  static isFormatConfigured(type: 'interstitial' | 'rewarded'): boolean {
    if (this.environment !== 'production') return true;
    return !!this.getAdUnit(type);
  }
}
