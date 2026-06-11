---
title: "Air - Deep Dive"
section: "Deep Dive"
order: 0
description: "Technical architecture of the Air background daemon: gRPC service
    definitions, update pipeline, authentication, indexing, and connection
    lifecycle with Mountain."
---

Air is a standalone Rust binary structured around a central tonic gRPC server.
It receives task delegation from Mountain via the `BackgroundServices` service
defined in `Vine/Air.proto` and streams progress events back over the same
connection. This page covers the internal design of each service, the connection
lifecycle, and the health check protocol.

## gRPC Service Definitions

Air's protocol is defined in `Air.proto` and compiled into Rust stubs by
`tonic-build` at build time. The `BackgroundServices` service is the single
entry point for all Mountain→Air communication.

```protobuf
service BackgroundServices {
    rpc Connect(ConnectRequest) returns (ConnectResponse);
    rpc Disconnect(DisconnectRequest) returns (DisconnectResponse);
    rpc Heartbeat(HeartbeatRequest) returns (HeartbeatResponse);
    rpc PerformAction(ActionRequest) returns (ActionResponse);
    rpc CancelAction(CancelRequest) returns (CancelResponse);
    rpc HealthCheck(HealthCheckRequest) returns (HealthCheckResponse);
    rpc GetStatus(StatusRequest) returns (StatusResponse);
}
```

`PerformAction` is the primary dispatch method. The `ActionRequest` carries an
action type discriminant and a serialized payload. Air routes the request to the
appropriate internal service module based on the discriminant.

Progress for long-running operations (downloads, index scans) is delivered via a
separate streaming channel. Mountain opens a bidirectional stream at connection
time; Air writes progress frames to it without waiting for a polling request.

## UpdateService: Download, Verify, Apply

The update pipeline runs in five phases. Each phase is a distinct module under
`Source/Updates/`.

| Phase           | Module             | Operation                                                                                             |
| --------------- | ------------------ | ----------------------------------------------------------------------------------------------------- |
| Check           | `CheckForUpdate`   | HTTP GET to the update server for a release manifest containing version, URL, checksum, and signature |
| Verify manifest | `VerifySignature`  | Checks the Ed25519 signature on the manifest against the embedded public key                          |
| Download        | `DownloadArtifact` | Fetches the artifact via the DownloadService with resume capability                                   |
| Verify artifact | `VerifyChecksum`   | SHA-256 verification of the downloaded file against the manifest checksum                             |
| Stage           | `StageUpdate`      | Moves the verified binary into a staging directory alongside the running installation                 |
| Apply           | `ApplyUpdate`      | Replaces the running binary on next restart; writes a marker file that Mountain reads at boot         |
| Rollback        | `RollbackUpdate`   | Restores the previous binary from a backup copy on any apply failure                                  |

The update server URL and staging directory are read from the TOML configuration
file. Hot-reload allows these to change without restarting Air.

> [!WARNING] `ApplyUpdate` replaces files that belong to the running
> installation. It must run in Air rather than Mountain because Mountain cannot
> replace its own binary while executing. Air's PID lock prevents two Air
> instances from racing to apply an update simultaneously.

## DownloadService: Resilient Transfer

The download manager handles all large asset transfers. Key implementation
details:

**Resume capability.** Downloads use HTTP Range headers. A partial download is
tracked in a `.part` file alongside the final destination. On retry, Air reads
the current file size and resumes from that byte offset.

**Retry policy.** Three attempts with exponential backoff (1s, 2s, 4s). After
all retries are exhausted, Air returns a failure `ActionResponse` to Mountain.
Mountain surfaces the error in the status bar.

**Rate limiting.** A token bucket per download enforces configurable bandwidth
caps. The default is unlimited; the configuration key
`max_download_bytes_per_second` sets the cap.

**Progress streaming.** Every 512 KB received, Air writes a
`ProgressFrame { bytes_received, total_bytes, speed_bps }` to the bidirectional
stream. Mountain updates the UI progress bar from these frames.

**Concurrency.** A bounded semaphore limits simultaneous downloads. The default
is three concurrent downloads; the configuration key `max_concurrent_downloads`
controls this.

## AuthService: Token Management and Keyring Integration

AuthService handles two concerns: secure credential storage and token lifecycle
management.

**Storage.** Credentials are encrypted with AES-256-GCM before writing to disk.
The encryption key is derived from the machine UUID via SHA-256, making
credentials machine-bound. The `ring` crate provides the AEAD implementation;
`zeroize` zeroes key material from memory after use.

**Token lifecycle.** For OAuth-based services, AuthService tracks token expiry
and initiates refresh flows before expiry. Refresh requests go through the HTTP
client using the stored refresh token. On success, the new access token replaces
the old one in encrypted storage.

**Keyring integration.** On macOS, AuthService can delegate to the system
Keychain via the `keychain-access` abstraction in `Source/Security/`. This is
preferred for tokens that must survive OS reinstalls or machine migrations.

