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
the best. Land's approach is different: running extensions inside WebAssembly,
where the runtime itself enforces what each extension can and cannot do.

The [Grove](/Doc/grove) element is Land's WASM extension host. Its WASMtime
host, gRPC protocol definitions, API surface, and transport layer are
implemented. Integration with the primary build is in active progress.

---

## The Problem with Policy-Based Sandboxing

Most extension sandboxes work by checking permissions at API boundaries. The
extension calls `readFile()`, and the host checks whether the extension has
file-read permission. This model is fragile. A single missed check, a single
confused-deputy bug, or a single API that exposes more than intended breaks the
entire security boundary. The sandbox exists only as long as every API call is
correctly guarded.

---

## Hardware-Enforced Isolation

WebAssembly modules run in a linear memory space that the host allocates. The
module cannot read or write memory outside that space. This is not a policy
check. It is enforced by the runtime's memory model. A WASM module cannot access
the host's heap, cannot read other modules' memory, and cannot execute arbitrary
system calls. The isolation boundary is structural, not procedural.

---

## Capability-Based Security

Grove uses Wasmtime as its WebAssembly runtime. Wasmtime implements the WASI
(WebAssembly System Interface) capability model. A module receives explicit
handles to the resources it is allowed to use: specific directories, specific
environment variables, specific network endpoints. If a handle is not granted,
the resource does not exist from the module's perspective. There is no global
file system to traverse. There is no ambient authority to exploit.

This is the capability model: instead of granting broad access and then
restricting it, Grove grants nothing by default and adds specific capabilities
explicitly.

---

## Memory Limits

Each WASM extension runs with a configurable memory ceiling. If an extension
attempts to allocate beyond its limit, the allocation fails deterministically.
The host is not affected. Other extensions continue running. There is no
out-of-memory crash that takes down the editor.

---

## Resource Controls

Beyond memory, Grove enforces CPU time budgets. An extension that enters an
infinite loop or performs excessive computation is interrupted after its time
slice expires. This is possible because Wasmtime supports epoch-based
interruption, which checks execution progress at configurable intervals without
the overhead of instruction-level metering.

---

## Deterministic Behavior

WebAssembly is a deterministic execution environment. Given the same inputs, a
WASM module produces the same outputs on every platform. This makes extensions
reproducible and testable. A bug reported on macOS can be reproduced on Windows
with identical behaviour, because the execution semantics are defined by the
WASM specification, not by the host operating system.

---

## Grove and Cocoon Together

Grove complements Cocoon, which runs VS Code extensions in a Node.js process.
The two hosts serve different needs: Cocoon provides compatibility with the
existing VS Code extension ecosystem today; Grove provides a secure, performant
runtime for new extensions that prioritise safety and resource isolation. Grove
also hosts [Rhai](https://rhai.rs) scripts for lightweight automation tasks that
do not require the full WASM machinery.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Grove](/Doc/grove)
- [Why Rust](/Doc/why-rust)
- [Cocoon: Extension Host](/Doc/cocoon)
