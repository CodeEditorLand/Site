---
title: "VS Code API Coverage"
section: "Reference"
order: 8
description:
    "Map of vscode.* API surfaces across Sky, Cocoon, and Mountain with
    implementation status."
---

# VS Code API Coverage

Authoritative map of every top-level `vscode.*` API surface and its
implementation split across **Sky** (workbench renderer), **Cocoon**
(extension-host Node sidecar), and **Mountain** (Rust backend).

---

## Dual-Track Strategy

- **Track A - Stock-Node**: Cocoon loads stock VS Code `extHost*.ts` sources
  unchanged. The workbench's `mainThread*.ts` runs inside Sky. The
  ExtHostContext/MainContext RPC glue is provided by Cocoon's shim alongside
  stock extHost code. Maximum compatibility from day one for any API the stock
  implementation handles in-process.

- **Track B - Rust-native**: Mountain owns the backend. Cocoon's `vscode` shim
  sends gRPC to Mountain which does the work natively (filesystem, process,
  terminal, search, git). Faster and safer than bouncing through Node for
  I/O-heavy APIs.

The two tracks are not mutually exclusive. Most APIs live on Track A by default,
and we promote individual operations to Track B when a measured benefit exists.
The Cocoon `<Namespace>Route.ts` tier router decides per-call.

---

## Legend

| Track | Meaning                                                       |
| ----- | ------------------------------------------------------------- |
| **A** | Stock-Node - lift unchanged `extHost*.ts` into Cocoon         |
| **B** | Rust-native - Mountain owns backend, gRPC from Cocoon         |
| **C** | Cocoon-bespoke - hand-rolled TS in Land (last resort)         |
| **S** | Sky-direct - call via `__CEL_SERVICES__.*` workbench accessor |

Status symbols:

- **Working** - end-to-end (activation + feature render path confirmed)
- **Partial** - RPC wired but UI render gap, or missing sub-method
- **Stubbed** - registration accepted, no effect
- **Not attempted**
- **Pure lift** - stateless, no RPC, already landed via `StockLift.ts`

---

## Commands

| Operation                   | Primary | Status  |
| --------------------------- | ------- | ------- |
| `registerCommand`           | A+S     | Working |
| `registerTextEditorCommand` | A       | Working |
| `executeCommand`            | A+S     | Working |
| `getCommands`               | A       | Working |

## Window - Editors

| Operation                     | Primary | Status  |
| ----------------------------- | ------- | ------- |
| `activeTextEditor`            | A       | Working |
| `visibleTextEditors`          | A       | Working |
| `showTextDocument`            | A       | Working |
| `onDidChangeActiveTextEditor` | A       | Working |

## Window - Surfaces

| Operation                                                            | Primary    | Status  |
| -------------------------------------------------------------------- | ---------- | ------- |
| `createStatusBarItem`                                                | S (native) | Working |
| `setStatusBarMessage`                                                | S          | Working |
| `createTreeView`                                                     | A+S        | Working |
| `registerTreeDataProvider`                                           | A+S        | Working |
| `createWebviewPanel`                                                 | A          | Stubbed |
| `registerWebviewViewProvider`                                        | A          | Stubbed |
| `registerCustomEditorProvider`                                       | A          | Stubbed |
| `createTerminal`                                                     | B          | Partial |
| `onDidOpen/CloseTerminal`                                            | B          | Partial |
| `createOutputChannel`                                                | S          | Working |
| `showInformationMessage` / `showWarningMessage` / `showErrorMessage` | A          | Working |
| `showQuickPick` / `createQuickPick`                                  | A          | Partial |
| `showInputBox`                                                       | A          | Partial |
| `showOpenDialog` / `showSaveDialog`                                  | B          | Working |
| `withProgress`                                                       | A+S        | Partial |
| `registerFileDecorationProvider`                                     | A          | Partial |
| `registerUriHandler`                                                 | A          | Partial |
| `onDidChangeWindowState`                                             | A          | Working |
| `showNotebookDocument`                                               | A          | Stubbed |

## Workspace

