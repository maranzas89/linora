/**
 * Minimal class-name merge utility.
 * Filters out falsy values and joins with a single space.
 *
 * Usage:
 *   cn('base-class', condition && 'conditional-class', className)
 */
export function cn(...inputs: (string | false | null | undefined)[]): string {
  return inputs.filter(Boolean).join(' ');
}
