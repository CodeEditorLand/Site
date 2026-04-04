---
title: "Architecture Overview"
section: "Architecture"
order: 4
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

## Element Reference

| Element | Role | Language | Repository |
|---|---|---|---|
| Mountain | Native backend, Tauri app host | Rust | [Mountain](https://github.com/CodeEditorLand/Mountain) |
| Cocoon | VS Code extension host via Effect-TS | TypeScript | [Cocoon](https://github.com/CodeEditorLand/Cocoon) |
| Wind | VS Code Workbench re-implementation | TypeScript | [Wind](https://github.com/CodeEditorLand/Wind) |
| Sky | Editor interface renderer | Astro/TypeScript | [Sky](https://github.com/CodeEditorLand/Sky) |
| Air | Background daemon (updates, crypto) | Rust | [Air](https://github.com/CodeEditorLand/Air) |
| Echo | Work-stealing task executor | Rust | [Echo](https://github.com/CodeEditorLand/Echo) |
| Common | Abstract traits and DTOs | Rust | [Common](https://github.com/CodeEditorLand/Common) |
| Vine | gRPC protocol definition | Rust/Protobuf | [Vine](https://github.com/CodeEditorLand/Vine) |
| Rest | JS bundler (OXC-based) | Rust | [Rest](https://github.com/CodeEditorLand/Rest) |
| Output | Bundled JS artifacts | JavaScript | [Output](https://github.com/CodeEditorLand/Output) |
| Mist | WebSocket communication | Rust | [Mist](https://github.com/CodeEditorLand/Mist) |
| Grove | WASM/Rhai extension host | Rust | [Grove](https://github.com/CodeEditorLand/Grove) |
| Worker | Web Workers for frontend | TypeScript | [Worker](https://github.com/CodeEditorLand/Worker) |
| SideCar | Pre-built Node.js binaries | Cross-platform | [SideCar](https://github.com/CodeEditorLand/SideCar) |
| Maintain | CI/CD and maintenance | Build tooling | [Maintain](https://github.com/CodeEditorLand/Maintain) |

## See Also

- [Local-First Protocol](/Doc/local-first-protocol)
- [API Reference](/Doc/api-reference)
- [Contributing](/Doc/contributing)
