import Phaser from 'phaser';
import { MainScene } from './scenes/MainScene';

export const createGame = (parentContainerId: string) => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: parentContainerId,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#1A1A2E', // Match theme
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300, x: 0 },
        debug: false
      }
    },
    scene: [MainScene]
  };

  return new Phaser.Game(config);
};
