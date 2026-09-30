export interface FruitDefinition {
  id: string;
  name: string;
  baseSize: number;
  weight: number;      // Affects gravity/trajectory
  points: number;
  juiceColor: number;  // Hex color for splash particles
  fleshColor: number;  // Secondary color for fragments
  svgWhole: string;    // SVG data for whole fruit
  svgLeft: string;     // SVG data for left/top cut half (shows interior)
  svgRight: string;    // SVG data for right/bottom cut half (shows interior)
  pngWhole: string;    // Base64 PNG data URI for whole fruit
  pngLeft: string;     // Base64 PNG data URI for left cut half
  pngRight: string;    // Base64 PNG data URI for right cut half
  shadowOffset: number;
  rotationSpeed: number; // Base angular velocity multiplier
  isBomb?: boolean;
  effect?: string;
}
