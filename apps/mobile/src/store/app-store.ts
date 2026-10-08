import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { DestinationId } from '@/constants/route';
import { ROUTE } from '@/constants/route';
import type { Lang } from '@/i18n/translations';

export type ThemeOverride = 'system' | 'light' | 'dark';

type Prefs = {
  lang: Lang;
  themeOverride: ThemeOverride;
  soundEnabled: boolean;
  voiceEnabled: boolean;
};

type RouteState = {
  currentDest: DestinationId | null;
  currentNode: number; // 0 = not started, 1..totalNodes = at that node
  visitedNodes: number[];
  errors: number;
  startedAt: number | null;
};

type AppState = Prefs &
  RouteState & {
    speaking: boolean;
    setSpeaking: (speaking: boolean) => void;

    setLang: (lang: Lang) => void;
    setThemeOverride: (mode: ThemeOverride) => void;
    toggleSound: () => void;
    toggleVoice: () => void;

    selectDestination: (dest: DestinationId) => void;
    startRoute: () => void;
    confirmCurrentNode: () => void;
    advanceNode: () => void;
    enterRecovery: () => void;
    resumeFromRecovery: () => void;
    restartRoute: () => void;
    finishTrip: () => void;
  };

const initialRouteState: RouteState = {
  currentDest: null,
  currentNode: 0,
  visitedNodes: [],
  errors: 0,
  startedAt: null,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      lang: 'es',
      themeOverride: 'system',
      soundEnabled: true,
      voiceEnabled: false,
      speaking: false,
      ...initialRouteState,

      setSpeaking: (speaking) => set({ speaking }),
      setLang: (lang) => set({ lang }),
      setThemeOverride: (mode) => set({ themeOverride: mode }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleVoice: () => set((s) => ({ voiceEnabled: !s.voiceEnabled })),

      selectDestination: (dest) =>
        set({
          currentDest: dest,
          currentNode: 0,
          visitedNodes: [],
          errors: 0,
          startedAt: null,
        }),
      startRoute: () => set({ currentNode: 1, startedAt: Date.now() }),
      confirmCurrentNode: () =>
        set((s) => ({
          visitedNodes: [...s.visitedNodes, s.currentNode],
        })),
      advanceNode: () => set((s) => ({ currentNode: s.currentNode + 1 })),
      enterRecovery: () => set((s) => ({ errors: s.errors + 1 })),
      resumeFromRecovery: () => set({}),
      restartRoute: () => set({ ...initialRouteState }),
      finishTrip: () => set({ ...initialRouteState }),
    }),
    {
      name: 'microguide-prefs',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        lang: s.lang,
        themeOverride: s.themeOverride,
        soundEnabled: s.soundEnabled,
        voiceEnabled: s.voiceEnabled,
      }),
    }
  )
);

export function isRouteComplete(currentNode: number) {
  return currentNode > ROUTE.totalNodes;
}
