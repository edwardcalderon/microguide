import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeTokens } from '@/hooks/use-theme-tokens';

export function Screen({ children, scroll = true }: { children: ReactNode; scroll?: boolean }) {
  const { colors } = useThemeTokens();
  const insets = useSafeAreaInsets();

  const Container = scroll ? ScrollView : View;

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Container
        style={scroll ? styles.clamp : [styles.flexFill, styles.clamp]}
        contentContainerStyle={scroll ? [styles.content, { paddingBottom: insets.bottom + 32 }] : undefined}
      >
        {children}
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center' },
  flexFill: { flex: 1 },
  // Keeps the phone-shaped layout intact at any width — a plain "screen" has no
  // natural max width, so on a wide browser window or tablet it would otherwise
  // stretch the single-column flow edge to edge instead of reading as a mobile screen.
  clamp: { width: '100%', maxWidth: 560 },
  content: { flexGrow: 1 },
});
