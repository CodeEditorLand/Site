---
title: "Why WebAssembly"
section: "Technology"
order: 31
description: "Capability-based extension isolation enforced by the runtime."
---

# Why WebAssembly

> **Note: Grove, Land's WASM extension host, is Planned and not yet active.**
> This page explains the design rationale for choosing WebAssembly as the
> isolation mechanism for a future secure extension runtime. See
> [Grove](/Doc/grove) and the [Architecture Overview](/Doc/architecture) for
> current status.

Extensions are the most dangerous code a code editor runs. They are written
by third parties, downloaded from registries, and executed with access to the
user's files and network. The traditional approach is to trust them and hope
for the best. Land's design takes a different approach: running native
extensions inside WebAssembly, where the runtime itself enforces what each
extension can and cannot do.

---

## The Problem with Policy-Based Sandboxing

Most extension sandboxes work by checking permissions at API boundaries. The
extension calls `readFile()`, and the host checks whether the extension has
file-read permission. This model is fragile. A single missed check, a single
confused-deputy bug, or a single API that exposes more than intended breaks
the entire security boundary. The sandbox exists only as long as every API
call is correctly guarded.

---

## Hardware-Enforced Isolation

WebAssembly modules run in a linear memory space that the host allocates. The
module cannot read or write memory outside that space. This is not a policy
check. It is enforced by the runtime's memory model. A WASM module cannot
access the host's heap, cannot read other modules' memory, and cannot execute
arbitrary system calls. The isolation boundary is structural, not procedural.

---

## Capability-Based Security

Grove is designed to use Wasmtime as its WebAssembly runtime. Wasmtime
implements the WASI (WebAssembly System Interface) capability model. A module
will receive explicit handles to the resources it is allowed to use: specific
directories, specific environment variables, specific network endpoints. If a
handle is not granted, the resource does not exist from the module's
perspective. There is no global file system to traverse. There is no ambient
authority to exploit.

This is the capability model: instead of granting broad access and then
restricting it, Land's design grants nothing by default and adds specific
capabilities explicitly.

---

## Memory Limits

Each WASM extension is designed to run with a configurable memory ceiling.
If an extension attempts to allocate beyond its limit, the allocation fails
deterministically. The host is not affected. Other extensions continue
running. There is no out-of-memory crash that takes down the editor.

---

## Resource Controls

Beyond memory, Grove's design enforces CPU time budgets. An extension that
enters an infinite loop or performs excessive computation will be interrupted
after its time slice expires. This is possible because Wasmtime supports
epoch-based interruption, which checks execution progress at configurable
intervals without the overhead of instruction-level metering.

---

## Deterministic Behavior

WebAssembly is a deterministic execution environment. Given the same inputs,
a WASM module produces the same outputs on every platform. This property
makes extensions reproducible and testable. A bug reported on macOS can be
reproduced on Linux with identical behaviour, because the execution semantics
are defined by the WASM specification, not by the host operating system.

---

## Where WebAssembly Will Appear in Land

The [Grove](/Doc/grove) element is Land's planned WASM extension host. When
implemented, Grove will load WASM modules compiled from Rust, C, C++, Zig,
or any language that targets `wasm32-wasi`. Each module will run in its own
Wasmtime instance with its own memory, capabilities, and resource budget.
Grove will also host Rhai scripts for lightweight automation tasks that do
not require the full WASM machinery.

Grove is designed to complement Cocoon, which runs VS Code extensions in a
Node.js environment today. The two hosts serve different needs: Cocoon
provides compatibility with the existing VS Code ecosystem now, while Grove
will provide a secure, performant runtime for new extensions that prioritise
safety and speed.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Grove](/Doc/grove)
- [Why Rust](/Doc/why-rust)
- [Extension Development](/Doc/extension-development)
