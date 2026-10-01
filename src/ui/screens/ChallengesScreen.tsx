import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState, GamePhase } from '../../core/GameState';
import { useChallengeState } from '../../challenges/ChallengeManager';
import { useCoinLedger } from '../../economy/CoinLedger';
import type { ChallengeProgressData, ChallengeDefinition } from '../../challenges/ChallengeTypes';
import { GameFeelManager } from '../../gamefeel/GameFeelManager';
import { DateUtils } from '../../challenges/DateUtils';
import { BackIcon, CoinIcon, TargetIcon, BoltIcon, FlameIcon, CheckIcon } from '../icons/GameIcons';

/* ─── Difficulty palette ─────────────────────────────────── */
const DIFFICULTY_STYLE: Record<string, { color: string; bg: string }> = {
  EASY:   { color: '#69f0ae', bg: 'rgba(105,240,174,0.1)' },
  MEDIUM: { color: '#FFB800', bg: 'rgba(255,184,0,0.1)' },
  HARD:   { color: '#ff9100', bg: 'rgba(255,145,0,0.1)' },
  EPIC:   { color: '#e040fb', bg: 'rgba(224,64,251,0.1)' },
  MASTER: { color: '#ff3d00', bg: 'rgba(255,61,0,0.1)' },
};

/* ─── Challenge Card ─────────────────────────────────────── */
const ChallengeCard = ({
  data,
  def,
  canReroll,
  onClaim,
  onReroll,
}: {
  data: ChallengeProgressData;
  def?: ChallengeDefinition;
  canReroll?: boolean;
  onClaim: () => void;
  onReroll?: () => void;
}) => {
  if (!def) return null;

  const req       = def.requirements[0];
  const progress  = data.progress[0] || 0;
  const target    = req.target;
  const pct       = Math.min((progress / target) * 100, 100);
  const isCompleted = data.state === 'COMPLETED';
  const isClaimed   = data.state === 'CLAIMED';
  const diffStyle   = DIFFICULTY_STYLE[def.difficulty] || DIFFICULTY_STYLE.EASY;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: isClaimed ? 0.45 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
      style={{
        borderRadius: 'var(--r-lg)',
        padding: '14px 16px',
        background: isCompleted
          ? 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,160,0,0.04))'
          : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isCompleted ? 'rgba(255,215,0,0.3)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: isCompleted ? '0 4px 20px rgba(255,215,0,0.08)' : 'none',
        position: 'relative',
        overflow: 'hidden',
        pointerEvents: isClaimed ? 'none' : 'auto',
      }}
    >
      {/* Completion shimmer */}
      {isCompleted && (
        <motion.div
          style={{
            position: 'absolute', top: 0, left: '-100%',
            width: '60%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,215,64,0.06), transparent)',
            pointerEvents: 'none',
          }}
          animate={{ left: ['−100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        {/* Left content */}
        <div style={{ flex: 1 }}>
          {/* Tags row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{
              fontSize: '0.58rem', fontWeight: 900, letterSpacing: '0.08em',
              color: diffStyle.color,
              background: diffStyle.bg,
              padding: '2px 7px', borderRadius: 'var(--r-pill)',
            }}>
              {def.difficulty}
            </span>
            {req.modeRestriction && (
              <span style={{ fontSize: '0.58rem', color: 'var(--c-text-muted)', letterSpacing: '0.05em' }}>
                {req.modeRestriction.replace('_', ' ')}
              </span>
            )}
          </div>

          {/* Title */}
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 3 }}>
            {def.title}
          </div>

          {/* Description */}
          <div style={{ fontSize: '0.72rem', color: 'var(--c-text-sub)', lineHeight: 1.4 }}>
            {def.description}
          </div>
        </div>

        {/* Right action */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
          {isClaimed ? (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 10px', borderRadius: 'var(--r-pill)',
              background: 'rgba(255,255,255,0.06)',
              fontSize: '0.7rem', fontWeight: 700, color: 'var(--c-text-muted)',
            }}>
              <CheckIcon size={12} color="var(--c-text-muted)"/>
              DONE
            </div>
          ) : isCompleted ? (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={onClaim}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'linear-gradient(135deg, #ffd700, #ff9100)',
                color: '#000',
                border: 'none',
                padding: '8px 14px', borderRadius: 'var(--r-pill)',
                fontWeight: 900, fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(255,215,0,0.35)',
              }}
            >
              <CoinIcon size={14}/>
              {def.rewardCoins}
            </motion.button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                color: 'var(--c-coin)', fontWeight: 800, fontSize: '0.85rem',
              }}>
                <CoinIcon size={14}/>
                {def.rewardCoins}
              </div>
              {canReroll && onReroll && (
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={onReroll}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'var(--c-text-sub)',
                    borderRadius: 'var(--r-sm)',
                    padding: '5px 8px',
                    fontSize: '0.62rem', fontWeight: 800,
                    cursor: 'pointer',
                    minHeight: 32,
                  }}
                >
                  REROLL
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {!isClaimed && (
        <div style={{ marginTop: 12 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: '0.65rem', fontWeight: 700, marginBottom: 5, color: 'var(--c-text-sub)',
          }}>
            <span>Progress</span>
            <span style={{ color: isCompleted ? '#FFD740' : '#fff' }}>
              {Math.floor(progress)} / {target}
            </span>
          </div>
          <div style={{
            height: 4, background: 'rgba(0,0,0,0.4)',
            borderRadius: 'var(--r-pill)', overflow: 'hidden',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              style={{
                height: '100%',
                background: isCompleted
                  ? 'linear-gradient(90deg, #ffd700, #ffb300)'
                  : 'var(--grad-primary)',
                borderRadius: 'var(--r-pill)',
              }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

/* ─── Tab Button ─────────────────────────────────────────── */
const TabButton = ({
  label,
  sublabel,
  isActive,
  onClick,
}: {
  label: string;
  sublabel?: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.button
    whileTap={{ scale: 0.92 }}
    onClick={onClick}
    style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
      padding: '8px 14px',
      borderRadius: 'var(--r-pill)',
      background: isActive ? 'rgba(255,42,95,0.15)' : 'rgba(255,255,255,0.04)',
      border: isActive ? '1px solid rgba(255,42,95,0.4)' : '1px solid rgba(255,255,255,0.07)',
      color: isActive ? '#fff' : 'var(--c-text-sub)',
      fontWeight: 800, fontSize: '0.8rem',
      cursor: 'pointer', whiteSpace: 'nowrap',
      transition: 'all 0.18s ease',
      flexShrink: 0,
      minHeight: 44,
    }}
  >
    <span>{label}</span>
    {sublabel && (
      <span style={{ fontSize: '0.58rem', opacity: isActive ? 0.7 : 0.4, fontWeight: 700 }}>
        {sublabel}
      </span>
    )}
  </motion.button>
);

/* ─── Main Component ─────────────────────────────────────── */
type TabId = 'DAILY' | 'WEEKLY' | 'BOUNTIES' | 'MILESTONES';

export const ChallengesScreen = () => {
  const setPhase        = useGameState(s => s.setPhase);
  const challengeState  = useChallengeState();
  const addTransaction  = useCoinLedger(s => s.addTransaction);
  const balance         = useCoinLedger(s => s.balance);

  const [activeTab, setActiveTab] = useState<TabId>('DAILY');
  const [timeLeft, setTimeLeft]   = useState('');

  useEffect(() => {
    useChallengeState.getState().initializeChallenges();
  }, []);

  useEffect(() => {
    const update = () => {
      if (activeTab === 'DAILY' || activeTab === 'BOUNTIES') setTimeLeft(DateUtils.getTimeUntilMidnight());
      else if (activeTab === 'WEEKLY') setTimeLeft(DateUtils.getTimeUntilWeekReset());
      else setTimeLeft('');
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
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
    if (ok) GameFeelManager.onButtonTap();
  };

  const handleAddBounty = () => {
    useChallengeState.getState().addBountyQuest();
    GameFeelManager.onButtonTap();
  };

  const getChallenges = (tab: TabId): ChallengeProgressData[] => {
    switch (tab) {
      case 'DAILY':      return challengeState.daily?.challenges || [];
      case 'WEEKLY':     return challengeState.weekly?.challenges || [];
      case 'BOUNTIES':   return challengeState.bounties || [];
      case 'MILESTONES': return Object.values(challengeState.milestones);
    }
  };

  const sorted = getChallenges(activeTab).sort((a, b) => {
    const score = (c: ChallengeProgressData) =>
      c.state === 'COMPLETED' ? 2 : c.state === 'CLAIMED' ? 0 : 1;
    return score(b) - score(a);
  });

  const dailyTotal  = challengeState.daily?.challenges.length || 0;
  const dailyDone   = (challengeState.daily?.challenges || []).filter(c => c.state === 'COMPLETED' || c.state === 'CLAIMED').length;
  const weeklyTotal = challengeState.weekly?.challenges.length || 0;
  const weeklyDone  = (challengeState.weekly?.challenges || []).filter(c => c.state === 'COMPLETED' || c.state === 'CLAIMED').length;
  const bountiesTotal = challengeState.bounties?.length || 0;
  const bountiesDone  = (challengeState.bounties || []).filter(c => c.state === 'COMPLETED' || c.state === 'CLAIMED').length;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      background: 'var(--grad-bg)',
    }}>
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.28 }}
        style={{
          padding: 'max(env(safe-area-inset-top, 0px), 12px) 20px 14px',
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'rgba(0,0,0,0.4)',
          borderBottom: '1px solid var(--c-border)',
          backdropFilter: 'blur(16px)',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <motion.button
          className="btn btn--ghost btn--icon"
          whileTap={{ scale: 0.88 }}
          onClick={() => setPhase(GamePhase.MAIN_MENU)}
        >
          <BackIcon size={20}/>
        </motion.button>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.04em' }}>QUESTS</h2>
          <p style={{ fontSize: '0.72rem', color: 'var(--c-text-sub)', marginTop: 2 }}>
            Complete objectives for coins
          </p>
        </div>
        <div className="coin-display">
          <CoinIcon size={16}/>
          <span>{balance.toLocaleString()}</span>
        </div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          display: 'flex', gap: 10, padding: '12px 16px',
          flexShrink: 0,
        }}
      >
        {/* Streak card */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px',
          borderRadius: 'var(--r-lg)',
          background: 'rgba(255,61,0,0.08)',
          border: '1px solid rgba(255,61,0,0.2)',
        }}>
          <div>
            <div style={{ fontSize: '0.62rem', fontWeight: 900, color: 'var(--c-danger)', letterSpacing: '0.1em' }}>
              STREAK
            </div>
            <div style={{ fontSize: '0.62rem', color: 'var(--c-text-muted)', marginTop: 1 }}>
              Best: {challengeState.streak.best}d
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <FlameIcon size={20} color="#FF4500"/>
            <span style={{ fontSize: '1.2rem', fontWeight: 900 }}>
              {challengeState.streak.current}
            </span>
          </div>
        </div>

        {/* Rerolls card */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px',
          borderRadius: 'var(--r-lg)',
          background: 'rgba(0,229,255,0.08)',
          border: '1px solid rgba(0,229,255,0.2)',
        }}>
          <div>
            <div style={{ fontSize: '0.62rem', fontWeight: 900, color: 'var(--c-accent)', letterSpacing: '0.1em' }}>
              REROLLS
            </div>
            <div style={{ fontSize: '0.62rem', color: 'var(--c-text-muted)', marginTop: 1 }}>
              Daily free
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <BoltIcon size={18} color="var(--c-accent)"/>
            <span style={{ fontSize: '1.2rem', fontWeight: 900 }}>
              {challengeState.freeRerollsRemaining}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div
        className="hide-scrollbar"
        style={{
          display: 'flex', gap: 8, padding: '0 16px 12px',
          overflowX: 'auto', flexShrink: 0,
        }}
      >
        <TabButton label="DAILY"   sublabel={`${dailyDone}/${dailyTotal}`}   isActive={activeTab === 'DAILY'}     onClick={() => setActiveTab('DAILY')} />
        <TabButton label="WEEKLY"  sublabel={`${weeklyDone}/${weeklyTotal}`} isActive={activeTab === 'WEEKLY'}    onClick={() => setActiveTab('WEEKLY')} />
        <TabButton label="BOUNTIES" sublabel={`${bountiesDone}/${bountiesTotal}`} isActive={activeTab === 'BOUNTIES'} onClick={() => setActiveTab('BOUNTIES')} />
        <TabButton label="MILESTONES" isActive={activeTab === 'MILESTONES'} onClick={() => setActiveTab('MILESTONES')} />
      </div>

      {/* Reset timer + bounty action */}
      {timeLeft && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0 16px 10px',
          fontSize: '0.7rem', color: 'var(--c-text-muted)',
          flexShrink: 0,
        }}>
          <span>
            Resets in <strong style={{ color: 'var(--c-primary)' }}>{timeLeft}</strong>
          </span>
          {activeTab === 'BOUNTIES' && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAddBounty}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff',
                borderRadius: 'var(--r-pill)',
                padding: '5px 12px',
                fontSize: '0.72rem', fontWeight: 800,
                cursor: 'pointer', minHeight: 32,
              }}
            >
              <TargetIcon size={12} color="var(--c-accent)"/>
              New Bounty
            </motion.button>
          )}
        </div>
      )}

      {/* Challenge list */}
      <div className="scroll-y" style={{ flex: 1, padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <AnimatePresence mode="popLayout">
          {sorted.map((c) => {
            const def      = challengeState.getDefinition(c.challengeId);
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

          {sorted.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: 'center', padding: '48px 20px',
                color: 'var(--c-text-muted)', fontSize: '0.85rem',
              }}
            >
              No quests available.
              {activeTab === 'BOUNTIES' && (
                <div style={{ marginTop: 16 }}>
                  <motion.button
                    className="btn btn--primary btn--md"
                    whileTap={{ scale: 0.92 }}
                    onClick={handleAddBounty}
                    style={{ gap: 8 }}
                  >
                    <TargetIcon size={16}/>
                    Take a Bounty
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div style={{ height: 'max(env(safe-area-inset-bottom, 0px), 16px)' }}/>
      </div>
    </div>
  );
};
