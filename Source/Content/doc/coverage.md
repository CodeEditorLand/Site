---
title: "Coverage / Telemetry"
description: "🔵 High-level application shim for intercepting and routing VS Code services through Land's service tree"
section: "Coverage"
order: 510
---

# 🔵 Coverage / Telemetry — Application-Level Shim

> **🔵 COVERAGE SHIM** — Application-level service routing and telemetry
> **Tier gate**: `TierShim=Proxy` | `TierShim=Replace`
> **Color**: `#2563EB` (Blue)
> **Overhead**: <1% (passthrough mode)

The Coverage Shim intercepts VS Code at the **application service level** — routing
IPC commands through Land's SwallowMap, proxying the ServiceCollection DI container,
and tracking coverage across all 474 decorated services.

## 🔵 Architecture

```
┌──────────────────────────────────────────────────────────┐
│  🔵 COVERAGE — Application Layer                         │
├──────────────────────────────────────────────────────────┤
│  IPC SwallowMap         → 15/22 domains                  │
│  ServiceCollection proxy → 35 services (via __CEL__)     │
│  RedirectBus            → Wind/Cocoon/Mountain routing   │
│  AuditLog               → Ring-buffered resolution log   │
│  SwallowMap rules       → Pattern-matching engine        │
│  TierSwallow* per-domain → Individual domain toggles     │
│  CELExposeAccessor      → Workbench bridge hooks         │
├──────────────────────────────────────────────────────────┤
│  Coverage: 15 of 22 core domains (growing)               │
│  Target: 474 decorated services                          │
│  Infrastructure: Ready for full-service replacement      │
└──────────────────────────────────────────────────────────┘
```

## 🔵 Coverage by Domain

| Domain | Status | Tier | Shim Tier |
|--------|--------|------|-----------|
| Status Bar | 🔵 SWALLOW | `TierSwallowStatusBar=Swallow` | Replace |
| SCM / Git | 🔵 SWALLOW | `TierSwallowSCM=Swallow` | Replace |
| Search | 🔵 SWALLOW | `TierSwallowSearch=Swallow` | Replace |
| Terminal | 🔵 SWALLOW | `TierSwallowTerminal=Swallow` | Replace |
| Output | 🔵 SWALLOW | `TierSwallowOutput=Swallow` | Replace |
| File System | 🔵 SWALLOW | `TierSwallowFile=Swallow` | Replace |
| Notifications | 🔵 SWALLOW | `TierSwallowNotification=Swallow` | Replace |
| Dialogs | 🔵 SWALLOW | `TierSwallowDialog=Swallow` | Replace |
| Quick Input | 🔵 SWALLOW | `TierSwallowQuickInput=Swallow` | Replace |
| Keybindings | 🔵 SWALLOW | `TierSwallowKeybinding=Swallow` | Replace |
| Themes | 🔵 SWALLOW | `TierSwallowTheme=Swallow` | Replace |
| Configuration | 🔵 SWALLOW | `TierSwallowConfiguration=Swallow` | Replace |
| Telemetry | 🔵 DISCARD | `TierSwallowTelemetry=Discard` | Replace |
| Extension Gallery | 🔵 SWALLOW | `TierSwallowGallery=Swallow` | Replace |
| Product Identity | 🔵 SWALLOW | `TierSwallowProduct=Swallow` | Replace |

## 🔵 Service Coverage Matrix

| Category | Total Services | Covered | Coverage % |
|----------|---------------|---------|------------|
| Workbench UI | 25 | 15 | 60% |
| Platform Services | 100 | 35 | 35% |
| Editor Core | 40 | 8 | 20% |
| Extensions | 30 | 5 | 17% |
| Terminal | 12 | 4 | 33% |
| Chat/Copilot | 25 | 0 | 0% |
| Testing | 8 | 0 | 0% |
| Remote | 15 | 0 | 0% |
| Misc/Specialized | 219 | 0 | 0% |
| **Total** | **474** | **67** | **14%** |

## 🔵 How It Works

The Coverage Shim uses three interception strategies:

1. **IPC Intercept**: `IPCInterceptor.ts` wraps `invoke("MountainIPCInvoke")` to
   check the SwallowMap before forwarding to Mountain's DispatchMatch.

2. **DI Container Proxy**: `ProxyServiceCollection.ts` wraps `ServiceCollection.get()`
   and `ServiceCollection.set()` to log every service resolution and optionally
   replace services with Land shims.

3. **Audit Logging**: `AuditLog.ts` maintains a ring buffer of all service
   resolutions, periodically flushed to Mountain's dev log for coverage analysis.

## 🔵 Source Files

| File | Purpose |
|------|---------|
| `Land/Element/Wind/Source/Shim/SwallowMap.ts` | Pattern-matching decision engine |
| `Land/Element/Wind/Source/Shim/RedirectBus.ts` | Handler registration and routing |
| `Land/Element/Wind/Source/Shim/IPCInterceptor.ts` | Tauri IPC wrapper |
| `Land/Element/Wind/Source/Shim/AuditLog.ts` | Service resolution auditor |
| `Land/Element/Wind/Source/Shim/Gate.ts` | TierShim activation gate |
| `Land/Element/Output/Source/Service/CEL/Land/Shim/Init.ts` | Runtime injection module |

## 🔵 Related Documentation

- [Low-Level Shim](/doc/low-level-shim) — The engine-level prototype hooks (orange)
- [VSCode API Coverage Matrix](/doc/vscode-api-coverage) — API surface coverage
- [Environment Variables](/doc/configuration) — TierShim and TierSwallow* vars
- [Build Pipeline](/doc/build-pipeline) — Output Transform injection

🔵 **COVERAGE TELEMETRY — ACTIVE** — This component tracks service resolution,
event routing, and domain coverage. All data flows through Land's diagnostic
pipeline (OTLP/PostHog/dev log). No data leaves the local machine.
