---
title: Architecture
section: Start
order: 6
description: Three-layer architecture - Mountain (Rust/Tauri), Cocoon
    (Node.js/Effect-TS), Sky+Wind (Astro/Effect-TS) - and the IPC channels that
    connect them.
---

Land operates as a multi-process application. Mountain is the native Rust/Tauri
backend. Cocoon is the Node.js extension host sidecar. Sky and Wind form the UI
layer running inside the Tauri WebView. A fourth optional process, Air, runs as
a background daemon for updates, indexing, and authentication. Components
communicate over three distinct channels: Tauri commands/events, gRPC (Vine
protocol), and SkyBridge custom events.

## Process Model

```
+-----------------------------------------------------------+
|  macOS process: Mountain (Rust / Tauri)                   |
|                                                           |
|  AppState  |  gRPC server (port 50051)  |  Tauri IPC     |
|  File sys  |  Process manager           |  Event emitter |
+------------+---------------------------+----------------+-+
             |                           |                |
      gRPC (Vine.proto)           Tauri invoke()   Tauri event
             |                           |                |
             v                           v                v
+------------------------+  +-----------------------------------+
|  Node.js process:      |  |  Tauri WebView (Chromium)         |
|  Cocoon (extension     |  |                                   |
|  host)                 |  |  Wind (Effect-TS ~40 services)    |
|                        |  |  Sky  (Astro UI + SkyBridge)      |
|  vscode API shim       |  |                                   |
|  Extension runner      |  +-----------------------------------+
+------------------------+

+----------------------------+
|  Air daemon (background)   |
|  gRPC port 50053           |
+----------------------------+
```

## Layer Descriptions

### Mountain - Native Backend

Mountain is a Tauri binary written in Rust. It implements every service trait
defined in the Common crate: file system, terminal PTY, clipboard, dialogs,
window management, extension scanning, configuration, encryption, and process
management. Mountain hosts the gRPC server that Cocoon connects to, spawns and
supervises the Cocoon and Air processes, and serves as the single authority for
all OS-level operations.

Key source paths within the Mountain element:

| Path                                    | Contents                                                   |
| --------------------------------------- | ---------------------------------------------------------- |
| `Source/IPC/WindServiceHandlers/mod.rs` | Main Tauri IPC dispatcher (~2500 lines)                    |
| `Source/ProcessManagement/`             | Cocoon and Air spawn, initialization data                  |
| `Source/Environment/`                   | Provider implementations (file, terminal, clipboard, etc.) |
| `Source/RPC/CocoonService/`             | gRPC handler implementations (Cocoon → Mountain calls)     |
| `Source/Vine/Server/`                   | gRPC notification router (Mountain → Cocoon push)          |

### Cocoon - Extension Host

Cocoon is a Node.js process spawned and supervised by Mountain. It provides a
`vscode` API shim written in plain async TypeScript (no Effect-TS runtime). When
an extension calls a `vscode.*` API method, Cocoon either handles it in-process
or sends a gRPC request to Mountain for native execution. Cocoon connects to
Mountain's gRPC server on port 50051 after Mountain starts listening.

Bootstrap order: Cocoon binds its own gRPC server (port 50052) first, then
connects to Mountain. Reversing this order causes Mountain to exhaust its
30-second gRPC connection budget before Cocoon has a listening socket, silently
preventing extension activation.

### Sky and Wind - UI Layer

Wind is an Effect-TS reimplementation of approximately 40 VS Code workbench
services. Each service has a `Define.ts` (Effect-TS tag), an `Implement.ts`
(Tauri-backed layer), and a `Problem.ts` (typed error type). Services are
composed into layer stacks: `TauriLiveLayer` for production, `ElectronLiveLayer`
for the Electron workbench variant, and `TestLayer` for the extension test
runner.

Sky is the Astro UI component layer. It renders the editor, sidebar, activity
bar, status bar, and panels. SkyBridge (~2900 lines in
`Element/Sky/Source/Function/Sky/Bridge.ts`) translates Tauri events into VS
Code workbench calls and vice versa.

## IPC Channels

### Channel 1: Tauri Commands and Events (Wind/Sky ↔ Mountain)

Wind calls Mountain using `@tauri-apps/api` `invoke()`. Each command maps to a
registered Rust handler. Mountain pushes state changes back to Wind as Tauri
events.

```
Wind/Sky  --invoke("MountainIPCInvoke", { method, params })--> Mountain
Mountain  --emit("tauri://event-name", payload)            --> Wind/Sky
```

Used for: file read/write, configuration get/set, dialog open, terminal
operations, clipboard, extension activation, window management.

### Channel 2: gRPC Vine Protocol (Mountain ↔ Cocoon, Mountain ↔ Air)

