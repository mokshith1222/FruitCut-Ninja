import Phaser from 'phaser';
import { useProgressionState } from '../../progression/ProgressionState';

export class SlashTrail {
  private scene: Phaser.Scene;
  private graphics: Phaser.GameObjects.Graphics;
  private points: Phaser.Math.Vector2[] = [];
  private maxPoints: number = 10;
  
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.graphics = this.scene.add.graphics();
    this.graphics.setDepth(100); // Draw over fruits
  }

  addPoint(x: number, y: number) {
    this.points.push(new Phaser.Math.Vector2(x, y));
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
    // Slowly fade tail if not moving
    if (this.points.length > 0) {
      this.points.shift();
      this.draw();
    }
  }

  private draw() {
    this.graphics.clear();
    
    if (this.points.length < 2) return;
    
    const currentSkin = useProgressionState.getState().currentSkin;
    let outerColor = 0xFFFFFF;
    let innerColor = 0x00FFFF;
    let outerWidth = 14;
    
    switch (currentSkin) {
      case 'golden_blade':
        outerColor = 0xFFD700;
        innerColor = 0xFFFFFF;
        outerWidth = 16;
        break;
      case 'fire_blade':
        outerColor = 0xFF4500;
        innerColor = 0xFFD700;
        outerWidth = 18;
        break;
      case 'ice_blade':
        outerColor = 0x00BFFF;
        innerColor = 0xE0FFFF;
        break;
      case 'neon_blade':
        outerColor = 0xFF1493;
        innerColor = 0x00FFFF;
        outerWidth = 16;
        break;
      case 'rainbow_blade':
        outerColor = 0x9400D3;
        innerColor = 0x00FF00;
        outerWidth = 18;
        break;
      default: // default_blade
        outerColor = 0xFFFFFF;
        innerColor = 0x00FFFF;
        break;
    }

    const numPoints = this.points.length;
    
    // Draw outer glow segments
    for (let i = 0; i < numPoints - 1; i++) {
      const p1 = this.points[i];
      const p2 = this.points[i + 1];
      const progress = i / (numPoints - 1); // 0 (tail) to 1 (head)
      const alpha = progress * progress * 0.8; 
      const width = outerWidth * Math.pow(progress, 0.5);

      this.graphics.lineStyle(width, outerColor, alpha);
      this.graphics.beginPath();
      this.graphics.moveTo(p1.x, p1.y);
      this.graphics.lineTo(p2.x, p2.y);
      this.graphics.strokePath();
    }

    // Draw inner core segments
    for (let i = 0; i < numPoints - 1; i++) {
      const p1 = this.points[i];
      const p2 = this.points[i + 1];
      const progress = i / (numPoints - 1); 
      const alpha = progress; 
      const width = (outerWidth / 2) * Math.pow(progress, 0.5);

      this.graphics.lineStyle(width, innerColor, alpha);
      this.graphics.beginPath();
      this.graphics.moveTo(p1.x, p1.y);
      this.graphics.lineTo(p2.x, p2.y);
      this.graphics.strokePath();
    }
  }
  
  getLineSegments(): Phaser.Geom.Line[] {
    const lines: Phaser.Geom.Line[] = [];
    for (let i = 0; i < this.points.length - 1; i++) {
      lines.push(new Phaser.Geom.Line(
        this.points[i].x, this.points[i].y,
        this.points[i+1].x, this.points[i+1].y
      ));
    }
    return lines;
  }
}
