export interface FruitSlicedPayload {
  x: number;
  y: number;
  fruitId: string;
  sliceAngle?: number;
  sliceLine?: { x1: number; y1: number; x2: number; y2: number };
  isBomb?: boolean;
  isSpecial?: boolean;
  points?: number;
  combo?: number;
  isPerfect?: boolean;
  juiceColor?: number;
}

export interface BombHitPayload {
  x: number;
  y: number;
}

export interface ComboPayload {
  combo: number;
  x: number;
  y: number;
}

export interface LevelResultPayload {
  success: boolean;
  stars?: number;
  score?: number;
}

export interface RewardPayload {
  type: string;
  amount?: number;
}

export const GameFeelEventTypes = {
  FRUIT_SLICED: 'GF_FRUIT_SLICED',
  PERFECT_CUT: 'GF_PERFECT_CUT',
  BOMB_HIT: 'GF_BOMB_HIT',
  BOMB_NEAR_MISS: 'GF_BOMB_NEAR_MISS',
  COMBO_UPDATED: 'GF_COMBO_UPDATED',
  LEVEL_COMPLETE: 'GF_LEVEL_COMPLETE',
  LEVEL_FAILED: 'GF_LEVEL_FAILED',
  REWARD_CLAIM: 'GF_REWARD_CLAIM',
  PURCHASE: 'GF_PURCHASE',
  MILESTONE: 'GF_MILESTONE',
  TIME_ATTACK_URGENCY: 'GF_TIME_ATTACK_URGENCY',
  BUTTON_TAP: 'GF_BUTTON_TAP',
} as const;

export type GameFeelEventType = typeof GameFeelEventTypes[keyof typeof GameFeelEventTypes];
