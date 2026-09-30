import type { LevelConfig } from './LevelTypes';

export const LevelRegistry: Record<string, LevelConfig> = {
  "level_1": {
    "id": "level_1",
    "levelNumber": 1,
    "worldId": "world_1",
    "title": "Level 1",
    "duration": 30,
    "difficultyTier": 1,
    "difficultyValue": 0,
    "spawnRateMs": 1500,
    "fruitSpeedMultiplier": 1,
    "fruitSizeMultiplier": 1.2,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 15
      }
    ],
    "starThresholds": {
      "one": 180,
      "two": 270,
      "three": 405
    },
    "rewards": {
      "baseCoins": 10
    }
  },
  "level_2": {
    "id": "level_2",
    "levelNumber": 2,
    "worldId": "world_1",
    "title": "Level 2",
    "duration": 35,
    "difficultyTier": 1,
    "difficultyValue": 0.05,
    "spawnRateMs": 800,
    "fruitSpeedMultiplier": 1.05,
    "fruitSizeMultiplier": 1.2,
    "bombChance": 0,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "COMBO",
        "target": 3
      }
    ],
    "starThresholds": {
      "one": 150,
      "two": 250,
      "three": 380
    },
    "rewards": {
      "baseCoins": 15
    }
  },
  "level_3": {
    "id": "level_3",
    "levelNumber": 3,
    "worldId": "world_1",
    "title": "Level 3",
    "duration": 30,
    "difficultyTier": 1,
    "difficultyValue": 0.002,
    "spawnRateMs": 1497,
    "fruitSpeedMultiplier": 1,
    "fruitSizeMultiplier": 1.2,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 164
      }
    ],
    "starThresholds": {
      "one": 131,
      "two": 196,
      "three": 295
    },
    "rewards": {
      "baseCoins": 10
    }
  },
  "level_4": {
    "id": "level_4",
    "levelNumber": 4,
    "worldId": "world_1",
    "title": "Level 4",
    "duration": 30,
    "difficultyTier": 1,
    "difficultyValue": 0.004,
    "spawnRateMs": 1495,
    "fruitSpeedMultiplier": 1,
    "fruitSizeMultiplier": 1.2,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 231
      }
    ],
    "starThresholds": {
      "one": 184,
      "two": 277,
      "three": 415
    },
    "rewards": {
      "baseCoins": 10
    }
  },
  "level_5": {
    "id": "level_5",
    "levelNumber": 5,
    "worldId": "world_1",
    "title": "Level 5",
    "duration": 30,
    "difficultyTier": 1,
    "difficultyValue": 0.006,
    "spawnRateMs": 1493,
    "fruitSpeedMultiplier": 1.01,
    "fruitSizeMultiplier": 1.2,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 15
      }
    ],
    "starThresholds": {
      "one": 180,
      "two": 270,
      "three": 405
    },
    "rewards": {
      "baseCoins": 10
    }
  },
  "level_6": {
    "id": "level_6",
    "levelNumber": 6,
    "worldId": "world_1",
    "title": "Level 6",
    "duration": 30,
    "difficultyTier": 1,
    "difficultyValue": 0.007,
    "spawnRateMs": 1491,
    "fruitSpeedMultiplier": 1.01,
    "fruitSizeMultiplier": 1.2,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 5
      }
    ],
    "starThresholds": {
      "one": 200,
      "two": 300,
      "three": 450
    },
    "rewards": {
      "baseCoins": 10
    }
  },
  "level_7": {
    "id": "level_7",
    "levelNumber": 7,
    "worldId": "world_1",
    "title": "Level 7",
    "duration": 30,
    "difficultyTier": 1,
    "difficultyValue": 0.009,
    "spawnRateMs": 1489,
    "fruitSpeedMultiplier": 1.01,
    "fruitSizeMultiplier": 1.19,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 205
      }
    ],
    "starThresholds": {
      "one": 164,
      "two": 246,
      "three": 369
    },
    "rewards": {
      "baseCoins": 10
    }
  },
  "level_8": {
    "id": "level_8",
    "levelNumber": 8,
    "worldId": "world_1",
    "title": "Level 8",
    "duration": 30,
    "difficultyTier": 1,
    "difficultyValue": 0.011,
    "spawnRateMs": 1487,
    "fruitSpeedMultiplier": 1.01,
    "fruitSizeMultiplier": 1.19,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 288
      }
    ],
    "starThresholds": {
      "one": 230,
      "two": 345,
      "three": 518
    },
    "rewards": {
      "baseCoins": 10
    }
  },
  "level_9": {
    "id": "level_9",
    "levelNumber": 9,
    "worldId": "world_1",
    "title": "Level 9",
    "duration": 30,
    "difficultyTier": 1,
    "difficultyValue": 0.013,
    "spawnRateMs": 1485,
    "fruitSpeedMultiplier": 1.02,
    "fruitSizeMultiplier": 1.19,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 16
      }
    ],
    "starThresholds": {
      "one": 192,
      "two": 288,
      "three": 432
    },
    "rewards": {
      "baseCoins": 11
    }
  },
  "level_10": {
    "id": "level_10",
    "levelNumber": 10,
    "worldId": "world_1",
    "title": "Level 10",
    "duration": 30,
    "difficultyTier": 1,
    "difficultyValue": 0.015,
    "spawnRateMs": 1483,
    "fruitSpeedMultiplier": 1.02,
    "fruitSizeMultiplier": 1.19,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 5
      }
    ],
    "starThresholds": {
      "one": 200,
      "two": 300,
      "three": 450
    },
    "rewards": {
      "baseCoins": 11
    }
  },
  "level_11": {
    "id": "level_11",
    "levelNumber": 11,
    "worldId": "world_1",
    "title": "Level 11",
    "duration": 30,
    "difficultyTier": 1,
    "difficultyValue": 0.017,
    "spawnRateMs": 1481,
    "fruitSpeedMultiplier": 1.02,
    "fruitSizeMultiplier": 1.19,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 251
      }
    ],
    "starThresholds": {
      "one": 200,
      "two": 301,
      "three": 451
    },
    "rewards": {
      "baseCoins": 11
    }
  },
  "level_12": {
    "id": "level_12",
    "levelNumber": 12,
    "worldId": "world_1",
    "title": "Level 12",
    "duration": 30,
    "difficultyTier": 1,
    "difficultyValue": 0.019,
    "spawnRateMs": 1479,
    "fruitSpeedMultiplier": 1.02,
    "fruitSizeMultiplier": 1.19,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 352
      }
    ],
    "starThresholds": {
      "one": 281,
      "two": 422,
      "three": 633
    },
    "rewards": {
      "baseCoins": 11
    }
  },
  "level_13": {
    "id": "level_13",
    "levelNumber": 13,
    "worldId": "world_1",
    "title": "Level 13",
    "duration": 30,
    "difficultyTier": 1,
    "difficultyValue": 0.021,
    "spawnRateMs": 1476,
    "fruitSpeedMultiplier": 1.03,
    "fruitSizeMultiplier": 1.19,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 17
      }
    ],
    "starThresholds": {
      "one": 204,
      "two": 306,
      "three": 459
    },
    "rewards": {
      "baseCoins": 11
    }
  },
  "level_14": {
    "id": "level_14",
    "levelNumber": 14,
    "worldId": "world_1",
    "title": "Level 14",
    "duration": 31,
    "difficultyTier": 1,
    "difficultyValue": 0.023,
    "spawnRateMs": 1474,
    "fruitSpeedMultiplier": 1.03,
    "fruitSizeMultiplier": 1.19,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 5
      }
    ],
    "starThresholds": {
      "one": 200,
      "two": 300,
      "three": 450
    },
    "rewards": {
      "baseCoins": 12
    }
  },
  "level_15": {
    "id": "level_15",
    "levelNumber": 15,
    "worldId": "world_1",
    "title": "Level 15",
    "duration": 31,
    "difficultyTier": 1,
    "difficultyValue": 0.025,
    "spawnRateMs": 1472,
    "fruitSpeedMultiplier": 1.03,
    "fruitSizeMultiplier": 1.18,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 302
      }
    ],
    "starThresholds": {
      "one": 241,
      "two": 362,
      "three": 543
    },
    "rewards": {
      "baseCoins": 12
    }
  },
  "level_16": {
    "id": "level_16",
    "levelNumber": 16,
    "worldId": "world_1",
    "title": "Level 16",
    "duration": 31,
    "difficultyTier": 1,
    "difficultyValue": 0.028,
    "spawnRateMs": 1469,
    "fruitSpeedMultiplier": 1.03,
    "fruitSizeMultiplier": 1.18,
    "bombChance": 0,
    "specialFruitChance": 0.02,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 420
      }
    ],
    "starThresholds": {
      "one": 336,
      "two": 504,
      "three": 756
    },
    "rewards": {
      "baseCoins": 12
    }
  },
  "level_17": {
    "id": "level_17",
    "levelNumber": 17,
    "worldId": "world_1",
    "title": "Level 17",
    "duration": 31,
    "difficultyTier": 1,
    "difficultyValue": 0.03,
    "spawnRateMs": 1467,
    "fruitSpeedMultiplier": 1.04,
    "fruitSizeMultiplier": 1.18,
    "bombChance": 0,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 17
      }
    ],
    "starThresholds": {
      "one": 204,
      "two": 306,
      "three": 459
    },
    "rewards": {
      "baseCoins": 12
    }
  },
  "level_18": {
    "id": "level_18",
    "levelNumber": 18,
    "worldId": "world_1",
    "title": "Level 18",
    "duration": 31,
    "difficultyTier": 1,
    "difficultyValue": 0.032,
    "spawnRateMs": 1464,
    "fruitSpeedMultiplier": 1.04,
    "fruitSizeMultiplier": 1.18,
    "bombChance": 0,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 5
      }
    ],
    "starThresholds": {
      "one": 200,
      "two": 300,
      "three": 450
    },
    "rewards": {
      "baseCoins": 12
    }
  },
  "level_19": {
    "id": "level_19",
    "levelNumber": 19,
    "worldId": "world_1",
    "title": "Level 19",
    "duration": 31,
    "difficultyTier": 1,
    "difficultyValue": 0.034,
    "spawnRateMs": 1462,
    "fruitSpeedMultiplier": 1.04,
    "fruitSizeMultiplier": 1.18,
    "bombChance": 0,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 355
      }
    ],
    "starThresholds": {
      "one": 284,
      "two": 426,
      "three": 639
    },
    "rewards": {
      "baseCoins": 13
    }
  },
  "level_20": {
    "id": "level_20",
    "levelNumber": 20,
    "worldId": "world_1",
    "title": "Level 20",
    "duration": 31,
    "difficultyTier": 1,
    "difficultyValue": 0.037,
    "spawnRateMs": 1459,
    "fruitSpeedMultiplier": 1.04,
    "fruitSizeMultiplier": 1.18,
    "bombChance": 0,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 492
      }
    ],
    "starThresholds": {
      "one": 393,
      "two": 590,
      "three": 885
    },
    "rewards": {
      "baseCoins": 13
    }
  },
  "level_21": {
    "id": "level_21",
    "levelNumber": 21,
    "worldId": "world_1",
    "title": "Level 21",
    "duration": 31,
    "difficultyTier": 1,
    "difficultyValue": 0.039,
    "spawnRateMs": 1457,
    "fruitSpeedMultiplier": 1.05,
    "fruitSizeMultiplier": 1.18,
    "bombChance": 0,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 18
      }
    ],
    "starThresholds": {
      "one": 216,
      "two": 324,
      "three": 486
    },
    "rewards": {
      "baseCoins": 13
    }
  },
  "level_22": {
    "id": "level_22",
    "levelNumber": 22,
    "worldId": "world_1",
    "title": "Level 22",
    "duration": 31,
    "difficultyTier": 1,
    "difficultyValue": 0.041,
    "spawnRateMs": 1454,
    "fruitSpeedMultiplier": 1.05,
    "fruitSizeMultiplier": 1.18,
    "bombChance": 0,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 6
      }
    ],
    "starThresholds": {
      "one": 240,
      "two": 360,
      "three": 540
    },
    "rewards": {
      "baseCoins": 13
    }
  },
  "level_23": {
    "id": "level_23",
    "levelNumber": 23,
    "worldId": "world_1",
    "title": "Level 23",
    "duration": 31,
    "difficultyTier": 1,
    "difficultyValue": 0.044,
    "spawnRateMs": 1451,
    "fruitSpeedMultiplier": 1.05,
    "fruitSizeMultiplier": 1.17,
    "bombChance": 0,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 411
      }
    ],
    "starThresholds": {
      "one": 328,
      "two": 493,
      "three": 739
    },
    "rewards": {
      "baseCoins": 13
    }
  },
  "level_24": {
    "id": "level_24",
    "levelNumber": 24,
    "worldId": "world_1",
    "title": "Level 24",
    "duration": 32,
    "difficultyTier": 1,
    "difficultyValue": 0.046,
    "spawnRateMs": 1449,
    "fruitSpeedMultiplier": 1.06,
    "fruitSizeMultiplier": 1.17,
    "bombChance": 0,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 568
      }
    ],
    "starThresholds": {
      "one": 454,
      "two": 681,
      "three": 1022
    },
    "rewards": {
      "baseCoins": 14
    }
  },
  "level_25": {
    "id": "level_25",
    "levelNumber": 25,
    "worldId": "world_1",
    "title": "Level 25",
    "duration": 32,
    "difficultyTier": 1,
    "difficultyValue": 0.048,
    "spawnRateMs": 1446,
    "fruitSpeedMultiplier": 1.06,
    "fruitSizeMultiplier": 1.17,
    "bombChance": 0,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 19
      }
    ],
    "starThresholds": {
      "one": 228,
      "two": 342,
      "three": 513
    },
    "rewards": {
      "baseCoins": 14
    }
  },
  "level_26": {
    "id": "level_26",
    "levelNumber": 26,
    "worldId": "world_1",
    "title": "Level 26",
    "duration": 32,
    "difficultyTier": 1,
    "difficultyValue": 0.051,
    "spawnRateMs": 1444,
    "fruitSpeedMultiplier": 1.06,
    "fruitSizeMultiplier": 1.17,
    "bombChance": 0,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 6
      }
    ],
    "starThresholds": {
      "one": 240,
      "two": 360,
      "three": 540
    },
    "rewards": {
      "baseCoins": 14
    }
  },
  "level_27": {
    "id": "level_27",
    "levelNumber": 27,
    "worldId": "world_1",
    "title": "Level 27",
    "duration": 32,
    "difficultyTier": 1,
    "difficultyValue": 0.053,
    "spawnRateMs": 1441,
    "fruitSpeedMultiplier": 1.06,
    "fruitSizeMultiplier": 1.17,
    "bombChance": 0,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 470
      }
    ],
    "starThresholds": {
      "one": 376,
      "two": 564,
      "three": 846
    },
    "rewards": {
      "baseCoins": 14
    }
  },
  "level_28": {
    "id": "level_28",
    "levelNumber": 28,
    "worldId": "world_1",
    "title": "Level 28",
    "duration": 32,
    "difficultyTier": 1,
    "difficultyValue": 0.056,
    "spawnRateMs": 1438,
    "fruitSpeedMultiplier": 1.07,
    "fruitSizeMultiplier": 1.17,
    "bombChance": 0,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 646
      }
    ],
    "starThresholds": {
      "one": 516,
      "two": 775,
      "three": 1162
    },
    "rewards": {
      "baseCoins": 15
    }
  },
  "level_29": {
    "id": "level_29",
    "levelNumber": 29,
    "worldId": "world_1",
    "title": "Level 29",
    "duration": 32,
    "difficultyTier": 1,
    "difficultyValue": 0.058,
    "spawnRateMs": 1435,
    "fruitSpeedMultiplier": 1.07,
    "fruitSizeMultiplier": 1.17,
    "bombChance": 0,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 20
      }
    ],
    "starThresholds": {
      "one": 240,
      "two": 360,
      "three": 540
    },
    "rewards": {
      "baseCoins": 15
    }
  },
  "level_30": {
    "id": "level_30",
    "levelNumber": 30,
    "worldId": "world_1",
    "title": "World 1 Boss",
    "duration": 61,
    "difficultyTier": 1,
    "difficultyValue": 0.061,
    "spawnRateMs": 1433,
    "fruitSpeedMultiplier": 1.07,
    "fruitSizeMultiplier": 1.16,
    "bombChance": 0,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SURVIVAL_TIME",
        "target": 61
      },
      {
        "type": "SCORE",
        "target": 1412
      },
      {
        "type": "NO_BOMB",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1464,
      "two": 2196,
      "three": 3294
    },
    "rewards": {
      "baseCoins": 15
    }
  },
  "level_31": {
    "id": "level_31",
    "levelNumber": 31,
    "worldId": "world_2",
    "title": "Level 31",
    "duration": 32,
    "difficultyTier": 1,
    "difficultyValue": 0.063,
    "spawnRateMs": 1430,
    "fruitSpeedMultiplier": 1.08,
    "fruitSizeMultiplier": 1.16,
    "bombChance": 0.08,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 530
      }
    ],
    "starThresholds": {
      "one": 424,
      "two": 636,
      "three": 954
    },
    "rewards": {
      "baseCoins": 15
    }
  },
  "level_32": {
    "id": "level_32",
    "levelNumber": 32,
    "worldId": "world_2",
    "title": "Level 32",
    "duration": 32,
    "difficultyTier": 1,
    "difficultyValue": 0.066,
    "spawnRateMs": 1427,
    "fruitSpeedMultiplier": 1.08,
    "fruitSizeMultiplier": 1.16,
    "bombChance": 0.08,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 727
      }
    ],
    "starThresholds": {
      "one": 581,
      "two": 872,
      "three": 1308
    },
    "rewards": {
      "baseCoins": 15
    }
  },
  "level_33": {
    "id": "level_33",
    "levelNumber": 33,
    "worldId": "world_2",
    "title": "Level 33",
    "duration": 33,
    "difficultyTier": 1,
    "difficultyValue": 0.068,
    "spawnRateMs": 1424,
    "fruitSpeedMultiplier": 1.08,
    "fruitSizeMultiplier": 1.16,
    "bombChance": 0.08,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 21
      }
    ],
    "starThresholds": {
      "one": 252,
      "two": 378,
      "three": 567
    },
    "rewards": {
      "baseCoins": 16
    }
  },
  "level_34": {
    "id": "level_34",
    "levelNumber": 34,
    "worldId": "world_2",
    "title": "Level 34",
    "duration": 33,
    "difficultyTier": 1,
    "difficultyValue": 0.071,
    "spawnRateMs": 1421,
    "fruitSpeedMultiplier": 1.09,
    "fruitSizeMultiplier": 1.16,
    "bombChance": 0.08,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 6
      }
    ],
    "starThresholds": {
      "one": 240,
      "two": 360,
      "three": 540
    },
    "rewards": {
      "baseCoins": 16
    }
  },
  "level_35": {
    "id": "level_35",
    "levelNumber": 35,
    "worldId": "world_2",
    "title": "Level 35",
    "duration": 33,
    "difficultyTier": 1,
    "difficultyValue": 0.074,
    "spawnRateMs": 1419,
    "fruitSpeedMultiplier": 1.09,
    "fruitSizeMultiplier": 1.16,
    "bombChance": 0.08,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 591
      }
    ],
    "starThresholds": {
      "one": 472,
      "two": 709,
      "three": 1063
    },
    "rewards": {
      "baseCoins": 16
    }
  },
  "level_36": {
    "id": "level_36",
    "levelNumber": 36,
    "worldId": "world_2",
    "title": "Level 36",
    "duration": 33,
    "difficultyTier": 1,
    "difficultyValue": 0.076,
    "spawnRateMs": 1416,
    "fruitSpeedMultiplier": 1.09,
    "fruitSizeMultiplier": 1.15,
    "bombChance": 0.08,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 809
      }
    ],
    "starThresholds": {
      "one": 647,
      "two": 970,
      "three": 1456
    },
    "rewards": {
      "baseCoins": 16
    }
  },
  "level_37": {
    "id": "level_37",
    "levelNumber": 37,
    "worldId": "world_2",
    "title": "Level 37",
    "duration": 33,
    "difficultyTier": 1,
    "difficultyValue": 0.079,
    "spawnRateMs": 1413,
    "fruitSpeedMultiplier": 1.09,
    "fruitSizeMultiplier": 1.15,
    "bombChance": 0.09,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 22
      }
    ],
    "starThresholds": {
      "one": 264,
      "two": 396,
      "three": 594
    },
    "rewards": {
      "baseCoins": 17
    }
  },
  "level_38": {
    "id": "level_38",
    "levelNumber": 38,
    "worldId": "world_2",
    "title": "Level 38",
    "duration": 33,
    "difficultyTier": 1,
    "difficultyValue": 0.081,
    "spawnRateMs": 1410,
    "fruitSpeedMultiplier": 1.1,
    "fruitSizeMultiplier": 1.15,
    "bombChance": 0.09,
    "specialFruitChance": 0.03,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 7
      }
    ],
    "starThresholds": {
      "one": 280,
      "two": 420,
      "three": 630
    },
    "rewards": {
      "baseCoins": 17
    }
  },
  "level_39": {
    "id": "level_39",
    "levelNumber": 39,
    "worldId": "world_2",
    "title": "Level 39",
    "duration": 33,
    "difficultyTier": 1,
    "difficultyValue": 0.084,
    "spawnRateMs": 1407,
    "fruitSpeedMultiplier": 1.1,
    "fruitSizeMultiplier": 1.15,
    "bombChance": 0.09,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 654
      }
    ],
    "starThresholds": {
      "one": 523,
      "two": 784,
      "three": 1177
    },
    "rewards": {
      "baseCoins": 17
    }
  },
  "level_40": {
    "id": "level_40",
    "levelNumber": 40,
    "worldId": "world_2",
    "title": "Level 40",
    "duration": 33,
    "difficultyTier": 1,
    "difficultyValue": 0.087,
    "spawnRateMs": 1404,
    "fruitSpeedMultiplier": 1.1,
    "fruitSizeMultiplier": 1.15,
    "bombChance": 0.09,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 894
      }
    ],
    "starThresholds": {
      "one": 715,
      "two": 1072,
      "three": 1609
    },
    "rewards": {
      "baseCoins": 17
    }
  },
  "level_41": {
    "id": "level_41",
    "levelNumber": 41,
    "worldId": "world_2",
    "title": "Level 41",
    "duration": 34,
    "difficultyTier": 1,
    "difficultyValue": 0.089,
    "spawnRateMs": 1401,
    "fruitSpeedMultiplier": 1.11,
    "fruitSizeMultiplier": 1.15,
    "bombChance": 0.09,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 23
      }
    ],
    "starThresholds": {
      "one": 276,
      "two": 414,
      "three": 621
    },
    "rewards": {
      "baseCoins": 18
    }
  },
  "level_42": {
    "id": "level_42",
    "levelNumber": 42,
    "worldId": "world_2",
    "title": "Level 42",
    "duration": 34,
    "difficultyTier": 1,
    "difficultyValue": 0.092,
    "spawnRateMs": 1398,
    "fruitSpeedMultiplier": 1.11,
    "fruitSizeMultiplier": 1.14,
    "bombChance": 0.09,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 7
      }
    ],
    "starThresholds": {
      "one": 280,
      "two": 420,
      "three": 630
    },
    "rewards": {
      "baseCoins": 18
    }
  },
  "level_43": {
    "id": "level_43",
    "levelNumber": 43,
    "worldId": "world_2",
    "title": "Level 43",
    "duration": 34,
    "difficultyTier": 1,
    "difficultyValue": 0.095,
    "spawnRateMs": 1395,
    "fruitSpeedMultiplier": 1.11,
    "fruitSizeMultiplier": 1.14,
    "bombChance": 0.09,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 719
      }
    ],
    "starThresholds": {
      "one": 575,
      "two": 862,
      "three": 1294
    },
    "rewards": {
      "baseCoins": 18
    }
  },
  "level_44": {
    "id": "level_44",
    "levelNumber": 44,
    "worldId": "world_2",
    "title": "Level 44",
    "duration": 34,
    "difficultyTier": 1,
    "difficultyValue": 0.098,
    "spawnRateMs": 1392,
    "fruitSpeedMultiplier": 1.12,
    "fruitSizeMultiplier": 1.14,
    "bombChance": 0.09,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 980
      }
    ],
    "starThresholds": {
      "one": 784,
      "two": 1176,
      "three": 1764
    },
    "rewards": {
      "baseCoins": 18
    }
  },
  "level_45": {
    "id": "level_45",
    "levelNumber": 45,
    "worldId": "world_2",
    "title": "Level 45",
    "duration": 34,
    "difficultyTier": 1,
    "difficultyValue": 0.1,
    "spawnRateMs": 1389,
    "fruitSpeedMultiplier": 1.12,
    "fruitSizeMultiplier": 1.14,
    "bombChance": 0.1,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 25
      }
    ],
    "starThresholds": {
      "one": 300,
      "two": 450,
      "three": 675
    },
    "rewards": {
      "baseCoins": 19
    }
  },
  "level_46": {
    "id": "level_46",
    "levelNumber": 46,
    "worldId": "world_2",
    "title": "Level 46",
    "duration": 34,
    "difficultyTier": 1,
    "difficultyValue": 0.103,
    "spawnRateMs": 1386,
    "fruitSpeedMultiplier": 1.12,
    "fruitSizeMultiplier": 1.14,
    "bombChance": 0.1,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 7
      }
    ],
    "starThresholds": {
      "one": 280,
      "two": 420,
      "three": 630
    },
    "rewards": {
      "baseCoins": 19
    }
  },
  "level_47": {
    "id": "level_47",
    "levelNumber": 47,
    "worldId": "world_2",
    "title": "Level 47",
    "duration": 34,
    "difficultyTier": 1,
    "difficultyValue": 0.106,
    "spawnRateMs": 1383,
    "fruitSpeedMultiplier": 1.13,
    "fruitSizeMultiplier": 1.14,
    "bombChance": 0.1,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 784
      }
    ],
    "starThresholds": {
      "one": 627,
      "two": 940,
      "three": 1411
    },
    "rewards": {
      "baseCoins": 19
    }
  },
  "level_48": {
    "id": "level_48",
    "levelNumber": 48,
    "worldId": "world_2",
    "title": "Level 48",
    "duration": 34,
    "difficultyTier": 1,
    "difficultyValue": 0.109,
    "spawnRateMs": 1380,
    "fruitSpeedMultiplier": 1.13,
    "fruitSizeMultiplier": 1.13,
    "bombChance": 0.1,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1068
      }
    ],
    "starThresholds": {
      "one": 854,
      "two": 1281,
      "three": 1922
    },
    "rewards": {
      "baseCoins": 19
    }
  },
  "level_49": {
    "id": "level_49",
    "levelNumber": 49,
    "worldId": "world_2",
    "title": "Level 49",
    "duration": 35,
    "difficultyTier": 2,
    "difficultyValue": 0.111,
    "spawnRateMs": 1377,
    "fruitSpeedMultiplier": 1.13,
    "fruitSizeMultiplier": 1.13,
    "bombChance": 0.1,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 26
      }
    ],
    "starThresholds": {
      "one": 312,
      "two": 468,
      "three": 702
    },
    "rewards": {
      "baseCoins": 20
    }
  },
  "level_50": {
    "id": "level_50",
    "levelNumber": 50,
    "worldId": "world_2",
    "title": "Level 50",
    "duration": 35,
    "difficultyTier": 2,
    "difficultyValue": 0.114,
    "spawnRateMs": 1374,
    "fruitSpeedMultiplier": 1.14,
    "fruitSizeMultiplier": 1.13,
    "bombChance": 0.1,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 7
      }
    ],
    "starThresholds": {
      "one": 280,
      "two": 420,
      "three": 630
    },
    "rewards": {
      "baseCoins": 20
    }
  },
  "level_51": {
    "id": "level_51",
    "levelNumber": 51,
    "worldId": "world_2",
    "title": "Level 51",
    "duration": 35,
    "difficultyTier": 2,
    "difficultyValue": 0.117,
    "spawnRateMs": 1371,
    "fruitSpeedMultiplier": 1.14,
    "fruitSizeMultiplier": 1.13,
    "bombChance": 0.1,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 851
      }
    ],
    "starThresholds": {
      "one": 680,
      "two": 1021,
      "three": 1531
    },
    "rewards": {
      "baseCoins": 20
    }
  },
  "level_52": {
    "id": "level_52",
    "levelNumber": 52,
    "worldId": "world_2",
    "title": "Level 52",
    "duration": 35,
    "difficultyTier": 2,
    "difficultyValue": 0.12,
    "spawnRateMs": 1368,
    "fruitSpeedMultiplier": 1.14,
    "fruitSizeMultiplier": 1.13,
    "bombChance": 0.1,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1158
      }
    ],
    "starThresholds": {
      "one": 926,
      "two": 1389,
      "three": 2084
    },
    "rewards": {
      "baseCoins": 20
    }
  },
  "level_53": {
    "id": "level_53",
    "levelNumber": 53,
    "worldId": "world_2",
    "title": "Level 53",
    "duration": 35,
    "difficultyTier": 2,
    "difficultyValue": 0.123,
    "spawnRateMs": 1365,
    "fruitSpeedMultiplier": 1.15,
    "fruitSizeMultiplier": 1.13,
    "bombChance": 0.11,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 27
      }
    ],
    "starThresholds": {
      "one": 324,
      "two": 486,
      "three": 729
    },
    "rewards": {
      "baseCoins": 21
    }
  },
  "level_54": {
    "id": "level_54",
    "levelNumber": 54,
    "worldId": "world_2",
    "title": "Level 54",
    "duration": 35,
    "difficultyTier": 2,
    "difficultyValue": 0.125,
    "spawnRateMs": 1362,
    "fruitSpeedMultiplier": 1.15,
    "fruitSizeMultiplier": 1.12,
    "bombChance": 0.11,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 8
      }
    ],
    "starThresholds": {
      "one": 320,
      "two": 480,
      "three": 720
    },
    "rewards": {
      "baseCoins": 21
    }
  },
  "level_55": {
    "id": "level_55",
    "levelNumber": 55,
    "worldId": "world_2",
    "title": "Level 55",
    "duration": 35,
    "difficultyTier": 2,
    "difficultyValue": 0.128,
    "spawnRateMs": 1358,
    "fruitSpeedMultiplier": 1.15,
    "fruitSizeMultiplier": 1.12,
    "bombChance": 0.11,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 919
      }
    ],
    "starThresholds": {
      "one": 735,
      "two": 1102,
      "three": 1654
    },
    "rewards": {
      "baseCoins": 21
    }
  },
  "level_56": {
    "id": "level_56",
    "levelNumber": 56,
    "worldId": "world_2",
    "title": "Level 56",
    "duration": 35,
    "difficultyTier": 2,
    "difficultyValue": 0.131,
    "spawnRateMs": 1355,
    "fruitSpeedMultiplier": 1.16,
    "fruitSizeMultiplier": 1.12,
    "bombChance": 0.11,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1248
      }
    ],
    "starThresholds": {
      "one": 998,
      "two": 1497,
      "three": 2246
    },
    "rewards": {
      "baseCoins": 21
    }
  },
  "level_57": {
    "id": "level_57",
    "levelNumber": 57,
    "worldId": "world_2",
    "title": "Level 57",
    "duration": 36,
    "difficultyTier": 2,
    "difficultyValue": 0.134,
    "spawnRateMs": 1352,
    "fruitSpeedMultiplier": 1.16,
    "fruitSizeMultiplier": 1.12,
    "bombChance": 0.11,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 28
      }
    ],
    "starThresholds": {
      "one": 336,
      "two": 504,
      "three": 756
    },
    "rewards": {
      "baseCoins": 22
    }
  },
  "level_58": {
    "id": "level_58",
    "levelNumber": 58,
    "worldId": "world_2",
    "title": "Level 58",
    "duration": 36,
    "difficultyTier": 2,
    "difficultyValue": 0.137,
    "spawnRateMs": 1349,
    "fruitSpeedMultiplier": 1.16,
    "fruitSizeMultiplier": 1.12,
    "bombChance": 0.11,
    "specialFruitChance": 0.04,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 8
      }
    ],
    "starThresholds": {
      "one": 320,
      "two": 480,
      "three": 720
    },
    "rewards": {
      "baseCoins": 22
    }
  },
  "level_59": {
    "id": "level_59",
    "levelNumber": 59,
    "worldId": "world_2",
    "title": "Level 59",
    "duration": 36,
    "difficultyTier": 2,
    "difficultyValue": 0.14,
    "spawnRateMs": 1346,
    "fruitSpeedMultiplier": 1.17,
    "fruitSizeMultiplier": 1.12,
    "bombChance": 0.11,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 988
      }
    ],
    "starThresholds": {
      "one": 790,
      "two": 1185,
      "three": 1778
    },
    "rewards": {
      "baseCoins": 22
    }
  },
  "level_60": {
    "id": "level_60",
    "levelNumber": 60,
    "worldId": "world_2",
    "title": "World 2 Boss",
    "duration": 64,
    "difficultyTier": 2,
    "difficultyValue": 0.143,
    "spawnRateMs": 1343,
    "fruitSpeedMultiplier": 1.17,
    "fruitSizeMultiplier": 1.11,
    "bombChance": 0.11,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SURVIVAL_TIME",
        "target": 64
      },
      {
        "type": "SCORE",
        "target": 2639
      },
      {
        "type": "NO_BOMB",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1536,
      "two": 2304,
      "three": 3456
    },
    "rewards": {
      "baseCoins": 22
    }
  },
  "level_61": {
    "id": "level_61",
    "levelNumber": 61,
    "worldId": "world_3",
    "title": "Level 61",
    "duration": 36,
    "difficultyTier": 2,
    "difficultyValue": 0.146,
    "spawnRateMs": 1339,
    "fruitSpeedMultiplier": 1.17,
    "fruitSizeMultiplier": 1.11,
    "bombChance": 0.12,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 29
      }
    ],
    "starThresholds": {
      "one": 348,
      "two": 522,
      "three": 783
    },
    "rewards": {
      "baseCoins": 23
    }
  },
  "level_62": {
    "id": "level_62",
    "levelNumber": 62,
    "worldId": "world_3",
    "title": "Level 62",
    "duration": 36,
    "difficultyTier": 2,
    "difficultyValue": 0.148,
    "spawnRateMs": 1336,
    "fruitSpeedMultiplier": 1.18,
    "fruitSizeMultiplier": 1.11,
    "bombChance": 0.12,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 8
      }
    ],
    "starThresholds": {
      "one": 320,
      "two": 480,
      "three": 720
    },
    "rewards": {
      "baseCoins": 23
    }
  },
  "level_63": {
    "id": "level_63",
    "levelNumber": 63,
    "worldId": "world_3",
    "title": "Level 63",
    "duration": 36,
    "difficultyTier": 2,
    "difficultyValue": 0.151,
    "spawnRateMs": 1333,
    "fruitSpeedMultiplier": 1.18,
    "fruitSizeMultiplier": 1.11,
    "bombChance": 0.12,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1058
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 846,
      "two": 1269,
      "three": 1904
    },
    "rewards": {
      "baseCoins": 23
    }
  },
  "level_64": {
    "id": "level_64",
    "levelNumber": 64,
    "worldId": "world_3",
    "title": "Level 64",
    "duration": 36,
    "difficultyTier": 2,
    "difficultyValue": 0.154,
    "spawnRateMs": 1330,
    "fruitSpeedMultiplier": 1.19,
    "fruitSizeMultiplier": 1.11,
    "bombChance": 0.12,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1434
      }
    ],
    "starThresholds": {
      "one": 1147,
      "two": 1720,
      "three": 2581
    },
    "rewards": {
      "baseCoins": 23
    }
  },
  "level_65": {
    "id": "level_65",
    "levelNumber": 65,
    "worldId": "world_3",
    "title": "Level 65",
    "duration": 37,
    "difficultyTier": 2,
    "difficultyValue": 0.157,
    "spawnRateMs": 1327,
    "fruitSpeedMultiplier": 1.19,
    "fruitSizeMultiplier": 1.11,
    "bombChance": 0.12,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 30
      }
    ],
    "starThresholds": {
      "one": 360,
      "two": 540,
      "three": 810
    },
    "rewards": {
      "baseCoins": 24
    }
  },
  "level_66": {
    "id": "level_66",
    "levelNumber": 66,
    "worldId": "world_3",
    "title": "Level 66",
    "duration": 37,
    "difficultyTier": 2,
    "difficultyValue": 0.16,
    "spawnRateMs": 1323,
    "fruitSpeedMultiplier": 1.19,
    "fruitSizeMultiplier": 1.1,
    "bombChance": 0.12,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 9
      }
    ],
    "starThresholds": {
      "one": 360,
      "two": 540,
      "three": 810
    },
    "rewards": {
      "baseCoins": 24
    }
  },
  "level_67": {
    "id": "level_67",
    "levelNumber": 67,
    "worldId": "world_3",
    "title": "Level 67",
    "duration": 37,
    "difficultyTier": 2,
    "difficultyValue": 0.163,
    "spawnRateMs": 1320,
    "fruitSpeedMultiplier": 1.2,
    "fruitSizeMultiplier": 1.1,
    "bombChance": 0.12,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1129
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 903,
      "two": 1354,
      "three": 2032
    },
    "rewards": {
      "baseCoins": 24
    }
  },
  "level_68": {
    "id": "level_68",
    "levelNumber": 68,
    "worldId": "world_3",
    "title": "Level 68",
    "duration": 37,
    "difficultyTier": 2,
    "difficultyValue": 0.166,
    "spawnRateMs": 1317,
    "fruitSpeedMultiplier": 1.2,
    "fruitSizeMultiplier": 1.1,
    "bombChance": 0.12,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 1,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1529
      }
    ],
    "starThresholds": {
      "one": 1223,
      "two": 1834,
      "three": 2752
    },
    "rewards": {
      "baseCoins": 24
    }
  },
  "level_69": {
    "id": "level_69",
    "levelNumber": 69,
    "worldId": "world_3",
    "title": "Level 69",
    "duration": 37,
    "difficultyTier": 2,
    "difficultyValue": 0.169,
    "spawnRateMs": 1313,
    "fruitSpeedMultiplier": 1.2,
    "fruitSizeMultiplier": 1.1,
    "bombChance": 0.13,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 31
      }
    ],
    "starThresholds": {
      "one": 372,
      "two": 558,
      "three": 837
    },
    "rewards": {
      "baseCoins": 25
    }
  },
  "level_70": {
    "id": "level_70",
    "levelNumber": 70,
    "worldId": "world_3",
    "title": "Level 70",
    "duration": 37,
    "difficultyTier": 2,
    "difficultyValue": 0.172,
    "spawnRateMs": 1310,
    "fruitSpeedMultiplier": 1.21,
    "fruitSizeMultiplier": 1.1,
    "bombChance": 0.13,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 9
      }
    ],
    "starThresholds": {
      "one": 360,
      "two": 540,
      "three": 810
    },
    "rewards": {
      "baseCoins": 25
    }
  },
  "level_71": {
    "id": "level_71",
    "levelNumber": 71,
    "worldId": "world_3",
    "title": "Level 71",
    "duration": 37,
    "difficultyTier": 2,
    "difficultyValue": 0.175,
    "spawnRateMs": 1307,
    "fruitSpeedMultiplier": 1.21,
    "fruitSizeMultiplier": 1.09,
    "bombChance": 0.13,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1200
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 960,
      "two": 1440,
      "three": 2160
    },
    "rewards": {
      "baseCoins": 25
    }
  },
  "level_72": {
    "id": "level_72",
    "levelNumber": 72,
    "worldId": "world_3",
    "title": "Level 72",
    "duration": 38,
    "difficultyTier": 2,
    "difficultyValue": 0.178,
    "spawnRateMs": 1304,
    "fruitSpeedMultiplier": 1.21,
    "fruitSizeMultiplier": 1.09,
    "bombChance": 0.13,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1624
      }
    ],
    "starThresholds": {
      "one": 1299,
      "two": 1948,
      "three": 2923
    },
    "rewards": {
      "baseCoins": 26
    }
  },
  "level_73": {
    "id": "level_73",
    "levelNumber": 73,
    "worldId": "world_3",
    "title": "Level 73",
    "duration": 38,
    "difficultyTier": 2,
    "difficultyValue": 0.181,
    "spawnRateMs": 1300,
    "fruitSpeedMultiplier": 1.22,
    "fruitSizeMultiplier": 1.09,
    "bombChance": 0.13,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 33
      }
    ],
    "starThresholds": {
      "one": 396,
      "two": 594,
      "three": 891
    },
    "rewards": {
      "baseCoins": 26
    }
  },
  "level_74": {
    "id": "level_74",
    "levelNumber": 74,
    "worldId": "world_3",
    "title": "Level 74",
    "duration": 38,
    "difficultyTier": 2,
    "difficultyValue": 0.184,
    "spawnRateMs": 1297,
    "fruitSpeedMultiplier": 1.22,
    "fruitSizeMultiplier": 1.09,
    "bombChance": 0.13,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 9
      }
    ],
    "starThresholds": {
      "one": 360,
      "two": 540,
      "three": 810
    },
    "rewards": {
      "baseCoins": 26
    }
  },
  "level_75": {
    "id": "level_75",
    "levelNumber": 75,
    "worldId": "world_3",
    "title": "Level 75",
    "duration": 38,
    "difficultyTier": 2,
    "difficultyValue": 0.187,
    "spawnRateMs": 1294,
    "fruitSpeedMultiplier": 1.22,
    "fruitSizeMultiplier": 1.09,
    "bombChance": 0.13,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1273
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1018,
      "two": 1527,
      "three": 2291
    },
    "rewards": {
      "baseCoins": 26
    }
  },
  "level_76": {
    "id": "level_76",
    "levelNumber": 76,
    "worldId": "world_3",
    "title": "Level 76",
    "duration": 38,
    "difficultyTier": 2,
    "difficultyValue": 0.19,
    "spawnRateMs": 1290,
    "fruitSpeedMultiplier": 1.23,
    "fruitSizeMultiplier": 1.09,
    "bombChance": 0.14,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1721
      }
    ],
    "starThresholds": {
      "one": 1376,
      "two": 2065,
      "three": 3097
    },
    "rewards": {
      "baseCoins": 27
    }
  },
  "level_77": {
    "id": "level_77",
    "levelNumber": 77,
    "worldId": "world_3",
    "title": "Level 77",
    "duration": 38,
    "difficultyTier": 2,
    "difficultyValue": 0.193,
    "spawnRateMs": 1287,
    "fruitSpeedMultiplier": 1.23,
    "fruitSizeMultiplier": 1.08,
    "bombChance": 0.14,
    "specialFruitChance": 0.05,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 34
      }
    ],
    "starThresholds": {
      "one": 408,
      "two": 612,
      "three": 918
    },
    "rewards": {
      "baseCoins": 27
    }
  },
  "level_78": {
    "id": "level_78",
    "levelNumber": 78,
    "worldId": "world_3",
    "title": "Level 78",
    "duration": 38,
    "difficultyTier": 2,
    "difficultyValue": 0.196,
    "spawnRateMs": 1284,
    "fruitSpeedMultiplier": 1.24,
    "fruitSizeMultiplier": 1.08,
    "bombChance": 0.14,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 9
      }
    ],
    "starThresholds": {
      "one": 360,
      "two": 540,
      "three": 810
    },
    "rewards": {
      "baseCoins": 27
    }
  },
  "level_79": {
    "id": "level_79",
    "levelNumber": 79,
    "worldId": "world_3",
    "title": "Level 79",
    "duration": 38,
    "difficultyTier": 2,
    "difficultyValue": 0.199,
    "spawnRateMs": 1280,
    "fruitSpeedMultiplier": 1.24,
    "fruitSizeMultiplier": 1.08,
    "bombChance": 0.14,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1346
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1076,
      "two": 1615,
      "three": 2422
    },
    "rewards": {
      "baseCoins": 27
    }
  },
  "level_80": {
    "id": "level_80",
    "levelNumber": 80,
    "worldId": "world_3",
    "title": "Level 80",
    "duration": 39,
    "difficultyTier": 2,
    "difficultyValue": 0.202,
    "spawnRateMs": 1277,
    "fruitSpeedMultiplier": 1.24,
    "fruitSizeMultiplier": 1.08,
    "bombChance": 0.14,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1819
      }
    ],
    "starThresholds": {
      "one": 1455,
      "two": 2182,
      "three": 3274
    },
    "rewards": {
      "baseCoins": 28
    }
  },
  "level_81": {
    "id": "level_81",
    "levelNumber": 81,
    "worldId": "world_3",
    "title": "Level 81",
    "duration": 39,
    "difficultyTier": 2,
    "difficultyValue": 0.206,
    "spawnRateMs": 1273,
    "fruitSpeedMultiplier": 1.25,
    "fruitSizeMultiplier": 1.08,
    "bombChance": 0.14,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 35
      }
    ],
    "starThresholds": {
      "one": 420,
      "two": 630,
      "three": 945
    },
    "rewards": {
      "baseCoins": 28
    }
  },
  "level_82": {
    "id": "level_82",
    "levelNumber": 82,
    "worldId": "world_3",
    "title": "Level 82",
    "duration": 39,
    "difficultyTier": 2,
    "difficultyValue": 0.209,
    "spawnRateMs": 1270,
    "fruitSpeedMultiplier": 1.25,
    "fruitSizeMultiplier": 1.07,
    "bombChance": 0.14,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 10
      }
    ],
    "starThresholds": {
      "one": 400,
      "two": 600,
      "three": 900
    },
    "rewards": {
      "baseCoins": 28
    }
  },
  "level_83": {
    "id": "level_83",
    "levelNumber": 83,
    "worldId": "world_3",
    "title": "Level 83",
    "duration": 39,
    "difficultyTier": 2,
    "difficultyValue": 0.212,
    "spawnRateMs": 1267,
    "fruitSpeedMultiplier": 1.25,
    "fruitSizeMultiplier": 1.07,
    "bombChance": 0.15,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1420
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1136,
      "two": 1704,
      "three": 2556
    },
    "rewards": {
      "baseCoins": 29
    }
  },
  "level_84": {
    "id": "level_84",
    "levelNumber": 84,
    "worldId": "world_3",
    "title": "Level 84",
    "duration": 39,
    "difficultyTier": 2,
    "difficultyValue": 0.215,
    "spawnRateMs": 1263,
    "fruitSpeedMultiplier": 1.26,
    "fruitSizeMultiplier": 1.07,
    "bombChance": 0.15,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1918
      }
    ],
    "starThresholds": {
      "one": 1534,
      "two": 2301,
      "three": 3452
    },
    "rewards": {
      "baseCoins": 29
    }
  },
  "level_85": {
    "id": "level_85",
    "levelNumber": 85,
    "worldId": "world_3",
    "title": "Level 85",
    "duration": 39,
    "difficultyTier": 2,
    "difficultyValue": 0.218,
    "spawnRateMs": 1260,
    "fruitSpeedMultiplier": 1.26,
    "fruitSizeMultiplier": 1.07,
    "bombChance": 0.15,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 36
      }
    ],
    "starThresholds": {
      "one": 432,
      "two": 648,
      "three": 972
    },
    "rewards": {
      "baseCoins": 29
    }
  },
  "level_86": {
    "id": "level_86",
    "levelNumber": 86,
    "worldId": "world_3",
    "title": "Level 86",
    "duration": 39,
    "difficultyTier": 2,
    "difficultyValue": 0.221,
    "spawnRateMs": 1256,
    "fruitSpeedMultiplier": 1.27,
    "fruitSizeMultiplier": 1.07,
    "bombChance": 0.15,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 10
      }
    ],
    "starThresholds": {
      "one": 400,
      "two": 600,
      "three": 900
    },
    "rewards": {
      "baseCoins": 29
    }
  },
  "level_87": {
    "id": "level_87",
    "levelNumber": 87,
    "worldId": "world_3",
    "title": "Level 87",
    "duration": 40,
    "difficultyTier": 3,
    "difficultyValue": 0.224,
    "spawnRateMs": 1253,
    "fruitSpeedMultiplier": 1.27,
    "fruitSizeMultiplier": 1.07,
    "bombChance": 0.15,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1495
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1196,
      "two": 1794,
      "three": 2691
    },
    "rewards": {
      "baseCoins": 30
    }
  },
  "level_88": {
    "id": "level_88",
    "levelNumber": 88,
    "worldId": "world_3",
    "title": "Level 88",
    "duration": 40,
    "difficultyTier": 3,
    "difficultyValue": 0.227,
    "spawnRateMs": 1249,
    "fruitSpeedMultiplier": 1.27,
    "fruitSizeMultiplier": 1.06,
    "bombChance": 0.15,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2018
      }
    ],
    "starThresholds": {
      "one": 1614,
      "two": 2421,
      "three": 3632
    },
    "rewards": {
      "baseCoins": 30
    }
  },
  "level_89": {
    "id": "level_89",
    "levelNumber": 89,
    "worldId": "world_3",
    "title": "Level 89",
    "duration": 40,
    "difficultyTier": 3,
    "difficultyValue": 0.23,
    "spawnRateMs": 1246,
    "fruitSpeedMultiplier": 1.28,
    "fruitSizeMultiplier": 1.06,
    "bombChance": 0.15,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 38
      }
    ],
    "starThresholds": {
      "one": 456,
      "two": 684,
      "three": 1026
    },
    "rewards": {
      "baseCoins": 30
    }
  },
  "level_90": {
    "id": "level_90",
    "levelNumber": 90,
    "worldId": "world_3",
    "title": "World 3 Boss",
    "duration": 67,
    "difficultyTier": 3,
    "difficultyValue": 0.234,
    "spawnRateMs": 1243,
    "fruitSpeedMultiplier": 1.28,
    "fruitSizeMultiplier": 1.06,
    "bombChance": 0.16,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SURVIVAL_TIME",
        "target": 67
      },
      {
        "type": "SCORE",
        "target": 4003
      },
      {
        "type": "NO_BOMB",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1608,
      "two": 2412,
      "three": 3618
    },
    "rewards": {
      "baseCoins": 31
    }
  },
  "level_91": {
    "id": "level_91",
    "levelNumber": 91,
    "worldId": "world_4",
    "title": "Level 91",
    "duration": 40,
    "difficultyTier": 3,
    "difficultyValue": 0.237,
    "spawnRateMs": 1239,
    "fruitSpeedMultiplier": 1.28,
    "fruitSizeMultiplier": 1.06,
    "bombChance": 0.16,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1570
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1256,
      "two": 1884,
      "three": 2826
    },
    "rewards": {
      "baseCoins": 31
    }
  },
  "level_92": {
    "id": "level_92",
    "levelNumber": 92,
    "worldId": "world_4",
    "title": "Level 92",
    "duration": 40,
    "difficultyTier": 3,
    "difficultyValue": 0.24,
    "spawnRateMs": 1236,
    "fruitSpeedMultiplier": 1.29,
    "fruitSizeMultiplier": 1.06,
    "bombChance": 0.16,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2119
      }
    ],
    "starThresholds": {
      "one": 1695,
      "two": 2542,
      "three": 3814
    },
    "rewards": {
      "baseCoins": 31
    }
  },
  "level_93": {
    "id": "level_93",
    "levelNumber": 93,
    "worldId": "world_4",
    "title": "Level 93",
    "duration": 40,
    "difficultyTier": 3,
    "difficultyValue": 0.243,
    "spawnRateMs": 1232,
    "fruitSpeedMultiplier": 1.29,
    "fruitSizeMultiplier": 1.05,
    "bombChance": 0.16,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 39
      }
    ],
    "starThresholds": {
      "one": 468,
      "two": 702,
      "three": 1053
    },
    "rewards": {
      "baseCoins": 31
    }
  },
  "level_94": {
    "id": "level_94",
    "levelNumber": 94,
    "worldId": "world_4",
    "title": "Level 94",
    "duration": 41,
    "difficultyTier": 3,
    "difficultyValue": 0.246,
    "spawnRateMs": 1229,
    "fruitSpeedMultiplier": 1.3,
    "fruitSizeMultiplier": 1.05,
    "bombChance": 0.16,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 11
      }
    ],
    "starThresholds": {
      "one": 440,
      "two": 660,
      "three": 990
    },
    "rewards": {
      "baseCoins": 32
    }
  },
  "level_95": {
    "id": "level_95",
    "levelNumber": 95,
    "worldId": "world_4",
    "title": "Level 95",
    "duration": 41,
    "difficultyTier": 3,
    "difficultyValue": 0.249,
    "spawnRateMs": 1225,
    "fruitSpeedMultiplier": 1.3,
    "fruitSizeMultiplier": 1.05,
    "bombChance": 0.16,
    "specialFruitChance": 0.06,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1646
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1316,
      "two": 1975,
      "three": 2962
    },
    "rewards": {
      "baseCoins": 32
    }
  },
  "level_96": {
    "id": "level_96",
    "levelNumber": 96,
    "worldId": "world_4",
    "title": "Level 96",
    "duration": 41,
    "difficultyTier": 3,
    "difficultyValue": 0.253,
    "spawnRateMs": 1222,
    "fruitSpeedMultiplier": 1.3,
    "fruitSizeMultiplier": 1.05,
    "bombChance": 0.16,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2220
      }
    ],
    "starThresholds": {
      "one": 1776,
      "two": 2664,
      "three": 3996
    },
    "rewards": {
      "baseCoins": 32
    }
  },
  "level_97": {
    "id": "level_97",
    "levelNumber": 97,
    "worldId": "world_4",
    "title": "Level 97",
    "duration": 41,
    "difficultyTier": 3,
    "difficultyValue": 0.256,
    "spawnRateMs": 1218,
    "fruitSpeedMultiplier": 1.31,
    "fruitSizeMultiplier": 1.05,
    "bombChance": 0.17,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 40
      }
    ],
    "starThresholds": {
      "one": 480,
      "two": 720,
      "three": 1080
    },
    "rewards": {
      "baseCoins": 33
    }
  },
  "level_98": {
    "id": "level_98",
    "levelNumber": 98,
    "worldId": "world_4",
    "title": "Level 98",
    "duration": 41,
    "difficultyTier": 3,
    "difficultyValue": 0.259,
    "spawnRateMs": 1215,
    "fruitSpeedMultiplier": 1.31,
    "fruitSizeMultiplier": 1.04,
    "bombChance": 0.17,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 11
      }
    ],
    "starThresholds": {
      "one": 440,
      "two": 660,
      "three": 990
    },
    "rewards": {
      "baseCoins": 33
    }
  },
  "level_99": {
    "id": "level_99",
    "levelNumber": 99,
    "worldId": "world_4",
    "title": "Level 99",
    "duration": 41,
    "difficultyTier": 3,
    "difficultyValue": 0.262,
    "spawnRateMs": 1211,
    "fruitSpeedMultiplier": 1.31,
    "fruitSizeMultiplier": 1.04,
    "bombChance": 0.17,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1723
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1378,
      "two": 2067,
      "three": 3101
    },
    "rewards": {
      "baseCoins": 33
    }
  },
  "level_100": {
    "id": "level_100",
    "levelNumber": 100,
    "worldId": "world_4",
    "title": "Level 100",
    "duration": 41,
    "difficultyTier": 3,
    "difficultyValue": 0.265,
    "spawnRateMs": 1208,
    "fruitSpeedMultiplier": 1.32,
    "fruitSizeMultiplier": 1.04,
    "bombChance": 0.17,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2323
      }
    ],
    "starThresholds": {
      "one": 1858,
      "two": 2787,
      "three": 4181
    },
    "rewards": {
      "baseCoins": 33
    }
  },
  "level_101": {
    "id": "level_101",
    "levelNumber": 101,
    "worldId": "world_4",
    "title": "Level 101",
    "duration": 42,
    "difficultyTier": 3,
    "difficultyValue": 0.269,
    "spawnRateMs": 1204,
    "fruitSpeedMultiplier": 1.32,
    "fruitSizeMultiplier": 1.04,
    "bombChance": 0.17,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 41
      }
    ],
    "starThresholds": {
      "one": 492,
      "two": 738,
      "three": 1107
    },
    "rewards": {
      "baseCoins": 34
    }
  },
  "level_102": {
    "id": "level_102",
    "levelNumber": 102,
    "worldId": "world_4",
    "title": "Level 102",
    "duration": 42,
    "difficultyTier": 3,
    "difficultyValue": 0.272,
    "spawnRateMs": 1200,
    "fruitSpeedMultiplier": 1.33,
    "fruitSizeMultiplier": 1.04,
    "bombChance": 0.17,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "COMBO",
        "target": 11
      }
    ],
    "starThresholds": {
      "one": 440,
      "two": 660,
      "three": 990
    },
    "rewards": {
      "baseCoins": 34
    }
  },
  "level_103": {
    "id": "level_103",
    "levelNumber": 103,
    "worldId": "world_4",
    "title": "Level 103",
    "duration": 42,
    "difficultyTier": 3,
    "difficultyValue": 0.275,
    "spawnRateMs": 1197,
    "fruitSpeedMultiplier": 1.33,
    "fruitSizeMultiplier": 1.03,
    "bombChance": 0.17,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1800
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1440,
      "two": 2160,
      "three": 3240
    },
    "rewards": {
      "baseCoins": 34
    }
  },
  "level_104": {
    "id": "level_104",
    "levelNumber": 104,
    "worldId": "world_4",
    "title": "Level 104",
    "duration": 42,
    "difficultyTier": 3,
    "difficultyValue": 0.278,
    "spawnRateMs": 1193,
    "fruitSpeedMultiplier": 1.33,
    "fruitSizeMultiplier": 1.03,
    "bombChance": 0.18,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2426
      }
    ],
    "starThresholds": {
      "one": 1940,
      "two": 2911,
      "three": 4366
    },
    "rewards": {
      "baseCoins": 35
    }
  },
  "level_105": {
    "id": "level_105",
    "levelNumber": 105,
    "worldId": "world_4",
    "title": "Level 105",
    "duration": 42,
    "difficultyTier": 3,
    "difficultyValue": 0.282,
    "spawnRateMs": 1190,
    "fruitSpeedMultiplier": 1.34,
    "fruitSizeMultiplier": 1.03,
    "bombChance": 0.18,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 43
      }
    ],
    "starThresholds": {
      "one": 516,
      "two": 774,
      "three": 1161
    },
    "rewards": {
      "baseCoins": 35
    }
  },
  "level_106": {
    "id": "level_106",
    "levelNumber": 106,
    "worldId": "world_4",
    "title": "Level 106",
    "duration": 42,
    "difficultyTier": 3,
    "difficultyValue": 0.285,
    "spawnRateMs": 1186,
    "fruitSpeedMultiplier": 1.34,
    "fruitSizeMultiplier": 1.03,
    "bombChance": 0.18,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 12
      }
    ],
    "starThresholds": {
      "one": 480,
      "two": 720,
      "three": 1080
    },
    "rewards": {
      "baseCoins": 35
    }
  },
  "level_107": {
    "id": "level_107",
    "levelNumber": 107,
    "worldId": "world_4",
    "title": "Level 107",
    "duration": 42,
    "difficultyTier": 3,
    "difficultyValue": 0.288,
    "spawnRateMs": 1183,
    "fruitSpeedMultiplier": 1.35,
    "fruitSizeMultiplier": 1.03,
    "bombChance": 0.18,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1878
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1502,
      "two": 2253,
      "three": 3380
    },
    "rewards": {
      "baseCoins": 35
    }
  },
  "level_108": {
    "id": "level_108",
    "levelNumber": 108,
    "worldId": "world_4",
    "title": "Level 108",
    "duration": 43,
    "difficultyTier": 3,
    "difficultyValue": 0.291,
    "spawnRateMs": 1179,
    "fruitSpeedMultiplier": 1.35,
    "fruitSizeMultiplier": 1.03,
    "bombChance": 0.18,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2531
      }
    ],
    "starThresholds": {
      "one": 2024,
      "two": 3037,
      "three": 4555
    },
    "rewards": {
      "baseCoins": 36
    }
  },
  "level_109": {
    "id": "level_109",
    "levelNumber": 109,
    "worldId": "world_4",
    "title": "Level 109",
    "duration": 43,
    "difficultyTier": 3,
    "difficultyValue": 0.295,
    "spawnRateMs": 1175,
    "fruitSpeedMultiplier": 1.35,
    "fruitSizeMultiplier": 1.02,
    "bombChance": 0.18,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 44
      }
    ],
    "starThresholds": {
      "one": 528,
      "two": 792,
      "three": 1188
    },
    "rewards": {
      "baseCoins": 36
    }
  },
  "level_110": {
    "id": "level_110",
    "levelNumber": 110,
    "worldId": "world_4",
    "title": "Level 110",
    "duration": 43,
    "difficultyTier": 3,
    "difficultyValue": 0.298,
    "spawnRateMs": 1172,
    "fruitSpeedMultiplier": 1.36,
    "fruitSizeMultiplier": 1.02,
    "bombChance": 0.18,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 12
      }
    ],
    "starThresholds": {
      "one": 480,
      "two": 720,
      "three": 1080
    },
    "rewards": {
      "baseCoins": 36
    }
  },
  "level_111": {
    "id": "level_111",
    "levelNumber": 111,
    "worldId": "world_4",
    "title": "Level 111",
    "duration": 43,
    "difficultyTier": 3,
    "difficultyValue": 0.301,
    "spawnRateMs": 1168,
    "fruitSpeedMultiplier": 1.36,
    "fruitSizeMultiplier": 1.02,
    "bombChance": 0.19,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 1957
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1565,
      "two": 2348,
      "three": 3522
    },
    "rewards": {
      "baseCoins": 37
    }
  },
  "level_112": {
    "id": "level_112",
    "levelNumber": 112,
    "worldId": "world_4",
    "title": "Level 112",
    "duration": 43,
    "difficultyTier": 3,
    "difficultyValue": 0.304,
    "spawnRateMs": 1165,
    "fruitSpeedMultiplier": 1.37,
    "fruitSizeMultiplier": 1.02,
    "bombChance": 0.19,
    "specialFruitChance": 0.07,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2635
      }
    ],
    "starThresholds": {
      "one": 2108,
      "two": 3162,
      "three": 4743
    },
    "rewards": {
      "baseCoins": 37
    }
  },
  "level_113": {
    "id": "level_113",
    "levelNumber": 113,
    "worldId": "world_4",
    "title": "Level 113",
    "duration": 43,
    "difficultyTier": 3,
    "difficultyValue": 0.308,
    "spawnRateMs": 1161,
    "fruitSpeedMultiplier": 1.37,
    "fruitSizeMultiplier": 1.02,
    "bombChance": 0.19,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 45
      }
    ],
    "starThresholds": {
      "one": 540,
      "two": 810,
      "three": 1215
    },
    "rewards": {
      "baseCoins": 37
    }
  },
  "level_114": {
    "id": "level_114",
    "levelNumber": 114,
    "worldId": "world_4",
    "title": "Level 114",
    "duration": 43,
    "difficultyTier": 3,
    "difficultyValue": 0.311,
    "spawnRateMs": 1157,
    "fruitSpeedMultiplier": 1.37,
    "fruitSizeMultiplier": 1.01,
    "bombChance": 0.19,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 12
      }
    ],
    "starThresholds": {
      "one": 480,
      "two": 720,
      "three": 1080
    },
    "rewards": {
      "baseCoins": 37
    }
  },
  "level_115": {
    "id": "level_115",
    "levelNumber": 115,
    "worldId": "world_4",
    "title": "Level 115",
    "duration": 44,
    "difficultyTier": 3,
    "difficultyValue": 0.314,
    "spawnRateMs": 1154,
    "fruitSpeedMultiplier": 1.38,
    "fruitSizeMultiplier": 1.01,
    "bombChance": 0.19,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2036
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1628,
      "two": 2443,
      "three": 3664
    },
    "rewards": {
      "baseCoins": 38
    }
  },
  "level_116": {
    "id": "level_116",
    "levelNumber": 116,
    "worldId": "world_4",
    "title": "Level 116",
    "duration": 44,
    "difficultyTier": 3,
    "difficultyValue": 0.318,
    "spawnRateMs": 1150,
    "fruitSpeedMultiplier": 1.38,
    "fruitSizeMultiplier": 1.01,
    "bombChance": 0.19,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2741
      }
    ],
    "starThresholds": {
      "one": 2192,
      "two": 3289,
      "three": 4933
    },
    "rewards": {
      "baseCoins": 38
    }
  },
  "level_117": {
    "id": "level_117",
    "levelNumber": 117,
    "worldId": "world_4",
    "title": "Level 117",
    "duration": 44,
    "difficultyTier": 3,
    "difficultyValue": 0.321,
    "spawnRateMs": 1146,
    "fruitSpeedMultiplier": 1.39,
    "fruitSizeMultiplier": 1.01,
    "bombChance": 0.19,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 47
      }
    ],
    "starThresholds": {
      "one": 564,
      "two": 846,
      "three": 1269
    },
    "rewards": {
      "baseCoins": 38
    }
  },
  "level_118": {
    "id": "level_118",
    "levelNumber": 118,
    "worldId": "world_4",
    "title": "Level 118",
    "duration": 44,
    "difficultyTier": 3,
    "difficultyValue": 0.324,
    "spawnRateMs": 1143,
    "fruitSpeedMultiplier": 1.39,
    "fruitSizeMultiplier": 1.01,
    "bombChance": 0.2,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 13
      }
    ],
    "starThresholds": {
      "one": 520,
      "two": 780,
      "three": 1170
    },
    "rewards": {
      "baseCoins": 39
    }
  },
  "level_119": {
    "id": "level_119",
    "levelNumber": 119,
    "worldId": "world_4",
    "title": "Level 119",
    "duration": 44,
    "difficultyTier": 3,
    "difficultyValue": 0.328,
    "spawnRateMs": 1139,
    "fruitSpeedMultiplier": 1.39,
    "fruitSizeMultiplier": 1,
    "bombChance": 0.2,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2116
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1692,
      "two": 2539,
      "three": 3808
    },
    "rewards": {
      "baseCoins": 39
    }
  },
  "level_120": {
    "id": "level_120",
    "levelNumber": 120,
    "worldId": "world_4",
    "title": "World 4 Boss",
    "duration": 69,
    "difficultyTier": 3,
    "difficultyValue": 0.331,
    "spawnRateMs": 1135,
    "fruitSpeedMultiplier": 1.4,
    "fruitSizeMultiplier": 1,
    "bombChance": 0.2,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 2,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SURVIVAL_TIME",
        "target": 69
      },
      {
        "type": "SCORE",
        "target": 5465
      },
      {
        "type": "NO_BOMB",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1656,
      "two": 2484,
      "three": 3726
    },
    "rewards": {
      "baseCoins": 39
    }
  },
  "level_121": {
    "id": "level_121",
    "levelNumber": 121,
    "worldId": "world_5",
    "title": "Level 121",
    "duration": 45,
    "difficultyTier": 4,
    "difficultyValue": 0.334,
    "spawnRateMs": 1132,
    "fruitSpeedMultiplier": 1.4,
    "fruitSizeMultiplier": 1,
    "bombChance": 0.2,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 48
      }
    ],
    "starThresholds": {
      "one": 576,
      "two": 864,
      "three": 1296
    },
    "rewards": {
      "baseCoins": 40
    }
  },
  "level_122": {
    "id": "level_122",
    "levelNumber": 122,
    "worldId": "world_5",
    "title": "Level 122",
    "duration": 45,
    "difficultyTier": 4,
    "difficultyValue": 0.338,
    "spawnRateMs": 1128,
    "fruitSpeedMultiplier": 1.41,
    "fruitSizeMultiplier": 1,
    "bombChance": 0.2,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 13
      }
    ],
    "starThresholds": {
      "one": 520,
      "two": 780,
      "three": 1170
    },
    "rewards": {
      "baseCoins": 40
    }
  },
  "level_123": {
    "id": "level_123",
    "levelNumber": 123,
    "worldId": "world_5",
    "title": "Level 123",
    "duration": 45,
    "difficultyTier": 4,
    "difficultyValue": 0.341,
    "spawnRateMs": 1124,
    "fruitSpeedMultiplier": 1.41,
    "fruitSizeMultiplier": 1,
    "bombChance": 0.2,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2196
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1756,
      "two": 2635,
      "three": 3952
    },
    "rewards": {
      "baseCoins": 40
    }
  },
  "level_124": {
    "id": "level_124",
    "levelNumber": 124,
    "worldId": "world_5",
    "title": "Level 124",
    "duration": 45,
    "difficultyTier": 4,
    "difficultyValue": 0.344,
    "spawnRateMs": 1121,
    "fruitSpeedMultiplier": 1.41,
    "fruitSizeMultiplier": 0.99,
    "bombChance": 0.2,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2955
      }
    ],
    "starThresholds": {
      "one": 2364,
      "two": 3546,
      "three": 5319
    },
    "rewards": {
      "baseCoins": 40
    }
  },
  "level_125": {
    "id": "level_125",
    "levelNumber": 125,
    "worldId": "world_5",
    "title": "Level 125",
    "duration": 45,
    "difficultyTier": 4,
    "difficultyValue": 0.348,
    "spawnRateMs": 1117,
    "fruitSpeedMultiplier": 1.42,
    "fruitSizeMultiplier": 0.99,
    "bombChance": 0.21,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 49
      }
    ],
    "starThresholds": {
      "one": 588,
      "two": 882,
      "three": 1323
    },
    "rewards": {
      "baseCoins": 41
    }
  },
  "level_126": {
    "id": "level_126",
    "levelNumber": 126,
    "worldId": "world_5",
    "title": "Level 126",
    "duration": 45,
    "difficultyTier": 4,
    "difficultyValue": 0.351,
    "spawnRateMs": 1113,
    "fruitSpeedMultiplier": 1.42,
    "fruitSizeMultiplier": 0.99,
    "bombChance": 0.21,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "COMBO",
        "target": 13
      }
    ],
    "starThresholds": {
      "one": 520,
      "two": 780,
      "three": 1170
    },
    "rewards": {
      "baseCoins": 41
    }
  },
  "level_127": {
    "id": "level_127",
    "levelNumber": 127,
    "worldId": "world_5",
    "title": "Level 127",
    "duration": 45,
    "difficultyTier": 4,
    "difficultyValue": 0.355,
    "spawnRateMs": 1110,
    "fruitSpeedMultiplier": 1.43,
    "fruitSizeMultiplier": 0.99,
    "bombChance": 0.21,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2277
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1821,
      "two": 2732,
      "three": 4098
    },
    "rewards": {
      "baseCoins": 41
    }
  },
  "level_128": {
    "id": "level_128",
    "levelNumber": 128,
    "worldId": "world_5",
    "title": "Level 128",
    "duration": 46,
    "difficultyTier": 4,
    "difficultyValue": 0.358,
    "spawnRateMs": 1106,
    "fruitSpeedMultiplier": 1.43,
    "fruitSizeMultiplier": 0.99,
    "bombChance": 0.21,
    "specialFruitChance": 0.08,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3063
      }
    ],
    "starThresholds": {
      "one": 2450,
      "two": 3675,
      "three": 5513
    },
    "rewards": {
      "baseCoins": 42
    }
  },
  "level_129": {
    "id": "level_129",
    "levelNumber": 129,
    "worldId": "world_5",
    "title": "Level 129",
    "duration": 46,
    "difficultyTier": 4,
    "difficultyValue": 0.361,
    "spawnRateMs": 1102,
    "fruitSpeedMultiplier": 1.43,
    "fruitSizeMultiplier": 0.98,
    "bombChance": 0.21,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 51
      }
    ],
    "starThresholds": {
      "one": 612,
      "two": 918,
      "three": 1377
    },
    "rewards": {
      "baseCoins": 42
    }
  },
  "level_130": {
    "id": "level_130",
    "levelNumber": 130,
    "worldId": "world_5",
    "title": "Level 130",
    "duration": 46,
    "difficultyTier": 4,
    "difficultyValue": 0.365,
    "spawnRateMs": 1098,
    "fruitSpeedMultiplier": 1.44,
    "fruitSizeMultiplier": 0.98,
    "bombChance": 0.21,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "COMBO",
        "target": 14
      }
    ],
    "starThresholds": {
      "one": 560,
      "two": 840,
      "three": 1260
    },
    "rewards": {
      "baseCoins": 42
    }
  },
  "level_131": {
    "id": "level_131",
    "levelNumber": 131,
    "worldId": "world_5",
    "title": "Level 131",
    "duration": 46,
    "difficultyTier": 4,
    "difficultyValue": 0.368,
    "spawnRateMs": 1095,
    "fruitSpeedMultiplier": 1.44,
    "fruitSizeMultiplier": 0.98,
    "bombChance": 0.22,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2358
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1886,
      "two": 2829,
      "three": 4244
    },
    "rewards": {
      "baseCoins": 43
    }
  },
  "level_132": {
    "id": "level_132",
    "levelNumber": 132,
    "worldId": "world_5",
    "title": "Level 132",
    "duration": 46,
    "difficultyTier": 4,
    "difficultyValue": 0.371,
    "spawnRateMs": 1091,
    "fruitSpeedMultiplier": 1.45,
    "fruitSizeMultiplier": 0.98,
    "bombChance": 0.22,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3171
      }
    ],
    "starThresholds": {
      "one": 2536,
      "two": 3805,
      "three": 5707
    },
    "rewards": {
      "baseCoins": 43
    }
  },
  "level_133": {
    "id": "level_133",
    "levelNumber": 133,
    "worldId": "world_5",
    "title": "Level 133",
    "duration": 46,
    "difficultyTier": 4,
    "difficultyValue": 0.375,
    "spawnRateMs": 1087,
    "fruitSpeedMultiplier": 1.45,
    "fruitSizeMultiplier": 0.98,
    "bombChance": 0.22,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 52
      }
    ],
    "starThresholds": {
      "one": 624,
      "two": 936,
      "three": 1404
    },
    "rewards": {
      "baseCoins": 43
    }
  },
  "level_134": {
    "id": "level_134",
    "levelNumber": 134,
    "worldId": "world_5",
    "title": "Level 134",
    "duration": 47,
    "difficultyTier": 4,
    "difficultyValue": 0.378,
    "spawnRateMs": 1083,
    "fruitSpeedMultiplier": 1.45,
    "fruitSizeMultiplier": 0.97,
    "bombChance": 0.22,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 14
      }
    ],
    "starThresholds": {
      "one": 560,
      "two": 840,
      "three": 1260
    },
    "rewards": {
      "baseCoins": 44
    }
  },
  "level_135": {
    "id": "level_135",
    "levelNumber": 135,
    "worldId": "world_5",
    "title": "Level 135",
    "duration": 47,
    "difficultyTier": 4,
    "difficultyValue": 0.382,
    "spawnRateMs": 1080,
    "fruitSpeedMultiplier": 1.46,
    "fruitSizeMultiplier": 0.97,
    "bombChance": 0.22,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2440
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1952,
      "two": 2928,
      "three": 4392
    },
    "rewards": {
      "baseCoins": 44
    }
  },
  "level_136": {
    "id": "level_136",
    "levelNumber": 136,
    "worldId": "world_5",
    "title": "Level 136",
    "duration": 47,
    "difficultyTier": 4,
    "difficultyValue": 0.385,
    "spawnRateMs": 1076,
    "fruitSpeedMultiplier": 1.46,
    "fruitSizeMultiplier": 0.97,
    "bombChance": 0.22,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3280
      }
    ],
    "starThresholds": {
      "one": 2624,
      "two": 3936,
      "three": 5904
    },
    "rewards": {
      "baseCoins": 44
    }
  },
  "level_137": {
    "id": "level_137",
    "levelNumber": 137,
    "worldId": "world_5",
    "title": "Level 137",
    "duration": 47,
    "difficultyTier": 4,
    "difficultyValue": 0.389,
    "spawnRateMs": 1072,
    "fruitSpeedMultiplier": 1.47,
    "fruitSizeMultiplier": 0.97,
    "bombChance": 0.22,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 53
      }
    ],
    "starThresholds": {
      "one": 636,
      "two": 954,
      "three": 1431
    },
    "rewards": {
      "baseCoins": 44
    }
  },
  "level_138": {
    "id": "level_138",
    "levelNumber": 138,
    "worldId": "world_5",
    "title": "Level 138",
    "duration": 47,
    "difficultyTier": 4,
    "difficultyValue": 0.392,
    "spawnRateMs": 1068,
    "fruitSpeedMultiplier": 1.47,
    "fruitSizeMultiplier": 0.96,
    "bombChance": 0.23,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 14
      }
    ],
    "starThresholds": {
      "one": 560,
      "two": 840,
      "three": 1260
    },
    "rewards": {
      "baseCoins": 45
    }
  },
  "level_139": {
    "id": "level_139",
    "levelNumber": 139,
    "worldId": "world_5",
    "title": "Level 139",
    "duration": 47,
    "difficultyTier": 4,
    "difficultyValue": 0.395,
    "spawnRateMs": 1065,
    "fruitSpeedMultiplier": 1.47,
    "fruitSizeMultiplier": 0.96,
    "bombChance": 0.23,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2522
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2017,
      "two": 3026,
      "three": 4539
    },
    "rewards": {
      "baseCoins": 45
    }
  },
  "level_140": {
    "id": "level_140",
    "levelNumber": 140,
    "worldId": "world_5",
    "title": "Level 140",
    "duration": 47,
    "difficultyTier": 4,
    "difficultyValue": 0.399,
    "spawnRateMs": 1061,
    "fruitSpeedMultiplier": 1.48,
    "fruitSizeMultiplier": 0.96,
    "bombChance": 0.23,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3390
      }
    ],
    "starThresholds": {
      "one": 2712,
      "two": 4068,
      "three": 6102
    },
    "rewards": {
      "baseCoins": 45
    }
  },
  "level_141": {
    "id": "level_141",
    "levelNumber": 141,
    "worldId": "world_5",
    "title": "Level 141",
    "duration": 48,
    "difficultyTier": 4,
    "difficultyValue": 0.402,
    "spawnRateMs": 1057,
    "fruitSpeedMultiplier": 1.48,
    "fruitSizeMultiplier": 0.96,
    "bombChance": 0.23,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 55
      }
    ],
    "starThresholds": {
      "one": 660,
      "two": 990,
      "three": 1485
    },
    "rewards": {
      "baseCoins": 46
    }
  },
  "level_142": {
    "id": "level_142",
    "levelNumber": 142,
    "worldId": "world_5",
    "title": "Level 142",
    "duration": 48,
    "difficultyTier": 4,
    "difficultyValue": 0.406,
    "spawnRateMs": 1053,
    "fruitSpeedMultiplier": 1.49,
    "fruitSizeMultiplier": 0.96,
    "bombChance": 0.23,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "COMBO",
        "target": 15
      }
    ],
    "starThresholds": {
      "one": 600,
      "two": 900,
      "three": 1350
    },
    "rewards": {
      "baseCoins": 46
    }
  },
  "level_143": {
    "id": "level_143",
    "levelNumber": 143,
    "worldId": "world_5",
    "title": "Level 143",
    "duration": 48,
    "difficultyTier": 4,
    "difficultyValue": 0.409,
    "spawnRateMs": 1049,
    "fruitSpeedMultiplier": 1.49,
    "fruitSizeMultiplier": 0.95,
    "bombChance": 0.23,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2605
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2084,
      "two": 3126,
      "three": 4689
    },
    "rewards": {
      "baseCoins": 46
    }
  },
  "level_144": {
    "id": "level_144",
    "levelNumber": 144,
    "worldId": "world_5",
    "title": "Level 144",
    "duration": 48,
    "difficultyTier": 4,
    "difficultyValue": 0.413,
    "spawnRateMs": 1046,
    "fruitSpeedMultiplier": 1.5,
    "fruitSizeMultiplier": 0.95,
    "bombChance": 0.24,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3501
      }
    ],
    "starThresholds": {
      "one": 2800,
      "two": 4201,
      "three": 6301
    },
    "rewards": {
      "baseCoins": 47
    }
  },
  "level_145": {
    "id": "level_145",
    "levelNumber": 145,
    "worldId": "world_5",
    "title": "Level 145",
    "duration": 48,
    "difficultyTier": 4,
    "difficultyValue": 0.416,
    "spawnRateMs": 1042,
    "fruitSpeedMultiplier": 1.5,
    "fruitSizeMultiplier": 0.95,
    "bombChance": 0.24,
    "specialFruitChance": 0.09,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 56
      }
    ],
    "starThresholds": {
      "one": 672,
      "two": 1008,
      "three": 1512
    },
    "rewards": {
      "baseCoins": 47
    }
  },
  "level_146": {
    "id": "level_146",
    "levelNumber": 146,
    "worldId": "world_5",
    "title": "Level 146",
    "duration": 48,
    "difficultyTier": 4,
    "difficultyValue": 0.42,
    "spawnRateMs": 1038,
    "fruitSpeedMultiplier": 1.5,
    "fruitSizeMultiplier": 0.95,
    "bombChance": 0.24,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 15
      }
    ],
    "starThresholds": {
      "one": 600,
      "two": 900,
      "three": 1350
    },
    "rewards": {
      "baseCoins": 47
    }
  },
  "level_147": {
    "id": "level_147",
    "levelNumber": 147,
    "worldId": "world_5",
    "title": "Level 147",
    "duration": 49,
    "difficultyTier": 4,
    "difficultyValue": 0.423,
    "spawnRateMs": 1034,
    "fruitSpeedMultiplier": 1.51,
    "fruitSizeMultiplier": 0.95,
    "bombChance": 0.24,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2688
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2150,
      "two": 3225,
      "three": 4838
    },
    "rewards": {
      "baseCoins": 48
    }
  },
  "level_148": {
    "id": "level_148",
    "levelNumber": 148,
    "worldId": "world_5",
    "title": "Level 148",
    "duration": 49,
    "difficultyTier": 4,
    "difficultyValue": 0.427,
    "spawnRateMs": 1030,
    "fruitSpeedMultiplier": 1.51,
    "fruitSizeMultiplier": 0.94,
    "bombChance": 0.24,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3612
      }
    ],
    "starThresholds": {
      "one": 2889,
      "two": 4334,
      "three": 6501
    },
    "rewards": {
      "baseCoins": 48
    }
  },
  "level_149": {
    "id": "level_149",
    "levelNumber": 149,
    "worldId": "world_5",
    "title": "Level 149",
    "duration": 49,
    "difficultyTier": 4,
    "difficultyValue": 0.43,
    "spawnRateMs": 1026,
    "fruitSpeedMultiplier": 1.52,
    "fruitSizeMultiplier": 0.94,
    "bombChance": 0.24,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 58
      }
    ],
    "starThresholds": {
      "one": 696,
      "two": 1044,
      "three": 1566
    },
    "rewards": {
      "baseCoins": 48
    }
  },
  "level_150": {
    "id": "level_150",
    "levelNumber": 150,
    "worldId": "world_5",
    "title": "World 5 Boss",
    "duration": 73,
    "difficultyTier": 4,
    "difficultyValue": 0.434,
    "spawnRateMs": 1023,
    "fruitSpeedMultiplier": 1.52,
    "fruitSizeMultiplier": 0.94,
    "bombChance": 0.25,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SURVIVAL_TIME",
        "target": 73
      },
      {
        "type": "SCORE",
        "target": 7002
      },
      {
        "type": "NO_BOMB",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1752,
      "two": 2628,
      "three": 3942
    },
    "rewards": {
      "baseCoins": 49
    }
  },
  "level_151": {
    "id": "level_151",
    "levelNumber": 151,
    "worldId": "world_6",
    "title": "Level 151",
    "duration": 49,
    "difficultyTier": 4,
    "difficultyValue": 0.437,
    "spawnRateMs": 1019,
    "fruitSpeedMultiplier": 1.52,
    "fruitSizeMultiplier": 0.94,
    "bombChance": 0.25,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2772
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2217,
      "two": 3326,
      "three": 4989
    },
    "rewards": {
      "baseCoins": 49
    }
  },
  "level_152": {
    "id": "level_152",
    "levelNumber": 152,
    "worldId": "world_6",
    "title": "Level 152",
    "duration": 49,
    "difficultyTier": 4,
    "difficultyValue": 0.441,
    "spawnRateMs": 1015,
    "fruitSpeedMultiplier": 1.53,
    "fruitSizeMultiplier": 0.94,
    "bombChance": 0.25,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3724
      }
    ],
    "starThresholds": {
      "one": 2979,
      "two": 4468,
      "three": 6703
    },
    "rewards": {
      "baseCoins": 49
    }
  },
  "level_153": {
    "id": "level_153",
    "levelNumber": 153,
    "worldId": "world_6",
    "title": "Level 153",
    "duration": 49,
    "difficultyTier": 4,
    "difficultyValue": 0.444,
    "spawnRateMs": 1011,
    "fruitSpeedMultiplier": 1.53,
    "fruitSizeMultiplier": 0.93,
    "bombChance": 0.25,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 59
      }
    ],
    "starThresholds": {
      "one": 708,
      "two": 1062,
      "three": 1593
    },
    "rewards": {
      "baseCoins": 49
    }
  },
  "level_154": {
    "id": "level_154",
    "levelNumber": 154,
    "worldId": "world_6",
    "title": "Level 154",
    "duration": 50,
    "difficultyTier": 5,
    "difficultyValue": 0.448,
    "spawnRateMs": 1007,
    "fruitSpeedMultiplier": 1.54,
    "fruitSizeMultiplier": 0.93,
    "bombChance": 0.25,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "COMBO",
        "target": 16
      }
    ],
    "starThresholds": {
      "one": 640,
      "two": 960,
      "three": 1440
    },
    "rewards": {
      "baseCoins": 50
    }
  },
  "level_155": {
    "id": "level_155",
    "levelNumber": 155,
    "worldId": "world_6",
    "title": "Level 155",
    "duration": 50,
    "difficultyTier": 5,
    "difficultyValue": 0.451,
    "spawnRateMs": 1003,
    "fruitSpeedMultiplier": 1.54,
    "fruitSizeMultiplier": 0.93,
    "bombChance": 0.25,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2856
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2284,
      "two": 3427,
      "three": 5140
    },
    "rewards": {
      "baseCoins": 50
    }
  },
  "level_156": {
    "id": "level_156",
    "levelNumber": 156,
    "worldId": "world_6",
    "title": "Level 156",
    "duration": 50,
    "difficultyTier": 5,
    "difficultyValue": 0.455,
    "spawnRateMs": 999,
    "fruitSpeedMultiplier": 1.55,
    "fruitSizeMultiplier": 0.93,
    "bombChance": 0.25,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3836
      }
    ],
    "starThresholds": {
      "one": 3068,
      "two": 4603,
      "three": 6904
    },
    "rewards": {
      "baseCoins": 50
    }
  },
  "level_157": {
    "id": "level_157",
    "levelNumber": 157,
    "worldId": "world_6",
    "title": "Level 157",
    "duration": 50,
    "difficultyTier": 5,
    "difficultyValue": 0.458,
    "spawnRateMs": 996,
    "fruitSpeedMultiplier": 1.55,
    "fruitSizeMultiplier": 0.93,
    "bombChance": 0.26,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 60
      }
    ],
    "starThresholds": {
      "one": 720,
      "two": 1080,
      "three": 1620
    },
    "rewards": {
      "baseCoins": 51
    }
  },
  "level_158": {
    "id": "level_158",
    "levelNumber": 158,
    "worldId": "world_6",
    "title": "Level 158",
    "duration": 50,
    "difficultyTier": 5,
    "difficultyValue": 0.462,
    "spawnRateMs": 992,
    "fruitSpeedMultiplier": 1.55,
    "fruitSizeMultiplier": 0.92,
    "bombChance": 0.26,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 16
      }
    ],
    "starThresholds": {
      "one": 640,
      "two": 960,
      "three": 1440
    },
    "rewards": {
      "baseCoins": 51
    }
  },
  "level_159": {
    "id": "level_159",
    "levelNumber": 159,
    "worldId": "world_6",
    "title": "Level 159",
    "duration": 50,
    "difficultyTier": 5,
    "difficultyValue": 0.465,
    "spawnRateMs": 988,
    "fruitSpeedMultiplier": 1.56,
    "fruitSizeMultiplier": 0.92,
    "bombChance": 0.26,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SCORE",
        "target": 2940
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2352,
      "two": 3528,
      "three": 5292
    },
    "rewards": {
      "baseCoins": 51
    }
  },
  "level_160": {
    "id": "level_160",
    "levelNumber": 160,
    "worldId": "world_6",
    "title": "Level 160",
    "duration": 51,
    "difficultyTier": 5,
    "difficultyValue": 0.469,
    "spawnRateMs": 984,
    "fruitSpeedMultiplier": 1.56,
    "fruitSizeMultiplier": 0.92,
    "bombChance": 0.26,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3949
      }
    ],
    "starThresholds": {
      "one": 3159,
      "two": 4738,
      "three": 7108
    },
    "rewards": {
      "baseCoins": 52
    }
  },
  "level_161": {
    "id": "level_161",
    "levelNumber": 161,
    "worldId": "world_6",
    "title": "Level 161",
    "duration": 51,
    "difficultyTier": 5,
    "difficultyValue": 0.472,
    "spawnRateMs": 980,
    "fruitSpeedMultiplier": 1.57,
    "fruitSizeMultiplier": 0.92,
    "bombChance": 0.26,
    "specialFruitChance": 0.1,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 62
      }
    ],
    "starThresholds": {
      "one": 744,
      "two": 1116,
      "three": 1674
    },
    "rewards": {
      "baseCoins": 52
    }
  },
  "level_162": {
    "id": "level_162",
    "levelNumber": 162,
    "worldId": "world_6",
    "title": "Level 162",
    "duration": 51,
    "difficultyTier": 5,
    "difficultyValue": 0.476,
    "spawnRateMs": 976,
    "fruitSpeedMultiplier": 1.57,
    "fruitSizeMultiplier": 0.91,
    "bombChance": 0.26,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "COMBO",
        "target": 16
      }
    ],
    "starThresholds": {
      "one": 640,
      "two": 960,
      "three": 1440
    },
    "rewards": {
      "baseCoins": 52
    }
  },
  "level_163": {
    "id": "level_163",
    "levelNumber": 163,
    "worldId": "world_6",
    "title": "Level 163",
    "duration": 51,
    "difficultyTier": 5,
    "difficultyValue": 0.479,
    "spawnRateMs": 972,
    "fruitSpeedMultiplier": 1.58,
    "fruitSizeMultiplier": 0.91,
    "bombChance": 0.27,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3025
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2420,
      "two": 3630,
      "three": 5445
    },
    "rewards": {
      "baseCoins": 53
    }
  },
  "level_164": {
    "id": "level_164",
    "levelNumber": 164,
    "worldId": "world_6",
    "title": "Level 164",
    "duration": 51,
    "difficultyTier": 5,
    "difficultyValue": 0.483,
    "spawnRateMs": 968,
    "fruitSpeedMultiplier": 1.58,
    "fruitSizeMultiplier": 0.91,
    "bombChance": 0.27,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4062
      }
    ],
    "starThresholds": {
      "one": 3249,
      "two": 4874,
      "three": 7311
    },
    "rewards": {
      "baseCoins": 53
    }
  },
  "level_165": {
    "id": "level_165",
    "levelNumber": 165,
    "worldId": "world_6",
    "title": "Level 165",
    "duration": 51,
    "difficultyTier": 5,
    "difficultyValue": 0.486,
    "spawnRateMs": 964,
    "fruitSpeedMultiplier": 1.58,
    "fruitSizeMultiplier": 0.91,
    "bombChance": 0.27,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 63
      }
    ],
    "starThresholds": {
      "one": 756,
      "two": 1134,
      "three": 1701
    },
    "rewards": {
      "baseCoins": 53
    }
  },
  "level_166": {
    "id": "level_166",
    "levelNumber": 166,
    "worldId": "world_6",
    "title": "Level 166",
    "duration": 52,
    "difficultyTier": 5,
    "difficultyValue": 0.49,
    "spawnRateMs": 961,
    "fruitSpeedMultiplier": 1.59,
    "fruitSizeMultiplier": 0.91,
    "bombChance": 0.27,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 17
      }
    ],
    "starThresholds": {
      "one": 680,
      "two": 1020,
      "three": 1530
    },
    "rewards": {
      "baseCoins": 54
    }
  },
  "level_167": {
    "id": "level_167",
    "levelNumber": 167,
    "worldId": "world_6",
    "title": "Level 167",
    "duration": 52,
    "difficultyTier": 5,
    "difficultyValue": 0.494,
    "spawnRateMs": 957,
    "fruitSpeedMultiplier": 1.59,
    "fruitSizeMultiplier": 0.9,
    "bombChance": 0.27,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3111
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2488,
      "two": 3733,
      "three": 5599
    },
    "rewards": {
      "baseCoins": 54
    }
  },
  "level_168": {
    "id": "level_168",
    "levelNumber": 168,
    "worldId": "world_6",
    "title": "Level 168",
    "duration": 52,
    "difficultyTier": 5,
    "difficultyValue": 0.497,
    "spawnRateMs": 953,
    "fruitSpeedMultiplier": 1.6,
    "fruitSizeMultiplier": 0.9,
    "bombChance": 0.27,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 3,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4176
      }
    ],
    "starThresholds": {
      "one": 3340,
      "two": 5011,
      "three": 7516
    },
    "rewards": {
      "baseCoins": 54
    }
  },
  "level_169": {
    "id": "level_169",
    "levelNumber": 169,
    "worldId": "world_6",
    "title": "Level 169",
    "duration": 52,
    "difficultyTier": 5,
    "difficultyValue": 0.501,
    "spawnRateMs": 949,
    "fruitSpeedMultiplier": 1.6,
    "fruitSizeMultiplier": 0.9,
    "bombChance": 0.28,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 65
      }
    ],
    "starThresholds": {
      "one": 780,
      "two": 1170,
      "three": 1755
    },
    "rewards": {
      "baseCoins": 55
    }
  },
  "level_170": {
    "id": "level_170",
    "levelNumber": 170,
    "worldId": "world_6",
    "title": "Level 170",
    "duration": 52,
    "difficultyTier": 5,
    "difficultyValue": 0.504,
    "spawnRateMs": 945,
    "fruitSpeedMultiplier": 1.61,
    "fruitSizeMultiplier": 0.9,
    "bombChance": 0.28,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "COMBO",
        "target": 17
      }
    ],
    "starThresholds": {
      "one": 680,
      "two": 1020,
      "three": 1530
    },
    "rewards": {
      "baseCoins": 55
    }
  },
  "level_171": {
    "id": "level_171",
    "levelNumber": 171,
    "worldId": "world_6",
    "title": "Level 171",
    "duration": 52,
    "difficultyTier": 5,
    "difficultyValue": 0.508,
    "spawnRateMs": 941,
    "fruitSpeedMultiplier": 1.61,
    "fruitSizeMultiplier": 0.9,
    "bombChance": 0.28,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3197
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2557,
      "two": 3836,
      "three": 5754
    },
    "rewards": {
      "baseCoins": 55
    }
  },
  "level_172": {
    "id": "level_172",
    "levelNumber": 172,
    "worldId": "world_6",
    "title": "Level 172",
    "duration": 53,
    "difficultyTier": 5,
    "difficultyValue": 0.511,
    "spawnRateMs": 937,
    "fruitSpeedMultiplier": 1.61,
    "fruitSizeMultiplier": 0.89,
    "bombChance": 0.28,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4291
      }
    ],
    "starThresholds": {
      "one": 3432,
      "two": 5149,
      "three": 7723
    },
    "rewards": {
      "baseCoins": 56
    }
  },
  "level_173": {
    "id": "level_173",
    "levelNumber": 173,
    "worldId": "world_6",
    "title": "Level 173",
    "duration": 53,
    "difficultyTier": 5,
    "difficultyValue": 0.515,
    "spawnRateMs": 933,
    "fruitSpeedMultiplier": 1.62,
    "fruitSizeMultiplier": 0.89,
    "bombChance": 0.28,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 66
      }
    ],
    "starThresholds": {
      "one": 792,
      "two": 1188,
      "three": 1782
    },
    "rewards": {
      "baseCoins": 56
    }
  },
  "level_174": {
    "id": "level_174",
    "levelNumber": 174,
    "worldId": "world_6",
    "title": "Level 174",
    "duration": 53,
    "difficultyTier": 5,
    "difficultyValue": 0.519,
    "spawnRateMs": 929,
    "fruitSpeedMultiplier": 1.62,
    "fruitSizeMultiplier": 0.89,
    "bombChance": 0.28,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "COMBO",
        "target": 17
      }
    ],
    "starThresholds": {
      "one": 680,
      "two": 1020,
      "three": 1530
    },
    "rewards": {
      "baseCoins": 56
    }
  },
  "level_175": {
    "id": "level_175",
    "levelNumber": 175,
    "worldId": "world_6",
    "title": "Level 175",
    "duration": 53,
    "difficultyTier": 5,
    "difficultyValue": 0.522,
    "spawnRateMs": 925,
    "fruitSpeedMultiplier": 1.63,
    "fruitSizeMultiplier": 0.89,
    "bombChance": 0.28,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "CROSS",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3283
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2626,
      "two": 3939,
      "three": 5909
    },
    "rewards": {
      "baseCoins": 56
    }
  },
  "level_176": {
    "id": "level_176",
    "levelNumber": 176,
    "worldId": "world_6",
    "title": "Level 176",
    "duration": 53,
    "difficultyTier": 5,
    "difficultyValue": 0.526,
    "spawnRateMs": 921,
    "fruitSpeedMultiplier": 1.63,
    "fruitSizeMultiplier": 0.88,
    "bombChance": 0.29,
    "specialFruitChance": 0.11,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4406
      }
    ],
    "starThresholds": {
      "one": 3524,
      "two": 5287,
      "three": 7930
    },
    "rewards": {
      "baseCoins": 57
    }
  },
  "level_177": {
    "id": "level_177",
    "levelNumber": 177,
    "worldId": "world_6",
    "title": "Level 177",
    "duration": 53,
    "difficultyTier": 5,
    "difficultyValue": 0.529,
    "spawnRateMs": 917,
    "fruitSpeedMultiplier": 1.64,
    "fruitSizeMultiplier": 0.88,
    "bombChance": 0.29,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 67
      }
    ],
    "starThresholds": {
      "one": 804,
      "two": 1206,
      "three": 1809
    },
    "rewards": {
      "baseCoins": 57
    }
  },
  "level_178": {
    "id": "level_178",
    "levelNumber": 178,
    "worldId": "world_6",
    "title": "Level 178",
    "duration": 53,
    "difficultyTier": 5,
    "difficultyValue": 0.533,
    "spawnRateMs": 913,
    "fruitSpeedMultiplier": 1.64,
    "fruitSizeMultiplier": 0.88,
    "bombChance": 0.29,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "COMBO",
        "target": 18
      }
    ],
    "starThresholds": {
      "one": 720,
      "two": 1080,
      "three": 1620
    },
    "rewards": {
      "baseCoins": 57
    }
  },
  "level_179": {
    "id": "level_179",
    "levelNumber": 179,
    "worldId": "world_6",
    "title": "Level 179",
    "duration": 54,
    "difficultyTier": 5,
    "difficultyValue": 0.537,
    "spawnRateMs": 909,
    "fruitSpeedMultiplier": 1.64,
    "fruitSizeMultiplier": 0.88,
    "bombChance": 0.29,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "CROSS",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3369
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2695,
      "two": 4042,
      "three": 6064
    },
    "rewards": {
      "baseCoins": 58
    }
  },
  "level_180": {
    "id": "level_180",
    "levelNumber": 180,
    "worldId": "world_6",
    "title": "World 6 Boss",
    "duration": 76,
    "difficultyTier": 5,
    "difficultyValue": 0.54,
    "spawnRateMs": 905,
    "fruitSpeedMultiplier": 1.65,
    "fruitSizeMultiplier": 0.88,
    "bombChance": 0.29,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SURVIVAL_TIME",
        "target": 76
      },
      {
        "type": "SCORE",
        "target": 8604
      },
      {
        "type": "NO_BOMB",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1824,
      "two": 2736,
      "three": 4104
    },
    "rewards": {
      "baseCoins": 58
    }
  },
  "level_181": {
    "id": "level_181",
    "levelNumber": 181,
    "worldId": "world_7",
    "title": "Level 181",
    "duration": 54,
    "difficultyTier": 5,
    "difficultyValue": 0.544,
    "spawnRateMs": 901,
    "fruitSpeedMultiplier": 1.65,
    "fruitSizeMultiplier": 0.87,
    "bombChance": 0.29,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 69
      }
    ],
    "starThresholds": {
      "one": 828,
      "two": 1242,
      "three": 1863
    },
    "rewards": {
      "baseCoins": 58
    }
  },
  "level_182": {
    "id": "level_182",
    "levelNumber": 182,
    "worldId": "world_7",
    "title": "Level 182",
    "duration": 54,
    "difficultyTier": 5,
    "difficultyValue": 0.548,
    "spawnRateMs": 897,
    "fruitSpeedMultiplier": 1.66,
    "fruitSizeMultiplier": 0.87,
    "bombChance": 0.3,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "COMBO",
        "target": 18
      }
    ],
    "starThresholds": {
      "one": 720,
      "two": 1080,
      "three": 1620
    },
    "rewards": {
      "baseCoins": 59
    }
  },
  "level_183": {
    "id": "level_183",
    "levelNumber": 183,
    "worldId": "world_7",
    "title": "Level 183",
    "duration": 54,
    "difficultyTier": 5,
    "difficultyValue": 0.551,
    "spawnRateMs": 893,
    "fruitSpeedMultiplier": 1.66,
    "fruitSizeMultiplier": 0.87,
    "bombChance": 0.3,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3456
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2764,
      "two": 4147,
      "three": 6220
    },
    "rewards": {
      "baseCoins": 59
    }
  },
  "level_184": {
    "id": "level_184",
    "levelNumber": 184,
    "worldId": "world_7",
    "title": "Level 184",
    "duration": 54,
    "difficultyTier": 5,
    "difficultyValue": 0.555,
    "spawnRateMs": 889,
    "fruitSpeedMultiplier": 1.67,
    "fruitSizeMultiplier": 0.87,
    "bombChance": 0.3,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4638
      }
    ],
    "starThresholds": {
      "one": 3710,
      "two": 5565,
      "three": 8348
    },
    "rewards": {
      "baseCoins": 59
    }
  },
  "level_185": {
    "id": "level_185",
    "levelNumber": 185,
    "worldId": "world_7",
    "title": "Level 185",
    "duration": 55,
    "difficultyTier": 6,
    "difficultyValue": 0.558,
    "spawnRateMs": 885,
    "fruitSpeedMultiplier": 1.67,
    "fruitSizeMultiplier": 0.86,
    "bombChance": 0.3,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 70
      }
    ],
    "starThresholds": {
      "one": 840,
      "two": 1260,
      "three": 1890
    },
    "rewards": {
      "baseCoins": 60
    }
  },
  "level_186": {
    "id": "level_186",
    "levelNumber": 186,
    "worldId": "world_7",
    "title": "Level 186",
    "duration": 55,
    "difficultyTier": 6,
    "difficultyValue": 0.562,
    "spawnRateMs": 881,
    "fruitSpeedMultiplier": 1.67,
    "fruitSizeMultiplier": 0.86,
    "bombChance": 0.3,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "COMBO",
        "target": 19
      }
    ],
    "starThresholds": {
      "one": 760,
      "two": 1140,
      "three": 1710
    },
    "rewards": {
      "baseCoins": 60
    }
  },
  "level_187": {
    "id": "level_187",
    "levelNumber": 187,
    "worldId": "world_7",
    "title": "Level 187",
    "duration": 55,
    "difficultyTier": 6,
    "difficultyValue": 0.566,
    "spawnRateMs": 877,
    "fruitSpeedMultiplier": 1.68,
    "fruitSizeMultiplier": 0.86,
    "bombChance": 0.3,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3544
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2835,
      "two": 4252,
      "three": 6379
    },
    "rewards": {
      "baseCoins": 60
    }
  },
  "level_188": {
    "id": "level_188",
    "levelNumber": 188,
    "worldId": "world_7",
    "title": "Level 188",
    "duration": 55,
    "difficultyTier": 6,
    "difficultyValue": 0.569,
    "spawnRateMs": 873,
    "fruitSpeedMultiplier": 1.68,
    "fruitSizeMultiplier": 0.86,
    "bombChance": 0.31,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4755
      }
    ],
    "starThresholds": {
      "one": 3804,
      "two": 5706,
      "three": 8559
    },
    "rewards": {
      "baseCoins": 61
    }
  },
  "level_189": {
    "id": "level_189",
    "levelNumber": 189,
    "worldId": "world_7",
    "title": "Level 189",
    "duration": 55,
    "difficultyTier": 6,
    "difficultyValue": 0.573,
    "spawnRateMs": 869,
    "fruitSpeedMultiplier": 1.69,
    "fruitSizeMultiplier": 0.86,
    "bombChance": 0.31,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "CROSS",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 72
      }
    ],
    "starThresholds": {
      "one": 864,
      "two": 1296,
      "three": 1944
    },
    "rewards": {
      "baseCoins": 61
    }
  },
  "level_190": {
    "id": "level_190",
    "levelNumber": 190,
    "worldId": "world_7",
    "title": "Level 190",
    "duration": 55,
    "difficultyTier": 6,
    "difficultyValue": 0.577,
    "spawnRateMs": 865,
    "fruitSpeedMultiplier": 1.69,
    "fruitSizeMultiplier": 0.85,
    "bombChance": 0.31,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "COMBO",
        "target": 19
      }
    ],
    "starThresholds": {
      "one": 760,
      "two": 1140,
      "three": 1710
    },
    "rewards": {
      "baseCoins": 61
    }
  },
  "level_191": {
    "id": "level_191",
    "levelNumber": 191,
    "worldId": "world_7",
    "title": "Level 191",
    "duration": 56,
    "difficultyTier": 6,
    "difficultyValue": 0.58,
    "spawnRateMs": 861,
    "fruitSpeedMultiplier": 1.7,
    "fruitSizeMultiplier": 0.85,
    "bombChance": 0.31,
    "specialFruitChance": 0.12,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3632
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2905,
      "two": 4358,
      "three": 6537
    },
    "rewards": {
      "baseCoins": 62
    }
  },
  "level_192": {
    "id": "level_192",
    "levelNumber": 192,
    "worldId": "world_7",
    "title": "Level 192",
    "duration": 56,
    "difficultyTier": 6,
    "difficultyValue": 0.584,
    "spawnRateMs": 857,
    "fruitSpeedMultiplier": 1.7,
    "fruitSizeMultiplier": 0.85,
    "bombChance": 0.31,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "CROSS",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4872
      }
    ],
    "starThresholds": {
      "one": 3897,
      "two": 5846,
      "three": 8769
    },
    "rewards": {
      "baseCoins": 62
    }
  },
  "level_193": {
    "id": "level_193",
    "levelNumber": 193,
    "worldId": "world_7",
    "title": "Level 193",
    "duration": 56,
    "difficultyTier": 6,
    "difficultyValue": 0.588,
    "spawnRateMs": 853,
    "fruitSpeedMultiplier": 1.71,
    "fruitSizeMultiplier": 0.85,
    "bombChance": 0.31,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 73
      }
    ],
    "starThresholds": {
      "one": 876,
      "two": 1314,
      "three": 1971
    },
    "rewards": {
      "baseCoins": 62
    }
  },
  "level_194": {
    "id": "level_194",
    "levelNumber": 194,
    "worldId": "world_7",
    "title": "Level 194",
    "duration": 56,
    "difficultyTier": 6,
    "difficultyValue": 0.591,
    "spawnRateMs": 849,
    "fruitSpeedMultiplier": 1.71,
    "fruitSizeMultiplier": 0.85,
    "bombChance": 0.32,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "COMBO",
        "target": 19
      }
    ],
    "starThresholds": {
      "one": 760,
      "two": 1140,
      "three": 1710
    },
    "rewards": {
      "baseCoins": 63
    }
  },
  "level_195": {
    "id": "level_195",
    "levelNumber": 195,
    "worldId": "world_7",
    "title": "Level 195",
    "duration": 56,
    "difficultyTier": 6,
    "difficultyValue": 0.595,
    "spawnRateMs": 845,
    "fruitSpeedMultiplier": 1.71,
    "fruitSizeMultiplier": 0.84,
    "bombChance": 0.32,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "CROSS",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3720
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2976,
      "two": 4464,
      "three": 6696
    },
    "rewards": {
      "baseCoins": 63
    }
  },
  "level_196": {
    "id": "level_196",
    "levelNumber": 196,
    "worldId": "world_7",
    "title": "Level 196",
    "duration": 56,
    "difficultyTier": 6,
    "difficultyValue": 0.599,
    "spawnRateMs": 841,
    "fruitSpeedMultiplier": 1.72,
    "fruitSizeMultiplier": 0.84,
    "bombChance": 0.32,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4989
      }
    ],
    "starThresholds": {
      "one": 3991,
      "two": 5986,
      "three": 8980
    },
    "rewards": {
      "baseCoins": 63
    }
  },
  "level_197": {
    "id": "level_197",
    "levelNumber": 197,
    "worldId": "world_7",
    "title": "Level 197",
    "duration": 57,
    "difficultyTier": 6,
    "difficultyValue": 0.602,
    "spawnRateMs": 837,
    "fruitSpeedMultiplier": 1.72,
    "fruitSizeMultiplier": 0.84,
    "bombChance": 0.32,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 75
      }
    ],
    "starThresholds": {
      "one": 900,
      "two": 1350,
      "three": 2025
    },
    "rewards": {
      "baseCoins": 64
    }
  },
  "level_198": {
    "id": "level_198",
    "levelNumber": 198,
    "worldId": "world_7",
    "title": "Level 198",
    "duration": 57,
    "difficultyTier": 6,
    "difficultyValue": 0.606,
    "spawnRateMs": 833,
    "fruitSpeedMultiplier": 1.73,
    "fruitSizeMultiplier": 0.84,
    "bombChance": 0.32,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 20
      }
    ],
    "starThresholds": {
      "one": 800,
      "two": 1200,
      "three": 1800
    },
    "rewards": {
      "baseCoins": 64
    }
  },
  "level_199": {
    "id": "level_199",
    "levelNumber": 199,
    "worldId": "world_7",
    "title": "Level 199",
    "duration": 57,
    "difficultyTier": 6,
    "difficultyValue": 0.61,
    "spawnRateMs": 829,
    "fruitSpeedMultiplier": 1.73,
    "fruitSizeMultiplier": 0.83,
    "bombChance": 0.32,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3808
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 3046,
      "two": 4569,
      "three": 6854
    },
    "rewards": {
      "baseCoins": 64
    }
  },
  "level_200": {
    "id": "level_200",
    "levelNumber": 200,
    "worldId": "world_7",
    "title": "Level 200",
    "duration": 57,
    "difficultyTier": 6,
    "difficultyValue": 0.614,
    "spawnRateMs": 825,
    "fruitSpeedMultiplier": 1.74,
    "fruitSizeMultiplier": 0.83,
    "bombChance": 0.33,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "CROSS",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5108
      }
    ],
    "starThresholds": {
      "one": 4086,
      "two": 6129,
      "three": 9194
    },
    "rewards": {
      "baseCoins": 65
    }
  },
  "level_201": {
    "id": "level_201",
    "levelNumber": 201,
    "worldId": "world_7",
    "title": "Level 201",
    "duration": 57,
    "difficultyTier": 6,
    "difficultyValue": 0.617,
    "spawnRateMs": 821,
    "fruitSpeedMultiplier": 1.74,
    "fruitSizeMultiplier": 0.83,
    "bombChance": 0.33,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "CROSS",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 76
      }
    ],
    "starThresholds": {
      "one": 912,
      "two": 1368,
      "three": 2052
    },
    "rewards": {
      "baseCoins": 65
    }
  },
  "level_202": {
    "id": "level_202",
    "levelNumber": 202,
    "worldId": "world_7",
    "title": "Level 202",
    "duration": 57,
    "difficultyTier": 6,
    "difficultyValue": 0.621,
    "spawnRateMs": 816,
    "fruitSpeedMultiplier": 1.75,
    "fruitSizeMultiplier": 0.83,
    "bombChance": 0.33,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 20
      }
    ],
    "starThresholds": {
      "one": 800,
      "two": 1200,
      "three": 1800
    },
    "rewards": {
      "baseCoins": 65
    }
  },
  "level_203": {
    "id": "level_203",
    "levelNumber": 203,
    "worldId": "world_7",
    "title": "Level 203",
    "duration": 58,
    "difficultyTier": 6,
    "difficultyValue": 0.625,
    "spawnRateMs": 812,
    "fruitSpeedMultiplier": 1.75,
    "fruitSizeMultiplier": 0.83,
    "bombChance": 0.33,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3897
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 3117,
      "two": 4676,
      "three": 7014
    },
    "rewards": {
      "baseCoins": 66
    }
  },
  "level_204": {
    "id": "level_204",
    "levelNumber": 204,
    "worldId": "world_7",
    "title": "Level 204",
    "duration": 58,
    "difficultyTier": 6,
    "difficultyValue": 0.628,
    "spawnRateMs": 808,
    "fruitSpeedMultiplier": 1.75,
    "fruitSizeMultiplier": 0.82,
    "bombChance": 0.33,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5226
      }
    ],
    "starThresholds": {
      "one": 4180,
      "two": 6271,
      "three": 9406
    },
    "rewards": {
      "baseCoins": 66
    }
  },
  "level_205": {
    "id": "level_205",
    "levelNumber": 205,
    "worldId": "world_7",
    "title": "Level 205",
    "duration": 58,
    "difficultyTier": 6,
    "difficultyValue": 0.632,
    "spawnRateMs": 804,
    "fruitSpeedMultiplier": 1.76,
    "fruitSizeMultiplier": 0.82,
    "bombChance": 0.33,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "CROSS",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 78
      }
    ],
    "starThresholds": {
      "one": 936,
      "two": 1404,
      "three": 2106
    },
    "rewards": {
      "baseCoins": 66
    }
  },
  "level_206": {
    "id": "level_206",
    "levelNumber": 206,
    "worldId": "world_7",
    "title": "Level 206",
    "duration": 58,
    "difficultyTier": 6,
    "difficultyValue": 0.636,
    "spawnRateMs": 800,
    "fruitSpeedMultiplier": 1.76,
    "fruitSizeMultiplier": 0.82,
    "bombChance": 0.34,
    "specialFruitChance": 0.13,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "COMBO",
        "target": 20
      }
    ],
    "starThresholds": {
      "one": 800,
      "two": 1200,
      "three": 1800
    },
    "rewards": {
      "baseCoins": 67
    }
  },
  "level_207": {
    "id": "level_207",
    "levelNumber": 207,
    "worldId": "world_7",
    "title": "Level 207",
    "duration": 58,
    "difficultyTier": 6,
    "difficultyValue": 0.639,
    "spawnRateMs": 796,
    "fruitSpeedMultiplier": 1.77,
    "fruitSizeMultiplier": 0.82,
    "bombChance": 0.34,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "CROSS",
    "objectives": [
      {
        "type": "SCORE",
        "target": 3986
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 3188,
      "two": 4783,
      "three": 7174
    },
    "rewards": {
      "baseCoins": 67
    }
  },
  "level_208": {
    "id": "level_208",
    "levelNumber": 208,
    "worldId": "world_7",
    "title": "Level 208",
    "duration": 58,
    "difficultyTier": 6,
    "difficultyValue": 0.643,
    "spawnRateMs": 792,
    "fruitSpeedMultiplier": 1.77,
    "fruitSizeMultiplier": 0.81,
    "bombChance": 0.34,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5345
      }
    ],
    "starThresholds": {
      "one": 4276,
      "two": 6414,
      "three": 9621
    },
    "rewards": {
      "baseCoins": 67
    }
  },
  "level_209": {
    "id": "level_209",
    "levelNumber": 209,
    "worldId": "world_7",
    "title": "Level 209",
    "duration": 59,
    "difficultyTier": 6,
    "difficultyValue": 0.647,
    "spawnRateMs": 788,
    "fruitSpeedMultiplier": 1.78,
    "fruitSizeMultiplier": 0.81,
    "bombChance": 0.34,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 79
      }
    ],
    "starThresholds": {
      "one": 948,
      "two": 1422,
      "three": 2133
    },
    "rewards": {
      "baseCoins": 68
    }
  },
  "level_210": {
    "id": "level_210",
    "levelNumber": 210,
    "worldId": "world_7",
    "title": "World 7 Boss",
    "duration": 79,
    "difficultyTier": 6,
    "difficultyValue": 0.651,
    "spawnRateMs": 784,
    "fruitSpeedMultiplier": 1.78,
    "fruitSizeMultiplier": 0.81,
    "bombChance": 0.34,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SURVIVAL_TIME",
        "target": 79
      },
      {
        "type": "SCORE",
        "target": 10260
      },
      {
        "type": "NO_BOMB",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1896,
      "two": 2844,
      "three": 4266
    },
    "rewards": {
      "baseCoins": 68
    }
  },
  "level_211": {
    "id": "level_211",
    "levelNumber": 211,
    "worldId": "world_8",
    "title": "Level 211",
    "duration": 59,
    "difficultyTier": 6,
    "difficultyValue": 0.654,
    "spawnRateMs": 780,
    "fruitSpeedMultiplier": 1.79,
    "fruitSizeMultiplier": 0.81,
    "bombChance": 0.34,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4076
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 3260,
      "two": 4891,
      "three": 7336
    },
    "rewards": {
      "baseCoins": 68
    }
  },
  "level_212": {
    "id": "level_212",
    "levelNumber": 212,
    "worldId": "world_8",
    "title": "Level 212",
    "duration": 59,
    "difficultyTier": 6,
    "difficultyValue": 0.658,
    "spawnRateMs": 776,
    "fruitSpeedMultiplier": 1.79,
    "fruitSizeMultiplier": 0.81,
    "bombChance": 0.35,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5465
      }
    ],
    "starThresholds": {
      "one": 4372,
      "two": 6558,
      "three": 9837
    },
    "rewards": {
      "baseCoins": 69
    }
  },
  "level_213": {
    "id": "level_213",
    "levelNumber": 213,
    "worldId": "world_8",
    "title": "Level 213",
    "duration": 59,
    "difficultyTier": 6,
    "difficultyValue": 0.662,
    "spawnRateMs": 771,
    "fruitSpeedMultiplier": 1.79,
    "fruitSizeMultiplier": 0.8,
    "bombChance": 0.35,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 81
      }
    ],
    "starThresholds": {
      "one": 972,
      "two": 1458,
      "three": 2187
    },
    "rewards": {
      "baseCoins": 69
    }
  },
  "level_214": {
    "id": "level_214",
    "levelNumber": 214,
    "worldId": "world_8",
    "title": "Level 214",
    "duration": 59,
    "difficultyTier": 6,
    "difficultyValue": 0.666,
    "spawnRateMs": 767,
    "fruitSpeedMultiplier": 1.8,
    "fruitSizeMultiplier": 0.8,
    "bombChance": 0.35,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 4,
    "spawnPattern": "CROSS",
    "objectives": [
      {
        "type": "COMBO",
        "target": 21
      }
    ],
    "starThresholds": {
      "one": 840,
      "two": 1260,
      "three": 1890
    },
    "rewards": {
      "baseCoins": 69
    }
  },
  "level_215": {
    "id": "level_215",
    "levelNumber": 215,
    "worldId": "world_8",
    "title": "Level 215",
    "duration": 60,
    "difficultyTier": 7,
    "difficultyValue": 0.669,
    "spawnRateMs": 763,
    "fruitSpeedMultiplier": 1.8,
    "fruitSizeMultiplier": 0.8,
    "bombChance": 0.35,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4166
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 3332,
      "two": 4999,
      "three": 7498
    },
    "rewards": {
      "baseCoins": 70
    }
  },
  "level_216": {
    "id": "level_216",
    "levelNumber": 216,
    "worldId": "world_8",
    "title": "Level 216",
    "duration": 60,
    "difficultyTier": 7,
    "difficultyValue": 0.673,
    "spawnRateMs": 759,
    "fruitSpeedMultiplier": 1.81,
    "fruitSizeMultiplier": 0.8,
    "bombChance": 0.35,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "PAIR",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5585
      }
    ],
    "starThresholds": {
      "one": 4468,
      "two": 6702,
      "three": 10053
    },
    "rewards": {
      "baseCoins": 70
    }
  },
  "level_217": {
    "id": "level_217",
    "levelNumber": 217,
    "worldId": "world_8",
    "title": "Level 217",
    "duration": 60,
    "difficultyTier": 7,
    "difficultyValue": 0.677,
    "spawnRateMs": 755,
    "fruitSpeedMultiplier": 1.81,
    "fruitSizeMultiplier": 0.79,
    "bombChance": 0.35,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 82
      }
    ],
    "starThresholds": {
      "one": 984,
      "two": 1476,
      "three": 2214
    },
    "rewards": {
      "baseCoins": 70
    }
  },
  "level_218": {
    "id": "level_218",
    "levelNumber": 218,
    "worldId": "world_8",
    "title": "Level 218",
    "duration": 60,
    "difficultyTier": 7,
    "difficultyValue": 0.681,
    "spawnRateMs": 751,
    "fruitSpeedMultiplier": 1.82,
    "fruitSizeMultiplier": 0.79,
    "bombChance": 0.36,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "COMBO",
        "target": 22
      }
    ],
    "starThresholds": {
      "one": 880,
      "two": 1320,
      "three": 1980
    },
    "rewards": {
      "baseCoins": 71
    }
  },
  "level_219": {
    "id": "level_219",
    "levelNumber": 219,
    "worldId": "world_8",
    "title": "Level 219",
    "duration": 60,
    "difficultyTier": 7,
    "difficultyValue": 0.684,
    "spawnRateMs": 747,
    "fruitSpeedMultiplier": 1.82,
    "fruitSizeMultiplier": 0.79,
    "bombChance": 0.36,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4256
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 3404,
      "two": 5107,
      "three": 7660
    },
    "rewards": {
      "baseCoins": 71
    }
  },
  "level_220": {
    "id": "level_220",
    "levelNumber": 220,
    "worldId": "world_8",
    "title": "Level 220",
    "duration": 60,
    "difficultyTier": 7,
    "difficultyValue": 0.688,
    "spawnRateMs": 742,
    "fruitSpeedMultiplier": 1.83,
    "fruitSizeMultiplier": 0.79,
    "bombChance": 0.36,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "SINGLE",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5705
      }
    ],
    "starThresholds": {
      "one": 4564,
      "two": 6846,
      "three": 10269
    },
    "rewards": {
      "baseCoins": 71
    }
  },
  "level_221": {
    "id": "level_221",
    "levelNumber": 221,
    "worldId": "world_8",
    "title": "Level 221",
    "duration": 61,
    "difficultyTier": 7,
    "difficultyValue": 0.692,
    "spawnRateMs": 738,
    "fruitSpeedMultiplier": 1.83,
    "fruitSizeMultiplier": 0.78,
    "bombChance": 0.36,
    "specialFruitChance": 0.14,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 84
      }
    ],
    "starThresholds": {
      "one": 1008,
      "two": 1512,
      "three": 2268
    },
    "rewards": {
      "baseCoins": 72
    }
  },
  "level_222": {
    "id": "level_222",
    "levelNumber": 222,
    "worldId": "world_8",
    "title": "Level 222",
    "duration": 61,
    "difficultyTier": 7,
    "difficultyValue": 0.696,
    "spawnRateMs": 734,
    "fruitSpeedMultiplier": 1.83,
    "fruitSizeMultiplier": 0.78,
    "bombChance": 0.36,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "COMBO",
        "target": 22
      }
    ],
    "starThresholds": {
      "one": 880,
      "two": 1320,
      "three": 1980
    },
    "rewards": {
      "baseCoins": 72
    }
  },
  "level_223": {
    "id": "level_223",
    "levelNumber": 223,
    "worldId": "world_8",
    "title": "Level 223",
    "duration": 61,
    "difficultyTier": 7,
    "difficultyValue": 0.7,
    "spawnRateMs": 730,
    "fruitSpeedMultiplier": 1.84,
    "fruitSizeMultiplier": 0.78,
    "bombChance": 0.36,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "FOUNTAIN",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4347
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 3477,
      "two": 5216,
      "three": 7824
    },
    "rewards": {
      "baseCoins": 72
    }
  },
  "level_224": {
    "id": "level_224",
    "levelNumber": 224,
    "worldId": "world_8",
    "title": "Level 224",
    "duration": 61,
    "difficultyTier": 7,
    "difficultyValue": 0.703,
    "spawnRateMs": 726,
    "fruitSpeedMultiplier": 1.84,
    "fruitSizeMultiplier": 0.78,
    "bombChance": 0.37,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5826
      }
    ],
    "starThresholds": {
      "one": 4660,
      "two": 6991,
      "three": 10486
    },
    "rewards": {
      "baseCoins": 73
    }
  },
  "level_225": {
    "id": "level_225",
    "levelNumber": 225,
    "worldId": "world_8",
    "title": "Level 225",
    "duration": 61,
    "difficultyTier": 7,
    "difficultyValue": 0.707,
    "spawnRateMs": 722,
    "fruitSpeedMultiplier": 1.85,
    "fruitSizeMultiplier": 0.78,
    "bombChance": 0.37,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 85
      }
    ],
    "starThresholds": {
      "one": 1020,
      "two": 1530,
      "three": 2295
    },
    "rewards": {
      "baseCoins": 73
    }
  },
  "level_226": {
    "id": "level_226",
    "levelNumber": 226,
    "worldId": "world_8",
    "title": "Level 226",
    "duration": 61,
    "difficultyTier": 7,
    "difficultyValue": 0.711,
    "spawnRateMs": 718,
    "fruitSpeedMultiplier": 1.85,
    "fruitSizeMultiplier": 0.77,
    "bombChance": 0.37,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 22
      }
    ],
    "starThresholds": {
      "one": 880,
      "two": 1320,
      "three": 1980
    },
    "rewards": {
      "baseCoins": 73
    }
  },
  "level_227": {
    "id": "level_227",
    "levelNumber": 227,
    "worldId": "world_8",
    "title": "Level 227",
    "duration": 62,
    "difficultyTier": 7,
    "difficultyValue": 0.715,
    "spawnRateMs": 713,
    "fruitSpeedMultiplier": 1.86,
    "fruitSizeMultiplier": 0.77,
    "bombChance": 0.37,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4438
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 3550,
      "two": 5325,
      "three": 7988
    },
    "rewards": {
      "baseCoins": 74
    }
  },
  "level_228": {
    "id": "level_228",
    "levelNumber": 228,
    "worldId": "world_8",
    "title": "Level 228",
    "duration": 62,
    "difficultyTier": 7,
    "difficultyValue": 0.718,
    "spawnRateMs": 709,
    "fruitSpeedMultiplier": 1.86,
    "fruitSizeMultiplier": 0.77,
    "bombChance": 0.37,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5947
      }
    ],
    "starThresholds": {
      "one": 4757,
      "two": 7136,
      "three": 10704
    },
    "rewards": {
      "baseCoins": 74
    }
  },
  "level_229": {
    "id": "level_229",
    "levelNumber": 229,
    "worldId": "world_8",
    "title": "Level 229",
    "duration": 62,
    "difficultyTier": 7,
    "difficultyValue": 0.722,
    "spawnRateMs": 705,
    "fruitSpeedMultiplier": 1.87,
    "fruitSizeMultiplier": 0.77,
    "bombChance": 0.38,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 87
      }
    ],
    "starThresholds": {
      "one": 1044,
      "two": 1566,
      "three": 2349
    },
    "rewards": {
      "baseCoins": 75
    }
  },
  "level_230": {
    "id": "level_230",
    "levelNumber": 230,
    "worldId": "world_8",
    "title": "Level 230",
    "duration": 62,
    "difficultyTier": 7,
    "difficultyValue": 0.726,
    "spawnRateMs": 701,
    "fruitSpeedMultiplier": 1.87,
    "fruitSizeMultiplier": 0.76,
    "bombChance": 0.38,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 23
      }
    ],
    "starThresholds": {
      "one": 920,
      "two": 1380,
      "three": 2070
    },
    "rewards": {
      "baseCoins": 75
    }
  },
  "level_231": {
    "id": "level_231",
    "levelNumber": 231,
    "worldId": "world_8",
    "title": "Level 231",
    "duration": 62,
    "difficultyTier": 7,
    "difficultyValue": 0.73,
    "spawnRateMs": 697,
    "fruitSpeedMultiplier": 1.88,
    "fruitSizeMultiplier": 0.76,
    "bombChance": 0.38,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4529
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 3623,
      "two": 5434,
      "three": 8152
    },
    "rewards": {
      "baseCoins": 75
    }
  },
  "level_232": {
    "id": "level_232",
    "levelNumber": 232,
    "worldId": "world_8",
    "title": "Level 232",
    "duration": 63,
    "difficultyTier": 7,
    "difficultyValue": 0.734,
    "spawnRateMs": 692,
    "fruitSpeedMultiplier": 1.88,
    "fruitSizeMultiplier": 0.76,
    "bombChance": 0.38,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 6069
      }
    ],
    "starThresholds": {
      "one": 4855,
      "two": 7282,
      "three": 10924
    },
    "rewards": {
      "baseCoins": 76
    }
  },
  "level_233": {
    "id": "level_233",
    "levelNumber": 233,
    "worldId": "world_8",
    "title": "Level 233",
    "duration": 63,
    "difficultyTier": 7,
    "difficultyValue": 0.738,
    "spawnRateMs": 688,
    "fruitSpeedMultiplier": 1.89,
    "fruitSizeMultiplier": 0.76,
    "bombChance": 0.38,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 88
      }
    ],
    "starThresholds": {
      "one": 1056,
      "two": 1584,
      "three": 2376
    },
    "rewards": {
      "baseCoins": 76
    }
  },
  "level_234": {
    "id": "level_234",
    "levelNumber": 234,
    "worldId": "world_8",
    "title": "Level 234",
    "duration": 63,
    "difficultyTier": 7,
    "difficultyValue": 0.741,
    "spawnRateMs": 684,
    "fruitSpeedMultiplier": 1.89,
    "fruitSizeMultiplier": 0.76,
    "bombChance": 0.38,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 23
      }
    ],
    "starThresholds": {
      "one": 920,
      "two": 1380,
      "three": 2070
    },
    "rewards": {
      "baseCoins": 76
    }
  },
  "level_235": {
    "id": "level_235",
    "levelNumber": 235,
    "worldId": "world_8",
    "title": "Level 235",
    "duration": 63,
    "difficultyTier": 7,
    "difficultyValue": 0.745,
    "spawnRateMs": 680,
    "fruitSpeedMultiplier": 1.89,
    "fruitSizeMultiplier": 0.75,
    "bombChance": 0.39,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4621
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 3696,
      "two": 5545,
      "three": 8317
    },
    "rewards": {
      "baseCoins": 77
    }
  },
  "level_236": {
    "id": "level_236",
    "levelNumber": 236,
    "worldId": "world_8",
    "title": "Level 236",
    "duration": 63,
    "difficultyTier": 7,
    "difficultyValue": 0.749,
    "spawnRateMs": 676,
    "fruitSpeedMultiplier": 1.9,
    "fruitSizeMultiplier": 0.75,
    "bombChance": 0.39,
    "specialFruitChance": 0.15,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 6191
      }
    ],
    "starThresholds": {
      "one": 4952,
      "two": 7429,
      "three": 11143
    },
    "rewards": {
      "baseCoins": 77
    }
  },
  "level_237": {
    "id": "level_237",
    "levelNumber": 237,
    "worldId": "world_8",
    "title": "Level 237",
    "duration": 63,
    "difficultyTier": 7,
    "difficultyValue": 0.753,
    "spawnRateMs": 671,
    "fruitSpeedMultiplier": 1.9,
    "fruitSizeMultiplier": 0.75,
    "bombChance": 0.39,
    "specialFruitChance": 0.16,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 90
      }
    ],
    "starThresholds": {
      "one": 1080,
      "two": 1620,
      "three": 2430
    },
    "rewards": {
      "baseCoins": 77
    }
  },
  "level_238": {
    "id": "level_238",
    "levelNumber": 238,
    "worldId": "world_8",
    "title": "Level 238",
    "duration": 64,
    "difficultyTier": 7,
    "difficultyValue": 0.757,
    "spawnRateMs": 667,
    "fruitSpeedMultiplier": 1.91,
    "fruitSizeMultiplier": 0.75,
    "bombChance": 0.39,
    "specialFruitChance": 0.16,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 23
      }
    ],
    "starThresholds": {
      "one": 920,
      "two": 1380,
      "three": 2070
    },
    "rewards": {
      "baseCoins": 78
    }
  },
  "level_239": {
    "id": "level_239",
    "levelNumber": 239,
    "worldId": "world_8",
    "title": "Level 239",
    "duration": 64,
    "difficultyTier": 7,
    "difficultyValue": 0.76,
    "spawnRateMs": 663,
    "fruitSpeedMultiplier": 1.91,
    "fruitSizeMultiplier": 0.74,
    "bombChance": 0.39,
    "specialFruitChance": 0.16,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4712
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 3769,
      "two": 5654,
      "three": 8481
    },
    "rewards": {
      "baseCoins": 78
    }
  },
  "level_240": {
    "id": "level_240",
    "levelNumber": 240,
    "worldId": "world_8",
    "title": "World 8 Boss",
    "duration": 82,
    "difficultyTier": 7,
    "difficultyValue": 0.764,
    "spawnRateMs": 659,
    "fruitSpeedMultiplier": 1.92,
    "fruitSizeMultiplier": 0.74,
    "bombChance": 0.39,
    "specialFruitChance": 0.16,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SURVIVAL_TIME",
        "target": 82
      },
      {
        "type": "SCORE",
        "target": 11964
      },
      {
        "type": "NO_BOMB",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 1968,
      "two": 2952,
      "three": 4428
    },
    "rewards": {
      "baseCoins": 78
    }
  },
  "level_241": {
    "id": "level_241",
    "levelNumber": 241,
    "worldId": "world_9",
    "title": "Level 241",
    "duration": 64,
    "difficultyTier": 7,
    "difficultyValue": 0.768,
    "spawnRateMs": 655,
    "fruitSpeedMultiplier": 1.92,
    "fruitSizeMultiplier": 0.74,
    "bombChance": 0.4,
    "specialFruitChance": 0.16,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 91
      }
    ],
    "starThresholds": {
      "one": 1092,
      "two": 1638,
      "three": 2457
    },
    "rewards": {
      "baseCoins": 79
    }
  },
  "level_242": {
    "id": "level_242",
    "levelNumber": 242,
    "worldId": "world_9",
    "title": "Level 242",
    "duration": 64,
    "difficultyTier": 7,
    "difficultyValue": 0.772,
    "spawnRateMs": 650,
    "fruitSpeedMultiplier": 1.93,
    "fruitSizeMultiplier": 0.74,
    "bombChance": 0.4,
    "specialFruitChance": 0.16,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 24
      }
    ],
    "starThresholds": {
      "one": 960,
      "two": 1440,
      "three": 2160
    },
    "rewards": {
      "baseCoins": 79
    }
  },
  "level_243": {
    "id": "level_243",
    "levelNumber": 243,
    "worldId": "world_9",
    "title": "Level 243",
    "duration": 64,
    "difficultyTier": 7,
    "difficultyValue": 0.776,
    "spawnRateMs": 646,
    "fruitSpeedMultiplier": 1.93,
    "fruitSizeMultiplier": 0.73,
    "bombChance": 0.4,
    "specialFruitChance": 0.16,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4805
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 3844,
      "two": 5766,
      "three": 8649
    },
    "rewards": {
      "baseCoins": 79
    }
  },
  "level_244": {
    "id": "level_244",
    "levelNumber": 244,
    "worldId": "world_9",
    "title": "Level 244",
    "duration": 65,
    "difficultyTier": 8,
    "difficultyValue": 0.78,
    "spawnRateMs": 642,
    "fruitSpeedMultiplier": 1.94,
    "fruitSizeMultiplier": 0.73,
    "bombChance": 0.4,
    "specialFruitChance": 0.16,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 6437
      }
    ],
    "starThresholds": {
      "one": 5149,
      "two": 7724,
      "three": 11586
    },
    "rewards": {
      "baseCoins": 80
    }
  },
  "level_245": {
    "id": "level_245",
    "levelNumber": 245,
    "worldId": "world_9",
    "title": "Level 245",
    "duration": 65,
    "difficultyTier": 8,
    "difficultyValue": 0.784,
    "spawnRateMs": 638,
    "fruitSpeedMultiplier": 1.94,
    "fruitSizeMultiplier": 0.73,
    "bombChance": 0.4,
    "specialFruitChance": 0.16,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 93
      }
    ],
    "starThresholds": {
      "one": 1116,
      "two": 1674,
      "three": 2511
    },
    "rewards": {
      "baseCoins": 80
    }
  },
  "level_246": {
    "id": "level_246",
    "levelNumber": 246,
    "worldId": "world_9",
    "title": "Level 246",
    "duration": 65,
    "difficultyTier": 8,
    "difficultyValue": 0.787,
    "spawnRateMs": 633,
    "fruitSpeedMultiplier": 1.94,
    "fruitSizeMultiplier": 0.73,
    "bombChance": 0.4,
    "specialFruitChance": 0.16,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 24
      }
    ],
    "starThresholds": {
      "one": 960,
      "two": 1440,
      "three": 2160
    },
    "rewards": {
      "baseCoins": 80
    }
  },
  "level_247": {
    "id": "level_247",
    "levelNumber": 247,
    "worldId": "world_9",
    "title": "Level 247",
    "duration": 65,
    "difficultyTier": 8,
    "difficultyValue": 0.791,
    "spawnRateMs": 629,
    "fruitSpeedMultiplier": 1.95,
    "fruitSizeMultiplier": 0.73,
    "bombChance": 0.41,
    "specialFruitChance": 0.16,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4897
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 3917,
      "two": 5876,
      "three": 8814
    },
    "rewards": {
      "baseCoins": 81
    }
  },
  "level_248": {
    "id": "level_248",
    "levelNumber": 248,
    "worldId": "world_9",
    "title": "Level 248",
    "duration": 65,
    "difficultyTier": 8,
    "difficultyValue": 0.795,
    "spawnRateMs": 625,
    "fruitSpeedMultiplier": 1.95,
    "fruitSizeMultiplier": 0.72,
    "bombChance": 0.41,
    "specialFruitChance": 0.16,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 6560
      }
    ],
    "starThresholds": {
      "one": 5248,
      "two": 7872,
      "three": 11808
    },
    "rewards": {
      "baseCoins": 81
    }
  },
  "level_249": {
    "id": "level_249",
    "levelNumber": 249,
    "worldId": "world_9",
    "title": "Level 249",
    "duration": 65,
    "difficultyTier": 8,
    "difficultyValue": 0.799,
    "spawnRateMs": 621,
    "fruitSpeedMultiplier": 1.96,
    "fruitSizeMultiplier": 0.72,
    "bombChance": 0.41,
    "specialFruitChance": 0.16,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 94
      }
    ],
    "starThresholds": {
      "one": 1128,
      "two": 1692,
      "three": 2538
    },
    "rewards": {
      "baseCoins": 81
    }
  },
  "level_250": {
    "id": "level_250",
    "levelNumber": 250,
    "worldId": "world_9",
    "title": "Level 250",
    "duration": 66,
    "difficultyTier": 8,
    "difficultyValue": 0.803,
    "spawnRateMs": 616,
    "fruitSpeedMultiplier": 1.96,
    "fruitSizeMultiplier": 0.72,
    "bombChance": 0.41,
    "specialFruitChance": 0.16,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 25
      }
    ],
    "starThresholds": {
      "one": 1000,
      "two": 1500,
      "three": 2250
    },
    "rewards": {
      "baseCoins": 82
    }
  },
  "level_251": {
    "id": "level_251",
    "levelNumber": 251,
    "worldId": "world_9",
    "title": "Level 251",
    "duration": 66,
    "difficultyTier": 8,
    "difficultyValue": 0.807,
    "spawnRateMs": 612,
    "fruitSpeedMultiplier": 1.97,
    "fruitSizeMultiplier": 0.72,
    "bombChance": 0.41,
    "specialFruitChance": 0.17,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 4990
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 3992,
      "two": 5988,
      "three": 8982
    },
    "rewards": {
      "baseCoins": 82
    }
  },
  "level_252": {
    "id": "level_252",
    "levelNumber": 252,
    "worldId": "world_9",
    "title": "Level 252",
    "duration": 66,
    "difficultyTier": 8,
    "difficultyValue": 0.811,
    "spawnRateMs": 608,
    "fruitSpeedMultiplier": 1.97,
    "fruitSizeMultiplier": 0.71,
    "bombChance": 0.41,
    "specialFruitChance": 0.17,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 6684
      }
    ],
    "starThresholds": {
      "one": 5347,
      "two": 8020,
      "three": 12031
    },
    "rewards": {
      "baseCoins": 82
    }
  },
  "level_253": {
    "id": "level_253",
    "levelNumber": 253,
    "worldId": "world_9",
    "title": "Level 253",
    "duration": 66,
    "difficultyTier": 8,
    "difficultyValue": 0.814,
    "spawnRateMs": 604,
    "fruitSpeedMultiplier": 1.98,
    "fruitSizeMultiplier": 0.71,
    "bombChance": 0.42,
    "specialFruitChance": 0.17,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 96
      }
    ],
    "starThresholds": {
      "one": 1152,
      "two": 1728,
      "three": 2592
    },
    "rewards": {
      "baseCoins": 83
    }
  },
  "level_254": {
    "id": "level_254",
    "levelNumber": 254,
    "worldId": "world_9",
    "title": "Level 254",
    "duration": 66,
    "difficultyTier": 8,
    "difficultyValue": 0.818,
    "spawnRateMs": 599,
    "fruitSpeedMultiplier": 1.98,
    "fruitSizeMultiplier": 0.71,
    "bombChance": 0.42,
    "specialFruitChance": 0.17,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 25
      }
    ],
    "starThresholds": {
      "one": 1000,
      "two": 1500,
      "three": 2250
    },
    "rewards": {
      "baseCoins": 83
    }
  },
  "level_255": {
    "id": "level_255",
    "levelNumber": 255,
    "worldId": "world_9",
    "title": "Level 255",
    "duration": 67,
    "difficultyTier": 8,
    "difficultyValue": 0.822,
    "spawnRateMs": 595,
    "fruitSpeedMultiplier": 1.99,
    "fruitSizeMultiplier": 0.71,
    "bombChance": 0.42,
    "specialFruitChance": 0.17,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5083
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 4066,
      "two": 6099,
      "three": 9149
    },
    "rewards": {
      "baseCoins": 84
    }
  },
  "level_256": {
    "id": "level_256",
    "levelNumber": 256,
    "worldId": "world_9",
    "title": "Level 256",
    "duration": 67,
    "difficultyTier": 8,
    "difficultyValue": 0.826,
    "spawnRateMs": 591,
    "fruitSpeedMultiplier": 1.99,
    "fruitSizeMultiplier": 0.7,
    "bombChance": 0.42,
    "specialFruitChance": 0.17,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 6808
      }
    ],
    "starThresholds": {
      "one": 5446,
      "two": 8169,
      "three": 12254
    },
    "rewards": {
      "baseCoins": 84
    }
  },
  "level_257": {
    "id": "level_257",
    "levelNumber": 257,
    "worldId": "world_9",
    "title": "Level 257",
    "duration": 67,
    "difficultyTier": 8,
    "difficultyValue": 0.83,
    "spawnRateMs": 586,
    "fruitSpeedMultiplier": 2,
    "fruitSizeMultiplier": 0.7,
    "bombChance": 0.42,
    "specialFruitChance": 0.17,
    "maxSimultaneousFruits": 5,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 98
      }
    ],
    "starThresholds": {
      "one": 1176,
      "two": 1764,
      "three": 2646
    },
    "rewards": {
      "baseCoins": 84
    }
  },
  "level_258": {
    "id": "level_258",
    "levelNumber": 258,
    "worldId": "world_9",
    "title": "Level 258",
    "duration": 67,
    "difficultyTier": 8,
    "difficultyValue": 0.834,
    "spawnRateMs": 582,
    "fruitSpeedMultiplier": 2,
    "fruitSizeMultiplier": 0.7,
    "bombChance": 0.43,
    "specialFruitChance": 0.17,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 25
      }
    ],
    "starThresholds": {
      "one": 1000,
      "two": 1500,
      "three": 2250
    },
    "rewards": {
      "baseCoins": 85
    }
  },
  "level_259": {
    "id": "level_259",
    "levelNumber": 259,
    "worldId": "world_9",
    "title": "Level 259",
    "duration": 67,
    "difficultyTier": 8,
    "difficultyValue": 0.838,
    "spawnRateMs": 578,
    "fruitSpeedMultiplier": 2.01,
    "fruitSizeMultiplier": 0.7,
    "bombChance": 0.43,
    "specialFruitChance": 0.17,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5176
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 4140,
      "two": 6211,
      "three": 9316
    },
    "rewards": {
      "baseCoins": 85
    }
  },
  "level_260": {
    "id": "level_260",
    "levelNumber": 260,
    "worldId": "world_9",
    "title": "Level 260",
    "duration": 67,
    "difficultyTier": 8,
    "difficultyValue": 0.842,
    "spawnRateMs": 574,
    "fruitSpeedMultiplier": 2.01,
    "fruitSizeMultiplier": 0.69,
    "bombChance": 0.43,
    "specialFruitChance": 0.17,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 6933
      }
    ],
    "starThresholds": {
      "one": 5546,
      "two": 8319,
      "three": 12479
    },
    "rewards": {
      "baseCoins": 85
    }
  },
  "level_261": {
    "id": "level_261",
    "levelNumber": 261,
    "worldId": "world_9",
    "title": "Level 261",
    "duration": 68,
    "difficultyTier": 8,
    "difficultyValue": 0.846,
    "spawnRateMs": 569,
    "fruitSpeedMultiplier": 2.01,
    "fruitSizeMultiplier": 0.69,
    "bombChance": 0.43,
    "specialFruitChance": 0.17,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 99
      }
    ],
    "starThresholds": {
      "one": 1188,
      "two": 1782,
      "three": 2673
    },
    "rewards": {
      "baseCoins": 86
    }
  },
  "level_262": {
    "id": "level_262",
    "levelNumber": 262,
    "worldId": "world_9",
    "title": "Level 262",
    "duration": 68,
    "difficultyTier": 8,
    "difficultyValue": 0.849,
    "spawnRateMs": 565,
    "fruitSpeedMultiplier": 2.02,
    "fruitSizeMultiplier": 0.69,
    "bombChance": 0.43,
    "specialFruitChance": 0.17,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 26
      }
    ],
    "starThresholds": {
      "one": 1040,
      "two": 1560,
      "three": 2340
    },
    "rewards": {
      "baseCoins": 86
    }
  },
  "level_263": {
    "id": "level_263",
    "levelNumber": 263,
    "worldId": "world_9",
    "title": "Level 263",
    "duration": 68,
    "difficultyTier": 8,
    "difficultyValue": 0.853,
    "spawnRateMs": 561,
    "fruitSpeedMultiplier": 2.02,
    "fruitSizeMultiplier": 0.69,
    "bombChance": 0.43,
    "specialFruitChance": 0.17,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5270
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 4216,
      "two": 6324,
      "three": 9486
    },
    "rewards": {
      "baseCoins": 86
    }
  },
  "level_264": {
    "id": "level_264",
    "levelNumber": 264,
    "worldId": "world_9",
    "title": "Level 264",
    "duration": 68,
    "difficultyTier": 8,
    "difficultyValue": 0.857,
    "spawnRateMs": 556,
    "fruitSpeedMultiplier": 2.03,
    "fruitSizeMultiplier": 0.69,
    "bombChance": 0.44,
    "specialFruitChance": 0.17,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 7058
      }
    ],
    "starThresholds": {
      "one": 5646,
      "two": 8469,
      "three": 12704
    },
    "rewards": {
      "baseCoins": 87
    }
  },
  "level_265": {
    "id": "level_265",
    "levelNumber": 265,
    "worldId": "world_9",
    "title": "Level 265",
    "duration": 68,
    "difficultyTier": 8,
    "difficultyValue": 0.861,
    "spawnRateMs": 552,
    "fruitSpeedMultiplier": 2.03,
    "fruitSizeMultiplier": 0.68,
    "bombChance": 0.44,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 101
      }
    ],
    "starThresholds": {
      "one": 1212,
      "two": 1818,
      "three": 2727
    },
    "rewards": {
      "baseCoins": 87
    }
  },
  "level_266": {
    "id": "level_266",
    "levelNumber": 266,
    "worldId": "world_9",
    "title": "Level 266",
    "duration": 68,
    "difficultyTier": 8,
    "difficultyValue": 0.865,
    "spawnRateMs": 548,
    "fruitSpeedMultiplier": 2.04,
    "fruitSizeMultiplier": 0.68,
    "bombChance": 0.44,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 26
      }
    ],
    "starThresholds": {
      "one": 1040,
      "two": 1560,
      "three": 2340
    },
    "rewards": {
      "baseCoins": 87
    }
  },
  "level_267": {
    "id": "level_267",
    "levelNumber": 267,
    "worldId": "world_9",
    "title": "Level 267",
    "duration": 69,
    "difficultyTier": 8,
    "difficultyValue": 0.869,
    "spawnRateMs": 544,
    "fruitSpeedMultiplier": 2.04,
    "fruitSizeMultiplier": 0.68,
    "bombChance": 0.44,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5364
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 4291,
      "two": 6436,
      "three": 9655
    },
    "rewards": {
      "baseCoins": 88
    }
  },
  "level_268": {
    "id": "level_268",
    "levelNumber": 268,
    "worldId": "world_9",
    "title": "Level 268",
    "duration": 69,
    "difficultyTier": 8,
    "difficultyValue": 0.873,
    "spawnRateMs": 539,
    "fruitSpeedMultiplier": 2.05,
    "fruitSizeMultiplier": 0.68,
    "bombChance": 0.44,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 7183
      }
    ],
    "starThresholds": {
      "one": 5746,
      "two": 8619,
      "three": 12929
    },
    "rewards": {
      "baseCoins": 88
    }
  },
  "level_269": {
    "id": "level_269",
    "levelNumber": 269,
    "worldId": "world_9",
    "title": "Level 269",
    "duration": 69,
    "difficultyTier": 8,
    "difficultyValue": 0.877,
    "spawnRateMs": 535,
    "fruitSpeedMultiplier": 2.05,
    "fruitSizeMultiplier": 0.67,
    "bombChance": 0.44,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 102
      }
    ],
    "starThresholds": {
      "one": 1224,
      "two": 1836,
      "three": 2754
    },
    "rewards": {
      "baseCoins": 88
    }
  },
  "level_270": {
    "id": "level_270",
    "levelNumber": 270,
    "worldId": "world_9",
    "title": "World 9 Boss",
    "duration": 86,
    "difficultyTier": 8,
    "difficultyValue": 0.881,
    "spawnRateMs": 531,
    "fruitSpeedMultiplier": 2.06,
    "fruitSizeMultiplier": 0.67,
    "bombChance": 0.45,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SURVIVAL_TIME",
        "target": 86
      },
      {
        "type": "SCORE",
        "target": 13712
      },
      {
        "type": "NO_BOMB",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2064,
      "two": 3096,
      "three": 4644
    },
    "rewards": {
      "baseCoins": 89
    }
  },
  "level_271": {
    "id": "level_271",
    "levelNumber": 271,
    "worldId": "world_10",
    "title": "Level 271",
    "duration": 69,
    "difficultyTier": 8,
    "difficultyValue": 0.885,
    "spawnRateMs": 526,
    "fruitSpeedMultiplier": 2.06,
    "fruitSizeMultiplier": 0.67,
    "bombChance": 0.45,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5458
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 4366,
      "two": 6549,
      "three": 9824
    },
    "rewards": {
      "baseCoins": 89
    }
  },
  "level_272": {
    "id": "level_272",
    "levelNumber": 272,
    "worldId": "world_10",
    "title": "Level 272",
    "duration": 69,
    "difficultyTier": 8,
    "difficultyValue": 0.889,
    "spawnRateMs": 522,
    "fruitSpeedMultiplier": 2.07,
    "fruitSizeMultiplier": 0.67,
    "bombChance": 0.45,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 7309
      }
    ],
    "starThresholds": {
      "one": 5847,
      "two": 8770,
      "three": 13156
    },
    "rewards": {
      "baseCoins": 89
    }
  },
  "level_273": {
    "id": "level_273",
    "levelNumber": 273,
    "worldId": "world_10",
    "title": "Level 273",
    "duration": 70,
    "difficultyTier": 9,
    "difficultyValue": 0.893,
    "spawnRateMs": 518,
    "fruitSpeedMultiplier": 2.07,
    "fruitSizeMultiplier": 0.66,
    "bombChance": 0.45,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 104
      }
    ],
    "starThresholds": {
      "one": 1248,
      "two": 1872,
      "three": 2808
    },
    "rewards": {
      "baseCoins": 90
    }
  },
  "level_274": {
    "id": "level_274",
    "levelNumber": 274,
    "worldId": "world_10",
    "title": "Level 274",
    "duration": 70,
    "difficultyTier": 9,
    "difficultyValue": 0.897,
    "spawnRateMs": 513,
    "fruitSpeedMultiplier": 2.08,
    "fruitSizeMultiplier": 0.66,
    "bombChance": 0.45,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 27
      }
    ],
    "starThresholds": {
      "one": 1080,
      "two": 1620,
      "three": 2430
    },
    "rewards": {
      "baseCoins": 90
    }
  },
  "level_275": {
    "id": "level_275",
    "levelNumber": 275,
    "worldId": "world_10",
    "title": "Level 275",
    "duration": 70,
    "difficultyTier": 9,
    "difficultyValue": 0.901,
    "spawnRateMs": 509,
    "fruitSpeedMultiplier": 2.08,
    "fruitSizeMultiplier": 0.66,
    "bombChance": 0.46,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5553
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 4442,
      "two": 6663,
      "three": 9995
    },
    "rewards": {
      "baseCoins": 91
    }
  },
  "level_276": {
    "id": "level_276",
    "levelNumber": 276,
    "worldId": "world_10",
    "title": "Level 276",
    "duration": 70,
    "difficultyTier": 9,
    "difficultyValue": 0.904,
    "spawnRateMs": 505,
    "fruitSpeedMultiplier": 2.09,
    "fruitSizeMultiplier": 0.66,
    "bombChance": 0.46,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 7435
      }
    ],
    "starThresholds": {
      "one": 5948,
      "two": 8922,
      "three": 13383
    },
    "rewards": {
      "baseCoins": 91
    }
  },
  "level_277": {
    "id": "level_277",
    "levelNumber": 277,
    "worldId": "world_10",
    "title": "Level 277",
    "duration": 70,
    "difficultyTier": 9,
    "difficultyValue": 0.908,
    "spawnRateMs": 500,
    "fruitSpeedMultiplier": 2.09,
    "fruitSizeMultiplier": 0.65,
    "bombChance": 0.46,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 105
      }
    ],
    "starThresholds": {
      "one": 1260,
      "two": 1890,
      "three": 2835
    },
    "rewards": {
      "baseCoins": 91
    }
  },
  "level_278": {
    "id": "level_278",
    "levelNumber": 278,
    "worldId": "world_10",
    "title": "Level 278",
    "duration": 71,
    "difficultyTier": 9,
    "difficultyValue": 0.912,
    "spawnRateMs": 496,
    "fruitSpeedMultiplier": 2.09,
    "fruitSizeMultiplier": 0.65,
    "bombChance": 0.46,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 27
      }
    ],
    "starThresholds": {
      "one": 1080,
      "two": 1620,
      "three": 2430
    },
    "rewards": {
      "baseCoins": 92
    }
  },
  "level_279": {
    "id": "level_279",
    "levelNumber": 279,
    "worldId": "world_10",
    "title": "Level 279",
    "duration": 71,
    "difficultyTier": 9,
    "difficultyValue": 0.916,
    "spawnRateMs": 492,
    "fruitSpeedMultiplier": 2.1,
    "fruitSizeMultiplier": 0.65,
    "bombChance": 0.46,
    "specialFruitChance": 0.18,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5647
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 4517,
      "two": 6776,
      "three": 10164
    },
    "rewards": {
      "baseCoins": 92
    }
  },
  "level_280": {
    "id": "level_280",
    "levelNumber": 280,
    "worldId": "world_10",
    "title": "Level 280",
    "duration": 71,
    "difficultyTier": 9,
    "difficultyValue": 0.92,
    "spawnRateMs": 487,
    "fruitSpeedMultiplier": 2.1,
    "fruitSizeMultiplier": 0.65,
    "bombChance": 0.46,
    "specialFruitChance": 0.19,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 7562
      }
    ],
    "starThresholds": {
      "one": 6049,
      "two": 9074,
      "three": 13611
    },
    "rewards": {
      "baseCoins": 92
    }
  },
  "level_281": {
    "id": "level_281",
    "levelNumber": 281,
    "worldId": "world_10",
    "title": "Level 281",
    "duration": 71,
    "difficultyTier": 9,
    "difficultyValue": 0.924,
    "spawnRateMs": 483,
    "fruitSpeedMultiplier": 2.11,
    "fruitSizeMultiplier": 0.65,
    "bombChance": 0.47,
    "specialFruitChance": 0.19,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 107
      }
    ],
    "starThresholds": {
      "one": 1284,
      "two": 1926,
      "three": 2889
    },
    "rewards": {
      "baseCoins": 93
    }
  },
  "level_282": {
    "id": "level_282",
    "levelNumber": 282,
    "worldId": "world_10",
    "title": "Level 282",
    "duration": 71,
    "difficultyTier": 9,
    "difficultyValue": 0.928,
    "spawnRateMs": 478,
    "fruitSpeedMultiplier": 2.11,
    "fruitSizeMultiplier": 0.64,
    "bombChance": 0.47,
    "specialFruitChance": 0.19,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 28
      }
    ],
    "starThresholds": {
      "one": 1120,
      "two": 1680,
      "three": 2520
    },
    "rewards": {
      "baseCoins": 93
    }
  },
  "level_283": {
    "id": "level_283",
    "levelNumber": 283,
    "worldId": "world_10",
    "title": "Level 283",
    "duration": 71,
    "difficultyTier": 9,
    "difficultyValue": 0.932,
    "spawnRateMs": 474,
    "fruitSpeedMultiplier": 2.12,
    "fruitSizeMultiplier": 0.64,
    "bombChance": 0.47,
    "specialFruitChance": 0.19,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5742
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 4593,
      "two": 6890,
      "three": 10335
    },
    "rewards": {
      "baseCoins": 93
    }
  },
  "level_284": {
    "id": "level_284",
    "levelNumber": 284,
    "worldId": "world_10",
    "title": "Level 284",
    "duration": 72,
    "difficultyTier": 9,
    "difficultyValue": 0.936,
    "spawnRateMs": 470,
    "fruitSpeedMultiplier": 2.12,
    "fruitSizeMultiplier": 0.64,
    "bombChance": 0.47,
    "specialFruitChance": 0.19,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 7689
      }
    ],
    "starThresholds": {
      "one": 6151,
      "two": 9226,
      "three": 13840
    },
    "rewards": {
      "baseCoins": 94
    }
  },
  "level_285": {
    "id": "level_285",
    "levelNumber": 285,
    "worldId": "world_10",
    "title": "Level 285",
    "duration": 72,
    "difficultyTier": 9,
    "difficultyValue": 0.94,
    "spawnRateMs": 465,
    "fruitSpeedMultiplier": 2.13,
    "fruitSizeMultiplier": 0.64,
    "bombChance": 0.47,
    "specialFruitChance": 0.19,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 109
      }
    ],
    "starThresholds": {
      "one": 1308,
      "two": 1962,
      "three": 2943
    },
    "rewards": {
      "baseCoins": 94
    }
  },
  "level_286": {
    "id": "level_286",
    "levelNumber": 286,
    "worldId": "world_10",
    "title": "Level 286",
    "duration": 72,
    "difficultyTier": 9,
    "difficultyValue": 0.944,
    "spawnRateMs": 461,
    "fruitSpeedMultiplier": 2.13,
    "fruitSizeMultiplier": 0.63,
    "bombChance": 0.47,
    "specialFruitChance": 0.19,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 28
      }
    ],
    "starThresholds": {
      "one": 1120,
      "two": 1680,
      "three": 2520
    },
    "rewards": {
      "baseCoins": 94
    }
  },
  "level_287": {
    "id": "level_287",
    "levelNumber": 287,
    "worldId": "world_10",
    "title": "Level 287",
    "duration": 72,
    "difficultyTier": 9,
    "difficultyValue": 0.948,
    "spawnRateMs": 457,
    "fruitSpeedMultiplier": 2.14,
    "fruitSizeMultiplier": 0.63,
    "bombChance": 0.48,
    "specialFruitChance": 0.19,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5838
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 4670,
      "two": 7005,
      "three": 10508
    },
    "rewards": {
      "baseCoins": 95
    }
  },
  "level_288": {
    "id": "level_288",
    "levelNumber": 288,
    "worldId": "world_10",
    "title": "Level 288",
    "duration": 72,
    "difficultyTier": 9,
    "difficultyValue": 0.952,
    "spawnRateMs": 452,
    "fruitSpeedMultiplier": 2.14,
    "fruitSizeMultiplier": 0.63,
    "bombChance": 0.48,
    "specialFruitChance": 0.19,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 7816
      }
    ],
    "starThresholds": {
      "one": 6252,
      "two": 9379,
      "three": 14068
    },
    "rewards": {
      "baseCoins": 95
    }
  },
  "level_289": {
    "id": "level_289",
    "levelNumber": 289,
    "worldId": "world_10",
    "title": "Level 289",
    "duration": 73,
    "difficultyTier": 9,
    "difficultyValue": 0.956,
    "spawnRateMs": 448,
    "fruitSpeedMultiplier": 2.15,
    "fruitSizeMultiplier": 0.63,
    "bombChance": 0.48,
    "specialFruitChance": 0.19,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 110
      }
    ],
    "starThresholds": {
      "one": 1320,
      "two": 1980,
      "three": 2970
    },
    "rewards": {
      "baseCoins": 96
    }
  },
  "level_290": {
    "id": "level_290",
    "levelNumber": 290,
    "worldId": "world_10",
    "title": "Level 290",
    "duration": 73,
    "difficultyTier": 9,
    "difficultyValue": 0.96,
    "spawnRateMs": 443,
    "fruitSpeedMultiplier": 2.15,
    "fruitSizeMultiplier": 0.62,
    "bombChance": 0.48,
    "specialFruitChance": 0.19,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 29
      }
    ],
    "starThresholds": {
      "one": 1160,
      "two": 1740,
      "three": 2610
    },
    "rewards": {
      "baseCoins": 96
    }
  },
  "level_291": {
    "id": "level_291",
    "levelNumber": 291,
    "worldId": "world_10",
    "title": "Level 291",
    "duration": 73,
    "difficultyTier": 9,
    "difficultyValue": 0.964,
    "spawnRateMs": 439,
    "fruitSpeedMultiplier": 2.16,
    "fruitSizeMultiplier": 0.62,
    "bombChance": 0.48,
    "specialFruitChance": 0.19,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 5933
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 4746,
      "two": 7119,
      "three": 10679
    },
    "rewards": {
      "baseCoins": 96
    }
  },
  "level_292": {
    "id": "level_292",
    "levelNumber": 292,
    "worldId": "world_10",
    "title": "Level 292",
    "duration": 73,
    "difficultyTier": 9,
    "difficultyValue": 0.968,
    "spawnRateMs": 435,
    "fruitSpeedMultiplier": 2.16,
    "fruitSizeMultiplier": 0.62,
    "bombChance": 0.49,
    "specialFruitChance": 0.19,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 7943
      }
    ],
    "starThresholds": {
      "one": 6354,
      "two": 9531,
      "three": 14297
    },
    "rewards": {
      "baseCoins": 97
    }
  },
  "level_293": {
    "id": "level_293",
    "levelNumber": 293,
    "worldId": "world_10",
    "title": "Level 293",
    "duration": 73,
    "difficultyTier": 9,
    "difficultyValue": 0.972,
    "spawnRateMs": 430,
    "fruitSpeedMultiplier": 2.17,
    "fruitSizeMultiplier": 0.62,
    "bombChance": 0.49,
    "specialFruitChance": 0.19,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 112
      }
    ],
    "starThresholds": {
      "one": 1344,
      "two": 2016,
      "three": 3024
    },
    "rewards": {
      "baseCoins": 97
    }
  },
  "level_294": {
    "id": "level_294",
    "levelNumber": 294,
    "worldId": "world_10",
    "title": "Level 294",
    "duration": 73,
    "difficultyTier": 9,
    "difficultyValue": 0.976,
    "spawnRateMs": 426,
    "fruitSpeedMultiplier": 2.17,
    "fruitSizeMultiplier": 0.61,
    "bombChance": 0.49,
    "specialFruitChance": 0.2,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 29
      }
    ],
    "starThresholds": {
      "one": 1160,
      "two": 1740,
      "three": 2610
    },
    "rewards": {
      "baseCoins": 97
    }
  },
  "level_295": {
    "id": "level_295",
    "levelNumber": 295,
    "worldId": "world_10",
    "title": "Level 295",
    "duration": 74,
    "difficultyTier": 9,
    "difficultyValue": 0.98,
    "spawnRateMs": 422,
    "fruitSpeedMultiplier": 2.18,
    "fruitSizeMultiplier": 0.61,
    "bombChance": 0.49,
    "specialFruitChance": 0.2,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 6029
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 4823,
      "two": 7234,
      "three": 10852
    },
    "rewards": {
      "baseCoins": 98
    }
  },
  "level_296": {
    "id": "level_296",
    "levelNumber": 296,
    "worldId": "world_10",
    "title": "Level 296",
    "duration": 74,
    "difficultyTier": 9,
    "difficultyValue": 0.984,
    "spawnRateMs": 417,
    "fruitSpeedMultiplier": 2.18,
    "fruitSizeMultiplier": 0.61,
    "bombChance": 0.49,
    "specialFruitChance": 0.2,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 8071
      }
    ],
    "starThresholds": {
      "one": 6456,
      "two": 9685,
      "three": 14527
    },
    "rewards": {
      "baseCoins": 98
    }
  },
  "level_297": {
    "id": "level_297",
    "levelNumber": 297,
    "worldId": "world_10",
    "title": "Level 297",
    "duration": 74,
    "difficultyTier": 9,
    "difficultyValue": 0.988,
    "spawnRateMs": 413,
    "fruitSpeedMultiplier": 2.19,
    "fruitSizeMultiplier": 0.61,
    "bombChance": 0.49,
    "specialFruitChance": 0.2,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "FRUIT_COUNT",
        "target": 113
      }
    ],
    "starThresholds": {
      "one": 1356,
      "two": 2034,
      "three": 3051
    },
    "rewards": {
      "baseCoins": 98
    }
  },
  "level_298": {
    "id": "level_298",
    "levelNumber": 298,
    "worldId": "world_10",
    "title": "Level 298",
    "duration": 74,
    "difficultyTier": 9,
    "difficultyValue": 0.992,
    "spawnRateMs": 408,
    "fruitSpeedMultiplier": 2.19,
    "fruitSizeMultiplier": 0.6,
    "bombChance": 0.5,
    "specialFruitChance": 0.2,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "COMBO",
        "target": 29
      }
    ],
    "starThresholds": {
      "one": 1160,
      "two": 1740,
      "three": 2610
    },
    "rewards": {
      "baseCoins": 99
    }
  },
  "level_299": {
    "id": "level_299",
    "levelNumber": 299,
    "worldId": "world_10",
    "title": "Level 299",
    "duration": 74,
    "difficultyTier": 9,
    "difficultyValue": 0.996,
    "spawnRateMs": 404,
    "fruitSpeedMultiplier": 2.2,
    "fruitSizeMultiplier": 0.6,
    "bombChance": 0.5,
    "specialFruitChance": 0.2,
    "maxSimultaneousFruits": 6,
    "spawnPattern": "MIXED",
    "objectives": [
      {
        "type": "SCORE",
        "target": 6125
      },
      {
        "type": "BOMB_AVOIDANCE",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 4900,
      "two": 7350,
      "three": 11025
    },
    "rewards": {
      "baseCoins": 99
    }
  },
  "level_300": {
    "id": "level_300",
    "levelNumber": 300,
    "worldId": "world_10",
    "title": "World 10 Boss",
    "duration": 90,
    "difficultyTier": 10,
    "difficultyValue": 1,
    "spawnRateMs": 400,
    "fruitSpeedMultiplier": 2.2,
    "fruitSizeMultiplier": 0.6,
    "bombChance": 0.5,
    "specialFruitChance": 0.2,
    "maxSimultaneousFruits": 7,
    "spawnPattern": "BURST",
    "objectives": [
      {
        "type": "SURVIVAL_TIME",
        "target": 90
      },
      {
        "type": "SCORE",
        "target": 15500
      },
      {
        "type": "NO_BOMB",
        "booleanTarget": true
      }
    ],
    "starThresholds": {
      "one": 2160,
      "two": 3240,
      "three": 4860
    },
    "rewards": {
      "baseCoins": 100
    }
  }
};
