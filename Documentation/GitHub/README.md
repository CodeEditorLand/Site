# Documentation

## Brand & Site Design Manual

The GitHub-facing brand manual and design system documentation for the Land editor website.

- `01-Overview/` — Brand manual and naming/visual language
- `02-DesignTokens/` — Color, typography, spacing, shape/edges, logo/assets
- `03-Components/` — Component reference, layout patterns, state colors
- `04-Motion/` — Staccato system and motion performance
- `05-Platform/` — Accessibility, internationalization, platform rules

## Technical Documentation

The full technical documentation for the Land code editor lives under `Source/Content/doc/` and is rendered at **[Editor.Land/Doc/](https://editor.land/Doc/)**.

> **Styles reference:** For the canonical formatting conventions used across all doc pages (frontmatter, emoji placement, em-quad spacing, heading hierarchy, cross-linking), see [`.hermes/skills/documentation/website-doc-style-polish/SKILL.md`](/.hermes/skills/documentation/website-doc-style-polish/SKILL.md). This skill is the permanent reference for creating new docs that will ingress correctly.

### Reference

| Document                                                                                                            | Topics                                                                   |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [`filesystem-footprint`](../Source/Content/doc/filesystem-footprint.md)                                             | Every host-filesystem location the editor reads or writes                |
| [`filesystem-footprint-user-dotfile`](../Source/Content/doc/filesystem-footprint-user-dotfile.md)                   | `~/.fiddee/` tree, cross-OS resolution, sub-directory map                |
| [`filesystem-footprint-platform-paths`](../Source/Content/doc/filesystem-footprint-platform-paths.md)               | Per-OS Library/XDG/AppData paths, OS-managed state, temp-dir conventions |
| [`filesystem-footprint-per-element`](../Source/Content/doc/filesystem-footprint-per-element.md)                     | Write-site index grouped by Element                                      |
| [`filesystem-footprint-environment-variables`](../Source/Content/doc/filesystem-footprint-environment-variables.md) | Path-shaping env vars catalogued by Element + role                       |
| [`filesystem-footprint-cleanup`](../Source/Content/doc/filesystem-footprint-cleanup.md)                             | Per-OS cleanup recipes and archive pattern                               |
| [`filesystem-footprint-encapsulation`](../Source/Content/doc/filesystem-footprint-encapsulation.md)                 | Directions for compaction, versioning, self-uninstall                    |
| [`build-pipeline`](../Source/Content/doc/build-pipeline.md)                                                         | Six-stage build pipeline from env resolution to artifact production      |
| [`build-matrix`](../Source/Content/doc/build-matrix.md)                                                             | Build variant profiles and env-var propagation across Elements           |
| [`polyfills`](../Source/Content/doc/polyfills.md)                                                                   | Every polyfill and compatibility shim in Land                            |
| [`workflow-overview`](../Source/Content/doc/workflow-overview.md)                                                   | Architecture overview and master index of all workflow examples          |

### Start & Guide

| order   | id                  | title                    |
| ------- | ------------------- | ------------------------ |
| Start/0 | `introduction`      | Introduction             |
| Start/3 | `installation`      | Installation             |
| Start/5 | `project-structure` | Project Structure        |
| Guide/1 | `getting-started`   | Getting Started          |
| Guide/2 | `quickstart`        | Quickstart               |
| Guide/3 | `configuration`     | Configuration            |
| Guide/4 | `ci-cd-pipeline`    | CI/CD Pipeline           |
| Guide/5 | `api-reference`     | Inter-Component Protocol |

### Elements

| order | id                         | title                           |
| ----- | -------------------------- | ------------------------------- |
| 0     | `air`                      | Air: Background Daemon🪁        |
| 1     | `cocoon`                   | Cocoon🦋                        |
| 2     | `cocoon-vscode-validation` | Cocoon VS Code Validation       |
| 2     | `common`                   | Common: Abstract Core Library👨🏻‍🏭 |
| 3     | `echo`                     | Echo📣                          |
| 4     | `grove`                    | Grove🌳                         |
| 5     | `maintain`                 | Maintain💪🏻                      |
| 6     | `mist`                     | Mist🌐                          |
| 7     | `mountain`                 | Mountain⛰️                      |
| 8     | `output`                   | Output⚫                        |
| 9     | `rest`                     | Rest⛱️                          |
| 9     | `sky`                      | Sky🌌                           |
| 10    | `sidecar`                  | SideCar🛟                       |
| 12    | `vine`                     | Vine🌿                          |
| 13    | `wind`                     | Wind🍃                          |
| 14    | `worker`                   | Worker                          |

### Deep Dive

| order | id                   | title                |
| ----- | -------------------- | -------------------- |
| 0     | `deep-dive-air`      | Air — Deep Dive      |
| 1     | `deep-dive-cocoon`   | Cocoon — Deep Dive   |
| 2     | `deep-dive-common`   | Common — Deep Dive   |
| 3     | `deep-dive-echo`     | Echo — Deep Dive     |
| 4     | `deep-dive-grove`    | Grove — Deep Dive    |
| 5     | `deep-dive-maintain` | Maintain — Deep Dive |
| 7     | `deep-dive-mountain` | Mountain — Deep Dive |
| 9     | `deep-dive-rest`     | Rest — Deep Dive     |
| 10    | `deep-dive-sidecar`  | SideCar — Deep Dive  |
| 11    | `deep-dive-sky`      | Sky — Deep Dive      |
| 12    | `deep-dive-vine`     | Vine — Deep Dive     |
| 13    | `deep-dive-wind`     | Wind — Deep Dive     |
| 14    | `deep-dive-worker`   | Worker — Deep Dive   |
| 14    | `deep-dive-mist`     | Mist — Deep Dive     |

### Workflows

| order | id                                             | title                                    |
| ----- | ---------------------------------------------- | ---------------------------------------- |
| 0     | `workflow-startup`                             | Application Startup and Handshake        |
| 1     | `workflow-open-file`                           | Opening a File from the UI               |
| 2     | `workflow-hover-provider`                      | Invoking a Language Feature Hover        |
| 3     | `workflow-save-participants`                   | Saving a File with Save Participants     |
| 4     | `workflow-command-palette`                     | Executing a Command from Command Palette |
| 5     | `workflow-webview`                             | Creating and Interacting with a Webview  |
| 6     | `workflow-terminal`                            | Creating and Interacting with Terminal   |
| 7     | `workflow-scm`                                 | Source Control Management                |
| 8     | `workflow-user-data-sync`                      | User Data Synchronization                |
| 9     | `workflow-extension-tests`                     | Running Extension Tests                  |
| 11    | `workflow-tier-gated-implementation-selection` | Tier-Gated Implementation Selection      |

### Why Land

| order | id              | title           |
| ----- | --------------- | --------------- |
| 0     | `why-rust`      | Why Rust        |
| 1     | `why-tauri`     | Why Tauri       |
| 2     | `why-effect-ts` | Why Effect-TS   |
| 3     | `why-grpc`      | Why gRPC        |
| 4     | `why-wasm`      | Why WebAssembly |
| 5     | `why-cc0`       | Why CC0         |

### Development

| order | id                            | title                       |
| ----- | ----------------------------- | --------------------------- |
| 0     | `contributing`                | Contributing                |
| 1     | `extension-development`       | Extension Development       |
| 2     | `dependency-management`       | Dependency Management       |
| 3     | `mountain-naming-conventions` | Mountain Naming Conventions |
| 4     | `development-history`         | Development History         |
| 5     | `local-first-protocol`        | Local-First Protocol        |
| 6     | `troubleshooting`             | Troubleshooting             |
| 7     | `vscode-api-coverage`         | VS Code API Coverage Matrix |
| 8     | `telemetry/overview`          | Telemetry Overview          |
| 8     | `telemetry/effect-otel`       | Effect-OTel Integration     |
| 8     | `telemetry/sidecars`          | Telemetry Sidecars          |
| 8     | `telemetry/tree-shaking`      | Telemetry Tree-Shaking      |

---

## Sidebar SectionOrder

The sidebar ordering is defined in two files (both must match when adding new sections):

- `Source/pages/Doc.astro`
- `Source/pages/Doc/[...Slug].astro`

```javascript
const SectionOrder = [
	"Start",
	"Guide",
	"Elements",
	"Deep Dive",
	"Workflows",
	"Why Land",
	"Reference",
	"Development",
	"Telemetry",
];
```

## Canonical Element Emoji Mapping

From the website's own I18n locale (`Source/Library/I18n/Locale/En/Home.json`):

| Element  | Emoji | Element  | Emoji |
| -------- | ----- | -------- | ----- |
| Mountain | ⛰️    | Common   | 👨🏻‍🏭    |
| Cocoon   | 🦋    | Echo     | 📣    |
| Wind     | 🍃    | Grove    | 🌳    |
| Sky      | 🌌    | Rest     | ⛱️    |
| Air      | 🪁    | Vine     | 🌿    |
| Mist     | 🌐    | SideCar  | 🛟    |
| Output   | ⚫    | Maintain | 💪🏻    |

## Doc Formatting Conventions (Summary)

For the **complete** reference including frontmatter rules, em-quad spacing, heading hierarchy, cross-linking patterns, verification scripts, and page inventory tables, see the skill file at:

**`.hermes/skills/documentation/website-doc-style-polish/SKILL.md`**

Key rules at a glance:

1. **Frontmatter**: Every file needs `title`, `section`, `order`, `description`. Section values must be quoted.
2. **Emoji right**: Always `## Text 🗺️` not `## 🗺️ Text` — emoji after text, separated by `\u2001` (em-quad).
3. **Headings without emoji**: Structural headings like `## Table of Contents` need no emoji.
4. **No HTML table headers**: Strip Land logo `<table>` blocks when adapting from GitHub docs.
5. **No back-navigation**: Replace `[← Back to ...]` with `See also: [Title](link)`.
6. **No absolute GitHub links**: Convert to `/Doc/page/` paths.
7. **Cross-ref style**: First mention of an Element → `**`Element`** 🗺️`.
8. **Sidebar SectionOrder**: Both `Doc.astro` and `[...Slug].astro` must be kept in sync.
