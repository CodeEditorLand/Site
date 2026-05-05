---
title: "Why gRPC"
section: "Technology"
order: 29
description:
    "Typed contracts at the wire: change a field, break every consumer at
    compile time."
---

# Why gRPC

A code editor is not a single process. It is a collection of cooperating
processes: a native backend, an extension host, a UI renderer, language servers,
and background daemons. These processes exchange a high volume of messages. The
protocol that carries those messages must be fast, typed, and evolvable. gRPC
meets all three requirements.

---

## Protocol Buffer Schema

Every message between Land's processes is defined in a Protocol Buffer
(`.proto`) file. The schema specifies field names, types, required/optional
status, and nesting. This schema is the single source of truth. When a field is
renamed or a message is restructured, the generated code in both Rust and
TypeScript fails to compile until every consumer is updated. This is not a
runtime assertion or a test. It is a compile-time guarantee.

---

## Generated Stubs in Rust and TypeScript

From each `.proto` file, Land generates Rust structs (via tonic/prost) and
TypeScript types (via ts-proto). The Rust backend and the TypeScript frontend
speak the same protocol, defined once. There is no manual serialization code, no
hand-written type definitions to keep in sync, and no JSON parsing ambiguity. If
the schema says a field is a `uint64`, the Rust code receives a `u64` and the
TypeScript code receives a `bigint`. No casting. No guessing.

---

## Binary Encoding

Protocol Buffers use a compact binary encoding. Messages are smaller and faster
to serialize than their JSON equivalents. For an editor exchanging syntax
tokens, diagnostic markers, and file change events at high frequency, the
bandwidth and CPU savings compound. The binary format also eliminates an entire
class of bugs related to JSON quirks: no surprise `undefined` vs `null`, no
number precision loss, no key ordering ambiguity.

---

## Low-Latency Local Transport

Land's gRPC channels run over Unix domain sockets on macOS and named pipes on
Windows - both avoid any TCP handshake, TLS overhead, or network stack
traversal. Message latency is measured in microseconds. For an editor where
every keystroke triggers a round trip to the language server, low IPC latency is
the difference between "instant" and "sluggish." The transport is
architecturally identical on both platforms: a local socket path on macOS, an
equivalent named pipe on Windows. Linux support follows the same pattern and is
on the roadmap.

---

## Streaming

gRPC supports four communication patterns: unary, server streaming, client
streaming, and bidirectional streaming. Land uses server streaming for file
watcher events, bidirectional streaming for language server communication, and
unary calls for one-shot commands. All four patterns share the same schema, the
same generated code, and the same transport. There is no separate WebSocket
layer for streaming and REST layer for requests.

---

## Schema Evolution

Protocol Buffers are designed for forward and backward compatibility. Fields can
be added without breaking existing consumers. Deprecated fields can be reserved
so their numbers are never reused. This allows Land to evolve its internal
protocol across versions without coordinated lockstep upgrades between elements.

---

## Where gRPC Appears in Land

The Vine element owns Land's gRPC infrastructure. Vine contains the `.proto`
definitions, the generated Rust server and client code, and the generated
TypeScript client stubs. Every IPC message between Mountain (native backend) and
Wind (workbench), between Cocoon (extension host) and Vine, and between Air
(daemon) and Mountain flows through gRPC channels defined in Vine.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Why Rust](/Doc/why-rust)
- [Why Tauri](/Doc/why-tauri)
- [API Reference](/Doc/api-reference)
