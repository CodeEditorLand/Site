---
title: "Effect-TS and OpenTelemetry Integration"
section: "Telemetry"
order: 20
description:
    "How Wind and Cocoon use Effect-TS with @effect/opentelemetry for dual-sink
    span export."
---

# Effect-TS and OpenTelemetry Integration

Wind and Cocoon are written in Effect-TS. Effect ships first-class OpenTelemetry
support through `@effect/opentelemetry`. The Land integration lets Effect own
span creation and attribute propagation, then export to two sinks: a
`BatchSpanProcessor` to OTLP collector, and a custom `SpanProcessor` that
re-emits each span as a PostHog event.

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

`sdk-trace-node` for Cocoon (Node), `sdk-trace-web` for Sky (browser),
`sdk-trace-base` for Wind (composes either).

## Wiring

### Cocoon (Node, Effect-TS)

```ts
// Element/Cocoon/Source/Telemetry/OTel.ts
import { NodeSdk } from "@effect/opentelemetry";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
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

Compose into the application layer:

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

`Capture=false` collapses Telemetry to `Layer.empty`. Effect drops the service
references at build time when paired with bundler `define` substitution.

## Spans

Use Effect's `Effect.withSpan`:

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

The span's `trace_id` / `span_id` flow into PostHog through the custom
processor. The span name follows the `land:<element>:<action>` convention.

## Custom Processor -- PostHog Dual-Emit

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

Register it alongside the OTLP `BatchSpanProcessor` so every span fans out into
both sinks.

## Sky (Browser)

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

Tree-shakeable: `import.meta.env.DEV` is replaced at compile time by Vite/Astro
with the literal `false` for production builds.

## Mountain (Rust) Bridge

Mountain emits spans through the `tracing` crate. The bridge is
`tracing-opentelemetry`, converting every `tracing::span!` into an OTLP span.
`otel_span!` macro spans flow into Jaeger; the PostHog bridge in
`Binary/Build/PostHogPlugin/CaptureHandler` receives the same
`(name, duration, attributes)` triplet.

## Cross-Tier Trace Propagation

Tauri events between Mountain and Sky carry the `traceparent` header (W3C
format) on every IPC envelope. Wind extracts it from
`event.payload._traceparent`, opens a child span with `Effect.linkSpans`, and
forwards downstream. This lets Jaeger render a single trace that begins in Sky,
hops Mountain (Rust), fans into Cocoon (Node), and rejoins on the response.

Mountain attaches the header in `IPC/Sky/EmitToWebview.rs`; Cocoon extracts it
in `Effect/RPCServer.ts`.

## When Not to Use Effect Spans

For single-callsite numeric events (`land:cocoon:stub:active`,
`land:wind:command:invoke`) the PostHog bridge alone is sufficient. Reserve
spans for operations with causal children: handler -> downstream gRPC, extension
activation -> workspaceContains glob walk, build phase -> sub-build.

---

## See Also

- [Telemetry Overview](https://land.playform.cloud/Doc/telemetry/overview)
- [Sidecar Telemetry](https://land.playform.cloud/Doc/telemetry/sidecars)
