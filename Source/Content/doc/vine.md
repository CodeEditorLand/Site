---
title: "Vine"
section: "Elements"
order: 12
description:
    "Vine defines the gRPC protocol between Mountain and Cocoon, providing
    strongly-typed inter-process communication contracts compiled from Protocol
    Buffer definitions."
---

Vine is the wire protocol for Land - a set of Protocol Buffer schemas that
define the bidirectional gRPC service interfaces used between Mountain (the Rust
backend) and Cocoon (the Node.js extension host). Every inter-process call that
crosses the Mountain↔Cocoon boundary goes through Vine. The schemas are also
shared with Air, which uses a separate `Air.proto` definition on port 50053.

The working proto definitions and gRPC server code currently reside inside
Mountain's own `Source/Vine/` directory. The standalone
[Vine repository](https://github.com/CodeEditorLand/Vine) is the future home for
these schemas as a published, independently versioned package once the protocol
stabilises.

## Why a Typed Protocol

Tauri's IPC is untyped. A call to `invoke('open-file', { path })` has no
enforced contract on either side. Renaming a field, changing an argument type,
or removing a handler produces a silent runtime failure rather than a build
error.

Vine defines every inter-process call as a `.proto` service method with typed
request and response messages. The generated Rust stubs (via `tonic`) and
TypeScript stubs (via `@grpc/proto-loader`) are the only way Mountain and Cocoon
communicate. If a message field is renamed or removed, the Rust build and the
TypeScript build each fail independently at their own compile step. Neither side
can silently drift from the schema.

## Protocol Schema Family

Vine is the umbrella name for a family of proto files:

| Schema        | Server port | Direction                             | Purpose                                                                                                |
| ------------- | ----------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `Vine.proto`  | 50051       | Cocoon → Mountain (`MountainService`) | Core Mountain↔Cocoon communication: file system, terminal, language features, extension host lifecycle |
| `Vine.proto`  | 50052       | Mountain → Cocoon (`CocoonService`)   | Core Mountain↔Cocoon communication: language provider dispatch, notifications, inline completions      |
| `Spine.proto` | 50052       | Mountain → Cocoon                     | Extension host coordination - action/response pattern for command execution                            |
| `Air.proto`   | 50053       | Mountain → Air                        | Mountain↔Air background daemon services                                                                |

> [!NOTE] `NetworkMountainPort` (default 50051) is Mountain's gRPC listen
> port. `NetworkCocoonPort` (default 50052) is Cocoon's gRPC listen port. Both
> are overridable to support parallel development sessions on the same machine.

## MountainService: Cocoon → Mountain

`MountainService` is implemented by Mountain's gRPC server. Cocoon calls these
RPCs when extensions need native capabilities.

| RPC                      | Purpose                                                  |
| ------------------------ | -------------------------------------------------------- |
| `ProcessCocoonRequest`   | Generic request-response for named IPC methods           |
| `SendCocoonNotification` | Fire-and-forget event from Cocoon to Mountain            |
| `CancelOperation`        | Cancel an in-flight request by correlation ID            |
| `OpenChannelFromCocoon`  | Bidirectional streaming channel for multiplexed dispatch |

## CocoonService: Mountain → Cocoon

`CocoonService` is implemented by Cocoon's gRPC server. Mountain calls these
RPCs to drive the extension host.

| RPC                            | Purpose                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------ |
| `InitExtensionHost`            | Send workspace configuration, extension manifests, and product info at startup |
| `ProcessMountainRequest`       | Generic request-response for named IPC methods                                 |
| `SendMountainNotification`     | Fire-and-forget notification from Mountain to Cocoon                           |
| `CancelOperation`              | Cancel an in-flight request                                                    |
| `OpenChannelFromMountain`      | Bidirectional streaming channel                                                |
| `ExecuteContributedCommand`    | Execute a command registered by an extension                                   |
| `ProvideHover`                 | Request hover information from a registered provider                           |
| `ProvideCompletionItems`       | Request completion items from a registered provider                            |
| `ProvideDefinition`            | Request definition location                                                    |
| `ProvideReferences`            | Request reference locations                                                    |
| `ProvideCodeActions`           | Request code actions                                                           |
| `ProvideDocumentHighlights`    | Request document highlights                                                    |
| `ProvideDocumentSymbols`       | Request document symbols                                                       |
| `ProvideWorkspaceSymbols`      | Request workspace-wide symbols                                                 |
| `ProvideInlineCompletionItems` | Request inline completion items from a registered provider                     |

## Transport

Both Mountain and Cocoon run gRPC servers and both act as gRPC clients - the
protocol is fully bidirectional. Mountain hosts `MountainService` for Cocoon to
call; Cocoon hosts `CocoonService` for Mountain to call.

Both sockets are strictly local. The connection uses TCP loopback with no
external network traffic. `NetworkMountainPort` overrides Mountain's listen port
(default 50051); `NetworkCocoonPort` overrides Cocoon's listen port (default
50052); `NetworkAirPort` overrides the Air port (default 50053).

