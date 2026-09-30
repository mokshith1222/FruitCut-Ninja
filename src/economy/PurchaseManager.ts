import { EconomyManager } from './EconomyManager';
import { useProgressionState } from '../progression/ProgressionState';

export const PurchaseManager = {
  purchaseSkin: (itemId: string, cost: number): boolean => {
    const progression = useProgressionState.getState();
    
    // Validation
    if (progression.unlockedItems.includes(itemId)) {
      return false; // Already owned
    }
    
    if (!EconomyManager.canAfford(cost)) {
      return false; // Insufficient funds
    }
    
    // Execute Transaction
    const tx = EconomyManager.spendCoins(cost, 'PURCHASE', itemId, { type: 'cosmetic' });
    
    if (tx) {
      // Update Ownership
      progression.unlockItem(itemId);
      import('../core/EventBus').then(m => m.EventBus.emit('COSMETIC_PURCHASED'));
      return true;
    }
    
    return false;
  }
};
