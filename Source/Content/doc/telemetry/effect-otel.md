---
title: "Effect-TS and OpenTelemetry Integration"
section: "Telemetry"
order: 1
description:
    "How Cocoon and Wind use @effect/opentelemetry to export spans to OTLP and
    correlate them with PostHog events."
---

Cocoon and Wind are written in Effect-TS. Effect ships first-class OpenTelemetry
support through `@effect/opentelemetry`, which lets the Land codebase own span
creation and attribute propagation declaratively, then fan spans out to two
sinks: a `BatchSpanProcessor` that writes to an OTLP collector, and a custom
`SpanProcessor` that re-emits each span as a PostHog event. This document covers
the wiring, span conventions, cross-tier propagation, and how to run a local
collector.

## Package Surface

```
pnpm add @effect/opentelemetry \
         @opentelemetry/api \
         @opentelemetry/sdk-trace-base \
         @opentelemetry/sdk-trace-node \
         @opentelemetry/sdk-trace-web \
         @opentelemetry/exporter-trace-otlp-http \
         @opentelemetry/resources \
         @opentelemetry/semantic-conventions
```

`sdk-trace-node` is used by Cocoon (Node.js process). `sdk-trace-web` is used by
Sky (browser WebView). `sdk-trace-base` is used by Wind, which composes either
depending on the build target.

## OTLP Exporter Configuration

The `OtlpEndpoint` env var controls where spans are sent. It defaults to
`http://127.0.0.1:4318`, which is the standard OTLP HTTP receiver port for
Jaeger all-in-one and Grafana Tempo.

| Variable       | Default                       | Effect                                             |
| -------------- | ----------------------------- | -------------------------------------------------- |
| `OTLPEndpoint` | `http://127.0.0.1:4318`       | OTLP collector base URL (HTTP/protobuf)            |
| `OTLPEnabled`  | `true` (dev) / `false` (prod) | Enables or disables the OTLP exporter              |
| `Capture`      | `true` (dev) / `false` (prod) | Master kill switch; disables both PostHog and OTLP |

## Cocoon Wiring (Node.js, Effect-TS)

```ts
// Element/Cocoon/Source/Telemetry/OTel.ts
import { NodeSdk } from "@effect/opentelemetry";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { Layer } from "effect";

export default Layer.unwrapEffect(
	NodeSdk.layer(() => ({
		resource: {
			serviceName: "land-editor-cocoon",
			attributes: { "land.tier": "cocoon" },
		},
		spanProcessor: new BatchSpanProcessor(
			new OTLPTraceExporter({
				url: `${process.env["OTLPEndpoint"] ?? "http://127.0.0.1:4318"}/v1/traces`,
			}),
			{ maxExportBatchSize: 64, scheduledDelayMillis: 1500 },
		),
	})),
);
```

The layer is composed into the application layer alongside the PostHog layer.
When `Capture=false` is substituted at build time, both layers collapse to
`Layer.empty` and esbuild removes the import chain entirely.

```ts
// Element/Cocoon/Source/Effect/AppLayer.ts
import { Layer } from "effect";

import OTelLayer from "../Telemetry/OTel.js";
import PostHogLayer from "../Telemetry/PostHogLayer.js";

const Telemetry =
	process.env["Capture"] === "false"
		? Layer.empty
		: Layer.mergeAll(OTelLayer, PostHogLayer);

export const AppLayer = Layer.mergeAll(Telemetry);
```

## Span Creation in Effect Pipelines

Effect fibers map directly to OTel spans via `Effect.withSpan`. Each fiber that
enters a span boundary creates a child span with the fiber's execution duration
as the span duration. Concurrent fibers produce sibling spans under the same
parent.

```ts
import { Effect } from "effect";

const HandleRequest = (Method: string, Parameters: unknown) =>
	Effect.gen(function* () {
		const Result = yield* doWork(Method, Parameters);
		return Result;
	}).pipe(
		Effect.withSpan("land:cocoon:handler", {
			attributes: { "land.method": Method },
		}),
	);
```

Span names follow the `land:<element>:<action>` convention. Span attributes use
`land.*` keys for Land-specific data and standard OTel semantic conventions
(`rpc.method`, `rpc.service`) for gRPC calls.

## What Is Traced

| Span name pattern          | Trigger                                             |
| -------------------------- | --------------------------------------------------- |
| `land:cocoon:handler`      | Each IPC handler dispatch in Cocoon's gRPC server   |
| `land:cocoon:entry:load`   | Extension activation start to completion            |
| `land:mountain:ipc:invoke` | Each IPC invoke received by Mountain's wind service |
| `land:wind:layer:ready`    | Wind service layer composition and startup          |
| `land:sky:build:complete`  | Sky bundle build in dev mode                        |
| `land:build:phase:*`       | Each phase of `Maintain/Debug/Build.sh`             |

Extension activation spans are particularly useful: the parent span covers the
full `activate()` call, with child spans for each `workspaceContains` glob walk
and each gRPC request the extension issues during activation.

