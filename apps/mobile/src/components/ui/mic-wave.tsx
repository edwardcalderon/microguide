import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const BAR_COUNT = 4;

/**
 * Animated equalizer-style bars, decorative feedback that the mic is
 * actively listening and analyzing speech for a command — distinct from a
 * static "on" dot, which only says the mic is enabled, not that it's
 * currently trying to detect words.
 */
export function MicWave({ color, size = 16 }: { color: string; size?: number }) {
  // Lazily created once and never replaced — a stable array of Animated.Value
  // instances, read during render same as any other state. (A ref would read
  // `.current` during render too, which the React Compiler's lint forbids.)
  const [bars] = useState(() => Array.from({ length: BAR_COUNT }, () => new Animated.Value(0.35)));

  useEffect(() => {
    const loops = bars.map((bar, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 110),
          Animated.timing(bar, { toValue: 1, duration: 280, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
          Animated.timing(bar, { toValue: 0.35, duration: 280, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
        ])
      )
    );
    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
  }, [bars]);

  return (
    <View style={[styles.row, { height: size }]} accessibilityElementsHidden>
      {bars.map((bar, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            {
              backgroundColor: color,
              height: bar.interpolate({ inputRange: [0, 1], outputRange: [size * 0.32, size] }),
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  bar: { width: 3, borderRadius: 2 },
});
