import type { AdProvider, AdState, RewardResult } from './AdTypes';
import { AdPolicy } from './AdPolicy';
import { AdFrequencyManager } from './AdFrequencyManager';

export interface RewardedAdOptions {
  rewardType: 'DOUBLE_COINS' | 'REVIVE' | 'BONUS_COINS';
  amount?: number;
  onSuccess: (amount: number, idempotencyKey: string) => void;
  onCancel?: () => void;
  onError?: (message: string) => void;
}

export class RewardedAdManager {
  private provider: AdProvider;
  private state: AdState = 'IDLE';
  private processedTokens = new Set<string>();

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
      const ready = await this.provider.preloadRewarded();
      this.state = ready ? 'READY' : 'IDLE';
      return ready;
    } catch {
      this.state = 'FAILED';
      return false;
    }
  }

  /**
   * Shows user-initiated rewarded ad with idempotency token protection.
   */
  async show(options: RewardedAdOptions): Promise<RewardResult> {
    // 1. Validate ad policy
    const policy = AdPolicy.canShowRewarded();
    if (!policy.allowed) {
      const errMsg = policy.reason || 'Rewarded ads unavailable';
      options.onError?.(errMsg);
      return {
        success: false,
        rewarded: false,
        rewardType: options.rewardType,
        amount: 0,
        idempotencyKey: '',
        error: errMsg
      };
    }

    if (this.state === 'SHOWING') {
      const errMsg = 'Another ad is currently showing';
      options.onError?.(errMsg);
      return {
        success: false,
        rewarded: false,
        rewardType: options.rewardType,
        amount: 0,
        idempotencyKey: '',
        error: errMsg
      };
    }

    // 2. Generate unique idempotency token
    const idempotencyKey = `rewarded_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const rewardAmount = options.amount || 0;

    this.state = 'SHOWING';

    try {
      const result = await this.provider.showRewarded(options.rewardType, rewardAmount, idempotencyKey);

      // Verify that the ad confirmed reward completion and token hasn't been used
      if (result.success && result.rewarded) {
        if (this.processedTokens.has(idempotencyKey)) {
          console.warn('[RewardedAdManager] Idempotency token already processed, skipping duplicate grant:', idempotencyKey);
          return result;
        }

        // Mark token as processed
        this.processedTokens.add(idempotencyKey);
        AdFrequencyManager.recordRewardedShown();

        this.state = 'CLOSED';
        options.onSuccess(rewardAmount, idempotencyKey);
        return result;
      } else {
        this.state = 'CLOSED';
        if (result.error) {
          options.onError?.(result.error);
        } else {
          options.onCancel?.();
        }
        return result;
      }
    } catch (e: any) {
      this.state = 'FAILED';
      const errMsg = e?.message || 'Rewarded ad presentation failed';
      options.onError?.(errMsg);
      return {
        success: false,
        rewarded: false,
        rewardType: options.rewardType,
        amount: 0,
        idempotencyKey,
        error: errMsg
      };
    } finally {
      this.state = 'IDLE';
    }
  }

  isTokenProcessed(token: string): boolean {
    return this.processedTokens.has(token);
  }
}
