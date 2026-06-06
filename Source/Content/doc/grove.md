---
title: "Grove"
section: "Element"
order: 18
description:
    "The Wasmtime extension-host path - capability-based security for
    land.playform.cloud extensions."
---

# Grove

`Grove` is the `WebAssembly` extension-host path for `land.playform.cloud`.
Where `Cocoon` runs `VS Code` extensions in a `Node.js` process, `Grove`
contains a Wasmtime-backed path for extensions compiled to `WebAssembly` with
capability-oriented boundaries.

`Grove` is WIP in the primary editor flow. The `gRPC` protocol definitions
(`Proto/`), Wasmtime host (`Source/Host/`), `API` surface (`Source/API/`),
transport layer (`Source/Transport/`), service registrations
(`Source/Services/`), and `WASM` runtime integration (`Source/WASM/`) are
present in source. Full integration with the primary `debug-mountain` build is
still in progress.

---

## The Problem Grove Solves

`VS Code` extensions run with broad `Node.js` capabilities in a shared process.
`Grove` is the path for extensions that can trade raw Node compatibility for a
runtime boundary with explicit capabilities.

---

## How Grove Addresses It

`Grove` uses Wasmtime as its `WebAssembly` runtime. The host can grant specific
resources to a module instead of giving ambient access to the whole system. That
model is useful for a future extension marketplace where permissions can be
shown to users before code runs.

This is real source, but it is not the current compatibility story for existing
`VS Code` extensions. `Cocoon` remains the active unmodified-extension path.

---

## Source Structure 🗺️

Confirmed present in the `Grove` source tree:

| Path                | Role                                                  |
| ------------------- | ----------------------------------------------------- |
| `Source/API/`       | Public API surface exposed to hosted extensions       |
| `Source/Binary/`    | Binary entry point                                    |
| `Source/Common/`    | Shared types and utilities                            |
| `Source/Host/`      | Wasmtime host implementation                          |
| `Source/Protocol/`  | Protocol definitions for host-guest communication     |
| `Source/Services/`  | Service registrations inside the sandbox              |
| `Source/Transport/` | Transport layer for IPC between Grove and Mountain    |
| `Source/WASM/`      | WASM runtime integration                              |
| `Proto/`            | gRPC `.proto` definitions for Grove-Mountain protocol |
| `Tests/`            | Integration tests                                     |
| `build.rs`          | Cargo build script                                    |

---

## What Grove Enables

When `Grove` is fully integrated, an extension marketplace with stronger
security guarantees becomes possible. Users should be able to see what resources
an extension can access, and `Grove` can enforce that through Wasmtime and
explicit capability grants.

---

## Status 🚀

`Grove` is in active development and is not a shipped replacement for `Cocoon`.
It is source-backed work in progress.

---

## Key Technologies

`Rust`, Wasmtime, `WebAssembly`, `gRPC`, Capability-Based Security.

---

## Related Documentation 📖

- [Architecture Overview](https://land.playform.cloud/Doc/architecture)
- [`Cocoon`: Extension Host](https://land.playform.cloud/Doc/cocoon)
- [Source Code](https://github.com/CodeEditorLand/Grove)
