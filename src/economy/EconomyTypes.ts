export type TransactionReason = 
  | 'LEVEL_COMPLETION' 
  | 'LEVEL_STAR' 
  | 'TIME_ATTACK_REWARD' 
  | 'ENDLESS_MILESTONE' 
  | 'DAILY_REWARD' 
  | 'CHALLENGE_REWARD' 
  | 'PURCHASE'
  | 'DEBUG'
  | 'AD_REWARD';

export interface CoinTransaction {
  id: string;
  timestamp: number;
  reason: TransactionReason;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  sourceId?: string;
  metadata?: any;
}

export interface EconomySaveData {
  balance: number;
  transactions: CoinTransaction[];
  claimedRewards: Record<string, number>;
}
