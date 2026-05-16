---
title: "Mist - Deep Dive"
section: "Deep Dive"
order: 38
description:
    "Local DNS server, editor.land zone authority, and DNSSEC enforcement"
---

# Mist - Deep Dive

Mist operates a local authoritative DNS server for the `editor.land` zone,
ensuring all private network communication stays on loopback and preventing
sidecars from reaching unauthorized external hosts.

## Architecture 🚀

Built on Hickory DNS. Two zones: an authoritative `editor.land` zone and a
restricted forward allowlist.

### Modules

|| Path | ||
------------------------------------------------------------------------------ |
| `Source/lib.rs` - Public API: `start(port)`, `dns_port()`, `LandDnsResolver` |
| `Source/server.rs` - Hickory UDP + TCP listeners, catalog wiring | |
`Source/zone.rs` - `editor.land` zone: SOA, A records, wildcard resolution | |
`Source/resolver.rs` - DNS client pointed at the local server for consumer use |
| `Source/forward_security.rs` - Forward allowlist enforcement |

## Configuration ⚙️

| Parameter          | Value                                                  |
| ------------------ | ------------------------------------------------------ |
| Preferred port     | `5380` (fallback via portpicker)                       |
| Bind address       | `127.0.0.1` (loopback only)                            |
| Authoritative zone | `editor.land` - all subdomains resolve to `127.0.0.1`  |
| Forward allowlist  | `update.editor.land` only domain resolvable externally |
| DNSSEC             | ECDSA P-256 zone signing                               |
| Transport          | UDP + TCP                                              |

## Startup Sequence 🏁

1. Mountain calls `Mist::start(5380)` during initialization
2. Mist binds to port; portpicker selects alternative if unavailable
3. Bound port stored in Mountain's `DnsPort` managed Tauri state
4. Mountain passes port to Air, SideCar, and Cocoon for DNS client configuration

## Resolution Flow 🔍

For `api.editor.land`: query resolves to `127.0.0.1` (authoritative, with
RRSIG). For external domains not in allowlist: query returns `REFUSED`.

## Integration Points 🔗

| Element  | Direction | Mechanism                                                     |
| -------- | --------- | ------------------------------------------------------------- |
| Mountain | Consumer  | `Mist::start()` Rust API, stores port in DnsPort state        |
| Air      | Consumer  | `LandDnsResolver` for HTTP client DNS override                |
| SideCar  | Consumer  | Environment variable passed to Node.js processes              |
| Cocoon   | Consumer  | Resolves `cocoon.editor.land` and gRPC addresses through Mist |

## Related Documentation 📖

- [Architecture overview](https://Editor.Land/Doc/architecture)
- [Mist GitHub repository](https://github.com/CodeEditorLand/Mist)
- [Air HTTP client DNS configuration](https://Editor.Land/Doc/deep-dive-air)
