---
title: "Contributing"
section: "Development"
order: 0
description:
    "How to contribute bug reports, pull requests, documentation, and extension
    compatibility reports to the Land code editor project."
---

Land is a CC0-licensed open-source project maintained by PlayForm in Sofia,
Bulgaria, with funding from the NLnet NGI0 Commons Fund. All contributions -
code, documentation, bug reports, and extension compatibility reports - are
welcome. This page describes the process for contributing and the conventions
contributors must follow.

## 📜　Code of Conduct

All contributors must follow the
[Contributor Covenant 2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct.html),
which the project has adopted without modification. Violations may be reported
to [Community@Editor.Land](mailto:Community@Editor.Land). The enforcement ladder
runs from private correction through temporary and permanent ban.

## ✅　What Contributions Are Accepted

- **Bug reports**: Open a GitHub issue with reproduction steps, the Land
  version, and the platform (macOS/Linux/Windows). Include the FIDDEE.log
  content if the bug involves startup or extension loading.
- **Pull requests**: Code fixes, new IPC handlers, TypeScript API coverage
  improvements, documentation updates, and test additions are all accepted.
- **Documentation**: Corrections or additions to files under
  `Land/Documentation/GitHub/` and the WebSite source.
- **Extension compatibility reports**: If a VS Code extension fails in Land,
  open an issue with the extension name, the failing API call, and the error
  message. This helps prioritize Cocoon API coverage work.

## 🔀　Pull Request Process

1. Fork the repository and create a branch from `Current` (the main integration
   branch - never branch from `main`).
2. Make your changes in the branch.
3. Open a pull request targeting the `Current` branch of the upstream
   repository.
4. Ensure the PR description explains what the change does and why. Reference
   any related issues.
5. All CI checks must pass before merge. See
   [CI/CD Pipeline](/Doc/ci-cd-pipeline) for what runs.

> [!IMPORTANT] Land uses a `Current` branch as the integration target, not
> `main`. Pull requests opened against `main` will be redirected.

## 💬　Commit Message Style

- Write imperative-mood subject lines: "Add handler for nativeHost:quit", not
  "Added handler" or "Adds handler".
- Keep the subject line under 72 characters.
- Use the body (blank line after subject) for motivation and context when the
  change is non-obvious.
- Do not add `Co-Authored-By` or attribution trailers of any kind.
- Do not reference agent names, session identifiers, or tool names in commit
  messages or code comments.

## 🚫　What Not to Do

> [!WARNING] The following actions will break the repository or build and must
> never be done.

- **Never `git add .`** anywhere in the repository. Each Element is a Git
  submodule; `git add .` converts submodule gitlinks into trees, corrupting the
  index. Always stage files by name: `git add Source/Path/To/File.rs`.
- **Never edit `Target/` directories** inside any Element. These are build
  outputs generated from `Public/` or `Source/`. Edit the source; rebuild.
- **Never edit
  `Land/Element/Mountain/Source/Vine/Server/Dependency/Microsoft/Dependency/Editor/src/vs/**`\*\*.
  This is the vendored VS Code source; changes here are overwritten on every
  upstream sync.
- **Do not recurse submodules** (`git submodule update --recursive`). Each
  Element is managed on its own branch independently.

## 📐　Code Style

### TypeScript

- Filenames are PascalCase (`MyModule.ts`). Single `export default` per file,
  anonymous, no named re-exports.
- Use `import type` for type-only imports; `await import()` for runtime values.
- Formatter and linter: [Biome](https://biomejs.dev/). Run
  `pnpm biome check --write` before committing. Tab indentation, line width 80.
- Arrow-async functions (`const Fn = async () => { ... }`); `satisfies` pattern
  for typed literals.
- The em quad character U+2001 is the only permitted separator character in
  display strings.

### Rust

- Edition 2024, MSRV 1.95.0.
- Run `rustfmt` before committing. The workspace `rustfmt.toml` sets the
  formatting rules.
- Never write `pub use` re-exports anywhere in the workspace. Use type aliases,
  delegating functions, or fresh constants instead.
- Filenames follow the same PascalCase convention as TypeScript.

### 🖼️　Icons and Images

Icons must come from `editor.land/Image/` only. Never reference external CDN
URLs in source or documentation.

## 🔒　Security Issues

Do not file GitHub issues for security vulnerabilities. Send a private report
through
[GitHub Security Advisories](https://github.com/CodeEditorLand/Land/security/advisories/new)
or email [Source/Open@Editor.Land](mailto:Source/Open@Editor.Land). Security
reports are acknowledged within 72 hours.
