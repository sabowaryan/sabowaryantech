import { DesignTokens } from '@/lib/types/components';

export const designTokens: DesignTokens = {
  colors: {
    primary: '#C51F5D',
    dark: '#141D26',
    secondary: '#243447',
    light: '#E2E2D2',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    background: '#FFFFFF',
    foreground: '#0F172A',
    muted: '#64748B',
    border: '#E2E8F0',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
    medium: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    hard: '0 10px 40px -10px rgba(0, 0, 0, 0.2), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  animation: {
    'fade-in': 'fadeIn 0.5s ease-in-out',
    'slide-up': 'slideUp 0.3s ease-out',
    'slide-down': 'slideDown 0.3s ease-out',
    'scale-in': 'scaleIn 0.2s ease-out',
    'spin-slow': 'spin 2s linear infinite',
  },
};

// Color palette utilities
export const colorPalette = {
  primary: {
    50: '#F8E8EF',
    100: '#F0D1DF',
    200: '#E1A3BF',
    300: '#D2759F',
    400: '#C3477F',
    500: '#C51F5D',
    600: '#9E1949',
    700: '#771337',
    800: '#500D25',
    900: '#280713',
  },
  dark: {
    50: '#F5F6F7',
    100: '#EBEDEF',
    200: '#D7DBDF',
    300: '#C3C9CF',
    400: '#AFB7BF',
    500: '#9BA5AF',
    600: '#7C848C',
    700: '#5D6369',
    800: '#3E4246',
    900: '#141D26',
  },
  secondary: {
    50: '#F6F7F8',
    100: '#EDEEF1',
    200: '#DBDDE3',
    300: '#C9CCD5',
    400: '#B7BBC7',
    500: '#A5AAB9',
    600: '#848894',
    700: '#63666F',
    800: '#42444A',
    900: '#243447',
  },
  light: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#E2E2D2',
    600: '#B5B5A6',
    700: '#88887A',
    800: '#5B5B4E',
    900: '#2E2E22',
  },
};

// Semantic color mappings
export const semanticColors = {
  success: {
    light: '#ECFDF5',
    main: '#10B981',
    dark: '#047857',
  },
  warning: {
    light: '#FFFBEB',
    main: '#F59E0B',
    dark: '#B45309',
  },
  error: {
    light: '#FEF2F2',
    main: '#EF4444',
    dark: '#B91C1C',
  },
  info: {
    light: '#F0F9FF',
    main: '#0EA5E9',
    dark: '#0369A1',
  },
};

export default designTokens;