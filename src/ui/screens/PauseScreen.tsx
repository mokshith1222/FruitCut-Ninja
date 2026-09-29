import { motion } from 'framer-motion';
import { Screen } from '../components/Layout';
import { Button } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';

export const PauseScreen = () => {
  const { resumeGame, setPhase, currentLevelId, startGame, score } = useGameState();
  const levelNum = currentLevelId?.replace('level_', '') ?? '?';

  return (
    <Screen>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'var(--sp-xl)', width: '100%', maxWidth: 360, padding: '0 24px',
      }}>
        {/* Title */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ fontSize: '3rem', marginBottom: 8 }}>⏸</div>
          <h1 style={{ fontSize: 'var(--fs-heading)', fontWeight: 900 }}>Game Paused</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'var(--fs-small)', marginTop: 6 }}>
            Level {levelNum} · Score: {score.toLocaleString()}
          </p>
        </motion.div>

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="panel"
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <Button id="btn-resume" label="▶  Resume" onClick={resumeGame} variant="success" size="lg" fullWidth />
          <Button
            id="btn-restart-pause"
            label="↺  Restart Level"
            onClick={() => { if (currentLevelId) startGame(currentLevelId); }}
            variant="ghost" size="lg" fullWidth
          />
          <div className="divider" />
          <Button
            id="btn-exit-pause"
            label="Exit to Menu"
            onClick={() => setPhase(GamePhase.MAIN_MENU)}
            variant="danger" size="md" fullWidth
          />
        </motion.div>
      </div>
    </Screen>
  );
};
