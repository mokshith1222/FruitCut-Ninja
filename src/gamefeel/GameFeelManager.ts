import Phaser from 'phaser';
import { AudioSystem } from '../audio/AudioSystem';
import { HapticManager } from './HapticManager';
import { ScreenShake } from './ScreenShake';
import { HitStop } from './HitStop';
import { ImpactFeedback } from './ImpactFeedback';
import { ComboFeedback } from './ComboFeedback';
import { FEEDBACK_PRESETS, type FeedbackPreset } from './FeedbackPresets';
import type { FruitSlicedPayload, BombHitPayload } from './GameFeelEvents';
import { VFXSystem } from '../vfx/VFXSystem';

export class GameFeelManager {
  private static scene: Phaser.Scene | null = null;

  static init(scene: Phaser.Scene) {
    this.scene = scene;

    AudioSystem.init();
    ScreenShake.init(scene);
    HitStop.init(scene);
    ImpactFeedback.init(scene);
    ComboFeedback.init(scene);
  }

  static cleanup() {
    this.scene = null;
    HitStop.cancel();
    ScreenShake.stop();
  }

  static applyPreset(preset: FeedbackPreset, _x?: number, _y?: number) {
    // 1. Audio
    if (preset.soundId) {
      AudioSystem.playSfx(preset.soundId);
    }

    // 2. Haptics
    if (preset.hapticLevel) {
      switch (preset.hapticLevel) {
        case 'light':
          HapticManager.light();
          break;
        case 'medium':
          HapticManager.medium();
          break;
        case 'heavy':
          HapticManager.heavy();
          break;
        case 'success':
          HapticManager.success();
          break;
        case 'warning':
          HapticManager.warning();
          break;
      }
    }

    // 3. Screen Shake
    if (preset.screenShake) {
      ScreenShake.shake(preset.screenShake.intensity, preset.screenShake.durationMs);
    }

    // 4. Hit Stop
    if (preset.hitStopMs && preset.hitStopMs > 0) {
      HitStop.trigger(preset.hitStopMs);
    }
  }

  /**
   * Main entry point when a fruit or bomb is sliced
   */
  static onFruitSliced(payload: FruitSlicedPayload) {
    const { x, y, fruitId, sliceAngle = 0, isBomb = false, points = 10, combo = 1, isPerfect = false } = payload;

    if (isBomb) {
      this.onBombHit({ x, y });
      return;
    }

    if (isPerfect) {
      this.applyPreset(FEEDBACK_PRESETS.PERFECT_CUT, x, y);
      ImpactFeedback.spawnImpact(x, y, fruitId, sliceAngle, true);
      this.showPerfectPopup(x, y, points);
      return;
    }

    // Normal Cut
    const preset = points > 15 ? FEEDBACK_PRESETS.HEAVY_SLICE : FEEDBACK_PRESETS.LIGHT_SLICE;
    this.applyPreset(preset, x, y);

    // Directional juice & pulp splatter
    ImpactFeedback.spawnImpact(x, y, fruitId, sliceAngle, false);

    // Score Popup
    VFXSystem.showScorePopup(x, y, points, combo);
  }

  /**
   * Bomb Hit Feedback
   */
  static onBombHit(payload: BombHitPayload) {
    this.applyPreset(FEEDBACK_PRESETS.BOMB_HIT, payload.x, payload.y);
    ImpactFeedback.spawnImpact(payload.x, payload.y, 'bomb', 0, false);
  }

  /**
   * Bomb Near Miss Warning
   */
  static onBombNearMiss(x: number, y: number) {
    this.applyPreset(FEEDBACK_PRESETS.BOMB_NEAR_MISS, x, y);
  }

  /**
   * Combo Escalation Feedback
   */
  static onComboUpdated(combo: number, x: number, y: number) {
    if (combo < 2) return;

    if (combo >= 20) {
      this.applyPreset(FEEDBACK_PRESETS.COMBO_FRENZY, x, y);
    } else if (combo >= 10) {
      this.applyPreset(FEEDBACK_PRESETS.COMBO_HIGH, x, y);
    } else if (combo >= 5) {
      this.applyPreset(FEEDBACK_PRESETS.COMBO_START, x, y);
    } else {
      AudioSystem.playSfx('combo_low');
      HapticManager.light();
    }

    ComboFeedback.trigger(combo, x, y);
  }

  /**
   * Level Complete Feedback
   */
  static onLevelComplete() {
    this.applyPreset(FEEDBACK_PRESETS.LEVEL_COMPLETE);
  }

  /**
   * Level Failed Feedback
   */
  static onLevelFailed() {
    this.applyPreset(FEEDBACK_PRESETS.LEVEL_FAILED);
  }

  /**
   * Reward Claimed Feedback
   */
  static onRewardClaimed() {
    this.applyPreset(FEEDBACK_PRESETS.REWARD_CLAIM);
  }

  /**
   * Shop Purchase Feedback
   */
  static onPurchaseSuccess() {
    this.applyPreset(FEEDBACK_PRESETS.PURCHASE);
  }

  /**
   * Milestone Reached Feedback
   */
  static onMilestoneReached() {
    this.applyPreset(FEEDBACK_PRESETS.MILESTONE);
  }

  /**
   * Global Button Tap Feedback
   */
  static onButtonTap() {
    this.applyPreset(FEEDBACK_PRESETS.BUTTON_TAP);
  }

  /**
   * Time Attack Last Seconds Urgency Feedback
   */
  static onTimeUrgency() {
    AudioSystem.playSfx('tick');
    HapticManager.light();
  }

  private static showPerfectPopup(x: number, y: number, points: number) {
    if (!this.scene) return;

    const textStr = `PERFECT! +${points}`;
    const popup = this.scene.add.text(x, y - 25, textStr, {
      fontFamily: 'Nunito, system-ui, sans-serif',
      fontSize: '26px',
      fontStyle: 'bold',
      color: '#FFD700',
      stroke: '#000000',
      strokeThickness: 5,
    }).setOrigin(0.5).setDepth(170);

    this.scene.tweens.add({
      targets: popup,
      y: y - 85,
      scale: 1.35,
      alpha: 0,
      duration: 800,
      ease: 'Back.easeOut',
      onComplete: () => popup.destroy()
    });
  }
}
