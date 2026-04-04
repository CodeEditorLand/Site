---
title: "Rest"
section: "Element"
order: 21
description:
    "The OXC-powered TypeScript compiler that runs 2-3x faster than esbuild."
---

# Rest

Rest is the TypeScript compiler and bundler for Code Editor Land. It replaces
the traditional tsc + Node.js pipeline with OXC, a Rust-native parser and
transformer that produces 100% compatible output at 2-3x esbuild speed.

## The Problem

VS Code builds its TypeScript source with tsc running inside Node.js. The entire
compile step carries the overhead of a JavaScript runtime: garbage collection
pauses, JIT warmup, single-threaded type checking. A clean build of the VS Code
workbench takes minutes.

Even modern alternatives like esbuild, while dramatically faster than tsc, still
run inside a Go runtime with its own garbage collector and bridge overhead when
interacting with JavaScript tooling.

## How Rest Eliminates It

Rest is built on OXC (Oxidation Compiler), a Rust-native TypeScript parser and
code generator. Parsing, transformation, and code emission all happen in native
code with zero garbage collection pauses.

OXC handles TypeScript syntax stripping, JSX transformation, and module
resolution natively. Rest wraps OXC with a plugin-routed architecture that feeds
transformed output into esbuild for final bundling, combining OXC's parsing
speed with esbuild's battle-tested code splitting.

The result: 2-3x faster than esbuild alone, and an order of magnitude faster
than tsc.

## What You Experience

Clean builds complete in seconds, not minutes. Incremental rebuilds during
development are near-instant. The compile step disappears from your workflow.
You save a file and see the result before your hand leaves the keyboard.

CI pipelines benefit equally. Build times drop, runner minutes shrink, and merge
queues move faster.

## Key Technologies

Rust, OXC, esbuild, Plugin-Routed Bundling, Zero-GC TypeScript Compilation.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Output](/Doc/output)
- [Source Code](https://github.com/CodeEditorLand/Rest)
