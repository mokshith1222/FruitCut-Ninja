import React from 'react';
import { motion } from 'framer-motion';
import { Colors, Radii, Shadows, Spacing } from './tokens';

interface SurfaceProps extends React.ComponentProps<typeof motion.div> {
  variant?: 'base' | 'elevated' | 'glass';
  padding?: keyof typeof Spacing;
  children: React.ReactNode;
}

export const GamePanel: React.FC<SurfaceProps> = ({ 
  variant = 'base', 
  padding = 'lg', 
  children, 
  style, 
  ...props 
}) => {
  const bg = variant === 'glass' ? Colors.background.surfaceGlass : 
             variant === 'elevated' ? Colors.background.surfaceElevated : 
             Colors.background.surface;
             
  const backdropFilter = variant === 'glass' ? 'blur(12px)' : 'none';

  return (
    <motion.div
      style={{
        background: bg,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        borderRadius: Radii.lg,
        padding: Spacing[padding],
        boxShadow: Shadows.sm,
        border: `1px solid rgba(255,255,255,0.05)`,
        ...style
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
