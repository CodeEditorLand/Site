---
title: "Mountain - Deep Dive"
section: "Deep Dive"
order: 30
description:
    "Technical architecture of the Mountain Rust core: native service
    implementations, the ApplicationRunTime engine, state management, and gRPC
    communication."
---

# Mountain - Deep Dive

Mountain is the core Rust binary in the Land ecosystem. It provides native
implementations of VSCode-compatible services, manages the application lifecycle
via Tauri, and orchestrates all sidecar processes (Cocoon, Air) through gRPC.

## Core Architecture

Mountain implements VSCode service `trait`s defined in the `Common` crate and
executes them through the `ApplicationRunTime`, which bridges declarative effect
descriptions to concrete native capabilities.

| Principle                     | Description                                                                         | Key Components                         |
| :---------------------------- | :---------------------------------------------------------------------------------- | :------------------------------------- |
| Native Service Implementation | Concrete implementations of all abstract service traits for native-speed operations | `Environment/*` providers              |
| Effect System Execution       | Executes `ActionEffect`s through `ApplicationRunTime`                               | `RunTime/*`, `Track/EffectCreation.rs` |
| Centralized State Management  | Thread-safe `ApplicationState` managed by Tauri                                     | `ApplicationState/*`                   |
| gRPC-Powered IPC              | `tonic`-based gRPC for communication with Cocoon                                    | `Vine/*`                               |
| Tauri Integration             | Cross-platform windowing, system integration, secure communication                  | `Binary.rs`, Tauri plugins             |
| Sidecar Orchestration         | Launch, manage, and health-monitor the Cocoon process                               | `ProcessManagement/*`                  |

## ApplicationRunTime Engine

`MountainRunTime` resolves capabilities from `MountainEnvironment` and submits
effects to an `Echo` scheduler. The execution flow:

1. Wind UI sends a Tauri command request.
2. Track dispatcher forwards the effect to `ApplicationRunTime`.
3. RunTime resolves the required capability from the environment.
4. The scheduler executes the effect against native OS operations.
5. Results flow back through Track to the UI via Tauri events.

```rust
pub struct MountainRunTime {
    environment: Arc<MountainEnvironment>,
    scheduler: Arc<Echo::Scheduler::Scheduler>,
}
```

## State Management

`ApplicationState` holds documents, extensions, UI layout, and preferences
behind `RwLock` guards for concurrent access. Tauri events broadcast state
changes to all listeners.

## VSCode Service Implementations

Mountain provides concrete implementations for three major service areas:

- **File System** - Async file operations via `tokio::fs`, with URI-to-path
  conversion and optional LRU caching.
- **Window Management** - Terminal creation via `portable-pty`, native
  notifications via Tauri.
- **Workspace** - Workspace folder management, document opening, and
  configuration handling.

## Naming Convention

Mountain (and the broader Land ecosystem) uses PascalCase for all Rust elements
-- structs, enums, traits, functions, methods, modules, fields, local variables,
and file names. This intentional departure from Rust conventions ensures:

- Direct mapping between Rust DTOs, Protocol Buffer messages, and TypeScript
  interfaces.
- No `#[serde(rename = "...")]` boilerplate.
- Consistent naming across Rust (Mountain/Common), TypeScript (Wind, Cocoon),
  and Protocol Buffers (Vine).

Modules signal this deviation with
`#![allow(non_snake_case, non_camel_case_types)]` at the top. Exceptions exist
for external crate types, standard library items, lifetime parameters, and
built-in attributes/macros.

## Sidecar Orchestration

`ProcessManager` launches the Cocoon Node.js process, configures its environment
variables (including `VINE_PORT`), and runs a periodic health-monitoring loop on
a Tokio task. Unhealthy sidecars are restarted automatically.

## Process Structure

```text
Source/
+-- ApplicationState/      Central state with RwLock guards
+-- Environment/           MountainEnvironment and service providers
+-- RunTime/               ApplicationRunTime engine
+-- IPC/                   Tauri IPC server and handlers
+-- ProcessManagement/     Cocoon process lifecycle
+-- Track/                 Effect dispatch and routing
+-- Binary.rs              Entry point
```
