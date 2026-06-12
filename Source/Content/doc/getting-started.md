---
title: "Getting Started"
section: "Guide"
order: 1
description:
    "Step-by-step build instructions for the Land code editor from source,
    covering prerequisites, environment setup, VS Code platform compilation,
    Land application assembly, and troubleshooting."
---

This guide walks through building the **Land** code editor from source. The
build is a **two-step linear flow** — do **not** pull submodules recursively;
each submodule is managed independently on its own branch.

1. **Compile VS Code Source** — build the VS Code platform code that the
   extension host consumes
2. **Build Land Application** — compile the native Rust backend and bundle the
   TypeScript frontend into a runnable Tauri application

---

## Prerequisites

Before building, ensure you have the following installed:

- **Rust** (1.95.0+, workspace MSRV) — [rustup.rs](https://rustup.rs/)
- **Node.js** (v24 required) — [nodejs.org](https://nodejs.org/)
- **pnpm** — `npm install -g pnpm`
- **Git** (with LFS support) — `git lfs install`
- **Protocol Buffer compiler** (optional, only if modifying `.proto` files)

Use `nvm` to install and select the required Node version:

```sh
nvm install 24
nvm use 24
```

> [!NOTE]
> Node 24 is required specifically to compile the VS Code Editor submodule
> (Step 1). The pinned version is tracked in
> `Dependency/Microsoft/Dependency/Editor/.nvmrc`.

### Shell Environment

The Editor submodule's npm install fetches large platform-specific binaries for
its test infrastructure. These binaries (Electron ~200 MB, Playwright Chromium
~300 MB) are only needed for running integration tests — **not** for
compilation. Without the flags below, `npm install` will stall indefinitely on
the download.

Add to your shell profile (`~/.zshrc`, `~/.bashrc`, or equivalent) and reload:

```sh
export ELECTRON_SKIP_BINARY_DOWNLOAD=1
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
```

---

## Step 1: Compile VS Code Source

The VS Code source is vendored as a Git submodule at
`Dependency/Microsoft/Dependency/Editor`. **This step is mandatory** — Land
cannot build without it. `Cocoon` (the extension host) and `Output` (the
platform bundle) both consume the compiled output produced here.

> [!IMPORTANT]
> You must be on **Node 24** for this step. The submodule's `.nvmrc` pins the
> exact version (`24.15.0`). Switch before running any commands below.

```sh
cd Dependency/Microsoft/Dependency/Editor

# Switch to the required Node version
nvm use 24

# Required by the VS Code build system
export NODE_ENV=development

# Reset to the expected upstream commit and clean all generated files
git fetch --all
git reset --hard Parent/main
git clean -dfx

# Install dependencies and compile
npm install
npm run compile
npm run compile-extensions-build
```

> [!NOTE]
> The Editor submodule uses **npm**, not pnpm. Do not substitute `pnpm install`
> here — the submodule's `package-lock.json` and `.npmrc` are npm-native.

> [!IMPORTANT]
> The `compile-extensions-build` step produces the `out-<platform>`
> directories that `Rest` bundles into `@codeeditorland/output`. Without it,
> `Cocoon` will fail to locate the VS Code platform code at runtime.

---

## Step 2: Build Land Application

Return to the repository root and invoke the build script with the desired
profile.

```sh
cd Land # back to repository root

# For a debug build with bundled electron
export Trace=all Record=1 Disable=false
./Maintain/Debug/Build.sh --profile debug-electron-bundled

# For a production build
export Trace= Record= Disable=
./Maintain/Debug/Build.sh --profile production-electron-bundled
```

### Build Profiles

The `Build.sh` script accepts several profiles that control feature flags and
optimization levels.

| Profile                       | Workbench         | Coverage                         | Notes                             |
| :---------------------------- | :---------------- | :------------------------------- | :-------------------------------- |
| `debug`                       | Browser           | 70–80%                           | Default debug                     |
| `debug-mountain`              | Mountain          | 80–90%                           | Recommended for daily development |
| `debug-electron`              | Electron          | 95%+                             | Full feature set                  |
| `debug-electron-rest`         | Electron + OXC    | 95%+                             | Fastest TypeScript compile        |
| `debug-electron-minimal`      | Electron          | No built-in extensions           | Atom J1                           |
| `debug-mountain-only`         | Mountain          | No `Cocoon` subprocess           | Atom N3                           |
| `debug-cocoon-headless`       | Mountain + Cocoon | `Wind` preload disabled          | Atom N3b                          |
| `debug-kernel`                | None              | Pure Mountain, no built-ins      | Atom N3c                          |
| `debug-electron-compiled`     | Electron          | Single-binary embedded resources | Debug symbols + `Compile=true`    |
| `debug-mountain-compiled`     | Mountain          | Single-binary embedded resources | Debug symbols + `Compile=true`    |
| `debug-electron-bundled`      | Electron          | Vite/Astro compiled workbench    | Full bundled Electron debug build |
| `debug-browser-bundled`       | Browser           | Vite/Astro compiled workbench    |                                   |
| `debug-sessions-bundled`      | Sessions          | Vite/Astro compiled workbench    |                                   |
| `debug-workbench-bundled`     | Base workbench    | Vite/Astro compiled workbench    |                                   |
| `debug-bundled-all`           | All four          | Single Rollup pass               |                                   |
| `production-electron-bundled` | Electron          | Optimized release                |                                   |

---

## Environment Variables

Land uses a tier-gated system of environment variables to control build and
runtime behavior. All variables are read from `.env.Land*` files in the
repository root. Copy `.env.Land.example` to `.env.Land` to customize your
local environment.

Common variables:

| Variable                  | Default    | Description                              |
| :------------------------ | :--------- | :--------------------------------------- |
| `ProductVersion`          | `1.118.0`  | Land version and feature tier gate       |
| `Bundle`                  | (unset)    | Set to `true` to trigger `Rest` bundling |
| `NetworkMountainPort`     | `50051`    | gRPC port for `Mountain` backend         |
| `NetworkCocoonPort`       | `50052`    | gRPC port for `Cocoon` extension host    |
| `TierFileSystem`          | `Layer2`   | Filesystem implementation tier           |
| `TierFileWatcher`         | `Layer4`   | File watching implementation tier        |
| `TierRemoteProcedureCall` | `gRPC`     | IPC transport mechanism                  |
| `TierIPC`                 | `Mountain` | IPC routing                              |

See [Environment Variables](./configuration.md) for the complete reference.

---

## Running the Application

```sh
# From the repository root (after a debug-electron build)
./Element/Mountain/Target/debug/Mountain

# The .app bundle (for Finder launch or codesign verification)
open Element/Mountain/Target/debug/bundle/macos/Mountain.app
```

Or use the `Build.sh` script's `--run` flag to launch immediately after
building:

```sh
./Maintain/Debug/Build.sh --profile debug-electron-bundled --run
```

> [!NOTE]
> All debug profiles write to `Target/debug/`. The profile name affects which
> env vars are set and which Sky assets are produced — not the target directory
> name.

---

## Build Artifacts

After a successful build, artifacts are placed in:

```
Land/
├── Element/
│   ├── Mountain/Target/...      # Native Tauri app bundle
│   ├── Air/Target/...           # Background daemon binary
│   ├── Output/Target/...        # Bundled JavaScript platform code
│   ├── Cocoon/Compiled/...      # Built extension host
│   └── Sky/Target/...           # UI static assets
└── Maintain/Debug/Build.sh      # Build orchestration script
```

---

## Troubleshooting

### `npm install` stalls or never completes

The Editor submodule includes packages that download large platform-specific
binaries during installation. Neither binary is needed for compilation.

**Fix:** add these to your shell profile and reload:

```sh
export ELECTRON_SKIP_BINARY_DOWNLOAD=1
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
```

### Playwright lockfile blocks install

If `npm install` fails with `Error: An active lockfile is found at
~/Library/Caches/ms-playwright/__dirlock`, a previous install was interrupted.
Remove the stale lockfile:

```sh
rm -rf ~/Library/Caches/ms-playwright/__dirlock
```

Then re-run `npm install`.

### Compilation errors in `Dependency/Editor`

If the VS Code compilation fails, ensure you have cleaned the directory
properly and are on Node 24:

```sh
cd Dependency/Microsoft/Dependency/Editor
nvm use 24
export NODE_ENV=development
git clean -dfx
rm -rf node_modules
npm install
npm run compile
```

### App crashes immediately on macOS (code signing)

Tauri's ad-hoc signature does not embed the entitlements from
`Element/Mountain/Entitlements.plist`. Without the correct entitlements,
`Cocoon`'s V8 JIT crashes, extension helpers fail to spawn, and file pickers
silently do nothing.

Re-sign the `.app` after any `tauri build`:

```sh
BundleLevel=debug sh Maintain/Script/SignBundle.sh
```

The script runs `xattr -cr` to strip quarantine bits, then re-signs with
`codesign --force --deep --sign -` using the entitlements file. `Build.sh`
calls this automatically at the end of every build.

---

## Rebuilding & Clean

To perform a clean rebuild:

```sh
# Clean Rust artifacts
cd Element/Mountain && cargo clean

# Clean TypeScript builds
cd Element/Sky && rm -rf .tina .astro Target

# Clean VS Code recompilation
cd Dependency/Microsoft/Dependency/Editor
git clean -dfx
rm -rf node_modules out

# Rebuild everything
cd Land
./Maintain/Debug/Build.sh --profile debug-electron-bundled
```

---

## Further Reading

- [Quickstart](./quickstart.md) — Concise build reference with minimal setup
- [Configuration](./configuration.md) — Complete environment variable reference
- [CI/CD Pipeline](./ci-cd-pipeline.md) — Pipeline stages and automation
- [Deep Dives](./deep-dive-sky.md) — Component architecture details
