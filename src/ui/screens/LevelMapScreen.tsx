import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { LevelRegistry } from '../../core/progression/LevelRegistry';
import { WorldRegistry } from '../../core/progression/WorldRegistry';
import { BackIcon, StarIcon, LockIcon, CheckIcon } from '../icons/GameIcons';

/* ─── World theme definitions ──────────────────────────── */
const WORLD_THEMES: Record<string, {
  gradient: string;
  accentColor: string;
  nodeGrad: string;
  icon: string;
  description: string;
}> = {
  world_1:  { gradient: 'linear-gradient(135deg, #091A0E, #152B15)', accentColor: '#52C22B', nodeGrad: 'linear-gradient(135deg, #3D8B37, #52C22B)', icon: '🌱', description: 'Fresh Beginnings' },
  world_2:  { gradient: 'linear-gradient(135deg, #1A1005, #2A1A00)', accentColor: '#FF9800', nodeGrad: 'linear-gradient(135deg, #E65100, #FF9800)', icon: '🌴', description: 'Tropical Paradise' },
  world_3:  { gradient: 'linear-gradient(135deg, #1A1600, #2A2400)', accentColor: '#FFEB3B', nodeGrad: 'linear-gradient(135deg, #F57F17, #FFEB3B)', icon: '🍋', description: 'Citrus Frenzy' },
  world_4:  { gradient: 'linear-gradient(135deg, #081520, #102030)', accentColor: '#03A9F4', nodeGrad: 'linear-gradient(135deg, #0277BD, #03A9F4)', icon: '❄️', description: 'Frozen Tundra' },
  world_5:  { gradient: 'linear-gradient(135deg, #200505, #340800)', accentColor: '#F44336', nodeGrad: 'linear-gradient(135deg, #B71C1C, #F44336)', icon: '🌋', description: 'Volcanic Fury' },
  world_6:  { gradient: 'linear-gradient(135deg, #150020, #280040)', accentColor: '#E91E63', nodeGrad: 'linear-gradient(135deg, #880E4F, #E91E63)', icon: '⚡', description: 'Neon Rush' },
  world_7:  { gradient: 'linear-gradient(135deg, #0A0520, #150835)', accentColor: '#9C27B0', nodeGrad: 'linear-gradient(135deg, #4A148C, #9C27B0)', icon: '⛈️', description: 'Storm Surge' },
  world_8:  { gradient: 'linear-gradient(135deg, #050015, #0A0028)', accentColor: '#673AB7', nodeGrad: 'linear-gradient(135deg, #311B92, #673AB7)', icon: '🌌', description: 'Cosmic Drift' },
  world_9:  { gradient: 'linear-gradient(135deg, #050505, #0A0A0A)', accentColor: '#424242', nodeGrad: 'linear-gradient(135deg, #212121, #424242)', icon: '🕳️', description: 'The Void' },
  world_10: { gradient: 'linear-gradient(135deg, #1A1200, #2A1E00)', accentColor: '#FFC107', nodeGrad: 'linear-gradient(135deg, #F57F17, #FFC107)', icon: '👑', description: 'Master\'s Trial' },
};

/* ─── Star Row Component ────────────────────────────────── */
const StarRow = ({ count }: { count: number }) => (
  <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
    {[0, 1, 2].map(i => (
      <StarIcon
        key={i}
        size={10}
        color={i < count ? '#FFD740' : 'rgba(255,255,255,0.15)'}
        filled={i < count}
      />
    ))}
  </div>
);

