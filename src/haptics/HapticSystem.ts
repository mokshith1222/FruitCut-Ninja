export class HapticSystem {
  static isSupported(): boolean {
    return typeof navigator !== 'undefined' && 'vibrate' in navigator;
  }

  static light() {
    if (!this.isSupported()) return;
    navigator.vibrate(10);
  }

  static medium() {
    if (!this.isSupported()) return;
    navigator.vibrate(30);
  }

  static heavy() {
    if (!this.isSupported()) return;
    navigator.vibrate([50, 10, 50]);
  }

  static success() {
    if (!this.isSupported()) return;
    navigator.vibrate([20, 50, 20, 50, 50]);
  }

  static failure() {
    if (!this.isSupported()) return;
    navigator.vibrate([100, 50, 100, 50, 200]);
  }
}
