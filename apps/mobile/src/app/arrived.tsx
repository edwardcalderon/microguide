import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Button } from '@/components/ui/button';
import { VoiceHintBar } from '@/components/voice-hint-bar';
import { Radius, Spacing } from '@/constants/theme';
import { ROUTE } from '@/constants/route';
import { useAnnounce } from '@/hooks/use-announce';
import { useI18n } from '@/hooks/use-i18n';
import { useThemeTokens } from '@/hooks/use-theme-tokens';
import { soundTap } from '@/lib/sound';
import { useAppStore } from '@/store/app-store';

export default function ArrivedScreen() {
  const { t } = useI18n();
  const { colors } = useThemeTokens();
  const router = useRouter();
  const errors = useAppStore((s) => s.errors);
  const startedAt = useAppStore((s) => s.startedAt);
  const visitedNodes = useAppStore((s) => s.visitedNodes);
  const finishTrip = useAppStore((s) => s.finishTrip);
  const { announce } = useAnnounce();
  const [now, setNow] = useState(() => Date.now());

  const minutes = startedAt ? Math.max(1, Math.round((now - startedAt) / 60000)) : 0;
  const accuracy = Math.max(0, Math.round(100 - errors * 12));

  useFocusEffect(
    useCallback(() => {
      setNow(Date.now());
      announce('arrived');
    }, [announce])
  );

  function handleFinish() {
    soundTap();
    finishTrip();
    router.replace('/');
  }

  return (
    <Screen>
      <View style={[styles.banner, { backgroundColor: colors.success }]}>
        <Text style={styles.bannerIcon}>🎉</Text>
        <Text style={styles.bannerTitle} accessibilityRole="header">
          {t('arrived_title')}
        </Text>
        <Text style={styles.bannerSub}>{t('arrived_sub')}</Text>
      </View>

      <VoiceHintBar screen="arrived" handlers={{ finish: handleFinish }} />

      <Text style={[styles.summaryLabel, { color: colors.textTertiary }]}>{t('summary')}</Text>
      <View style={styles.grid}>
        <SumCard label={t('sum_time')} value={`${minutes} ${t('time_min')}`} colors={colors} />
        <SumCard label={t('sum_steps')} value={`${visitedNodes.length}/${ROUTE.totalNodes}`} colors={colors} />
        <SumCard label={t('sum_errors')} value={String(errors)} colors={colors} />
        <SumCard label={t('sum_score')} value={`${accuracy}%`} colors={colors} />
      </View>

      <View style={styles.actions}>
        <Button label={t('arrived_action')} icon="🏠" onPress={handleFinish} />
      </View>
    </Screen>
  );
}

function SumCard({ label, value, colors }: { label: string; value: string; colors: ReturnType<typeof useThemeTokens>['colors'] }) {
  return (
    <View
      style={[styles.sumCard, { backgroundColor: colors.surface, borderColor: colors.line }]}
      accessible
      accessibilityLabel={`${label}: ${value}`}
    >
      <Text style={[styles.sumValue, { color: colors.text }]} accessibilityElementsHidden>
        {value}
      </Text>
      <Text style={[styles.sumLabel, { color: colors.textTertiary }]} accessibilityElementsHidden>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    margin: Spacing.md,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: 4,
  },
  bannerIcon: { fontSize: 40 },
  bannerTitle: { fontSize: 20, fontWeight: '800', color: '#fff' },
  bannerSub: { fontSize: 13, color: '#fff', opacity: 0.9, textAlign: 'center' },
  summaryLabel: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
  },
  sumCard: {
    flexBasis: '47%',
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: 2,
  },
  sumValue: { fontSize: 20, fontWeight: '800' },
  sumLabel: { fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.3 },
  actions: { marginHorizontal: Spacing.md, marginTop: Spacing.xl },
});
