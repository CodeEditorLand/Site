---
title: "Mountain"
section: "Element"
order: 11
description: "The Rust + Tauri native kernel that replaces Electron in Editor.Land. Runs on macOS and Windows today, with Linux in progress."
---

# Mountain

Mountain is the native Rust kernel of Editor.Land. It is a
[Tauri](https://tauri.app) desktop application that replaces Electron's main
process entirely. The operating system's own WebView renders the editor UI:
WKWebView on macOS, WebView2 on Windows, and WebKitGTK on Linux. Mountain
handles everything that requires native OS access so that the extension host
(Cocoon) and the workbench UI (Sky) do not.

Mountain runs and installs on **macOS and Windows** today. The full editor
experience - extensions loading, language features active, terminal open,
clipboard working, file system watcher running - is available in the
`debug-mountain` profile on both platforms from a standard
`cargo tauri dev` or release build invocation.

---

## Platforms

| Platform | WebView | Bundle format | Status |
|---|---|---|---|
| macOS 10.15+ (Catalina) | WKWebView | `.app`, `.dmg` | **Active** |
| Windows 10/11 | WebView2 (bootstrapper embedded) | `.msi`, Microsoft Store | **Active** |
| Linux | WebKitGTK | `.AppImage`, `.deb`, `.rpm` | In Progress |
| iOS 13+ | WKWebView | Framework | Configured |
| Android SDK 24+ | System WebView | APK | Configured |

Windows builds embed the WebView2 bootstrapper silently via Tauri's
`webviewInstallMode: embedBootstrapper`. A dedicated Microsoft Store
configuration (`tauri.microsoftstore.conf.json`) is present at the root of
the Mountain repository. The production signing config lives in
`tauri.conf.prod.json`.

---

## Startup Pipeline

Mountain's binary follows a deterministic startup sequence defined in
`Source/Binary/mod.rs`:

```
main.rs ► Binary::Main (Entry) ► Build ► Register ► Initialize ► Services
                                                                       │
                                                              VineStart + CocoonStart
```

`Build` configures the Tauri application builder (`TauriBuild`, `WindowBuild`,
`LocalhostPlugin`, `LoggingPlugin`). `Register` wires all commands
(`CommandRegister`, `IPCServerRegister`, `AdvancedFeaturesRegister`,
`WindSyncRegister`, `StatusReporterRegister`). `Initialize` parses CLI flags,
selects the runtime port (`PortSelector`), and constructs `ApplicationState`
(`StateBuild`). `Services` starts `VineStart` and `CocoonStart`, then
hands control to the Tauri event loop. Shutdown is handled gracefully by
`RuntimeShutdown` and `SchedulerShutdown`.

---

## Module Layout

Mountain's binary is a single Rust crate. The source is organized into
named modules matching the `Source/` directory tree:

### Crate Root

- **`Library.rs`** - the crate's library root (3.6 KB). Re-exports all public
  modules so that Mountain's types are accessible from test crates and
  integration harnesses without referencing internal paths.
- **`LandFixTier.rs`** - tier-gating runtime banner (2.8 KB). Reads `.env.Land`
  and validates declared tier feature flags at startup before any services
  are started.

### Core Infrastructure

- **`ApplicationState`** - thread-safe, centralized app state shared across
  all Tauri commands via `Arc<ApplicationState>`. All state mutations lock
  through `parking_lot` mutexes.
- **`Environment`** - capability provider interfaces: file system, processes,
  extensions. The effect system in `Common` defines `Requires<T>` trait
  bounds; `Environment` satisfies them.
- **`RunTime`** - the `ApplicationRunTime` effect executor. Business logic is
  expressed as typed `ActionEffect`s and executed through `RunTime.Run(...)`.
  This keeps all async logic composable and testable.
- **`Error`** - centralized error handling types for the whole crate.

### Communication

- **`IPC`** - Tauri IPC server (`mountain_ipc_receive_message`,
  `mountain_ipc_get_status`). Sky calls these to route workbench events to
  Mountain and receive state back. Fourteen commands are registered at
  startup through `Binary::IPC`.
- **`Vine`** - the bidirectional gRPC layer for Cocoon extension host
  communication. Mountain runs a gRPC server on port 50051 (Cocoon dials in);
  Mountain also acts as gRPC client dialing Cocoon's server on port 50052
  (`CocoonService` - `ProcessMountainRequest`, `SendMountainNotification`,
  `CancelOperation`). Both sockets use TLS from `rcgen` + `p256`.
- **`RPC`** - service implementations for each Vine gRPC service.
- **`Air`** - client for the Air background daemon (update checks, release
  signing). Optional feature flag: `AirIntegration`.

### Services

- **`ProcessManagement`** - sidecar process lifecycle: launch, monitor,
  restart. Manages the Cocoon Node.js sidecar process (which itself runs both
  a gRPC client and server) and any future sidecars.
- **`FileSystem`** - native `FileExplorerViewProvider` that powers the
  Explorer sidebar. Reads workspace folders and provides directory listings
  over Tauri IPC using async Tokio I/O.
- **`ExtensionManagement`** - extension discovery, scanning, and activation.
  The `TierExtensionScanParallel` feature flag enables parallel manifest
  scanning.
- **`Workspace`** - `.code-workspace` file parsing and multi-root workspace
  support.
- **`Telemetry`** - optional OpenTelemetry tracing and PostHog event
  reporting, behind the `Telemetry` feature flag.
- **`Update`** - in-process update check and download coordination with Air.

### Commands

- **`Command`** - native Tauri command handlers.
- **`Track`** - central command dispatcher (`DispatchFrontendCommand`,
  `ResolveUIRequest`) routing Sky UI requests to provider implementations.
  All `command.*` dispatch is handled here; Cocoon no longer proxies command
  routing (path removed April 2026).

---

## Registered Native Commands

The following commands are registered at startup in `Command::Bootstrap` and
available to all Sky and extension callers via `vscode.commands.executeCommand`:

| Command | Handler |
|---|---|
| `mountain.openFile` / `workbench.action.files.openFile` | Native file open dialog → `OpenDocument` effect |
| `editor.action.formatDocument` | Calls `LanguageFeatureProviderRegistry::ProvideDocumentFormattingEdits` → `ApplyWorkspaceEdit` |
| `workbench.action.files.save` | Saves active document from `ApplicationState::Workspace::ActiveDocumentURI` |
| `workbench.action.closeActiveEditor` | Closes active document |
| `workbench.action.reloadWindow` | Calls `window.eval("location.reload()")` on the Tauri WebviewWindow |
| `setContext` | Context key no-op (Wind/Sky own the context key service) |
| `vscode.open` / `vscode.openFolder` | `file://` URIs → `sky://window/showTextDocument` emit; external URLs → `open` (macOS), `cmd.exe /c start` (Windows), `xdg-open` (Linux) |
| `workbench.action.openWalkthrough` | No-op (walkthrough UI being wired) |
| `Command::TreeView::GetTreeViewChildren` | File explorer tree provider |
| `Command::LanguageFeature::MountainProvideHover` | Native hover provider |
| `Command::LanguageFeature::MountainProvideCompletions` | Native completions |
| `Command::LanguageFeature::MountainProvideDefinition` | Go-to-definition |
| `Command::LanguageFeature::MountainProvideReferences` | Find references |
| `Command::SourceControlManagement::GetAllSourceControlManagementState` | Native SCM state |
| `Command::Keybinding::GetResolvedKeybinding` | Resolved keybinding lookup |
| `IPC::TauriIPCServer::mountain_ipc_receive_message` | Main IPC ingestion |
| `Binary::Main::MountainGetWorkbenchConfiguration` | Config read for Sky bootstrap |
| `Binary::Main::SwitchTrayIcon` | Tray icon update |

---

## Key Dependencies

| Crate | Role |
|---|---|
| `tauri` | Desktop application framework; window, WebView, tray, plugin host |
| `tokio` (full) | Async runtime for all I/O, gRPC, and process management |
| `tonic` / `prost` | gRPC server and client (Vine protocol, both directions) |
| `portable-pty` | Cross-platform pseudo-terminal for `window.createTerminal` |
| `arboard` | Cross-platform clipboard access |
| `keyring` | OS keychain store (macOS Keychain, Windows Credential Manager, Linux Secret Service) |
| `notify` | File system watcher (FSEvents on macOS, ReadDirectoryChangesW on Windows) |
| `grep-regex` + `grep-searcher` | Ripgrep-compatible in-process file search |
| `globset` | Compiled glob pattern matching for file watcher exclusions |
| `ignore` | `.gitignore`-aware directory traversal |
| `opentelemetry` + `posthog-rs` | Optional telemetry and analytics |
| `rcgen` + `rustls` + `p256` | TLS certificate generation for both gRPC sockets |
| `tauri-plugin-localhost` | Serves Sky assets over `localhost` during development |
| `sysinfo` | Process and system metrics |

---

## Responsibilities

Mountain owns the following concerns on macOS and Windows today:

- **File system** - all `vscode.workspace.fs.*` calls route through
  Mountain's Rust async I/O layer via Tauri IPC. Cached reads return at
  approximately 8 ms p99 latency; cold reads at approximately 60 ms p99 on
  Apple Silicon.
- **Bidirectional gRPC** - Mountain runs the Vine gRPC server on port 50051
  and also acts as gRPC client connecting to Cocoon's server on port 50052.
  Both directions are used during normal operation: Mountain pushing workspace
  events into Cocoon, and Mountain querying Cocoon for extension-provided
  language features and tree-view data.
- **Terminal (pty)** - Mountain spawns and manages pseudo-terminals for
  `window.createTerminal` using `portable-pty` on all platforms.
- **Clipboard** - `arboard` provides cross-platform clipboard read/write.
- **Keychain** - secrets stored in the OS keychain via `keyring`, not in
  plaintext config files.
- **DAP bridge** - `debug.startDebugging` is routed through Mountain, which
  acts as a Debug Adapter Protocol proxy between Sky and the debug adapter.
- **File search** - `grep-regex` + `grep-searcher` provide ripgrep-compatible
  in-process search without spawning a child process.
- **File watcher** - `notify` watches workspace folders for changes; the
  `TierFileWatcherLayer4` feature flag gates an experimental higher-throughput
  watcher path.
- **IPC broker** - Mountain is the single point through which Sky (the
  WebView UI) and Cocoon (the Node extension host) exchange typed events.
- **Echo host** - the work-stealing task scheduler (Echo) is embedded inside
  Mountain's binary as a Rust crate dependency.

---

## Why Tauri Instead of Electron

Electron ships a bundled Chromium alongside every application. Each open
window creates a new renderer process with its own heap. On a typical macOS
session with a medium project, VS Code uses between 500 MB and 1.5 GB of RAM
across its six concurrent processes: main, renderer, extension host, pty host,
file watcher, and shared process.

Tauri uses the WebView the operating system already provides. No Chromium
is bundled. Mountain runs as two processes - Mountain (Rust) and Cocoon (Node)
- instead of six. Where Electron's main process handles system calls in
milliseconds, Mountain's native Rust kernel handles the equivalent operations
in microseconds. On a 47-extension workload measured on Apple Silicon macOS,
total RSS is approximately **600 MB** (Mountain ~280 MB, Cocoon ~320 MB),
compared to approximately **810 MB** for VS Code. That is around a 25%
reduction. The remaining cost is Cocoon: running the VS Code extension
API requires a Node.js process regardless of what the native kernel does.

---

## Verified Performance Numbers

Mountain already starts faster than VS Code on equivalent hardware. All
figures below are from profiler and build log output on Apple Silicon macOS
with 47 extensions loaded, and are representative of Windows 10/11 performance
on equivalent hardware. Numbers will differ on other hardware.

| Metric | Mountain + Cocoon | VS Code | Notes |
|---|---|---|---|
| Cold-boot time | ~2,400 ms | ~2,500 ms | Launch to first editor frame, 47 extensions. Already faster. |
| Total RSS | ~600 MB | ~810 MB | 47 extensions, same workspace. ~25% reduction. |
| Cached file read (p99) | ~8 ms | - | Tauri IPC + Rust async cache |
| Cold file read (p99) | ~60 ms | - | No cache, first access |
| Extension activation | 47 manifests parallel | sequential | Cocoon `Parallel8` worker pool |

The current cold-boot number of ~2,400 ms is already faster than VS Code's
~2,500 ms on the same workload. There is also a clear optimisation path that
will bring the number down considerably further. The primary opportunity is a
sequential dynamic-import loop that loads 3,385 workbench modules one at a
time; consolidating these into a single bundled module graph is projected to
save ~550 ms. Lazy-spawning Cocoon after first paint would save a further
~200 ms, bringing projected cold-boot time to approximately **1,650 ms** -
a 31% improvement over the current number and roughly **34% faster than
VS Code** on the same workload.

---

## Feature Flags

Mountain uses Cargo feature flags for both capability gates and experimental
tier features. The default feature set enables `ExtensionHostCocoon`,
`MistNative`, and `AirIntegration`.

**Tier-gated experimental flags** (each maps to a `.env.Land` tier key):

| Flag | Description |
|---|---|
| `TierFileSystemLayer4` | Experimental high-throughput file system layer |
| `TierFindFilesLayer4` | Experimental parallel file search |
| `TierFileWatcherLayer4` | `notify`-rs FS events, high-throughput watcher |
| `TierGlobNative` | `globset`-compiled glob patterns |
| `TierClipboardLayer4` | `arboard` direct clipboard access |
| `TierExtensionScanParallel` | Parallel extension manifest scanning |
| `TierConfigurationEager` | Eager configuration load at startup |
| `TierRemoteProcedureCallSharedMemory` | Shared-memory gRPC transport |
| `TierHTTPProxyHyper` | Hyper-based HTTP proxy |
| `TierDiagnosticsDelta` | Delta-compressed diagnostic push |

---

## Build Profiles

Mountain is active in two of the three build profiles:

- **`debug`** - Mountain does not run. The workbench opens as a plain web
  app in a browser. File system, pty, and DAP APIs are unavailable. Used for
  fast UI iteration without a Rust build step.
- **`debug-mountain`** - Mountain runs as a Tauri desktop application.
  Cocoon spawns as the extension host. The full API surface is active on
  both macOS and Windows. This is the primary development target.
- **`debug-electron`** - Mountain does not run. The editor runs inside
  Electron for compatibility testing. Not actively maintained.

---

## Active on macOS and Windows Today

The following capabilities are confirmed working in the `debug-mountain`
profile on both platforms:

- Editor window opens and renders the full workbench UI via WKWebView / WebView2
- Extensions load, activate, and run via Cocoon's extension host
- Language features (hover, completions, go-to-definition, find references)
  flow through Cocoon and return results to Sky
- Terminal panels open and operate via `portable-pty`
- File system reads, writes, and watches via Tokio async I/O
- Clipboard read/write via `arboard`
- OS keychain secrets via `keyring`
- gRPC bidirectional communication with Cocoon on both ports
- File search (ripgrep-compatible, in-process)
- SCM state and tree-view data via Cocoon providers
- Webview panels (extension-provided HTML, post-message API)
- Status bar, output channels, notification toasts
- Command palette dispatch for all registered commands
- Cross-platform `vscode.open` (external URLs, file URIs)

---

## Planned Improvements

- **Cold-boot optimisation** - bundling the 3,385-module workbench graph and
  lazy-spawning Cocoon after first paint projects to bring cold-boot from
  ~2,400 ms to ~1,650 ms (see Verified Performance Numbers above).
- **Process sidecar splits** - planned: a PtyHost sidecar (terminal sessions
  survive editor restarts), a Watcher sidecar (isolates FSEvents /
  ReadDirectoryChanges fan-out), and a Search sidecar (offloads grep-searcher
  to reduce Mountain's RSS). None have landed yet.
- **Linux** - WebKitGTK bundle configuration is present in `tauri.conf.json`;
  full integration and testing are in progress.
- **Walkthrough UI** - `workbench.action.openWalkthrough` is registered;
  the Welcome/Getting Started panel is being wired up.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Vine: Wire Protocol](/Doc/vine)
- [Echo: Task Scheduler](/Doc/echo)
- [Source Code](https://github.com/CodeEditorLand/Mountain)
