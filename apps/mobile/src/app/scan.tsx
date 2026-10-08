import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { VoiceHintBar } from '@/components/voice-hint-bar';
import { Radius, Spacing } from '@/constants/theme';
import { useAnnounce } from '@/hooks/use-announce';
import { useI18n } from '@/hooks/use-i18n';
import { useThemeTokens } from '@/hooks/use-theme-tokens';
import { soundConfirm, soundScan } from '@/lib/sound';
import { showToast } from '@/store/toast-store';
import { useAppStore } from '@/store/app-store';

export default function ScanScreen() {
  const { t } = useI18n();
  const { colors } = useThemeTokens();
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const confirmCurrentNode = useAppStore((s) => s.confirmCurrentNode);
  const { announce } = useAnnounce();

  useFocusEffect(
    useCallback(() => {
      announce('scan');
    }, [announce])
  );

  function handleScan() {
    if (scanning) return;
    setScanning(true);
    soundScan();
    setTimeout(() => {
      soundConfirm();
      confirmCurrentNode();
      showToast(t('toast_scan_ok'), 'success');
      setScanning(false);
      router.push('/confirmed');
    }, 650);
  }

  return (
    <Screen scroll={false}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
          {t('scan_title')}
        </Text>
        <Text style={[styles.sub, { color: colors.textSecondary }]}>{t('scan_sub')}</Text>
      </View>

      <VoiceHintBar screen="scan" handlers={{ scan: handleScan, back: () => router.back() }} />

      <View style={styles.stage}>
        <View style={[styles.frame, { borderColor: colors.accent }]}>
          <Icon name="qr-code-outline" size={120} color={colors.textTertiary} style={styles.qr} />
          {scanning ? (
            <View style={[styles.scanLine, { backgroundColor: colors.accent }]} />
          ) : null}
        </View>
        <Text style={[styles.hint, { color: colors.textTertiary }]}>{t('scan_hint')}</Text>
      </View>

      <View style={styles.actions}>
        <Button
          label={scanning ? t('voice_status_speaking') : t('scan_confirm_btn')}
          icon="qr-code-outline"
          onPress={handleScan}
          disabled={scanning}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: Spacing.md, paddingTop: Spacing.lg, gap: 4 },
  title: { fontSize: 22, fontWeight: '800' },
  sub: { fontSize: 13 },
  stage: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md },
  frame: {
    width: 220,
    height: 220,
    borderWidth: 3,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  qr: { opacity: 0.5 },
  scanLine: { position: 'absolute', left: 8, right: 8, height: 3, top: '50%', opacity: 0.8 },
  hint: { fontSize: 12, fontWeight: '600' },
  actions: { marginHorizontal: Spacing.md, marginBottom: Spacing.xl },
});