Mountain and Cocoon communicate bidirectionally over gRPC. The service contract
is defined in `Element/Vine/Proto/Vine.proto`. Generated stubs are consumed by
Mountain (Rust, via `tonic`) and Cocoon (TypeScript, via the generated client).

| Direction         | Port  | Used for                                                                                                                                     |
| ----------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Mountain → Cocoon | 50052 | Extension host initialization, language feature requests, configuration change notifications, terminal open/close events, file change events |
| Cocoon → Mountain | 50051 | File system operations, terminal write/resize, clipboard access, storage get/set, encryption, dialog requests, IPC channel dispatch          |
| Mountain ↔ Air    | 50053 | Update downloads, indexing commands, health checks, authentication tokens                                                                    |

### Channel 3: SkyBridge Custom Events (Sky ↔ Cocoon indirectly)

SkyBridge registers handlers on `sky://` URI-scheme custom events. Cocoon sends
requests to Mountain over gRPC; Mountain emits the corresponding Tauri event;
SkyBridge intercepts it and calls the VS Code workbench service directly (e.g.,
`IBulkEditService`, `IDebugService`, `IViewsService`).

Example: `sky://workspace/applyEdit` - Cocoon sends a workspace edit via gRPC →
Mountain emits `sky:workspace:applyEdit` Tauri event → SkyBridge applies the
edit to the Monaco model.

## TierIPC Routing

The `TierIPC` runtime variable controls how Wind and Output route IPC calls. It
does not affect Cocoon's gRPC path.

| Value          | Behavior                                                            |
| -------------- | ------------------------------------------------------------------- |
| `Mountain`     | All calls route to Mountain via Tauri IPC. Default.                 |
| `Node`         | All calls route to Cocoon via the `cocoon:request` bridge.          |
| `NodeDeferred` | Mountain first; falls back to Cocoon on miss or undefined response. |

## Component Dependency Direction

Dependencies flow strictly in one direction. No component imports from a
component above it in this list.

```
Common  (Rust traits, DTOs - no dependencies)
  |
  v
Mountain  (implements Common traits, owns Vine gRPC server)
  |
  +----gRPC---> Cocoon  (consumes Mountain via gRPC, no direct Rust dependency)
  |
  +----Tauri IPC---> Wind  (consumes Mountain via Tauri invoke/event)
                       |
                       v
                     Sky  (consumes Wind services, renders UI)
```

Output is a build-time dependency of Cocoon and Sky - it provides the compiled
VS Code platform package `@codeeditorland/output`.

## Data Flow: Key Operations

### File Open

```
User clicks file in Explorer
  --> Sky triggers IEditorService.createEditorTab(uri)
  --> Wind calls Mountain: invoke("read_file", { path })
  --> Mountain: tokio::fs::read(path) --> returns Uint8Array
  --> Wind creates ITextModel with content
  --> Sky renders editor tab
```

### Language Feature (Hover)

```
User hovers symbol in editor
  --> Sky calls Wind: IEditorService.hover(position)
  --> Wind: invoke("hover", { uri, line, col })
  --> Mountain: gRPC ProvideHover({ uri, line, col }) --> Cocoon
  --> Cocoon: registered HoverProvider returns markdown
  --> Mountain: gRPC response --> Wind
  --> Sky renders hover widget
```

### Extension API Call (workspace.applyEdit)

```
Extension calls vscode.workspace.applyEdit(edit)
  --> Cocoon vscode shim serializes WorkspaceEdit
  --> Cocoon: gRPC ApplyEdit --> Mountain
  --> Mountain: emits sky:workspace:applyEdit Tauri event
  --> SkyBridge: calls IBulkEditService.apply(edit)
  --> Monaco model updated
  --> Wind ITextModelService fires onDidChangeTextDocument
```

### Configuration Change

```
User changes setting in Settings editor
  --> Sky calls Wind: IConfigurationService.update(key, value)
  --> Wind: invoke("updateConfiguration", { key, value })
  --> Mountain: updates AppState, persists to settings.json
  --> Mountain: emits configurationChanged Tauri event to Wind
  --> Mountain: sends gRPC config-changed notification to Cocoon
  --> Wind and Cocoon both update their local configuration caches
```

## Ports Reference

| Port  | Process             | Protocol          | Purpose                              |
| ----- | ------------------- | ----------------- | ------------------------------------ |
| 50051 | Mountain (server)   | gRPC (Vine.proto) | Cocoon → Mountain calls              |
| 50052 | Cocoon (server)     | gRPC (Vine.proto) | Mountain → Cocoon push notifications |
| 50053 | Mountain / Air      | gRPC              | Background daemon IPC                |
| N/A   | Mountain / Wind+Sky | Tauri IPC         | UI ↔ backend commands and events     |

## Related Pages

- [Project Structure](/Doc/project-structure) - element map and source paths
- [Configuration](/Doc/configuration) - tier flags and environment variables
- [Quickstart](/Doc/quickstart) - build and run
