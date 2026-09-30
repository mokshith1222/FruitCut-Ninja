export const AppleSVG = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="appleBody" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#FF5252"/>
      <stop offset="60%" stop-color="#D50000"/>
      <stop offset="100%" stop-color="#8B0000"/>
    </radialGradient>
    <radialGradient id="appleHighlight" cx="30%" cy="25%" r="40%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="appleShadow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.4"/>
    </linearGradient>
  </defs>
  
  <!-- Shadow (bottom) -->
  <ellipse cx="64" cy="115" rx="35" ry="10" fill="#000000" opacity="0.3" filter="blur(4px)"/>
  
  <!-- Base Apple Shape -->
  <path d="M64 24 C 85 10, 115 20, 115 55 C 115 90, 95 115, 64 115 C 33 115, 13 90, 13 55 C 13 20, 43 10, 64 24 Z" fill="url(#appleBody)"/>
  
  <!-- Gradient Shadow Overlay -->
  <path d="M64 24 C 85 10, 115 20, 115 55 C 115 90, 95 115, 64 115 C 33 115, 13 90, 13 55 C 13 20, 43 10, 64 24 Z" fill="url(#appleShadow)"/>
  
  <!-- Highlight -->
  <path d="M40 30 C 50 20, 70 25, 75 40 C 70 30, 50 30, 40 45 C 35 40, 35 35, 40 30 Z" fill="url(#appleHighlight)"/>
  
  <!-- Leaf -->
  <path d="M64 28 C 70 10, 95 0, 95 15 C 95 30, 75 35, 64 28 Z" fill="#4CAF50" stroke="#1B5E20" stroke-width="2"/>
  
  <!-- Stem -->
  <path d="M62 8 C 65 15, 63 22, 64 28" fill="none" stroke="#5D4037" stroke-width="4" stroke-linecap="round"/>
</svg>`;

export const AppleLeftSVG = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="appleLBody" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#FF5252"/>
      <stop offset="60%" stop-color="#D50000"/>
      <stop offset="100%" stop-color="#8B0000"/>
    </radialGradient>
    <linearGradient id="appleFlesh" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFDD0"/>
      <stop offset="80%" stop-color="#FFF59D"/>
      <stop offset="100%" stop-color="#FFE082"/>
    </linearGradient>
  </defs>
  
  <!-- Skin Layer -->
  <path d="M64 24 C 43 10, 13 20, 13 55 C 13 90, 33 115, 64 115 Z" fill="url(#appleLBody)"/>
  
  <!-- Cut Flesh Layer -->
  <path d="M64 24 L 64 115 C 45 105, 25 85, 25 55 C 25 35, 45 28, 64 24 Z" fill="url(#appleFlesh)"/>
  
  <!-- Seed Core -->
  <path d="M64 45 C 55 50, 55 70, 64 75" fill="#FFE082" opacity="0.8"/>
  <ellipse cx="58" cy="60" rx="4" ry="8" fill="#3E2723" transform="rotate(-15 58 60)"/>
  
  <!-- Stem Half -->
  <path d="M62 8 C 64 15, 63 22, 64 28" fill="none" stroke="#5D4037" stroke-width="3" stroke-linecap="round"/>
</svg>`;

export const AppleRightSVG = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="appleRBody" cx="65%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#FF5252"/>
      <stop offset="60%" stop-color="#D50000"/>
      <stop offset="100%" stop-color="#8B0000"/>
    </radialGradient>
    <linearGradient id="appleFlesh" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#FFFDD0"/>
      <stop offset="80%" stop-color="#FFF59D"/>
      <stop offset="100%" stop-color="#FFE082"/>
    </linearGradient>
  </defs>
  
  <!-- Skin Layer -->
  <path d="M64 24 C 85 10, 115 20, 115 55 C 115 90, 95 115, 64 115 Z" fill="url(#appleRBody)"/>
  
  <!-- Cut Flesh Layer -->
  <path d="M64 24 L 64 115 C 83 105, 103 85, 103 55 C 103 35, 83 28, 64 24 Z" fill="url(#appleFlesh)"/>
  
  <!-- Seed Core -->
  <path d="M64 45 C 73 50, 73 70, 64 75" fill="#FFE082" opacity="0.8"/>
  <ellipse cx="70" cy="60" rx="4" ry="8" fill="#3E2723" transform="rotate(15 70 60)"/>
  
  <!-- Leaf Half -->
  <path d="M64 28 C 70 10, 95 0, 95 15 C 95 30, 75 35, 64 28 Z" fill="#4CAF50" stroke="#1B5E20" stroke-width="2"/>
</svg>`;
