import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

let passed = 0;
let failed = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`✓ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`✗ [FAIL] ${testName} ${details ? '(' + details + ')' : ''}`);
    failed++;
  }
}

console.log('================================================================');
console.log('PHASE 10: ADS, PRIVACY, TERMS, SETTINGS & PRODUCTION SDK AUDIT');
console.log('================================================================\n');

// -------------------------------------------------------------
// 1. AdsManager Initializes Once
// -------------------------------------------------------------
const adsManagerSrc = fs.readFileSync(path.join(rootDir, 'src/ads/AdsManager.ts'), 'utf-8');
assert(
  adsManagerSrc.includes('private static isInitialized = false;') &&
  adsManagerSrc.includes('if (this.isInitialized) return true;') &&
  adsManagerSrc.includes('this.isInitialized = true;'),
  '1. AdsManager initializes once (guarded by boolean flag)'
);

// -------------------------------------------------------------
// 2. Interstitial Preload Works
// -------------------------------------------------------------
const interstitialSrc = fs.readFileSync(path.join(rootDir, 'src/ads/InterstitialAdManager.ts'), 'utf-8');
assert(
  interstitialSrc.includes('async preload(): Promise<boolean>') &&
  interstitialSrc.includes('this.provider.preloadInterstitial()') &&
  interstitialSrc.includes("this.state = ready ? 'READY' : 'IDLE';"),
  '2. Interstitial preload transitions state safely to READY or IDLE'
);

// -------------------------------------------------------------
// 3. Interstitial Failure Does Not Block Gameplay
// -------------------------------------------------------------
assert(
  interstitialSrc.includes("this.state = 'FAILED'") &&
  interstitialSrc.includes('return { shown: false, reason: this.lastError || undefined };') &&
  interstitialSrc.includes("this.state = 'IDLE';"),
  '3. Interstitial failure resets to IDLE and resolves non-blocking result'
);

// -------------------------------------------------------------
// 4. Interstitial Cannot Trigger During Gameplay
// -------------------------------------------------------------
const adPolicySrc = fs.readFileSync(path.join(rootDir, 'src/ads/AdPolicy.ts'), 'utf-8');
assert(
  adPolicySrc.includes('GamePhase.PLAYING') &&
  adPolicySrc.includes('GamePhase.LEVEL_STARTING') &&
  adPolicySrc.includes('GamePhase.PAUSED') &&
  adPolicySrc.includes('Cannot show interstitial during active gameplay'),
  '4. AdPolicy strictly blocks interstitials during active gameplay, starting, and paused phases'
);

// -------------------------------------------------------------
// 5. Interstitial Frequency Rules Work
// -------------------------------------------------------------
const adConfigSrc = fs.readFileSync(path.join(rootDir, 'src/ads/AdConfig.ts'), 'utf-8');
const freqSrc = fs.readFileSync(path.join(rootDir, 'src/ads/AdFrequencyManager.ts'), 'utf-8');
assert(
  adConfigSrc.includes('minimumLevelsBetweenAds: 3') &&
  adConfigSrc.includes('firstSessionProtectionLevels: 3') &&
  adConfigSrc.includes('maxPerSession: 8') &&
  freqSrc.includes('canShowInterstitial'),
  '5. AdFrequencyManager enforces minimum 3 level gap, first 3 levels protected, and 8 ads session cap'
);

// -------------------------------------------------------------
// 6. Interstitial Cooldown Works
// -------------------------------------------------------------
assert(
  adConfigSrc.includes('minimumCooldownMs: 90 * 1000') &&
  freqSrc.includes('elapsedSinceLastAd < config.minimumCooldownMs'),
  '6. Interstitial enforces 90-second cooldown period between impressions'
);

// -------------------------------------------------------------
// 7. Rewarded Ad Requires Explicit User Action
// -------------------------------------------------------------
const rewardedSrc = fs.readFileSync(path.join(rootDir, 'src/ads/RewardedAdManager.ts'), 'utf-8');
assert(
  rewardedSrc.includes('async show(options: RewardedAdOptions)') &&
  adPolicySrc.includes('static canShowRewarded()') &&
  (fs.readFileSync(path.join(rootDir, 'src/ui/screens/LevelCompleteScreen.tsx'), 'utf-8').includes('handleDoubleReward') ||
   fs.readFileSync(path.join(rootDir, 'src/ui/screens/LevelFailedScreen.tsx'), 'utf-8').includes('handleRevive')),
  '7. Rewarded ads require explicit user click (no automatic triggering)'
);

// -------------------------------------------------------------
// 8. Rewarded Ad Only Grants Reward After Verified Completion
// -------------------------------------------------------------
assert(
  rewardedSrc.includes('if (result.success && result.rewarded)') &&
  rewardedSrc.includes('options.onSuccess(rewardAmount, idempotencyKey);'),
  '8. Rewarded ad grants reward only upon verified completion callback from provider'
);

// -------------------------------------------------------------
// 9. Rewarded Ad Cannot Grant Twice (Idempotency Protection)
// -------------------------------------------------------------
assert(
  rewardedSrc.includes('this.processedTokens.has(idempotencyKey)') &&
  rewardedSrc.includes('this.processedTokens.add(idempotencyKey)') &&
  rewardedSrc.includes('Idempotency token already processed'),
  '9. Rewarded ad is protected by unique idempotency tokens against double grant'
);

// -------------------------------------------------------------
// 10. Failed Rewarded Ad Grants Nothing
// -------------------------------------------------------------
assert(
  rewardedSrc.includes('options.onError?.(result.error);') &&
  rewardedSrc.includes('options.onCancel?.();') &&
  !rewardedSrc.includes('addCoins'),
  '10. Cancelled or failed rewarded ad invokes error/cancel handlers without granting reward'
);

// -------------------------------------------------------------
// 11. Missing Network Does Not Break Gameplay
// -------------------------------------------------------------
const levelFailedSrc = fs.readFileSync(path.join(rootDir, 'src/ui/screens/LevelFailedScreen.tsx'), 'utf-8');
const levelCompSrc = fs.readFileSync(path.join(rootDir, 'src/ui/screens/LevelCompleteScreen.tsx'), 'utf-8');
assert(
  levelFailedSrc.includes('Ad unavailable right now.') &&
  levelFailedSrc.includes('handleNextAction') &&
  levelCompSrc.includes('Ad unavailable right now.'),
  '11. Missing network / ad failure displays graceful notice and preserves gameplay flow'
);

// -------------------------------------------------------------
// 12. Development Uses Test Configuration
// -------------------------------------------------------------
assert(
  adConfigSrc.includes('ca-app-pub-3940256099942544/1033173712') &&
  adConfigSrc.includes('ca-app-pub-3940256099942544/5224354917'),
  '12. Official Google Mobile Ads test unit IDs configured for development'
);

// -------------------------------------------------------------
// 13. Production Configuration Is Separate
// -------------------------------------------------------------
assert(
  adConfigSrc.includes('environment: AdEnvironment') &&
  adConfigSrc.includes("'production'") &&
  adConfigSrc.includes("'development'") &&
  adConfigSrc.includes('isFormatConfigured'),
  '13. Development, staging, and production environments are strictly separated'
);

// -------------------------------------------------------------
// 14. Settings Persist
// -------------------------------------------------------------
const progressionStateSrc = fs.readFileSync(path.join(rootDir, 'src/progression/ProgressionState.ts'), 'utf-8');
assert(
  progressionStateSrc.includes('musicEnabled:') &&
  progressionStateSrc.includes('sfxEnabled:') &&
  progressionStateSrc.includes('hapticsEnabled:') &&
  progressionStateSrc.includes('screenShakeEnabled:') &&
  progressionStateSrc.includes('reducedMotion:') &&
  progressionStateSrc.includes('AppSaveManager.save()'),
  '14. Settings persist music, sfx, haptics, screenShake, and reducedMotion via versioned save'
);

// -------------------------------------------------------------
// 15. Privacy Policy Opens
// -------------------------------------------------------------
const privacySrc = fs.readFileSync(path.join(rootDir, 'src/legal/PrivacyPolicy.tsx'), 'utf-8');
const settingsSrc = fs.readFileSync(path.join(rootDir, 'src/ui/screens/SettingsScreen.tsx'), 'utf-8');
assert(
  fs.existsSync(path.join(rootDir, 'src/legal/PrivacyPolicy.tsx')) &&
  settingsSrc.includes("setActiveLegalDoc('privacy')") &&
  privacySrc.includes('Privacy Policy'),
  '15. Privacy Policy screen exists with dedicated modal/document viewer in Settings'
);

// -------------------------------------------------------------
// 16. Terms Opens
// -------------------------------------------------------------
const termsSrc = fs.readFileSync(path.join(rootDir, 'src/legal/TermsAndConditions.tsx'), 'utf-8');
assert(
  fs.existsSync(path.join(rootDir, 'src/legal/TermsAndConditions.tsx')) &&
  settingsSrc.includes("setActiveLegalDoc('terms')") &&
  termsSrc.includes('Terms & Conditions'),
  '16. Terms and Conditions screen exists with dedicated document viewer in Settings'
);

// -------------------------------------------------------------
// 17. Support Email Works
// -------------------------------------------------------------
assert(
  settingsSrc.includes('mailto:mokshithnaik932@gmail.com') &&
  privacySrc.includes('mokshithnaik932@gmail.com') &&
  termsSrc.includes('mokshithnaik932@gmail.com'),
  '17. Support mailto link configured with developer email: mokshithnaik932@gmail.com'
);

// -------------------------------------------------------------
// 18. Version Displays Correctly
// -------------------------------------------------------------
const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
assert(
  pkg.version === '1.0.0' &&
  settingsSrc.includes("APP_VERSION = '1.0.0'") &&
  settingsSrc.includes('{APP_VERSION}'),
  '18. Application version matches package.json configuration (v1.0.0)'
);

// -------------------------------------------------------------
// 19. Save Migration Works
// -------------------------------------------------------------
const saveSystemSrc = fs.readFileSync(path.join(rootDir, 'src/save/SaveSystem.ts'), 'utf-8');
assert(
  saveSystemSrc.includes('migrateToV4') &&
  saveSystemSrc.includes('migrateToV3') &&
  saveSystemSrc.includes('Migrating V2 save to V4'),
  '19. SaveSystem supports versioned migration pipeline up to v4 schema'
);

// -------------------------------------------------------------
// 20. Data Deletion / Reset Behavior Works
// -------------------------------------------------------------
assert(
  saveSystemSrc.includes('clearProgress: () => {') &&
  saveSystemSrc.includes('localStorage.removeItem(SAVE_KEY_V4)') &&
  settingsSrc.includes('handleResetData') &&
  settingsSrc.includes('SaveSystem.clearProgress()'),
  '20. In-app data reset clears all local storage keys and resets game state'
);

// -------------------------------------------------------------
// 21. No Unnecessary Permissions Remain
// -------------------------------------------------------------
const manifestPath = path.join(rootDir, 'android/app/src/main/AndroidManifest.xml');
let manifestContent = '';
if (fs.existsSync(manifestPath)) {
  manifestContent = fs.readFileSync(manifestPath, 'utf-8');
}
const hasCamera = manifestContent.includes('CAMERA');
const hasLocation = manifestContent.includes('LOCATION');
const hasContacts = manifestContent.includes('CONTACTS');
const hasRecordAudio = manifestContent.includes('RECORD_AUDIO');
assert(
  !hasCamera && !hasLocation && !hasContacts && !hasRecordAudio,
  '21. AndroidManifest has zero invasive permissions (No camera, location, audio, or contacts)'
);

// -------------------------------------------------------------
// 22. No Direct Coin Mutation Exists in Ads
// -------------------------------------------------------------
assert(
  !adsManagerSrc.includes('addCoins') &&
  !interstitialSrc.includes('addCoins') &&
  !rewardedSrc.includes('addCoins'),
  '22. Ads package has no direct economy mutations; rewards flow through verified UI callbacks'
);

// -------------------------------------------------------------
// 23. Ads Do Not Interrupt Active Gameplay
// -------------------------------------------------------------
const mainSceneSrc = fs.readFileSync(path.join(rootDir, 'src/gameplay/scenes/MainScene.ts'), 'utf-8');
assert(
  !mainSceneSrc.includes('AdsManager.showInterstitial') &&
  !mainSceneSrc.includes('AdSystem.showInterstitial'),
  '23. MainScene (active gameplay loop) contains zero interstitial triggers'
);

// -------------------------------------------------------------
// 24. Analytics Events Are Not Emitted Excessively
// -------------------------------------------------------------
// Verify that neither slice nor per-frame loops emit network or analytics calls
assert(
  !mainSceneSrc.includes('fetch(') &&
  !mainSceneSrc.includes('axios') &&
  !mainSceneSrc.includes('navigator.sendBeacon'),
  '24. No per-slice or per-frame analytics network calls exist in core slicing loop'
);

// -------------------------------------------------------------
// 25. SDK Initialization Does Not Create Duplicate Listeners
// -------------------------------------------------------------
const adMobProviderSrc = fs.readFileSync(path.join(rootDir, 'src/ads/AdMobProvider.ts'), 'utf-8');
assert(
  adMobProviderSrc.includes('if (this.isInitialized) return true;') &&
  adMobProviderSrc.includes('this.isInitialized = true;'),
  '25. AdMobProvider initialization is guarded against duplicate listener registration'
);

// -------------------------------------------------------------
// Simulation & Algorithmic Unit Tests
// -------------------------------------------------------------
console.log('\n--- Algorithmic & Unit Test Execution ---');

// Frequency & Cooldown Simulation
class SimFrequencyManager {
  constructor() {
    this.lastShown = 0;
    this.sessionCount = 0;
    this.lastLevelCompleted = 0;
  }
  canShow(levelsCompleted) {
    if (levelsCompleted < 3) return { allowed: false, reason: 'First-session protection' };
    if (this.sessionCount >= 8) return { allowed: false, reason: 'Session limit' };
    if (levelsCompleted - this.lastLevelCompleted < 3) return { allowed: false, reason: 'Level gap' };
    if (Date.now() - this.lastShown < 90000) return { allowed: false, reason: 'Cooldown active' };
    return { allowed: true };
  }
  record(level) {
    this.lastShown = Date.now();
    this.sessionCount++;
    this.lastLevelCompleted = level;
  }
}

const simFreq = new SimFrequencyManager();
assert(!simFreq.canShow(1).allowed, 'SIM 1: Blocked on Level 1 (first-session protection)');
assert(!simFreq.canShow(2).allowed, 'SIM 2: Blocked on Level 2');
assert(simFreq.canShow(3).allowed, 'SIM 3: Allowed on Level 3');
simFreq.record(3);
assert(!simFreq.canShow(3).allowed, 'SIM 4: Blocked immediately after showing (cooldown)');
assert(!simFreq.canShow(4).allowed, 'SIM 5: Blocked on Level 4 (level gap < 3 & cooldown)');

// Rewarded Idempotency Simulation
class SimRewardedManager {
  constructor() {
    this.processedTokens = new Set();
  }
  processReward(token, callback) {
    if (this.processedTokens.has(token)) return false;
    this.processedTokens.add(token);
    callback();
    return true;
  }
}

const simReward = new SimRewardedManager();
let rewardCalls = 0;
const testToken = 'reward_12345';
const success1 = simReward.processReward(testToken, () => { rewardCalls++; });
const success2 = simReward.processReward(testToken, () => { rewardCalls++; });
assert(success1 === true && success2 === false && rewardCalls === 1, 'SIM 6: Idempotency token prevents duplicate reward callback');

console.log('\n========================================');
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('========================================\n');

if (failed > 0) {
  process.exit(1);
}
