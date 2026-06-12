---
title: "Configuration"
section: "Guide"
order: 3
description:
    "Complete reference for Land's multi-file environment variable system —
    file hierarchy, sourcing cascade, variable domains, tier-gating feature
    mapping, consumer mapping, and usage examples."
---

Land uses a **multi-file `.env` system** with 18 files across 6 domains.
Environment variables control which implementation variants (tiers) are compiled
into Mountain and activated at runtime by Cocoon, Wind, Sky, and Output.

---

## Naming Convention

- **Single-word PascalCase verbs** (e.g., `ProductVersion`, `TierFileSystem`,
  `Capture`)
- **No `LAND_` prefix** — variables are named for what they _do_, not where they
  come from
- **One variable per line**, `KEY=value` format, shell-sourced by
  `TierEnvironment.sh`

---

## File Hierarchy

### Core (`.env.Land`)

| File | Path | Purpose |
| :--- | :--- | :--- |
| Dev | `.env.Land` | Product identity, tier-gating defaults, network ports |
| Sample | `.env.Land.Sample` | Clean template with all tier defaults |
| Production | `.env.Land.Production` | Production product identity (e.g., `ProductCommit` set to git SHA) |

### Node (`.env.Land.Node`)

| File | Path | Purpose |
| :--- | :--- | :--- |
| Dev | `.env.Land.Node` | Node.js runtime config |
| Sample | `.env.Land.Node.Sample` | Template |
| Production | `.env.Land.Production.Node` | Production overrides |

### Extensions (`.env.Land.Extensions`)

| File | Path | Purpose |
| :--- | :--- | :--- |
| Dev | `.env.Land.Extensions` | Extension directory roots, dev/dev-load behavior |
| Sample | `.env.Land.Extensions.Sample` | Template |
| Production | `.env.Land.Production.Extensions` | Production extension layout overrides |

### PostHog (`.env.Land.PostHog`)

| File | Path | Purpose |
| :--- | :--- | :--- |
| Dev | `.env.Land.PostHog` | PostHog project key, endpoint, OTLP config |
| Sample | `.env.Land.PostHog.Sample` | Template |
| Production | `.env.Land.Production.PostHog` | Production telemetry (keys redacted) |

### Diagnostics (`.env.Land.Diagnostics`)

| File | Path | Purpose |
| :--- | :--- | :--- |
| Dev | `.env.Land.Diagnostics` | Debug knobs (DevTools, smoke tests, tracing) |
| Sample | `.env.Land.Diagnostics.Sample` | Template with all knobs disabled |
| Production | `.env.Land.Production.Diagnostics` | Production overrides |

### Bundled (`.env.Land.Bundled`)

| File | Path | Purpose |
| :--- | :--- | :--- |
| Dev | `.env.Land.Bundled` | Workbench bundle layout |
| Sample | `.env.Land.Bundled.Sample` | Template |
| Production | `.env.Land.Production.Bundled` | Production bundle layout overrides |

---

## Sourcing Cascade

The sourcing cascade is orchestrated by `Maintain/Script/TierEnvironment.sh`.
Each file is `source`-ed in order, so later files override earlier ones for the
same key.

```
Step  ┌──────────────────────────────┐
  1   │ .env.Land                    │  Core dev defaults
      │ └─ fallback: .env.Land.Sample│  (used if dev file absent)
  2   │ .env.Land.Production         │  Core prod overlay (if applicable)
  3   │ .env.Land.Node               │  Node runtime dev defaults
      │ └─ fallback: .env.Land.Node.Sample
  4   │ .env.Land.Production.Node    │  Node runtime prod overlay
  5   │ .env.Land.Extensions         │  Extension dirs dev defaults
      │ └─ fallback: .env.Land.Extensions.Sample
  6   │ .env.Land.Production.Extensions│ Extension dirs prod overlay
  7   │ .env.Land.PostHog            │  PostHog/OTLP dev defaults
      │ └─ fallback: .env.Land.PostHog.Sample
  8   │ .env.Land.Production.PostHog │  PostHog/OTLP prod overlay
  9   │ .env.Land.Diagnostics        │  Debug knobs dev defaults
      │ └─ fallback: .env.Land.Diagnostics.Sample
 10   │ .env.Land.Production.Diagnostics│ Debug knobs prod overlay
 11   │ .env.Land.Bundled            │  Bundle layout dev defaults
      │ └─ fallback: .env.Land.Bundled.Sample
 12   │ .env.Land.Production.Bundled │  Bundle layout prod overlay
      └──────────────────────────────┘
```

