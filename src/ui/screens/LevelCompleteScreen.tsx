import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { LevelRegistry } from '../../core/progression/LevelRegistry';
import { AdSystem } from '../../ads/AdSystem';
import { AdsManager } from '../../ads/AdsManager';
import { RewardManager } from '../../economy/RewardManager';
import { GameFeelManager } from '../../gamefeel/GameFeelManager';
import { EconomyManager } from '../../economy/EconomyManager';
import { StarIcon, ChevronRightIcon, RetryIcon, MapIcon, CoinIcon } from '../icons/GameIcons';

const calcStars = (score: number, thresholds?: { one: number; two: number; three: number }) => {
  if (!thresholds) return 1;
  if (score >= thresholds.three) return 3;
  if (score >= thresholds.two) return 2;
  return 1;
};

/* ─── Animated Star ────────────────────────────────────── */
const AnimatedStar = ({ index, filled, size = 52 }: { index: number; filled: boolean; size?: number }) => (
  <motion.div
    initial={{ scale: 0, rotate: -45, opacity: 0 }}
    animate={{ scale: 1, rotate: 0, opacity: 1 }}
    transition={{
      delay: 0.5 + index * 0.18,
      type: 'spring',
      stiffness: 420,
      damping: 18,
    }}
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <motion.div
      animate={filled ? {
        filter: [
          'drop-shadow(0 0 0px rgba(255,215,64,0))',
          'drop-shadow(0 0 16px rgba(255,215,64,0.9))',
          'drop-shadow(0 0 8px rgba(255,215,64,0.5))',
        ],
      } : {}}
      transition={{ delay: 0.6 + index * 0.18, duration: 0.5 }}
    >
      <StarIcon
        size={size}
        color={filled ? '#FFD740' : 'rgba(255,255,255,0.12)'}
        filled={filled}
      />
    </motion.div>
  </motion.div>
);

/* ─── Particle burst effect ─────────────────────────────── */
const SuccessParticles = () => {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    angle: (i / 16) * Math.PI * 2,
    distance: 60 + Math.random() * 80,
    color: i % 3 === 0 ? '#FFD740' : i % 3 === 1 ? '#FF2A5F' : '#00E5FF',
    size: 4 + Math.random() * 5,
  }));

  return (
    <motion.div
      style={{ position: 'absolute', top: '35%', left: '50%', pointerEvents: 'none', zIndex: 0 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: p.color,
            left: 0, top: 0,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance + 30,
            opacity: 0,
            scale: 0.2,
          }}
          transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  );
};

