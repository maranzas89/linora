/**
 * Color tokens for the Liquid Glass Design System.
 */

/** Glass surface backgrounds (light mode) */
export const glassColors = {
  bgLight: 'rgba(255, 255, 255, 0.1)',
  bgMedium: 'rgba(255, 255, 255, 0.2)',
  bgStrong: 'rgba(255, 255, 255, 0.3)',
  border: 'rgba(255, 255, 255, 0.18)',
  shadow: 'rgba(0, 0, 0, 0.05)',
} as const;

/** Glass surface backgrounds (dark mode) */
export const glassDarkColors = {
  bgLight: 'rgba(255, 255, 255, 0.05)',
  bgMedium: 'rgba(255, 255, 255, 0.1)',
  bgStrong: 'rgba(255, 255, 255, 0.15)',
  border: 'rgba(255, 255, 255, 0.1)',
  shadow: 'rgba(0, 0, 0, 0.3)',
} as const;

/** Overlay / popover backgrounds */
export const overlayColors = {
  backdrop: 'rgba(0, 0, 0, 0.4)',
  popover: 'rgba(0, 0, 0, 0.85)',
} as const;

/** Semantic status colors */
export const statusColors = {
  success: { base: '#43e97b', light: 'rgba(67, 233, 123, 0.2)', border: 'rgba(74, 222, 128, 0.3)' },
  warning: { base: '#fee140', light: 'rgba(251, 191, 36, 0.2)', border: 'rgba(251, 191, 36, 0.3)' },
  error:   { base: '#f5576c', light: 'rgba(239, 68, 68, 0.2)',  border: 'rgba(248, 113, 113, 0.3)' },
  info:    { base: '#FDBA74', light: 'rgba(253, 186, 116, 0.2)', border: 'rgba(253, 186, 116, 0.3)' },
} as const;

/** Brand accents */
export const brandColors = {
  primary: '#34D399',
  secondary: '#3B82F6',
  accent: '#9CA3AF',
} as const;

/** Text opacity levels on dark backgrounds */
export const textColors = {
  primary: 'rgba(255, 255, 255, 1)',
  secondary: 'rgba(255, 255, 255, 0.9)',
  tertiary: 'rgba(255, 255, 255, 0.7)',
  muted: 'rgba(255, 255, 255, 0.6)',
  placeholder: 'rgba(255, 255, 255, 0.5)',
  disabled: 'rgba(255, 255, 255, 0.4)',
} as const;

/** Composite colors object (backward-compatible with tokens.ts) */
export const colors = {
  glass: glassColors,
  glassDark: glassDarkColors,
  overlay: overlayColors,
  status: statusColors,
  brand: brandColors,
  text: textColors,
} as const;
