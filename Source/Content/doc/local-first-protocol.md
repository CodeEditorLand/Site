---
title: "Local-First Protocol"
section: "Architecture"
order: 2
description: "Air Daemon protocol specification: discovery, sync, conflict resolution."
---

# Local-First Protocol

The Air Daemon provides optional peer-to-peer synchronization between Land
instances. This document describes the protocol used for discovery, data
transfer, and conflict resolution.

## Overview

Air is a background daemon that runs alongside the editor. It exposes a
WebSocket server on the local machine and discovers peers on the same network
using mDNS (Bonjour/Avahi). All communication is encrypted. No data passes
through external servers.

## Discovery

Air broadcasts a `_land-air._tcp` mDNS service record on the local network.
Each record contains:

- **Instance ID** — a UUID generated on first launch.
- **Port** — the WebSocket listen port (default: 18230).
- **Protocol version** — currently `air/1`.

When a peer is discovered, the initiating daemon opens a WebSocket connection
and performs a mutual authentication handshake using pre-shared keys exchanged
through a QR code or manual entry.

## Authentication

Air uses NaCl (libsodium) for all cryptographic operations:

1. Each instance generates a Curve25519 key pair on first launch.
2. Pairing exchanges public keys out-of-band (QR code, file, or manual paste).
3. Every WebSocket frame is encrypted with `crypto_box` (X25519 + XSalsa20 +
   Poly1305).

No certificate authority or TLS infrastructure is required.

## Sync Protocol

Once authenticated, peers exchange file state using a content-addressed protocol:

1. **Manifest exchange** — each peer sends a manifest listing file paths and
   their BLAKE3 hashes.
2. **Delta request** — the receiver identifies files whose hashes differ and
   requests the content.
3. **Content transfer** — files are sent as compressed (zstd) byte frames.
4. **Acknowledgment** — the receiver confirms receipt and updates its manifest.

Only changed files are transferred. Unchanged files are never re-sent.

## Conflict Resolution

When both peers have modified the same file since the last sync:

- **Default: last-write-wins** — the file with the more recent modification
  timestamp is accepted. The overwritten version is saved to a
  `.land/conflicts/` directory.
- **Manual merge** — the user is notified and can open a three-way merge view
  in the editor to resolve conflicts.

Conflict resolution strategy is configurable per workspace.

## Offline-First Guarantees

Air never blocks the editor. If no peers are available, the editor operates
normally. Sync resumes automatically when connectivity is restored. There is no
"offline mode" toggle — the editor is always fully functional.

## Self-Hosted Cloud Backup

Air can optionally push snapshots to an S3-compatible bucket or WebDAV endpoint.
This provides off-site backup without depending on a proprietary cloud service.
Configure the endpoint in `~/.land/settings/Air.json`.
