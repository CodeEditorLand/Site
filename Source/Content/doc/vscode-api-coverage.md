---
title: "VS Code API Coverage"
section: "Reference"
order: 0
description:
    "Authoritative map of every top-level vscode.* API namespace and its
    implementation status across Sky, Cocoon, and Mountain."
---

Land implements the VS Code extension API across three elements: **Sky** (the
Monaco-based workbench renderer), **Cocoon** (the Node.js extension-host
sidecar), and **Mountain** (the Rust backend). The dual-track strategy assigns
each API operation to the implementation layer that best balances compatibility
and performance. Overall weighted coverage stands at approximately **88%** as of
the current build, with TextEditor at 95%, Workspace at 96%, SCM at 95%, Window
at 95%, and LSP/Language at 95%.

## Legend

### Implementation tracks

| Track | Meaning                                                                |
| ----- | ---------------------------------------------------------------------- |
| **A** | Stock-Node - lift unchanged `extHost*.ts` into Cocoon                  |
| **B** | Rust-native - Mountain owns backend, gRPC from Cocoon via `Vine.proto` |
| **C** | Cocoon-bespoke - hand-rolled TypeScript in Land (last resort)          |
| **S** | Sky-direct - call via `__CEL_SERVICES__.*` workbench service accessor  |

### Status symbols

| Symbol | Meaning                                                                   |
| ------ | ------------------------------------------------------------------------- |
| ✅     | Working end-to-end (activation and feature render path confirmed)         |
| 🟡     | Partial - RPC wired but UI render gap, or one or more sub-methods missing |
| 🔴     | Stubbed / dropped-on-floor - registration accepted, no effect             |
| ⚪     | Not yet attempted                                                         |
| 🟢     | Pure-function lift (stateless, no RPC) already landed via `StockLift.ts`  |

## Overall coverage summary

| Namespace                   | Coverage | Primary blocker                                |
| --------------------------- | -------- | ---------------------------------------------- |
| `vscode.commands`           | ~100%    | -                                              |
| `vscode.window`             | ~95%     | webview panels stubbed                         |
| `vscode.workspace`          | ~96%     | `createFileSystemWatcher` stub                 |
| `vscode.languages`          | ~95%     | providers wired, render gaps                   |
| `vscode.debug`              | ~30%     | `startDebugging` missing                       |
| `vscode.tasks`              | ~20%     | `executeTask` missing                          |
| `vscode.scm`                | ~95%     | ISCMService viewlet route deferred             |
| `vscode.env`                | ~90%     | `isAppPortable`, `asExternalUri` not attempted |
| `vscode.extensions`         | ~100%    | -                                              |
| `vscode.authentication`     | ~60%     | no real OAuth backend                          |
| `vscode.notebooks`          | ~10%     | large surface, low priority                    |
| `vscode.tests`              | ~20%     | run profile not implemented                    |
| `vscode.chat` / `vscode.lm` | ~0%      | not attempted                                  |
| `vscode.l10n`               | ~100%    | -                                              |
| `vscode.comments`           | ~0%      | not attempted                                  |

## Namespace tables

### `vscode.commands`

| Operation                   | Track | Status | Mountain channel   | Sky surface                                        |
| --------------------------- | ----- | ------ | ------------------ | -------------------------------------------------- |
| `registerCommand`           | A+S   | ✅     | `commands` channel | `__CEL_SERVICES__.CommandRegistry.registerCommand` |
| `registerTextEditorCommand` | A     | ✅     | -                  | -                                                  |
| `executeCommand`            | A+S   | ✅     | `commands:execute` | `__CEL_SERVICES__.Commands.executeCommand`         |
| `getCommands`               | A     | ✅     | -                  | -                                                  |

### `vscode.window` - Editors

