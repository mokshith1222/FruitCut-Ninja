import type { DailyChallengeSet, WeeklyChallengeSet, ChallengeProgressData, ChallengeDefinition } from './ChallengeTypes';

export interface ChallengeSaveData {
  daily: DailyChallengeSet | null;
  weekly: WeeklyChallengeSet | null;
  bounties: ChallengeProgressData[];
  milestones: Record<string, ChallengeProgressData>;
  dynamicDefinitions: Record<string, ChallengeDefinition>;
  freeRerollsRemaining: number;
  lastRerollDate: string | null;
  streak: {
    current: number;
    best: number;
    lastActiveDate: string | null;
  };
}

export const DEFAULT_CHALLENGE_SAVE: ChallengeSaveData = {
  daily: null,
  weekly: null,
  bounties: [],
  milestones: {},
  dynamicDefinitions: {},
  freeRerollsRemaining: 3,
  lastRerollDate: null,
  streak: {
    current: 0,
    best: 0,
    lastActiveDate: null
  }
};
