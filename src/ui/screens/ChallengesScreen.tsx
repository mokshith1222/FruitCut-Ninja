import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Screen, CoinChip } from '../components/Layout';
import { IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useChallengeState } from '../../challenges/ChallengeManager';
import { useCoinLedger } from '../../economy/CoinLedger';
import type { ChallengeProgressData, ChallengeDefinition } from '../../challenges/ChallengeTypes';
import { GameFeelManager } from '../../gamefeel/GameFeelManager';
import { DateUtils } from '../../challenges/DateUtils';

const RARITY_COLORS: Record<string, string> = {
  EASY: 'var(--c-text)',
  MEDIUM: '#69f0ae',
  HARD: '#ff9100',
  EPIC: '#e040fb',
  MASTER: '#ff3d00'
};

const ChallengeCard = ({ 
  data, 
  def,
  canReroll,
  onClaim,
  onReroll
}: { 
  data: ChallengeProgressData, 
  def?: ChallengeDefinition,
  canReroll?: boolean,
  onClaim: () => void,
  onReroll?: () => void
}) => {
  if (!def) return null;

  const req = def.requirements[0];
  const progress = data.progress[0] || 0;
  const target = req.target;
  const pct = Math.min((progress / target) * 100, 100);
  
  const isCompleted = data.state === 'COMPLETED';
  const isClaimed = data.state === 'CLAIMED';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      style={{
        position: 'relative',
        background: isCompleted 
          ? 'linear-gradient(135deg, rgba(255,215,0,0.14), rgba(255,160,0,0.08))' 
          : 'var(--c-surface-2)',
        borderRadius: 16,
        padding: 16,
        border: `1px solid ${isCompleted ? 'rgba(255,215,0,0.45)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: isCompleted ? '0 4px 20px rgba(255,215,0,0.15)' : 'none',
        overflow: 'hidden',
        opacity: isClaimed ? 0.5 : 1,
        pointerEvents: isClaimed ? 'none' : 'auto'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ flex: 1, paddingRight: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ 
              fontSize: '0.65rem', 
              fontWeight: 800, 
              letterSpacing: 1, 
              color: RARITY_COLORS[def.difficulty] || 'var(--c-text)',
              background: 'rgba(255,255,255,0.06)',
              padding: '2px 6px',
              borderRadius: 6
            }}>
              {def.difficulty}
            </span>
            {def.requirements[0].modeRestriction && (
              <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                • {def.requirements[0].modeRestriction.replace('_', ' ')}
              </span>
            )}
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>{def.title}</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', marginTop: 2, lineHeight: 1.3 }}>
            {def.description}
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          {isClaimed ? (
             <div style={{ background: 'rgba(0,0,0,0.3)', padding: '4px 10px', borderRadius: 12, fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>
               CLAIMED
             </div>
          ) : isCompleted ? (
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={onClaim}
               style={{
                 background: 'linear-gradient(135deg, #ffd700, #ff9100)', 
                 color: '#000', 
                 border: 'none',
                 padding: '8px 16px', 
                 borderRadius: 20, 
                 fontWeight: 900, 
                 fontSize: '0.8rem',
                 cursor: 'pointer', 
                 boxShadow: '0 4px 14px rgba(255,215,0,0.4)'
               }}
             >
               CLAIM 🪙 {def.rewardCoins}
             </motion.button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ color: 'var(--c-coin)', fontWeight: 800, fontSize: '0.9rem' }}>
                🪙 {def.rewardCoins}
              </div>
              {canReroll && onReroll && (
                <button
                  onClick={onReroll}
                  title="Reroll quest"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.7)',
                    borderRadius: 8,
                    padding: '4px 8px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3
                  }}
                >
                  🔄
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 4, fontWeight: 700 }}>
        <span style={{ color: 'rgba(255,255,255,0.5)' }}>Progress</span>
        <span>{Math.floor(progress)} / {target}</span>
      </div>
      
      <div style={{ height: 6, background: 'rgba(0,0,0,0.35)', borderRadius: 3, overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            height: '100%', 
            background: isCompleted ? 'linear-gradient(90deg, #ffd700, #ffb300)' : 'var(--c-secondary)', 
            borderRadius: 3 
          }}
        />
      </div>
    </motion.div>
  );
};

export const ChallengesScreen = () => {
  const setPhase = useGameState(s => s.setPhase);
  const challengeState = useChallengeState();
  const addTransaction = useCoinLedger(s => s.addTransaction);
  const balance = useCoinLedger(s => s.balance);
  
  const [activeTab, setActiveTab] = useState<'DAILY' | 'WEEKLY' | 'BOUNTIES' | 'MILESTONES'>('DAILY');
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    useChallengeState.getState().initializeChallenges();
  }, []);

  // Live countdown timer update
  useEffect(() => {
    const updateTime = () => {
      if (activeTab === 'DAILY' || activeTab === 'BOUNTIES') {
        setTimeLeft(DateUtils.getTimeUntilMidnight());
      } else if (activeTab === 'WEEKLY') {
        setTimeLeft(DateUtils.getTimeUntilWeekReset());
      } else {
        setTimeLeft('');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const handleClaim = (id: string) => {
    const amount = useChallengeState.getState().claimReward(id);
    if (amount > 0) {
      addTransaction('CHALLENGE_REWARD', amount);
      GameFeelManager.onRewardClaimed();
    }
  };

  const handleReroll = (id: string) => {
    if (challengeState.freeRerollsRemaining <= 0) return;
    const ok = useChallengeState.getState().rerollChallenge(id);
    if (ok) {
      GameFeelManager.onButtonTap();
    }
  };

  const handleAddBounty = () => {
    useChallengeState.getState().addBountyQuest();
    GameFeelManager.onButtonTap();
  };

  const getChallenges = (tab: 'DAILY' | 'WEEKLY' | 'BOUNTIES' | 'MILESTONES') => {
    switch (tab) {
      case 'DAILY': return challengeState.daily?.challenges || [];
      case 'WEEKLY': return challengeState.weekly?.challenges || [];
      case 'BOUNTIES': return challengeState.bounties || [];
      case 'MILESTONES': return Object.values(challengeState.milestones);
    }
  };

  const currentChallenges = getChallenges(activeTab).sort((a, b) => {
    const score = (c: ChallengeProgressData) => {
      if (c.state === 'COMPLETED') return 2;
      if (c.state === 'CLAIMED') return 0;
      return 1;
    };
    return score(b) - score(a);
  });

  const getCompletedCount = (list: ChallengeProgressData[]) => 
    list.filter(c => c.state === 'COMPLETED' || c.state === 'CLAIMED').length;
  
  const dailyTotal = challengeState.daily?.challenges.length || 0;
  const dailyDone = getCompletedCount(challengeState.daily?.challenges || []);
  
  const weeklyTotal = challengeState.weekly?.challenges.length || 0;
  const weeklyDone = getCompletedCount(challengeState.weekly?.challenges || []);

  const bountiesTotal = challengeState.bounties?.length || 0;
  const bountiesDone = getCompletedCount(challengeState.bounties || []);

  return (
    <Screen blurBg={false} style={{ background: 'var(--c-bg)', alignItems: 'stretch' }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(0,0,0,0.5)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <IconButton id="btn-back" icon="←" onClick={() => setPhase(GamePhase.MAIN_MENU)} label="Back" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: 0.5 }}>DYNAMIC QUESTS</h2>
        </div>
        <CoinChip amount={balance} />
      </div>

      {/* Streak & Dynamic Status Banner */}
      <div style={{ padding: '16px 20px 0', display: 'flex', gap: 12 }}>
        <div style={{ 
          flex: 1,
          background: 'linear-gradient(90deg, rgba(255,61,0,0.12), rgba(255,61,0,0.04))', 
          padding: '10px 14px', borderRadius: 12, borderLeft: '4px solid var(--c-danger)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--c-danger)' }}>DAILY STREAK</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Best: {challengeState.streak.best} days</div>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>
            🔥 {challengeState.streak.current}
          </div>
        </div>

        <div style={{ 
          flex: 1,
          background: 'linear-gradient(90deg, rgba(0,229,255,0.12), rgba(0,229,255,0.04))', 
          padding: '10px 14px', borderRadius: 12, borderLeft: '4px solid #00e5ff',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#00e5ff' }}>FREE REROLLS</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Refreshes daily</div>
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>
            🎲 {challengeState.freeRerollsRemaining}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '16px 20px 8px', overflowX: 'auto', flexShrink: 0 }} className="hide-scrollbar">
        {(['DAILY', 'WEEKLY', 'BOUNTIES', 'MILESTONES'] as const).map(tab => {
           let subtext = '';
           if (tab === 'DAILY') subtext = `${dailyDone}/${dailyTotal} done`;
           if (tab === 'WEEKLY') subtext = `${weeklyDone}/${weeklyTotal} done`;
           if (tab === 'BOUNTIES') subtext = `${bountiesDone}/${bountiesTotal} done`;
           
           return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? 'var(--c-primary)' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab ? '#000' : 'var(--c-text)',
                border: 'none', borderRadius: 18, padding: '8px 16px',
                fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{tab === 'BOUNTIES' ? '🎯 BOUNTIES' : tab}</span>
              {subtext && <span style={{ fontSize: '0.6rem', opacity: activeTab === tab ? 0.75 : 0.5 }}>{subtext}</span>}
            </button>
           );
        })}
      </div>

      {/* Reset Timer Sub-bar */}
      {timeLeft && (
        <div style={{ padding: '0 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
          <span>⏳ Resets in: <strong style={{ color: 'var(--c-primary)' }}>{timeLeft}</strong></span>
          {activeTab === 'BOUNTIES' && (
            <button
              onClick={handleAddBounty}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                borderRadius: 12,
                padding: '4px 10px',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              ➕ New Bounty
            </button>
          )}
        </div>
      )}

      {/* Challenge List */}
      <div className="scroll-y" style={{ flex: 1, padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <AnimatePresence mode="popLayout">
          {currentChallenges.map(c => {
             const def = challengeState.getDefinition(c.challengeId);
             const canReroll = (activeTab === 'DAILY' || activeTab === 'BOUNTIES') && 
                               c.state !== 'COMPLETED' && 
                               c.state !== 'CLAIMED' && 
                               challengeState.freeRerollsRemaining > 0;
             return (
               <ChallengeCard 
                 key={c.challengeId} 
                 data={c} 
                 def={def}
                 canReroll={canReroll}
                 onClaim={() => handleClaim(c.challengeId)}
                 onReroll={() => handleReroll(c.challengeId)}
               />
             );
          })}
          {currentChallenges.length === 0 && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.4)' }}>
               No quests available right now.
               {activeTab === 'BOUNTIES' && (
                 <div style={{ marginTop: 12 }}>
                   <button
                     onClick={handleAddBounty}
                     style={{
                       background: 'var(--c-primary)',
                       color: '#000',
                       border: 'none',
                       padding: '8px 16px',
                       borderRadius: 16,
                       fontWeight: 800,
                       cursor: 'pointer'
                     }}
                   >
                     ⚡ Take a Bounty Quest
                   </button>
                 </div>
               )}
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Screen>
  );
};
