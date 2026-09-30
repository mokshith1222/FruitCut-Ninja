import { AnimatePresence, motion } from 'framer-motion';
import { IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';

export const EndlessHUD = () => {
  const { setPhase, score, combo, misses, fruitsCut } = useGameState();
  const { bestEndlessScore } = useProgressionState();

  const maxLives = 3;
  const livesRemaining = Math.max(0, maxLives - misses);

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
            <strong style={{ color: 'var(--c-secondary)' }}>{bestEndlessScore.toLocaleString()}</strong>
          </div>
        </div>

        {/* Center: Milestones / Fruits & Combo */}
        <div style={{ position: 'absolute', top: 'var(--hud-top)', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, pointerEvents: 'none' }}>
          <div className="hud-badge" style={{ background: 'rgba(0,0,0,0.75)', padding: '6px 14px', border: '1px solid rgba(255,255,255,0.2)', pointerEvents: 'none' }}>
            <span style={{ opacity: 0.8, fontSize: '0.8rem' }}>FRUITS</span>
            <strong style={{ color: '#fff', fontSize: '1.2rem', marginLeft: 8 }}>{fruitsCut}</strong>
          </div>

          <span style={{
            fontSize: '0.65rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: 'var(--c-secondary)',
            textTransform: 'uppercase',
            background: 'rgba(0,0,0,0.65)',
            padding: '2px 8px',
            borderRadius: '9999px',
            border: '1px solid rgba(255,171,64,0.3)',
          }}>
            Endless
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

        {/* Right: Pause & Lives */}
        <div style={{ position: 'absolute', top: 'var(--hud-top)', right: 'var(--hud-side-right)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto' }}>
            <IconButton id="btn-pause-endless" icon="⏸" onClick={() => setPhase(GamePhase.PAUSED)} label="Pause" variant="ghost" />
          </div>
          
          <div className="hud-badge" style={{
            fontSize: '0.85rem',
            background: 'rgba(0,0,0,0.7)',
            color: livesRemaining === 1 ? 'var(--c-primary)' : '#fff',
            border: livesRemaining === 1 ? '1.5px solid var(--c-primary)' : '1px solid rgba(255,255,255,0.2)',
            letterSpacing: '0.08em',
            padding: '3px 8px',
            pointerEvents: 'none',
          }}>
            {Array.from({ length: maxLives }).map((_, i) => (
              <span key={i} style={{ opacity: i < livesRemaining ? 1 : 0.25, filter: i < livesRemaining ? 'none' : 'grayscale(100%)' }}>
                ❤️
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
