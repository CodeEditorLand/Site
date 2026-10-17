---
title: "Sky - Deep Dive"
navTitle: "Sky"
section: "Deep Dive"
order: 11
description:
    "Architecture, key modules, Sky Bridge event routing, build optimization,
    data flow, integration points, and configuration for the Sky UI component
    layer in the Land project."
---

[Sky](https://github.com/CodeEditorLand/Sky) renders the complete editor interface inside the Tauri webview using Astro,
consuming state and services from the [Wind](https://github.com/CodeEditorLand/Wind) service layer. the
internal architecture, module inventory, Sky Bridge event routing, build
optimization strategy, data flow, integration points, and configuration.

## Architecture

[Sky](https://github.com/CodeEditorLand/Sky) is organized into three tiers: page routes that define Tauri webview entry
points, workbench components that compose the VSCode-compatible editor layout,
and utility functions that support the build and runtime process.

<img src="/Mermaid/9e999e3dd8c312e6.svg" alt="Mermaid diagram" />

### Layer Responsibilities

- **Pages** - Astro route files that act as Tauri webview entry points. Each
  page reads environment variables to select and load the appropriate workbench
  variant.
- **Workbenches** - Composable layout components that assemble the VS Code-style
  editor shell. Variants exist for browser-only, [Mountain](https://github.com/CodeEditorLand/Mountain)-backed, Electron, and
  isolated modes.
- **Functions** - Build-time debug utilities, shared runtime helpers, HTML meta
  tag components, and base HTML layout skeleton components.

---

## Key Modules

| Path                                                                                                                                          | Description                                                                             |
| :-------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| [`Source/pages/index.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/index.astro)                                     | Default entry point; reads environment variables to select workbench variant            |
| [`Source/pages/Mountain.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/Mountain.astro)                               | A2 workbench page - recommended production entry point                                  |
| [`Source/pages/Browser.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/Browser.astro)                                 | A1 browser-only workbench page                                                          |
| [`Source/pages/BrowserProxy.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/BrowserProxy.astro)                       | A1 browser workbench with services proxy                                                |
| [`Source/pages/Electron.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/Electron.astro)                               | A3 workbench page with Electron polyfills                                               |
| [`Source/pages/Isolation.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/Isolation.astro)                             | Isolated mode page for extension sandboxing                                             |
| [`Source/Workbench/Mountain.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Mountain.astro)                       | A2 workbench component - loads VSCode UI with Mountain providers                        |
| [`Source/Workbench/Browser.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Browser.astro)                         | A1 workbench component - pure browser workbench                                         |
| [`Source/Workbench/BrowserProxy/Layout.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/BrowserProxy/Layout.astro) | A1 layout with service proxy bootstrapping                                              |
| [`Source/Workbench/BrowserProxy/Bootstrap.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/BrowserProxy/Bootstrap.ts) | Initializes [`Effect-TS`](https://effect.website) runtime and services for BrowserProxy |
| `Source/Workbench/BrowserProxy/ServicesProxy.ts`                                                                                              | Service proxy implementation                                                            |
| [`Source/Workbench/Electron/Layout.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Layout.astro)         | A3 layout with Electron polyfill injection                                              |
| [`Source/Workbench/Electron/Polyfills.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Electron/Polyfills.ts)         | Electron compatibility shims                                                            |
| [`Source/Workbench/NLS.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/NLS.astro)                                 | Natural language support component                                                      |
| [`Source/Function/Debug.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Debug.ts)                                     | Build-time debug utilities                                                              |
| [`Source/Function/Shared.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Shared.ts)                                   | Shared runtime utilities                                                                |
| [`Source/Function/Meta.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Meta.astro)                                 | HTML meta tag component                                                                 |
| [`Source/Function/Markup/Base.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Markup/Base.astro)                   | Base HTML layout skeleton                                                               |
| [`astro.config.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/astro.config.ts)                                                       | Astro build configuration, alias resolution, Vite settings                              |

---

## Sky Bridge

[`Source/Function/Sky/Bridge.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge.ts) subscribes to all `sky://` Tauri events emitted
by [Mountain](https://github.com/CodeEditorLand/Mountain) and routes them to VS Code workbench APIs or DOM manipulation. The
bridge is modular: each `Install*` module in [`Bridge/`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/) registers a related group
of channels.

> [Mountain](https://github.com/CodeEditorLand/Mountain) is used as a relay for [Cocoon](https://github.com/CodeEditorLand/Cocoon)-to-[Sky](https://github.com/CodeEditorLand/Sky) communication. Sky emits a
> `sky://` Tauri event, Mountain re-emits it as a gRPC notification to Cocoon.
> This avoids a separate transport while keeping the workbench renderer and the
> extension host decoupled.

### Bridge Modules

| Module                                                                                                                                                     | Registered channels / responsibility                                                                                                                                                                                                        |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`InstallCommands.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallCommands.ts)                                   | `sky://command/execute`, `sky://command/register`, `sky://command/unregister`                                                                                                                                                               |
| [`InstallDebug.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallDebug.ts)                                         | `sky://debug/sessionStart`, `sky://debug/sessionEnd`, `sky://debug/consoleAppend`, `sky://debug/dap-message`, `sky://debug/addBreakpoints` to `IDebugService.addBreakpoints()`, `sky://debug/removeBreakpoints`, `sky://customEditor/saved` |
| [`InstallDiagnostics.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallDiagnostics.ts)                             | Diagnostic and smoke-test channels                                                                                                                                                                                                          |
| [`InstallEditorAndOutput.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallEditorAndOutput.ts)                     | `sky://workspace/applyEdit`, `sky://workspace/save*`, output channel create/append/clear/show/dispose                                                                                                                                       |
| [`InstallEditorOperations.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallEditorOperations.ts)                   | Monaco `onDidChangeModelContent` debounced (300 ms) to `sky:model:contentChanged` to Mountain to Cocoon `onDidChangeTextDocument`; `sky://editor/apply-text-edits` handles both VS Code 0-based and Monaco 1-based ranges                   |
| [`InstallFanOut.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallFanOut.ts)                                       | Multi-subscriber fan-out for high-frequency events                                                                                                                                                                                          |
| [`InstallInlineCompletions.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallInlineCompletions.ts)                 | Registers `ILanguageFeaturesService.inlineCompletionsProvider` with a wildcard selector; on trigger, calls `language:provideInlineCompletions` IPC to Mountain's `ProvideInlineCompletionItems` gRPC handler to Cocoon registered providers |
| [`InstallProgressTerminalWorkspace.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallProgressTerminalWorkspace.ts) | `sky://progress/*`, `sky://terminal/*`, `sky://workspace/*`                                                                                                                                                                                 |
| [`InstallScm.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallScm.ts)                                             | `sky://scm/register` with 10-by-200 ms retry for `__CEL_SERVICES__.SCM` population race; `sky://scm/provider/changed` updates workbench input model                                                                                         |
| [`InstallSearch.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallSearch.ts)                                       | `sky://search/*` channels                                                                                                                                                                                                                   |
| [`InstallSimpleRelays.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallSimpleRelays.ts)                           | Pure DOM-event re-dispatchers for `cel:*` consumer subscriptions; `sky://language/configure` calls `monaco.languages.setLanguageConfiguration()` directly                                                                                   |
| [`InstallStatusbar.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallStatusbar.ts)                                 | `sky://statusbar/update`, `sky://statusbar/dispose`, `sky://statusbar/set-message`                                                                                                                                                          |
| [`InstallTasksAndDecorations.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallTasksAndDecorations.ts)             | Task and decoration channel relays                                                                                                                                                                                                          |
| [`InstallTreeView.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallTreeView.ts)                                   | Tree-view `onDidChangeSelection`, `onDidCollapse`, `onDidExpand` CustomEvent forwarding; `sky://tree-view/reveal` calls `IViewsService.openView()`                                                                                          |
| [`InstallUiRequests.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallUiRequests.ts)                               | `sky://ui/show-message-request`, QuickPick and InputBox round-trips via `IQuickInputService`                                                                                                                                                |
| [`InstallWebview.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge/InstallWebview.ts)                                     | `sky://webview/message`, `sky://webview/dispose`                                                                                                                                                                                            |

---

## Build Optimization

### Code Splitting (S1)

For non-bundled profiles (`debug-electron`, etc.) `vs/**` is entirely external,
so Sky's own module graph would otherwise concatenate into one large chunk. The
`manualChunks` configuration in [`astro.config.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/astro.config.ts) splits it into four named
chunks the browser preloader can fetch in parallel and V8 can parse on separate
threads:

| Chunk name        | Contents                                                                                              |
| :---------------- | :---------------------------------------------------------------------------------------------------- |
| `effect-rt`       | Effect-TS runtime (~800 KB, rarely changes)                                                           |
| `wind-effect-gen` | [Wind](https://github.com/CodeEditorLand/Wind)'s codegen Effect layer (large, stable, cache-friendly) |
| `sky-telemetry`   | PostHog and OTLP bridge (never on the synchronous paint path)                                         |
| `sky-debug`       | SmokeTest and diagnostic harness (debug builds only)                                                  |

The bundled profiles (`Pack=electron`, etc.) must not use `manualChunks` because
the workbench loader's auto-split boundary (`workbench.js` to
`workbench.desktop.main.js`) is required for correct initialization order.

### Sourcemaps

Sourcemaps are generated as `"inline"` in dev builds (`NODE_ENV=development`) for
WKWebView DevTools and profiler symbol resolution. Production builds disable
sourcemaps to avoid shipping artifacts that are three times the bundle size.

---

## Data Flow

The following sequence shows how a user action travels from the [Sky](https://github.com/CodeEditorLand/Sky) UI through
[Wind](https://github.com/CodeEditorLand/Wind) services to the [Mountain](https://github.com/CodeEditorLand/Mountain) backend and back.

<img src="/Mermaid/f2360069a9a6dc03.svg" alt="Mermaid diagram" />

### Startup Sequence

1. Tauri loads the webview pointing at Sky's built output.
2. The page route reads environment variables and selects a workbench variant.
3. [Wind](https://github.com/CodeEditorLand/Wind)'s [`Preload.ts`](https://github.com/CodeEditorLand/Wind/tree/Current/Source/Preload.ts) shims `window.vscode` globals before VSCode code runs.
4. [Wind](https://github.com/CodeEditorLand/Wind) bootstraps the [Effect-TS](https://effect.website) service layer and establishes Tauri IPC.
5. [Sky](https://github.com/CodeEditorLand/Sky) components subscribe to [Wind](https://github.com/CodeEditorLand/Wind) services for live state updates.
6. [Sky](https://github.com/CodeEditorLand/Sky) listens for Tauri events from [Mountain](https://github.com/CodeEditorLand/Mountain) (`sky://terminal/data`,
   `sky://scm/update-group`, `sky://configuration/changed`) to update UI.

---

## Integration Points

| Connecting Element                                         | Direction     | Mechanism          | Description                                                                                                                                                              |
| :--------------------------------------------------------- | :------------ | :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Wind](https://github.com/CodeEditorLand/Wind)**         | Inbound       | Direct import      | [Sky](https://github.com/CodeEditorLand/Sky) consumes [Wind](https://github.com/CodeEditorLand/Wind) [Effect-TS](https://effect.website) services for all business logic |
| **[Mountain](https://github.com/CodeEditorLand/Mountain)** | Bidirectional | Tauri IPC + Events | Commands sent via Tauri invoke; updates received as Tauri events                                                                                                         |
| **[Output](https://github.com/CodeEditorLand/Output)**     | Inbound       | Static bundle      | VSCode core UI components loaded from [`@codeeditorland/output`](https://github.com/CodeEditorLand/Output)                                                               |
| **[Worker](https://github.com/CodeEditorLand/Worker)**     | Inbound       | Web Worker API     | Web workers for background processing imported from [`@codeeditorland/worker`](https://github.com/CodeEditorLand/Worker)                                                 |

---

## Configuration

| Variable       | Default      | Description                                                   |
| :------------- | :----------- | :------------------------------------------------------------ |
| `Mountain`     | unset        | Set to `true` to load the A2 Mountain workbench (recommended) |
| `Electron`     | unset        | Set to `true` to load the A3 Electron workbench               |
| `BrowserProxy` | unset        | Set to `true` to load the A1 BrowserProxy workbench           |
| `Browser`      | unset        | Set to `true` to load the A1 Browser workbench                |
| `NODE_ENV`     | `production` | Controls source map generation and debug output               |

When no variant flag is set, [`index.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/pages/index.astro) loads [`Workbench/Default.astro`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Workbench/Default.astro). The
recommended deployment always sets `Mountain=true`.

**Astro configuration** ([`astro.config.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/astro.config.ts)) resolves [Wind](https://github.com/CodeEditorLand/Wind) and other
`@codeeditorland/*` packages through Vite aliases, sets [`Source/`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/) as the content
root, and directs build output to [`Target/`](https://github.com/CodeEditorLand/Sky/tree/Current/Target/).

---

## Related Documentation

- [Sky overview](/Doc/sky)
- [Wind Deep Dive](/Doc/deep-dive-wind)
- [Mountain Deep Dive](/Doc/deep-dive-mountain)
- [Output pipeline](/Doc/output)
