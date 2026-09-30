export const BombSVG = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bombBody" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#4A4A4A"/>
      <stop offset="60%" stop-color="#111111"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <radialGradient id="sparkGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFF00" stop-opacity="1"/>
      <stop offset="40%" stop-color="#FF5722" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#FF0000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  
  <ellipse cx="64" cy="115" rx="40" ry="12" fill="#000000" opacity="0.4" filter="blur(4px)"/>
  
  <!-- Base Sphere -->
  <circle cx="64" cy="74" r="45" fill="url(#bombBody)" stroke="#000000" stroke-width="2"/>
  
  <!-- Highlight -->
  <path d="M35 50 C 40 35, 55 30, 65 30 C 50 40, 40 55, 35 70 Z" fill="#FFFFFF" opacity="0.3"/>
  
  <!-- Cap -->
  <path d="M 50 32 L 78 32 L 74 20 L 54 20 Z" fill="#333333" stroke="#000000" stroke-width="2"/>
  <rect x="52" y="28" width="24" height="4" fill="#000000" opacity="0.5"/>
  
  <!-- Fuse -->
  <path d="M 64 20 Q 75 -5 95 15" fill="none" stroke="#8D6E63" stroke-width="5" stroke-linecap="round"/>
  
  <!-- Spark -->
  <circle cx="95" cy="15" r="15" fill="url(#sparkGlow)"/>
  <circle cx="95" cy="15" r="4" fill="#FFFFFF"/>
</svg>`;
