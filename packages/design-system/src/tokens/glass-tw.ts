/**
 * Pre-built Tailwind class strings for common Liquid Glass patterns.
 */

export const glassTw = {
  /** Base glass surface */
  surface: 'backdrop-blur-lg backdrop-saturate-150 bg-white/10 border border-white/20',
  /** Popover / overlay surface (dark opaque) */
  popover: 'backdrop-blur-xl backdrop-saturate-150 bg-black/85 border border-white/20',
  /** Standard transition */
  transition: 'transition-all duration-300',
  /** Interactive hover scale */
  hoverScale: 'hover:scale-105 active:scale-95',
  /** Disabled state */
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
} as const;
