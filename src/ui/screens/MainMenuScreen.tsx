import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { useChallengeState } from '../../challenges/ChallengeManager';
import { SafeAreaContainer } from '../components/core/Viewport';
import { CoinBalance } from '../components/core/CoinBalance';
import {
  SettingsIcon, PlayIcon, TimerIcon, InfinityIcon,
  ShopIcon, MapIcon, TrophyIcon, GiftIcon, StarIcon,
  FlameIcon, ChevronRightIcon
} from '../icons/GameIcons';

/* ─── Floating Fruit Silhouettes (SVG, not emoji) ─────── */
const FRUIT_SILHOUETTES = [
  // Apple
  <svg viewBox="0 0 60 60" fill="none" key="apple">
    <circle cx="30" cy="36" r="20" fill="white" opacity="0.12"/>
    <path d="M30 16 C28 10 22 8 22 8 C24 14 28 16 30 16" fill="white" opacity="0.15"/>
    <path d="M30 16 C32 10 38 8 38 8 C36 14 32 16 30 16" fill="white" opacity="0.15"/>
  </svg>,
  // Watermelon
  <svg viewBox="0 0 60 60" fill="none" key="wm">
    <path d="M10 34 A24 24 0 0 1 50 34 Z" fill="white" opacity="0.1"/>
    <path d="M14 34 A20 20 0 0 1 46 34 Z" fill="white" opacity="0.08"/>
    <circle cx="22" cy="28" r="2" fill="white" opacity="0.15"/>
    <circle cx="30" cy="26" r="2" fill="white" opacity="0.15"/>
    <circle cx="38" cy="28" r="2" fill="white" opacity="0.15"/>
  </svg>,
  // Orange
  <svg viewBox="0 0 60 60" fill="none" key="orange">
    <circle cx="30" cy="32" r="20" fill="white" opacity="0.12"/>
    <line x1="30" y1="12" x2="30" y2="52" stroke="white" strokeWidth="1" opacity="0.08"/>
    <line x1="10" y1="32" x2="50" y2="32" stroke="white" strokeWidth="1" opacity="0.08"/>
    <line x1="15" y1="18" x2="45" y2="46" stroke="white" strokeWidth="1" opacity="0.06"/>
    <line x1="15" y1="46" x2="45" y2="18" stroke="white" strokeWidth="1" opacity="0.06"/>
  </svg>,
  // Pineapple
  <svg viewBox="0 0 60 60" fill="none" key="pine">
    <rect x="22" y="28" width="16" height="24" rx="8" fill="white" opacity="0.12"/>
    <path d="M22 28 L26 18 M30 28 L30 14 M38 28 L34 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.12"/>
  </svg>,
  // Star fruit
  <svg viewBox="0 0 60 60" fill="none" key="star">
    <path d="M30 10L33 22H46L36 30L40 42L30 34L20 42L24 30L14 22H27Z" fill="white" opacity="0.1"/>
  </svg>,
  // Kiwi
  <svg viewBox="0 0 60 60" fill="none" key="kiwi">
    <circle cx="30" cy="32" r="18" fill="white" opacity="0.1"/>
    <circle cx="30" cy="32" r="12" fill="white" opacity="0.06"/>
    <circle cx="30" cy="32" r="4" fill="white" opacity="0.1"/>
  </svg>,
];

const FloatingFruit = ({ index, total }: { index: number; total: number }) => {
  const angle = (index / total) * Math.PI * 2;
  const radius = 38 + (index % 3) * 18;
  const x = 50 + Math.cos(angle) * radius;
  const y = 50 + Math.sin(angle) * radius;
  const size = 48 + (index % 4) * 20;
  const duration = 5 + index * 1.3;
  const delay = index * 0.6;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
      animate={{
        y: [0, -16, 4, -8, 0],
        rotate: [0, 8, -5, 12, 0],
        scale: [1, 1.05, 0.98, 1.02, 1],
      }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: 'easeInOut',
      }}
    >
      {FRUIT_SILHOUETTES[index % FRUIT_SILHOUETTES.length]}
    </motion.div>
  );
};

/* ─── Animated particle dots in background ─────────────── */
const BackgroundParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    dur: 4 + Math.random() * 8,
    delay: Math.random() * 6,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.id % 3 === 0 ? 'rgba(255,42,95,0.6)' : p.id % 3 === 1 ? 'rgba(255,184,0,0.6)' : 'rgba(0,229,255,0.4)',
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ repeat: Infinity, duration: p.dur, delay: p.delay }}
        />
      ))}
    </div>
  );
};

