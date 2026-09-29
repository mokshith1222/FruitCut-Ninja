import { create } from 'zustand';
import { LevelDefinitions } from '../levels/LevelDefinitions';
import type { LevelConfig } from '../levels/LevelDefinitions';
import { useProgressionState } from '../progression/ProgressionState';
import { AudioSystem } from '../audio/AudioSystem';
import { HapticSystem } from '../haptics/HapticSystem';

export const GamePhase = {
  BOOT: 'BOOT',
  MAIN_MENU: 'MAIN_MENU',
  LEVEL_LOADING: 'LEVEL_LOADING',
  LEVEL_STARTING: 'LEVEL_STARTING',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  LEVEL_COMPLETE: 'LEVEL_COMPLETE',
  LEVEL_FAILED: 'LEVEL_FAILED',
  SHOP: 'SHOP',
  SETTINGS: 'SETTINGS',
  DAILY_REWARD: 'DAILY_REWARD',
  CHALLENGES: 'CHALLENGES',
  AD_TEST: 'AD_TEST',
} as const;

export type GamePhase = typeof GamePhase[keyof typeof GamePhase];

interface GameState {
  currentPhase: GamePhase;
  currentLevelId: string | null;
  currentLevelConfig: LevelConfig | null;
  score: number;
  combo: number;
  fruitsCut: number;
  timeRemaining: number | null;
  misses: number;
  setPhase: (phase: GamePhase) => void;
  startGame: (levelId: string) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  updateScore: (points: number) => void;
  updateCombo: (combo: number) => void;
  incrementFruitsCut: () => void;
  incrementMisses: () => void;
  tickTime: (deltaSeconds: number) => void;
  levelComplete: () => void;
  levelFailed: () => void;
  reviveGame: () => void;
  resetGameplay: () => void;
}

export const useGameState = create<GameState>((set) => ({
  currentPhase: GamePhase.BOOT,
  currentLevelId: null,
  currentLevelConfig: null,
  score: 0,
  combo: 0,
  fruitsCut: 0,
  timeRemaining: null,
  misses: 0,
  setPhase: (phase) => set({ currentPhase: phase }),
  startGame: (levelId) => {
    const config = LevelDefinitions[levelId];
    if (!config) return;
    set({ 
      currentPhase: GamePhase.LEVEL_STARTING, 
      currentLevelId: levelId, 
      currentLevelConfig: config,
      score: 0, 
      combo: 0, 
      fruitsCut: 0, 
      misses: 0,
      timeRemaining: config.timeLimit || null 
    });
  },
  pauseGame: () => set({ currentPhase: GamePhase.PAUSED }),
  resumeGame: () => set({ currentPhase: GamePhase.PLAYING }),
  updateScore: (points) => set((state) => {
    useProgressionState.getState().updateChallengeProgress('score_500', state.score + points, true);
    return { score: state.score + points };
  }),
  updateCombo: (combo) => {
    useProgressionState.getState().updateChallengeProgress('combo_5', combo, true);
    set({ combo });
  },
  incrementFruitsCut: () => {
    useProgressionState.getState().updateChallengeProgress('cut_50', 1);
    set((state) => ({ fruitsCut: state.fruitsCut + 1 }));
  },
  incrementMisses: () => set((state) => ({ misses: state.misses + 1 })),
  tickTime: (deltaSeconds) => set((state) => {
      if (state.timeRemaining === null) return {};
      return { timeRemaining: Math.max(0, state.timeRemaining - deltaSeconds) };
  }),
  levelComplete: () => {
    AudioSystem.playSound('win');
    HapticSystem.success();
    set({ currentPhase: GamePhase.LEVEL_COMPLETE });
  },
  levelFailed: () => {
    HapticSystem.failure();
    set({ currentPhase: GamePhase.LEVEL_FAILED });
  },
  reviveGame: () => set((state) => {
    return { 
      currentPhase: GamePhase.PLAYING,
      misses: 0,
      timeRemaining: state.timeRemaining !== null ? state.timeRemaining + 15 : null 
    };
  }),
  resetGameplay: () => set({ score: 0, combo: 0, fruitsCut: 0, misses: 0, timeRemaining: null }),
}));
