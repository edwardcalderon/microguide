import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ToastHost } from '@/components/toast-host';
import { useThemeTokens } from '@/hooks/use-theme-tokens';
import { stopSpeaking } from '@/lib/speech';
import { useAppStore } from '@/store/app-store';

export default function RootLayout() {
  const { mode } = useThemeTokens();
  const voiceEnabled = useAppStore((s) => s.voiceEnabled);

  // Stop any narration in flight if the user turns voice off mid-sentence.
  useEffect(() => {
    if (!voiceEnabled) stopSpeaking();
  }, [voiceEnabled]);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={mode === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
        <ToastHost />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
