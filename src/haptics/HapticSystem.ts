import { HapticManager } from '../gamefeel/HapticManager';

export class HapticSystem {
  static isSupported(): boolean {
    return HapticManager.isSupported();
  }

  static light() {
    HapticManager.light();
  }

  static medium() {
    HapticManager.medium();
  }

  static heavy() {
    HapticManager.heavy();
  }

  static success() {
    HapticManager.success();
  }

  static failure() {
    HapticManager.warning();
  }
}

