export type ObjectiveType = 'CUT_COUNT' | 'SCORE_TARGET' | 'COMBO_TARGET' | 'SURVIVAL' | 'BOSS';

export interface LevelConfig {
  levelId: string;
  worldId: string;
  title: string;
  objectiveType: ObjectiveType;
  targetCount?: number; // for CUT_COUNT
  targetScore?: number; // for SCORE_TARGET
  targetCombo?: number; // for COMBO_TARGET
  timeLimit?: number; // in seconds (for SURVIVAL or timed objectives)
  missLimit?: number; // allowed misses before failure
  noBombsAllowed?: boolean; // if true, cutting a bomb fails instantly
  spawnRateMs: number;
  fruitSpeedMultiplier: number;
  fruitSizeMultiplier: number;
  bombChance: number;
  specialFruitChance: number;
  pattern: 'RANDOM' | 'WAVES' | 'BURST';
  difficultyTier: number;
  rewardCoins: number;
  gravityMultiplier?: number;
}

export const Worlds = {
  WORLD_1: { id: 'world_1', name: 'Tropical Beach' },
  WORLD_2: { id: 'world_2', name: 'The Orchard' },
  WORLD_3: { id: 'world_3', name: 'Frozen Tundra' },
  WORLD_4: { id: 'world_4', name: 'Volcano Peak' },
  WORLD_5: { id: 'world_5', name: 'Deep Space' },
};

// Auto-generate levels for brevity, but handcraft the first 10!
const levels: Record<string, LevelConfig> = {};

// --- HANDCRAFTED LEVELS 1-10 ---
levels['level_1'] = { levelId: 'level_1', worldId: Worlds.WORLD_1.id, title: 'Welcome to Fruit Cut', objectiveType: 'CUT_COUNT', targetCount: 10, spawnRateMs: 1400, fruitSpeedMultiplier: 1.0, fruitSizeMultiplier: 1.2, bombChance: 0, specialFruitChance: 0, pattern: 'WAVES', difficultyTier: 1, rewardCoins: 50 };
levels['level_2'] = { levelId: 'level_2', worldId: Worlds.WORLD_1.id, title: 'More Fruits', objectiveType: 'CUT_COUNT', targetCount: 15, spawnRateMs: 1300, fruitSpeedMultiplier: 1.0, fruitSizeMultiplier: 1.1, bombChance: 0, specialFruitChance: 0, pattern: 'WAVES', difficultyTier: 1, rewardCoins: 60 };
levels['level_3'] = { levelId: 'level_3', worldId: Worlds.WORLD_1.id, title: 'Combo Master', objectiveType: 'COMBO_TARGET', targetCombo: 5, spawnRateMs: 1200, fruitSpeedMultiplier: 1.0, fruitSizeMultiplier: 1.0, bombChance: 0, specialFruitChance: 0, pattern: 'WAVES', difficultyTier: 1, rewardCoins: 70 };
levels['level_4'] = { levelId: 'level_4', worldId: Worlds.WORLD_1.id, title: 'Chain Slice', objectiveType: 'SCORE_TARGET', targetScore: 300, spawnRateMs: 1100, fruitSpeedMultiplier: 1.05, fruitSizeMultiplier: 1.0, bombChance: 0, specialFruitChance: 0, pattern: 'BURST', difficultyTier: 1, rewardCoins: 80 };
levels['level_5'] = { levelId: 'level_5', worldId: Worlds.WORLD_1.id, title: 'Complex Patterns', objectiveType: 'CUT_COUNT', targetCount: 20, spawnRateMs: 1000, fruitSpeedMultiplier: 1.1, fruitSizeMultiplier: 1.0, bombChance: 0, specialFruitChance: 0, pattern: 'WAVES', difficultyTier: 2, rewardCoins: 100 };
levels['level_6'] = { levelId: 'level_6', worldId: Worlds.WORLD_1.id, title: 'Danger Zone', objectiveType: 'CUT_COUNT', targetCount: 15, spawnRateMs: 1200, fruitSpeedMultiplier: 1.0, fruitSizeMultiplier: 1.0, bombChance: 0.2, noBombsAllowed: true, specialFruitChance: 0, pattern: 'WAVES', difficultyTier: 2, rewardCoins: 120 };
levels['level_7'] = { levelId: 'level_7', worldId: Worlds.WORLD_1.id, title: 'Mix it Up', objectiveType: 'SCORE_TARGET', targetScore: 500, spawnRateMs: 1100, fruitSpeedMultiplier: 1.05, fruitSizeMultiplier: 1.0, bombChance: 0.15, specialFruitChance: 0, pattern: 'WAVES', difficultyTier: 2, rewardCoins: 150 };
levels['level_8'] = { levelId: 'level_8', worldId: Worlds.WORLD_1.id, title: 'Special Rewards', objectiveType: 'CUT_COUNT', targetCount: 20, spawnRateMs: 1000, fruitSpeedMultiplier: 1.1, fruitSizeMultiplier: 1.0, bombChance: 0.1, specialFruitChance: 0.2, pattern: 'WAVES', difficultyTier: 2, rewardCoins: 200 };
levels['level_9'] = { levelId: 'level_9', worldId: Worlds.WORLD_1.id, title: 'Survival', objectiveType: 'SURVIVAL', timeLimit: 30, spawnRateMs: 900, fruitSpeedMultiplier: 1.15, fruitSizeMultiplier: 1.0, bombChance: 0.15, specialFruitChance: 0.1, pattern: 'WAVES', difficultyTier: 3, rewardCoins: 250 };
levels['level_10'] = { levelId: 'level_10', worldId: Worlds.WORLD_1.id, title: 'TROPICAL STORM', objectiveType: 'BOSS', targetScore: 2000, timeLimit: 45, spawnRateMs: 700, fruitSpeedMultiplier: 1.25, fruitSizeMultiplier: 1.0, bombChance: 0.2, specialFruitChance: 0.1, pattern: 'BURST', difficultyTier: 4, rewardCoins: 500 };

