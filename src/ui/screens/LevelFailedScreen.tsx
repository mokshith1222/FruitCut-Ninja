import { motion } from 'framer-motion';
import { Screen } from '../components/Layout';
import { Button } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { AdsManager } from '../../ads/AdsManager';
import { GameFeelManager } from '../../gamefeel/GameFeelManager';
import { useState, useEffect } from 'react';

// Track single revive limit per session run
let sessionReviveCount = 0;

export const LevelFailedScreen = () => {
  const { startGame, setPhase, score, currentLevelId, currentLevelConfig, misses, reviveGame } = useGameState();
  const { completedLevels, updateBestScores } = useProgressionState();
  const [adLoading, setAdLoading] = useState(false);
  const [adError, setAdError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);

  const isSpecialMode = currentLevelId === 'time_attack' || currentLevelId === 'endless';
  const isTimeAttack = currentLevelId === 'time_attack';
  const canRevive = !isTimeAttack && sessionReviveCount < 1;
  const levelNum = currentLevelId?.replace('level_', '') ?? '?';
  const displayLevel = isSpecialMode ? (isTimeAttack ? 'Time Attack' : 'Endless') : levelNum;

  useEffect(() => {
    GameFeelManager.onLevelFailed();
    AdsManager.notifyLevelCompleted();
    if (!recorded && currentLevelId === 'endless') {
      const newBest = updateBestScores('endless', score);
      setIsNewBest(newBest);
      setRecorded(true);
    }
  }, [recorded, currentLevelId, score, updateBestScores]);

  const handleNextAction = async (action: () => void) => {
    if (isNavigating) return;
    setIsNavigating(true);
    sessionReviveCount = 0; // reset revive count on new run / exit
    if (AdsManager.shouldShowInterstitial(completedLevels.length)) {
      await AdsManager.showInterstitial(completedLevels.length);
    }
    action();
  };

  const handleRevive = async () => {
    if (adLoading || !canRevive) return;
    setAdLoading(true);
    setAdError(null);

    await AdsManager.showRewardedAd({
      rewardType: 'REVIVE',
      amount: 1,
      onSuccess: () => {
        sessionReviveCount += 1;
        setAdLoading(false);
        GameFeelManager.onRewardClaimed();
        reviveGame();
      },
      onCancel: () => {
        setAdLoading(false);
      },
      onError: () => {
        setAdLoading(false);
        setAdError('Ad unavailable right now.');
      }
    });
  };

  const failReason = () => {
    const hasBombObj = currentLevelConfig?.objectives?.some(o => o.type === 'NO_BOMB' || o.type === 'BOMB_AVOIDANCE');
    if (currentLevelConfig?.noBombsAllowed || hasBombObj) return 'You cut a bomb! 💣';
    if (misses >= (currentLevelConfig?.missLimit || 3)) return `Too many misses (${misses})`;
    if ((currentLevelConfig?.duration ?? 0) > 0) return 'Time ran out! ⏱';
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

        {/* Ad Error Banner if applicable */}
        {adError && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: 'rgba(255, 68, 68, 0.15)',
              border: '1px solid rgba(255, 68, 68, 0.3)',
              color: '#ff8888',
              fontSize: '0.85rem',
              textAlign: 'center',
              width: '100%'
            }}
          >
            {adError}
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {canRevive && (
            <>
              <Button
                id="btn-revive"
                label={adLoading ? 'Loading Ad...' : '🎥  Watch Ad to Revive (1x)'}
                onClick={handleRevive}
                variant="secondary" size="xl" fullWidth disabled={adLoading || isNavigating}
              />
              <div className="divider" style={{ margin: '4px 0' }} />
            </>
          )}
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
