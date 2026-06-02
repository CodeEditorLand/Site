---
title: "Telemetry Overview"
section: "Telemetry"
order: 19
description:
    "Two parallel telemetry pipes (PostHog and OTLP) sharing one trace_id across
    all Land layers."
---

# Telemetry Overview

Land emits telemetry through two parallel pipes that share one `trace_id`:

| Pipe        | Sink                       | Strength                            | Cost                           |
| ----------- | -------------------------- | ----------------------------------- | ------------------------------ |
| **PostHog** | `https://eu.i.posthog.com` | Aggregations, dashboards, retention | One event per millisecond cap  |
| **OTLP**    | `127.0.0.1:4318` (Jaeger)  | Per-request waterfall, parent/child | Local-only, requires collector |

Joining the pipes: every PostHog event carries `$trace_id` and `$span_id`
properties; every Jaeger span carries `posthog.event` / `posthog.distinct_id`
attributes. A HogQL JOIN against Jaeger's trace export -- or a manual
click-through from a PostHog event into the Jaeger UI -- reconstructs the full
causal chain.

## Layout

| Layer    | File / Module                                          | Pipe(s)        |
| -------- | ------------------------------------------------------ | -------------- |
| Build.sh | `Maintain/Script/PostHogCapture.sh`                    | PostHog + OTLP |
| Mountain | `Element/Mountain/Source/Binary/Build/PostHogPlugin/*` | PostHog        |
| Mountain | `Element/Mountain/Source/IPC/DevLog/EmitOTLPSpan.rs`   | OTLP           |
| Mountain | `Element/Mountain/Source/Telemetry/*`                  | OTLP (tracing) |
| Cocoon   | `Element/Cocoon/Source/Telemetry/PostHogBridge.ts`     | PostHog        |
| Cocoon   | `Element/Cocoon/Source/Telemetry/OTLPBridge.ts`        | OTLP           |
| Wind     | `Element/Wind/Source/Telemetry/Bridge.ts`              | both           |
| Sky      | `Element/Sky/Source/Function/Telemetry/Bridge.ts`      | both           |
| Output   | `Element/Output/Source/Telemetry/*`                    | both           |
| Sidecars | re-export Mountain's macros via the `tracing` crate    | OTLP           |

## Event-Name Convention

Every Land-emitted event uses the prefix `land:<element>:<action>`:

- `land:build:start`, `land:build:phase:complete`, `land:build:complete`,
  `land:build:error`
- `land:mountain:session:start`, `land:mountain:ipc:invoke`,
  `land:mountain:handler:complete`, `land:mountain:error`
- `land:cocoon:session:start`, `land:cocoon:entry:load`,
  `land:cocoon:entry:loaded`, `land:cocoon:handler:complete`,
  `land:cocoon:stub:active`, `land:cocoon:error`
- `land:wind:layer:ready`, `land:wind:command:invoke`
- `land:sky:build:complete`, `land:sky:resource:error`,
  `land:sky:throttle-dropped`
- `land:output:build:complete`
- `land:session:start`, `land:session:end` -- Sky-emitted aggregates
- `land:boot:timing` -- workbench boot percentile telemetry
- `land:ipc:marks`, `land:vscode:marks`, `land:extension-host:marks`,
  `land:all:marks` -- performance mark batches

PostHog's `$exception` autocapture stays as-is.

## Configuration - `.env.Land.PostHog`

Single source of truth for both pipes. Read at boot by every layer.

| Var            | Default                    | Effect                                       |
| -------------- | -------------------------- | -------------------------------------------- |
| `Authorize`    | `phc_...`                  | PostHog project key                          |
| `Beam`         | `https://eu.i.posthog.com` | PostHog endpoint                             |
| `Report`       | `true`                     | Master toggle for the PostHog pipe           |
| `OTLPEndpoint` | `http://127.0.0.1:4318`    | OTLP collector                               |
| `OTLPEnabled`  | `true`                     | Master toggle for the OTLP pipe              |
| `Capture`      | `true`                     | Master telemetry kill - short-circuits both  |
| `Trace`        | `all`                      | RUST_LOG-like span filter                    |
| `Record`       | `0`                        | Mirror every payload to a per-session NDJSON |
| `Brand`        | _(empty)_                  | `distinct_id` seed                           |
| `Throttle`     | `5`                        | posthog-js client-side rate-limit            |
| `Buffer`       | `3000`                     | Cocoon batch window (ms)                     |
| `Batch`        | `20`                       | Cocoon batch size                            |
| `Cap`          | `7`                        | Sky `$exception`/10 s                        |
| `Replay`       | `false`                    | posthog-js session recording                 |

## Production = Zero Bytes

Every layer compiles the telemetry stack out of release builds:

- **Rust** (Mountain, Air, Echo, Rest, Grove, Mist) -- capture paths gate on
  `cfg!(debug_assertions)`. LLVM dead-codes them in `--release`.
- **TypeScript** -- bridges import lazily through
  `if (process.env.NODE_ENV !== "production") { ... }` so esbuild's `define`
  collapses the conditional and tree-shakes the SDK.
- **Astro** -- bundle config checks `if (import.meta.env.DEV)` drops the
  posthog-js + OTLP SDK paths from `astro build`.

Plus runtime kill switches: `Capture=false` short-circuits all pipes regardless
of build mode; `Report=false` / `OTLPEnabled=false` flip a single pipe.

## Bring-up Sequence

```
# Once: bring up the local Jaeger collector.
sh Land/Container/Up.sh

# Every dev session: env vars feed every layer.
export Trace=all Record=1 Capture=true
sh Land/Maintain/Debug/Build.sh --profile debug-electron-bundled

# Run the binary; Mountain initialises both pipes from .env.Land.PostHog.
export Trace=all
./Element/Mountain/Target/debug/<binary>

# Inspect:
#   PostHog dashboards: https://eu.posthog.com/project/151871
#   Jaeger UI:          http://127.0.0.1:16686
```

---

## See Also

- [Effect-TS + OpenTelemetry Integration](https://land.playform.cloud/Doc/telemetry/effect-otel)
- [Sidecar Telemetry](https://land.playform.cloud/Doc/telemetry/sidecars)
- [Tree-Shaking Telemetry](https://land.playform.cloud/Doc/telemetry/tree-shaking)
