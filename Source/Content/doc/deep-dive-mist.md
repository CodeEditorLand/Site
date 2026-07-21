---
title: "Mist - Deep Dive"
navTitle: "Mist"
section: "Deep Dive"
order: 14
description:
    "Mist DNS isolation layer - local authoritative DNS server for the editor.land
    zone, Hickory DNS architecture, forward allowlist enforcement, DNSSEC zone
    signing, and resolver construction for consumer integration."
---

# Mist - Deep Dive

Mist provides the technical foundation DNS isolation layer
within the Land project. **Mist** operates a local authoritative DNS server
for the `editor.land` zone, ensuring all private network communication stays on
loopback and preventing sidecars from reaching unauthorized external hosts.

---

## Architecture

Mist is a Rust library built on Hickory DNS. It exposes a public API for
starting the server, querying the bound port, and constructing resolvers. The
DNS catalog contains two zones: an authoritative zone for `editor.land` and a
restricted forward allowlist for external queries.

```mermaid
graph TB
    subgraph "Mist - DNS Isolation Server"
        LibRS["lib.rs<br/>Public API: start / dns_port"]
        ServerRS["server.rs<br/>Hickory UDP + TCP listeners"]
        ZoneRS["zone.rs<br/>editor.land zone authority"]
        ResolverRS["resolver.rs<br/>DNS resolver for consumers"]
        ForwardSecurity["forward_security.rs<br/>External allowlist enforcement"]
    end

    subgraph "DNS Catalog"
        AuthZone["editor.land zone<br/>*.editor.land → 127.0.0.1"]
        ForwardZone["Forward allowlist<br/>update.editor.land only"]
        DNSSEC["DNSSEC<br/>ECDSA P-256 zone signing"]
    end

    subgraph "Consumers"
        Mountain["Mountain<br/>DnsPort managed state"]
        SideCar["SideCar<br/>Node.js DNS environment variable"]
        Cocoon["Cocoon<br/>editor.land resolution"]
    end

    LibRS --> ServerRS
    ServerRS --> ZoneRS
    ServerRS --> ForwardSecurity
    ZoneRS --> AuthZone
    ZoneRS --> DNSSEC
    ForwardSecurity --> ForwardZone
    LibRS --> ResolverRS
    Mountain --> LibRS
    SideCar --> ResolverRS
    Cocoon --> ResolverRS
```

---

## Key Modules

| Path                         | Description                                                                   |
| :--------------------------- | :---------------------------------------------------------------------------- |
| `Source/lib.rs`              | Public library API: `start(port)`, `dns_port()`, module re-exports            |
| `Source/server.rs`           | Hickory DNS server: UDP/TCP socket binding, catalog wiring, async accept loop |
| `Source/zone.rs`             | `editor.land` zone configuration: SOA, A records, wildcard resolution         |
| `Source/resolver.rs`         | `LandDnsResolver` - DNS client pointed at the local server for consumer use   |
| `Source/forward_security.rs` | Forward allowlist: rejects external queries not on the approved list          |
| `tests/integration.rs`       | Integration tests: zone resolution, DNSSEC verification, forward blocking     |

---

## Data Flow

```mermaid
sequenceDiagram
    participant App as Application (Wind / Cocoon)
    participant Resolver as Land DNS Resolver
    participant MistServer as Mist DNS Server
    participant Catalog as DNS Catalog

    App->>Resolver: resolve("api.editor.land")
    Resolver->>MistServer: DNS query (UDP 127.0.0.1:PORT)
    MistServer->>Catalog: Lookup "api.editor.land"
    Catalog->>MistServer: A record → 127.0.0.1 (authoritative)
    MistServer->>Resolver: DNS response with RRSIG
    Resolver->>App: 127.0.0.1

    App->>Resolver: resolve("external.example.com")
    Resolver->>MistServer: DNS query
    MistServer->>Catalog: Lookup "external.example.com"
    Catalog->>MistServer: Not in allowlist → REFUSED
    MistServer->>Resolver: REFUSED response
    Resolver->>App: Resolution error
```

**Startup sequence:**

1. Mountain calls `Mist::start(5380)` during initialization.
2. Mist attempts to bind to port 5380; if unavailable, `portpicker` selects an
   alternative.
3. The bound port is stored in Mountain's `DnsPort` managed Tauri state.
4. Mountain passes the port to Air and SideCar so they configure their DNS
   clients accordingly.

---

## Integration Points

| Connecting Element | Direction         | Mechanism                | Description                                                                                       |
| :----------------- | :---------------- | :----------------------- | :------------------------------------------------------------------------------------------------ |
| **Mountain**       | Consumer          | `Mist::start()` Rust API | Mountain starts Mist and stores the port in `DnsPort` managed state                               |
| **SideCar**        | Consumer          | Environment variable     | SideCar passes the DNS port to spawned Node.js processes via `NODE_EXTRA_CA_CERTS` / DNS override |
| **Cocoon**         | Indirect consumer | Node.js DNS override     | Cocoon resolves `cocoon.editor.land` and Mountain gRPC addresses through Mist                     |

---

## Configuration

| Parameter          | Value                | Description                                                  |
| :----------------- | :------------------- | :----------------------------------------------------------- |
| Preferred port     | `5380`               | Primary bind port; falls back to any available port if taken |
| Bind address       | `127.0.0.1`          | Loopback only - no external interface exposure               |
| Authoritative zone | `editor.land`        | All subdomains resolve to `127.0.0.1`                        |
| Forward allowlist  | `update.editor.land` | Only this domain may be resolved externally                  |
| DNSSEC algorithm   | ECDSA P-256          | Zone signing key algorithm                                   |
| Transport          | UDP + TCP            | Hickory serves both; clients may use either                  |

DNSSEC signing is performed at zone load time. The DNSKEY and RRSIG records are
included in responses to clients that request DNSSEC data (`DO` bit set).
