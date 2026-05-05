---
title: Build profiles
description:
    Land ships three Sky workbench bundles under three profile names. They
    differ in which workbench bundle the webview loads, whether SkyBridge runs,
    and whether Output transforms are applied — but all three spawn Cocoon as
    the extension host.
---

Land ships three Sky workbench bundles under three profile names. They differ in
which workbench bundle the webview loads, whether SkyBridge runs, and whether
Output transforms are applied — but all three spawn Cocoon as the extension
host.

Three Sky workbench bundles ship under three profile names: `debug` loads the
stock VS Code browser workbench raw (no SkyBridge), `debug-mountain` loads the
same bundle plus SkyBridge runtime registrations, `debug-electron` loads the
electron-bundled stock workbench plus SkyBridge plus the full Output transform
pipeline. Cocoon spawns in all three — the debug-mountain name doesn't mean
Cocoon is gone, only that the Output transform pipeline is. Pick
`debug-electron` for full extension UX, `debug-mountain` for fewer wire-shape
bugs to chase, `debug` for stock-VS-Code-only sanity testing.

## Profile matrix

| Profile                            | Workbench bundle         | SkyBridge installed? | Wind bootstrap? | Output transforms run?        |
| ---------------------------------- | ------------------------ | -------------------- | --------------- | ----------------------------- |
| `debug` (`Browser=true`)           | Stock browser workbench  | No                   | No              | No                            |
| `debug-mountain` (`Mountain=true`) | Stock browser workbench  | Yes                  | Yes             | No (gated on `Electron=true`) |
| `debug-electron` (`Electron=true`) | Stock electron workbench | Yes                  | Yes             | Yes                           |

## Where this lives

| Concern                                    | File                                                                                          |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Profile sentinel + LAND_PROFILE env baking | `Element/Mountain/build.rs`                                                                   |
| Three Sky bundle entry points              | `Element/Sky/Source/Workbench/{Browser,Mountain,Electron}.astro`                              |
| Output transform gating                    | `Element/Output/Source/Plugin/Index.ts` (`Enabled: () => process.env["Electron"] === "true"`) |
| Cocoon spawn (unconditional)               | `Element/Mountain/Source/Binary/Main/AppLifecycle.rs:431`                                     |

## What's next

- [Architecture: processes & peers](/Doc/architecture-processes) — what each
  process does
- [Build pipeline](/Doc/build-pipeline) — how each profile's bundle is produced
