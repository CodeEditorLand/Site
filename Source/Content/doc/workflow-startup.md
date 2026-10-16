---
title: "Application Startup and Handshake"
section: "Workflows"
order: 0
description:
    "How Mountain, Cocoon, and the Wind workbench initialise and establish their
    IPC connections on every launch."
---

Land starts in three overlapping phases: the native [Mountain](https://github.com/CodeEditorLand/Mountain) binary starts its
gRPC listener and spawns the [Cocoon](https://github.com/CodeEditorLand/Cocoon) Node.js sidecar, [Cocoon](https://github.com/CodeEditorLand/Cocoon) bootstraps and
completes the `initExtensionHost` handshake, and the [Wind](https://github.com/CodeEditorLand/Wind) workbench renders in
the Tauri webview. The [Mountain](https://github.com/CodeEditorLand/Mountain)↔[Cocoon](https://github.com/CodeEditorLand/Cocoon) handshake is the hard ordering constraint
that gates extension activation; everything else proceeds in parallel.

This is the foundational workflow that enables all others. Once the handshake
completes and the workbench paints its first frame, the system is ready for user
interaction and all dependent workflows - opening files, executing commands,
language features - can proceed.

<img src="/Mermaid/dc004668c806a100.svg" alt="Mermaid diagram" />
## Phase 1 - [Mountain](https://github.com/CodeEditorLand/Mountain) native startup

1. The OS launches the [Mountain](https://github.com/CodeEditorLand/Mountain) binary. The `main` function in
   `Binary/Main/Entry.rs` creates Tauri's `Builder` and configures the
   `.setup()` hook. Inside the hook, the central `AppState` is created and
   managed by Tauri, the `MountainEnvironment` (which implements every [`Common`](https://github.com/CodeEditorLand/Common)
   trait) is created, the `AppRuntime` (the engine for running effects) is
   created wrapping the environment, and a Tokio background task is spawned for
   post-setup work.

2. Inside the background task, four steps run in strict order:
    1. **`InitializeConfiguration`** - reads all `settings.json` files from disk
       into `AppState.Configuration`.

    2. **`ExtensionManagement`** - walks extension roots and loads manifests into
       `AppState.Extensions`. If a pre-baked `extensions.manifest.json` exists on
       disk (written by `Maintain/Build/Manifest/PreBake.ts` during the build's
       `beforeBundleCommand`), this step completes in under 50 ms. On first boot
       or when the cache is absent, a parallel `join_all` live scan runs (~1200
       ms) and caches the result for subsequent launches.

    3. **`vine::server::Initialize`** - starts the [Vine](https://github.com/CodeEditorLand/Vine) gRPC server (default
       port 50051) and begins listening for connections from [Cocoon](https://github.com/CodeEditorLand/Cocoon).

    4. **`InitializeCocoon`** (`ProcessManagement/CocoonManagement.rs`) - spawns
       the Node.js sidecar process. It constructs a detailed environment that
       includes `VSCODE_PARENT_PID`, so the child terminates automatically when
       [Mountain](https://github.com/CodeEditorLand/Mountain) exits. The exact command is:

        ```bash
        node ./Element/Cocoon/Scripts/cocoon/bootstrap-fork.js
        ```

        [Mountain](https://github.com/CodeEditorLand/Mountain) then waits up to 30 seconds for [Cocoon](https://github.com/CodeEditorLand/Cocoon)'s `$initialHandshake`
        gRPC notification.

## Phase 2 - Cocoon bootstrap and handshake

[Cocoon](https://github.com/CodeEditorLand/Cocoon)'s `Bootstrap.ts` runs seven stages in strict order:

1. **Environment** - records Node.js version, platform, and architecture.

2. **Configuration** - resolves `MOUNTAIN_GRPC_PORT` (50051) and
   `COCOON_GRPC_PORT` (50052); populates `globalThis.__cocoonBootstrapConfig`
   and `globalThis.__LandTiers`.

3. **RPCServer** - binds [Cocoon](https://github.com/CodeEditorLand/Cocoon)'s own gRPC server on port 50052. **This must
   complete before [Mountain](https://github.com/CodeEditorLand/Mountain)'s 30-second connection budget expires.**

4. **ModuleInterceptor** - installs the `require()` interceptor, remapping
   `electron` to Tauri stubs and patching VS Code bundle loading.

5. **MountainConnection** - TCP-probes [Mountain](https://github.com/CodeEditorLand/Mountain) on port 50051, opens the gRPC
   channel, and sends the **`$initialHandshake` notification** to signal
   readiness.

6. **Extensions** - activates enabled extensions concurrently (up to 8 in
   parallel). Extension activation uses topological ordering: if extension A
   declares `extensionDependencies: ["B"]`, extension B activates first. An
   `InProgress` set prevents circular dependency deadlocks.

7. **HealthCheck** - optional final service health sweep.

Between stages 5 and 6, [Mountain](https://github.com/CodeEditorLand/Mountain) responds to the handshake:

- [Mountain](https://github.com/CodeEditorLand/Mountain) receives `$initialHandshake` and calls
  `ProcessManagement/InitializationData.rs`, which assembles the full
  `ISandboxConfiguration` + `IExtensionHostInitData` payload. This payload
  includes: workspace roots, extension list and metadata, configuration state
  (`argv.json`, `settings.json`, `keybindings.json`), registered profiles,
  `dataFolderName` (a primary crash source when missing), `perfMarks`,
  `loggers`, `colorScheme`, `mainPid`, and OS metadata (platform, arch, release,
  hostname).

- [Mountain](https://github.com/CodeEditorLand/Mountain) sends the **`initExtensionHost` gRPC request** back to [Cocoon](https://github.com/CodeEditorLand/Cocoon),
  containing this initialization payload.

- [Cocoon](https://github.com/CodeEditorLand/Cocoon)'s handler fires: it uses the payload to create and provide the
  `InitDataLayer`, runs `FullAppInitialization`, resolves the
  `ExtensionHostProvider`, installs the `RequireInterceptor` so every
  `require('vscode')` returns the [Cocoon](https://github.com/CodeEditorLand/Cocoon) shim, and activates startup extensions
  (`*` activation event). The topological ordering from the Extensions stage
  (step 6) ensures that extension dependency chains resolve correctly before
  providers register. At this point, workflows like Language Features and
  Webviews can begin, as extensions register their providers.

## Phase 3 - [Wind](https://github.com/CodeEditorLand/Wind) workbench launch

These steps run in parallel with Phase 2, starting from the moment Tauri opens
the main window.

1. Tauri loads `index.html` in the webview, built by
   [`Sky/Source/pages/Mountain.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/Mountain.astro). The Astro page produces the static HTML
   shell that bootstraps the [Wind](https://github.com/CodeEditorLand/Wind) application script. [`Wind/Source/Preload.ts`](https://github.com/CodeEditorLand/Wind/tree/Current/Source/Preload.ts)
   executes first, shimming `window.vscode` with Tauri-backed implementations
   for `ipcRenderer` and `process`. This shim is the critical bridge that allows
   the VS Code workbench code to run in a non-Electron, Tauri-based webview
   context.

2. The main [Wind](https://github.com/CodeEditorLand/Wind) entry script waits for DOM ready, then composes the
   `AppLayer` - an [Effect-TS](https://effect.website) `Layer` providing every [Wind](https://github.com/CodeEditorLand/Wind) service:
   `LiveClipboardService`, `LiveDialogService`, `LiveEditorService`, and all
   the rest. Each service is backed by Tauri IPC calls or native Rust commands,
   replacing the Electron APIs that VS Code's workbench would normally consume.

3. The layer is converted to a Runtime and the VS Code `Workbench` is
   instantiated via `new Workbench(...)`. The `Workbench` constructor receives
   the resolved service runtime as its dependency container. `Workbench.startup()`
   is then called, which kicks off the entire UI rendering lifecycle - creating
   every UI part: Activity Bar, Status Bar, Side Bar, Editor Part, and
   instantiating the editor pane itself. Each part begins requesting data from
   [Wind](https://github.com/CodeEditorLand/Wind) services, which in turn invoke [Mountain](https://github.com/CodeEditorLand/Mountain) IPC for filesystem reads,
   command lists, configuration values, and extension contributions.

4. As these parts are created, they trigger downstream workflows. For example,
   the File Explorer uses `IFileService` to list directory contents (triggering
   the Opening a File workflow), and the Command Palette uses
   `ICommandService` (triggering the Executing a Command workflow). Extension
   contributions to the UI (views, menus, keybindings) are registered via the
   `IExtensionService`, which is populated during [Cocoon](https://github.com/CodeEditorLand/Cocoon)'s startup extension
   activation in Phase 2.

5. **Extension activation timing after handshake:** Once [Cocoon](https://github.com/CodeEditorLand/Cocoon)'s
   `initExtensionHost` handler completes (Phase 2), activated extensions begin
   contributing to the workbench in real-time. The `IExtensionService` on the
   [Wind](https://github.com/CodeEditorLand/Wind) side subscribes to a gRPC stream from [Cocoon](https://github.com/CodeEditorLand/Cocoon) that relays
   `activatedExtension` events as each extension finishes its `activate()` call.
   This means the Command Palette and language features become available
   progressively - the first extension's contributions appear before the last
   one has finished activating. The workbench does not block paint on extension
   activation; it renders its chrome immediately and populates contributed UI
   elements as the extension stream arrives.

> [!IMPORTANT] The workbench's first meaningful paint depends on [Mountain](https://github.com/CodeEditorLand/Mountain)
> returning the `InitializationData` payload promptly. Delays in the extension
> scan (Phase 1, step 2) or the handshake round-trip (Phase 2, stage 5)
> directly delay first sidebar render. The pre-baked manifest and the
> RPCServer-before-MountainConnection bootstrap ordering are the two changes
> that keep first paint under 800 ms.

---

## See Also

- [🟠 Low-Level Shim](/Doc/low-level-shim) - Engine-level prototype hooks
- [🔵 Coverage / Telemetry](/Doc/coverage) - Application-level service routing
