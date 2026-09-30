import Phaser from 'phaser';
import type { FruitDefinition } from './FruitDefinition';
import { FruitRegistry } from './FruitRegistry';
import { EventBus } from '../../core/EventBus';

export class Fruit extends Phaser.Physics.Arcade.Sprite {
  public fruitData!: FruitDefinition;
  private isCut = false;
  private onCutCallback!: (fruit: Fruit, line?: Phaser.Geom.Line) => void;
  private onMissCallback!: (fruit: Fruit) => void;

  constructor(scene: Phaser.Scene, x: number, y: number, texture?: string) {
    super(scene, x, y, texture || '');
  }

  spawn(
    x: number, 
    y: number, 
    velocityX: number, 
    velocityY: number, 
    fruitId: string, 
    sizeMultiplier: number, 
    onCut: (f: Fruit, line?: Phaser.Geom.Line) => void, 
    onMiss: (f: Fruit) => void
  ) {
    this.fruitData = FruitRegistry[fruitId];
    this.onCutCallback = onCut;
    this.onMissCallback = onMiss;
    this.isCut = false;
    
    // Texture is guaranteed to be loaded by loadAllFruitsAsync() in MainScene.create().
    // If somehow missing (should never happen), fall back to a visible placeholder.
    const textureKey = `fruit_${fruitId}_whole`;
    if (this.scene.textures.exists(textureKey)) {
      this.setTexture(textureKey);
    } else {
      this.setTexture('__WHITE'); // visible fallback so fruit is never invisible
    }

    // Special visual effects & tints
    if (this.fruitData.effect === 'golden') {
      this.setTint(0xFFD700);
    } else if (this.fruitData.effect === 'freeze') {
      this.setTint(0x00FFFF);
    } else if (this.fruitData.effect === 'frenzy') {
      this.setTint(0xEE82EE);
    } else if (this.fruitData.effect === 'crystal') {
      this.setTint(0xE0F7FA);
    } else if (this.fruitData.effect === 'fake') {
      this.setTint(0x777777);
    } else {
      this.clearTint();
    }
    
    this.setPosition(x, y);
    this.setOrigin(0.5, 0.5);
    const isMobile = this.scene.scale.width < 600;
    const baseScale = isMobile ? 0.70 : 0.90;
    this.setScale(sizeMultiplier * baseScale);
    this.setRotation(Phaser.Math.Between(0, Math.PI * 2));
    this.setDepth(10); // Ensure fruits render in front of background & splatters
    this.setAlpha(1.0);
    this.setActive(true);
    this.setVisible(true);
    
    if (this.body && this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.enable = true;
      this.body.reset(x, y);
      
      // Use Arcade Physics circle body for accurate slicing detection
      this.body.setCircle(this.fruitData.baseSize);
      // Offset so the circle is in the middle of the 128x128 texture
      this.body.setOffset(64 - this.fruitData.baseSize, 64 - this.fruitData.baseSize);
      
      this.body.setVelocity(velocityX, velocityY);
      
      const angularVel = Phaser.Math.Between(-150, 150) * this.fruitData.rotationSpeed;
      this.body.setAngularVelocity(angularVel);
      this.body.allowGravity = true;
    }
  }

  cut(line?: Phaser.Geom.Line) {
    if (this.isCut || !this.active) return;
    this.isCut = true;
    
    this.onCutCallback(this, line);
    
    if (this.body && this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.stop();
      this.body.enable = false;
      this.body.allowGravity = false;
    }
    
    this.setActive(false);
    this.setVisible(false);
  }

  update() {
    if (this.active && this.body && this.body.velocity.y > 0 && this.y > this.scene.scale.height + 100) {
      this.setActive(false);
      this.setVisible(false);
      if (this.body instanceof Phaser.Physics.Arcade.Body) {
        this.body.stop();
        this.body.enable = false;
      }
      if (!this.isCut) {
        if (this.fruitData.isBomb) {
          EventBus.emit('BOMB_AVOIDED', 'any');
        }
        this.onMissCallback(this);
      }
    }
  }
}
