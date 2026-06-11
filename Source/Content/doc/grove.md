---
title: Grove
section: Elements
order: 4
description:
    Grove is the native Rust and WebAssembly extension host for Land, using
    Wasmtime to sandbox extensions with capability-based security instead of
    relying on Node.js process isolation.
---

Grove is Land's alternative extension host for Rust and WebAssembly extensions.
Where Cocoon runs VS Code extensions inside a Node.js process with broad system
access, Grove runs extensions inside a Wasmtime sandbox where every capability -
file access, network, terminal - must be explicitly granted. Grove is
implemented and available as an optional build feature; it is not the active
extension path for existing VS Code extensions. Cocoon remains the default host
for unmodified extension compatibility.

## The problem Grove solves

VS Code extensions share a single Node.js process. A malicious or buggy
extension can access any file on disk, make arbitrary network requests, and read
another extension's in-memory state. The extension sandbox in VS Code is a
policy document enforced by trust, not a technical boundary enforced by the
runtime.

Grove makes the sandbox a hardware-enforced boundary. A WASM module running
inside Wasmtime has no access to the host OS by default. It can only call
functions that the host explicitly exports to it. An extension that requests
file access gets exactly the file handles it was granted - nothing more.

## Architecture

Grove is built as a four-layer stack:

| Layer                     | Key files                                                                          | Role                                                                                             |
| :------------------------ | :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| Extension host controller | `Host/ExtensionHost.rs`, `ExtensionManager.rs`, `Activation.rs`, `Lifecycle.rs`    | Extension discovery, loading, activation event dispatch, lifecycle management                    |
| VS Code API bridge        | `Host/APIBridge.rs`                                                                | Implements the `vscode.d.ts` facade that extensions call; dispatches to the transport layer      |
| WASM runtime              | `WASM/Runtime/`, `ModuleLoader/`, `MemoryManager/`, `HostBridge/`                  | Wasmtime engine, module compilation and instantiation, memory limits, host function registration |
| Transport                 | `Transport/Strategy.rs`, `gRPCTransport.rs`, `IPCTransport.rs`, `WASMTransport.rs` | Pluggable communication with Mountain (gRPC, Unix IPC, or direct WASM calls)                     |

## How Grove differs from Cocoon

| Aspect                                | Cocoon                                                        | Grove                                                       |
| :------------------------------------ | :------------------------------------------------------------ | :---------------------------------------------------------- |
| Runtime                               | Node.js (V8)                                                  | Wasmtime (WASM)                                             |
| Language extensions can be written in | TypeScript / JavaScript                                       | Rust (compiled to WASM), or any language with a WASM target |
| Security model                        | Process isolation - OS boundary, but broad Node.js capability | Capability-based - no OS access without explicit grant      |
| VS Code API coverage                  | Full `vscode.d.ts`                                            | Planned subset, to be expanded                              |
| Extension compatibility               | Runs unmodified VS Code extensions                            | Requires compilation to `wasm32-wasi` target                |
| Current status                        | Active, default host                                          | Implemented; optional `--features grove` build flag         |

## Wasmtime and the WASM component model

Grove uses Wasmtime v20 as its WebAssembly engine. Extensions must target the
`wasm32-wasi` ABI. Wasmtime's per-store resource limits enforce configurable
memory ceilings per extension - an extension that allocates unboundedly is
terminated rather than degrading the entire editor.

Host functions (the VS Code API surface) are registered on the Wasmtime `Linker`
before module instantiation. When an extension calls
`vscode.workspace.readFile(uri)`, the call goes through the WASM host function
table to `HostBridge.rs`, which dispatches it through the active transport to
Mountain.

## Target use cases

Grove is intended for two categories of extensions:

- **Performance-critical extensions** - parser integrations, language servers,
  formatters that benefit from near-native execution speed without a JavaScript
  runtime overhead
- **Security-sensitive extensions** - extensions that handle credentials,
  signing operations, or sensitive file access where users need verifiable
  capability boundaries before installation

Grove is not intended to replace Cocoon for the broad ecosystem of existing VS
Code extensions, which are written in TypeScript and depend on full Node.js
compatibility.

## Current status

> [!NOTE] Grove is implemented and available as an optional Cargo feature
> (`--features grove`). It is not enabled in the default `debug-electron` build
> profile. Cocoon (Node.js) remains the default extension host for unmodified VS
> Code extensions. WASM-targeting extensions can use Grove's Wasmtime sandbox
> today. Full integration with Mountain's extension activation flow and a
> complete VS Code API subset are ongoing work.

## Source files

| File                                 | Role                                                        |
| :----------------------------------- | :---------------------------------------------------------- |
| `Source/Host/`                       | Extension host controller: discovery, activation, lifecycle |
| `Source/WASM/`                       | Wasmtime engine, module loader, memory manager, host bridge |
| `Source/Transport/`                  | gRPC, IPC, and direct WASM transport strategies             |
| `Source/Protocol/SpineConnection.rs` | Spine protocol client for Mountain gRPC connection          |
| `Source/Binary/`                     | Binary entry point for standalone Grove process             |
| `Proto/`                             | gRPC `.proto` definitions for Grove ↔ Mountain protocol     |
