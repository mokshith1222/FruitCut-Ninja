import { motion } from 'framer-motion';
import { IconButton } from '../ui/components/Button';

interface LegalDocProps {
  onBack: () => void;
}

export const TermsAndConditions = ({ onBack }: LegalDocProps) => {
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
        <IconButton id="btn-back-terms" icon="←" onClick={onBack} label="Back" />
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Terms & Conditions</h2>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>Last Updated: September 29, 2026</span>
        </div>
      </div>

      {/* Document Body */}
      <div className="scroll-y" style={{ flex: 1, padding: '24px 20px 48px', maxWidth: 680, margin: '0 auto', width: '100%' }}>
        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>1. Acceptance of Terms</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            By downloading, installing, or playing <strong>Fruit Cut</strong> ("the Game"), developed by <strong>M Sai Mokshith Naik</strong> ("Developer"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please uninstall and discontinue using the Game.
          </p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>2. License & Intellectual Property</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            We grant you a personal, non-exclusive, non-transferable, revocable license to use Fruit Cut for your personal entertainment. All game software, vector illustrations, audio synthesis routines, user interface designs, and code are the intellectual property of the Developer and are protected by applicable intellectual property laws.
          </p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>3. Virtual In-Game Currency & Items</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            Fruit Cut features in-game virtual currency ("Coins") and virtual cosmetic items (such as blade skins, slash trails, and dojothemes). You expressly acknowledge that:
          </p>
          <ul style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', paddingLeft: 20 }}>
            <li>Coins and cosmetic items are strictly virtual gameplay elements with <strong>zero real-world monetary value</strong>.</li>
            <li>Coins cannot be exchanged, redeemed, or refunded for real currency, goods, or financial assets under any circumstances.</li>
            <li>Coins and virtual items cannot be transferred, sold, or gifted to other individuals or accounts.</li>
            <li>Coins are earned exclusively through gameplay achievements, daily rewards, challenge completion, and optional rewarded advertisements.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>4. Advertisements</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            Fruit Cut may display third-party advertisements delivered by Google AdMob. Interstitial ads appear only at natural transition points between gameplay levels, and rewarded video ads are entirely opt-in. We do not endorse third-party products advertised within the game.
          </p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>5. Prohibited Conduct</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            You agree not to reverse engineer, decompile, disassemble, tamper with save files, distribute automated bots, or exploit unintended software bugs to gain unfair advantages or duplicate virtual currency.
          </p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>6. Disclaimer of Warranties</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            Fruit Cut is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind. While we strive to ensure optimal performance, we do not warrant that gameplay will be completely uninterrupted or error-free.
          </p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>7. Limitation of Liability</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            To the maximum extent permitted by applicable law, the Developer shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the Game.
          </p>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: 8 }}>8. Contact Information</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
            For questions or inquiries regarding these Terms and Conditions, please contact:
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
