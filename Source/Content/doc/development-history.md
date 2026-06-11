---
title: "Development History"
section: "Development"
order: 4
description:
    "Key architectural decisions in Land's development and the reasoning behind
    each one."
---

This page documents architectural decisions that shaped Land's current design.
Each entry follows the same structure: the problem that prompted the decision,
the solution chosen, and why that solution was selected over alternatives. These
decisions are stable - they reflect deliberate trade-offs, not accidents.

## Bootstrap Stage Order: RPCServer Before MountainConnection

**Problem**: Cocoon's bootstrap previously ran `MountainConnection` (Stage 3,
could take up to 45 seconds) before `RPCServer` (Stage 5, which binds port
50052). Mountain attempts to connect to Cocoon's gRPC server during startup and
gives up after a 20-second budget. Because Cocoon's gRPC server was not yet
listening when Mountain tried to connect, every boot ended with a connection
timeout, leaving the extension host in a broken state.

**Solution**: The bootstrap stage order was reversed - `RPCServer` now starts
and binds port 50052 before `MountainConnection` attempts to reach Mountain. The
Mountain-side connection budget was also extended from 20 seconds to 30 seconds,
and the probe retry counts were reduced (10 → 3 max attempts, 15 → 5 max
attempts) to fail faster when something is genuinely wrong rather than spinning
for a long time.

**Why this solution**: The root cause was a strict ordering dependency: Mountain
needs Cocoon's gRPC port to be open before it can complete its own startup
sequence. The only correct fix is to ensure the server is listening before the
client attempts to connect. Extending timeouts alone would have masked the
symptom without fixing the sequencing bug.

## Polling Replaced with Notify Primitives

**Problem**: Several boot-path components used `sleep`-based polling loops to
wait for state transitions. Examples included a 50 ms × 100-iteration loop
waiting for extensions to finish scanning, a 50 ms loop waiting for a client
connection, and a 100 ms loop waiting for a lifecycle phase. These loops added
measurable startup latency - polling at 50 ms intervals over a 5-second window
burns approximately 100 wake-ups per component, and there were more than ten
such components.

**Solution**: Every polling loop in the boot path was replaced with
`tokio::sync::Notify` or channel-drain patterns. The component that produces the
state change calls `notify_one()` or sends on a channel; the component waiting
for it calls `notified().await` or receives from the channel. No sleep is
needed.

**Why this solution**: `Notify` is zero-cost when nothing is waiting and has
microsecond latency when signaled, compared to up to one full polling interval
of latency with sleep-based polling. The change also eliminates CPU wake-ups
during idle wait periods. The first sidebar paint improved from approximately
3000 ms toward the 800 ms target as a direct result of removing these delays
from the critical boot path.

## Extension Manifest Pre-Baking

**Problem**: At startup, Land scans all extension directories to build the
manifest of installed extensions. On a machine with a typical set of built-in
extensions, this live filesystem scan took approximately 1200 ms - a significant
fraction of the total boot time and one that scaled with the number of installed
extensions.

**Solution**: `Maintain/Build/Manifest/PreBake.ts` runs as a
`beforeBundleCommand` hook in `tauri.conf.json`. It walks all extension roots at
build time and writes `extensions.manifest.json` into the bundle resources
directory. At runtime, `LoadFromCache.rs` reads this pre-baked manifest in under
50 ms. `ScanAndPopulateExtensions.rs` tries the cache first and falls back to
the live scan only if the manifest is absent or invalid.

**Why `beforeBundleCommand` and not `Build.sh`**: The hook must fire in every
build path - direct `pnpm tauri build`, the `Build.sh` wrapper, and CI.
`Build.sh` is a convenience wrapper; placing pipeline-critical steps there means
they are silently skipped when the build is invoked directly. `tauri.conf.json`
is the authoritative build entry point for all paths.

## TierIPC Introduced for Isolation Debugging

**Problem**: When an IPC call fails, there are two possible failure sites:
Mountain's Rust handler and the Cocoon Node.js shim. Without a way to route
around Mountain, diagnosing whether a problem was in the Rust layer or the
TypeScript layer required reading both codebases simultaneously, which was slow
and error-prone.

