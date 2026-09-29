import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Screen, Stars } from '../components/Layout';
import { Button } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { LevelDefinitions } from '../../levels/LevelDefinitions';
import { AdSystem } from '../../ads/AdSystem';

const calcStars = (score: number, targetScore: number) => {
  if (score >= targetScore * 2) return 3;
  if (score >= targetScore) return 2;
  return 1;
};

export const LevelCompleteScreen = () => {
  const { startGame, setPhase, score, currentLevelId, currentLevelConfig, misses } = useGameState();
  const { addCoins, completeLevel, starsPerLevel, updateChallengeProgress, completedLevels, updateBestScores } = useProgressionState();
  const [rewardGranted, setRewardGranted] = useState(false);
  const [doubleAdState, setDoubleAdState] = useState<'idle' | 'loading' | 'watched'>('idle');
  const [isNavigating, setIsNavigating] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);

  const isSpecialMode = currentLevelId === 'time_attack' || currentLevelId === 'endless';
  const levelNum = parseInt(currentLevelId?.replace('level_', '') ?? '1');
  const titleText = isSpecialMode ? (currentLevelId === 'time_attack' ? 'Time Attack Complete!' : 'Endless Finished!') : `Level ${levelNum} Complete!`;
  const target = currentLevelConfig?.targetScore ?? 0;
  const earnedStars = calcStars(score, target > 0 ? target : 100);
  const reward = currentLevelConfig?.rewardCoins ?? 50;
  const prevStars = starsPerLevel[currentLevelId ?? ''] ?? 0;
  const nextLevelId = `level_${levelNum + 1}`;
  const hasNextLevel = !!LevelDefinitions[nextLevelId];

  useEffect(() => {
    if (!rewardGranted && currentLevelId) {
      if (isSpecialMode) {
        if (currentLevelId === 'time_attack' || currentLevelId === 'endless') {
          const newBest = updateBestScores(currentLevelId as any, score);
          setIsNewBest(newBest);
        }
      } else {
        completeLevel(currentLevelId, earnedStars);
      }
      addCoins(reward);
      updateChallengeProgress('level_5', 1);
      if (misses === 0) {
        updateChallengeProgress('no_miss', 1);
      }
      AdSystem.notifyLevelCompleted();
      setRewardGranted(true);
    }
  }, [currentLevelId, rewardGranted, earnedStars, reward, addCoins, completeLevel, updateChallengeProgress, misses, isSpecialMode, updateBestScores, score]);

  const handleNextAction = async (action: () => void) => {
    if (isNavigating) return;
    setIsNavigating(true);
    if (AdSystem.shouldShowInterstitial(completedLevels.length)) {
      await AdSystem.showInterstitial();
    }
    action();
  };

  const handleDoubleReward = async () => {
    if (doubleAdState !== 'idle') return;
    setDoubleAdState('loading');
    const success = await AdSystem.showRewardedAd(() => {
      addCoins(reward); // Grant second time
    });
    setDoubleAdState(success ? 'watched' : 'idle');
  };

  return (
    <Screen>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'var(--sp-xl)', width: '100%', maxWidth: 380, padding: '0 24px',
      }}>
        {/* Header */}
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
          >🎉</motion.div>
          <h1 style={{
            fontSize: 'var(--fs-heading)', fontWeight: 900,
            background: 'var(--grad-success)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            {titleText}
          </h1>
        </motion.div>

        {/* Stars */}
        <Stars count={earnedStars} animate />

        {/* Stats panel */}
        <motion.div
          className="panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          {/* Score row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--fs-body)' }}>Score</span>
            <motion.span
              style={{ fontSize: 'var(--fs-subheading)', fontWeight: 900 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {score.toLocaleString()}
            </motion.span>
          </div>

          {/* Stars comparison / New Best */}
          {!isSpecialMode && earnedStars > prevStars && prevStars > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--fs-body)' }}>New best!</span>
              <span style={{ color: 'var(--c-secondary)', fontWeight: 700 }}>+{earnedStars - prevStars} ⭐</span>
            </div>
          )}
          {isSpecialMode && isNewBest && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 300, delay: 0.8 }}
              style={{ textAlign: 'center', color: 'var(--c-secondary)', fontWeight: 900, fontSize: '1.2rem', textShadow: '0 0 10px rgba(255,215,0,0.5)' }}
            >
              NEW BEST!
            </motion.div>
          )}

          <div className="divider" />

          {/* Reward */}
          <motion.div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--fs-body)' }}>Coins earned</span>
            <span style={{ fontSize: 'var(--fs-subheading)', fontWeight: 900, color: 'var(--c-coin)' }}>
              +{reward} 🪙
            </span>
          </motion.div>
        </motion.div>

          {/* Actions */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {doubleAdState !== 'watched' && (
            <Button
              id="btn-double-coins"
              label={doubleAdState === 'loading' ? 'Loading Ad...' : '🎥  Watch Ad for 2× Coins'}
              onClick={handleDoubleReward}
              variant="secondary" size="lg" fullWidth disabled={doubleAdState === 'loading'}
            />
          )}

          <div className="divider" style={{ margin: '4px 0' }} />

          {hasNextLevel && (
            <Button
              id="btn-next-level"
              label="Next Level →"
              onClick={() => handleNextAction(() => startGame(nextLevelId))}
              variant="primary" size="xl" fullWidth disabled={isNavigating || doubleAdState === 'loading'}
            />
          )}
          {!hasNextLevel && (
            <Button
              id="btn-all-done"
              label="🏆 All Levels Done!"
              onClick={() => handleNextAction(() => setPhase(GamePhase.MAIN_MENU))}
              variant="primary" size="xl" fullWidth disabled={isNavigating || doubleAdState === 'loading'}
            />
          )}
          <div style={{ display: 'flex', gap: 12 }}>
            <Button
              id="btn-replay-complete"
              label="↺ Replay"
              onClick={() => { if (currentLevelId) handleNextAction(() => startGame(currentLevelId)); }}
              variant="ghost" size="md" fullWidth disabled={isNavigating || doubleAdState === 'loading'}
            />
            <Button
              id="btn-map-complete"
              label="🗺 Map"
              onClick={() => handleNextAction(() => setPhase(GamePhase.LEVEL_LOADING))}
              variant="ghost" size="md" fullWidth disabled={isNavigating || doubleAdState === 'loading'}
            />
          </div>
        </motion.div>
      </div>
    </Screen>
  );
};
