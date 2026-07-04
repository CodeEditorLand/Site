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
build is a **two-step linear flow** - do **not** pull submodules recursively;
each submodule is managed independently on its own branch.

1. **Compile VS Code Source** - build the VS Code platform code that the
   extension host consumes
2. **Build Land Application** - compile the native Rust backend and bundle the
   TypeScript frontend into a runnable Tauri application

---

## Prerequisites

Before building, ensure you have the following installed:

- **Rust** (1.95.0+, workspace MSRV for all Rust elements) -
  [rustup.rs](https://rustup.rs/)
- **Node.js** (v24 required for building the Editor submodule) -
  [nodejs.org](https://nodejs.org/)
- **pnpm** - `npm install -g pnpm`
- **Git** (with LFS support) - `git lfs install`
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

### Rust Toolchain & Targets

Install the Rust toolchain via `rustup` and add the necessary compilation
targets. The macOS build targets are required for Mountain (Tauri backend)
and Air (background daemon):

```sh
# Install Rust (stable)
rustup install stable
rustup default stable

# macOS native targets (Apple Silicon)
rustup target add aarch64-apple-darwin

# macOS native targets (Intel)
rustup target add x86_64-apple-darwin

# Linux targets (cross-compilation support)
rustup target add x86_64-unknown-linux-gnu
rustup target add aarch64-unknown-linux-gnu
```

> [!TIP]
> If you are on Apple Silicon (M1/M2/M3/M4), `aarch64-apple-darwin` is the
> only target needed. The `x86_64-apple-darwin` target is only required if
> you are building on Intel hardware or producing a universal binary via
> `lipo`.

### Shell Environment

The Editor submodule's npm install fetches large platform-specific binaries for
its test infrastructure. These binaries (Electron ~200 MB, Playwright Chromium
~300 MB) are only needed for running integration tests - **not** for
compilation. Without the flags below, `npm install` will stall indefinitely on
the download.

Add to your shell profile (`~/.zshrc`, `~/.bashrc`, or equivalent) and reload:

```sh
# Skip large binary downloads - only needed for e2e tests, not compilation
export ELECTRON_SKIP_BINARY_DOWNLOAD=1
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
```

```sh
source ~/.zshrc  # or restart your terminal
```

---

## Build Overview

The Land build is a **two-step linear flow**. Do NOT pull submodules
recursively - each submodule is managed independently on its own branch.

1. **Compile VS Code Source** - Build the VS Code platform code that `Cocoon`
   consumes. This runs in `Dependency/Microsoft/Dependency/Editor`.
2. **Build Land Application** - Compile the native Rust backend (`Mountain`)
   and bundle the TypeScript frontend (`Wind` + `Sky`) into a runnable Tauri
   application.

The submodules are compiled in this order because each subsequent layer depends
on artifacts produced by the previous one:

- `Editor` → produces compiled VS Code platform code consumed by `Cocoon` and
  `Output`
- `Output` (via `Rest`) → bundles the platform code as
  `@codeeditorland/output` for the extension host
- `Mountain` + `Air` → native Rust binaries compiled via `cargo`
- `Wind` + `Sky` → TypeScript frontend assets compiled and bundled into the
  Tauri app

---

## Step 1: Compile VS Code Source

The VS Code source is vendored as a Git submodule at
`Dependency/Microsoft/Dependency/Editor`. **This step is mandatory** - Land
cannot build without it. `Cocoon` (the extension host) and `Output` (the
platform bundle) both consume the compiled output produced here.

> [!IMPORTANT]
> You must be on **Node 24** for this step. The submodule's `.nvmrc` pins the
> exact version (`24.15.0`). Switch before running any commands below.

```sh
cd Dependency/Microsoft/Dependency/Editor

# Switch to the required Node version (reads .nvmrc automatically)
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
> here - the submodule's `package-lock.json` and `.npmrc` are npm-native.

> [!IMPORTANT]
> The `compile-extensions-build` step produces the `out-<platform>`
> directories that `Rest` bundles into `@codeeditorland/output`. Without it,
> `Cocoon` will fail to locate the VS Code platform code at runtime.

---

## Step 2: Build Land Application

Return to the repository root and invoke the build script with the desired
profile.

```sh
cd Land  # back to repository root

# For a debug build with bundled electron
export Trace=all Record=1 Disable=false
./Maintain/Debug/Build.sh --profile debug-electron-bundled

# For a production build
export Trace= Record= Disable=
./Maintain/Debug/Build.sh --profile production-electron-bundled
```

### Build Profiles

The `Build.sh` script accepts several profiles that control feature flags and
optimization levels. See
[`BuildMatrix.md`](Documentation/GitHub/BuildMatrix.md) for the full matrix
of environment variables and tier configurations.

| Profile                       | Workbench         | Coverage                                              | Notes                             |
| :---------------------------- | :---------------- | :---------------------------------------------------- | :-------------------------------- |
| `debug`                       | Browser           | 70–80%                                                | Default debug                     |
| `debug-mountain`              | Mountain          | 80–90%                                                | Recommended for daily development |
| `debug-electron`              | Electron          | 95%+                                                  | Full feature set                  |
| `debug-electron-rest`         | Electron + OXC    | 95%+                                                  | Fastest TypeScript compile        |
| `debug-electron-minimal`      | Electron          | No built-in extensions                                | Atom J1                           |
| `debug-mountain-only`         | Mountain          | No `Cocoon` subprocess                                | Atom N3                           |
| `debug-cocoon-headless`       | Mountain + Cocoon | `Wind` preload disabled                               | Atom N3b                          |
| `debug-kernel`                | None              | Pure `Mountain`, no built-ins, no `Cocoon`, no `Wind` | Atom N3c                          |
| `debug-electron-compiled`     | Electron          | Single-binary embedded resources                      | Debug symbols + `Compile=true`    |
| `debug-mountain-compiled`     | Mountain          | Single-binary embedded resources                      | Debug symbols + `Compile=true`    |
| `debug-electron-bundled`      | Electron          | Vite/Astro compiled workbench                         | Full bundled Electron debug build |
| `debug-browser-bundled`       | Browser           | Vite/Astro compiled workbench                         |                                   |
| `debug-sessions-bundled`      | Sessions          | Vite/Astro compiled workbench                         |                                   |
| `debug-workbench-bundled`     | Base workbench    | Vite/Astro compiled workbench                         |                                   |
| `debug-bundled-all`           | All four          | Single Rollup pass                                    |                                   |
| `production-electron-bundled` | Electron          | Optimized release                                     |                                   |

---

## Environment Variables

Land uses a tier-gated system of environment variables to control build and
runtime behavior. All variables are read from `.env.Land*` files in the
repository root. Copy `.env.Land.example` to `.env.Land` to customize your
local environment.

For a complete reference, see [Configuration](./configuration.md).

Common variables:

| Variable                  | Default    | Description                                       |
| :------------------------ | :--------- | :------------------------------------------------ |
| `ProductVersion`          | `1.118.0`  | Land version and feature tier gate                |
| `Bundle`                  | (unset)    | Set to `true` to trigger `Rest` bundling          |
| `NetworkMountainPort`     | `50051`    | gRPC port for `Mountain` backend                  |
| `NetworkCocoonPort`       | `50052`    | gRPC port for `Cocoon` extension host             |
| `TierFileSystem`          | `Layer2`   | Filesystem implementation tier                    |
| `TierFileWatcher`         | `Layer4`   | File watching implementation tier                 |
| `TierRemoteProcedureCall` | `gRPC`     | IPC transport mechanism                           |
| `TierIPC`                 | `Mountain` | IPC routing: `Mountain` / `NodeDeferred` / `Node` |

---

## Running the Application

```sh
# From the repository root (after a debug-electron build)
cd Land
./Element/Mountain/Target/debug/Mountain

# After a debug-electron-bundled build
./Element/Mountain/Target/debug/Mountain

# The .app bundle (for Finder launch or codesign verification)
open Element/Mountain/Target/debug/bundle/macos/Mountain.app
```

Or use the `Build.sh` script's `--run` flag to launch immediately after
building:

```sh
./Maintain/Debug/Build.sh --profile debug-electron-bundled --run
```

For verbose runtime logging, prefix the binary invocation with debug flags:

```sh
# Enable full trace logging at startup
Trace=all Record=1 Disable=false ./Element/Mountain/Target/debug/Mountain

# Launch with Electron developer tools visible (electron-based profiles only)
./Element/Mountain/Target/debug/Mountain --debug
```

> [!NOTE]
> All debug profiles write to `Target/debug/`. The profile name affects which
> env vars are set and which Sky assets are produced - not the target directory
> name.

---

## Build Artifacts

After a successful build, artifacts are placed in:

```
Land/
├── Element/
│   ├── Mountain/Target/...        # Native Tauri app bundle
│   ├── Air/Target/...             # Background daemon binary
│   ├── Output/Target/...          # Bundled JavaScript platform code
│   ├── Cocoon/Compiled/...        # Built extension host
│   └── Sky/Target/...             # UI static assets
└── Maintain/Debug/Build.sh        # Build orchestration script
```

---

## Element-Specific Build Instructions

Each Element may have additional build details. Refer to the specific README for
element-specific workflows:

| Element   | Build Instructions                                                   |
| :-------- | :------------------------------------------------------------------- |
| `Air`     | `Element/Air/README.md` - Background daemon build & daemon lifecycle |
| `Grove`   | `Element/Grove/README.md` - Native Rust/WASM extension host build    |
| `Mist`    | `Element/Mist/README.md` - DNS server build & testing                |
| `Rest`    | `Element/Rest/README.md` - CLI compiler usage                        |
| `SideCar` | `Element/SideCar/README.md` - Download tool for runtime binaries     |
| `Sky`     | `Element/Sky/README.md` - Astro UI development                       |
| `Wind`    | `Element/Wind/README.md` - Effect-TS service layer                   |
| `Cocoon`  | `Element/Cocoon/README.md` - Extension host details                  |

---

## Troubleshooting

### `npm install` stalls or never completes

The Editor submodule includes packages that download large platform-specific
binaries during installation:

- **`electron`** (~200 MB) - a devDependency of the Copilot extension, only
  needed for running Electron integration tests
- **`@playwright/browser-chromium`** (~300 MB) - only needed for running
  browser-based e2e tests

Neither binary is needed for compilation. Without the skip flags, `npm install`
will stall indefinitely downloading them on every fresh install.

**Fix:** add these to your shell profile and reload:

```sh
export ELECTRON_SKIP_BINARY_DOWNLOAD=1
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
```

### Playwright lockfile blocks install

If `npm install` fails with:

```
Error: An active lockfile is found at: ~/Library/Caches/ms-playwright/__dirlock
```

A previous install was interrupted and left a stale lockfile. Remove it:

```sh
rm -rf ~/Library/Caches/ms-playwright/__dirlock
```

Then re-run `npm install`.

### `npm warn Unknown project config` messages

`npm install` prints several harmless warnings:

```
npm warn Unknown project config "target"
npm warn Unknown project config "disturl"
npm warn Unknown project config "runtime"
npm warn Unknown project config "build_from_source"
```

These come from upstream VS Code's `.npmrc`, which uses keys that npm 11+
considers non-standard. The keys are still read correctly by the build tooling
(`node-gyp`, native module compilers) that actually uses them. No action needed.

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

### `Rest` binary not found

The build script expects the `rest` CLI compiler to be on `PATH` or pointed to
by `REST_BINARY_PATH`. If you see errors about a missing `Rest` binary:

```sh
export REST_BINARY_PATH=/path/to/rest
```

### Missing environment variables

The build reads `.env.Land` from the repository root. If variables appear
missing, verify the file exists and is formatted correctly. See
[Configuration](./configuration.md) for syntax.

```sh
# Verify the file exists
ls -la .env.Land

# Check for common issues
cat .env.Land | grep -E '^(ProductVersion|Bundle|Network)'
```

### Port conflicts

If `NetworkMountainPort` (default `50051`) or `NetworkCocoonPort` (default
`50052`) are already in use from a previous run, kill the orphaned process or
change the port numbers in `.env.Land`:

```sh
# Find orphaned Land processes
lsof -i :50051
lsof -i :50052

# Kill by PID
kill -9 <PID>

# Alternatively, pick a different port in .env.Land
echo "NetworkMountainPort=50061" >> .env.Land
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
cd Element/Mountain
cargo clean

# Clean TypeScript builds
cd Element/Sky
rm -rf .tina .astro Target

# Clean VS Code recompilation
cd Dependency/Microsoft/Dependency/Editor
git clean -dfx
rm -rf node_modules out

# Rebuild everything
cd Land
./Maintain/Debug/Build.sh --profile debug-electron-bundled
```

---

## CI/CD & Automation

The build script is used by CI pipelines. See `Maintain/.GitHub/Workflows/` for
pre-configured GitHub Actions definitions. All CI builds set environment
variables via `.env.Land.CI` and use `--profile production-electron-bundled`.

---

## Further Reading

- [Quickstart](./quickstart.md) - Concise build reference with minimal setup
- [Configuration](./configuration.md) - Complete environment variable reference
- [CI/CD Pipeline](./ci-cd-pipeline.md) - Pipeline stages and automation
- [Deep Dives](./deep-dive-sky.md) - Component architecture details
- [`Documentation/GitHub/BuildMatrix.md`](Documentation/GitHub/BuildMatrix.md) -
  Full build variant matrix
- [`Documentation/GitHub/Workflow/`](Documentation/GitHub/Workflow/) - Detailed
  component interaction workflows
