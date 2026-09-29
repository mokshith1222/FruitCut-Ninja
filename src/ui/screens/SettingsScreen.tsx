import { useState } from 'react';
import { motion } from 'framer-motion';
import { Screen } from '../components/Layout';
import { IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';

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

const SettingRow = ({ label, sublabel, right }: { label: string; sublabel?: string; right: React.ReactNode }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 0',
    borderBottom: '1px solid var(--c-border)',
  }}>
    <div>
      <div style={{ fontWeight: 700, fontSize: 'var(--fs-body)' }}>{label}</div>
      {sublabel && <div style={{ fontSize: 'var(--fs-small)', color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{sublabel}</div>}
    </div>
    {right}
  </div>
);

export const SettingsScreen = () => {
  const setPhase = useGameState(s => s.setPhase);
  const [music, setMusic]       = useState(true);
  const [sfx, setSfx]           = useState(true);
  const [haptics, setHaptics]   = useState(true);
  const [notifications, setNotifications] = useState(false);

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
        {/* Audio */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <p style={{ fontSize: 'var(--fs-small)', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', margin: '24px 0 4px' }}>
            AUDIO
          </p>
          <SettingRow label="Music" sublabel="Background music" right={<Toggle checked={music} onChange={setMusic} />} />
          <SettingRow label="Sound Effects" sublabel="Cut & combo sounds" right={<Toggle checked={sfx} onChange={setSfx} />} />
        </motion.div>

        {/* Gameplay */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p style={{ fontSize: 'var(--fs-small)', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', margin: '28px 0 4px' }}>
            GAMEPLAY
          </p>
          <SettingRow label="Haptics" sublabel="Vibration feedback" right={<Toggle checked={haptics} onChange={setHaptics} />} />
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <p style={{ fontSize: 'var(--fs-small)', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', margin: '28px 0 4px' }}>
            NOTIFICATIONS
          </p>
          <SettingRow label="Push Notifications" sublabel="Daily rewards & events" right={<Toggle checked={notifications} onChange={setNotifications} />} />
        </motion.div>

        {/* About */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p style={{ fontSize: 'var(--fs-small)', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', margin: '28px 0 4px' }}>
            ABOUT
          </p>
          <SettingRow label="Version" right={<span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'var(--fs-small)' }}>1.0.0</span>} />
          <SettingRow label="Developed by" right={<span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'var(--fs-small)' }}>Mokshith Naik</span>} />
          <SettingRow label="Contact" right={<a href="mailto:mokshithnaik932@gmail.com" style={{ color: 'var(--c-primary)', fontSize: 'var(--fs-small)', textDecoration: 'none', fontWeight: 600 }}>mokshithnaik932@gmail.com</a>} />
          <SettingRow label="Privacy Policy" right={<a href="/privacy.html" target="_blank" rel="noreferrer" style={{ color: 'var(--c-secondary)', fontSize: 'var(--fs-small)', textDecoration: 'none', fontWeight: 600 }}>View →</a>} />
          <SettingRow label="Terms of Service" right={<a href="/terms.html" target="_blank" rel="noreferrer" style={{ color: 'var(--c-secondary)', fontSize: 'var(--fs-small)', textDecoration: 'none', fontWeight: 600 }}>View →</a>} />
        </motion.div>

        {/* Developer / Ad Test */}
        {!import.meta.env.PROD && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <p style={{ fontSize: 'var(--fs-small)', fontWeight: 800, letterSpacing: '0.12em', color: 'var(--c-primary)', margin: '28px 0 4px' }}>
              DEVELOPMENT ONLY
            </p>
            <SettingRow 
              label="Ad Test Panel" 
              right={
                <button 
                  className="btn btn--primary btn--sm" 
                  onClick={() => setPhase(GamePhase.AD_TEST)}
                >
                  Open →
                </button>
              } 
            />
          </motion.div>
        )}
      </div>
    </Screen>
  );
};
