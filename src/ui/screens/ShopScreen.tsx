import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Screen, CoinChip } from '../components/Layout';
import { IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { useCoinLedger } from '../../economy/CoinLedger';
import { getItemsByCategory } from '../../shop/ShopRegistry';
import type { CosmeticCategory, CosmeticItem } from '../../shop/ShopTypes';
import { RARITY_STYLES } from '../../shop/ShopTypes';
import { ShopItemDetail } from './ShopItemDetail';

const CATEGORIES: { id: CosmeticCategory, label: string, emoji: string }[] = [
  { id: 'blade', label: 'Blades', emoji: '🗡️' },
  { id: 'trail', label: 'Trails', emoji: '💨' },
  { id: 'effect', label: 'Effects', emoji: '✨' },
  { id: 'theme', label: 'Themes', emoji: '🖼️' },
];

export const ShopScreen = () => {
  const setPhase = useGameState(s => s.setPhase);
  const balance = useCoinLedger(s => s.balance);
  const { unlockedItems, equippedItems } = useProgressionState();

  const [activeCategory, setActiveCategory] = useState<CosmeticCategory>('blade');
  const [selectedItem, setSelectedItem] = useState<CosmeticItem | null>(null);

  const items = useMemo(() => getItemsByCategory(activeCategory), [activeCategory]);

  return (
    <Screen blurBg={false} style={{ background: 'var(--grad-bg)', alignItems: 'stretch' }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px 12px',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid var(--c-border)',
        background: 'rgba(0,0,0,0.3)',
        flexShrink: 0,
        zIndex: 10
      }}>
        <IconButton id="btn-back-shop" icon="←" onClick={() => setPhase(GamePhase.MAIN_MENU)} label="Back" />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 'var(--fs-subheading)', fontWeight: 800 }}>🛒 Store</h2>
          <p style={{ fontSize: 'var(--fs-small)', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Customize your dojo</p>
        </div>
        <CoinChip amount={balance} />
      </div>

      {/* Category Tabs */}
      <div style={{
        display: 'flex', overflowX: 'auto', gap: 8, padding: '12px 20px',
        borderBottom: '1px solid var(--c-border)',
        background: 'rgba(0,0,0,0.2)',
        flexShrink: 0,
        scrollbarWidth: 'none'
      }} className="hide-scroll">
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 20,
                background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                border: `1px solid ${isActive ? 'rgba(255,255,255,0.3)' : 'transparent'}`,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                fontWeight: 700, fontSize: '0.9rem',
                transition: 'all 0.2s ease', whiteSpace: 'nowrap'
              }}
            >
              <span>{cat.emoji}</span> {cat.label}
            </button>
          );
        })}
      </div>

      {/* Item Grid */}
      <div className="scroll-y" style={{ flex: 1, padding: 'var(--sp-lg)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {items.map((item, i) => {
            const isOwned = unlockedItems.includes(item.id) || item.unlockedByDefault;
            const isEquipped = equippedItems[activeCategory] === item.id;
            const rarityStyle = RARITY_STYLES[item.rarity];

            return (
              <motion.div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'var(--c-surface-2)',
                  borderRadius: 16,
                  border: `2px solid ${isEquipped ? 'var(--c-success)' : rarityStyle.border}`,
                  overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  position: 'relative',
                  cursor: 'pointer',
                  boxShadow: isEquipped ? '0 0 15px rgba(46,204,113,0.3)' : 'none'
                }}
              >
                {/* Rarity Glow / Background */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
                  background: `linear-gradient(to bottom, ${rarityStyle.border}, transparent)`,
                  opacity: 0.3
                }} />
                
                {/* Rarity Label */}
                <div style={{
                  position: 'absolute', top: 8, left: 8,
                  fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase',
                  color: rarityStyle.color, letterSpacing: '0.05em'
                }}>
                  {rarityStyle.label}
                </div>

                {/* Status Label */}
                {isEquipped && (
                   <div style={{
                    position: 'absolute', top: 6, right: 6,
                    background: 'var(--c-success)', color: '#000',
                    fontSize: '0.6rem', fontWeight: 900, padding: '2px 6px',
                    borderRadius: 8
                  }}>
                    EQUIPPED
                  </div>
                )}
                {!isOwned && (
                   <div style={{
                    position: 'absolute', top: 6, right: 6,
                    background: 'rgba(0,0,0,0.6)', color: 'var(--c-coin)',
                    fontSize: '0.7rem', fontWeight: 800, padding: '3px 8px',
                    borderRadius: 8, display: 'flex', alignItems: 'center', gap: 4
                  }}>
                    🪙 {item.price}
                  </div>
                )}

                {/* Preview Area */}
                <div style={{ 
                  height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '3rem', zIndex: 1
                }}>
                  {item.emoji}
                </div>

                {/* Name Area */}
                <div style={{
                  padding: '10px 12px', background: 'rgba(0,0,0,0.3)',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', lineHeight: 1.1 }}>{item.name}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div style={{ height: 40 }} /> {/* Bottom padding */}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ShopItemDetail 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </Screen>
  );
};
