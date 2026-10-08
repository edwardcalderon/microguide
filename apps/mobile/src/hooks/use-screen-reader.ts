import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * Tracks whether the OS screen reader (VoiceOver / TalkBack / web's built-in
 * reader) is currently on. Used to stand down the app's own TTS narration
 * (`useAnnounce`) when a real screen reader is already reading the screen
 * via accessibility labels — talking over it would make the app harder to
 * use for exactly the people it's meant to help.
 */
export function useScreenReaderEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isScreenReaderEnabled().then((value) => {
      if (mounted) setEnabled(value);
    });
    const subscription = AccessibilityInfo.addEventListener('screenReaderChanged', setEnabled);
    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  return enabled;
}
