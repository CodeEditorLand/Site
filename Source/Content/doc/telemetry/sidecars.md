---
title: "Sidecar Telemetry"
section: "Telemetry"
order: 21
description:
    "How Air, Echo, Rest, Grove, Mist, SideCar, and Worker emit telemetry
    through the shared land:<tier>:* namespace."
---

# Sidecar Telemetry

Every Rust sidecar and the Worker service worker emit through the same
`land:<tier>:*` namespace and stamp `$tier` so dashboards can pivot without
per-Element changes.

## Architecture

| Type    | Path                                        | Wiring                                                                                                 |
| ------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Library | `Element/Common/Source/Telemetry/`          | shared. Provides `Capture*::Fn`, `EmitOTLPSpan::Fn`, `Initialize::Fn(Tier)`                            |
| Binary  | `Element/Air/Source/Binary.rs`              | calls `CommonLibrary::Telemetry::Initialize::Fn(Tier::Air)` in `Main`                                  |
| Binary  | `Element/Rest/Source/Main.rs`               | calls `Initialize::Fn(Tier::Rest)`                                                                     |
| Binary  | `Element/Grove/Source/main.rs`              | calls `Initialize::Fn(Tier::Grove)` after `Cli::parse`                                                 |
| Binary  | `Element/SideCar/Source/main.rs`            | sync `main` -- spawns short-lived `tokio::Runtime` to call `Initialize::Fn(Tier::SideCar)`             |
| Library | `Element/Echo/Source/Library.rs`            | linked into Mountain -- emits via `CommonLibrary::Telemetry::CaptureEvent::Fn`, inherits Mountain tier |
| Library | `Element/Mist/Source/lib.rs`                | linked into Mountain and Air -- same                                                                   |
| Worker  | `Element/Worker/Source/Telemetry/Bridge.ts` | TS service worker; auto-loaded from `Worker.ts` install/activate hooks                                 |

## Tier Identification

`Element/Common/Source/Telemetry/Tier.rs`:

```rust
pub enum Tier {
    Mountain, Air, Echo, Rest, Grove, Mist, SideCar, Common,
}
```

The Tier is registered once via `Initialize::Fn(Tier::X)` and read by every
`Capture*::Fn` to stamp `$tier` / `$component` automatically.

## Mountain -- Dual-Init Contract

Mountain runs both its compile-baked plugin (`Binary/Build/PostHogPlugin/*` for
tree-shake guarantee) and `Common::Telemetry::Initialize::Fn(Tier::Mountain)` so
library code linked into Mountain (Echo, Mist) emits through the same client and
is tagged `$tier=mountain`.

## Worker

The Worker bridge uses build-baked `import.meta.env` values and the SW-native
`fetch` API -- no `posthog-js`, no Node `https`. Loaded lazily inside the
`__DEV__` branch so `astro build` with `NODE_ENV=production` drops it entirely.

## What Library Crates Do

Echo / Mist / Common are linked into Mountain (and Air for Mist). They never run
as standalone processes, so they never call `Initialize::Fn`. They emit events
using `CommonLibrary::Telemetry::CaptureEvent::Fn(name, props)` and the
resulting events are tagged with the parent process's tier. Use the `name` to
disambiguate:

```rust
// Inside Echo, running in Mountain:
CommonLibrary::Telemetry::CaptureEvent::Fn(
    "land:echo:queue:saturated",
    Some(vec![("queue_depth", "1024")]),
);
// Event arrives in PostHog with $tier=mountain, name=land:echo:*.
```

## Cross-Tier Joining

Every PostHog event carries `$trace_id` (where the Tier ran an OTLP span).
Cocoon's bridge sets it via `Event::SetTraceIdentifier` from
`OTLPBridge.TraceIdentifier()`. Common's `EmitOTLPSpan::Fn` uses one
`OTLP_TRACE_ID` per process so all spans from one Air / Rest / Grove boot roll
into one Jaeger trace.

## Profile-Specific Tier Coverage

Some build profiles intentionally skip whole tiers. The Tier Coverage dashboard
shows zero counts for those -- that is correct behaviour, not a bug:

| Profile                                       | Mountain | Cocoon | Sky | Air | Notes                                   |
| --------------------------------------------- | -------- | ------ | --- | --- | --------------------------------------- |
| `debug` / `debug-mountain` / `debug-electron` | Yes      | Yes    | Yes | Yes | Full stack                              |
| `debug-cocoon-headless`                       | Yes      | Yes    | No  | Yes | `Render=false` skips Wind preload + Sky |
| `debug-mountain-only`                         | Yes      | No     | Yes | Yes | `Spawn=false` skips Cocoon              |
| `debug-kernel`                                | Yes      | No     | No  | Yes | `Spawn=false; Render=false`             |
| `debug-electron-minimal`                      | Yes      | Yes    | Yes | Yes | `Skip=true` skips built-in extensions   |

Mountain's `Binary/Main/Entry.rs` always initialises both
`PostHogPlugin::Initialize` and
`CommonLibrary::Telemetry::Initialize::Fn(Tier::Mountain)` regardless of
profile.

## Adding a New Sidecar

1. Add `Common = { workspace = true }` to `Element/<New>/Cargo.toml`.
2. Add a variant to `Tier::Tier` enum.
3. Call `CommonLibrary::Telemetry::Initialize::Fn(Tier::<New>).await` from the
   binary's main / async entry.
4. (Optional) Add a tile to the Tier Coverage dashboard pointing at
   `event LIKE 'land:<new>:%'`.

Everything else -- env propagation from Mountain, OTLP fan-in, `$tier` tagging,
dashboard rollups, prod tree-shake -- comes for free.

---

## See Also

- [Telemetry Overview](https://Editor.Land/Doc/telemetry/overview)
- [SideCar Element](https://Editor.Land/Doc/sidecar)
