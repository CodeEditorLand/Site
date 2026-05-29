---
title: "Introduction"
section: "Start"
order: 0
description:
    "What Editor.Land is, how it is built, and what is source-backed today."
---

# Introduction to Editor.Land

`Editor.Land` is an open-source code editor stack built around `Rust`, `Tauri`,
`Effect-TS`, and a `VS Code`-compatible extension host. `Mountain` is the
`Rust` + `Tauri` desktop shell. `Sky` and `Wind` provide the `workbench` UI and
service layer. `Cocoon` runs unmodified `VS Code` extension entry points through
a `vscode` `API` shim where the `API` surface is implemented.

The project is source-build first today. Public installers, release signing, and
a full extension validation matrix are still in progress.

---

## Current Status

The source supports these claims:

- `Mountain` provides the `Tauri` desktop shell, native services, `IPC`, and
  `Cocoon` bridge.
- `Cocoon` runs existing `VS Code` extension entry points without rewriting
  their source when the `APIs` they use are implemented.
- `Mountain` scans installed extensions, reads manifests, handles local VSIX
  install and uninstall routes, and notifies `Cocoon` when extension state
  changes.
- `Vine` provides `.proto` contracts and generated `IPC` stubs for routes such
  as `Mountain` to `Cocoon` and `Air` to `Mountain`.
- `Air` contains background service code for updates, downloads, integrity,
  authentication, indexing, health, and `Vine` `IPC`.
- `Grove` contains a Wasmtime-backed `WebAssembly` host path, but that path is
  WIP for the primary editor flow.

Performance numbers are intentionally left out until a repeatable public
benchmark suite is published.

---

## In Progress

- Public macOS, Windows, and Linux installer validation.
- Release signing and verification artifacts.
- Marketplace browsing and install flows beyond local or sideloaded extension
  sources.
- Chat, language-model, notebook, tests, and other long-tail `VS Code` `APIs`.
- `Grove` integration into the primary build.

---

## Elements

`Editor.Land` is composed of named elements. Each element should be described by
source status and integration status, not by broad product promises.

| Element      | Role                                                                           |
| ------------ | ------------------------------------------------------------------------------ |
| **Mountain** | Rust + Tauri desktop shell and native service host                             |
| **Cocoon**   | Node.js extension host for unmodified VS Code extension code                   |
| **Sky**      | Astro workbench routes and WebView bridge                                      |
| **Wind**     | Effect-TS workbench service layer                                              |
| **Vine**     | Protocol contracts and generated IPC stubs                                     |
| **Air**      | Background services for update, download, authentication, indexing, and health |
| **Echo**     | Rust scheduler primitives                                                      |
| **Mist**     | Local DNS and service-boundary work                                            |
| **Grove**    | WIP Wasmtime extension-host path                                               |
| **Rest**     | OXC-based TypeScript transform work                                            |
| **Output**   | Plugin-routed output and VS Code platform transforms                           |
| **Common**   | Shared Rust and TypeScript contracts                                           |
| **SideCar**  | Host-specific sidecar binary packaging                                         |
| **Maintain** | Build and maintenance scripts                                                  |
| **Worker**   | Browser-worker support where the web shell needs it                            |

---

## Build Profiles

- **`debug`** - browser-oriented UI development without the full `Mountain`
  desktop shell.
- **`debug-mountain`** - primary `Tauri` desktop development profile with
  `Mountain` and `Cocoon`.
- **`debug-electron`** - legacy compatibility path for comparison work.

---

## See Also

- [Getting Started](https://Editor.Land/Doc/getting-started)
- [Architecture Overview](https://Editor.Land/Doc/architecture)
- [`Mountain`](https://Editor.Land/Doc/mountain)
- [`Cocoon`](https://Editor.Land/Doc/cocoon)
