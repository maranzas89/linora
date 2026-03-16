import React from 'react';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GlassInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Optional leading icon rendered inside the input field. */
  icon?: React.ReactNode;
  /** Size preset. */
  inputSize?: 'sm' | 'md' | 'lg';
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const inputBase = [
  'w-full rounded-2xl',
  'backdrop-blur-md backdrop-saturate-150',
  'bg-[var(--glass-bg-light)]',
  'border border-[var(--glass-border)]',
  'text-white placeholder:text-white/50',
  'outline-none',
  'focus:bg-[var(--glass-bg-medium)] focus:border-[var(--glass-border-strong)]',
  'focus:shadow-[var(--shadow-glass)]',
  'transition-all duration-300',
].join(' ');

const sizeMap = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-lg',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ icon, inputSize = 'md', className, type = 'text', style, ...rest }, ref) => (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        type={type}
        style={type === 'date' ? { colorScheme: 'dark', ...style } : style}
        className={cn(
          inputBase,
          sizeMap[inputSize],
          icon ? 'pl-12' : '',
          className,
        )}
        {...rest}
      />
    </div>
  ),
);

GlassInput.displayName = 'GlassInput';
