---
title: "Dependency Management"
section: "Development"
order: 2
description:
    "How to manage JavaScript and Rust dependencies in the Land monorepo,
    including pnpm workspace protocol, Cargo patch redirects, and submodule
    updates."
---

Land is a monorepo with two parallel dependency graphs: a **pnpm workspace** for
all TypeScript elements and a **Cargo workspace** for all Rust elements. Each
element is also a Git submodule with its own repository, so dependency changes
require following the correct per-submodule workflow. The rules
and procedures for both dependency graphs are as follows.

## 📦 JavaScript Dependencies (pnpm)

### Workspace Protocol

All cross-element dependencies within the monorepo use the pnpm workspace
protocol:

```json
{
    "dependencies": {
        "@codeeditorland/common": "workspace:*"
    }
}
```

> [!IMPORTANT]
> Never use `npm` or `yarn` to install packages in any Land workspace
> package. The repository uses a pnpm content-addressed store. Running
> `npm install` in a workspace package creates a `node_modules` tree that
> conflicts with pnpm's layout and may overwrite workspace symlinks.

### Adding a New JavaScript Dependency

1. `cd` into the element's directory (e.g., `Element/Wind`).
2. Run `pnpm add <package-name>` for a runtime dependency, or
   `pnpm add -D <package-name>` for a dev dependency.
3. Verify the entry in `package.json` is correct, then run `pnpm install` from
   the repo root to update the lockfile.
4. Stage `package.json` and `pnpm-lock.yaml` by name — never `git add .`.

### VS Code Editor Submodule

The VS Code source in `Dependency/Microsoft/Dependency/Editor` uses **npm**, not
pnpm. Its `package-lock.json` and `.npmrc` are npm-native. When updating
dependencies in that submodule, use `npm install` inside that directory only.
See [Building Land](https://codeeditor.land/Doc/getting-started) for the full
Node 24 compile steps.

## 🦀 Rust Dependencies (Cargo)

### Adding a New Rust Dependency

1. Edit the `Cargo.toml` of the specific element (e.g.,
   `Element/Mountain/Cargo.toml`), not the workspace root.
2. Add the dependency under `[dependencies]` with an explicit version.
3. If the crate requires a fork or a pinned unreleased commit, add a
   `[patch.crates-io]` entry in the workspace root `Cargo.toml`.
4. Run `cargo build -p <element-name>` to verify it compiles. Do not run a full
   workspace build unless needed — the Maintain crate does not require
   rebuilding when only source files change.

### The 51 Active `[patch.crates-io]` Redirects

The workspace `Cargo.toml` contains 51 active `[patch.crates-io]` entries.
These exist for one of three reasons:

| Reason                                           | Example              |
| ------------------------------------------------ | -------------------- |
| Pinned fork for Tauri 2.x compatibility          | `wry`, `tao`         |
| Unreleased upstream fix not yet on crates.io      | gRPC transport fixes |
| Land-specific patch applied to upstream source    | Asset scheme handler |

> [!WARNING]
> Do not remove `[patch.crates-io]` entries without verifying that the
> upstream crate now contains the required change. Removing a patch that is
> still needed causes either a compile error or a silent runtime regression.

When a new patch is needed, add it to the workspace root `Cargo.toml` under
`[patch.crates-io]` with a `git` and `branch` or `rev` specifier:

```toml
[patch.crates-io]
some-crate = { git = "https://github.com/CodeEditorLand/some-crate", branch = "Current" }
```

## 🔄 Submodule Update Workflow

Each element under `Land/Element/` is a separate Git submodule with its own
repository and branch. **Never** use `git submodule update --recursive`.

### Updating a Single Element Submodule

```sh
cd Element/Mountain
git fetch --all
git reset --hard origin/Current
```

Then return to the repo root and stage the updated gitlink by name:

```sh
git add Element/Mountain
```

> [!WARNING]
> Never run `git add .` at the repo root. This converts submodule
> gitlinks into directory trees, corrupting the index. Always stage submodule
> updates using the explicit path.

### Updating the VS Code Dependency Submodule

The VS Code source submodule at `Dependency/Microsoft/Dependency/Editor`
requires Node 24 for the compile step. Full update sequence:

```sh
cd Dependency/Microsoft/Dependency/Editor
nvm use 24
git fetch --all
git reset --hard Parent/main
git clean -dfx
export NODE_ENV=development
npm install
npm run compile
npm run compile-extensions-build
```

After the compile succeeds, return to the repo root and stage the gitlink:

```sh
git add Dependency/Microsoft/Dependency/Editor
```

The `compile-extensions-build` step produces the `out-<platform>` directories
consumed by the Output element. Skip it and Cocoon will fail to locate platform
code at runtime.

## 📦 Git LFS

SideCar stores vendored Node.js binaries in Git LFS. Before cloning or running
the SideCar download tool for the first time, ensure Git LFS is initialized on
the machine:

```sh
git lfs install
```

Without Git LFS, the binary files in `Element/SideCar/` are checked out as LFS
pointer stubs rather than real binaries, and Mountain's `build.rs` will fail to
stage the correct Node.js binary for bundling.

## 💾 pnpm Content-Addressed Store

pnpm uses a content-addressed store shared across all projects on the machine
(default: `~/.pnpm-store`). This means installing a package version that is
already used by another project on the machine is near-instant and requires no
additional disk space. The store is managed automatically; do not modify its
contents directly.

When the store becomes corrupted (rare), run `pnpm store prune` to remove
orphaned packages, then `pnpm install` from the repo root to relink.
