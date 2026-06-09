---
title: Configuration
section: Start
order: 4
description:
    Land's environment variable system - 18 .env files across 6 domains, the
    sourcing cascade, and key variable reference.
---

Land uses a multi-file `.env` system instead of a single monolithic environment
file. Variables control which implementation tiers are compiled into Mountain at
build time and which runtime behaviors are active in Cocoon, Wind, Sky, and
Output. All variable names are PascalCase - no `SCREAMING_SNAKE_CASE` and no
`LAND_` prefix.

## File Hierarchy

There are 18 environment files across 6 domains. Each domain has up to three
files: a development default, a sample template, and a production overlay.

| Domain      | Dev file                | Sample file                    | Production overlay                 |
| ----------- | ----------------------- | ------------------------------ | ---------------------------------- |
| Core        | `.env.Land`             | `.env.Land.Sample`             | `.env.Land.Production`             |
| Node        | `.env.Land.Node`        | `.env.Land.Node.Sample`        | `.env.Land.Production.Node`        |
| Extensions  | `.env.Land.Extensions`  | `.env.Land.Extensions.Sample`  | `.env.Land.Production.Extensions`  |
| PostHog     | `.env.Land.PostHog`     | `.env.Land.PostHog.Sample`     | `.env.Land.Production.PostHog`     |
| Diagnostics | `.env.Land.Diagnostics` | `.env.Land.Diagnostics.Sample` | `.env.Land.Production.Diagnostics` |
| Bundled     | `.env.Land.Bundled`     | `.env.Land.Bundled.Sample`     | `.env.Land.Production.Bundled`     |

To get started, copy the sample to create your local dev file:

```sh
cp .env.Land.Sample .env.Land
```

## Sourcing Cascade

Files are sourced by `Maintain/Script/TierEnvironment.sh` in a fixed order.
Later files override earlier ones for the same key (last-write-wins).

```
1.  .env.Land              (core dev defaults)
2.  .env.Land.Production   (core prod overlay - only when NODE_ENV=production or Profile contains "release")
3.  .env.Land.Node
4.  .env.Land.Production.Node
5.  .env.Land.Extensions
6.  .env.Land.Production.Extensions
7.  .env.Land.PostHog
8.  .env.Land.Production.PostHog
9.  .env.Land.Diagnostics
10. .env.Land.Production.Diagnostics
11. .env.Land.Bundled
12. .env.Land.Production.Bundled
```

If a dev file is absent, its corresponding `.Sample` file is used as a fallback.
Missing files are silently skipped. Production overlays are only loaded when
`NODE_ENV=production` or the `Profile` variable contains the substring
`release`.

## TierIPC Routing

The `TierIPC` variable controls how Wind and Output route IPC calls at runtime.
It is not a build-time Cargo feature - it is read at runtime by the TypeScript
service layer.

| Value          | Behavior                                                            |
| -------------- | ------------------------------------------------------------------- |
| `Mountain`     | All calls go to Mountain via Tauri IPC. This is the default.        |
| `Node`         | All calls go to Cocoon via the `cocoon:request` bridge.             |
| `NodeDeferred` | Mountain first; falls back to Cocoon on miss or undefined response. |

Set it in `.env.Land` or export it directly:

```sh
export TierIPC=NodeDeferred
```

## Key Variables Reference

### Product Identity

| Variable                    | Default        | Description                                                                        |
| --------------------------- | -------------- | ---------------------------------------------------------------------------------- |
| `ProductVersion`            | `1.118.0`      | Version string; must satisfy all built-in extensions' `engines.vscode` range.      |
| `ProductCommit`             | `dev`          | Set to git SHA by the release pipeline.                                            |
| `ProductQuality`            | `development`  | `stable` in production. Gates inline NLS source-map probe and productService mode. |
| `ProductNameShort`          | `Land`         | Short product name used in UI.                                                     |
| `ProductNameLong`           | `Land Editor`  | Full product name.                                                                 |
| `ProductApplicationName`    | `land`         | Executable name.                                                                   |
| `ProductDataFolderName`     | `.land`        | User data folder (e.g., `~/.land`).                                                |
| `ProductUrlProtocol`        | `land`         | Custom URL scheme (`land://...`).                                                  |
| `ProductEmbedderIdentifier` | `land-desktop` | Tauri embedder identifier.                                                         |

### Network

| Variable              | Default | Description                              |
| --------------------- | ------- | ---------------------------------------- |
| `NetworkMountainPort` | `50051` | gRPC port for the Mountain RPC service.  |
| `NetworkCocoonPort`   | `50052` | gRPC port for the Cocoon extension host. |

### Tier Flags (Core)

Tier variables are translated to Cargo feature flags by `TierEnvironment.sh`.
Default values do not activate any feature; only non-default values emit
`cargo:rustc-cfg`.

