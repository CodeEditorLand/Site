---
title: "Air"
section: "Elements"
order: 0
description:
    "Air is the persistent background daemon that offloads update management,
    authentication, file indexing, and health monitoring from the main editor
    process."
---

Air is the persistent background sidecar daemon for FIDDEE. It runs as a
standalone Rust binary alongside Mountain, surviving window closures and editor
restarts, so resource-intensive operations never compete with user interaction.
Mountain spawns Air at startup and communicates with it exclusively via the Vine
gRPC protocol on port 50053.

## Role in the System

Air exists because certain operations are too disruptive to run in the main
process. Downloading a multi-megabyte update payload blocks network bandwidth.
Scanning a large workspace for symbols saturates I/O. Verifying cryptographic
signatures consumes CPU time. Air absorbs all of this, freeing Mountain to stay
responsive to keystrokes and renders.

| Component        | Role                                                                                |
| ---------------- | ----------------------------------------------------------------------------------- |
| Daemon process   | Persistent executable independent of the main window lifecycle                      |
| gRPC server      | Hosts a local server on `[::1]:50053` accepting commands from Mountain              |
| Update delegate  | Sole authority for modifying installation files of the parent application           |
| Download manager | Handles large network transfers for extensions, language servers, and dependencies  |
| File indexer     | Builds and maintains a persistent file index with symbol extraction for fast search |
| Auth service     | Manages token lifecycle, credential storage, and cryptographic signing              |
| Health monitor   | Periodically checks its own service health and reports status back to Mountain      |

## Services

Air exposes five services through its `BackgroundServices` gRPC interface.

**UpdateService** owns the full update lifecycle: querying the update server for
release manifests, downloading artifacts over HTTPS with SHA-256 verification,
staging the new binary, and applying the update on the next restart. Rollback
restores the previous version on failure.

**DownloadService** provides resilient background downloads for any large
asset - extension packages, language server binaries, grammar files. Downloads
use HTTP Range headers for resume capability, exponential backoff on retry, and
configurable rate limiting. Progress streams back to Mountain via gRPC so the
status bar can reflect bytes received in real time.

**AuthService** manages authentication tokens for cloud services. Credentials
are stored with AES-256-GCM encryption using a machine-stable key. The service
handles token refresh, key rotation, and login flow orchestration.

**IndexService** builds a searchable content index of the workspace. A file
system walker discovers all files respecting `.gitignore` patterns, extracts
content and symbol tokens, and constructs an inverted index. File system change
events trigger incremental updates so the index stays current without a full
rescan.

**HealthService** provides multi-level health checks - alive, responsive,
functional - for each internal service, with automatic recovery actions and
Prometheus-compatible metric emission.

## Lifecycle

Mountain spawns Air during its startup sequence if no existing Air process is
detected (enforced via PID lock). Once running, both sides exchange heartbeats
every five seconds. Mountain detects a dead Air process after three missed
heartbeats and respawns it.

```
Mountain starts
  -> AirManagement checks for existing Air process
  -> Spawns Air binary if not running
  -> gRPC connection established on [::1]:50053
  -> Air registers available services
  -> Heartbeat monitoring begins (5s interval)

Mountain shuts down
  -> SIGTERM sent to Air
  -> Graceful drain (5s timeout)
  -> Force kill if not exited
```

Air persists across editor window close/reopen cycles. A staged update download
initiated before a window close continues to completion while Air keeps running,
so the update is ready when the user reopens the editor.

## Port Allocation

| Process | Port  | Protocol                | Purpose                    |
| ------- | ----- | ----------------------- | -------------------------- |
| Air     | 50053 | Vine / Air.proto (gRPC) | Background daemon services |
| Cocoon  | 50052 | Vine.proto (gRPC)       | Extension host services    |

## Source Structure

```
Air/Source/
    Binary.rs                # Entry point; bootstraps Tokio runtime
    Binary/                  # Daemon lifecycle (startup, shutdown, monitoring)
    Daemon/                  # Singleton enforcement, PID locking
    Initialize/              # Config loading, port binding, gRPC server construction
    CLI/                     # Command-line argument parsing
    Vine/                    # gRPC server implementation (tonic + prost bindings)
    ApplicationState/        # Central coordination: connections, service states
    Configuration/           # TOML config with schema validation and hot reload
    Updates/                 # Version check, download, verify, staged install, rollback
    Downloader/              # Parallel downloads, chunk transfers, rate limiting
    Authentication/          # Token management, AEAD encryption, key rotation
    Indexing/                # File index, symbol extraction, FS watch
    HealthCheck/             # Multi-level health monitoring
    Resilience/              # Retry with backoff, circuit breaker, bulkhead
    Security/                # Checksum verification, AES-GCM credential storage
    HTTP/                    # Secure HTTP client with Mist DNS integration
    Logging/                 # Structured JSON logging
    Metrics/                 # Prometheus-compatible metrics
    Tracing/                 # Distributed tracing
```

## Key Dependencies

| Crate                | Purpose                                                |
| -------------------- | ------------------------------------------------------ |
| `tonic` / `prost`    | gRPC server and Protocol Buffer code generation        |
| `tokio`              | Async runtime for concurrent I/O                       |
| `reqwest` / `rustls` | HTTPS downloads with TLS verification                  |
| `ring` / `zeroize`   | Cryptographic operations and secure credential storage |
| `notify` / `ignore`  | File system event watching for index updates           |
| `walkdir`            | Recursive directory traversal for file indexing        |
| `config` / `toml`    | Configuration loading with hot-reload support          |
| `sysinfo`            | System resource monitoring for health checks           |

> [!IMPORTANT] Air is not a public update server. The update delivery
> infrastructure, release signing, and installer distribution path are being
> prepared separately. The source modules are active; the public release channel
> is not yet operational.

## Related Documentation

- [Air Deep Dive](https://editor.land/Doc/deep-dive-air)
- [Mountain](https://editor.land/Doc/mountain)
- [Vine](https://editor.land/Doc/vine)
- [Source Code](https://github.com/CodeEditorLand/Air)
