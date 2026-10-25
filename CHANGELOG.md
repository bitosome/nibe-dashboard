# Changelog

## 0.3.1

- Let Details size to its content while retaining a bounded scrollable body. Keep dedicated height for charts and curve editing.

## 0.3.0

- Bundle the pinned `@bitosome/ha-card-ui` library instead of maintaining copied UI implementations.
- Open Settings, Details and History in a shared native modal with consistent Back/X, safe-area sizing, route focus and scroll restoration.
- Keep live comfort readings and room controls on the dashboard. Hot-water history is a child page; native sensor details close the custom top layer before opening Home Assistant.
- Preserve controller ownership, command confirmation, alarms and native history behavior.

## 0.2.3

- Share the versioned Space Hub header, metric, surface and navigation primitives with the card family; keep theme overrides and under-tile glow layering.
- Align history/details icons and Overview naming, use 56px section navigation and 44px comfort/room controls, and retain readable mobile configuration fields.
- Format maintained presentation sources and enforce formatting in checks. Keep command authorization, physical-state semantics, history and unavailable handling unchanged.

## 0.2.2

- Match the compact ventilation-card reading tiles: aligned labels, values and small units, consistent heights and tighter spacing. Preserve unavailable readings and detail navigation.

## 0.2.1

- Remove the home-screen Autopilot toggle. Controller-off/unavailable diagnostics remain visible; the card does not change the controller enable state.

## 0.2.0

- Native NIBE Autopilot status binding, comfort controls and configured room discovery.
- Explicit monitor/blocked/unavailable notices and no fallback to stale legacy helpers.
- Two-part backend binding/role verification before native number or switch writes.
- Native-controller visual editor and synthetic preview scenarios; legacy mode retained.

## 0.1.0

- Compact Space Hub-family home view with comfort target, DHW, circuit input and autopilot.
- Room-specific temperature controls, hot-water readings, native history and expandable diagnostics.
- Explicit helper-only controls; raw NIBE registers stay read-only.
- Alarm 181 and controller-health warnings without hygiene-success inference.
- Entity-confirmed commands, offline/invalid-data protection and read-only mode.
- Visual editor, generic mock preview, HACS bundle and build/release checks.
