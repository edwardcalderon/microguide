import Constants from 'expo-constants';
import { StyleSheet, Text } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useThemeTokens } from '@/hooks/use-theme-tokens';

/**
 * Tiny, out-of-the-way version stamp — reads the version from `app.json`
 * (via `expo-constants`) instead of a hardcoded string, so it can never go
 * stale after a release bump.
 */
export function VersionFooter() {
  const { colors } = useThemeTokens();
  const version = Constants.expoConfig?.version;
  if (!version) return null;

  return (
    <Text style={[styles.text, { color: colors.textTertiary }]} accessibilityElementsHidden>
      MicroGuide v{version}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.2,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
  },
});
