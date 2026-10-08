import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useThemeTokens } from '@/hooks/use-theme-tokens';

type Variant = 'primary' | 'ghost' | 'warn';

type Props = PressableProps & {
  label: string;
  variant?: Variant;
  icon?: string;
};

export function Button({ label, variant = 'primary', icon, style, ...rest }: Props) {
  const { colors } = useThemeTokens();

  const bg = variant === 'primary' ? colors.accent : variant === 'warn' ? 'transparent' : 'transparent';
  const border = variant === 'warn' ? colors.danger : variant === 'ghost' ? colors.line : colors.accent;
  const textColor = variant === 'primary' ? colors.accentInk : variant === 'warn' ? colors.danger : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bg, borderColor: border, opacity: pressed ? 0.75 : 1 },
        style as object,
      ]}
      {...rest}
    >
      {icon ? (
        <Text style={[styles.icon, { color: textColor }]} accessibilityElementsHidden>
          {icon}
        </Text>
      ) : null}
      <Text style={[styles.label, { color: textColor }]} accessibilityElementsHidden>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    borderWidth: 1.5,
    borderRadius: Radius.pill,
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    minHeight: 50,
  },
  label: { fontSize: 15, fontWeight: '700' },
  icon: { fontSize: 16 },
});
