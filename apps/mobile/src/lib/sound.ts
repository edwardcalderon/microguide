import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';

import { useAppStore } from '@/store/app-store';

// Pre-decoded short sound-effect cues, synthesized offline (see scripts in the
// repo scratchpad) — no network/third-party audio needed.
const SOURCES = {
  tap: require('@/assets/sfx/tap.wav'),
  step: require('@/assets/sfx/step.wav'),
  confirm: require('@/assets/sfx/confirm.wav'),
  scan: require('@/assets/sfx/scan.wav'),
  warn: require('@/assets/sfx/warn.wav'),
  arrive: require('@/assets/sfx/arrive.wav'),
} as const;

type CueName = keyof typeof SOURCES;

const players: Partial<Record<CueName, AudioPlayer>> = {};
let primed = false;

function ensurePlayer(name: CueName): AudioPlayer {
  if (!players[name]) {
    players[name] = createAudioPlayer(SOURCES[name]);
  }
  return players[name]!;
}

async function primeAudioMode() {
  if (primed) return;
  primed = true;
  try {
    await setAudioModeAsync({ playsInSilentMode: true, shouldPlayInBackground: false });
  } catch {
    // Non-fatal: platform/simulator may not support every field.
  }
}

/** Play a short feedback cue. Fire-and-forget; safe to call rapidly. No-ops when the user has muted sound. */
export function playCue(name: CueName) {
  if (!useAppStore.getState().soundEnabled) return;
  primeAudioMode();
  (async () => {
    try {
      const player = ensurePlayer(name);
      await player.seekTo(0);
      player.play();
    } catch {
      // Ignore playback errors (e.g. no audio output in a headless test env).
    }
  })();
}

export const soundTap = () => playCue('tap');
export const soundStep = () => playCue('step');
export const soundConfirm = () => playCue('confirm');
export const soundScan = () => playCue('scan');
export const soundWarn = () => playCue('warn');
export const soundArrive = () => playCue('arrive');
