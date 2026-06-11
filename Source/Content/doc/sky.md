---
title: "Sky"
section: "Elements"
order: 11
description:
    "The Astro-based UI layer that hosts Monaco, the VS Code workbench, and all
    editor surfaces inside the Tauri webview, with SkyBridge routing sky://
    events through 17 focused modules and a ManagedRuntime singleton from Wind."
---

Sky is the rendering layer for the Land editor. Built with Astro 6 and Vite 8,
it runs entirely inside the Tauri webview and loads the VS Code workbench from
the `@codeeditorland/output` package. All native OS calls cross the Tauri IPC
boundary through the Wind service layer. Sky itself never touches the file
system, spawns processes, or calls platform APIs directly.

## Workbench Variants

Sky supports multiple workbench approaches selected at build time through
environment variables. Unused variants are excluded from the Vite module graph
entirely, so they incur zero bundle cost.

| Variant         | Env Flag            | Description                                            | Feature Coverage |
| --------------- | ------------------- | ------------------------------------------------------ | ---------------- |
| A1 Browser      | `Browser=true`      | Pure browser workbench, no native integration          | ~70%             |
| A1 BrowserProxy | `BrowserProxy=true` | Browser workbench with Mountain service proxy          | ~70-80%          |
| A2 Mountain     | `Mountain=true`     | Browser workbench with full Mountain IPC (recommended) | ~80-90%          |
| A3 Electron     | `Electron=true`     | Electron workbench with WKWebView polyfills            | ~95%             |

The A2 Mountain variant is the recommended deployment target. The A3 Electron
variant maximizes VS Code compatibility by loading
`vs/code/electron-browser/workbench/workbench.js` with WKWebView polyfills for
`requestIdleCallback`, `queryLocalFonts`, `__name`, and a Blob URL rewriter for
`vscode-file://` scheme handling.

When no variant flag is set, `index.astro` falls back to
`Workbench/Default.astro`. Always set `Mountain=true` for production and
`debug-mountain` builds.

## SkyBridge Event System

SkyBridge (`Source/Function/Sky/Bridge.ts`) is the runtime bridge that
translates Tauri events emitted by Mountain into VS Code workbench
notifications. It installs via 17 focused submodules, each responsible for a
specific event domain.

Mountain is used as a relay for Cocoon-to-Sky communication: Sky emits a
`sky://` Tauri event, Mountain re-emits it as a gRPC notification to Cocoon.
This keeps the webview renderer and the extension host decoupled without a
separate transport layer.

| Submodule                       | Domain                                                                        |
| ------------------------------- | ----------------------------------------------------------------------------- |
| `InstallCommands`               | Command execute, register, unregister                                         |
| `InstallDebug`                  | Debug session lifecycle, DAP messages, breakpoint sync                        |
| `InstallDeadChannelListeners`   | No-op stubs for deprecated channels                                           |
| `InstallDiagnostics`            | Language diagnostics relay to Monaco                                          |
| `InstallEditorAndOutput`        | Editor operations, output channels, workspace edits (applyEdit, save, saveAs) |
| `InstallEditorOperations`       | Monaco content debounce (300 ms) to Cocoon `onDidChangeTextDocument`          |
| `InstallFanOut`                 | Multi-subscriber fan-out for high-frequency events                            |
| `InstallInlineCompletions`      | Inline completion provider registration and results                           |
| `InstallProgressTerminalWorkspace` | Progress notifications and terminal lifecycle events                       |
| `InstallScm`                    | SCM provider registration with 10 x 200 ms retry for service population race  |
| `InstallSearch`                 | Workspace search result forwarding                                            |
| `InstallSimpleRelays`           | Language config, theme changes, single-target DOM relays                      |
| `InstallStatusbar`              | Status bar entry create, update, dispose                                      |
| `InstallTasksAndDecorations`    | Task and file-decoration event relay                                          |
| `InstallTreeView`               | Tree view selection, expand/collapse, reveal                                  |
| `InstallUiRequests`             | Message boxes, quick pick, input box, progress indicators                     |
| `InstallWebview`                | Webview message forwarding and disposal                                       |

Reentrancy is guarded: if Sky's webview reloads during HMR or a Tauri window
reload, the bridge skips reinstalling listeners that are already active.