| Operation                     | Track | Status | Mountain channel                     | Sky surface                              |
| ----------------------------- | ----- | ------ | ------------------------------------ | ---------------------------------------- |
| `activeTextEditor`            | A     | ✅     | -                                    | `IEditorService.activeTextEditorControl` |
| `visibleTextEditors`          | A     | ✅     | -                                    | -                                        |
| `showTextDocument`            | A     | ✅     | `sky://window/showTextDocument` emit | `vscode.open` command dispatch           |
| `onDidChangeActiveTextEditor` | A     | ✅     | -                                    | -                                        |

### `vscode.window` - Surfaces

| Operation                                                            | Track | Status | Mountain channel                                           | Sky surface                                          |
| -------------------------------------------------------------------- | ----- | ------ | ---------------------------------------------------------- | ---------------------------------------------------- |
| `createStatusBarItem`                                                | S     | ✅     | `sky://statusbar/{update,dispose,set-entry}`               | `__CEL_SERVICES__.Statusbar.addEntry`                |
| `setStatusBarMessage`                                                | S     | ✅     | `sky://statusbar/set-message`                              | CustomEvent fan-out                                  |
| `createTreeView`                                                     | A+S   | ✅     | `tree.register` + `tree:getChildren` + `sky://tree-view/*` | `__CEL_SERVICES__.TreeViewByViewId(id).dataProvider` |
| `registerTreeDataProvider`                                           | A+S   | ✅     | `$provideTreeChildren` gRPC                                | dataProvider attached to native `ITreeView`          |
| `createWebviewPanel`                                                 | A     | 🔴     | -                                                          | stub channel `webview`                               |
| `registerWebviewViewProvider`                                        | A     | 🔴     | -                                                          | -                                                    |
| `registerCustomEditorProvider`                                       | A     | 🔴     | -                                                          | -                                                    |
| `createTerminal`                                                     | B     | 🟡     | `terminal:create` / PTY via `portable-pty`                 | workbench terminal panel                             |
| `onDidOpen/CloseTerminal`                                            | B     | 🟡     | `sky://terminal/{opened,closed}`                           | -                                                    |
| `createOutputChannel`                                                | S     | ✅     | `sky://output/{create,append,clear,dispose}`               | local mirror + workbench output panel                |
| `showInformationMessage` / `showWarningMessage` / `showErrorMessage` | A     | ✅     | `sky://ui/show-message-request`                            | DOM toast fallback                                   |
| `showQuickPick` / `createQuickPick`                                  | A     | 🟡     | `sky://ui/show-quickpick-request`                          | workbench quick-input                                |
| `showInputBox`                                                       | A     | 🟡     | -                                                          | -                                                    |
| `showOpenDialog` / `showSaveDialog`                                  | B     | ✅     | `nativeHost:showOpenDialog` / `showSaveDialog` (Tauri)     | -                                                    |
| `showWorkspaceFolderPick`                                            | A     | ⚪     | -                                                          | -                                                    |
| `withProgress`                                                       | A+S   | 🟡     | `sky://progress/{start,update,complete}`                   | DOM toast + workbench progress                       |
| `registerFileDecorationProvider`                                     | A     | 🟡     | -                                                          | -                                                    |
| `registerUriHandler`                                                 | A     | 🟡     | `register_uri_handler` notif-drop                          | -                                                    |
| `onDidChangeWindowState`                                             | A     | ✅     | -                                                          | -                                                    |
| `showNotebookDocument`                                               | A     | 🔴     | -                                                          | -                                                    |

### `vscode.workspace`

