import { useEffect, useRef } from 'react';
import { AccessibilityInfo, Pressable, StyleSheet, Text, View } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useI18n } from '@/hooks/use-i18n';
import { useThemeTokens } from '@/hooks/use-theme-tokens';
import { useVoiceControl } from '@/hooks/use-voice-control';
import { soundTap } from '@/lib/sound';
import { VOICE_GRAMMAR, type FlowScreen, type VoiceIntent } from '@/lib/voice-commands';
import { useAppStore } from '@/store/app-store';

/**
 * Shows narration status and the voice commands available on the current
 * screen, plus — where the platform supports it (web today, see
 * `@/hooks/use-voice-control.ts`) — a mic button that actually listens for
 * those commands, shows what it's hearing live, and runs the matching
 * `handlers` entry once a command resolves (confirmation/"didn't catch that"
 * feedback is a toast fired from the hook itself, picked up by anyone
 * listening — sighted or via a screen reader, since `ToastHost` is a polite
 * live region).
 */
export function VoiceHintBar({
  screen,
  handlers,
}: {
  screen: FlowScreen;
  /** Maps a voice intent from this screen's grammar to the action it should trigger. */
  handlers?: Partial<Record<VoiceIntent, () => void>>;
}) {
  const { t, lang } = useI18n();
  const { colors } = useThemeTokens();
  const voiceEnabled = useAppStore((s) => s.voiceEnabled);
  const speaking = useAppStore((s) => s.speaking);
  const { supported, listening, lastHeard, interim, toggle } = useVoiceControl(screen, handlers ?? {});
  const lastAnnouncedListening = useRef<boolean | null>(null);

  // Announce the start/stop of listening itself explicitly: VoiceOver/TalkBack
  // don't reliably react to accessibilityLiveRegion for that transition, even
  // though they do pick up the toast feedback for what was actually heard.
  useEffect(() => {
    if (!voiceEnabled || lastAnnouncedListening.current === listening) return;
    lastAnnouncedListening.current = listening;
    if (listening) AccessibilityInfo.announceForAccessibility(t('voice_status_listening'));
  }, [listening, voiceEnabled, t]);

  if (!voiceEnabled) return null;

  const grammar = VOICE_GRAMMAR[screen];
  const liveCaption = listening && lastHeard ? (interim ? lastHeard : t('voice_heard', { text: lastHeard })) : '';
  const statusText = listening ? t('voice_status_listening') : speaking ? t('voice_status_speaking') : t('voice_status_idle');

  return (
    <View
      style={[styles.bar, { backgroundColor: colors.surfaceAlt, borderColor: colors.line }]}
      accessibilityLiveRegion="polite"
    >
      <View
        style={[styles.dot, { backgroundColor: speaking || listening ? colors.accent : colors.textTertiary }]}
        accessibilityElementsHidden
      />
      <View style={styles.textCol}>
        <Text style={[styles.text, { color: colors.textSecondary }]} numberOfLines={2}>
          {statusText}
          {grammar ? `  ·  ${grammar.hint[lang]}` : ''}
          {!supported ? `  ·  ${t('toast_mic_unsupported')}` : ''}
        </Text>
        {/* Live transcript — what the mic is picking up, updated as the user talks. */}
        {liveCaption ? (
          <Text style={[styles.caption, { color: colors.accent }]} numberOfLines={1}>
            {liveCaption}
          </Text>
        ) : null}
      </View>
      {supported ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={listening ? t('voice_mic_stop') : t('voice_mic_start')}
          accessibilityState={{ selected: listening }}
          hitSlop={6}
          onPress={() => {
            soundTap();
            toggle();
          }}
          style={({ pressed }) => [
            styles.micBtn,
            {
              backgroundColor: listening ? colors.accent : colors.surface,
              borderColor: listening ? colors.accent : colors.line,
              opacity: pressed ? 0.75 : 1,
            },
          ]}
        >
          <Text style={{ fontSize: 15 }} accessibilityElementsHidden>
            {listening ? '●' : '🎙️'}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: Radius.md,
  },
  dot: { width: 7, height: 7, borderRadius: 4, marginTop: 5 },
  textCol: { flex: 1, gap: 2 },
  text: { fontSize: 11, fontWeight: '500' },
  caption: { fontSize: 12, fontWeight: '700' },
  micBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
