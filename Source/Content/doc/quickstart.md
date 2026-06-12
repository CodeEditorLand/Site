---
title: Quickstart
section: Start
order: 1
description: The fastest path to building and running FIDDEE from source.
---

The build is a two-step linear flow. Step 1 compiles the VS Code platform source
that the extension host consumes. Step 2 compiles the Rust backend and bundles
the TypeScript frontend into a runnable Tauri application. Both steps are
mandatory; Step 2 will fail if Step 1 has not been completed.

> [!IMPORTANT] Do not use `git clone --recurse-submodules`. Each element
> submodule is managed independently on its own branch. Clone each one
> individually as described in [Getting Started](/Doc/getting-started).

## Step 1: Compile VS Code Source

`Node 24` is required for this step. The exact pinned version is in
`Dependency/Microsoft/Dependency/Editor/.nvmrc`.

Before running `npm install`, add these to your shell profile and reload your
terminal. Without them, `npm install` will attempt to download Electron (~200
MB) and Playwright Chromium (~300 MB), which are only needed for integration
tests, not compilation.

```sh
export ELECTRON_SKIP_BINARY_DOWNLOAD=1
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
```

Then compile:

```sh
cd Dependency/Microsoft/Dependency/Editor

nvm use 24
export NODE_ENV=development

git fetch --all
git reset --hard Parent/main
git clean -dfx

npm install
npm run compile
npm run compile-extensions-build
```

> [!IMPORTANT] This submodule uses `npm`, not `pnpm`. Do not substitute
> `pnpm install` - the submodule has an npm-native `package-lock.json` and
> `.npmrc`.

## Step 2: Build the Land Application

Return to the repository root and run the build script:

```sh
cd Land

export Trace=all Record=1 Disable=false
./Maintain/Debug/Build.sh --profile debug-electron-bundled
```

The script compiles the Rust workspace, bundles Cocoon and Output via ESBuild,
compiles Sky and Wind via Vite/Astro, and signs the resulting `.app` bundle.

> [!NOTE] If the application crashes immediately on macOS with a permission or
> code-signing error, re-run the signing script manually:
>
> ```sh
> BundleLevel=debug sh Maintain/Script/SignBundle.sh
> ```
>
> This strips quarantine bits and re-signs the bundle with the entitlements from
> `Element/Mountain/Entitlements.plist`. `Build.sh` calls this automatically,
> but a manual re-sign is needed if you copy or move the `.app` after building.

## 🚀　Launch

After a successful build, the application binary is at:

```text
Element/Mountain/Target/debug/Mountain
```

Or use the `--run` flag to launch immediately after the build completes:

```sh
./Maintain/Debug/Build.sh --profile debug-electron-bundled --run
```

## 🔑　Key Environment Variables

These variables are read from `.env.Land*` files in the repository root. Copy
`.env.Land.Sample` to `.env.Land` to start with defaults.

| Variable              | Default    | Purpose                                                                                                  |
| --------------------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| `Trace`               | `all`      | Dev-log tag filter. `all` = verbose. Comma-separated subset for less noise.                              |
| `Record`              | `0`        | Set to `1` to persist Mountain dev log to disk.                                                          |
| `Disable`             | `false`    | Master kill switch. `true` disables all Land shims for bisecting.                                        |
| `Inspect`             | (unset)    | Set to `1` to auto-open WKWebView DevTools at boot.                                                      |
| `TierIPC`             | `Mountain` | IPC routing: `Mountain` (Tauri), `Node` (Cocoon only), `NodeDeferred` (Mountain first, Cocoon fallback). |
| `NetworkMountainPort` | `50051`    | gRPC port for Mountain.                                                                                  |
| `NetworkCocoonPort`   | `50052`    | gRPC port for Cocoon extension host.                                                                     |

## 📐　Build Profiles

| Profile                         | Workbench         | Coverage                          | Notes                                   |
| ------------------------------- | ----------------- | --------------------------------- | --------------------------------------- |
| `debug`                         | Browser           | 70-80%                            | Default debug                           |
| `debug-mountain`                | Mountain          | 80-90%                            | Recommended for daily development       |
| `debug-electron`                | Electron          | 95%+                              | Full feature set                        |
| `debug-electron-rest`           | Electron + OXC    | 95%+                              | Fastest TypeScript compile              |
| `debug-electron-minimal`        | Electron          | No built-in extensions            | Atom J1                                 |
| `debug-mountain-only`           | Mountain          | No Cocoon subprocess              | Atom N3                                 |
| `debug-cocoon-headless`         | Mountain + Cocoon | Wind preload disabled             | Atom N3b                                |
| `debug-kernel`                  | None              | Pure Mountain, no built-ins       | Atom N3c                                |
| `debug-electron-compiled`       | Electron          | Single-binary embedded resources  | Debug symbols + `Compile=true`          |
| `debug-mountain-compiled`       | Mountain          | Single-binary embedded resources  | Debug symbols + `Compile=true`          |
| `debug-electron-bundled`        | Electron          | Vite/Astro compiled workbench     | Full bundled Electron debug build       |
| `debug-browser-bundled`         | Browser           | Vite/Astro compiled workbench     |                                         |
| `debug-sessions-bundled`        | Sessions          | Vite/Astro compiled workbench     |                                         |
| `debug-workbench-bundled`       | Base workbench    | Vite/Astro compiled workbench     |                                         |
| `debug-bundled-all`             | All four          | Single Rollup pass                |                                         |
| `production-electron-bundled`   | Electron          | Optimized release                 |                                         |

## ➡️　Next Steps

- [Getting Started](https://Editor.Land/Doc/getting-started) — prerequisites, clone strategy, troubleshooting
- [Configuration](https://Editor.Land/Doc/configuration) — full environment variable reference
- [Architecture](https://Editor.Land/Doc/architecture) — how the components communicate
