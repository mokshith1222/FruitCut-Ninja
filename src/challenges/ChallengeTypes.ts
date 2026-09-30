export type ChallengeCategory = 'DAILY' | 'WEEKLY' | 'MILESTONE';
export type ChallengeDifficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'EPIC' | 'MASTER';
export type ChallengeState = 'LOCKED' | 'AVAILABLE' | 'ACTIVE' | 'COMPLETED' | 'CLAIMED' | 'EXPIRED';

// Types of events that can progress a challenge
export type ChallengeObjectiveType = 
  | 'FRUIT_SLICED' 
  | 'PERFECT_CUT' 
  | 'COMBO_UPDATED' 
  | 'BOMB_AVOIDED' 
  | 'BOMB_HIT' 
  | 'LEVEL_COMPLETED' 
  | 'LEVEL_FAILED' 
  | 'THREE_STAR_EARNED' 
  | 'TIME_ATTACK_COMPLETED' 
  | 'TIME_ATTACK_SCORE' 
  | 'ENDLESS_FRUIT_MILESTONE' 
  | 'ENDLESS_SCORE' 
  | 'COINS_EARNED' 
  | 'COSMETIC_PURCHASED' 
  | 'COSMETIC_EQUIPPED';

export interface ChallengeRequirement {
  type: ChallengeObjectiveType;
  target: number;
  modeRestriction?: 'level' | 'time_attack' | 'endless'; // null/undefined means any mode
}

export interface ChallengeDefinition {
  id: string;
  category: ChallengeCategory;
  title: string;
  description: string;
  difficulty: ChallengeDifficulty;
  requirements: ChallengeRequirement[];
  rewardCoins: number;
}

export interface ChallengeProgressData {
  challengeId: string;
  state: ChallengeState;
  progress: Record<number, number>; // Maps requirement index to current progress value
}

export interface DailyChallengeSet {
  date: string; // YYYY-MM-DD
  challenges: ChallengeProgressData[];
}

export interface WeeklyChallengeSet {
  weekId: string; // YYYY-Www
  challenges: ChallengeProgressData[];
}
