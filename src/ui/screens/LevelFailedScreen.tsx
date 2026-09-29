import { motion } from 'framer-motion';
import { Screen } from '../components/Layout';
import { Button } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { AdSystem } from '../../ads/AdSystem';
import { useState, useEffect } from 'react';

export const LevelFailedScreen = () => {
  const { startGame, setPhase, score, currentLevelId, currentLevelConfig, misses, reviveGame } = useGameState();
  const { completedLevels, updateBestScores } = useProgressionState();
  const [adLoading, setAdLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const isSpecialMode = currentLevelId === 'time_attack' || currentLevelId === 'endless';
  const levelNum = currentLevelId?.replace('level_', '') ?? '?';
  const displayLevel = isSpecialMode ? (currentLevelId === 'time_attack' ? 'Time Attack' : 'Endless') : levelNum;

  useEffect(() => {
    AdSystem.notifyLevelCompleted();
    if (!recorded && currentLevelId === 'endless') {
      const newBest = updateBestScores('endless', score);
      setIsNewBest(newBest);
      setRecorded(true);
    }
  }, [recorded, currentLevelId, score, updateBestScores]);

  const handleNextAction = async (action: () => void) => {
    if (isNavigating) return;
    setIsNavigating(true);
    if (AdSystem.shouldShowInterstitial(completedLevels.length)) {
      await AdSystem.showInterstitial();
    }
    action();
  };

  const failReason = () => {
    if (currentLevelConfig?.noBombsAllowed) return 'You cut a bomb! 💣';
    if (currentLevelConfig?.missLimit && misses >= currentLevelConfig.missLimit) return `Too many misses (${misses})`;
    if (currentLevelConfig?.timeLimit) return 'Time ran out! ⏱';
    return 'Better luck next time!';
  };

  return (
    <Screen>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'var(--sp-xl)', width: '100%', maxWidth: 360, padding: '0 24px',
      }}>
        {/* Icon + title */}
        <motion.div
          style={{ textAlign: 'center' }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        >
          <motion.div
            style={{ fontSize: '3.5rem', marginBottom: 8 }}
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            💥
          </motion.div>
          <h1 style={{
            fontSize: 'var(--fs-heading)', fontWeight: 900,
            background: 'linear-gradient(135deg, #FF5252 20%, #FF1744 80%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {isSpecialMode ? 'Game Over' : 'Level Failed'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'var(--fs-body)', marginTop: 8 }}>
            {failReason()}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Mode</span>
            <strong>{displayLevel}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Score</span>
            <strong>{score.toLocaleString()}</strong>
          </div>
          {isSpecialMode && isNewBest && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 300, delay: 0.5 }}
              style={{ textAlign: 'center', color: 'var(--c-secondary)', fontWeight: 900, fontSize: '1.2rem', marginTop: 8, textShadow: '0 0 10px rgba(255,215,0,0.5)' }}
            >
              NEW BEST!
            </motion.div>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Button
            id="btn-revive"
            label={adLoading ? 'Loading Ad...' : '🎥  Watch Ad to Revive'}
            onClick={async () => {
              setAdLoading(true);
              await AdSystem.showRewardedAd(() => reviveGame());
              setAdLoading(false);
              // if it failed, it simply won't revive and we stay on this screen
            }}
            variant="secondary" size="xl" fullWidth disabled={adLoading || isNavigating}
          />
          <div className="divider" style={{ margin: '8px 0' }} />
          <Button
            id="btn-retry"
            label="↺  Try Again"
            onClick={() => { if (currentLevelId) handleNextAction(() => startGame(currentLevelId)); }}
            variant="primary" size="xl" fullWidth disabled={adLoading || isNavigating}
          />
          <Button
            id="btn-map-failed"
            label="🗺  Level Map"
            onClick={() => handleNextAction(() => setPhase(GamePhase.LEVEL_LOADING))}
            variant="ghost" size="md" fullWidth disabled={adLoading || isNavigating}
          />
          <Button
            id="btn-exit-failed"
            label="Main Menu"
            onClick={() => handleNextAction(() => setPhase(GamePhase.MAIN_MENU))}
            variant="danger" size="md" fullWidth disabled={adLoading || isNavigating}
          />
        </motion.div>
      </div>
    </Screen>
  );
};
