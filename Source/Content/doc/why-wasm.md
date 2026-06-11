---
title: Why WebAssembly
section: Why Land
order: 4
description:
    Grove uses Wasmtime to run extensions inside a capability-bounded WASM
    sandbox - the same binary runs on macOS, Linux, and Windows with no Node.js
    dependency and with OS access granted explicitly rather than by default.
---

Extensions are the most sensitive third-party code a code editor runs. They can
touch files, spawn processes, open network connections, and observe workspace
state. Cocoon, Land's current extension host, runs Node.js extensions with the
same OS access as the editor process - which is the correct tradeoff for
compatibility with the VS Code extension ecosystem. Grove, the planned second
host, takes the opposite position: extensions compiled to WASM run inside a
Wasmtime sandbox where every OS capability must be granted explicitly. Nothing
is accessible by default.

> [!IMPORTANT] Grove is a work-in-progress extension host. The source includes a
> Wasmtime runtime, gRPC protocol definitions, API surface, and transport layer.
> Integration with the primary build is in progress. The primary VS Code
> extension compatibility path remains Cocoon.

## The sandbox boundary

WebAssembly modules execute in linear memory allocated by the host runtime. A
module cannot read the host process heap, cannot call arbitrary OS syscalls, and
cannot reach another module's memory through normal execution. Wasmtime enforces
this boundary at the instruction level - it is not a policy check that can be
bypassed by a clever extension, it is a hardware-enforced memory isolation
boundary.

This is structurally different from Node.js, where an extension that calls
`require('fs')` gets full filesystem access to everything the process user can
read. In Grove, a WASM extension that wants filesystem access must receive a
WASI `preopened_dir` handle from the host. If Grove does not grant it, the
extension cannot open files - there is no `require('fs')` to fall back to.

## Capability-based access control

Wasmtime implements WASI (WebAssembly System Interface), which is a
capability-based API. Capabilities are granted as concrete handles, not as
ambient permissions:

| Resource              | Node.js (Cocoon)                     | WASM/WASI (Grove)                             |
| --------------------- | ------------------------------------ | --------------------------------------------- |
| Filesystem            | Full access via `fs` module          | Only directories explicitly preopened by host |
| Environment variables | `process.env.*` - all vars visible   | Only vars explicitly passed by host           |
| Network               | Full access via `net`/`http`         | Only sockets explicitly granted by host       |
| Subprocess spawn      | `child_process.spawn` - unrestricted | Not available without explicit host function  |
| Stdout/stderr         | Direct                               | Redirected through WASI fd handles            |

The security model is additive: start with nothing, grant what is needed.
Cocoon's model is subtractive: start with full Node.js access, restrict what is
possible. Grove's model is more correct for untrusted third-party extensions.

## Near-native performance via AOT compilation

Wasmtime compiles WASM modules to native machine code ahead of time. There is no
interpreter and no JIT warmup on the critical path. A WASM extension activating
for the first time runs compiled native code, not bytecode. The performance gap
between WASM-compiled Rust and native Rust is small - typically under 10% for
compute-bound work - because the same LLVM backend produces both.

For I/O-bound work (which most editor extensions are), the gap is even smaller:
waiting for Mountain to respond to a gRPC request dominates, and the WASM
execution overhead is negligible.

## Cross-platform ABI

A `.wasm` binary compiled on macOS runs identically on Linux and Windows inside
Wasmtime. There is no per-platform native addon compilation, no `node-gyp`
rebuild, and no platform-specific binary in the extension package. One `.wasm`
file covers all targets. This solves a real distribution problem: VS Code native
addon extensions (`keytar`, `spdlog`, tree-sitter parsers) must ship precompiled
binaries per platform and Node.js version. WASM extensions ship one file.

## Grove is not a replacement for Cocoon

These are two different extension hosts for two different extension populations:

| Host   | Extensions                            | Node.js required | Isolation model             |
| ------ | ------------------------------------- | ---------------- | --------------------------- |
| Cocoon | Existing VS Code extensions (Node.js) | Yes              | Process isolation only      |
| Grove  | New WASM-native extensions            | No               | Wasmtime sandbox per module |

An extension written for VS Code today runs in Cocoon. A new extension written
specifically for Land targeting the Grove API runs in Grove. The two hosts are
complementary and can run concurrently. Grove is not a migration path for Cocoon
extensions - WASM extensions must be compiled from source to target the WASI
ABI.

## Current status

Grove's source includes the Wasmtime runtime integration, the gRPC client for
calling back into Mountain, the WASI host function implementations, and the
Grove-specific proto definitions. It is compiled as an optional feature flag
(`--features grove`) and is not enabled in the default build. Budget controls
(memory ceilings, CPU time limits) are implemented in the source but have not
been validated in the active build profile.

Cocoon (Node.js) remains the default extension host for all VS Code-compatible
extensions. Grove's Wasmtime sandbox is available for extensions explicitly
targeting the WASM/WASI ABI via the Grove API. The two hosts run concurrently
when Grove is enabled; enabling Grove does not affect the Cocoon path.
