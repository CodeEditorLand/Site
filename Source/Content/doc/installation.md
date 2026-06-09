---
title: Installation
section: Start
order: 3
description:
    System requirements, submodule clone instructions, build profiles, and
    artifact paths for Land.
---

Land is source-build only today. There are no public installer packages. This
page covers system requirements, the correct way to obtain each submodule, the
available build profiles, and where the build artifacts land on disk.

## System Requirements

| Requirement      | Minimum       | Notes                                                                                      |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------ |
| Operating system | macOS 12+     | Primary platform. Windows/Linux in progress.                                               |
| Rust             | 1.95.0 (MSRV) | Install via [rustup.rs](https://rustup.rs/). Edition 2024.                                 |
| Node.js          | 24            | Required for VS Code source step only. Use nvm.                                            |
| pnpm             | Latest stable | `npm install -g pnpm`. Used for workspace installs.                                        |
| Git              | Any recent    | Git LFS required: `git lfs install`.                                                       |
| Disk space       | ~10 GB        | VS Code source (~2 GB), Rust build cache (~4 GB), Node modules (~2 GB), artifacts (~1 GB). |
| RAM              | 8 GB minimum  | 16 GB recommended for parallel Rust compilation.                                           |

## Submodule Clone Instructions

> [!WARNING] Never run `git clone --recurse-submodules`. Submodules are on
> independent branches. Recursive cloning pulls the wrong commits.

Each element is a separate Git repository cloned into `Element/<Name>/` inside
the Land repo root. Clone the main repo first, then each element individually on
the `Current` branch.

| Element  | Repository                         | Path in Land repo                                |
| -------- | ---------------------------------- | ------------------------------------------------ |
| Common   | github.com/CodeEditorLand/Common   | `Element/Common`                                 |
| Echo     | github.com/CodeEditorLand/Echo     | `Element/Echo`                                   |
| Vine     | github.com/CodeEditorLand/Vine     | `Element/Vine`                                   |
| Mountain | github.com/CodeEditorLand/Mountain | `Element/Mountain`                               |
| Cocoon   | github.com/CodeEditorLand/Cocoon   | `Element/Cocoon`                                 |
| Wind     | github.com/CodeEditorLand/Wind     | `Element/Wind`                                   |
| Sky      | github.com/CodeEditorLand/Sky      | `Element/Sky`                                    |
| Output   | github.com/CodeEditorLand/Output   | `Element/Output`                                 |
| Rest     | github.com/CodeEditorLand/Rest     | `Element/Rest`                                   |
| Worker   | github.com/CodeEditorLand/Worker   | `Element/Worker`                                 |
| Mist     | github.com/CodeEditorLand/Mist     | `Element/Mist`                                   |
| Maintain | github.com/CodeEditorLand/Maintain | `Element/Maintain`                               |
| Grove    | github.com/CodeEditorLand/Grove    | `Element/Grove`                                  |
| Editor   | github.com/CodeEditorLand/Editor   | `Element/Dependency/Microsoft/Dependency/Editor` |

After cloning each element, check out its `Current` branch:

```sh
git -C Element/Mountain checkout Current
```

Repeat for each element.

## Build Profiles

The build script at `Maintain/Debug/Build.sh` accepts a `--profile` flag. The
profile controls which workbench variant is compiled, which tier flags are
active, and whether assets are pre-bundled.

| Profile                         | Workbench      | Feature coverage                 | Output type                         |
| ------------------------------- | -------------- | -------------------------------- | ----------------------------------- |
| `debug`                         | Browser        | 70-80%                           | Dev binary                          |
| `debug-mountain`                | Mountain       | 80-90%                           | Dev binary                          |
| `debug-electron`                | Electron       | 95%+                             | Dev binary                          |
| `debug-electron-bundled`        | Electron       | 95%+                             | Dev binary, Vite/Astro pre-compiled |
| `debug-electron-unbundled`      | Electron       | 95%+                             | Dev binary, dynamic-import path     |
| `debug-mountain-only`           | Mountain       | No Cocoon subprocess             | Dev binary                          |
| `debug-cocoon-headless`         | None           | Mountain + Cocoon, Wind disabled | Dev binary                          |
| `debug-kernel`                  | None           | Pure Mountain, no built-ins      | Dev binary                          |
| `debug-electron-rest`           | Electron + OXC | 95%+ with faster TS compiler     | Dev binary                          |
| `production-electron-bundled`   | Electron       | Optimized release                | Prod binary                         |
| `production-electron-unbundled` | Electron       | Release without bundled assets   | Prod binary                         |

## Artifact Paths

After a successful build, all artifacts are written inside the `Element/`
directory tree. Nothing is installed system-wide.

```
Land/
  Element/
    Mountain/Target/
      debug-electron/
        Mountain          # Native Tauri binary
        Mountain.app/     # macOS .app bundle (signed)
    Air/Target/
      debug/
        Air               # Background daemon binary
    Cocoon/Compiled/
      cocoon-bootstrap.js # Extension host entry point
      bundles/            # Extension host support bundles
    Output/Target/
      @codeeditorland/output/  # Bundled VS Code platform package
    Sky/Target/
      Static/
        Bundled/          # Pre-compiled workbench HTML+JS
        Application/      # Extension assets
    Wind/Target/
      Function/Install/   # Compiled Wind service layer
```

> [!IMPORTANT] Never edit files under any `Target/` directory. These are build
> outputs. Source lives in `Public/` or `Source/` within each element. Edits to
> `Target/` are overwritten on the next build.

## macOS Code Signing

The debug build is automatically re-signed after the Tauri build step. The
signing script is at `Maintain/Script/SignBundle.sh` and is invoked
automatically by `Maintain/Debug/Build.sh`. Ad-hoc signing is used for debug
builds (no Developer ID required).

To manually re-sign after modifying the bundle:

```sh
BundleLevel=debug sh Maintain/Script/SignBundle.sh
```

## Next Steps

- [Getting Started](/doc/getting-started) - prerequisites and clone walkthrough
- [Configuration](/doc/configuration) - environment variable system
- [Project Structure](/doc/project-structure) - element layout and naming
  conventions
