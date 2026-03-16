/**
 * Liquid Glass design tokens — adapted from the Liquid Glass Design System (localhost:5173).
 *
 * Edit these values to stay in sync with the source design system.
 * Every glass component in Linora should pull from this file
 * so a single update propagates everywhere.
 */

/* ── Backdrop ─────────────────────────────────────────────── */
export const glassBackdrop = {
  blur: "backdrop-blur-xl",          // 24px
  saturate: "backdrop-saturate-150", // 150%
} as const;

/* ── Surfaces ─────────────────────────────────────────────── */
export const glassSurface = {
  bg: "bg-black/85",
  border: "border border-white/20",
  shadow: "shadow-[0_16px_48px_0_rgba(0,0,0,0.2)]",
} as const;

/* ── Overlay / backdrop scrim ─────────────────────────────── */
export const glassOverlay = {
  bg: "bg-black/40",
  blur: "backdrop-blur-sm",
} as const;

/* ── Interactive states ───────────────────────────────────── */
export const glassInteractive = {
  hoverBg: "hover:bg-white/10",
  focusBorder: "focus:border-white/30",
  focusBg: "focus:bg-white/15",
} as const;

/* ── Typography on glass ──────────────────────────────────── */
export const glassText = {
  primary: "text-white",
  secondary: "text-white/70",
  placeholder: "placeholder:text-white/50",
} as const;

/* ── Transitions ──────────────────────────────────────────── */
export const glassTransition = {
  colors: "transition-colors duration-200",
  all: "transition-all duration-300",
} as const;

/* ── Radii ────────────────────────────────────────────────── */
export const glassRadius = {
  panel: "rounded-3xl",    // modals, cards
  control: "rounded-xl",   // buttons, close icons
  input: "rounded-2xl",    // form inputs
} as const;

/* ── Spacing (modal-specific) ─────────────────────────────── */
export const glassSpacing = {
  padding: "p-6",
  headerBorder: "border-b border-white/20",
  closeButton: "p-2",
} as const;

/* ── Composed class strings ───────────────────────────────── */

/** The full glass surface stack — apply to modal panels, popovers, cards. */
export const glassPanelClasses = [
  glassBackdrop.blur,
  glassBackdrop.saturate,
  glassSurface.bg,
  glassSurface.border,
  glassRadius.panel,
  glassSurface.shadow,
].join(" ");

/** The overlay/scrim behind a modal. */
export const glassOverlayClasses = [
  glassOverlay.bg,
  glassOverlay.blur,
].join(" ");