/* ─── World Progress Arc ────────────────────────────────── */
const WorldProgressArc = ({ worldNum, completedInWorld, totalInWorld }: {
  worldNum: number;
  completedInWorld: number;
  totalInWorld: number;
}) => {
  const pct = totalInWorld > 0 ? completedInWorld / totalInWorld : 0;
  const circumference = 2 * Math.PI * 26;
  const dashOffset = circumference * (1 - pct);

  return (
    <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        {/* Track */}
        <circle cx="36" cy="36" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4"/>
        {/* Progress */}
        <motion.circle
          cx="36" cy="36" r="26"
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          transform="rotate(-90 36 36)"
        />
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2A5F"/>
            <stop offset="100%" stopColor="#FFB800"/>
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>
          WORLD
        </span>
        <span style={{ fontSize: '1.3rem', fontWeight: 900, lineHeight: 1, color: '#fff' }}>
          {worldNum}
        </span>
      </div>
    </div>
  );
};

/* ─── Main Component ────────────────────────────────────── */
export const MainMenuScreen: React.FC = () => {
  const setPhase = useGameState(s => s.setPhase);
  const startGame = useGameState(s => s.startGame);
  const {
    completedLevels, starsPerLevel, bestTimeAttackScore, bestEndlessScore,
  } = useProgressionState();
  const { streak } = useChallengeState();

  const totalStars = Object.values(starsPerLevel).reduce((a, b) => a + b, 0);
  const nextLevelNum = completedLevels.length + 1;
  const currentWorldNum = Math.min(10, Math.floor((nextLevelNum - 1) / 30) + 1);
  const levelsInWorld = 30;
  const completedInCurrentWorld = Math.min(
    completedLevels.length - (currentWorldNum - 1) * levelsInWorld,
    levelsInWorld
  );

  return (
    <SafeAreaContainer
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Atmospheric Background ───────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {/* Deep glow orbs */}
        <div style={{
          position: 'absolute',
          top: '-20%', left: '30%',
          width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(255,42,95,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}/>
        <div style={{
          position: 'absolute',
          bottom: '10%', right: '-10%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}/>
        <BackgroundParticles />
        {/* Floating fruit silhouettes */}
        {Array.from({ length: 6 }, (_, i) => (
          <FloatingFruit key={i} index={i} total={6} />
        ))}
      </div>

      {/* ── TOP BAR ─────────────────────────────────────── */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px 0',
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        {/* Coin display */}
        <div onClick={() => setPhase(GamePhase.SHOP)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <CoinBalance variant="compact" />
        </div>

        {/* Stars total */}
        <motion.div
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px',
            borderRadius: 'var(--r-pill)',
            background: 'rgba(255,215,64,0.08)',
            border: '1px solid rgba(255,215,64,0.2)',
          }}
        >
          <StarIcon size={14} color="#FFD740"/>
          <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#FFD740' }}>
            {totalStars.toLocaleString()}
          </span>
        </motion.div>

        {/* Settings */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setPhase(GamePhase.SETTINGS)}
          style={{
            width: 44, height: 44,
            borderRadius: 'var(--r-md)',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid var(--c-border-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <SettingsIcon size={20}/>
        </motion.button>

      </motion.div>

      {/* ── BRAND LOGO SECTION ──────────────────────────── */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.05 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 8,
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <h1 className="brand-title" style={{ textAlign: 'center' }}>FRUIT CUT</h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            letterSpacing: '0.35em',
            color: 'var(--c-accent)',
            textTransform: 'uppercase',
            marginTop: 4,
            opacity: 0.8,
          }}
        >
          PREMIUM ARCADE
        </motion.div>
      </motion.div>

      {/* ── PRIMARY ACTION + WORLD PROGRESS ─────────────── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        padding: '0 20px',
        zIndex: 10,
        flexShrink: 0,
      }}>
        {/* World progress strip */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.35, ease: [0.16,1,0.3,1] }}
          onClick={() => setPhase(GamePhase.LEVEL_LOADING)}
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 18px',
            borderRadius: 'var(--r-xl)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
          }}
        >
          <WorldProgressArc
            worldNum={currentWorldNum}
            completedInWorld={Math.max(0, completedInCurrentWorld)}
            totalInWorld={levelsInWorld}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--c-text-sub)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Campaign
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff', marginTop: 2 }}>
              Level {nextLevelNum}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--c-text-muted)', marginTop: 2 }}>
              {Math.max(0, completedInCurrentWorld)} / {levelsInWorld} in World {currentWorldNum}
            </div>
          </div>
          <ChevronRightIcon size={20} color="rgba(255,255,255,0.4)"/>
        </motion.div>

        {/* PLAY button — main CTA */}
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.08, type: 'spring', stiffness: 320, damping: 22 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => startGame(`level_${nextLevelNum}`)}
          style={{
            width: '100%',
            padding: '22px 24px',
            borderRadius: 'var(--r-xl)',
            background: 'var(--grad-primary)',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 40px rgba(255,42,95,0.5), 0 2px 0 rgba(255,255,255,0.2) inset',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Shine band */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: '45%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}/>
          {/* Horizontal streak */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0, left: '-100%', width: '50%', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
              pointerEvents: 'none',
            }}
            animate={{ left: ['−100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1, ease: 'easeInOut' }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 1 }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>
              CAMPAIGN · WORLD {currentWorldNum}
            </span>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.02em', color: '#fff', marginTop: 3 }}>
              PLAY LEVEL {nextLevelNum}
            </span>
          </div>

          <div style={{
            width: 52, height: 52,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1, flexShrink: 0,
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}>
            <PlayIcon size={22}/>
          </div>
        </motion.button>

        {/* Secondary mode cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.35, ease: [0.16,1,0.3,1] }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          {/* Time Attack */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => startGame('time_attack')}
            style={{
              padding: '16px 14px',
              borderRadius: 'var(--r-lg)',
              background: 'rgba(255,184,0,0.07)',
              border: '1px solid rgba(255,184,0,0.22)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              minHeight: 96,
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'left',
            }}
          >
            <div style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 60, height: 60,
              background: 'radial-gradient(circle, rgba(255,184,0,0.15) 0%, transparent 70%)',
            }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <TimerIcon size={22} color="#FFB800"/>
              <span style={{
                fontSize: '0.62rem', fontWeight: 900, color: '#FFB800',
                background: 'rgba(255,184,0,0.12)', padding: '2px 8px',
                borderRadius: 'var(--r-pill)', letterSpacing: '0.06em',
              }}>
                60s
              </span>
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 900, color: '#fff' }}>Time Attack</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--c-text-sub)', marginTop: 2 }}>
                {bestTimeAttackScore > 0 ? bestTimeAttackScore.toLocaleString() : 'No record'}
              </div>
            </div>
          </motion.button>

          {/* Endless */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => startGame('endless')}
            style={{
              padding: '16px 14px',
              borderRadius: 'var(--r-lg)',
              background: 'rgba(0,229,255,0.07)',
              border: '1px solid rgba(0,229,255,0.2)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              minHeight: 96,
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'left',
            }}
          >
            <div style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 60, height: 60,
              background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)',
            }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <InfinityIcon size={22} color="#00E5FF"/>
              <span style={{
                fontSize: '0.62rem', fontWeight: 900, color: '#00E5FF',
                background: 'rgba(0,229,255,0.1)', padding: '2px 8px',
                borderRadius: 'var(--r-pill)', letterSpacing: '0.06em',
              }}>
                SURVIVAL
              </span>
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 900, color: '#fff' }}>Endless</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--c-text-sub)', marginTop: 2 }}>
                {bestEndlessScore > 0 ? bestEndlessScore.toLocaleString() : 'No record'}
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* Streak banner */}
        <AnimatePresence>
          {streak.current > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.25 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPhase(GamePhase.DAILY_REWARD)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 18px',
                borderRadius: 'var(--r-lg)',
                background: 'linear-gradient(90deg, rgba(255,106,0,0.15), rgba(255,184,0,0.08))',
                border: '1px solid rgba(255,106,0,0.3)',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <FlameIcon size={22} color="#FF6A00"/>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#FFB800' }}>
                  {streak.current} Day Streak
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--c-text-sub)', marginTop: 1 }}>
                  Claim your daily gift
                </div>
              </div>
              <ChevronRightIcon size={18} color="rgba(255,184,0,0.6)"/>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── BOTTOM NAV DOCK ─────────────────────────────── */}
      <motion.nav
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.22, duration: 0.35, ease: [0.16,1,0.3,1] }}
        className="nav-dock"
        style={{ zIndex: 10, flexShrink: 0 }}
      >
        <NavItem
          icon={<ShopIcon size={22}/>}
          label="SHOP"
          onClick={() => setPhase(GamePhase.SHOP)}
        />
        <NavItem
          icon={<MapIcon size={22}/>}
          label="MAP"
          onClick={() => setPhase(GamePhase.LEVEL_LOADING)}
        />
        <NavItem
          icon={<TrophyIcon size={22}/>}
          label="QUESTS"
          onClick={() => setPhase(GamePhase.CHALLENGES)}
          hasNotification
        />
        <NavItem
          icon={<GiftIcon size={22}/>}
          label="DAILY"
          onClick={() => setPhase(GamePhase.DAILY_REWARD)}
        />
      </motion.nav>
    </SafeAreaContainer>
  );
};

/* ─── Nav Item ───────────────────────────────────────────── */
const NavItem = ({
  icon, label, onClick, hasNotification = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  hasNotification?: boolean;
}) => (
  <motion.button
    className="nav-item"
    whileTap={{ scale: 0.84 }}
    onClick={onClick}
  >
    {icon}
    <span className="nav-item__label">{label}</span>
    {hasNotification && <span className="nav-item__dot"/>}
  </motion.button>
);
