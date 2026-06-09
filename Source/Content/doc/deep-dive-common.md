---
title: "Common - Deep Dive"
section: "Deep Dive"
order: 2
description:
    "Design rationale and internals of the ActionEffect system, trait-based
    dependency injection, DTO library, CommonError variants, and how Common
    enables isolated testing."
---

Common is the architectural core that every other Rust element in Land depends
on. This page explains the design decisions behind its major systems: why
effects are values rather than calls, how the trait-based dependency injection
works at compile time, what the DTO library contains, and how the CommonError
enum is used in practice.

## Why Declarative Effects Over Imperative Code

The traditional approach to async operations in Rust is direct: a function
receives a concrete dependency and awaits it immediately. This is simple but
creates two problems for a large codebase.

First, testing requires a real dependency or a hand-written mock that replicates
its entire interface. Second, composing operations - run A then B if A succeeds,
or run A and B in parallel - requires explicit async coordination at each call
site.

Common's `ActionEffect` system treats operations as data. An effect constructor
returns a description of what should happen; it does not perform any I/O. The
`ApplicationRunTime` receives the description, resolves the required capability
from its environment, and executes it.

```rust
// Imperative approach: I/O happens immediately, hard to compose
async fn read(fs: &impl FileSystemReader, path: PathBuf) -> Result<Vec<u8>, CommonError> {
    fs.read_file(&path).await
}

// Declarative approach: no I/O until the runtime executes it
let effect = FileSystem::ReadFile(PathBuf::from("/path/to/file"));
// effect is a value; execution happens later via runtime.Run(effect).await
```

The declarative form makes the capability dependency explicit in the type
signature. Parallel and sequential composition are built into `ActionEffect`
itself, so call sites do not need to manage `tokio::join!` or chained futures
manually.

## ActionEffect Type Signature

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

- `TCapability` is the trait object or concrete type the effect needs. The
  runtime resolves this from the environment.
- `TError` is the error type. For all Land-internal effects this is
  `CommonError`.
- `TOutput` is the success type.

The `Arc` makes effects cheap to clone and share across async boundaries without
copying the closure.

### Composition Methods

| Method            | Behavior                                                              |
| ----------------- | --------------------------------------------------------------------- |
| `and_then(f)`     | Sequential: run self, pass result to `f`, run resulting effect        |
| `zip(other)`      | Parallel: run self and other concurrently, collect both results       |
| `fallback(other)` | Error recovery: run self; if it fails, run other                      |
| `map(f)`          | Transform the success value without changing capability or error type |
| `map_err(f)`      | Transform the error value                                             |

Execution overhead per composition step is approximately 17 ns, measured on
Apple M-series hardware.

## Trait Architecture

Every service capability is defined as an `async trait` (via the `async_trait`
crate for object-safety). Each trait declares the minimal surface needed for
that domain - no helper methods, no default implementations with hidden
behavior, no cross-domain coupling.

```rust
#[async_trait]
pub trait FileSystemReader: Send + Sync {
    async fn read_file(&self, path: &Path) -> Result<Vec<u8>, CommonError>;
    async fn write_file(&self, path: &Path, content: &[u8]) -> Result<(), CommonError>;
    async fn stat(&self, path: &Path) -> Result<FileStat, CommonError>;
    async fn read_dir(&self, path: &Path) -> Result<Vec<DirEntry>, CommonError>;
    async fn create_dir(&self, path: &Path) -> Result<(), CommonError>;
    async fn remove_file(&self, path: &Path) -> Result<(), CommonError>;
    async fn rename(&self, from: &Path, to: &Path) -> Result<(), CommonError>;
    async fn copy(&self, from: &Path, to: &Path) -> Result<(), CommonError>;
    async fn watch(&self, path: &Path) -> Result<FileWatcher, CommonError>;
}
```

Mountain implements each trait in a corresponding file under
`Element/Mountain/Source/Environment/`. Tests implement the same traits with
in-memory or panic-on-call stubs.

### How Mountain Implements a Common Trait

```rust
// In Mountain/Source/Environment/FileSystemProvider.rs
use CommonLibrary::FileSystem::{FileSystemReader, FileSystemWriter};

#[async_trait]
impl FileSystemReader for MountainEnvironment {
    async fn read_file(&self, path: &Path) -> Result<Vec<u8>, CommonError> {
        tokio::fs::read(path).await.map_err(|e| CommonError::IoError(e))
    }
    // ...
}
```

The trait implementation is in Mountain; the trait definition is in Common.
Common never imports from Mountain. This one-way dependency is enforced by the
workspace `Cargo.toml`.

## Environment and Dependency Injection

Common's DI system works at compile time through associated types. The
`Environment` trait declares one associated type per capability:

```rust
pub trait Environment {
    type FileSystem: FileSystemReader + FileSystemWriter;
    type Configuration: ConfigurationProvider;
    type Terminal: TerminalProvider;
    // one associated type per service domain
}
```

The `Requires<C>` trait lets an effect declare what capability it needs without
naming a concrete type:

```rust
pub trait Requires<C> {
    type Output;
    type Error;
    async fn run(self, capability: &C) -> Result<Self::Output, Self::Error>;
}
```

`ApplicationRunTime` connects the two: given an environment, it resolves the
concrete capability for a given `TCapability` type parameter and calls the
effect's function. No runtime type lookup, no `Any` downcasting - the resolution
is a zero-cost type-level dispatch.

### Capability Resolution Flow

