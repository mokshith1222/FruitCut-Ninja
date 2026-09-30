import { create } from 'zustand';
import { DEFAULT_CHALLENGE_SAVE, type ChallengeSaveData } from './ChallengeSaveData';
import { DateUtils } from './DateUtils';
import { CHALLENGE_REGISTRY, getAllChallengesByCategory } from './ChallengeDefinitions';
import { DynamicQuestGenerator } from './DynamicQuestGenerator';
import type { 
  ChallengeObjectiveType, 
  ChallengeProgressData, 
  ChallengeDefinition 
} from './ChallengeTypes';

interface ChallengeState extends ChallengeSaveData {
  loadData: (data: Partial<ChallengeSaveData>) => void;
  initializeChallenges: () => void;
  recordEvent: (type: ChallengeObjectiveType, amount: number, mode?: string) => void;
  claimReward: (challengeId: string) => number; // Returns coins earned
  rerollChallenge: (challengeId: string) => boolean;
  addBountyQuest: () => void;
  getDefinition: (challengeId: string) => ChallengeDefinition | undefined;
}

export const useChallengeState = create<ChallengeState>((set, get) => ({
  ...DEFAULT_CHALLENGE_SAVE,

  getDefinition: (challengeId: string) => {
    const s = get();
    return s.dynamicDefinitions?.[challengeId] || CHALLENGE_REGISTRY[challengeId];
  },

  loadData: (data) => {
    set({ ...DEFAULT_CHALLENGE_SAVE, ...data });
  },

  initializeChallenges: () => {
    set((state) => {
      const today = DateUtils.getTodayDateString();
      const currentWeek = DateUtils.getWeekIdString();
      let newState = { ...state };
      let changed = false;

      // Ensure dynamicDefinitions and bounties containers exist
      if (!newState.dynamicDefinitions) {
        newState.dynamicDefinitions = {};
        changed = true;
      }
      if (!newState.bounties) {
        newState.bounties = [];
        changed = true;
      }

      // --- Daily Reroll Allowance ---
      if (newState.lastRerollDate !== today) {
        newState.freeRerollsRemaining = 3;
        newState.lastRerollDate = today;
        changed = true;
      }

      // --- Streak Logic ---
      if (newState.streak.lastActiveDate !== today) {
        if (!newState.streak.lastActiveDate) {
          newState.streak = { ...newState.streak, current: 1, lastActiveDate: today, best: 1 };
        } else if (DateUtils.isYesterday(newState.streak.lastActiveDate)) {
          const newCurrent = newState.streak.current + 1;
          newState.streak = {
            current: newCurrent,
            best: Math.max(newState.streak.best, newCurrent),
            lastActiveDate: today
          };
        } else {
          newState.streak = {
            current: 1,
            best: Math.max(newState.streak.best, 1),
            lastActiveDate: today
          };
        }
        changed = true;
      }

      // --- Dynamic Daily Challenges ---
      if (!newState.daily || newState.daily.date !== today) {
        const dailies = DynamicQuestGenerator.generateDailySet(today);
        const updatedDefs = { ...newState.dynamicDefinitions };
        dailies.forEach(d => { updatedDefs[d.id] = d; });
        newState.dynamicDefinitions = updatedDefs;

        newState.daily = {
          date: today,
          challenges: dailies.map(d => ({
            challengeId: d.id,
            state: 'AVAILABLE',
            progress: {}
          }))
        };
        changed = true;
      }

      // --- Dynamic Weekly Challenges ---
      if (!newState.weekly || newState.weekly.weekId !== currentWeek) {
        const weeklies = DynamicQuestGenerator.generateWeeklySet(currentWeek);
        const updatedDefs = { ...newState.dynamicDefinitions };
        weeklies.forEach(w => { updatedDefs[w.id] = w; });
        newState.dynamicDefinitions = updatedDefs;

        newState.weekly = {
          weekId: currentWeek,
          challenges: weeklies.map(w => ({
            challengeId: w.id,
            state: 'AVAILABLE',
            progress: {}
          }))
        };
        changed = true;
      }

      // --- Dynamic Continuous Bounties ---
      const activeBounties = newState.bounties.filter(b => b.state !== 'CLAIMED');
      if (activeBounties.length < 2) {
        const updatedDefs = { ...newState.dynamicDefinitions };
        const updatedBounties = [...newState.bounties];
        while (updatedBounties.filter(b => b.state !== 'CLAIMED').length < 2) {
          const bounty = DynamicQuestGenerator.generateBountyQuest();
          updatedDefs[bounty.id] = bounty;
          updatedBounties.push({
            challengeId: bounty.id,
            state: 'AVAILABLE',
            progress: {}
          });
          changed = true;
        }
        newState.dynamicDefinitions = updatedDefs;
        newState.bounties = updatedBounties;
      }

      // --- Milestones ---
      const milestones = getAllChallengesByCategory('MILESTONE');
      let milestonesChanged = false;
      const newMilestones = { ...newState.milestones };
      
      for (const ms of milestones) {
        if (!newMilestones[ms.id]) {
          newMilestones[ms.id] = {
            challengeId: ms.id,
            state: 'AVAILABLE',
            progress: {}
          };
          milestonesChanged = true;
        }
      }
      
      if (milestonesChanged) {
        newState.milestones = newMilestones;
        changed = true;
      }

      if (changed) {
        setTimeout(() => {
          import('../save/AppSaveManager').then(m => m.AppSaveManager.save());
        }, 0);
      }
      return newState;
    });
  },

  rerollChallenge: (challengeId: string) => {
    let success = false;
    set((state) => {
      if (state.freeRerollsRemaining <= 0) return state;

      let isDaily = false;
      let isBounty = false;
      let targetIndex = -1;

      if (state.daily?.challenges) {
        targetIndex = state.daily.challenges.findIndex(c => c.challengeId === challengeId && c.state !== 'CLAIMED');
        if (targetIndex !== -1) isDaily = true;
      }
      if (!isDaily && state.bounties) {
        targetIndex = state.bounties.findIndex(c => c.challengeId === challengeId && c.state !== 'CLAIMED');
        if (targetIndex !== -1) isBounty = true;
      }

      if (targetIndex === -1) return state;

      const oldDef = state.dynamicDefinitions?.[challengeId] || CHALLENGE_REGISTRY[challengeId];
      const newQuest = DynamicQuestGenerator.generateQuest(
        'DAILY',
        oldDef?.difficulty,
        Date.now() + Math.random() * 9999
      );

      const updatedDefs = { ...state.dynamicDefinitions, [newQuest.id]: newQuest };
      const newProgress: ChallengeProgressData = {
        challengeId: newQuest.id,
        state: 'AVAILABLE',
        progress: {}
      };

      let newDaily = state.daily;
      let newBounties = state.bounties;

      if (isDaily && state.daily) {
        const challenges = [...state.daily.challenges];
        challenges[targetIndex] = newProgress;
        newDaily = { ...state.daily, challenges };
      } else if (isBounty) {
        newBounties = [...state.bounties];
        newBounties[targetIndex] = newProgress;
      }

      success = true;
      setTimeout(() => {
        import('../save/AppSaveManager').then(m => m.AppSaveManager.save());
      }, 0);

      return {
        daily: newDaily,
        bounties: newBounties,
        dynamicDefinitions: updatedDefs,
        freeRerollsRemaining: state.freeRerollsRemaining - 1
      };
    });
    return success;
  },

  addBountyQuest: () => {
    set((state) => {
      const newBounty = DynamicQuestGenerator.generateBountyQuest();
      const updatedDefs = { ...state.dynamicDefinitions, [newBounty.id]: newBounty };
      const updatedBounties = [
        ...state.bounties,
        {
          challengeId: newBounty.id,
          state: 'AVAILABLE' as const,
          progress: {}
        }
      ];

      setTimeout(() => {
        import('../save/AppSaveManager').then(m => m.AppSaveManager.save());
      }, 0);

      return {
        dynamicDefinitions: updatedDefs,
        bounties: updatedBounties
      };
    });
  },

  recordEvent: (type, amount, mode) => {
    set((state) => {
      let changed = false;
      
      const processList = (list: ChallengeProgressData[] | undefined) => {
        if (!list) return false;
        let listChanged = false;
        
        for (const prog of list) {
          if (prog.state === 'COMPLETED' || prog.state === 'CLAIMED' || prog.state === 'LOCKED' || prog.state === 'EXPIRED') continue;
          
          const def = state.dynamicDefinitions?.[prog.challengeId] || CHALLENGE_REGISTRY[prog.challengeId];
          if (!def) continue;

          let reqChanged = false;
          let allReqsMet = true;

          def.requirements.forEach((req, idx) => {
            if (req.type === type) {
              if (!req.modeRestriction || req.modeRestriction === mode) {
                const currentVal = prog.progress[idx] || 0;
                if (currentVal < req.target) {
                  let nextVal = 0;
                  if (type === 'COMBO_UPDATED' || type === 'ENDLESS_SCORE' || type === 'TIME_ATTACK_SCORE' || type === 'ENDLESS_FRUIT_MILESTONE') {
                    nextVal = Math.max(currentVal, amount);
                  } else {
                    nextVal = currentVal + amount;
                  }

                  prog.progress[idx] = Math.min(nextVal, req.target);
                  
                  if (prog.progress[idx] > currentVal) {
                    reqChanged = true;
                  }
                }
              }
            }
            
            if ((prog.progress[idx] || 0) < req.target) {
              allReqsMet = false;
            }
          });

          if (reqChanged) {
            listChanged = true;
            if (prog.state === 'AVAILABLE') prog.state = 'ACTIVE';
          }
          
          if (allReqsMet && (prog.state as string) !== 'COMPLETED') {
            prog.state = 'COMPLETED';
            listChanged = true;
          }
        }
        return listChanged;
      };

      const dailyChanged = processList(state.daily?.challenges);
      const weeklyChanged = processList(state.weekly?.challenges);
      const bountiesChanged = processList(state.bounties);
      
      const msList = Object.values(state.milestones);
      const msChanged = processList(msList);

      changed = dailyChanged || weeklyChanged || bountiesChanged || msChanged;

      if (changed) {
        setTimeout(() => {
          import('../save/AppSaveManager').then(m => m.AppSaveManager.save());
        }, 0);
        return {
          daily: state.daily ? { ...state.daily } : null,
          weekly: state.weekly ? { ...state.weekly } : null,
          bounties: [...state.bounties],
          milestones: { ...state.milestones }
        };
      }

      return state;
    });
  },

  claimReward: (challengeId) => {
    let rewardGiven = 0;
    set((state) => {
      let target: ChallengeProgressData | null = null;
      let isBounty = false;
      
      // Find the challenge
      if (state.daily?.challenges.find(c => c.challengeId === challengeId)) {
        target = state.daily.challenges.find(c => c.challengeId === challengeId)!;
      } else if (state.weekly?.challenges.find(c => c.challengeId === challengeId)) {
        target = state.weekly.challenges.find(c => c.challengeId === challengeId)!;
      } else if (state.bounties.find(c => c.challengeId === challengeId)) {
        target = state.bounties.find(c => c.challengeId === challengeId)!;
        isBounty = true;
      } else if (state.milestones[challengeId]) {
        target = state.milestones[challengeId];
      }

      if (target && target.state === 'COMPLETED') {
        const def = state.dynamicDefinitions?.[challengeId] || CHALLENGE_REGISTRY[challengeId];
        if (def) {
          target.state = 'CLAIMED';
          rewardGiven = def.rewardCoins;
          setTimeout(() => {
            import('../save/AppSaveManager').then(m => m.AppSaveManager.save());
          }, 0);
        }
      }

      // If a bounty was claimed, automatically generate a new one so player never runs out of quests
      let updatedBounties = [...state.bounties];
      let updatedDefs = { ...state.dynamicDefinitions };
      if (isBounty && rewardGiven > 0) {
        const replacementBounty = DynamicQuestGenerator.generateBountyQuest();
        updatedDefs[replacementBounty.id] = replacementBounty;
        updatedBounties.push({
          challengeId: replacementBounty.id,
          state: 'AVAILABLE',
          progress: {}
        });
      }
      
      return {
        daily: state.daily ? { ...state.daily } : null,
        weekly: state.weekly ? { ...state.weekly } : null,
        bounties: updatedBounties,
        dynamicDefinitions: updatedDefs,
        milestones: { ...state.milestones }
      };
    });
    return rewardGiven;
  }
}));
