export const AdConfig = {
  interstitialEnabled: true,
  minimumLevelsBetweenAds: 2,
  minimumSessionTimeMs: 60 * 1000, // 1 minute
  maxInterstitialsPerSession: 10,
  firstSessionProtectionLevels: 3,
  
  testInterstitialId: 'ca-app-pub-3940256099942544/1033173712',
  testRewardedId: 'ca-app-pub-3940256099942544/5224354917',
  
  prodInterstitialId: 'YOUR_PROD_INTERSTITIAL_ID_HERE',
  prodRewardedId: 'YOUR_PROD_REWARDED_ID_HERE',
};

export const getAdUnitId = (type: 'interstitial' | 'rewarded') => {
  if (import.meta.env.PROD) {
    return type === 'interstitial' ? AdConfig.prodInterstitialId : AdConfig.prodRewardedId;
  }
  return type === 'interstitial' ? AdConfig.testInterstitialId : AdConfig.testRewardedId;
};

class AdSystemState {
  static levelsSinceLastAd = 0;
  static sessionStartTime = Date.now();
  static lastInterstitialTime = 0;
  static interstitialsShown = 0;
}

export class AdSystem {
  
  static shouldShowInterstitial(totalLevelsCompleted: number): boolean {
    if (!AdConfig.interstitialEnabled) return false;
    
    // First session protection
    if (totalLevelsCompleted <= AdConfig.firstSessionProtectionLevels) return false;
    
    // Max cap
    if (AdSystemState.interstitialsShown >= AdConfig.maxInterstitialsPerSession) return false;
    
    // Cooldown checks
    if (AdSystemState.levelsSinceLastAd < AdConfig.minimumLevelsBetweenAds) return false;
    const now = Date.now();
    if (now - AdSystemState.lastInterstitialTime < AdConfig.minimumSessionTimeMs) return false;
    
    return true;
  }

  static async showInterstitial(): Promise<boolean> {
    const adUnitId = getAdUnitId('interstitial');
    if (!import.meta.env.PROD) console.log(`[AdSystem] Attempting to show interstitial ad using ID: ${adUnitId}`);
    
    return new Promise(resolve => {
      setTimeout(() => {
        if (!import.meta.env.PROD) console.log("[AdSystem] Interstitial completed.");
        AdSystemState.lastInterstitialTime = Date.now();
        AdSystemState.levelsSinceLastAd = 0;
        AdSystemState.interstitialsShown++;
        resolve(true);
      }, 800); // simulate ad time
    });
  }

  static async showRewardedAd(onReward: () => void): Promise<boolean> {
    const adUnitId = getAdUnitId('rewarded');
    if (!import.meta.env.PROD) console.log(`[AdSystem] Attempting to show rewarded ad using ID: ${adUnitId}`);
    
    return new Promise(resolve => {
      // In production, we'd wrap SDK calls in try/catch to gracefully fail
      setTimeout(() => {
        const adSuccess = Math.random() > 0.05; // 5% mock failure rate in prod
        
        if (adSuccess) {
          if (!import.meta.env.PROD) console.log("[AdSystem] Rewarded ad successful, granting reward.");
          onReward();
          resolve(true);
        } else {
          if (!import.meta.env.PROD) console.warn("[AdSystem] Rewarded ad failed or closed early.");
          resolve(false);
        }
      }, 1500);
    });
  }
  
  static notifyLevelCompleted() {
    AdSystemState.levelsSinceLastAd++;
  }
}
