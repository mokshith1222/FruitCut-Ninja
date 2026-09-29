export const FruitSVGs: Record<string, string> = {
  // --- APPLE ---
  apple: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="appleGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#ff7b7b"/>
        <stop offset="70%" stop-color="#e62121"/>
        <stop offset="100%" stop-color="#b31212"/>
      </radialGradient>
    </defs>
    <path d="M64 24 C 80 10, 110 20, 115 50 C 120 80, 100 115, 64 120 C 28 115, 8 80, 13 50 C 18 20, 48 10, 64 24 Z" fill="url(#appleGrad)" stroke="#8b0000" stroke-width="2"/>
    <path d="M64 28 Q 74 10 90 8 Q 80 20 64 28" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
    <path d="M62 10 Q 64 20 64 28" fill="none" stroke="#5d4037" stroke-width="4" stroke-linecap="round"/>
    <path d="M40 40 Q 30 60 40 80" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.4"/>
  </svg>`,
  apple_left: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="appleLGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#e62121"/>
        <stop offset="80%" stop-color="#ff7b7b"/>
        <stop offset="95%" stop-color="#ffffff"/>
      </linearGradient>
    </defs>
    <path d="M64 24 C 48 10, 18 20, 13 50 C 8 80, 28 115, 64 120 Z" fill="url(#appleLGrad)" stroke="#8b0000" stroke-width="2"/>
    <path d="M64 24 L 64 120 C 50 110, 20 80, 20 50 C 20 30, 40 18, 64 24 Z" fill="#fffdd0"/>
    <ellipse cx="56" cy="64" rx="4" ry="8" fill="#3e2723" transform="rotate(-15 56 64)"/>
    <path d="M62 10 Q 64 20 64 28" fill="none" stroke="#5d4037" stroke-width="4" stroke-linecap="round"/>
  </svg>`,
  apple_right: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="appleRGrad" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#e62121"/>
        <stop offset="80%" stop-color="#ff7b7b"/>
        <stop offset="95%" stop-color="#ffffff"/>
      </linearGradient>
    </defs>
    <path d="M64 24 C 80 10, 110 20, 115 50 C 120 80, 100 115, 64 120 Z" fill="url(#appleRGrad)" stroke="#8b0000" stroke-width="2"/>
    <path d="M64 24 L 64 120 C 78 110, 108 80, 108 50 C 108 30, 88 18, 64 24 Z" fill="#fffdd0"/>
    <ellipse cx="72" cy="64" rx="4" ry="8" fill="#3e2723" transform="rotate(15 72 64)"/>
    <path d="M64 28 Q 74 10 90 8 Q 80 20 64 28" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>
  </svg>`,

  // --- ORANGE ---
  orange: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="orgGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#ffb74d"/>
        <stop offset="80%" stop-color="#ff8f00"/>
        <stop offset="100%" stop-color="#e65100"/>
      </radialGradient>
      <pattern id="dimples" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#e65100" opacity="0.3"/>
      </pattern>
    </defs>
    <circle cx="64" cy="64" r="56" fill="url(#orgGrad)" stroke="#e65100" stroke-width="2"/>
    <circle cx="64" cy="64" r="56" fill="url(#dimples)"/>
    <path d="M40 40 A 30 30 0 0 1 60 25" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
    <circle cx="64" cy="18" r="3" fill="#3e2723"/>
    <path d="M64 18 Q 70 8 80 12 Q 70 18 64 18" fill="#4caf50"/>
  </svg>`,
  orange_left: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M64 8 A 56 56 0 0 0 64 120 Z" fill="#ffb74d" stroke="#e65100" stroke-width="2"/>
    <path d="M64 14 A 50 50 0 0 0 64 114 Z" fill="#fff3e0"/>
    <path d="M64 20 A 44 44 0 0 0 64 108 Z" fill="#ffa726"/>
    <path d="M64 20 L 64 108 M 64 64 L 28 36 M 64 64 L 20 64 M 64 64 L 28 92 M 64 64 L 46 22 M 64 64 L 46 106" stroke="#fff3e0" stroke-width="3"/>
  </svg>`,
  orange_right: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M64 8 A 56 56 0 0 1 64 120 Z" fill="#ffb74d" stroke="#e65100" stroke-width="2"/>
    <path d="M64 14 A 50 50 0 0 1 64 114 Z" fill="#fff3e0"/>
    <path d="M64 20 A 44 44 0 0 1 64 108 Z" fill="#ffa726"/>
    <path d="M64 20 L 64 108 M 64 64 L 100 36 M 64 64 L 108 64 M 64 64 L 100 92 M 64 64 L 82 22 M 64 64 L 82 106" stroke="#fff3e0" stroke-width="3"/>
  </svg>`,

  // --- WATERMELON ---
  watermelon: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="wmGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#4caf50"/>
        <stop offset="70%" stop-color="#2e7d32"/>
        <stop offset="100%" stop-color="#1b5e20"/>
      </radialGradient>
    </defs>
    <ellipse cx="64" cy="64" rx="58" ry="48" fill="url(#wmGrad)" stroke="#1b5e20" stroke-width="2"/>
    <path d="M 20 40 Q 64 20 108 40" fill="none" stroke="#81c784" stroke-width="6" opacity="0.6"/>
    <path d="M 10 64 Q 64 44 118 64" fill="none" stroke="#81c784" stroke-width="8" opacity="0.6"/>
    <path d="M 20 88 Q 64 68 108 88" fill="none" stroke="#81c784" stroke-width="6" opacity="0.6"/>
    <path d="M 40 30 A 20 10 0 0 1 60 25" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.4"/>
  </svg>`,
  watermelon_left: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M 64 16 A 48 58 0 0 0 64 112 Z" fill="#2e7d32" stroke="#1b5e20" stroke-width="2"/>
    <path d="M 64 22 A 42 52 0 0 0 64 106 Z" fill="#e8f5e9"/>
    <path d="M 64 26 A 38 48 0 0 0 64 102 Z" fill="#d32f2f"/>
    <!-- Seeds -->
    <circle cx="50" cy="40" r="3" fill="#000"/><circle cx="40" cy="64" r="3" fill="#000"/><circle cx="50" cy="88" r="3" fill="#000"/>
    <circle cx="58" cy="52" r="3" fill="#000"/><circle cx="58" cy="76" r="3" fill="#000"/>
  </svg>`,
  watermelon_right: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M 64 16 A 48 58 0 0 1 64 112 Z" fill="#2e7d32" stroke="#1b5e20" stroke-width="2"/>
    <path d="M 64 22 A 42 52 0 0 1 64 106 Z" fill="#e8f5e9"/>
    <path d="M 64 26 A 38 48 0 0 1 64 102 Z" fill="#d32f2f"/>
    <!-- Seeds -->
    <circle cx="78" cy="40" r="3" fill="#000"/><circle cx="88" cy="64" r="3" fill="#000"/><circle cx="78" cy="88" r="3" fill="#000"/>
    <circle cx="70" cy="52" r="3" fill="#000"/><circle cx="70" cy="76" r="3" fill="#000"/>
  </svg>`,

  // --- BOMB ---
  bomb: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bombGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#4a4a4a"/>
        <stop offset="70%" stop-color="#111111"/>
        <stop offset="100%" stop-color="#000000"/>
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <!-- Base -->
    <circle cx="64" cy="74" r="46" fill="url(#bombGrad)" stroke="#000000" stroke-width="3"/>
    <path d="M 40 50 A 20 20 0 0 1 55 40" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.3"/>
    <!-- Cap -->
    <rect x="54" y="24" width="20" height="12" rx="2" fill="#333" stroke="#000" stroke-width="2"/>
    <path d="M54 28 L74 28" stroke="#111" stroke-width="2"/>
    <!-- Fuse -->
    <path d="M 64 24 Q 70 10 85 15" fill="none" stroke="#8d6e63" stroke-width="4" stroke-linecap="round"/>
    <!-- Spark -->
    <circle cx="85" cy="15" r="6" fill="#ffeb3b" filter="url(#glow)"/>
    <circle cx="85" cy="15" r="3" fill="#ff5722"/>
    <!-- Danger Symbol (Skull eyes) -->
    <path d="M 50 65 L 58 75 M 58 65 L 50 75" stroke="#ff1744" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
    <path d="M 70 65 L 78 75 M 78 65 L 70 75" stroke="#ff1744" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
  </svg>`,
  fast_bomb: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="fbombGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#b71c1c"/>
        <stop offset="70%" stop-color="#880000"/>
        <stop offset="100%" stop-color="#440000"/>
      </radialGradient>
      <filter id="fglow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <!-- Base -->
    <circle cx="64" cy="74" r="46" fill="url(#fbombGrad)" stroke="#440000" stroke-width="3"/>
    <path d="M 40 50 A 20 20 0 0 1 55 40" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.3"/>
    <!-- Cap -->
    <rect x="54" y="24" width="20" height="12" rx="2" fill="#333" stroke="#000" stroke-width="2"/>
    <path d="M54 28 L74 28" stroke="#111" stroke-width="2"/>
    <!-- Fuse -->
    <path d="M 64 24 Q 70 10 85 15" fill="none" stroke="#8d6e63" stroke-width="4" stroke-linecap="round"/>
    <!-- Spark -->
    <circle cx="85" cy="15" r="8" fill="#ffeb3b" filter="url(#fglow)"/>
    <circle cx="85" cy="15" r="4" fill="#ff5722"/>
  </svg>`,

  // --- BANANA ---
  banana: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="banGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff59d"/>
        <stop offset="50%" stop-color="#fdd835"/>
        <stop offset="100%" stop-color="#fbc02d"/>
      </linearGradient>
    </defs>
    <path d="M 20 100 Q 50 120 90 90 Q 110 70 115 30 Q 80 50 50 60 Q 20 70 20 100 Z" fill="url(#banGrad)" stroke="#f57f17" stroke-width="2"/>
    <path d="M 115 30 L 110 20 L 105 25" fill="#795548"/>
    <path d="M 20 100 L 15 105 L 25 110" fill="#795548"/>
    <path d="M 40 85 Q 70 80 95 50" fill="none" stroke="#fff59d" stroke-width="3" opacity="0.5"/>
  </svg>`,
  banana_left: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M 64 16 L 64 112 Q 50 110 30 90 Q 15 70 15 40 Q 35 30 64 16 Z" fill="#fdd835" stroke="#f57f17" stroke-width="2"/>
    <path d="M 64 24 L 64 104 Q 52 102 36 86 Q 23 70 23 44 Q 40 36 64 24 Z" fill="#fff9c4"/>
    <circle cx="56" cy="64" r="2" fill="#3e2723" opacity="0.3"/>
  </svg>`,
  banana_right: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M 64 16 L 64 112 Q 78 110 98 90 Q 113 70 113 40 Q 93 30 64 16 Z" fill="#fdd835" stroke="#f57f17" stroke-width="2"/>
    <path d="M 64 24 L 64 104 Q 76 102 92 86 Q 105 70 105 44 Q 88 36 64 24 Z" fill="#fff9c4"/>
    <circle cx="72" cy="64" r="2" fill="#3e2723" opacity="0.3"/>
  </svg>`,

  // --- STRAWBERRY ---
  strawberry: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="strawGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#ff5252"/>
        <stop offset="80%" stop-color="#d32f2f"/>
        <stop offset="100%" stop-color="#b71c1c"/>
      </radialGradient>
      <pattern id="strawSeeds" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <ellipse cx="8" cy="8" rx="1.5" ry="2.5" fill="#ffeb3b" opacity="0.8"/>
      </pattern>
    </defs>
    <path d="M 64 110 C 20 80, 20 30, 40 20 C 50 15, 64 25, 64 25 C 64 25, 78 15, 88 20 C 108 30, 108 80, 64 110 Z" fill="url(#strawGrad)" stroke="#b71c1c" stroke-width="2"/>
    <path d="M 64 110 C 20 80, 20 30, 40 20 C 50 15, 64 25, 64 25 C 64 25, 78 15, 88 20 C 108 30, 108 80, 64 110 Z" fill="url(#strawSeeds)"/>
    <path d="M 64 25 C 50 20, 30 10, 40 30 C 45 40, 55 35, 64 25 Z" fill="#4caf50" stroke="#2e7d32" stroke-width="1"/>
    <path d="M 64 25 C 78 20, 98 10, 88 30 C 83 40, 73 35, 64 25 Z" fill="#4caf50" stroke="#2e7d32" stroke-width="1"/>
    <path d="M 64 25 L 64 10" fill="none" stroke="#2e7d32" stroke-width="4" stroke-linecap="round"/>
  </svg>`,
  strawberry_left: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M 64 110 C 20 80, 20 30, 40 20 C 50 15, 64 25, 64 25 L 64 110 Z" fill="#d32f2f" stroke="#b71c1c" stroke-width="2"/>
    <path d="M 64 102 C 28 76, 28 36, 44 28 C 50 24, 64 32, 64 32 L 64 102 Z" fill="#ffcdd2"/>
    <path d="M 64 90 C 40 68, 40 44, 52 38 C 56 36, 64 42, 64 42 L 64 90 Z" fill="#ffffff"/>
  </svg>`,
  strawberry_right: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M 64 110 C 108 80, 108 30, 88 20 C 78 15, 64 25, 64 25 L 64 110 Z" fill="#d32f2f" stroke="#b71c1c" stroke-width="2"/>
    <path d="M 64 102 C 100 76, 100 36, 84 28 C 78 24, 64 32, 64 32 L 64 102 Z" fill="#ffcdd2"/>
    <path d="M 64 90 C 88 68, 88 44, 76 38 C 72 36, 64 42, 64 42 L 64 90 Z" fill="#ffffff"/>
  </svg>`,

  // --- KIWI ---
  kiwi: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="kiwiGrad" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#8d6e63"/>
        <stop offset="100%" stop-color="#5d4037"/>
      </radialGradient>
      <pattern id="fuzz" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M 2 2 L 6 6 M 6 2 L 2 6" stroke="#4e342e" stroke-width="1" opacity="0.4"/>
      </pattern>
    </defs>
    <ellipse cx="64" cy="64" rx="46" ry="56" fill="url(#kiwiGrad)" stroke="#4e342e" stroke-width="2"/>
    <ellipse cx="64" cy="64" rx="46" ry="56" fill="url(#fuzz)"/>
  </svg>`,
  kiwi_left: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M 64 8 A 46 56 0 0 0 64 120 Z" fill="#5d4037" stroke="#4e342e" stroke-width="2"/>
    <path d="M 64 12 A 42 52 0 0 0 64 116 Z" fill="#8bc34a"/>
    <path d="M 64 40 A 18 24 0 0 0 64 88 Z" fill="#f1f8e9"/>
    <!-- Seeds -->
    <circle cx="54" cy="46" r="2" fill="#000"/><circle cx="48" cy="56" r="2" fill="#000"/>
    <circle cx="48" cy="72" r="2" fill="#000"/><circle cx="54" cy="82" r="2" fill="#000"/>
    <circle cx="42" cy="64" r="2" fill="#000"/>
  </svg>`,
  kiwi_right: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M 64 8 A 46 56 0 0 1 64 120 Z" fill="#5d4037" stroke="#4e342e" stroke-width="2"/>
    <path d="M 64 12 A 42 52 0 0 1 64 116 Z" fill="#8bc34a"/>
    <path d="M 64 40 A 18 24 0 0 1 64 88 Z" fill="#f1f8e9"/>
    <!-- Seeds -->
    <circle cx="74" cy="46" r="2" fill="#000"/><circle cx="80" cy="56" r="2" fill="#000"/>
    <circle cx="80" cy="72" r="2" fill="#000"/><circle cx="74" cy="82" r="2" fill="#000"/>
    <circle cx="86" cy="64" r="2" fill="#000"/>
  </svg>`,

  // --- PINEAPPLE ---
  pineapple: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="pineGrad" cx="30%" cy="40%" r="70%">
        <stop offset="0%" stop-color="#ffd54f"/>
        <stop offset="70%" stop-color="#ffa000"/>
        <stop offset="100%" stop-color="#f57c00"/>
      </radialGradient>
    </defs>
    <!-- Leaves -->
    <path d="M 64 40 C 30 20, 20 0, 20 0 C 40 10, 55 25, 64 40 Z" fill="#4caf50" stroke="#2e7d32" stroke-width="1"/>
    <path d="M 64 40 C 40 10, 50 -10, 50 -10 C 60 10, 64 25, 64 40 Z" fill="#66bb6a" stroke="#2e7d32" stroke-width="1"/>
    <path d="M 64 40 C 98 20, 108 0, 108 0 C 88 10, 73 25, 64 40 Z" fill="#4caf50" stroke="#2e7d32" stroke-width="1"/>
    <path d="M 64 40 C 88 10, 78 -10, 78 -10 C 68 10, 64 25, 64 40 Z" fill="#66bb6a" stroke="#2e7d32" stroke-width="1"/>
    <!-- Body -->
    <ellipse cx="64" cy="80" rx="38" ry="46" fill="url(#pineGrad)" stroke="#ef6c00" stroke-width="2"/>
    <path d="M 30 55 L 98 105 M 30 75 L 85 118 M 45 45 L 98 85" stroke="#ef6c00" stroke-width="2" opacity="0.6"/>
    <path d="M 98 55 L 30 105 M 98 75 L 43 118 M 83 45 L 30 85" stroke="#ef6c00" stroke-width="2" opacity="0.6"/>
  </svg>`,
  pineapple_left: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M 64 34 A 38 46 0 0 0 64 126 Z" fill="#ffa000" stroke="#ef6c00" stroke-width="2"/>
    <path d="M 64 38 A 34 42 0 0 0 64 122 Z" fill="#ffe082"/>
    <path d="M 64 50 A 18 30 0 0 0 64 110 Z" fill="#fff9c4"/>
  </svg>`,
  pineapple_right: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M 64 34 A 38 46 0 0 1 64 126 Z" fill="#ffa000" stroke="#ef6c00" stroke-width="2"/>
    <path d="M 64 38 A 34 42 0 0 1 64 122 Z" fill="#ffe082"/>
    <path d="M 64 50 A 18 30 0 0 1 64 110 Z" fill="#fff9c4"/>
  </svg>`,

  // --- MANGO ---
  mango: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="mangoGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#ffca28"/>
        <stop offset="60%" stop-color="#ff8f00"/>
        <stop offset="100%" stop-color="#ef5350"/>
      </radialGradient>
    </defs>
    <path d="M 50 20 C 100 10, 110 70, 90 100 C 70 130, 20 110, 25 70 C 30 30, 0 30, 50 20 Z" fill="url(#mangoGrad)" stroke="#d84315" stroke-width="2"/>
    <path d="M 35 30 Q 50 25 65 35" fill="none" stroke="#ffe082" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
    <path d="M 55 18 L 50 10" stroke="#5d4037" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
  mango_left: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M 64 15 C 30 15, 20 50, 25 80 C 30 110, 50 120, 64 120 Z" fill="#ffca28" stroke="#ff8f00" stroke-width="2"/>
    <path d="M 64 21 C 36 21, 28 50, 31 78 C 35 104, 52 114, 64 114 Z" fill="#ffe082"/>
    <path d="M 64 45 A 12 25 0 0 0 64 95 Z" fill="#fff8e1"/>
  </svg>`,
  mango_right: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path d="M 64 15 C 98 15, 108 50, 103 80 C 98 110, 78 120, 64 120 Z" fill="#ffca28" stroke="#ff8f00" stroke-width="2"/>
    <path d="M 64 21 C 92 21, 100 50, 97 78 C 93 104, 76 114, 64 114 Z" fill="#ffe082"/>
    <path d="M 64 45 A 12 25 0 0 1 64 95 Z" fill="#ffb300"/>
  </svg>`,
  
  // --- SPECIALS / OTHERS ---
  golden_fruit: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="goldGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#fff59d"/>
        <stop offset="30%" stop-color="#ffd700"/>
        <stop offset="100%" stop-color="#f57f17"/>
      </radialGradient>
      <filter id="goldGlow">
        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <path d="M 64 10 C 110 10, 120 60, 100 100 C 80 140, 48 140, 28 100 C 8 60, 18 10, 64 10 Z" fill="url(#goldGrad)" stroke="#f57f17" stroke-width="2" filter="url(#goldGlow)"/>
    <path d="M 40 30 Q 64 20 88 30" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
  </svg>`,
  freeze_fruit: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="freezeGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#e0f7fa"/>
        <stop offset="50%" stop-color="#4dd0e1"/>
        <stop offset="100%" stop-color="#006064"/>
      </radialGradient>
      <filter id="iceGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <polygon points="64,10 100,30 110,70 80,110 48,110 18,70 28,30" fill="url(#freezeGrad)" stroke="#b2ebf2" stroke-width="3" filter="url(#iceGlow)"/>
    <path d="M 64 10 L 64 110 M 28 30 L 100 30 M 18 70 L 110 70 M 100 30 L 48 110" stroke="#ffffff" stroke-width="2" opacity="0.5"/>
  </svg>`,
  lightning_fruit: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="lightGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#f3e5f5"/>
        <stop offset="70%" stop-color="#ba68c8"/>
        <stop offset="100%" stop-color="#4a148c"/>
      </radialGradient>
      <filter id="lightGlow">
        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <circle cx="64" cy="64" r="48" fill="url(#lightGrad)" stroke="#ea80fc" stroke-width="2" filter="url(#lightGlow)"/>
    <polygon points="60,20 40,70 65,70 55,110 90,50 65,50" fill="#ffff00" stroke="#ffffff" stroke-width="2"/>
  </svg>`,
  crystal_fruit: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="crystGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="50%" stop-color="#e0f7fa"/>
        <stop offset="100%" stop-color="#b2ebf2"/>
      </linearGradient>
    </defs>
    <polygon points="64,10 100,40 80,110 48,110 28,40" fill="url(#crystGrad)" stroke="#ffffff" stroke-width="4"/>
    <path d="M 64 10 L 64 60 L 100 40 M 64 60 L 80 110 M 64 60 L 48 110 M 64 60 L 28 40" stroke="#80deea" stroke-width="2"/>
  </svg>`,
  fake_fruit: `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="fakeGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#9e9e9e"/>
        <stop offset="100%" stop-color="#424242"/>
      </radialGradient>
    </defs>
    <circle cx="64" cy="64" r="50" fill="url(#fakeGrad)" stroke="#212121" stroke-width="3"/>
    <text x="64" y="80" font-family="sans-serif" font-size="40" font-weight="bold" fill="#000" text-anchor="middle">?</text>
  </svg>`,

  particle_drop: `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" fill="#ffffff"/>
  </svg>`
};
