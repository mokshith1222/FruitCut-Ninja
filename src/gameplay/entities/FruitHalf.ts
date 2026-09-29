import Phaser from 'phaser';

export class FruitHalf extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
  }

  spawn(x: number, y: number, texture: string, velocityX: number, velocityY: number, angularVelocity: number) {
    this.setTexture(texture);
    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);
    
    this.scene.physics.add.existing(this);
    
    if (this.body && this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.enable = true;
      this.body.reset(x, y);
      this.body.setVelocity(velocityX, velocityY);
      this.body.setAngularVelocity(angularVelocity);
      this.body.allowGravity = true;
    }
  }

  update() {
    if (this.active && this.y > this.scene.scale.height + 100) {
      this.setActive(false);
      this.setVisible(false);
      if (this.body && this.body instanceof Phaser.Physics.Arcade.Body) {
        this.body.stop();
        this.body.enable = false;
      }
    }
  }
}
