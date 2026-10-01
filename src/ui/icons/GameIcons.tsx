/**
 * FRUIT CUT — Custom SVG Icon System
 * Replaces all emoji icons with crisp, game-quality SVG artwork.
 * Every icon is optimised for small sizes (16–48px) and renders
 * cleanly on both retina and standard displays.
 */

import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export const BackIcon = ({ size = 24, color = '#fff', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M15 19l-7-7 7-7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SettingsIcon = ({ size = 24, color = '#fff', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={color} strokeWidth="2"/>
  </svg>
);

export const PlayIcon = ({ size = 24, color = '#fff', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <polygon points="5,3 19,12 5,21"/>
  </svg>
);

export const PauseIcon = ({ size = 24, color = '#fff', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <rect x="6" y="4" width="4" height="16" rx="1"/>
    <rect x="14" y="4" width="4" height="16" rx="1"/>
  </svg>
);

export const MapIcon = ({ size = 24, color = '#fff', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="8" y1="2" x2="8" y2="18" stroke={color} strokeWidth="2"/>
    <line x1="16" y1="6" x2="16" y2="22" stroke={color} strokeWidth="2"/>
  </svg>
);

export const TrophyIcon = ({ size = 24, color = '#FFD700', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M6 9H4a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 9h2a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 4h12v7a6 6 0 0 1-12 0V4z" fill={color} opacity="0.2" stroke={color} strokeWidth="2"/>
    <line x1="12" y1="17" x2="12" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="21" x2="16" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const GiftIcon = ({ size = 24, color = '#FF6B6B', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <rect x="2" y="9" width="20" height="13" rx="2" fill={color} opacity="0.2" stroke={color} strokeWidth="2"/>
    <rect x="2" y="4" width="20" height="5" rx="1" fill={color} opacity="0.3" stroke={color} strokeWidth="2"/>
    <line x1="12" y1="4" x2="12" y2="22" stroke={color} strokeWidth="2"/>
    <path d="M12 4c0-1.1 1.8-3 3-2 1.2.9.6 2.5 0 3-1.5 1.2-3 1-3 1" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 4c0-1.1-1.8-3-3-2-1.2.9-.6 2.5 0 3 1.5 1.2 3 1 3 1" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ShopIcon = ({ size = 24, color = '#FFD700', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" fill={color} opacity="0.15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2"/>
    <path d="M16 10a4 4 0 0 1-8 0" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// ─── Gameplay ──────────────────────────────────────────────────────────────────

export const StarIcon = ({ size = 24, color = '#FFD700', filled = true, style }: IconProps & { filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <polygon
      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CoinIcon = ({ size = 24, color = '#FFD700', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <circle cx="12" cy="12" r="9" fill={color} opacity="0.9"/>
    <circle cx="12" cy="12" r="7" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="rgba(0,0,0,0.5)" fontFamily="system-ui">$</text>
  </svg>
);

export const BombIcon = ({ size = 24, style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <circle cx="12" cy="14" r="7" fill="#1a1a1a" stroke="#333" strokeWidth="1.5"/>
    <path d="M15.5 6.5 L17 4 L19 5" stroke="#FF6600" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="18" cy="3.5" r="1.5" fill="#FF6600"/>
    <circle cx="10" cy="12" r="2" fill="rgba(255,255,255,0.1)"/>
  </svg>
);

export const FlameIcon = ({ size = 24, color = '#FF4500', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M12 2C12 2 9 7 9 12c0 1.7.7 3.2 1.8 4.3C11.3 17 11.9 17.6 12 18c.1-.4.7-1 1.2-1.7C14.3 15.2 15 13.7 15 12c0-5-3-10-3-10z" fill={color} opacity="0.9"/>
    <path d="M12 22c-2.5 0-4.5-2-4.5-4.5 0-2 1.5-3.5 2.5-4.5.2 1 1 2 2 2s1.8-1 2-2c1 1 2.5 2.5 2.5 4.5C16.5 20 14.5 22 12 22z" fill={color}/>
  </svg>
);

export const LockIcon = ({ size = 24, color = '#666', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <rect x="5" y="11" width="14" height="10" rx="2" fill={color} opacity="0.2" stroke={color} strokeWidth="2"/>
    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1.5" fill={color}/>
  </svg>
);

export const CheckIcon = ({ size = 24, color = '#00E676', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CloseIcon = ({ size = 24, color = '#fff', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const RetryIcon = ({ size = 24, color = '#fff', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M1 4v6h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.51 15a9 9 0 1 0 .49-5.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const TimerIcon = ({ size = 24, color = '#FFB800', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <circle cx="12" cy="13" r="8" fill={color} opacity="0.15" stroke={color} strokeWidth="2"/>
    <path d="M12 9v4l3 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 2h6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 2v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const InfinityIcon = ({ size = 24, color = '#00E5FF', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4zm0 0c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z" stroke={color} strokeWidth="2" fill={color} opacity="0.2"/>
  </svg>
);

export const HeartIcon = ({ size = 24, color = '#FF5252', filled = true, style }: IconProps & { filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRightIcon = ({ size = 24, color = '#fff', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DiamondIcon = ({ size = 24, color = '#B24BF3', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <polygon points="12,2 22,9 12,22 2,9" opacity="0.85"/>
    <polygon points="12,2 22,9 12,22 2,9" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
  </svg>
);

export const SwordIcon = ({ size = 24, color = '#fff', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M14.5 17.5L3 6 6 3l14.5 11.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M13 19l2-2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 16l1-1" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 6L2 7l.5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SparkleIcon = ({ size = 24, color = '#FFD700', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" opacity="0.9"/>
    <path d="M19 3L19.5 5L21 5.5L19.5 6L19 8L18.5 6L17 5.5L18.5 5L19 3Z" opacity="0.7"/>
    <path d="M5 16L5.5 18L7 18.5L5.5 19L5 21L4.5 19L3 18.5L4.5 18L5 16Z" opacity="0.7"/>
  </svg>
);

export const BoltIcon = ({ size = 24, color = '#FFCC00', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M13 2L4.09 12.5H11L10 22L20.91 11.5H14L13 2Z"/>
  </svg>
);

export const TargetIcon = ({ size = 24, color = '#FF6B6B', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2" opacity="0.6"/>
    <circle cx="12" cy="12" r="2" fill={color}/>
  </svg>
);

export const VolumeIcon = ({ size = 24, color = '#fff', muted = false, style }: IconProps & { muted?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill={color} opacity="0.8"/>
    {!muted ? (
      <>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      </>
    ) : (
      <path d="M23 9l-6 6m0-6l6 6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    )}
  </svg>
);

export const ExitIcon = ({ size = 24, color = '#FF5252', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <polyline points="16,17 21,12 16,7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="21" y1="12" x2="9" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// ─── World Emblems (for Level Map) ────────────────────────────────────────────

export const WorldEmblemOrchard = ({ size = 32, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={style}>
    <circle cx="16" cy="20" r="10" fill="#3D8B37" opacity="0.8"/>
    <circle cx="16" cy="20" r="7" fill="#52C22B" opacity="0.6"/>
    <path d="M16 10 C14 6 10 4 10 4 C12 8 14 10 16 10" fill="#2D5A1B"/>
    <path d="M16 10 C18 6 22 4 22 4 C20 8 18 10 16 10" fill="#2D5A1B"/>
    <path d="M16 8 L16 20" stroke="#2D5A1B" strokeWidth="1.5"/>
  </svg>
);

export const WorldEmblemVolcanic = ({ size = 32, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={style}>
    <polygon points="16,4 28,28 4,28" fill="#8B1A1A" opacity="0.8"/>
    <polygon points="16,8 25,28 7,28" fill="#CC3300" opacity="0.7"/>
    <path d="M14 12 Q16 8 18 12 Q16 10 14 12" fill="#FF6600" opacity="0.9"/>
    <path d="M12 18 Q14 14 16 18" fill="#FF4400" opacity="0.8"/>
  </svg>
);

export const WorldEmblemNeon = ({ size = 32, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={style}>
    <rect x="4" y="4" width="24" height="24" rx="4" fill="#0A0020" stroke="#CC00FF" strokeWidth="2" opacity="0.9"/>
    <line x1="8" y1="16" x2="24" y2="16" stroke="#00FFFF" strokeWidth="2" opacity="0.8"/>
    <line x1="16" y1="8" x2="16" y2="24" stroke="#FF00FF" strokeWidth="2" opacity="0.8"/>
    <circle cx="16" cy="16" r="4" fill="#7700FF" opacity="0.7"/>
  </svg>
);

export const WorldEmblemCosmic = ({ size = 32, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={style}>
    <circle cx="16" cy="16" r="12" fill="#0B0030" stroke="#4466FF" strokeWidth="1.5" opacity="0.9"/>
    <circle cx="16" cy="16" r="6" fill="#1A0050" stroke="#8855FF" strokeWidth="1"/>
    <circle cx="16" cy="16" r="2" fill="#AABBFF"/>
    <circle cx="8" cy="10" r="1" fill="#FFFFFF" opacity="0.8"/>
    <circle cx="22" cy="8" r="0.8" fill="#FFFFFF" opacity="0.6"/>
    <circle cx="25" cy="20" r="0.7" fill="#FFFFFF" opacity="0.7"/>
    <circle cx="10" cy="24" r="0.9" fill="#FFFFFF" opacity="0.5"/>
  </svg>
);
