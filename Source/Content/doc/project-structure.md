---
title: "Project Structure"
section: "Reference"
order: 46
description: "Overview of the Element directory organization, funding configuration, dependabot setup, and CI/CD workflow patterns."
---

# Project Structure

The Land monorepo uses Git submodules to compose 15 independent Elements under `Land/Element/`. Each Element is its own repository with its own versioning, changelog, and CI pipeline.

---

## Element Directory Layout

```
Land/Element/
    .gitmodules          # 15 submodule definitions
    CHANGELOG.md         # Umbrella-level changelog (cross-cutting syncs)
    .github/
        Update.md        # Automated daily timestamp (Auto.yml)
        FUNDING.yml      # Open Collective funding configuration
        dependabot.yml   # Root-level Dependabot (not used; per-element configs apply)
        workflows/       # Shared workflow templates (if any)
    Air/                 # Background daemon sidecar
    Cocoon/              # Extension-host Node.js sidecar
    Common/              # Abstract core Rust crate
    Echo/                # Work-stealing task scheduler
    Grove/               # Rust/WASM extension-host sidecar
    Maintain/            # Build/CI surface
    Mist/                # DNS isolation server
    Mountain/            # Native Rust Tauri backend
    Output/              # Bundled JS artifact tree
    Rest/                # JS bundler (OXC)
    SideCar/             # Node.js sidecar runtime
    Sky/                 # Astro UI component layer
    Vine/                # gRPC protocol definitions
    Wind/                # Effect-TS UI service layer
    Worker/              # Service-worker layer
```

### Per-Element Structure

Each Element repository contains:

```
ElementName/
    .github/
        Update.md        # Last-commit timestamp (daily automation)
        FUNDING.yml      # Open Collective: code-editor-land
        dependabot.yml   # Per-ecosystem dependency updates
        workflows/       # CI workflow definitions
    CHANGELOG.md         # Version history (Keep a Changelog format)
    Cargo.toml           # (Rust elements) package manifest
    package.json         # (Node/TS elements) package manifest
    README.md            # Element documentation
```

### Elements Without Dedicated .github/ Directory

Some smaller or placeholder elements (Grove, Vine, Mist) did not have a `.github/` directory with `Update.md` at the time of documentation. Grove has workflows and dependabot under `.github/` but its changelog lives in `CHANGELOG.md` at the root.

---

## Funding Configuration

All elements with a `.github/FUNDING.yml` file point to the same Open Collective:

```yaml
open_collective: code-editor-land
```

Elements with FUNDING.yml (8 of 15):
- Element (umbrella)
- Echo
- Mountain
- Rest
- SideCar
- Sky
- Wind
- Maintain

Elements without a dedicated FUNDING.yml (7):
- Air, Cocoon, Common, Grove, Mist, Output, Vine, Worker

All funding converges on the [Open Collective for Code Editor Land](https://opencollective.com/code-editor-land).

---

## Dependabot Configuration

All 13 elements with a `.github/dependabot.yml` share the same base pattern:

```yaml
version: 2
enable-beta-ecosystems: true
updates:
    - package-ecosystem: "github-actions"
      directory: "/"
      schedule:
          interval: "daily"
```

Rust elements (Mountain, Air, Common, Echo, Grove, Mist, Maintain, Rest, SideCar, Vine) add:

```yaml
    - package-ecosystem: "cargo"
      directory: "/"
      schedule:
          interval: "daily"
      versioning-strategy: lockfile-only
```

TypeScript/JS elements (Wind, Cocoon, Output, Sky, Worker) add:

```yaml
    - package-ecosystem: "npm"
      directory: "/"
      schedule:
          interval: "daily"
      versioning-strategy: increase
      ignore:
          - dependency-name: "tailwindcss"
            versions:
                - "^4.0.0"
```

Key policy: all dependencies update daily. Cargo uses lockfile-only to preserve the source tree; npm uses `increase` to bump package.json. Tailwind 4.x is explicitly ignored across JS elements.

---

## CI/CD Workflow Overview

Five standard workflow types appear across elements:

### Rust.yml
Present in: Mountain, Air, Common, Echo, Grove, Mist, Rest, SideCar, Vine, Maintain

Runs on push/PR to `Current` branch. Builds with both `stable` and `nightly` toolchains using `cargo build --release --all-features`. Caches Cargo registry and target directories.

### Node.yml
Present in: Wind, Cocoon, Worker

Runs on push/PR to `Current`. Pre-publishes with pnpm across a Node version matrix (18, 19, 20). Uploads build artefacts.

### NPM.yml
Present in: Echo, Wind, Worker

Publishes packages on release creation. Runs against Node 24 with `npm publish --legacy-peer-deps --ignore-scripts`.

### GitHub.yml
Present in all elements with CI configuration.

Auto-assigns new issues and PRs to the repository maintainer using `pozil/auto-assign-issue`.

### Auto.yml
Present in: Echo, Worker

Scheduled daily (`cron: 0 0 * * *`). Updates `.github/Update.md` with current timestamp and commits the change. This is how the single-line Update.md files are maintained.

### Cloudflare.yml
Present in: Echo

Cloudflare Workers deployment pipeline.

---

## Default Environment Variables

All CI workflows set the same 30+ telemetry-opt-out environment variables to prevent third-party analytics from cloud build hosts (Adblock, Astro, Azure, Docker, Gatsby, Homebrew, InfluxDB, Next.js, Nuxt, PowerShell, Stripe, Terraform, VCPkg, and others).
