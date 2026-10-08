/**
 * Hands-free control for one screen: listens for the screen's voice grammar
 * (`VOICE_GRAMMAR` in `@/lib/voice-commands`) and invokes the matching
 * handler, if the caller supplied one.
 *
 * Backend: the browser's native Web Speech API (`SpeechRecognition` /
 * `webkitSpeechRecognition`), available today on web (Chrome, Edge, Safari)
 * with no native module or dev-client build. Native iOS/Android under Expo
 * Go has no built-in equivalent, so `isVoiceListeningSupported()` reports
 * false there and the UI shows an honest "needs a dev build" hint instead of
 * a dead mic button — see the doc comment in `@/lib/voice-commands.ts` for
 * how to wire in a real native listener later; it only needs to call
 * `recognizeCommand()` the same way this hook does.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import { useI18n } from '@/hooks/use-i18n';
import { soundConfirm, soundWarn } from '@/lib/sound';
import { recognizeCommand, type FlowScreen, type VoiceIntent } from '@/lib/voice-commands';
import { useAppStore } from '@/store/app-store';
import { showToast } from '@/store/toast-store';

type IntentHandlers = Partial<Record<VoiceIntent, () => void>>;

const RECOGNITION_LOCALE: Record<'es' | 'en', string> = { es: 'es-ES', en: 'en-US' };

/** The slice of the Web Speech API this hook uses — not in TS's default DOM lib. */
interface WebSpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
}

function getWebSpeechRecognitionCtor(): (new () => WebSpeechRecognition) | null {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const w = window as unknown as Record<string, unknown>;
  const Ctor = (w.SpeechRecognition ?? w.webkitSpeechRecognition) as (new () => WebSpeechRecognition) | undefined;
  return Ctor ?? null;
}

/** True on any platform/browser that exposes a real speech-to-text engine right now. */
export function isVoiceListeningSupported(): boolean {
  return getWebSpeechRecognitionCtor() !== null;
}

export function useVoiceControl(screen: FlowScreen, handlers: IntentHandlers) {
  const { t, lang } = useI18n();
  const voiceEnabled = useAppStore((s) => s.voiceEnabled);
  const [listening, setListening] = useState(false);
  // What the engine has heard so far: live (interim) while still speaking, final once settled.
  const [lastHeard, setLastHeard] = useState('');
  const [interim, setInterim] = useState(false);
  const recognitionRef = useRef<WebSpeechRecognition | null>(null);
  const handlersRef = useRef(handlers);
  const tRef = useRef(t);

  useEffect(() => {
    handlersRef.current = handlers;
    tRef.current = t;
  }, [handlers, t]);

  const supported = isVoiceListeningSupported();

  // Imperative-only: stops the underlying engine without touching state.
  // `onend` (wired in `start`) is what flips `listening` back to false —
  // asynchronously, which is what lets this safely run from an effect too.
  const stopRecognition = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  }, []);

  const stop = useCallback(() => {
    stopRecognition();
    setListening(false);
  }, [stopRecognition]);

  const start = useCallback(() => {
    const Ctor = getWebSpeechRecognitionCtor();
    if (!Ctor || !voiceEnabled) return;

    recognitionRef.current?.abort();

    const recognition = new Ctor();
    recognition.lang = RECOGNITION_LOCALE[lang];
    recognition.continuous = false;
    recognition.interimResults = true; // live captions while the user is still talking

    recognition.onresult = (event: any) => {
      const results = event?.results;
      if (!results || results.length === 0) return;
      const last = results[results.length - 1];
      const transcript: string = last?.[0]?.transcript ?? '';
      const isFinal = !!last?.isFinal;
      setLastHeard(transcript);
      setInterim(!isFinal);

      // Only act once the engine has settled on a final transcript — matching
      // against a half-spoken interim phrase would fire commands too eagerly.
      if (!isFinal || !transcript.trim()) return;

      const intent = recognizeCommand(transcript, screen, lang);
      if (intent && handlersRef.current[intent]) {
        soundConfirm();
        showToast(tRef.current('voice_heard', { text: transcript }));
        handlersRef.current[intent]!();
      } else {
        soundWarn();
        showToast(tRef.current('voice_not_understood', { text: transcript }));
      }
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    try {
      recognition.start();
      setListening(true);
      setLastHeard('');
      setInterim(false);
    } catch {
      setListening(false);
    }
  }, [lang, screen, voiceEnabled]);

  const toggle = useCallback(() => {
    if (listening) stop();
    else start();
  }, [listening, start, stop]);

  // Stop listening whenever voice mode is turned off or the screen changes/unmounts —
  // never leave a hot microphone behind on navigation.
  useEffect(() => {
    if (!voiceEnabled) stopRecognition();
    return () => stopRecognition();
  }, [voiceEnabled, screen, stopRecognition]);

  return { supported, listening, lastHeard, interim, toggle };
}
