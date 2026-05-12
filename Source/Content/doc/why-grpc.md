---
title: "Why gRPC"
section: "Technology"
order: 29
description:
    "Typed contracts at the wire: one schema for Rust and TypeScript callers."
---

# Why gRPC

Land uses Protocol Buffers and gRPC because the editor is split across
cooperating elements. Mountain, Cocoon, Air, Grove, and other services need
shared message contracts that can be generated into Rust and TypeScript.

The important claim is not a latency slogan. The important claim is that a route
starts from a `.proto` contract, generated code, and a named service boundary.

---

## Protocol Buffer Schema

Every Vine message is defined in a `.proto` file. The schema specifies field
names, types, and service methods. Generated Rust and TypeScript code keeps both
sides aligned when implemented routes change.

---

## Generated Stubs

Rust uses tonic and prost. TypeScript uses generated stubs for the Cocoon and
frontend side. This avoids hand-written JSON contracts for critical IPC paths.

---

## Streaming And Cancellation

gRPC gives Land unary requests, notifications, cancellation, and streaming
routes under one schema model. The current source includes bidirectional
Mountain and Cocoon channels, plus Air and Grove protocol definitions.

---

## Where gRPC Appears

Vine owns the protocol layer. Mountain exposes and consumes gRPC services.
Cocoon runs a gRPC server and client for extension-host work. Air and Grove also
define service contracts. Not every internal call goes through gRPC, so public
copy should name the route instead of saying all communication uses one channel.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Why Rust](/Doc/why-rust)
- [Why Tauri](/Doc/why-tauri)
- [API Reference](/Doc/api-reference)
