import React from 'react';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type GlassBadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger';

export type GlassBadgeSize = 'sm' | 'md' | 'lg';

export interface GlassBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic color variant. */
  variant?: GlassBadgeVariant;
  /** Size preset. */
  size?: GlassBadgeSize;
  children: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const base = [
  'inline-flex items-center justify-center',
  'rounded-full',
  'backdrop-blur-md backdrop-saturate-150',
  'border border-[var(--glass-border)]',
  'transition-all duration-200',
].join(' ');

const variantMap: Record<GlassBadgeVariant, string> = {
  default: 'bg-[var(--glass-bg-light)] text-white/90',
  primary: 'bg-[var(--status-info-light)] text-blue-100 border-blue-400/30',
  success: 'bg-[var(--status-success-light)] text-green-100 border-green-400/30',
  warning: 'bg-[var(--status-warning-light)] text-amber-100 border-amber-400/30',
  danger:  'bg-[var(--status-error-light)] text-red-100 border-red-400/30',
};

const sizeMap: Record<GlassBadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const GlassBadge = React.forwardRef<HTMLSpanElement, GlassBadgeProps>(
  ({ variant = 'default', size = 'md', className, children, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn(base, variantMap[variant], sizeMap[size], className)}
      {...rest}
    >
      {children}
    </span>
  ),
);

GlassBadge.displayName = 'GlassBadge';
