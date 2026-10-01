import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { useCoinLedger } from '../../economy/CoinLedger';
import { getItemsByCategory } from '../../shop/ShopRegistry';
import type { CosmeticCategory, CosmeticItem, Rarity } from '../../shop/ShopTypes';
import { ShopItemDetail } from './ShopItemDetail';
import { BackIcon, CoinIcon, CheckIcon, SwordIcon, SparkleIcon, DiamondIcon } from '../icons/GameIcons';

/* ─── Rarity config ─────────────────────────────────────── */
const RARITY: Record<Rarity, { label: string; color: string; glow: string; border: string }> = {
  common:    { label: 'COMMON',    color: '#A0A5C0', glow: 'transparent', border: 'rgba(160,165,192,0.25)' },
  uncommon:  { label: 'UNCOMMON',  color: '#00E676', glow: 'rgba(0,230,118,0.15)', border: 'rgba(0,230,118,0.35)' },
  rare:      { label: 'RARE',      color: '#40C4FF', glow: 'rgba(64,196,255,0.15)', border: 'rgba(64,196,255,0.45)' },
  epic:      { label: 'EPIC',      color: '#CE93D8', glow: 'rgba(206,147,216,0.2)', border: 'rgba(206,147,216,0.5)' },
  legendary: { label: 'LEGENDARY', color: '#FFD740', glow: 'rgba(255,215,64,0.2)', border: 'rgba(255,215,64,0.6)' },
};

/* ─── Visual Previews (SVG — no emoji) ─────────────────── */
const ItemPreview = ({ item, size = 72 }: { item: CosmeticItem; size?: number }) => {
  const s = size;

  if (item.category === 'blade') {
    const colors: Record<string, [string, string]> = {
      blade_classic: ['#AABBCC', '#DDEEFF'],
      blade_samurai: ['#8B7355', '#D4A96A'],
      blade_crimson: ['#CC2244', '#FF5577'],
      blade_golden:  ['#D4AF37', '#FFE066'],
      blade_neon:    ['#00CCFF', '#88EEFF'],
      blade_void:    ['#6633CC', '#AA88FF'],
    };
    const [c1, c2] = colors[item.id] || ['#888', '#CCC'];
    return (
      <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
        <defs>
          <linearGradient id={`bg-${item.id}`} x1="40" y1="8" x2="40" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={c2}/>
            <stop offset="100%" stopColor={c1}/>
          </linearGradient>
        </defs>
        <path d="M40 8 L60 62 Q40 70 40 70 Q40 70 20 62 Z" fill={`url(#bg-${item.id})`} opacity="0.9"/>
        <path d="M40 8 L50 32 Q40 37 40 37 Z" fill="rgba(255,255,255,0.35)"/>
        <rect x="35" y="64" width="10" height="6" rx="2" fill="rgba(255,255,255,0.2)"/>
      </svg>
    );
  }

  if (item.category === 'trail') {
    const config = item.config || {};
    const outerColor = config.outerColor ? `#${config.outerColor.toString(16).padStart(6, '0')}` : '#ffffff';
    const innerColor = config.innerColor ? `#${config.innerColor.toString(16).padStart(6, '0')}` : '#00ffff';
    return (
      <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
        <defs>
          <linearGradient id={`trail-${item.id}`} x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={outerColor} stopOpacity="0"/>
            <stop offset="60%" stopColor={outerColor} stopOpacity="0.8"/>
            <stop offset="100%" stopColor={innerColor}/>
          </linearGradient>
        </defs>
        {/* Trail curve */}
        <path d="M10 60 Q30 20 70 10" stroke={`url(#trail-${item.id})`} strokeWidth="10" strokeLinecap="round" opacity="0.7"/>
        <path d="M10 60 Q30 20 70 10" stroke={innerColor} strokeWidth="4" strokeLinecap="round" opacity="0.9"/>
        {/* Lead tip */}
        <circle cx="70" cy="10" r="5" fill={innerColor} opacity="0.95"/>
        <circle cx="70" cy="10" r="3" fill="#ffffff"/>
      </svg>
    );
  }

  if (item.category === 'effect') {
    const effectColors: Record<string, string[]> = {
      effect_juice: ['#22AAFF', '#44CCFF', '#0088CC'],
      effect_fire:  ['#FF4400', '#FF8800', '#FFCC00'],
      effect_stars: ['#FFD700', '#FF9900', '#FFFFFF'],
    };
    const cols = effectColors[item.id] || ['#888', '#AAA', '#CCC'];
    const particles = [
      { cx: 40, cy: 25, r: 5 }, { cx: 55, cy: 35, r: 4 }, { cx: 30, cy: 32, r: 3 },
      { cx: 52, cy: 52, r: 5 }, { cx: 28, cy: 50, r: 4 }, { cx: 60, cy: 30, r: 3 },
      { cx: 40, cy: 55, r: 4 }, { cx: 22, cy: 40, r: 3 }, { cx: 58, cy: 48, r: 4 },
    ];
    return (
      <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="16" fill={cols[0]} opacity="0.2"/>
        {particles.map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={cols[i % cols.length]} opacity={0.7 + (i % 3) * 0.1}/>
        ))}
        <circle cx="40" cy="40" r="6" fill="white" opacity="0.9"/>
      </svg>
    );
  }

  if (item.category === 'theme') {
    const themeColors: Record<string, [string, string, string]> = {
      theme_dojo:    ['#0D0D1A', '#1A0D2E', '#FF2A5F'],
      theme_orchard: ['#0A1628', '#1B3A2D', '#52C22B'],
      theme_neon:    ['#120024', '#3a005c', '#E91E63'],
    };
    const [bg1, bg2, accent] = themeColors[item.id] || ['#111', '#222', '#888'];
    return (
      <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
        <defs>
          <linearGradient id={`theme-${item.id}`} x1="0" y1="0" x2="0" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={bg1}/>
            <stop offset="100%" stopColor={bg2}/>
          </linearGradient>
        </defs>
        <rect width="80" height="80" rx="12" fill={`url(#theme-${item.id})`}/>
        {/* Small scene within */}
        <circle cx="40" cy="44" r="14" fill={accent} opacity="0.15"/>
        <line x1="12" y1="52" x2="68" y2="52" stroke={accent} strokeWidth="1.5" opacity="0.3"/>
        <path d="M28 52 L40 30 L52 52 Z" fill={accent} opacity="0.4"/>
        <circle cx="60" cy="22" r="6" fill={accent} opacity="0.6"/>
      </svg>
    );
  }

  return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="30" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
      <DiamondIcon size={40} color="#888" style={{ position: 'absolute' }}/>
    </svg>
  );
};

