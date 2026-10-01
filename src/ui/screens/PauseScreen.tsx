import { motion } from 'framer-motion';
import { useGameState, GamePhase } from '../../core/GameState';
import { PlayIcon, RetryIcon, ExitIcon } from '../icons/GameIcons';

export const PauseScreen = () => {
  const { resumeGame, setPhase, currentLevelId, startGame, score } = useGameState();
  const levelNum = currentLevelId?.replace('level_', '') ?? '?';
  const isSpecial = currentLevelId === 'time_attack' || currentLevelId === 'endless';
  const displayTitle = isSpecial
    ? (currentLevelId === 'time_attack' ? 'Time Attack' : 'Endless')
    : `Level ${levelNum}`;

  return (
    <div className="screen screen--blur-bg">
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 0, width: '100%', maxWidth: 380,
        padding: 'max(env(safe-area-inset-top, 0px), 24px) 24px max(env(safe-area-inset-bottom, 0px), 24px)',
        height: '100%', justifyContent: 'center',
      }}>

        {/* Pause indicator — geometric, not emoji */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 360, damping: 22 }}
          style={{ marginBottom: 20 }}
        >
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: '2px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(255,255,255,0.08)',
          }}>
            {/* Two vertical bars = pause */}
            <div style={{ display: 'flex', gap: 7 }}>
              <div style={{ width: 6, height: 28, borderRadius: 3, background: '#fff', opacity: 0.9 }}/>
              <div style={{ width: 6, height: 28, borderRadius: 3, background: '#fff', opacity: 0.9 }}/>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          style={{ textAlign: 'center', marginBottom: 28 }}
        >
          <h1 style={{
            fontFamily: 'var(--font-brand)',
            fontSize: '1.8rem', fontWeight: 900,
            letterSpacing: '0.08em',
          }}>
            PAUSED
          </h1>
          <p style={{ color: 'var(--c-text-sub)', fontSize: '0.85rem', marginTop: 6 }}>
            {displayTitle} · {score.toLocaleString()} pts
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          {/* Resume — primary CTA */}
          <motion.button
            className="btn btn--success btn--xl"
            style={{ width: '100%', gap: 12 }}
            onClick={resumeGame}
            whileTap={{ scale: 0.94 }}
          >
            <PlayIcon size={22}/>
            Resume
          </motion.button>

          {/* Restart */}
          <motion.button
            className="btn btn--ghost btn--lg"
            style={{ width: '100%', gap: 10 }}
            onClick={() => { if (currentLevelId) startGame(currentLevelId); }}
            whileTap={{ scale: 0.93 }}
          >
            <RetryIcon size={18}/>
            Restart
          </motion.button>

          <div className="divider"/>

          {/* Exit */}
          <motion.button
            className="btn btn--danger btn--md"
            style={{ width: '100%', gap: 10 }}
            onClick={() => setPhase(GamePhase.MAIN_MENU)}
            whileTap={{ scale: 0.93 }}
          >
            <ExitIcon size={16}/>
            Exit to Menu
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
