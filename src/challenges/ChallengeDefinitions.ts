import type { ChallengeDefinition } from './ChallengeTypes';

export const CHALLENGE_REGISTRY: Record<string, ChallengeDefinition> = {
  // ==========================================
  // DAILY CHALLENGES (EASY)
  // ==========================================
  'daily_slice_100': {
    id: 'daily_slice_100',
    category: 'DAILY',
    title: 'Fruit Novice',
    description: 'Slice 100 fruits in any mode',
    difficulty: 'EASY',
    requirements: [{ type: 'FRUIT_SLICED', target: 100 }],
    rewardCoins: 50,
  },
  'daily_score_2500': {
    id: 'daily_score_2500',
    category: 'DAILY',
    title: 'Warming Up',
    description: 'Score 2,500 points',
    difficulty: 'EASY',
    requirements: [{ type: 'ENDLESS_SCORE', target: 2500 }],
    rewardCoins: 50,
  },
  'daily_level_1': {
    id: 'daily_level_1',
    category: 'DAILY',
    title: 'Quick Play',
    description: 'Complete 1 level',
    difficulty: 'EASY',
    requirements: [{ type: 'LEVEL_COMPLETED', target: 1, modeRestriction: 'level' }],
    rewardCoins: 75,
  },
  
  // ==========================================
  // DAILY CHALLENGES (MEDIUM)
  // ==========================================
  'daily_combo_15': {
    id: 'daily_combo_15',
    category: 'DAILY',
    title: 'Combo Striker',
    description: 'Reach a 15x combo in any mode',
    difficulty: 'MEDIUM',
    requirements: [{ type: 'COMBO_UPDATED', target: 15 }],
    rewardCoins: 120,
  },
  'daily_level_3': {
    id: 'daily_level_3',
    category: 'DAILY',
    title: 'Dedicated Slicer',
    description: 'Complete 3 levels',
    difficulty: 'MEDIUM',
    requirements: [{ type: 'LEVEL_COMPLETED', target: 3, modeRestriction: 'level' }],
    rewardCoins: 150,
  },
  'daily_no_bomb_endless': {
    id: 'daily_no_bomb_endless',
    category: 'DAILY',
    title: 'Bomb Dodger',
    description: 'Avoid 15 bombs in Endless Mode',
    difficulty: 'MEDIUM',
    requirements: [{ type: 'BOMB_AVOIDED', target: 15, modeRestriction: 'endless' }],
    rewardCoins: 150,
  },

  // ==========================================
  // DAILY CHALLENGES (HARD)
  // ==========================================
  'daily_score_15k': {
    id: 'daily_score_15k',
    category: 'DAILY',
    title: 'Score Attacker',
    description: 'Score 15,000 points in Time Attack',
    difficulty: 'HARD',
    requirements: [{ type: 'TIME_ATTACK_SCORE', target: 15000, modeRestriction: 'time_attack' }],
    rewardCoins: 300,
  },
  'daily_perfect_25': {
    id: 'daily_perfect_25',
    category: 'DAILY',
    title: 'Precision Master',
    description: 'Perform 25 perfect cuts',
    difficulty: 'HARD',
    requirements: [{ type: 'PERFECT_CUT', target: 25 }],
    rewardCoins: 350,
  },

  // ==========================================
  // WEEKLY CHALLENGES (HARD/EPIC)
  // ==========================================
  'weekly_slice_2500': {
    id: 'weekly_slice_2500',
    category: 'WEEKLY',
    title: 'Fruit Annihilator',
    description: 'Slice 2,500 fruits across all modes',
    difficulty: 'HARD',
    requirements: [{ type: 'FRUIT_SLICED', target: 2500 }],
    rewardCoins: 1000,
  },
  'weekly_score_100k': {
    id: 'weekly_score_100k',
    category: 'WEEKLY',
    title: 'Score Legend',
    description: 'Accumulate 100,000 total points',
    difficulty: 'EPIC',
    requirements: [{ type: 'ENDLESS_SCORE', target: 100000 }], // Reusing score tracking event
    rewardCoins: 1500,
  },
  'weekly_level_15': {
    id: 'weekly_level_15',
    category: 'WEEKLY',
    title: 'Level Conqueror',
    description: 'Complete 15 levels',
    difficulty: 'HARD',
    requirements: [{ type: 'LEVEL_COMPLETED', target: 15, modeRestriction: 'level' }],
    rewardCoins: 1200,
  },
  'weekly_time_attack_5': {
    id: 'weekly_time_attack_5',
    category: 'WEEKLY',
    title: 'Time Traveler',
    description: 'Complete 5 Time Attack runs',
    difficulty: 'HARD',
    requirements: [{ type: 'TIME_ATTACK_COMPLETED', target: 5, modeRestriction: 'time_attack' }],
    rewardCoins: 800,
  },

  // ==========================================
  // MILESTONES (MASTER)
  // ==========================================
  'ms_first_slice': {
    id: 'ms_first_slice',
    category: 'MILESTONE',
    title: 'First Blood',
    description: 'Slice your first fruit',
    difficulty: 'EASY',
    requirements: [{ type: 'FRUIT_SLICED', target: 1 }],
    rewardCoins: 100,
  },
  'ms_slice_10k': {
    id: 'ms_slice_10k',
    category: 'MILESTONE',
    title: 'Fruit Master',
    description: 'Slice 10,000 fruits',
    difficulty: 'MASTER',
    requirements: [{ type: 'FRUIT_SLICED', target: 10000 }],
    rewardCoins: 5000,
  },
  'ms_combo_25': {
    id: 'ms_combo_25',
    category: 'MILESTONE',
    title: 'Combo God',
    description: 'Reach a 25x combo',
    difficulty: 'EPIC',
    requirements: [{ type: 'COMBO_UPDATED', target: 25 }],
    rewardCoins: 2500,
  },
  'ms_perfect_500': {
    id: 'ms_perfect_500',
    category: 'MILESTONE',
    title: 'Surgeon',
    description: 'Perform 500 perfect cuts',
    difficulty: 'MASTER',
    requirements: [{ type: 'PERFECT_CUT', target: 500 }],
    rewardCoins: 3000,
  },
  'ms_levels_50': {
    id: 'ms_levels_50',
    category: 'MILESTONE',
    title: 'Journey Halfway',
    description: 'Complete 50 levels',
    difficulty: 'EPIC',
    requirements: [{ type: 'LEVEL_COMPLETED', target: 50, modeRestriction: 'level' }],
    rewardCoins: 4000,
  },
  'ms_endless_1000': {
    id: 'ms_endless_1000',
    category: 'MILESTONE',
    title: 'Survivor',
    description: 'Slice 1,000 fruits in a single Endless run',
    difficulty: 'MASTER',
    requirements: [{ type: 'ENDLESS_FRUIT_MILESTONE', target: 1000, modeRestriction: 'endless' }],
    rewardCoins: 5000,
  },
  'ms_own_10_cosmetics': {
    id: 'ms_own_10_cosmetics',
    category: 'MILESTONE',
    title: 'Collector',
    description: 'Own 10 cosmetic items',
    difficulty: 'EPIC',
    requirements: [{ type: 'COSMETIC_PURCHASED', target: 10 }],
    rewardCoins: 2000,
  },
};

export const getAllChallengesByCategory = (category: 'DAILY' | 'WEEKLY' | 'MILESTONE') => {
  return Object.values(CHALLENGE_REGISTRY).filter(c => c.category === category);
};
