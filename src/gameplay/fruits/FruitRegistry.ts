import type { FruitDefinition } from './FruitDefinition';
import { AppleSVG, AppleLeftSVG, AppleRightSVG } from './assets/AppleSVG';
import { OrangeSVG, OrangeLeftSVG, OrangeRightSVG } from './assets/OrangeSVG';
import { WatermelonSVG, WatermelonLeftSVG, WatermelonRightSVG } from './assets/WatermelonSVG';
import { PineappleSVG, PineappleLeftSVG, PineappleRightSVG } from './assets/PineappleSVG';
import { BombSVG } from './assets/BombSVG';
import { FruitPNGDataURIs } from './FruitPNGs';

export const FruitRegistry: Record<string, FruitDefinition> = {
  apple: {
    id: 'apple',
    name: 'Apple',
    baseSize: 50,
    weight: 1.0,
    points: 10,
    juiceColor: 0xFF2A5F,
    fleshColor: 0xFFFDD0,
    svgWhole: AppleSVG,
    svgLeft: AppleLeftSVG,
    svgRight: AppleRightSVG,
    pngWhole: FruitPNGDataURIs.AppleSVG,
    pngLeft: FruitPNGDataURIs.AppleLeftSVG,
    pngRight: FruitPNGDataURIs.AppleRightSVG,
    shadowOffset: 10,
    rotationSpeed: 1.2,
  },
  orange: {
    id: 'orange',
    name: 'Orange',
    baseSize: 45,
    weight: 0.9,
    points: 10,
    juiceColor: 0xFF9100,
    fleshColor: 0xFFB74D,
    svgWhole: OrangeSVG,
    svgLeft: OrangeLeftSVG,
    svgRight: OrangeRightSVG,
    pngWhole: FruitPNGDataURIs.OrangeSVG,
    pngLeft: FruitPNGDataURIs.OrangeLeftSVG,
    pngRight: FruitPNGDataURIs.OrangeRightSVG,
    shadowOffset: 8,
    rotationSpeed: 1.5,
  },
  watermelon: {
    id: 'watermelon',
    name: 'Watermelon',
    baseSize: 65,
    weight: 1.4,
    points: 20,
    juiceColor: 0xFF1744,
    fleshColor: 0xFF5252,
    svgWhole: WatermelonSVG,
    svgLeft: WatermelonLeftSVG,
    svgRight: WatermelonRightSVG,
    pngWhole: FruitPNGDataURIs.WatermelonSVG,
    pngLeft: FruitPNGDataURIs.WatermelonLeftSVG,
    pngRight: FruitPNGDataURIs.WatermelonRightSVG,
    shadowOffset: 15,
    rotationSpeed: 0.8,
  },
  pineapple: {
    id: 'pineapple',
    name: 'Pineapple',
    baseSize: 70,
    weight: 1.3,
    points: 30,
    juiceColor: 0xFFC400,
    fleshColor: 0xFFE082,
    svgWhole: PineappleSVG,
    svgLeft: PineappleLeftSVG,
    svgRight: PineappleRightSVG,
    pngWhole: FruitPNGDataURIs.PineappleSVG,
    pngLeft: FruitPNGDataURIs.PineappleLeftSVG,
    pngRight: FruitPNGDataURIs.PineappleRightSVG,
    shadowOffset: 14,
    rotationSpeed: 0.9,
  },
  bomb: {
    id: 'bomb',
    name: 'Bomb',
    baseSize: 32,
    weight: 1.1,
    points: 0,
    juiceColor: 0x000000,
    fleshColor: 0x333333,
    svgWhole: BombSVG,
    svgLeft: BombSVG,
    svgRight: BombSVG,
    pngWhole: FruitPNGDataURIs.BombSVG,
    pngLeft: FruitPNGDataURIs.BombSVG,
    pngRight: FruitPNGDataURIs.BombSVG,
    shadowOffset: 12,
    rotationSpeed: 0.5,
    isBomb: true,
  },
  fast_bomb: {
    id: 'fast_bomb', name: 'Fast Bomb', baseSize: 28, weight: 1.1, points: 0,
    juiceColor: 0x000000, fleshColor: 0x333333,
    svgWhole: BombSVG, svgLeft: BombSVG, svgRight: BombSVG,
    pngWhole: FruitPNGDataURIs.BombSVG, pngLeft: FruitPNGDataURIs.BombSVG, pngRight: FruitPNGDataURIs.BombSVG,
    shadowOffset: 12, rotationSpeed: 0.8, isBomb: true
  },
  fake_fruit: {
    id: 'fake_fruit', name: 'Fake Fruit', baseSize: 32, weight: 1.0, points: 0,
    juiceColor: 0x888888, fleshColor: 0x888888,
    svgWhole: BombSVG, svgLeft: BombSVG, svgRight: BombSVG,
    pngWhole: FruitPNGDataURIs.BombSVG, pngLeft: FruitPNGDataURIs.BombSVG, pngRight: FruitPNGDataURIs.BombSVG,
    shadowOffset: 10, rotationSpeed: 1.0, isBomb: true, effect: 'fake'
  },
  golden_fruit: {
    id: 'golden_fruit', name: 'Golden Fruit', baseSize: 55, weight: 1.0, points: 100,
    juiceColor: 0xFFD700, fleshColor: 0xFFD700,
    svgWhole: PineappleSVG, svgLeft: PineappleLeftSVG, svgRight: PineappleRightSVG,
    pngWhole: FruitPNGDataURIs.PineappleSVG, pngLeft: FruitPNGDataURIs.PineappleLeftSVG, pngRight: FruitPNGDataURIs.PineappleRightSVG,
    shadowOffset: 15, rotationSpeed: 1.0, effect: 'golden'
  },
  freeze_fruit: {
    id: 'freeze_fruit', name: 'Freeze Fruit', baseSize: 50, weight: 1.0, points: 30,
    juiceColor: 0x00FFFF, fleshColor: 0x00FFFF,
    svgWhole: WatermelonSVG, svgLeft: WatermelonLeftSVG, svgRight: WatermelonRightSVG,
    pngWhole: FruitPNGDataURIs.WatermelonSVG, pngLeft: FruitPNGDataURIs.WatermelonLeftSVG, pngRight: FruitPNGDataURIs.WatermelonRightSVG,
    shadowOffset: 12, rotationSpeed: 1.0, effect: 'freeze'
  },
  lightning_fruit: {
    id: 'lightning_fruit', name: 'Lightning Fruit', baseSize: 50, weight: 1.0, points: 30,
    juiceColor: 0xEE82EE, fleshColor: 0xEE82EE,
    svgWhole: AppleSVG, svgLeft: AppleLeftSVG, svgRight: AppleRightSVG,
    pngWhole: FruitPNGDataURIs.AppleSVG, pngLeft: FruitPNGDataURIs.AppleLeftSVG, pngRight: FruitPNGDataURIs.AppleRightSVG,
    shadowOffset: 10, rotationSpeed: 1.5, effect: 'frenzy'
  },
  crystal_fruit: {
    id: 'crystal_fruit', name: 'Crystal Fruit', baseSize: 40, weight: 0.8, points: 200,
    juiceColor: 0xFFFFFF, fleshColor: 0xFFFFFF,
    svgWhole: AppleSVG, svgLeft: AppleLeftSVG, svgRight: AppleRightSVG,
    pngWhole: FruitPNGDataURIs.AppleSVG, pngLeft: FruitPNGDataURIs.AppleLeftSVG, pngRight: FruitPNGDataURIs.AppleRightSVG,
    shadowOffset: 8, rotationSpeed: 2.0, effect: 'crystal'
  }
};