**Audit log.** Every credential read and write is recorded to a structured log
with a timestamp and the caller identifier. The audit log is retained for 30
days and is read-only from Mountain's perspective.

## IndexService: Workspace Indexing Strategy

The indexer builds a searchable content index without blocking the editor.

**Discovery.** A `walkdir` traversal finds all files under the workspace root.
The `ignore` crate applies `.gitignore`, `.ignore`, and configurable exclude
patterns. Binary files are skipped based on a content-type sniff of the first
512 bytes.

**Extraction.** For each text file, the indexer extracts:

- Raw content tokens for full-text search
- Symbol tokens (function names, class names, identifiers) using a
  language-agnostic heuristic based on word boundaries and capitalization
  patterns
- File metadata (size, mtime, language guess from extension)

**Index structure.** An inverted index maps tokens to file paths and byte
offsets. The index is persisted to a SQLite database in the Air data directory
(`~/.land/data/air/index.db`) and survives daemon restarts.

**Incremental updates.** A `notify` file system watcher listens for change
events on the workspace root. On a file change event, the indexer re-processes
only the affected file and updates its entries in the index. Debouncing (300 ms)
coalesces rapid successive changes.

**Search interface.** Mountain sends a `SearchRequest { query, max_results }`
via gRPC. The indexer runs a BM25-scored lookup against the inverted index and
returns ranked results with snippet previews.

## Connection Lifecycle and Reconnect Handling

The connection between Mountain and Air follows a structured handshake:

```
1. Mountain spawns Air binary
   - Passes environment: VINE_PORT=50053, DATA_DIR, LOG_LEVEL

2. Air binds gRPC server on [::1]:50053
   - Registers BackgroundServices handler
   - Begins accepting connections

3. Mountain connects and sends ConnectRequest
   - Payload: { mountain_version, capabilities: ["updater", "indexer", "auth", "downloader"] }
   - Air responds with ConnectResponse listing accepted capabilities

4. Heartbeat loop starts
   - Both sides send Heartbeat every 5 seconds
   - HeartbeatResponse includes: { cpu_percent, memory_bytes, active_tasks }
   - Mountain logs resource usage for diagnostics

5. Mountain opens progress stream
   - Bidirectional stream for progress frames
   - Air writes frames; Mountain reads them on a background task

6. Normal operation: Mountain sends PerformAction; Air executes and responds
```

**Reconnect.** If the gRPC connection drops (network reset, OS resource
pressure), Mountain's gRPC client retries with exponential backoff starting at
100 ms, capped at 5 s. If reconnection fails after 30 s, Mountain attempts to
respawn the Air binary.

**PID lock.** Air writes its PID to `~/.land/data/air/air.pid` at startup.
Before spawning, Mountain checks whether a process with that PID is still alive.
If it is, Mountain skips the spawn and dials the existing instance.

## Health Check Protocol

HealthService implements three health levels:

| Level      | Check                                                                                        | Recovery                                                                |
| ---------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Alive      | Process is running and gRPC server accepts connections                                       | Mountain respawns Air                                                   |
| Responsive | Air responds to `Heartbeat` within 2 s                                                       | Mountain logs warning; escalates to respawn after 3 failures            |
| Functional | Each service module passes its self-test (e.g., download client can reach the update server) | Air emits a degraded status; Mountain shows a warning in the status bar |

Functional checks run on a configurable interval (default: 300 s). Results are
cached and returned immediately on subsequent `HealthCheck` calls until the next
scheduled check.

## Source Module Map

| Path                     | Purpose                                                      |
| ------------------------ | ------------------------------------------------------------ |
| `Source/Binary/`         | Daemon process lifecycle: startup, shutdown, signal handling |
| `Source/Daemon/`         | PID lock, singleton enforcement, platform-native integration |
| `Source/Initialize/`     | Config loading, port binding, per-service startup sequence   |
| `Source/Vine/`           | tonic gRPC server; routes `ActionRequest` to service modules |
| `Source/Updates/`        | Five-phase update pipeline                                   |
| `Source/Downloader/`     | Resilient download manager                                   |
| `Source/Authentication/` | AES-256-GCM credential storage, token lifecycle              |
| `Source/Indexing/`       | File walker, symbol extractor, inverted index, FS watcher    |
| `Source/HealthCheck/`    | Three-level health check with auto-recovery                  |
| `Source/Resilience/`     | Retry, circuit breaker, bulkhead, timeout                    |
| `Source/Security/`       | Checksum verification, AEAD storage, audit log               |
| `Source/HTTP/`           | reqwest client configured to use Mist DNS resolver           |
| `Source/Configuration/`  | TOML config with schema validation and hot-reload            |
| `Source/Metrics/`        | Prometheus-compatible counters and histograms                |

## Related Documentation

- [Air overview](https://Editor.Land/Doc/air)
- [Vine protocol](https://Editor.Land/Doc/vine)
- [Mountain deep dive](https://Editor.Land/Doc/deep-dive-mountain)
- [Source Code](https://github.com/CodeEditorLand/Air)
