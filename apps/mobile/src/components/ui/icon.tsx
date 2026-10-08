import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { ComponentProps } from 'react';
import type { StyleProp, TextStyle } from 'react-native';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];
type MCIName = ComponentProps<typeof MaterialCommunityIcons>['name'];

/**
 * Every icon in the app as one typed glyph id, instead of raw emoji —
 * emoji render inconsistently (or as a blank/boxed glyph) depending on the
 * host OS's emoji font, which is what broke the QR-scan and clock icons.
 * Ionicons covers almost everything; the `mci:` prefix opts into
 * MaterialCommunityIcons for the handful of glyphs Ionicons lacks (e.g.
 * restroom signage), so call sites still pass one plain string.
 */
export type IconName = IoniconsName | `mci:${MCIName}`;

/**
 * Always decorative: every call site in this app pairs an icon with an
 * adjacent text label (a button's label, a chip's label, a landmark name),
 * so the icon itself is hidden from the accessibility tree to avoid a
 * redundant or unlabeled second announcement.
 */
export function Icon({
  name,
  size = 20,
  color,
  style,
}: {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  if (name.startsWith('mci:')) {
    return (
      <MaterialCommunityIcons
        name={name.slice(4) as MCIName}
        size={size}
        color={color}
        style={style}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      />
    );
  }
  return (
    <Ionicons
      name={name as IoniconsName}
      size={size}
      color={color}
      style={style}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}