| Operation                                                                                                 | Track | Status | Mountain channel                                     | Notes                          |
| --------------------------------------------------------------------------------------------------------- | ----- | ------ | ---------------------------------------------------- | ------------------------------ |
| `workspaceFolders`                                                                                        | A     | ✅     | seeded via `InitializationData.FoldersWire`          | -                              |
| `onDidChangeWorkspaceFolders`                                                                             | A     | ✅     | `sky://workspace/foldersChanged`                     | -                              |
| `getWorkspaceFolder`                                                                                      | A+B   | ✅     | -                                                    | -                              |
| `textDocuments`                                                                                           | A     | ✅     | `sky://lifecycle/synchronizeDocuments`               | -                              |
| `openTextDocument`                                                                                        | A+B   | ✅     | `file:read` gRPC                                     | -                              |
| `onDidOpen/Close/SaveTextDocument`                                                                        | A     | ✅     | -                                                    | -                              |
| `onWillSaveTextDocument`                                                                                  | A     | 🟡     | `$participateInSave` gRPC                            | -                              |
| `applyEdit`                                                                                               | A+S   | 🟡     | `sky://workspace/applyEdit`                          | -                              |
| `save` / `saveAs`                                                                                         | A     | ⚪     | -                                                    | -                              |
| `fs.readFile` / `writeFile` / `stat` / `readDirectory` / `createDirectory` / `delete` / `rename` / `copy` | B     | ✅     | `file:*` gRPC                                        | -                              |
| `fs.isWritableFileSystem`                                                                                 | A     | ✅     | -                                                    | -                              |
| `registerFileSystemProvider`                                                                              | A     | 🟡     | `register_file_system_provider` notif-drop           | -                              |
| `createFileSystemWatcher`                                                                                 | B     | 🟡     | stub (`notify` crate planned)                        | `FileWatcher=Stub`             |
| `findFiles`                                                                                               | B     | ✅     | `search:findFiles` (globset)                         | -                              |
| `findTextInFiles`                                                                                         | B     | ✅     | `search:findInFiles`                                 | -                              |
| `registerTextDocumentContentProvider`                                                                     | A     | 🟡     | `register_text_document_content_provider` notif-drop | -                              |
| `getConfiguration` / `onDidChangeConfiguration`                                                           | A+B   | ✅     | `Configuration` cache                                | `IConfigurationService` in Sky |
| `registerTaskProvider`                                                                                    | A     | 🟡     | `register_task_provider` notif-drop                  | -                              |

### `vscode.languages`

| Operation                                | Track   | Status | Mountain channel                                            |
| ---------------------------------------- | ------- | ------ | ----------------------------------------------------------- |
| `registerCompletionItemProvider`         | A       | 🟡     | `register_completion_item_provider` + `GetCompletions` gRPC |
| `registerHoverProvider`                  | A       | 🟡     | `register_hover_provider` + `GetHoverAtPosition` gRPC       |
| `registerDefinitionProvider`             | A       | 🟡     | `register_definition_provider` + `GetDefinition` gRPC       |
| `registerReferenceProvider`              | A       | 🟡     | `register_reference_provider` + `GetReferences` gRPC        |
| `registerDocumentSymbolProvider`         | A       | 🟡     | `GetDocumentSymbols` gRPC                                   |
| `registerCodeActionsProvider`            | A       | 🟡     | `register_code_actions_provider`                            |
| `registerCodeLensProvider`               | A       | 🟡     | `register_code_lens_provider`                               |
| `registerDocumentFormattingEditProvider` | A       | 🟡     | `register_document_formatting_provider`                     |
| `registerRenameProvider`                 | A       | 🟡     | `register_rename_provider`                                  |
| `registerInlayHintsProvider`             | A       | 🟡     | `register_inlay_hints_provider`                             |
| `registerFoldingRangeProvider`           | A       | 🟡     | `register_folding_range_provider`                           |
| `registerSemanticTokensProvider`         | A       | 🟡     | `register_semantic_tokens_provider`                         |
| `registerSignatureHelpProvider`          | A       | 🟡     | `register_signature_help_provider`                          |
| `setTextDocumentLanguage`                | A+S     | ✅     | `sky://languages/setDocumentLanguage`                       |
| `setLanguageConfiguration`               | A+S     | ✅     | `sky://language/configure`                                  |
| `createDiagnosticCollection`             | A+S     | ✅     | `sky://diagnostics/changed`                                 |
| `match`                                  | 🟢 pure | ✅     | -                                                           |

