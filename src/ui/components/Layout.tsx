import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScreenProps {
  children: ReactNode;
  blurBg?: boolean;
  style?: React.CSSProperties;
}

// Animated screen wrapper for smooth transitions
export const Screen = ({ children, blurBg = true, style }: ScreenProps) => (
  <motion.div
    className={`screen${blurBg ? ' screen--blur-bg' : ''}`}
    style={style}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

interface PanelProps {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Panel = ({ children, style, className = '' }: PanelProps) => (
  <motion.div
    className={`panel ${className}`}
    style={style}
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// Stars display component
interface StarsProps {
  count: number; // 0–3
  animate?: boolean;
}

export const Stars = ({ count, animate = false }: StarsProps) => (
  <div className="stars">
    {[0, 1, 2].map(i => (
      <motion.span
        key={i}
        initial={animate ? { scale: 0, rotate: -30, opacity: 0 } : false}
        animate={animate ? { scale: 1, rotate: 0, opacity: 1 } : {}}
        transition={{ delay: 0.3 + i * 0.2, type: 'spring', stiffness: 300, damping: 15 }}
        style={{ filter: i < count ? 'none' : 'grayscale(1) brightness(0.35)' }}
      >
        ⭐
      </motion.span>
    ))}
  </div>
);

// Coin chip display
export const CoinChip = ({ amount }: { amount: number }) => (
  <div className="coin-chip">{amount.toLocaleString()}</div>
);
