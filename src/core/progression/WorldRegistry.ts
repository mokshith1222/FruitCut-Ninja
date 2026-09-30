import type { WorldConfig } from './LevelTypes';

export const WorldRegistry: Record<string, WorldConfig> = {
  world_1: { id: 'world_1', name: 'Orchard', description: 'Begin your journey where the fruits are fresh.', themeColor: '#4CAF50', bgGradient: 'var(--grad-world1)', levelStart: 1, levelEnd: 30, fruitPool: ['apple', 'orange'] },
  world_2: { id: 'world_2', name: 'Tropical', description: 'Sunny shores and juicy tropical treats.', themeColor: '#FF9800', bgGradient: 'var(--grad-world2)', levelStart: 31, levelEnd: 60, fruitPool: ['apple', 'orange', 'watermelon', 'pineapple'] },
  world_3: { id: 'world_3', name: 'Citrus', description: 'Tangy and fast-paced slicing action.', themeColor: '#FFEB3B', bgGradient: 'var(--grad-world3)', levelStart: 61, levelEnd: 90, fruitPool: ['orange', 'pineapple'] },
  world_4: { id: 'world_4', name: 'Frozen', description: 'Slippery and cold. Beware the freeze!', themeColor: '#03A9F4', bgGradient: 'var(--grad-world3)', levelStart: 91, levelEnd: 120, fruitPool: ['apple', 'watermelon', 'freeze_fruit'] },
  world_5: { id: 'world_5', name: 'Volcanic', description: 'Explosive danger at every turn.', themeColor: '#F44336', bgGradient: 'var(--grad-world2)', levelStart: 121, levelEnd: 150, fruitPool: ['orange', 'pineapple', 'bomb'] },
  world_6: { id: 'world_6', name: 'Neon', description: 'High-speed synthetic fruit slicing.', themeColor: '#E91E63', bgGradient: 'var(--grad-world1)', levelStart: 151, levelEnd: 180, fruitPool: ['apple', 'watermelon', 'lightning_fruit'] },
  world_7: { id: 'world_7', name: 'Storm', description: 'A chaotic flurry of rapid patterns.', themeColor: '#9C27B0', bgGradient: 'var(--grad-world3)', levelStart: 181, levelEnd: 210, fruitPool: ['apple', 'orange', 'watermelon', 'pineapple', 'fast_bomb'] },
  world_8: { id: 'world_8', name: 'Cosmic', description: 'Gravity defying combinations.', themeColor: '#673AB7', bgGradient: 'var(--grad-world2)', levelStart: 211, levelEnd: 240, fruitPool: ['pineapple', 'crystal_fruit', 'golden_fruit'] },
  world_9: { id: 'world_9', name: 'Void', description: 'Only the most precise will survive.', themeColor: '#212121', bgGradient: 'var(--grad-world1)', levelStart: 241, levelEnd: 270, fruitPool: ['apple', 'bomb', 'fast_bomb', 'fake_fruit'] },
  world_10: { id: 'world_10', name: 'Master', description: 'The ultimate test of fruit mastery.', themeColor: '#FFC107', bgGradient: 'var(--grad-world2)', levelStart: 271, levelEnd: 300, fruitPool: ['apple', 'orange', 'watermelon', 'pineapple', 'bomb', 'fast_bomb', 'fake_fruit', 'freeze_fruit', 'lightning_fruit', 'crystal_fruit', 'golden_fruit'] },
};
