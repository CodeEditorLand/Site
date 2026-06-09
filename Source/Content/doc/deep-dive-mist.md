---
title: Mist - Deep Dive
section: Deep Dive
order: 6
description:
    Hickory DNS server setup, zone configuration, DNSSEC signing, forward
    resolver allowlist, Mountain launch integration, and DNS query routing for
    extension network policy enforcement.
---

Mist implements a full authoritative DNS server in Rust using the Hickory DNS
library, serving the `land.playform.cloud` zone over UDP and TCP on loopback.
Every component that needs a private service name-Cocoon's gRPC address, Air's
HTTP client, SideCar's download URLs-goes through this server. The design
ensures that neither extension code nor sidecar processes can resolve arbitrary
external hostnames without an explicit policy grant.

## Hickory DNS server setup

The server is initialized in `Source/Server.rs`. Hickory's catalog model is
used: a `Catalog` object owns one or more zone authorities, and the server
dispatches incoming queries to the correct authority by zone name. Mist
constructs the catalog by calling `build_catalog(port)`, which returns a fully
configured Hickory server ready to bind.

```rust
// Library entry point
let port = Mist::start(5380)?;
println!("DNS server on 127.0.0.1:{port}");
```

Startup sequence:

1. `portpicker` finds an available port if `5380` is taken.
2. `build_catalog(port)` constructs the zone authority for
   `land.playform.cloud`.
3. DNSSEC signing keys are loaded from the app data directory (generated on
   first run if absent).
4. Zone records are signed in memory; RRSIG records are attached before any
   query is answered.
5. UDP and TCP listeners are bound on `127.0.0.1:{port}`.
6. The bound port is returned to the caller (Mountain) and stored in `DnsPort`
   managed Tauri state.

## Zone configuration

The `land.playform.cloud` zone is defined in `Source/Zone.rs`. All records are
constructed in memory-no zone file is read from disk. The zone contains a SOA
record and a wildcard A record:

```
editor.land.  IN SOA  localhost. root.editor.land. (
    2026010100 ; serial
    3600       ; refresh
    900        ; retry
    86400      ; expire
    60         ; minimum TTL
)

*.editor.land.  IN A  127.0.0.1
```

The wildcard ensures that any subdomain of `land.playform.cloud`-whether
`cocoon.land.playform.cloud`, `api.land.playform.cloud`, or any other
name-resolves to `127.0.0.1` without requiring individual records. This is
intentional: new service endpoints added inside the editor do not require a DNS
configuration change.

## DNSSEC signing

Signing is handled in `Source/ForwardSecurity.rs` using `ring` for cryptographic
operations.

| Aspect           | Detail                                                                 |
| :--------------- | :--------------------------------------------------------------------- |
| Algorithm        | ECDSA P-256, algorithm number 13 in the DNS registry                   |
| Key generation   | `ring::signature::EcdsaKeyPair` generated on first run                 |
| Key persistence  | Written to the application data directory alongside the running `.app` |
| RRSIG generation | Applied to every RRset in the zone before the first query              |
| DNSKEY record    | Included in zone so clients can verify the signing key                 |

DNSSEC signing is applied to the authoritative zone only. Responses forwarded
from the upstream resolver for allowlisted domains pass through unsigned, as
Mist is not a validating resolver.

## Forward resolver and allowlist

`Source/Resolver.rs` implements `LandDnsResolver`, a wrapper around a Hickory
async resolver that points at the Mist server itself. Components that need to
make DNS queries (Air's HTTP client, SideCar's download tool) construct a
`LandDnsResolver` and use it instead of the system resolver.

`Source/ForwardSecurity.rs` enforces the forward allowlist. When a query does
not match the authoritative zone, `ForwardSecurity` checks the queried name
against the allowlist set. If the name matches, the query is forwarded to the
system upstream resolver and the result is returned. If it does not match,
`NXDOMAIN` is returned immediately.

Default allowlist entries:

