---
title: "Application Startup and Handshake"
section: "Workflows"
order: 0
description:
    "How Mountain, Cocoon, and the Wind workbench initialise and establish their
    IPC connections on every launch."
---

Land starts in three overlapping phases: the native Mountain binary starts its
gRPC listener and spawns the Cocoon Node.js sidecar, Cocoon bootstraps and
completes the `initExtensionHost` handshake, and the Wind workbench renders in
the Tauri webview. The Mountain↔Cocoon handshake is the hard ordering constraint
that gates extension activation; everything else proceeds in parallel.

## Phase 1 - Mountain native startup

1. The OS launches the Mountain binary. `Binary/Main/Entry.rs` creates Tauri's
   `Builder` and configures the `.setup()` hook.

2. Inside `.setup()`, Mountain constructs `AppState` and the
   `MountainEnvironment` (which implements every `Common` trait), wraps both in
   an `AppRuntime`, and spawns a Tokio background task for post-setup work.

3. The background task runs four steps in strict order:
    1. **`InitializeConfiguration`** - reads all `settings.json` files from disk
       into `AppState.Configuration`.

    2. **`ExtensionManagement`** - walks extension roots and loads manifests into
       `AppState.Extensions`. If a pre-baked `extensions.manifest.json` exists
       (written by `Maintain/Build/Manifest/PreBake.ts` during the build's
       `beforeBundleCommand`), this step completes in under 50 ms. On first boot
       or when the cache is absent, a parallel `join_all` live scan runs
       (~1200 ms) and caches the result for subsequent launches.

    3. **`vine::server::Initialize`** - starts the Vine gRPC server (default
       port 50051) and begins listening for connections.

    4. **`InitializeCocoon`** (`ProcessManagement/CocoonManagement.rs`) - spawns
       the Node.js sidecar process:

        ```bash
        node ./Element/Cocoon/Scripts/cocoon/bootstrap-fork.js
        ```

        The child inherits `VSCODE_PARENT_PID` so it terminates automatically
        when Mountain exits. Mountain then waits up to 30 seconds for Cocoon's
        `$initialHandshake` gRPC notification.

## Phase 2 - Cocoon bootstrap and handshake

Cocoon's `Bootstrap.ts` runs seven stages in strict order:

1. **Environment** - records Node.js version, platform, and architecture.
2. **Configuration** - resolves `MOUNTAIN_GRPC_PORT` (50051) and
   `COCOON_GRPC_PORT` (50052); populates `globalThis.__cocoonBootstrapConfig`
   and `globalThis.__LandTiers`.
3. **RPCServer** - binds Cocoon's own gRPC server on port 50052. **This must
   complete before Mountain's 30-second connection budget expires.**
4. **ModuleInterceptor** - installs the `require()` interceptor, remapping
   `electron` to Tauri stubs and patching VS Code bundle loading.
5. **MountainConnection** - TCP-probes Mountain on port 50051, opens the gRPC
   channel, and sends the **`$initialHandshake` notification** to signal
   readiness.
6. **Extensions** - activates enabled extensions concurrently (up to 8 in
   parallel). Extension activation uses topological ordering: if extension A
   declares `extensionDependencies: ["B"]`, extension B activates first. An
   `InProgress` set prevents circular dependency deadlocks.
7. **HealthCheck** - optional final service health sweep.

Between stages 5 and 6, Mountain responds to the handshake:

- Mountain receives `$initialHandshake` and calls
  `ProcessManagement/InitializationData.rs`, which assembles the full
  `ISandboxConfiguration` + `IExtensionHostInitData` payload: workspace roots,
  extension list, configuration state, profiles, `dataFolderName` (primary crash
  source when missing), `perfMarks`, `loggers`, `colorScheme`, `mainPid`, and
  OS metadata.
- Mountain sends the **`initExtensionHost` gRPC request** back to Cocoon.
- Cocoon's handler fires: deserialises the payload into an `InitDataLayer`,
  runs `FullAppInitialization`, resolves the `ExtensionHostProvider`, and
  installs the `RequireInterceptor` so every `require('vscode')` returns the
  Cocoon shim. Then stage 6 (Extensions) proceeds.

## Phase 3 - Wind workbench launch

These steps run in parallel with Phase 2, starting from the moment Tauri opens
the main window.

1. Tauri loads `index.html` in the webview. `Wind/Source/Preload.ts` executes
   first, shimming `window.vscode` with Tauri-backed implementations for
   `ipcRenderer` and `process`. This shim is what allows the VS Code workbench
   code to run in a non-Electron context.

2. The main Wind entry script waits for DOM ready, then composes the
   `AppLayer` - an Effect-TS `Layer` providing every Wind service:
   `LiveClipboardService`, `LiveDialogService`, `LiveEditorService`, and all
   the rest.

3. The layer is converted to a Runtime and the VS Code `Workbench` is
   instantiated via `new Workbench(...)`. `Workbench.startup()` creates every
   UI part - Activity Bar, Status Bar, Side Bar, Editor Part - and begins
   requesting data from Wind services, which in turn invoke Mountain IPC for
   filesystem reads, command lists, and configuration values.

> [!IMPORTANT] The workbench's first meaningful paint depends on Mountain
> returning the `InitializationData` payload promptly. Delays in the extension
> scan (Phase 1 step 2) or the handshake round-trip (Phase 2 step 4) directly
> delay first sidebar render. The pre-baked manifest and the RPCServer-before-
> MountainConnection bootstrap ordering are the two changes that keep first
> paint under 800 ms.
