/**
 * Design tokens — color palette.
 * This is the single source of truth. Tailwind theme, CSS variables,
 * and any JS/TS consumer must all read from here — never hardcode hex
 * values elsewhere in the codebase.
 */

export const colors = {
  primary: '#055547', // Deep Emerald — brand, links, active states
  secondary: '#D1BB9E', // Warm sand — accents, highlights, badges
  background: '#FAFAF8', // Page background
  surface: '#FFFFFF', // Card / elevated surface background
  border: '#E8E8E8', // Hairline borders and dividers
  textPrimary: '#1F2937', // Body copy, headings
  textSecondary: '#6B7280', // Meta text, captions, muted labels
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
  primaryTint: '#E6EFED', // primary at ~8% for subtle backgrounds/badges
  primaryHover: '#043E33', // primary, darkened ~15% for hover/active
  secondaryTint: '#F5EFE7', // secondary at ~15% for subtle backgrounds
} as const;
