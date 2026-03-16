/**
 * Typography tokens for the Liquid Glass Design System.
 */

export const typography = {
  fontFamily: {
    sans:      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display:   "'Poppins', sans-serif",
    mono:      "'JetBrains Mono', 'Courier New', monospace",
    geometric: "'Space Grotesk', sans-serif",
    serif:     "'Playfair Display', Georgia, serif",
    modern:    "'Montserrat', sans-serif",
    elegant:   "'Raleway', sans-serif",
    rounded:   "'Outfit', sans-serif",
  },

  fontSize: {
    xs:   '0.75rem',    // 12px
    sm:   '0.875rem',   // 14px
    base: '1rem',       // 16px
    lg:   '1.125rem',   // 18px
    xl:   '1.25rem',    // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
    '8xl': '6rem',      // 96px
    '9xl': '8rem',      // 128px
  },

  fontWeight: {
    light:     300,
    normal:    400,
    medium:    500,
    semibold:  600,
    bold:      700,
    extrabold: 800,
    black:     900,
  },

  lineHeight: {
    none:    1,
    tight:   1.25,
    snug:    1.375,
    normal:  1.5,
    relaxed: 1.625,
    loose:   2,
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight:   '-0.025em',
    normal:  '0',
    wide:    '0.025em',
    wider:   '0.05em',
    widest:  '0.1em',
  },
} as const;
