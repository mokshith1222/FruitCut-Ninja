import { EconomyManager } from './EconomyManager';
import { useCoinLedger } from './CoinLedger';
import { RewardDefinitions } from './RewardDefinitions';
import type { TransactionReason } from './EconomyTypes';

export const RewardManager = {
  /**
   * Safe, idempotent reward granter.
   * Generates a unique key based on the context to prevent duplicate claims.
   */
  grantReward: (
    rewardKey: string,
    amount: number,
    reason: TransactionReason,
    sourceId?: string,
    metadata?: any
  ): boolean => {
    const ledger = useCoinLedger.getState();
    
    // Idempotency check
    if (ledger.hasClaimedReward(rewardKey)) {
      return false; // Already claimed
    }

    // Process Transaction
    const tx = EconomyManager.addCoins(amount, reason, sourceId, metadata);
    if (tx) {
      ledger.recordRewardClaim(rewardKey);
      return true;
    }

    return false;
  },

  grantLevelCompletion: (levelId: string, isFirstTime: boolean, levelBaseCoins: number): number => {
    let totalEarned = 0;
    
    // Dynamic Level Completion Reward (Base + possible First Time Bonus)
    if (isFirstTime) {
      const key = `level:${levelId}:first_completion`;
      if (RewardManager.grantReward(key, RewardDefinitions.LEVEL_FIRST_COMPLETION, 'LEVEL_COMPLETION', levelId)) {
        totalEarned += RewardDefinitions.LEVEL_FIRST_COMPLETION;
      }
    }

    // Regular replay reward (or base level reward from registry)
    const baseReward = isFirstTime ? levelBaseCoins : RewardDefinitions.LEVEL_REPLAY_COMPLETION;
    
    // We don't idempotently lock replays, because players can replay levels as much as they want.
    // However, we can use a timestamped key to record the transaction distinctly without locking future plays.
    EconomyManager.addCoins(baseReward, 'LEVEL_COMPLETION', levelId, { isFirstTime });
    totalEarned += baseReward;

    return totalEarned;
  },

  grantLevelStars: (levelId: string, newStars: number[]): number => {
    let totalEarned = 0;
    for (const star of newStars) {
      const key = `level:${levelId}:star_${star}`;
      let amount = 0;
      if (star === 1) amount = RewardDefinitions.STAR_EARNED_1;
      else if (star === 2) amount = RewardDefinitions.STAR_EARNED_2;
      else if (star === 3) amount = RewardDefinitions.STAR_EARNED_3;

      if (amount > 0 && RewardManager.grantReward(key, amount, 'LEVEL_STAR', levelId, { star })) {
        totalEarned += amount;
      }
    }
    return totalEarned;
  },

  grantTimeAttackReward: (score: number): number => {
    // Determine reward based on score tier
    const amount = Math.floor(score / 100);
    if (amount > 0) {
      EconomyManager.addCoins(amount, 'TIME_ATTACK_REWARD', 'time_attack', { score });
      return amount;
    }
    return 0;
  },

  grantEndlessMilestone: (fruitCount: number): number => {
    let earned = 0;
    const milestones = Object.keys(RewardDefinitions.ENDLESS_MILESTONES).map(Number).sort((a,b) => a - b);
    
    for (const m of milestones) {
      if (fruitCount >= m) {
        const key = `endless:milestone:${m}`;
        const amount = (RewardDefinitions.ENDLESS_MILESTONES as any)[m];
        if (RewardManager.grantReward(key, amount, 'ENDLESS_MILESTONE', 'endless', { fruitsCut: fruitCount })) {
          earned += amount;
        }
      }
    }
    return earned;
  },
  
  grantDailyReward: (dayIndex: number): number => {
    const todayStr = new Date().toISOString().split('T')[0];
    const key = `daily:${todayStr}`;
    
    const amountIdx = Math.min(dayIndex - 1, RewardDefinitions.DAILY_REWARDS.length - 1);
    const amount = RewardDefinitions.DAILY_REWARDS[amountIdx];
    
    if (RewardManager.grantReward(key, amount, 'DAILY_REWARD', `day_${dayIndex}`)) {
      return amount;
    }
    return 0;
  },

  grantChallengeReward: (challengeId: string, customAmount?: number): number => {
    const key = `challenge:${challengeId}`;
    const amount = customAmount || RewardDefinitions.CHALLENGE_DEFAULT;
    
    if (RewardManager.grantReward(key, amount, 'CHALLENGE_REWARD', challengeId)) {
      return amount;
    }
    return 0;
  }
};
