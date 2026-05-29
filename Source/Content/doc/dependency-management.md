---
title: "Dependency Management"
section: "Reference"
order: 48
description:
    "Dependabot configuration, ecosystem coverage, and dependency update
    strategy across Land elements."
---

# Dependency Management

Each Land element configures its own Dependabot. This page documents the shared
patterns and element-specific variations.

---

## Dependabot Configuration

All configurated elements use Dependabot v2 with beta ecosystems enabled:

```yaml
version: 2
enable-beta-ecosystems: true
```

This single flag allows Dependabot to pick up newer or experimental
package-ecosystem values beyond the stable set (npm, cargo, docker,
github-actions).

---

## Ecosystem Coverage

### github-actions (All 13 elements with dependabot.yml)

Every element monitors GitHub Action versions in its `.github/workflows/`
directory for updates. This keeps CI tooling current without manual tracking.

```yaml
updates:
    - package-ecosystem: "github-actions"
      directory: "/"
      schedule:
          interval: "daily"
```

### cargo (Rust elements)

Applies to: Mountain, Air, Common, Echo, Grove, Mist, Rest, SideCar, Vine,
Maintain

```yaml
- package-ecosystem: "cargo"
  directory: "/"
  schedule:
      interval: "daily"
  versioning-strategy: lockfile-only
```

The `lockfile-only` strategy means Dependabot updates `Cargo.lock` without
touching `Cargo.toml` version pins. This ensures:

- Version constraints in `Cargo.toml` remain stable and explicit.
- Lockfile picks up compatible new releases automatically.
- No breaking semver bumps slip through the lockfile gate.

### npm (TypeScript/JavaScript elements)

Applies to: Wind, Cocoon, Output, Sky, Worker

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

The `increase` strategy means Dependabot bumps the version ranges in
`package.json` itself, not just the lockfile. This gives each element the latest
compatible ranges on every dependency roll.

Tailwind 4.x is explicitly ignored across all JS elements due to the breaking
changes in the v4 rewrite (CSS-first configuration, different plugin API).

---

## Update Strategy Summary

| Element  | Ecosystems            | Versioning Strategy |
| -------- | --------------------- | ------------------- |
| Mountain | github-actions, cargo | lockfile-only       |
| Air      | github-actions, cargo | lockfile-only       |
| Common   | github-actions, cargo | lockfile-only       |
| Echo     | github-actions, cargo | lockfile-only       |
| Grove    | github-actions, cargo | lockfile-only       |
| Mist     | github-actions, cargo | lockfile-only       |
| Rest     | github-actions, cargo | lockfile-only       |
| SideCar  | github-actions, cargo | lockfile-only       |
| Vine     | github-actions, cargo | lockfile-only       |
| Maintain | github-actions, cargo | lockfile-only       |
| Wind     | github-actions, npm   | increase            |
| Cocoon   | github-actions, npm   | increase            |
| Output   | github-actions, npm   | increase            |
| Sky      | github-actions, npm   | increase            |
| Worker   | github-actions, npm   | increase            |

---

## Dependency Philosophy

### Rust: Lockfile-Only Stability

Rust elements keep their `Cargo.toml` pins stable. Dependabot rolls the
lockfile, bringing in bugfix and minor releases within the existing constraint.
Major version bumps (e.g., Hickory-Server 0.24 to 0.26 in Mist, OXC 0.127 in
Rest) require manual review because they may change public APIs or require code
migrations.

### JavaScript: Aggressive Range Updates

JavaScript elements let Dependabot bump package.json ranges directly. This keeps
the dependency surface fresh but requires CI to catch incompatibilities. The
Node.yml matrix (Node 24) and pre-publish checks serve as the safety net.
Tailwind 4.x is the single explicit exclude, as its rewrite broke the SCSS-based
configuration surface the UI layer depends on.

### GitHub Actions: Always Current

CI action versions are the one dependency type that always bumps in package.json
manifests across all elements. Using the latest stable action version ensures
bugfixes and security patches land automatically.

---

## Elements Without Dependabot

Vine and Mist do not have a `.github/dependabot.yml` file in their repositories
(despite being Rust elements). Their dependencies are managed through manual
review and the umbrella-level Dependabot if applicable.

Note: The search found dependabot.yml in 13 element directories. The two
elements without one are likely Vine and Mist, which had minimal or placeholder
repositories for extended periods.
