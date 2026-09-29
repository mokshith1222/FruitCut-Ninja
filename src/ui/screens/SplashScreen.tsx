import { motion } from 'framer-motion';
import { Screen } from '../components/Layout';

const FRUITS = ['🍎', '🍊', '🍉', '🍌', '🍓', '🥝', '🍍', '🥭'];

export const SplashScreen = () => (
  <Screen blurBg={false} style={{ background: 'var(--grad-bg)', overflow: 'hidden' }}>
    {/* Floating bg fruits */}
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {FRUITS.map((f, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            fontSize: `${2 + (i % 3) * 1.2}rem`,
            left: `${(i * 13 + 5) % 90}%`,
            top: `${(i * 17 + 10) % 80}%`,
            opacity: 0.15,
          }}
          animate={{ y: [0, -16, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        >
          {f}
        </motion.div>
      ))}
    </div>

    {/* Logo */}
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
    >
      <motion.div
        style={{ fontSize: '5rem', lineHeight: 1 }}
        animate={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
      >
        🍉
      </motion.div>
      <h1 style={{
        fontSize: 'var(--fs-title)',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #FF5252 30%, #FFAB40 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '0.04em',
        textAlign: 'center',
      }}>
        FRUIT CUT
      </h1>
      <motion.p
        style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'var(--fs-body)', letterSpacing: '0.15em' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        LOADING…
      </motion.p>
    </motion.div>
  </Screen>
);
