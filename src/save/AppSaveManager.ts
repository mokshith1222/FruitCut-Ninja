import { SaveSystem } from './SaveSystem';
import { useProgressionState } from '../progression/ProgressionState';
import { useCoinLedger } from '../economy/CoinLedger';
import { useChallengeState } from '../challenges/ChallengeManager';

export const AppSaveManager = {
  save: () => {
    // Avoid accessing Zustand hooks in the global scope directly if they're not ready,
    // but typically getState() is safe here.
    const progression = useProgressionState.getState();
    const economy = useCoinLedger.getState();
    const challengeState = useChallengeState.getState();
    
    // We filter out functions from the state objects before saving
    const progData = Object.keys(progression).reduce((acc: any, key) => {
      if (typeof (progression as any)[key] !== 'function') acc[key] = (progression as any)[key];
      return acc;
    }, {});
    
    const econData = {
      balance: economy.balance,
      transactions: economy.transactions,
      claimedRewards: economy.claimedRewards
    };
    
    const chalData = {
      daily: challengeState.daily,
      weekly: challengeState.weekly,
      bounties: challengeState.bounties,
      milestones: challengeState.milestones,
      dynamicDefinitions: challengeState.dynamicDefinitions,
      freeRerollsRemaining: challengeState.freeRerollsRemaining,
      lastRerollDate: challengeState.lastRerollDate,
      streak: challengeState.streak
    };
    
    SaveSystem.saveProgress(progData, econData, chalData);
  },
  
  load: () => {
    const data = SaveSystem.loadProgress();
    if (data) {
      if (data.progression) useProgressionState.getState().loadProgress(data.progression);
      if (data.economy) useCoinLedger.getState().load(data.economy);
      if (data.challenges) useChallengeState.getState().loadData(data.challenges);
    }
  }
};
