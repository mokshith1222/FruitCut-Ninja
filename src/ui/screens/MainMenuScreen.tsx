import React from 'react';
import { motion } from 'framer-motion';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { useChallengeState } from '../../challenges/ChallengeManager';
import { SafeAreaContainer } from '../components/core/Viewport';
import { CoinBalance } from '../components/core/CoinBalance';
import { Colors, Typography, Radii } from '../design-system/tokens';

export const MainMenuScreen: React.FC = () => {
  const setPhase = useGameState(s => s.setPhase);
  const startGame = useGameState(s => s.startGame);
  const { completedLevels, starsPerLevel, bestTimeAttackScore, bestEndlessScore } = useProgressionState();
  const { streak } = useChallengeState();

  const totalStars = Object.values(starsPerLevel).reduce((a, b) => a + b, 0);
  const nextLevelNum = completedLevels.length + 1;
  const currentWorldNum = Math.min(10, Math.floor((nextLevelNum - 1) / 30) + 1);

  return (
    <SafeAreaContainer
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '16px 20px 24px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      {/* ========================================================================= */}
      {/* 1. TOP BAR: Currency, Level Progress Badge, and Settings                  */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          zIndex: 20,
        }}
      >
        {/* Coin Balance with quick Shop plus button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div onClick={() => setPhase(GamePhase.SHOP)} style={{ cursor: 'pointer' }}>
            <CoinBalance variant="compact" />
          </div>
          <button
            onClick={() => setPhase(GamePhase.SHOP)}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
              border: 'none',
              color: '#000',
              fontWeight: 900,
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(255, 184, 0, 0.4)',
            }}
          >
            +
          </button>
        </div>

        {/* Level / Star Progression pill */}
        <div
          onClick={() => setPhase(GamePhase.LEVEL_LOADING)}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: Radii.pill,
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>
            Lv. {nextLevelNum}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>•</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFD700', display: 'flex', alignItems: 'center', gap: 2 }}>
            ⭐ {totalStars}
          </span>
        </div>

        {/* Settings button */}
        <button
          onClick={() => setPhase(GamePhase.SETTINGS)}
          style={{
            width: 40,
            height: 40,
            borderRadius: Radii.md,
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            color: '#fff',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          ⚙️
        </button>
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. HERO LOGO & FLOATING JUICY FRUITS                                     */}
      {/* ========================================================================= */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '24px 0 16px',
          position: 'relative',
        }}
      >
        {/* Floating Fruit Accent Left */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotate: [-12, 8, -12],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: '8%',
            top: '-4px',
            fontSize: '2.4rem',
            filter: 'drop-shadow(0 8px 16px rgba(255, 42, 95, 0.4))',
            pointerEvents: 'none',
          }}
        >
          🍎
        </motion.div>

        {/* Floating Fruit Accent Right */}
        <motion.div
          animate={{
            y: [8, -8, 8],
            rotate: [10, -10, 10],
          }}
          transition={{
            repeat: Infinity,
            duration: 4.5,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            right: '8%',
            top: '8px',
            fontSize: '2.6rem',
            filter: 'drop-shadow(0 8px 16px rgba(255, 184, 0, 0.4))',
            pointerEvents: 'none',
          }}
        >
          🍉
        </motion.div>

        {/* Brand Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          style={{ textAlign: 'center', zIndex: 1 }}
        >
          <div
            style={{
              fontSize: 'clamp(2.6rem, 9vw, 4rem)',
              fontFamily: Typography.fontFamily,
              fontWeight: Typography.weights.black,
              letterSpacing: '0.04em',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FFD2DC 40%, #FF2A5F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 6px 20px rgba(255, 42, 95, 0.55))',
            }}
          >
            FRUIT CUT
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.3em',
              color: 'var(--c-accent)',
              textTransform: 'uppercase',
              opacity: 0.9,
            }}
          >
            PREMIUM ARCADE
          </div>
        </motion.div>

        {/* Daily Streak & Bonus Reminder Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => setPhase(GamePhase.DAILY_REWARD)}
          style={{
            marginTop: 18,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 18px',
            borderRadius: Radii.pill,
            background: 'linear-gradient(90deg, rgba(255, 68, 0, 0.15), rgba(255, 184, 0, 0.15))',
            border: '1px solid rgba(255, 140, 0, 0.35)',
            boxShadow: '0 4px 16px rgba(255, 68, 0, 0.2)',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>🔥</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFB800' }}>
            {streak.current || 1} Day Streak
          </span>
          <span style={{ fontSize: '0.75rem', color: '#fff', opacity: 0.8 }}>
            • Claim Gift 🎁
          </span>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 3. GAME MODES (CENTRAL ACTION HUB)                                        */}
      {/* ========================================================================= */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          width: '100%',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        {/* HERO: Play Next Level (Primary Campaign Button) */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => startGame(`level_${nextLevelNum}`)}
          style={{
            width: '100%',
            padding: '20px 24px',
            borderRadius: Radii.lg,
            background: 'linear-gradient(135deg, #FF2A5F 0%, #FF6036 50%, #FFA000 100%)',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(255, 42, 95, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Shimmer Bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '35%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 1 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.9 }}>
              CAMPAIGN • WORLD {currentWorldNum}
            </span>
            <span style={{ fontSize: '1.45rem', fontWeight: 900, letterSpacing: '0.02em', marginTop: 2 }}>
              PLAY LEVEL {nextLevelNum}
            </span>
          </div>

          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              zIndex: 1,
            }}
          >
            ▶
          </div>
        </motion.button>

        {/* SECONDARY MODES: Time Attack & Endless */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {/* Time Attack Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => startGame('time_attack')}
            style={{
              cursor: 'pointer',
              padding: '16px 14px',
              borderRadius: Radii.lg,
              background: 'rgba(255, 184, 0, 0.08)',
              border: '1px solid rgba(255, 184, 0, 0.25)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 100,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>⏱️</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#FFB800', background: 'rgba(255,184,0,0.15)', padding: '2px 8px', borderRadius: 100 }}>
                60s BLITZ
              </span>
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
                Time Attack
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
                Best: {bestTimeAttackScore > 0 ? `${bestTimeAttackScore.toLocaleString()} pts` : 'Play now'}
              </div>
            </div>
          </motion.div>

          {/* Endless Survival Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => startGame('endless')}
            style={{
              cursor: 'pointer',
              padding: '16px 14px',
              borderRadius: Radii.lg,
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid rgba(0, 229, 255, 0.25)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 100,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>♾️</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#00E5FF', background: 'rgba(0,229,255,0.15)', padding: '2px 8px', borderRadius: 100 }}>
                3 LIVES
              </span>
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
                Endless
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
                Best: {bestEndlessScore > 0 ? `${bestEndlessScore.toLocaleString()} pts` : 'Survive now'}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM NAVIGATION DOCK                                                 */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        style={{
          width: '100%',
          maxWidth: '480px',
          margin: '16px auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          padding: '8px 12px',
          borderRadius: Radii.xl,
          background: 'rgba(18, 22, 38, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Tab 1: Shop */}
        <button
          onClick={() => setPhase(GamePhase.SHOP)}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: '8px 0',
            cursor: 'pointer',
            borderRadius: Radii.md,
            color: '#fff',
          }}
        >
          <span style={{ fontSize: '1.35rem' }}>🛒</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.04em' }}>SHOP</span>
        </button>

        {/* Tab 2: Level Map */}
        <button
          onClick={() => setPhase(GamePhase.LEVEL_LOADING)}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: '8px 0',
            cursor: 'pointer',
            borderRadius: Radii.md,
            color: '#fff',
          }}
        >
          <span style={{ fontSize: '1.35rem' }}>🗺️</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.04em' }}>MAP</span>
        </button>

        {/* Tab 3: Challenges */}
        <button
          onClick={() => setPhase(GamePhase.CHALLENGES)}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: '8px 0',
            cursor: 'pointer',
            borderRadius: Radii.md,
            color: '#fff',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: '1.35rem' }}>🏆</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.04em' }}>QUESTS</span>
          {/* Notification Dot */}
          <span
            style={{
              position: 'absolute',
              top: 6,
              right: '25%',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: Colors.accent.primary,
              boxShadow: '0 0 8px #FF2A5F',
            }}
          />
        </button>

        {/* Tab 4: Daily Rewards */}
        <button
          onClick={() => setPhase(GamePhase.DAILY_REWARD)}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: '8px 0',
            cursor: 'pointer',
            borderRadius: Radii.md,
            color: '#fff',
          }}
        >
          <span style={{ fontSize: '1.35rem' }}>🎁</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.04em' }}>DAILY</span>
        </button>
      </motion.div>
    </SafeAreaContainer>
  );
};
