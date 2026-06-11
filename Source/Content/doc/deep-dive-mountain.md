---
title: "Mountain - Deep Dive"
section: "Deep Dive"
order: 7
description:
    "Internals of the Mountain Rust backend: ActionEffect system, Track
    dispatcher, Environment provider registration, Vine gRPC, Cocoon process
    management, and ISandboxConfiguration construction."
---

Mountain is the Rust binary at the foundation of Land. This page covers its
internal execution model in depth: how the ActionEffect system works, how the
Track dispatcher routes requests, how providers are registered and accessed, and
how Cocoon is launched and kept alive.

## ActionEffect and ApplicationRunTime

Mountain expresses business logic as declarative `ActionEffect`s - typed
closures over a capability trait - rather than imperative call chains. The
`ApplicationRunTime` is the bridge between these abstract descriptions and
concrete native implementations.

```rust
pub struct MountainRunTime {
    environment: Arc<MountainEnvironment>,
    scheduler: Arc<Echo::Scheduler::Scheduler>,
}

impl ApplicationRunTime for MountainRunTime {
    async fn run<C, E, T>(&self, effect: ActionEffect<C, E, T>) -> Result<T, E>
    where
        C: Send + Sync + 'static,
        E: std::error::Error + Send + Sync + 'static,
        T: Send + Sync + 'static,
    {
        let capability = self.environment.resolve_capability::<C>().await?;
        self.scheduler.submit(effect.execute(capability)).await
    }
}
```

Effects are submitted to the Echo work-stealing scheduler, which distributes
them across threads. The scheduler is the only concurrency primitive in the
execution path; there are no explicit `tokio::spawn` calls inside effect bodies.

### Execution flow

```text
Wind UI → Tauri command → Track dispatcher
  → ApplicationRunTime.run(effect)
    → MountainEnvironment.resolve_capability()
    → Echo scheduler.submit(effect.execute(capability))
      → Native OS operation
      → Result
  → Track → Tauri event → Wind UI
```

## Track Dispatcher

`Track/` is the central routing layer for all incoming requests from Wind and
from Cocoon's gRPC calls. It converts raw Tauri command payloads or gRPC
messages into typed `ActionEffect`s and submits them to `ApplicationRunTime`.

Key files:

| File                      | Role                                               |
| ------------------------- | -------------------------------------------------- |
| `Track/EffectCreation.rs` | Constructs `ActionEffect` values from request data |
| `Track/Effect/*.rs`       | Per-domain effect factory modules                  |

Track does not hold state. It reads from `ApplicationState` when construction of
an effect requires current state, then immediately delegates to the runtime.

## Environment Provider Registration

All 24+ providers are constructed once at startup and stored on
`MountainEnvironment`. Access is through `OnceLock<Arc<T>>` to guarantee single
initialization even under concurrent access from the Echo scheduler.

```rust
impl MountainEnvironment {
    pub fn new(app_state: Arc<ApplicationState>, app_handle: AppHandle) -> Self {
        Self {
            file_system:   OnceLock::new(),
            terminal:      OnceLock::new(),
            storage:       OnceLock::new(),
            encryption:    OnceLock::new(),
            file_watcher:  OnceLock::new(),
            // ... all providers
        }
    }
}
```

`resolve_capability::<C>()` looks up the provider that implements trait `C`,
initializing it on first access if needed. This lazy-init pattern means
providers that are never used in a session never allocate.

### Provider implementation pattern

Each provider is a separate file under `Environment/`. A provider:

1. Implements the corresponding `Common` trait with `#[async_trait]`.
2. Holds its own internal state (e.g., an fd table for `FileWatcherProvider`, a
   debounce timer for `StorageProvider`).
3. Never holds a reference back to `MountainEnvironment` - cross-provider calls
   go through `ApplicationState`.

Notable implementation details:

- **`StorageProvider`**: writes are debounced 100ms so 50+ rapid writes produce
  a single disk flush.
- **`EncryptionProvider`**: key is derived from a SHA-256 hash of the machine
  UUID via `Encryption/Key.rs`; AES-256-GCM is used for all encrypt/decrypt
  operations.
- **`FileWatcherProvider`**: maintains an fd table (`HashMap<u64, Watcher>`)
  shared between `file:open`, `file:close`, `file:watch`, and `file:unwatch`
  handlers.
- **`TerminalProvider`**: creates PTY pairs via `portable-pty`, sends
  `$acceptTerminalOpened` and `$acceptTerminalClosed` notifications to Cocoon
  after Sky emission.

