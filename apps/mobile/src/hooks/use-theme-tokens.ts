import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';
import { useAppStore } from '@/store/app-store';

/**
 * Resolves the active palette the same way the web prototype does:
 * an explicit override wins, otherwise follow the system scheme.
 */
export function useThemeTokens() {
  const system = useColorScheme();
  const themeOverride = useAppStore((s) => s.themeOverride);

  const mode = themeOverride === 'system' ? (system ?? 'light') : themeOverride;
  const colors = Colors[mode === 'dark' ? 'dark' : 'light'];

  return { colors, mode: mode as 'light' | 'dark' };
}
