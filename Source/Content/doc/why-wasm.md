---
title: Why WebAssembly
section: "Why Land"
order: 4
description:
    Grove uses Wasmtime to run extensions inside a capability-bounded WASM
    sandbox - the same binary runs on macOS, Linux, and Windows with no Node.js
    dependency and with OS access granted explicitly rather than by default.
---

Extensions are the most sensitive third-party code a code editor runs. They can
touch files, spawn processes, open network connections, and observe workspace
state. Cocoon runs Node.js extensions with full OS access - the correct
tradeoff for VS Code compatibility. Grove takes the opposite position:
extensions compiled to WASM run inside a Wasmtime sandbox where every OS
capability must be granted explicitly. Nothing is accessible by default.

> **NOTE**: Grove is optional (`--features grove`) and does not affect Cocoon.
> WASM extensions targeting the WASI ABI can use the sandbox today.

## The sandbox boundary

WASM modules execute in linear memory allocated by the host runtime. A module
cannot read the host heap, call arbitrary syscalls, or reach another module's
memory. Wasmtime enforces this at the instruction level - hardware-enforced
memory isolation, not a policy check a clever extension can bypass.

In Node.js, `require('fs')` grants full filesystem access. In Grove, a WASM
extension must receive a WASI `preopened_dir` handle from the host. If Grove
does not grant it, the extension cannot open files - there is no `require('fs')`
to fall back to.

## Capability-based access control

| Resource         | Cocoon (Node.js)                     | Grove (WASM/WASI)                   |
| ---------------- | ------------------------------------ | ----------------------------------- |
| Filesystem       | Full `fs` module access              | Only explicitly preopened dirs      |
| Environment vars | `process.env.*` - all visible        | Only vars explicitly passed         |
| Network          | Full `net`/`http` access             | Only sockets explicitly granted     |
| Subprocess spawn | `child_process.spawn` - unrestricted | Not available without host function |
| Stdout/stderr    | Direct                               | Redirected through WASI fd handles  |

The security model is additive: start with nothing, grant what is needed.
Cocoon is subtractive: start with full Node.js access, restrict what is
possible. Grove's model is more correct for untrusted extensions.

## Near-native performance

Wasmtime compiles WASM to native machine code ahead of time. No interpreter, no
JIT warmup on the critical path. The gap between WASM-compiled Rust and native
Rust is typically under 10% for compute-bound work - the same LLVM backend
produces both. For I/O-bound work (most editor extensions), the gap is
negligible - waiting for Mountain's gRPC response dominates.

## Cross-platform ABI

A `.wasm` binary compiled on macOS runs identically on Linux and Windows inside
Wasmtime. No per-platform native addon compilation, no `node-gyp` rebuild, no
platform-specific binary. VS Code native addon extensions must ship per-platform
binaries per Node.js version. WASM extensions ship one file.

## Grove is not a replacement for Cocoon

| Host   | Extensions                 | Node.js? | Isolation                   |
| ------ | -------------------------- | -------- | --------------------------- |
| Cocoon | Existing VS Code (Node.js) | Yes      | Process isolation only      |
| Grove  | New WASM-native extensions | No       | Wasmtime sandbox per module |

VS Code extensions run in Cocoon. New Land-specific extensions targeting the
Grove API run in Grove. The two hosts are complementary and run concurrently.
Grove is not a migration path - WASM extensions must be compiled from source
to target the WASI ABI.

## Current status

Grove is implemented: Wasmtime runtime, gRPC client to Mountain, WASI host
functions, and proto definitions are in place. Compiled as an optional feature
flag. Budget controls (memory ceilings, CPU metering via Wasmtime fuel) are
implemented. Cocoon remains the default extension host for all VS Code
extensions.

## Related Documentation

- [Why Tauri](/Doc/why-tauri)
- [Deep Dive: Grove](/Doc/deep-dive-grove)
- [Why Rust](/Doc/why-rust)
