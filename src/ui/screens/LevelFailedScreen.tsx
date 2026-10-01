import { motion } from 'framer-motion';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { AdsManager } from '../../ads/AdsManager';
import { GameFeelManager } from '../../gamefeel/GameFeelManager';
import { useState, useEffect } from 'react';
import { RetryIcon, MapIcon, ExitIcon } from '../icons/GameIcons';

let sessionReviveCount = 0;

/* ─── Impact Flash ─────────────────────────────────────── */
const ImpactShards = () => {
  const shards = Array.from({ length: 8 }, (_, i) => ({
    angle: (i / 8) * Math.PI * 2,
    length: 30 + Math.random() * 50,
    width: 2 + Math.random() * 3,
  }));

  return (
    <motion.div
      style={{ position: 'absolute', top: '22%', left: '50%', pointerEvents: 'none' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.9, duration: 0.4 }}
    >
      {shards.map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: 0, top: 0,
            width: s.width,
            height: s.length,
            background: 'linear-gradient(to bottom, #FF2A5F, transparent)',
            borderRadius: 2,
            transformOrigin: 'top center',
            rotate: `${s.angle * (180 / Math.PI)}deg`,
          }}
          initial={{ scaleY: 0, opacity: 1 }}
          animate={{ scaleY: 1, opacity: 0, y: Math.cos(s.angle) * 40 + 20 }}
          transition={{ delay: 0.1 + i * 0.03, duration: 0.5, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  );
};

export const LevelFailedScreen = () => {
  const { startGame, setPhase, score, currentLevelId, currentLevelConfig, misses, reviveGame } = useGameState();
  const { completedLevels, updateBestScores } = useProgressionState();
  const [adLoading, setAdLoading]   = useState(false);
  const [adError, setAdError]       = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [recorded, setRecorded]     = useState(false);
  const [isNewBest, setIsNewBest]   = useState(false);

  const isSpecialMode  = currentLevelId === 'time_attack' || currentLevelId === 'endless';
  const isTimeAttack   = currentLevelId === 'time_attack';
  const canRevive      = !isTimeAttack && sessionReviveCount < 1;
  const levelNum       = currentLevelId?.replace('level_', '') ?? '?';
  const displayTitle   = isSpecialMode ? (isTimeAttack ? 'Time Attack' : 'Endless') : `Level ${levelNum}`;

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
    sessionReviveCount = 0;
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
      onCancel: () => setAdLoading(false),
      onError: () => { setAdLoading(false); setAdError('Ad unavailable right now.'); },
    });
  };

  const failReason = () => {
    const hasBombObj = currentLevelConfig?.objectives?.some(o => o.type === 'NO_BOMB' || o.type === 'BOMB_AVOIDANCE');
    if (currentLevelConfig?.noBombsAllowed || hasBombObj) return 'Bomb detonated';
    if (misses >= (currentLevelConfig?.missLimit || 3))   return 'Too many misses';
    if ((currentLevelConfig?.duration ?? 0) > 0)          return 'Time expired';
    return 'Better luck next time';
  };

  return (
    <div className="screen screen--blur-bg" style={{ overflow: 'hidden' }}>
      <ImpactShards/>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 0, width: '100%', maxWidth: 400,
        padding: 'max(env(safe-area-inset-top, 0px), 24px) 24px max(env(safe-area-inset-bottom, 0px), 24px)',
        height: '100%', justifyContent: 'center',
        position: 'relative', zIndex: 1,
      }}>

        {/* Failure icon — geometric, not emoji */}
        <motion.div
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          style={{ marginBottom: 16 }}
        >
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <circle cx="36" cy="36" r="34" fill="rgba(255,23,68,0.12)" stroke="rgba(255,23,68,0.4)" strokeWidth="2"/>
            <motion.path
              d="M22 22 L50 50 M50 22 L22 50"
              stroke="#FF2A5F"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          style={{ textAlign: 'center', marginBottom: 24 }}
        >
          <h1 style={{
            fontFamily: 'var(--font-brand)',
            fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
            fontWeight: 900,
            background: 'var(--grad-danger)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.04em',
            marginBottom: 8,
          }}>
            {isSpecialMode ? 'GAME OVER' : 'LEVEL FAILED'}
          </h1>
          <p style={{ color: 'var(--c-text-sub)', fontSize: '0.9rem', letterSpacing: '0.02em' }}>
            {failReason()}
          </p>
        </motion.div>

        {/* Stats card */}
        <motion.div
          className="panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          style={{
            width: '100%', marginBottom: 20,
            padding: '0', overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--c-text-sub)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Mode
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 900 }}>{displayTitle}</span>
          </div>
          <div className="divider" style={{ margin: 0 }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--c-text-sub)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Score
            </span>
            <span style={{
              fontFamily: 'var(--font-brand)',
              fontSize: '1.3rem', fontWeight: 900,
            }}>
              {score.toLocaleString()}
            </span>
          </div>
          {isSpecialMode && isNewBest && (
            <>
              <div className="divider" style={{ margin: 0 }}/>
              <div style={{ padding: '10px 20px', textAlign: 'center' }}>
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  style={{ fontSize: '0.8rem', fontWeight: 900, color: '#FFD740', letterSpacing: '0.1em' }}
                >
                  ✦ NEW BEST ✦
                </motion.span>
              </div>
            </>
          )}
        </motion.div>

        {/* Ad error */}
        {adError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              padding: '8px 14px', borderRadius: 'var(--r-md)',
              background: 'rgba(255,23,68,0.12)', border: '1px solid rgba(255,23,68,0.3)',
              color: '#ff8888', fontSize: '0.8rem', textAlign: 'center',
              width: '100%', marginBottom: 10,
            }}
          >
            {adError}
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}
        >
          {/* Revive button */}
          {canRevive && (
            <motion.button
              className="btn btn--secondary btn--lg"
              style={{ width: '100%' }}
              onClick={handleRevive}
              disabled={adLoading || isNavigating}
              whileTap={{ scale: 0.94 }}
            >
              {adLoading ? 'Loading...' : 'Watch Ad · Revive (1×)'}
            </motion.button>
          )}

          {/* Retry */}
          <motion.button
            className="btn btn--primary btn--xl"
            style={{ width: '100%', gap: 10 }}
            onClick={() => { if (currentLevelId) handleNextAction(() => startGame(currentLevelId)); }}
            disabled={adLoading || isNavigating}
            whileTap={{ scale: 0.94 }}
          >
            <RetryIcon size={20}/>
            Try Again
          </motion.button>

          {/* Map + Exit row */}
          <div style={{ display: 'flex', gap: 10 }}>
            <motion.button
              className="btn btn--ghost btn--md"
              style={{ flex: 1, gap: 8 }}
              onClick={() => handleNextAction(() => setPhase(GamePhase.LEVEL_LOADING))}
              disabled={adLoading || isNavigating}
              whileTap={{ scale: 0.92 }}
            >
              <MapIcon size={16}/>
              Level Map
            </motion.button>
            <motion.button
              className="btn btn--danger btn--md"
              style={{ flex: 1, gap: 8 }}
              onClick={() => handleNextAction(() => setPhase(GamePhase.MAIN_MENU))}
              disabled={adLoading || isNavigating}
              whileTap={{ scale: 0.92 }}
            >
              <ExitIcon size={16}/>
              Exit
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