## Vine gRPC Server Setup

The Vine gRPC server (`Vine/`) is built with tonic and starts in the background
init task:

```rust
Server::builder()
    .add_service(MountainVineGRPCServiceServer::new(service))
    .serve("127.0.0.1:50052".parse()?)
    .await?;
```

`MountainVineGRPCService` (`Vine/Server/MountainVinegRPCService.rs`) receives
gRPC calls from Cocoon and dispatches them through the same Track/RunTime path
as Tauri IPC calls. This means every gRPC handler has the same access to
`ApplicationState` and `MountainEnvironment` as a Tauri command handler.

### Handler dispatch in RPC/CocoonService/

gRPC calls that require reading or writing Mountain state are handled in
`RPC/CocoonService/`. Each sub-directory owns one RPC method:

| Directory                         | RPC handled                                    |
| --------------------------------- | ---------------------------------------------- |
| `Command/`                        | `ExecuteCommand`                               |
| `FileSystem/WatchFile.rs`         | `watch_file` → `FileWatcherProvider::register` |
| `Terminal/ResizeTerminal.rs`      | `resize_terminal` → real SIGWINCH              |
| `TreeView/EnqueueTreeViewEmit.rs` | Tree view change emission                      |

Notification RPCs (Cocoon → Mountain push) are handled in
`Vine/Server/MountainVinegRPCService.rs` and forwarded to Sky via Tauri events.

## Cocoon Process Management

`ProcessManagement/CocoonManagement.rs` owns the full Cocoon lifecycle.

### Launch sequence

1. `NodeResolver` checks `nvm`, `fnm`, `asdf`, `volta`, Homebrew, then the
   shipped binary, in that order.
2. `std::process::Command` spawns `node bootstrap-fork.js` with:
    - `VINE_PORT=50052`
    - `VSCODE_PARENT_PID=<mountain PID>`
    - All `Tier*` env vars from the current process
3. stdout/stderr are forwarded to Mountain's log sink using
   `tauri::async_runtime::spawn` (not `tokio::spawn`, to stay on the Tauri
   runtime).
4. A gRPC probe loop runs with `MountainProbeMaxAttempts=3`, then a connection
   retry loop with `MaxAttempts=5`, within a 30-second total budget.
5. Once connected, `InitializationData.rs` builds the payload and sends it via
   `initExtensionHost`.

### Health monitoring

A background task pings Cocoon every 5 seconds. Three consecutive missed
heartbeats trigger a restart. Up to three automatic restarts are attempted with
exponential backoff before Mountain logs a fatal error.

### Graceful shutdown

Mountain sends `SIGTERM` to the Cocoon process and waits up to 5 seconds for a
clean exit. If Cocoon has not exited, `SIGKILL` is sent. This order ensures
extensions have a chance to run their `deactivate()` functions.

## ISandboxConfiguration Construction

`ProcessManagement/InitializationData.rs` builds the full
`ISandboxConfiguration` that VS Code's `NativeWorkbenchEnvironmentService`
consumes at boot. All required URI fields must be present and valid; absent
fields cause `reviveProfile()` to throw before the workbench renders.

Required sections built by `ConstructSandboxConfiguration`:

| Section                | Consumer                                                    |
| ---------------------- | ----------------------------------------------------------- |
| `logsPath`             | `NativeWorkbenchEnvironmentService.logsHome`                |
| `dataFolderName`       | `extensionsPath` construction                               |
| `sharedDataFolderName` | `appSharedDataHome`                                         |
| `version`              | Extension compatibility checks                              |
| `perfMarks: []`        | Required non-optional array                                 |
| `colorScheme`          | Window theming                                              |
| `loggers: []`          | Required non-optional array                                 |
| `mainPid`              | Shared process communication                                |
| `os`                   | OS-specific code paths (release, hostname, arch)            |
| `profiles`             | `reviveProfile()` URI field hydration (13 URIs per profile) |
| `sqmId`, `devDeviceId` | Telemetry stubs                                             |

The `profiles` section was the primary crash source during initial bringup. VS
Code calls `.with()` on every URI in the active profile without null-guarding,
including `languageModelsResource`. All 13 URI fields must be present as
`{ scheme, authority, path, query, fragment }` objects.

The `profiles` payload is pre-built into a `ProfilesSection` Rust struct before
the final `json!()` macro call, to avoid hitting the macro's recursion limit on
deeply nested JSON.

