---
title: Getting Started
section: Start
order: 2
description: Prerequisites, clone strategy, first build, and first run for Land.
---

Building Land from source requires a Rust toolchain, Node 24, pnpm, and Git with
LFS. macOS is the primary supported platform today; Windows and Linux builds are
in progress. This page walks through every prerequisite, the correct submodule
clone strategy, and the full build sequence.

## Prerequisites

| Tool    | Required Version | Notes                                                       |
| ------- | ---------------- | ----------------------------------------------------------- |
| Rust    | 1.95.0+ (MSRV)   | Install via [rustup.rs](https://rustup.rs/)                 |
| Node.js | 24               | Required for Step 1 (VS Code source). Use `nvm install 24`. |
| pnpm    | Latest           | `npm install -g pnpm`                                       |
| Git     | Any recent       | Must have LFS support: `git lfs install`                    |
| protoc  | Optional         | Only needed if modifying `.proto` files                     |

> [!IMPORTANT] Node 24 is required specifically for the VS Code Editor submodule
> compilation step. The exact pinned minor version is in
> `Dependency/Microsoft/Dependency/Editor/.nvmrc`. Use `nvm use 24` (reads
> `.nvmrc` automatically) before running any Step 1 commands.

### Shell Environment Setup

Add these to your shell profile (`~/.zshrc`, `~/.bashrc`, or equivalent) before
running `npm install` inside the Editor submodule. Without them, the install
will stall indefinitely downloading large test-only binaries.

```sh
# Electron (~200 MB) and Playwright (~300 MB) are only needed for e2e tests
export ELECTRON_SKIP_BINARY_DOWNLOAD=1
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
```

Reload your shell after adding them:

```sh
source ~/.zshrc
```

## Clone Strategy

> [!WARNING] Never use `git clone --recurse-submodules`. Each submodule element
> lives on its own independent branch. Recursive cloning pulls wrong commits and
> corrupts the gitlink state. Clone each submodule individually.

Clone the main Land repository:

```sh
git clone https://github.com/CodeEditorLand/Land.git
cd Land
git lfs pull
```

Then clone each required element submodule into its `Element/` path. The minimum
set for a working build:

```sh
# Core Rust elements
git clone https://github.com/CodeEditorLand/Common.git Element/Common
git clone https://github.com/CodeEditorLand/Mountain.git Element/Mountain
git clone https://github.com/CodeEditorLand/Vine.git Element/Vine

# TypeScript elements
git clone https://github.com/CodeEditorLand/Cocoon.git Element/Cocoon
git clone https://github.com/CodeEditorLand/Wind.git Element/Wind
git clone https://github.com/CodeEditorLand/Sky.git Element/Sky
git clone https://github.com/CodeEditorLand/Output.git Element/Output
git clone https://github.com/CodeEditorLand/Rest.git Element/Rest

# VS Code source dependency
git clone https://github.com/CodeEditorLand/Dependency.git Element/Dependency
# The Editor submodule is nested inside Dependency:
cd Element/Dependency
git clone https://github.com/CodeEditorLand/Editor.git Microsoft/Dependency/Editor
cd ../..
```

Each of these repos tracks a `Current` branch. Check out `Current` in each after
cloning.

## First Build

### Step 1: Compile VS Code Source

```sh
cd Element/Dependency/Microsoft/Dependency/Editor

nvm use 24
export NODE_ENV=development

git fetch --all
git reset --hard Parent/main
git clean -dfx

npm install
npm run compile
npm run compile-extensions-build

cd ../../../../..
```

This produces the compiled platform JavaScript that Cocoon and Output consume.
It only needs to be re-run when the Editor submodule commit changes.

### Step 2: Build Land

From the repository root:

```sh
export Trace=all Record=1 Disable=false
./Maintain/Debug/Build.sh --profile debug-electron-bundled
```

The full build takes several minutes on first run. Subsequent incremental builds
are faster.

### Build Profiles

| Profile                       | Workbench | Coverage | Notes                                |
| ----------------------------- | --------- | -------- | ------------------------------------ |
| `debug-electron-bundled`      | Electron  | 95%+     | Recommended for daily development    |
| `debug-electron`              | Electron  | 95%+     | Full feature set                     |
| `debug-mountain`              | Mountain  | 80-90%   | Recommended for Mountain development |
| `debug`                       | Browser   | 70-80%   | Default debug                        |
| `production-electron-bundled` | Electron  | -        | Optimized release build              |

## First Run

```sh
./Maintain/Debug/Build.sh --profile debug-electron-bundled --run
```

Or launch the binary directly:

```sh
./Element/Mountain/Target/debug/Mountain
```

## Troubleshooting

> [!WARNING] If `npm install` in the Editor submodule never completes, the
> `ELECTRON_SKIP_BINARY_DOWNLOAD` and `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD` exports
> are likely missing from your shell environment. Add them as described above
> and re-run.

**Stale Playwright lockfile**

If `npm install` fails with
`An active lockfile is found at: ~/Library/Caches/ms-playwright/__dirlock`, a
previous install was interrupted. Remove the stale lock:

```sh
rm -rf ~/Library/Caches/ms-playwright/__dirlock
```

**`npm warn Unknown project config` messages**

These warnings (`target`, `disturl`, `runtime`, `build_from_source`) come from
upstream VS Code's `.npmrc` using keys that npm 11+ flags as non-standard. They
are harmless - the keys are still consumed correctly by native module compilers.

**Port conflicts**

If Mountain or Cocoon fail to bind their gRPC ports, a previous process is still
running on `50051` or `50052`. Kill the orphaned processes or change the ports
in `.env.Land`.

**Missing `.env.Land`**

Copy the sample file to create a local environment file:

```sh
cp .env.Land.Sample .env.Land
```

## Next Steps

- [Installation](/Doc/installation) - system requirements table and bundle paths
- [Configuration](/Doc/configuration) - full environment variable reference
- [Project Structure](/Doc/project-structure) - what lives where in the monorepo
