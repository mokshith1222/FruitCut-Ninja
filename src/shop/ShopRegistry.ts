import type { CosmeticItem } from './ShopTypes';

export const SHOP_REGISTRY: Record<string, CosmeticItem> = {
  // ==========================================
  // BLADES (Visual slash effect in UI and game)
  // ==========================================
  'blade_classic': {
    id: 'blade_classic', category: 'blade', name: 'Classic Blade',
    description: 'The standard issue training blade.',
    rarity: 'common', price: 0, unlockedByDefault: true, emoji: '🗡️'
  },
  'blade_samurai': {
    id: 'blade_samurai', category: 'blade', name: 'Samurai Edge',
    description: 'Folded steel that cuts true.',
    rarity: 'uncommon', price: 250, unlockedByDefault: false, emoji: '⛩️'
  },
  'blade_crimson': {
    id: 'blade_crimson', category: 'blade', name: 'Crimson Edge',
    description: 'A blade forged in battle.',
    rarity: 'rare', price: 600, unlockedByDefault: false, emoji: '🩸'
  },
  'blade_golden': {
    id: 'blade_golden', category: 'blade', name: 'Golden Edge',
    description: 'Heavy, but immensely satisfying.',
    rarity: 'epic', price: 1200, unlockedByDefault: false, emoji: '⚔️'
  },
  'blade_neon': {
    id: 'blade_neon', category: 'blade', name: 'Neon Cutter',
    description: 'Cybernetic precision.',
    rarity: 'epic', price: 1500, unlockedByDefault: false, emoji: '⚡'
  },
  'blade_void': {
    id: 'blade_void', category: 'blade', name: 'Void Blade',
    description: 'Forged from the darkness between worlds.',
    rarity: 'legendary', price: 2500, unlockedByDefault: false, emoji: '🌌'
  },
  
  // ==========================================
  // TRAILS (Follows the blade)
  // ==========================================
  'trail_basic': {
    id: 'trail_basic', category: 'trail', name: 'Basic Trail',
    description: 'A simple white slash.',
    rarity: 'common', price: 0, unlockedByDefault: true, emoji: '💨',
    config: { outerColor: 0xFFFFFF, innerColor: 0x00FFFF, outerWidth: 14 }
  },
  'trail_spark': {
    id: 'trail_spark', category: 'trail', name: 'Golden Spark',
    description: 'Leaves a trail of stardust.',
    rarity: 'uncommon', price: 300, unlockedByDefault: false, emoji: '✨',
    config: { outerColor: 0xFFD700, innerColor: 0xFFFFFF, outerWidth: 16 }
  },
  'trail_flame': {
    id: 'trail_flame', category: 'trail', name: 'Fire Trail',
    description: 'Scorches the air as it swings.',
    rarity: 'rare', price: 700, unlockedByDefault: false, emoji: '🔥',
    config: { outerColor: 0xFF4500, innerColor: 0xFFD700, outerWidth: 18 }
  },
  'trail_plasma': {
    id: 'trail_plasma', category: 'trail', name: 'Plasma Trail',
    description: 'Superheated energy slash.',
    rarity: 'epic', price: 1400, unlockedByDefault: false, emoji: '☄️',
    config: { outerColor: 0xFF1493, innerColor: 0x00FFFF, outerWidth: 16 }
  },
  'trail_cosmic': {
    id: 'trail_cosmic', category: 'trail', name: 'Cosmic Rift',
    description: 'Tears the fabric of space.',
    rarity: 'legendary', price: 2800, unlockedByDefault: false, emoji: '🌠',
    config: { outerColor: 0x9400D3, innerColor: 0x00FF00, outerWidth: 18 }
  },

  // ==========================================
  // SLICE EFFECTS (Impact particles)
  // ==========================================
  'effect_juice': {
    id: 'effect_juice', category: 'effect', name: 'Classic Juice',
    description: 'Traditional fruit juice splatters.',
    rarity: 'common', price: 0, unlockedByDefault: true, emoji: '💦'
  },
  'effect_fire': {
    id: 'effect_fire', category: 'effect', name: 'Fire Burst',
    description: 'Explodes into flames on impact.',
    rarity: 'rare', price: 800, unlockedByDefault: false, emoji: '💥'
  },
  'effect_stars': {
    id: 'effect_stars', category: 'effect', name: 'Star Burst',
    description: 'A shower of victory stars.',
    rarity: 'epic', price: 1600, unlockedByDefault: false, emoji: '⭐'
  },
  
  // ==========================================
  // BACKGROUND THEMES
  // ==========================================
  'theme_dojo': {
    id: 'theme_dojo', category: 'theme', name: 'Training Dojo',
    description: 'The starting grounds.',
    rarity: 'common', price: 0, unlockedByDefault: true, emoji: '🏯'
  },
  'theme_orchard': {
    id: 'theme_orchard', category: 'theme', name: 'Sunset Orchard',
    description: 'A beautiful evening breeze.',
    rarity: 'rare', price: 1000, unlockedByDefault: false, emoji: '🌅'
  },
  'theme_neon': {
    id: 'theme_neon', category: 'theme', name: 'Neon Grid',
    description: 'Retro 80s aesthetics.',
    rarity: 'epic', price: 1800, unlockedByDefault: false, emoji: '🌃'
  },
};

export const getItemsByCategory = (category: string) => {
  return Object.values(SHOP_REGISTRY).filter(item => item.category === category);
};

export const getItemById = (id: string): CosmeticItem | undefined => {
  return SHOP_REGISTRY[id];
};
