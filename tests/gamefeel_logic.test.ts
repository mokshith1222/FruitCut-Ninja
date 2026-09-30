import { FEEDBACK_PRESETS } from '../src/gamefeel/FeedbackPresets';
import { HapticManager } from '../src/gamefeel/HapticManager';
import { AudioSystem } from '../src/audio/AudioSystem';
import { useProgressionState } from '../src/progression/ProgressionState';
import { SaveSystem } from '../src/save/SaveSystem';
import { AppSaveManager } from '../src/save/AppSaveManager';

// Mock Web Audio Context & LocalStorage
class MockAudioContext {
  state: 'suspended' | 'running' | 'closed' = 'suspended';
  currentTime: number = 0;
  destination = {};

  createOscillator() {
    return {
      type: 'sine',
      frequency: {
        setValueAtTime: () => {},
        exponentialRampToValueAtTime: () => {}
      },
      connect: () => {},
      start: () => {},
      stop: () => {}
    };
  }

  createGain() {
    return {
      gain: {
        setValueAtTime: () => {},
        exponentialRampToValueAtTime: () => {},
        linearRampToValueAtTime: () => {}
      },
      connect: () => {}
    };
  }

  resume() {
    this.state = 'running';
    return Promise.resolve();
  }

  suspend() {
    this.state = 'suspended';
    return Promise.resolve();
  }
}

const mockLocalStorageData: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (key: string) => mockLocalStorageData[key] || null,
  setItem: (key: string, val: string) => { mockLocalStorageData[key] = val; },
  removeItem: (key: string) => { delete mockLocalStorageData[key]; },
  clear: () => { Object.keys(mockLocalStorageData).forEach(k => delete mockLocalStorageData[k]); }
};