| Operation                                                                                                 | Primary | Status  |
| --------------------------------------------------------------------------------------------------------- | ------- | ------- |
| `workspaceFolders`                                                                                        | A       | Working |
| `onDidChangeWorkspaceFolders`                                                                             | A       | Working |
| `getWorkspaceFolder`                                                                                      | A+B     | Working |
| `textDocuments`                                                                                           | A       | Working |
| `openTextDocument`                                                                                        | A+B     | Working |
| `onDidOpen/Close/SaveTextDocument`                                                                        | A       | Working |
| `onWillSaveTextDocument`                                                                                  | A       | Partial |
| `applyEdit`                                                                                               | A+S     | Partial |
| `save` / `saveAs`                                                                                         | A       | Gap     |
| `fs.readFile` / `writeFile` / `stat` / `readDirectory` / `createDirectory` / `delete` / `rename` / `copy` | **B**   | Working |
| `fs.isWritableFileSystem`                                                                                 | A       | Working |
| `registerFileSystemProvider`                                                                              | A       | Partial |
| `createFileSystemWatcher`                                                                                 | B       | Partial |
| `findFiles`                                                                                               | **B**   | Working |
| `findTextInFiles`                                                                                         | **B**   | Working |
| `registerTextDocumentContentProvider`                                                                     | A       | Partial |
| `getConfiguration` / `onDidChangeConfiguration`                                                           | A+B     | Working |
| `registerTaskProvider`                                                                                    | A       | Partial |

## Languages

| Operation                                | Primary | Status  |
| ---------------------------------------- | ------- | ------- |
| `registerCompletionItemProvider`         | A       | Partial |
| `registerHoverProvider`                  | A       | Partial |
| `registerDefinitionProvider`             | A       | Partial |
| `registerReferenceProvider`              | A       | Partial |
| `registerDocumentSymbolProvider`         | A       | Partial |
| `registerCodeActionsProvider`            | A       | Partial |
| `registerCodeLensProvider`               | A       | Partial |
| `registerDocumentFormattingEditProvider` | A       | Partial |
| `registerRenameProvider`                 | A       | Partial |
| `registerInlayHintsProvider`             | A       | Partial |
| `registerFoldingRangeProvider`           | A       | Partial |
| `registerSemanticTokensProvider`         | A       | Partial |
| `registerSignatureHelpProvider`          | A       | Partial |
| `setTextDocumentLanguage`                | A+S     | Working |
| `setLanguageConfiguration`               | A+S     | Working |
| `createDiagnosticCollection`             | A+S     | Working |
| `match`                                  | Pure    | Working |

## Debug

| Operation                                         | Primary | Status  |
| ------------------------------------------------- | ------- | ------- |
| `registerDebugConfigurationProvider`              | A       | Partial |
| `registerDebugAdapterDescriptorFactory`           | A       | Partial |
| `registerDebugAdapterTrackerFactory`              | A       | Partial |
| `startDebugging`                                  | A+B     | Stubbed |
| `activeDebugSession` / `onDidStart/ChangeSession` | A       | Stubbed |
| `addBreakpoints` / `removeBreakpoints`            | A       | Stubbed |
| `activeStackItem`                                 | A       | Gap     |

## Tasks

| Operation                                            | Primary | Status  |
| ---------------------------------------------------- | ------- | ------- |
| `registerTaskProvider`                               | A       | Partial |
| `fetchTasks`                                         | A       | Stubbed |
| `executeTask`                                        | A+B     | Stubbed |
| `taskExecutions` / `onDidStartTask` / `onDidEndTask` | A       | Stubbed |

## SCM

| Operation                     | Primary | Status  |
| ----------------------------- | ------- | ------- |
| `createSourceControl`         | A+S     | Partial |
| `inputBox.value` read/write   | A       | Partial |
| `$gitExec` (built-in git ext) | **B**   | Stubbed |

## Environment

| Operation                                                                                                  | Primary | Status  |
| ---------------------------------------------------------------------------------------------------------- | ------- | ------- |
| `appName` / `appRoot` / `uriScheme` / `language` / `shell` / `machineId` / `sessionId` / `isNewAppInstall` | A       | Working |
| `clipboard.readText` / `writeText`                                                                         | B       | Working |
| `openExternal`                                                                                             | B       | Working |
| `asExternalUri`                                                                                            | A       | Gap     |
| `remoteName` / `remoteAuthority`                                                                           | A       | Working |

