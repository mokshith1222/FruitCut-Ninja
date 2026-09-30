export const WatermelonSVG = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="wmBody" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#4CAF50"/>
      <stop offset="60%" stop-color="#2E7D32"/>
      <stop offset="100%" stop-color="#1B5E20"/>
    </radialGradient>
    <radialGradient id="wmHighlight" cx="30%" cy="25%" r="40%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  
  <!-- Shadow -->
  <ellipse cx="64" cy="115" rx="45" ry="12" fill="#000000" opacity="0.3" filter="blur(4px)"/>
  
  <!-- Base -->
  <ellipse cx="64" cy="64" rx="55" ry="48" fill="url(#wmBody)"/>
  
  <!-- Stripes (dark green wavy lines) -->
  <path d="M 15 50 Q 64 20 113 50" fill="none" stroke="#1B5E20" stroke-width="6" opacity="0.7" stroke-linecap="round"/>
  <path d="M 10 64 Q 64 44 118 64" fill="none" stroke="#1B5E20" stroke-width="8" opacity="0.8" stroke-linecap="round"/>
  <path d="M 15 78 Q 64 68 113 78" fill="none" stroke="#1B5E20" stroke-width="6" opacity="0.7" stroke-linecap="round"/>
  <path d="M 25 92 Q 64 88 103 92" fill="none" stroke="#1B5E20" stroke-width="4" opacity="0.6" stroke-linecap="round"/>
  
  <!-- Highlight -->
  <ellipse cx="40" cy="40" rx="15" ry="10" fill="url(#wmHighlight)" transform="rotate(-30 40 40)"/>
</svg>`;

export const WatermelonLeftSVG = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wmLFlesh" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF5252"/>
      <stop offset="85%" stop-color="#D50000"/>
      <stop offset="100%" stop-color="#E8F5E9"/>
    </linearGradient>
  </defs>
  <path d="M 64 16 A 55 48 0 0 0 64 112 Z" fill="#2E7D32"/>
  <path d="M 64 20 A 49 42 0 0 0 64 108 Z" fill="#E8F5E9"/>
  <path d="M 64 24 A 45 38 0 0 0 64 104 Z" fill="url(#wmLFlesh)"/>
  
  <!-- Seeds -->
  <circle cx="50" cy="45" r="3" fill="#000"/>
  <circle cx="42" cy="64" r="3" fill="#000"/>
  <circle cx="50" cy="83" r="3" fill="#000"/>
  <circle cx="56" cy="55" r="3" fill="#000"/>
  <circle cx="56" cy="73" r="3" fill="#000"/>
</svg>`;

export const WatermelonRightSVG = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wmRFlesh" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#FF5252"/>
      <stop offset="85%" stop-color="#D50000"/>
      <stop offset="100%" stop-color="#E8F5E9"/>
    </linearGradient>
  </defs>
  <path d="M 64 16 A 55 48 0 0 1 64 112 Z" fill="#2E7D32"/>
  <path d="M 64 20 A 49 42 0 0 1 64 108 Z" fill="#E8F5E9"/>
  <path d="M 64 24 A 45 38 0 0 1 64 104 Z" fill="url(#wmRFlesh)"/>
  
  <!-- Seeds -->
  <circle cx="78" cy="45" r="3" fill="#000"/>
  <circle cx="86" cy="64" r="3" fill="#000"/>
  <circle cx="78" cy="83" r="3" fill="#000"/>
  <circle cx="72" cy="55" r="3" fill="#000"/>
  <circle cx="72" cy="73" r="3" fill="#000"/>
</svg>`;
