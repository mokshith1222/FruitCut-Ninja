import { create } from 'zustand';
import { SaveSystem } from '../save/SaveSystem';

export interface PlayerProgress {
  coins: number;
  completedLevels: string[];
  starsPerLevel: Record<string, number>;
  unlockedSkins: string[];
  currentSkin: string;
  dailyRewardDay: number;
  lastDailyClaimTime: number;
  challengeProgress: Record<string, number>;
  claimedChallenges: string[];
  bestTimeAttackScore: number;
  bestEndlessScore: number;
  bestEndlessTime: number;
}

const DEFAULT_PROGRESS: PlayerProgress = {
  coins: 0,
  completedLevels: [],
  starsPerLevel: {},
  unlockedSkins: ['default_blade'],
  currentSkin: 'default_blade',
  dailyRewardDay: 1,
  lastDailyClaimTime: 0,
  challengeProgress: { cut_50: 0, combo_5: 0, level_5: 0, no_miss: 0, score_500: 0 },
  claimedChallenges: [],
  bestTimeAttackScore: 0,
  bestEndlessScore: 0,
  bestEndlessTime: 0,
};

interface ProgressionState extends PlayerProgress {
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  completeLevel: (levelId: string, stars: number) => void;
  unlockSkin: (skinId: string) => void;
  equipSkin: (skinId: string) => void;
  claimDailyReward: (coins: number) => void;
  updateChallengeProgress: (challengeId: string, value: number, isAbsolute?: boolean) => void;
  claimChallengeReward: (challengeId: string, coins: number) => void;
  updateBestScores: (mode: 'time_attack' | 'endless', score: number, timeSurvived?: number) => boolean;
  loadProgress: () => void;
}

export const useProgressionState = create<ProgressionState>((set, get) => ({
  ...DEFAULT_PROGRESS,
  
  addCoins: (amount) => {
    set((state) => {
      const newState = { coins: state.coins + amount };
      SaveSystem.saveProgress({ ...get(), ...newState });
      return newState;
    });
  },
  
  spendCoins: (amount) => {
    const state = get();
    if (state.coins < amount) return false;
    
    const newState = { coins: state.coins - amount };
    set(newState);
    SaveSystem.saveProgress({ ...state, ...newState });
    return true;
  },
  
  completeLevel: (levelId, stars) => {
    set((state) => {
      const prevStars = state.starsPerLevel[levelId] || 0;
      const newStars = Math.max(prevStars, stars);
      const completedLevels = state.completedLevels.includes(levelId) 
        ? state.completedLevels 
        : [...state.completedLevels, levelId];
      
      const newState = {
        starsPerLevel: { ...state.starsPerLevel, [levelId]: newStars },
        completedLevels
      };
      
      SaveSystem.saveProgress({ ...get(), ...newState });
      return newState;
    });
  },
  
  unlockSkin: (skinId) => {
    set((state) => {
      if (state.unlockedSkins.includes(skinId)) return state;
      const newState = { unlockedSkins: [...state.unlockedSkins, skinId] };
      SaveSystem.saveProgress({ ...get(), ...newState });
      return newState;
    });
  },
  
  equipSkin: (skinId) => {
    set((state) => {
      if (!state.unlockedSkins.includes(skinId)) return state;
      const newState = { currentSkin: skinId };
      SaveSystem.saveProgress({ ...get(), ...newState });
      return newState;
    });
  },
  
  claimDailyReward: (coins) => {
    set((state) => {
      const now = Date.now();
      const nextDay = state.dailyRewardDay >= 7 ? 1 : state.dailyRewardDay + 1;
      const newState = {
        coins: state.coins + coins,
        dailyRewardDay: nextDay,
        lastDailyClaimTime: now
      };
      SaveSystem.saveProgress({ ...get(), ...newState });
      return newState;
    });
  },
  
  updateChallengeProgress: (challengeId, value, isAbsolute = false) => {
    set((state) => {
      const prev = state.challengeProgress[challengeId] || 0;
      const next = isAbsolute ? Math.max(prev, value) : prev + value;
      if (prev === next) return state;
      
      const newState = { challengeProgress: { ...state.challengeProgress, [challengeId]: next } };
      SaveSystem.saveProgress({ ...get(), ...newState });
      return newState;
    });
  },
  
  claimChallengeReward: (challengeId, coins) => {
    set((state) => {
      if (state.claimedChallenges.includes(challengeId)) return state;
      const newState = {
        coins: state.coins + coins,
        claimedChallenges: [...state.claimedChallenges, challengeId]
      };
      SaveSystem.saveProgress({ ...get(), ...newState });
      return newState;
    });
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
      if (isNewBest) SaveSystem.saveProgress({ ...get(), ...newState });
      return newState;
    });
    return isNewBest;
  },
  
  loadProgress: () => {
    const data = SaveSystem.loadProgress();
    if (data) {
      set({ ...DEFAULT_PROGRESS, ...data });
    }
  }
}));
