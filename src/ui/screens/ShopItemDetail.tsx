import { useState } from 'react';
import { motion } from 'framer-motion';
import type { CosmeticItem } from '../../shop/ShopTypes';
import { RARITY_STYLES } from '../../shop/ShopTypes';
import { useProgressionState } from '../../progression/ProgressionState';
import { useCoinLedger } from '../../economy/CoinLedger';
import { PurchaseManager } from '../../economy/PurchaseManager';
import { Button } from '../components/Button';
import { EquipmentManager } from '../../shop/EquipmentManager';

import { GameFeelManager } from '../../gamefeel/GameFeelManager';
import { HapticManager } from '../../gamefeel/HapticManager';
import { AudioSystem } from '../../audio/AudioSystem';

interface ShopItemDetailProps {
  item: CosmeticItem;
  onClose: () => void;
}

export const ShopItemDetail = ({ item, onClose }: ShopItemDetailProps) => {
  const { unlockedItems, equippedItems } = useProgressionState();
  const balance = useCoinLedger(s => s.balance);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [justPurchased, setJustPurchased] = useState(false);

  const isOwned = unlockedItems.includes(item.id) || item.unlockedByDefault;
  const isEquipped = equippedItems[item.category] === item.id;
  const rarityStyle = RARITY_STYLES[item.rarity];
  const canAfford = balance >= item.price;

  const handlePurchase = () => {
    if (isPurchasing) return;
    if (!canAfford) {
      HapticManager.warning();
      AudioSystem.playSfx('fail');
      return;
    }
    setIsPurchasing(true);
    
    // Simulate slight network/processing delay for satisfying interaction
    setTimeout(() => {
      const success = PurchaseManager.purchaseSkin(item.id, item.price);
      if (success) {
        setJustPurchased(true);
        GameFeelManager.onPurchaseSuccess();
      } else {
        HapticManager.warning();
      }
      setIsPurchasing(false);
    }, 350);
  };

  const handleEquip = () => {
    EquipmentManager.equipItem(item.category, item.id);
    AudioSystem.playSfx('click');
    HapticManager.light();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
        zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 24
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 380,
          background: 'var(--c-surface)',
          borderRadius: 24,
          border: `2px solid ${rarityStyle.border}`,
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 12, right: 12, zIndex: 10,
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '1.2rem', cursor: 'pointer'
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Top Preview Area */}
        <div style={{ 
          height: 200, background: `linear-gradient(to bottom, ${rarityStyle.border}, rgba(0,0,0,0.2))`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden'
        }}>
          {/* Animated glow */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: 'absolute', width: '150%', height: '150%',
              background: `radial-gradient(circle, ${rarityStyle.color}40 0%, transparent 70%)`
            }}
          />
          <motion.div 
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
            style={{ fontSize: '6rem', zIndex: 2 }}
          >
            {item.emoji}
          </motion.div>
        </div>

        {/* Content Area */}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ 
              display: 'inline-block',
              fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase',
              color: rarityStyle.color, letterSpacing: '0.1em',
              background: `${rarityStyle.color}15`,
              padding: '4px 10px', borderRadius: 12, marginBottom: 8
            }}>
              {rarityStyle.label}
            </span>
            <h3 style={{ fontSize: 'var(--fs-heading)', fontWeight: 900, lineHeight: 1.1 }}>{item.name}</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 8, fontSize: '0.95rem' }}>{item.description}</p>
          </div>

          <div className="divider" style={{ margin: '8px 0' }} />

          {isOwned ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {justPurchased && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: 'center', color: 'var(--c-success)', fontWeight: 800, fontSize: '0.9rem' }}
                >
                  🎉 PURCHASE SUCCESSFUL!
                </motion.div>
              )}
              {isEquipped ? (
                <div style={{ 
                  textAlign: 'center', padding: 16, background: 'rgba(46,204,113,0.1)',
                  borderRadius: 12, border: '1px solid rgba(46,204,113,0.3)',
                  color: 'var(--c-success)', fontWeight: 800
                }}>
                  ✓ CURRENTLY EQUIPPED
                </div>
              ) : (
                <Button 
                  label="EQUIP" 
                  variant="primary" 
                  fullWidth size="xl"
                  onClick={handleEquip}
                />
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>PRICE</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: canAfford ? 'var(--c-coin)' : 'var(--c-danger)' }}>
                  🪙 {item.price}
                </span>
              </div>
              
              <Button 
                label={isPurchasing ? "PROCESSING..." : "PURCHASE"}
                variant={canAfford ? "secondary" : "danger"}
                fullWidth size="xl"
                onClick={handlePurchase}
                disabled={!canAfford || isPurchasing}
              />
              
              {!canAfford && (
                <p style={{ textAlign: 'center', color: 'var(--c-danger)', fontSize: '0.8rem', marginTop: -8 }}>
                  Not enough coins!
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
