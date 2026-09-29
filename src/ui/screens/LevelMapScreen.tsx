import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Screen } from '../components/Layout';
import { IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { LevelDefinitions, Worlds } from '../../levels/LevelDefinitions';

const WORLD_THEMES = [
  { id: Worlds.WORLD_1.id, name: '🌴 Tropical', bgGrad: 'var(--grad-world1)', accent: '#69F0AE' },
  { id: Worlds.WORLD_2.id, name: '🍂 Orchard',  bgGrad: 'var(--grad-world2)', accent: '#FFAB40' },
  { id: Worlds.WORLD_3.id, name: '❄️ Frozen',   bgGrad: 'var(--grad-world3)', accent: '#40C4FF' },
];

export const LevelMapScreen = () => {
  const startGame = useGameState(s => s.startGame);
  const setPhase  = useGameState(s => s.setPhase);
  const { completedLevels, starsPerLevel } = useProgressionState();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Build level list grouped by world
  const allLevels = Object.values(LevelDefinitions).sort((a, b) =>
    parseInt(a.levelId.replace('level_', '')) - parseInt(b.levelId.replace('level_', ''))
  );

  const nextLevelIndex = completedLevels.length; // 0-based index of next to play

  return (
    <Screen blurBg={false} style={{ background: 'var(--grad-bg)', alignItems: 'stretch' }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px 12px',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid var(--c-border)',
        background: 'rgba(0,0,0,0.3)',
        flexShrink: 0,
      }}>
        <IconButton id="btn-back-map" icon="←" onClick={() => setPhase(GamePhase.MAIN_MENU)} label="Back" />
        <div>
          <h2 style={{ fontSize: 'var(--fs-subheading)', fontWeight: 800 }}>Level Map</h2>
          <p style={{ fontSize: 'var(--fs-small)', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
            {completedLevels.length} / 30 complete
          </p>
        </div>
      </div>

      {/* Scrollable map */}
      <div ref={scrollRef} className="scroll-y" style={{ flex: 1, padding: '24px 20px 48px' }}>
        {WORLD_THEMES.map((world, wIdx) => {
          const worldLevels = allLevels.filter(l => l.worldId === world.id);
          return (
            <div key={world.id} style={{ marginBottom: 48 }}>
              {/* World header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: wIdx * 0.1 }}
                style={{
                  marginBottom: 24, padding: '14px 20px',
                  background: `linear-gradient(135deg, ${world.accent}22, transparent)`,
                  borderLeft: `3px solid ${world.accent}`,
                  borderRadius: 12,
                }}
              >
                <h3 style={{ fontSize: 'var(--fs-subheading)', fontWeight: 800 }}>{world.name}</h3>
                <p style={{ fontSize: 'var(--fs-small)', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
                  {worldLevels.filter(l => completedLevels.includes(l.levelId)).length} / {worldLevels.length} levels
                </p>
              </motion.div>

              {/* Level grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '16px 8px',
              }}>
                {worldLevels.map((level, lIdx) => {
                  const globalIdx = allLevels.findIndex(l => l.levelId === level.levelId);
                  const stars = starsPerLevel[level.levelId] || 0;
                  const isCompleted = completedLevels.includes(level.levelId);
                  const isCurrent = globalIdx === nextLevelIndex;
                  const isLocked = globalIdx > nextLevelIndex;

                  let nodeClass = 'level-node';
                  if (isCompleted) nodeClass += ' level-node--completed';
                  else if (isCurrent) nodeClass += ' level-node--current';
                  else if (isLocked) nodeClass += ' level-node--locked';

                  return (
                    <motion.div
                      key={level.levelId}
                      className={nodeClass}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * lIdx, type: 'spring', stiffness: 250, damping: 20 }}
                      onClick={isLocked ? undefined : () => startGame(level.levelId)}
                    >
                      <div className="level-node__circle">
                        {isLocked ? '🔒' : isCompleted ? '✓' : parseInt(level.levelId.replace('level_', ''))}
                      </div>
                      <div className="level-node__stars">
                        {[0,1,2].map(i => (
                          <span key={i} style={{ opacity: i < stars ? 1 : 0.2 }}>⭐</span>
                        ))}
                      </div>
                      <div className="level-node__label">
                        Lv.{level.levelId.replace('level_', '')}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Screen>
  );
};
