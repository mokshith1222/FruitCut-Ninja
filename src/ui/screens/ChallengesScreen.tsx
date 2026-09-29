import { motion } from 'framer-motion';
import { Screen } from '../components/Layout';
import { IconButton } from '../components/Button';
import { useGameState, GamePhase } from '../../core/GameState';
import { useProgressionState } from '../../progression/ProgressionState';

const CHALLENGES = [
  { id: 'cut_50',    emoji: '🍎', title: 'Fruit Novice',    desc: 'Cut 50 fruits',         goal: 50,  reward: 100 },
  { id: 'combo_5',   emoji: '⚡', title: 'Combo Starter',   desc: 'Reach a 5× combo',      goal: 5,   reward: 150 },
  { id: 'level_5',   emoji: '⭐', title: 'Level Hunter',    desc: 'Complete 5 levels',      goal: 5,   reward: 200 },
  { id: 'no_miss',   emoji: '🎯', title: 'Sharp Eye',       desc: 'Complete a level, 0 misses', goal: 1, reward: 300 },
  { id: 'score_500', emoji: '💎', title: 'High Scorer',     desc: 'Score 500 in one level', goal: 500, reward: 250 },
];

export const ChallengesScreen = () => {
  const setPhase = useGameState(s => s.setPhase);
  const { challengeProgress, claimedChallenges, claimChallengeReward } = useProgressionState();

  const getProgress = (id: string) => challengeProgress[id] || 0;

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
        <IconButton id="btn-back-challenges" icon="←" onClick={() => setPhase(GamePhase.MAIN_MENU)} label="Back" />
        <div>
          <h2 style={{ fontSize: 'var(--fs-subheading)', fontWeight: 800 }}>🏆 Challenges</h2>
          <p style={{ fontSize: 'var(--fs-small)', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Complete goals for coins</p>
        </div>
      </div>

      {/* List */}
      <div className="scroll-y" style={{ flex: 1, padding: 'var(--sp-lg)', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {CHALLENGES.map((c, i) => {
          const progress = getProgress(c.id);
          const pct = Math.min((progress / c.goal) * 100, 100);
          const done = pct >= 100;

          return (
            <motion.div
              key={c.id}
              className="panel"
              style={{ display: 'flex', gap: 16, alignItems: 'center', opacity: done ? 0.65 : 1 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: done ? 0.65 : 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div style={{ fontSize: '2.2rem', lineHeight: 1, flexShrink: 0 }}>{c.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 800, fontSize: 'var(--fs-body)' }}>{c.title}</span>
                  <span style={{ color: 'var(--c-coin)', fontSize: 'var(--fs-small)', fontWeight: 700 }}>🪙 {c.reward}</span>
                </div>
                <p style={{ fontSize: 'var(--fs-small)', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{c.desc}</p>
                <div className="progress-bar-track">
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.07 }}
                    style={{ background: done ? 'var(--grad-success)' : undefined }}
                  />
                </div>
                <div style={{ fontSize: 'var(--fs-small)', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                  {progress} / {c.goal}
                </div>
              </div>
              {done && claimedChallenges.includes(c.id) && <div style={{ fontSize: '1.5rem' }}>✅</div>}
              {done && !claimedChallenges.includes(c.id) && (
                <button 
                  className="btn btn--secondary btn--sm" 
                  onClick={() => claimChallengeReward(c.id, c.reward)}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Claim
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </Screen>
  );
};
