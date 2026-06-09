---
title: "Common"
section: "Elements"
order: 2
description:
    "Common defines the abstract architectural contracts for the entire Rust
    backend: the ActionEffect system, async service traits, DTOs, and the
    universal CommonError type."
---

Common is the pure abstract foundation of Land's native Rust backend. It
contains no concrete implementations - no file I/O, no network calls, no Tauri
dependencies. Instead it defines what the system can do: every application
capability as an `async trait`, every operation as a declarative `ActionEffect`
value, and every data structure as a `serde`-compatible DTO. Mountain, Air,
Echo, and every other Rust element depend on Common; Common depends on nothing
from the Land workspace.

## What Common Provides

**The ActionEffect system.** Rather than calling a function that immediately
performs a side effect, Common's pattern is to construct a value that
_describes_ the desired effect. That value is later passed to an
`ApplicationRunTime` for execution. This separation makes logic composable,
testable, and executable in a controlled environment.

**Async service traits.** Every application capability - file system access,
terminal management, configuration reads, search, SCM, language features, and
more - is defined as an `async trait` with `Send + Sync` bounds. Mountain
provides the concrete implementations; tests provide mocks.

**Data Transfer Objects.** All structs shared between Mountain and Cocoon for
IPC communication and internal state management are defined here. Every DTO is
`serde`-compatible and derives `Debug`, `Clone`, `PartialEq`.

**CommonError.** A single error enum covering all failure modes across every
service domain, so error handling is consistent regardless of which service
produced the failure.

**Transport and Telemetry abstractions.** A `TransportStrategy` trait provides a
transport-agnostic communication interface. A dual-pipe telemetry surface
(PostHog + OTLP) is shared across all Rust sidecars.

## Service Traits

Common defines async traits for every service domain used in the editor:

| Module                     | Trait                                   | Domain                                    |
| -------------------------- | --------------------------------------- | ----------------------------------------- |
| `FileSystem/`              | `FileSystemReader` + `FileSystemWriter` | File and directory operations             |
| `Configuration/`           | `ConfigurationProvider`                 | Settings management                       |
| `Terminal/`                | `TerminalProvider`                      | PTY terminal creation and I/O             |
| `Document/`                | `DocumentProvider`                      | Text document open, save, apply changes   |
| `UserInterface/`           | `UserInterfaceProvider`                 | Dialogs, messages, quick pick             |
| `Search/`                  | `SearchProvider`                        | File and text search                      |
| `Secret/`                  | `SecretProvider`                        | OS keychain-backed secret storage         |
| `Storage/`                 | `StorageProvider`                       | Key-value persistent storage              |
| `Workspace/`               | `WorkspaceProvider`                     | Workspace folder and file management      |
| `LanguageFeature/`         | `LanguageFeatureProviderRegistry`       | Hover, completion, definition, references |
| `Command/`                 | `CommandExecutor`                       | Command registration and execution        |
| `Debug/`                   | `DebugService`                          | Debug session management                  |
| `SourceControlManagement/` | `SourceControlManagementProvider`       | Git and SCM integration                   |
| `TreeView/`                | `TreeViewProvider`                      | Tree data provider                        |
| `Webview/`                 | `WebviewProvider`                       | Webview panel management                  |
| `StatusBar/`               | `StatusBarProvider`                     | Status bar item management                |
| `Diagnostic/`              | `DiagnosticManager`                     | Problem markers                           |
| `ExtensionManagement/`     | `ExtensionManagementService`            | Extension lifecycle                       |

## The ActionEffect System

The `ActionEffect` type is a boxed async closure parameterized by capability,
error, and output types:

```rust
pub struct ActionEffect<TCapability, TError, TOutput> {
    pub Function: Arc<
        dyn Fn(TCapability)
            -> Pin<Box<dyn Future<Output = Result<TOutput, TError>> + Send>>
            + Send
            + Sync,
    >,
}
```

The capability parameter (`TCapability`) is the trait the effect needs to run.
The effect does not hold a reference to any concrete implementation - it only
records what it needs. The `ApplicationRunTime` resolves the capability from its
environment and calls the function.

Effects compose without nesting callback chains:

```rust
// Sequential: run effect2 with the result of effect1
let pipeline = effect1.and_then(|result| effect2(result));

// Parallel: run both effects and collect results
let both = effect1.zip(effect2);

// Error recovery: fall back to a secondary effect on failure
let resilient = primary_effect.fallback(backup_effect);
```

## Dependency Direction

The dependency graph flows one way: every consumer depends on Common, Common
depends on nothing from the Land workspace.

```
Mountain  --depends on-->  Common
Air       --depends on-->  Common
Echo      --depends on-->  Common
Mist      --depends on-->  Common
Tests     --depends on-->  Common (via mock implementations)
```

This direction is what enables mock-based testing. A test that exercises
Mountain's file-open logic only needs a mock `FileSystemReader` implementation -
it does not need a running Tauri process, a real file system, or a connected
Cocoon.

## CommonError

A single error enum used across every service domain:

```rust
pub enum CommonError {
    NotFound(String),
    PermissionDenied(String),
    IoError(std::io::Error),
    ParseError(String),
    ProtocolError(String),
    Timeout(String),
    Unsupported(String),
    Internal(String),
    Cancelled,
}
```

Every `async trait` method in Common returns `Result<T, CommonError>`. Mountain
maps its internal errors into `CommonError` variants at the implementation
boundary. This ensures callers never need to match against a service-specific
error hierarchy.

## Source Structure

```
Common/Source/
    Library.rs              # Crate root; declares all modules
    Effect/                 # ActionEffect type and ApplicationRunTime trait
    Environment/            # Environment, Requires, HasEnvironment traits
    Error/                  # CommonError enum
    DTO/                    # Shared DTOs (re-exports from service modules)
    Transport/              # TransportStrategy trait and TransportConfig
    Telemetry/              # Dual-pipe PostHog + OTLP emit surface
    Utility/                # Serialization helpers
    Command/                # CommandExecutor trait
    Configuration/          # ConfigurationProvider trait and DTOs
    CustomEditor/           # Custom editor provider trait
    Debug/                  # DebugService trait
    Diagnostic/             # DiagnosticManager trait
    Document/               # DocumentProvider trait
    ExtensionManagement/    # ExtensionManagementService trait
    FileSystem/             # FileSystemReader + FileSystemWriter traits and DTOs
    IPC/                    # IPCProvider trait and DTOs
    Keybinding/             # KeybindingProvider trait
    LanguageFeature/        # LanguageFeatureProviderRegistry trait and DTOs
    Output/                 # OutputChannelManager trait
    Search/                 # SearchProvider trait
    Secret/                 # SecretProvider trait
    SourceControlManagement/ # SCM provider trait and DTOs
    StatusBar/              # StatusBarProvider trait and DTOs
    Storage/                # StorageProvider trait
    Synchronization/        # SynchronizationProvider trait
    Terminal/               # TerminalProvider trait
    Testing/                # TestController trait
    TreeView/               # TreeViewProvider trait and DTOs
    UserInterface/          # UserInterfaceProvider trait and DTOs
    Webview/                # WebviewProvider trait and DTOs
    Workspace/              # WorkspaceProvider trait
```

## Related Documentation

- [Common Deep Dive](https://editor.land/Doc/deep-dive-common)
- [Mountain](https://editor.land/Doc/mountain)
- [Echo](https://editor.land/Doc/echo)
- [Source Code](https://github.com/CodeEditorLand/Common)
