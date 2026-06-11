---
title: "Sidecar Telemetry"
section: "Telemetry"
order: 2
description:
    "How Cocoon, Air, and other sidecar processes emit telemetry and how it
    flows to the central sink."
---

Land runs several sidecar processes alongside Mountain: Cocoon (Node.js
extension host), Air (health and update service), and library crates such as
Echo, Mist, Rest, and Grove. Each sidecar participates in the shared
`land:<tier>:*` telemetry namespace so dashboards can pivot by element without
per-sidecar dashboard changes. All sidecars inherit the `DisableTelemetry`
posture from Mountain's environment - no sidecar has an independent telemetry
toggle.

## Shared Library Architecture

Telemetry primitives live in `Element/Common/Source/Telemetry/`. Every sidecar
that runs as a standalone process calls `Initialize::Fn(Tier::X)` once at
startup. Library crates that are linked into another process (Echo and Mist are
linked into Mountain; Mist is also linked into Air) never call
`Initialize::Fn` - they emit through the parent process's already-initialized
client.

```
Element/Common/Source/Telemetry/
├── Initialize.rs       - one-time setup, registers Tier and PostHog client
├── CaptureEvent.rs     - PostHog event emission, gated on cfg!(debug_assertions)
├── EmitOTLPSpan.rs     - OTLP span emission, one OTLP_TRACE_ID per process
└── Tier.rs             - enum: Mountain | Air | Echo | Rest | Grove | Mist | SideCar | Common
```

| Element  | Process type                         | Calls Initialize          | Tier value                      |
| -------- | ------------------------------------ | ------------------------- | ------------------------------- |
| Mountain | Standalone binary                    | Yes                       | `Tier::Mountain`                |
| Air      | Standalone binary                    | Yes                       | `Tier::Air`                     |
| Rest     | Standalone binary                    | Yes                       | `Tier::Rest`                    |
| Grove    | Standalone binary                    | Yes                       | `Tier::Grove`                   |
| SideCar  | Standalone binary                    | Yes                       | `Tier::SideCar`                 |
| Echo     | Library linked into Mountain         | No - inherits Mountain    | `$tier=mountain` in events      |
| Mist     | Library linked into Mountain and Air | No - inherits parent      | `$tier=mountain` or `$tier=air` |
| Cocoon   | Node.js process                      | Yes (via Effect-TS layer) | `"land.tier": "cocoon"`         |

## Cocoon PostHog Bridge

Cocoon's PostHog bridge lives at
`Element/Cocoon/Source/Telemetry/PostHogBridge.ts`. It handles event buffering,
identity management, and transport independently of Mountain.

### Event buffering

Events are accumulated in a local queue and flushed in batches. Two variables in
`.env.Land.PostHog` control the batching behavior:

| Variable   | Default | Effect                              |
| ---------- | ------- | ----------------------------------- |
| `Buffer`   | `3000`  | Flush window in milliseconds        |
| `Batch`    | `20`    | Maximum events per batch submission |
| `Throttle` | `5`     | Client-side rate-limit (max burst)  |

### Identity management

Cocoon assigns a `distinct_id` to the session using the `Brand` variable as a
seed. When `Brand` is empty (the production default), a per-process random ID is
generated. The session ID is stable within one Cocoon process lifetime and is
included on every event as `$session_id`.

### Session ID correlation

The `$session_id` property on PostHog events matches the `session_id` attribute
on OTLP spans emitted by the same Cocoon process. This allows a PostHog funnel
analysis to be linked directly to a Jaeger trace waterfall for the same session.

### Transport

Cocoon submits batches directly to the PostHog ingest endpoint configured in
`Beam`. No Mountain proxy is involved - Cocoon uses Node.js `https` to reach the
endpoint. If `Capture=false` or `Report=false`, the batch queue is never
populated and no network calls are made.

## Air Health Metrics

Air is the health and update service. It runs as a lightweight Rust binary and
calls `CommonLibrary::Telemetry::Initialize::Fn(Tier::Air)` at startup. Air
reports:

- Process health check results (alive / degraded / failed) for each supervised
  sidecar
- Memory and CPU snapshots at configurable intervals
- Update channel availability checks (version comparison results)

