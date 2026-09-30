/**
 * FruitCanvasRenderer
 * 
 * Synchronously generates high-resolution, vibrant 128x128 2D HTMLCanvasElement
 * textures for all fruits, cut halves, and bombs in Phaser.
 * 
 * This ensures 100% reliability on Android APK / Capacitor WebView where
 * asynchronous Image decoding or WebGL data-URI uploads might otherwise fail or hang.
 */

export class FruitCanvasRenderer {
  public static createFruitCanvas(
    fruitId: string,
    variant: 'whole' | 'left' | 'right'
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    ctx.clearRect(0, 0, 128, 128);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    switch (fruitId) {
      case 'apple':
      case 'lightning_fruit':
      case 'crystal_fruit':
        this.renderApple(ctx, variant, fruitId);
        break;
      case 'orange':
        this.renderOrange(ctx, variant);
        break;
      case 'watermelon':
      case 'freeze_fruit':
        this.renderWatermelon(ctx, variant, fruitId);
        break;
      case 'pineapple':
      case 'golden_fruit':
        this.renderPineapple(ctx, variant, fruitId);
        break;
      case 'bomb':
      case 'fast_bomb':
      case 'fake_fruit':
      default:
        this.renderBomb(ctx, variant, fruitId);
        break;
    }

    return canvas;
  }

