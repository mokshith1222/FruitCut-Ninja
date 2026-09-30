import { MainScene } from '../../scenes/MainScene';

export interface GameMode {
  init(scene: MainScene, config: any): void;
  update(delta: number): void;
  onFruitCut(fruitData: any, isBomb: boolean): void;
  onFruitMiss(fruitData: any, isBomb: boolean): void;
  cleanup(): void;
}
