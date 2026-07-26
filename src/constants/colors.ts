/**
 * Design tokens — color palette.
 * This is the single source of truth. Tailwind theme, CSS variables,
 * and any JS/TS consumer must all read from here — never hardcode hex
 * values elsewhere in the codebase.
 */

export const colors = {
  primary: '#055547', // Deep Emerald — brand, links, primary actions
  secondary: '#0F766E', // Secondary brand tone
  accent: '#C8A44D', // Editorial highlight and premium accent
  background: '#FAFAF7', // Main page background
  surface: '#FFFFFF', // Cards and elevated surfaces
  border: '#E5E7EB', // Structural borders and dividers
  textPrimary: '#1F2937', // Headings and body copy
  textSecondary: '#6B7280', // Metadata and muted text
  success: '#41B06E',
  error: '#E72929',
  warning: '#F59E0B',
} as const;

export type ColorToken = keyof typeof colors;

/**
 * Tonal variants derived from the primary/secondary tokens above.
 * Kept separate so the core palette (colors) stays a flat, auditable list.
 */
export const colorTints = {
  primaryTint: '#E6EFED',
  primaryHover: '#043E33',
  secondaryTint: '#DFF3EF',
  accentTint: '#F8F0DB',
} as const;