### `vscode.debug`

| Operation                                         | Track | Status | Mountain channel                        |
| ------------------------------------------------- | ----- | ------ | --------------------------------------- |
| `registerDebugConfigurationProvider`              | A     | 🟡     | `register_debug_configuration_provider` |
| `registerDebugAdapterDescriptorFactory`           | A     | 🟡     | `register_debug_adapter` notif-drop     |
| `registerDebugAdapterTrackerFactory`              | A     | 🟡     | -                                       |
| `startDebugging`                                  | A+B   | 🔴     | `debug:start` handler missing           |
| `activeDebugSession` / `onDidStart/ChangeSession` | A     | 🔴     | `sky://debug/session-*`                 |
| `addBreakpoints` / `removeBreakpoints`            | A     | 🔴     | -                                       |
| `activeStackItem`                                 | A     | ⚪     | -                                       |

### `vscode.tasks`

| Operation                                            | Track | Status | Notes                                        |
| ---------------------------------------------------- | ----- | ------ | -------------------------------------------- |
| `registerTaskProvider`                               | A     | 🟡     | `register_task_provider` notif-drop          |
| `fetchTasks`                                         | A     | 🔴     | -                                            |
| `executeTask`                                        | A+B   | 🔴     | needs `tasks:execute` (PTY or child_process) |
| `taskExecutions` / `onDidStartTask` / `onDidEndTask` | A     | 🔴     | -                                            |

### `vscode.scm`

| Operation                           | Track | Status | Notes                                                                     |
| ----------------------------------- | ----- | ------ | ------------------------------------------------------------------------- |
| `createSourceControl`               | A+S   | 🟡     | `register_scm_provider` + `sky://scm/register`; needs `ISCMService` route |
| `inputBox.value` read/write         | A     | 🟡     | round-trip via `ResolveUIRequest`                                         |
| `$gitExec` (built-in git extension) | B     | ✅     | `localGit` channel; Mountain spawns `git` subprocess                      |

### `vscode.env`

| Operation                                                                                                  | Track | Status | Notes                                                   |
| ---------------------------------------------------------------------------------------------------------- | ----- | ------ | ------------------------------------------------------- |
| `appName` / `appRoot` / `uriScheme` / `language` / `shell` / `machineId` / `sessionId` / `isNewAppInstall` | A     | ✅     | seeded in `InitializationData`                          |
| `isAppPortable`                                                                                            | A     | ⚪     | -                                                       |
| `clipboard.readText` / `writeText`                                                                         | B     | ✅     | `nativeHost:readClipboard` / `writeClipboard` via Tauri |
| `openExternal`                                                                                             | B     | ✅     | `native:openExternal` via Tauri `shell.open`            |
| `asExternalUri`                                                                                            | A     | ⚪     | -                                                       |
| `remoteName` / `remoteAuthority`                                                                           | A     | ✅     | always `undefined` (local-only build)                   |

### `vscode.extensions`

| Operation          | Track | Status | Mountain channel          |
| ------------------ | ----- | ------ | ------------------------- |
| `getExtension(id)` | A     | ✅     | `extensions:get`          |
| `all`              | A     | ✅     | `extensions:getInstalled` |
| `onDidChange`      | A     | ✅     | `$deltaExtensions` gRPC   |

### `vscode.authentication`

| Operation                        | Track | Status | Notes                              |
| -------------------------------- | ----- | ------ | ---------------------------------- |
| `registerAuthenticationProvider` | A     | 🟡     | `register_authentication_provider` |
| `getSession`                     | A     | 🟡     | `$getSession` gRPC                 |
| `getAccounts`                    | A     | 🟡     | -                                  |

> [!WARNING] There is no real OAuth backend. `getSession` will call registered
> providers but no built-in GitHub/Microsoft auth flow exists. Extensions that
> require authentication (Copilot, GitHub Pull Requests) will prompt for
> credentials but cannot complete the exchange.

