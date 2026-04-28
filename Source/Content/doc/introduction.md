---
title: "Introduction"
section: "Start"
order: 0
description: "What Editor.Land is, what works today, and what is not yet implemented."
---

# Introduction to Editor.Land

Editor.Land is an open-source desktop code editor built on
[Tauri](https://tauri.app) and a Rust kernel. It runs the VS Code extension
ecosystem on a native substrate that does not use Electron or a bundled
Chromium engine.

It is **not a fork of VS Code**. The editor's native kernel (Mountain) is
written in Rust. The workbench UI (Sky) is written in TypeScript with Astro
and React, running inside a WKWebView on macOS. It implements the VS Code
Extension API so that extensions such as GitLens, Roo-Cline, and TypeScript
Language Features activate and run without modification.

---

## Current Status

Editor.Land is in active development and is **not yet a general-release
product**. The following is a factual account of what is and is not working.

### What works today

These capabilities are verified by build and agent run logs:

- The editor boots on macOS in approximately 3 seconds (wall-clock, from
  launch to fully usable with 47 extensions active), using around 600 MB of
  RAM (Mountain ~280 MB + Cocoon ~320 MB).
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

### What is not yet implemented

- `vscode.lm.*`, `vscode.chat.*`, `vscode.notebook.*`, and `vscode.tests.*`
  are not implemented. Extensions that use these APIs will activate but the
  relevant features will silently no-op.
- `vscode.tasks.*` is partially implemented; the workbench task resolver is
  missing.
- Windows and Linux are not yet supported. macOS is the only tested platform.
- A public installer, release build, and auto-update flow are in progress.

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
Silicon with 47 extensions, versus approximately 2.5 seconds for VS Code on
the same hardware. Wall-clock time to fully usable (all extensions activated)
is approximately 3 seconds. The largest single cost in Land's boot is a
sequential dynamic-import loop that loads 3,385 workbench modules one at a
time; switching to a single bundled output is projected to save approximately
550 ms. Lazy-spawning Cocoon after first paint saves a further ~200 ms.
Combined, those two changes are projected to bring cold-boot to first paint to
approximately **1.65 seconds**.

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
| **Sky** | Astro + React | Workbench UI: the editor interface rendered in WKWebView |
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
  extension API surface is active. This is the primary development target.
- **`debug-electron`** - Electron wrapper (legacy). Exists for compatibility
  testing against the Electron-based VS Code host. Not actively maintained.

---

## Transparency Note

This documentation describes the project as it is, not as we would like it
to be. Numbers are sourced from build logs and profiler output on Apple Silicon
hardware; they will differ on other machines. Features listed as unimplemented
are unimplemented - we will update this page when they land.

The source files for this documentation are in the
[NikolaRHristov/CodeEditorLand](https://github.com/NikolaRHristov/CodeEditorLand)
repository. If something here is wrong, open an issue or a pull request.

---

## See Also

- [Getting Started](/Doc/getting-started)
- [Architecture Overview](/Doc/architecture)
- [Mountain](/Doc/mountain)
- [Cocoon](/Doc/cocoon)
