import { motion } from 'framer-motion';

/* ─── Brand-quality loading screen ─────────────────────── */
export const SplashScreen = () => {
  return (
    <div
      className="screen"
      style={{
        background: 'radial-gradient(ellipse at 30% 20%, #1A0830 0%, #08090F 60%)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow orbs */}
      <motion.div
        style={{
          position: 'absolute',
          top: '15%', left: '20%',
          width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(255,42,95,0.2) 0%, transparent 65%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '25%', right: '10%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 65%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 5, delay: 1.5, ease: 'easeInOut' }}
      />

      {/* Orbiting fruit silhouettes */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 38;
        const cx = 50 + Math.cos(angle) * radius;
        const cy = 45 + Math.sin(angle) * radius;
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${cx}%`,
              top: `${cy}%`,
              width: 32 + (i % 3) * 14,
              height: 32 + (i % 3) * 14,
              transform: 'translate(-50%, -50%)',
              opacity: 0.12,
              pointerEvents: 'none',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.06, 1],
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 12 + i * 2, ease: 'linear' },
              scale: { repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut' },
            }}
          >
            <svg viewBox="0 0 32 32" fill="none" width="100%" height="100%">
              <circle cx="16" cy="16" r="14" fill="white"/>
              <circle cx="12" cy="13" r="4" fill="rgba(0,0,0,0.25)"/>
              <circle cx="20" cy="13" r="2" fill="rgba(0,0,0,0.2)"/>
            </svg>
          </motion.div>
        );
      })}

      {/* Logo */}
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, zIndex: 1 }}
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.1 }}
      >
        {/* Logo mark — custom SVG blade */}
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            {/* Blade shape */}
            <path
              d="M40 5 L65 60 Q40 72 40 72 Q40 72 15 60 Z"
              fill="url(#bladeGrad)"
              opacity="0.95"
            />
            {/* Blade shine */}
            <path
              d="M40 5 L52 32 Q40 38 40 38 Z"
              fill="rgba(255,255,255,0.3)"
            />
            {/* Handle */}
            <rect x="34" y="64" width="12" height="8" rx="3" fill="rgba(255,255,255,0.2)"/>
            <defs>
              <linearGradient id="bladeGrad" x1="40" y1="5" x2="40" y2="72" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF2A5F"/>
                <stop offset="100%" stopColor="#FF6A00"/>
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Brand name */}
        <h1 className="brand-title">FRUIT CUT</h1>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 180 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{
            height: 2,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 'var(--r-pill)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: 0, left: 0,
              height: '100%',
              width: '40%',
              background: 'var(--grad-primary)',
              borderRadius: 'var(--r-pill)',
            }}
            animate={{ left: ['-40%', '120%'] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut', delay: 0.6 }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            color: 'var(--c-text-muted)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          LOADING
        </motion.p>
      </motion.div>
    </div>
  );
};
