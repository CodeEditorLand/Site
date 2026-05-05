---
title: "Architecture Overview"
section: "Architecture"
order: 4
description:
    "How Editor.Land's elements fit together: two processes, two IPC channels,
    one extension API."
---

# Architecture Overview

Editor.Land runs as **two processes** on a typical desktop session: Mountain
(the Rust kernel) and Cocoon (the Node.js extension host). A third background
process, Air, handles updates and downloads independently. The editor UI (Sky)
runs inside the OS WebView as part of Mountain's Tauri application - it is not a
separate process.

The OS WebView is WKWebView on macOS, WebView2 on Windows, and WebKitGTK on
Linux (in progress). No Chromium is bundled.

This is a significant structural difference from VS Code, which runs six
concurrent processes on the same workload (main, renderer, extension host, pty
host, file watcher, shared process). The resource comparison on a 47-extension
workload on Apple Silicon macOS: Land ~600 MB RSS versus VS Code ~810 MB RSS.
Cold-boot time is already competitive with VS Code (~2,400 ms versus ~2,500 ms
on the same workload), with a clear optimisation path to approximately **1,650
ms** - roughly 34% faster than VS Code on the same hardware.

---

## Two IPC Channels

The architecture has two distinct inter-process communication paths:

**Channel 1: Sky ↔ Mountain (Tauri IPC)** Sky's UI components call Wind service
interfaces. Wind routes native calls (file reads, terminal spawn, clipboard,
configuration) through Tauri's typed IPC to Mountain. This is the primary path
for all user-initiated actions in the editor UI. The IPC server is implemented
in `Source/IPC/TauriIPCServer.rs` inside Mountain; the entry points are
`mountain_ipc_receive_message` and `mountain_ipc_get_status`. Fourteen commands
are registered at startup through the `Binary::IPC` module.

**Channel 2: Mountain ↔ Cocoon (bidirectional gRPC / Vine)** The Vine protocol
runs as two gRPC channels between Mountain and Cocoon:

- **Mountain as server (port 50051)** - Cocoon dials Mountain to send
  notifications, fire events into the kernel, and deliver extension results
  (diagnostics, completions, hover data).
