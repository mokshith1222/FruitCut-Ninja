import { create } from 'zustand';
import type { CoinTransaction, TransactionReason, EconomySaveData } from './EconomyTypes';

interface LedgerState extends EconomySaveData {}

interface LedgerActions {
  addTransaction: (reason: TransactionReason, amount: number, sourceId?: string, metadata?: any) => CoinTransaction | null;
  hasClaimedReward: (rewardKey: string) => boolean;
  recordRewardClaim: (rewardKey: string) => void;
  load: (data: EconomySaveData) => void;
}

export const useCoinLedger = create<LedgerState & LedgerActions>((set, get) => ({
  balance: 0,
  transactions: [],
  claimedRewards: {},
  
  addTransaction: (reason, amount, sourceId, metadata) => {
    const state = get();
    if (amount === 0) return null;
    if (amount < 0 && state.balance < Math.abs(amount)) {
      return null; // Insufficient funds
    }
    
    const balanceBefore = state.balance;
    const balanceAfter = state.balance + amount;
    
    const tx: CoinTransaction = {
      // Basic UUID substitute for local storage context
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      reason,
      amount,
      balanceBefore,
      balanceAfter,
      sourceId,
      metadata
    };
    
    set({
      balance: balanceAfter,
      transactions: [...state.transactions, tx]
    });
    
    return tx;
  },

  hasClaimedReward: (rewardKey) => {
    return !!get().claimedRewards[rewardKey];
  },
  
  recordRewardClaim: (rewardKey) => {
    set(state => ({
      claimedRewards: { ...state.claimedRewards, [rewardKey]: Date.now() }
    }));
  },
  
  load: (data) => {
    set({
      balance: data.balance || 0,
      transactions: data.transactions || [],
      claimedRewards: data.claimedRewards || {}
    });
  }
}));
