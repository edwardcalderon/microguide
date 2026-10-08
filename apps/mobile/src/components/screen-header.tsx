import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Spacing } from '@/constants/theme';
import { useI18n } from '@/hooks/use-i18n';
import { useThemeTokens } from '@/hooks/use-theme-tokens';
import { soundTap } from '@/lib/sound';

export function ScreenHeader({
  eyebrow,
  title,
  subtitle,
  showBack = true,
  onBack,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
}) {
  const { colors } = useThemeTokens();
  const { t } = useI18n();
  const router = useRouter();

  return (
    <View style={styles.wrap}>
      {showBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('back')}
          hitSlop={8}
          onPress={() => {
            soundTap();
            if (onBack) onBack();
            else router.back();
          }}
          style={[styles.backBtn, { borderColor: colors.line, backgroundColor: colors.surface }]}
        >
          <Icon name="arrow-back" size={18} color={colors.text} />
        </Pressable>
      ) : null}
      <View style={styles.textBlock}>
        {eyebrow ? <Text style={[styles.eyebrow, { color: colors.accent }]}>{eyebrow}</Text> : null}
        <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
          {title}
        </Text>
        {subtitle ? <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: { flex: 1, gap: 2 },
  eyebrow: { fontSize: 12, fontWeight: '700', letterSpacing: 0.4, textTransform: 'uppercase' },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 13, lineHeight: 18 },
});
