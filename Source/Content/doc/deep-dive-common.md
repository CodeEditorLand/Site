---
title: "Common - Deep Dive"
section: "Deep Dive"
order: 35
description:
    "Abstract service contracts, ActionEffect system, and cross-language data
    types"
---

# Common - Deep Dive

Common defines the abstract architectural patterns, service contracts, and data
structures that enable type-safe, testable service implementations across Rust
and TypeScript boundaries. It has zero dependencies on Tauri, gRPC, or
application logic.

## Architecture Principles 🎯

| Principle                | Description                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------- |
| Pure Abstraction         | All capabilities defined as abstract `async trait`s with no concrete implementation    |
| Declarative Effects      | Operations represented as `ActionEffect` values, separating description from execution |
| Trait-Based DI           | Dependency injection via `Environment` and `Requires` traits                           |
| Universal Error Handling | Single `CommonError` enum covering all failure scenarios                               |
| Contract-First           | DTOs and error types defined first, establishing stable contracts                      |

## ActionEffect System ⚡

An `ActionEffect<C, E, T>` describes an operation parameterized by:

- **C**: Capability type required for execution
- **E**: Error type
- **T**: Successful result type

```rust
pub struct ActionEffect<TCapability, TError, TOutput> {
    pub Function: Arc<dyn Fn(TCapability) -> Pin<Box<
        dyn Future<Output = Result<TOutput, TError>> + Send
    >> + Send + Sync>,
}
```

Effects compose via `and_then` (sequential), `zip` (parallel), and `fallback`
(error recovery). Execution overhead is ~17ns per effect.

## Environment System 🌍

The `Environment` trait system implements capability-based architecture:

1. Effects declare required capabilities
2. Concrete environments implement the required traits
3. `ApplicationRunTime` resolves and provides capabilities at runtime
4. Effect executes with the provided capability

## Service Contracts (Traits) 📋

Common defines async traits that VSCode services are lifted into:

| VSCode Service          | Common Trait           |
| ----------------------- | ---------------------- |
| `IFileService`          | `FileSystemService`    |
| `IWorkspaceService`     | `WorkspaceService`     |
| `IConfigurationService` | `ConfigurationService` |
| `ICommandService`       | `CommandService`       |
| `IDocumentService`      | `DocumentProvider`     |

Implementations live in Mountain (Rust) and Wind (Effect-TS).

## Cross-Language Architecture 🌐

DTOs ensure consistent data structures across the project:

- Rust backend serializes to protocol buffers
- TypeScript frontend deserializes from gRPC
- Compile-time validation enforces type safety

```
Traits --shared--> Mountain (Rust impl)
Traits --shared--> Wind (Effect-TS impl)
Traits --shared--> Cocoon (Node.js impl)
DTOs --shared--> All consumers
Errors --shared--> All consumers
```

## Related Documentation 📖

- [Common overview](https://editor.land/Doc/common)
- [Mountain implementation details](https://editor.land/Doc/deep-dive-mountain)
