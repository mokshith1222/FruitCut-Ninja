import { AnimatePresence, motion } from 'framer-motion';
import { IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';

export const TimeAttackHUD = () => {
  const { setPhase, score, combo, timeRemaining } = useGameState();
  const { bestTimeAttackScore } = useProgressionState();

  const timerDanger = timeRemaining !== null && timeRemaining <= 10;
  
  // Format time as 00:00
  const formatTime = (secs: number) => {
    const s = Math.max(0, Math.ceil(secs));
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m.toString().padStart(2, '0')}:${rs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
        
        {/* Left: Score & Best */}
        <div style={{ position: 'absolute', top: 'var(--hud-top)', left: 'var(--hud-side)', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start', pointerEvents: 'none' }}>
          <div style={{
            fontFamily: 'var(--font)', fontSize: 'var(--fs-score)', fontWeight: 900, lineHeight: 1, color: '#ffffff',
            WebkitTextStroke: '1.5px rgba(0,0,0,0.8)', textShadow: '0 0 12px rgba(255,255,255,0.7), 0 2px 8px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,0.9)',
            background: 'rgba(0,0,0,0.45)',
            padding: '4px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(6px)',
          }}>
            {score.toLocaleString()}
          </div>
          <div className="hud-badge" style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.25)', pointerEvents: 'none' }}>
            <span style={{ opacity: 0.7, fontSize: '0.75rem' }}>BEST</span>
            <strong style={{ color: 'var(--c-secondary)' }}>{bestTimeAttackScore.toLocaleString()}</strong>
          </div>
        </div>

        {/* Center: Timer & Combo */}
        <div style={{ position: 'absolute', top: 'var(--hud-top)', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, pointerEvents: 'none' }}>
          {timeRemaining !== null && (
            <motion.div
              className="hud-badge"
              animate={timerDanger ? { scale: [1, 1.08, 1], backgroundColor: ['rgba(0,0,0,0.85)', 'rgba(255,0,0,0.7)', 'rgba(0,0,0,0.85)'] } : {}}
              transition={{ repeat: Infinity, duration: 0.5 }}
              style={{
                fontSize: '1.4rem', fontWeight: 900,
                color: timerDanger ? 'var(--c-primary)' : '#fff',
                border: timerDanger ? '2px solid var(--c-primary)' : '1.5px solid rgba(255,255,255,0.3)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.8)', padding: '6px 16px',
                background: 'rgba(10,12,24,0.85)',
                textShadow: '0 0 8px rgba(255,255,255,0.5)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              ⏱ {formatTime(timeRemaining)}
            </motion.div>
          )}

          <span style={{
            fontSize: '0.65rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: 'var(--c-primary)',
            textTransform: 'uppercase',
            background: 'rgba(0,0,0,0.65)',
            padding: '2px 8px',
            borderRadius: '9999px',
            border: '1px solid rgba(255,82,82,0.3)',
          }}>
            Time Attack
          </span>

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

        {/* Right: Pause */}
        <div style={{ position: 'absolute', top: 'var(--hud-top)', right: 'var(--hud-side-right)', pointerEvents: 'auto' }}>
          <IconButton id="btn-pause-ta" icon="⏸" onClick={() => setPhase(GamePhase.PAUSED)} label="Pause" variant="ghost" />
        </div>
      </div>
    </div>
  );
};
