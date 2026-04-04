---
title: "Effect-TS Architecture in the Land Editor"
summary: "How we use Effect-TS for typed error handling across the editor core."
publishedAt: "2026-04-01"
tags: ["Architecture", "TypeScript", "Effect-TS"]
author: "CodeEditorLand"
readTime: 8
---

# Effect-TS Architecture in the Land Editor

Code Editor Land uses [Effect-TS](https://effect.website) as the foundational
abstraction for typed error handling, structured concurrency, and dependency
injection across the TypeScript layer of the editor.

## Why Effect-TS?

Traditional TypeScript error handling relies on `try/catch` blocks and `Promise`
chains, which lose type information at every boundary. Effect-TS encodes errors
and requirements directly in the function signature, making it impossible to
accidentally swallow an error or forget a dependency.

## How It Powers the Extension Host (Cocoon)

The Cocoon element runs VS Code extensions inside an Effect-managed runtime.
Each extension lifecycle hook (`activate`, `deactivate`) is modeled as an Effect
program with explicit error types and resource cleanup via `Scope`.

## Typed Error Channels

Every service in the Wind UI layer returns an `Effect<Result, AppError, Env>`.
The three type parameters represent:

1. **Result** - the success value
2. **AppError** - the union of all errors that can occur
3. **Env** - the services this Effect depends on

This makes refactoring safe: the compiler tells you exactly what changed at
every call site.

## Structured Concurrency

Effect-TS provides `Effect.fork`, `Effect.race`, and `Effect.timeout` primitives
that integrate with the Echo work-stealing executor, giving the editor
predictable resource usage even under heavy extension load.
