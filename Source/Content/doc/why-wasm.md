---
title: "Why WebAssembly"
section: "Technology"
order: 31
description: "Capability-based extension isolation enforced by the runtime."
---

# Why WebAssembly

Extensions are the most dangerous code a code editor runs. They are written by
third parties, downloaded from registries, and executed with access to the
user's files and network. The traditional approach is to trust them and hope for
the best. Land takes a different approach: it runs native extensions inside
WebAssembly, where the runtime itself enforces what each extension can and
cannot do.

## The Problem with Policy-Based Sandboxing

Most extension sandboxes work by checking permissions at API boundaries. The
extension calls `readFile()`, and the host checks whether the extension has
file-read permission. This model is fragile. A single missed check, a single
confused-deputy bug, or a single API that exposes more than intended breaks the
entire security boundary. The sandbox exists only as long as every API call is
correctly guarded.

## Hardware-Enforced Isolation

WebAssembly modules run in a linear memory space that the host allocates. The
module cannot read or write memory outside that space. This is not a policy
check. It is enforced by the runtime's memory model. A WASM module cannot access
the host's heap, cannot read other modules' memory, and cannot execute arbitrary
system calls. The isolation boundary is structural, not procedural.

## Capability-Based Security

Land uses Wasmtime as its WebAssembly runtime. Wasmtime implements the WASI
(WebAssembly System Interface) capability model. A module receives explicit
handles to the resources it is allowed to use: specific directories, specific
environment variables, specific network endpoints. If a handle is not granted,
the resource does not exist from the module's perspective. There is no global
file system to traverse. There is no ambient authority to exploit.

This is the capability model. Instead of granting broad access and then
restricting it, Land grants nothing by default and then adds specific
capabilities. The result is a minimal attack surface that grows only as the user
explicitly permits.

## Memory Limits

Each WASM extension runs with a configurable memory ceiling. If an extension
attempts to allocate beyond its limit, the allocation fails deterministically.
The host is not affected. Other extensions continue running. There is no
out-of-memory crash that takes down the editor, and there is no single extension
that can consume all available RAM.

## Resource Controls

Beyond memory, Land's WASM host enforces CPU time budgets. An extension that
enters an infinite loop or performs excessive computation is interrupted after
its time slice expires. The user sees a notification. The editor remains
responsive. This is possible because Wasmtime supports epoch-based interruption,
which checks execution progress at configurable intervals without the overhead
of instruction-level metering.

## Deterministic Behavior

WebAssembly is a deterministic execution environment. Given the same inputs, a
WASM module produces the same outputs on every platform. This property makes
extensions reproducible and testable. A bug reported on macOS can be reproduced
on Linux with identical behavior, because the execution semantics are defined by
the WASM specification, not by the host operating system.

## Where WebAssembly Appears in Land

The Grove element is Land's native extension host. Grove loads WASM modules
compiled from Rust, C, C++, Zig, or any language that targets `wasm32-wasi`.
Each module runs in its own Wasmtime instance with its own memory, capabilities,
and resource budget. Grove also hosts Rhai scripts for lightweight automation
tasks that do not require the full WASM machinery.

Grove complements Cocoon, which runs VS Code extensions in a TypeScript
environment. The two hosts serve different needs: Cocoon provides compatibility
with the existing VS Code ecosystem, while Grove provides a secure, performant
runtime for new extensions that prioritize safety and speed.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Why Rust](/Doc/why-rust)
- [Extension Development](/Doc/extension-development)
