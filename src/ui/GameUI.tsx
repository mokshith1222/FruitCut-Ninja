import { AnimatePresence } from 'framer-motion';
import { useGameState, GamePhase } from '../core/GameState';

// Screens
import { SplashScreen }        from './screens/SplashScreen';
import { MainMenuScreen }      from './screens/MainMenuScreen';
import { LevelMapScreen }      from './screens/LevelMapScreen';
import { LevelStartScreen }    from './screens/LevelStartScreen';
import { GameplayHUD }         from './screens/GameplayHUD';
import { PauseScreen }         from './screens/PauseScreen';
import { LevelCompleteScreen } from './screens/LevelCompleteScreen';
import { LevelFailedScreen }   from './screens/LevelFailedScreen';
import { ShopScreen }          from './screens/ShopScreen';
import { DailyRewardScreen }   from './screens/DailyRewardScreen';
import { ChallengesScreen }    from './screens/ChallengesScreen';
import { SettingsScreen }      from './screens/SettingsScreen';
import { AdTestScreen }        from './screens/AdTestScreen';
import { TimeAttackResultScreen } from './screens/TimeAttackResultScreen';
import { EndlessResultScreen }    from './screens/EndlessResultScreen';

// The full UI layer — routes all screens based on GamePhase
export const GameUI = () => {
  const phase = useGameState(s => s.currentPhase);

  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">

        {phase === GamePhase.BOOT && (
          <SplashScreen key="splash" />
        )}

        {phase === GamePhase.MAIN_MENU && (
          <MainMenuScreen key="main-menu" />
        )}

        {phase === GamePhase.LEVEL_LOADING && (
          <LevelMapScreen key="level-map" />
        )}

        {phase === GamePhase.LEVEL_STARTING && (
          <LevelStartScreen key="level-starting" />
        )}

        {/* Gameplay HUD is transparent — Phaser canvas shows through */}
        {phase === GamePhase.PLAYING && (
          <GameplayHUD key="hud" />
        )}

        {phase === GamePhase.PAUSED && (
          <PauseScreen key="paused" />
        )}

        {phase === GamePhase.LEVEL_COMPLETE && (
          <LevelCompleteScreen key="complete" />
        )}

        {phase === GamePhase.LEVEL_FAILED && (
          <LevelFailedScreen key="failed" />
        )}

        {phase === GamePhase.TIME_ATTACK_RESULT && (
          <TimeAttackResultScreen key="ta_result" />
        )}

        {phase === GamePhase.ENDLESS_RESULT && (
          <EndlessResultScreen key="endless_result" />
        )}

        {phase === GamePhase.SHOP && (
          <ShopScreen key="shop" />
        )}

        {phase === GamePhase.DAILY_REWARD && (
          <DailyRewardScreen key="daily" />
        )}

        {phase === GamePhase.CHALLENGES && (
          <ChallengesScreen key="challenges" />
        )}

        {phase === GamePhase.SETTINGS && (
          <SettingsScreen key="settings" />
        )}

        {phase === GamePhase.AD_TEST && (
          <AdTestScreen key="adtest" />
        )}

      </AnimatePresence>
    </div>
  );
};
