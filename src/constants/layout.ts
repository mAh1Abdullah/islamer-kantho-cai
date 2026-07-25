/**
 * Layout tokens — container widths, section spacing, breakpoints.
 * Single source of truth for spatial rhythm across the app.
 */

export const layout = {
  containerMaxWidth: 1280, // px
  containerPaddingX: {
    mobile: 20,
    tablet: 32,
    desktop: 48,
  },
  sectionSpacing: {
    desktop: 120, // py-[120px]
    tablet: 80,
    mobile: 48,
  },
  headerHeight: 80,
  headerHeightMobile: 64,
} as const;

export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
} as const;

export const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;
