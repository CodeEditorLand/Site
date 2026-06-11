---
title: "Tree-Shaking Telemetry"
section: "Telemetry"
order: 3
description:
    "How esbuild and Rust dead-code elimination remove all telemetry SDK code
    from release and production builds."
---

A `cargo build --release` of any Rust element and an `astro build` of Sky
produce binaries and bundles that contain zero bytes of telemetry SDK code: no
PostHog endpoint string, no OTLP collector URL, no `posthog-js` import, no
`posthog-rs` symbol. This guarantee is load-bearing for self-hosted and
privacy-sensitive deployments of FIDDEE. This document explains the mechanism at
each layer and how to verify the guarantee holds after changes.

## The Three Gates

Every telemetry capture site is protected by three layers stacked from outside
in:

1. **Build-mode gate** - compile-time constant folding. Eliminates the entire
   SDK import graph from release/production builds. This is the primary
   guarantee.
2. **Master kill switch (`Capture`)** - runtime env var. Short-circuits all
   capture calls regardless of build mode. Used for one-off air-gapped runs in
   debug builds.
3. **Per-pipe toggles (`Report`, `OTLPEnabled`)** - runtime env vars. Let
   PostHog and OTLP be flipped independently in debug builds without restarting.

Production releases rely on gate (1). Gates (2) and (3) never execute in a
production build because the code that reads them is already eliminated.

## Rust: `cfg!(debug_assertions)`

Every capture function in `Element/Common/Source/Telemetry/` is gated on the
Rust built-in `cfg!(debug_assertions)`, which is `false` in `--release` builds.
LLVM constant-folds the branch, marks the body unreachable, and the linker's
dead-code elimination strips the symbol entirely - including the `posthog-rs`
call sites it would have reached.

```rust
pub fn Fn(EventName: &str, Properties: Option<Vec<(&str, &str)>>) {
	if !cfg!(debug_assertions) {
		return;
	}
	if std::env::var("Capture").as_deref() == Ok("false") {
		return;
	}
	// PostHog submission - never reached in --release
}
```

Mountain's compile-baked plugin at `Binary/Build/PostHogPlugin/` uses the same
guard. Because both the Common library and the plugin guard on
`cfg!(debug_assertions)`, no `posthog-rs` symbol survives a release link even if
the crate is listed as a dependency.

### Verify (Rust)

```sh
cargo build -p Mountain --release
strings Element/Mountain/Target/release/Mountain \
	| grep -c "posthog\|/capture/\|i.posthog.com"
# Expected: 0
```

Run the same check for Air, Rest, and Grove by substituting the binary name.

## TypeScript: `process.env.NODE_ENV` via esbuild `define`

esbuild substitutes `process.env.NODE_ENV` with a literal string at build time
when the `define` key is configured. Setting `NODE_ENV=production` turns every
`if (process.env.NODE_ENV !== "production")` guard into `if (false)`, which
esbuild's constant folding collapses. The dead branch - including any
`await import()` of the PostHog or OTLP bridge module - is dropped, so the
dynamic import never appears in the chunk graph.

```ts
// esbuild.config.ts
{
	define: {
		"process.env.NODE_ENV": JSON.stringify(
			process.env["NODE_ENV"] ?? "development",
		),
	},
}
```

```ts
// Element/Cocoon/Source/Telemetry/Index.ts
let Bridge: typeof import("./PostHogBridge.js") | undefined;
if (process.env.NODE_ENV !== "production") {
	Bridge = await import("./PostHogBridge.js");
}
export const CaptureEvent = (
	Name: string,
	Properties: Record<string, unknown>,
): void => {
	Bridge?.CaptureEvent(Name, Properties);
};
```

In a production build esbuild rewrites `process.env.NODE_ENV` to `"production"`,
constant-folds `if (false)`, and drops `PostHogBridge.js` from the chunk graph.
The `OTLPBridge.js` import is guarded identically.

### Wind telemetry bridge conditional inclusion

Wind's telemetry bridge at `Element/Wind/Source/Telemetry/Bridge.ts` uses the
same `process.env.NODE_ENV` guard. Vite applies the substitution through its
`define` config, which mirrors the esbuild approach. No Wind production bundle
imports `posthog-js` or `@opentelemetry/exporter-trace-otlp-http`.

### Verify (TypeScript / Cocoon)

