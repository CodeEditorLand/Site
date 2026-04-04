---
title: "Architecture Overview"
section: "Architecture"
order: 1
description: "How the 15 Elements fit together to form the Land editor."
---

# Architecture Overview

Code Editor Land is structured as 15 independent Elements - self-contained Rust
crates and TypeScript packages that each handle a specific concern.

## Layer 1 - Native Shell

| Element      | Role                                                |
| ------------ | --------------------------------------------------- |
| **Mountain** | Window, file system, and process management (Tauri) |
| **Air**      | Update, download, and crypto signing daemon         |

## Layer 2 - IPC

| Element  | Role                                         |
| -------- | -------------------------------------------- |
| **Vine** | gRPC protocol definitions and implementation |
| **Mist** | WebSocket communication layer                |

## Layer 3 - Extension Host

| Element    | Role                                  |
| ---------- | ------------------------------------- |
| **Cocoon** | Runs VS Code extensions via Effect-TS |
| **Grove**  | Native WASM and Rhai extension host   |
| **Worker** | Web Workers for frontend tasks        |

## Layer 4 - UI

| Element  | Role                                       |
| -------- | ------------------------------------------ |
| **Wind** | Re-implementation of the VS Code Workbench |
| **Sky**  | Astro UI component layer                   |

## Layer 5 - Build Toolchain

| Element      | Role                                              |
| ------------ | ------------------------------------------------- |
| **Rest**     | JS bundler for VS Code platform code (OXC-based)  |
| **Output**   | Bundled JS artifacts produced by Rest             |
| **SideCar**  | Pre-built Node.js binaries for cross-platform use |
| **Maintain** | CI/CD and maintenance scripts                     |

## Data Flow

```
User interaction
  → Mountain (native window event)
  → Vine (gRPC IPC)
  → Cocoon (extension host)
  → Wind (workbench state)
  → Sky (render)
```
