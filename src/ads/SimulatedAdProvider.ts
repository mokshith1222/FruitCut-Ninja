import type { AdProvider, AdResult, RewardResult } from './AdTypes';

export class SimulatedAdProvider implements AdProvider {
  name = 'SimulatedAdProvider';
  private interstitialReady = false;
  private rewardedReady = false;

  async initialize(): Promise<boolean> {
    this.interstitialReady = true;
    this.rewardedReady = true;
    return true;
  }

  async preloadInterstitial(): Promise<boolean> {
    this.interstitialReady = true;
    return true;
  }

  async showInterstitial(): Promise<AdResult> {
    // Simulate brief transition presentation
    await new Promise(resolve => setTimeout(resolve, 400));
    this.interstitialReady = false;
    // Preload next
    setTimeout(() => { this.interstitialReady = true; }, 1000);
    return { success: true, adFormat: 'interstitial' };
  }

  async preloadRewarded(): Promise<boolean> {
    this.rewardedReady = true;
    return true;
  }

  async showRewarded(rewardType: string, amount: number, idempotencyKey: string): Promise<RewardResult> {
    // Simulate verified ad completion
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      rewarded: true,
      rewardType,
      amount,
      idempotencyKey
    };
  }

  isInterstitialReady(): boolean {
    return this.interstitialReady;
  }

  isRewardedReady(): boolean {
    return this.rewardedReady;
  }
}
