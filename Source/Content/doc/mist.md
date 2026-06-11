---
title: Mist
section: Elements
order: 6
description:
    Mist is a local DNS isolation server that intercepts all DNS queries for the
    editor.land zone, resolving private subdomains to loopback and blocking
    external access by allowlist.
---

Mist runs an authoritative Hickory DNS server for the `editor.land` zone,
binding exclusively on `127.0.0.1` so that every `*.editor.land` subdomain
resolves to `127.0.0.1` instead of reaching the public internet. It acts as a
network policy enforcement point: sidecar processes such as Cocoon and Air can
only resolve domains that appear on an explicit allowlist, and every other
external query receives `NXDOMAIN`. The zone is signed with ECDSA P-256 keys so
that DNSSEC-aware clients can verify the authenticity of every response.

## Why DNS isolation

VS Code extensions run arbitrary code. Without a network boundary a compromised
or buggy extension can resolve any hostname and exfiltrate data through DNS.
Mist closes that vector by becoming the sole resolver that Cocoon and Air are
allowed to use. Those processes are spawned with a DNS override pointing to
`127.0.0.1:5380`, so extension code cannot bypass the server regardless of which
port it attempts to use for its own UDP traffic.

DNS isolation also means that `*.editor.land` names never leave the machine.
gRPC addresses like `cocoon.editor.land` are private implementation details
that resolve only within the running editor process.

## Hickory DNS

Mist is built on Hickory DNS (formerly Trust-DNS), a pure-Rust async DNS
library. The server exposes both UDP and TCP listeners on port 5380. If port
5380 is already bound, `portpicker` selects a random available port and Mountain
receives the actual bound port back through `DnsPort` managed state. All query
handling runs on Tokio so no thread is ever blocked waiting for I/O.

| Dependency       | Version | Role                                        |
| :--------------- | :------ | :------------------------------------------ |
| `hickory-server` | 0.24    | DNS server and catalog management           |
| `hickory-proto`  | 0.24    | Wire-protocol encoding and decoding         |
| `hickory-client` | 0.24    | DNS client for the forwarding resolver path |
| `ring`           | 0.17    | ECDSA P-256 key generation and signing      |
| `tokio`          | 1.49    | Async runtime                               |
| `portpicker`     | 0.1.1   | Dynamic port selection on startup           |

## Zone configuration

The authoritative zone covers `editor.land` and all subdomains. The SOA
record is generated in memory at startup; no zone file on disk is required.

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

| Query pattern      | Response      | Behavior                                 |
| :----------------- | :------------ | :--------------------------------------- |
| `*.editor.land`    | `A 127.0.0.1` | Authoritative answer, RRSIG attached     |
| Allowlisted domain | Forwarded     | Pass-through to system upstream resolver |
| All other domains  | `NXDOMAIN`    | Refused by default                       |

## Forward allowlist

External queries are forwarded to the upstream resolver only for domains that
appear in the allowlist. The default set:

| Domain                         | Purpose                         |
| :----------------------------- | :------------------------------ |
| `marketplace.visualstudio.com` | Extension marketplace downloads |
| `update.editor.land`           | Application update server       |
| `api.posthog.com`              | Telemetry when user opts in     |

The allowlist is loaded from configuration at startup and can be updated at
runtime without restarting the server.

> [!IMPORTANT] The allowlist is the complete set of external hosts that all
> extensions can contact. Adding a domain grants network access to every
> extension, not only one. Treat allowlist changes as a security-sensitive
> operation.

## DNSSEC

The zone is signed with ECDSA P-256 (algorithm 13). On first run Mist generates
a key pair and writes it to the application data directory. Subsequent starts
load the cached keys and sign all zone records before the server begins
accepting queries.

| Aspect         | Detail                                                  |
| :------------- | :------------------------------------------------------ |
| Algorithm      | ECDSA P-256 (algorithm 13)                              |
| Key generation | Automatic on first run, persisted to app data directory |
| RRSIG records  | Generated in memory on zone load                        |

## WebSocket Transport (S6)

Mist includes a `WebSocket.rs` layer that will serve `*.editor.land` WebSocket
endpoints once the S6 Mist transport is active. Under S6, Sky communicates with
Cocoon over a local WebSocket connection routed through Mist's DNS zone rather
than through Tauri IPC, reducing per-call overhead from ~5 ms to under 1 ms for
the high-frequency calls that dominate a session. This transport is planned and
the source module is present; it is not yet the active path.

## Integration with Mountain and Air

Mountain calls `Mist::start(5380)` during application initialization and
receives the bound port as its return value. That port is stored in Tauri's
`DnsPort` managed state and forwarded to:

- **Cocoon** - spawned with an environment variable that overrides its DNS
  resolver to `127.0.0.1:{DnsPort}`, preventing the Node.js extension host from
  reaching arbitrary external hosts.
- **Air** - configures its `LandDnsResolver` so that all outbound HTTP requests
  from the background daemon pass through the same policy enforcement point.
- **SideCar** - uses the resolver when fetching runtime binaries during build
  setup.

## Source files

| File                        | Role                                                                |
| :-------------------------- | :------------------------------------------------------------------ |
| `Source/Server.rs`          | UDP and TCP DNS listeners, query dispatch via Hickory catalog       |
| `Source/Zone.rs`            | `editor.land` zone configuration and in-memory record generation    |
| `Source/Resolver.rs`        | DNS forwarding for allowlisted domains, `LandDnsResolver` struct    |
| `Source/ForwardSecurity.rs` | DNSSEC signing with ECDSA P-256, allowlist enforcement              |
| `Source/WebSocket.rs`       | WebSocket transport layer for Sky ↔ Cocoon data streaming           |
| `Source/lib.rs`             | Public API: `start(port)`, `dns_port()`, `DnsPort` state management |

## Usage

```rust
// Start on preferred port 5380
let port = Mist::start(5380)?;

// Or let the system pick an available port
let port = Mist::start(0)?;

println!("DNS server running on 127.0.0.1:{port}");
```

```rust
// Build a resolver for use in HTTP clients
let resolver = Mist::resolver::land_resolver(Mist::dns_port());
```