**Solution**: The `TierIPC` environment variable was introduced with three
values: `Mountain` (default - all calls go to Mountain's Tauri IPC), `Node` (all
calls route directly to Cocoon via `cocoon:request`), and `NodeDeferred`
(Mountain first, Cocoon fallback on miss or undefined). The variable is read at
runtime by both `Wind/Source/Service/TauriMainProcessService.ts` and
`Output/Source/Service/Tauri/Main/Process/Service.ts`.

**Why this solution**: A runtime-switchable routing tier lets developers isolate
the Mountain layer from the Cocoon layer without a rebuild. Setting
`TierIPC=Node` removes Mountain from the IPC path entirely, making it
straightforward to determine which layer owns a failure. `NodeDeferred` supports
the incremental migration path where Mountain handles some commands and Cocoon
handles the rest.

## `console.*` Replaced in Cocoon Production Code

**Problem**: Cocoon's production bundle is compiled by esbuild with
`drop: ["console"]` set in the build configuration. This option removes all
`console.*` calls from the output bundle - which is correct behavior for
production, since console output in a bundled Node.js process has no subscriber.
However, when developer-facing diagnostic calls used `console.log`, they were
silently dropped in production builds, making runtime failures invisible.

**Solution**: All `console.log`, `console.warn`, and `console.error` calls in
Cocoon's production source were replaced with either `CocoonDevLog` (which
routes through Mountain's tagged dev log and respects the `Trace` filter) or
`process.stdout.write` / `process.stderr.write` (which survive esbuild's
`drop:["console"]` and are always emitted). Over 300 call sites across the
extension host, gRPC server, module interceptor, and Mountain client were
updated.

**Why this solution**: `process.stdout.write` is not affected by esbuild's
`console` drop because it is not a member of the `console` object.
`CocoonDevLog` is the preferred path for tagged diagnostic output because it
integrates with the `Trace` filter system, allowing operators to enable or
disable specific log categories without a rebuild. Using `console.*` in
production Cocoon code is now a linting error.

## Effect-TS Runtime Decoupled from Bootstrap

**Problem**: Cocoon's bootstrap and several Wind service layers were tightly
coupled to the Effect-TS runtime. `Bootstrap.ts` called `NodeRuntime.runMain`,
which required a fully constructed Effect layer graph before any service could
start. Wind service files used `Layer.effect` to wire dependencies, which
deferred initialization until the runtime was ready. The coupling caused
unnecessary startup overhead and made incremental migration of individual
services difficult.

**Solution**: Cocoon's bootstrap was rewritten to use plain `async`/`await`
instead of `NodeRuntime.runMain`. Each bootstrap stage is now a standalone
`async` function called in sequence. Wind service files were migrated from
`Layer.effect` to `Layer.succeed` where appropriate, and the filesystem service
provider was updated to call `TauriInvoke` directly rather than going through a
managed runtime. An eager `ManagedRuntime` is used for the remaining Effect
services.

**Why this solution**: Decoupling the bootstrap from the Effect-TS runtime
reduces the startup critical path and makes the sequence of initialization steps
explicit and auditable in plain TypeScript. It also eliminates the constraint
that every service must be expressed as an Effect layer before the system can
start, which is important for incremental migration of services that are
straightforward `async` functions with no algebraic effect requirements.

## VS Code API Coverage

**Summary**: Weighted VS Code API coverage reached approximately 88% by
mid-2026. Per-surface coverage at that milestone:

| API Surface             | Coverage |
| ----------------------- | -------- |
| TextEditor object       | 95%      |
| Workspace API           | 96%      |
| SCM (source control)    | 95%      |
| Window API              | 95%      |
| LSP / Language features | 95%      |
| Overall weighted        | ~88%     |

The largest remaining gaps at this point were the OAuth authentication backend
(no live OAuth flow), `registerWebviewPanelSerializer` (panel state not restored
across reloads), and debug server/pipe adapters for configuration types beyond
`executable`.