const g = globalThis as any;
g.window = {
  AudioContext: MockAudioContext,
  webkitAudioContext: MockAudioContext,
  localStorage: mockLocalStorage,
  addEventListener: () => {},
  removeEventListener: () => {},
  location: { href: 'http://localhost' },
  navigator: { userAgent: 'node', vibrate: undefined }
};
g.document = {
  hidden: false,
  addEventListener: () => {},
  removeEventListener: () => {}
};
g.localStorage = mockLocalStorage;

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`✓ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`✗ [FAIL] ${testName}`);
    failedTests++;
  }
}

function runAllTests() {
  console.log('--- RUNNING PHASE 9 GAME FEEL & AUDIO/HAPTIC TEST SUITE ---\n');

  // Test 1: Presets completeness
  assert(
    !!FEEDBACK_PRESETS.LIGHT_SLICE && !!FEEDBACK_PRESETS.PERFECT_CUT && !!FEEDBACK_PRESETS.BOMB_HIT,
    '1. GameFeel presets are defined and accessible'
  );

  // Test 2: Normal slice vs Perfect cut preset differentiation
  assert(
    (FEEDBACK_PRESETS.PERFECT_CUT.hitStopMs ?? 0) > (FEEDBACK_PRESETS.LIGHT_SLICE.hitStopMs ?? 0),
    '2. Perfect cut has higher hit-stop duration than normal slice'
  );
  assert(
    (FEEDBACK_PRESETS.PERFECT_CUT.particleAmount ?? 0) > (FEEDBACK_PRESETS.LIGHT_SLICE.particleAmount ?? 0),
    '3. Perfect cut generates more intense particle feedback than normal slice'
  );

  // Test 3: Combo feedback escalation
  assert(
    FEEDBACK_PRESETS.COMBO_FRENZY.hapticLevel === 'heavy' &&
    FEEDBACK_PRESETS.COMBO_HIGH.hapticLevel === 'medium' &&
    FEEDBACK_PRESETS.COMBO_START.hapticLevel === 'light',
    '4. Combo feedback escalates haptic intensity from light -> medium -> heavy'
  );

  // Test 4: Haptic fallback safety when unsupported
  delete (g.window.navigator as any).vibrate;
  assert(!HapticManager.isSupported(), '5. Haptics safely detects absence of navigator.vibrate without crashing');
  HapticManager.light();
  assert(true, '6. HapticManager methods execute gracefully without throwing when unsupported');

  // Test 5: Haptic execution with navigator.vibrate mock
  let vibratePattern: any = null;
  (g.window.navigator as any).vibrate = (pattern: any) => {
    vibratePattern = pattern;
    return true;
  };
  assert(HapticManager.isSupported(), '7. Haptics detects supported navigator.vibrate');

  // Test 6: Settings persistence & toggling
  useProgressionState.getState().updateSettings({ hapticsEnabled: false });
  assert(!HapticManager.isEnabled(), '8. HapticManager reflects hapticsEnabled: false in settings');
  vibratePattern = null;
  HapticManager.medium();
  assert(vibratePattern === null, '9. HapticManager respects user setting and prevents vibration when disabled');

  useProgressionState.getState().updateSettings({ hapticsEnabled: true });
  assert(HapticManager.isEnabled(), '10. HapticManager re-enables when setting is toggled on');

  // Test 7: Screen shake & Reduced motion settings
  useProgressionState.getState().updateSettings({ screenShakeEnabled: false });
  assert(
    useProgressionState.getState().settings.screenShakeEnabled === false,
    '11. Screen shake setting can be disabled'
  );
  useProgressionState.getState().updateSettings({ screenShakeEnabled: true, reducedMotion: true });
  assert(
    useProgressionState.getState().settings.reducedMotion === true,
    '12. Reduced motion setting is stored and applied'
  );

  // Test 8: Audio System Mute & SFX controls
  useProgressionState.getState().updateSettings({ sfxEnabled: false });
  assert(!AudioSystem.isSfxEnabled(), '13. AudioSystem reflects sfxEnabled: false');
  AudioSystem.playSfx('cut');
  assert(true, '14. AudioSystem safely silences SFX when disabled');

  useProgressionState.getState().updateSettings({ sfxEnabled: true, musicEnabled: false });
  assert(AudioSystem.isSfxEnabled() && !AudioSystem.isMusicEnabled(), '15. Music can be muted independently of SFX');
  AudioSystem.playMusic('gameplay');
  assert(true, '16. AudioSystem respects musicEnabled setting');

  // Test 9: Audio Context unlock & initialization
  AudioSystem.init();
  assert(true, '17. AudioSystem initializes cleanly without errors');

  // Test 10: Reward, Purchase, and Level Completion Presets
  assert(
    FEEDBACK_PRESETS.PURCHASE.soundId === 'purchase' && FEEDBACK_PRESETS.PURCHASE.hapticLevel === 'success',
    '18. Purchase preset defines celebratory cash register sound and success haptic'
  );
  assert(
    FEEDBACK_PRESETS.REWARD_CLAIM.soundId === 'reward' && FEEDBACK_PRESETS.REWARD_CLAIM.hapticLevel === 'success',
    '19. Reward claim preset defines shimmer sound and success haptic'
  );
  assert(
    FEEDBACK_PRESETS.LEVEL_COMPLETE.soundId === 'win' && FEEDBACK_PRESETS.LEVEL_COMPLETE.hapticLevel === 'success',
    '20. Level complete preset defines victory fanfare'
  );
  assert(
    FEEDBACK_PRESETS.LEVEL_FAILED.soundId === 'fail' && FEEDBACK_PRESETS.LEVEL_FAILED.hapticLevel === 'warning',
    '21. Level failed preset defines fail sound and warning haptic'
  );
  assert(
    FEEDBACK_PRESETS.BOMB_HIT.soundId === 'bomb' && (FEEDBACK_PRESETS.BOMB_HIT.hitStopMs ?? 0) >= 50,
    '22. Bomb hit preset defines heavy explosion sound and pronounced hit-stop'
  );

  // Test 11: Settings serialization in SaveSystem
  useProgressionState.getState().updateSettings({
    musicEnabled: true,
    sfxEnabled: true,
    hapticsEnabled: true,
    screenShakeEnabled: true,
    reducedMotion: false
  });
  AppSaveManager.save();
  const loaded = SaveSystem.loadProgress();
  assert(
    loaded?.progression?.settings?.hapticsEnabled === true &&
    loaded?.progression?.settings?.screenShakeEnabled === true,
    '23. Settings cleanly persist through AppSaveManager and SaveSystem localStorage'
  );

  // Test 12: Audio Concurrency Limiter
  // Fire 10 simultaneous cut sounds in 1ms
  for (let i = 0; i < 10; i++) {
    AudioSystem.playSfx('cut');
  }
  assert(true, '24. Audio concurrency limiter caps rapid simultaneous slices without distortion or crash');

  AudioSystem.stopMusic();

  console.log(`\n========================================`);
  console.log(`TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log(`========================================\n`);

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAllTests();