export const LevelCompleteScreen = () => {
  const { startGame, setPhase, score, currentLevelId, currentLevelConfig } = useGameState();
  const { completeLevel, starsPerLevel, completedLevels, updateBestScores } = useProgressionState();

  const [rewardGranted, setRewardGranted]  = useState(false);
  const [earnedCoins, setEarnedCoins]      = useState(0);
  const [doubleAdState, setDoubleAdState]  = useState<'idle' | 'loading' | 'watched'>('idle');
  const [isNavigating, setIsNavigating]    = useState(false);
  const [isNewBest, setIsNewBest]          = useState(false);
  const [adError, setAdError]              = useState<string | null>(null);

  // Sequential reveal stages
  const [stage, setStage] = useState(0); // 0=nothing, 1=score, 2=stars, 3=coins, 4=buttons

  const isSpecialMode = currentLevelId === 'time_attack' || currentLevelId === 'endless';
  const levelNum      = parseInt(currentLevelId?.replace('level_', '') ?? '1');
  const earnedStars   = calcStars(score, currentLevelConfig?.starThresholds);
  const prevStars     = starsPerLevel[currentLevelId ?? ''] ?? 0;
  const nextLevelId   = `level_${levelNum + 1}`;
  const hasNextLevel  = !!LevelRegistry[nextLevelId];

  useEffect(() => {
    if (!rewardGranted && currentLevelId) {
      if (isSpecialMode) {
        const newBest = updateBestScores(currentLevelId as any, score);
        setIsNewBest(newBest);
      } else {
        const isFirstTime = !completedLevels.includes(currentLevelId);
        let totalCoins = RewardManager.grantLevelCompletion(currentLevelId, isFirstTime, currentLevelConfig?.rewards?.baseCoins || 0);
        if (earnedStars > prevStars) {
          const newStarIndices: number[] = [];
          for (let i = prevStars + 1; i <= earnedStars; i++) newStarIndices.push(i);
          totalCoins += RewardManager.grantLevelStars(currentLevelId, newStarIndices);
        }
        setEarnedCoins(totalCoins);
        completeLevel(currentLevelId, earnedStars);
      }
      GameFeelManager.onLevelComplete();
      AdSystem.notifyLevelCompleted();
      setRewardGranted(true);
    }
  }, [currentLevelId, rewardGranted, earnedStars, currentLevelConfig, completeLevel, isSpecialMode, updateBestScores, score, completedLevels, prevStars]);

  // Sequential animation stages
  useEffect(() => {
    if (!rewardGranted) return;
    const t1 = setTimeout(() => setStage(1), 200);
    const t2 = setTimeout(() => setStage(2), 700);
    const t3 = setTimeout(() => setStage(3), 1200);
    const t4 = setTimeout(() => setStage(4), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [rewardGranted]);

  const handleNextAction = async (action: () => void) => {
    if (isNavigating) return;
    setIsNavigating(true);
    if (AdsManager.shouldShowInterstitial(completedLevels.length)) {
      await AdsManager.showInterstitial(completedLevels.length);
    }
    action();
  };

  const handleDoubleReward = async () => {
    if (doubleAdState !== 'idle' || earnedCoins <= 0) return;
    setDoubleAdState('loading');
    setAdError(null);
    await AdsManager.showRewardedAd({
      rewardType: 'DOUBLE_COINS',
      amount: earnedCoins,
      onSuccess: (amount) => {
        EconomyManager.addCoins(amount, 'AD_REWARD', 'double_reward');
        setDoubleAdState('watched');
        GameFeelManager.onRewardClaimed();
      },
      onCancel: () => setDoubleAdState('idle'),
      onError: () => { setDoubleAdState('idle'); setAdError('Ad unavailable right now.'); },
    });
  };

  const titleText = isSpecialMode
    ? (currentLevelId === 'time_attack' ? 'Time Attack!' : 'Endless Run!')
    : `Level ${levelNum}`;

  return (
    <div className="screen screen--blur-bg" style={{ overflow: 'hidden' }}>
      <SuccessParticles/>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 0, width: '100%', maxWidth: 420,
        padding: 'max(env(safe-area-inset-top, 0px), 24px) 24px max(env(safe-area-inset-bottom, 0px), 24px)',
        height: '100%', justifyContent: 'center',
        position: 'relative', zIndex: 1,
      }}>

        {/* Title */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
          style={{ textAlign: 'center', marginBottom: 6 }}
        >
          <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', color: 'var(--c-success)', textTransform: 'uppercase', marginBottom: 6 }}>
            COMPLETE
          </div>
          <h1 style={{
            fontFamily: 'var(--font-brand)',
            fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
            fontWeight: 900,
            background: 'var(--grad-success)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.04em',
          }}>
            {titleText}
          </h1>
        </motion.div>

        {/* Stars */}
        <motion.div
          style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24, marginTop: 8 }}
        >
          {[0, 1, 2].map(i => (
            <AnimatedStar key={i} index={i} filled={i < earnedStars} size={48}/>
          ))}
        </motion.div>

        {/* Stats Panel */}
        <motion.div
          className="panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 24 }}
          transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 0, padding: 0, overflow: 'hidden', marginBottom: 14 }}
        >
          {/* Score */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '16px 20px',
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--c-text-sub)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Score
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: stage >= 1 ? 1 : 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '1.5rem',
                fontWeight: 900,
                color: '#fff',
              }}
            >
              {score.toLocaleString()}
            </motion.span>
          </div>

          <div className="divider" style={{ margin: 0 }}/>

          {/* Coins earned */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 3 ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 20px',
            }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--c-text-sub)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Coins
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CoinIcon size={18}/>
              <span style={{
                fontSize: '1.3rem', fontWeight: 900, color: 'var(--c-coin)',
              }}>
                +{earnedCoins}
              </span>
              {doubleAdState === 'watched' && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--c-success)', background: 'var(--c-success-dim)', padding: '2px 8px', borderRadius: 'var(--r-pill)' }}
                >
                  ×2!
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* New best */}
          <AnimatePresence>
            {(isNewBest || (earnedStars > prevStars && prevStars > 0)) && stage >= 2 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div className="divider" style={{ margin: 0 }}/>
                <div style={{ padding: '10px 20px', display: 'flex', justifyContent: 'center' }}>
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    style={{
                      fontSize: '0.8rem', fontWeight: 900, color: '#FFD740',
                      textShadow: '0 0 12px rgba(255,215,64,0.6)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    ✦ NEW BEST ✦
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: stage >= 4 ? 1 : 0, y: stage >= 4 ? 0 : 20 }}
          transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}
        >
          {adError && (
            <div style={{
              padding: '8px 14px', borderRadius: 'var(--r-md)',
              background: 'rgba(255,23,68,0.12)', border: '1px solid rgba(255,23,68,0.3)',
              color: '#ff8888', fontSize: '0.8rem', textAlign: 'center',
            }}>
              {adError}
            </div>
          )}

          {/* Double coins ad */}
          {doubleAdState !== 'watched' && earnedCoins > 0 && (
            <motion.button
              className="btn btn--secondary btn--lg"
              style={{ width: '100%' }}
              onClick={handleDoubleReward}
              disabled={doubleAdState === 'loading'}
              whileTap={{ scale: 0.94 }}
            >
              {doubleAdState === 'loading' ? 'Loading...' : `Watch Ad · 2× Coins`}
            </motion.button>
          )}

          {/* Next level / done */}
          {hasNextLevel ? (
            <motion.button
              className="btn btn--primary btn--xl"
              style={{ width: '100%' }}
              onClick={() => handleNextAction(() => startGame(nextLevelId))}
              disabled={isNavigating || doubleAdState === 'loading'}
              whileTap={{ scale: 0.94 }}
            >
              Next Level
              <ChevronRightIcon size={20}/>
            </motion.button>
          ) : (
            <motion.button
              className="btn btn--primary btn--xl"
              style={{ width: '100%' }}
              onClick={() => handleNextAction(() => setPhase(GamePhase.MAIN_MENU))}
              disabled={isNavigating || doubleAdState === 'loading'}
              whileTap={{ scale: 0.94 }}
            >
              All Done!
            </motion.button>
          )}

          {/* Replay + Map */}
          <div style={{ display: 'flex', gap: 10 }}>
            <motion.button
              className="btn btn--ghost btn--md"
              style={{ flex: 1, gap: 8 }}
              onClick={() => { if (currentLevelId) handleNextAction(() => startGame(currentLevelId)); }}
              disabled={isNavigating || doubleAdState === 'loading'}
              whileTap={{ scale: 0.92 }}
            >
              <RetryIcon size={16}/>
              Replay
            </motion.button>
            <motion.button
              className="btn btn--ghost btn--md"
              style={{ flex: 1, gap: 8 }}
              onClick={() => handleNextAction(() => setPhase(GamePhase.LEVEL_LOADING))}
              disabled={isNavigating || doubleAdState === 'loading'}
              whileTap={{ scale: 0.92 }}
            >
              <MapIcon size={16}/>
              Map
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
