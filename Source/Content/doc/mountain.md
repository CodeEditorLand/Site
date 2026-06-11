---
title: "Mountain"
section: "Elements"
order: 7
description:
    "The Rust + Tauri native backend for Land: IPC dispatcher, Vine gRPC server,
    Environment providers, and Cocoon process orchestration."
---

Mountain is the Rust binary at the center of the Land editor. It owns the
desktop window via Tauri v2, implements every native service trait defined in
the `Common` crate, and orchestrates the Cocoon extension host sidecar over
gRPC. Sky renders in the OS WebView hosted by Mountain, while all native OS
operations flow through Mountain's Environment providers.

## Role in the Land Ecosystem

Mountain is the single native process that holds all OS-level capabilities. Wind
and Sky communicate with it through Tauri commands and events. Cocoon
communicates with it over the Vine gRPC protocol on port 50051. Mountain does
not contain extension logic; it supplies the infrastructure that Cocoon
consumes.

| Attribute     | Value                               |
| ------------- | ----------------------------------- |
| Language      | Rust (edition 2024, MSRV 1.95.0)    |
| Framework     | Tauri v2                            |
| gRPC          | tonic + prost                       |
| Scheduler     | Echo (work-stealing)                |
| Sidecar       | Cocoon (Node.js), Air (Rust daemon) |
| IPC to Wind   | Tauri commands and events           |
| IPC to Cocoon | Vine gRPC, port 50051               |

## Key Dependencies

| Crate / Package        | Purpose                                               |
| ---------------------- | ----------------------------------------------------- |
| `Common`               | Abstract service traits and DTOs (local path dep)     |
| `Echo`                 | Work-stealing async scheduler (local path dep)        |
| `tauri`                | v2 - windowing, WebView host, command dispatch        |
| `tokio`                | Async runtime                                         |
| `tonic`                | gRPC server implementation                            |
| `prost`                | Protocol Buffer code generation                       |
| `portable-pty`         | Cross-platform native PTY for the integrated terminal |
| `keyring`              | Secure OS keychain access                             |
| `serde` / `serde_json` | Serialization and deserialization                     |
| `log` / `env_logger`   | Structured logging                                    |
| `tauri-plugin-dialog`  | Native open/save dialog surfaces                      |
| `tauri-plugin-fs`      | File system plugin integration                        |

## Module Structure

```text
Source/
├── ApplicationState/       Thread-safe state: documents, extensions, workspaces
├── Binary/                 Tauri app lifecycle, command registration, startup, shutdown
├── Command/                Domain-grouped Tauri command handlers
├── Environment/            Concrete Common trait implementations (24+ providers)
├── ExtensionManagement/    Extension discovery, manifest parsing, VSIX install
├── FileSystem/             File-explorer tree-view provider for workspace sidebar
├── IPC/                    Tauri IPC server, WindServiceHandlers, DevLog, Sky events
├── ProcessManagement/      Cocoon sidecar lifecycle, Node.js binary resolution
├── RPC/                    gRPC service handlers for Cocoon (CocoonService)
├── RunTime/                ApplicationRunTime, Effect execution, graceful shutdown
├── Track/                  Central request dispatcher routing requests into ActionEffects
├── Vine/                   gRPC server and VineHost embedder trait
├── Workspace/              .code-workspace parsing and multi-root folder resolution
├── LandFixTier.rs          Runtime TierIPC banner logged at startup
└── Library.rs              Library entry point, Tauri setup
```

## ApplicationState

`ApplicationState` is a Tauri-managed struct holding every domain of mutable
runtime state behind `Arc<RwLock<_>>` guards. It is the single source of truth
for all concurrent state access in the process.

| State Domain   | Access Pattern                      | Persistence              |
| -------------- | ----------------------------------- | ------------------------ |
| Configuration  | `RwLock<ConfigurationMap>`          | `settings.json` on disk  |
| Extensions     | `RwLock<ExtensionRegistry>`         | Scanned on startup       |
| Workspaces     | `RwLock<Vec<Workspace>>`            | Window state on shutdown |
| Open documents | `RwLock<HashMap<URI, EditorState>>` | Transient                |
| Terminal state | `RwLock<HashMap<u64, Terminal>>`    | Transient                |
| Feature state  | `RwLock<FeatureFlags>`              | Compiled + runtime gates |

State is accessed through Tauri's `State<ApplicationState>` in every command
handler. Writes notify downstream listeners via Tauri events.

## Environment Providers

`MountainEnvironment` implements every trait from `Common`. Each domain has a
dedicated provider registered at startup via `OnceLock`.

