import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { StarIcon, CoinIcon } from '../icons/GameIcons';

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
    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// Stars display component using SVG icons (not emoji)
interface StarsProps {
  count: number; // 0–3
  animate?: boolean;
  size?: number;
}

export const Stars = ({ count, animate = false, size = 28 }: StarsProps) => (
  <div className="stars-row">
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        initial={animate ? { scale: 0, rotate: -30, opacity: 0 } : false}
        animate={animate ? { scale: 1, rotate: 0, opacity: 1 } : {}}
        transition={{
          delay: 0.3 + i * 0.18,
          type: 'spring',
          stiffness: 380,
          damping: 18,
        }}
      >
        <motion.div
          animate={animate && i < count ? {
            filter: [
              'drop-shadow(0 0 0px rgba(255,215,64,0))',
              'drop-shadow(0 0 10px rgba(255,215,64,0.8))',
              'drop-shadow(0 0 4px rgba(255,215,64,0.4))',
            ],
          } : {}}
          transition={{ delay: 0.5 + i * 0.18, duration: 0.4 }}
        >
          <StarIcon
            size={size}
            color={i < count ? '#FFD740' : 'rgba(255,255,255,0.12)'}
            filled={i < count}
          />
        </motion.div>
      </motion.div>
    ))}
  </div>
);

// Coin chip display using SVG icon
export const CoinChip = ({ amount }: { amount: number }) => (
  <div className="coin-display">
    <CoinIcon size={16}/>
    <span>{amount.toLocaleString()}</span>
  </div>
);
