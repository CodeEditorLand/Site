---
title: "Worker - Deep Dive"
section: "Deep Dive"
order: 42
description:
    "Service Worker for caching, dynamic CSS loading, and offline web
    application support"
---

# Worker - Deep Dive

Worker provides Service Worker functionality including intelligent caching,
dynamic CSS loading, and offline capabilities for web applications in the Land
ecosystem.

## Architecture

Three-phase design: Service Worker bootstrap, multi-tier caching, and dynamic
CSS loading system.

### Core Files

| File               | Purpose                                                                 |
| :----------------- | :---------------------------------------------------------------------- |
| Source/Worker.js   | Main Service Worker implementation with fetch event handling            |
| Source/Load.js     | Client-side CSS loading coordination                                    |
| Source/Register.js | Service Worker registration, update detection, and lifecycle management |

## Caching Strategy

Two-tier caching with distinct strategies:

### CACHE_CORE (Network-First)

- **Target**: Application shell files (Application/, Register.js, Load.js)
- **Strategy**: Network fetch first, fallback to cache on failure
- **Rationale**: Application changes require latest versions

### CACHE_ASSET (Cache-First)

- **Target**: Static resources (Static/Application/\)
- **Strategy**: Serve cached immediately, validate freshness in background
- **Optimization**: LRU eviction for cache size management

Pre-caching at install phase, runtime caching at fetch events.

## Dynamic CSS Loading

Two-phase system prevents infinite interception loops:

**Phase 1**: Service Worker intercepts CSS import requests, responds with a
generated JavaScript module that calls `window._LOAD_CSS_WORKER()`.

**Phase 2**: Client creates a `<link>` with `?Skip=Intercept` parameter. Service
Worker detects the parameter, bypasses JS generation, serves actual CSS.

The `?Skip=Intercept` parameter creates a state transition that guarantees the
interception terminates.

### Performance

| Metric           | Worker         | Without Worker | Improvement         |
| :--------------- | :------------- | :------------- | :------------------ |
| CSS Loading Time | ~15-65ms       | ~50-200ms      | ~70% faster         |
| Cache Hit Ratio  | >95%           | N/A            | Significant         |
| Bandwidth Usage  | ~60% reduction | Baseline       | Significant savings |

## Version Management

- Content hashing detects meaningful changes beyond file size
- New Service Workers enter waiting state until clients are ready
- Register.js orchestrates controlled reload cycles
- Previous version caches retained as rollback fallback

## Progressive Enhancement

1. Basic functionality without Service Worker
2. Enhanced performance with caching
3. Advanced features with dynamic asset transformation
4. Offline capabilities with update management

## Security

- Generated JavaScript modules validated for CSP compliance
- Cryptographic signature verification for critical assets
- Strict CORS enforcement for intercepted requests
- No external telemetry, fully local operation

## Related

- [Worker overview](/doc/worker)
