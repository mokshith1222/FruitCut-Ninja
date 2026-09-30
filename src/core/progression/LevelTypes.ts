export type ObjectiveType = 'SCORE' | 'FRUIT_COUNT' | 'COMBO' | 'PERFECT_CUTS' | 'NO_BOMB' | 'BOMB_AVOIDANCE' | 'SURVIVAL_TIME';

export interface LevelObjective {
  type: ObjectiveType;
  target?: number;
  booleanTarget?: boolean;
}

export interface LevelConfig {
  id: string; // e.g. 'level_1'
  levelId?: string; // alias for compatibility
  levelNumber: number;
  worldId: string;
  title?: string;
  duration: number; // in seconds, limits the level length or defines survival time
  timeLimit?: number;
  missLimit?: number;
  noBombsAllowed?: boolean;
  gravityMultiplier?: number;
  
  difficultyTier: number; // For engine context (e.g., 1-10)
  difficultyValue: number; // 0.0 - 1.0 curve for analytics

  // Spawn Engine Settings
  spawnRateMs: number;
  fruitSpeedMultiplier: number;
  fruitSizeMultiplier: number;
  bombChance: number;
  specialFruitChance: number;
  maxSimultaneousFruits: number;
  spawnPattern: 'SINGLE' | 'PAIR' | 'BURST' | 'FOUNTAIN' | 'CROSS' | 'MIXED' | 'RANDOM';
  
  objectives: LevelObjective[];
  
  starThresholds: {
    one: number;
    two: number;
    three: number;
  };

  rewards: {
    baseCoins: number;
  };
}

export interface WorldConfig {
  id: string;
  name: string;
  description: string;
  themeColor: string;
  bgGradient: string;
  levelStart: number;
  levelEnd: number;
  fruitPool: string[]; 
}