All event URIs follow the canonical `sky://domain/action` kebab-case pattern.
The full catalog covers editor, terminal, SCM, tree view, status bar, output,
webview, notifications, debug, documents, diagnostics, configuration, language,
lifecycle, theme, and workspace domains.

## Astro and Vite Build Pipeline

The `astro.config.ts` orchestrates a multi-step build pipeline:

1. The `@codeeditorland/output` plugin copies and patches VS Code output assets,
   applying error surfacing, config backfill (`colorScheme`, `profiles`,
   `backupPath`, `detectedProfiles`), and diagnostic performance markings.
2. Vite resolves all `@codeeditorland/*` packages through explicit aliases so
   workspace packages are consumed directly from source during development.
3. `manualChunks` (the S1 code-split) splits Sky's Effect-TS runtime, Wind's
   codegen layer, the telemetry bridge, and the debug harness into four separate
   Rollup chunks the browser can fetch and parse in parallel.
4. `@playform/compress` compresses HTML, CSS, and JS artifacts after build.
5. `@playform/inline` inlines critical assets to eliminate render-blocking
   requests.

For development builds (`NODE_ENV=development`), Sky generates inline source
maps. This lets the browser profiler and debugger resolve stack frames into the
original TypeScript source, which is essential for diagnosing boot timing and
SkyBridge event routing.

## Wind Service Integration

Sky does not hold state directly. All persistent state and native operations go
through Wind's Effect-TS service layer. The load order for each workbench
variant is strictly sequenced:

```
Wind Preload.ts (shims window.vscode, ipcRenderer, process)
  → Polyfills (WKWebView gaps, A3 variant only)
  → Wind Bootstrap (TauriLiveLayer composition via ManagedRuntime)
  → VS Code workbench.js (from @codeeditorland/output)
  → SkyBridge (installs sky:// event listeners across 17 modules)
```

Wind's `ManagedRuntime` singleton (`LandWorkbenchRuntime.ts`) is initialized
eagerly at module load time and stored on `globalThis.__CEL_WIND_RUNTIME__`.
Multiple Sky chunks share the same runtime instance. Service lookups are sub-5
ms after initialization because the runtime is pre-warmed during bundle
evaluation.

After `workbench.js` runs its `createDecorator` registrations, the
`__CEL_SERVICES__` accessor exposes the live VS Code service instances.
SkyBridge and Sky components resolve `IStatusbarService`, `ICommandService`,
`ISearchService`, and `IViewsService` through this accessor rather than
re-implementing them.

## Bundled Workbench Mode

When `Bundle=true` and the `Pack` environment variable lists one or more
variants (`electron`, `browser`, `sessions`, `workbench`), Sky produces
pre-compiled Vite/Rollup chunks under `Target/Static/Bundled/<Variant>/`. Each
variant's `Entry.ts` imports the corresponding VS Code workbench module, and the
page-level conditional import ensures only selected variants enter the module
graph. This avoids pulling `gulp`-only `out/` files with property-mangled symbol
mismatches into the Rollup bundle.

## Source Layout

```
Sky/Source/
├── pages/
│   ├── index.astro             # env-driven variant selector
│   ├── Mountain.astro          # A2 page
│   ├── Electron.astro          # A3 page
│   ├── BrowserProxy.astro      # A1 proxy page
│   └── Bundled/                # pre-compiled variant pages
├── Workbench/
│   ├── Mountain.astro          # A2 component
│   ├── Electron/               # A3: Layout, Polyfills, Bootstrap
│   ├── BrowserProxy/           # A1: Layout, Bootstrap, Services/Proxy
│   └── Bundled/                # Browser/Electron/Sessions/Workbench entries
└── Function/
    ├── Sky/Bridge.ts           # SkyBridge top-level installer
    ├── Sky/Bridge/             # 17 Install* modules
    ├── Build/VS/Code.ts        # build pipeline utilities
    └── Markup/Base.astro       # shared page layout with CSP
```

## Related Documentation

- [Sky Deep Dive](https://Editor.Land/Doc/deep-dive-sky)
- [Wind service layer](https://Editor.Land/Doc/wind)
- [Mountain Rust backend](https://Editor.Land/Doc/mountain)
- [Output build pipeline](https://Editor.Land/Doc/output)
- [Source Code](https://github.com/CodeEditorLand/Sky/tree/Current)
