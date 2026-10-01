import { create } from 'zustand';
import { LevelRegistry } from './progression/LevelRegistry';
import type { LevelConfig } from './progression/LevelTypes';
import { AudioSystem } from '../audio/AudioSystem';
import { HapticSystem } from '../haptics/HapticSystem';
import { EventBus, GameEvents } from './EventBus';

export const GamePhase = {
  BOOT: 'BOOT',
  MAIN_MENU: 'MAIN_MENU',
  LEVEL_LOADING: 'LEVEL_LOADING',
  LEVEL_STARTING: 'LEVEL_STARTING',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  LEVEL_COMPLETE: 'LEVEL_COMPLETE',
  LEVEL_FAILED: 'LEVEL_FAILED',
  TIME_ATTACK_RESULT: 'TIME_ATTACK_RESULT',
  ENDLESS_RESULT: 'ENDLESS_RESULT',
  SHOP: 'SHOP',
  SETTINGS: 'SETTINGS',
  DAILY_REWARD: 'DAILY_REWARD',
  CHALLENGES: 'CHALLENGES',
} as const;

export type GamePhase = typeof GamePhase[keyof typeof GamePhase];

interface GameState {
  currentPhase: GamePhase;
  currentLevelId: string | null;
  currentLevelConfig: LevelConfig | null;
  score: number;
  combo: number;
  maxCombo: number;
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
  maxCombo: 0,
  fruitsCut: 0,
  timeRemaining: null,
  misses: 0,
  setPhase: (phase) => set({ currentPhase: phase }),
  startGame: (levelId) => {
    // Check old hardcoded modes or default back to LevelRegistry
    let config: LevelConfig | null = LevelRegistry[levelId] || null;
    
    // Time Attack / Endless mocks for compatibility if they aren't in Registry yet
    if (!config && (levelId === 'time_attack' || levelId === 'endless')) {
       config = {
         id: levelId,
         levelNumber: 0,
         worldId: 'world_1',
         duration: levelId === 'time_attack' ? 60 : 0,
         difficultyTier: 5,
         difficultyValue: 0.5,
         spawnRateMs: 1000,
         fruitSpeedMultiplier: 1.2,
         fruitSizeMultiplier: 1.0,
         bombChance: 0.1,
         specialFruitChance: 0.1,
         maxSimultaneousFruits: 3,
         spawnPattern: 'RANDOM',
         objectives: [],
         starThresholds: { one: 1000, two: 2000, three: 3000 },
         rewards: { baseCoins: 0 }
       };
    }
    
    if (!config) return;
    set({ 
      currentPhase: GamePhase.LEVEL_STARTING, 
      currentLevelId: levelId, 
      currentLevelConfig: config,
      score: 0, 
      combo: 0, 
      maxCombo: 0,
      fruitsCut: 0, 
      misses: 0,
      timeRemaining: config.duration || null 
    });
  },
  pauseGame: () => set({ currentPhase: GamePhase.PAUSED }),
  resumeGame: () => set({ currentPhase: GamePhase.PLAYING }),
  updateScore: (points) => set((state) => {
    // We emit ENDLESS_SCORE in the EndlessMode loop, but here we can just update raw score.
    return { score: state.score + points };
  }),
  updateCombo: (combo) => {
    EventBus.emit(GameEvents.COMBO_CHANGED, combo);
    set((state) => ({ 
      combo, 
      maxCombo: Math.max(state.maxCombo, combo) 
    }));
  },
  incrementFruitsCut: () => {
    EventBus.emit(GameEvents.FRUIT_CUT);
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
    EventBus.emit('LEVEL_COMPLETED', 'level');
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
  resetGameplay: () => set({ score: 0, combo: 0, maxCombo: 0, fruitsCut: 0, misses: 0, timeRemaining: null }),
}));
