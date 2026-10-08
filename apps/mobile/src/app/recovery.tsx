import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Button } from '@/components/ui/button';
import { VoiceHintBar } from '@/components/voice-hint-bar';
import { Radius, Spacing } from '@/constants/theme';
import { ROUTE } from '@/constants/route';
import { useAnnounce } from '@/hooks/use-announce';
import { useI18n } from '@/hooks/use-i18n';
import { useThemeTokens } from '@/hooks/use-theme-tokens';
import { soundStep, soundTap } from '@/lib/sound';
import { useAppStore } from '@/store/app-store';

export default function RecoveryScreen() {
  const { t } = useI18n();
  const { colors } = useThemeTokens();
  const router = useRouter();
  const currentNode = useAppStore((s) => s.currentNode);
  const restartRoute = useAppStore((s) => s.restartRoute);
  const { announce } = useAnnounce();

  const lastIndex = Math.max(1, currentNode - 1);
  const lastNode = ROUTE.nodes[lastIndex - 1] ?? ROUTE.nodes[0];

  useFocusEffect(
    useCallback(() => {
      announce('recovery');
    }, [announce])
  );

  function handleResume() {
    soundStep();
    router.push('/navigating');
  }

  function handleRestart() {
    soundTap();
    restartRoute();
    router.replace('/');
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.icon}>🧭</Text>
        <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
          {t('recovery_title')}
        </Text>
        <Text style={[styles.sub, { color: colors.textSecondary }]}>{t('recovery_sub')}</Text>
      </View>

      <VoiceHintBar screen="recovery" handlers={{ resume: handleResume, restart: handleRestart }} />

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.line }]}>
        <Text style={[styles.body, { color: colors.text }]}>{t('recovery_body')}</Text>
        <View
          style={[styles.lastNode, { backgroundColor: colors.surfaceAlt, borderColor: colors.landmark }]}
          accessible
          accessibilityLabel={`${t('last_confirmed')}: ${t(lastNode.landmarkKey as any)}`}
        >
          <Text style={[styles.lastNodeLabel, { color: colors.landmark }]} accessibilityElementsHidden>
            {t('last_confirmed')}
          </Text>
          <Text style={[styles.lastNodeName, { color: colors.text }]} accessibilityElementsHidden>
            {t(lastNode.landmarkKey as any)}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button label={t('resume_btn')} icon="↩" onPress={handleResume} />
        <Button label={t('return_btn')} icon="↺" variant="ghost" onPress={handleRestart} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingTop: Spacing.lg, paddingHorizontal: Spacing.md, gap: 6 },
  icon: { fontSize: 44 },
  title: { fontSize: 22, fontWeight: '800' },
  sub: { fontSize: 14, textAlign: 'center' },
  card: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  body: { fontSize: 14, lineHeight: 20 },
  lastNode: { borderWidth: 1.5, borderRadius: Radius.md, padding: Spacing.md, gap: 2 },
  lastNodeLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.3 },
  lastNodeName: { fontSize: 15, fontWeight: '700' },
  actions: { marginHorizontal: Spacing.md, marginTop: Spacing.xl, gap: Spacing.sm },
});
