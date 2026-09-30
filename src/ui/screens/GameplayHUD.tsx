import { AnimatePresence, motion } from 'framer-motion';
import { IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { TimeAttackHUD } from './TimeAttackHUD';
import { EndlessHUD } from './EndlessHUD';

export const GameplayHUD = () => {
  const {
    setPhase, score, combo, fruitsCut, timeRemaining, misses,
    currentLevelConfig, currentLevelId,
  } = useGameState();

  if (!currentLevelConfig) return null;

  if (currentLevelId === 'time_attack') {
    return <TimeAttackHUD />;
  }
  
  if (currentLevelId === 'endless') {
    return <EndlessHUD />;
  }

  const getObjectiveText = () => {
    if (!currentLevelConfig.objectives || currentLevelConfig.objectives.length === 0) return { label: '', value: '' };
    
    // Pick the first objective for simple display
    const obj = currentLevelConfig.objectives[0];
    switch (obj.type) {
      case 'FRUIT_COUNT': return { label: 'Cut', value: `${fruitsCut} / ${obj.target}` };
      case 'SCORE':       return { label: 'Target', value: `${score} / ${obj.target}` };
      case 'COMBO':       return { label: 'Combo', value: `${combo} / ${obj.target}` };
      case 'SURVIVAL_TIME': return { label: 'Time', value: timeRemaining !== null ? `${Math.ceil(timeRemaining)}s` : '—' };
      default: return { label: '', value: '' };
    }
  };

  const obj = getObjectiveText();
  const levelNum = currentLevelId?.replace('level_', '') ?? '?';
  const displayLevel = `LV. ${levelNum}`;
  const timerDanger = timeRemaining !== null && timeRemaining <= 10;
  
  // Actually we need to determine if we have a survival objective or not
  const hasSurvival = currentLevelConfig.objectives?.some(o => o.type === 'SURVIVAL_TIME');

  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* ---- Top bar ---- */}
      <div style={{
        position: 'relative', width: '100%', height: '100%', pointerEvents: 'none'
      }}>
        {/* Left: Score & Objective */}
        <div style={{ position: 'absolute', top: 'var(--hud-top)', left: 'var(--hud-side)', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start', pointerEvents: 'none' }}>
          <div style={{
            fontFamily: 'var(--font)',
            fontSize: 'var(--fs-score)', 
            fontWeight: 900, 
            lineHeight: 1,
            color: '#ffffff',
            WebkitTextStroke: '1.5px rgba(0,0,0,0.8)',
            textShadow: '0 0 12px rgba(255,255,255,0.7), 0 2px 8px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,0.9)',
            letterSpacing: '0.02em',
            background: 'rgba(0,0,0,0.45)',
            padding: '4px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(6px)',
          }}>
            {score.toLocaleString()}
          </div>
          
          {obj.label && (
            <div className="hud-badge" style={{ 
              fontSize: '0.9rem', 
              background: 'rgba(20,20,35,0.75)', 
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              padding: '6px 14px',
              pointerEvents: 'none',
            }}>
              <span style={{ opacity: 0.8, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{obj.label}</span>
              <strong style={{ color: 'var(--c-accent)' }}>{obj.value}</strong>
            </div>
          )}
        </div>

        {/* Center: Timer & Combo */}
        <div style={{ position: 'absolute', top: 'var(--hud-top)', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, pointerEvents: 'none' }}>
          {hasSurvival && timeRemaining !== null && (
            <motion.div
              className="hud-badge"
              animate={timerDanger ? { scale: [1, 1.08, 1], backgroundColor: ['rgba(0,0,0,0.7)', 'rgba(255,0,0,0.6)', 'rgba(0,0,0,0.7)'] } : {}}
              transition={{ repeat: Infinity, duration: 0.5 }}
              style={{
                fontSize: '1.4rem', fontWeight: 900,
                color: timerDanger ? 'var(--c-primary)' : '#fff',
                border: timerDanger ? '2px solid var(--c-primary)' : '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.8)',
                padding: '8px 20px',
                background: 'rgba(0,0,0,0.75)',
                minWidth: '90px',
                textAlign: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              {Math.ceil(timeRemaining)}s
            </motion.div>
          )}

          <AnimatePresence>
            {combo > 1 && (
              <motion.div
                key={combo}
                initial={{ scale: 0.7, opacity: 0, y: -6 }}
                animate={{ scale: [1.15, 1], opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: -6, transition: { duration: 0.15 } }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '3px 12px',
                  borderRadius: '9999px',
                  background: combo >= 10 
                    ? 'linear-gradient(135deg, rgba(255,0,128,0.9), rgba(255,215,0,0.9))'
                    : (combo >= 5 
                        ? 'linear-gradient(135deg, rgba(255,109,0,0.9), rgba(255,214,0,0.9))'
                        : 'linear-gradient(135deg, rgba(0,229,255,0.9), rgba(0,119,255,0.9))'),
                  border: '1.5px solid rgba(255,255,255,0.6)',
                  boxShadow: combo >= 10 
                    ? '0 0 15px rgba(255,0,128,0.6)' 
                    : '0 0 12px rgba(0,229,255,0.5)',
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                <span>{combo}x COMBO</span>
                <span>{combo >= 10 ? '⚡' : (combo >= 5 ? '🔥' : '✨')}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: pause + level + misses */}
        <div style={{ position: 'absolute', top: 'var(--hud-top)', right: 'var(--hud-side-right)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto' }}>
            <IconButton id="btn-pause-level" icon="⏸" onClick={() => setPhase(GamePhase.PAUSED)} label="Pause" variant="ghost" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="hud-badge" style={{ 
              fontSize: '0.75rem', 
              fontWeight: 800,
              background: 'rgba(0,0,0,0.65)',
              color: 'var(--c-success)',
              border: '1px solid rgba(255,255,255,0.2)',
              letterSpacing: '0.05em',
              padding: '2px 8px',
              pointerEvents: 'none',
            }}>
              {displayLevel}
            </div>
            <div className="hud-badge" style={{
              fontSize: '0.75rem',
              background: 'rgba(0,0,0,0.65)',
              color: misses >= 2 ? 'var(--c-primary)' : '#fff',
              border: misses >= 2 ? '1px solid var(--c-primary)' : '1px solid rgba(255,255,255,0.2)',
              padding: '2px 8px',
              pointerEvents: 'none',
            }}>
              ❌ {misses}/3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
