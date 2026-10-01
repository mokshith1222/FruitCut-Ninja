import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { RewardManager } from '../../economy/RewardManager';
import { RewardDefinitions } from '../../economy/RewardDefinitions';
import { useCoinLedger } from '../../economy/CoinLedger';
import { GameFeelManager } from '../../gamefeel/GameFeelManager';
import { BackIcon, CoinIcon, GiftIcon, CheckIcon, FlameIcon, StarIcon } from '../icons/GameIcons';

/* ─── Day Cell ────────────────────────────────────────────── */
const DayCell = ({
  day,
  coins,
  isPast,
  isToday,
  isClaimed,
  isBig = false,
  index,
}: {
  day: number;
  coins: number;
  isPast: boolean;
  isToday: boolean;
  isClaimed: boolean;
  isBig?: boolean;
  index: number;
}) => {
  const claimed = isPast || (isToday && isClaimed);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.06, type: 'spring', stiffness: 280, damping: 22 }}
      style={{
        borderRadius: 'var(--r-lg)',
        padding: isBig ? '18px 12px' : '14px 8px',
        background: isToday && !isClaimed
          ? 'linear-gradient(145deg, rgba(255,184,0,0.2), rgba(255,106,0,0.1))'
          : claimed
          ? 'rgba(0,230,118,0.08)'
          : 'rgba(255,255,255,0.04)',
        border: isToday && !isClaimed
          ? '2px solid rgba(255,184,0,0.5)'
          : claimed
          ? '1px solid rgba(0,230,118,0.25)'
          : '1px solid rgba(255,255,255,0.06)',
        boxShadow: isToday && !isClaimed
          ? '0 0 20px rgba(255,184,0,0.2), 0 4px 16px rgba(0,0,0,0.3)'
          : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: isBig ? 10 : 7,
        position: 'relative',
        overflow: 'hidden',
        cursor: isToday && !isClaimed ? 'pointer' : 'default',
      }}
    >
      {/* Glow for today */}
      {isToday && !isClaimed && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, rgba(255,184,0,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>
      )}

      {/* Day label */}
      <div style={{
        fontSize: '0.6rem',
        fontWeight: 900,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: isToday && !isClaimed ? '#FFB800' : claimed ? 'var(--c-success)' : 'var(--c-text-muted)',
      }}>
        DAY {day}
      </div>

      {/* Coin icon / check */}
      {claimed ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <CheckIcon size={isBig ? 28 : 22} color="var(--c-success)"/>
        </motion.div>
      ) : (
        <motion.div
          animate={isToday ? { rotate: [0, -5, 5, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          <CoinIcon size={isBig ? 36 : 28} color={isToday && !isClaimed ? '#FFD740' : 'rgba(255,215,64,0.35)'}/>
        </motion.div>
      )}

      {/* Amount */}
      <div style={{
        fontSize: isBig ? '1.1rem' : '0.88rem',
        fontWeight: 900,
        color: claimed ? 'var(--c-success)' : isToday ? '#FFD740' : 'var(--c-text-muted)',
        lineHeight: 1,
      }}>
        {claimed ? 'CLAIMED' : `+${coins}`}
      </div>

      {/* Today pulse ring */}
      {isToday && !isClaimed && (
        <motion.div
          style={{
            position: 'absolute', inset: -1,
            borderRadius: 'var(--r-lg)',
            border: '2px solid rgba(255,184,0,0.6)',
            pointerEvents: 'none',
          }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        />
      )}
    </motion.div>
  );
};

/* ─── Main Component ─────────────────────────────────────── */
export const DailyRewardScreen = () => {
  const setPhase = useGameState(s => s.setPhase);
  const { advanceDailyReward, dailyRewardDay, lastDailyClaimTime } = useProgressionState();
  const balance = useCoinLedger(s => s.balance);
  const [justClaimed, setJustClaimed] = useState(false);

  const ONE_DAY_MS       = 24 * 60 * 60 * 1000;
  const timeSinceLastClaim = Date.now() - lastDailyClaimTime;
  const canClaim         = timeSinceLastClaim >= ONE_DAY_MS;
  const claimedToday     = !canClaim || justClaimed;

  // If already claimed today, dailyRewardDay has advanced, so the day we claimed was the previous one.
  const currentDay = canClaim ? dailyRewardDay : (dailyRewardDay === 1 ? 7 : dailyRewardDay - 1);
  const rewardAmt  = RewardDefinitions.DAILY_REWARDS[Math.min(currentDay - 1, RewardDefinitions.DAILY_REWARDS.length - 1)];

  const handleClaim = () => {
    if (claimedToday) return;
    const amount = RewardManager.grantDailyReward(currentDay);
    if (amount > 0) {
      advanceDailyReward();
      setJustClaimed(true);
      GameFeelManager.onRewardClaimed();
    }
  };

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      background: 'radial-gradient(ellipse at 50% 0%, rgba(255,184,0,0.08) 0%, transparent 60%), var(--grad-bg)',
    }}>
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.28 }}
        style={{
          padding: 'max(env(safe-area-inset-top, 0px), 12px) 20px 14px',
          display: 'flex', alignItems: 'center', gap: 12,
          flexShrink: 0,
        }}
      >
        <motion.button
          className="btn btn--ghost btn--icon"
          whileTap={{ scale: 0.88 }}
          onClick={() => setPhase(GamePhase.MAIN_MENU)}
        >
          <BackIcon size={20}/>
        </motion.button>
        <div style={{ flex: 1 }}/>
        <div className="coin-display">
          <CoinIcon size={16}/>
          <span>{balance.toLocaleString()}</span>
        </div>
      </motion.div>

      {/* Main content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        padding: '0 20px 20px',
        gap: 24,
        overflowY: 'auto',
      }}>
        {/* Title section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          style={{ textAlign: 'center', paddingTop: 8 }}
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            style={{ marginBottom: 12 }}
          >
            <GiftIcon size={52} color="#FF6B6B"/>
          </motion.div>
          <h1 style={{
            fontFamily: 'var(--font-brand)',
            fontSize: '1.8rem', fontWeight: 900,
            letterSpacing: '0.06em',
          }}>
            DAILY REWARD
          </h1>
          <p style={{ color: 'var(--c-text-sub)', fontSize: '0.85rem', marginTop: 8 }}>
            Return every day for bigger prizes!
          </p>

          {/* Streak badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              marginTop: 14,
              padding: '8px 18px',
              borderRadius: 'var(--r-pill)',
              background: 'linear-gradient(90deg, rgba(255,106,0,0.12), rgba(255,184,0,0.08))',
              border: '1px solid rgba(255,106,0,0.3)',
            }}
          >
            <FlameIcon size={18} color="#FF6A00"/>
            <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#FFB800' }}>
              Day {currentDay} Streak
            </span>
            <StarIcon size={14} color="#FFD740"/>
          </motion.div>
        </motion.div>

        {/* 7-day grid */}
        <div style={{
          width: '100%', maxWidth: 440,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 10,
        }}>
          {/* Days 1-6 */}
          {RewardDefinitions.DAILY_REWARDS.slice(0, 6).map((coins, i) => {
            const dayNum   = i + 1;
            const isPast   = dayNum < currentDay;
            const isToday  = dayNum === currentDay;
            return (
              <DayCell
                key={dayNum}
                day={dayNum}
                coins={coins}
                isPast={isPast}
                isToday={isToday}
                isClaimed={claimedToday}
                index={i}
              />
            );
          })}

          {/* Day 7 — big, spanning 2 cols, centered */}
          {RewardDefinitions.DAILY_REWARDS.length >= 7 && (
            <div style={{ gridColumn: '2 / 4' }}>
              <DayCell
                day={7}
                coins={RewardDefinitions.DAILY_REWARDS[6]}
                isPast={7 < currentDay}
                isToday={7 === currentDay}
                isClaimed={claimedToday}
                isBig
                index={6}
              />
            </div>
          )}
        </div>

        {/* Claim button */}
        <motion.div
          style={{ width: '100%', maxWidth: 440 }}
          animate={justClaimed ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          {justClaimed ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                padding: '20px',
                borderRadius: 'var(--r-xl)',
                background: 'rgba(0,230,118,0.1)',
                border: '1px solid rgba(0,230,118,0.3)',
                textAlign: 'center',
              }}
            >
              <CheckIcon size={32} color="var(--c-success)"/>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--c-success)', marginTop: 10 }}>
                Reward Claimed!
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--c-text-sub)', marginTop: 4 }}>
                Come back tomorrow for more
              </div>
            </motion.div>
          ) : claimedToday ? (
            <button className="btn btn--ghost btn--xl" style={{ width: '100%' }} disabled>
              Come Back Tomorrow
            </button>
          ) : (
            <motion.button
              className="btn btn--secondary btn--xl"
              style={{ width: '100%', gap: 12 }}
              onClick={handleClaim}
              whileTap={{ scale: 0.94 }}
              animate={{ boxShadow: ['0 6px 28px rgba(255,184,0,0.4)', '0 6px 40px rgba(255,184,0,0.7)', '0 6px 28px rgba(255,184,0,0.4)'] }}
              transition={{ boxShadow: { repeat: Infinity, duration: 1.8 } }}
            >
              <CoinIcon size={22}/>
              Claim {rewardAmt} Coins
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};