- **Cocoon as server (port 50052)** - Mountain dials Cocoon to invoke extension
  host methods (`InitializeExtensionHost`, `$activateByEvent`, `$provideHover`,
  `$acceptModelChanged`, and the full `CocoonService` interface defined in
  Vine's `Vine.proto`).

Both sockets are secured by TLS certificates generated at startup using
`rcgen` + `p256`. These two channels are independent; a slow Cocoon operation
does not block Sky's Tauri IPC calls to Mountain.

Command dispatch (`command.*`) is handled directly by Mountain's
`Track/Effect/CreateEffectForRequest` layer since April 2026. Cocoon no longer
proxies command dispatch.

---

## Startup Pipeline

Mountain's binary follows a deterministic startup sequence defined in
`Source/Binary/mod.rs`:

```
main.rs ► Binary::Main (Entry) ► Build ► Register ► Initialize ► Services
                                                                       │
                                                              Vine + Cocoon start
```

`Build` configures the Tauri application builder (localhost plugin, logging,
window). `Register` wires all commands and the IPC server. `Initialize` parses
CLI flags, selects the runtime port, and constructs `ApplicationState`.
`Services` starts VineStart and CocoonStart, then hands control to the Tauri
event loop.

---

## Data Flow

Two representative paths through the system:

**User types a character (UI path):**

```
Keypress in Sky (OS WebView)
  → Wind Layer (Effect-TS, in-process)
  → Tauri IPC → Mountain (Rust)
  → Mountain notifies Cocoon via Vine gRPC (port 50052 → CocoonService)
  → Cocoon fires onDidChangeTextDocument handlers in extension fibers
  → Extension results return via Vine → Mountain → Tauri IPC → Sky re-renders
```

**Extension calls vscode.workspace.fs.readFile (extension API path):**

```
Cocoon (Node.js fiber)
  → Vine gRPC (port 50051 → Mountain)
  → Mountain reads file via Tokio async FS (~8 ms p99 cached, ~60 ms p99 cold)
  → Response returns via Vine → Cocoon resolves the Thenable
```

**Extension calls vscode.open for external URL (cross-platform path):**

```
Cocoon executes vscode.open command
  → Mountain::Command::Bootstrap routes to CommandVscodeOpen
  → macOS: spawn open(1)
  → Windows: spawn cmd.exe /c start
  → Linux: spawn xdg-open
```

---

## Elements by Layer

Elements are grouped by architectural layer. **Active** means the element is
running in the `debug-mountain` profile and verified working on macOS and
Windows. **In Progress** means partially implemented. **Configured** means the
build target or design is defined but not yet in production use.

### Layer 1 - Native Shell

| Element                       | Language     | Role                                                                                                                                 | Status |
| ----------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| [**Mountain**](/Doc/mountain) | Rust + Tauri | Native kernel: file system, gRPC server, terminal pty, clipboard, keychain, search, DAP bridge, IPC broker                           | Active |
| [**Echo**](/Doc/echo)         | Rust         | Work-stealing task scheduler embedded inside Mountain's binary; dispatches background extension tasks without blocking the gRPC loop | Active |
| [**Air**](/Doc/air)           | Rust         | Background daemon: update checks, downloads, release signing, platform-native service lifecycle                                      | Active |

### Layer 2 - IPC

| Element               | Language | Role                                                                            | Status |
| --------------------- | -------- | ------------------------------------------------------------------------------- | ------ |
| [**Vine**](/Doc/vine) | Protobuf | gRPC schema and generated stubs for Mountain↔Cocoon bidirectional communication | Active |
| [**Mist**](/Doc/mist) | Rust     | WebSocket communication layer (`MistNative` feature, enabled by default)        | Active |

### Layer 3 - Extension Host

| Element                   | Language          | Role                                                                         | Status      |
| ------------------------- | ----------------- | ---------------------------------------------------------------------------- | ----------- |
| [**Cocoon**](/Doc/cocoon) | TypeScript / Node | Runs VS Code extensions via `vscode.*` API on Effect-TS fibers               | Active      |
| [**Grove**](/Doc/grove)   | Rust              | WASM and Rhai extension host (alternative to Cocoon for non-Node extensions) | In Progress |
| **Worker**                | TypeScript        | Web Workers for frontend parallel tasks                                      | Planned     |

### Layer 4 - UI

| Element               | Language   | Role                                                                | Status |
| --------------------- | ---------- | ------------------------------------------------------------------- | ------ |
| [**Wind**](/Doc/wind) | TypeScript | Effect-TS service layer: typed workbench interfaces consumed by Sky | Active |
| [**Sky**](/Doc/sky)   | Astro      | Workbench UI: the editor interface rendered in the OS WebView       | Active |

### Layer 5 - Build Toolchain

| Element               | Language              | Role                                                                                        | Status |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------------- | ------ |
| [**Rest**](/Doc/rest) | Rust / OXC            | Transforms and bundles VS Code platform code (NLS, loader shims, workbench modules)         | Active |
| **Output**            | JavaScript            | Build artifact directory produced by Rest; not a running process                            | Active |
| **Common**            | Rust / TypeScript     | Shared IPC event type definitions and `ActionEffect` traits used across Mountain and Cocoon | Active |
| **SideCar**           | Cross-platform        | Pre-built Node.js binaries for Cocoon's extension host on each target platform              | Active |
| **Maintain**          | Shell / Build tooling | CI/CD scripts, release automation, workspace maintenance                                    | Active |

---

## Eleven Active Elements

Of the fifteen elements listed above, twelve are active in the primary
development path today: Mountain, Echo, Cocoon, Sky, Wind, Vine, Mist, Air,
Rest, Common, SideCar, and Maintain. The remaining three - Grove (WASM extension
host, in progress), Worker (planned), and Output (build artifact, no runtime
process) - are either emerging capabilities or build artifacts.

Echo is embedded inside Mountain's binary rather than running as a separate
process. See [Echo](/Doc/echo) for details.

---

## Platform Targets

Mountain's `tauri.conf.json` declares bundle configuration for all supported and
planned targets. macOS and Windows are both fully active today:

| Platform | Minimum version  | Build artifact              | Notes                                  |
| -------- | ---------------- | --------------------------- | -------------------------------------- |
| macOS    | 10.15 (Catalina) | `.app`, `.dmg`              | Active                                 |
| Windows  | 10 / 11          | `.msi`, Microsoft Store     | Active; WebView2 bootstrapper embedded |
| Linux    | -                | `.AppImage`, `.deb`, `.rpm` | In Progress                            |
| iOS      | 13.0             | Framework                   | Configured                             |
| Android  | SDK 24           | APK                         | Configured                             |

The `land.editor.binary` application identifier and the custom URI scheme
(`land:`) are consistent across all platforms.

---

## Security Model

The Tauri Content Security Policy in Mountain's config explicitly allows these
custom URI schemes alongside `https:`:

- **`land:`** - Mountain's own asset serving scheme
- **`vscode-file:`** - VS Code platform file assets (workbench modules, icons)
- **`vscode-webview:`** - Extension webview panel frames
- **`ipc:`** - Tauri's in-process IPC channel

This means extension webviews load in isolated frames (`vscode-webview:`) with
the same origin separation as VS Code. Mountain uses the `brownfield` security
pattern - no Tauri-injected APIs are automatically available; capabilities are
declared explicitly in the `capabilities/` directory.

---

## Extension API Notes

The vast majority of `vscode.*` APIs - file system, terminal, language server
protocol, diagnostics, status bar, tree views, custom editors, and webview
panels - are routed and active. The following APIs have planned backend wiring
that is not yet complete:

- `vscode.lm.*` - language model / Copilot integration
- `vscode.chat.*` - chat panel UI
- `vscode.notebook.*` - notebook UI

Note that test runner infrastructure is already wired at the event level:
`sky://test/registered`, `sky://test/run-started`, and
`sky://test/run-status-changed` are active in the SkyEvent registry. The
`vscode.tests.*` API wiring in Cocoon is in progress.

See [Cocoon](/Doc/cocoon) for the full API coverage detail.

---

## See Also

- [Introduction](/Doc/introduction)
- [Mountain: Native Kernel](/Doc/mountain)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Vine: Wire Protocol](/Doc/vine)
- [Local-First Protocol](/Doc/local-first-protocol)
