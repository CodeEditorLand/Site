---
title: "Local-First Philosophy"
summary:
    "How Land keeps the editor path local-first while sync and portal features
    stay explicit."
publishedAt: "2026-04-02"
tags: ["Local-First", "Architecture", "Privacy"]
author: "CodeEditorLand"
readTime: 5
---

# Local-First Philosophy

Land's editor direction is local-first: the core editor should remain useful
without a portal account or cloud sync. That is different from saying every
planned sync feature is already shipped.

## What Local-First Means architecturally

"Local-first" is not a marketing term here. It is a design constraint that
shapes every architectural decision:

- **Mountain** owns native file, terminal, process, clipboard, IPC, and
  extension integration paths -- all local OS operations, no network dependency.
- **Cocoon** runs installed `VS Code` extensions without rewriting their source
  when the APIs they use are implemented.
- **Air** contains background service code for updates, downloads,
  authentication, indexing, health, security, and `Vine` IPC.

The editor opens a native window (`Tauri`), loads the workbench UI (`Sky` in the
OS WebView), starts the extension host (`Cocoon` over `Vine` gRPC), and is fully
functional. No account, no network, no cloud round-trip required to open a file,
run a terminal, or activate extensions.

## The Network Boundary

`Mist` handles DNS isolation, resolver, and secure service-boundary code. It can
be implemented either as a native module within `Mountain` or as a separate
sidecar. The point is intentional: network-dependent features are isolated at
the service boundary. Core editing never depends on them.

`Air`'s background services (updates, downloads, auth, indexing, health) are
profile-dependent. Whether Air is part of a given build depends on the selected
profile and feature flags. The default development configuration makes the
editor functional without any remote service.

## Source-Backed Today

Here is what works right now without any network dependency:

- `Mountain` provides native-speed file I/O, process management (PTY for
  integrated terminal), clipboard access, search, and configuration persistence.
- `Cocoon` activates extensions from disk. The `vscode` API object is built with
  Effect-TS, with privileged calls proxied to `Mountain` via gRPC.
- `Wind` runs the workbench services in the Tauri WebView, routing UI requests
  through typed Tauri commands into Rust handlers.
- `Sky` renders the UI components driven by `Wind`'s state.
- `Rest` bundles the VS Code platform code from the `Dependency/Editor`
  submodule for `Cocoon` to consume at runtime.
- `Output` contains the bundled JavaScript artifacts that `Cocoon` loads.
- `Echo` provides the work-stealing task scheduler for bounded background work.

## Coming Soon

The following features require network and are explicitly separated from the
local-first core:

- Browser-to-daemon portal control
- Peer or cloud sync flows with documented transport and encryption
- Self-hosted marketplace and registry configuration
- Public release artifacts that name exactly which services are enabled

## Why This Architecture Matters

The local-first constraint forces honest answers about what the editor
fundamentally is. If the editor cannot function without a network connection, it
is not a local editor -- it is a terminal into someone else's machine. By
building the network-dependent features as optional layers (`Air`, `Mist`,
portal services) on top of a fully local core (`Mountain`, `Cocoon`, `Wind`,
`Sky`), Land keeps the promise: the editor is yours, on your machine, regardless
of network state.

The website should keep that constraint separate from unfinished product
features. Local-first is the design constraint. Portal and cloud sync surfaces
should be labeled as coming soon until the user-facing flow is complete.