/* ─── Level Node Component ──────────────────────────────── */
const LevelNode = ({
  levelNum,
  stars,
  isCompleted,
  isCurrent,
  isLocked,
  onClick,
  accentColor,
  nodeGrad,
  index,
}: {
  levelNum: number;
  stars: number;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  onClick: () => void;
  accentColor: string;
  nodeGrad: string;
  index: number;
}) => {
  return (
    <motion.div
      className={`level-node${isLocked ? ' level-node--locked' : isCompleted ? ' level-node--completed' : isCurrent ? ' level-node--current' : ''}`}
      initial={{ opacity: 0, scale: 0.6, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: Math.min(0.02 * index, 0.5),
        type: 'spring',
        stiffness: 280,
        damping: 22,
      }}
      onClick={isLocked ? undefined : onClick}
      style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
    >
      <div
        className="level-node__circle"
        style={
          isCompleted
            ? { background: 'linear-gradient(135deg, #00C853, #00E676)', borderColor: '#00E676', boxShadow: '0 4px 16px rgba(0,230,118,0.35)' }
            : isCurrent
            ? { background: nodeGrad, borderColor: accentColor, boxShadow: `0 4px 20px ${accentColor}55` }
            : isLocked
            ? { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }
            : { background: nodeGrad, borderColor: accentColor, opacity: 0.75 }
        }
      >
        {isLocked
          ? <LockIcon size={20} color="rgba(255,255,255,0.3)"/>
          : isCompleted
          ? <CheckIcon size={20} color="#003d18"/>
          : <span style={{ color: '#fff', fontWeight: 900, fontSize: '1rem' }}>{levelNum}</span>
        }
      </div>
      <StarRow count={stars}/>
      {!isLocked && (
        <div className="level-node__label">Lv.{levelNum}</div>
      )}
    </motion.div>
  );
};

