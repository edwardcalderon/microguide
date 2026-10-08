import { Pressable, StyleSheet, Text } from 'react-native';

import { Icon, type IconName } from '@/components/ui/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useThemeTokens } from '@/hooks/use-theme-tokens';

export function Chip({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon?: IconName;
  active?: boolean;
  onPress: () => void;
}) {
  const { colors } = useThemeTokens();
  const iconColor = active ? colors.accentInk : colors.textSecondary;
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
      {icon ? <Icon name={icon} size={14} color={iconColor} /> : null}
      <Text style={[styles.label, { color: iconColor }]}>{label}</Text>
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
  label: { fontSize: 12, fontWeight: '600' },
});
