---
title: "Executing a Command from the Command Palette"
section: "Workflows"
order: 4
description: "How Ctrl+Shift+P fetches the command list from Mountain and routes
    execution to either a native Rust handler or a proxied Cocoon extension
    command."
---

The command palette is a thin UI over Mountain's `CommandRegistry`. Every
command — whether implemented in Rust or contributed by an extension in
Cocoon — is registered in that single registry. Wind fetches the list via Tauri
IPC, the user selects an entry, and Mountain routes execution either to a native
Rust function pointer or to Cocoon via gRPC, depending on the handler type
stored at registration time.

## Phase 1 - Opening the palette (Sky → Wind)

1. The user presses `Ctrl+Shift+P`. The keybinding system dispatches
   `workbench.action.showCommands`.

2. `QuickInputService` opens the Quick Pick UI configured for command access,
   delegating population to `CommandsQuickAccessProvider`.

3. `CommandsQuickAccessProvider` needs the full command list. It executes:

    ```ts
    TauriInvoke("mountain://command/get-all");
    ```

## Phase 2 - Fetching the command list (Mountain)

4. Mountain's `track` module creates the `Common::command::GetAllCommands`
   Effect. The `AppRuntime` executes it via `MountainEnvironment`'s
   `CommandExecutor::GetAllCommands` implementation.

5. `CommandProvider.GetAllCommands()` acquires a read lock on
   `AppState.CommandRegistry` and returns the `HashMap` keys — the IDs of all
   registered native commands and all proxied Cocoon commands.

6. The list resolves back to `CommandsQuickAccessProvider`, which populates the
   Quick Pick UI.

## Phase 3 - User selection (Sky)

7. The user types a query (e.g. "Format Document") and presses Enter. The Quick
   Pick widget calls:

    ```ts
    ICommandService.executeCommand("editor.action.formatDocument");
    ```

## Phase 4A - Native command execution (Wind → Mountain)

8. Wind's `CommandService` forwards the call:

    ```ts
    TauriInvoke("mountain://command/execute", {
    	commandId: "editor.action.formatDocument",
    	args: [],
    });
    ```

9. Mountain dispatches through `track` to `CommandProvider.ExecuteCommand()`. It
   looks up `"editor.action.formatDocument"` in `AppState.CommandRegistry` and
   finds a `CommandHandler::Native` entry.

10. Mountain invokes the stored Rust function pointer, passing it the
    `AppHandle`, `Window`, `AppRuntime`, and arguments. The native handler runs
    — for a format command this may itself call back into Cocoon for formatting
    edits — and returns its result up the call chain.

## Phase 4B - Extension command execution (Wind → Mountain → Cocoon)

Steps 8 and 9 are identical to Phase 4A. The difference is in what Mountain
finds at step 9.

10. `CommandProvider.ExecuteCommand()` finds a
    `CommandHandler::Proxied { SidecarIdentifier: "cocoon-main", CommandIdentifier: "my-extension.doSomething" }`
    entry. It must forward the call.

11. Mountain's `IpcProvider` sends a **`$executeContributedCommand` gRPC
    request** to Cocoon, carrying the command ID and arguments.

12. Cocoon's gRPC server dispatches to `CommandsProvider`, which looks up
    `"my-extension.doSomething"` in its own local registry and executes the
    extension's JavaScript handler function.

13. The result is serialised and returned to Mountain as the gRPC response.
    Mountain forwards it back to Wind as the `TauriInvoke` resolution.

## registerTextEditorCommand

`vscode.commands.registerTextEditorCommand(id, callback)` wraps the callback so
it always receives `(textEditor, editBuilder, ...args)` with live objects:

- `textEditor` is the active `TextEditor` proxy, including `.edit()`,
  `.setDecorations()`, and `.revealRange()`.
- `editBuilder` is a `TextEditorEdit` buffer tied to the active Monaco model.
  Edits collected via `builder.replace()`, `builder.insert()`, or
  `builder.delete()` are applied atomically when the callback returns. If the
  callback is async (returns a `Promise`), the builder waits for resolution
  before flushing.

When no editor is active, a no-op builder is passed so the extension's pre-edit
setup still runs without throwing.

## onDidExecuteCommand

Mountain emits `sky://commands/executed` to the Sky renderer after every command
dispatch, and simultaneously sends `$acceptCommandExecuted` over the Vine gRPC
channel to Cocoon. `Notification/Handler.ts` in Cocoon catches the Vine
notification and re-emits it on the shared `Emitter` channel `commands.executed`.
The `onDidExecuteCommand` subscription in `Commands/Namespace.ts` listens on that
channel, so extensions receive the event for both native and extension-contributed
commands. Local Cocoon-to-Cocoon `executeCommand` calls also emit on
`commands.executed` directly, so extension-to-extension calls are visible to
listeners without a Mountain round-trip.

> [!IMPORTANT] Extension commands are registered in Mountain's `CommandRegistry`
> as proxied entries during extension activation — Cocoon sends a
> `$registerExtensionCommand` gRPC call for each
> `vscode.commands.registerCommand` invocation. Mountain never needs to know a
> command's implementation language; the `CommandHandler` enum value determines
> the dispatch path at execution time.
