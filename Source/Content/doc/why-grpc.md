---
title: Why gRPC
section: Why Land
order: 3
description:
    Vine.proto is the single source of truth for Mountain↔Cocoon communication -
    one schema generates typed Rust stubs via tonic and TypeScript stubs via
    proto-loader, with bidirectional streaming for real-time events.
---

Land is a multi-process application. Mountain (Rust), Cocoon (Node.js), and Air
(Rust daemon) each run in separate processes and must exchange messages with
strong contracts. gRPC over localhost TCP with Vine.proto as the schema provides
those contracts: code is generated for both Rust and TypeScript from the same
`.proto` file, so adding a new RPC or changing a field is a compile error on
both sides until both are updated.

## The proto file as contract

`Element/Vine/Proto/Vine.proto` is the canonical definition of every RPC between
Mountain and Cocoon. It is not documentation that can drift - it is the source
from which both the Rust tonic stubs and the TypeScript `@grpc/proto-loader`
bindings are generated at build time.

```protobuf
service CocoonService {
  // Mountain -> Cocoon: request hover from an extension provider
  rpc ProvideHover(ProvideHoverRequest) returns (ProvideHoverResponse);

  // Mountain -> Cocoon: bidirectional streaming channel
  rpc OpenChannelFromMountain(stream Envelope) returns (stream Envelope);

  // Mountain -> Cocoon: send workspace state at startup
  rpc InitExtensionHost(InitExtensionHostRequest) returns (Empty);
}
```

When Mountain adds a new language feature RPC, the proto change propagates to
both the Rust handler and the TypeScript dispatcher before either can compile.
There is no gap where one side has the new method and the other is silently
ignoring it.

## Generated stubs on both sides

Rust consumes the proto via `tonic-build` in `Mountain/build.rs`:

```rust
// Mountain/build.rs
fn main() {
    tonic_build::configure()
        .compile(&["../Vine/Proto/Vine.proto"], &["../Vine/Proto"])
        .expect("Failed to compile protos");
}
```

TypeScript consumes it via `@grpc/proto-loader` at runtime in Cocoon's gRPC
client. The generated types cover every request and response shape -
`ProvideHoverRequest`, `ProvideCompletionItemsResponse`, `GenericRequest`, and
so on. Neither side writes a hand-rolled JSON schema or a `z.object({...})`
validator for IPC payloads.

## Bidirectional streaming for real-time events

Many editor operations are not request-response - they are ongoing streams.
Terminal output arrives continuously. `onDidChangeTextDocument` fires on every
keystroke. Language server responses for diagnostics are streamed as they
arrive. gRPC's streaming RPCs handle all of these under one schema model:

| Communication pattern        | gRPC form                 | Example in Land                                     |
| ---------------------------- | ------------------------- | --------------------------------------------------- |
| Single call, single response | Unary RPC                 | `ProvideHover`, `ProvideDefinition`                 |
| Fire-and-forget notification | Unary with `Empty` return | `SendMountainNotification`                          |
| Server-initiated stream      | Server streaming          | Terminal output                                     |
| Full duplex channel          | Bidirectional streaming   | `OpenChannelFromMountain` / `OpenChannelFromCocoon` |

The bidirectional channel (`OpenChannelFromMountain` / `OpenChannelFromCocoon`)
multiplexes all real-time event traffic - configuration changes, file watcher
notifications, extension activation signals - over a single persistent gRPC
connection rather than opening a new connection per event type.

## Performance vs JSON-RPC

VS Code uses JSON-RPC for its extension host protocol. Every message is
serialized to JSON text, transmitted over a pipe, and deserialized on the other
side. For high-frequency events (terminal output, document change notifications,
completion requests) this means UTF-8 encoding and JSON parsing on every
message.

gRPC uses protobuf binary encoding. Fields are packed by tag number without
string keys. For a `Position` message (line + character), the protobuf encoding
is 4-6 bytes; the JSON equivalent is `{"line":42,"character":7}` - 22 bytes with
no whitespace. At the volume Land generates (hundreds of IPC calls per second
during active editing), the encoding difference is measurable.

> [!IMPORTANT] All gRPC connections bind to `[::1]` (IPv6 loopback) or
> `127.0.0.1`, never `0.0.0.0`. No remote connections are accepted. Port
> allocation: Mountain Vine server on 50051, Cocoon Vine server on 50052, Air
> on 50053.

## Why not Tauri commands for Mountain↔Cocoon

Tauri commands work well for Wind→Mountain calls (UI requesting a native
operation). They are not suited for Mountain→Cocoon calls because Tauri's
command system is designed for WebView↔Rust communication, not Rust↔Node.js
process communication. Cocoon is a separate OS process, not a WebView. gRPC is
the right transport for two native processes that need a typed, bidirectional,
streaming protocol.

## Discoverability

`Vine.proto` documents every RPC in the system. Reading it gives a complete
inventory of what Mountain can ask Cocoon to do (`CocoonService`) and what
Cocoon can ask Mountain to do (`MountainService`). There is no separate API
documentation to maintain - the proto file is the API documentation, enforced at
compile time.
