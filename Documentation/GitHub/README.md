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

### Why Documents

| Document                                                  | Question Answered                         |
| --------------------------------------------------------- | ----------------------------------------- |
| [`why-rust`](../Source/Content/doc/why-rust.md)           | Why Rust for the native backend?          |
| [`why-tauri`](../Source/Content/doc/why-tauri.md)         | Why Tauri instead of Electron?            |
| [`why-wasm`](../Source/Content/doc/why-wasm.md)           | Why WebAssembly for extensions?           |
| [`why-effect-ts`](../Source/Content/doc/why-effect-ts.md) | Why Effect-TS for TypeScript layers?      |
| [`why-grpc`](../Source/Content/doc/why-grpc.md)           | Why gRPC for inter-process communication? |
| [`why-cc0`](../Source/Content/doc/why-cc0.md)             | Why CC0-1.0 licensing?                    |

### Workflows

| Document                                                                                                                | Topics                                            |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [`workflow-tier-gated-implementation-selection`](../Source/Content/doc/workflow-tier-gated-implementation-selection.md) | Feature flags and implementation tier selection   |
| [`workflow-startup`](../Source/Content/doc/workflow-startup.md)                                                         | Application startup and Mountain↔Cocoon handshake |
| [`workflow-open-file`](../Source/Content/doc/workflow-open-file.md)                                                     | File explorer click to editor rendering           |
| [`workflow-hover-provider`](../Source/Content/doc/workflow-hover-provider.md)                                           | Extension hover provider dispatch via gRPC        |
| [`workflow-save-participants`](../Source/Content/doc/workflow-save-participants.md)                                     | Save interception with extension participants     |
| [`workflow-command-palette`](../Source/Content/doc/workflow-command-palette.md)                                         | Unified command dispatch (Rust + extension)       |
| [`workflow-webview`](../Source/Content/doc/workflow-webview.md)                                                         | Extension webview panel lifecycle                 |
| [`workflow-terminal`](../Source/Content/doc/workflow-terminal.md)                                                       | PTY process management and I/O streaming          |
| [`workflow-scm`](../Source/Content/doc/workflow-scm.md)                                                                 | Git extension integration via Mountain            |
| [`workflow-user-data-sync`](../Source/Content/doc/workflow-user-data-sync.md)                                           | Settings sync with three-way merge                |
| [`workflow-extension-tests`](../Source/Content/doc/workflow-extension-tests.md)                                         | Extension Development Host test runner            |
