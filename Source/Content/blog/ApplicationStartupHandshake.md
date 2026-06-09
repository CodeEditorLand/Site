---
title:
    "Application Startup Handshake: How Mountain, Cocoon, Sky, and Wind
    Bootstrap"
summary:
    "The complete end-to-end process from launching the native binary to a fully
    initialized editor with running extensions."
publishedAt: "2026-05-22"
tags: ["Architecture", "Bootstrap", "Mountain", "Cocoon", "IPC"]
author: "CodeEditorLand"
readTime: 8
---

# Application Startup Handshake

When you double-click the Land editor, four components boot in a carefully
ordered sequence. Each must finish its phase before the next can proceed. This
document traces the exact path from process launch to a stable, interactive
editor.

## Phase 1: Mountain Starts the Native Process

The entry point is `Mountain/Source/Binary/Main/Entry.rs`. The `main` function
creates a Tauri `Builder` and configures a `.setup()` hook. Inside that hook:

1. **`AppState` is created** and registered with Tauri as the central state
   store.
2. **`MountainEnvironment`** is instantiated. This struct implements every
   abstract service trait from `Common` -- filesystem, terminal, clipboard,
   configuration, and more.
3. **`AppRuntime`** wraps the environment. This is the engine that executes
   `ActionEffect`s: declarative descriptions of work with typed error channels
   and deterministic resource cleanup.
4. A **`tokio` background task** is spawned to handle post-setup initialization.

The background task then runs three operations in sequence:

- `handlers::config::InitializeConfiguration` loads all `settings.json` files
  from disk into `AppState`.
- `ExtensionManagement` scans extension directories, reads manifests, and
  populates the extension list in `AppState`.
- `vine::server::Initialize` starts the Vine gRPC server that will listen for
  connections from Cocoon.

Finally, `handlers::process_management::InitializeCocoon` is called. This
executes `LaunchAndManageCocoonSidecar` from
`ProcessManagement/CocoonManagement.rs`.

## Phase 2: The Cocoon Sidecar Spawns and Bootstraps

`LaunchAndManageCocoonSidecar` constructs a detailed environment block for the
child process, including `VSCODE_PARENT_PID` for automatic shutdown if Mountain
exits. It then spawns:

```
node ./Element/Cocoon/Scripts/cocoon/bootstrap-fork.js
```

Cocoon is now a separate Node.js process. Its first action is hardening:
`PatchProcess` patches `process.exit`, pipes `console.log` to Mountain, and
registers an uncaught exception handler.

Cocoon's bootstrap then runs its stages in a specific order that is critical to
correct operation:

**Stage 1 -- RPCServer binds first.** Cocoon starts its own gRPC server on port
`NetworkCocoonPort` (default 50052). This is the server that Mountain calls back
into during and after the handshake. The server must be listening before any
connection to Mountain is attempted, because Mountain will try to reach Cocoon
immediately upon receiving the initial handshake signal.

**Stage 2 -- MountainConnection connects second.** Only after the RPCServer is
bound does Cocoon start its gRPC client and connect to Mountain's Vine server.
The connection uses a retry loop with reduced probe retries (3 attempts) and a
maximum of 5 overall attempts. The gRPC channel budget for Mountain to reach
back into Cocoon is 30 seconds.

**Why this order matters.** The original bootstrap ran MountainConnection
(connecting outward to Mountain) before starting RPCServer (Cocoon's own inbound
server). Mountain receives the initial connection, immediately tries to call
back into Cocoon to deliver initialization data, and times out after 20 seconds
waiting for a server that Cocoon had not yet started. The fix reverses the stage
order so Cocoon's inbound gRPC port is ready before it announces itself to
Mountain.

Upon successful connection, Cocoon sends the `$initialHandshake` notification
and waits for the response from Mountain.

## Phase 3: The Handshake

Mountain receives `$initialHandshake`. This is the signal to proceed. Mountain
calls `InitializationData` from `ProcessManagement/InitializationData.rs`,
gathering:

- Workspace path and folder list
- Extension manifest data
- Configuration snapshots
- Feature flags and tier settings
- Required `ISandboxConfiguration` fields including `profiles`, `logsPath`,
  `dataFolderName`, `mainPid`, and OS metadata

This payload is sent back to Cocoon via `initExtensionHost` gRPC request. Cocoon
receives it and creates the `InitDataLayer`, then runs `FullAppInitialization`.
Two critical things happen inside that effect:

1. **`RequireInterceptor` is installed.** This patches both CJS `require()` and
   ESM `import` so calls to the `vscode` module are intercepted and routed to
   the correct, extension-specific API instance.
2. **`ExtensionHostProvider`** is resolved. It activates extensions matching the
   `*` (workspace) activation event.

At this point, extensions can begin registering language providers, tree views,
and commands.

## Phase 4: The UI Loads

While the handshake is happening, the main Tauri window opens and loads
`index.html`. The preload script at `Wind/Source/Preload.ts` executes first. It
shims the `window.vscode` global with Tauri-backed implementations for
`ipcRenderer` and `process`. This is the bridge that allows the VS Code
workbench code to run inside Tauri's WebView instead of Electron.

The main UI script then:

1. Waits for the DOM to be ready.
2. Creates the master `AppLayer`, which composes all Wind services
   (`LiveClipboardService`, `LiveDialogService`, `LiveEditorService`, etc.).
3. Converts the `Layer` to a `Runtime` and resolves core services.
4. Instantiates the VS Code `Workbench` class: `new Workbench(...)`.
5. Calls `Workbench.startup()`, which renders the Activity Bar, Status Bar, Side
   Bar, Editor Part, and all other UI components.

The three processes are now running and communicating:

| Process  | Technology | IPC Path                      |
| -------- | ---------- | ----------------------------- |
| Mountain | Rust/Tauri | gRPC server + Tauri commands  |
| Cocoon   | Node.js    | gRPC client (`Vine` protocol) |
| Wind/Sky | TypeScript | Tauri IPC (`invoke` system)   |

Two independent IPC paths exist by design. Tauri IPC handles native work: files,
terminals, clipboard, search, and configuration. Vine gRPC handles
extension-host startup, document notifications, language provider requests,
cancellation, and streaming routes.

## Why This Sequence Matters

The startup order is not arbitrary. Mountain must be fully initialized before
Cocoon spawns, because Cocoon needs configuration and extension data to
bootstrap. Within Cocoon's own bootstrap, the inbound gRPC server must be ready
before the outbound connection to Mountain is established, because Mountain
immediately tries to call back with initialization data once the handshake
signal arrives. The UI loads in parallel with the handshake, but the workbench
cannot render useful state until both Mountain and Cocoon have completed their
initialization.

This is the foundational workflow. Every user action -- opening a file, running
a command, triggering a language feature -- flows through the state established
here.