// --- SPECIAL MODES ---
levels['time_attack'] = { levelId: 'time_attack', worldId: Worlds.WORLD_2.id, title: 'TIME ATTACK', objectiveType: 'SURVIVAL', timeLimit: 60, spawnRateMs: 800, fruitSpeedMultiplier: 1.2, fruitSizeMultiplier: 1.0, bombChance: 0.1, specialFruitChance: 0.2, pattern: 'RANDOM', difficultyTier: 3, rewardCoins: 0 };
levels['endless'] = { levelId: 'endless', worldId: Worlds.WORLD_3.id, title: 'ENDLESS MODE', objectiveType: 'SURVIVAL', missLimit: 3, spawnRateMs: 1200, fruitSpeedMultiplier: 1.0, fruitSizeMultiplier: 1.0, bombChance: 0.15, specialFruitChance: 0.05, pattern: 'RANDOM', difficultyTier: 1, rewardCoins: 0 };


for (let i = 11; i <= 100; i++) {
  const levelId = `level_${i}`;
  
  let worldId = Worlds.WORLD_1.id;
  let title = `Level ${i}`;
  let bombChance = 0.1;
  let specialFruitChance = 0.05;
  let fruitSpeedMultiplier = 1.0;
  let spawnRateMs = 2000;
  
  if (i > 20 && i <= 40) {
    worldId = Worlds.WORLD_2.id;
    bombChance = 0.15; specialFruitChance = 0.08; fruitSpeedMultiplier = 1.2; spawnRateMs = 1800;
  } else if (i > 40 && i <= 60) {
    worldId = Worlds.WORLD_3.id;
    bombChance = 0.2; specialFruitChance = 0.12; fruitSpeedMultiplier = 0.8; spawnRateMs = 1600;
  } else if (i > 60 && i <= 80) {
    worldId = Worlds.WORLD_4.id;
    bombChance = 0.3; specialFruitChance = 0.05; fruitSpeedMultiplier = 1.5; spawnRateMs = 1400;
  } else if (i > 80) {
    worldId = Worlds.WORLD_5.id;
    bombChance = 0.25; specialFruitChance = 0.15; fruitSpeedMultiplier = 1.3; spawnRateMs = 1200;
  }

  const isBoss = i % 20 === 0;
  if (isBoss) title = `BOSS PHASE ${i / 20}`;

  let config: LevelConfig = {
    levelId,
    worldId,
    title,
    objectiveType: isBoss ? 'BOSS' : (i % 3 === 0 ? 'SCORE_TARGET' : (i % 2 === 0 ? 'COMBO_TARGET' : 'CUT_COUNT')),
    targetCount: isBoss ? undefined : 15 + (i * 2),
    targetScore: isBoss ? 10000 * (i/20) : 500 + (i * 150),
    targetCombo: isBoss ? undefined : 5 + Math.floor(i / 10),
    spawnRateMs: isBoss ? Math.max(500, spawnRateMs - 1000) : Math.max(700, spawnRateMs - (i * 10)),
    fruitSpeedMultiplier: isBoss ? fruitSpeedMultiplier * 1.5 : fruitSpeedMultiplier + (i * 0.01),
    fruitSizeMultiplier: isBoss ? 0.6 : Math.max(0.6, 1.0 - (i * 0.003)),
    bombChance: isBoss ? Math.min(0.5, bombChance * 2) : Math.min(0.4, bombChance + (i * 0.002)),
    specialFruitChance,
    pattern: isBoss ? 'BURST' : (i % 2 === 0 ? 'WAVES' : 'RANDOM'),
    difficultyTier: Math.ceil(i / 10),
    rewardCoins: isBoss ? 500 * (i/20) : 50 + (i * 5),
    timeLimit: (isBoss || i % 5 === 0) ? 45 : undefined,
    missLimit: isBoss ? 1 : (i > 40 ? 3 : undefined),
    noBombsAllowed: isBoss ? true : undefined,
  };

  levels[levelId] = config;
}

export const LevelDefinitions = levels;
