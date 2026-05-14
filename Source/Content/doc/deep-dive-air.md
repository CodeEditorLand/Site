---
title: "Air - Deep Dive"
section: "Deep Dive"
order: 31
description:
    "Technical architecture of the Air background daemon: update management,
    resilient downloads, authentication, and health monitoring via gRPC."
---

# Air - Deep Dive

Air is a persistent background sidecar daemon in the Land ecosystem. It runs
alongside Mountain and offloads resource-intensive operations -- update
checking, artifact downloads, cryptographic authentication -- so the editor
remains responsive.

## Architecture

Air is a standalone Rust binary built around a central gRPC server on
port 50053. It receives task delegation from Mountain via the `Vine/Air.proto`
protocol and streams progress events back.

```text
Mountain Core -[gRPC]-> Air gRPC Server (port 50053) -[routes]-> Update/Download/Auth/Health modules
```

## Key Modules

| Path                     | Responsibility                                           |
| :----------------------- | :------------------------------------------------------- |
| `Source/Binary.rs`       | Entry point; bootstraps Tokio runtime                    |
| `Source/Initialize/`     | Startup sequence: config loading, server binding         |
| `Source/Vine/`           | gRPC server implementation via tonic                     |
| `Source/Updates/`        | Update lifecycle: check, download, verify, apply patches |
| `Source/Downloader/`     | Resilient downloads with pause, resume, and retry        |
| `Source/Authentication/` | Cryptographic signing and secure token storage           |
| `Source/HTTP/`           | HTTP client routing through Mist local DNS resolver      |
| `Source/HealthCheck/`    | Self-monitoring watchdog                                 |
| `Source/Metrics/`        | Telemetry collection and reporting                       |
| `Source/Logging/`        | Structured tracing output                                |
| `Source/CLI/`            | Command-line argument parsing                            |
| `Source/Resilience/`     | Retry logic and circuit breakers                         |
| `Source/Security/`       | Signature verification and secure storage                |
| `Source/Configuration/`  | Runtime config loading and hot-reload                    |

## Data Flow

Mountain delegates an update check to Air over gRPC. Air queries the update
server, returns release metadata, and upon Mountain's request begins a resilient
download. Progress events stream back to Mountain via bidirectional gRPC.

**Port allocation:**

- Air: `[::1]:50053`
- Cocoon: `[::1]:50052`

## Integration Points

| Connecting Element | Direction     | Mechanism                  | Description                                                         |
| :----------------- | :------------ | :------------------------- | :------------------------------------------------------------------ |
| Mountain           | Bidirectional | gRPC over `Vine/Air.proto` | Task delegation and progress streaming                              |
| Mist               | Inbound       | Local DNS resolver         | Air's HTTP client uses Mist for secure DNS                          |
| Vine               | Inbound       | Protocol definition        | `Air.proto` defines service contracts; tonic generates server stubs |

## Configuration

| Parameter                | Source                          | Description                                    |
| :----------------------- | :------------------------------ | :--------------------------------------------- |
| Bind address             | CLI flag / environment          | Default `[::1]:50053`, overridable for testing |
| Update server URL        | Configuration file              | Base URL for checking and downloading updates  |
| Download cache directory | Configuration file              | Storage location for partial downloads         |
| Health check interval    | Configuration file              | Self-monitoring frequency                      |
| Log level                | `RUST_LOG` environment variable | Tracing filter for structured output           |

Air is spawned automatically by Mountain at startup. Mountain checks for an
existing Air process before spawning a new instance to prevent duplicates.
