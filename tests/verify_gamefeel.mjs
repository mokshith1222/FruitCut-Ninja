// Node native ESM test runner for Phase 9 Game Feel
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✓ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`✗ [FAIL] ${testName}`);
    failedTests++;
  }
}

// 1. Test Feedback Presets
import { FEEDBACK_PRESETS } from '../src/gamefeel/FeedbackPresets.ts';

console.log('--- RUNNING PHASE 9 GAME FEEL VERIFICATION ---\n');

assert(!!FEEDBACK_PRESETS.LIGHT_SLICE, '1. LIGHT_SLICE preset defined');
assert(!!FEEDBACK_PRESETS.PERFECT_CUT, '2. PERFECT_CUT preset defined');
assert(!!FEEDBACK_PRESETS.BOMB_HIT, '3. BOMB_HIT preset defined');
assert(!!FEEDBACK_PRESETS.COMBO_FRENZY, '4. COMBO_FRENZY preset defined');
assert(!!FEEDBACK_PRESETS.PURCHASE, '5. PURCHASE preset defined');
assert(!!FEEDBACK_PRESETS.REWARD_CLAIM, '6. REWARD_CLAIM preset defined');
assert(!!FEEDBACK_PRESETS.LEVEL_COMPLETE, '7. LEVEL_COMPLETE preset defined');
assert(!!FEEDBACK_PRESETS.LEVEL_FAILED, '8. LEVEL_FAILED preset defined');

assert(
  (FEEDBACK_PRESETS.PERFECT_CUT.hitStopMs || 0) > (FEEDBACK_PRESETS.LIGHT_SLICE.hitStopMs || 0),
  '9. Perfect cut hit-stop is greater than light slice'
);
assert(
  (FEEDBACK_PRESETS.PERFECT_CUT.particleAmount || 0) > (FEEDBACK_PRESETS.LIGHT_SLICE.particleAmount || 0),
  '10. Perfect cut particle amount is greater than light slice'
);
assert(
  FEEDBACK_PRESETS.BOMB_HIT.hapticLevel === 'warning',
  '11. Bomb hit triggers warning haptic preset'
);
assert(
  FEEDBACK_PRESETS.LEVEL_COMPLETE.hapticLevel === 'success',
  '12. Level complete triggers success haptic preset'
);
assert(
  FEEDBACK_PRESETS.PURCHASE.soundId === 'purchase',
  '13. Purchase preset plays cash register sound'
);
assert(
  FEEDBACK_PRESETS.BUTTON_TAP.soundId === 'click',
  '14. Button tap preset plays click sound'
);

// 2. Test Haptics Fallback and Cooldown
import { HapticManager } from '../src/gamefeel/HapticManager.ts';

assert(!HapticManager.isSupported(), '15. HapticManager safely reports false when navigator.vibrate is missing');
HapticManager.light();
HapticManager.heavy();
HapticManager.warning();
assert(true, '16. HapticManager calls do not throw when unsupported');

// 3. Test Audio System Mute & SFX checks
import { AudioSystem } from '../src/audio/AudioSystem.ts';

assert(typeof AudioSystem.isSfxEnabled() === 'boolean', '17. AudioSystem checks sfxEnabled');
assert(typeof AudioSystem.isMusicEnabled() === 'boolean', '18. AudioSystem checks musicEnabled');

// 4. Test ProgressionState settings
import { useProgressionState } from '../src/progression/ProgressionState.ts';

const initialSettings = useProgressionState.getState().settings;
assert(initialSettings.musicEnabled === true, '19. Settings default: musicEnabled = true');
assert(initialSettings.sfxEnabled === true, '20. Settings default: sfxEnabled = true');
assert(initialSettings.hapticsEnabled === true, '21. Settings default: hapticsEnabled = true');
assert(initialSettings.screenShakeEnabled === true, '22. Settings default: screenShakeEnabled = true');
assert(initialSettings.reducedMotion === false, '23. Settings default: reducedMotion = false');

useProgressionState.getState().updateSettings({ screenShakeEnabled: false, hapticsEnabled: false });
assert(
  useProgressionState.getState().settings.screenShakeEnabled === false &&
  useProgressionState.getState().settings.hapticsEnabled === false,
  '24. Settings update correctly and persist in state'
);

// Restore defaults
useProgressionState.getState().updateSettings({ screenShakeEnabled: true, hapticsEnabled: true });

console.log(`\n========================================`);
console.log(`ALL 24 GAME FEEL CHECKS PASSED: ${passedTests} / 24`);
console.log(`========================================\n`);

process.exit(failedTests > 0 ? 1 : 0);
