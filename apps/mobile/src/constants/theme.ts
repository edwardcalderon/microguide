/**
 * MicroGuide design tokens — ported from the web prototype's CSS variables.
 * Warm paper + teal accent in light mode, navy + mint teal in dark mode.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    background: '#F7F5F0',
    surface: '#FFFFFF',
    surfaceAlt: '#F1EEE6',
    text: '#1C1917',
    textSecondary: '#57534E',
    textTertiary: '#8A8580',
    line: '#E7E2D8',
    accent: '#0D9488',
    accentStrong: '#0F766E',
    accentInk: '#FFFFFF',
    landmark: '#D97706',
    success: '#15803D',
    warn: '#B45309',
    danger: '#B91C1C',
  },
  dark: {
    background: '#0B1220',
    surface: '#111827',
    surfaceAlt: '#1A2332',
    text: '#F1F5F9',
    textSecondary: '#B4C0D1',
    textTertiary: '#748299',
    line: '#263244',
    accent: '#2DD4BF',
    accentStrong: '#5EEAD4',
    accentInk: '#06201C',
    landmark: '#FBBF24',
    success: '#4ADE80',
    warn: '#FCD34D',
    danger: '#F87171',
  },
} as const;

export type ThemeMode = keyof typeof Colors;
export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: { sans: 'System', mono: 'Menlo' },
  android: { sans: 'sans-serif', mono: 'monospace' },
  default: { sans: 'System', mono: 'monospace' },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
} as const;
