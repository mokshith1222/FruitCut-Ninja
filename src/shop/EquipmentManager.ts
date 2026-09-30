import { useProgressionState } from '../progression/ProgressionState';
import { getItemById } from './ShopRegistry';
import type { CosmeticItem } from './ShopTypes';

export const EquipmentManager = {
  getEquippedItem: (category: string): CosmeticItem | null => {
    const state = useProgressionState.getState();
    const itemId = state.equippedItems[category];
    if (!itemId) return null;
    return getItemById(itemId) || null;
  },

  getEquippedConfig: (category: string, defaultConfig: any = {}) => {
    const item = EquipmentManager.getEquippedItem(category);
    return item?.config || defaultConfig;
  },

  equipItem: (category: string, itemId: string) => {
    // Validate ownership
    const state = useProgressionState.getState();
    if (state.unlockedItems.includes(itemId)) {
      state.equipItem(category, itemId);
      return true;
    }
    return false;
  }
};
