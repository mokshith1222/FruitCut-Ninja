import { useState } from 'react';
import { Screen } from '../components/Layout';
import { Button, IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { AdsManager } from '../../ads/AdsManager';
import { AdConfigManager } from '../../ads/AdConfig';
import { Capacitor } from '@capacitor/core';

export const AdTestScreen = () => {
  const setPhase = useGameState(s => s.setPhase);
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = (msg: string) => {
    const entry = `[${new Date().toLocaleTimeString()}] ${msg}`;
    console.log('[ADS-TEST]', msg);
    setLog(prev => [...prev, entry]);
  };

  const testInterstitial = async () => {
    if (loading) return;
    setLoading(true);
    try {
      addLog('--- INTERSTITIAL TEST START ---');
      addLog(`Platform: ${Capacitor.isNativePlatform() ? 'NATIVE' : 'WEB'}`);
      addLog(`Environment: ${AdConfigManager.getEnvironment()}`);
      addLog(`Ad Unit: ${AdConfigManager.getAdUnit('interstitial')}`);

      addLog('Step 1: Ensuring SDK is initialized...');
      const initResult = await AdsManager.initialize();
      addLog(`Step 1 result: ${initResult ? 'SUCCESS' : 'FAILED'}`);
      if (!initResult) { addLog('ABORTED: SDK init failed'); setLoading(false); return; }

      addLog('Step 2: Loading & showing interstitial (bypassing policy)...');
      addLog('(This may take up to 10 seconds to load the ad...)');
      const result = await AdsManager.testShowInterstitial();
      if (result.success) {
        addLog('Step 2 result: AD SHOWN ✅');
      } else {
        addLog(`Step 2 result: AD FAILED ❌`);
        addLog(`Error: ${result.error || 'Unknown'}`);
      }
      addLog('--- INTERSTITIAL TEST END ---');
    } catch (e: any) {
      addLog(`ERROR: ${e?.message || e}`);
    }
    setLoading(false);
  };

  const testRewarded = async () => {
    if (loading) return;
    setLoading(true);
    try {
      addLog('--- REWARDED TEST START ---');
      addLog(`Platform: ${Capacitor.isNativePlatform() ? 'NATIVE' : 'WEB'}`);
      addLog(`Environment: ${AdConfigManager.getEnvironment()}`);
      addLog(`Ad Unit: ${AdConfigManager.getAdUnit('rewarded')}`);

      addLog('Step 1: Ensuring SDK is initialized...');
      const initResult = await AdsManager.initialize();
      addLog(`Step 1 result: ${initResult ? 'SUCCESS' : 'FAILED'}`);
      if (!initResult) { addLog('ABORTED: SDK init failed'); setLoading(false); return; }

      addLog('Step 2: Loading & showing rewarded (bypassing policy)...');
      addLog('(This may take up to 10 seconds to load the ad...)');
      const result = await AdsManager.testShowRewarded();
      if (result.success && result.rewarded) {
        addLog('Step 2 result: REWARD EARNED ✅');
      } else if (result.success) {
        addLog('Step 2 result: Ad shown but reward not earned (user closed early)');
      } else {
        addLog(`Step 2 result: AD FAILED ❌`);
        addLog(`Error: ${result.error || 'Unknown'}`);
      }
      addLog('--- REWARDED TEST END ---');
    } catch (e: any) {
      addLog(`ERROR: ${e?.message || e}`);
    }
    setLoading(false);
  };

  return (
    <Screen blurBg={false} style={{ background: '#111', alignItems: 'stretch' }}>
      <div style={{
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid var(--c-border)',
        background: 'rgba(0,0,0,0.5)',
      }}>
        <IconButton id="btn-back-adtest" icon="←" onClick={() => setPhase(GamePhase.SETTINGS)} label="Back" />
        <h2 style={{ fontSize: 'var(--fs-subheading)', fontWeight: 800 }}>🛠 Ad Test Panel</h2>
      </div>

      <div style={{ padding: 'var(--sp-md)', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ color: 'var(--c-primary)', fontWeight: 'bold' }}>
          DEVELOPMENT ONLY — {Capacitor.isNativePlatform() ? '📱 Native' : '🌐 Web'}
        </p>
        
        <Button 
          id="btn-test-interstitial"
          label={loading ? "⏳ Loading ad..." : "🎯 Test Interstitial"} 
          onClick={testInterstitial} 
          variant="primary" 
          disabled={loading} 
        />
        <Button 
          id="btn-test-reward"
          label={loading ? "⏳ Loading ad..." : "🎁 Test Rewarded Ad"} 
          onClick={testRewarded} 
          variant="secondary" 
          disabled={loading} 
        />
        <Button
          id="btn-clear-log"
          label="Clear Log"
          onClick={() => setLog([])}
          variant="ghost"
          size="sm"
        />

        <div style={{
          marginTop: 16,
          padding: 12,
          background: '#000',
          borderRadius: 8,
          border: '1px solid #333',
          height: '50vh',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          color: '#0f0',
          lineHeight: 1.4,
        }}>
          {log.map((l, i) => (
            <div key={i} style={{ color: l.includes('FAILED') || l.includes('ERROR') || l.includes('❌') ? '#f44' : l.includes('✅') ? '#4f4' : '#0f0' }}>
              {l}
            </div>
          ))}
          {log.length === 0 && <div style={{ color: '#666' }}>Tap a button above to test ads...</div>}
        </div>
      </div>
    </Screen>
  );
};
