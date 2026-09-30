import { AdMob, InterstitialAdPluginEvents, RewardAdPluginEvents } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';
import type { AdProvider, AdResult, RewardResult } from './AdTypes';
import { AdConfigManager } from './AdConfig';
import { SimulatedAdProvider } from './SimulatedAdProvider';
import type { PluginListenerHandle } from '@capacitor/core';

const isDev = !import.meta.env.PROD;

/** Development-only logger that prefixes all messages with [ADS] */
function adsLog(...args: any[]) {
  if (isDev) {
    console.log('[ADS]', ...args);
  }
}

function adsWarn(...args: any[]) {
  console.warn('[ADS]', ...args);
}

export class AdMobProvider implements AdProvider {
  name = 'AdMobProvider';
  private fallbackProvider = new SimulatedAdProvider();
  private isNativeAdMobAvailable = false;
  private isInitialized = false;
  private initializePromise: Promise<boolean> | null = null;
  private interstitialLoaded = false;
  private rewardedLoaded = false;
  private lastInterstitialError = '';
  private lastRewardedError = '';

  async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;
    // Deduplicate concurrent init calls
    if (this.initializePromise) return this.initializePromise;

    this.initializePromise = this._doInitialize();
    return this.initializePromise;
  }

  private async _doInitialize(): Promise<boolean> {
    try {
      if (Capacitor.isNativePlatform()) {
        adsLog('SDK initialization started (native platform detected)');
        this.isNativeAdMobAvailable = true;

        await AdMob.initialize({
          initializeForTesting: AdConfigManager.getEnvironment() !== 'production'
        });
        
        adsLog('SDK initialization completed');
        this.isInitialized = true;

        AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
          adsLog('Interstitial loaded (event)');
          this.interstitialLoaded = true;
          this.lastInterstitialError = '';
        });
        AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (err: any) => {
          const msg = err?.message || JSON.stringify(err);
          adsWarn('Interstitial failed to load (event):', msg);
          this.lastInterstitialError = msg;
          this.interstitialLoaded = false;
        });
        AdMob.addListener(InterstitialAdPluginEvents.Showed, () => {
          adsLog('Interstitial showed (event)');
        });
        AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
          adsLog('Interstitial dismissed (event)');
        });

        AdMob.addListener(RewardAdPluginEvents.Loaded, () => {
          adsLog('Rewarded loaded (event)');
          this.rewardedLoaded = true;
          this.lastRewardedError = '';
        });
        AdMob.addListener(RewardAdPluginEvents.FailedToLoad, (err: any) => {
          const msg = err?.message || JSON.stringify(err);
          adsWarn('Rewarded failed to load (event):', msg);
          this.lastRewardedError = msg;
          this.rewardedLoaded = false;
        });
        AdMob.addListener(RewardAdPluginEvents.Showed, () => {
          adsLog('Rewarded showed (event)');
        });
        AdMob.addListener(RewardAdPluginEvents.Rewarded, () => {
          adsLog('Reward earned (event)');
        });
        AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
          adsLog('Rewarded dismissed (event)');
        });

        return true;
      } else {
        adsLog('Not a native platform — using simulated provider');
      }
    } catch (e: any) {
      adsWarn('Native AdMob initialization failed:', e?.message || e);
    }

    this.isInitialized = true;
    return this.fallbackProvider.initialize();
  }

  async preloadInterstitial(): Promise<boolean> {
    if (!this.isNativeAdMobAvailable) {
      return this.fallbackProvider.preloadInterstitial();
    }

    try {
      const adId = AdConfigManager.getAdUnit('interstitial');
      if (!adId) {
        adsWarn('No interstitial ad unit ID configured');
        this.lastInterstitialError = 'No interstitial ad unit ID configured';
        return false;
      }

      const isTesting = AdConfigManager.getEnvironment() !== 'production';
      adsLog('Loading interstitial:', adId, 'isTesting:', isTesting);
      this.interstitialLoaded = false;
      this.lastInterstitialError = '';

      await AdMob.prepareInterstitial({ adId, isTesting });
      this.interstitialLoaded = true;
      adsLog('Interstitial preload result: READY');
      return true;
    } catch (e: any) {
      const msg = e?.message || String(e);
      adsWarn('Failed to preload native interstitial:', msg);
      this.lastInterstitialError = msg;
      this.interstitialLoaded = false;
      return false;
    }
  }

  async showInterstitial(): Promise<AdResult> {
    if (!this.isNativeAdMobAvailable) {
      return this.fallbackProvider.showInterstitial();
    }

    try {
      // If not loaded, preload
      if (!this.interstitialLoaded) {
        adsLog('Interstitial not loaded — preloading before show');
        const preloaded = await this.preloadInterstitial();
        if (!preloaded) {
          adsWarn('Interstitial preload failed — cannot show');
          return { success: false, adFormat: 'interstitial', error: this.lastInterstitialError || 'Ad failed to load' };
        }
      }

      adsLog('Interstitial show requested');
      await AdMob.showInterstitial();
      this.interstitialLoaded = false;
      adsLog('Interstitial show completed');

      // Preload next one in background
      this.preloadInterstitial().catch(() => {});
      return { success: true, adFormat: 'interstitial' };
    } catch (e: any) {
      adsWarn('Native interstitial failed to show:', e?.message || e);
      this.interstitialLoaded = false;
      return { success: false, adFormat: 'interstitial', error: e?.message || 'Ad display failed' };
    }
  }

  async preloadRewarded(): Promise<boolean> {
    if (!this.isNativeAdMobAvailable) {
      return this.fallbackProvider.preloadRewarded();
    }

    try {
      const adId = AdConfigManager.getAdUnit('rewarded');
      if (!adId) {
        adsWarn('No rewarded ad unit ID configured');
        this.lastRewardedError = 'No rewarded ad unit ID configured';
        return false;
      }

      const isTesting = AdConfigManager.getEnvironment() !== 'production';
      adsLog('Loading rewarded:', adId, 'isTesting:', isTesting);
      this.rewardedLoaded = false;
      this.lastRewardedError = '';

      await AdMob.prepareRewardVideoAd({ adId, isTesting });
      this.rewardedLoaded = true;
      adsLog('Rewarded preload result: READY');
      return true;
    } catch (e: any) {
      const msg = e?.message || String(e);
      adsWarn('Failed to preload native rewarded ad:', msg);
      this.lastRewardedError = msg;
      this.rewardedLoaded = false;
      return false;
    }
  }

  async showRewarded(rewardType: string, amount: number, idempotencyKey: string): Promise<RewardResult> {
    if (!this.isNativeAdMobAvailable) {
      return this.fallbackProvider.showRewarded(rewardType, amount, idempotencyKey);
    }

    try {
      // If not loaded, preload
      if (!this.rewardedLoaded) {
        adsLog('Rewarded not loaded — preloading before show');
        const preloaded = await this.preloadRewarded();
        if (!preloaded) {
          adsWarn('Rewarded preload failed — cannot show');
          return {
            success: false, rewarded: false, rewardType, amount, idempotencyKey,
            error: this.lastRewardedError || 'Rewarded ad failed to load'
          };
        }
      }

      adsLog('Rewarded show requested');

      return new Promise<RewardResult>(async (resolve) => {
        let rewardEarned = false;
        
        let rewardListener: PluginListenerHandle | undefined;
        let dismissListener: PluginListenerHandle | undefined;
        let failedListener: PluginListenerHandle | undefined;
        
        const cleanup = () => {
          if (rewardListener) rewardListener.remove();
          if (dismissListener) dismissListener.remove();
          if (failedListener) failedListener.remove();
          this.rewardedLoaded = false;
          this.preloadRewarded().catch(() => {});
        };
        
        rewardListener = await AdMob.addListener(RewardAdPluginEvents.Rewarded, () => {
          adsLog('Reward earned (show listener)');
          rewardEarned = true;
        });

        dismissListener = await AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
          adsLog('Rewarded dismissed (show listener), rewardEarned:', rewardEarned);
          cleanup();
          resolve({
            success: true,
            rewarded: rewardEarned,
            rewardType,
            amount,
            idempotencyKey
          });
        });

        failedListener = await AdMob.addListener(RewardAdPluginEvents.FailedToShow, (err: any) => {
          adsWarn('Rewarded failed to show:', err?.message || err);
          cleanup();
          resolve({
            success: false,
            rewarded: false,
            rewardType,
            amount,
            idempotencyKey,
            error: err?.message || 'Rewarded ad failed to show'
          });
        });

        AdMob.showRewardVideoAd().catch((e: any) => {
          adsWarn('Rewarded ad native show error:', e?.message || e);
          cleanup();
          resolve({
            success: false,
            rewarded: false,
            rewardType,
            amount,
            idempotencyKey,
            error: e?.message || 'Rewarded ad unavailable'
          });
        });
      });
    } catch (e: any) {
      adsWarn('Native rewarded ad preparation failed:', e?.message || e);
      return {
        success: false,
        rewarded: false,
        rewardType,
        amount,
        idempotencyKey,
        error: e?.message || 'Rewarded ad unavailable'
      };
    }
  }

  isInterstitialReady(): boolean {
    return this.isNativeAdMobAvailable ? this.interstitialLoaded : this.fallbackProvider.isInterstitialReady();
  }

  isRewardedReady(): boolean {
    return this.isNativeAdMobAvailable ? this.rewardedLoaded : this.fallbackProvider.isRewardedReady();
  }
}
