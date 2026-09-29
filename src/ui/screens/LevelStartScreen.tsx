import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState, GamePhase } from '../../core/GameState';

export const LevelStartScreen = () => {
  const { currentLevelConfig, setPhase } = useGameState();
  const [step, setStep] = useState(0); 
  // 0: Level Info
  // 1: READY
  // 2: 3
  // 3: 2
  // 4: 1
  // 5: GO!

  useEffect(() => {
    let timer: number;
    const sequences = [
      { delay: 1500, next: 1 },
      { delay: 800, next: 2 },
      { delay: 600, next: 3 },
      { delay: 600, next: 4 },
      { delay: 600, next: 5 },
      { delay: 600, next: -1 } // End
    ];

    if (step >= 0 && step < sequences.length) {
      const seq = sequences[step];
      timer = window.setTimeout(() => {
        if (seq.next === -1) {
          setPhase(GamePhase.PLAYING);
        } else {
          setStep(seq.next);
        }
      }, seq.delay);
    }
    
    return () => clearTimeout(timer);
  }, [step, setPhase]);

  if (!currentLevelConfig) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: step === 0 ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)',
      transition: 'background 0.5s ease',
      pointerEvents: 'none',
      zIndex: 50
    }}>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="level-info"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 15 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ 
              fontSize: '1.2rem', color: 'var(--c-accent)', fontWeight: 800, letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: 8
            }}>
              {currentLevelConfig.levelId.replace('_', ' ').toUpperCase()}
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              {currentLevelConfig.title}
            </h1>
            <div style={{ 
              marginTop: 16, fontSize: '1.1rem', background: 'rgba(255,255,255,0.1)',
              padding: '8px 24px', borderRadius: '100px', display: 'inline-block'
            }}>
              Objective: <strong style={{ color: 'var(--c-primary)' }}>{currentLevelConfig.objectiveType.replace('_', ' ')}</strong>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.4 }}
            style={{ fontSize: '4rem', fontWeight: 900, color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
          >
            READY
          </motion.div>
        )}

        {(step === 2 || step === 3 || step === 4) && (
          <motion.div
            key={`count-${step}`}
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4 }}
            style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--c-secondary)', textShadow: '0 0 30px var(--c-secondary-glow)' }}
          >
            {5 - step}
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="go"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            style={{ fontSize: '7rem', fontWeight: 900, color: 'var(--c-success)', textShadow: '0 0 40px var(--c-success-glow)', fontStyle: 'italic' }}
          >
            GO!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