### Key Rules

1. **Overlay conditional**: Production overlays are only sourced when
   `NODE_ENV=production` or `Profile` contains `release`.
2. **Fallback chain**: If a dev file is absent, the corresponding `.Sample` file
   is sourced.
3. **Last-write-wins**: Identical keys in later files silently override earlier
   values.
4. **Absent files skipped**: Non-existing files are silently skipped.
5. **Build-time vs runtime**: Variables are available at both build time
   (through `build.rs`, esbuild/Vite `define` substitutions) and runtime
   (through `std::env::var`, `import.meta.env`, `__LandTiers`).

---

## Variables by Domain

### Core

| Variable | Default | Production Override | Description |
| :--- | :--- | :--- | :--- |
| `ProductVersion` | `1.118.0` | Set by release pipeline | Product version string |
| `ProductCommit` | `dev` | Actual git SHA | Set by release pipeline |
| `ProductQuality` | `development` | `stable` | Release-channel mode |
| `ProductNameShort` | `Land` | (same) | Short product name |
| `ProductNameLong` | `Land Editor` | (same) | Full product name |
| `ProductApplicationName` | `land` | (same) | Executable name |
| `ProductDataFolderName` | `.land` | (same) | User data folder |
| `ProductUrlProtocol` | `land` | (same) | Custom URL protocol scheme |
| `ProductServerApplicationName` | `land-server` | (same) | Server application name |
| `ProductEmbedderIdentifier` | `fiddee-desktop` | (same) | Embedder identifier for Tauri |
| `ProductFlavor` | `IWTNMMMMMM` | Per-flavor overlay | 10-char build flavor code |
| `ProductFlavorLong` | `false` | (same) | Human-readable flavor names |
| `NetworkMountainPort` | `50051` | (same) | gRPC port for Mountain |
| `NetworkCocoonPort` | `50052` | (same) | gRPC port for Cocoon |
| `TierRemoteProcedureCall` | `gRPC` | (same) | RPC transport |
| `TierHTTPProxy` | `HandRolled` | (same) | HTTP proxy backend |
| `TierLogger` | `Standard` | (same) | Logger backend |
| `TierFileSystem` | `Layer2` | (same) | File system implementation |
| `TierFindFiles` | `Layer3` | (same) | File search implementation |
| `TierGlob` | `JavaScript` | (same) | Glob matching |
| `TierFileWatcher` | `Layer4` | (same) | File watcher |
| `TierSchemeAssets` | `Embedded` | (same) | Asset scheme handler |
| `TierConfiguration` | `Cache` | (same) | Configuration service |
| `TierDiagnostics` | `Full` | (same) | Diagnostics propagation |
| `TierClipboard` | `Layer3` | (same) | Clipboard implementation |
| `TierOpenExternal` | `Layer3` | (same) | Open external links |
| `TierDocumentMirror` | `Full` | (same) | Document mirror mode |
| `TierExtensionActivation` | `Parallel8` | (same) | Extension activation concurrency |
| `TierExtensionScan` | `Sequential` | (same) | Extension scan mode |
| `TierModuleCache` | `Simple` | (same) | Module caching |
| `TierTelemetry` | `Synchronous` | (same) | Telemetry transport |
| `TierIPC` | `Mountain` | (same) | IPC routing tier |

### Node

| Variable | Default | Description |
| :--- | :--- | :--- |
| `Pick` | _(empty)_ | Absolute path to a Node.js binary override |
| `Require` | `20` | Minimum Node.js major version required by Cocoon |

