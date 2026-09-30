// Generic abstraction over localStorage to permit swapping out with 
// Capacitor/Native storage later.

import type { EconomySaveData } from '../economy/EconomyTypes';

const SAVE_KEY_V1 = 'fruit_cut_save_v1';
const SAVE_KEY_V2 = 'fruit_cut_save_v2';
const SAVE_KEY_V3 = 'fruit_cut_save_v3';
const SAVE_KEY_V4 = 'fruit_cut_save_v4';

export interface AppSaveDataV4 {
  version: 4;
  progression: any; // PlayerProgress
  economy: EconomySaveData;
  challenges: any; // ChallengeSaveData
}

export const SaveSystem = {
  _inMemoryData: null as AppSaveDataV4 | null,

  saveProgress: (progressionData: any, economyData: EconomySaveData, challengeData: any) => {
    try {
      const data: AppSaveDataV4 = {
        version: 4,
        progression: progressionData,
        economy: economyData,
        challenges: challengeData
      };
      SaveSystem._inMemoryData = data;
      localStorage.setItem(SAVE_KEY_V4, JSON.stringify(data));
    } catch (e) {
      console.warn("SaveSystem: Failed to save progress", e);
    }
  },

  loadProgress: (): AppSaveDataV4 | null => {
    try {
      // 1. Try V4
      const v4Data = localStorage.getItem(SAVE_KEY_V4);
      if (v4Data) {
        const parsed = JSON.parse(v4Data);
        SaveSystem._inMemoryData = parsed;
        return parsed;
      }

      // 2. Try V3
      const v3Data = localStorage.getItem(SAVE_KEY_V3);
      if (v3Data) {
        console.log("SaveSystem: Migrating V3 save to V4...");
        const parsedV3 = JSON.parse(v3Data);
        const migrated = SaveSystem.migrateToV4(parsedV3);
        SaveSystem.saveProgress(migrated.progression, migrated.economy, migrated.challenges);
        return migrated;
      }
      
      // 3. Try V2 and migrate to V3 -> V4
      const v2Data = localStorage.getItem(SAVE_KEY_V2);
      if (v2Data) {
        console.log("SaveSystem: Migrating V2 save to V4...");
        const parsedV2 = JSON.parse(v2Data);
        const migratedV3 = SaveSystem.migrateToV3(parsedV2.progression, parsedV2.economy);
        const migratedV4 = SaveSystem.migrateToV4(migratedV3);
        SaveSystem.saveProgress(migratedV4.progression, migratedV4.economy, migratedV4.challenges);
        return migratedV4;
      }
      
      // 4. Fallback to V1 Migration
      const v1Data = localStorage.getItem(SAVE_KEY_V1);
      if (v1Data) {
        console.log("SaveSystem: Migrating V1 save to V4...");
        const parsedV1 = JSON.parse(v1Data);
        
        const v2Economy: EconomySaveData = {
          balance: parsedV1.coins || 0,
          transactions: [],
          claimedRewards: {}
        };
        
        const v2Progression = { ...parsedV1 };
        delete v2Progression.coins;
        
        const migratedV3 = SaveSystem.migrateToV3(v2Progression, v2Economy);
        const migratedV4 = SaveSystem.migrateToV4(migratedV3);
        SaveSystem.saveProgress(migratedV4.progression, migratedV4.economy, migratedV4.challenges);
        return migratedV4;
      }
      
      return null;
    } catch (e) {
      console.warn("SaveSystem: Failed to load progress", e);
      return null;
    }
  },

  migrateToV4: (v3Data: any): AppSaveDataV4 => {
    // We add the empty/default challenges schema. 
    // It will be initialized properly when useChallengeState mounts.
    const defaultChallenges = {
      daily: null,
      weekly: null,
      milestones: {},
      streak: { current: 0, best: 0, lastActiveDate: null }
    };
    return {
      version: 4,
      progression: v3Data.progression,
      economy: v3Data.economy,
      challenges: defaultChallenges
    };
  },
  
  migrateToV3: (progression: any, economy: EconomySaveData) => {
    const newProgression = { ...progression };
    
    // Migrate unlockedSkins to unlockedItems
    if (newProgression.unlockedSkins) {
      newProgression.unlockedItems = [...newProgression.unlockedSkins];
      delete newProgression.unlockedSkins;
    }
    if (!newProgression.unlockedItems) {
      newProgression.unlockedItems = ['blade_classic', 'trail_basic', 'effect_juice', 'theme_dojo'];
    }
    
    // Migrate currentSkin to equippedItems
    if (newProgression.currentSkin) {
      newProgression.equippedItems = {
        blade: newProgression.currentSkin,
        trail: 'trail_basic',
        effect: 'effect_juice',
        theme: 'theme_dojo'
      };
      delete newProgression.currentSkin;
    }
    if (!newProgression.equippedItems) {
      newProgression.equippedItems = {
        blade: 'blade_classic',
        trail: 'trail_basic',
        effect: 'effect_juice',
        theme: 'theme_dojo'
      };
    }
    
    return {
      version: 3,
      progression: newProgression,
      economy: economy
    };
  },
  
  clearProgress: () => {
    try {
      localStorage.removeItem(SAVE_KEY_V4);
      localStorage.removeItem(SAVE_KEY_V3);
      localStorage.removeItem(SAVE_KEY_V2);
      localStorage.removeItem(SAVE_KEY_V1);
      SaveSystem._inMemoryData = null;
    } catch (e) {
      console.warn("SaveSystem: Failed to clear progress", e);
    }
  }
};