## Dual-Emit: PostHog Span Processor

A custom `SpanProcessor` runs alongside the `BatchSpanProcessor` and re-emits
every completed span as a PostHog event. This means every span that reaches the
OTLP collector also produces a PostHog event carrying the same `trace_id` and
`span_id`, enabling correlation between the two sinks.

```ts
// Element/Cocoon/Source/Telemetry/PostHogProcessor.ts
import type {
	ReadableSpan,
	SpanProcessor,
} from "@opentelemetry/sdk-trace-base";

import { CaptureEvent } from "./PostHogBridge.js";

export default class PostHogSpanProcessor implements SpanProcessor {
	onStart(): void {}

	onEnd(Span: ReadableSpan): void {
		const Properties: Record<string, unknown> = {
			$trace_id: Span.spanContext().traceId,
			$span_id: Span.spanContext().spanId,
			$parent_span_id: Span.parentSpanContext?.spanId,
			duration_ms: Span.duration[0] * 1e3 + Span.duration[1] / 1e6,
			status_code: Span.status.code,
		};
		for (const [Key, Value] of Object.entries(Span.attributes)) {
			Properties[Key] = Value;
		}
		CaptureEvent(Span.name, Properties);
	}

	shutdown(): Promise<void> {
		return Promise.resolve();
	}
	forceFlush(): Promise<void> {
		return Promise.resolve();
	}
}
```

## Sky (Browser WebView)

Sky runs inside Tauri's WKWebView, which is a browser context. It uses
`sdk-trace-web` and the standard OTLP HTTP exporter. The entire initialization
is wrapped in `import.meta.env.DEV` so Vite/Astro drops it from production
bundles.

```ts
// Element/Sky/Source/Function/Telemetry/Bridge.ts
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import {
	BatchSpanProcessor,
	WebTracerProvider,
} from "@opentelemetry/sdk-trace-web";

if (import.meta.env.DEV && import.meta.env["Capture"] !== "false") {
	const Provider = new WebTracerProvider({
		resource: {
			serviceName: "land-editor-sky",
			attributes: { "land.tier": "sky" },
		},
	});
	Provider.addSpanProcessor(
		new BatchSpanProcessor(
			new OTLPTraceExporter({
				url: `${import.meta.env["OTLPEndpoint"] ?? "http://127.0.0.1:4318"}/v1/traces`,
			}),
		),
	);
	Provider.register();
}
```

## Mountain (Rust) Bridge

Mountain emits spans through the `tracing` crate paired with
`tracing-opentelemetry`. Every `tracing::span!` call in Mountain source becomes
an OTLP span. The PostHog bridge at `Binary/Build/PostHogPlugin/CaptureHandler`
receives the same `(name, duration, attributes)` triplet from the span lifecycle
hooks.

## Cross-Tier Trace Propagation

Tauri events from Mountain to Sky carry the W3C `traceparent` header on every
IPC envelope. Wind extracts it from `event.payload._traceparent`, opens a child
span with `Effect.linkSpans`, and forwards downstream. Cocoon extracts the
header in `Effect/RPCServer.ts` when a gRPC call arrives from Mountain.

The result is a single Jaeger trace that begins in Sky (browser), hops to
Mountain (Rust), fans into Cocoon (Node.js), and rejoins on the response.
Mountain attaches the header in `IPC/Sky/EmitToWebview.rs`.

## Correlation with PostHog Events

Because every span is also emitted as a PostHog event, you can correlate the two
sinks by joining on `$trace_id`:

```sql
-- HogQL: find all PostHog events that belong to a Jaeger trace
SELECT event, properties.$span_id, properties.duration_ms
FROM events
WHERE properties.$trace_id = 'your-trace-id-here'
ORDER BY timestamp ASC
```

Click through from a PostHog event's `$trace_id` property into the Jaeger UI at
`http://127.0.0.1:16686/trace/<trace_id>` to see the full waterfall.

## Running a Local Collector

Jaeger all-in-one provides an OTLP HTTP receiver on port 4318 and a UI on
port 16686.

```bash
docker run -d --name jaeger \
	-p 16686:16686 \
	-p 4318:4318 \
	jaegertracing/all-in-one:latest
```

Grafana Tempo with the OTLP receiver is an alternative if you prefer a
Prometheus-compatible stack. Set `OTLPEndpoint=http://127.0.0.1:4318` in
`.env.Land.PostHog` in either case.

## When Not to Use Effect Spans

For point-in-time numeric events with no causal children -
`land:cocoon:stub:active`, `land:wind:command:invoke`, performance mark
batches - the PostHog bridge alone is sufficient. Reserve spans for operations
that have meaningful child work: extension activation, handler dispatch chains,
build phases, and any gRPC call that may trigger downstream work in another
element.

---

## See Also

- [Telemetry Overview](https://editor.land/Doc/telemetry/overview)
- [Sidecar Telemetry](https://editor.land/Doc/telemetry/sidecars)
- [Tree-Shaking Telemetry](https://editor.land/Doc/telemetry/tree-shaking)
