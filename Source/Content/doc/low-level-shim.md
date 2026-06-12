---
title: "Low-Level Shim"
description: "🟠 Engine-level prototype hooks for intercepting VS Code at the JavaScript runtime layer"
section: "Low-Level Shim"
order: 500
---

# 🟠 Low-Level Shim — Engine-Level Interception

> **🟠 LOW-LEVEL SHIM** — JavaScript engine prototype monkey-patches
> **Tier gate**: `TierShim=Own` | `TierShim=Preempt`
> **Color**: `#FF6B35` (Orange)
> **Overhead**: <2% in production (sampled)

The Low-Level Shim intercepts VS Code at the **JavaScript engine level** — before any
service, any contribution, any extension has a chance to execute. It operates via
prototype-level monkey-patches on VS Code's internal infrastructure classes.

## 🟠 Architecture

```
┌──────────────────────────────────────────────────────────┐
│  🟠 LOW-LEVEL SHIM — 6 Hook Layers                       │
├──────────────────────────────────────────────────────────┤
│  L1: ErrorHandler.onUnexpectedError()  → All errors      │
│  L2: Emitter.prototype.fire()          → All events      │
│  L3: CancellationTokenSource.cancel()  → All aborts      │
│  L4: DisposableStore.add/dispose       → All resources   │
│  L5: setTimeout0 / Async Scheduler     → All async work  │
│  L8: StopWatch / performance.now()     → All timing      │
├──────────────────────────────────────────────────────────┤
│  Dev-only: Promise constructor, Error.stack capture      │
└──────────────────────────────────────────────────────────┘
```

| Layer | Intercepts | Coverage | Prod Overhead |
|-------|-----------|----------|---------------|
| **L1** | `ErrorHandler.onUnexpectedError()` | 100% of errors | 0% |
| **L2** | `Emitter.prototype.fire()` | 100% of events (474 services) | <1% (sampled) |
| **L3** | `CancellationTokenSource.cancel()` | 100% of cancellations | ~0% |
| **L4** | `DisposableStore.add/dispose` | 100% of resource lifecycle | ~0% |
| **L5** | `setTimeout0` / `queueMicrotask` | 100% of async scheduling | 1-2% |
| **L8** | `StopWatch` / `performance.now()` | 100% of timing data | 2-3% (dev) |

## 🟠 How It Works

Each hook is a single prototype-level monkey-patch that wraps VS Code's internal
class methods. When `TierShim=Own`, the shim activates BEFORE any VS Code code runs.
All intercepted data flows through `LandDiagnostics` to OTLP / PostHog / Mountain
dev log.

### Example: Emitter.prototype.fire()

```typescript
const originalFire = Emitter.prototype.fire;
Emitter.prototype.fire = function(event) {
    if (LandSwallowMap.shouldSwallowEmitter(this, event)) {
        LandRedirectBus.routeEmitterEvent(event);
        return; // VS Code listeners never fire
    }
    originalFire.call(this, event);
};
```

This single 8-line patch covers **every event in VS Code** — status bar updates,
SCM changes, editor state, extension notifications, everything.

## 🟠 Source Files

| File | Hook |
|------|------|
| `Land/Element/Output/Source/Service/CEL/Land/Shim/Intercept/ErrorHandlerProxy.ts` | L1 — Error handler |
| `Land/Element/Output/Source/Service/CEL/Land/Shim/Intercept/EmitterFireProxy.ts` | L2 — Event emitter |
| `Land/Element/Output/Source/Service/CEL/Land/Shim/Intercept/CancellationProxy.ts` | L3 — Cancellation chain |
| `Land/Element/Output/Source/Service/CEL/Land/Shim/Intercept/DisposableProxy.ts` | L4 — Resource lifecycle |
| `Land/Element/Output/Source/Service/CEL/Land/Shim/Intercept/AsyncProxy.ts` | L5 — Async scheduling |
| `Land/Element/Output/Source/Service/CEL/Land/Shim/Intercept/TimingProxy.ts` | L8 — Performance timing |

## 🟠 Related Documentation

- [Coverage / Telemetry](/doc/coverage) — The high-level application shim (blue)
- [Architecture](/doc/architecture) — System architecture overview
- [Deep Dive: Mountain](/doc/deep-dive-mountain) — Rust-side intercept infrastructure

⚠️ **EXPERIMENTAL** — This component operates at the JavaScript engine level.
Changes to VS Code's internal classes may require updates to these hooks.
Production overhead: <2% with sampling.
