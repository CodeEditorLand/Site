---
title: "Application Startup and Handshake"
section: "Workflows"
order: 0
description:
    "How Mountain, Cocoon, and the Wind workbench initialise and establish their
    IPC connections on every launch."
---

Land starts in three distinct phases: the native Mountain binary initialises its
services and gRPC listener, the Cocoon Node.js sidecar bootstraps and completes
the `initExtensionHost` handshake, and the Wind workbench renders in the Tauri
webview. All three phases overlap from the user's perspective; the
Mountain↔Cocoon handshake is the hard ordering constraint that gates extension
activation.

## Phase 1 - Mountain native startup

1. The OS launches the Mountain binary. `Binary/Main/Entry.rs` invokes Tauri's
   `Builder` and configures the `.setup()` hook.

2. Inside `.setup()`, Mountain constructs `AppState` and the
   `MountainEnvironment` (which implements every `Common` trait), wraps them in
   an `AppRuntime`, and spawns a Tokio background task for post-setup work.

3. The background task runs these steps in order:
    1. `InitializeConfiguration` - reads all `settings.json` files from disk
       into `AppState.Configuration`.
    2. `ExtensionManagement` - walks extension roots and loads manifests into
       `AppState.Extensions`. When a pre-baked `extensions.manifest.json` exists
       (written by `Maintain/Build/Manifest/PreBake.ts` during
       `beforeBundleCommand`) this step completes in under 50 ms instead of the
       ~1 200 ms live scan.
    3. `vine::server::Initialize` - starts the Vine gRPC server (default
       port 50052) and begins accepting connections.
    4. `InitializeCocoon` (`ProcessManagement/CocoonManagement.rs`) - spawns the
       Node.js sidecar process:

        ```bash
        node ./Element/Cocoon/Scripts/cocoon/bootstrap-fork.js
        ```

        The child inherits `VSCODE_PARENT_PID` so it terminates automatically
        when Mountain exits. Mountain then waits up to 30 seconds for the gRPC
        `$initialHandshake` notification.

## Phase 2 - Cocoon bootstrap and handshake

> [!IMPORTANT] Cocoon's `Bootstrap.ts` runs its seven stages in strict order.
> Stage 3 (**RPCServer**, port 50052) must complete before Stage 5
> (**MountainConnection**). Reversing this order causes Mountain to exhaust its
> 30-second connection budget before Cocoon has a listening socket, silently
> preventing extension activation.

Cocoon's `Bootstrap.ts` runs seven stages in order:

1. **Environment** - records Node.js version, platform, and architecture.
2. **Configuration** - resolves `MOUNTAIN_GRPC_PORT` (50051) and
   `COCOON_GRPC_PORT` (50052); populates `globalThis.__cocoonBootstrapConfig`
   and `globalThis.__LandTiers`.
3. **RPCServer** - binds port 50052 and registers all gRPC handlers, including
   the `initExtensionHost` handler. **This must complete before Mountain's
   30-second gRPC connection budget expires.**
4. **ModuleInterceptor** - installs the `require()` interceptor, remapping
   `electron` to Tauri stubs and patching VS Code bundle loading.
5. **MountainConnection** - TCP-probes Mountain on port 50051, opens the gRPC
   channel, and sends the **`$initialHandshake` notification** to signal
   readiness.
6. **Extensions** - activates enabled extensions concurrently (up to 8 in
   parallel). Extension activation uses topological ordering: if extension A
   declares `extensionDependencies: ["B"]`, extension B is activated first. An
   `InProgress` Set prevents circular dependency deadlocks.
7. **HealthCheck** - optional final service health sweep.

Between stages 5 and 6, Mountain responds:

- Mountain receives `$initialHandshake` and calls
  `ProcessManagement/InitializationData.rs`, which assembles the full
  `ISandboxConfiguration` + `IExtensionHostInitData` payload. This includes
  workspace roots, extension list, configuration state, profiles, the required
  `dataFolderName` field (primary crash source when missing), `perfMarks`,
  `loggers`, `colorScheme`, `mainPid`, and OS metadata. Mountain then sends the
  **`initExtensionHost` gRPC request** back to Cocoon.
- Cocoon's `initExtensionHost` handler fires: deserialises the payload into an
  `InitDataLayer`, runs `FullAppInitialization`, and installs the
  `RequireInterceptor` - patches `require()` so every `require('vscode')` call
  in extension code returns the Cocoon shim. Stage 6 (Extensions) then
  proceeds.

## Phase 3 - Wind workbench launch

These steps run in parallel with Phase 2 from the moment Tauri opens the main
window.

1. Tauri loads `index.html` in the webview. `Wind/Source/Preload.ts` executes
   first, shimming `window.vscode` with Tauri-backed implementations for
   `ipcRenderer` and `process`. This shim is what allows the VS Code workbench
   code to run in a non-Electron context.

2. The main Wind entry script waits for DOM ready, then composes the
   `AppLayer` - an Effect-TS `Layer` that provides every Wind service:
   `LiveClipboardService`, `LiveDialogService`, `LiveEditorService`, and the
   rest.

3. The layer is converted to a Runtime and the VS Code `Workbench` is
   instantiated via `new Workbench(...)`. `Workbench.startup()` creates all UI
   parts - Activity Bar, Status Bar, Side Bar, Editor Part - and begins
   requesting data from Wind services, which in turn invoke Mountain IPC for
   filesystem reads, command lists, and configuration values.

> [!IMPORTANT] The workbench's first meaningful paint depends on Mountain
> returning the `InitializationData` payload promptly. Delays in the extension
> scan (Phase 1 step 3) or the handshake round-trip (Phase 2 step 4) directly
> delay first sidebar render. The pre-baked manifest and the RPCServer-before-
> MountainConnection bootstrap ordering are the two changes that keep first
> paint under 800 ms.
