import { useCallback } from 'react';

import { ROUTE } from '@/constants/route';
import { useI18n } from '@/hooks/use-i18n';
import { useScreenReaderEnabled } from '@/hooks/use-screen-reader';
import { speak } from '@/lib/speech';
import type { FlowScreen } from '@/lib/voice-commands';
import { useAppStore } from '@/store/app-store';

/**
 * Centralized per-screen voice-over, in whichever language is active.
 * Mirrors the web prototype's `getScreenScript()` / `announceScreen()` pair.
 *
 * Stands down automatically while a real OS screen reader (VoiceOver /
 * TalkBack) is on: that user already gets the screen read to them via each
 * component's accessibility labels, and layering this narration on top would
 * mean two voices talking over each other instead of one clear one.
 */
export function useAnnounce() {
  const { t, lang } = useI18n();
  const voiceEnabled = useAppStore((s) => s.voiceEnabled);
  const screenReaderEnabled = useScreenReaderEnabled();
  const currentDest = useAppStore((s) => s.currentDest);
  const currentNode = useAppStore((s) => s.currentNode);
  const errors = useAppStore((s) => s.errors);
  const startedAt = useAppStore((s) => s.startedAt);

  const getScript = useCallback(
    (screen: FlowScreen): string => {
      switch (screen) {
        case 'welcome':
          return t('voice_welcome_script');
        case 'briefing': {
          const destKey = currentDest ? (`dest_${currentDest}` as const) : 'dest_a';
          return t('voice_briefing_script', {
            dest: t(destKey),
            nodes: ROUTE.totalNodes,
            min: ROUTE.nodes.reduce((s, n) => s + n.walkMin, 0),
          });
        }
        case 'navigating': {
          const node = ROUTE.nodes[Math.max(0, currentNode - 1)];
          return t('voice_navigating_script', {
            index: currentNode,
            total: ROUTE.totalNodes,
            direction: t(node.directionKey as any),
            landmark: t(node.landmarkKey as any),
          });
        }
        case 'scan':
          return t('voice_scan_script');
        case 'confirmed': {
          const pct = Math.round((currentNode / ROUTE.totalNodes) * 100);
          return t('voice_confirmed_script', { pct });
        }
        case 'recovery': {
          const lastIndex = Math.max(1, currentNode - 1);
          const node = ROUTE.nodes[lastIndex - 1];
          return t('voice_recovery_script', { landmark: t(node.landmarkKey as any) });
        }
        case 'arrived': {
          const min = startedAt ? Math.max(1, Math.round((Date.now() - startedAt) / 60000)) : ROUTE.nodes.reduce((s, n) => s + n.walkMin, 0);
          return t('voice_arrived_script', { min, errors });
        }
        default:
          return '';
      }
    },
    [t, currentDest, currentNode, errors, startedAt]
  );

  const announce = useCallback(
    (screen: FlowScreen) => {
      if (!voiceEnabled || screenReaderEnabled) return;
      speak(getScript(screen), lang);
    },
    [voiceEnabled, screenReaderEnabled, getScript, lang]
  );

  return { announce, getScript };
}
