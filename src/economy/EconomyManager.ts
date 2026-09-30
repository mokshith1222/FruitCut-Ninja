import { useCoinLedger } from './CoinLedger';
import { AppSaveManager } from '../save/AppSaveManager';
import type { TransactionReason, CoinTransaction } from './EconomyTypes';

export const EconomyManager = {
  getBalance: () => {
    return useCoinLedger.getState().balance;
  },

  addCoins: (amount: number, reason: TransactionReason, sourceId?: string, metadata?: any): CoinTransaction | null => {
    if (amount <= 0) return null;
    
    const tx = useCoinLedger.getState().addTransaction(reason, amount, sourceId, metadata);
    if (tx) {
      AppSaveManager.save();
    }
    return tx;
  },

  spendCoins: (amount: number, reason: TransactionReason, sourceId?: string, metadata?: any): CoinTransaction | null => {
    if (amount <= 0) return null;
    
    const state = useCoinLedger.getState();
    if (state.balance < amount) return null; // Validation happens in Ledger too, but we double-check here
    
    const tx = state.addTransaction(reason, -amount, sourceId, metadata);
    if (tx) {
      AppSaveManager.save();
    }
    return tx;
  },

  canAfford: (amount: number): boolean => {
    return useCoinLedger.getState().balance >= amount;
  }
};
