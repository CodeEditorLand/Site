---
title: "Vine"
section: "Element"
order: 17
description:
    "The protobuf schema and bidirectional gRPC transport layer connecting
    Mountain and Cocoon."
---

# Vine

Vine is the wire protocol for Editor.Land - a set of Protocol Buffers schemas
(`.proto` files) that define the bidirectional gRPC service interfaces used
between Mountain (the Rust kernel) and Cocoon (the Node.js extension host). All
inter-process communication that crosses the Mountain↔Cocoon boundary goes
through Vine.

**Where the implementation lives today:** The working proto definitions and gRPC
server code currently reside inside Mountain's own `Source/Vine/` directory, and
the Cocoon gRPC client lives at `Services/MountainGRPCClient.ts`. The standalone
[Vine repository](https://github.com/CodeEditorLand/Vine) is the future home for
these schemas as a published, independently versioned package - it is actively
being populated as the protocol stabilises.

---

## Why a Typed Protocol

Electron's IPC is untyped. A call to `ipcRenderer.send('open-file', { path })`
has no enforced contract on either side. Renaming a field, changing an argument
type, or removing a handler produces a silent runtime failure, not a build
error.

Vine defines every inter-process call as a `.proto` service method with typed
request and response messages. The generated Rust stubs (via
[tonic](https://github.com/hyperium/tonic)) and TypeScript stubs are the only
way Mountain and Cocoon communicate. If a message field is renamed or removed,
the Rust build and the TypeScript build each fail at their own compile step.
There is no single cross-language compile - the two languages validate
independently - but neither side can silently drift from the schema.

---

## Protocol Schema Family

Vine is the umbrella name for a family of three `.proto` files:

| Schema        | Purpose                                                                     |
| ------------- | --------------------------------------------------------------------------- |
| `Vine.proto`  | Core Mountain↔Cocoon communication (file system, pty, DAP, lifecycle)       |
| `Spine.proto` | Extension host coordination - action/response pattern for command execution |
| `Grove.proto` | Grove-specific extensions for the planned Rust/WASM extension host          |

---

## What the Schema Covers

Service interfaces defined for both directions of the Mountain↔Cocoon
communication:

**Cocoon → Mountain (`MountainService`):**

- **File system operations** - read, write, stat, watch, and delete calls that
  back the `vscode.workspace.fs.*` API.
- **Terminal (pty) management** - spawn, resize, write, and close calls that
  back `vscode.window.createTerminal`.
- **DAP bridge** - the Debug Adapter Protocol proxy calls that back
  `vscode.debug.startDebugging`.
- **Process lifecycle** - extension host registration, heartbeat, and shutdown
  coordination.

**Mountain → Cocoon (`CocoonService`):**

- **Extension host lifecycle** - `InitializeExtensionHost`, `$deltaExtensions`,
  `$activateByEvent`, `$startExtensionHost`.
- **Language feature invocations** - `$provideHover`, `$provideCompletionItems`,
  `$provideDefinition`, `$provideReferences`, and related methods.
- **Document content** - `$acceptModelChanged` delivers text change deltas from
  Mountain to Cocoon's document content cache.
- **Notifications and requests** - `SendMountainNotification`,
  `ProcessMountainRequest`, `CancelOperation`.

Vine is versioned through the protobuf schema itself. Adding a new optional
field is backwards-compatible; removing or renaming a field requires updating
both the Mountain implementation and the Cocoon stubs in the same change.

---

## Transport

Both Mountain and Cocoon run gRPC servers; both also act as gRPC clients:

- **Mountain server** - Cocoon dials Mountain at startup for file system, pty,
  DAP, and lifecycle calls.
- **Cocoon server** - Mountain dials Cocoon to invoke extension host methods and
  deliver workspace notifications.

Both sockets are strictly local - both processes run on the same machine, so no
external network traffic is involved. Each socket is secured with a TLS
certificate generated at startup using `rcgen` + `p256`, ensuring that even
local inter-process traffic is authenticated and encrypted.

Vine is designed for transport agnosticism: TCP and IPC are the current
backends; WASM host functions are the planned backend for the Grove extension
host.

---

## Relationship to Mist

[`architecture.md`](/Doc/architecture) lists Mist as a separate WebSocket
communication layer. Mist handles Sky (the OS WebView UI)↔Mountain communication
over WebSockets, which is a different transport from Vine's gRPC. Vine is
specifically the Mountain↔Cocoon layer. The two protocols are not
interchangeable and serve different parts of the system.

---

## Development Status

| Feature                                            | Status         |
| -------------------------------------------------- | -------------- |
| `Spine.proto` - extension host coordination        | ✅ Specified   |
| `Vine.proto` - Mountain↔Cocoon gRPC (in Mountain)  | ✅ Active      |
| Standalone Vine package (published `.proto` files) | 🔄 In progress |
| `Grove.proto` - WASM extension host protocol       | 🔄 In progress |
| Health monitoring / heartbeat                      | 🔄 In progress |
| Transport agnosticism (WASM host functions)        | 📋 Planned     |

---

## What Is Next

- The schema does not yet cover the `vscode.lm.*`, `vscode.chat.*`,
  `vscode.notebook.*`, or `vscode.tests.*` namespaces. Those APIs are not yet
  implemented in Cocoon, so no Vine service definitions exist for them.
- The `vscode.tasks.*` task resolver is partially implemented; the corresponding
  Vine service methods are being completed.
- The standalone Vine package will be published once the schema stabilises, so
  downstream Rust crates and TypeScript clients can depend on it directly.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Mountain: Native Kernel](/Doc/mountain)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Source Code](https://github.com/CodeEditorLand/Vine)
