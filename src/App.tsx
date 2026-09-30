import { useEffect, useRef } from 'react';
import { GameUI } from './ui/GameUI';
import { createGame } from './gameplay/PhaserGame';
import { useGameState, GamePhase } from './core/GameState';
import { useProgressionState } from './progression/ProgressionState';
import { AppSaveManager } from './save/AppSaveManager';
import { GameViewport, UIViewport } from './ui/components/core/Viewport';
import { ChallengeTracker } from './challenges/ChallengeTracker';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { AdsManager } from './ads/AdsManager';
import './index.css';

declare global {
  interface Window {
    __PHASER_GAME__: Phaser.Game | null;
  }
}

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const setPhase = useGameState(state => state.setPhase);
  const pauseGame = useGameState(state => state.pauseGame);

  useEffect(() => {
    // Load persisted save data
    AppSaveManager.load();
    ChallengeTracker.initialize();

    // Initialize AdMob SDK early so ads are ready when needed
    AdsManager.initialize().catch(() => {});

    const container = containerRef.current;

    // Clean up destroyed game instance if any
    if (window.__PHASER_GAME__ && (!window.__PHASER_GAME__.canvas || (window.__PHASER_GAME__ as any).isDestroyed)) {
      try {
        window.__PHASER_GAME__.destroy(true);
      } catch {
        // ignore
      }
      window.__PHASER_GAME__ = null;
    }

    // Initialize Phaser or re-attach existing canvas
    if (!window.__PHASER_GAME__) {
      window.__PHASER_GAME__ = createGame('game-canvas-container');
    } else if (container && window.__PHASER_GAME__.canvas && !container.contains(window.__PHASER_GAME__.canvas)) {
      container.appendChild(window.__PHASER_GAME__.canvas);
    }

    // Simulate boot sequence loading
    const timer = setTimeout(() => {
      setPhase(GamePhase.MAIN_MENU);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [setPhase]);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const backButtonListener = CapacitorApp.addListener('backButton', () => {
      const currentPhase = useGameState.getState().currentPhase;

      if (currentPhase === GamePhase.PLAYING) {
        pauseGame();
      } else if (
        currentPhase === GamePhase.SHOP ||
        currentPhase === GamePhase.SETTINGS ||
        currentPhase === GamePhase.DAILY_REWARD ||
        currentPhase === GamePhase.CHALLENGES ||
        currentPhase === GamePhase.AD_TEST
      ) {
        setPhase(GamePhase.MAIN_MENU);
      } else if (currentPhase === GamePhase.MAIN_MENU) {
        CapacitorApp.exitApp();
      }
      // For other phases like PAUSED, LEVEL_COMPLETE, etc., do nothing or handle appropriately
    });

    return () => {
      backButtonListener.then(listener => listener.remove());
    };
  }, [setPhase, pauseGame]);

  useEffect(() => {
    const unsub = useProgressionState.subscribe((state) => {
      const themeId = state.equippedItems?.theme || 'theme_dojo';
      let gradient = 'linear-gradient(180deg, #0D0D1A 0%, #1A0D2E 100%)';
      if (themeId === 'theme_orchard') gradient = 'linear-gradient(180deg, #0A1628 0%, #1B3A2D 100%)';
      if (themeId === 'theme_neon') gradient = 'linear-gradient(180deg, #120024 0%, #3a005c 100%)';
      document.body.style.background = gradient;
    });
    // Trigger once initially
    const initialState = useProgressionState.getState();
    const themeId = initialState.equippedItems?.theme || 'theme_dojo';
    let gradient = 'linear-gradient(180deg, #0D0D1A 0%, #1A0D2E 100%)';
    if (themeId === 'theme_orchard') gradient = 'linear-gradient(180deg, #0A1628 0%, #1B3A2D 100%)';
    if (themeId === 'theme_neon') gradient = 'linear-gradient(180deg, #120024 0%, #3a005c 100%)';
    document.body.style.background = gradient;
    
    return () => unsub();
  }, []);

  return (
    <GameViewport>
      <div id="game-canvas-container" ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <UIViewport>
        <GameUI />
      </UIViewport>
    </GameViewport>
  );
}

export default App;
