/**
 * Liquid Glass Design System — UI Primitives
 *
 * Every component in this barrel is a self-contained, package-portable
 * React component. No imports reach outside this package.
 */

// Inputs & Controls
export { GlassButton } from './GlassButton';
export type { GlassButtonProps, GlassButtonVariant, GlassButtonSize } from './GlassButton';

export { GlassInput } from './GlassInput';
export type { GlassInputProps } from './GlassInput';

export { GlassTextarea } from './GlassTextarea';
export type { GlassTextareaProps } from './GlassTextarea';

// Display & Layout
export { GlassCard } from './GlassCard';
export type { GlassCardProps, GlassCardVariant, GlassCardPadding } from './GlassCard';

export { GlassBadge } from './GlassBadge';
export type { GlassBadgeProps, GlassBadgeVariant, GlassBadgeSize } from './GlassBadge';

// Navigation & Shell
export { GlassSidebar } from './GlassSidebar';
export type { GlassSidebarProps, SidebarItem } from './GlassSidebar';

// Feedback
export { GlassToast, GlassToastContainer, useToast } from './GlassToast';
export type {
  Toast,
  ToastVariant,
  ToastPosition,
  GlassToastProps,
  GlassToastContainerProps,
} from './GlassToast';
