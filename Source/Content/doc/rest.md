---
title: "Rest"
section: "Element"
order: 21
description: "The OXC-powered TypeScript compiler for Editor.Land's build pipeline."
---

# Rest

Rest is the TypeScript compiler and bundler for Editor.Land. It is built on
OXC (Oxidation Compiler), a Rust-native TypeScript parser and transformer,
combined with esbuild for final bundling.

---

## The Problem

VS Code builds its TypeScript source with tsc running inside Node.js. The
entire compile step carries the overhead of a JavaScript runtime: garbage
collection pauses, JIT warmup, single-threaded type checking. A clean build
of the VS Code workbench takes minutes.

Even modern alternatives like esbuild, while dramatically faster than tsc,
still run inside a Go runtime with its own garbage collector.

---

## How Rest Addresses It

Rest is built on OXC, a Rust-native TypeScript parser and code generator.
Parsing, transformation, and code emission happen in native code with no
garbage collection pauses.

OXC handles TypeScript syntax stripping, JSX transformation, and module
resolution natively. Rest wraps OXC with a plugin-routed architecture that
feeds transformed output into esbuild for final bundling, combining OXC's
parsing speed with esbuild's battle-tested code splitting.

OXC's own benchmarks show significant speed improvements over esbuild and tsc
for equivalent workloads. Rest's measured build times in Land's specific
pipeline have not been independently published yet.

---

## Source Structure

Rest's source tree (confirmed in the
[repository](https://github.com/CodeEditorLand/Rest)):

| Path | Role |
|---|---|
| `Source/Binary.rs` | Binary entry point |
| `Source/Main.rs` | Main function |
| `Source/Library.rs` | Crate root re-exports |
| `Source/Fn/` | Core function modules |
| `Source/Struct/` | Data structure definitions |

---

## What You Experience

Clean builds complete faster than a tsc-based pipeline. Incremental rebuilds
during development are substantially faster than running tsc directly. The
exact improvement depends on the size of the TypeScript surface being compiled.

CI pipelines benefit equally: build times drop and merge queues move faster
compared to a tsc baseline.

---

## Key Technologies

Rust, OXC, esbuild, Plugin-Routed Bundling, Zero-GC TypeScript Compilation.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Output](/Doc/output)
- [Source Code](https://github.com/CodeEditorLand/Rest)
