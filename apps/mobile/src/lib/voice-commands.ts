/**
 * Voice-command (speech-to-text) grammar for driving the UI flow hands-free.
 *
 * On web (Chrome, Edge, Safari) this is backed by the browser's native
 * `SpeechRecognition` API — see `@/hooks/use-voice-control.ts` — so listening
 * for spoken commands works today with zero extra native setup.
 *
 * Native iOS/Android has no equivalent built into Expo Go: that platform
 * needs a native module such as `@react-native-voice/voice` or
 * `expo-speech-recognition`, which requires a custom development build
 * (`npx expo run:ios` / `npx expo run:android` or an EAS dev-client build) —
 * it will not load inside Expo Go. Once such a module is wired in, point it
 * at `recognizeCommand(transcript, screen, lang)` below to resolve an intent
 * the same way the web path does.
 *
 * This module defines the command grammar (mirroring the web prototype) and
 * the `recognizeCommand()` matcher shared by every listening backend.
 */
import type { Lang } from '@/i18n/translations';

export type FlowScreen = 'welcome' | 'briefing' | 'navigating' | 'scan' | 'confirmed' | 'recovery' | 'arrived';

export type VoiceIntent =
  | 'destA'
  | 'destB'
  | 'destC'
  | 'start'
  | 'back'
  | 'scan'
  | 'next'
  | 'reorient'
  | 'resume'
  | 'restart'
  | 'finish';

type Grammar = Record<FlowScreen, { intents: Partial<Record<VoiceIntent, Record<Lang, string[]>>>; hint: Record<Lang, string> }>;

export const VOICE_GRAMMAR: Grammar = {
  welcome: {
    intents: {
      destA: { es: ['laboratorio', 'computo', 'cómputo'], en: ['lab', 'computer lab'] },
      destB: { es: ['biblioteca'], en: ['library'] },
      destC: { es: ['oficina', 'tramites', 'trámites'], en: ['office', 'admin'] },
    },
    hint: { es: 'Di: "laboratorio", "biblioteca" u "oficina"', en: 'Say: "lab", "library", or "office"' },
  },
  briefing: {
    intents: {
      start: { es: ['comenzar', 'iniciar', 'empezar'], en: ['start', 'begin'] },
      back: { es: ['atras', 'atrás', 'volver'], en: ['back', 'return'] },
    },
    hint: { es: 'Di: "comenzar" o "atrás"', en: 'Say: "start" or "back"' },
  },
  navigating: {
    intents: {
      scan: { es: ['escanear', 'escanea'], en: ['scan'] },
      next: { es: ['siguiente', 'avanzar', 'continuar'], en: ['next', 'continue', 'forward'] },
      reorient: { es: ['reorientar', 'perdido', 'perdida', 'ayuda'], en: ['reorient', 'lost', 'help'] },
    },
    hint: { es: 'Di: "escanear" o "reorientar"', en: 'Say: "scan" or "reorient"' },
  },
  scan: {
    intents: {
      scan: { es: ['escanear', 'confirmar', 'listo'], en: ['scan', 'confirm', 'done'] },
      back: { es: ['atras', 'atrás', 'cancelar'], en: ['back', 'cancel'] },
    },
    hint: { es: 'Di: "escanear"', en: 'Say: "scan"' },
  },
  confirmed: {
    intents: {
      next: { es: ['continuar', 'siguiente'], en: ['continue', 'next'] },
    },
    hint: { es: 'Di: "continuar"', en: 'Say: "continue"' },
  },
  recovery: {
    intents: {
      resume: { es: ['retomar', 'continuar', 'volver'], en: ['resume', 'continue'] },
      restart: { es: ['reiniciar', 'nuevo'], en: ['restart', 'new'] },
    },
    hint: { es: 'Di: "retomar" o "reiniciar"', en: 'Say: "resume" or "restart"' },
  },
  arrived: {
    intents: {
      finish: { es: ['finalizar', 'terminar', 'listo'], en: ['finish', 'done'] },
    },
    hint: { es: 'Di: "finalizar"', en: 'Say: "finish"' },
  },
};

/** Resolves a transcript to an intent for the given screen, trying both languages. */
export function recognizeCommand(transcript: string, screen: FlowScreen, primaryLang: Lang): VoiceIntent | null {
  const text = transcript.toLowerCase().trim();
  const grammar = VOICE_GRAMMAR[screen];
  if (!grammar) return null;

  const langOrder: Lang[] = primaryLang === 'es' ? ['es', 'en'] : ['en', 'es'];
  for (const lang of langOrder) {
    for (const [intent, byLang] of Object.entries(grammar.intents) as [VoiceIntent, Record<Lang, string[]>][]) {
      const words = byLang[lang] ?? [];
      if (words.some((w) => text.includes(w))) return intent;
    }
  }
  return null;
}
