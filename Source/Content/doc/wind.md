---
title: "Wind"
section: "Elements"
order: 13
description:
    "The Effect-TS native re-implementation of VS Code workbench services that
    bridges Sky's UI layer to Mountain's Rust backend through typed Tauri IPC."
---

Wind is the frontend service layer for the Land editor. It replaces VS Code's
Electron IPC pipeline with typed Tauri commands routed to Rust handlers in
Mountain, eliminating untyped JSON serialization while preserving full VS Code
workbench compatibility. Sky components consume Wind services through
Effect-TS's dependency injection system rather than holding raw state or calling
platform APIs directly.

## TauriLiveLayer

`TauriLiveLayer` (defined in `Source/Effect/Layers/Tauri.ts`) is the primary
Layer stack used in production. It composes all 40+ service implementations into
a single runnable Effect-TS Layer that Sky loads at startup:

```typescript
import { TauriLiveLayer } from "@codeeditorland/wind/Effect/Layers/Tauri";
import { Layer } from "effect";

const AppRuntime = Layer.toRuntime(TauriLiveLayer).pipe(
	Effect.scoped,
	Effect.runSync,
);
```

Two additional layer stacks exist for other contexts:

- `ElectronLiveLayer` - Electron-compatible service implementations for the A3
  Electron workbench variant.
- `TestLayer` - mock implementations used by the extension test runner and CI.

## Service Modules

Each Wind service follows a consistent atomic directory structure with `Tag`,
`Interface`, `Implementation`, `Layer`, and `Type` subdirectories. The Tag is
the Effect-TS service identifier; the Layer provides the Tauri-backed
implementation; typed errors are exported as tagged Effect `Cause` subtypes.

### Core Infrastructure

| Service       | Purpose                                                        |
| ------------- | -------------------------------------------------------------- |
| IPC           | Tauri `invoke()` and `listen()` with typed channel definitions |
| Sandbox       | Preload globals service - wraps `window.__CEL_LAND__`          |
| Configuration | Read/write workbench settings via Mountain with live sync      |
| Telemetry     | Structured logging, spans, and PostHog/OTLP metrics            |
| Mountain      | gRPC-level connection state to Mountain backend                |
| MountainSync  | Background configuration snapshot synchronization              |
| Environment   | OS environment variables, paths, and platform detection        |
| Health        | Service health checks and connectivity monitoring              |
| Bootstrap     | Multi-stage startup orchestration                              |
| Lifecycle     | Application lifecycle phase transitions                        |

### Editor Services

| Service           | Purpose                                                      |
| ----------------- | ------------------------------------------------------------ |
| Editor            | Text editor creation, focus, and layout management           |
| Model             | Document model creation and URI-to-model resolution          |
| TextModelResolver | URI-to-model resolution for virtual and disk-backed files    |
| Decorations       | Editor decoration management (highlights, gutters, overlays) |
| History           | Undo/redo stack integration                                  |

### File System Services

| Service     | Purpose                                                      |
| ----------- | ------------------------------------------------------------ |
| Files       | File read/write/stat/watch via Mountain's native file system |
| WorkingCopy | Dirty state tracking and save conflict management            |
| Workspaces  | Workspace root resolution and multi-root support             |
| TextFile    | Text file encoding/decoding service                          |

### Window and UI Services

| Service       | Purpose                                              |
| ------------- | ---------------------------------------------------- |
| ActivityBar   | Activity bar state and view container management     |
| Sidebar       | Side bar visibility and active view switching        |
| StatusBar     | Status bar item creation and update                  |
| Panel         | Bottom panel (terminal, output, problems) management |
| Notification  | Toast notification display                           |
| Progress      | Long-running operation progress indicators           |
| QuickInput    | Quick pick and input box UI                          |
| Output        | Output panel channel management                      |
| UserSettings  | User settings bridge to Mountain storage             |
| LandWorkbench | Land-specific workbench integration surface          |

### Extension and Language Services

| Service             | Purpose                                             |
| ------------------- | --------------------------------------------------- |
| Extensions          | Extension install, uninstall, list, and activation  |
| Commands            | VS Code command registry and execution              |
| Language            | Language mode detection and association             |
| Keybinding          | Keyboard shortcut resolution                        |
| Label               | URI label formatting service                        |
| Themes              | Color theme management and switching                |
| Storage             | Key-value persistent storage via Mountain           |
| Search              | File and text search via Mountain's ripgrep backend |
| Terminal            | Integrated terminal process management              |
| Clipboard           | System clipboard read/write via Mountain            |
| Vine                | Notification stream from Mountain gRPC events       |
| NetworkRestrictions | Network access restriction policy                   |

