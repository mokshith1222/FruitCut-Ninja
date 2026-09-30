export const PineappleSVG = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="pineBody" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFD54F"/>
      <stop offset="60%" stop-color="#FFA000"/>
      <stop offset="100%" stop-color="#E65100"/>
    </radialGradient>
    <!-- Simple diamond pattern for the pineapple skin -->
    <pattern id="pineDiamonds" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="16" height="16" fill="none" stroke="#E65100" stroke-width="1.5" opacity="0.6"/>
      <circle cx="8" cy="8" r="1.5" fill="#3E2723" opacity="0.8"/>
    </pattern>
  </defs>
  
  <ellipse cx="64" cy="115" rx="35" ry="10" fill="#000000" opacity="0.3" filter="blur(4px)"/>
  
  <!-- Crown / Leaves -->
  <path d="M 64 45 C 30 20, 20 -5, 20 -5 C 40 10, 55 25, 64 45 Z" fill="#4CAF50" stroke="#1B5E20" stroke-width="1"/>
  <path d="M 64 45 C 40 10, 50 -15, 50 -15 C 60 10, 64 25, 64 45 Z" fill="#66BB6A" stroke="#1B5E20" stroke-width="1"/>
  <path d="M 64 45 C 98 20, 108 -5, 108 -5 C 88 10, 73 25, 64 45 Z" fill="#4CAF50" stroke="#1B5E20" stroke-width="1"/>
  <path d="M 64 45 C 88 10, 78 -15, 78 -15 C 68 10, 64 25, 64 45 Z" fill="#66BB6A" stroke="#1B5E20" stroke-width="1"/>
  <path d="M 64 45 C 64 0, 64 -20, 64 -20 C 70 10, 64 25, 64 45 Z" fill="#81C784" stroke="#1B5E20" stroke-width="1"/>
  
  <!-- Body -->
  <ellipse cx="64" cy="80" rx="40" ry="45" fill="url(#pineBody)"/>
  <ellipse cx="64" cy="80" rx="40" ry="45" fill="url(#pineDiamonds)"/>
  
  <!-- Highlight -->
  <path d="M35 60 C 40 45, 50 40, 60 40 C 50 50, 45 60, 40 75 Z" fill="#FFFFFF" opacity="0.4"/>
</svg>`;

export const PineappleLeftSVG = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <path d="M 64 35 A 40 45 0 0 0 64 125 Z" fill="#FFA000"/>
  <path d="M 64 38 A 36 42 0 0 0 64 122 Z" fill="#FFE082"/>
  <path d="M 64 48 A 20 32 0 0 0 64 112 Z" fill="#FFF9C4"/>
</svg>`;

export const PineappleRightSVG = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <path d="M 64 35 A 40 45 0 0 1 64 125 Z" fill="#FFA000"/>
  <path d="M 64 38 A 36 42 0 0 1 64 122 Z" fill="#FFE082"/>
  <path d="M 64 48 A 20 32 0 0 1 64 112 Z" fill="#FFF9C4"/>
</svg>`;
