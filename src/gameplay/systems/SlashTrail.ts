import Phaser from 'phaser';
import { EquipmentManager } from '../../shop/EquipmentManager';

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

export class SlashTrail {
  private scene: Phaser.Scene;
  private graphics: Phaser.GameObjects.Graphics;
  private points: TrailPoint[] = [];
  private maxPoints: number = 14;
  private maxAgeMs: number = 160; // Trail disappears quickly for snappy responsiveness

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.graphics = this.scene.add.graphics();
    this.graphics.setDepth(110); // Draw above fruits and splatters
  }

  addPoint(x: number, y: number) {
    const now = Date.now();
    const last = this.points[this.points.length - 1];

    // If fast movement, interpolate sub-point for buttery smooth curve
    if (last) {
      const dist = Phaser.Math.Distance.Between(last.x, last.y, x, y);
      if (dist > 28) {
        const midX = (last.x + x) * 0.5;
        const midY = (last.y + y) * 0.5;
        this.points.push({ x: midX, y: midY, time: now - 8 });
      }
    }

    this.points.push({ x, y, time: now });

    if (this.points.length > this.maxPoints) {
      this.points.shift();
    }

    this.draw();
  }

  clear() {
    this.points = [];
    this.graphics.clear();
  }

  update() {
    const now = Date.now();
    // Prune points that have exceeded maxAgeMs
    let removed = false;
    while (this.points.length > 0 && now - this.points[0].time > this.maxAgeMs) {
      this.points.shift();
      removed = true;
    }

    if (removed || this.points.length > 0) {
      this.draw();
    }
  }

  private draw() {
    this.graphics.clear();

    const len = this.points.length;
    if (len < 2) return;

    const trailConfig = EquipmentManager.getEquippedConfig('trail', {
      outerColor: 0xFFFFFF,
      innerColor: 0x00FFFF,
      outerWidth: 15
    });

    const outerColor = trailConfig.outerColor ?? 0xFFFFFF;
    const innerColor = trailConfig.innerColor ?? 0x00FFFF;
    const baseOuterWidth = trailConfig.outerWidth ?? 15;
    const baseInnerWidth = Math.max(3, baseOuterWidth * 0.45);

    // 1. Draw outer glowing aura with natural taper
    for (let i = 0; i < len - 1; i++) {
      const p1 = this.points[i];
      const p2 = this.points[i + 1];
      const progress = (i + 1) / len; // 0 (tail) -> 1 (head)
      const alpha = Math.pow(progress, 1.4) * 0.85;
      const width = baseOuterWidth * Math.pow(progress, 1.2);

      this.graphics.lineStyle(width, outerColor, alpha);
      this.graphics.beginPath();
      this.graphics.moveTo(p1.x, p1.y);
      this.graphics.lineTo(p2.x, p2.y);
      this.graphics.strokePath();

      // Smooth joint round cap
      this.graphics.fillStyle(outerColor, alpha);
      this.graphics.fillCircle(p2.x, p2.y, width * 0.5);
    }

    // 2. Draw inner bright core (razor sharp laser blade center)
    for (let i = 0; i < len - 1; i++) {
      const p1 = this.points[i];
      const p2 = this.points[i + 1];
      const progress = (i + 1) / len;
      const alpha = Math.pow(progress, 0.9);
      const width = baseInnerWidth * Math.pow(progress, 0.9);

      this.graphics.lineStyle(width, innerColor, alpha);
      this.graphics.beginPath();
      this.graphics.moveTo(p1.x, p1.y);
      this.graphics.lineTo(p2.x, p2.y);
      this.graphics.strokePath();

      this.graphics.fillStyle(innerColor, alpha);
      this.graphics.fillCircle(p2.x, p2.y, width * 0.5);
    }

    // 3. Leading edge blade glint
    const head = this.points[len - 1];
    this.graphics.fillStyle(0xFFFFFF, 0.95);
    this.graphics.fillCircle(head.x, head.y, baseInnerWidth * 0.9);
  }

  getLineSegments(): Phaser.Geom.Line[] {
    const lines: Phaser.Geom.Line[] = [];
    const len = this.points.length;
    for (let i = 0; i < len - 1; i++) {
      lines.push(new Phaser.Geom.Line(
        this.points[i].x,
        this.points[i].y,
        this.points[i + 1].x,
        this.points[i + 1].y
      ));
    }
    return lines;
  }
}
