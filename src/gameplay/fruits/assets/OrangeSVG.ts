export const OrangeSVG = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="orangeBody" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFB74D"/>
      <stop offset="50%" stop-color="#FF9100"/>
      <stop offset="100%" stop-color="#E65100"/>
    </radialGradient>
    <radialGradient id="orangeHighlight" cx="30%" cy="25%" r="40%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dimples" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="#E65100" opacity="0.3"/>
    </pattern>
  </defs>
  
  <ellipse cx="64" cy="110" rx="40" ry="10" fill="#000000" opacity="0.3" filter="blur(4px)"/>
  
  <circle cx="64" cy="64" r="50" fill="url(#orangeBody)"/>
  <circle cx="64" cy="64" r="50" fill="url(#dimples)"/>
  
  <path d="M40 30 A 35 35 0 0 1 70 20" fill="none" stroke="url(#orangeHighlight)" stroke-width="8" stroke-linecap="round"/>
  
  <!-- Little stem point -->
  <circle cx="64" cy="16" r="3" fill="#3E2723"/>
  <path d="M64 16 Q 70 8 78 12 Q 72 16 64 16 Z" fill="#4CAF50"/>
</svg>`;

export const OrangeLeftSVG = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <path d="M 64 14 A 50 50 0 0 0 64 114 Z" fill="#E65100"/>
  <path d="M 64 18 A 46 46 0 0 0 64 110 Z" fill="#FFF3E0"/>
  <path d="M 64 22 A 42 42 0 0 0 64 106 Z" fill="#FFA726"/>
  <!-- Segments -->
  <path d="M 64 22 L 64 106 M 64 64 L 28 36 M 64 64 L 20 64 M 64 64 L 28 92 M 64 64 L 46 22 M 64 64 L 46 106" stroke="#FFF3E0" stroke-width="3" stroke-linecap="round"/>
</svg>`;

export const OrangeRightSVG = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <path d="M 64 14 A 50 50 0 0 1 64 114 Z" fill="#E65100"/>
  <path d="M 64 18 A 46 46 0 0 1 64 110 Z" fill="#FFF3E0"/>
  <path d="M 64 22 A 42 42 0 0 1 64 106 Z" fill="#FFA726"/>
  <!-- Segments -->
  <path d="M 64 22 L 64 106 M 64 64 L 100 36 M 64 64 L 108 64 M 64 64 L 100 92 M 64 64 L 82 22 M 64 64 L 82 106" stroke="#FFF3E0" stroke-width="3" stroke-linecap="round"/>
</svg>`;
