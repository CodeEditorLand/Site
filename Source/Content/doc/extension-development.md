---
title: "Extension Development"
section: "Development"
order: 1
description: "How to develop, test, and report compatibility issues for VS Code
    extensions running in Land."
---

Land hosts VS Code extensions through Cocoon, a Node.js extension host that
implements the `vscode.*` API surface. Current coverage is approximately 88% of
the VS Code extension API, making the majority of published extensions
compatible without modification. This page describes what works, what does not,
and how to test and report gaps.

## API Coverage

The Cocoon extension host implements the `vscode.*` namespace shim. As of the
current release, the following areas are fully or substantially covered:

| API Area                | Coverage | Notes                                                                                                                                                  |
| ----------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `vscode.workspace`      | ~96%     | `onWillCreate/Delete/RenameFiles`, `applyEdit`, `saveAll` all wired                                                                                    |
| `vscode.window`         | ~95%     | TextEditor object, QuickPick, InputBox, StatusBarItem, terminal events including `onDidStartTerminalShellExecution` / `onDidEndTerminalShellExecution` |
| `vscode.languages`      | ~95%     | All LSP provider types including resolve handlers                                                                                                      |
| `vscode.scm`            | ~95%     | InputBox, commitTemplate, acceptInputCommand                                                                                                           |
| `vscode.commands`       | ~95%     | `onDidExecuteCommand` event, `registerTextEditorCommand`                                                                                               |
| `vscode.extensions`     | ~90%     | Activation, exports, Memento-backed state                                                                                                              |
| `vscode.debug`          | ~75%     | Configuration providers; DAP pipe/socket adapters incomplete                                                                                           |
| `vscode.tasks`          | ~75%     | `registerTaskProvider`, `executeTask`; some task types not delegated                                                                                   |
| `vscode.authentication` | ~30%     | API surface present; no real OAuth backend                                                                                                             |

For a detailed method-level breakdown, see the
[VS Code API Coverage](/Doc/cocoon-vscode-validation) reference page.

## What Does Not Work

The following areas have known gaps and will not function correctly in the
current release:

**`vscode.authentication` full OAuth flows**: The `getSession()` call returns
stubs. Extensions that require GitHub OAuth, Microsoft account sign-in, or any
OAuth 2.0 provider (Copilot, GitHub Pull Requests, Live Share) will fail to
authenticate. The API structure is present but there is no real OAuth backend
wired.

**`registerInlineCompletionItemProvider`** 🟡 (partial): The Vine proto
definition, Mountain dispatcher, and Sky `ILanguageFeaturesService`
registration all exist. Single-item and list providers work for basic inline
suggestions. Providers that return `InlineCompletionList` with
`suppressSuggestions` or custom range objects may not render correctly in all
configurations.

**Debug adapter types**: `DebugProvider` handles `executable`-type debug
configurations (launching a child process). Server-mode and pipe-mode debug
adapters (`attach` type with `debugServer` or `pipeTransport`) are not delegated
correctly.

**`registerWebviewPanelSerializer`**: Panel state is not persisted across
reloads. Extensions that restore webview panels after a window reload will not
recover their state.

**`vscode.env.openExternal` with non-file schemes**: Works for `http`/`https`
URLs via the native open handler; custom scheme URIs may not route correctly on
all platforms.

## Extension Context Capabilities

The following `ExtensionContext` members are fully implemented in Land:

| Member                      | Backing implementation                                          |
| --------------------------- | --------------------------------------------------------------- |
| `context.workspaceState`    | Mountain `storage:get` / `storage:set` IPC                      |
| `context.globalState`       | Mountain `storage:get` / `storage:set` IPC                      |
| `context.secrets.get`       | Mountain `encryption:decrypt` (AES-256-GCM, machine-stable key) |
| `context.secrets.store`     | Mountain `encryption:encrypt` (AES-256-GCM, machine-stable key) |
| `context.secrets.delete`    | Mountain `storage:set` with `null` value                        |
| `context.extension.exports` | Set after the activation function resolves                      |

Secret storage uses AES-256-GCM encryption keyed from the machine UUID (SHA-256
hash). Secrets stored by one extension cannot be read by another and do not
survive a machine change. This matches VS Code's `SecretStorage` semantics for
local-only secrets.

## Testing Your Extension in Land

### Drop-in Installation

Place your unpacked extension directory in the user extension root. On macOS:

```sh
~/.land/extensions/your-extension-name/
```

The directory must contain a valid `package.json` with `"main"` pointing to the
compiled entry point. Land scans this directory at startup and activates
extensions matching their `activationEvents`.

### VSIX Install

Land accepts `.vsix` packages. From the Extensions sidebar, use the "Install
from VSIX" option, or set the `Lodge` environment variable to point to a custom
extension root and drop the unpacked VSIX there.

### Development Mode

For active extension development, set the `Probe` variable to your extension's
source directory. Extensions under `Probe` always load regardless of enablement
state, matching the `--extensionDevelopmentPath` behavior in VS Code:

```sh
# In .env.Land.Extensions
Probe=/path/to/your-extension
```

Then rebuild and run. Probe extensions reload on each application restart.

### TierIPC=Node for Cocoon-Only Testing

To test your extension against the pure Node.js Cocoon IPC path (bypassing
Mountain's Rust handlers entirely), set:

```sh
TierIPC=Node
```

This routes all IPC calls through `cocoon:request` instead of Tauri's native IPC
bridge. It is useful for isolating whether a failure is in Mountain's handler or
in the Cocoon shim layer.

## Accessing Extension Host Logs

Cocoon writes structured log output to standard output, which Mountain captures
and forwards to the dev log. To see Cocoon's output:

1. Set `Trace=cocoon` (or `Trace=all`) in `.env.Land.Diagnostics`.
2. Set `Record=1` to persist the log to disk at
   `<app-data>/logs/<timestamp>/Mountain.dev.log`.
3. Open DevTools (`Inspect=1`) and check the Console for Sky-side errors.

For gRPC-level tracing between Mountain and Cocoon, add `grpc` to the `Trace`
tag list.

## Reporting API Compatibility Gaps

If your extension fails in Land due to a missing or broken API, open a GitHub
issue at
[github.com/CodeEditorLand/Land/issues](https://github.com/CodeEditorLand/Land/issues)
with:

- The extension name and version.
- The `vscode.*` API call that fails (exact method name).
- The error message or observable symptom (for example, "returns undefined",
  "throws", "never resolves").
- A minimal reproduction if possible.

Label the issue `api-coverage`. This directly feeds the prioritization of Cocoon
shim work.