| Provider                     | Common Trait          | Implementation                         |
| ---------------------------- | --------------------- | -------------------------------------- |
| `FileSystemProvider`         | `FileSystem`          | tokio::fs, parent dir creation         |
| `DocumentProvider`           | `Document`            | Text model management                  |
| `ConfigurationProvider`      | `Configuration`       | JSON file read/write with merge        |
| `TerminalProvider`           | `Terminal`            | portable-pty PTY management            |
| `StorageProvider`            | `Storage`             | JSON key-value, writes debounced 100ms |
| `SecretProvider`             | `Secret`              | OS keyring (keyring crate)             |
| `UserInterfaceProvider`      | `UserInterface`       | tauri-plugin-dialog                    |
| `CommandProvider`            | `CommandExecutor`     | Command registry and dispatch          |
| `SearchProvider`             | `Search`              | ripgrep-based file and text search     |
| `WorkspaceProvider`          | `Workspace`           | Folder management                      |
| `ExtensionManagementService` | `ExtensionManagement` | VSIX install and manifest scan         |
| `EncryptionProvider`         | `Encryption`          | AES-256-GCM, machine UUID key          |
| `FileWatcherProvider`        | `FileWatcher`         | fs notify watcher with fd table        |
| `SourceControlProvider`      | `SCM`                 | SCM provider registry                  |
| `DebugProvider`              | `Debug`               | Debug configuration provider registry  |

`EncryptionProvider` implements VS Code's `EncryptionMainService` contract. It
derives a machine-stable 256-bit key from `SHA-256("Land-Encryption-v1" +
hardware UUID)` using `ring`, cached in a process-wide `OnceLock`. This key
backs the `context.secrets` API that extensions use to store credentials and
auth tokens encrypted at rest.

## IPC Dispatcher (WindServiceHandlers)

All Tauri IPC messages from Wind arrive at `IPC/WindServiceHandlers/mod.rs`.
This file (~2500 lines) dispatches by method name and delegates to per-domain
atomic handler files organized under `IPC/WindServiceHandlers/`. The dispatcher
covers ~150+ named commands across 10 domain subdirectories. All handlers are
fully implemented - there are zero `todo!()` or `unimplemented!()` stubs
remaining.

### Implemented handler domains

| Domain         | Method prefix            | Handler location           |
| -------------- | ------------------------ | -------------------------- |
| Native host    | `nativeHost:*`           | `NativeHost/*.rs`          |
| File system    | `file:*`                 | `FileSystem/Native/*.rs`   |
| Terminal (PTY) | `localPty:*`             | `Terminal/*.rs`            |
| Encryption     | `encryption:*`           | `Encryption/*.rs`          |
| Cocoon bridge  | `cocoon:*`               | `Cocoon/*.rs`              |
| Extension host | `extensionHostStarter:*` | `ExtensionHost/*.rs`       |
| Tree view      | `tree:*`                 | `TreeView/GetChildren.rs`  |
| Sky replay     | `sky:replay-events`      | `Sky/ReplayEvents.rs`      |
| Update         | `update:*`               | `Update/UpdateService.rs`  |
| Logger         | `logger:*`               | Inline fast-path in mod.rs |

High-frequency commands (menubar, workspace, storage stubs) are short-circuited
before the main dispatch arm to avoid unnecessary work on every keystroke.

### Atomized handler pattern

Each command lives in its own `.rs` file named after the command in PascalCase
(e.g. `NativeHost/InstallShellCommand.rs`, `Encryption/Encrypt.rs`,
`Terminal/LocalPTYCreateProcess.rs`). `mod.rs` acts as a pure dispatcher: it
imports each handler type and routes commands to it, but contains no
implementation logic itself. This pattern keeps individual handlers testable in
isolation and prevents `mod.rs` from growing unboundedly as new commands are
added.

### TierIPC routing

The `TierIPC` environment variable controls how Wind-sourced IPC is routed:

| Value          | Behavior                                              |
| -------------- | ----------------------------------------------------- |
| `Mountain`     | Default. All calls handled by Mountain Tauri IPC.     |
| `Node`         | All calls forwarded to Cocoon via `cocoon:request`.   |
| `NodeDeferred` | Mountain first; Cocoon fallback on miss or undefined. |

## Vine gRPC Server

Mountain hosts a tonic-based gRPC server (`Vine` protocol) on port **50051**.
Cocoon connects to this server after startup and keeps a persistent bidirectional
stream open. Mountain also connects as a gRPC client to Cocoon's own gRPC server
on port **50052** for reverse calls (language provider requests, push
notifications). The server is defined in `Vine/` and the per-RPC handler logic
lives in `RPC/CocoonService/`.