These are emitted as PostHog events under `land:air:*` and as OTLP spans.
Mountain reads Air's health reports over the local gRPC connection and can
expose aggregate health state to the workbench UI through the
`nativeHost:getHealthStatus` IPC handler.

## Mist DNS Metrics

Mist is the DNS resolution library. It is linked into both Mountain and Air.
Because it is a library crate, it never initializes its own telemetry client -
it emits through the parent process's client, stamped with that parent's tier.

Mist reports:

- Query counts per domain suffix category
- DNSSEC validation failures (emitted as `land:mist:dnssec:failure`)
- Resolution latency percentiles per query type

When Mist is running inside Mountain, these events appear in PostHog with
`$tier=mountain` and a `land.component=mist` attribute that distinguishes them
from Mountain-native events.

## How Telemetry Flows from Sidecars to the Central Sink

Each standalone sidecar process (Air, Rest, Grove, SideCar) submits directly to
the PostHog ingest endpoint and to the configured OTLP collector. There is no
Mountain proxy in the telemetry path - each process holds its own PostHog client
and OTLP exporter.

```
Air process
  └── CommonLibrary::Telemetry::CaptureEvent::Fn(...)
        ├── POST https://eu.i.posthog.com/batch/   (PostHog)
        └── OTLP HTTP POST to OTLPEndpoint          (Jaeger / Tempo)

Cocoon process
  └── PostHogBridge.CaptureEvent(...)
        ├── POST https://eu.i.posthog.com/batch/   (PostHog)
        └── BatchSpanProcessor → OTLPTraceExporter  (Jaeger / Tempo)
```

All processes read `OTLPEndpoint`, `Capture`, `Report`, and `OTLPEnabled` from
the environment that Mountain sourced from `.env.Land.PostHog` and propagated at
spawn time. Changing these values requires a process restart.

## Sidecar Telemetry Kill Switch

Sidecars inherit the telemetry posture from Mountain's environment at spawn
time. Setting `Capture=false` in `.env.Land.PostHog` before launching Mountain
means every child process (Cocoon, Air) also starts with `Capture=false`. There
is no per-sidecar override mechanism.

> [!WARNING] Runtime changes to `Capture` or `Report` after process start have
> no effect. The values are read once during `Initialize::Fn` (Rust) or during
> Effect layer construction (Cocoon). A full restart is required to change
> telemetry posture.

## Library Crates: Echo and Mist Inside Mountain

Echo and Mist are linked into Mountain as library crates. They call
`CommonLibrary::Telemetry::CaptureEvent::Fn(name, props)` directly without any
process boundary. The resulting PostHog events arrive with `$tier=mountain` and
a name that starts with `land:echo:*` or `land:mist:*`, making them
distinguishable from Mountain-native events without needing a separate dashboard
filter.

```rust
// Inside Echo, running in Mountain:
CommonLibrary::Telemetry::CaptureEvent::Fn(
	"land:echo:queue:saturated",
	Some(vec![("queue_depth", "1024")]),
);
// PostHog receives: $tier=mountain, event=land:echo:queue:saturated
```

## Cross-Tier Trace Joining

Every process that calls `EmitOTLPSpan::Fn` uses a single `OTLP_TRACE_ID`
constant for its lifetime, so all spans from one Air or Rest boot roll into one
Jaeger trace. Cross-process joining uses `$trace_id` on PostHog events: Cocoon's
bridge sets it from `OTLPBridge.TraceIdentifier()` on every event.

## Adding a New Sidecar

1. Add `Common = { workspace = true }` to `Element/<New>/Cargo.toml`.
2. Add a variant to the `Tier` enum in
   `Element/Common/Source/Telemetry/Tier.rs`.
3. Call `CommonLibrary::Telemetry::Initialize::Fn(Tier::<New>).await` from the
   binary's async entry point.
4. Optionally add a PostHog dashboard tile filtering on
   `event LIKE 'land:<new>:%'`.

Environment propagation from Mountain, OTLP fan-in, `$tier` tagging, and
production tree-shaking come for free from the Common library.

---

## See Also

- [Telemetry Overview](https://Editor.Land/Doc/telemetry/overview)
- [Effect-TS and OpenTelemetry Integration](https://Editor.Land/Doc/telemetry/effect-otel)
- [Tree-Shaking Telemetry](https://Editor.Land/Doc/telemetry/tree-shaking)
