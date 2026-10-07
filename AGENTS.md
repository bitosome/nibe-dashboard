# NIBE Dashboard

This project owns a standalone Home Assistant Lovelace card, not heat-pump control algorithms.

## Safety and ownership

- Only explicit user gestures can send commands. Never schedule equipment control in the browser.
- The card writes only configured input_boolean/input_number comfort helpers and configured climate target temperatures. No raw NIBE number/switch/select actions, alarm resets, forced boosts, compressor control or operating-mode changes.
- Keep request acceptance, entity confirmation and physical results distinct. An acknowledged helper is not proof of a completed heat-pump operation.
- Alarm 181 means a failed periodic boost. No alarm or high BT7 alone proves a completed hygiene cycle. Never infer successful thermal disinfection.
- Unknown/unavailable readings are not zero. Do not fabricate heat production or COP from electrical readings. Distinguish permission from draw, relay requests from flow, and setpoint ceilings from physical protection.
- Read-only mode disables card commands; it is a UI preference, not a replacement for Home Assistant permissions.
- Tests and preview must use synthetic entities and mocked services. Never run physical pump actions in a test.

## Design

Space Hub Card is the canonical family design. Use its vendored tokens, rounded surfaces, HA typography/theme variables and isolated under-tile glows. Preserve `src/shared/PROVENANCE.md`; synchronize shared code rather than forking the design language. Keep technical details behind progressive disclosure. No custom chart dependencies.

## Structure and checks

- `src/model.ts`: roles/default mappings, validation, numeric/state handling.
- `src/nibe-dashboard.ts`: presentation, bounded user commands, confirmation, native history cards.
- `src/editor.ts`: visual configuration, explicit room selection, no discovery-driven commands.
- `src/styles.ts`: family-aligned, responsive light/dark styling.
- `preview/`: offline mock host, no HA credentials or requests.
- `test/`: tests of the actual built bundle and packaging.
- `dist/nibe-dashboard.js`: committed self-contained HACS artifact; rebuild before committing.

Run `npm ci` then `npm run check`. Verify narrow/wide and light/dark preview, missing/offline entities, service failure and alarms. Keep bundle and package version consistent; tag `vX.Y.Z` only after checks. Release workflow builds, checks and attaches the bundle.

## Privacy and deployment

All committed content must be suitable for a public repo. No production dashboard exports, household room mappings, hostnames/IPs, registry/API dumps, credentials or raw logs. Examples use generic entities. Do not change repository visibility, install on a live HA instance or replace dashboards without explicit authorization. The backend automations remain in their separate repository.
