import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Screen } from '../components/Layout';
import { IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';
import { useCoinLedger } from '../../economy/CoinLedger';
import { useChallengeState } from '../../challenges/ChallengeManager';
import { AudioSystem } from '../../audio/AudioSystem';
import { SaveSystem } from '../../save/SaveSystem';
import { PrivacyPolicy } from '../../legal/PrivacyPolicy';
import { TermsAndConditions } from '../../legal/TermsAndConditions';

const APP_VERSION = '1.0.0';

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <motion.div
    onClick={() => onChange(!checked)}
    style={{
      width: 52, height: 28, borderRadius: 14,
      background: checked ? 'var(--grad-success)' : 'rgba(255,255,255,0.12)',
      cursor: 'pointer', position: 'relative',
      border: '2px solid rgba(255,255,255,0.12)',
      transition: 'background 0.2s ease',
      flexShrink: 0,
    }}
  >
    <motion.div
      animate={{ x: checked ? 24 : 2 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      style={{
        position: 'absolute', top: 2, left: 0,
        width: 20, height: 20, borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
      }}
    />
  </motion.div>
);

const SettingRow = ({ 
  label, 
  sublabel, 
  right, 
  onClick 
}: { 
  label: string; 
  sublabel?: string; 
  right: React.ReactNode; 
  onClick?: () => void;
}) => (
  <div 
    onClick={onClick}
    style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 0',
      borderBottom: '1px solid var(--c-border)',
      cursor: onClick ? 'pointer' : 'default',
    }}
  >
    <div>
      <div style={{ fontWeight: 700, fontSize: 'var(--fs-body)' }}>{label}</div>
      {sublabel && <div style={{ fontSize: 'var(--fs-small)', color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{sublabel}</div>}
    </div>
    {right}
  </div>
);

export const SettingsScreen = () => {
  const setPhase = useGameState(s => s.setPhase);
  const settings = useProgressionState(s => s.settings);
  const updateSettings = useProgressionState(s => s.updateSettings);

  const [activeLegalDoc, setActiveLegalDoc] = useState<'privacy' | 'terms' | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleMusicChange = (val: boolean) => {
    updateSettings({ musicEnabled: val });
    if (!val) {
      AudioSystem.stopMusic();
    } else {
      AudioSystem.playMusic('menu');
    }
  };

  const handleResetData = () => {
    SaveSystem.clearProgress();
    useProgressionState.getState().loadProgress({});
    useCoinLedger.getState().load({ balance: 0, transactions: [], claimedRewards: {} });
    useChallengeState.getState().loadData({});
    setShowResetModal(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2500);
  };

  return (
    <Screen blurBg={false} style={{ background: 'var(--grad-bg)', alignItems: 'stretch' }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px 12px',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid var(--c-border)',
        background: 'rgba(0,0,0,0.3)',
        flexShrink: 0,
      }}>
        <IconButton id="btn-back-settings" icon="←" onClick={() => setPhase(GamePhase.MAIN_MENU)} label="Back" />
        <h2 style={{ fontSize: 'var(--fs-subheading)', fontWeight: 800 }}>⚙️ Settings</h2>
      </div>

      <div className="scroll-y" style={{ flex: 1, padding: '0 var(--sp-lg) var(--sp-2xl)' }}>
        {/* AUDIO SECTION */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <p style={{ fontSize: 'var(--fs-small)', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', margin: '24px 0 4px' }}>
            AUDIO
          </p>
          <SettingRow 
            label="Music" 
            sublabel="Procedural background groove" 
            right={<Toggle checked={settings.musicEnabled} onChange={handleMusicChange} />} 
          />
          <SettingRow 
            label="Sound Effects" 
            sublabel="Cut, combo, and slice audio" 
            right={<Toggle checked={settings.sfxEnabled} onChange={(v) => updateSettings({ sfxEnabled: v })} />} 
          />
        </motion.div>

        {/* GAMEPLAY & MOTION */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p style={{ fontSize: 'var(--fs-small)', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', margin: '28px 0 4px' }}>
            GAMEPLAY & MOTION
          </p>
          <SettingRow 
            label="Haptics" 
            sublabel="Tactile vibration feedback" 
            right={<Toggle checked={settings.hapticsEnabled} onChange={(v) => updateSettings({ hapticsEnabled: v })} />} 
          />
          <SettingRow 
            label="Screen Shake" 
            sublabel="Impact and combo camera punch" 
            right={<Toggle checked={settings.screenShakeEnabled} onChange={(v) => updateSettings({ screenShakeEnabled: v })} />} 
          />
          <SettingRow 
            label="Reduced Motion" 
            sublabel="Dampens camera shake and intense scaling" 
            right={<Toggle checked={settings.reducedMotion} onChange={(v) => updateSettings({ reducedMotion: v })} />} 
          />
        </motion.div>

        {/* PRIVACY & LEGAL */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <p style={{ fontSize: 'var(--fs-small)', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', margin: '28px 0 4px' }}>
            PRIVACY & LEGAL
          </p>
          <SettingRow 
            label="Privacy Policy" 
            sublabel="Data transparency & advertising practices" 
            right={<span style={{ color: 'var(--c-primary)', fontWeight: 700, fontSize: '0.85rem' }}>View →</span>} 
            onClick={() => setActiveLegalDoc('privacy')}
          />
          <SettingRow 
            label="Terms & Conditions" 
            sublabel="Usage terms & virtual currency rules" 
            right={<span style={{ color: 'var(--c-primary)', fontWeight: 700, fontSize: '0.85rem' }}>View →</span>} 
            onClick={() => setActiveLegalDoc('terms')}
          />
        </motion.div>

        {/* DATA MANAGEMENT */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p style={{ fontSize: 'var(--fs-small)', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', margin: '28px 0 4px' }}>
            DATA MANAGEMENT
          </p>
          <SettingRow 
            label="Reset Local Game Data" 
            sublabel="Purge local progress, scores, and inventory" 
            right={
              <button 
                id="btn-reset-data"
                className="btn btn--danger btn--sm"
                onClick={() => setShowResetModal(true)}
              >
                Reset
              </button>
            } 
          />
          {resetSuccess && (
            <div style={{ color: 'var(--c-success)', fontSize: '0.8rem', fontWeight: 700, marginTop: 6 }}>
              ✓ Local game data reset to defaults.
            </div>
          )}
        </motion.div>

        {/* SUPPORT */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <p style={{ fontSize: 'var(--fs-small)', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', margin: '28px 0 4px' }}>
            SUPPORT
          </p>
          <SettingRow 
            label="Contact Developer" 
            sublabel="Feedback, bug reports, and support" 
            right={
              <a 
                href="mailto:mokshithnaik932@gmail.com" 
                style={{ 
                  color: 'var(--c-primary)', 
                  fontSize: 'var(--fs-small)', 
                  textDecoration: 'none', 
                  fontWeight: 700,
                  background: 'rgba(255,215,0,0.1)',
                  padding: '6px 12px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,215,0,0.3)'
                }}
              >
                Email Support
              </a>
            } 
          />
        </motion.div>

        {/* ABOUT */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p style={{ fontSize: 'var(--fs-small)', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', margin: '28px 0 4px' }}>
            ABOUT
          </p>
          <SettingRow label="Version" right={<span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--fs-small)', fontWeight: 700 }}>{APP_VERSION}</span>} />
          <SettingRow label="Developer" right={<span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'var(--fs-small)', fontWeight: 700 }}>M Sai Mokshith Naik</span>} />
        </motion.div>

      </div>

      {/* Confirmation Modal for Resetting Local Data */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 24, zIndex: 120
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                background: 'var(--c-surface)',
                borderRadius: 20, padding: 24,
                maxWidth: 340, width: '100%',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>⚠️</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 8 }}>Reset Local Data?</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 20 }}>
                This will purge all local campaign stars, high scores, coins, and cosmetic unlocks. This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button 
                  className="btn btn--ghost btn--md" 
                  onClick={() => setShowResetModal(false)}
                >
                  Cancel
                </button>
                <button 
                  id="btn-confirm-reset"
                  className="btn btn--danger btn--md" 
                  onClick={handleResetData}
                >
                  Yes, Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* In-App Legal Document Presentation */}
      <AnimatePresence>
        {activeLegalDoc === 'privacy' && (
          <PrivacyPolicy onBack={() => setActiveLegalDoc(null)} />
        )}
        {activeLegalDoc === 'terms' && (
          <TermsAndConditions onBack={() => setActiveLegalDoc(null)} />
        )}
      </AnimatePresence>
    </Screen>
  );
};
