import { motion } from 'framer-motion';
import { Screen, CoinChip } from '../components/Layout';
import { IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';

const FRUITS = ['🍎', '🍊', '🍉', '🍌', '🍓', '🥝'];

export const MainMenuScreen = () => {
  const setPhase = useGameState(s => s.setPhase);
  const startGame = useGameState(s => s.startGame);
  const { coins, completedLevels, bestTimeAttackScore, bestEndlessScore } = useProgressionState();
  const totalLevels = 30;
  const progress = (completedLevels.length / totalLevels) * 100;

  return (
    <Screen blurBg={false} style={{ background: 'var(--grad-bg)', overflow: 'hidden' }}>
      {/* Ambient floating fruits */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {FRUITS.map((f, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              fontSize: `${2.5 + (i % 2) * 1.5}rem`,
              left: `${[8, 75, 15, 82, 5, 70][i]}%`,
              top: `${[12, 8, 65, 60, 40, 35][i]}%`,
              opacity: 0.2,
            }}
            animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 4 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
          >
            {f}
          </motion.div>
        ))}
        <div style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: '60vw', height: '60vw', maxWidth: 320,
          background: 'radial-gradient(circle, rgba(255,82,82,0.18) 0%, transparent 70%)',
        }} />
      </div>

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '16px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <CoinChip amount={coins} />
        <IconButton id="btn-settings" icon="⚙️" onClick={() => setPhase(GamePhase.SETTINGS)} label="Settings" />
      </div>

      {/* Center content */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        zIndex: 1, width: '100%', padding: '0 32px',
      }}>
        {/* Logo */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{ marginBottom: 40, textAlign: 'center' }}
        >
          <motion.div
            style={{ fontSize: '4.5rem', lineHeight: 1 }}
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >🍉</motion.div>
          <h1 style={{
            fontSize: 'var(--fs-title)', fontWeight: 900,
            background: 'linear-gradient(135deg, #FF5252 20%, #FFAB40 80%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '0.04em', lineHeight: 1.1, marginTop: 8,
          }}>
            FRUIT CUT
          </h1>
        </motion.div>

        {/* Game Modes */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
          style={{ width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <motion.button
            id="btn-play-levels"
            className="btn btn--primary"
            style={{ width: '100%', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', boxShadow: 'var(--shadow-glow-primary)' }}
            onClick={() => setPhase(GamePhase.LEVEL_LOADING)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>🗺️ LEVEL MODE</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: 500 }}>Complete levels to unlock new worlds</div>
          </motion.button>
          
          <motion.button
            id="btn-play-time"
            className="btn btn--secondary"
            style={{ width: '100%', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', boxShadow: '0 4px 16px rgba(255,171,64,0.4)', background: 'linear-gradient(135deg, #FF9100 0%, #FF6D00 100%)' }}
            onClick={() => startGame('time_attack')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>⏱️ TIME ATTACK</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: 500 }}>60 seconds. Best: {bestTimeAttackScore.toLocaleString()}</div>
          </motion.button>

          <motion.button
            id="btn-play-endless"
            className="btn btn--accent"
            style={{ width: '100%', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', boxShadow: '0 4px 16px rgba(213,0,249,0.4)' }}
            onClick={() => startGame('endless')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>♾️ ENDLESS</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: 500 }}>Survive. Best: {bestEndlessScore.toLocaleString()}</div>
          </motion.button>
        </motion.div>

        {/* Progress bar */}
        {completedLevels.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ width: '100%', maxWidth: 320, marginTop: 24 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-small)', color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
              <span>Progress</span>
              <span>{completedLevels.length} / {totalLevels} levels</span>
            </div>
            <div className="progress-bar-track">
              <motion.div
                className="progress-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        )}

        {/* Secondary actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: 12, marginTop: 28 }}
        >
          <button id="btn-shop" className="btn btn--ghost btn--md" onClick={() => setPhase(GamePhase.SHOP)}>
            🛒 Shop
          </button>
          <button id="btn-daily" className="btn btn--secondary btn--md" onClick={() => setPhase(GamePhase.DAILY_REWARD)}>
            🎁 Daily
          </button>
          <button id="btn-challenges" className="btn btn--accent btn--md" onClick={() => setPhase(GamePhase.CHALLENGES)}>
            🏆 Goals
          </button>
        </motion.div>
      </div>
    </Screen>
  );
};
