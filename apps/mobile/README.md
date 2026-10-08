# MicroGuide — mobile app

Expo Router app for MicroGuide, an indoor campus navigation prototype that guides a
user node-by-node to a destination, confirming each checkpoint with a QR code.

Ported from the web HTML prototype: same flow, palette, copy and voice-over script,
rebuilt as native screens.

## Stack

- **Expo SDK 57** + **Expo Router** (file-based routing, `src/app/`)
- **Zustand** for app state (`src/store`) — prefs persisted with AsyncStorage
- **expo-speech** for bilingual (ES/EN) text-to-speech narration
- **expo-audio** for sound-effect cues, synthesized offline as tiny WAV files
  (`assets/sfx/`, generator script kept in the session scratchpad)
- **react-native-svg** for the progress ring on the confirmation screen

## Run it

From the repo root (uses Turborepo):

```bash
pnpm dev:mobile
```

Or directly:

```bash
cd apps/mobile
pnpm start       # then press i / a / w, or scan the QR with Expo Go
```

## Flow / screens (`src/app/`)

| Route | Screen |
| --- | --- |
| `/` (`index.tsx`) | Welcome — pick a destination |
| `/briefing` | Route briefing before starting |
| `/navigating` | Turn-by-turn microinstruction + landmark for the current node |
| `/scan` | Simulated QR scan to confirm a checkpoint |
| `/confirmed` | Checkpoint confirmed + route progress ring |
| `/recovery` | "I'm lost" recovery flow — resume or restart |
| `/arrived` | Arrival summary (time, nodes, detours, accuracy) |

## Known limitation: voice **commands**

Text-to-speech narration (`src/lib/speech.ts`) works out of the box in Expo Go.
Voice **recognition** (speech-to-text, for hands-free "say next / scan / reorient"
control) does not — Expo Go has no built-in STT API. The command grammar is
already defined in `src/lib/voice-commands.ts`; wiring it to a real microphone
needs a native module (e.g. `@react-native-voice/voice` or
`expo-speech-recognition`) and a custom development build
(`npx expo run:ios` / `run:android`, or an EAS dev-client build) — see the
module's doc comment for details.