| Variable                  | Default       | Values                                               | Description                                                                          |
| ------------------------- | ------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `TierRemoteProcedureCall` | `gRPC`        | `gRPC`, `SharedMemory`                               | IPC transport between Mountain and Cocoon.                                           |
| `TierFileSystem`          | `Layer2`      | `Layer2`, `Layer3`, `Layer4`                         | File system implementation strategy.                                                 |
| `TierFileWatcher`         | `Layer4`      | `Layer4`, `Stub`                                     | `Layer4` = native notify (FSEvents/inotify). `Stub` = drops all watch registrations. |
| `TierFindFiles`           | `Layer3`      | `Layer3`, `Layer4`                                   | File search implementation.                                                          |
| `TierGlob`                | `JavaScript`  | `JavaScript`, `Native`                               | Glob pattern compiler. `Native` = Rust `globset`.                                    |
| `TierClipboard`           | `Layer3`      | `Layer3`, `Layer4`, `Layer5`                         | Clipboard backend.                                                                   |
| `TierConfiguration`       | `Cache`       | `Cache`, `Eager`                                     | Configuration service caching strategy.                                              |
| `TierDiagnostics`         | `Full`        | `Full`, `Delta`                                      | Diagnostics propagation mode.                                                        |
| `TierDocumentMirror`      | `Full`        | `Full`, `Lazy`                                       | Document mirror synchronization mode.                                                |
| `TierExtensionActivation` | `Parallel8`   | `Sequential`, `Parallel4`, `Parallel8`, `Parallel16` | Extension activation concurrency.                                                    |
| `TierExtensionScan`       | `Sequential`  | `Sequential`, `Parallel`                             | Extension directory scan strategy.                                                   |
| `TierSchemeAssets`        | `Embedded`    | `Embedded`, `Hybrid`, `FileSystem`                   | Custom asset scheme handler.                                                         |
| `TierHTTPProxy`           | `HandRolled`  | `HandRolled`, `Hyper`                                | HTTP proxy implementation.                                                           |
| `TierLogger`              | `Standard`    | `Standard`, `Ring`                                   | Logger backend.                                                                      |
| `TierModuleCache`         | `Simple`      | `Simple`, `Off`, `Shared`                            | Module cache strategy.                                                               |
| `TierTelemetry`           | `Synchronous` | `Synchronous`, `Batched`, `Off`                      | Telemetry transport mode.                                                            |
| `TierOpenExternal`        | `Layer3`      | `Layer3`, `Layer4`                                   | Open-external-link implementation.                                                   |

### Extensions

| Variable | Default | Description                                                                                                  |
| -------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `Ship`   | (empty) | Built-in extension source directory. In dev, resolves to `Element/Sky/Target/Static/Application/extensions`. |
| `Lodge`  | (empty) | User extension install root (`~/.land/extensions`).                                                          |
| `Extend` | (empty) | Additional extension paths. Colon-separated on macOS/Linux.                                                  |
| `Probe`  | (empty) | Development extension path. Always loads regardless of enablement state.                                     |
| `Skip`   | `false` | Skip built-in extensions.                                                                                    |
| `Mute`   | `false` | Disable all extensions including user and dev extensions.                                                    |
| `Wire`   | `true`  | Auto-install built-in extensions' runtime dependencies. Set to `false` in production (pre-bundled).          |

### Diagnostics

| Variable  | Default | Description                                                                                                                                                                    |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Inspect` | (unset) | Set to `1` to auto-open WKWebView DevTools at boot.                                                                                                                            |
| `Trace`   | (unset) | Dev-log tag filter. `all` = verbose. Comma-separated tags: `lifecycle`, `ipc`, `extensions`, `grpc`, `cocoon`, `terminal`, `tree-view`, `scheme-assets`, `window`, `sky-emit`. |
| `Record`  | `0`     | Set to `1` to persist Mountain dev log to `<app-data>/logs/<timestamp>/Mountain.dev.log`.                                                                                      |
| `Disable` | `false` | Master kill switch. Skips all Land shims, Cocoon/Air spawn, SkyBridge. Falls back to vanilla VS Code behavior.                                                                 |
| `Smoke`   | (unset) | Set to `1` to run boot-time smoke harness against Wind's CommandCatalog.                                                                                                       |

### Telemetry (PostHog)

| Variable       | Default                    | Production | Description                                                                 |
| -------------- | -------------------------- | ---------- | --------------------------------------------------------------------------- |
| `Authorize`    | (dev key)                  | (empty)    | PostHog project key.                                                        |
| `Beam`         | `https://eu.i.posthog.com` | (same)     | PostHog region endpoint.                                                    |
| `Capture`      | `true`                     | `false`    | Master telemetry kill switch. `false` short-circuits both PostHog and OTLP. |
| `Report`       | `true`                     | `false`    | Telemetry toggle.                                                           |
| `Replay`       | `false`                    | `false`    | Session recording toggle.                                                   |
| `OTLPEndpoint` | `http://127.0.0.1:4318`    | (same)     | OTLP collector endpoint.                                                    |
| `OTLPEnabled`  | `true`                     | `false`    | OTLP exporter toggle.                                                       |

### Bundled Workbench

| Variable | Default | Production                            | Description                                                         |
| -------- | ------- | ------------------------------------- | ------------------------------------------------------------------- |
| `Pack`   | (empty) | `electron browser sessions workbench` | Space-separated workbench variants to pre-compile.                  |
| `Boot`   | `false` | `true`                                | When `true`, `index.astro` renders the pre-compiled bundled layout. |

## Runtime Overrides via localStorage

Two variables can be toggled at runtime in the WKWebView DevTools console
without restarting:

```javascript
// Disable all Land shims and connections
localStorage.setItem("Disable", "1");

// Enable boot-time smoke harness
localStorage.setItem("Smoke", "1");

// Remove an override
localStorage.removeItem("Disable");
```

## Debug vs Release Differences

| Variable         | Development   | Production                            |
| ---------------- | ------------- | ------------------------------------- |
| `ProductQuality` | `development` | `stable`                              |
| `ProductCommit`  | `dev`         | Actual git SHA                        |
| `Wire`           | `true`        | `false`                               |
| `Capture`        | `true`        | `false`                               |
| `Report`         | `true`        | `false`                               |
| `OTLPEnabled`    | `true`        | `false`                               |
| `Boot`           | `false`       | `true`                                |
| `Pack`           | (empty)       | `electron browser sessions workbench` |

## Related Pages

- [Quickstart](/doc/quickstart) - build commands and launch
- [Architecture](/doc/architecture) - how tier flags propagate to each element
- [Project Structure](/doc/project-structure) - where `.env.Land*` files live in
  the repo
