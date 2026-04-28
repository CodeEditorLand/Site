---
title: "Grove"
section: "Element"
order: 18
description: "The planned WASM sandbox that will isolate extensions with capability-based security."
---

# Grove

> **Status: Planned.** Grove is not active in the current build. The design
> below describes the intended architecture. See the
> [Architecture Overview](/Doc/architecture) for the full element status table.

Grove is the planned WebAssembly sandbox for Editor.Land extensions. Where
Cocoon runs extensions in a Node.js process today, Grove is designed to run
extensions compiled to WebAssembly inside WASMtime with capability-based
security - so that an extension can only touch resources explicitly granted to
it.

---

## The Problem Grove Is Designed to Solve

VS Code extensions run with full Node.js capabilities in a shared process. A
malicious extension can read the file system, make network requests, and access
other extensions' state. The "extension sandbox" is a policy document, not a
technical boundary.

This tight coupling also means users have no way to verify what an extension
actually does at runtime. Trust is all-or-nothing.

---

## How Grove Is Designed to Eliminate It

Grove will run extensions compiled to WebAssembly inside WASMtime with
capability-based security. An extension will only be able to touch resources
explicitly granted to it: a specific directory, a network endpoint, a named IPC
channel. No implicit ambient authority. The WASM sandbox will be a technical
boundary enforced by the runtime, not a policy document.

This is the same model mobile operating systems use: iOS and Android grant
permissions per-app, per-resource, at install time or on first use. Grove
brings that model to editor extensions.

---

## What Grove Will Enable

When Grove is implemented, an extension marketplace with meaningful security
guarantees becomes possible. Users will be able to install extensions with
knowledge of exactly what resources each one can access. The sandbox will be
enforced by WASMtime, not by trust in the extension author.

Extension authors targeting Grove will need to compile their extensions to WASM
and declare capabilities in their manifest. The VS Code API surface will be
implemented for WASM-compiled extensions via a compatibility layer.

---

## Key Technologies

Rust, WASMtime, WebAssembly, Capability-Based Security.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Source Code](https://github.com/CodeEditorLand/Grove)
