export type HapticLevel = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | null;

export interface ScreenShakeConfig {
  intensity: number;
  durationMs: number;
}

export interface FeedbackPreset {
  soundId?: string;
  hapticLevel?: HapticLevel;
  screenShake?: ScreenShakeConfig | null;
  hitStopMs?: number;
  particleAmount?: number;
  popupStyle?: 'normal' | 'perfect' | 'combo' | 'milestone';
}

export const FEEDBACK_PRESETS: Record<string, FeedbackPreset> = {
  LIGHT_SLICE: {
    soundId: 'cut_light',
    hapticLevel: 'light',
    screenShake: null,
    hitStopMs: 0,
    particleAmount: 10,
    popupStyle: 'normal'
  },
  MEDIUM_SLICE: {
    soundId: 'cut_medium',
    hapticLevel: 'light',
    screenShake: null,
    hitStopMs: 0,
    particleAmount: 14,
    popupStyle: 'normal'
  },
  HEAVY_SLICE: {
    soundId: 'cut_heavy',
    hapticLevel: 'medium',
    screenShake: { intensity: 0.004, durationMs: 100 },
    hitStopMs: 0,
    particleAmount: 18,
    popupStyle: 'normal'
  },
  PERFECT_CUT: {
    soundId: 'perfect_cut',
    hapticLevel: 'medium',
    screenShake: { intensity: 0.008, durationMs: 140 },
    hitStopMs: 35,
    particleAmount: 22,
    popupStyle: 'perfect'
  },
  COMBO_START: {
    soundId: 'combo_low',
    hapticLevel: 'light',
    screenShake: null,
    hitStopMs: 0,
    particleAmount: 12,
    popupStyle: 'combo'
  },
  COMBO_HIGH: {
    soundId: 'combo_high',
    hapticLevel: 'medium',
    screenShake: { intensity: 0.007, durationMs: 150 },
    hitStopMs: 0,
    particleAmount: 20,
    popupStyle: 'combo'
  },
  COMBO_FRENZY: {
    soundId: 'combo_frenzy',
    hapticLevel: 'heavy',
    screenShake: { intensity: 0.014, durationMs: 220 },
    hitStopMs: 30,
    particleAmount: 28,
    popupStyle: 'combo'
  },
  BOMB_NEAR_MISS: {
    soundId: 'bomb_fuse',
    hapticLevel: 'light',
    screenShake: { intensity: 0.004, durationMs: 120 },
    hitStopMs: 0,
    particleAmount: 6,
    popupStyle: 'normal'
  },
  BOMB_HIT: {
    soundId: 'bomb',
    hapticLevel: 'warning',
    screenShake: { intensity: 0.024, durationMs: 320 },
    hitStopMs: 75,
    particleAmount: 30,
    popupStyle: 'normal'
  },
  LEVEL_COMPLETE: {
    soundId: 'win',
    hapticLevel: 'success',
    screenShake: { intensity: 0.005, durationMs: 200 },
    hitStopMs: 0,
    particleAmount: 25,
    popupStyle: 'milestone'
  },
  LEVEL_FAILED: {
    soundId: 'fail',
    hapticLevel: 'warning',
    screenShake: { intensity: 0.012, durationMs: 250 },
    hitStopMs: 0,
    particleAmount: 10,
    popupStyle: 'normal'
  },
  REWARD_CLAIM: {
    soundId: 'reward',
    hapticLevel: 'success',
    screenShake: null,
    hitStopMs: 0,
    particleAmount: 15,
    popupStyle: 'milestone'
  },
  PURCHASE: {
    soundId: 'purchase',
    hapticLevel: 'success',
    screenShake: null,
    hitStopMs: 0,
    particleAmount: 10,
    popupStyle: 'normal'
  },
  MILESTONE: {
    soundId: 'milestone',
    hapticLevel: 'success',
    screenShake: { intensity: 0.008, durationMs: 180 },
    hitStopMs: 0,
    particleAmount: 25,
    popupStyle: 'milestone'
  },
  NEW_RECORD: {
    soundId: 'win',
    hapticLevel: 'success',
    screenShake: { intensity: 0.01, durationMs: 220 },
    hitStopMs: 0,
    particleAmount: 30,
    popupStyle: 'milestone'
  },
  BUTTON_TAP: {
    soundId: 'click',
    hapticLevel: 'light',
    screenShake: null,
    hitStopMs: 0,
    particleAmount: 0,
    popupStyle: 'normal'
  }
};
