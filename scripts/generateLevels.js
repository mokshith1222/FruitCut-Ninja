import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const worlds = [
  { id: 'world_1', name: 'Orchard' },
  { id: 'world_2', name: 'Tropical' },
  { id: 'world_3', name: 'Citrus' },
  { id: 'world_4', name: 'Frozen' },
  { id: 'world_5', name: 'Volcanic' },
  { id: 'world_6', name: 'Neon' },
  { id: 'world_7', name: 'Storm' },
  { id: 'world_8', name: 'Cosmic' },
  { id: 'world_9', name: 'Void' },
  { id: 'world_10', name: 'Master' },
];

const patterns = ['SINGLE', 'PAIR', 'BURST', 'FOUNTAIN', 'CROSS', 'MIXED', 'RANDOM'];

const levels = {};

for (let i = 1; i <= 300; i++) {
  const worldIndex = Math.floor((i - 1) / 30);
  const worldId = worlds[worldIndex].id;
  const isBossLevel = i % 30 === 0;

  // Difficulty curve (0.0 to 1.0)
  // First 10 levels are very easy (0.0 -> 0.05).
  // Level 300 is 1.0.
  const difficultyValue = Math.min(1.0, Math.pow((i - 1) / 299, 1.2));
  
  // Convert 0-1 to 1-10 tier for internal logic
  const difficultyTier = Math.floor(difficultyValue * 9) + 1;
  
  // Spawn Rate (ms): 1500ms down to 400ms
  const spawnRateMs = Math.floor(1500 - (difficultyValue * 1100));
  
  // Fruit Speed: 1.0 up to 2.2
  const fruitSpeedMultiplier = parseFloat((1.0 + (difficultyValue * 1.2)).toFixed(2));
  
  // Fruit Size: 1.2 down to 0.6
  const fruitSizeMultiplier = parseFloat((1.2 - (difficultyValue * 0.6)).toFixed(2));

  // Bomb chance starts at world 2 (level 31)
  let bombChance = 0;
  if (i > 30) {
    bombChance = parseFloat((0.05 + (difficultyValue * 0.45)).toFixed(2));
  }
  
  // Special fruit chance
  const specialFruitChance = parseFloat((0.02 + (difficultyValue * 0.18)).toFixed(2));

  // Simultaneous Fruits
  const maxSimultaneousFruits = Math.floor(1 + (difficultyValue * 6));

  // Spawn pattern selection based on difficulty
  let spawnPattern = 'RANDOM';
  if (difficultyValue < 0.1) spawnPattern = 'SINGLE';
  else if (difficultyValue < 0.2) spawnPattern = i % 2 === 0 ? 'PAIR' : 'SINGLE';
  else if (difficultyValue < 0.3) spawnPattern = i % 3 === 0 ? 'BURST' : 'PAIR';
  else if (difficultyValue < 0.5) spawnPattern = patterns[Math.floor(Math.random() * 4)]; // SINGLE, PAIR, BURST, FOUNTAIN
  else if (difficultyValue < 0.7) spawnPattern = patterns[Math.floor(Math.random() * 5)]; // ... CROSS
  else spawnPattern = 'MIXED';

  if (isBossLevel) spawnPattern = 'BURST';

  // Duration
  let duration = 30 + Math.floor(difficultyValue * 45); // 30s to 75s
  if (isBossLevel) duration = 60 + Math.floor(difficultyValue * 30);

  // Objectives
  const objectives = [];
  const cycle = i % 4;

  if (isBossLevel) {
    objectives.push({ type: 'SURVIVAL_TIME', target: duration });
    objectives.push({ type: 'SCORE', target: 500 + Math.floor(difficultyValue * 15000) });
    objectives.push({ type: 'NO_BOMB', booleanTarget: true });
  } else if (cycle === 0) {
    objectives.push({ type: 'SCORE', target: 200 + Math.floor(difficultyValue * 8000) });
  } else if (cycle === 1) {
    objectives.push({ type: 'FRUIT_COUNT', target: 15 + Math.floor(difficultyValue * 100) });
  } else if (cycle === 2) {
    objectives.push({ type: 'COMBO', target: 5 + Math.floor(difficultyValue * 25) });
  } else if (cycle === 3) {
    objectives.push({ type: 'SCORE', target: 150 + Math.floor(difficultyValue * 6000) });
    if (i > 60) {
       objectives.push({ type: 'BOMB_AVOIDANCE', booleanTarget: true }); // must avoid bombs entirely
    }
  }

  // Calculate generic targets for stars
  let starBase = 100;
  if (objectives[0].type === 'SCORE') starBase = objectives[0].target;
  else if (objectives[0].type === 'FRUIT_COUNT') starBase = objectives[0].target * 15; // roughly 15 pts per fruit
  else if (objectives[0].type === 'COMBO') starBase = objectives[0].target * 50;
  else if (objectives[0].type === 'SURVIVAL_TIME') starBase = objectives[0].target * 30; // roughly 30 pts per sec
  
  // Some levels may have generic thresholds if logic above isn't perfect, 
  // but LevelMode should evaluate stars based on the exact thresholds configured here.
  const starThresholds = {
    one: Math.floor(starBase * 0.8),
    two: Math.floor(starBase * 1.2),
    three: Math.floor(starBase * 1.8),
  };

  levels['level_' + i] = {
    id: 'level_' + i,
    levelNumber: i,
    worldId: worldId,
    title: isBossLevel ? 'World ' + (worldIndex + 1) + ' Boss' : 'Level ' + i,
    duration: duration,
    difficultyTier: difficultyTier,
    difficultyValue: parseFloat(difficultyValue.toFixed(3)),
    spawnRateMs: spawnRateMs,
    fruitSpeedMultiplier: fruitSpeedMultiplier,
    fruitSizeMultiplier: fruitSizeMultiplier,
    bombChance: bombChance,
    specialFruitChance: specialFruitChance,
    maxSimultaneousFruits: maxSimultaneousFruits,
    spawnPattern: spawnPattern,
    objectives: objectives,
    starThresholds: starThresholds,
    rewards: {
      baseCoins: 10 + Math.floor(difficultyValue * 90)
    }
  };
}

const fileContent = "import type { LevelConfig } from './LevelTypes';\n\nexport const LevelRegistry: Record<string, LevelConfig> = " + JSON.stringify(levels, null, 2) + ";\n";

fs.writeFileSync(path.join(__dirname, '../src/core/progression/LevelRegistry.ts'), fileContent, 'utf-8');
console.log('Successfully generated 300 levels into LevelRegistry.ts');
