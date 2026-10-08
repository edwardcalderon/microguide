---
name: Calm Wayfinding
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464e'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777f'
  outline-variant: '#c6c6cf'
  surface-tint: '#525d80'
  primary: '#081534'
  on-primary: '#ffffff'
  primary-container: '#1e2a4a'
  on-primary-container: '#8691b7'
  inverse-primary: '#bac5ee'
  secondary: '#496080'
  on-secondary: '#ffffff'
  secondary-container: '#c1d9fe'
  on-secondary-container: '#485f7f'
  tertiary: '#001b0f'
  on-tertiary: '#ffffff'
  tertiary-container: '#00321f'
  on-tertiary-container: '#3ea377'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#bac5ee'
  on-primary-fixed: '#0d1a39'
  on-primary-fixed-variant: '#3a4667'
  secondary-fixed: '#d3e3ff'
  secondary-fixed-dim: '#b0c8ed'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#314867'
  tertiary-fixed: '#93f6c4'
  tertiary-fixed-dim: '#77daaa'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system is engineered for pedestrian indoor navigation across high-density university campuses. The design language prioritizes cognitive ease, non-intrusive clarity, and immediate confidence while users walk through multi-level complex facilities. 

The aesthetic is modern, restrained, and utilitarian with a soft tactile layer. It leverages structured surface layering rather than decorative complexity. By utilizing clear functional color cues and ample physical breathing room, the interface minimizes situational stress, accommodating users navigating crowded hallways, elevators, stairwells, and dimly lit lecture complexes.

## Colors

Color is deployed with functional discipline to facilitate glanceable wayfinding. 

- **Primary (`#1E2A4A`):** Deep academic navy grounding key interactive elements, directional anchors, active turn indicators, and primary navigation states.
- **Secondary (`#475E7E`):** Slate blue utilized for secondary contextual information, route alternates, passive map pins, and subtle state indications.
- **Tertiary (`#0D8259`):** High-clarity emerald green reserved strictly for checkpoint verification, arrival confirmations, accessible elevator confirmations, and positive state changes.
- **Neutral (`#64748B`):** Cool slate foundation spanning supporting copy, route metadata, inactive states, and subtle border framing.
- **Warning / Recovery Accent (`#C85A32`):** Warm terracotta amber deployed sparingly for rerouting cues, missed turn alerts, low-visibility paths, or construction detours.

Surface backgrounds favor crisp, clean light-slate tints (`#F8FAFC` base with `#FFFFFF` foreground elevated containers) to deliver maximum visual contrast against indoor architectural glare.

## Typography

The typographic hierarchy accommodates on-the-move readability, where information must be parsed within split seconds under varied lighting. 

**Plus Jakarta Sans** delivers structural balance with distinct open counters for primary spatial directives, room IDs, and immediate turn instructions. **Inter** handles all body content, step-by-step turn manifests, and spatial metadata due to its neutral proportions, high x-height, and legible distinction between similar glyphs (such as `1`, `l`, and `I`). All instructional body copy scales gracefully without line-wrapping truncation on narrow viewport widths.

## Layout & Spacing

The layout is built around mobile-first, one-handed ergonomics. Spacing adopts an 8pt base grid with a tighter 4pt micro-step for fine alignment.

- **Mobile Viewports (<600px):** Single-column dynamic overlay layout. The vector floorplan occupies the full canvas, while directional overlays and action cards live within a bottom-anchored, multi-stage sliding sheet utilizing `margin: 1rem`.
- **Tablet / Split Viewports (600px–1024px):** Fixed-width persistent navigation panel (380px) docked to the leading edge, allowing uninterrupted interaction with the floor layout.
- **Touch Margins & Hit Targets:** All interactive triggers maintain an absolute minimum touch boundary of 48×48px, with interactive elements cushioned by `space-sm` or greater to eliminate errant touches during transit.

## Elevation & Depth

Visual hierarchy uses clean tonal surfaces paired with soft ambient shadows to keep floating UI components distinct from the underlying floorplan geometry.

- **Level 0 (Map Canvas):** Base architectural canvas (`#F8FAFC`). Flat, unshadowed.
- **Level 1 (Docked Containers & Chips):** Floating contextual controls and filter chips use a subtle boundary outline (`1px solid rgba(71, 94, 126, 0.15)`) over pure white (`#FFFFFF`) with a very light resting shadow: `0 2px 4px rgba(30, 42, 74, 0.04)`.
- **Level 2 (Active Direction Cards & Bottom Sheets):** Elevated contextual step cards utilize a dual shadow structure: `0 4px 12px rgba(30, 42, 74, 0.08), 0 1px 2px rgba(30, 42, 74, 0.04)`.
- **Level 3 (Alerts, Overlays & Step Disclosures):** Critical alerts (rerouting notifications, floor transition prompts) sit at `0 12px 28px rgba(30, 42, 74, 0.12), 0 2px 4px rgba(30, 42, 74, 0.04)`.

## Shapes

The interface embraces a balanced rounded profile (`roundedness: 2`). Standard controls, floating route action panels, and cards employ an 8px (`0.5rem`) corner radius. Larger modal wayfinding sheets and floating maneuver cards employ a 16px (`1rem`) radius to establish a soft, non-intimidating posture. Full-pill treatment is reserved exclusively for interactive status chips, step counters, and primary action buttons to maximize finger affordance.

## Components

### Buttons
- **Primary:** Deep navy background (`#1E2A4A`), white text, pill-shaped radius. Minimum 52px height for primary movement flows ("Start Route", "Confirm Arrival").
- **Secondary / Assistance:** Crisp slate outline (`1.5px solid #475E7E`) with tinted slate text; turns into warm amber tint when handling rerouting actions.
- **Floating Action Buttons (Re-center, Layer Switcher):** Circular (48×48px), pure white fill, level 1 elevation, featuring slate blue iconography.

### Cards & Directional Banners
- **Maneuver Card:** Fixed to the top or bottom of the viewport with a 16px corner radius. Displays turn icon, primary instruction in `headline-md`, and distance countdown in `label-lg`.
- **Checkpoint Card:** Features a vertical accent bar on the left edge (4px solid `#0D8259` for confirmed nodes; `#C85A32` for route deviations).

### Chips & Floor Selectors
- **Floor Switcher Chips:** Vertical pill stack; active floor displays `#1E2A4A` fill with white text; inactive floors display `#FFFFFF` fill with `#475E7E` text.
- **Filter Chips (Accessible, Elevators Only, Quiet Paths):** Compact pill shape, outlined in inactive states; adopts soft secondary background fill when enabled.

### Lists & Step Traversal
- **Progressive Route Disclosures:** Step lists link turn-by-turn maneuvers via a continuous 2px vertical dotted slate guideline. Active step shows an expanded card with full distance and landmark photos; future steps remain collapsed into single-line summaries to conserve screen space.

### Form Inputs & Search Fields
- **Destination Search Bar:** Floating card container (52px height) with rounded corners, inset search icon, clear target, and accessible microphone button. High-contrast placeholder text in `#64748B`.