import { motion } from 'framer-motion';
import { Screen, CoinChip } from '../components/Layout';
import { IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';

const BLADE_SKINS = [
  { id: 'default_blade', name: 'Classic',  emoji: '🗡️',  cost: 0 },
  { id: 'golden_blade',  name: 'Golden',   emoji: '⚔️',  cost: 500 },
  { id: 'fire_blade',    name: 'Inferno',  emoji: '🔥',  cost: 800 },
  { id: 'ice_blade',     name: 'Frost',    emoji: '❄️',  cost: 800 },
  { id: 'neon_blade',    name: 'Neon',     emoji: '⚡',  cost: 1200 },
  { id: 'rainbow_blade', name: 'Rainbow',  emoji: '🌈',  cost: 1500 },
];

export const ShopScreen = () => {
  const setPhase = useGameState(s => s.setPhase);
  const { coins, unlockedSkins, currentSkin, unlockSkin, equipSkin, spendCoins } = useProgressionState();

  return (
    <Screen blurBg={false} style={{ background: 'var(--grad-bg)', alignItems: 'stretch' }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px 12px',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid var(--c-border)',
        background: 'rgba(0,0,0,0.3)',
        flexShrink: 0,
      }}>
        <IconButton id="btn-back-shop" icon="←" onClick={() => setPhase(GamePhase.MAIN_MENU)} label="Back" />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 'var(--fs-subheading)', fontWeight: 800 }}>🛒 Shop</h2>
          <p style={{ fontSize: 'var(--fs-small)', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Unlock blade skins</p>
        </div>
        <CoinChip amount={coins} />
      </div>

      {/* Blades grid */}
      <div className="scroll-y" style={{ flex: 1, padding: 'var(--sp-lg)' }}>
        <p style={{ fontSize: 'var(--fs-small)', color: 'rgba(255,255,255,0.45)', marginBottom: 20, fontWeight: 700, letterSpacing: '0.1em' }}>
          BLADE SKINS
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {BLADE_SKINS.map((skin, i) => {
            const isOwned    = unlockedSkins.includes(skin.id);
            const isEquipped = currentSkin === skin.id;
            const canAfford  = coins >= skin.cost;

            return (
              <motion.div
                key={skin.id}
                className={`blade-card${isEquipped ? ' blade-card--selected' : ''}${!isOwned && !canAfford ? ' blade-card--locked' : ''}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="blade-preview">{skin.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: 'var(--fs-body)' }}>{skin.name}</div>

                {isEquipped ? (
                  <span style={{ fontSize: 'var(--fs-small)', color: 'var(--c-success)', fontWeight: 700 }}>✓ Equipped</span>
                ) : isOwned ? (
                  <button className="btn btn--ghost btn--sm" onClick={() => equipSkin(skin.id)}>Equip</button>
                ) : (
                  <button
                    className="btn btn--secondary btn--sm"
                    disabled={!canAfford}
                    onClick={() => { 
                      if (canAfford) {
                        const success = spendCoins(skin.cost);
                        if (success) {
                          unlockSkin(skin.id);
                          equipSkin(skin.id);
                        }
                      } 
                    }}
                  >
                    🪙 {skin.cost}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </Screen>
  );
};
