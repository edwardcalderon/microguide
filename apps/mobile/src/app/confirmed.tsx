import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Button } from '@/components/ui/button';
import { ProgressRing } from '@/components/ui/progress-ring';
import { VoiceHintBar } from '@/components/voice-hint-bar';
import { Spacing } from '@/constants/theme';
import { ROUTE } from '@/constants/route';
import { useAnnounce } from '@/hooks/use-announce';
import { useI18n } from '@/hooks/use-i18n';
import { useThemeTokens } from '@/hooks/use-theme-tokens';
import { soundArrive, soundStep } from '@/lib/sound';
import { useAppStore } from '@/store/app-store';

export default function ConfirmedScreen() {
  const { t } = useI18n();
  const { colors } = useThemeTokens();
  const router = useRouter();
  const currentNode = useAppStore((s) => s.currentNode);
  const advanceNode = useAppStore((s) => s.advanceNode);
  const { announce } = useAnnounce();

  const pct = Math.round((currentNode / ROUTE.totalNodes) * 100);
  const isLastNode = currentNode >= ROUTE.totalNodes;

  useFocusEffect(
    useCallback(() => {
      announce('confirmed');
    }, [announce])
  );

  function handleContinue() {
    if (isLastNode) {
      soundArrive();
      router.push('/arrived');
    } else {
      soundStep();
      advanceNode();
      router.push('/navigating');
    }
  }

  return (
    <Screen>
      <View style={styles.center}>
        <Text style={[styles.tick, { color: colors.success }]}>✓</Text>
        <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
          {t('confirmed_title')}
        </Text>
        <Text style={[styles.sub, { color: colors.textSecondary }]}>{t('confirmed_sub')}</Text>

        <View style={styles.ringWrap}>
          <ProgressRing pct={pct} label={t('progress_label')} />
        </View>
        {/* Caption is decorative here — the ring above already announces "{progress_label}, N%" as one unit. */}
        <Text
          style={[styles.progressLabel, { color: colors.textTertiary }]}
          importantForAccessibility="no-hide-descendants"
          accessibilityElementsHidden
        >
          {t('progress_label')}
        </Text>
      </View>

      <VoiceHintBar screen="confirmed" handlers={{ next: handleContinue }} />

      <View style={styles.actions}>
        <Button
          label={isLastNode ? t('action_arrived') : t('continue_btn')}
          icon="→"
          onPress={handleContinue}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', paddingTop: Spacing.xxl, gap: Spacing.sm, paddingHorizontal: Spacing.md },
  tick: { fontSize: 56, fontWeight: '800' },
  title: { fontSize: 22, fontWeight: '800' },
  sub: { fontSize: 14, textAlign: 'center' },
  ringWrap: { marginTop: Spacing.lg },
  progressLabel: { fontSize: 12, fontWeight: '600', marginTop: Spacing.xs },
  actions: { marginHorizontal: Spacing.md, marginTop: Spacing.xl },
});
