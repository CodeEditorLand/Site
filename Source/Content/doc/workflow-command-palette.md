---
title: "Executing a Command from the Command Palette"
section: "Workflow"
order: 11
description:
    "Unified command system dispatch: Mountain routes execution to native Rust
    handlers or proxied Cocoon commands."
---

# Executing a Command from the Command Palette

Illustrates how Mountain's command registry dispatches execution to either a
native Rust handler or a proxied command in Cocoon.

## Data Flow

```
User presses Ctrl+Shift+P
  -> workbench.action.showCommands dispatched
  -> QuickInputService.quickAccess.show()
  -> CommandsQuickAccessProvider fetches all commands
  -> TauriInvoke('mountain://command/get-all')
  -> Mountain: CommandProvider.GetAllCommands()
  -> Returns list of command IDs (native + proxied)
  -> Quick Pick UI populates with command list
  -> User types and selects "Format Document"
  -> ICommandService.executeCommand('editor.action.formatDocument')

If NATIVE:
  -> TauriInvoke('mountain://command/execute')
  -> Mountain: CommandProvider.ExecuteCommand()
  -> Lookup handler in CommandRegistry
  -> Found CommandHandler::Native
  -> Invoke native Rust function pointer
  -> Execute command logic
  -> Return result

If EXTENSION-PROVIDED:
  -> TauriInvoke('mountain://command/execute')
  -> Mountain: CommandProvider.ExecuteCommand()
  -> Lookup handler in CommandRegistry
  -> Found CommandHandler::Proxied
  -> IpcProvider makes $executeContributedCommand gRPC to Cocoon
  -> Cocoon looks up command in its registry
  -> Execute extension's JavaScript function
  -> Result returned to Mountain, forwarded to Wind
```

## Phase 1: Opening the Command Palette (Wind/Sky)

1. User presses `Ctrl+Shift+P`. `workbench.action.showCommands` is dispatched.
2. `QuickInputService` opens the Quick Pick UI configured for commands.
3. `CommandsQuickAccessProvider` needs the list of all commands. Since the
   registry is in Mountain, it executes
   `TauriInvoke('mountain://command/get-all')`.

## Phase 2: Fetching Command List (Mountain)

4. The Tauri command is dispatched to `track`, which creates the
   `Common::command::GetAllCommands` Effect.
5. `CommandProvider.GetAllCommands()` acquires a lock on
   `AppState.CommandRegistry` and returns the keys of the HashMap containing all
   registered native AND proxied command IDs.

## Phase 3: Displaying and Selecting (Wind/Sky)

6. The command list populates the Quick Pick UI.
7. User selects a command, triggering
   `ICommandService.executeCommand(commandId)`.

## Phase 4A: Native Command (Wind -> Mountain)

8. `CommandService` in Wind forwards the request:
   `TauriInvoke('mountain://command/execute', { commandId, args })`.
9. Mountain's `CommandExecutor::ExecuteCommand` looks up the handler in
   `CommandRegistry`.
10. Found as `CommandHandler::Native` -- invokes the corresponding Rust function
    pointer.

## Phase 4B: Extension Command (Wind -> Mountain -> Cocoon)

10. Mountain looks up the handler and finds
    `CommandHandler::Proxied { SidecarIdentifier: "cocoon-main", ... }`.
11. `IpcProvider` makes a `$executeContributedCommand` gRPC request to Cocoon.
12. Cocoon's `CommandsProvider` looks up the command in its registry and
    executes the extension's JavaScript function.
13. Result is serialized and returned through Mountain back to Wind.

## Key Source Files

- `Mountain/Source/Environment/CommandProvider.rs` -- command registry
- `Mountain/Source/Track/TrackLogic.rs` -- track dispatcher
- `Wind/Source/Application/QuickInput/Definition.ts` -- quick input service

---

## See Also

- [Application Startup and Handshake](https://Editor.Land/Doc/workflow-startup)
- [Architecture Overview](https://Editor.Land/Doc/architecture)
