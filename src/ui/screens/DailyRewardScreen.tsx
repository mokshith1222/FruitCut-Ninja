import { useState } from 'react';
import { motion } from 'framer-motion';
import { Screen } from '../components/Layout';
import { Button, IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';

const DAILY_REWARDS = [100, 150, 200, 300, 500, 750, 1000];

export const DailyRewardScreen = () => {
  const setPhase = useGameState(s => s.setPhase);
  const { claimDailyReward, dailyRewardDay, lastDailyClaimTime } = useProgressionState();
  const [justClaimed, setJustClaimed] = useState(false);

  // Check if 24 hours have passed since last claim
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  const timeSinceLastClaim = Date.now() - lastDailyClaimTime;
  const canClaim = timeSinceLastClaim >= ONE_DAY_MS;
  const claimedToday = !canClaim || justClaimed;

  const currentDay = dailyRewardDay;
  const reward = DAILY_REWARDS[Math.min(currentDay - 1, DAILY_REWARDS.length - 1)];

  const handleClaim = () => {
    if (claimedToday) return;
    claimDailyReward(reward);
    setJustClaimed(true);
  };

  return (
    <Screen>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'var(--sp-xl)', width: '100%', maxWidth: 360, padding: '0 24px',
      }}>
        <IconButton id="btn-back-daily" icon="←" onClick={() => setPhase(GamePhase.MAIN_MENU)} label="Back" />

        <motion.div
          style={{ textAlign: 'center' }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: 8 }}>🎁</div>
          <h1 style={{ fontSize: 'var(--fs-heading)', fontWeight: 900 }}>Daily Reward</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'var(--fs-small)', marginTop: 6 }}>Day {currentDay} of 7</p>
        </motion.div>

        {/* Day streak */}
        <div style={{ display: 'flex', gap: 8 }}>
          {DAILY_REWARDS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.06 * i }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                padding: '8px 6px',
                borderRadius: 10,
                background: i < currentDay ? 'rgba(105,240,174,0.15)' : 'var(--c-surface-2)',
                border: `2px solid ${i === currentDay - 1 ? 'var(--c-success)' : 'transparent'}`,
                minWidth: 38,
              }}
            >
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>D{i+1}</span>
              <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--c-coin)' }}>🪙{r}</span>
            </motion.div>
          ))}
        </div>

        {/* Reward panel */}
        <motion.div
          className="panel"
          style={{ width: '100%', textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>Today's reward</p>
          <motion.div
            style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--c-coin)' }}
            animate={justClaimed ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            🪙 {reward}
          </motion.div>
          {!canClaim && !justClaimed && (
             <p style={{ color: 'var(--c-danger)', fontSize: 'var(--fs-small)', marginTop: 12 }}>
               Come back tomorrow!
             </p>
          )}
        </motion.div>

        <Button
          id="btn-claim-daily"
          label={claimedToday ? '✓ Claimed!' : '🎁 Claim Reward'}
          onClick={handleClaim}
          variant={claimedToday ? 'ghost' : 'secondary'}
          size="xl" fullWidth disabled={claimedToday}
        />
      </div>
    </Screen>
  );
};
