import { EventBus, GameEvents } from '../core/EventBus';
import { useChallengeState } from './ChallengeManager';

export const ChallengeTracker = {
  initialize: () => {
    // Make sure we have our challenges seeded
    useChallengeState.getState().initializeChallenges();

    EventBus.on(GameEvents.FRUIT_CUT, () => {
      useChallengeState.getState().recordEvent('FRUIT_SLICED', 1);
    });

    EventBus.on(GameEvents.BOMB_HIT, () => {
      useChallengeState.getState().recordEvent('BOMB_HIT', 1);
    });

    EventBus.on(GameEvents.COMBO_CHANGED, (combo: number) => {
      useChallengeState.getState().recordEvent('COMBO_UPDATED', combo);
    });
    
    // Custom events we might need to add or intercept
    EventBus.on('PERFECT_CUT', () => {
      useChallengeState.getState().recordEvent('PERFECT_CUT', 1);
    });

    EventBus.on('BOMB_AVOIDED', (mode: string) => {
      useChallengeState.getState().recordEvent('BOMB_AVOIDED', 1, mode);
    });

    EventBus.on('LEVEL_COMPLETED', (mode: string) => {
      useChallengeState.getState().recordEvent('LEVEL_COMPLETED', 1, mode);
    });
    
    EventBus.on('TIME_ATTACK_COMPLETED', () => {
      useChallengeState.getState().recordEvent('TIME_ATTACK_COMPLETED', 1, 'time_attack');
    });
    
    EventBus.on('TIME_ATTACK_SCORE', (score: number) => {
      useChallengeState.getState().recordEvent('TIME_ATTACK_SCORE', score, 'time_attack');
    });

    EventBus.on('ENDLESS_SCORE', (score: number) => {
      useChallengeState.getState().recordEvent('ENDLESS_SCORE', score, 'endless');
    });
    
    EventBus.on('ENDLESS_FRUIT_MILESTONE', (count: number) => {
      useChallengeState.getState().recordEvent('ENDLESS_FRUIT_MILESTONE', count, 'endless');
    });

    EventBus.on('COSMETIC_PURCHASED', () => {
      useChallengeState.getState().recordEvent('COSMETIC_PURCHASED', 1);
    });
  }
};