  // --------------------------------------------------------------------------
  // APPLE
  // --------------------------------------------------------------------------
  private static renderApple(
    ctx: CanvasRenderingContext2D,
    variant: 'whole' | 'left' | 'right',
    fruitId: string
  ) {
    const isLightning = fruitId === 'lightning_fruit';
    const isCrystal = fruitId === 'crystal_fruit';

    if (variant === 'whole') {
      // Stem
      ctx.beginPath();
      ctx.moveTo(64, 38);
      ctx.quadraticCurveTo(62, 20, 72, 14);
      ctx.lineWidth = 4;
      ctx.strokeStyle = isCrystal ? '#B0BEC5' : '#5D4037';
      ctx.lineCap = 'round';
      ctx.stroke();

      // Leaf
      ctx.beginPath();
      ctx.moveTo(66, 26);
      ctx.quadraticCurveTo(86, 16, 82, 32);
      ctx.quadraticCurveTo(68, 32, 66, 26);
      ctx.fillStyle = isCrystal ? '#80DEEA' : isLightning ? '#E040FB' : '#4CAF50';
      ctx.fill();
      ctx.strokeStyle = isCrystal ? '#4DD0E1' : isLightning ? '#AA00FF' : '#2E7D32';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Apple Body
      ctx.beginPath();
      ctx.moveTo(64, 38);
      ctx.bezierCurveTo(44, 28, 20, 44, 20, 70);
      ctx.bezierCurveTo(20, 94, 40, 112, 60, 114);
      ctx.bezierCurveTo(63, 114, 65, 114, 68, 114);
      ctx.bezierCurveTo(88, 112, 108, 94, 108, 70);
      ctx.bezierCurveTo(108, 44, 84, 28, 64, 38);
      ctx.closePath();

      // Shading
      const grad = ctx.createRadialGradient(48, 54, 8, 64, 72, 52);
      if (isCrystal) {
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.5, '#E0F7FA');
        grad.addColorStop(1, '#80DEEA');
      } else if (isLightning) {
        grad.addColorStop(0, '#FF80AB');
        grad.addColorStop(0.5, '#E040FB');
        grad.addColorStop(1, '#6A1B9A');
      } else {
        grad.addColorStop(0, '#FF5252');
        grad.addColorStop(0.4, '#E53935');
        grad.addColorStop(0.85, '#B71C1C');
        grad.addColorStop(1, '#5F0914');
      }
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = isCrystal ? '#00ACC1' : isLightning ? '#4A148C' : '#3E0007';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Specular highlight
      ctx.beginPath();
      ctx.ellipse(44, 52, 12, 6, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fill();
    } else {
      // Cut Half
      const isLeft = variant === 'left';
      ctx.save();
      if (!isLeft) {
        ctx.translate(128, 0);
        ctx.scale(-1, 1);
      }

      // Stem remnant
      ctx.beginPath();
      ctx.moveTo(64, 38);
      ctx.quadraticCurveTo(63, 26, 68, 18);
      ctx.lineWidth = 3;
      ctx.strokeStyle = isCrystal ? '#B0BEC5' : '#5D4037';
      ctx.lineCap = 'round';
      ctx.stroke();

      // Half shape
      ctx.beginPath();
      ctx.moveTo(64, 38);
      ctx.bezierCurveTo(44, 28, 20, 44, 20, 70);
      ctx.bezierCurveTo(20, 94, 40, 112, 60, 114);
      ctx.lineTo(64, 114);
      ctx.closePath();

      // Outer skin
      ctx.fillStyle = isCrystal ? '#80DEEA' : isLightning ? '#AA00FF' : '#B71C1C';
      ctx.fill();

      // Flesh
      ctx.beginPath();
      ctx.moveTo(63, 40);
      ctx.bezierCurveTo(47, 32, 26, 46, 26, 70);
      ctx.bezierCurveTo(26, 90, 43, 108, 60, 110);
      ctx.lineTo(63, 110);
      ctx.closePath();
      const fleshGrad = ctx.createRadialGradient(60, 72, 5, 50, 72, 40);
      if (isCrystal) {
        fleshGrad.addColorStop(0, '#FFFFFF');
        fleshGrad.addColorStop(1, '#E0F7FA');
      } else if (isLightning) {
        fleshGrad.addColorStop(0, '#F8BBD0');
        fleshGrad.addColorStop(1, '#EA80FC');
      } else {
        fleshGrad.addColorStop(0, '#FFFFE0');
        fleshGrad.addColorStop(0.7, '#FFF9C4');
        fleshGrad.addColorStop(1, '#FFF59D');
      }
      ctx.fillStyle = fleshGrad;
      ctx.fill();

      // Core curve
      ctx.beginPath();
      ctx.arc(64, 72, 12, Math.PI * 0.5, Math.PI * 1.5);
      ctx.fillStyle = isCrystal ? '#B2EBF2' : isLightning ? '#CE93D8' : '#D7CCC8';
      ctx.fill();

      // Seed
      ctx.beginPath();
      ctx.ellipse(56, 72, 5, 3, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fillStyle = isCrystal ? '#006064' : '#3E2723';
      ctx.fill();

      ctx.restore();
    }
  }

  // --------------------------------------------------------------------------
  // ORANGE
  // --------------------------------------------------------------------------
  private static renderOrange(
    ctx: CanvasRenderingContext2D,
    variant: 'whole' | 'left' | 'right'
  ) {
    if (variant === 'whole') {
      // Leaf
      ctx.beginPath();
      ctx.moveTo(64, 26);
      ctx.quadraticCurveTo(80, 14, 82, 28);
      ctx.quadraticCurveTo(70, 30, 64, 26);
      ctx.fillStyle = '#4CAF50';
      ctx.fill();

      // Calyx
      ctx.beginPath();
      ctx.arc(64, 28, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#2E7D32';
      ctx.fill();

      // Orange Sphere
      ctx.beginPath();
      ctx.arc(64, 68, 44, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(48, 52, 6, 64, 68, 46);
      grad.addColorStop(0, '#FFE082');
      grad.addColorStop(0.3, '#FFB300');
      grad.addColorStop(0.7, '#FB8C00');
      grad.addColorStop(1, '#D84315');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = '#BF360C';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Gloss
      ctx.beginPath();
      ctx.ellipse(46, 50, 10, 5, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
    } else {
      const isLeft = variant === 'left';
      ctx.save();
      if (!isLeft) {
        ctx.translate(128, 0);
        ctx.scale(-1, 1);
      }

      // Outer Rind
      ctx.beginPath();
      ctx.arc(64, 68, 44, Math.PI * 0.5, Math.PI * 1.5);
      ctx.lineTo(64, 112);
      ctx.fillStyle = '#E65100';
      ctx.fill();

      // White Pith
      ctx.beginPath();
      ctx.arc(64, 68, 40, Math.PI * 0.5, Math.PI * 1.5);
      ctx.lineTo(64, 108);
      ctx.fillStyle = '#FFF8E1';
      ctx.fill();

      // Pulp Segments
      const segments = 4;
      const angleStep = Math.PI / segments;
      for (let i = 0; i < segments; i++) {
        const start = Math.PI * 0.5 + i * angleStep + 0.08;
        const end = Math.PI * 0.5 + (i + 1) * angleStep - 0.08;
        ctx.beginPath();
        ctx.moveTo(62, 68);
        ctx.arc(64, 68, 37, start, end);
        ctx.closePath();
        const pulpGrad = ctx.createRadialGradient(64, 68, 4, 52, 68, 36);
        pulpGrad.addColorStop(0, '#FFE082');
        pulpGrad.addColorStop(0.6, '#FFA726');
        pulpGrad.addColorStop(1, '#FF7043');
        ctx.fillStyle = pulpGrad;
        ctx.fill();
      }

      // Center Core Axis
      ctx.beginPath();
      ctx.arc(64, 68, 5, Math.PI * 0.5, Math.PI * 1.5);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();
    }
  }

  // --------------------------------------------------------------------------
  // WATERMELON
  // --------------------------------------------------------------------------
  private static renderWatermelon(
    ctx: CanvasRenderingContext2D,
    variant: 'whole' | 'left' | 'right',
    fruitId: string
  ) {
    const isFreeze = fruitId === 'freeze_fruit';

    if (variant === 'whole') {
      // Body Oval
      ctx.beginPath();
      ctx.ellipse(64, 64, 48, 42, 0, 0, Math.PI * 2);
      const bgGrad = ctx.createRadialGradient(50, 50, 8, 64, 64, 50);
      if (isFreeze) {
        bgGrad.addColorStop(0, '#E0F7FA');
        bgGrad.addColorStop(0.4, '#4DD0E1');
        bgGrad.addColorStop(1, '#006064');
      } else {
        bgGrad.addColorStop(0, '#81C784');
        bgGrad.addColorStop(0.5, '#388E3C');
        bgGrad.addColorStop(1, '#1B5E20');
      }
      ctx.fillStyle = bgGrad;
      ctx.fill();

      // Dark Stripes
      ctx.save();
      ctx.clip();
      const stripeColor = isFreeze ? '#00838F' : '#0B3C18';
      const stripeOffsets = [-32, -16, 0, 16, 32];
      for (const off of stripeOffsets) {
        ctx.beginPath();
        ctx.moveTo(64 + off, 18);
        ctx.bezierCurveTo(64 + off - 6, 42, 64 + off + 6, 86, 64 + off, 110);
        ctx.lineWidth = 7;
        ctx.strokeStyle = stripeColor;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      ctx.restore();

      ctx.strokeStyle = isFreeze ? '#004D40' : '#0A2E12';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Highlight
      ctx.beginPath();
      ctx.ellipse(46, 46, 12, 6, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
    } else {
      const isLeft = variant === 'left';
      ctx.save();
      if (!isLeft) {
        ctx.translate(128, 0);
        ctx.scale(-1, 1);
      }

      // Outer Rind
      ctx.beginPath();
      ctx.ellipse(64, 64, 48, 42, 0, Math.PI * 0.5, Math.PI * 1.5);
      ctx.lineTo(64, 106);
      ctx.fillStyle = isFreeze ? '#006064' : '#1B5E20';
      ctx.fill();

      // White/Pale Inner Rind
      ctx.beginPath();
      ctx.ellipse(64, 64, 43, 38, 0, Math.PI * 0.5, Math.PI * 1.5);
      ctx.lineTo(64, 102);
      ctx.fillStyle = isFreeze ? '#E0F7FA' : '#E8F5E9';
      ctx.fill();

      // Juicy Red Flesh
      ctx.beginPath();
      ctx.ellipse(64, 64, 38, 33, 0, Math.PI * 0.5, Math.PI * 1.5);
      ctx.lineTo(64, 97);
      const redGrad = ctx.createRadialGradient(64, 64, 4, 52, 64, 34);
      if (isFreeze) {
        redGrad.addColorStop(0, '#FFFFFF');
        redGrad.addColorStop(0.5, '#80DEEA');
        redGrad.addColorStop(1, '#00ACC1');
      } else {
        redGrad.addColorStop(0, '#FF5252');
        redGrad.addColorStop(0.6, '#FF1744');
        redGrad.addColorStop(1, '#D50000');
      }
      ctx.fillStyle = redGrad;
      ctx.fill();

      // Seeds
      const seedPositions = [
        [44, 52], [52, 62], [42, 74], [52, 82]
      ];
      ctx.fillStyle = isFreeze ? '#004D40' : '#212121';
      for (const [sx, sy] of seedPositions) {
        ctx.beginPath();
        ctx.ellipse(sx, sy, 3, 2, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // --------------------------------------------------------------------------
  // PINEAPPLE
  // --------------------------------------------------------------------------
  private static renderPineapple(
    ctx: CanvasRenderingContext2D,
    variant: 'whole' | 'left' | 'right',
    fruitId: string
  ) {
    const isGolden = fruitId === 'golden_fruit';

    if (variant === 'whole') {
      // Crown Spikes
      const crownLeaves = [
        [64, 10, 52, 38, 76, 38],
        [44, 16, 40, 42, 64, 38],
        [84, 16, 64, 38, 88, 42],
        [32, 28, 36, 48, 56, 42],
        [96, 28, 72, 42, 92, 48]
      ];
      ctx.fillStyle = isGolden ? '#FFD54F' : '#388E3C';
      ctx.strokeStyle = isGolden ? '#FFA000' : '#1B5E20';
      ctx.lineWidth = 1.5;
      for (const [x1, y1, x2, y2, x3, y3] of crownLeaves) {
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // Pineapple Body
      ctx.beginPath();
      ctx.ellipse(64, 76, 36, 42, 0, 0, Math.PI * 2);
      const pineGrad = ctx.createRadialGradient(50, 62, 8, 64, 76, 44);
      if (isGolden) {
        pineGrad.addColorStop(0, '#FFF9C4');
        pineGrad.addColorStop(0.4, '#FFD700');
        pineGrad.addColorStop(1, '#FF8F00');
      } else {
        pineGrad.addColorStop(0, '#FFE082');
        pineGrad.addColorStop(0.4, '#FFB300');
        pineGrad.addColorStop(0.8, '#F57C00');
        pineGrad.addColorStop(1, '#BF360C');
      }
      ctx.fillStyle = pineGrad;
      ctx.fill();
      ctx.strokeStyle = isGolden ? '#E65100' : '#5D4037';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Diamond Scales
      ctx.save();
      ctx.clip();
      ctx.strokeStyle = isGolden ? 'rgba(255,255,255,0.6)' : 'rgba(93, 64, 55, 0.5)';
      ctx.lineWidth = 2;
      for (let i = -40; i <= 40; i += 16) {
        ctx.beginPath();
        ctx.moveTo(64 + i - 40, 36);
        ctx.lineTo(64 + i + 40, 118);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(64 + i + 40, 36);
        ctx.lineTo(64 + i - 40, 118);
        ctx.stroke();
      }
      ctx.restore();

      // Specular highlight
      ctx.beginPath();
      ctx.ellipse(46, 62, 8, 4, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
    } else {
      const isLeft = variant === 'left';
      ctx.save();
      if (!isLeft) {
        ctx.translate(128, 0);
        ctx.scale(-1, 1);
      }

      // Crown Half
      ctx.fillStyle = isGolden ? '#FFD54F' : '#388E3C';
      ctx.beginPath();
      ctx.moveTo(64, 40);
      ctx.lineTo(64, 12);
      ctx.lineTo(48, 20);
      ctx.lineTo(64, 40);
      ctx.fill();

      // Outer Rind
      ctx.beginPath();
      ctx.ellipse(64, 76, 36, 42, 0, Math.PI * 0.5, Math.PI * 1.5);
      ctx.lineTo(64, 118);
      ctx.fillStyle = isGolden ? '#FFA000' : '#BF360C';
      ctx.fill();

      // Yellow Flesh
      ctx.beginPath();
      ctx.ellipse(64, 76, 32, 38, 0, Math.PI * 0.5, Math.PI * 1.5);
      ctx.lineTo(64, 114);
      const fleshGrad = ctx.createRadialGradient(64, 76, 6, 52, 76, 34);
      if (isGolden) {
        fleshGrad.addColorStop(0, '#FFFFFF');
        fleshGrad.addColorStop(0.5, '#FFF176');
        fleshGrad.addColorStop(1, '#FFD54F');
      } else {
        fleshGrad.addColorStop(0, '#FFF9C4');
        fleshGrad.addColorStop(0.5, '#FFD54F');
        fleshGrad.addColorStop(1, '#FFB300');
      }
      ctx.fillStyle = fleshGrad;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.ellipse(64, 76, 8, 28, 0, Math.PI * 0.5, Math.PI * 1.5);
      ctx.fillStyle = isGolden ? '#FFE082' : '#FFE082';
      ctx.fill();

      ctx.restore();
    }
  }

  // --------------------------------------------------------------------------
  // BOMB
  // --------------------------------------------------------------------------
  private static renderBomb(
    ctx: CanvasRenderingContext2D,
    variant: 'whole' | 'left' | 'right',
    fruitId: string
  ) {
    const isFast = fruitId === 'fast_bomb';
    const isFake = fruitId === 'fake_fruit';

    if (variant === 'whole') {
      // Fuse Collar
      ctx.fillStyle = '#FFA000';
      ctx.fillRect(58, 36, 12, 6);
      ctx.strokeStyle = '#FF6F00';
      ctx.lineWidth = 1;
      ctx.strokeRect(58, 36, 12, 6);

      // Fuse Cord
      ctx.beginPath();
      ctx.moveTo(64, 36);
      ctx.quadraticCurveTo(68, 22, 82, 18);
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#8D6E63';
      ctx.lineCap = 'round';
      ctx.stroke();

      // Spark Burst & Rays
      const sparkX = 82;
      const sparkY = 18;
      ctx.strokeStyle = '#FFE082';
      ctx.lineWidth = 2;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        ctx.beginPath();
        ctx.moveTo(sparkX + Math.cos(a) * 3, sparkY + Math.sin(a) * 3);
        ctx.lineTo(sparkX + Math.cos(a) * 10, sparkY + Math.sin(a) * 10);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#FF3D00';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Outer Warning Hazard Aura (Visible against pitch black backgrounds)
      ctx.beginPath();
      ctx.arc(64, 74, 46, 0, Math.PI * 2);
      const auraGrad = ctx.createRadialGradient(64, 74, 32, 64, 74, 46);
      auraGrad.addColorStop(0, isFast ? 'rgba(255, 214, 0, 0.65)' : 'rgba(255, 23, 68, 0.7)');
      auraGrad.addColorStop(0.6, isFast ? 'rgba(255, 87, 34, 0.4)' : 'rgba(255, 23, 68, 0.3)');
      auraGrad.addColorStop(1, 'rgba(255, 23, 68, 0)');
      ctx.fillStyle = auraGrad;
      ctx.fill();

      // Bomb Body Sphere
      ctx.beginPath();
      ctx.arc(64, 74, 38, 0, Math.PI * 2);
      const bombGrad = ctx.createRadialGradient(50, 58, 4, 64, 74, 38);
      if (isFake) {
        bombGrad.addColorStop(0, '#ECEFF1');
        bombGrad.addColorStop(0.35, '#90A4AE');
        bombGrad.addColorStop(0.75, '#546E7A');
        bombGrad.addColorStop(1, '#263238');
      } else if (isFast) {
        bombGrad.addColorStop(0, '#FFF59D');
        bombGrad.addColorStop(0.3, '#FF7043');
        bombGrad.addColorStop(0.7, '#D84315');
        bombGrad.addColorStop(1, '#BF360C');
      } else {
        bombGrad.addColorStop(0, '#CFD8DC');
        bombGrad.addColorStop(0.25, '#78909C');
        bombGrad.addColorStop(0.65, '#37474F');
        bombGrad.addColorStop(1, '#1A2327');
      }
      ctx.fillStyle = bombGrad;
      ctx.fill();

      // High-contrast outer danger ring
      ctx.strokeStyle = isFast ? '#FFD600' : '#FF1744';
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Metallic Specular Arc
      ctx.beginPath();
      ctx.ellipse(48, 56, 11, 5, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.fill();

      // Danger Center Badge
      ctx.beginPath();
      ctx.arc(64, 75, 14, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.fill();
      ctx.strokeStyle = isFast ? '#FFD600' : '#FF1744';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Danger Skull
      ctx.fillStyle = isFast ? '#FFD600' : '#FF5252';
      ctx.font = '900 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('☠', 64, 75);
    } else {
      const isLeft = variant === 'left';
      ctx.save();
      if (!isLeft) {
        ctx.translate(128, 0);
        ctx.scale(-1, 1);
      }

      // Collar remnant
      ctx.fillStyle = '#FFA000';
      ctx.fillRect(58, 36, 6, 6);

      // Outer Shell
      ctx.beginPath();
      ctx.arc(64, 74, 38, Math.PI * 0.5, Math.PI * 1.5);
      ctx.lineTo(64, 112);
      ctx.fillStyle = '#455A64';
      ctx.fill();

      // Gunpowder Interior
      ctx.beginPath();
      ctx.arc(64, 74, 34, Math.PI * 0.5, Math.PI * 1.5);
      ctx.lineTo(64, 108);
      ctx.fillStyle = '#607D8B';
      ctx.fill();

      // Inner Core Glow
      ctx.beginPath();
      ctx.arc(64, 74, 14, Math.PI * 0.5, Math.PI * 1.5);
      ctx.fillStyle = '#FF3D00';
      ctx.fill();

      ctx.restore();
    }
  }
}
