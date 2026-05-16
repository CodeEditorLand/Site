---
title: "Cocoon - Deep Dive"
section: "Deep Dive"
order: 32
description:
    "Technical architecture of the Cocoon VSCode extension host: Effect-TS
    service layers, module interception, and gRPC communication with Mountain."
---

# Cocoon - Deep Dive

Cocoon is the Node.js sidecar that provides VSCode extension host compatibility
within the Land project. It uses Effect-TS for service composition, gRPC for
communication with Mountain, and sophisticated module interception to route
`vscode` API calls to native implementations.

## Core Architecture 🏗️

| Principle               | Description                                                                          | Key Components               |
| ----------------------- | ------------------------------------------------------------------------------------ | ---------------------------- |
| High-Fidelity API Shim  | Comprehensive `IExtHost*` service implementations for VSCode extension compatibility | All `Service/*` modules      |
| Effect-TS Native        | Entire application built with Effect-TS layer composition                            | `AppLayer`, all services     |
| Module Interception     | Patches `require()` and `import` to route `vscode` module calls                      | `Core/RequireInterceptor.ts` |
| gRPC-Powered IPC        | Fast typed communication with Mountain via tonic and Vine protocol                   | `Service/Ipc.ts`             |
| Process Hardening       | Signal handling, parent monitoring, log piping, uncaught exception boundaries        | `PatchProcess/*`             |
| Extensible Architecture | Service provider pattern for easy addition of new API implementations                | `AppLayer` composition       |

## Component Breakdown 🧩

### Index.ts (Orchestrator)

Main entry point that builds the complete `AppLayer` by composing all individual
service layers, applies process hardening early, manages the gRPC connection to
Mountain, and coordinates graceful shutdown.

### PatchProcess/ (Foundation)

Ensures Cocoon runs as a stable sidecar: captures `SIGTERM`/`SIGINT`, monitors
the Mountain parent process for heartbeat, pipes stdout/stderr back to the
parent, and wraps the application in a top-level error boundary.

### Core/ (Extension Runtime Engine)

- **ExtensionHost.ts** - Activates and manages extension lifecycle.
- **RequireInterceptor.ts** - Intercepts CommonJS `require()` and ESM `import`
  for the `vscode` module, giving each extension its own isolated API instance.
- **ApiFactory.ts** - Constructs the `vscode` API object, wiring service calls
  to Effect-TS implementations.

### Service/ (VSCode API Implementations)

Each VSCode service is implemented as an Effect-TS layer:

| VSCode Service      | Cocoon Service    | Communication |
| ------------------- | ----------------- | ------------- |
| `vscode.commands`   | CommandsProvider  | Vine gRPC     |
| `vscode.workspace`  | WorkspaceProvider | Vine gRPC     |
| `vscode.window`     | WindowProvider    | Vine gRPC     |
| `vscode.extensions` | ExtensionProvider | Vine gRPC     |
| `vscode.languages`  | LanguageProvider  | Vine gRPC     |

### Service/Ipc.ts (Communication Bridge)

Manages bidirectional gRPC with advanced patterns: bidirectional streaming for
terminal I/O and file watching, request batching, automatic reconnection with
exponential backoff, and protocol buffer optimization.

## Source Validation Status ✅

Cocoon has been validated against Microsoft's VSCode source repositories. Core
features -- extension activation, lifecycle, API factory, module interception,
IPC, and service layer communication -- all pass validation. Advanced language
features and SCM API are marked as partially implemented. ESM support exists as
an enhancement over VSCode's CJS-only model.

Key API calls flow through a consistent path: extension
`vscode.window.showInformationMessage()` goes through RequireInterceptor,
ApiFactory, WindowProvider, gRPC serialization, Mountain's Vine server, native
dialog display, and response flows back along the same chain. Total API call
latency is approximately 0.42ms plus network and Mountain processing time.

## Related Documentation 📖

- [Architecture overview](https://Editor.Land/Doc/architecture)
- [Mountain deep dive](https://Editor.Land/Doc/deep-dive-mountain)
- [Cocoon GitHub repository](https://github.com/CodeEditorLand/Cocoon)
