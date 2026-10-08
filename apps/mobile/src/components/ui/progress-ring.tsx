import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { useThemeTokens } from '@/hooks/use-theme-tokens';

export function ProgressRing({
  pct,
  size = 120,
  label,
}: {
  pct: number;
  size?: number;
  /** Accessible name for the ring, e.g. "Route progress". Falls back to a plain percentage. */
  label?: string;
}) {
  const { colors } = useThemeTokens();
  const stroke = 10;
  const center = size / 2;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, pct));
  const dashOffset = circumference * (1 - clamped / 100);

  return (
    <View
      style={{ width: size, height: size }}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label ?? 'Progress'}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped) }}
    >
      {/* The drawing itself is decorative — the View above carries the one accessible announcement. */}
      <View importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
        <Svg width={size} height={size}>
          <Circle cx={center} cy={center} r={radius} stroke={colors.line} strokeWidth={stroke} fill="none" />
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={colors.accent}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            // A plain SVG transform string (vs. the rotation/origin shorthand props) is the
            // path both react-native-svg's native and web renderers parse the same way.
            transform={`rotate(-90 ${center} ${center})`}
          />
        </Svg>
        <View style={[StyleSheet.absoluteFill, styles.center]}>
          <Text style={[styles.pct, { color: colors.text }]}>{Math.round(clamped)}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  pct: { fontSize: 22, fontWeight: '800' },
});
