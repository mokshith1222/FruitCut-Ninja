import Phaser from 'phaser';
import { EquipmentManager } from '../shop/EquipmentManager';

export class VFXSystem {
  static scene: Phaser.Scene | null = null;

  static init(scene: Phaser.Scene) {
    this.scene = scene;
  }

  static spawnSlashTrail(_x1: number, _y1: number, _x2: number, _y2: number) {
    // Handled intrinsically by SlashTrail.ts for high-fidelity pathing
  }

  static spawnFruitSplash(x: number, y: number, colorHex: string) {
    if (!this.scene) return;
    
    // Parse hex
    const colorNum = Phaser.Display.Color.HexStringToColor(colorHex).color;
    
    // Get currently equipped effect
    const effectItem = EquipmentManager.getEquippedItem('effect');
    const effectId = effectItem ? effectItem.id : 'effect_juice';

    if (effectId === 'effect_fire') {
      // Fire Burst Effect
      const emitter = this.scene.add.particles(x, y, 'particle_drop', {
        speed: { min: 100, max: 350 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.6, end: 0 },
        alpha: { start: 1, end: 0 },
        tint: 0xFF4500, // Orange red
        lifespan: 600,
        gravityY: 0,
        quantity: 20,
        blendMode: 'ADD'
      });
      emitter.setDepth(80);
      this.scene.time.delayedCall(600, () => emitter.destroy());
      return;
    }

    if (effectId === 'effect_stars') {
      // Star Burst Effect
      const emitter = this.scene.add.particles(x, y, 'particle_drop', { // Use same texture, tint yellow/gold
        speed: { min: 150, max: 250 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.5, end: 0 },
        alpha: { start: 1, end: 0 },
        tint: 0xFFD700,
        lifespan: 800,
        gravityY: 200,
        quantity: 15,
        blendMode: 'ADD'
      });
      emitter.setDepth(80);
      this.scene.time.delayedCall(800, () => emitter.destroy());
      return;
    }

    // Default Classic Juice
    // 1. Juicy wall splatter decal behind fruits
    const splatter = this.scene.add.graphics();
    splatter.setDepth(2); // In front of background, behind flying fruits (depth 5+)
    splatter.fillStyle(colorNum, 0.35);

    // Central splash blob
    const radius = Phaser.Math.Between(18, 30);
    splatter.fillCircle(x, y, radius);

    // Radiating drip droplets
    const dripCount = Phaser.Math.Between(4, 7);
    for (let i = 0; i < dripCount; i++) {
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const dist = Phaser.Math.Between(radius * 0.8, radius * 2.2);
      const dripR = Phaser.Math.Between(3, 8);
      splatter.fillCircle(x + Math.cos(angle) * dist, y + Math.sin(angle) * dist, dripR);
    }

    // Fade out and destroy splatter over 3.5 seconds
    this.scene.tweens.add({
      targets: splatter,
      alpha: 0,
      duration: 3500,
      ease: 'Power2',
      onComplete: () => splatter.destroy()
    });

    // 2. Flying juice particle burst
    const emitter = this.scene.add.particles(x, y, 'particle_drop', {
      speed: { min: 80, max: 260 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.35, end: 0 },
      alpha: { start: 0.9, end: 0 },
      tint: colorNum,
      lifespan: 450,
      gravityY: 500,
      quantity: 14,
      blendMode: 'ADD'
    });
    emitter.setDepth(80);
    
    // Destroy the emitter after burst finishes
    this.scene.time.delayedCall(500, () => {
      emitter.destroy();
    });
  }

  static showScorePopup(x: number, y: number, points: number, multiplier: number = 1) {
    if (!this.scene) return;
    const textStr = multiplier > 1 ? `+${points} (${multiplier}x)` : `+${points}`;
    const color = multiplier >= 3 ? '#FFD700' : (multiplier > 1 ? '#40C4FF' : '#FFFFFF');
    
    const popup = this.scene.add.text(x, y - 20, textStr, {
      fontFamily: 'Nunito, system-ui, sans-serif',
      fontSize: multiplier > 1 ? '22px' : '18px',
      fontStyle: 'bold',
      color: color,
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5).setDepth(150);

    this.scene.tweens.add({
      targets: popup,
      y: y - 70,
      alpha: 0,
      scale: 1.25,
      duration: 700,
      ease: 'Cubic.easeOut',
      onComplete: () => popup.destroy()
    });
  }

  static showComboText(x: number, y: number, combo: number) {
    if (!this.scene) return;

    let fontSize = '32px';
    let color = '#FFF';
    
    if (combo >= 15) { fontSize = '64px'; color = '#FFD700'; }
    else if (combo >= 10) { fontSize = '48px'; color = '#FF4500'; }
    else if (combo >= 5) { fontSize = '40px'; color = '#00BFFF'; }

    const text = this.scene.add.text(x, y, `${combo}x!`, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize,
      fontStyle: 'bold',
      color,
      stroke: '#000',
      strokeThickness: 6
    }).setOrigin(0.5).setDepth(200);

    this.scene.tweens.add({
      targets: text,
      y: y - 100,
      alpha: 0,
      scale: 1.5,
      duration: 1000,
      ease: 'Power2',
      onComplete: () => text.destroy()
    });
  }

  static triggerComboFeedback(combo: number) {
    if (!this.scene) return;
    
    let intensity = 0;
    let color = 0xffffff;
    
    if (combo >= 20) { intensity = 0.6; color = 0xff00ff; }
    else if (combo >= 15) { intensity = 0.4; color = 0xffd700; }
    else if (combo >= 10) { intensity = 0.3; color = 0xff4500; }
    else if (combo >= 5) { intensity = 0.2; color = 0x00bfff; }
    
    if (intensity > 0) {
      // Screen Flash
      const flash = this.scene.add.rectangle(0, 0, this.scene.scale.width, this.scene.scale.height, color, intensity);
      flash.setOrigin(0, 0);
      flash.setDepth(100);
      
      this.scene.tweens.add({
        targets: flash,
        alpha: 0,
        duration: 300,
        ease: 'Power2',
        onComplete: () => flash.destroy()
      });
      
      // Camera Shake
      if (combo >= 10) {
        this.scene.cameras.main.shake(200, 0.005 + (combo * 0.0005));
      }
    }
  }
}
