---
title: "Application Startup and Handshake"
section: "Workflow"
order: 9
description:
    "End-to-end process of launching Mountain, spawning Cocoon, and establishing
    initialized state for UI and extension host."
---

# Application Startup and Handshake

Launches the Land application from native `Mountain` backend through `Wind` UI
and `Cocoon` extension host. This is the foundational workflow that enables all
others.

## Startup Sequence

```
User -> Mountain: Launch Application
Mountain: Create AppState and AppRuntime
Mountain: Load configuration from settings.json
Mountain: Scan extensions and load manifests
Mountain: Start gRPC server
Mountain: Spawn Node.js process (bootstrap-fork.js)
Cocoon: Run process patches (console piping, etc.)
Cocoon: Start gRPC client
Cocoon: Send $initialHandshake gRPC notification to Mountain
Mountain: Gather InitData from AppState
Mountain: Send initExtensionHost gRPC request to Cocoon
Cocoon: Create InitDataLayer
Cocoon: Run FullAppInitialization effect
Cocoon: Install RequireInterceptor (patch require())
Cocoon: Activate startup extensions
UI: Preload.ts shims window.vscode with Tauri IPC + process
UI: Create AppLayer services (Clipboard, Dialog, Editor)
UI: Instantiate VS Code Workbench class
UI: Render UI parts (Activity Bar, Sidebar, etc.)
```

## Phase 1: Mountain Startup

1. Tauri's `Builder` is created, `.setup()` hook configured.
2. `AppState` and `MountainEnvironment` created. The environment implements all
   `Common` traits.
3. `AppRuntime` wraps the environment as the effect engine.
4. Background task loads `settings.json`, scans extensions, starts gRPC server
   (`vine::server::Initialize`).
5. `InitializeCocoon` handler constructs the sidecar environment and spawns
   `node ./Element/Cocoon/Scripts/cocoon/bootstrap-fork.js`.

## Phase 2: Cocoon Handshake

1. Cocoon runs `RunProcessPatches`, starts its gRPC client via `IpcProvider`.
2. On connection, sends `$initialHandshake` gRPC notification to Mountain.
3. Mountain receives the handshake, gathers `InitializationData` from `AppState`
   (workspace info, extensions, configuration).
4. Mountain sends `initExtensionHost` gRPC request with the full initialization
   payload.
5. Cocoon creates `InitDataLayer`, runs `FullAppInitialization`, installs
   `RequireInterceptor`.
6. `ExtensionHostProvider` activates startup extensions (`*` activation event).

## Phase 3: UI Launch

1. Tauri window opens, loads `index.html`.
2. `Preload.ts` executes, shimming `window.vscode` global with Tauri-backed
   `ipcRenderer` and `process`.
3. Main UI script creates the `AppLayer` composing all Wind services.
4. `Workbench.startup()` is called, rendering Activity Bar, Status Bar, Sidebar,
   Editor Part.
5. Application is fully initialized and ready for user interaction.

## Key Source Files

- `Mountain/Source/Binary/Main/Entry.rs` -- main entry
- `Mountain/Source/ProcessManagement/CocoonManagement.rs` -- sidecar spawning
- `Mountain/Source/ProcessManagement/InitializationData.rs` -- init payload
- `Cocoon/Scripts/cocoon/bootstrap-fork.js` -- extension host bootstrap
- `Wind/Source/Preload.ts` -- VS Code global shim

---

## See Also

- [Opening a File from the UI](https://Editor.Land/Doc/workflow-open-file)
- [Architecture Overview](https://Editor.Land/Doc/architecture)
