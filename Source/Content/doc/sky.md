---
title: "Sky"
section: "Elements"
order: 11
description:
    "The Astro-based UI layer that hosts Monaco, the VS Code workbench, and all
    editor surfaces inside the Tauri webview."
---

Sky is the rendering layer for the Land editor. Built with Astro 6 and Vite 8,
it runs entirely inside the Tauri webview and loads the VS Code workbench from
the `@codeeditorland/output` package. All native OS calls cross the Tauri IPC
boundary through the Wind service layer - Sky itself never touches the file
system, spawns processes, or calls platform APIs directly.

## Workbench Variants

Sky supports three workbench approaches selected at build time through
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

> [!IMPORTANT] When no variant flag is set, `index.astro` falls back to
> `Workbench/Default.astro`. Always set `Mountain=true` for production and
> `debug-mountain` builds.

## SkyBridge Event System

SkyBridge (`Source/Function/Sky/Bridge.ts`, approximately 2900 lines) is the
runtime bridge that translates Tauri events emitted by Mountain into VS Code
workbench notifications. It installs via a set of focused submodules, each
responsible for a specific event domain.

| Submodule                  | Domain                                                           |
| -------------------------- | ---------------------------------------------------------------- |
| `installEditorAndOutput`   | Editor operations, output channels, workspace edits              |
| `installOperations`        | Monaco model content sync, apply-text-edits                      |
| `installScm`               | Source control provider registration, input box, commit template |
| `installTreeView`          | Tree view create/refresh/selection/collapse/expand/reveal        |
| `installDebug`             | Debug session start/stop, breakpoint sync                        |
| `installUiRequests`        | Message boxes, quick pick, input box, progress notifications     |
| `installSimpleRelays`      | Language configuration, theme changes, simple one-to-one relays  |
| `installInlineCompletions` | Inline completion provider registration and results              |

Reentrancy is guarded: if Sky's webview reloads during HMR or a Tauri window
reload, the bridge skips reinstalling listeners that are already active.

All event URIs follow the canonical `sky://domain/action` kebab-case pattern.
The full catalog spans approximately 100 channels covering editor, terminal,
SCM, tree view, status bar, output, webview, notifications, debug, documents,
diagnostics, configuration, language, lifecycle, progress, task, theme, and
workspace domains.

## Astro and Vite Build Pipeline

The `astro.config.ts` (~1450 lines) orchestrates a multi-step pipeline:

1. The `@codeeditorland/output` plugin copies and patches VS Code output assets,
   applying error surfacing, config backfill (`colorScheme`, `profiles`,
   `backupPath`, `detectedProfiles`), and diagnostic performance markings.
2. Vite resolves all `@codeeditorland/*` packages through explicit aliases so
   workspace packages are consumed directly from source during development.
3. `manualChunks` configuration splits the VS Code workbench into separate
   Rollup chunks (S1 code-split), preventing the entire platform bundle from
   landing in a single file.
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
  → Polyfills (WKWebView gaps, if A3)
  → Wind Bootstrap (TauriLiveLayer composition)
  → VS Code workbench.js (from @codeeditorland/output)
  → SkyBridge (installs ~100 sky:// event listeners)
```

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
    ├── Sky/Bridge.ts           # SkyBridge (~2900 lines)
    ├── Sky/Bridge/             # installEditorAndOutput, installScm, etc.
    ├── Build/VS/Code.ts        # build pipeline utilities
    └── Markup/Base.astro       # shared page layout with CSP
```

## Related Documentation

- [Sky Deep Dive](https://Editor.Land/Doc/deep-dive-sky)
- [Wind service layer](https://Editor.Land/Doc/wind)
- [Mountain Rust backend](https://Editor.Land/Doc/mountain)
- [Output build pipeline](https://Editor.Land/Doc/output)
- [Source Code](https://github.com/CodeEditorLand/Sky)
