export const Colors = {
  background: {
    primary: '#0B0D17',
    surface: '#15192B',
    surfaceElevated: '#1D223B',
    surfaceGlass: 'rgba(21, 25, 43, 0.75)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A5C0',
    muted: '#6B728E',
    dark: '#0B0D17',
  },
  accent: {
    primary: '#FF2A5F',     // Juicy Red
    secondary: '#FFB800',   // Golden
    tertiary: '#00E5FF',    // Electric Blue
  },
  status: {
    success: '#00E676',
    warning: '#FFC400',
    danger: '#FF1744',
  },
  gameplay: {
    coin: '#FFD700',
    combo: '#FF9100',
    special: '#D500F9',
  }
};

export const Spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  xxxl: '64px',
};

export const Radii = {
  sm: '8px',
  md: '12px',
  lg: '20px',
  xl: '32px',
  pill: '9999px',
};

export const Shadows = {
  sm: '0 2px 8px rgba(0,0,0,0.4)',
  md: '0 8px 24px rgba(0,0,0,0.5)',
  lg: '0 16px 48px rgba(0,0,0,0.6)',
  glowPrimary: '0 0 20px rgba(255,42,95,0.4), 0 0 40px rgba(255,42,95,0.2)',
  glowSecondary: '0 0 20px rgba(255,184,0,0.4), 0 0 40px rgba(255,184,0,0.2)',
  glowAccent: '0 0 20px rgba(0,229,255,0.4), 0 0 40px rgba(0,229,255,0.2)',
};

export const Typography = {
  fontFamily: "'Nunito', system-ui, sans-serif",
  weights: {
    regular: 400,
    semiBold: 600,
    bold: 700,
    black: 900,
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem',
    display: '3rem',
    score: 'clamp(2rem, 8vw, 4rem)',
  }
};

export const Motion = {
  spring: {
    bouncy: { type: 'spring', stiffness: 400, damping: 15 },
    smooth: { type: 'spring', stiffness: 200, damping: 20 },
  },
  tween: {
    fast: { type: 'tween', duration: 0.15, ease: 'easeOut' },
    normal: { type: 'tween', duration: 0.25, ease: 'easeInOut' },
  }
} as const;
