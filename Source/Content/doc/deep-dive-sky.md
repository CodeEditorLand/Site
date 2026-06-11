---
title: "Sky - Deep Dive"
section: "Deep Dive"
order: 11
description:
    "Full Bridge module inventory (17 modules), sky:// event catalog, OSC 633
    terminal integration, workbench variant selection, and manualChunks
    code-split configuration for the Sky UI layer."
---

Sky is the Astro-based UI layer that runs inside the Tauri webview. This page
covers the internal mechanics of SkyBridge, the workbench variant selection
logic, the Vite/Rollup build configuration, the full `sky://` event catalog, and
OSC 633 terminal shell integration. For an overview, see the
[Sky element page](https://Editor.Land/Doc/sky).

## SkyBridge Module Breakdown

SkyBridge is installed once per webview lifetime from
`Source/Function/Sky/Bridge.ts`. The top-level `installBridge()` function calls
each of the 17 domain submodules in sequence. Reentrancy is guarded by a
module-level flag so duplicate calls during HMR or Tauri window reloads are
silently ignored.

Mountain is used as a relay for Cocoon-to-Sky communication: Sky emits a
`sky://` Tauri event, Mountain re-emits it as a gRPC notification to Cocoon.
This keeps the webview renderer and the extension host decoupled without a
separate transport layer.

### Bridge Module Inventory

| Module                          | Registered channels and responsibility                                                                                                                                                                      |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `InstallCommands.ts`            | `sky://command/execute`, `sky://command/register`, `sky://command/unregister`                                                                                                                               |
| `InstallDebug.ts`               | `sky://debug/sessionStart`, `sky://debug/sessionEnd`, `sky://debug/consoleAppend`, `sky://debug/dap-message`, `sky://debug/addBreakpoints` to `IDebugService.addBreakpoints()`, `sky://debug/removeBreakpoints`, `sky://customEditor/saved` |
| `InstallDeadChannelListeners.ts`| No-op stubs for deprecated or not-yet-implemented channels                                                                                                                                                  |
| `InstallDiagnostics.ts`         | Diagnostic and smoke-test channels                                                                                                                                                                          |
| `InstallEditorAndOutput.ts`     | `sky://workspace/applyEdit`, `sky://workspace/save`, `sky://workspace/saveAll`, `sky://workspace/saveAs`; output channel create/append/replace/clear/show/reveal/dispose                                     |
| `InstallEditorOperations.ts`    | Monaco `onDidChangeModelContent` debounced 300 ms to `sky:model:contentChanged` to Mountain to Cocoon `onDidChangeTextDocument`; `sky://editor/apply-text-edits` handles both VS Code 0-based and Monaco 1-based ranges |
| `InstallFanOut.ts`              | Multi-subscriber fan-out dispatcher for high-frequency events                                                                                                                                               |
| `InstallInlineCompletions.ts`   | Registers `ILanguageFeaturesService.inlineCompletionsProvider` with a wildcard selector; on trigger, calls `language:provideInlineCompletions` IPC to Mountain's `ProvideInlineCompletionItems` gRPC handler to Cocoon registered providers |
| `InstallProgressTerminalWorkspace.ts` | `sky://progress/*`, `sky://terminal/*`, `sky://workspace/*` channels                                                                                                                               |
| `InstallScm.ts`                 | `sky://scm/register` with 10 x 200 ms retry for `__CEL_SERVICES__.SCM` population race; `sky://scm/provider/changed` updates workbench input model value                                                    |
| `InstallSearch.ts`              | `sky://search/*` workspace search result channels                                                                                                                                                           |
| `InstallSimpleRelays.ts`        | Pure DOM-event re-dispatchers for `cel:*` consumer subscriptions; `sky://language/configure` calls `monaco.languages.setLanguageConfiguration()` directly                                                   |
| `InstallStatusbar.ts`           | `sky://statusbar/update`, `sky://statusbar/dispose`, `sky://statusbar/set-message`                                                                                                                          |
| `InstallTasksAndDecorations.ts` | Task and file-decoration event relay channels                                                                                                                                                               |
| `InstallTreeView.ts`            | Tree-view `onDidChangeSelection`, `onDidCollapse`, `onDidExpand` CustomEvent forwarding; `sky://tree-view/reveal` calls `IViewsService.openView()`                                                          |
| `InstallUiRequests.ts`          | `sky://ui/show-message-request`, QuickPick and InputBox round-trips via `IQuickInputService`                                                                                                                |
| `InstallWebview.ts`             | `sky://webview/message`, `sky://webview/dispose`                                                                                                                                                            |

### installEditorAndOutput

Handles all editor-surface events and workspace-level document operations.

Key handlers:

- `sky://editor/openDocument` - calls
  `vscode.commands.executeCommand("vscode.open", uri)` to open a file in the
  active editor group.
- `sky://workspace/applyEdit` - decodes a serialized `WorkspaceEdit` and
  dispatches it. Handles `_type:2` text edits and `_type:1` file operations.
  Tries `IBulkEditService` first, then falls back to direct Monaco model edits.
  Understands both VS Code 0-based ranges (`_start._line`) and Monaco 1-based
  ranges (`startLineNumber`).
- `sky://workspace/save`, `sky://workspace/saveAll`, `sky://workspace/saveAs` -
  round-trip save requests back through Mountain.
- `sky://output/create`, `sky://output/append`, `sky://output/replace`,
  `sky://output/clear`, `sky://output/show`, `sky://output/reveal`,
  `sky://output/dispose` - manage named output channels via `IOutputService`.

### installEditorOperations

Handles Monaco model content synchronization and text-edit application.

Key handlers:

- `sky:model:contentChanged` - receives debounced (300 ms) model content change
  events from Sky's Monaco `onDidChangeModelContent` listener. Dispatches
  `$acceptModelChanged` to Cocoon's notification handler so
  `vscode.workspace.onDidChangeTextDocument` fires in extensions.
- `sky://editor/apply-text-edits` - applies an array of text edits to a Monaco
  model. Handles both VS Code 0-based range format and Monaco 1-based range
  format in the same handler.

### installScm

Manages source control provider registration and UI state.

Key handlers:

- `sky://scm/register` - registers a new SCM provider with `ISCMService`.
  Retries up to 10 times at 200 ms intervals to handle the `__CEL_SERVICES__.SCM`
  population race that occurs when the workbench initializes SCM after the first
  extension activation.
- `sky://scm/provider/added`, `sky://scm/provider/changed`,
  `sky://scm/provider/removed` - update workbench SCM provider list.
- `sky://scm/provider/changed` - updates the workbench's input model value when
  Cocoon calls the `inputBox.value` setter.

### installTreeView

Manages tree view lifecycle and interaction events.

Key handlers:

- `sky://tree-view/create` - registers a new tree view with `IViewsService`.
- `sky://tree-view/refresh` - calls `ITreeView.refresh()` on the named view.
- `sky://tree-view/reveal` - calls `IViewsService.openView()` to make the named
  view visible, then calls `reveal()` on the element.
- `sky://tree-view/selection-changed`, `sky://tree-view/node-expanded`,
  `sky://tree-view/node-collapsed` - forwarded as `CustomEvent` dispatches so
  per-view EventEmitters in Cocoon fire `onDidChangeSelection`,
  `onDidExpandElement`, and `onDidCollapseElement`.
- `sky://tree-view/set-badge`, `sky://tree-view/set-message`,
  `sky://tree-view/set-title` - update tree view chrome via `ITreeView` setters.

### installDebug

Handles debug session lifecycle and breakpoint state.

Key handlers:

- `sky://debug/register` - registers a debug configuration provider.
- `sky://debug/start` - starts a debug session via `IDebugService.startDebugging()`.
- `sky://debug/stop` - stops the active debug session.
- `sky://debug/addBreakpoints` - calls `IDebugService.addBreakpoints()` to sync
  breakpoints set in the gutter.

### installUiRequests

Handles all user-facing dialog and notification round-trips.

Key handlers:

- `sky://notification/show` - uses `INotificationService` for toasts. When
  action buttons are present, routes through `IQuickInputService` to capture the
  selected action and return it to the caller.
- `sky://ui/show-quick-pick` - calls `IQuickInputService.createQuickPick()`,
  populates items, shows the picker, and resolves the caller's promise on
  `onDidAccept`.
- `sky://ui/show-input-box` - calls `IQuickInputService.createInputBox()`,
  applies validation, and resolves on accept.
- `sky://notification/progress-begin`, `sky://notification/progress-update`,
  `sky://notification/progress-end` - manage `IProgressService` long-running
  operation indicators.

### installSimpleRelays

One-to-one relays from Mountain events to workbench API calls.

Key handlers:

- `sky://language/configure` - calls
  `monaco.languages.setLanguageConfiguration()` directly and also dispatches a
  DOM relay for any remaining workbench listeners.
- `sky://configuration/changed` - calls `IConfigurationService` change
  notification.
- `sky://theme/changed` - calls `IThemeService` to apply the new color theme.

### installInlineCompletions

Handles inline completion (ghost text) provider registration and results.

Key handlers:

- `sky://inline-completions/register` - calls
  `ILanguageFeaturesService.inlineCompletionsProvider.register()` with a
  wildcard selector to wire a Cocoon-backed inline completion provider into
  Monaco.
- `sky://inline-completions/provide` - delivers inline completion items from
  Cocoon back to the registered provider's pending request.

## sky:model:contentChanged Pipeline

Monaco model content changes need to reach Cocoon's `onDidChangeTextDocument`
without going through Tauri IPC for every keystroke. The pipeline debounces at
300 ms to batch rapid edits:

```
Monaco onDidChangeModelContent (Sky)
  → 300 ms debounce
  → tauri::emit("sky:model:contentChanged", { uri, version, changes })
  → Mountain mod.rs "sky:model:contentChanged" arm
  → ModelUpdateContent.rs applies to Mountain's text model cache
  → Mountain emits Cocoon gRPC $acceptModelChanged notification
  → Cocoon NotificationHandler fires onDidChangeTextDocument EventEmitter
  → Extensions receive vscode.workspace.onDidChangeTextDocument
```

This path avoids a round-trip through the Tauri invoke queue for each character
and keeps Mountain's text model cache consistent with the Monaco editor state.

## sky://workspace/applyEdit WorkspaceEdit Handling

VS Code's `WorkspaceEdit` arrives from Cocoon serialized as a JSON object. The
format uses private VS Code fields (`_edits`, `_type`, `_range._start._line`,
`_scheme`, `_path`) that are not part of the public API.
`InstallEditorAndOutput.ts` handles the deserialization:

- `_type: 2` entries are text edits. Range fields use `_start._line` (0-based)
  and are converted to Monaco's 1-based format before calling `model.applyEdits()`.
- `_type: 1` entries are file operations (create, rename, delete). These are
  forwarded to `IBulkEditService.apply()`.
- URI fields arrive as `{ _scheme, _authority, _path, _query, _fragment }`
  objects and are reconstructed with `URI.from()`.

The handler tries `IBulkEditService` first for the complete edit. If the service
is unavailable (not yet registered at boot time), it falls back to applying each
text edit directly to the matching Monaco model.

## Workbench Variant Selection Logic

`Source/pages/index.astro` reads environment variables at Astro build time and
emits a single conditional dynamic import. Vite sees a static import for exactly
one variant and tree-shakes the rest:

```
Mountain=true     → import("../Workbench/Electron/Layout.astro")    [A2 path]
Electron=true     → import("../Workbench/Electron/Layout.astro")    [A3 path]
BrowserProxy=true → import("../Workbench/BrowserProxy/Layout.astro")
Bundle=true + Pack matches → import("../Workbench/Bundled/<Variant>/Entry.ts")
(default)         → import("../Workbench/Browser.astro")
```

Each variant's `Layout.astro` sequences its script tags to guarantee that Wind's
`Preload.ts` globals are available before the VS Code workbench bundle executes.
The A3 Electron variant additionally loads `Polyfills.ts` between Preload and
the workbench to fill WKWebView gaps.

## Astro manualChunks Configuration (S1 Code-Split)

The `astro.config.ts` Vite configuration uses
`build.rollupOptions.output.manualChunks` to split Sky's own module graph into
four named chunks. For non-bundled profiles (`debug-electron` and similar) the
VS Code `vs/**` tree is entirely external, so without this split the remaining
Sky modules would concatenate into one large chunk.

| Chunk name        | Contents                                                     |
| ----------------- | ------------------------------------------------------------ |
| `effect-rt`       | Effect-TS runtime (~800 KB, changes rarely)                  |
| `wind-effect-gen` | Wind's codegen Effect layer (large, stable, cache-friendly)  |
| `sky-telemetry`   | PostHog and OTLP bridge (never on the synchronous paint path)|
| `sky-debug`       | SmokeTest and diagnostic harness (debug builds only)         |

The browser preloader can fetch these chunks in parallel and V8 can parse them
on separate threads, which reduces first-paint timing.

The bundled profiles (`Pack=electron` and similar) must not use `manualChunks`
because the workbench loader's auto-split boundary (`workbench.js` to
`workbench.desktop.main.js`) is required for correct initialization order.