| Direction          | Port  | Purpose                                          |
| :----------------- | :---- | :----------------------------------------------- |
| Cocoon → Mountain  | 50051 | Extension API calls, storage, UI operations      |
| Mountain → Cocoon  | 50052 | Language providers, extension lifecycle, pushes  |

Key gRPC handler categories:

| Category           | Example RPCs                                                   |
| ------------------ | -------------------------------------------------------------- |
| Extension host     | `InitExtensionHost`, `ActivateExtension`                       |
| Language providers | `ProvideHover`, `ProvideCompletion`, `ProvideInlineCompletion` |
| File system        | `WatchFile`, `UnwatchFile`                                     |
| Terminal           | `CreateTerminal`, `ResizeTerminal`, `WriteTerminal`            |
| Notifications      | `ShowMessage`, `CreateStatusBarItem`                           |
| Decorations        | `GetFileDecoration`, `SetDecorations`                          |
| Tree view          | `GetChildren`, `RevealElement`                                 |

## Process Management

`ProcessManagement/CocoonManagement.rs` handles the full Cocoon sidecar
lifecycle:

1. Resolves the Node.js binary (checks nvm, fnm, asdf, volta, Homebrew, shipped
   fallback).
2. Spawns `node bootstrap-fork.js` with `VINE_PORT`, `VSCODE_PARENT_PID`, and
   all TierIPC env vars set.
3. Forwards Cocoon stdout/stderr to Mountain's log sink via
   `tauri::async_runtime::spawn`.
4. Waits up to 30 seconds for Cocoon to connect via gRPC (3 probe retries, then
   5 connection retries).
5. Sends the `ISandboxConfiguration` initialization payload once connected.
6. Monitors health; restarts with exponential backoff on failure (max 3
   restarts).
7. Sends `SIGTERM` with a 5-second timeout, then `SIGKILL` on shutdown.

`ProcessManagement/InitializationData.rs` constructs the `ISandboxConfiguration`
and `IExtensionHostInitData` payloads, including all required URI fields
consumed by VS Code's `NativeWorkbenchEnvironmentService`. The payload
includes a complete `profiles` section with the default profile containing
all 13 required URI fields (`userHome`, `appRoot`, `appSettingsHome`,
`userDataPath`, `extensionsPath`, `logsPath`, `globalStorageHome`,
`workspaceStorageHome`, `languageModelsResource`, and 4 more). VS Code's
`reviveProfile()` accesses every URI field without null-guarding; a missing
field causes a boot-time `TypeError`. Additional required scalar fields
include `logsPath`, `dataFolderName`, `sharedDataFolderName`, `version`,
`perfMarks: []`, `colorScheme`, `loggers: []`, and `mainPid`.

## Extension Management

Mountain scans extension directories at startup using
`ApplicationState/Internal/ExtensionScanner/`. The scanner first looks for a
pre-baked manifest at `extensions.manifest.json` (written by `PreBake.ts` during
the build's `beforeBundleCommand`). If the manifest is absent, it falls back to
a live directory walk. Pre-baked scans complete in under 50ms versus ~1200ms for
a live scan.

## Startup Sequence

```text
main()
  Binary::Main::Entry
  └── Tauri::Builder::default()
        .setup(|app| {
            Create ApplicationState
            Create MountainEnvironment (24+ providers)
            Create ApplicationRunTime (Echo scheduler)
            Spawn tokio background init task
        })

Background init task:
  InitializeConfiguration()   - reads settings.json files
  ExtensionManagement::scan() - populates extension registry
  Vine::server::Initialize()  - starts gRPC on port 50051
  CocoonManagement::launch()  - spawns Node.js, waits for handshake
  Sends InitData payload to Cocoon
  System ready
```

## Shutdown Sequence

```text
1. Tauri window close
2. SIGTERM to Cocoon (5s grace, then SIGKILL)
3. SIGTERM to Air sidecar if running
4. ApplicationState persisted (settings, window state)
5. gRPC server drained (in-flight requests complete)
6. Echo scheduler drained
7. Tokio runtime shuts down
8. Process exits
```

## Related Documentation

- [Deep Dive: Mountain](https://Editor.Land/Doc/deep-dive-mountain)
- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [Cocoon](https://Editor.Land/Doc/cocoon)
- [Vine](https://Editor.Land/Doc/vine)
- [Air](https://Editor.Land/Doc/air)
