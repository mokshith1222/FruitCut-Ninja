import type { AdProvider, AdState } from './AdTypes';
import { AdPolicy } from './AdPolicy';
import { AdFrequencyManager } from './AdFrequencyManager';

export class InterstitialAdManager {
  private provider: AdProvider;
  private state: AdState = 'IDLE';
  private lastError: string | null = null;

  constructor(provider: AdProvider) {
    this.provider = provider;
  }

  getState(): AdState {
    return this.state;
  }

  async preload(): Promise<boolean> {
    if (this.state === 'LOADING' || this.state === 'SHOWING') return false;

    this.state = 'LOADING';
    try {
      const ready = await this.provider.preloadInterstitial();
      this.state = ready ? 'READY' : 'IDLE';
      return ready;
    } catch (e: any) {
      this.state = 'FAILED';
      this.lastError = e?.message || 'Preload failed';
      return false;
    }
  }

  /**
   * Attempts to display an interstitial ad during a valid transition boundary.
   * If policy rejects, cooldown active, or ad fails, resolves cleanly without blocking the player.
   */
  async show(totalLevelsCompleted: number): Promise<{ shown: boolean; reason?: string }> {
    // 1. Validate ad policy & frequency rules
    const policy = AdPolicy.canShowInterstitial(totalLevelsCompleted);
    if (!policy.allowed) {
      return { shown: false, reason: policy.reason };
    }

    if (this.state === 'SHOWING') {
      return { shown: false, reason: 'Interstitial already in progress' };
    }

    this.state = 'SHOWING';

    try {
      const result = await this.provider.showInterstitial();
      if (result.success) {
        AdFrequencyManager.recordInterstitialShown();
        this.state = 'CLOSED';
        return { shown: true };
      } else {
        this.state = 'FAILED';
        this.lastError = result.error || 'Display failed';
        return { shown: false, reason: result.error };
      }
    } catch (e: any) {
      this.state = 'FAILED';
      this.lastError = e?.message || 'Unexpected interstitial error';
      return { shown: false, reason: this.lastError || undefined };
    } finally {
      this.state = 'IDLE';
    }
  }

  getLastError(): string | null {
    return this.lastError;
  }
}
