---
title: "Production Zero - Tree-Shaking Telemetry"
section: "Development"
order: 8
description:
    "Contract specifying that a cargo build --release of any Rust element and
    an astro build of Sky must contain zero bytes of telemetry SDK code, no
    PostHog endpoint string, and no feature flag SDK code."
---

# Production Zero - Tree-Shaking Telemetry

The contract: a `cargo build --release` of any Rust element, and an
`astro build` of Sky / a `pnpm run --filter Output build` of Output, must
contain **zero** bytes of telemetry SDK code, no PostHog endpoint string, no
OTLP collector URL, no `posthog-js` import.

## The three gates

Every capture site is gated by three layers stacked from outside in:

1. **Build mode gate** - compile-time. Drops the whole stack from release /
   production bundles.
2. **Master kill switch (`Capture`)** - runtime. Drops the runtime call
   regardless of build mode. Used for one-off airgapped runs.
3. **Per-pipe toggle (`Report`, `OTLPEnabled`)** - runtime, per-pipe. Lets
   PostHog and Jaeger be flipped independently.

Production builds rely on (1) so (2) and (3) never even run.

## Rust - `cfg!(debug_assertions)`

```rust
pub fn Fn(EventName: &str, Properties: Option<Vec<(&str, &str)>>) {
    if !cfg!(debug_assertions) { return; }
    if std::env::var("Capture").as_deref() == Ok("false") { return; }
    /* …call PostHog… */
}
```

`cfg!(debug_assertions)` is `false` in `--release`. LLVM constant-folds the
`if`, drops the dead branch, and the `posthog-rs` calls underneath become
unreachable. Linker GC then strips the symbol entirely.

Verify:

```sh
cargo build -p Mountain --release
strings Element/Mountain/Target/release/Mountain | grep -c "posthog\|/capture/\|i.posthog.com"
# 0
```

## TypeScript - `process.env.NODE_ENV` / `import.meta.env.DEV`

esbuild + Vite both substitute these literally at build time when configured
with `define`:

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

Then in code:

```ts
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

In a production build esbuild rewrites:

```js
if ("production" !== "production") {
	Bridge = await import("./PostHogBridge.js");
}
```

Constant-folds to `if (false)`, drops the `await import()`, and the chunk graph
never sees `PostHogBridge.js`. Verify:

```sh
NODE_ENV=production pnpm run --filter Cocoon build
grep -rn "i.posthog.com\|/batch/" Element/Cocoon/Target/
# 0 matches
```

## Astro - `import.meta.env.DEV`

Vite replaces `import.meta.env.DEV` with `false` for `astro build`. Wrap every
Sky bridge import in:

```ts
if (import.meta.env.DEV) {
	const { default: InitTelemetry } = await import("./Telemetry/Bridge.js");
	InitTelemetry();
}
```

Verify:

```sh
pnpm run --filter Sky build
grep -rn "posthog\|otlp\|jaeger" Element/Sky/Target/Static/Application/
# 0 matches
```

## What about PostHog's `phc_…` key?

The key is built into release builds **only** if a release path imports the
bridge. The gate above means a clean release never sees the key. For the few
release-mode events we deliberately keep (e.g. license activations), use a
separate "anonymous-only" key in `.env.Land.PostHog.Production`, gated through a
different module that **doesn't** import the dev bridge.

## Smoke test

```sh
sh Maintain/Test/TelemetryTreeShake.sh
```

Builds Mountain in `--release`, Cocoon / Sky / Output in `NODE_ENV=production`,
runs `strings` / `grep` / `du -sh` against the output, fails CI if any forbidden
symbol is found.

(File `Maintain/Test/TelemetryTreeShake.sh` lands in the same commit as the Wind
/ Sky bridges.)
