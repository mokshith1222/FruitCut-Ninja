import type { LevelConfig } from './LevelTypes';

export class DifficultyEngine {
  
  /**
   * Calculates a unified 0.0 - 1.0+ difficulty score based on the raw configurations.
   */
  static calculateTrueDifficulty(config: LevelConfig): number {
    // Spawn Rate Contribution (faster = harder)
    // 2000ms -> 0, 400ms -> 1.0
    const spawnRateFactor = Math.max(0, (2000 - config.spawnRateMs) / 1600);
    
    // Speed Factor (faster = harder)
    // 1.0x -> 0, 2.5x -> 1.0
    const speedFactor = Math.max(0, (config.fruitSpeedMultiplier - 1.0) / 1.5);
    
    // Size Factor (smaller = harder)
    // 1.2x -> 0, 0.5x -> 1.0
    const sizeFactor = Math.max(0, (1.2 - config.fruitSizeMultiplier) / 0.7);
    
    // Hazard Factor
    const hazardFactor = (config.bombChance * 2) + (config.specialFruitChance * 0.5);

    // Pattern complexity multiplier
    let patternMult = 1.0;
    if (config.spawnPattern === 'PAIR') patternMult = 1.2;
    if (config.spawnPattern === 'BURST') patternMult = 1.4;
    if (config.spawnPattern === 'CROSS') patternMult = 1.5;
    if (config.spawnPattern === 'MIXED') patternMult = 1.6;
    if (config.spawnPattern === 'RANDOM') patternMult = 1.3;

    // Base mechanic sum
    const baseDifficulty = ((spawnRateFactor * 0.3) + (speedFactor * 0.25) + (sizeFactor * 0.15) + (hazardFactor * 0.3)) * patternMult;

    // Time pressure modifier
    const timePressure = Math.max(1, 60 / config.duration);

    return baseDifficulty * timePressure;
  }

  static validateProgression(levels: Record<string, LevelConfig>): string[] {
    const warnings: string[] = [];
    const levelArray = Object.values(levels).sort((a, b) => a.levelNumber - b.levelNumber);

    for (let i = 1; i < levelArray.length; i++) {
      const prev = levelArray[i - 1];
      const curr = levelArray[i];

      const diffPrev = this.calculateTrueDifficulty(prev);
      const diffCurr = this.calculateTrueDifficulty(curr);

      // Check for suspicious difficulty spikes (e.g., > 30% jump)
      if (diffCurr > diffPrev * 1.3 && diffCurr - diffPrev > 0.1) {
         warnings.push(`Warning: Suspicious difficulty jump from Level ${prev.levelNumber} (${diffPrev.toFixed(2)}) to Level ${curr.levelNumber} (${diffCurr.toFixed(2)})`);
      }

      // Check impossible setups
      if (curr.spawnRateMs === 0) warnings.push(`Error: Level ${curr.levelNumber} has 0 spawn rate.`);
      if (curr.duration <= 0) warnings.push(`Error: Level ${curr.levelNumber} has invalid duration.`);
      if (curr.bombChance > 0.8) warnings.push(`Error: Level ${curr.levelNumber} has impossible bomb probability (${curr.bombChance})`);
      if (curr.fruitSpeedMultiplier > 3.0) warnings.push(`Error: Level ${curr.levelNumber} fruit speed is extremely high (${curr.fruitSpeedMultiplier})`);
      
      // Objective sanity
      if (curr.objectives.length === 0) warnings.push(`Error: Level ${curr.levelNumber} has no objectives.`);
    }

    return warnings;
  }

  static generateBalanceReport(levels: Record<string, LevelConfig>) {
    const levelArray = Object.values(levels).sort((a, b) => a.levelNumber - b.levelNumber);
    let worldStats: Record<string, { totalDiff: number, count: number, maxDiff: number }> = {};

    levelArray.forEach(l => {
      const d = this.calculateTrueDifficulty(l);
      if (!worldStats[l.worldId]) worldStats[l.worldId] = { totalDiff: 0, count: 0, maxDiff: 0 };
      
      worldStats[l.worldId].totalDiff += d;
      worldStats[l.worldId].count++;
      if (d > worldStats[l.worldId].maxDiff) worldStats[l.worldId].maxDiff = d;
    });

    console.log('--- BALANCE REPORT ---');
    Object.keys(worldStats).forEach(w => {
      const stat = worldStats[w];
      console.log(`${w.toUpperCase()}: Avg Difficulty ${(stat.totalDiff / stat.count).toFixed(2)} | Max Diff ${stat.maxDiff.toFixed(2)}`);
    });
  }
}
