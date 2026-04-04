---
title: "Vine"
section: "Element"
order: 17
description:
    "The gRPC protocol layer with typed contracts that break loudly at compile
    time"
---

# Vine

## The Problem Vine Solves

Electron's IPC is untyped. You call `ipcRenderer.send('open-file', { path })`
and hope the main process handles it. There is no contract, no type checking at
the wire, no schema validation. Refactoring IPC messages is dangerous because
nothing tells you what broke.

## How Vine Eliminates It

Every inter-process service interface starts as a `.proto` file. The generated
Rust and TypeScript stubs are the only way Land processes communicate. Changing
a message field breaks every consumer at compile time. gRPC over a Unix domain
socket runs at native memory-copy speed: microseconds for any message under 64
KB.

## What You Experience

IPC is typed, versioned, and fast. A refactor that changes a message field fails
at the compiler, not in production. Mountain, Cocoon, and Grove all speak the
same gRPC language. Type mismatches between Rust and TypeScript are caught at
compile time, not at runtime.

## Key Technologies

Vine uses Protocol Buffers for service definitions with tonic for Rust server
generation and gRPC for transport.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Mountain: Native Backend](/Doc/mountain)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Source Code](https://github.com/CodeEditorLand/Vine)
