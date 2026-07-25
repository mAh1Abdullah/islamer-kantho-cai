import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#055547',
          hover: '#043E33',
          tint: '#E6EFED',
        },
        secondary: {
          DEFAULT: '#D1BB9E',
          tint: '#F5EFE7',
        },
        background: '#FAFAF8',
        surface: '#FFFFFF',
        border: '#E8E8E8',
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
        },
        success: '#41B06E',
        error: '#E72929',
        warning: '#F59E0B',
      },
      fontFamily: {
        bangla: ['var(--font-bangla)', 'Hind Siliguri', 'Noto Sans Bengali', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        hero: ['64px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        h1: ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        h2: ['36px', { lineHeight: '1.25' }],
        h3: ['30px', { lineHeight: '1.3' }],
        h4: ['24px', { lineHeight: '1.35' }],
        body: ['18px', { lineHeight: '1.75' }],
        small: ['15px', { lineHeight: '1.6' }],
        caption: ['13px', { lineHeight: '1.5' }],
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        'section-desktop': '120px',
        'section-tablet': '80px',
        'section-mobile': '48px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s cubic-bezier(0.4,0,0.2,1) both',
        'fade-up': 'fade-up 0.4s cubic-bezier(0.4,0,0.2,1) both',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
