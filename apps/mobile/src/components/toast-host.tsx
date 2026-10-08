import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Radius, Spacing } from '@/constants/theme';
import { useThemeTokens } from '@/hooks/use-theme-tokens';
import { useToastStore } from '@/store/toast-store';

export function ToastHost() {
  const toasts = useToastStore((s) => s.toasts);
  const { colors } = useThemeTokens();
  const insets = useSafeAreaInsets();

  if (toasts.length === 0) return null;

  return (
    <View
      style={[styles.host, { top: insets.top + Spacing.sm, pointerEvents: 'none' }]}
      accessibilityLiveRegion="polite"
    >
      {toasts.map((toast) => (
        <View key={toast.id} style={[styles.toast, { backgroundColor: colors.text }]}>
          <Text style={[styles.text, { color: colors.background }]}>{toast.message}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: Spacing.xs,
    zIndex: 50,
  },
  toast: {
    width: '100%',
    maxWidth: 560 - Spacing.md * 2,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.md,
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
  },
  text: { fontSize: 13, fontWeight: '600', textAlign: 'center' },
});
