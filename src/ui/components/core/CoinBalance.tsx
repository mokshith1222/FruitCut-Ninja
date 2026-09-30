import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Colors, Radii, Shadows, Spacing, Typography, Motion } from '../../design-system/tokens';
import { useCoinLedger } from '../../../economy/CoinLedger';

export interface CoinBalanceProps {
  variant?: 'compact' | 'full';
}

export const CoinBalance: React.FC<CoinBalanceProps> = ({ variant = 'compact' }) => {
  const coins = useCoinLedger(s => s.balance);
  const [displayValue, setDisplayValue] = useState(coins);
  const controls = useAnimation();

  useEffect(() => {
    if (coins !== displayValue) {
      // Basic anim: bounce when coin changes
      controls.start({
        scale: [1, 1.2, 1],
        transition: Motion.spring.bouncy
      });
      setDisplayValue(coins);
    }
  }, [coins, displayValue, controls]);

  const padding = variant === 'compact' ? `${Spacing.xs} ${Spacing.sm}` : `${Spacing.sm} ${Spacing.md}`;
  const fontSize = variant === 'compact' ? Typography.sizes.base : Typography.sizes.lg;

  return (
    <motion.div
      animate={controls}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: Spacing.sm,
        background: Colors.background.surfaceElevated,
        border: `2px solid ${Colors.background.surfaceGlass}`,
        borderRadius: Radii.pill,
        padding: padding,
        boxShadow: Shadows.sm,
        color: Colors.gameplay.coin,
        fontFamily: Typography.fontFamily,
        fontWeight: Typography.weights.black,
        fontSize: fontSize,
        pointerEvents: 'auto',
      }}
    >
      <div style={{
        // Placeholder for the real premium coin icon to be added in Phase 2
        width: variant === 'compact' ? 20 : 28,
        height: variant === 'compact' ? 20 : 28,
        background: `radial-gradient(circle at 30% 30%, #FFE57F, #FF8F00)`,
        borderRadius: '50%',
        boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: variant === 'compact' ? '10px' : '14px',
        fontWeight: 'bold',
      }}>
        C
      </div>
      <span>{displayValue.toLocaleString()}</span>
    </motion.div>
  );
};