/* ─── Category Tab ──────────────────────────────────────── */
type CategoryTab = { id: CosmeticCategory; label: string; icon: React.ReactNode };

const CATEGORIES: CategoryTab[] = [
  { id: 'blade',  label: 'Blades',  icon: <SwordIcon size={18}/> },
  { id: 'trail',  label: 'Trails',  icon: <SparkleIcon size={18}/> },
  { id: 'effect', label: 'Effects', icon: <DiamondIcon size={18}/> },
  { id: 'theme',  label: 'Themes',  icon: <DiamondIcon size={18} color="#CE93D8"/> },
];

/* ─── Item Card ─────────────────────────────────────────── */
const ShopItemCard = ({
  item,
  isOwned,
  isEquipped,
  onClick,
  index,
}: {
  item: CosmeticItem;
  isOwned: boolean;
  isEquipped: boolean;
  onClick: () => void;
  index: number;
}) => {
  const rarity = RARITY[item.rarity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.28, ease: [0.16,1,0.3,1] }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      style={{
        borderRadius: 'var(--r-lg)',
        border: `1.5px solid ${isEquipped ? 'var(--c-success)' : rarity.border}`,
        background: `linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
        boxShadow: isEquipped
          ? '0 0 20px rgba(0,230,118,0.25)'
          : rarity.glow !== 'transparent'
          ? `0 0 16px ${rarity.glow}`
          : 'none',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Rarity accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 2,
        background: rarity.border,
        opacity: 0.6,
      }}/>

      {/* Status badge */}
      <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
        {isEquipped ? (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 3,
            background: 'var(--c-success)', color: '#003d18',
            fontSize: '0.58rem', fontWeight: 900,
            padding: '2px 7px', borderRadius: 'var(--r-pill)',
            letterSpacing: '0.06em',
          }}>
            <CheckIcon size={10} color="#003d18"/>
            ON
          </div>
        ) : isOwned ? (
          <div style={{
            background: 'rgba(255,255,255,0.12)',
            fontSize: '0.58rem', fontWeight: 800,
            padding: '2px 7px', borderRadius: 'var(--r-pill)',
            color: 'rgba(255,255,255,0.6)',
          }}>
            OWNED
          </div>
        ) : (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 3,
            background: 'rgba(0,0,0,0.7)',
            fontSize: '0.65rem', fontWeight: 900,
            padding: '3px 8px', borderRadius: 'var(--r-pill)',
            color: 'var(--c-coin)',
          }}>
            <CoinIcon size={12}/>
            {item.price.toLocaleString()}
          </div>
        )}
      </div>

      {/* Rarity label */}
      <div style={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}>
        <span style={{
          fontSize: '0.55rem', fontWeight: 900,
          color: rarity.color, letterSpacing: '0.08em',
        }}>
          {rarity.label}
        </span>
      </div>

      {/* Preview area */}
      <div style={{
        height: 104, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        paddingTop: 16,
        position: 'relative',
      }}>
        {rarity.glow !== 'transparent' && (
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle, ${rarity.glow} 0%, transparent 65%)`,
          }}/>
        )}
        <ItemPreview item={item} size={72}/>
      </div>

      {/* Name area */}
      <div style={{
        padding: '10px 12px 14px',
        background: 'rgba(0,0,0,0.25)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
          {item.name}
        </div>
        <div style={{ fontSize: '0.68rem', color: 'var(--c-text-muted)', marginTop: 3, lineHeight: 1.3 }}>
          {item.description}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Component ─────────────────────────────────────── */
export const ShopScreen = () => {
  const setPhase = useGameState(s => s.setPhase);
  const balance  = useCoinLedger(s => s.balance);
  const { unlockedItems, equippedItems } = useProgressionState();

  const [activeCategory, setActiveCategory] = useState<CosmeticCategory>('blade');
  const [selectedItem, setSelectedItem]     = useState<CosmeticItem | null>(null);

  const items = useMemo(() => getItemsByCategory(activeCategory), [activeCategory]);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      background: 'var(--grad-bg)',
      pointerEvents: 'auto',
    }}>
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.28 }}
        style={{
          padding: 'max(env(safe-area-inset-top, 0px), 12px) 20px 14px',
          display: 'flex', alignItems: 'center', gap: 12,
          borderBottom: '1px solid var(--c-border)',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(16px)',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <motion.button
          className="btn btn--ghost btn--icon"
          whileTap={{ scale: 0.88 }}
          onClick={() => setPhase(GamePhase.MAIN_MENU)}
          aria-label="Back"
        >
          <BackIcon size={20}/>
        </motion.button>

        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.04em' }}>ARMORY</h2>
          <p style={{ fontSize: '0.72rem', color: 'var(--c-text-sub)', marginTop: 2 }}>
            Customize your blade
          </p>
        </div>

        {/* Balance */}
        <div className="coin-display">
          <CoinIcon size={16}/>
          <span>{balance.toLocaleString()}</span>
        </div>
      </motion.div>

      {/* Category tabs */}
      <div style={{
        display: 'flex', gap: 6, padding: '12px 16px',
        borderBottom: '1px solid var(--c-border)',
        background: 'rgba(0,0,0,0.2)',
        flexShrink: 0,
        overflowX: 'auto',
      }} className="hide-scrollbar">
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileTap={{ scale: 0.92 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '8px 16px',
                borderRadius: 'var(--r-pill)',
                background: isActive ? 'rgba(255,42,95,0.15)' : 'rgba(255,255,255,0.04)',
                border: isActive ? '1px solid rgba(255,42,95,0.4)' : '1px solid rgba(255,255,255,0.08)',
                color: isActive ? '#fff' : 'var(--c-text-sub)',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.18s ease',
                flexShrink: 0,
                minHeight: 40,
              }}
            >
              {cat.icon}
              {cat.label}
            </motion.button>
          );
        })}
      </div>

      {/* Item grid */}
      <div className="scroll-y" style={{ flex: 1, padding: '16px 16px 60px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}
          >
            {items.map((item, i) => {
              const isOwned    = unlockedItems.includes(item.id) || item.unlockedByDefault;
              const isEquipped = equippedItems[activeCategory] === item.id;
              return (
                <ShopItemCard
                  key={item.id}
                  item={item}
                  isOwned={isOwned}
                  isEquipped={isEquipped}
                  onClick={() => setSelectedItem(item)}
                  index={i}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
        <div style={{ height: 'max(env(safe-area-inset-bottom, 0px), 16px)' }}/>
      </div>

      {/* Item detail modal */}
      <AnimatePresence>
        {selectedItem && (
          <ShopItemDetail
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
