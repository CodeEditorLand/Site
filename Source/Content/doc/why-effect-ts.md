---
title: "Why Effect-TS"
section: "Technology"
order: 28
description:
    "Typed errors, structured concurrency, and dependency injection for TypeScript."
---

# Why Effect-TS

TypeScript's type system is powerful, but its concurrency model is not. Promises
lose error types. Async functions cannot be interrupted. Dependency injection
requires external frameworks. Effect-TS solves all three problems within the type
system itself, and that is why Land uses it for its TypeScript extension host and
workbench layers.

## Typed Error Channels

A standard TypeScript `Promise<string>` tells you the success type but says
nothing about what can go wrong. The error is `unknown`. Every caller must cast,
guess, or ignore it. Effect-TS encodes errors into the type signature:
`Effect<string, ParseError | NetworkError, never>`. The compiler tracks which
errors are possible, which have been handled, and which still need attention. If
a new error variant is added, every call site that does not handle it becomes a
compile error.

## Fiber-Based Structured Concurrency

JavaScript's `async/await` runs tasks on a single event loop with no built-in
mechanism for cancellation, timeouts, or supervision. Effect-TS introduces
fibers: lightweight, schedulable units of work that support interruption,
racing, forking, and joining. A parent fiber can spawn children, and if the
parent is interrupted, all children are interrupted automatically. This is
structured concurrency. It prevents resource leaks, orphaned tasks, and
unhandled background failures.

## Interruption and Timeouts

In standard TypeScript, aborting an in-flight operation requires manual
`AbortController` wiring at every level of the call stack. Effect-TS makes
interruption a first-class concept. Any effect can be wrapped with a timeout,
and the runtime handles cancellation cleanly. When a user closes a tab or
cancels a search, the associated fibers terminate immediately without leaving
dangling resources.

## Layer-Based Dependency Injection

Effect-TS provides a Layer system for dependency injection that is checked at
compile time. Each service declares its dependencies as part of its type
signature. Layers compose into a dependency graph, and the compiler verifies
that every dependency is satisfied before the program runs. There are no runtime
surprises from missing bindings, no service locator patterns, and no
registration order bugs.

## Where Effect-TS Appears in Land

Two elements rely on Effect-TS as their concurrency and composition backbone:

- **Cocoon** is the VS Code extension host. It runs third-party extensions in
  isolated fibers, manages their lifecycles, and coordinates communication with
  the native backend. Effect-TS gives Cocoon typed error handling for extension
  activation failures, structured concurrency for parallel extension loading,
  and clean shutdown when extensions misbehave.

- **Wind** is the workbench layer. It manages editor state, view containers,
  panel layouts, and command dispatch. Effect-TS provides Wind with a
  composable service architecture where each UI subsystem declares its
  dependencies and the runtime wires them together.

## Why Not Raw Promises

Promises work well for simple request-response flows. They break down when you
need cancellation, supervision, typed errors, retries with backoff, or resource
finalization. An extension host must handle all of these. Building that
infrastructure on raw promises would mean reimplementing what Effect-TS already
provides, tested, documented, and type-safe.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Extension Development](/Doc/extension-development)
- [API Reference](/Doc/api-reference)
