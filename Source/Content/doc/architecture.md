---
title: "Architecture Overview"
section: "Architecture"
order: 4
description: "How Editor.Land's elements fit together: two processes, two IPC channels, one extension API."
---

# Architecture Overview

Editor.Land runs as **two processes** on a typical macOS session: Mountain (the
Rust kernel) and Cocoon (the Node.js extension host). A third background process,
Air, handles updates and downloads independently. The editor UI (Sky) runs
inside WKWebView as part of Mountain's Tauri application - it is not a
separate process.

This is a significant structural difference from VS Code, which runs six
concurrent processes on the same workload (main, renderer, extension host, pty
host, file watcher, shared process). The resource comparison on a 47-extension
workload on Apple Silicon macOS: Land ~600 MB RSS versus VS Code ~810 MB RSS.

---

## Two IPC Channels

The architecture has two distinct inter-process communication paths:

**Channel 1: Sky ↔ Mountain (Tauri IPC)**
Sky's UI components call Wind service interfaces. Wind routes native calls
(file reads, terminal spawn, clipboard, configuration) through Tauri's typed
IPC to Mountain. This is the primary path for all user-initiated actions in
the editor UI.

**Channel 2: Mountain ↔ Cocoon (gRPC / Vine)**
Mountain runs a gRPC server. Cocoon connects as the gRPC client when it
spawns. All communication between the extension host and the native kernel
goes through the Vine protocol (~825 lines of hand-written protobuf schema).
This is the path for extension API calls that require native OS access.

These two channels are independent. A slow Cocoon operation does not block
Sky's Tauri IPC calls to Mountain, and vice versa.

---

## Data Flow

Two representative paths through the system:

**User types a character (UI path):**
```
Keypress in Sky (WKWebView)
  → Wind Layer (Effect-TS, in-process)
  → Tauri IPC → Mountain (Rust)
  → Mountain notifies Cocoon via Vine gRPC
  → Cocoon fires onDidChangeTextDocument handlers in extension fibers
  → Extension results return via Vine → Mountain → Tauri IPC → Sky re-renders
```

**Extension calls vscode.workspace.fs.readFile (extension API path):**
```
Cocoon (Node.js fiber)
  → Vine gRPC → Mountain (Rust)
  → Mountain reads file via Rust FS layer (~8 ms p99 cached, ~60 ms p99 cold)
  → Response returns via Vine → Cocoon resolves the Thenable
```

---

## Elements by Layer

Elements are grouped by architectural layer. The **Status** column reflects
the current development state honestly: Active means verified working in the
`debug-mountain` profile; In Progress means partially implemented; Planned
means the repo exists and the design is defined but production use is not
yet confirmed.

### Layer 1 - Native Shell

| Element | Language | Role | Status |
|---|---|---|---|
| [**Mountain**](/Doc/mountain) | Rust + Tauri | Native kernel: file system, gRPC server, terminal pty, DAP bridge, IPC broker | Active |
| [**Air**](/Doc/air) | Rust | Background daemon: update checks, downloads, release signing | In Progress |

### Layer 2 - IPC

| Element | Language | Role | Status |
|---|---|---|---|
| [**Vine**](/Doc/vine) | Protobuf | gRPC schema and generated stubs for Mountain↔Cocoon communication | Active |
| **Mist** | Rust | WebSocket communication layer | Planned |

### Layer 3 - Extension Host

| Element | Language | Role | Status |
|---|---|---|---|
| [**Cocoon**](/Doc/cocoon) | TypeScript / Node | Runs VS Code extensions via `vscode.*` API on Effect-TS fibers | Active |
| **Grove** | Rust | WASM and Rhai extension host (alternative to Cocoon for non-Node extensions) | Planned |
| **Worker** | TypeScript | Web Workers for frontend parallel tasks | Planned |

### Layer 4 - UI

| Element | Language | Role | Status |
|---|---|---|---|
| [**Wind**](/Doc/wind) | TypeScript | Effect-TS service layer: typed workbench interfaces consumed by Sky | Active |
| [**Sky**](/Doc/sky) | Astro + React | Workbench UI: the editor interface rendered in WKWebView | Active |

### Layer 5 - Build Toolchain

| Element | Language | Role | Status |
|---|---|---|---|
| [**Rest**](/Doc/rest) | Rust / OXC | Transforms and bundles VS Code platform code (NLS, loader shims, workbench modules) | Active |
| **Output** | JavaScript | Build artifact directory produced by Rest; not a running process | Active |
| **Common** | Rust / TypeScript | Shared IPC event type definitions used across Mountain and Cocoon | Active |
| **SideCar** | Cross-platform | Pre-built Node.js binaries for Cocoon's extension host on each target platform | In Progress |
| **Maintain** | Shell / Build tooling | CI/CD scripts, release automation, workspace maintenance | Active |

---

## The Nine Active Elements

Of the fifteen elements listed above, nine are active in the primary
development path today: Mountain, Cocoon, Sky, Wind, Vine, Echo, Air, Rest,
and Common. The remaining six (Mist, Grove, Worker, SideCar, Output, Maintain)
exist as defined components with repositories but are either build artifacts,
planned capabilities, or support tooling rather than active runtime elements.

Echo is not listed in its own layer above because it is embedded inside
Mountain's binary rather than running as a separate process. See
[Echo](/Doc/echo) for details.

---

## Current Constraints

- **macOS only.** Mountain's WKWebView integration is complete. Windows
  (WebView2) and Linux (WebKitGTK) are planned but not yet implemented.
- **Two-process topology today, more planned.** Mountain currently runs as a
  monolith. Planned sidecar splits (PtyHost, Watcher, Search) will expand the
  process count as each component warrants isolation.
- **API gaps.** `vscode.lm.*`, `vscode.chat.*`, `vscode.notebook.*`, and
  `vscode.tests.*` are not yet implemented in Cocoon. Extensions using these
  APIs activate but the features silently no-op.

---

## See Also

- [Introduction](/Doc/introduction)
- [Mountain: Native Kernel](/Doc/mountain)
- [Cocoon: Extension Host](/Doc/cocoon)
- [Vine: Wire Protocol](/Doc/vine)
- [Local-First Protocol](/Doc/local-first-protocol)