### `vscode.notebooks`

| Operation                                   | Track | Status | Notes                                     |
| ------------------------------------------- | ----- | ------ | ----------------------------------------- |
| `createNotebookController`                  | A     | 🔴     | -                                         |
| `registerNotebookCellStatusBarItemProvider` | A     | 🔴     | -                                         |
| `registerNotebookSerializer`                | A     | 🟡     | `register_notebook_serializer` notif-drop |

### `vscode.tests`

| Operation                 | Track | Status | Notes                         |
| ------------------------- | ----- | ------ | ----------------------------- |
| `createTestController`    | A     | 🟡     | `sky://tests/registered` emit |
| Run profile / run request | A     | 🔴     | -                             |

### `vscode.chat` and `vscode.lm`

| Operation                           | Track | Status | Notes |
| ----------------------------------- | ----- | ------ | ----- |
| `createChatParticipant`             | A     | 🔴     | -     |
| `registerLanguageModelChatProvider` | A     | ⚪     | -     |
| `selectChatModels`                  | A     | 🔴     | -     |

### `vscode.l10n`

| Operation         | Track   | Status | Notes                                        |
| ----------------- | ------- | ------ | -------------------------------------------- |
| `t(message, ...)` | 🟢 pure | ✅     | StockLift-able from `vs/base/common/l10n.ts` |
| `bundle` / `uri`  | A       | ✅     | NLS bundle loaded at extension scan time     |

### `vscode.comments`

| Operation                 | Track | Status | Notes         |
| ------------------------- | ----- | ------ | ------------- |
| `createCommentController` | A     | 🔴     | not attempted |

## Gap register

The following items are the highest-priority unimplemented gaps, ordered by the
number of extensions they block.

| Gap                                                                 | Impact                                                        | Status  |
| ------------------------------------------------------------------- | ------------------------------------------------------------- | ------- |
| `vscode.debug.*` end-to-end (startDebugging, sessions, breakpoints) | Blocks every language debugger                                | 🔴      |
| `vscode.tasks.executeTask`                                          | Blocks Jake / Gulp / Grunt / npm task providers               | 🔴      |
| `vscode.window.createWebviewPanel`                                  | Blocks GitLens graph panel, Copilot chat, markdown preview    | 🔴      |
| `createFileSystemWatcher` (`notify` crate)                          | Extensions that watch for changes wait forever                | 🟡 stub |
| `vscode.scm` viewlet route into `ISCMService`                       | Extensions register providers but the SCM viewlet stays empty | 🟡      |
| `vscode.authentication` real OAuth                                  | Copilot and GitHub PR extension cannot complete auth          | 🟡      |
| `vscode.tasks.fetchTasks`                                           | Task runner discovery broken                                  | 🔴      |
| `vscode.chat` / `vscode.lm`                                         | AI-native extensions cannot register participants or models   | 🔴      |

## Track-B bring-up pattern

When promoting an operation from Track A (stock Node) to Track B (Rust-native),
the steps are:

1. Add the gRPC method to `Mountain/Proto/Vine.proto` (the Vine submodule).
2. Implement the Rust handler under
   `Mountain/Source/IPC/WindServiceHandlers/<Domain>/<Method>.rs` - one file per
   method.
3. In Cocoon's `<Namespace>Route.ts`, add a tier layer that selects Mountain for
   that operation.
4. In Cocoon's `<Namespace>.ts` shim, call
   `MountainClient.sendRequest(method, args)` behind the tier guard.

## Verification

After wiring a new namespace:

- `LAND_DEV_LOG=dual-track` confirms the route decision per operation in the
  console.
- Run with `LAND_DEV_LOG=short,provider-register`, exercise the feature from the
  UI, and grep for `Activation failed` (must be zero) and
  `$<method> (no handler)` (must be zero).
