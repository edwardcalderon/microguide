import * as Speech from 'expo-speech';

import type { Lang } from '@/i18n/translations';
import { useAppStore } from '@/store/app-store';

const LOCALE: Record<Lang, string> = { es: 'es-ES', en: 'en-US' };

function setSpeaking(speaking: boolean) {
  useAppStore.getState().setSpeaking(speaking);
}

/** Speak narration text in the given language. Call sites should check `voiceEnabled` first. */
export function speak(text: string, lang: Lang, onDone?: () => void) {
  Speech.stop();
  setSpeaking(true);
  Speech.speak(text, {
    language: LOCALE[lang],
    pitch: 1.0,
    rate: 1.0,
    onDone: () => {
      setSpeaking(false);
      onDone?.();
    },
    onStopped: () => setSpeaking(false),
    onError: () => setSpeaking(false),
  });
}

export function stopSpeaking() {
  Speech.stop();
  setSpeaking(false);
}
