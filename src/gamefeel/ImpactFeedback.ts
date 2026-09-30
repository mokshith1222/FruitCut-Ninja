import Phaser from 'phaser';
import { EquipmentManager } from '../shop/EquipmentManager';

interface FruitImpactProfile {
  primaryColor: number;
  secondaryColors: number[];
  pulpScale: number;
  dripCount: number;
  spreadAngle: number;
  splatterRadius: number;
}

const FRUIT_PROFILES: Record<string, FruitImpactProfile> = {
  watermelon: {
    primaryColor: 0xE53935, // Deep watermelon red
    secondaryColors: [0xC62828, 0x1B1B1B, 0x2E7D32], // Red pulp, black seeds, green rind accent
    pulpScale: 0.5,
    dripCount: 7,
    spreadAngle: 65,
    splatterRadius: 28,
  },
  orange: {
    primaryColor: 0xFF9800, // Vibrant orange
    secondaryColors: [0xFFA726, 0xFFE082, 0xFFB74D], // Citrus pulp & juice droplets
    pulpScale: 0.4,
    dripCount: 6,
    spreadAngle: 75,
    splatterRadius: 24,
  },
  apple: {
    primaryColor: 0xD32F2F, // Apple red
    secondaryColors: [0xFFCDD2, 0xFFEBEE, 0xC62828], // White pulp core flakes & crisp red droplets
    pulpScale: 0.35,
    dripCount: 5,
    spreadAngle: 60,
    splatterRadius: 22,
  },
  pineapple: {
    primaryColor: 0xFDD835, // Golden pineapple yellow
    secondaryColors: [0xFFF176, 0xF57F17, 0x827717], // Chunky tropical pulp & fiber flecks
    pulpScale: 0.6,
    dripCount: 6,
    spreadAngle: 55,
    splatterRadius: 26,
  },
  coconut: {
    primaryColor: 0xEEEEEE, // Coconut milk white
    secondaryColors: [0x5D4037, 0x3E2723, 0x8D6E63], // Heavy brown shell debris & milky splash
    pulpScale: 0.65,
    dripCount: 5,
    spreadAngle: 50,
    splatterRadius: 25,
  },
  strawberry: {
    primaryColor: 0xE91E63, // Ruby strawberry
    secondaryColors: [0xF48FB1, 0xFFEE58, 0xC2185B], // Micro seed flecks & vibrant berry splash
    pulpScale: 0.35,
    dripCount: 6,
    spreadAngle: 70,
    splatterRadius: 20,
  },
  dragonfruit: {
    primaryColor: 0xD81B60, // Magenta dragonfruit
    secondaryColors: [0x212121, 0xFCE4EC, 0xAD1457], // Black seed specks & white/pink pulp
    pulpScale: 0.45,
    dripCount: 6,
    spreadAngle: 65,
    splatterRadius: 24,
  },
  bomb: {
    primaryColor: 0xFF3D00, // Flame burst
    secondaryColors: [0xFFD700, 0xFF6D00, 0x212121], // Sparks & smoke
    pulpScale: 0.7,
    dripCount: 8,
    spreadAngle: 180,
    splatterRadius: 36,
  }
};

const DEFAULT_PROFILE: FruitImpactProfile = {
  primaryColor: 0xFF9800,
  secondaryColors: [0xFFB74D, 0xFFE082],
  pulpScale: 0.4,
  dripCount: 5,
  spreadAngle: 65,
  splatterRadius: 22,
};

export class ImpactFeedback {
  private static scene: Phaser.Scene | null = null;
  private static activeDecals: Phaser.GameObjects.Graphics[] = [];
  private static maxDecals = 8; // Cap decals to maintain 60fps on mobile

  static init(scene: Phaser.Scene) {
    this.scene = scene;
    this.activeDecals.forEach(d => d.destroy());
    this.activeDecals = [];
  }

