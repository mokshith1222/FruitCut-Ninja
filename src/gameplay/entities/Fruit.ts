import Phaser from 'phaser';
import type { FruitConfigData } from '../config/FruitConfig';
import { AudioSystem } from '../../audio/AudioSystem';
import { VFXSystem } from '../../vfx/VFXSystem';

export class Fruit extends Phaser.Physics.Arcade.Sprite {
  private isCut = false;
  public fruitData!: FruitConfigData;
  private onCutCallback!: (fruit: Fruit, line?: Phaser.Geom.Line) => void;
  private onMissCallback!: (fruit: Fruit) => void;
  
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
  }

  spawn(x: number, y: number, velocityX: number, velocityY: number, data: FruitConfigData, sizeMultiplier: number, onCut: (f: Fruit, line?: Phaser.Geom.Line) => void, onMiss: (f: Fruit) => void) {
    this.fruitData = data;
    this.onCutCallback = onCut;
    this.onMissCallback = onMiss;
    this.isCut = false;
    
    this.setTexture(data.id);
    this.setPosition(x, y);
    this.setScale(sizeMultiplier);
    this.setActive(true);
    this.setVisible(true);
    
    this.scene.physics.add.existing(this);
    
    if (this.body && this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.enable = true;
      this.body.reset(x, y);
      this.body.setSize(data.baseSize * 2, data.baseSize * 2);
      this.body.setVelocity(velocityX, velocityY);
      this.body.setAngularVelocity(Phaser.Math.Between(-150, 150));
      this.body.allowGravity = true;
    }
  }

  cut(line?: Phaser.Geom.Line) {
    if (this.isCut || !this.active) return;
    this.isCut = true;
    
    this.onCutCallback(this, line);

    AudioSystem.playSound('cut');
    VFXSystem.spawnFruitSplash(this.x, this.y, `#${this.fruitData.color.toString(16)}`);

    // Disable physics and hide
    if (this.body && this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.stop();
      this.body.enable = false;
      this.body.allowGravity = false;
    }
    
    this.setActive(false);
    this.setVisible(false);
  }

  update() {
    // Only trigger miss after the fruit has peaked and is falling DOWN below the screen
    if (this.active && this.body && this.body.velocity.y > 0 && this.y > this.scene.scale.height + 80) {
      this.setActive(false);
      this.setVisible(false);
      if (this.body instanceof Phaser.Physics.Arcade.Body) {
        this.body.stop();
        this.body.enable = false;
      }
      if (!this.isCut) {
        this.onMissCallback(this);
      }
    }
  }
}