## Extension Manifest Scanning

`ApplicationState/Internal/ExtensionScanner/` provides two paths:

| Path                | File                           | Speed   | Trigger                            |
| ------------------- | ------------------------------ | ------- | ---------------------------------- |
| Pre-baked manifest  | `LoadFromCache.rs`             | <50ms   | `extensions.manifest.json` present |
| Live directory scan | `ScanAndPopulateExtensions.rs` | ~1200ms | Cache absent                       |

`ScanAndPopulateExtensions.rs` tries the cache first. On a cache miss it falls
back to walking extension directories with `join_all` (parallel) rather than
sequential iteration. The pre-baked manifest is written by
`Maintain/Build/ Manifest/PreBake.ts`, which runs in Tauri's
`beforeBundleCommand` so it fires in every build path (CI, direct
`pnpm tauri build`, `Build.sh`).

`ExtensionsGetInstalled.rs` maintains a per-`ExtensionTypeFilter` `OnceLock`
cache so repeated calls from Cocoon for the same filter category do not re-scan
the registry.

## WindServiceHandlers Atomization

`IPC/WindServiceHandlers/mod.rs` is the main IPC dispatch file (~2500 lines). To
keep it navigable, each handler that requires more than a few lines of logic is
extracted to its own atomic file:

```text
IPC/WindServiceHandlers/
├── mod.rs                  Main dispatch table
├── NativeHost/
│   ├── Quit.rs
│   ├── Exit.rs
│   ├── Relaunch.rs
│   ├── Reload.rs
│   ├── OpenDevTools.rs
│   ├── ToggleDevTools.rs
│   ├── KillProcess.rs
│   ├── Clipboard.rs
│   ├── MoveItemToTrash.rs
│   ├── ShowMessageBox.rs
│   ├── ShowSaveDialog.rs
│   ├── GetEnvironmentPaths.rs
│   ├── InstallShellCommand.rs
│   └── UninstallShellCommand.rs
├── FileSystem/Native/
│   ├── FileWatch.rs
│   ├── FileUnwatch.rs
│   ├── FileOpenFd.rs
│   └── FileCloseFd.rs
├── Terminal/
│   ├── LocalPTYCreateProcess.rs
│   ├── LocalPTYResize.rs
│   ├── AttachToProcess.rs
│   ├── DetachFromProcess.rs
│   ├── ReviveTerminalProcesses.rs
│   └── LocalPTYFreePortKillProcess.rs
├── Encryption/
│   ├── Encrypt.rs
│   ├── Decrypt.rs
│   └── Key.rs
├── Sky/ReplayEvents.rs
├── Update/UpdateService.rs
└── ExtensionHost/
    ├── Starter.rs
    └── DebugService.rs
```

Handlers that are a single expression remain inline in `mod.rs`. The rule is: if
the handler body would make the dispatch table hard to scan, it gets its own
file.

## High-Frequency Command Short-Circuit

Before the main dispatch arm, `mod.rs` checks a hard-coded
`IsHighFrequency Command` list. Commands on this list skip JSON parsing overhead
and are handled by a fast-path branch:

- `menubar:updateMenubar` - debounced with an atomic counter
- Workspace storage stubs - return immediately
- `logger:error/critical/warn` - forwarded to `dev_log` without JSON round-trip

This short-circuit exists because Wind emits these commands on every keystroke
and mouse move during normal editing.

## Naming Convention

Mountain uses PascalCase for all Rust identifiers: structs, enums, traits,
functions, methods, modules, fields, local variables, and file names. This is an
intentional departure from standard Rust conventions.

The rationale is zero-friction mapping across the stack:

- Rust DTOs in Mountain map 1:1 to Protocol Buffer messages in `Vine.proto`.
- Protocol Buffer messages map 1:1 to TypeScript interfaces in Wind and Cocoon.
- No `#[serde(rename)]` attributes needed at any layer.

Modules enable this with `#![allow(non_snake_case, non_camel_case_types)]` at
the top. External crate types, standard library items, lifetime parameters, and
built-in macros retain their original casing.

## Related Documentation

- [Mountain element overview](https://Editor.Land/Doc/mountain)
- [Cocoon deep dive](https://Editor.Land/Doc/deep-dive-cocoon)
- [Architecture overview](https://Editor.Land/Doc/architecture)
- [Vine protocol](https://Editor.Land/Doc/vine)
