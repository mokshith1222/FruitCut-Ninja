import React from 'react';
import { Colors } from '../../design-system/tokens';

export const GameViewport: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: Colors.background.primary,
      overflow: 'hidden'
    }}>
      {/* 
        This wrapper forces a controlled aspect ratio/dimension boundary for the game 
        canvas on desktop/tablet, while being full-bleed on mobile.
      */}
      <div id="game-canvas-wrapper" style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: '800px', // Standard tablet max-width for canvas
        maxHeight: '100%',
        boxShadow: '0 0 40px rgba(0,0,0,0.8)',
        background: Colors.background.primary,
      }}>
        {children}
      </div>
    </div>
  );
};

export const UIViewport: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10
    }}>
      <div id="ui-safe-area" style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: '800px', // Match GameViewport
        pointerEvents: 'none', // Allow clicks to pass through to canvas
        display: 'flex',
        flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  );
};

export const SafeAreaContainer: React.FC<{ children: React.ReactNode, pointerEvents?: 'auto' | 'none', style?: React.CSSProperties }> = ({ children, pointerEvents = 'auto', style = {} }) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      pointerEvents,
      position: 'relative',
      overflow: 'hidden',
      ...style
    }}>
      {children}
    </div>
  );
};