## TauriMainProcessService IPC Routing

`Source/Service/TauriMainProcessService.ts` is the IPC channel router that
implements the VS Code `IMainProcessService` interface. All workbench IPC calls
flow through this service. The `TierIPC` environment variable controls which
backend handles each call:

| TierIPC value        | Behavior                                                            |
| -------------------- | ------------------------------------------------------------------- |
| `Mountain` (default) | All calls routed to Mountain Tauri IPC                              |
| `NodeDeferred`       | Mountain first; Cocoon Node.js fallback on miss or undefined result |
| `Node`               | All calls routed to Cocoon via `cocoon:request` bridge              |

Output's `TauriMainProcessService.ts` is a lockstep copy of Wind's version. Both
must be updated together when routing logic changes.

## Wind/Output Lockstep Service Copies

Wind and Output maintain parallel copies of `TauriMainProcessService.ts` because
Output is loaded in a different module context (Cocoon's bootstrap) that cannot
import directly from Wind. The files are kept identical in routing logic; any
change to Wind's routing must be applied to Output's copy in the same commit.

## Preload.ts Compatibility Shim

`Source/Preload.ts` runs synchronously in the webview before any VS Code code
executes. It establishes the compatibility surface that VS Code's workbench
bundle expects:

- Sets `window.vscode` with an `ipcRenderer` shim backed by Tauri's `invoke` and
  `listen` system.
- Populates `window.process` with `ISandboxNodeProcess`-compatible fields
  (`platform`, `arch`, `env`, `cwd()`).
- Configures `window.MonacoEnvironment` for worker URL resolution.
- Populates `window.__CEL_LAND__.polyfills` with WKWebView gap fills.
- Reads `ISandboxConfiguration` from meta tags injected by Mountain into the
  webview HTML.
- Dispatches `land-preload-ready` so workbench bootstrap can await readiness.

## Generated \*Upstream.ts Files

The `Source/Effect/Generated/` directory contains approximately 492
auto-generated `*Upstream.ts` files. Each file provides the bridge shape for one
VS Code workbench service, extracted by the `Source/Codegen/` pipeline.

> [!WARNING] These files are generated output. Never edit them directly. To
> change a generated bridge shape, update the corresponding template in
> `Source/Codegen/Emit/EmitServiceSchema.ts` and re-run the codegen step.

A past issue where all 492 files had an import depth bug (`../../Codegen/`
instead of `../../../Codegen/`) was fixed in the generator template. Any
regression in import depth will cause the entire Wind build to fail with module
resolution errors.

## Wind Codegen Pipeline

`Source/Codegen/` walks the VS Code service catalog, matches `createDecorator`
calls and interface member signatures, and emits `*Upstream.ts` bridge shape
specifications. The pipeline runs as part of `pnpm prepublishOnly` and produces
the `Generated/` directory. It should be re-run whenever the VS Code dependency
in `Output` is updated to a new version.

## Source Layout

```
Wind/Source/
├── Preload.ts              # VS Code environment shim
├── Effect/
│   ├── IPC/                # Tauri invoke + channel types
│   ├── Sandbox/            # Preload globals service
│   ├── Configuration/      # Settings with live sync
│   ├── Mountain/           # gRPC connection service
│   ├── Generated/          # 492 auto-generated *Upstream.ts files
│   └── Layers/
│       ├── Tauri.ts        # TauriLiveLayer (production)
│       ├── Electron.ts     # ElectronLiveLayer
│       └── Test.ts         # TestLayer (mocks)
├── Service/
│   └── TauriMainProcessService.ts  # IPC channel router
├── IPC/
│   └── Channel.ts          # sky:// event URI registry (lockstep with Mountain)
├── Utility/
│   └── Tier.ts             # TierIPC resolver
└── Codegen/                # VS Code service catalog extractor
```

## Related Documentation

- [Wind Deep Dive](https://Editor.Land/Doc/deep-dive-wind)
- [Sky UI layer](https://Editor.Land/Doc/sky)
- [Mountain Rust backend](https://Editor.Land/Doc/mountain)
- [Cocoon extension host](https://Editor.Land/Doc/cocoon)
- [Source Code](https://github.com/CodeEditorLand/Wind)
