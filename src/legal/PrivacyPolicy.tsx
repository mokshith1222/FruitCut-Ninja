import { motion } from 'framer-motion';
import { IconButton } from '../ui/components/Button';

interface LegalDocProps {
  onBack: () => void;
}

export const PrivacyPolicy = ({ onBack }: LegalDocProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'var(--c-bg)', zIndex: 110,
        display: 'flex', flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', gap: 14,
        borderBottom: '1px solid var(--c-border)',
        background: 'rgba(0,0,0,0.4)',
        flexShrink: 0
      }}>
        <IconButton id="btn-back-privacy" icon="←" onClick={onBack} label="Back" />
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Privacy Policy</h2>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>Last Updated: September 29, 2026</span>
        </div>
      </div>

      {/* Document Body */}
      <div className="scroll-y" style={{ flex: 1, padding: '24px 20px 48px', maxWidth: 680, margin: '0 auto', width: '100%' }}>
        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>1. Introduction</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            This Privacy Policy explains how <strong>Fruit Cut</strong> ("the Game"), developed by <strong>M Sai Mokshith Naik</strong> ("we", "our", or "us"), handles information when you play our mobile game. We are committed to protecting your privacy and practicing transparent data minimization.
          </p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>2. Information We Do NOT Collect</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            Fruit Cut does <strong>not</strong> require account registration, login credentials, or personal profiles. We do not access or collect:
          </p>
          <ul style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', paddingLeft: 20 }}>
            <li>Your real name, address, or phone number</li>
            <li>Your contacts, address book, or social media accounts</li>
            <li>Precise or coarse GPS location</li>
            <li>Camera, microphone, photos, or storage media</li>
            <li>Biometric data or payment account credentials</li>
          </ul>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>3. Local Game Data Storage</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            All gameplay state is stored exclusively on your local device storage (via local web storage). This includes:
          </p>
          <ul style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', paddingLeft: 20 }}>
            <li>Campaign level stars, high scores, and best survival times</li>
            <li>Unlocked in-game cosmetic blades, trails, and themes</li>
            <li>Virtual coin balance and in-game transaction ledger</li>
            <li>Player audio preferences, haptics, screen shake, and motion settings</li>
          </ul>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
            This data never leaves your device and is not transmitted to external cloud servers.
          </p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>4. Third-Party Advertising (Google AdMob)</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            Fruit Cut utilizes Google AdMob to display interstitial and opt-in rewarded video advertisements to support game maintenance. Google AdMob may collect and process:
          </p>
          <ul style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', paddingLeft: 20 }}>
            <li>IP address (for general geographic ad routing and fraud detection)</li>
            <li>Mobile advertising identifiers (e.g., Google Advertising ID / GAID)</li>
            <li>Ad interaction telemetry, impression metrics, and diagnostic crash data</li>
          </ul>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
            For details regarding Google's data processing policies, please review <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-primary)' }}>Google's Privacy Policy</a> and <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-primary)' }}>How Google uses information from sites or apps that use our services</a>.
          </p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>5. Children's Privacy</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            Fruit Cut is intended for general audiences. We comply with the Children's Online Privacy Protection Act (COPPA) and Google Play Families policies. We do not knowingly collect personal information from children under the age of 13.
          </p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>6. Data Deletion & Reset Rights</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            Because your game progress is stored entirely on your local device, you maintain full control over your data. You can completely purge all local save data at any time by navigating to <strong>Settings → Reset Local Data</strong>, or by clearing the app data in your device's application settings.
          </p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>7. Developer Contact</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            If you have questions, feedback, or inquiries regarding this Privacy Policy, please contact:
          </p>
          <div style={{ background: 'var(--c-surface)', padding: 14, borderRadius: 12, marginTop: 8 }}>
            <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>M Sai Mokshith Naik</div>
            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
              Email: <a href="mailto:mokshithnaik932@gmail.com" style={{ color: 'var(--c-primary)', textDecoration: 'none' }}>mokshithnaik932@gmail.com</a>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};
