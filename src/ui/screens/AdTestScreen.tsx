import { useState } from 'react';
import { Screen } from '../components/Layout';
import { Button, IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { AdSystem, getAdUnitId } from '../../ads/AdSystem';

export const AdTestScreen = () => {
  const setPhase = useGameState(s => s.setPhase);
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = (msg: string) => {
    setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const testRewarded = async () => {
    if (loading) return;
    setLoading(true);
    addLog(`Loading Rewarded Ad: ${getAdUnitId('rewarded')}`);
    const success = await AdSystem.showRewardedAd(() => {
      addLog("Reward Callback Executed!");
    });
    addLog(success ? "Ad Watched Successfully" : "Ad Failed/Closed Early");
    setLoading(false);
  };

  const testInterstitial = async () => {
    if (loading) return;
    setLoading(true);
    addLog(`Loading Interstitial Ad: ${getAdUnitId('interstitial')}`);
    const success = await AdSystem.showInterstitial();
    addLog(success ? "Interstitial Completed" : "Interstitial Failed");
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
        <p style={{ color: 'var(--c-primary)', fontWeight: 'bold' }}>DEVELOPMENT ONLY</p>
        
        <Button 
          id="btn-test-reward"
          label={loading ? "Loading..." : "Test Rewarded Ad"} 
          onClick={testRewarded} 
          variant="secondary" 
          disabled={loading} 
        />
        <Button 
          id="btn-test-interstitial"
          label={loading ? "Loading..." : "Test Interstitial Ad"} 
          onClick={testInterstitial} 
          variant="primary" 
          disabled={loading} 
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
          fontSize: '0.8rem',
          color: '#0f0'
        }}>
          {log.map((l, i) => <div key={i}>{l}</div>)}
          {log.length === 0 && <div style={{ color: '#666' }}>No logs yet...</div>}
        </div>
      </div>
    </Screen>
  );
};
