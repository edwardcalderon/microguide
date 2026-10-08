import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { Button } from '@/components/ui/button';
import { VoiceHintBar } from '@/components/voice-hint-bar';
import { Radius, Spacing } from '@/constants/theme';
import { ROUTE, TOTAL_ROUTE_MIN } from '@/constants/route';
import { useAnnounce } from '@/hooks/use-announce';
import { useI18n } from '@/hooks/use-i18n';
import { useThemeTokens } from '@/hooks/use-theme-tokens';
import { soundStep } from '@/lib/sound';
import { useAppStore } from '@/store/app-store';

const NODE_LABEL_KEYS = ['route_node_1', 'route_node_2', 'route_node_3', 'route_node_4'] as const;

export default function BriefingScreen() {
  const { t } = useI18n();
  const { colors } = useThemeTokens();
  const router = useRouter();
  const currentDest = useAppStore((s) => s.currentDest);
  const startRoute = useAppStore((s) => s.startRoute);
  const { announce } = useAnnounce();

  useFocusEffect(
    useCallback(() => {
      announce('briefing');
    }, [announce])
  );

  function handleStart() {
    soundStep();
    startRoute();
    router.push('/navigating');
  }

  return (
    <Screen>
      <ScreenHeader
        eyebrow={currentDest ? t(`dest_${currentDest}` as const) : undefined}
        title={t('briefing_title')}
        subtitle={t('briefing_sub')}
        onBack={() => router.replace('/')}
      />
      <VoiceHintBar
        screen="briefing"
        handlers={{ start: handleStart, back: () => router.replace('/') }}
      />

      <View style={[styles.routeCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
        {NODE_LABEL_KEYS.map((key, i) => (
          <View key={key} style={styles.stepRow}>
            <View style={[styles.stepDot, { backgroundColor: colors.accent }]}>
              <Text style={styles.stepDotText}>{i + 1}</Text>
            </View>
            <Text style={[styles.stepText, { color: colors.text }]}>{t(key)}</Text>
          </View>
        ))}
        <View style={styles.stepRow}>
          <View style={[styles.stepDot, { backgroundColor: colors.success }]}>
            <Text style={styles.stepDotText}>🏁</Text>
          </View>
          <Text style={[styles.stepText, { color: colors.text }]}>{t('route_node_end')}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <Stat value={String(ROUTE.totalNodes)} label={t('steps_min')} colors={colors} />
        <Stat value={`${TOTAL_ROUTE_MIN}`} label={t('time_min')} colors={colors} />
        <Stat value={String(ROUTE.nodes.length)} label={t('nodes_min')} colors={colors} />
      </View>

      <View style={styles.actions}>
        <Button label={t('start_btn')} icon="▶" onPress={handleStart} />
      </View>
    </Screen>
  );
}

function Stat({ value, label, colors }: { value: string; label: string; colors: ReturnType<typeof useThemeTokens>['colors'] }) {
  return (
    <View style={[styles.stat, { backgroundColor: colors.surfaceAlt }]}>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textTertiary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  routeCard: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  stepDot: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  stepDotText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  stepText: { flex: 1, fontSize: 14, lineHeight: 19 },
  statsRow: { flexDirection: 'row', gap: Spacing.sm, marginHorizontal: Spacing.md, marginTop: Spacing.lg },
  stat: { flex: 1, borderRadius: Radius.md, paddingVertical: Spacing.md, alignItems: 'center', gap: 2 },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.3 },
  actions: { marginHorizontal: Spacing.md, marginTop: Spacing.xl },
});
