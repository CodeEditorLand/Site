---
title: "Grove"
section: "Element"
order: 18
description: "The WASMtime and Rhai extension sandbox — capability-based security for Editor.Land extensions."
---

# Grove

Grove is the WebAssembly and Rhai extension host for Editor.Land. Where
Cocoon runs VS Code extensions in a Node.js process, Grove runs extensions
compiled to WebAssembly (inside WASMtime) or written in
[Rhai](https://rhai.rs) script — both with capability-based security, so
that an extension can only touch resources explicitly granted to it at the
runtime level.

Grove is in active development. The gRPC protocol definitions (`Proto/`),
WASMtime host (`Source/Host/`), API surface (`Source/API/`), transport layer
(`Source/Transport/`), and service registrations (`Source/Services/`) are
already implemented. Full integration with the primary `debug-mountain` build
is the remaining step.

---

## The Problem Grove Solves

VS Code extensions run with full Node.js capabilities in a shared process. A
malicious extension can read the file system, make network requests, and access
other extensions' state. The "extension sandbox" is a policy document, not a
technical boundary.

This coupling also means users have no way to verify what an extension
actually does at runtime. Trust is all-or-nothing.

---

## How Grove Addresses It

Grove runs extensions inside WASMtime with capability-based security. An
extension can only touch resources explicitly granted to it: a specific
directory, a network endpoint, a named IPC channel. No implicit ambient
authority. The WASM sandbox is a technical boundary enforced by the runtime,
not a policy document.

This is the same model mobile operating systems use: iOS and Android grant
permissions per-app, per-resource, at install time or on first use. Grove
brings that model to editor extensions.

For extensions that do not need WASM compilation, Grove also supports
[Rhai](https://rhai.rs) — a lightweight, embeddable scripting language written
in Rust. Rhai extensions run inside the same capability sandbox without
requiring a WASM toolchain.

---

## Source Structure

All confirmed present in the
[Grove repository](https://github.com/CodeEditorLand/Grove):

| Path | Role |
|---|---|
| `Source/API/` | Public API surface exposed to hosted extensions |
| `Source/Binary/` | Binary entry point |
| `Source/Common/` | Shared types and utilities |
| `Source/DevLog.rs` | Development logging (~10 KB) |
| `Source/Host/` | WASMtime host implementation |
| `Source/Protocol/` | Protocol definitions for host–guest communication |
| `Source/Services/` | Service registrations inside the sandbox |
| `Source/Transport/` | Transport layer for IPC between Grove and Mountain |
| `Source/WASM/` | WASM runtime integration |
| `Source/lib.rs` | Crate root re-exports |
| `Source/main.rs` | Entry point (~8 KB) |
| `Proto/` | gRPC `.proto` definitions for Grove–Mountain protocol |
| `Tests/` | Integration tests |
| `build.rs` | Cargo build script |

---

## What Grove Enables

When Grove is fully integrated, an extension marketplace with meaningful
security guarantees becomes possible. Users will be able to install extensions
with knowledge of exactly what resources each one can access. The sandbox is
enforced by WASMtime or the Rhai runtime, not by trust in the extension author.

Extension authors targeting Grove declare capabilities in their manifest.
WASM-compiled extensions use the WASMtime host; Rhai extensions use the
embedded Rhai engine. Both share the same capability grant model.

---

## Key Technologies

Rust, WASMtime, WebAssembly, Rhai, gRPC, Capability-Based Security.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Source Code](https://github.com/CodeEditorLand/Grove)
