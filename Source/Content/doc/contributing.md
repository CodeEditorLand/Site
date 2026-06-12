---
title: "Contributing"
section: "Development"
order: 0
description:
    "How to contribute bug reports, pull requests, documentation, and extension
    compatibility reports to the Land code editor project, including code
    style, commit conventions, and security reporting."
---

Land is a CC0-licensed open-source project maintained by PlayForm in Sofia,
Bulgaria, with funding from the NLnet NGI0 Commons Fund. All contributions -
code, documentation, bug reports, and extension compatibility reports - are
welcome. No CLA or copyright assignment is required. All code is dedicated to
the public domain.

---

## Code of Conduct 📜

All contributors must follow the
[Contributor Covenant 2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct.html),
which the project has adopted without modification. Violations may be reported
to [Community@Editor.Land](mailto:Community@Editor.Land). The enforcement ladder
runs from private correction through temporary and permanent ban.

---

## What Contributions Are Accepted ✅

**Bug reports.** Open a GitHub issue with reproduction steps, the Land version,
and the platform (macOS/Linux/Windows). Include the FIDDEE log content if the
bug involves startup or extension loading. The more specific the reproduction,
the faster it gets triaged.

**Pull requests.** Code fixes, new IPC handlers, TypeScript API coverage
improvements, documentation updates, and test additions are all accepted.
Complex changes benefit from a brief issue or discussion before work begins.

**Documentation.** Corrections or additions to files under
`Land/Documentation/GitHub/` and the WebSite source at `WebSite/Source/Content/`.
Documentation PRs have a lower review bar than code PRs.

**Extension compatibility reports.** If a VS Code extension fails in Land, open
an issue with the extension name, the failing API call, the error message, and
the extension version. This helps prioritize Cocoon API coverage work. Even
partial reports are useful.

---

## Pull Request Process 🔀

1. Fork the repository and create a branch from `Current`. The `Current` branch
   is the main integration target - never branch from `main`.

2. Make changes in the branch. Keep each PR focused on a single concern.
   Separate refactoring from feature work into different PRs.

3. Open a pull request targeting the `Current` branch of the upstream
   repository. Ensure the PR description explains what the change does, why it
   is needed, and how it was tested. Reference any related issues.

4. All CI checks must pass before merge. The pipeline runs:
    - `cargo check` across the Rust workspace
    - `pnpm biome check` across TypeScript sources
    - Integration smoke tests for Mountain and Cocoon
    - See [CI/CD Pipeline](https://Editor.Land/Doc/ci-cd-pipeline)

5. A maintainer reviews the PR. Review feedback should be addressed with
   additional commits (not rebased force-pushes) to make incremental review
   easier. Squash merge is used at merge time.

> [!IMPORTANT] Land uses `Current` as the integration target, not `main`.
> Pull requests opened against `main` will be redirected.

---

## Commit Message Style 💬

- Write imperative-mood subject lines: "Add handler for `nativeHost:quit`", not
  "Added handler" or "Adds handler"
- Keep the subject line under 72 characters
- Use the body (blank line after subject) for motivation and context when the
  change is non-obvious: why the approach was chosen, what alternatives were
  considered
- Do not add `Co-Authored-By` or attribution trailers of any kind
- Do not reference agent names, session identifiers, or tool names in commit
  messages or code comments
- Do not use emoji or ASCII art in commit subjects

---

## What Not to Do 🚫

> [!WARNING] The following actions will break the repository or build and must
> never be done.

- **Never `git add .`** anywhere in the repository. Each Element is a Git
  submodule; `git add .` converts submodule gitlinks into trees, corrupting the
  index. Always stage files by name: `git add Source/Path/To/File.rs`.

- **Never edit `Target/` directories** inside any Element. These are build
  outputs generated from `Public/` or `Source/`. Edit the source; rebuild.

- **Never edit `Element/Dependency/Microsoft/Dependency/Editor/src/vs/**`\*\*.
  This is the vendored VS Code source; changes here are overwritten on every
  upstream sync.

- **Do not recurse submodules** (`git submodule update --recursive`). Each
  Element is managed on its own branch independently.

- **Do not upgrade the Rust toolchain** without auditing 51
  `[patch.crates-io]` redirects in `Cargo.toml` that are version-sensitive.

---

## Code Style 📐

### TypeScript Style Guide

- Filenames are PascalCase (`MyModule.ts`). Single `export default` per file,
  anonymous, no named re-exports.
- Use `import type` for type-only imports; `await import()` for runtime values.
- Formatter and linter: [Biome](https://biomejs.dev/). Run
  `pnpm biome check --write` before committing.
- Tab indentation, line width 80.
- Arrow-async functions (`const Fn = async () => { ... }`). Prefer arrow
  functions over `function` declarations.
- `satisfies` pattern for typed literals over explicit type annotations.
- The em quad character U+2001 is the only permitted separator character in
  display strings.

### Rust Style Guide

- Edition 2024, MSRV 1.95.0. The toolchain is pinned in `rust-toolchain.toml`.
- Run `cargo fmt` before committing. The workspace `rustfmt.toml` sets rules.
- Never write `pub use` re-exports anywhere in the workspace. Use type aliases,
  delegating functions, or fresh constants instead.
- Filenames follow the same PascalCase convention as TypeScript.
- Follow clippy warnings. New code should introduce zero new clippy warnings.

### Icons and Images

Icons must come from `editor.land/Image/` only. Never reference external CDN
URLs in source or documentation. This rule applies to all project documentation,
the WebSite, and the application UI.

---

## Testing 🧪

Land uses a tiered testing strategy:

**Rust tests.** Unit tests live alongside the code with `#[cfg(test)]` modules.
Integration tests for Mountain verify IPC handler dispatch and gRPC server
behavior. Run with `cargo test -p mountain`.

**TypeScript tests.** Cocoon and Wind use Effect-TS's built-in `TestClock` and
`TestEnvironment` for service-level tests. Vitest is the test runner. Run with
`pnpm test` inside `Element/Cocoon` or `Element/Wind`.

**Smoke tests.** The `Maintain/CI/` directory contains end-to-end tests that
start Mountain, wait for the gRPC server to accept connections, run a set of
IPC operations, and validate responses. These require a full build.

---

## Security Issues 🔒

Do not file GitHub issues for security vulnerabilities. Send a private report
through
[GitHub Security Advisories](https://github.com/CodeEditorLand/Land/security/advisories/new)
or email [Source/Open@Editor.Land](mailto:Source/Open@Editor.Land). Security
reports are acknowledged within 72 hours. The project uses GitHub's private
vulnerability reporting workflow for coordinated disclosure.

---

## Related Documentation 🔗

- [Getting Started](https://Editor.Land/Doc/getting-started) - build the
  project from source
- [Project Structure](https://Editor.Land/Doc/project-structure) - element
  layout and naming conventions
- [CI/CD Pipeline](https://Editor.Land/Doc/ci-cd-pipeline) - what runs on
  every pull request
- [Code of Conduct](https://github.com/CodeEditorLand/Land/blob/main/CODE_OF_CONDUCT.md)
- [Security Policy](https://github.com/CodeEditorLand/Land/blob/main/SECURITY.md)

## Funding 💎

Land's development is funded by the **NLnet NGI0 Commons Fund**, a European
initiative supporting open-source infrastructure. The project is maintained by
**PlayForm** (Sofia, Bulgaria) as a non-profit effort. All code is dedicated to
the public domain under CC0 - no CLA required, no copyright assignment, no
restrictions on use.
