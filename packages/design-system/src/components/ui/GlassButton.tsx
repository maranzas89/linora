import React from 'react';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type GlassButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'danger'
  | 'ghost';

export type GlassButtonSize = 'sm' | 'md' | 'lg';

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant. */
  variant?: GlassButtonVariant;
  /** Size preset — controls padding and font-size. */
  size?: GlassButtonSize;
  children: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Style maps (token-aligned)
// ---------------------------------------------------------------------------

const base = [
  'relative overflow-hidden rounded-2xl',
  'backdrop-blur-md backdrop-saturate-150',
  'border border-[var(--glass-border)]',
  'transition-all duration-300',
  'hover:scale-105 hover:shadow-lg',
  'active:scale-95',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
].join(' ');

const variantMap: Record<GlassButtonVariant, string> = {
  primary: [
    'bg-[var(--glass-bg-light)] hover:bg-[var(--glass-bg-medium)] text-white',
    'shadow-[var(--shadow-btn-primary)]',
    'before:absolute before:inset-0 before:bg-gradient-to-br before:from-[var(--brand-primary)]/20 before:to-[var(--brand-secondary)]/20',
  ].join(' '),

  secondary: [
    'bg-[var(--glass-bg-light)] hover:bg-[var(--glass-bg-medium)] text-white',
    'shadow-[var(--shadow-btn-secondary)]',
    'before:absolute before:inset-0 before:bg-gradient-to-br before:from-[var(--brand-secondary)]/20 before:to-[var(--status-error)]/20',
  ].join(' '),

  accent: [
    'bg-[var(--glass-bg-light)] hover:bg-[var(--glass-bg-medium)] text-white',
    'shadow-[var(--shadow-btn-accent)]',
    'before:absolute before:inset-0 before:bg-gradient-to-br before:from-[var(--brand-accent)]/20 before:to-[var(--brand-primary)]/20',
  ].join(' '),

  success: [
    'bg-[var(--glass-bg-light)] hover:bg-[var(--glass-bg-medium)] text-white',
    'shadow-[var(--shadow-btn-success)]',
    'before:absolute before:inset-0 before:bg-gradient-to-br before:from-[var(--status-success)]/20 before:to-[var(--status-success)]/20',
  ].join(' '),

  danger: [
    'bg-[var(--glass-bg-light)] hover:bg-[var(--glass-bg-medium)] text-white',
    'shadow-[var(--shadow-btn-danger)]',
    'before:absolute before:inset-0 before:bg-gradient-to-br before:from-[var(--status-error)]/20 before:to-[var(--status-error)]/20',
  ].join(' '),

  ghost: [
    'bg-[var(--glass-bg-subtle)] hover:bg-[var(--glass-bg-light)]',
    'text-white/90 shadow-[var(--shadow-glass)]',
  ].join(' '),
};

const sizeMap: Record<GlassButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    { variant = 'primary', size = 'md', className, children, ...rest },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(base, variantMap[variant], sizeMap[size], className)}
      {...rest}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  ),
);

GlassButton.displayName = 'GlassButton';
