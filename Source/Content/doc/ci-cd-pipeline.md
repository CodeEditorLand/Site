---
title: "CI/CD Pipeline"
section: "Development"
order: 3
description:
    "Overview of the GitHub Actions workflow, turbo.json task graph, build
    matrix, artifact upload, and when Maintain changes are sufficient without a
    rebuild."
---

Land's CI/CD pipeline is built on GitHub Actions with Turborepo coordinating the
task graph across all workspace packages. Every push to `Current` and every pull
request targeting `Current` triggers the pipeline. This page describes what
runs, what it produces, and how environment secrets and the
`beforeBundleCommand` hook fit into the flow.

## GitHub Actions Workflow

The primary workflow file is `Maintain/.GitHub/Workflows/Auto.yml`. It defines
the full build-test-sign-upload sequence. Additional per-element workflows may
exist under each Element's own `.github/workflows/` directory for element-scoped
checks.

### Trigger Conditions

| Event               | Branches            | Effect                               |
| ------------------- | ------------------- | ------------------------------------ |
| `push`              | `Current`           | Full build + artifact upload         |
| `pull_request`      | targeting `Current` | Full build, no artifact upload       |
| `workflow_dispatch` | any                 | Manual trigger with profile override |

### Build Matrix

The matrix covers platform × profile combinations:

| Platform               | Profile                       | Output           |
| ---------------------- | ----------------------------- | ---------------- |
| `macos-latest` (arm64) | `production-electron-bundled` | Signed `.app`    |
| `macos-13` (x86_64)    | `production-electron-bundled` | Signed `.app`    |
| `ubuntu-latest`        | `production-electron-bundled` | `.AppImage`      |
| `windows-latest`       | `production-electron-bundled` | `.exe` installer |

Debug profiles (`debug-electron-bundled`, etc.) are used in local development
and are not part of the CI matrix.

## turbo.json Task Graph

Turborepo resolves the dependency graph between workspace tasks. The key
pipeline is:

```
prepublishOnly → build → test
```

- `prepublishOnly`: TypeScript compilation for all elements. This must pass
  before `build` runs.
- `build`: Tauri bundling, Rust compilation, and static asset generation.
- `test`: Unit and integration tests across Rust and TypeScript elements.

Turborepo's remote cache is used in CI to skip unchanged packages. A package is
only rebuilt if its source files or its dependencies' outputs have changed since
the last cached run.

### Environment Variable Propagation

All `Tier*` and `Product*` variables listed in `turbo.json` under `globalEnv`
are included in the cache key. A change to `TierFileSystem` in `.env.Land`
invalidates the Mountain cache entry and forces a Rust recompile.

## Environment Secrets

The following secrets must be configured in the GitHub repository settings for
the pipeline to produce signed artifacts:

| Secret                               | Purpose                                                       |
| ------------------------------------ | ------------------------------------------------------------- |
| `APPLE_CERTIFICATE`                  | Base64-encoded Apple Developer certificate for macOS codesign |
| `APPLE_CERTIFICATE_PASSWORD`         | Password for the certificate                                  |
| `APPLE_SIGNING_IDENTITY`             | Developer ID string for `codesign --sign`                     |
| `APPLE_ID`                           | Apple ID for notarization                                     |
| `APPLE_PASSWORD`                     | App-specific password for notarization                        |
| `APPLE_TEAM_ID`                      | Apple Developer Team ID                                       |
| `TAURI_SIGNING_PRIVATE_KEY`          | Tauri updater signing key                                     |
| `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` | Password for the updater key                                  |

> [!IMPORTANT] The NLnet acknowledgement text required by the NGI0 Commons Fund
> grant is embedded in the About dialog at build time via a
> `ProductNLnetAcknowledgement` variable. This is set in `.env.Land.Production`
> and does not require a GitHub secret.

## `beforeBundleCommand` Hook - PreBake.ts

Before Tauri bundles the application, the `beforeBundleCommand` in
`tauri.conf.json` runs `Maintain/Build/Manifest/PreBake.ts`. This script walks
all extension roots and writes `extensions.manifest.json` into the bundle
resources directory.

This pre-baked manifest is what allows Land to start in under 50 ms for
extension scanning (versus ~1200 ms for a live filesystem scan on cold start).
The hook fires in all build paths - direct `pnpm tauri build`, `Build.sh`, and
CI - because it lives in `tauri.conf.json`, not in the shell script wrapper.

> [!WARNING] Do not move `PreBake.ts` execution into `Maintain/Debug/Build.sh`
> only. Build.sh is a wrapper; steps placed there are skipped when
> `pnpm tauri build` is invoked directly or from CI without the wrapper.

## Artifact Upload

After a successful production build, CI uploads artifacts using the
`actions/upload-artifact` action:

- **macOS**: `Mountain.app` zipped, plus the `.dmg` installer if packaging is
  enabled.
- **Linux**: `.AppImage` file.
- **Windows**: `.exe` NSIS installer.

Artifacts are retained for 30 days on pull request builds and 90 days on
`Current` branch builds.

## When a Maintain Change Is Sufficient (No Rebuild Needed)

The Maintain crate is a build orchestrator. Its source code is compiled into the
`maintain` binary used to drive builds, but **changes to
`Element/Maintain/Source/`** do not affect the compiled Land application. You
only need to rebuild Mountain (`cargo build -p Mountain`) when Mountain's own
source changes.

Specifically:

| Change type                       | Rebuild needed?                                                        |
| --------------------------------- | ---------------------------------------------------------------------- |
| `Element/Mountain/Source/**/*.rs` | Yes - `cargo build -p Mountain`                                        |
| `Element/Cocoon/Source/**/*.ts`   | Yes - `pnpm prepublishOnly`                                            |
| `Element/Sky/Source/**/*.ts`      | Yes - `pnpm prepublishOnly`                                            |
| `Maintain/Debug/Build.sh`         | No - script change only                                                |
| `Maintain/Script/SignBundle.sh`   | No - script change only                                                |
| `Element/Maintain/Source/**/*.rs` | No - only affects the `maintain` CLI binary                            |
| `.env.Land*` files                | Only if Tier\* values changed (triggers Rust recompile via `build.rs`) |
