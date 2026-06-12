---
title: "Quickstart"
section: "Guide"
order: 2
description:
    "Concise build reference for Land from source — prerequisites, two-step
    build flow, common profiles, and development environment setup."
---

A minimal build reference for developers who already know their way around the
repository and just need the commands.

---

## Prerequisites

```sh
# Install tools
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
nvm install 24 && nvm use 24
npm install -g pnpm

# Skip large test binaries (not needed for compilation)
echo 'export ELECTRON_SKIP_BINARY_DOWNLOAD=1' >> ~/.zshrc
echo 'export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1' >> ~/.zshrc
source ~/.zshrc
```

---

## Step 1: Compile VS Code Source

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
cd Land
```

> The Editor submodule uses **npm**, not pnpm.

---

## Step 2: Build Land Application

```sh
cd Land
./Maintain/Debug/Build.sh --profile debug-mountain  # fast, 80–90% coverage
./Maintain/Debug/Build.sh --profile debug-electron   # full feature set
```

### Common Profiles

| Profile                       | When to use                              |
| :---------------------------- | :--------------------------------------- |
| `debug-mountain`              | Daily development (fastest viable build) |
| `debug-electron`              | Full feature set, Electron workbench     |
| `debug-electron-bundled`      | Bundled Vite/Astro workbench debug build |
| `production-electron-bundled` | Release build                            |
| `debug-kernel`                | Pure Mountain, no Cocoon, no UI          |

---

## Run After Build

```sh
# Launch the binary directly
./Element/Mountain/Target/debug/Mountain

# Or build and run in one command
./Maintain/Debug/Build.sh --profile debug-electron-bundled --run
```

---

## Quick Troubleshooting

| Symptom                      | Fix                                                                            |
| :--------------------------- | :----------------------------------------------------------------------------- |
| `npm install` stalls         | Set `ELECTRON_SKIP_BINARY_DOWNLOAD=1` and `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` |
| Playwright lockfile error    | `rm -rf ~/Library/Caches/ms-playwright/__dirlock`                              |
| App crashes on macOS         | Run `BundleLevel=debug sh Maintain/Script/SignBundle.sh`                       |
| Compilation errors in Editor | `git clean -dfx && rm -rf node_modules && npm install && npm run compile`      |

---

## Further Reading

- [Getting Started](./getting-started.md) — Full step-by-step guide with
  troubleshooting
- [Configuration](./configuration.md) — Complete environment variable reference
- [CI/CD Pipeline](./ci-cd-pipeline.md) — Pipeline stages and automation
