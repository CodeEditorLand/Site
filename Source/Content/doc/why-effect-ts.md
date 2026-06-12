---
title: Why Effect-TS
section: "Why Land"
order: 2
description:
    Effect-TS gives Cocoon and Wind typed error channels, fiber-based structured
    concurrency, and compile-time dependency injection - the three things a VS
    Code extension host cannot safely build on raw Promises.
---

VS Code's extension host is a single Node.js event loop. One hung Promise
blocks every other extension. There is no cancellation, back-pressure, or
preemption. Effect-TS replaces untyped thrown exceptions with typed error
channels, unstructured `async`/`await` with interruptible fibers, and manual
service wiring with a compile-time `Layer` system.

## Typed errors instead of `unknown`

A standard `Promise<string>` encodes the success type but says nothing about
errors - they are `unknown`. Callers must cast, guess, or ignore them.

```typescript
// Effect: error type is explicit, compiler tracks handling
function activateExtension(
	id: string,
): Effect.Effect<void, ActivationError | TimeoutError, ExtensionRegistry> {
	// caller must handle or propagate both error types
}
```

Adding a new failure mode becomes a compile error at every unhandled call site.
The extension host activates dozens of extensions at startup. Silent activation
failures are a real bug class; Effect makes them impossible to ignore.

## Fiber-based structured concurrency

JavaScript `async`/`await` has no built-in cancellation, timeout, or
supervision. Effect-TS introduces fibers: lightweight, schedulable units of
work supporting interruption, racing, forking, and joining.

The key property is structure: a parent fiber can spawn children, and if the
parent is interrupted, all children are interrupted automatically. This means:

- A single hung extension cannot block unrelated fibers
- Cancelling a search propagates to every sub-task that search spawned
- Closing a document terminates all fibers watching that document's state

In a plain event loop, none of these propagate automatically. Each requires
manual `AbortController` wiring at every call stack level.

## Resource management with Scope

Effect's `Scope` and `acquireRelease` guarantee cleanup even on crash. When a
fiber acquires a resource, it registers a finalizer. If the fiber is interrupted
or throws, the Scope runs all finalizers in reverse order before exiting. For
Cocoon, this means extension deactivation cleans up file watchers, language
server connections, and terminal sessions without explicit `dispose()` calls.

## Composable Layers for 40+ services

Cocoon's `AppLayer` composes over 40 service implementations. Each service
declares its dependencies in its type. Layers compose; the compiler verifies
every dependency is satisfied. There are no registration order bugs - the
compiler builds the dependency graph and verifies it before the program runs.

Wind uses the same pattern with `TauriLiveLayer`. A `TestLayer` substitutes
mocks for the same Tags, so tests run against the same composition logic
without a special injection framework.

## Bootstrap boundaries

Cocoon's top-level bootstrap uses `async`/`await` rather than the Effect
runtime, saving ~45 ms of startup overhead. Effect fibers are used inside
individual services once running. The `LandWorkbenchRuntime` export is a
`ManagedRuntime` built once at module load time - each `run*` call resolves in
under 5 ms with no per-call Layer build step.

## Why this matters for an extension host

One extension calling a slow API blocks the entire event loop. Effect fibers
can be interrupted on timeout. A language server that stops responding does not
freeze the editor - the fiber waiting for it is interrupted, the typed
`TimeoutError` is returned, and other fibers continue.

This is the architectural claim: "Every extension runs in its own supervised
fiber. One crash doesn't take down the rest." That guarantee comes from
Effect's fiber model.

## Related Documentation

- [Why gRPC](https://Editor.Land/Doc/why-grpc)
- [Why Rust](https://Editor.Land/Doc/why-rust)
- [Telemetry: Effect-TS and OpenTelemetry](https://Editor.Land/Doc/telemetry/effect-otel)
