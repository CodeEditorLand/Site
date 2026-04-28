---
title: "Vine"
section: "Element"
order: 17
description: "The protobuf schema and gRPC transport layer connecting Mountain and Cocoon."
---

# Vine

Vine is the wire protocol for Editor.Land. It is a hand-written Protocol
Buffers schema (approximately 825 lines of `.proto` definitions) that defines
the gRPC service interfaces used between Mountain (the Rust kernel) and Cocoon
(the Node.js extension host). All inter-process communication that crosses the
Mountain↔Cocoon boundary goes through Vine.

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

## What the Schema Covers

The current Vine.proto schema is approximately **825 lines**. It defines the
service interfaces for the calls that Cocoon makes into Mountain during normal
editor operation, including:

- **File system operations** - read, write, stat, watch, and delete calls
  that back the `vscode.workspace.fs.*` API.
- **Terminal (pty) management** - spawn, resize, write, and close calls
  that back `vscode.window.createTerminal`.
- **DAP bridge** - the Debug Adapter Protocol proxy calls that back
  `vscode.debug.startDebugging`.
- **Process lifecycle** - extension host registration, heartbeat, and
  shutdown coordination between Mountain and Cocoon.

Vine is versioned through the protobuf schema itself. Adding a new optional
field is backwards-compatible; removing or renaming a field requires updating
both the Mountain server implementation and the Cocoon client stubs in the same
change.

---

## Transport

Mountain runs the gRPC server. Cocoon connects as the gRPC client when it
spawns. The transport is a local socket connection - both processes run on the
same machine, so no network stack is involved. The latency of the full
Mountain↔Cocoon round-trip (including the Rust FS layer) is approximately
**8 ms p99 for cached file reads** and **60 ms p99 for cold reads** on Apple
Silicon macOS. These numbers reflect the complete stack from a `workspace.fs.*`
call in Cocoon to the response from Mountain's file system layer; they are not
isolated transport measurements.

---

## Relationship to Mist

[`architecture.md`](/Doc/architecture) lists Mist as a separate WebSocket
communication layer. Mist handles Sky (the WKWebView UI)↔Mountain communication
over WebSockets, which is a different transport from Vine's gRPC. Vine is
specifically the Mountain↔Cocoon layer. The two protocols are not
interchangeable and serve different parts of the system.

---

## Current Limitations

- The schema does not yet cover the `vscode.lm.*`, `vscode.chat.*`,
  `vscode.notebook.*`, or `vscode.tests.*` namespaces. Those APIs are not
  implemented in Cocoon, so no Vine service definitions exist for them yet.
- The `vscode.tasks.*` task resolver is partially implemented; the
  corresponding Vine service methods are incomplete.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Mountain: Native Kernel](/Doc/mountain)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Source Code](https://github.com/CodeEditorLand/Vine)
