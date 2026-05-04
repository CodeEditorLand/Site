---
title: "Introduction"
section: "Start"
order: 0
description: "What Editor.Land is, how it is built, and what it can do today."
---

# Introduction to Editor.Land

Editor.Land is an open-source desktop code editor built on
[Tauri](https://tauri.app) and a Rust kernel. It runs the VS Code extension
ecosystem on a native substrate that does not use Electron or a bundled
Chromium engine.

It is **not a fork of VS Code**. The editor's native kernel (Mountain) is
written in Rust. The workbench UI (Sky) is written in TypeScript with Astro
and React, running inside a WKWebView on macOS and WebView2 on Windows. It
implements the VS Code Extension API so that extensions such as GitLens,
Roo-Cline, and TypeScript Language Features activate and run without
modification.

---

## Current Status

Editor.Land builds and runs on **macOS and Windows** today. The following is a
factual account of verified capabilities.

### What works today

These capabilities are verified by build and agent run logs:

- The editor boots on macOS in approximately 3 seconds (wall-clock, from
  launch to fully usable with 47 extensions active), using around 600 MB of
  RAM (Mountain ~280 MB + Cocoon ~320 MB).
- The editor **builds and installs on Windows** using the standard build
  workflow. WebView2-based rendering is active on Windows builds.
- Cocoon (the Node-based extension host) activates 47 extension manifests in
  parallel using an 8-wide worker pool (`Parallel8` in
  `TierExtensionActivation`).
- The following VS Code APIs work in the `debug-mountain` profile:
  `workspace.fs.*`, `workspace.findFiles`, `window.createTerminal`,
  `languages.register*Provider`, `commands.executeCommand`,
  `debug.startDebugging` via Mountain's DAP bridge.
- File system operations route through Mountain's Rust kernel via Tauri IPC.
  Cached reads return at ~8 ms p99 latency; cold reads at ~60 ms p99.
- Mountain and Cocoon communicate over gRPC using Vine.proto
  (approximately 825 lines of hand-written protobuf schema).

### What is in progress

- `vscode.lm.*`, `vscode.chat.*`, `vscode.notebook.*`, and `vscode.tests.*`
  are not yet implemented. Extensions that use these APIs will activate but the
  relevant features will silently no-op.
- `vscode.tasks.*` is partially implemented; the workbench task resolver is
  in progress.
- Linux support is in progress.
- Auto-update flow and a public installer package are in progress.

---

## Architecture

Stock VS Code runs six concurrent processes on a typical macOS session:
Electron main, renderer, extension host, pty host, file watcher, and shared
process. Editor.Land currently runs two: Mountain (Rust) and Cocoon (Node).

Running two processes instead of six gives Land roughly **25% lower RSS** on
identical workloads (~600 MB vs ~810 MB for VS Code with the same 47
extensions). The tradeoff is that all work runs inside Mountain until a
component grows large enough to warrant splitting into a dedicated sidecar
process. Planned splits include a PtyHost sidecar (so terminal sessions survive
editor restarts), a Watcher sidecar (so inotify/FSEvents fan-out does not
crowd Mountain's main loop), and a Search sidecar (to offload ripgrep from the
main Rust binary).

Cold-boot time to **first paint** is approximately **2.4 seconds** on Apple
Silicon with 47 extensions - competitive with VS Code (approximately 2.5
seconds) on the same hardware. Wall-clock time to fully usable (all
extensions activated) is approximately 3 seconds. The build is already fast;
further improvements are in progress: switching to a single bundled output
is projected to save approximately 550 ms, and lazy-spawning Cocoon after
first paint saves a further ~200 ms. Combined, these two changes are
projected to bring cold-boot to first paint to approximately **1.65 seconds**.

---

## Design Constraint

Every architectural decision in Editor.Land is constrained by one
non-negotiable requirement: **the VS Code Extension API must continue to
work**. Land is not building a replacement for that API; it is building a
better runtime substrate for the API that already exists.

This matters for contributors and users alike. Contributors do not need to
learn a new extension model. Users do not need to migrate their installed
extensions. The bet is that a Rust kernel, a typed gRPC IPC layer, native
OS-level file watching, and a work-stealing task scheduler can deliver
measurably better performance on the same API surface - without requiring
the extension ecosystem to change.

---

## The Elements

Editor.Land is composed of named elements. The table below covers the nine
core active elements. Additional elements (Grove, Mist, Worker, SideCar,
Maintain, Rest) are planned or in progress - see the
[Architecture Overview](/Doc/architecture) for the complete status table.

| Element | Language | Role |
|---|---|---|
| **Mountain** | Rust + Tauri | Native kernel: file system, gRPC server, terminal pty, IPC broker |
| **Cocoon** | TypeScript / Node | Extension host: activates VS Code extensions via the `vscode.*` API |
| **Sky** | Astro + React | Workbench UI: the editor interface rendered in WKWebView / WebView2 |
| **Wind** | TypeScript | Effect-TS service layer: typed service interfaces consumed by Sky |
| **Air** | Rust | Background daemon: update checks, file downloads, network calls |
| **Echo** | Rust | Work-stealing task scheduler: parallel job dispatch inside Mountain |
| **Vine** | Protobuf | Wire protocol: the gRPC schema used between Mountain and Cocoon |
| **Output** | TypeScript / OXC | Build pipeline: transforms and bundles workbench source |
| **Common** | Rust / TypeScript | Shared types: IPC event definitions shared across process boundaries |

---

## Build Profiles

Three build profiles exist for different development scenarios:

- **`debug`** - Browser-only. The workbench opens as a web app with no native
  kernel. File system, terminal, and extension APIs that require Mountain are
  unavailable. Used for UI iteration without a Rust build.
- **`debug-mountain`** - Full native mode. Mountain runs as a Tauri desktop
  application, Cocoon spawns as the extension host, and the full supported
  extension API surface is active. This is the primary development target
  and the recommended build for contributors on macOS and Windows.
- **`debug-electron`** - Electron wrapper (legacy). Exists for compatibility
  testing against the Electron-based VS Code host. Not actively maintained.

---

## Project Status

This documentation reflects the project as it currently stands. Performance
numbers are sourced from build logs and profiler output; they will differ
across hardware configurations. Features listed as in-progress are actively
being developed.

The source files for this documentation are in the
[CodeEditorLand/Land](https://github.com/CodeEditorLand/Land)
repository. If something here is incorrect or outdated, open an issue or a
pull request.

---

## See Also

- [Getting Started](/Doc/getting-started)
- [Architecture Overview](/Doc/architecture)
- [Mountain](/Doc/mountain)
- [Cocoon](/Doc/cocoon)
