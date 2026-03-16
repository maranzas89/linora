import React from 'react';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GlassTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Number of visible text rows. Defaults to 4. */
  rows?: number;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const textareaBase = [
  'w-full rounded-2xl',
  'backdrop-blur-md backdrop-saturate-150',
  'bg-[var(--glass-bg-light)]',
  'border border-[var(--glass-border)]',
  'px-4 py-3',
  'text-white placeholder:text-white/50',
  'outline-none',
  'focus:bg-[var(--glass-bg-medium)] focus:border-[var(--glass-border-strong)]',
  'focus:shadow-[var(--shadow-glass)]',
  'transition-all duration-300',
  'resize-none',
].join(' ');

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const GlassTextarea = React.forwardRef<
  HTMLTextAreaElement,
  GlassTextareaProps
>(({ className, rows = 4, ...rest }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    className={cn(textareaBase, className)}
    {...rest}
  />
));

GlassTextarea.displayName = 'GlassTextarea';
