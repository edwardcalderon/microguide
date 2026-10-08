import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { VoiceHintBar } from '@/components/voice-hint-bar';
import { Radius, Spacing } from '@/constants/theme';
import { ROUTE } from '@/constants/route';
import { useAnnounce } from '@/hooks/use-announce';
import { useI18n } from '@/hooks/use-i18n';
import { useThemeTokens } from '@/hooks/use-theme-tokens';
import { soundWarn } from '@/lib/sound';
import { useAppStore } from '@/store/app-store';

export default function NavigatingScreen() {
  const { t } = useI18n();
  const { colors } = useThemeTokens();
  const router = useRouter();
  const currentNode = useAppStore((s) => s.currentNode);
  const currentDest = useAppStore((s) => s.currentDest);
  const enterRecovery = useAppStore((s) => s.enterRecovery);
  const { announce } = useAnnounce();

  const node = ROUTE.nodes[Math.max(0, currentNode - 1)] ?? ROUTE.nodes[0];

  useFocusEffect(
    useCallback(() => {
      announce('navigating');
    }, [announce])
  );

  function handleReorient() {
    soundWarn();
    enterRecovery();
    router.push('/recovery');
  }

  return (
    <Screen>
      <View style={styles.topRow}>
        <Text style={[styles.navigatingTo, { color: colors.textSecondary }]}>
          {t('navigating_to')} {currentDest ? t(`dest_${currentDest}` as const) : ''}
        </Text>
        <Text style={[styles.nodeOf, { color: colors.accent }]} accessibilityRole="header">
          {t('node_of', { current: currentNode, total: ROUTE.totalNodes })}
        </Text>
      </View>

      <View style={styles.progress}>
        {ROUTE.nodes.map((n) => (
          <View
            key={n.id}
            style={[
              styles.pnode,
              {
                backgroundColor: n.id < currentNode ? colors.accent : n.id === currentNode ? colors.landmark : colors.line,
              },
            ]}
          />
        ))}
      </View>

      <VoiceHintBar
        screen="navigating"
        handlers={{
          scan: () => router.push('/scan'),
          next: () => router.push('/scan'),
          reorient: handleReorient,
        }}
      />

      <View style={[styles.stepCard, { backgroundColor: colors.surface, borderColor: colors.line }]}>
        <Icon name={node.icon} size={40} color={colors.accent} />
        <Text style={[styles.stepDirection, { color: colors.text }]}>{t(node.directionKey as any)}</Text>

        <View
          style={[styles.landmarkBox, { backgroundColor: colors.surfaceAlt, borderColor: colors.landmark }]}
          accessible
          accessibilityLabel={`${t('landmark_label')}: ${t(node.landmarkKey as any)}`}
        >
          <Text style={[styles.landmarkLabel, { color: colors.landmark }]} accessibilityElementsHidden>
            {t('landmark_label')}
          </Text>
          <Text style={[styles.landmarkName, { color: colors.text }]} accessibilityElementsHidden>
            {t(node.landmarkKey as any)}
          </Text>
        </View>

        <View style={styles.walkMinRow}>
          <Icon name="time-outline" size={13} color={colors.textTertiary} />
          <Text style={[styles.walkMin, { color: colors.textTertiary }]}>
            {node.walkMin} {t('walk_min')}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button label={t('action_scan')} icon="qr-code-outline" onPress={() => router.push('/scan')} />
        <Button label={t('action_reorient')} icon="compass-outline" variant="warn" onPress={handleReorient} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topRow: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md, gap: 2 },
  navigatingTo: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.3 },
  nodeOf: { fontSize: 18, fontWeight: '800' },
  progress: { flexDirection: 'row', gap: 6, paddingHorizontal: Spacing.md, marginTop: Spacing.sm },
  pnode: { flex: 1, height: 6, borderRadius: 3 },
  stepCard: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.md,
  },
  stepDirection: { fontSize: 17, fontWeight: '600', textAlign: 'center', lineHeight: 23 },
  landmarkBox: { width: '100%', borderWidth: 1.5, borderRadius: Radius.md, padding: Spacing.md, gap: 2 },
  landmarkLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.3 },
  landmarkName: { fontSize: 15, fontWeight: '700' },
  walkMinRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  walkMin: { fontSize: 12, fontWeight: '600' },
  actions: { marginHorizontal: Spacing.md, marginTop: Spacing.xl, gap: Spacing.md },
});
