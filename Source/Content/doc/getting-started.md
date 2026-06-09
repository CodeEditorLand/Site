---
title: "Getting Started"
section: "Start"
order: 1
description:
    "How to build and run editor.land from source on macOS or Windows."
---

# Getting Started

> **Updated 2026-05-29** - Build process updated to Node 24 and the
> `Maintain/Debug/Build.sh` profile system. Canonical source:
> [Documentation/GitHub/Building.md](https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/Building.md)

`editor.land` is in active development and is currently source-only.
There are no pre-built installers or package manager releases yet. The supported
way to run the editor today is to build from source on **macOS or Windows**.

---

## What Works Today

On Apple Silicon or Intel macOS (13.0 Ventura or later) and on Windows 10/11, a
successful build produces a working editor that:

- Opens a native window with the `workbench` UI (`WKWebView` on macOS,
  `WebView2` on Windows).
- Loads `VS Code` extensions from disk and activates them through `Cocoon`, the
  `Node.js` extension host.
- Provides file system, terminal, and debug adapter access through `Mountain`,
  the `Rust` kernel.
- Runs the full `gRPC`-based `IPC` stack between `Mountain` and `Cocoon` via
  `Vine`.

The following are **in progress**: a Homebrew tap, a winget package, an apt
repository, and an automated update mechanism.

---

## Build Requirements

All of the following must be installed before building:

- **`Rust`** nightly (install via [rustup](https://rustup.rs), then
  `rustup default nightly`)
- **`Node.js`** 24 - required to compile the VS Code Editor submodule (version
  pinned in `Dependency/Microsoft/Dependency/Editor/.nvmrc`)
- **`nvm`** - recommended for switching Node versions
  ([nvm-sh/nvm](https://github.com/nvm-sh/nvm))
- **`pnpm`** 9 or later (`npm install -g pnpm`)
- **macOS:** Xcode Command Line Tools (`xcode-select --install`), macOS 13.0
  (Ventura) or later
- **Windows:** `WebView2` Runtime (included with Windows 11; available
  separately for Windows 10), Visual Studio Build Tools with the C++ workload

---

## Building from Source

The build is a **two-step linear flow.** Do not pull submodules recursively -
each submodule is managed independently on its own branch.

### Step 1 - Compile the VS Code Editor submodule _(mandatory)_

`Cocoon` (the extension host) and `Output` (the platform bundle) both depend on
the compiled output of the VS Code Editor submodule. This step must complete
before Step 2 will succeed.

```bash
cd Dependency/Microsoft/Dependency/Editor

# Node 24 is required here - reads .nvmrc automatically
nvm use 24

git fetch --all
git reset --hard Parent/main
git clean -dfx

pnpm install
pnpm run compile
pnpm run compile-extensions-build
```

### Step 2 - Build the Land application

```bash
cd Land # back to repository root
./Maintain/Debug/Build.sh --profile debug-electron-bundled
```

The first build takes several minutes because it compiles `Mountain`'s `Rust`
dependencies from scratch. Subsequent builds are significantly faster due to
`Cargo`'s incremental compilation.

For a quick iteration build without the full bundling pass:

```bash
./Maintain/Debug/Build.sh --profile debug-mountain
```

See
[BuildPipeline.md](https://github.com/CodeEditorLand/Land/tree/Current/Documentation/GitHub/BuildPipeline.md)
for the full profile matrix.

---

## Extension Loading

`Cocoon` discovers extensions from the filesystem at startup. The exact
extension discovery path in the current build has not been independently
confirmed to match `VS Code`'s `~/.vscode/extensions` directory exactly. If an
extension you expect to appear does not load, check the `Cocoon` output channel
in the editor's `Output` panel for activation errors.

---

## Known Limitations

- **Linux not yet supported.** Linux (`WebKitGTK`) is planned and in progress.
- **No marketplace integration.** Extensions must be installed manually as
  `.vsix` files or sourced from disk. Marketplace `API` access is not yet
  implemented.
- **`API` gaps.** `vscode.lm.*`, `vscode.chat.*`, `vscode.notebook.*`, and
  `vscode.tests.*` are not implemented. Extensions using these `APIs` activate
  but the specific features silently no-op.

---

## See Also

- [Installation](https://editor.land/Doc/installation)
- [Architecture Overview](https://editor.land/Doc/architecture)
- [`Cocoon`: Extension Host](https://editor.land/Doc/cocoon)
- [`Mountain`: Native Kernel](https://editor.land/Doc/mountain)
