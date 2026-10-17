---
title: "Effect-TS Architecture in the Land Editor"
summary: "How we use Effect-TS for typed error handling across the editor core."
publishedAt: "2026-04-01"
tags: ["Architecture", "TypeScript", "Effect-TS"]
author: "CodeEditorLand"
readTime: 4
---

# [Effect-TS](https://effect.website) Architecture in the [Land](https://github.com/CodeEditorLand/Land) Editor

Code Editor Land uses [`Effect-TS`](https://effect.website) as the foundational
abstraction for typed error handling, structured concurrency, and dependency
injection across the `TypeScript` layer of the editor. [`Cocoon`](https://github.com/CodeEditorLand/Cocoon) and [`Wind`](https://github.com/CodeEditorLand/Wind) are
built on [Effect-TS](https://effect.website) from the ground up, and the shared [`Vine`](https://github.com/CodeEditorLand/Vine) gRPC contracts are
consumed through Effect-wrapped clients.

## Why [Effect-TS](https://effect.website)?

Traditional `TypeScript` error handling relies on `try/catch` blocks and
`Promise` chains, which lose type information at every boundary. [`Effect-TS`](https://effect.website)
encodes errors and requirements directly in the function signature, making it
impossible to accidentally swallow an error or forget a dependency.

Every service in the [`Wind`](https://github.com/CodeEditorLand/Wind) UI layer returns an `Effect<Result, AppError, Env>`.
The three type parameters represent:

1. **Result** - the success value
2. **AppError** - the union of all errors that can occur
3. **Env** - the services this Effect depends on

This makes refactoring safe: the compiler tells you exactly what changed at
every call site. When you rename a service tag or change its interface, every
consuming Effect fails to compile.

## The Effect Layer Pattern

Each service in [`Wind`](https://github.com/CodeEditorLand/Wind) is modeled as an [Effect-TS](https://effect.website) service: a `Context.Tag`
for dependency injection, a `TypeScript` interface the service implements, a
concrete implementation built from Effect primitives, and a `Layer` that binds
the interface to the implementation.

These compose into `TauriLiveLayer`, `ElectronLiveLayer`, and `TestLayer`
stacks. In production, [`Wind`](https://github.com/CodeEditorLand/Wind) uses `TauriLiveLayer`, which routes service calls
through `Tauri` commands into [`Mountain`](https://github.com/CodeEditorLand/Mountain)'s Rust handlers. For testing,
`TestLayer` provides mock implementations. The consuming code never knows the
difference.

The layer stack is composed with `Layer.mergeAll`, then converted once into a
`Runtime` via `Layer.toRuntime` and shared through the module-level
`__CEL_SERVICES__` global, so every service call hits a pre-built runtime
instead of constructing one per request.

## How It Powers the Extension Host ([Cocoon](https://github.com/CodeEditorLand/Cocoon))

The [`Cocoon`](https://github.com/CodeEditorLand/Cocoon) element runs `VS Code` extensions inside a supervised runtime.
Each extension lifecycle hook (`activate`, `deactivate`) is modeled as an Effect
program with explicit error types and resource cleanup via `Scope`.

The core architecture:

1. **Bootstrap** ([`Bootstrap/Implementation/Cocoon/Main.ts`](https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Bootstrap/Implementation/Cocoon/Main.ts)) runs a lean
   `async`/`await` startup sequence - no [Effect-TS](https://effect.website) runtime overhead on the boot
   boot path. It establishes the gRPC connection to [`Mountain`](https://github.com/CodeEditorLand/Mountain) and starts the
   extension host services. Keeping the bootstrap off the Effect runtime trims
   measurable time from cold start.

    **Update:** [Cocoon](https://github.com/CodeEditorLand/Cocoon)'s bootstrap stages run in plain `async`/`await` rather
    than [Effect-TS](https://effect.website) layers. `RPCServer` binds first (port 50052), then
    `MountainConnection` connects outward, ensuring [`Mountain`](https://github.com/CodeEditorLand/Mountain)'s 30-second gRPC
    budget does not expire before [Cocoon](https://github.com/CodeEditorLand/Cocoon) is ready.

2. **Module Interception** ([`Service/Effect/Module/Interceptor.ts`](https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Service/Effect/Module/Interceptor.ts)) patches both
   CJS `require()` and ESM `import` statements so that calls to the `vscode`
   module are correctly sandboxed and routed to the appropriate,
   extension-specific API instance.

3. **API Factory** ([`Services/API/Factory/Service.ts`](https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/API/Factory/Service.ts)) constructs the `vscode`
   API object that extensions receive. Every method call is wired through the
   Effect-TS service stack, not through raw callbacks.

4. **Extension Host Service** ([`Services/Extension/Host/Service.ts`](https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Extension/Host/Service.ts)) manages
   extension activation, lifecycle, and supervision. One extension crashing does
   not take down the rest.

All of this runs under [`Effect-TS`](https://effect.website)'s structured concurrency model. Each
extension runs in its own supervised fiber with `Scope`-based resource
management -- file handles, network connections, and spawned processes are all
tracked and cleaned up on extension deactivation or failure.

## gRPC Integration via [Vine](https://github.com/CodeEditorLand/Vine)

Communication between [`Cocoon`](https://github.com/CodeEditorLand/Cocoon) and [`Mountain`](https://github.com/CodeEditorLand/Mountain) happens over the [`Vine`](https://github.com/CodeEditorLand/Vine) gRPC
protocol, defined in [`Proto/Vine.proto`](https://github.com/CodeEditorLand/Vine/tree/Current/Proto/Vine.proto) - the single canonical contract for
[Land](https://github.com/CodeEditorLand/Land)'s gRPC traffic, with generated Rust and `TypeScript` stubs. [`Cocoon`](https://github.com/CodeEditorLand/Cocoon) wraps
the gRPC client in Effect-TS services:

```typescript
// Services/Mountain/gRPC/Client.ts -- Effect-wrapped gRPC operations
interface MountainClient {
	window: WindowOperations;
	workspace: WorkspaceOperations;
	commands: CommandOperations;
	secrets: SecretStorageOperations;
}
```

The [`Services/Mountain/gRPC/Client.ts`](https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/Mountain/gRPC/Client.ts) module provides Effect-wrapped methods
for window, workspace, command, and secret storage calls. The gRPC server
([`Services/gRPC/Server/Service.ts`](https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/Services/gRPC/Server/Service.ts)) implements the [Vine](https://github.com/CodeEditorLand/Vine) protocol with
bidirectional streaming for real-time event communication.

## Process Hardening

[`Cocoon`](https://github.com/CodeEditorLand/Cocoon) applies process-level hardening before any other code runs:

- Patches `process.exit` to prevent extensions from killing the host
- Handles uncaught exceptions and unhandled promise rejections
- Pipes logs to the host [`Mountain`](https://github.com/CodeEditorLand/Mountain) process
- Automatically terminates if the parent [`Mountain`](https://github.com/CodeEditorLand/Mountain) process exits

This is the [`PatchProcess/`](https://github.com/CodeEditorLand/Cocoon/tree/Current/Source/PatchProcess) module, the first thing that runs on bootstrap.

## Structured Concurrency

[`Effect-TS`](https://effect.website) provides `Effect.fork`, `Effect.race`, and `Effect.timeout`
primitives, giving the editor predictable resource usage even under heavy
extension load. On the `TypeScript` side, `Effect.fork` creates supervised
fibers that the Effect runtime can preempt - a hung `Promise` in one extension
no longer blocks the others.

On the `Rust` side, the [`Echo`](https://github.com/CodeEditorLand/Echo) element ([`Land/Element/Echo`](https://github.com/CodeEditorLand/Echo/tree/Current)) provides a
work-stealing task scheduler for bounded background work: lock-free queues on
`crossbeam-deque`, with `High`, `Normal`, and `Low` priority tiers. Each layer
runs its own scheduler; together they replace the single-threaded event-loop
coupling of a plain `Node.js` host.

## Typed IPC: Two Layers

The editor has two independent IPC paths, each typed differently:

- **Tauri IPC** ([`Wind`](https://github.com/CodeEditorLand/Wind) to [`Mountain`](https://github.com/CodeEditorLand/Mountain)): Typed `Tauri` commands with Rust
  handlers in [`Mountain`](https://github.com/CodeEditorLand/Mountain)'s [`IPC/`](https://github.com/CodeEditorLand/Mountain/tree/Current/Source/IPC) module. `Preload.ts` shims the Electron
  `ipcRenderer` so the VS Code workbench code communicates through Tauri's
  `invoke` system instead.

- **Vine gRPC** ([`Cocoon`](https://github.com/CodeEditorLand/Cocoon) to [`Mountain`](https://github.com/CodeEditorLand/Mountain)): Strongly-typed protocol described by
  `.proto` files, with generated Rust and TypeScript stubs. Bidirectional
  streaming for real-time events like document notifications, language provider
  requests, terminal I/O, and extension health.

These paths are independent. Each has its own job and its own error surface.
