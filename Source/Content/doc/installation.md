---
title: "Installation"
section: "Start"
order: 3
description:
    "System requirements, submodule clone instructions, build profiles, artifact
    paths, macOS code signing, and environment setup for building Land from
    source."
---

Land is source-build only. There are no public signed installer packages.
Building from source is the single supported path today. The build is a
**two-step linear flow**: compile the VS Code Editor submodule, then build the
Land application with the chosen profile.

---

## 💻　System Requirements

| Requirement      | Minimum       | Notes                                                                                            |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------ |
| Operating system | macOS 12+     | Primary platform. Windows and Linux in progress.                                                 |
| Rust             | 1.95.0 (MSRV) | Install via [rustup.rs](https://rustup.rs/). Edition 2024.                                       |
| Node.js          | 24            | Required for VS Code source step. Use `nvm`.                                                     |
| pnpm             | Latest stable | `npm install -g pnpm`. Used for workspace installs.                                              |
| Git              | Any recent    | Git LFS required: `git lfs install`.                                                             |
| Disk space       | ~10 GB        | VS Code source (~2 GB), Rust build cache (~4 GB), Node modules (~2 GB), build artifacts (~1 GB). |
| RAM              | 8 GB minimum  | 16 GB recommended for parallel Rust compilation.                                                 |

The workspace Rust toolchain is pinned in `Land/rust-toolchain.toml` and must
not be upgraded without auditing 51 `[patch.crates-io]` redirects in
`Cargo.toml` that are version-sensitive.

---

## 📦　Prerequisites Installation

```sh
# Install the Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Node.js 24 via nvm
nvm install 24 && nvm use 24

# Install pnpm globally
npm install -g pnpm

# Skip large test binaries (not needed for compilation)
echo 'export ELECTRON_SKIP_BINARY_DOWNLOAD=1' >> ~/.zshrc
echo 'export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1' >> ~/.zshrc
source ~/.zshrc
```

> [!NOTE] Node.js 24 is required specifically for the VS Code Editor submodule
> compilation. Earlier versions produce build failures in `npm install`.

---

## 📥　Repository Clone

> [!WARNING] Never run `git clone --recurse-submodules`. Submodules are on
> independent branches. Recursive cloning pulls the wrong commits.

Each element is a separate Git repository cloned into `Element/<Name>/` inside
the Land repository root. Clone the main repo first, then each element
individually on the `Current` branch.

```sh
git clone https://github.com/CodeEditorLand/Land.git
cd Land
```

### Element Repository Table

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
| Air      | github.com/CodeEditorLand/Air      | `Element/Air`                                    |
| SideCar  | github.com/CodeEditorLand/SideCar  | `Element/SideCar`                                |
| Grove    | github.com/CodeEditorLand/Grove    | `Element/Grove`                                  |
| Editor   | github.com/CodeEditorLand/Editor   | `Element/Dependency/Microsoft/Dependency/Editor` |

After cloning each element, check out its `Current` branch:

```sh
git -C Element/Mountain checkout Current
```

Repeat for every element. The repository is usable only when every element is on
the `Current` branch at a compatible commit.

---

## 🔨　Step 1 - Compile VS Code Source

```sh
cd Land
cd Element/Dependency/Microsoft/Dependency/Editor
nvm use 24
export NODE_ENV=development
git fetch --all
git reset --hard Parent/main
git clean -dfx
npm install
npm run compile
npm run compile-extensions-build
```

> The Editor submodule uses **npm**, not pnpm. The Land workspace uses pnpm, but
> the VS Code platform build requires npm for its lockfile and lifecycle hooks.

The compilation takes approximately 5-8 minutes on a modern machine. The output
is consumed by the `@codeeditorland/output` package.

---

## 🔧　Step 2 - Build Land Application

```sh
cd Land
./Maintain/Debug/Build.sh --profile debug-mountain
```

### Common Build Profiles

| Profile                         | Workbench      | Feature coverage                 | Output type                             |
| ------------------------------- | -------------- | -------------------------------- | --------------------------------------- |
| `debug`                         | Browser        | 70-80%                           | Dev binary                              |
| `debug-mountain`                | Mountain       | 80-90%                           | Dev binary                              |
| `debug-electron`                | Electron       | 95%+                             | Dev binary                              |
| `debug-electron-bundled`        | Electron       | 95%+                             | Dev binary with Vite/Astro pre-compiled |
| `debug-electron-unbundled`      | Electron       | 95%+                             | Dev binary, dynamic-import path         |
| `debug-mountain-only`           | Mountain       | No Cocoon subprocess             | Dev binary                              |
| `debug-cocoon-headless`         | None           | Mountain + Cocoon, Wind disabled | Dev binary                              |
| `debug-kernel`                  | None           | Pure Mountain, no built-ins      | Dev binary                              |
| `debug-electron-rest`           | Electron + OXC | 95%+ with faster TS compiler     | Dev binary                              |
| `production-electron-bundled`   | Electron       | Optimized release                | Prod binary                             |
| `production-electron-unbundled` | Electron       | Release without bundled assets   | Prod binary                             |

The profile flag controls which workbench variant is compiled, which tier flags
are active, and whether assets are pre-bundled. The `debug-mountain` profile is
the fastest viable build for daily development; `debug-electron` provides the
full feature set.

---

## ▶️　Running After Build

```sh
# Launch the binary directly
./Element/Mountain/Target/debug/Mountain

# Or build and run in one command
./Maintain/Debug/Build.sh --profile debug-electron-bundled --run
```

---

## 📁　Artifact Paths

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
        Bundled/          # Pre-compiled workbench HTML and JS
        Application/      # Extension assets
    Wind/Target/
      Function/Install/   # Compiled Wind service layer
```

> [!IMPORTANT] Never edit files under any `Target/` directory. These are build
> outputs. Source lives in `Public/` or `Source/` within each element. Edits to
> `Target/` are overwritten on the next build.

---

## 🖊️　macOS Code Signing

The debug build is automatically re-signed after the Tauri build step. The
signing script at `Maintain/Script/SignBundle.sh` is invoked automatically by
`Maintain/Debug/Build.sh`. Ad-hoc signing is used for debug builds (no
Developer ID required).

To manually re-sign after modifying the bundle:

```sh
BundleLevel=debug sh Maintain/Script/SignBundle.sh
```

Tauri's `tauri.conf.json` and the `Entitlements.plist` file are the single
sources of truth for what the FIDDEE binary is permitted to do on macOS --
hardened runtime, keychain access, and network client capability -- without a
separate Xcode project.

---

## ⚠️　Quick Troubleshooting

| Symptom                      | Fix                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------ |
| `npm install` stalls         | Set `ELECTRON_SKIP_BINARY_DOWNLOAD=1` and `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` |
| Playwright lockfile error    | `rm -rf ~/Library/Caches/ms-playwright/__dirlock`                              |
| App crashes on macOS         | `BundleLevel=debug sh Maintain/Script/SignBundle.sh`                           |
| Compilation errors in Editor | `git clean -dfx && rm -rf node_modules && npm install && npm run compile`      |
| Rust toolchain mismatch      | Check `Land/rust-toolchain.toml` and `rustc --version`                         |
| `git submodule` issues       | Never use `--recursive`. Clone each element individually on `Current`.         |

---

## 🔗　Related Documentation

- [Quickstart](https://Editor.Land/Doc/quickstart) - concise build reference
- [Getting Started](https://Editor.Land/Doc/getting-started) - full
  step-by-step guide with detailed troubleshooting
- [Configuration](https://Editor.Land/Doc/configuration) - environment variable
  system, tier flags, and per-subsystem overrides
- [Project Structure](https://Editor.Land/Doc/project-structure) - element
  layout and naming conventions

## Funding 💎

Land's development is funded by the **NLnet NGI0 Commons Fund**, a European
initiative supporting open-source infrastructure. The project is maintained by
**PlayForm** (Sofia, Bulgaria) as a non-profit effort. All code is dedicated to
the public domain under CC0 - no CLA required, no copyright assignment, no
restrictions on use.
