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
 *
 * Bilingual recognition: the Web Speech API only decodes audio against one
 * acoustic/language model per session (`recognition.lang`), so a phrase
 * spoken in the language the engine *isn't* currently set to often comes
 * back as a garbled transcript that won't match either language's grammar —
 * `recognizeCommand()` already checks both languages' word lists, but that
 * can't help if the transcript itself is wrong. To actually support command
 * words in either Spanish or English regardless of the app's current UI
 * language, a session that ends with no matching intent automatically
 * re-listens once more under the *other* locale before giving up (see the
 * `altTriedRef` logic in `start()`).
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import type { Lang } from '@/i18n/translations';
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
  // Whether this listening session already gave the *other* language a try.
  const altTriedRef = useRef(false);
  // Bumped on every (re)start so a stale onend/onerror from an aborted
  // previous session can't clobber state belonging to the session after it.
  const sessionRef = useRef(0);
  // Holds the latest `start` so its own body can trigger the other-language
  // retry through the ref instead of referencing the `start` const directly,
  // which the React Compiler's lint forbids (self-reference before
  // declaration finishes).
  const startRef = useRef<(altLang?: Lang) => void>(() => {});

  useEffect(() => {
    handlersRef.current = handlers;
    tRef.current = t;
  }, [handlers, t]);

  const supported = isVoiceListeningSupported();

  // Imperative-only: stops the underlying engine without touching state.
  // `onend` (wired in `start`) is what flips `listening` back to false —
  // asynchronously, which is what lets this safely run from an effect too.
  const stopRecognition = useCallback(() => {
    sessionRef.current++; // orphan any in-flight callbacks from this session
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  }, []);

  const stop = useCallback(() => {
    stopRecognition();
    setListening(false);
  }, [stopRecognition]);

  // `altLang`, when passed, is the automatic second-pass retry in the other
  // language — omitted on a fresh user-initiated start.
  const start = useCallback((altLang?: Lang) => {
    const Ctor = getWebSpeechRecognitionCtor();
    if (!Ctor || !voiceEnabled) return;

    recognitionRef.current?.abort();
    if (!altLang) altTriedRef.current = false;

    const mySession = ++sessionRef.current;
    const activeLang = altLang ?? lang;
    const recognition = new Ctor();
    recognition.lang = RECOGNITION_LOCALE[activeLang];
    recognition.continuous = false;
    recognition.interimResults = true; // live captions while the user is still talking

    recognition.onresult = (event: any) => {
      if (sessionRef.current !== mySession) return; // stale callback from an aborted session
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

      const intent = recognizeCommand(transcript, screen, activeLang);
      if (intent && handlersRef.current[intent]) {
        soundConfirm();
        showToast(tRef.current('voice_heard', { text: transcript }), 'success');
        handlersRef.current[intent]!();
        return;
      }

      if (!altTriedRef.current) {
        // No match under this locale's acoustic model — give the other
        // language one try before giving up, since the phrase may simply
        // have been spoken in it.
        altTriedRef.current = true;
        showToast(tRef.current('voice_retry_other_lang'), 'info');
        startRef.current(activeLang === 'es' ? 'en' : 'es');
        return;
      }

      soundWarn();
      showToast(tRef.current('voice_not_understood', { text: transcript }), 'warn');
    };
    recognition.onerror = () => {
      if (sessionRef.current === mySession) setListening(false);
    };
    recognition.onend = () => {
      if (sessionRef.current === mySession) setListening(false);
    };

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

  useEffect(() => {
    startRef.current = start;
  }, [start]);

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
