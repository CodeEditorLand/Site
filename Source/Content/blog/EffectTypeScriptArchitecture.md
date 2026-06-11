---
title: "Effect-TS Architecture in the Land Editor"
summary: "How we use Effect-TS for typed error handling across the editor core."
publishedAt: "2026-04-01"
tags: ["Architecture", "TypeScript", "Effect-TS"]
author: "CodeEditorLand"
readTime: 8
---

# Effect-TS Architecture in the Land Editor

Code Editor Land uses [`Effect-TS`](https://effect.website) as the foundational
abstraction for typed error handling, structured concurrency, and dependency
injection across the `TypeScript` layer of the editor. `Cocoon`, `Wind`, and the
shared `Vine` IPC contracts are all built on Effect-TS from the ground up.

## Why Effect-TS?

Traditional `TypeScript` error handling relies on `try/catch` blocks and
`Promise` chains, which lose type information at every boundary. `Effect-TS`
encodes errors and requirements directly in the function signature, making it
impossible to accidentally swallow an error or forget a dependency.

Every service in the `Wind` UI layer returns an `Effect<Result, AppError, Env>`.
The three type parameters represent:

1. **Result** - the success value
2. **AppError** - the union of all errors that can occur
3. **Env** - the services this Effect depends on

This makes refactoring safe: the compiler tells you exactly what changed at
every call site. When you rename a service tag or change its interface, every
consuming Effect fails to compile.

## The Effect Layer Pattern

Each service in `Wind` follows an atomic directory structure:

```text
Effect/
  ServiceName/
    Tag.ts      -- Context.Tag for dependency injection
    Interface.ts -- TypeScript interface the service implements
    Implementation.ts -- Concrete implementation using Effect primitives
    Layer.ts    -- Effect Layer that binds Interface to Implementation
    Type.ts     -- Shared types, error definitions
```

These compose into `TauriLiveLayer`, `ElectronLiveLayer`, and `TestLayer`
stacks. In production, `Wind` uses `TauriLiveLayer`, which routes service calls
through `Tauri` commands into `Mountain`'s Rust handlers. For testing,
`TestLayer` provides mock implementations. The consuming code never knows the
difference.

Each service layer is constructed with `Layer.succeed` (not `Layer.effect`),
and the layer stack is composed with `Layer.mergeAll`. The `TauriLiveLayer` is
backed by an eagerly-initialized `ManagedRuntime` stored as a module singleton
on `globalThis.__CEL_WIND_RUNTIME__`, which keeps service lookup latency under
5 ms.

## How It Powers the Extension Host (Cocoon)

The `Cocoon` element runs `VS Code` extensions inside a supervised runtime.
Each extension lifecycle hook (`activate`, `deactivate`) is modeled as an Effect
program with explicit error types and resource cleanup via `Scope`.

The core architecture:

1. **Bootstrap** (`Bootstrap/Implementation/Cocoon/Main.ts`) runs a lean
   `async`/`await` startup sequence - no Effect-TS runtime overhead on the boot
   path. It establishes the gRPC connection to `Mountain` and starts the
   extension host services. Moving the bootstrap off the Effect runtime shaved
   approximately 45 ms from cold-start time.

    **Update:** Cocoon's bootstrap stages run in plain `async`/`await` rather
    than Effect-TS layers. `RPCServer` binds first (port 50052), then
    `MountainConnection` connects outward, ensuring `Mountain`'s 30-second gRPC
    budget does not expire before Cocoon is ready.

2. **Module Interception** (`Effect/Module/Interceptor.ts`) patches both CJS
   `require()` and ESM `import` statements so that calls to the `vscode` module
   are correctly sandboxed and routed to the appropriate, extension-specific API
   instance.

3. **API Factory** (`Services/API/Factory/Service.ts`) constructs the `vscode`
   API object that extensions receive. Every method call is wired through the
   Effect-TS service stack, not through raw callbacks.

4. **Extension Host Service** (`Services/Extension/Host/Service.ts`) manages
   extension activation, lifecycle, and supervision. One extension crashing does
   not take down the rest.

All of this runs under `Effect-TS`'s structured concurrency model. Each
extension runs in its own supervised fiber with `Scope`-based resource
management -- file handles, network connections, and spawned processes are all
tracked and cleaned up on extension deactivation or failure.

## gRPC Integration via Vine

Communication between `Cocoon` and `Mountain` happens over the `Vine` gRPC
protocol defined in `.proto` files. `Cocoon` wraps the gRPC client in Effect-TS
services:

```typescript
// Services/Mountain/gRPC/Client.ts -- Effect-wrapped gRPC operations
interface MountainClient {
	window: WindowOperations;
	workspace: WorkspaceOperations;
	commands: CommandOperations;
	secrets: SecretStorageOperations;
}
```

The `Services/Mountain/gRPC/Client.ts` module provides Effect-wrapped methods
for window, workspace, command, and secret storage calls. The gRPC server
(`Services/gRPC/Server/Service.ts`) implements the Vine protocol with
bidirectional streaming for real-time event communication.

## Process Hardening

`Cocoon` applies process-level hardening before any other code runs:

- Patches `process.exit` to prevent extensions from killing the host
- Handles uncaught exceptions and unhandled promise rejections
- Pipes logs to the host `Mountain` process
- Automatically terminates if the parent `Mountain` process exits

This is the `PatchProcess/` module, the first thing that runs on bootstrap.

## Structured Concurrency

`Effect-TS` provides `Effect.fork`, `Effect.race`, and `Effect.timeout`
primitives that integrate with the `Echo` work-stealing executor in the Rust
layer, giving the editor predictable resource usage even under heavy extension
load.

The `Echo` element in `Land/Element/Echo` provides a work-stealing task
scheduler for bounded background work. In the TypeScript layer, `Effect.fork`
creates fibers that the scheduler can preempt. This replaces the traditional
Node.js event-loop model where one hung Promise blocks every other extension.

## Typed IPC: Two Layers

The editor has two independent IPC paths, each typed differently:

- **Tauri IPC** (`Wind` to `Mountain`): Typed `Tauri` commands with Rust
  handlers in `Mountain`'s `IPC/` module. `Preload.ts` shims the Electron
  `ipcRenderer` so the VS Code workbench code communicates through Tauri's
  `invoke` system instead.

- **Vine gRPC** (`Cocoon` to `Mountain`): Strongly-typed protocol described by
  `.proto` files, with generated Rust and TypeScript stubs. Bidirectional
  streaming for real-time events like document notifications, language provider
  requests, terminal I/O, and extension health.

These paths are independent. Each has its own job and its own error surface.
