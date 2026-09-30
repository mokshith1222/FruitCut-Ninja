export type AdFormat = 'interstitial' | 'rewarded' | 'banner';

export type AdState = 'IDLE' | 'LOADING' | 'READY' | 'SHOWING' | 'CLOSED' | 'FAILED';

export type AdEnvironment = 'development' | 'staging' | 'production';

export interface AdResult {
  success: boolean;
  adFormat: AdFormat;
  error?: string;
}

export interface RewardResult {
  success: boolean;
  rewarded: boolean;
  rewardType: string;
  amount: number;
  idempotencyKey: string;
  error?: string;
}

export interface AdFrequencyConfig {
  enabled: boolean;
  minimumLevelsBetweenAds: number;
  minimumCooldownMs: number;
  maxPerSession: number;
  firstSessionProtectionLevels: number;
}

export interface AdUnitConfig {
  appId: string;
  interstitialId: string;
  rewardedId: string;
}

export interface AdProvider {
  name: string;
  initialize(): Promise<boolean>;
  preloadInterstitial(): Promise<boolean>;
  showInterstitial(): Promise<AdResult>;
  preloadRewarded(): Promise<boolean>;
  showRewarded(rewardType: string, amount: number, idempotencyKey: string): Promise<RewardResult>;
  isInterstitialReady(): boolean;
  isRewardedReady(): boolean;
}
