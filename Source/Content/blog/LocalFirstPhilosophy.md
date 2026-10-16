---
title: "Local-First Philosophy"
summary:
    "How Land keeps the editor path local-first while sync and portal features
    stay explicit."
publishedAt: "2026-04-02"
tags: ["Local-First", "Architecture", "Privacy"]
author: "CodeEditorLand"
readTime: 3
---

# Local-First Philosophy

[Land](https://github.com/CodeEditorLand/Land)'s editor direction is local-first: the core editor should remain useful
without a portal account or cloud sync. That is different from saying every
planned sync feature is already shipped.

## What Local-First Means architecturally

"Local-first" is not a marketing term here. It is a design constraint that
shapes every architectural decision:

- **[Mountain](https://github.com/CodeEditorLand/Mountain)** owns native file, terminal, process, clipboard, IPC, and
  extension integration paths -- all local OS operations, no network dependency.
- **[Cocoon](https://github.com/CodeEditorLand/Cocoon)** runs installed `VS Code` extensions without rewriting their source
  when the APIs they use are implemented.
- **[Air](https://github.com/CodeEditorLand/Air)** contains background service code for updates, downloads,
  authentication, indexing, health, security, and [`Vine`](https://github.com/CodeEditorLand/Vine) IPC.

The editor opens a native window (`Tauri`), loads the workbench UI ([`Sky`](https://github.com/CodeEditorLand/Sky) in the
OS WebView), starts the extension host ([`Cocoon`](https://github.com/CodeEditorLand/Cocoon) over [`Vine`](https://github.com/CodeEditorLand/Vine) gRPC), and is fully
functional. No account, no network, no cloud round-trip required to open a file,
run a terminal, or activate extensions.

## The Network Boundary

[`Mist`](https://github.com/CodeEditorLand/Mist) runs a loopback DNS server for the [`editor.land`](https://github.com/CodeEditorLand/Land) private zone: every
`*.editor.land` name resolves to `127.0.0.1`, and a forward allowlist admits
only explicitly permitted hosts (such as `update.editor.land`); all other
queries are refused. DNSSEC signing is planned, not yet active. The point is
intentional: network-dependent features are isolated at the service boundary.
Core editing never depends on them.

[`Air`](https://github.com/CodeEditorLand/Air)'s background services (updates, downloads, auth, indexing, health) are
profile-dependent. Whether Air is part of a given build depends on the selected
profile and feature flags. The default development configuration makes the
editor functional without any remote service.

## Source-Backed Today

Here is what works right now without any network dependency:

- [`Mountain`](https://github.com/CodeEditorLand/Mountain) provides native-speed file I/O, process management (PTY for
  integrated terminal), clipboard access, search, and configuration persistence.
  Extension workspace state and global state are stored via [`Mountain`](https://github.com/CodeEditorLand/Mountain)'s
  `storage:get` / `storage:set` IPC handlers. Extension secrets are encrypted
  with AES-256-GCM using a machine-stable key derived from the hardware UUID;
  nothing is ever written to disk in plaintext.
- [`Cocoon`](https://github.com/CodeEditorLand/Cocoon) activates extensions from disk. The `vscode` API object is built with
  [Effect-TS](https://effect.website), with privileged calls proxied to [`Mountain`](https://github.com/CodeEditorLand/Mountain) via gRPC.
- [`Grove`](https://github.com/CodeEditorLand/Grove) hosts `Rust`/`WASM` extensions inside a `WASMtime` sandbox with
  capability-based isolation, sharing the same `VS Code` API surface as
  [`Cocoon`](https://github.com/CodeEditorLand/Cocoon).
- [`Wind`](https://github.com/CodeEditorLand/Wind) runs the workbench services in the Tauri WebView, routing UI requests
  through typed Tauri commands into Rust handlers.
- [`Sky`](https://github.com/CodeEditorLand/Sky) renders the UI components driven by [`Wind`](https://github.com/CodeEditorLand/Wind)'s state.
- [`Rest`](https://github.com/CodeEditorLand/Rest) compiles the VS Code platform code from the `Dependency/Editor`
  submodule with its Rust-native OXC pipeline (parser, transformer, codegen).
- [`Output`](https://github.com/CodeEditorLand/Output) ships the bundled JavaScript artifacts that [`Cocoon`](https://github.com/CodeEditorLand/Cocoon) loads.
- [`Echo`](https://github.com/CodeEditorLand/Echo) provides the work-stealing task scheduler for bounded background work.

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
building the network-dependent features as optional layers ([`Air`](https://github.com/CodeEditorLand/Air), [`Mist`](https://github.com/CodeEditorLand/Mist),
portal services) on top of a fully local core ([`Mountain`](https://github.com/CodeEditorLand/Mountain), [`Cocoon`](https://github.com/CodeEditorLand/Cocoon), [`Wind`](https://github.com/CodeEditorLand/Wind),
[`Sky`](https://github.com/CodeEditorLand/Sky)), [Land](https://github.com/CodeEditorLand/Land) keeps the promise: the editor is yours, on your machine, regardless
of network state.

Local-first is the design constraint. Portal and cloud sync surfaces are in
development and not yet available in the editor.
