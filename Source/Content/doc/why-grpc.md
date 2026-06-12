---
title: Why gRPC
section: Why Land
order: 3
description:
    Vine.proto is the single source of truth for Mountain-Cocoon communication -
    one schema generates typed Rust stubs via tonic and TypeScript stubs via
    proto-loader, with bidirectional streaming for real-time events.
---

Land is multi-process: Mountain (Rust), Cocoon (Node.js), and Air (Rust daemon)
each run in separate processes and must exchange messages with strong contracts.
gRPC over localhost TCP with `Vine.proto` provides those contracts: code is
generated for both Rust and TypeScript from the same `.proto` file. Adding a
new RPC or changing a field is a compile error on both sides until both are
updated.

## The proto file as contract

`Element/Vine/Proto/Vine.proto` is the canonical definition of every RPC
between Mountain and Cocoon. It is not documentation that can drift - it is the
source from which both Rust `tonic` stubs and TypeScript `@grpc/proto-loader`
bindings are generated at build time.

```protobuf
service CocoonService {
  rpc ProvideHover(ProvideHoverRequest) returns (ProvideHoverResponse);
  rpc OpenChannelFromMountain(stream Envelope) returns (stream Envelope);
  rpc InitExtensionHost(InitExtensionHostRequest) returns (Empty);
}
```

When Mountain adds a new RPC, the proto change propagates to both the Rust
handler and the TypeScript dispatcher before either compiles. There is no gap
where one side has the new method and the other silently ignores it.

## Bidirectional streaming for real-time events

Many editor operations are ongoing streams, not request-response: terminal
output, `onDidChangeTextDocument` on every keystroke, streaming diagnostics.

| Pattern                      | gRPC form                 | Example                             |
| ---------------------------- | ------------------------- | ----------------------------------- |
| Single call, single response | Unary RPC                 | `ProvideHover`, `ProvideDefinition` |
| Fire-and-forget              | Unary with `Empty` return | `SendMountainNotification`          |
| Server-initiated stream      | Server streaming          | Terminal output                     |
| Full duplex channel          | Bidirectional streaming   | `OpenChannelFromMountain`           |

The bidirectional channel multiplexes all real-time event traffic -
configuration changes, file watcher notifications, extension activation - over
a single persistent gRPC connection rather than opening one per event type.

## Performance vs JSON-RPC

VS Code's extension host uses JSON-RPC. Every message is serialized to JSON
text, transmitted over a pipe, and deserialized. For high-frequency events this
means UTF-8 encoding and JSON parsing on every message.

gRPC uses protobuf binary encoding. A `Position` message (line + character) is
4-6 bytes; the JSON equivalent is `{"line":42,"character":7}` - 22 bytes. At
hundreds of IPC calls per second during active editing, the difference is
measurable.

> **IMPORTANT**: All gRPC connections bind to `[::1]` or `127.0.0.1`, never
> `0.0.0.0`. No remote connections are accepted.

## Port allocation

| Channel                                    | Port  |
| ------------------------------------------ | ----- |
| Mountain Cocoon (Mountain server → Cocoon) | 50051 |
| Mountain Cocoon (Cocoon server → Mountain) | 50052 |
| Mountain Air (Air server)                  | 50053 |

## TierIPC routing

`TierIPC` controls how Wind routes `TauriMainProcessService` calls: `Mountain`
(default - all IPC via Tauri commands), `NodeDeferred` (Mountain first, fall
back to Cocoon via `cocoon:request` bridge), or `Node` (directly to Cocoon,
bypassing Mountain). The fallback in `NodeDeferred` mode reuses the same gRPC
request-routing handler that processes `languages:*`, `scm:*`, and `debug:*`
namespaces.

## Why not Tauri commands for Mountain-Cocoon

Tauri commands are designed for WebView-Rust communication. Cocoon is a
separate OS process, not a WebView. gRPC is the right transport for two native
processes that need a typed, bidirectional, streaming protocol.

## Discoverability

`Vine.proto` documents every RPC in the system. Reading it gives a complete
inventory of what Mountain can ask Cocoon to do and vice versa. The proto file
is the API documentation, enforced at compile time.

## Related Documentation

- [Why Rust](https://Editor.Land/Doc/why-rust)
- [Why Effect-TS](https://Editor.Land/Doc/why-effect-ts)
- [Mountain Naming Conventions](https://Editor.Land/Doc/mountain-naming-conventions)
