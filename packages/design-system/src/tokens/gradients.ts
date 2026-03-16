/**
 * Gradient tokens for the Liquid Glass Design System.
 */

export const gradients = {
  primary:   'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
  secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  accent:    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  success:   'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  warning:   'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',

  /** Tailwind class pairs for use with `bg-gradient-to-*` */
  tw: {
    primary:   { from: 'from-blue-400/20',   to: 'to-purple-500/20'  },
    secondary: { from: 'from-pink-400/20',   to: 'to-rose-500/20'   },
    accent:    { from: 'from-cyan-400/20',   to: 'to-blue-400/20'   },
    success:   { from: 'from-green-400/20',  to: 'to-teal-400/20'   },
    warning:   { from: 'from-amber-400/20',  to: 'to-orange-400/20' },
  },
} as const;