```
ActionEffect<FileSystemReader, CommonError, Vec<u8>>
  -> ApplicationRunTime::Run(effect)
  -> Environment::FileSystem (resolves to MountainFileSystem in production,
                               MockFileSystem in tests)
  -> effect.Function(capability).await
  -> Result<Vec<u8>, CommonError>
```

## DTO Library Structure

Common's `DTO/` module re-exports structs from each service domain's `DTO/`
subdirectory. All DTOs are:

- `#[derive(Debug, Clone, PartialEq, serde::Serialize, serde::Deserialize)]`
- Named in PascalCase matching the Land naming convention
- Field-compatible with the corresponding protobuf message fields in
  `Vine.proto`

Key DTOs:

| DTO                   | Module                | Primary Fields                                      |
| --------------------- | --------------------- | --------------------------------------------------- |
| `FileStat`            | `FileSystem/DTO`      | `path`, `file_type`, `size`, `mtime`, `permissions` |
| `InitData`            | `Workspace`           | Workspace path, extension manifests, configuration  |
| `TerminalOptions`     | `Terminal`            | `name`, `shell_path`, `cwd`, `env`, `cols`, `rows`  |
| `ExtensionManifest`   | `ExtensionManagement` | `id`, `version`, `publisher`, `activation_events`   |
| `ConfigurationTarget` | `Configuration`       | `Global`, `Workspace`, `WorkspaceFolder` enum       |
| `SearchOptions`       | `Search`              | `pattern`, `include`, `exclude`, `max_results`      |
| `WorkspaceEditDTO`    | `DTO/`                | `edits`, `file_creates`, `file_deletes`             |
| `TransportConfig`     | `Transport`           | `timeout_ms`, `retry_count`, `retry_backoff_ms`     |

## CommonError Variants and Usage

```rust
pub enum CommonError {
    NotFound(String),          // resource does not exist at the given path or ID
    PermissionDenied(String),  // OS refused the operation
    IoError(std::io::Error),   // raw I/O failure from tokio::fs or std::fs
    ParseError(String),        // deserialization or schema validation failure
    ProtocolError(String),     // gRPC or IPC framing/decoding failure
    Timeout(String),           // operation exceeded its deadline
    Unsupported(String),       // capability not available on this platform
    Internal(String),          // programming error; should not occur in normal operation
    Cancelled,                 // caller cancelled the operation
}
```

Every `async trait` method returns `Result<T, CommonError>`. Mountain maps
platform errors at the implementation boundary:

```rust
tokio::fs::read(path).await
    .map_err(|e| match e.kind() {
        ErrorKind::NotFound => CommonError::NotFound(path.display().to_string()),
        ErrorKind::PermissionDenied => CommonError::PermissionDenied(path.display().to_string()),
        _ => CommonError::IoError(e),
    })
```

This means callers in effects and tests never need to match against
`std::io::Error` kinds - they match against `CommonError` variants.

## How Common Enables Testability

Because Common contains no concrete logic, any component that depends only on
Common traits can be tested with lightweight in-memory implementations. A test
for Mountain's file-open effect needs:

1. A struct that implements `FileSystemReader` by reading from a
   `HashMap<PathBuf, Vec<u8>>`
2. An `ApplicationRunTime` constructed with that struct as the environment
3. The effect under test

No Tauri process, no real file system, no spawned Cocoon. The test runs in
milliseconds and is fully deterministic.

```rust
struct MockFileSystem {
    files: HashMap<PathBuf, Vec<u8>>,
}

#[async_trait]
impl FileSystemReader for MockFileSystem {
    async fn read_file(&self, path: &Path) -> Result<Vec<u8>, CommonError> {
        self.files.get(path)
            .cloned()
            .ok_or_else(|| CommonError::NotFound(path.display().to_string()))
    }
    // other methods: unimplemented!() or Ok(Default::default())
}
```

This pattern is used throughout Mountain's test suite. The `src/tests/`
directories in each Mountain service module contain mock implementations of the
Common traits they depend on.

## Transport Layer

Common defines the transport-agnostic communication interface used by Air,
Grove, and future Rust sidecars:

```rust
pub trait TransportStrategy: Send + Sync {
    type Error: std::error::Error + Send + Sync + 'static;
    async fn connect(&self) -> Result<(), Self::Error>;
    async fn send(&self, request: &[u8]) -> Result<Vec<u8>, Self::Error>;
    async fn close(&self) -> Result<(), Self::Error>;
    fn is_connected(&self) -> bool;
    fn transport_type(&self) -> TransportType;
}
```

Concrete transport implementations (`gRPCTransport`, `IPCTransport`,
`WASMTransport`) live in the Grove crate, not in Common. Common owns only the
trait surface and the `TransportConfig` DTO. This keeps Common free of tonic,
tokio-tungstenite, and wasmtime dependencies.

## Telemetry Module

Common's `Telemetry/` module provides a dual-pipe emit surface shared across all
Rust sidecars:

| Pipe    | Crate           | Controlled By                                  |
| ------- | --------------- | ---------------------------------------------- |
| PostHog | `posthog-rs`    | `TELEMETRY_POSTHOG_KEY` environment variable   |
| OTLP    | `opentelemetry` | `TELEMETRY_OTLP_ENDPOINT` environment variable |

Both pipes honor the `Disable=true` build-time flag, which the Maintain build
pipeline sets to completely strip telemetry from production binaries when the
flag is present. Neither pipe is enabled in debug builds by default.

## Related Documentation

- [Common overview](https://editor.land/Doc/common)
- [Mountain deep dive](https://editor.land/Doc/deep-dive-mountain)
- [Echo deep dive](https://editor.land/Doc/deep-dive-echo)
- [Source Code](https://github.com/CodeEditorLand/Common)
