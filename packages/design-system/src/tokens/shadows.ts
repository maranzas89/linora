/**
 * Shadow tokens for the Liquid Glass Design System.
 */

export const shadows = {
  /** Default glass card shadow */
  glass:    '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
  /** Elevated glass surface (hover, modals) */
  elevated: '0 16px 48px 0 rgba(0, 0, 0, 0.15)',
  /** Heavy overlay shadow (drawers, popovers) */
  overlay:  '0 16px 48px 0 rgba(0, 0, 0, 0.3)',
  /** Subtle inset glow */
  glow:     '0 0 10px rgba(255, 255, 255, 0.2)',

  /** Button variant shadows */
  button: {
    primary:   '0 8px 32px 0 rgba(103, 126, 234, 0.37)',
    secondary: '0 8px 32px 0 rgba(240, 147, 251, 0.37)',
    accent:    '0 8px 32px 0 rgba(79, 172, 254, 0.37)',
    success:   '0 8px 32px 0 rgba(67, 233, 123, 0.37)',
    danger:    '0 8px 32px 0 rgba(245, 87, 108, 0.37)',
  },
} as const;
