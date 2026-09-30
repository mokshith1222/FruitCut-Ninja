import React from 'react';
import { motion } from 'framer-motion';
import { Colors, Radii, Shadows, Spacing, Typography, Motion } from './tokens';

export interface GameButtonProps extends Omit<React.ComponentProps<typeof motion.button>, 'children'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  isLocked?: boolean;
  children?: React.ReactNode;
}

export const GameButton: React.FC<GameButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  label,
  disabled,
  isLocked,
  children,
  style,
  ...props
}) => {
  let bg = Colors.background.surfaceElevated;
  let color = Colors.text.primary;
  let boxShadow = Shadows.sm;
  let border = 'none';

  switch (variant) {
    case 'primary':
      bg = Colors.accent.primary;
      boxShadow = Shadows.glowPrimary;
      break;
    case 'secondary':
      bg = Colors.accent.secondary;
      boxShadow = Shadows.glowSecondary;
      break;
    case 'danger':
      bg = Colors.status.danger;
      break;
    case 'ghost':
      bg = 'transparent';
      border = `1px solid ${Colors.background.surfaceElevated}`;
      boxShadow = 'none';
      break;
    case 'icon':
      bg = Colors.background.surfaceElevated;
      boxShadow = Shadows.sm;
      break;
  }

  if (isLocked || disabled) {
    bg = Colors.background.surface;
    color = Colors.text.muted;
    boxShadow = 'none';
  }

  const padding = size === 'sm' ? `${Spacing.sm} ${Spacing.md}` :
                  size === 'lg' ? `${Spacing.md} ${Spacing.xl}` :
                  size === 'icon' ? Spacing.sm :
                  `${Spacing.md} ${Spacing.lg}`;

  const fontSize = size === 'sm' ? Typography.sizes.sm :
                   size === 'lg' ? Typography.sizes.lg : Typography.sizes.base;

  const borderRadius = size === 'icon' ? '50%' : Radii.pill;
  const aspectRatio = size === 'icon' ? '1/1' : 'auto';

  return (
    <motion.button
      whileHover={!disabled && !isLocked ? { scale: 1.05 } : {}}
      whileTap={!disabled && !isLocked ? { scale: 0.95 } : {}}
      transition={Motion.spring.bouncy}
      disabled={disabled || isLocked}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.sm,
        background: bg,
        color: color,
        border: border,
        borderRadius: borderRadius,
        padding: padding,
        boxShadow: boxShadow,
        fontFamily: Typography.fontFamily,
        fontWeight: Typography.weights.bold,
        fontSize: fontSize,
        cursor: disabled || isLocked ? 'not-allowed' : 'pointer',
        opacity: disabled || isLocked ? 0.6 : 1,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        aspectRatio: aspectRatio,
        ...style
      }}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {label && <span>{label}</span>}
      {children}
    </motion.button>
  );
};
