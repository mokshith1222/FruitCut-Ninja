import type { 
  ChallengeCategory, 
  ChallengeDefinition, 
  ChallengeDifficulty, 
  ChallengeObjectiveType 
} from './ChallengeTypes';

export interface QuestTemplate {
  type: ChallengeObjectiveType;
  titleVariants: string[];
  descriptionTemplate: (target: number, modeRestriction?: string) => string;
  icon: string;
  targetsByDifficulty: Record<ChallengeDifficulty, number[]>;
  baseCoins: Record<ChallengeDifficulty, number>;
  modeRestriction?: 'level' | 'time_attack' | 'endless';
}

const QUEST_TEMPLATES: QuestTemplate[] = [
  // 1. Fruit Slicing
  {
    type: 'FRUIT_SLICED',
    icon: '🍉',
    titleVariants: ['Fruit Frenzy', 'Blade Novice', 'Harvest Rush', 'Fruit Hurricane', 'Master Harvester'],
    descriptionTemplate: (t) => `Slice ${t.toLocaleString()} fruits in any mode`,
    targetsByDifficulty: {
      EASY: [50, 75, 100],
      MEDIUM: [150, 200, 250],
      HARD: [350, 450, 600],
      EPIC: [800, 1000, 1500],
      MASTER: [2000, 3000, 5000]
    },
    baseCoins: { EASY: 60, MEDIUM: 140, HARD: 280, EPIC: 600, MASTER: 1200 }
  },

  // 2. Perfect Cuts
  {
    type: 'PERFECT_CUT',
    icon: '🎯',
    titleVariants: ['Center Cut', 'Laser Precision', 'Surgical Blade', 'Razor Focus', 'Zen Slicer'],
    descriptionTemplate: (t) => `Execute ${t} perfect center-cut slices`,
    targetsByDifficulty: {
      EASY: [5, 8, 10],
      MEDIUM: [15, 20, 25],
      HARD: [35, 45, 50],
      EPIC: [80, 100, 150],
      MASTER: [200, 300, 500]
    },
    baseCoins: { EASY: 75, MEDIUM: 160, HARD: 320, EPIC: 700, MASTER: 1500 }
  },

  // 3. Combos
  {
    type: 'COMBO_UPDATED',
    icon: '⚡',
    titleVariants: ['Combo Chain', 'Flurry Striker', 'Chain Reaction', 'Combo Virtuoso', 'Infinite Flow'],
    descriptionTemplate: (t) => `Reach a ${t}x combo streak`,
    targetsByDifficulty: {
      EASY: [3, 4, 5],
      MEDIUM: [6, 8, 10],
      HARD: [12, 14, 16],
      EPIC: [18, 20, 25],
      MASTER: [30, 40, 50]
    },
    baseCoins: { EASY: 70, MEDIUM: 150, HARD: 300, EPIC: 650, MASTER: 1300 }
  },

  // 4. Endless Score
  {
    type: 'ENDLESS_SCORE',
    icon: '♾️',
    titleVariants: ['Endless Trial', 'Survivalist', 'Endless Voyager', 'Perpetual Slicer', 'Endless Demigod'],
    descriptionTemplate: (t) => `Score ${t.toLocaleString()} points in Endless Mode`,
    modeRestriction: 'endless',
    targetsByDifficulty: {
      EASY: [2500, 3500, 5000],
      MEDIUM: [7500, 10000, 12500],
      HARD: [18000, 25000, 35000],
      EPIC: [50000, 75000, 100000],
      MASTER: [150000, 250000, 500000]
    },
    baseCoins: { EASY: 80, MEDIUM: 170, HARD: 350, EPIC: 750, MASTER: 1600 }
  },

  // 5. Time Attack Score
  {
    type: 'TIME_ATTACK_SCORE',
    icon: '⏱️',
    titleVariants: ['Clock Buster', 'Speed Slicer', 'Blitz Runner', 'Time Tempest', 'Chrono Master'],
    descriptionTemplate: (t) => `Score ${t.toLocaleString()} points in Time Attack`,
    modeRestriction: 'time_attack',
    targetsByDifficulty: {
      EASY: [4000, 6000, 8000],
      MEDIUM: [12000, 16000, 20000],
      HARD: [25000, 35000, 45000],
      EPIC: [60000, 80000, 120000],
      MASTER: [150000, 200000, 300000]
    },
    baseCoins: { EASY: 80, MEDIUM: 170, HARD: 350, EPIC: 750, MASTER: 1600 }
  },

  // 6. Level Campaign Completion
  {
    type: 'LEVEL_COMPLETED',
    icon: '🏆',
    titleVariants: ['Dojo Progress', 'Level Climber', 'Stage Conqueror', 'Expedition Master', 'Grand Champion'],
    descriptionTemplate: (t) => `Complete ${t} level${t > 1 ? 's' : ''} in Campaign Mode`,
    modeRestriction: 'level',
    targetsByDifficulty: {
      EASY: [1, 2],
      MEDIUM: [3, 4],
      HARD: [5, 6, 8],
      EPIC: [10, 12, 15],
      MASTER: [20, 25, 30]
    },
    baseCoins: { EASY: 75, MEDIUM: 160, HARD: 320, EPIC: 700, MASTER: 1400 }
  },

  // 7. Hazard Evasion
  {
    type: 'BOMB_AVOIDED',
    icon: '💣',
    titleVariants: ['Danger Aversion', 'Bomb Dodger', 'Iron Reflexes', 'Blast Evader', 'Untouchable'],
    descriptionTemplate: (t) => `Safely let ${t} bombs pass without exploding`,
    targetsByDifficulty: {
      EASY: [5, 8, 10],
      MEDIUM: [15, 20, 25],
      HARD: [30, 40, 50],
      EPIC: [75, 100, 150],
      MASTER: [200, 300, 400]
    },
    baseCoins: { EASY: 70, MEDIUM: 150, HARD: 300, EPIC: 650, MASTER: 1350 }
  }
];

