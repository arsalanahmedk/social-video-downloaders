import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS class names without conflicts.
 * Used by shadcn/ui-style components like WorksWheel.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
