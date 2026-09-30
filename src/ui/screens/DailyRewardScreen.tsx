import { useState } from 'react';
import { motion } from 'framer-motion';
import { Screen, CoinChip } from '../components/Layout';
import { Button, IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { RewardManager } from '../../economy/RewardManager';
import { RewardDefinitions } from '../../economy/RewardDefinitions';
import { useCoinLedger } from '../../economy/CoinLedger';
import { GameFeelManager } from '../../gamefeel/GameFeelManager';

export const DailyRewardScreen = () => {
  const setPhase = useGameState(s => s.setPhase);
  const { advanceDailyReward, dailyRewardDay, lastDailyClaimTime } = useProgressionState();
  const balance = useCoinLedger(s => s.balance);
  const [justClaimed, setJustClaimed] = useState(false);

  // Check if 24 hours have passed since last claim
  // In a real game, this might align to midnight, but we'll use 24h or calendar day here.
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  const timeSinceLastClaim = Date.now() - lastDailyClaimTime;
  const canClaim = timeSinceLastClaim >= ONE_DAY_MS;
  const claimedToday = !canClaim || justClaimed;

  const currentDay = dailyRewardDay;
  const rewardAmt = RewardDefinitions.DAILY_REWARDS[Math.min(currentDay - 1, RewardDefinitions.DAILY_REWARDS.length - 1)];

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
    <Screen blurBg={false} style={{ background: 'var(--c-bg)', alignItems: 'center' }}>
      
      {/* Header */}
      <div style={{
        width: '100%',
        padding: '16px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <IconButton id="btn-back-daily" icon="←" onClick={() => setPhase(GamePhase.MAIN_MENU)} label="Back" />
        <CoinChip amount={balance} />
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '24px', width: '100%', maxWidth: 400, padding: '0 24px 24px',
        flex: 1, justifyContent: 'center'
      }}>
        <motion.div
          style={{ textAlign: 'center' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          <div style={{ fontSize: '3rem', marginBottom: 8, filter: 'drop-shadow(0 4px 12px rgba(255,215,0,0.3))' }}>🎁</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Daily Reward</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: 8 }}>Return every day for bigger prizes!</p>
        </motion.div>

        {/* 7-Day Journey Layout */}
        <div style={{ 
          width: '100%', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: 12,
          marginTop: 16
        }}>
          {RewardDefinitions.DAILY_REWARDS.map((r, i) => {
            const dayNum = i + 1;
            const isToday = dayNum === currentDay;
            const isPast = dayNum < currentDay;
            
            // Layout logic: make day 7 span 2 columns in the center of bottom row
            const isDay7 = dayNum === 7;
            const colSpan = isDay7 ? 'span 2' : 'span 1';
            const gridColStart = isDay7 ? 2 : 'auto';

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                style={{
                  gridColumn: colSpan,
                  gridColumnStart: gridColStart,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '12px 4px',
                  borderRadius: 16,
                  background: isPast ? 'rgba(255,255,255,0.05)' : isToday ? 'linear-gradient(145deg, rgba(255,215,0,0.2), rgba(255,145,0,0.1))' : 'var(--c-surface-2)',
                  border: `2px solid ${isToday ? 'rgba(255,215,0,0.5)' : isPast ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: isPast ? 'rgba(255,255,255,0.3)' : isToday ? 'var(--c-primary)' : 'rgba(255,255,255,0.5)' }}>
                  DAY {dayNum}
                </div>
                
                <div style={{ fontSize: isDay7 ? '1.8rem' : '1.2rem', opacity: isPast ? 0.3 : 1 }}>
                  🪙
                </div>
                
                <div style={{ fontSize: '0.85rem', fontWeight: 900, color: isPast ? 'rgba(255,255,255,0.3)' : 'var(--c-coin)' }}>
                  {r}
                </div>

                {isPast && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)' }}>
                    <div style={{ background: 'var(--c-success)', color: '#000', padding: '2px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 800, transform: 'rotate(-15deg)' }}>
                      CLAIMED
                    </div>
                  </div>
                )}
                
                {isToday && claimedToday && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)' }}>
                    <div style={{ background: 'var(--c-success)', color: '#000', padding: '2px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 800, transform: 'rotate(-15deg)' }}>
                      CLAIMED
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div style={{ width: '100%', marginTop: 24 }} animate={justClaimed ? { scale: [1, 1.05, 1] } : {}}>
          <Button
            id="btn-claim-daily"
            label={claimedToday ? 'Come Back Tomorrow' : `CLAIM 🪙 ${rewardAmt}`}
            onClick={handleClaim}
            variant={claimedToday ? 'ghost' : 'primary'}
            size="xl" fullWidth disabled={claimedToday}
          />
        </motion.div>
      </div>
    </Screen>
  );
};
