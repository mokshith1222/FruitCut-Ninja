import Phaser from 'phaser';
import { useProgressionState } from '../progression/ProgressionState';

export type ShakeLevel = 'none' | 'light' | 'medium' | 'heavy';

export class ScreenShake {
  private static scene: Phaser.Scene | null = null;

  static init(scene: Phaser.Scene) {
    this.scene = scene;
  }

  static shake(intensity: number, durationMs: number) {
    if (!this.scene || !this.scene.cameras || !this.scene.cameras.main) return;

    // Check user settings
    let screenShakeEnabled = true;
    let reducedMotion = false;
    try {
      const state = useProgressionState.getState();
      screenShakeEnabled = state?.settings?.screenShakeEnabled ?? true;
      reducedMotion = state?.settings?.reducedMotion ?? false;
    } catch {
      // Fallback to defaults
    }

    if (!screenShakeEnabled || intensity <= 0) return;

    // If reduced motion is preferred, drastically dampen
    if (reducedMotion) {
      intensity *= 0.3;
      durationMs = Math.min(durationMs, 100);
      if (intensity < 0.003) return;
    }

    // Clamp intensity to prevent extreme disorientation
    const clampedIntensity = Math.min(0.032, Math.max(0.002, intensity));
    const clampedDuration = Math.min(400, Math.max(50, durationMs));

    const camera = this.scene.cameras.main;
    camera.shake(clampedDuration, clampedIntensity);
  }

  static triggerLevel(level: ShakeLevel) {
    switch (level) {
      case 'light':
        this.shake(0.005, 120);
        break;
      case 'medium':
        this.shake(0.012, 190);
        break;
      case 'heavy':
        this.shake(0.024, 280);
        break;
      case 'none':
      default:
        break;
    }
  }

  static stop() {
    if (this.scene && this.scene.cameras && this.scene.cameras.main) {
      this.scene.cameras.main.resetFX();
    }
  }
}
