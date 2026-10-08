import { Pressable, StyleSheet, Text } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useThemeTokens } from '@/hooks/use-theme-tokens';

export function Chip({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: string;
  active?: boolean;
  onPress: () => void;
}) {
  const { colors } = useThemeTokens();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: !!active }}
      hitSlop={4}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: active ? colors.accent : colors.surface,
          borderColor: active ? colors.accent : colors.line,
          opacity: pressed ? 0.75 : 1,
        },
      ]}
    >
      <Text style={styles.icon} accessibilityElementsHidden>
        {icon}
      </Text>
      <Text style={[styles.label, { color: active ? colors.accentInk : colors.textSecondary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    minHeight: 40,
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  icon: { fontSize: 13 },
  label: { fontSize: 12, fontWeight: '600' },
});
