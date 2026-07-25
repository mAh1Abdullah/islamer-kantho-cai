import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind class names safely — later classes win over earlier
 * conflicting ones (e.g. cn('p-4', condition && 'p-6') -> 'p-6').
 * Every component in components/ should compose classNames through this,
 * never string concatenation.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
