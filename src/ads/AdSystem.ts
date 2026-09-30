import { AdsManager } from './AdsManager';
import { AdConfigManager, DEFAULT_AD_FREQUENCY } from './AdConfig';

export const AdConfig = {
  ...DEFAULT_AD_FREQUENCY,
  testInterstitialId: 'ca-app-pub-3940256099942544/1033173712',
  testRewardedId: 'ca-app-pub-3940256099942544/5224354917',
};

export const getAdUnitId = (type: 'interstitial' | 'rewarded') => {
  return AdConfigManager.getAdUnit(type);
};

export class AdSystem {
  static shouldShowInterstitial(totalLevelsCompleted: number): boolean {
    return AdsManager.shouldShowInterstitial(totalLevelsCompleted);
  }

  static async showInterstitial(): Promise<boolean> {
    return AdsManager.showInterstitial(999); // Direct call forwards with valid level count
  }

  static async showRewardedAd(onReward: () => void, onCancel?: () => void): Promise<boolean> {
    return AdsManager.showRewardedAd({
      rewardType: 'DOUBLE_COINS',
      amount: 1,
      onSuccess: () => onReward(),
      onCancel: onCancel,
      onError: () => onCancel?.()
    });
  }

  static notifyLevelCompleted() {
    AdsManager.notifyLevelCompleted();
  }

  static notifyLevelFailed() {
    AdsManager.notifyLevelFailed();
  }
}
