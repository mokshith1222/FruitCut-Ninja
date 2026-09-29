import Phaser from 'phaser';

export interface FruitConfigData {
  id: string;
  name: string;
  color: number;
  score: number;
  baseSize: number;
  isBomb: boolean;
  effect?: 'freeze' | 'frenzy' | 'golden' | 'crystal' | 'fake';
}

export const FruitTypes: Record<string, FruitConfigData> = {
  apple: { id: 'apple', name: 'Apple', color: 0xFF0000, score: 10, baseSize: 40, isBomb: false },
  orange: { id: 'orange', name: 'Orange', color: 0xFFA500, score: 10, baseSize: 45, isBomb: false },
  watermelon: { id: 'watermelon', name: 'Watermelon', color: 0x00FF00, score: 15, baseSize: 60, isBomb: false },
  banana: { id: 'banana', name: 'Banana', color: 0xFFFF00, score: 10, baseSize: 35, isBomb: false },
  strawberry: { id: 'strawberry', name: 'Strawberry', color: 0xFF1493, score: 15, baseSize: 25, isBomb: false },
  kiwi: { id: 'kiwi', name: 'Kiwi', color: 0x8B4513, score: 10, baseSize: 30, isBomb: false },
  pineapple: { id: 'pineapple', name: 'Pineapple', color: 0xFFD700, score: 20, baseSize: 55, isBomb: false },
  mango: { id: 'mango', name: 'Mango', color: 0xFF8C00, score: 10, baseSize: 40, isBomb: false },
  // Hazards
  bomb: { id: 'bomb', name: 'Bomb', color: 0x111111, score: 0, baseSize: 45, isBomb: true },
  fast_bomb: { id: 'fast_bomb', name: 'Fast Bomb', color: 0xAA0000, score: 0, baseSize: 35, isBomb: true },
  fake_fruit: { id: 'fake_fruit', name: 'Fake Fruit', color: 0x888888, score: 0, baseSize: 45, isBomb: true, effect: 'fake' },
  // Specials
  golden_fruit: { id: 'golden_fruit', name: 'Golden Fruit', color: 0xFFD700, score: 100, baseSize: 50, isBomb: false, effect: 'golden' },
  freeze_fruit: { id: 'freeze_fruit', name: 'Freeze Fruit', color: 0x00FFFF, score: 30, baseSize: 45, isBomb: false, effect: 'freeze' },
  lightning_fruit: { id: 'lightning_fruit', name: 'Lightning Fruit', color: 0xEE82EE, score: 30, baseSize: 45, isBomb: false, effect: 'frenzy' },
  crystal_fruit: { id: 'crystal_fruit', name: 'Crystal Fruit', color: 0xFFFFFF, score: 200, baseSize: 35, isBomb: false, effect: 'crystal' },
};

import { FruitSVGs } from './FruitSVGs';

export const preloadFruitAssets = (scene: Phaser.Scene) => {
  for (const [key, svgString] of Object.entries(FruitSVGs)) {
    const base64Data = window.btoa(unescape(encodeURIComponent(svgString)));
    scene.load.svg(key, `data:image/svg+xml;base64,${base64Data}`);
  }
};
