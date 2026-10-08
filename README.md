# MicroGuide

Indoor campus navigation prototype — guides a user node-by-node to a destination,
confirming each checkpoint with a QR code, with bilingual (ES/EN) voice-over and a
recovery flow for when someone gets lost.

## Structure

Turborepo + pnpm workspaces monorepo:

```
apps/
  mobile/        Expo Router app — the MicroGuide mobile prototype
packages/        (reserved for shared code — empty for now)
assets/
  ui-prototypes/ Reference design prototypes used to guide the mobile app's UI
```

## Getting started

```bash
pnpm install
pnpm dev:mobile      # starts the Expo dev server for apps/mobile
```

See [apps/mobile/README.md](apps/mobile/README.md) for the app's details, flow,
and a known limitation (voice command recognition needs a native dev build).

## Scripts (root)

| Command | Does |
| --- | --- |
| `pnpm dev` | Runs `dev` in every app via Turborepo |
| `pnpm dev:mobile` | Runs only the mobile app's dev server |
| `pnpm build` | Runs `build` in every app |
| `pnpm lint` | Runs `lint` in every app |
| `pnpm type-check` | Runs `type-check` in every app |