### Extensions

| Variable | Default | Description |
| :--- | :--- | :--- |
| `Ship` | _(empty)_ | Built-in extension source directory |
| `Lodge` | _(empty)_ | User extension install root |
| `Extend` | _(empty)_ | Additional extension paths (colon-separated) |
| `Probe` | _(empty)_ | Development extensions root (always loads) |
| `Skip` | `false` | Skip built-in extensions |
| `Mute` | `false` | Mute all extensions |
| `Wire` | `true` | Auto-install built-in extension dependencies |
| `Install` | `true` | Auto-install user extension dependencies |

### PostHog (Telemetry)

| Variable | Default | Description |
| :--- | :--- | :--- |
| `Authorize` | `phc_mvbuxcLutfZ...` | PostHog project key |
| `Beam` | `https://eu.i.posthog.com` | PostHog region endpoint |
| `Report` | `true` | Master telemetry switch |
| `Throttle` | `5` | Rate limit (max bursts) |
| `Buffer` | `3000` | Buffer size in ms for batching |
| `Batch` | `20` | Batch size for event submission |
| `Cap` | `7` | Exception capture cap per 10s window |
| `Replay` | `false` | Session recording toggle |
| `Ask` | `false` | PostHog surveys toggle |
| `Brand` | `nikola` | Distinct-ID seed |
| `Capture` | `true` | Master telemetry kill switch |
| `Trace` | `all` | Span filter (comma-separated tags) |

### OTLP (OpenTelemetry)

| Variable | Default | Description |
| :--- | :--- | :--- |
| `OTLPEndpoint` | `http://127.0.0.1:4318` | OTLP collector endpoint |
| `OTLPEnabled` | `true` | OTLP exporter toggle |
| `Record` | `0` | Mirror batches to NDJSON log |

### Diagnostics

| Variable | Default | Description |
| :--- | :--- | :--- |
| `Inspect` | _(unset)_ | Auto-open Mountain's WKWebView DevTools |
| `Smoke` | _(unset)_ | Run boot-time smoke harness |
| `Trace` | _(unset)_ | Dev-log tag selection |
| `Record` | `0` | Persist Mountain dev log to disk |
| `Disable` | `false` | Master kill switch for all Land customizations |
| `DisableUIFixes` | _(unset)_ | Skip only UI/rendering transforms |
| `DebugServer` | _(unset)_ | Start HTTP debug server |
| `DebugServerPort` | `9933` | Debug server port |
| `HotReload` | _(unset)_ | Enable hot reload in dev mode |
| `Watch` | _(unset)_ | Enable file watching in dev mode |
| `LiveReloadPort` | `3001` | Live-reload server port |

### Bundled

| Variable | Default | Description |
| :--- | :--- | :--- |
| `Pack` | _(empty)_ | Space-separated list of workbench variants for bundled tree |
| `Boot` | `false` | Render bundled layout vs dynamic-import path |

---

## Tier-Gating Feature Mapping

Tier values from `.env.Land` are translated by `TierEnvironment.sh` into Cargo
feature flags. The mapping is as follows:

| Environment Variable | Non-Default Value | Cargo Feature Activated |
| :--- | :--- | :--- |
| `TierRemoteProcedureCall` | `SharedMemory` | `TierRemoteProcedureCallSharedMemory` |
| `TierHTTPProxy` | `Hyper` | `TierHTTPProxyHyper` |
| `TierLogger` | `Ring` | `TierLoggerRing` |
| `TierFileSystem` | `Layer4` | `TierFileSystemLayer4` |
| `TierFindFiles` | `Layer4` | `TierFindFilesLayer4` |
| `TierGlob` | `Native` | `TierGlobNative` |
| `TierFileWatcher` | `Layer4` | `TierFileWatcherLayer4` |
| `TierSchemeAssets` | `Hybrid` | `TierSchemeAssetsHybrid` |
| `TierConfiguration` | `Eager` | `TierConfigurationEager` |
| `TierDiagnostics` | `Delta` | `TierDiagnosticsDelta` |
| `TierClipboard` | `Layer4` | `TierClipboardLayer4` |
| `TierOpenExternal` | `Layer4` | `TierOpenExternalLayer4` |
| `TierExtensionScan` | `Parallel` | `TierExtensionScanParallel` |