export const getRandomFruitId = (includeBomb = false, bombChance = 0.1): string => {
  if (includeBomb && Math.random() < bombChance) return 'bomb';
  
  const fruits = ['apple', 'orange', 'watermelon', 'pineapple'];
  return fruits[Math.floor(Math.random() * fruits.length)];
};

export const svgToDataUri = (svgString: string): string => {
  try {
    const base64 = window.btoa(unescape(encodeURIComponent(svgString)));
    return `data:image/svg+xml;base64,${base64}`;
  } catch (_e) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
  }
};
import { FruitCanvasRenderer } from './FruitCanvasRenderer';

/**
 * Pre-decode a single data URI as an HTMLImageElement.
 * Uses native browser Image loading with graceful error handling.
 */
const decodeDataUri = (uri: string): Promise<HTMLImageElement | null> => {
  return new Promise<HTMLImageElement | null>((resolve) => {
    try {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = uri;
    } catch {
      resolve(null);
    }
  });
};

/**
 * Preload ALL fruit textures by:
 *  1. Synchronously generating high-res 128x128 2D Canvas textures for EVERY fruit and half.
 *     This guarantees 100% texture availability immediately on all platforms (Browser & APK).
 *  2. Asynchronously upgrading canvases with high-res PNG renders once decoded.
 */
export const loadAllFruitsAsync = async (scene: Phaser.Scene): Promise<void> => {
  // Step 1: SYNCHRONOUSLY guarantee every texture key exists in TextureManager
  for (const [key] of Object.entries(FruitRegistry)) {
    const variants: Array<'whole' | 'left' | 'right'> = ['whole', 'left', 'right'];

    for (const variant of variants) {
      const textureKey = `fruit_${key}_${variant}`;
      if (!scene.textures.exists(textureKey)) {
        const canvas = FruitCanvasRenderer.createFruitCanvas(key, variant);
        scene.textures.addCanvas(textureKey, canvas);
      }
    }
  }

  // Step 2: Background enhancement from PNG Data URIs (non-blocking)
  for (const [key, data] of Object.entries(FruitRegistry)) {
    // Preserve high-visibility procedural canvas for all bombs
    if (data.isBomb) continue;

    const pairs: Array<[string, string | undefined]> = [
      [`fruit_${key}_whole`, data.pngWhole],
      [`fruit_${key}_left`,  data.pngLeft],
      [`fruit_${key}_right`, data.pngRight],
    ];

    for (const [textureKey, uri] of pairs) {
      if (!uri) continue;

      decodeDataUri(uri).then((img) => {
        if (!img) return;
        try {
          const tex = scene.textures.get(textureKey);
          if (tex && (tex as any).canvas && (tex as any).context) {
            const ctx = (tex as any).context as CanvasRenderingContext2D;
            ctx.clearRect(0, 0, 128, 128);
            ctx.drawImage(img, 0, 0, 128, 128);
            if (typeof (tex as any).refresh === 'function') {
              (tex as any).refresh();
            }
          }
        } catch {
          // Keep the procedural canvas fallback on any error
        }
      });
    }
  }

  return Promise.resolve();
};

// Keep these exports for backwards compatibility (called from MainScene)
export const preloadFruitAssets = (_scene: Phaser.Scene): void => { /* no-op */ };
export const ensureFruitTexturesLoaded = (_scene: Phaser.Scene): string[] => [];
export const waitForFruitTextures = (_scene: Phaser.Scene, _queued: string[]): Promise<void> => Promise.resolve();
