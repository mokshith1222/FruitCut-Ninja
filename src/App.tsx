import { useEffect, useRef } from 'react';
import { GameUI } from './ui/GameUI';
import { createGame } from './gameplay/PhaserGame';
import { useGameState, GamePhase } from './core/GameState';
import { useProgressionState } from './progression/ProgressionState';
import './index.css';

declare global {
  interface Window {
    __PHASER_GAME__: Phaser.Game | null;
  }
}

function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const setPhase = useGameState(state => state.setPhase);
  const loadProgress = useProgressionState(state => state.loadProgress);

  useEffect(() => {
    // Load persisted save data
    loadProgress();

    const container = containerRef.current || document.getElementById('game-container');

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
      window.__PHASER_GAME__ = createGame('game-container');
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
  }, [setPhase, loadProgress]);

  return (
    <>
      <div id="game-container" ref={containerRef} />
      <div id="ui-layer">
        <GameUI />
      </div>
    </>
  );
}

export default App;
