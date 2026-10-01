import { AnimatePresence, motion } from 'framer-motion';
import { useGameState, GamePhase } from '../../core/GameState';
import { TimeAttackHUD } from './TimeAttackHUD';
import { EndlessHUD } from './EndlessHUD';
import { PauseIcon, HeartIcon, TimerIcon, BoltIcon } from '../icons/GameIcons';

/**
 * GameplayHUD — Minimal, non-obstructive overlay
 *
 * DESIGN PRINCIPLES:
 * - Never covers the central play area
 * - Score/combo rendered Phaser-side for frame-perfect updates
 *   (React only receives meaningful state transitions, not per-frame values)
 * - Danger state communicated through animation not text
 * - No emoji anywhere
 */
export const GameplayHUD = () => {
  const {
    setPhase, score, combo, fruitsCut, timeRemaining, misses,
    currentLevelConfig, currentLevelId,
  } = useGameState();

  if (!currentLevelConfig) return null;

  if (currentLevelId === 'time_attack') return <TimeAttackHUD />;
  if (currentLevelId === 'endless')     return <EndlessHUD />;

  // ─── Objective display ───────────────────────────────────
  const getObjective = () => {
    if (!currentLevelConfig.objectives?.length) return null;
    const obj = currentLevelConfig.objectives[0];
    switch (obj.type) {
      case 'FRUIT_COUNT':    return { current: fruitsCut, target: obj.target ?? 0, label: 'CUT' };
      case 'SCORE':          return { current: score, target: obj.target ?? 0, label: 'SCORE' };
      case 'COMBO':          return { current: combo, target: obj.target ?? 0, label: 'COMBO' };
      case 'SURVIVAL_TIME':  return null; // handled by timer
      default:               return null;
    }
  };

  const objective = getObjective();
  const objPct = objective ? Math.min(objective.current / objective.target, 1) : 0;

  const hasSurvival    = currentLevelConfig.objectives?.some(o => o.type === 'SURVIVAL_TIME');
  const timerDanger    = timeRemaining !== null && timeRemaining <= 10;
  const missDanger     = misses >= 2;
  const missLimit      = currentLevelConfig.missLimit || 3;
  const levelNum       = currentLevelId?.replace('level_', '') ?? '?';

  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>

        {/* ── TOP LEFT: Score ───────────────────────────── */}
        <div style={{
          position: 'absolute',
          top: 'var(--hud-top)',
          left: 'var(--hud-side)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          alignItems: 'flex-start',
          pointerEvents: 'none',
        }}>
          {/* Score display */}
          <motion.div
            key={Math.floor(score / 100)} // Only re-animate on every 100 points
            animate={{ scale: [1.06, 1] }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-brand)',
              fontSize: 'var(--fs-score)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1,
              textShadow: '0 2px 12px rgba(0,0,0,1), 0 0 20px rgba(255,255,255,0.3)',
              letterSpacing: '0.02em',
              paddingLeft: 4,
            }}
          >
            {score.toLocaleString()}
          </motion.div>

          {/* Objective progress */}
          {objective && (
            <div style={{
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 'var(--r-pill)',
              padding: '4px 12px 4px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              minWidth: 100,
            }}>
              <BoltIcon size={14} color="var(--c-accent)"/>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.6rem', fontWeight: 800, color: 'var(--c-text-sub)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  {objective.label}
                </div>
                <div style={{
                  fontSize: '0.75rem', fontWeight: 900, color: '#fff', lineHeight: 1,
                }}>
                  {typeof objective.current === 'number' && objective.current > 999
                    ? objective.current.toLocaleString()
                    : objective.current}
                  <span style={{ color: 'var(--c-text-sub)', fontWeight: 600 }}>
                    /{objective.target}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Objective progress bar */}
          {objective && (
            <div style={{
              width: 100,
              height: 3,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 'var(--r-pill)',
              overflow: 'hidden',
            }}>
              <motion.div
                animate={{ width: `${objPct * 100}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: objPct >= 1
                    ? 'var(--grad-success)'
                    : 'var(--grad-primary)',
                  borderRadius: 'var(--r-pill)',
                }}
              />
            </div>
          )}
        </div>

        {/* ── TOP CENTER: Timer + Combo ─────────────────── */}
        <div style={{
          position: 'absolute',
          top: 'var(--hud-top)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          pointerEvents: 'none',
        }}>
          {/* Survival timer */}
          {hasSurvival && timeRemaining !== null && (
            <motion.div
              animate={timerDanger ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{ repeat: Infinity, duration: 0.6 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 18px',
                borderRadius: 'var(--r-pill)',
                background: timerDanger ? 'rgba(255,23,68,0.85)' : 'rgba(0,0,0,0.75)',
                border: timerDanger
                  ? '2px solid rgba(255,100,100,0.8)'
                  : '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                boxShadow: timerDanger ? '0 0 20px rgba(255,23,68,0.5)' : 'none',
              }}
            >
              <TimerIcon size={16} color={timerDanger ? '#fff' : '#FFB800'}/>
              <span style={{
                fontSize: '1.2rem',
                fontWeight: 900,
                fontFamily: 'var(--font-brand)',
                color: timerDanger ? '#fff' : '#FFB800',
                minWidth: 38,
                textAlign: 'center',
              }}>
                {Math.ceil(timeRemaining)}
              </span>
            </motion.div>
          )}

          {/* Combo indicator */}
          <AnimatePresence mode="popLayout">
            {combo > 1 && (
              <motion.div
                key={combo}
                initial={{ scale: 0.5, opacity: 0, y: -8 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.7, opacity: 0, y: -4, transition: { duration: 0.12 } }}
                transition={{ type: 'spring', stiffness: 600, damping: 22 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 14px 4px 10px',
                  borderRadius: 'var(--r-pill)',
                  background: combo >= 10
                    ? 'linear-gradient(135deg, rgba(155,89,255,0.95), rgba(255,42,95,0.95))'
                    : combo >= 5
                    ? 'linear-gradient(135deg, rgba(255,106,0,0.95), rgba(255,184,0,0.95))'
                    : 'linear-gradient(135deg, rgba(0,229,255,0.9), rgba(0,145,234,0.9))',
                  border: '1.5px solid rgba(255,255,255,0.5)',
                  boxShadow: combo >= 10
                    ? '0 0 20px rgba(155,89,255,0.5)'
                    : combo >= 5
                    ? '0 0 16px rgba(255,106,0,0.45)'
                    : '0 0 12px rgba(0,229,255,0.4)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                <BoltIcon size={13} color="#fff"/>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  color: '#fff',
                  textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                  letterSpacing: '0.05em',
                }}>
                  {combo}× COMBO
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── TOP RIGHT: Pause + Level + Misses ────────── */}
        <div style={{
          position: 'absolute',
          top: 'var(--hud-top)',
          right: 'var(--hud-side-right)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 6,
          pointerEvents: 'none',
        }}>
          {/* Pause button */}
          <div style={{ pointerEvents: 'auto' }}>
            <motion.button
              className="btn btn--ghost btn--icon"
              whileTap={{ scale: 0.88 }}
              onClick={() => setPhase(GamePhase.PAUSED)}
              aria-label="Pause"
              style={{ width: 44, height: 44 }}
            >
              <PauseIcon size={18}/>
            </motion.button>
          </div>

          {/* Level badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '4px 10px',
            borderRadius: 'var(--r-pill)',
            background: 'rgba(0,0,0,0.7)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            pointerEvents: 'none',
          }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--c-text-sub)', letterSpacing: '0.06em' }}>
              LV.
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#fff' }}>
              {levelNum}
            </span>
          </div>

          {/* Miss indicator (heart-based) */}
          {missLimit > 0 && (
            <motion.div
              animate={missDanger ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{
                display: 'flex',
                gap: 3,
                padding: '4px 10px',
                borderRadius: 'var(--r-pill)',
                background: missDanger ? 'rgba(255,23,68,0.25)' : 'rgba(0,0,0,0.7)',
                border: missDanger ? '1px solid rgba(255,23,68,0.5)' : '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                pointerEvents: 'none',
              }}
            >
              {Array.from({ length: missLimit }, (_, i) => (
                <HeartIcon
                  key={i}
                  size={14}
                  color={i >= missLimit - misses ? 'rgba(255,255,255,0.15)' : '#FF2A5F'}
                  filled={i < missLimit - misses}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
