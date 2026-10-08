import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from '@/components/ui/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useThemeTokens } from '@/hooks/use-theme-tokens';
import { type ToastKind, useToastStore } from '@/store/toast-store';

const KIND_ICON: Record<ToastKind, IconName> = {
  info: 'information-circle',
  success: 'checkmark-circle',
  warn: 'alert-circle',
  error: 'close-circle',
};

export function ToastHost() {
  const toasts = useToastStore((s) => s.toasts);
  const { colors } = useThemeTokens();
  const insets = useSafeAreaInsets();

  if (toasts.length === 0) return null;

  const kindFill: Record<ToastKind, string> = {
    info: colors.accentStrong,
    success: colors.success,
    warn: colors.landmark,
    error: colors.danger,
  };

  return (
    <View
      style={[styles.host, { bottom: insets.bottom + Spacing.lg, pointerEvents: 'none' }]}
      accessibilityLiveRegion="polite"
    >
      {toasts.map((toast) => (
        <View
          key={toast.id}
          style={[styles.toast, { backgroundColor: kindFill[toast.kind], shadowColor: kindFill[toast.kind] }]}
        >
          <Icon name={KIND_ICON[toast.kind]} size={18} color="#fff" />
          <Text style={styles.text}>{toast.message}</Text>
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
    gap: Spacing.sm,
    zIndex: 50,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    maxWidth: 560 - Spacing.md * 2,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.pill,
    paddingVertical: 12,
    paddingHorizontal: Spacing.lg,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  text: { flexShrink: 1, fontSize: 13, fontWeight: '700', color: '#fff', lineHeight: 18 },
});
