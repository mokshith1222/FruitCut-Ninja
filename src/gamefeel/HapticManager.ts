import { useProgressionState } from '../progression/ProgressionState';

export class HapticManager {
  private static lastVibrateTime = 0;
  private static minIntervalMs = 15; // Throttle to prevent vibration overload, reduced for responsive slicing

  static isSupported(): boolean {
    return typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
  }

  static isEnabled(): boolean {
    try {
      const state = useProgressionState.getState();
      return state?.settings?.hapticsEnabled ?? true;
    } catch {
      return true;
    }
  }

  private static trigger(pattern: number | number[]): boolean {
    if (!this.isSupported() || !this.isEnabled()) return false;

    const now = Date.now();
    if (now - this.lastVibrateTime < this.minIntervalMs) {
      return false; // Throttled
    }
    this.lastVibrateTime = now;

    try {
      return navigator.vibrate(pattern);
    } catch (e) {
      // In some browser sandboxes, vibrate may throw a SecurityError
      return false;
    }
  }

  static light() {
    this.trigger(25);
  }

  static medium() {
    this.trigger(45);
  }

  static heavy() {
    this.trigger([60, 20, 60]);
  }

  static success() {
    this.trigger([18, 30, 18, 30, 45]);
  }

  static warning() {
    this.trigger([70, 30, 70, 30, 120]);
  }

  static custom(pattern: number | number[]) {
    this.trigger(pattern);
  }
}