In development builds (`NODE_ENV=development`), `astro.config.ts` sets
`sourcemap: "inline"` so the browser profiler and DevTools can resolve Sky
source locations within the bundled output. Production builds disable sourcemaps
to avoid shipping artifacts that are three times the bundle size.

## Terminal Shell Integration (OSC 633)

Sky's terminal component parses OSC 633 escape sequences emitted by
shell-integration scripts. These sequences mark command boundaries and execution
state so the terminal can decorate prompts and provide command-aware navigation.

| Sequence    | Meaning                              | Action                                                  |
| ----------- | ------------------------------------ | ------------------------------------------------------- |
| `OSC 633;A` | Prompt start                         | Marks the start of a shell prompt line                  |
| `OSC 633;B` | Prompt end / command start           | Marks where the user's input begins                     |
| `OSC 633;C` | Command executed                     | Shell has accepted and started a command                |
| `OSC 633;D` | Command finished (optional exitcode) | Command completed; emits `sky://terminal/shell-executed` |
| `OSC 633;E` | Explicit command line value          | Provides the verbatim command text                      |

When `OSC 633;D` is received, Sky emits a `sky://terminal/shell-executed` event
through Mountain to Cocoon. This fires
`vscode.window.onDidEndTerminalShellExecution` for extensions that watch
terminal activity, and populates the terminal's command history for
shell-aware scrollback navigation.