## Code Generation

### Rust (Mountain)

Mountain's `build.rs` compiles the proto files at build time using
`tonic-build`:

```rust
fn main() {
    tonic_build::configure()
        .compile(
            &["Proto/Vine.proto", "Proto/Spine.proto"],
            &["Proto"]
        )
        .expect("Failed to compile protos");
}
```

The generated types live in Mountain's `Source/Vine/Generated/` directory and
are not checked in - they are produced on every build.

### TypeScript (Cocoon)

TypeScript stubs are generated via `protoc-gen-ts` and committed to the Cocoon
source tree under `Source/Generated/`. This means Cocoon does not require
`protoc` at runtime; the generated files are part of the checked-in source.

```sh
protoc \
	--ts_out=Element/Cocoon/Source/Generated/ \
	--ts_opt=target=node \
	--proto_path=Element/Mountain/Proto/ \
	Element/Mountain/Proto/Vine.proto
```

Cocoon's gRPC client loads these generated types via `@grpc/grpc-js` at startup.

## Common Message Types

Vine's message vocabulary includes shared types used across multiple RPCs:

| Message               | Fields                                             | Used In                                          |
| --------------------- | -------------------------------------------------- | ------------------------------------------------ |
| `Uri`                 | `scheme`, `authority`, `path`, `query`, `fragment` | All file and document RPCs                       |
| `Position`            | `line` (0-based), `character` (0-based)            | Language feature RPCs                            |
| `Range`               | `start: Position`, `end: Position`                 | Language feature RPCs                            |
| `GenericRequest`      | `method`, `params` (JSON bytes)                    | `ProcessCocoonRequest`, `ProcessMountainRequest` |
| `GenericNotification` | `method`, `params` (JSON bytes)                    | Fire-and-forget notifications                    |
| `Envelope`            | `id`, `payload`                                    | Bidirectional streaming multiplexing             |

## Development Status

| Feature                                               | Status      |
| ----------------------------------------------------- | ----------- |
| `Vine.proto` - Mountain↔Cocoon gRPC (in Mountain)     | Active      |
| `Spine.proto` - extension host coordination           | Specified   |
| `Air.proto` - background daemon services              | Active      |
| Standalone Vine package (published `.proto` files)    | In progress |
| Transport agnosticism - WASM host functions for Grove | Planned     |

## What Is Not Yet Covered

The schema does not yet include service definitions for `vscode.lm.*`,
`vscode.chat.*`, `vscode.notebook.*`, or `vscode.tests.*`. Those APIs are not
yet implemented in Cocoon, so no Vine service definitions exist for them. The
`vscode.tasks.*` task resolver is partially implemented; the corresponding
service methods are being completed.

## Related Documentation

- [Vine Deep Dive](https://Editor.Land/Doc/deep-dive-vine)
- [Mountain](https://Editor.Land/Doc/mountain)
- [Cocoon](https://Editor.Land/Doc/cocoon)
- [Source Code](https://github.com/CodeEditorLand/Vine)
