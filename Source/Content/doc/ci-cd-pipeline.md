---
title: "CI/CD Pipeline"
section: "Reference"
order: 47
description:
    "Documentation of the five GitHub Actions workflow types used across Land
    elements."
---

# CI/CD Pipeline

Every Land element runs on GitHub Actions. The pipeline consists of five
standard workflow types, each handling a specific concern.

---

## Workflow Types

### Rust.yml (Build Pipeline)

**Applies to:** Mountain, Air, Common, Echo, Grove, Mist, Rest, SideCar, Vine,
Maintain

**Triggers:**

- Push to `Current` branch
- Pull request targeting `Current`
- Manual dispatch

**What it does:**

1. Checks out the repository.
2. Installs Rust toolchain (both `stable` and `nightly` via strategy matrix).
3. Restores Cargo cache (registry index, cache, git db, and target directories).
4. Runs `cargo build --release --all-features --manifest-path ./Cargo.toml`.

**Concurrency group:** `Rust-${{ github.workflow }}-${{ github.ref }}` with
`cancel-in-progress: true` to avoid redundant builds on rapid pushes.

### Node.yml (Pre-Publish Pipeline)

**Applies to:** Wind, Cocoon, Worker

**Triggers:**

- Push to `Current` branch
- Pull request targeting `Current`
- Manual dispatch

**What it does:**

1. Checks out the repository.
2. Sets up pnpm (v9.3.0) with recursive install.
3. Sets up Node.js 24 with pnpm caching.
4. Runs `pnpm install`.
5. Runs `pnpm run prepublishOnly`.
6. Uploads `./Target` as a build artefact.

**Concurrency group:** `Node-${{ github.workflow }}-${{ github.ref }}`.

### NPM.yml (Publish Pipeline)

**Applies to:** Echo, Wind, Worker

**Triggers:**

- GitHub release creation
- Manual dispatch
- Reusable workflow call

**What it does:**

1. Checks out the repository.
2. Sets up Node.js 24.
3. Installs latest npm globally.
4. Runs `npm publish --legacy-peer-deps --ignore-scripts`.

Runs in the `Release` environment with `id-token: write` for provenance
attestation.

**Concurrency group:** `NPM-${{ github.workflow }}-${{ github.ref }}`.

### GitHub.yml (Issue/PR Management)

**Applies to:** All 15 elements

**Triggers:**

- Issue opened
- Pull request opened

**What it does:**

1. Uses `pozil/auto-assign-issue@v3.0.0` to auto-assign new issues and PRs to
   the repository maintainer (`NikolaRHristov`).

**Concurrency group:** `GitHub-${{ github.workflow }}-${{ github.ref }}`.

### Auto.yml (Automated Timestamp Update)

**Applies to:** Echo, Worker

**Triggers:**

- Daily schedule (`0 0 * * *`)
- Manual dispatch
- Reusable workflow call

**What it does:**

1. Checks out the repository.
2. Writes the current date to `.github/Update.md`: `Update: $(date)`.
3. Commits with git identity "Auto" (`Commit@PlayForm.Cloud`).
4. Pushes to `Current` branch via `ad-m/github-push-action`.

This keeps a visible timestamp of the last repository activity even when no
other commits land.

**Concurrency group:** `Auto-${{ github.workflow }}-${{ github.ref }}`.

### Cloudflare.yml (Workers Deployment)

**Applies to:** Echo

**Triggers:**

- Push to `Current` branch
- Pull request targeting `Current`
- Manual dispatch

**What it does:** Deploys Echo to Cloudflare Workers infrastructure.

---

## Shared Patterns

### Concurrency Control

All workflows use branch-scoped concurrency groups. This means:

- Only one build runs per branch at a time.
- New commits cancel in-progress builds.
- PR builds and push builds to the same branch do not race.

### Telemetry Opt-Out

Every workflow sets 30+ environment variables to disable third-party telemetry
from tools running in the CI environment. This covers Adblock, Astro, Azure,
Docker, Gatsby, Homebrew, InfluxDB, Next.js, Nuxt, PowerShell, Stripe,
Terraform, VCPkg, and others.

### Action Versions

The pipeline uses pinned action versions:

- `actions/checkout@v6.0.2`
- `actions/setup-node@v6.4.0`
- `actions/cache@v5.0.5`
- `actions/upload-artifact@v7.0.1`
- `actions-rs/toolchain@v1.0.7`
- `actions-rs/cargo@v1.0.3`
- `pnpm/action-setup@v6.0.8`
- `pozil/auto-assign-issue@v3.0.0`
- `ad-m/github-push-action@v1.1.0`

### Permissions

Workflow permission scopes vary by type:

- **Rust.yml:** `security-events: write`
- **Node.yml:** `security-events: write`, `contents: write`,
  `pull-requests: write`
- **NPM.yml:** `contents: read`, `id-token: write` (job-level)
- **GitHub.yml:** `issues: write`, `pull-requests: write`
- **Auto.yml:** `contents: write`