## sky:// Event Catalog

The full `sky://` event URI registry is kept in lockstep between
`Wind/Source/IPC/Channel.ts` and `Mountain/Source/IPC/Channel.rs`:

| Domain             | Events                                                                                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Editor             | `openDocument`, `applyEdits`, `saveAll`, `activeChanged`, `apply-text-edits`                                                                                |
| Workspace          | `applyEdit`, `save`, `saveAll`, `saveAs`                                                                                                                    |
| Output             | `create`, `append`, `replace`, `clear`, `show`, `reveal`, `dispose`                                                                                         |
| Terminal           | `create`, `data`, `resize`, `processId`, `show`, `hide`, `closed`, `opened`, `exit`, `shell-executed`                                                       |
| Tree view          | `create`, `refresh`, `node-expanded`, `node-collapsed`, `selection-changed`, `reveal`, `restore-state`, `set-badge`, `set-message`, `set-title`, `dispose`  |
| Status bar         | `create`, `set-entry`, `set-message`, `update`, `dispose`, `dispose-entry`, `dispose-message`                                                               |
| Webview            | `create`, `created`, `set-html`, `post-message`, `message`, `options-changed`, `dispose`, `disposed`, `revealed`                                            |
| Notification       | `show`, `progress-begin`, `progress-update`, `progress-end`                                                                                                 |
| SCM                | `register`, `provider/added`, `provider/changed`, `provider/removed`, `group/changed`, `updateGroup`                                                        |
| Debug              | `register`, `start`, `stop`, `addBreakpoints`, `sessionStart`, `sessionEnd`, `consoleAppend`, `dap-message`, `removeBreakpoints`                            |
| Inline completions | `register`, `provide`                                                                                                                                       |
| Documents          | `opened`, `closed`, `changed`, `saved`                                                                                                                      |
| Diagnostics        | `update`, `clear`                                                                                                                                           |
| Configuration      | `changed`                                                                                                                                                   |
| Language           | `configure`                                                                                                                                                 |
| Lifecycle          | `phase-changed`                                                                                                                                             |
| Theme              | `changed`                                                                                                                                                   |
| Commands           | `executed`                                                                                                                                                  |
| Model              | `contentChanged`                                                                                                                                            |

## Related Documentation

- [Sky overview](https://Editor.Land/Doc/sky)
- [Wind Deep Dive](https://Editor.Land/Doc/deep-dive-wind)
- [Mountain Deep Dive](https://Editor.Land/Doc/deep-dive-mountain)
- [Output pipeline](https://Editor.Land/Doc/output)
