export const RewardDefinitions = {
  // Level Mode
  LEVEL_FIRST_COMPLETION: 50,
  LEVEL_REPLAY_COMPLETION: 10,
  STAR_EARNED_1: 15,
  STAR_EARNED_2: 25,
  STAR_EARNED_3: 40,

  // Daily Rewards (7-day streak pattern)
  DAILY_REWARDS: [
    50,   // Day 1
    100,  // Day 2
    150,  // Day 3
    200,  // Day 4
    300,  // Day 5
    400,  // Day 6
    750   // Day 7
  ],

  // Endless Mode Milestones
  ENDLESS_MILESTONES: {
    100: 50,
    250: 100,
    500: 250,
    1000: 500,
    2500: 1000,
    5000: 2500
  },

  // Challenges (Default fallback, should be defined in Challenge definitions)
  CHALLENGE_DEFAULT: 150
};
