import { StyleSheet, View } from 'react-native';

import { Chip } from '@/components/ui/chip';
import { Spacing } from '@/constants/theme';
import { useI18n } from '@/hooks/use-i18n';
import { useThemeTokens } from '@/hooks/use-theme-tokens';
import { soundTap } from '@/lib/sound';
import { showToast } from '@/store/toast-store';
import { useAppStore } from '@/store/app-store';

/** Lang / theme / sound / voice toggle row — shown on the welcome screen, like the web prototype's controls bar. */
export function TopControls() {
  const { t, lang, setLang } = useI18n();
  const { mode } = useThemeTokens();
  const themeOverride = useAppStore((s) => s.themeOverride);
  const setThemeOverride = useAppStore((s) => s.setThemeOverride);
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const toggleSound = useAppStore((s) => s.toggleSound);
  const voiceEnabled = useAppStore((s) => s.voiceEnabled);
  const toggleVoice = useAppStore((s) => s.toggleVoice);

  return (
    <View style={styles.row}>
      <View style={styles.langGroup}>
        <Chip label="ES" icon="" active={lang === 'es'} onPress={() => { soundTap(); setLang('es'); }} />
        <Chip label="EN" icon="" active={lang === 'en'} onPress={() => { soundTap(); setLang('en'); }} />
      </View>
      <View style={styles.rightGroup}>
        <Chip
          label={t('theme')}
          icon={mode === 'dark' ? '🌙' : '☀️'}
          onPress={() => {
            soundTap();
            setThemeOverride(themeOverride === 'dark' ? 'light' : 'dark');
          }}
        />
        <Chip
          label={t('sound')}
          icon={soundEnabled ? '🔊' : '🔇'}
          active={soundEnabled}
          onPress={() => {
            toggleSound();
            showToast(soundEnabled ? t('toast_sound_off') : t('toast_sound_on'));
          }}
        />
        <Chip
          label={t('voice')}
          icon={voiceEnabled ? '🎙️' : '🎙'}
          active={voiceEnabled}
          onPress={() => {
            soundTap();
            toggleVoice();
            showToast(voiceEnabled ? t('toast_voice_off') : t('toast_voice_on'));
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    flexWrap: 'wrap',
  },
  langGroup: { flexDirection: 'row', gap: Spacing.xs },
  rightGroup: { flexDirection: 'row', gap: Spacing.xs, flexWrap: 'wrap' },
});
