---
title: "Local-First Protocol"
section: "Architecture"
order: 5
description:
    "Air Daemon protocol design: discovery, sync, and conflict resolution."
---

# Local-First Protocol

> **Note: The peer-to-peer sync protocol described here is the design
> specification for the Air Daemon. Air exists as an active Rust background
> daemon, but the full sync protocol - including mDNS discovery, mutual
> authentication, and content-addressed delta transfer - is under active
> development. Specific constants, port numbers, and file paths in this
> document reflect the intended design, not a confirmed working
> implementation. This page will be updated as features ship.**

The Air Daemon provides optional peer-to-peer synchronisation between Land
instances. This document describes the design of the protocol used for
discovery, data transfer, and conflict resolution. All synchronisation is
local-network-first: no data passes through external servers.

---

## Design Principles

Land's sync layer is built on three commitments:

- **Local-first** - the editor is always fully functional without network
  access. Sync is additive, never blocking.
- **No central relay** - peers discover and communicate with each other
  directly on the local network. There is no Land-operated server in the
  data path.
- **Encrypted by default** - all peer communication is encrypted at the
  frame level using established cryptographic primitives. No certificate
  authority or TLS infrastructure is required.

---

## Discovery

Air is designed to broadcast an mDNS service record on the local network.
Each record will contain an instance ID (a UUID generated on first launch),
a listen port, and a protocol version identifier. When a peer is discovered,
the initiating daemon opens a connection and performs a mutual authentication
handshake using pre-shared keys exchanged out-of-band (such as a QR code or
manual key entry).

---

## Authentication

Air is designed to use NaCl (libsodium) for all cryptographic operations.
The intended scheme is:

1. Each instance generates a Curve25519 key pair on first launch.
2. Pairing exchanges public keys out-of-band.
3. Every frame is encrypted using `crypto_box` (X25519 + XSalsa20 +
   Poly1305).

This eliminates the need for a certificate authority, a PKI, or TLS
negotiation. Trust is established directly between two instances via
key exchange.

---

## Sync Protocol

Once authenticated, the design calls for peers to exchange file state using
a content-addressed protocol:

1. **Manifest exchange** - each peer sends a manifest listing file paths
   and their content hashes (BLAKE3).
2. **Delta request** - the receiver identifies files whose hashes differ
   and requests only those.
3. **Content transfer** - changed files are sent as compressed byte frames.
4. **Acknowledgment** - the receiver confirms receipt and updates its
   manifest.

Only changed files are transferred. This design avoids re-sending content
that both peers already have.

---

## Conflict Resolution

When both peers have modified the same file since the last sync, the
intended behaviour is:

- **Default: last-write-wins** - the file with the more recent modification
  timestamp is accepted. The overwritten version is preserved in a
  conflicts directory within the workspace.
- **Manual merge** - the user is notified and can open a three-way merge
  view to resolve conflicts.

Conflict resolution strategy is intended to be configurable per workspace.

---

## Offline-First Guarantees

Air is designed never to block the editor. If no peers are available, the
editor operates normally. Sync is intended to resume automatically when
connectivity is restored. There is no "offline mode" toggle - the editor
is always fully functional regardless of network state.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Air](/Doc/air)
- [Configuration](/Doc/configuration)
