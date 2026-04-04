---
title: "Grove"
section: "Element"
order: 18
description:
    "The WASM sandbox that isolates extensions with capability-based security"
---

# Grove

## The Problem Grove Solves

VS Code extensions run with full Node.js capabilities in a shared process. A
malicious extension can read the file system, make network requests, and access
other extensions' state. The "extension sandbox" is a policy document, not a
technical boundary.

## How Grove Eliminates It

Grove runs extensions compiled to WebAssembly inside WASMtime with
capability-based security. An extension can only touch resources explicitly
granted to it: a specific directory, a network endpoint, a named IPC channel. No
implicit ambient authority. The WASM sandbox is a technical boundary, not a
policy document.

## What You Experience

The path to a marketplace where extensions can be run safely with zero trust,
the same way mobile apps work on iOS and Android. An extension can only touch
what you explicitly grant. The sandbox is enforced by the runtime, not by hope.

## Key Technologies

Grove is written in Rust using WASMtime for WebAssembly execution. It implements
the VS Code API surface for WASM-compiled extensions.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Source Code](https://github.com/CodeEditorLand/Grove)
