import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Screen } from '../components/Layout';
import { Button } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { AdSystem } from '../../ads/AdSystem';
import { RewardManager } from '../../economy/RewardManager';

export const EndlessResultScreen = () => {
  const { setPhase, startGame, score, maxCombo, fruitsCut } = useGameState();
  const { updateBestScores, bestEndlessScore } = useProgressionState();
  const [isNewBest, setIsNewBest] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);

  useEffect(() => {
    const newBest = updateBestScores('endless', score);
    setIsNewBest(newBest);
    
    // Grant rewards
    const coins = RewardManager.grantEndlessMilestone(fruitsCut);
    setEarnedCoins(coins);
    
    AdSystem.notifyLevelCompleted();
  }, [score, fruitsCut, updateBestScores]);

  const handleAction = async (action: () => void) => {
    if (isNavigating) return;
    setIsNavigating(true);
    if (AdSystem.shouldShowInterstitial(1)) {
      await AdSystem.showInterstitial();
    }
    action();
  };

  return (
    <Screen>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'var(--sp-xl)', width: '100%', maxWidth: 380, padding: '0 24px',
      }}>
        <motion.div
          style={{ textAlign: 'center' }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        >
          <motion.div
            style={{ fontSize: '3.5rem', marginBottom: 8 }}
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >☠️</motion.div>
          <h1 style={{
            fontSize: 'var(--fs-heading)', fontWeight: 900,
            background: 'var(--grad-danger)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            RUN OVER
          </h1>
        </motion.div>

        <motion.div
          className="panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          {isNewBest && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 300, delay: 0.5 }}
              style={{ textAlign: 'center', color: 'var(--c-secondary)', fontWeight: 900, fontSize: '1.2rem', textShadow: '0 0 10px rgba(255,215,0,0.5)' }}
            >
              NEW BEST!
            </motion.div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--fs-body)' }}>Score</span>
            <span style={{ fontSize: 'var(--fs-heading)', fontWeight: 900 }}>
              {score.toLocaleString()}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--fs-body)' }}>Personal Best</span>
            <span style={{ fontSize: 'var(--fs-subheading)', fontWeight: 700, color: 'var(--c-secondary)' }}>
              {Math.max(score, bestEndlessScore).toLocaleString()}
            </span>
          </div>

          <div className="divider" />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--fs-body)' }}>Fruits Cut</span>
            <span style={{ fontSize: 'var(--fs-subheading)', fontWeight: 700 }}>
              {fruitsCut}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--fs-body)' }}>Max Combo</span>
            <span style={{ fontSize: 'var(--fs-subheading)', fontWeight: 700, color: 'var(--c-secondary)' }}>
              {maxCombo}x
            </span>
          </div>
          
          {earnedCoins > 0 && (
            <>
              <div className="divider" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--fs-body)' }}>Coins Earned</span>
                <span style={{ fontSize: 'var(--fs-subheading)', fontWeight: 900, color: 'var(--c-coin)' }}>
                  +{earnedCoins} 🪙
                </span>
              </div>
            </>
          )}
        </motion.div>

        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            id="btn-endless-replay"
            label="↻ Try Again"
            onClick={() => handleAction(() => startGame('endless'))}
            variant="primary" size="xl" fullWidth disabled={isNavigating}
          />
          <Button
            id="btn-endless-home"
            label="🏠 Main Menu"
            onClick={() => handleAction(() => setPhase(GamePhase.MAIN_MENU))}
            variant="secondary" size="md" fullWidth disabled={isNavigating}
          />
        </motion.div>
      </div>
    </Screen>
  );
};
