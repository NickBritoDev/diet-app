import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  if (typeof window !== 'undefined') {
    return twMerge(clsx(inputs));
  }
}
