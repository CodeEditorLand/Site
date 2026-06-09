---
title: "Why WebAssembly"
section: "Technology"
order: 31
description: "Capability-based extension isolation through a runtime boundary."
---

# Why WebAssembly

Extensions are the most sensitive third-party code a code editor runs. They can
touch files, spawn tools, open network connections, and react to workspace
state. `Grove` is Land's WIP path for extensions that can run inside a
`WebAssembly` runtime instead of broad `Node.js` access.

The [`Grove`](https://editor.land/Doc/grove) source contains a Wasmtime
host, `gRPC` protocol definitions, `API` surface, transport layer, and `WASM`
runtime integration. The primary `VS Code` extension compatibility path remains
`Cocoon`.

---

## Runtime-Enforced Isolation

`WebAssembly` modules run in linear memory allocated by the host. A module
cannot read the host heap or another module's memory through normal execution.
That runtime boundary gives `Grove` a stronger starting point than policy-only
checks.

---

## Capability-Based Security

Wasmtime supports explicit resource grants. A host can decide which directories,
environment values, network endpoints, or `IPC` channels a module receives. If a
capability is not granted, the module should not see that resource.

End-to-end capability enforcement is still a WIP product path. `Grove` is a
source-backed integration effort; release profiles and tests will validate the
full behavior.

---

## Resource Controls

`Grove` is the right place for memory ceilings, CPU budgets, and interruption.
Wasmtime supports mechanisms that make those controls possible, but budget
controls are in active development and have not been verified in the active
build.

---

## Grove And Cocoon Together

`Cocoon` runs unmodified `VS Code` extension code today. `Grove` is for future
extensions that prioritize isolation and explicit capabilities. The two hosts
serve different needs and are not interchangeable.

---

## See Also

- [Architecture Overview](https://editor.land/Doc/architecture)
- [`Grove`](https://editor.land/Doc/grove)
- [Why `Rust`](https://editor.land/Doc/why-rust)
- [`Cocoon`: Extension Host](https://editor.land/Doc/cocoon)
