export type CosmeticCategory = 'blade' | 'trail' | 'effect' | 'theme' | 'fruit_skin';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface CosmeticItem {
  id: string;
  category: CosmeticCategory;
  name: string;
  description: string;
  rarity: Rarity;
  price: number;
  previewColor?: string; // used for preview cards if no asset key
  emoji?: string; // fallback icon
  unlockedByDefault: boolean;
  tags?: string[];
  
  // Specific configuration data for gameplay systems
  config?: any;
}

export const RARITY_STYLES: Record<Rarity, { color: string, border: string, label: string }> = {
  common:    { color: '#ffffff', border: 'rgba(255,255,255,0.2)', label: 'Common' },
  uncommon:  { color: '#2ecc71', border: 'rgba(46,204,113,0.4)',  label: 'Uncommon' },
  rare:      { color: '#3498db', border: 'rgba(52,152,219,0.5)',  label: 'Rare' },
  epic:      { color: '#9b59b6', border: 'rgba(155,89,182,0.6)',  label: 'Epic' },
  legendary: { color: '#f1c40f', border: 'rgba(241,196,15,0.8)',  label: 'Legendary' }
};