| Domain                         | Purpose                   |
| :----------------------------- | :------------------------ |
| `marketplace.visualstudio.com` | Extension marketplace     |
| `update.editor.land`           | Application update server |
| `api.posthog.com`              | Telemetry (opt-in)        |

The allowlist is configurable and is loaded at startup. Runtime reloading is
supported without a server restart.

> [!WARNING] The allowlist applies to all extension code running in Cocoon. An
> entry added for one legitimate purpose grants that hostname to every installed
> extension simultaneously.

## DNS query routing

```
Incoming query
    |
    +---> Matches *.land.playform.cloud?
    |       YES: Return A 127.0.0.1 with RRSIG (authoritative)
    |
    +---> Name in forward allowlist?
    |       YES: Forward to system upstream resolver, return result
    |
    +---> Default: NXDOMAIN
```

Queries for names in the authoritative zone are answered directly from the
in-memory catalog without any network hop. This means all gRPC service discovery
for internal services (Cocoon connecting to Mountain, Air connecting to
Mountain) incurs no network latency-the answer is computed in memory.

## How Mountain launches Mist

Mountain's process management layer calls `Mist::start(5380)` from
`Source/ProcessManagement/`. The returned port is stored in Tauri's managed
state under `DnsPort`. Downstream consumers read this state:

- **Cocoon** receives the port as an environment variable before its Node.js
  process is spawned. The `NODE_OPTIONS` or a custom env var overrides the DNS
  resolver to `127.0.0.1:{DnsPort}`.
- **Air** reads `DnsPort` via IPC and passes it to `reqwest`'s custom resolver
  configuration.
- **SideCar** reads `DnsPort` at build time for download operations.

Because Mist binds before Mountain spawns any sidecar, the DNS server is
guaranteed to be available the first time a sidecar process attempts a lookup.

## WebSocket transport

`Source/WebSocket.rs` provides a secondary transport layer for Sky ↔ Cocoon
communication. This is distinct from the DNS functionality: it reuses Mist's
running Tokio runtime to host a WebSocket server that relays messages between
the browser-based Sky UI layer and the Cocoon extension host when gRPC is
unavailable or inappropriate for the communication pattern.

> [!IMPORTANT] The WebSocket transport in Mist is for data streaming between Sky
> and Cocoon. The planned S6 Mist WebSocket transport-a full replacement for
> Tauri IPC using WebSocket framing-is a separate future work item and is not
> currently implemented.

## Module reference

| File                        | Purpose                                                                   |
| :-------------------------- | :------------------------------------------------------------------------ |
| `Source/lib.rs`             | Public API: `start()`, `dns_port()`, `build_catalog()`, `land_resolver()` |
| `Source/Server.rs`          | Hickory catalog construction, UDP + TCP listener binding                  |
| `Source/Zone.rs`            | SOA and wildcard A record generation for `land.playform.cloud`            |
| `Source/Resolver.rs`        | `LandDnsResolver` struct, `land_resolver()` constructor                   |
| `Source/ForwardSecurity.rs` | DNSSEC signing, forward allowlist check and enforcement                   |
| `Source/WebSocket.rs`       | WebSocket server for Sky ↔ Cocoon streaming                               |

## Key dependencies

| Crate            | Version | Role                                         |
| :--------------- | :------ | :------------------------------------------- |
| `hickory-server` | 0.24    | Authoritative DNS server, catalog model      |
| `hickory-proto`  | 0.24    | Wire-protocol types and encoding             |
| `hickory-client` | 0.24    | Async DNS client used by the resolver        |
| `ring`           | 0.17    | ECDSA P-256 operations for DNSSEC            |
| `tokio`          | 1.49    | Async runtime for all I/O                    |
| `once_cell`      | 1.21    | Thread-safe initialization of the port state |
| `portpicker`     | 0.1.1   | Random available port fallback               |
| `reqwest`        | 0.13    | HTTP client integration with custom DNS      |