## Extensions

| Operation          | Primary | Status  |
| ------------------ | ------- | ------- |
| `getExtension(id)` | A       | Working |
| `all`              | A       | Working |
| `onDidChange`      | A       | Working |

## Authentication

| Operation                        | Primary | Status  |
| -------------------------------- | ------- | ------- |
| `registerAuthenticationProvider` | A       | Partial |
| `getSession`                     | A       | Partial |
| `getAccounts`                    | A       | Partial |

## Notebooks

| Operation                                   | Primary | Status  |
| ------------------------------------------- | ------- | ------- |
| `createNotebookController`                  | A       | Stubbed |
| `registerNotebookCellStatusBarItemProvider` | A       | Stubbed |
| `registerNotebookSerializer`                | A       | Partial |

## Tests

| Operation                 | Primary | Status  |
| ------------------------- | ------- | ------- |
| `createTestController`    | A       | Partial |
| Run profile / run request | A       | Stubbed |

## Chat / LM

| Operation                           | Primary | Status  |
| ----------------------------------- | ------- | ------- |
| `createChatParticipant`             | A       | Stubbed |
| `registerLanguageModelChatProvider` | A       | Gap     |
| `selectChatModels`                  | A       | Stubbed |

## Localization

| Operation         | Primary | Status  |
| ----------------- | ------- | ------- |
| `t(message, ...)` | Pure    | Working |
| `bundle` / `uri`  | A       | Working |

## Comments

| Operation                 | Primary | Status  |
| ------------------------- | ------- | ------- |
| `createCommentController` | A       | Stubbed |

---

## Domain-Grouped Primary Assignment

### Rust-native primary (Track B wins)

High I/O, process, or syscall-bound operations where Node adds latency:

- File system -- `workspace.fs.*`, scanner reads. Mountain owns `File::*` via
  tokio.
- Find files / text search -- `workspace.findFiles` / `findTextInFiles`.
  Mountain's `globset` walk.
- Terminal PTY -- Mountain-owned via `portable-pty`.
- Git subprocess -- Mountain spawns `git` as a child process.
- File watch -- `createFileSystemWatcher`. Mountain `notify` crate.
- Native dialogs / clipboard / openExternal -- Tauri covers these.
- Process spawn for debug adapters / task exec -- upcoming via `tokio::process`.

### Node-stock primary (Track A wins)

State-heavy or coordination-heavy APIs where stock VS Code handles nuance:

- Command registry, language features, editor/document/selection, configuration,
  messages/dialogs/quick-input, progress, secrets/storage/memento,
  authentication, debug/tasks (stock core + Mountain process spawn), webviews,
  notebooks, tree views.

### Hybrid (per-operation split)

- SCM -- stock for provider registration, Mountain-native for `$gitExec`.
- Terminal shell integration -- shell events via extHost, PTY via Mountain.
- FileSystemProvider -- Cocoon forwards reads via gRPC to Mountain for disk ops.
- Status bar -- stock manages entry lifecycle, Sky renders via
  `__CEL_SERVICES__.Statusbar`.

---

## Highest-Priority Gaps

- `vscode.debug.*` end-to-end (startDebugging, sessions, breakpoints) -- blocks
  every language debugger.
- `vscode.tasks.executeTask` -- blocks Jake / Gulp / Grunt / npm task providers.
- `vscode.window.createWebviewPanel` -- blocks GitLens graph panel, Copilot
  chat, markdown-preview internals.
- `vscode.scm` viewlet route into `ISCMService` -- extensions register but UI
  stays empty.
- Tree-view renderer wiring -- **landed**: extension-registered tree views
  render via `__CEL_SERVICES__.TreeViewByViewId(id).dataProvider`.
- `localGit` channel -- **landed**.

---

## See Also

- [Extension Development](https://land.playform.cloud/Doc/extension-development)
- [Cocoon: Extension Host](https://land.playform.cloud/Doc/cocoon)
- [Architecture Overview](https://land.playform.cloud/Doc/architecture)
