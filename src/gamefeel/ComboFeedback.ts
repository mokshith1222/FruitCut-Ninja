import Phaser from 'phaser';

export class ComboFeedback {
  private static scene: Phaser.Scene | null = null;

  static init(scene: Phaser.Scene) {
    this.scene = scene;
  }

  static trigger(combo: number, x: number, y: number) {
    if (!this.scene || combo < 2) return;

    // Quick floating combo text at the slice impact, fading rapidly
    this.showQuickCombo(combo, x, y);
  }

  private static showQuickCombo(combo: number, x: number, y: number) {
    if (!this.scene) return;

    const label = `${combo}x`;
    const color = combo >= 10 ? '#FF00FF' : (combo >= 5 ? '#FFD600' : '#00E5FF');

    const text = this.scene.add.text(x, y - 30, label, {
      fontFamily: 'Nunito, system-ui, sans-serif',
      fontSize: combo >= 5 ? '26px' : '22px',
      fontStyle: '900',
      color: color,
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5).setDepth(180);

    this.scene.tweens.add({
      targets: text,
      y: y - 70,
      scale: { from: 0.8, to: 1.1 },
      alpha: { from: 1, to: 0 },
      duration: 500,
      ease: 'Cubic.easeOut',
      onComplete: () => text.destroy()
    });
  }
}