> **Default values do not activate features.** For example,
> `TierFileSystem=Layer2` (the default) does not activate any feature; only
> `TierFileSystem=Layer4` activates `TierFileSystemLayer4`.

---

## Consumer Mapping

Each element reads variables through its own mechanism:

| Element | Mechanism | Details |
| :--- | :--- | :--- |
| **Mountain** (build.rs) | `cargo:rustc-env` | Compile-time constants via `env!()` |
| **Mountain** (build.rs) | `cargo:rustc-cfg` | Conditional compilation via `#[cfg(feature = ...)]` |
| **Mountain** (runtime) | `std::env::var` | Runtime variable reads |
| **Cocoon** (Node.js) | esbuild `--define` | Build-time substitution of `process.env.*` |
| **Wind** (TypeScript) | Vite `define` | Build-time injection of `import.meta.env.*` |
| **Sky** (Astro) | Astro globals | `__LandTiers` and `__LandProduct` |
| **Output** (ESBuild) | Transform pipeline | Controls which transforms are applied |

### localStorage Runtime Overrides

Certain variables can be toggled at runtime via the DevTools console:

```javascript
// Disable all Land customizations
localStorage.setItem("Disable", "1");

// Enable boot-time smoke harness
localStorage.setItem("Smoke", "1");
```

Changes take effect on the next application cycle.

---

## Usage Examples

### Enabling Telemetry Debugging

```bash
# In .env.Land.PostHog:
Authorize=phc_your_key_here
Beam=https://eu.i.posthog.com
Report=true
Capture=true
Trace=all
OTLPEndpoint=http://127.0.0.1:4318
OTLPEnabled=true
Record=1
```

Then run a local Jaeger instance:

```bash
docker run -d --name jaeger \
  -p 16686:16686 \
  -p 4318:4318 \
  jaegertracing/all-in-one:latest
```

### Switching Extension Loading Modes

```bash
# Load only user extensions, skip all built-ins
Skip=true

# Completely mute all extensions (no extension host)
Mute=true

# Load development extensions from a custom path
Probe=/path/to/my-extension

# Add additional extension directories (colon-separated)
Extend=/opt/custom-extensions:/home/user/more-extensions
```

### Disabling All Land Customizations for Bisecting

```bash
# In .env.Land.Diagnostics:
Disable=true
```

When `Disable=true`:
- All Output transforms are dropped
- Cocoon and Air spawn are skipped
- CloseRequested intercept is disabled
- SkyBridge is not installed
- The application falls back to vanilla VS Code behavior

### Building for Production

```bash
export NODE_ENV=production
# or
export Profile=release-electron-bundled
```

Key differences between dev and production:

| Variable | Dev | Production |
| :--- | :--- | :--- |
| `ProductQuality` | `development` | `stable` |
| `ProductCommit` | `dev` | Actual git SHA |
| `Wire` | `true` | `false` |
| `Capture` | `true` | `false` |
| `Report` | `true` | `false` |
| `OTLPEnabled` | `true` | `false` |
| `Boot` | `false` | `true` |

---

## File Paths Summary

| File | Relative Path |
| :--- | :--- |
| Core dev | `.env.Land` |
| Core sample | `.env.Land.Sample` |
| Core production | `.env.Land.Production` |
| Node dev | `.env.Land.Node` |
| Extensions dev | `.env.Land.Extensions` |
| PostHog dev | `.env.Land.PostHog` |
| Diagnostics dev | `.env.Land.Diagnostics` |
| Bundled dev | `.env.Land.Bundled` |
| Sourcing script | `Maintain/Script/TierEnvironment.sh` |
