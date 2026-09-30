import Phaser from 'phaser';

export class HitStop {
  private static scene: Phaser.Scene | null = null;
  private static isHitStopping = false;
  private static restoreTimer: Phaser.Time.TimerEvent | null = null;

  static init(scene: Phaser.Scene) {
    this.scene = scene;
    this.isHitStopping = false;
    if (this.restoreTimer) {
      this.restoreTimer.remove();
      this.restoreTimer = null;
    }
  }

  static trigger(durationMs: number = 35) {
    if (!this.scene || this.isHitStopping || durationMs <= 0) return;

    // Cap maximum hit-stop to 90ms so game never feels unresponsive
    const clampedMs = Math.min(90, Math.max(15, durationMs));

    this.isHitStopping = true;

    // Slow down physics world drastically without breaking clock or game loop
    const originalTimeScale = this.scene.physics.world.timeScale;
    this.scene.physics.world.timeScale = 8.0; // Higher timeScale in Arcade physics = slower simulation

    if (this.restoreTimer) {
      this.restoreTimer.remove();
    }

    this.restoreTimer = this.scene.time.delayedCall(clampedMs, () => {
      if (this.scene && this.scene.physics && this.scene.physics.world) {
        this.scene.physics.world.timeScale = originalTimeScale > 0 ? originalTimeScale : 1.0;
      }
      this.isHitStopping = false;
      this.restoreTimer = null;
    });
  }

  static cancel() {
    if (this.restoreTimer) {
      this.restoreTimer.remove();
      this.restoreTimer = null;
    }
    if (this.scene && this.scene.physics && this.scene.physics.world) {
      this.scene.physics.world.timeScale = 1.0;
    }
    this.isHitStopping = false;
  }
}
