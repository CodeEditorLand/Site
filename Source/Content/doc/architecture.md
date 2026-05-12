---
title: "Architecture Overview"
section: "Architecture"
order: 4
description:
    "How Editor.Land's elements fit together: Mountain, Cocoon, Sky, Air, and
    typed IPC."
---

# Architecture Overview

Editor.Land is split into named elements so the public architecture can be
checked against source instead of guessed from a diagram. The primary desktop
path is Mountain, the Rust + Tauri shell, running Sky in the operating system
WebView and Cocoon as the Node.js extension host.

Air contains background service code for downloads, updates, authentication,
indexing, health, and Vine IPC. Whether Air is part of a given build depends on
the selected profile and feature flags.

The Mountain desktop path does not bundle Chromium. Tauri uses WKWebView on
macOS, WebView2 on Windows, and WebKitGTK on Linux. The repository contains
cross-platform configuration, while public installers and full platform
verification are still release work.

Public performance numbers are intentionally not listed here until there is a
published, repeatable benchmark suite. The source supports the architectural
claim: native Rust services, typed IPC, no bundled Chromium in the Tauri path,
and a separate extension host.

---

## IPC Channels

The architecture has two main communication paths.

**Sky to Mountain - Tauri IPC**

Sky's UI and Wind service layer call Mountain through Tauri IPC. The Mountain
implementation lives in `Source/IPC/TauriIPCServer.rs`, including the
`mountain_ipc_receive_message` and `mountain_ipc_get_status` entry points. This
path handles native work such as files, terminals, clipboard, search,
configuration, and workbench events.

**Mountain to Cocoon - Vine gRPC**

Mountain and Cocoon communicate over a bidirectional gRPC protocol described by
Vine proto files. Mountain owns the Rust-side services and Cocoon owns the
TypeScript-side extension-host services. The protocol covers extension-host
startup, document notifications, language providers, tree views, command
execution, cancellation, and streaming routes where implemented.

These paths are independent enough that the website should not describe every
service call as flowing through one universal bus. Tauri IPC, Vine gRPC, and
local service code each have their own job.

---

## Startup Shape

Mountain's startup path is organized around build, registration, initialization,
and services:

```text
main.rs -> Binary::Main -> Build -> Register -> Initialize -> Services
```

`Build` configures the Tauri application. `Register` wires commands and IPC.
`Initialize` prepares runtime state. `Services` starts the Vine and Cocoon paths
before the Tauri event loop owns the desktop session.

---

## Extension Path

Cocoon is the active VS Code extension-host compatibility path. It loads
existing extension entry points, supplies a `vscode` API object, and routes
implemented API calls through Effect-TS services and Mountain.

Mountain scans installed extensions, reads manifests, handles VSIX install and
uninstall routes, and notifies Cocoon with extension changes. Output keeps the
VS Code extension scanner and offline gallery channels wired for sideloaded
extensions.

That supports this claim: installed VS Code extensions run unmodified through
the Cocoon path when the APIs they use are implemented. The website should not
claim marketplace-wide perfection unless it points to a public validation
matrix.

---

## Elements By Layer

| Element                       | Role                                                                   | Source status                           |
| ----------------------------- | ---------------------------------------------------------------------- | --------------------------------------- |
| [**Mountain**](/Doc/mountain) | Rust + Tauri desktop shell, native services, IPC broker, Cocoon bridge | Primary desktop path                    |
| [**Cocoon**](/Doc/cocoon)     | Node.js extension host for unmodified VS Code extension code           | Primary extension path                  |
| [**Sky**](/Doc/sky)           | Astro workbench routes and WebView bridge                              | UI source present                       |
| [**Wind**](/Doc/wind)         | Effect-TS workbench service layer                                      | UI service source present               |
| [**Vine**](/Doc/vine)         | Protocol contracts and generated IPC stubs                             | Active protocol layer                   |
| [**Air**](/Doc/air)           | Background services for updates, downloads, auth, indexing, and health | Source present, profile-dependent       |
| [**Echo**](/Doc/echo)         | Rust scheduler primitives for bounded background work                  | Source present                          |
| [**Mist**](/Doc/mist)         | Local DNS, resolver, WebSocket, and secure service-boundary code       | Source present, integration in progress |
| [**Grove**](/Doc/grove)       | Wasmtime-backed WebAssembly host path                                  | Source present, integration in progress |
| [**Rest**](/Doc/rest)         | OXC-based TypeScript transform work                                    | Source present                          |
| [**Output**](/Doc/output)     | Plugin-routed output and VS Code platform transforms                   | Build pipeline source present           |
| [**Common**](/Doc/common)     | Shared Rust and TypeScript contracts                                   | Shared source present                   |
| [**SideCar**](/Doc/sidecar)   | Host-specific sidecar binary packaging                                 | Source present                          |
| [**Maintain**](/Doc/maintain) | Build and maintenance scripts                                          | Source present                          |
| **Worker**                    | Browser-worker support for web shell concerns                          | Source present, release scope varies    |

---

## Platform Targets

Mountain's Tauri configuration includes macOS, Windows, Linux, iOS, and Android
target settings. The default development configuration is not the same thing as
published installer coverage, so the website should say "configured" unless a
release artifact is actually available.

| Platform | Source status                                                          |
| -------- | ---------------------------------------------------------------------- |
| macOS    | Primary development target and Tauri bundle path                       |
| Windows  | Tauri configuration exists, including WebView2 bootstrapper settings   |
| Linux    | Tauri configuration exists, integration still needs release validation |
| iOS      | Tauri mobile configuration exists                                      |
| Android  | Tauri mobile configuration exists                                      |

---

## Security Model

Mountain's configuration declares custom schemes such as `land:`,
`vscode-file:`, and `vscode-webview:`. Extension webviews should be described as
isolated through the WebView and scheme model, not as a finished universal
sandbox for all extension behavior.

Grove adds a WebAssembly host path with Wasmtime and capability-oriented
modules. That is real source, but it is not the primary VS Code extension path
today. Cocoon remains the active compatibility host.

---

## Extension API Notes

Implemented and routed APIs include core workbench and extension-host surfaces
such as commands, workspace, window, terminals, webviews, tree views,
diagnostics, language providers, output channels, and document events.

Long-tail areas such as chat, language-model APIs, notebooks, tests, and some
custom-editor cases should be presented as in progress unless their behavior is
verified in source and in a runnable scenario.
