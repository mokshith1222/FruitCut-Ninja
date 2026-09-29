import { AnimatePresence, motion } from 'framer-motion';
import { IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';

export const GameplayHUD = () => {
  const {
    setPhase, score, combo, fruitsCut, timeRemaining, misses,
    currentLevelConfig, currentLevelId,
  } = useGameState();

  if (!currentLevelConfig) return null;

  const getObjectiveText = () => {
    switch (currentLevelConfig.objectiveType) {
      case 'CUT_COUNT':    return { label: 'Cut', value: `${fruitsCut} / ${currentLevelConfig.targetCount}` };
      case 'SCORE_TARGET': return { label: 'Target', value: `${score} / ${currentLevelConfig.targetScore}` };
      case 'COMBO_TARGET': return { label: 'Combo', value: `${combo} / ${currentLevelConfig.targetCombo}` };
      case 'SURVIVAL':     return { label: 'Time', value: timeRemaining !== null ? `${Math.ceil(timeRemaining)}s` : '—' };
      default: return { label: '', value: '' };
    }
  };

  const obj = getObjectiveText();
  const isSpecialMode = currentLevelId === 'time_attack' || currentLevelId === 'endless';
  const levelNum = currentLevelId?.replace('level_', '') ?? '?';
  const displayLevel = isSpecialMode ? (currentLevelId === 'time_attack' ? 'TIME' : 'ENDLESS') : `LV. ${levelNum}`;
  const timerDanger = timeRemaining !== null && timeRemaining <= 10;

  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* ---- Top bar ---- */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '24px',
        pointerEvents: 'none',
      }}>
        {/* Left: Score & Objective */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <div style={{
            fontFamily: 'var(--font)',
            fontSize: 'var(--fs-score)', 
            fontWeight: 900, 
            lineHeight: 1,
            color: '#ffffff',
            WebkitTextStroke: '1px rgba(255,255,255,0.4)',
            textShadow: '0 4px 16px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.3)',
            letterSpacing: '0.02em',
          }}>
            {score.toLocaleString()}
          </div>
          
          <div className="hud-badge" style={{ 
            fontSize: '0.9rem', 
            background: 'rgba(20,20,35,0.6)', 
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            padding: '6px 14px'
          }}>
            <span style={{ opacity: 0.7, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{obj.label}</span>
            <strong style={{ color: 'var(--c-accent)' }}>{obj.value}</strong>
          </div>
        </div>

        {/* Center: Timer (only if timed) */}
        {currentLevelConfig.timeLimit && timeRemaining !== null && (
          <motion.div
            className="hud-badge"
            animate={timerDanger ? { scale: [1, 1.1, 1], backgroundColor: ['rgba(0,0,0,0.5)', 'rgba(255,0,0,0.4)', 'rgba(0,0,0,0.5)'] } : {}}
            transition={{ repeat: Infinity, duration: 0.5 }}
            style={{
              fontSize: '1.4rem', fontWeight: 900,
              color: timerDanger ? 'var(--c-primary)' : '#fff',
              border: timerDanger ? '2px solid var(--c-primary)' : '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
              padding: '8px 20px'
            }}
          >
            {Math.ceil(timeRemaining)}s
          </motion.div>
        )}

        {/* Right: pause + level + misses */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, pointerEvents: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="hud-badge" style={{ 
              fontSize: '0.8rem', 
              fontWeight: 800,
              background: 'rgba(255,255,255,0.1)',
              color: 'var(--c-success)',
              letterSpacing: '0.05em'
            }}>
              {displayLevel}
            </div>
            <IconButton id="btn-pause" icon="⏸" onClick={() => setPhase(GamePhase.PAUSED)} label="Pause" variant="ghost" />
          </div>
          {currentLevelConfig.missLimit && (
            <div className="hud-badge" style={{
              fontSize: '0.85rem',
              color: misses >= currentLevelConfig.missLimit - 1 ? 'var(--c-primary)' : '#fff',
              border: misses >= currentLevelConfig.missLimit - 1 ? '1px solid var(--c-primary)' : '1px solid rgba(255,255,255,0.1)'
            }}>
              ❌ {misses} / {currentLevelConfig.missLimit}
            </div>
          )}
        </div>
      </div>

      {/* ---- Combo pop ---- */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5vh', pointerEvents: 'none' }}>
        <AnimatePresence mode="wait">
          {combo > 1 && (
            <motion.div
              key={combo}
              initial={{ scale: 0.3, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.2, opacity: 0, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              style={{
                fontFamily: 'var(--font)',
                fontSize: combo >= 10 ? 'clamp(3rem, 8vw, 4.5rem)' : 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 900,
                color: combo >= 20 ? '#FF00FF' : (combo >= 10 ? 'var(--c-secondary)' : '#fff'),
                textShadow: combo >= 20 ? '0 0 30px rgba(255,0,255,0.8), 0 5px 15px rgba(0,0,0,0.8)' 
                          : (combo >= 10 ? '0 0 20px var(--c-secondary-glow), 0 4px 12px rgba(0,0,0,0.8)' 
                                         : '0 0 10px rgba(255,255,255,0.5), 0 4px 10px rgba(0,0,0,0.8)'),
                letterSpacing: '0.05em',
                transformStyle: 'preserve-3d'
              }}
            >
              {combo}✕
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
