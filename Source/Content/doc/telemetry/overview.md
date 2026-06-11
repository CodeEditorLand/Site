---
title: "Telemetry Overview"
section: "Telemetry"
order: 0
description:
    "Land's opt-in dual-pipe telemetry system: what is collected, what is not,
    and how to verify it is off."
---

Land emits usage analytics through PostHog and distributed traces through
OpenTelemetry. Both pipes are opt-in, disabled by default in production builds,
and can be eliminated entirely at build time. This document covers what is
collected, what is explicitly excluded, and which elements participate.

## What Is Collected

PostHog receives product analytics events using the `land:<element>:<action>`
naming convention. These events cover application lifecycle, IPC handler
completions, extension activation, and workbench boot timing. No event payload
contains user-generated content.

OTLP (OpenTelemetry Protocol) receives distributed trace spans. Spans cover
extension activation, gRPC call durations, IPC handler invocations, and build
phase timings. Every span carries `trace_id` and `span_id` so the full causal
chain across Mountain, Cocoon, and Sky can be reconstructed in a local Jaeger or
Tempo collector.

> [!IMPORTANT] File contents, editor keystrokes, extension source code,
> workspace paths, and Git history are never included in any telemetry event or
> span attribute.

## Elements That Participate

| Element                            | PostHog               | OTLP                  | Implementation path                                                       |
| ---------------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------- |
| Mountain (Rust)                    | Yes                   | Yes                   | `Source/Binary/Build/PostHogPlugin/`, `Source/IPC/DevLog/EmitOTLPSpan.rs` |
| Cocoon (Node.js)                   | Yes                   | Yes                   | `Source/Telemetry/PostHogBridge.ts`, `Source/Telemetry/OTLPBridge.ts`     |
| Wind (TypeScript)                  | Yes                   | Yes                   | `Source/Telemetry/Bridge.ts`                                              |
| Sky (Astro/browser)                | Yes                   | Yes                   | `Source/Function/Telemetry/Bridge.ts`                                     |
| Air (Rust sidecar)                 | Via Common            | Via Common            | `CommonLibrary::Telemetry::Initialize::Fn(Tier::Air)`                     |
| Sidecars (Echo, Mist, Rest, Grove) | Inherit Mountain tier | Inherit Mountain tier | Linked via `Element/Common/Source/Telemetry/`                             |
| Build scripts                      | PostHog only          | No                    | `Maintain/Script/PostHogCapture.sh`                                       |

Mountain's diagnostic log (`Trace=` tag filtering) is a separate, local-only
mechanism. It does not transmit data off the machine.

## Opt-In Model

All telemetry is off by default in release and production builds. The
`.env.Land.PostHog` file controls both pipes. Development defaults ship with
`Capture=true`, `Report=true`, and `OTLPEnabled=true` so contributors have local
observability. The production overlay (`.env.Land.Production.PostHog`) sets
`Capture=false`, `Report=false`, and `OTLPEnabled=false`.

Enabling telemetry in a development build:

```bash
# .env.Land.PostHog
Authorize=phc_your_project_key
Beam=https://eu.i.posthog.com
Report=true
OTLPEndpoint=http://127.0.0.1:4318
OTLPEnabled=true
Capture=true
```

> [!IMPORTANT] `Authorize` (PostHog project key) and `OTLPEndpoint` must both be
> explicitly set. Neither has a meaningful default in production.

## Kill Switch

Setting `Capture=false` in `.env.Land.PostHog` (or its production overlay)
short-circuits all telemetry in every element simultaneously. This is the master
kill switch. Individual pipes can also be toggled independently:

| Variable      | Default (dev) | Production default | Effect                                     |
| ------------- | ------------- | ------------------ | ------------------------------------------ |
| `Capture`     | `true`        | `false`            | Short-circuits PostHog and OTLP everywhere |
| `Report`      | `true`        | `false`            | Disables PostHog pipe only                 |
| `OTLPEnabled` | `true`        | `false`            | Disables OTLP pipe only                    |

The `Disable` variable in `.env.Land.Diagnostics` goes further: it skips all
Land shims, connections, and spawn calls, reducing the application to
near-vanilla VS Code behavior. This is for bisecting regressions, not routine
telemetry management.

## Verifying Telemetry Is Off

### Check the environment

```bash
# Confirm Capture is false before building
grep Capture Land/.env.Land.Production.PostHog
# Expected: Capture=false
```

### Check the diagnostic log

Set `Trace=all Record=1` during a dev run and inspect the log:

```bash
export Trace=all Record=1
./Element/Mountain/Target/debug/<binary>
grep "telemetry\|PostHog\|OTLP" "$(ls -t ~/Library/Application\ Support/*/logs/*/Mountain.dev.log | head -1)"
# If Capture=false: no capture lines appear
```

### Check build output (release)

```bash
cargo build -p Mountain --release
strings Element/Mountain/Target/release/Mountain | grep -c "posthog\|i.posthog.com"
# 0
```

See [Tree-Shaking Telemetry](https://Editor.Land/Doc/telemetry/tree-shaking) for
the full build-time verification procedure.

## Event Naming Convention

Every Land-emitted PostHog event uses the format `land:<element>:<action>`:

- `land:mountain:session:start`, `land:mountain:ipc:invoke`,
  `land:mountain:handler:complete`
- `land:cocoon:session:start`, `land:cocoon:entry:load`,
  `land:cocoon:handler:complete`, `land:cocoon:stub:active`
- `land:wind:layer:ready`, `land:wind:command:invoke`
- `land:sky:build:complete`, `land:sky:resource:error`,
  `land:sky:throttle-dropped`
- `land:build:start`, `land:build:phase:complete`, `land:build:complete`
- `land:boot:timing` - workbench boot percentile telemetry
- `land:ipc:marks`, `land:vscode:marks`, `land:extension-host:marks` -
  performance mark batches

PostHog `$exception` autocapture uses the default naming set by the posthog-js
SDK.

## Correlation Between Pipes

Every PostHog event carries `$trace_id` and `$span_id` properties. Every OTLP
span carries `posthog.event` and `posthog.distinct_id` attributes. This allows a
HogQL JOIN against a Jaeger trace export to reconstruct the full causal chain
from a single PostHog event.

## NLnet and Privacy Alignment

FIDDEE is funded through the [NGI0 Commons Fund](https://nlnet.nl/commonsfund)
administered by NLnet. The project is released under CC0. The opt-in default and
build-time elimination of telemetry code are intentional design requirements,
not implementation details. Self-hosted and air-gapped deployments carry zero
telemetry SDK bytes in release builds.

---

## See Also

- [Effect-TS and OpenTelemetry Integration](https://Editor.Land/Doc/telemetry/effect-otel)
- [Sidecar Telemetry](https://Editor.Land/Doc/telemetry/sidecars)
- [Tree-Shaking Telemetry](https://Editor.Land/Doc/telemetry/tree-shaking)
