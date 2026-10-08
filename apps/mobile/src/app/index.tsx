import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Icon } from '@/components/ui/icon';
import { TopControls } from '@/components/top-controls';
import { VersionFooter } from '@/components/version-footer';
import { VoiceHintBar } from '@/components/voice-hint-bar';
import { Radius, Spacing } from '@/constants/theme';
import { DESTINATIONS, ROUTE, TOTAL_ROUTE_MIN, type DestinationId } from '@/constants/route';
import { useAnnounce } from '@/hooks/use-announce';
import { useI18n } from '@/hooks/use-i18n';
import { useThemeTokens } from '@/hooks/use-theme-tokens';
import { soundTap } from '@/lib/sound';
import { useAppStore } from '@/store/app-store';

export default function WelcomeScreen() {
  const { t } = useI18n();
  const { colors } = useThemeTokens();
  const router = useRouter();
  const selectDestination = useAppStore((s) => s.selectDestination);
  const { announce } = useAnnounce();

  useFocusEffect(
    useCallback(() => {
      announce('welcome');
    }, [announce])
  );

  function handleSelect(id: DestinationId) {
    soundTap();
    selectDestination(id);
    router.push('/briefing');
  }

  return (
    <Screen>
      <TopControls />
      <VoiceHintBar
        screen="welcome"
        handlers={{
          destA: () => handleSelect('a'),
          destB: () => handleSelect('b'),
          destC: () => handleSelect('c'),
        }}
      />

      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: colors.accent }]}>{t('welcome_eyebrow')}</Text>
        <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
          {t('welcome_title')}
        </Text>
        <Text style={[styles.sub, { color: colors.textSecondary }]}>{t('welcome_sub')}</Text>
      </View>

      <Text style={[styles.sectionLabel, { color: colors.textTertiary }]}>{t('choose_dest')}</Text>

      <View style={styles.list}>
        {DESTINATIONS.map((dest) => (
          <Pressable
            key={dest.id}
            onPress={() => handleSelect(dest.id)}
            accessibilityRole="button"
            accessibilityLabel={`${t(`dest_${dest.id}` as const)}, ${t(`dest_${dest.id}_meta` as const)}, ${ROUTE.totalNodes} ${t('nodes_min')}, ${TOTAL_ROUTE_MIN} ${t('time_min')}`}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: colors.surface, borderColor: colors.line, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Icon name={dest.icon} size={28} color={colors.accent} />
            <View style={styles.cardText} accessibilityElementsHidden>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{t(`dest_${dest.id}` as const)}</Text>
              <Text style={[styles.cardMeta, { color: colors.textSecondary }]}>
                {t(`dest_${dest.id}_meta` as const)}
              </Text>
              <Text style={[styles.cardStats, { color: colors.textTertiary }]}>
                {ROUTE.totalNodes} {t('nodes_min')} · {TOTAL_ROUTE_MIN} {t('time_min')}
              </Text>
            </View>
            <Icon name="chevron-forward" size={18} color={colors.accent} />
          </Pressable>
        ))}
      </View>

      <VersionFooter />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { paddingHorizontal: Spacing.md, paddingTop: Spacing.lg, gap: 6 },
  eyebrow: { fontSize: 12, fontWeight: '700', letterSpacing: 0.4, textTransform: 'uppercase' },
  title: { fontSize: 28, fontWeight: '800' },
  sub: { fontSize: 14, lineHeight: 20 },
  sectionLabel: {
    marginTop: Spacing.xl,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  list: { paddingHorizontal: Spacing.md, gap: Spacing.sm },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  cardText: { flex: 1, gap: 2 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardMeta: { fontSize: 12 },
  cardStats: { fontSize: 11, marginTop: 2 },
});
