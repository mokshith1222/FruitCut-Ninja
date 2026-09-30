import Phaser from 'phaser';
import { FruitRegistry } from './FruitRegistry';

export class FruitHalf extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture?: string) {
    super(scene, x, y, texture || '');
  }

  spawn(
    x: number, 
    y: number, 
    fruitId: string, 
    side: 'left' | 'right', 
    _svgData: string, 
    baseRotation: number,
    baseVelocityX: number, 
    baseVelocityY: number, 
    baseSize: number
  ) {
    const textureKey = `fruit_${fruitId}_${side}`;
    const fruitDef = FruitRegistry[fruitId];
    
    // Texture is guaranteed to be loaded by loadAllFruitsAsync() in MainScene.create().
    // If somehow missing (should never happen), fall back to a visible placeholder.
    if (this.scene.textures.exists(textureKey)) {
      this.setTexture(textureKey);
    } else {
      this.setTexture('__WHITE'); // visible fallback so half is never invisible
    }

    // Special visual effects & tints
    if (fruitDef?.effect === 'golden') {
      this.setTint(0xFFD700);
    } else if (fruitDef?.effect === 'freeze') {
      this.setTint(0x00FFFF);
    } else if (fruitDef?.effect === 'frenzy') {
      this.setTint(0xEE82EE);
    } else if (fruitDef?.effect === 'crystal') {
      this.setTint(0xE0F7FA);
    } else if (fruitDef?.effect === 'fake') {
      this.setTint(0x777777);
    } else {
      this.clearTint();
    }
    
    this.setPosition(x, y);
    this.setOrigin(0.5, 0.5);
    // Orient the half to match the slash angle before physics take over
    this.setRotation(baseRotation);
    this.setDepth(10); // Ensure fruit halves render above background & splatters
    this.setAlpha(1.0);
    this.setActive(true);
    this.setVisible(true);

    const isMobile = this.scene.scale.width < 600;
    const baseScale = isMobile ? 0.70 : 0.90;
    // We assume the initial scale from the whole fruit should apply, 
    // but FruitHalf doesn't get sizeMultiplier in spawn yet, so we just set baseScale for now,
    // or rely on the scene calling half.setScale() after spawn.
    this.setScale(baseScale);
    
    if (this.body && this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.enable = true;
      this.body.reset(x, y);
      
      this.body.setCircle(baseSize);
      this.body.setOffset(64 - baseSize, 64 - baseSize);
      
      // Calculate separating velocity perpendicular to the cut angle
      const separationSpeed = Phaser.Math.Between(80, 150);
      const angleOffset = side === 'left' ? -Math.PI / 2 : Math.PI / 2;
      const separationVelX = Math.cos(baseRotation + angleOffset) * separationSpeed;
      const separationVelY = Math.sin(baseRotation + angleOffset) * separationSpeed;
      
      this.body.setVelocity(baseVelocityX + separationVelX, baseVelocityY + separationVelY);
      
      // Add tumbling angular velocity
      const angularVel = Phaser.Math.Between(100, 300) * (side === 'left' ? -1 : 1);
      this.body.setAngularVelocity(angularVel);
      this.body.allowGravity = true;
    }
  }

  update() {
    if (this.active && this.y > this.scene.scale.height + 150) {
      this.setActive(false);
      this.setVisible(false);
      if (this.body && this.body instanceof Phaser.Physics.Arcade.Body) {
        this.body.stop();
        this.body.enable = false;
      }
    }
  }
}
