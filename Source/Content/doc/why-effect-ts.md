---
title: Why Effect-TS
section: Why Land
order: 2
description:
    Effect-TS gives Cocoon and Wind typed error channels, fiber-based structured
    concurrency, and compile-time dependency injection - the three things a VS
    Code extension host cannot safely build on raw Promises.
---

VS Code's extension host is a single Node.js event loop. One hung Promise blocks
every other extension. There is no way to cancel an in-flight operation, no
back-pressure, and no preemption. Effect-TS addresses each of those problems: it
replaces untyped thrown exceptions with typed error channels, replaces
unstructured async/await with interruptible fibers, and replaces manual service
wiring with a compile-time Layer system. Cocoon and Wind both use Effect-TS's
Layer and service composition, with their bootstrap boundaries optimised to avoid
Effect runtime startup overhead.

## 🐛　The problem with raw Promises

A standard TypeScript `Promise<string>` encodes the success type but says
nothing about what can go wrong. The error is `unknown`. Every caller must cast,
guess, or ignore it. Consider the difference:

```typescript
// Raw Promise: error type is unknown, caller must guess
async function activateExtension(id: string): Promise<void> {
	// throws? which error? nobody knows at the call site
}

// Effect: error type is explicit, compiler tracks handling
function activateExtension(
	id: string,
): Effect.Effect<void, ActivationError | TimeoutError, ExtensionRegistry> {
	// caller must handle ActivationError and TimeoutError or propagate them
}
```

In the Effect version, if a new failure mode is added to the function signature,
every call site that does not handle it becomes a compile error. The VS Code
extension host activates dozens of extensions at startup. Unhandled activation
failures that silently swallow errors are a real class of bug. Effect makes them
impossible to ignore at the type level.

## 🧵　Fiber-based structured concurrency

JavaScript's async/await runs on a single event loop with no built-in mechanism
for cancellation, timeouts, or supervision. Effect-TS introduces fibers:
lightweight, schedulable units of work that support interruption, racing,
forking, and joining.

The key property is structure: a parent fiber can spawn children, and if the
parent is interrupted, all children are interrupted automatically. This prevents
resource leaks, orphaned tasks, and unhandled background failures. For an
extension host specifically, this means:

- A single hung extension cannot block unrelated extensions in other fibers
- Cancelling a search request propagates the cancellation to every sub-task that
  search spawned
- Closing a document terminates all fibers watching that document's state

In a plain event loop, none of these terminations propagate automatically. Each
requires manual `AbortController` wiring at every level of the call stack - and
one missed level means the fiber runs indefinitely.

## 🔒　Resource management with Scope and finalizers

Effect's `Scope` and `acquireRelease` primitives guarantee cleanup even on
crash. When a fiber acquires a resource (a file handle, a network connection, a
gRPC stream), it registers a finalizer in the current Scope. If the fiber is
interrupted or throws, the Scope runs all registered finalizers in reverse order
before exiting.

For Cocoon this matters at extension deactivation: when an extension is stopped,
its `Scope` is closed and every resource it opened - file watchers, language
server connections, terminal sessions - is cleaned up without explicit dispose
calls in the extension's `deactivate()` function.

## 🧩　Composable Layers for 40+ services

Cocoon's `AppLayer` composes over 40 service implementations without manual
wiring:

```typescript
// Each service declares its dependencies in its type
const WindowService = Layer.effect(
	WindowServiceTag,
	Effect.map(MountainClientTag, (client) => makeWindowService(client)),
);

// Layers compose; the compiler verifies every dependency is satisfied
const AppLayer = Layer.mergeAll(
	WindowService,
	WorkspaceService,
	CommandService,
	TerminalService,
	// ... 40+ more
);
```

There are no registration order bugs - the compiler builds the dependency graph
and verifies it before the program runs. Adding a new service dependency is a
type error at the call site until the Layer is wired in.

Wind uses the same pattern. Its `TauriLiveLayer` composes all production service
implementations. Where a service has no asynchronous setup cost, `Layer.succeed`
is used in place of `Layer.effect` to skip the Effect runtime overhead and
provide the value directly:

```typescript
// Layer.succeed for zero-setup services (current Wind pattern)
const ConfigService = Layer.succeed(ConfigServiceTag, makeConfigService());
```

A `TestLayer` substitutes mock implementations for the same Tags, which means
tests run against the same composition logic as production without any special
injection framework.

## 🚀　Cocoon bootstrap: async/await at the boundary

Cocoon's top-level bootstrap (`Effect/Bootstrap.ts`) starts the gRPC RPCServer
(Stage 1) before initiating the Mountain connection (Stage 2). Both stages are
orchestrated with `async`/`await` rather than the Effect-TS runtime, which saves
approximately 45 ms of `NodeRuntime.runMain` startup overhead. Effect fibers are
used inside individual services once they are running; the bootstrap boundary
itself uses plain async functions for faster process startup.

The stage ordering matters: Mountain probes the Cocoon gRPC port during its 30 s
connection budget. If RPCServer binds after Mountain has already started probing,
the initial probes are lost and the connection is delayed by one retry interval.

## ⚡　LandWorkbenchRuntime: eager ManagedRuntime singleton

The `LandWorkbenchRuntime` export in `Output` is a `ManagedRuntime` instance
built once at module load time from `AppLayer`. Services resolved from it share
fiber supervisors and resource scopes across their full lifetime. Each `run*`
call on `LandWorkbenchRuntime` resolves in under 5 ms because the Layer
dependency graph has already been materialised - there is no per-call Layer
build step.

## 🎯　Why this matters for an extension host specifically

The VS Code extension host pattern has a specific failure mode: one extension
calling a slow or non-responding API blocks the entire event loop. Effect fibers
can be interrupted on timeout. A language server that stops responding does not
freeze the editor - the fiber waiting for its response is interrupted after the
configured timeout, the typed `TimeoutError` is returned to the caller, and
other fibers continue running.

This is the architectural claim in Cocoon's README: "Every extension runs in its
own supervised fiber. One crash doesn't take down the rest." That guarantee
comes from Effect's fiber model, not from anything special about Node.js or the
extension host protocol.
