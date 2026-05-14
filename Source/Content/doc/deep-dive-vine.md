---
title: "Vine - Deep Dive"
section: "Deep Dive"
order: 39
description:
    "gRPC protocol definitions, message types, and inter-process communication
    contracts"
---

# Vine - Deep Dive

Vine is the contract-first gRPC protocol layer defining strongly-typed
inter-process communication contracts between Mountain, Cocoon, Grove, and Air.

## Architecture

The proto files are the source of truth. Generated Rust code from tonic/prost is
used by Mountain for the server implementation and by Cocoon/Grove for client
stubs.

### Protocol Files

| Proto File  | Purpose                                                       |
| :---------- | :------------------------------------------------------------ |
| Vine.proto  | Core protocol: Mountain to Cocoon commands, events, handshake |
| Spine.proto | Extension host coordination: action/response pattern          |
| Grove.proto | Grove-specific: WASM host function calls, extension lifecycle |
| Air.proto   | Air daemon: updates, downloads, health checks                 |

### Modules

| Path                                                     |
| :------------------------------------------------------- | ----------------------------------------------- |
| Source/lib.rs - Library root, re-exports generated types |
| Source/Message/                                          | Structured message types shared across services |
| Source/Service/                                          | gRPC service trait implementations              |
| Source/Client/                                           | Protocol client helpers for consumer crates     |

## Communication Patterns

| Pattern                 | Use Case                                                |
| :---------------------- | :------------------------------------------------------ |
| Unary RPC               | Commands and queries                                    |
| Server streaming        | Mountain streams terminal output, diagnostics to Cocoon |
| Client streaming        | Cocoon sends batched registration at startup            |
| Bidirectional streaming | Spine protocol real-time extension host coordination    |

## Ports and Transport

| Service     | Port     | Transport                                         |
| :---------- | :------- | :------------------------------------------------ |
| Vine/Cocoon | 50052    | TCP loopback                                      |
| Air daemon  | 50053    | TCP loopback                                      |
| TLS         | Disabled | Loopback only, Mist DNS provides network boundary |

## Client Implementations

| Element    | Implementation                                  |
| :--------- | :---------------------------------------------- |
| Cocoon     | @grpc/grpc-js Node.js client                    |
| Grove      | tonic Rust client                               |
| Air daemon | tonic gRPC server (Mountain connects as client) |

## Request Flow Example

```
Wind UI -> Mountain Tauri invoke (executeCommand)
  -> Mountain serializes to CommandRequest protobuf
  -> gRPC unary call to Cocoon
  -> Cocoon returns CommandResponse protobuf
  -> Mountain deserializes, sends Tauri event with result
```

Proto files compiled at build time by prost-build in Mountain build script.

## Related

- [Vine overview](/doc/vine)
- [Cocoon gRPC client](/doc/deep-dive-cocoon)
- [Mountain gRPC server](/doc/deep-dive-mountain)
