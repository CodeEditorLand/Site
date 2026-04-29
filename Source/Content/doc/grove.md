---
title: "Grove"
section: "Element"
order: 18
description: "The WASM and Rhai extension sandbox in development — capability-based security for Editor.Land extensions."
---

# Grove

> **Status: In Progress.** Grove is not yet active in the primary
> `debug-mountain` build. The design below describes the intended architecture
> and the work currently underway. See the
> [Architecture Overview](/Doc/architecture) for the full element status table.

Grove is the WebAssembly and Rhai extension host for Editor.Land. Where
Cocoon runs extensions in a Node.js process today, Grove is designed to run
extensions compiled to WebAssembly (inside WASMtime) or written in
[Rhai](https://rhai.rs) script — both with capability-based security, so that
an extension can only touch resources explicitly granted to it.

Grove is the path toward a lightweight extension model that does not require
Node.js and enforces resource boundaries at the runtime level rather than
through policy.

---

## The Problem Grove Is Designed to Solve

VS Code extensions run with full Node.js capabilities in a shared process. A
malicious extension can read the file system, make network requests, and access
other extensions' state. The "extension sandbox" is a policy document, not a
technical boundary.

This tight coupling also means users have no way to verify what an extension
actually does at runtime. Trust is all-or-nothing.

---

## How Grove Addresses It

Grove runs extensions inside WASMtime with capability-based security. An
extension will only be able to touch resources explicitly granted to it: a
specific directory, a network endpoint, a named IPC channel. No implicit
ambient authority. The WASM sandbox is a technical boundary enforced by the
runtime, not a policy document.

This is the same model mobile operating systems use: iOS and Android grant
permissions per-app, per-resource, at install time or on first use. Grove
brings that model to editor extensions.

For extensions that do not need WASM compilation, Grove also targets
[Rhai](https://rhai.rs) — a lightweight, embeddable scripting language written
in Rust. Rhai extensions run inside the same capability sandbox without
requiring a WASM toolchain.

---

## What Grove Will Enable

When Grove is complete, an extension marketplace with meaningful security
guarantees becomes possible. Users will be able to install extensions with
knowledge of exactly what resources each one can access. The sandbox will be
enforced by WASMtime or the Rhai runtime, not by trust in the extension author.

Extension authors targeting Grove will declare capabilities in their manifest.
WASM-compiled extensions use the WASMtime host; Rhai extensions use the
embedded Rhai engine. Both share the same capability grant model.

---

## Key Technologies

Rust, WASMtime, WebAssembly, Rhai, Capability-Based Security.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Source Code](https://github.com/CodeEditorLand/Grove)