export class DynamicQuestGenerator {
  /**
   * Generates a single dynamic quest with procedural parameters
   */
  static generateQuest(
    category: ChallengeCategory = 'DAILY',
    preferredDifficulty?: ChallengeDifficulty,
    seedModifier: number = Math.random() * 10000
  ): ChallengeDefinition {
    // Select difficulty
    const difficulties: ChallengeDifficulty[] = ['EASY', 'MEDIUM', 'HARD'];
    const difficulty: ChallengeDifficulty = preferredDifficulty || 
      difficulties[Math.floor(Math.abs(Math.sin(seedModifier)) * difficulties.length)];

    // Select random template
    const templateIndex = Math.floor(Math.abs(Math.cos(seedModifier * 1.3)) * QUEST_TEMPLATES.length);
    const template = QUEST_TEMPLATES[templateIndex];

    // Pick target from difficulty brackets
    const targetPool = template.targetsByDifficulty[difficulty];
    const targetIndex = Math.floor(Math.abs(Math.sin(seedModifier * 2.7)) * targetPool.length);
    const target = targetPool[targetIndex];

    // Pick title
    const titleIndex = Math.floor(Math.abs(Math.cos(seedModifier * 3.1)) * template.titleVariants.length);
    const title = `${template.icon} ${template.titleVariants[titleIndex]}`;

    // Calculate reward with random variance (+/- 10%)
    const baseCoin = template.baseCoins[difficulty];
    const variance = 0.9 + Math.abs(Math.sin(seedModifier * 4.9)) * 0.2;
    const rewardCoins = Math.round((baseCoin * (target / targetPool[0]) * 0.75 + baseCoin * 0.25) * variance / 10) * 10;

    const id = `dyn_${template.type.toLowerCase()}_${difficulty.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return {
      id,
      category,
      title,
      description: template.descriptionTemplate(target, template.modeRestriction),
      difficulty,
      requirements: [{
        type: template.type,
        target,
        modeRestriction: template.modeRestriction
      }],
      rewardCoins: Math.max(50, rewardCoins)
    };
  }

  /**
   * Generates a balanced set of 3 daily quests (1 Easy, 1 Medium, 1 Hard)
   */
  static generateDailySet(dateSeed: string): ChallengeDefinition[] {
    let seed = 0;
    for (let i = 0; i < dateSeed.length; i++) {
      seed = Math.imul(31, seed) + dateSeed.charCodeAt(i) | 0;
    }

    const easy = this.generateQuest('DAILY', 'EASY', seed + 101);
    const medium = this.generateQuest('DAILY', 'MEDIUM', seed + 203);
    const hard = this.generateQuest('DAILY', 'HARD', seed + 307);

    return [easy, medium, hard];
  }

  /**
   * Generates a high-value set of 3 weekly quests (Hard, Epic, Master)
   */
  static generateWeeklySet(weekSeed: string): ChallengeDefinition[] {
    let seed = 0;
    for (let i = 0; i < weekSeed.length; i++) {
      seed = Math.imul(31, seed) + weekSeed.charCodeAt(i) | 0;
    }

    const hard = this.generateQuest('WEEKLY', 'HARD', seed + 511);
    const epic = this.generateQuest('WEEKLY', 'EPIC', seed + 719);
    const master = this.generateQuest('WEEKLY', 'MASTER', seed + 923);

    return [hard, epic, master];
  }

  /**
   * Generates a quick bounty quest on-demand (continuous gameplay loop)
   */
  static generateBountyQuest(): ChallengeDefinition {
    const diffs: ChallengeDifficulty[] = ['EASY', 'MEDIUM', 'HARD', 'EPIC'];
    const diff = diffs[Math.floor(Math.random() * diffs.length)];
    return this.generateQuest('DAILY', diff, Math.random() * 99999);
  }
}
