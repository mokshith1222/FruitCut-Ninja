import { create } from 'zustand';
import { AppSaveManager } from '../save/AppSaveManager';

export interface GameSettings {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  hapticsEnabled: boolean;
  screenShakeEnabled: boolean;
  reducedMotion: boolean;
}

export interface PlayerProgress {
  completedLevels: string[];
  starsPerLevel: Record<string, number>;
  unlockedItems: string[];
  equippedItems: Record<string, string>;
  dailyRewardDay: number;
  lastDailyClaimTime: number;
  bestTimeAttackScore: number;
  bestEndlessScore: number;
  bestEndlessTime: number;
  settings: GameSettings;
}

const DEFAULT_PROGRESS: PlayerProgress = {
  completedLevels: [],
  starsPerLevel: {},
  unlockedItems: ['blade_classic', 'trail_basic', 'effect_juice', 'theme_dojo'],
  equippedItems: {
    blade: 'blade_classic',
    trail: 'trail_basic',
    effect: 'effect_juice',
    theme: 'theme_dojo'
  },
  dailyRewardDay: 1,
  lastDailyClaimTime: 0,
  bestTimeAttackScore: 0,
  bestEndlessScore: 0,
  bestEndlessTime: 0,
  settings: {
    musicEnabled: true,
    sfxEnabled: true,
    hapticsEnabled: true,
    screenShakeEnabled: true,
    reducedMotion: false,
  },
};

interface ProgressionState extends PlayerProgress {
  completeLevel: (levelId: string, stars: number) => void;
  unlockItem: (itemId: string) => void;
  equipItem: (category: string, itemId: string) => void;
  advanceDailyReward: () => void;
  updateBestScores: (mode: 'time_attack' | 'endless', score: number, timeSurvived?: number) => boolean;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  loadProgress: (data: Partial<PlayerProgress>) => void;
}

export const useProgressionState = create<ProgressionState>((set) => ({
  ...DEFAULT_PROGRESS,
  
  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }));
    AppSaveManager.save();
  },
  
  completeLevel: (levelId, stars) => {
    set((state) => {
      const prevStars = state.starsPerLevel[levelId] || 0;
      const newStars = Math.max(prevStars, stars);
      const completedLevels = state.completedLevels.includes(levelId) 
        ? state.completedLevels 
        : [...state.completedLevels, levelId];
      
      return {
        starsPerLevel: { ...state.starsPerLevel, [levelId]: newStars },
        completedLevels
      };
    });
    AppSaveManager.save();
  },
  
  unlockItem: (itemId) => {
    set((state) => {
      if (state.unlockedItems.includes(itemId)) return state;
      return { unlockedItems: [...state.unlockedItems, itemId] };
    });
    AppSaveManager.save();
  },
  
  equipItem: (category, itemId) => {
    set((state) => {
      if (!state.unlockedItems.includes(itemId)) return state;
      return { 
        equippedItems: {
          ...state.equippedItems,
          [category]: itemId
        }
      };
    });
    AppSaveManager.save();
  },
  
  advanceDailyReward: () => {
    set((state) => {
      const now = Date.now();
      const nextDay = state.dailyRewardDay >= 7 ? 1 : state.dailyRewardDay + 1;
      return {
        dailyRewardDay: nextDay,
        lastDailyClaimTime: now
      };
    });
    AppSaveManager.save();
  },
  
  updateBestScores: (mode, score, timeSurvived = 0) => {
    let isNewBest = false;
    set((state) => {
      let newState = { ...state };
      if (mode === 'time_attack') {
        if (score > state.bestTimeAttackScore) {
          newState.bestTimeAttackScore = score;
          isNewBest = true;
        }
      } else if (mode === 'endless') {
        if (score > state.bestEndlessScore) {
          newState.bestEndlessScore = score;
          newState.bestEndlessTime = timeSurvived;
          isNewBest = true;
        }
      }
      return newState;
    });
    if (isNewBest) AppSaveManager.save();
    return isNewBest;
  },
  
  loadProgress: (data) => {
    set({
      ...DEFAULT_PROGRESS,
      ...data,
      settings: {
        ...DEFAULT_PROGRESS.settings,
        ...(data?.settings || {})
      }
    });
  }
}));
