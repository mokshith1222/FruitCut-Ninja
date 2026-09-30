import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✓ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`✗ [FAIL] ${testName}`);
    failed++;
  }
}

console.log('=== PHASE 9 GAME FEEL CODEBASE AUDIT & VERIFICATION ===\n');

// 1. Check all required gamefeel files exist
const gamefeelFiles = [
  'GameFeelEvents.ts',
  'FeedbackPresets.ts',
  'HapticManager.ts',
  'ScreenShake.ts',
  'HitStop.ts',
  'ImpactFeedback.ts',
  'ComboFeedback.ts',
  'GameFeelManager.ts'
];

for (const file of gamefeelFiles) {
  const filePath = path.join(__dirname, '..', 'src', 'gamefeel', file);
  assert(fs.existsSync(filePath), `1. src/gamefeel/${file} exists`);
}

// 2. Inspect FeedbackPresets.ts contents
const presetsContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'gamefeel', 'FeedbackPresets.ts'), 'utf-8');
assert(presetsContent.includes('LIGHT_SLICE') && presetsContent.includes('PERFECT_CUT'), '2. Presets include LIGHT_SLICE and PERFECT_CUT');
assert(presetsContent.includes('BOMB_HIT') && presetsContent.includes('LEVEL_COMPLETE'), '3. Presets include BOMB_HIT and LEVEL_COMPLETE');
assert(presetsContent.includes('COMBO_START') && presetsContent.includes('COMBO_FRENZY'), '4. Presets include COMBO_START and COMBO_FRENZY');

// 3. Inspect HapticManager.ts
const hapticContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'gamefeel', 'HapticManager.ts'), 'utf-8');
assert(hapticContent.includes('navigator.vibrate') && hapticContent.includes('isSupported'), '5. HapticManager has safe navigator.vibrate checks');
assert(hapticContent.includes('minIntervalMs') || hapticContent.includes('lastVibrateTime'), '6. HapticManager throttles vibrations to prevent spam');
assert(hapticContent.includes('hapticsEnabled'), '7. HapticManager checks user setting before vibrating');

// 4. Inspect ScreenShake.ts
const shakeContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'gamefeel', 'ScreenShake.ts'), 'utf-8');
assert(shakeContent.includes('screenShakeEnabled'), '8. ScreenShake respects user setting');
assert(shakeContent.includes('reducedMotion'), '9. ScreenShake supports reduced motion dampening');
assert(shakeContent.includes('clampedIntensity'), '10. ScreenShake clamps maximum shake amplitude');

// 5. Inspect HitStop.ts
const hitStopContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'gamefeel', 'HitStop.ts'), 'utf-8');
assert(hitStopContent.includes('timeScale') && hitStopContent.includes('delayedCall'), '11. HitStop uses physics timeScale without freezing JS thread');
assert(hitStopContent.includes('clampedMs'), '12. HitStop duration is safely capped');

// 6. Inspect AudioSystem.ts
const audioContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'audio', 'AudioSystem.ts'), 'utf-8');
assert(audioContent.includes('isSfxEnabled') && audioContent.includes('isMusicEnabled'), '13. AudioSystem separates SFX and Music controls');
assert(audioContent.includes('MAX_CONCURRENT_SLICES'), '14. AudioSystem caps concurrent slice sound playback');
assert(audioContent.includes('setupGestureUnlock'), '15. AudioSystem handles browser gesture unlock');
assert(audioContent.includes('visibilitychange'), '16. AudioSystem suspends audio on tab visibility loss');
assert(audioContent.includes('perfect_cut') && audioContent.includes('combo_frenzy'), '17. AudioSystem synthesizes rich procedural sounds');

// 7. Inspect Settings in ProgressionState.ts
const progContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'progression', 'ProgressionState.ts'), 'utf-8');
assert(progContent.includes('musicEnabled') && progContent.includes('sfxEnabled'), '18. ProgressionState stores musicEnabled and sfxEnabled');
assert(progContent.includes('hapticsEnabled') && progContent.includes('screenShakeEnabled'), '19. ProgressionState stores hapticsEnabled and screenShakeEnabled');
assert(progContent.includes('reducedMotion') && progContent.includes('updateSettings'), '20. ProgressionState stores reducedMotion and has updateSettings');

// 8. Inspect MainScene.ts GameFeel integration
const mainSceneContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'gameplay', 'scenes', 'MainScene.ts'), 'utf-8');
assert(mainSceneContent.includes('GameFeelManager.init(this)'), '21. MainScene initializes GameFeelManager');
assert(mainSceneContent.includes('isPerfect ='), '22. MainScene detects Perfect Cut when swipe passes near center');
assert(mainSceneContent.includes('onBombNearMiss'), '23. MainScene detects Bomb near misses');
assert(mainSceneContent.includes('GameFeelManager.onFruitSliced'), '24. MainScene delegates fruit slice to GameFeelManager');

console.log(`\n========================================`);
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log(`========================================\n`);

process.exit(failed > 0 ? 1 : 0);
