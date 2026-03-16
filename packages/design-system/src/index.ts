/**
 * @wens-project/liquid-glass
 * ===========================
 * Liquid Glass Design System — Main Entry Point
 *
 * This is the public API surface. Every export here is self-contained
 * and portable — no imports reach outside this package.
 *
 * Usage (components):
 *   import { GlassButton, GlassCard, useToast } from '@wens-project/liquid-glass';
 *
 * Usage (tokens):
 *   import { colors, shadows, glassTw } from '@wens-project/liquid-glass';
 *
 * Styles (import once at app root CSS):
 *   @import '@wens-project/liquid-glass/styles/fonts.css';
 *   @import '@wens-project/liquid-glass/styles/theme.css';
 */

// ===========================================================================
// Utility
// ===========================================================================

export { cn } from './lib/cn';

// ===========================================================================
// Design Tokens
// ===========================================================================

export {
  colors,
  glassColors,
  glassDarkColors,
  overlayColors,
  statusColors,
  brandColors,
  textColors,
} from './tokens/colors';

export { gradients } from './tokens/gradients';
export { spacing } from './tokens/spacing';
export { radius } from './tokens/radius';
export { typography } from './tokens/typography';
export { shadows } from './tokens/shadows';
export { backdrop } from './tokens/backdrop';
export { animation } from './tokens/animation';
export { glassTw } from './tokens/glass-tw';

// ===========================================================================
// UI Components
// ===========================================================================

// --- Inputs & Controls ---
export { GlassButton } from './components/ui/GlassButton';
export type { GlassButtonProps, GlassButtonVariant, GlassButtonSize } from './components/ui/GlassButton';

export { GlassInput } from './components/ui/GlassInput';
export type { GlassInputProps } from './components/ui/GlassInput';

export { GlassTextarea } from './components/ui/GlassTextarea';
export type { GlassTextareaProps } from './components/ui/GlassTextarea';

// --- Display & Layout ---
export { GlassCard } from './components/ui/GlassCard';
export type { GlassCardProps, GlassCardVariant, GlassCardPadding } from './components/ui/GlassCard';

export { GlassBadge } from './components/ui/GlassBadge';
export type { GlassBadgeProps, GlassBadgeVariant, GlassBadgeSize } from './components/ui/GlassBadge';

// --- Navigation & Shell ---
export { GlassSidebar } from './components/ui/GlassSidebar';
export type { GlassSidebarProps, SidebarItem } from './components/ui/GlassSidebar';

// --- Feedback ---
export { GlassToast, GlassToastContainer, useToast } from './components/ui/GlassToast';
export type {
  Toast,
  ToastVariant,
  ToastPosition,
  GlassToastProps,
  GlassToastContainerProps,
} from './components/ui/GlassToast';
