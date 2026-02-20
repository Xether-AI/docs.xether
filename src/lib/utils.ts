import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Color contrast checker for accessibility
export function getContrastRatio(color1: string, color2: string): number {
  // Simplified contrast ratio calculation
  // In production, use a proper color contrast library
  return 4.5; // Placeholder
}

export function meetsWCAGAA(contrastRatio: number): boolean {
  return contrastRatio >= 4.5;
}

export function meetsWCAGAAA(contrastRatio: number): boolean {
  return contrastRatio >= 7;
}