```sh
NODE_ENV=production pnpm run --filter Cocoon build
grep -rn "i.posthog.com\|/batch/\|otlp" Element/Cocoon/Target/
# Expected: 0 matches
```

## Astro: `import.meta.env.DEV`

Vite replaces `import.meta.env.DEV` with the boolean literal `false` during
`astro build`. Every Sky telemetry import is wrapped in this guard:

```ts
// Element/Sky/Source/Function/Telemetry/Bridge.ts (init call site)
if (import.meta.env.DEV) {
	const { default: InitTelemetry } = await import("./Telemetry/Bridge.js");
	InitTelemetry();
}
```

After substitution the condition becomes `if (false)`, Rollup (used by Vite
internally) marks the dynamic import as dead, and the entire
`Telemetry/Bridge.js` module and its transitive imports (`posthog-js`,
`@opentelemetry/sdk-trace-web`) are excluded from the output bundle.

### Cocoon Telemetry/ module exclusion

The `Telemetry/` directory under `Element/Cocoon/Source/` is only reachable
through the guarded import described above. When esbuild eliminates the guard
branch, the entire `Telemetry/` subtree becomes unreachable from the entry point
and is excluded from the output bundle.

### Verify (Astro / Sky)

```sh
pnpm run --filter Sky build
grep -rn "posthog\|otlp\|jaeger" Element/Sky/Target/Static/Application/
# Expected: 0 matches
```

## What Happens to the PostHog API Key

The `Authorize` variable (PostHog project key, `phc_` prefix) is injected into
Sky's `__LandProduct` global at build time. The production overlay
`.env.Land.Production.PostHog` sets `Authorize` to empty. Because the telemetry
bridge is already excluded from production bundles by the `import.meta.env.DEV`
gate, the key cannot appear in output even if the overlay were misconfigured -
the code that reads it is not present.

> [!WARNING] Never set `Authorize` in `.env.Land.Production.PostHog` to a real
> key. The production overlay exists specifically to ensure the key is empty in
> release artifacts.

## Verifying Telemetry Is Absent in a Build

### Bundle analysis

esbuild's `--metafile` flag produces a JSON graph of every module included in
the output. Feed it to `esbuild-bundle-visualizer` or `bundle-stats` and confirm
`PostHogBridge`, `OTLPBridge`, and `posthog-js` are absent.

```sh
NODE_ENV=production pnpm run --filter Cocoon build -- --metafile=meta.json
npx esbuild-bundle-visualizer meta.json
# Inspect: PostHogBridge and OTLPBridge should not appear
```

### grep for PostHog import in output

```sh
# Cocoon production bundle
grep -r "posthog" Element/Cocoon/Target/
# 0 matches expected

# Sky production bundle
grep -r "posthog\|BatchSpanProcessor" Element/Sky/Target/Static/Application/
# 0 matches expected

# Mountain release binary
strings Element/Mountain/Target/release/Mountain | grep "posthog"
# 0 matches expected
```

### Automated smoke test

```sh
sh Maintain/Test/TelemetryTreeShake.sh
```

This script builds Mountain in `--release`, Cocoon and Sky in
`NODE_ENV=production`, runs `strings`/`grep`/`du` against all output artifacts,
and fails with a non-zero exit code if any forbidden symbol is found. It runs as
part of the release CI pipeline.

## Building Without Telemetry for Self-Hosted Deployments

No special build flag is required. A standard release build automatically
satisfies the zero-telemetry contract through the gates described above. To
confirm a self-hosted build is clean:

1. Ensure `.env.Land.Production.PostHog` has `Capture=false`, `Report=false`,
   `OTLPEnabled=false`, and `Authorize=` (empty).
2. Build with `NODE_ENV=production` or `Profile=release-electron-bundled`.
3. Run the verify commands above against the output artifacts.

For development builds where you want to deliberately disable telemetry without
switching to a production profile, set `Capture=false` in `.env.Land.PostHog`.
This activates gate (2) and prevents any network calls, though the SDK modules
are still present in the debug bundle.

---

## See Also

- [Telemetry Overview](https://Editor.Land/Doc/telemetry/overview)
- [Effect-TS and OpenTelemetry Integration](https://Editor.Land/Doc/telemetry/effect-otel)
- [Sidecar Telemetry](https://Editor.Land/Doc/telemetry/sidecars)
