const colors = {
  // Primary (Glowing Orange)
  primary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#FF4500', // Glowing orange from Stitch
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    DEFAULT: '#FF4500',
  },
  // Secondary (Dark Burgundy/Charcoal)
  secondary: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#a8a29e',
    400: '#78716c',
    500: '#57534e',
    600: '#44403c',
    700: '#3a1a1a', // Burgundy undertone
    800: '#2a1515', // Deep burgundy
    900: '#1a0a0a', // Near black with warmth
    DEFAULT: '#1a0a0a',
  },
  // Custom from Stitch
  surface: {
    dark: '#1a0a0a',      // Main background
    darker: '#0f0505',    // Deeper areas
    burgundy: '#2a1515',  // Subtle burgundy
    card: 'rgba(42, 21, 21, 0.5)', // Card backgrounds
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#888888',
    muted: '#555555',
  },
  accent: {
    glow: '#FF4500',
    glowSoft: 'rgba(255, 69, 0, 0.3)',
  },
  grid: {
    line: 'rgba(255, 255, 255, 0.05)',
    lineDashed: 'rgba(255, 255, 255, 0.08)',
  }
};

module.exports = colors;