/* ─── World Section Component ───────────────────────────── */
const WorldSection = ({
  worldName,
  worldDescription,
  accentColor,
  nodeGrad,
  gradient,
  worldLevels,
  completedLevels,
  starsPerLevel,
  nextLevelIndex,
  allLevels,
  onLevelClick,
  worldIndex,
}: {
  worldName: string;
  worldDescription: string;
  accentColor: string;
  nodeGrad: string;
  gradient: string;
  worldLevels: any[];
  completedLevels: string[];
  starsPerLevel: Record<string, number>;
  nextLevelIndex: number;
  allLevels: any[];
  onLevelClick: (levelId: string) => void;
  worldIndex: number;
}) => {
  const completedCount = worldLevels.filter(l => completedLevels.includes(l.id)).length;
  const totalCount = worldLevels.length;
  const pct = totalCount > 0 ? completedCount / totalCount : 0;
  const isFullyLocked = worldLevels.every((l) => {
    const globalIdx = allLevels.findIndex(a => a.id === l.id);
    return globalIdx > nextLevelIndex;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: worldIndex * 0.06, duration: 0.3 }}
      style={{ marginBottom: 32 }}
    >
      {/* World header */}
      <div style={{
        padding: '16px 20px',
        borderRadius: 'var(--r-xl)',
        background: gradient,
        border: `1px solid ${accentColor}33`,
        marginBottom: 20,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* World glow */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: '40%',
          background: `radial-gradient(circle at right, ${accentColor}20, transparent 70%)`,
          pointerEvents: 'none',
        }}/>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: accentColor, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              WORLD {worldIndex + 1}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#fff', marginTop: 2 }}>
              {worldName}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
              {worldDescription}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: accentColor }}>
              {completedCount}<span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>/{totalCount}</span>
            </div>
            <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)' }}>
              LEVELS
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--r-pill)', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct * 100}%` }}
            transition={{ duration: 0.8, delay: worldIndex * 0.08, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: isFullyLocked ? 'rgba(255,255,255,0.2)' : `linear-gradient(90deg, ${accentColor}99, ${accentColor})`,
              borderRadius: 'var(--r-pill)',
            }}
          />
        </div>
      </div>

      {/* Level grid with path visualization */}
      <div style={{ position: 'relative', paddingLeft: 8, paddingRight: 8 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '20px 6px',
          position: 'relative',
          zIndex: 1,
        }}>
          {worldLevels.map((level, lIdx) => {
            const globalIdx = allLevels.findIndex(l => l.id === level.id);
            const stars = starsPerLevel[level.id] || 0;
            const isCompleted = completedLevels.includes(level.id);
            const isCurrent = globalIdx === nextLevelIndex;
            const isLocked = globalIdx > nextLevelIndex;

            return (
              <LevelNode
                key={level.id}
                levelNum={level.levelNumber}
                stars={stars}
                isCompleted={isCompleted}
                isCurrent={isCurrent}
                isLocked={isLocked}
                onClick={() => onLevelClick(level.id)}
                accentColor={accentColor}
                nodeGrad={nodeGrad}
                index={lIdx}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Component ─────────────────────────────────────── */
export const LevelMapScreen = () => {
  const startGame = useGameState(s => s.startGame);
  const setPhase  = useGameState(s => s.setPhase);
  const { completedLevels, starsPerLevel } = useProgressionState();
  const scrollRef = useRef<HTMLDivElement>(null);

  const allLevels = Object.values(LevelRegistry).sort((a, b) => a.levelNumber - b.levelNumber);
  const worlds = Object.values(WorldRegistry).sort((a, b) => a.levelStart - b.levelStart);
  
  const maxCompletedIdx = allLevels.reduce((max, l, idx) => completedLevels.includes(l.id) ? Math.max(max, idx) : max, -1);
  const nextLevelIndex = maxCompletedIdx + 1;

  const totalStars = Object.values(starsPerLevel).reduce((a, b) => a + b, 0);
  const maxStars = allLevels.length * 3;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      background: 'var(--grad-bg)',
    }}>
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          padding: 'max(env(safe-area-inset-top, 0px), 12px) 20px 14px',
          display: 'flex', alignItems: 'center', gap: 14,
          background: 'rgba(0,0,0,0.4)',
          borderBottom: '1px solid var(--c-border)',
          backdropFilter: 'blur(16px)',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <motion.button
          className="btn btn--ghost btn--icon"
          whileTap={{ scale: 0.88 }}
          onClick={() => setPhase(GamePhase.MAIN_MENU)}
          aria-label="Back"
        >
          <BackIcon size={20}/>
        </motion.button>

        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.04em' }}>WORLD MAP</h2>
          <p style={{ fontSize: '0.72rem', color: 'var(--c-text-sub)', marginTop: 2 }}>
            {completedLevels.length} / {allLevels.length} levels
          </p>
        </div>

        {/* Total stars display */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 12px',
          borderRadius: 'var(--r-pill)',
          background: 'rgba(255,215,64,0.08)',
          border: '1px solid rgba(255,215,64,0.2)',
        }}>
          <StarIcon size={14} color="#FFD740"/>
          <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#FFD740' }}>
            {totalStars} / {maxStars}
          </span>
        </div>
      </motion.div>

      {/* Overall progress */}
      <div style={{
        padding: '10px 20px',
        background: 'rgba(0,0,0,0.2)',
        flexShrink: 0,
      }}>
        <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--r-pill)', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedLevels.length / allLevels.length) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            style={{
              height: '100%',
              background: 'var(--grad-primary)',
              borderRadius: 'var(--r-pill)',
            }}
          />
        </div>
      </div>

      {/* Scrollable world list */}
      <div
        ref={scrollRef}
        className="scroll-y"
        style={{ flex: 1, padding: '20px 16px 60px' }}
      >
        {worlds.map((world, wIdx) => {
          const theme = WORLD_THEMES[world.id] || {
            gradient: 'linear-gradient(135deg, #101020, #1A1A30)',
            accentColor: '#fff',
            nodeGrad: 'linear-gradient(135deg, #333, #555)',
            description: '',
          };
          const worldLevels = allLevels.filter(l => l.worldId === world.id);

          return (
            <WorldSection
              key={world.id}
              worldName={world.name}
              worldDescription={theme.description}
              accentColor={theme.accentColor}
              nodeGrad={theme.nodeGrad}
              gradient={theme.gradient}
              worldLevels={worldLevels}
              completedLevels={completedLevels}
              starsPerLevel={starsPerLevel}
              nextLevelIndex={nextLevelIndex}
              allLevels={allLevels}
              onLevelClick={(id) => startGame(id)}
              worldIndex={wIdx}
            />
          );
        })}

        {/* Bottom spacer for home indicator */}
        <div style={{ height: 'max(env(safe-area-inset-bottom, 0px), 16px)' }}/>
      </div>
    </div>
  );
};