  static spawnImpact(
    x: number, 
    y: number, 
    fruitId: string, 
    sliceAngle: number = 0, 
    isPerfect: boolean = false
  ) {
    if (!this.scene) return;

    const profile = FRUIT_PROFILES[fruitId] || DEFAULT_PROFILE;
    const equippedEffect = EquipmentManager.getEquippedItem('effect');
    const effectId = equippedEffect?.id || 'effect_juice';

    // 1. Blade Sparkle / Cut Glint at Slice Center
    const glint = this.scene.add.graphics();
    glint.setDepth(95);
    glint.fillStyle(isPerfect ? 0xFFFFFF : 0xFFFACD, 0.9);
    glint.fillCircle(x, y, isPerfect ? 10 : 6);
    this.scene.tweens.add({
      targets: glint,
      scaleX: 2.2,
      scaleY: 0.2,
      rotation: sliceAngle,
      alpha: 0,
      duration: 160,
      ease: 'Quad.easeOut',
      onComplete: () => glint.destroy()
    });

    // 2. Specialized Cosmetic Overrides (e.g. Fire, Stars from Shop)
    if (effectId === 'effect_fire') {
      this.spawnFireBurst(x, y);
      return;
    }
    if (effectId === 'effect_stars') {
      this.spawnStarBurst(x, y);
      return;
    }

    // 3. Wall Decal Splatter (Behind fruit, depth 2)
    this.spawnDecal(x, y, profile.primaryColor, profile.splatterRadius, profile.dripCount);

    // 4. Directional Juice & Pulp Particle Spray
    this.spawnJuiceBurst(x, y, sliceAngle, profile, isPerfect);
  }

  private static spawnDecal(x: number, y: number, color: number, radius: number, dripCount: number) {
    if (!this.scene) return;

    // Prune oldest decal if reaching cap
    if (this.activeDecals.length >= this.maxDecals) {
      const oldest = this.activeDecals.shift();
      if (oldest) oldest.destroy();
    }

    const decal = this.scene.add.graphics();
    decal.setDepth(2);
    decal.fillStyle(color, 0.32);

    // Central splash droplet
    decal.fillCircle(x, y, radius);

    // Small droplets radiating outward
    for (let i = 0; i < dripCount; i++) {
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const dist = Phaser.Math.Between(radius * 0.7, radius * 2.2);
      const dripR = Phaser.Math.Between(3, 7);
      decal.fillCircle(x + Math.cos(angle) * dist, y + Math.sin(angle) * dist, dripR);
    }

    this.activeDecals.push(decal);

    // Fade decal over 2.4 seconds
    this.scene.tweens.add({
      targets: decal,
      alpha: 0,
      duration: 2400,
      ease: 'Power2',
      onComplete: () => {
        decal.destroy();
        const idx = this.activeDecals.indexOf(decal);
        if (idx !== -1) this.activeDecals.splice(idx, 1);
      }
    });
  }

  private static spawnJuiceBurst(
    x: number, 
    y: number, 
    sliceAngle: number, 
    profile: FruitImpactProfile, 
    isPerfect: boolean
  ) {
    if (!this.scene) return;

    // Particles shoot out perpendicular to cut
    const normalAngleDeg = Phaser.Math.RadToDeg(sliceAngle) + 90;
    const count = isPerfect ? 18 : 12;

    const emitter = this.scene.add.particles(x, y, 'particle_drop', {
      speed: { min: 90, max: isPerfect ? 320 : 240 },
      angle: { min: normalAngleDeg - profile.spreadAngle, max: normalAngleDeg + profile.spreadAngle },
      scale: { start: profile.pulpScale * (isPerfect ? 1.25 : 1.0), end: 0.05 },
      alpha: { start: 0.95, end: 0 },
      tint: [profile.primaryColor, ...profile.secondaryColors],
      lifespan: 380,
      gravityY: 650,
      quantity: count,
      blendMode: 'ADD'
    });
    emitter.setDepth(85);

    this.scene.time.delayedCall(400, () => emitter.destroy());
  }

  private static spawnFireBurst(x: number, y: number) {
    if (!this.scene) return;
    const emitter = this.scene.add.particles(x, y, 'particle_drop', {
      speed: { min: 120, max: 320 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.6, end: 0 },
      alpha: { start: 1, end: 0 },
      tint: [0xFF4500, 0xFF8C00, 0xFFD700],
      lifespan: 450,
      gravityY: 0,
      quantity: 16,
      blendMode: 'ADD'
    });
    emitter.setDepth(85);
    this.scene.time.delayedCall(500, () => emitter.destroy());
  }

  private static spawnStarBurst(x: number, y: number) {
    if (!this.scene) return;
    const emitter = this.scene.add.particles(x, y, 'particle_drop', {
      speed: { min: 140, max: 280 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.5, end: 0 },
      alpha: { start: 1, end: 0 },
      tint: [0xFFD700, 0xFFFFFF, 0x00E5FF],
      lifespan: 550,
      gravityY: 250,
      quantity: 14,
      blendMode: 'ADD'
    });
    emitter.setDepth(85);
    this.scene.time.delayedCall(600, () => emitter.destroy());
  }
}
