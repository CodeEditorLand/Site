---
title: "Saving a File with Save Participants"
section: "Workflows"
order: 3
description:
    "How Ctrl+S triggers save participants in Cocoon before Mountain writes the
    final formatted content to disk."
---

A save with participants involves two distinct network round-trips before the
file is written: [Wind](https://github.com/CodeEditorLand/Wind) asks [Cocoon](https://github.com/CodeEditorLand/Cocoon) to run all `onWillSaveTextDocument` handlers
and collect their edits, then the merged edits are applied in-memory before the
normal write path to [Mountain](https://github.com/CodeEditorLand/Mountain) executes. The extension author sees only a single
`onWillSaveTextDocument` event; the IPC machinery is invisible.

<img src="/Mermaid/5e843b98af5d6c71.svg" alt="Mermaid diagram" />
## Phase 1 - User action and save trigger ([Wind](https://github.com/CodeEditorLand/Wind)/[Sky](https://github.com/CodeEditorLand/Sky))

1. The user presses `Ctrl+S` in an editor with unsaved changes. The keybinding
   system dispatches `workbench.action.files.save`.

2. `IEditorService.save()` identifies the active editor and calls `save` on its
   `EditorInput`.

3. `TextFileEditorModelManager` intercepts the save before any disk write. It
   emits a `willSave` event and passes control to `IWorkingCopyFileService` to
   run all registered save participants.

## Phase 2 - Save participant orchestration ([Wind](https://github.com/CodeEditorLand/Wind) → [Cocoon](https://github.com/CodeEditorLand/Cocoon) → [Wind](https://github.com/CodeEditorLand/Wind))

4. `WorkingCopyFileService.runSaveParticipants()` gathers every registered
   `ISaveParticipant`. The relevant one here is `ExtHostSaveParticipant`, which
   bridges to [Cocoon](https://github.com/CodeEditorLand/Cocoon).

5. `ExtHostSaveParticipant.participate()` sends a **`$participateInSave` gRPC
   request** to [Cocoon](https://github.com/CodeEditorLand/Cocoon), carrying the document URI and save reason (e.g.
   `explicit`). [Wind](https://github.com/CodeEditorLand/Wind) then awaits the response.

## Phase 3 - Extension execution ([Cocoon](https://github.com/CodeEditorLand/Cocoon))

6. [Cocoon](https://github.com/CodeEditorLand/Cocoon)'s gRPC server receives `$participateInSave` and dispatches it to
   `ExtHostDocumentSaveParticipant`.

7. The service constructs a `WillSaveTextDocumentEvent` and fires the
   `onWillSaveTextDocument` event, delivering it to every subscribed extension.

8. Each participating extension (e.g. a Prettier formatter) receives the event,
   calculates its formatting edits for the document, and returns a
   `Promise<TextEdit[]>`.

9. `ExtHostDocumentSaveParticipant` awaits all returned promises, collects the
   `TextEdit` arrays, serialises them into DTOs via `TypeConverter`, and returns
   the complete array to [Wind](https://github.com/CodeEditorLand/Wind) as the `$participateInSave` gRPC response.

## Phase 4 - Apply edits and write to disk ([Wind](https://github.com/CodeEditorLand/Wind) → [Mountain](https://github.com/CodeEditorLand/Mountain))

10. The `$participateInSave` gRPC call resolves in [Wind](https://github.com/CodeEditorLand/Wind).
    `WorkingCopyFileService` passes the collected edits to `IBulkEditService`.

    > `workspace.applyEdit()` is a full awaitable round-trip: the call is a
    > `sendRequest` round-trip to [Mountain](https://github.com/CodeEditorLand/Mountain) rather than a fire-and-forget
    > notification. The caller receives confirmation that the edit was applied
    > before proceeding. [Mountain](https://github.com/CodeEditorLand/Mountain) treats a `null` response from [Sky](https://github.com/CodeEditorLand/Sky) as `true`
    > (matching VS Code's own `MainThreadBulkEdits` behaviour). The
    > `WorkspaceEdit` payload is normalised in the [Sky](https://github.com/CodeEditorLand/Sky) bridge to handle multiple
    > wire shapes: `_edits` with `_type: 2` entries (text edits, `_range` using
    > 0-based lines converted to Monaco 1-based), `_type: 1` entries (file
    > operations), and serialised `vscode.Uri` objects.

11. `BulkEditService` applies every `TextEdit` to the document model in memory.
    Edits are applied atomically; extensions listening to
    `onDidChangeTextDocument` see a single composite change event.

12. With all participants complete and edits applied,
    `TextFileEditorModelManager` proceeds to the disk write. It calls
    `IFileService.writeFile()`.

13. The write follows the same provider chain as reading: `IFileService` →
    `TauriDiskFileSystemProvider` → `WriteFile` Effect →
    `TauriInvoke("plugin:fs|WriteFile")` → [Mountain](https://github.com/CodeEditorLand/Mountain).

14. [Mountain](https://github.com/CodeEditorLand/Mountain) executes:

    ```rust
    tokio::fs::write(path, content)
    ```

    The formatted document is now on disk. Success propagates back up.

15. `TextFileEditorModel` transitions out of the dirty state. The filled-circle
    indicator disappears from the editor tab. The save is complete.

> [!IMPORTANT] Save participants can return edits that themselves trigger
> further change notifications. `BulkEditService` applies edits atomically to
> the in-memory model, so extensions that listen to `onDidChangeTextDocument`
> see a single composite change rather than one event per `TextEdit`.

## workspace.saveAll and related APIs

`workspace.saveAll()` previously called `Document.Save` with no arguments
(always an error). It now calls `Workspace.SaveAll`, which routes to
`sky://workspace/saveAll` and dispatches `workbench.action.files.saveAll` in the
renderer, flushing every open dirty document through `IFileService.writeFile()`.

`workspace.save(uri)` routes to `sky://workspace/save` and saves the specific
document via `ITextFileService.save` (falling back to the workbench save
command). `workspace.saveAs(uri)` routes to `sky://workspace/saveAs` and opens
the native save-as dialog. Both are round-trip request channels that resolve the
extension's awaited promise.

### applyEdit round-trip

`workspace.applyEdit(edit)` is a full awaitable round-trip via
`Call(Context, "applyEdit", [edit])` ([Mountain](https://github.com/CodeEditorLand/Mountain) `sendRequest`, not a
fire-and-forget notification). The extension's `await workspace.applyEdit(...)`
resolves only after [Sky](https://github.com/CodeEditorLand/Sky)'s `sky://workspace/applyEdit` handler finishes applying
the edit to the Monaco model and returns a success boolean. [Mountain](https://github.com/CodeEditorLand/Mountain) treats a
`null` response from [Sky](https://github.com/CodeEditorLand/Sky) as `true` (matching VS Code's own `MainThreadBulkEdits`
behaviour).

The `WorkspaceEdit` payload is normalised inside the [Sky](https://github.com/CodeEditorLand/Sky) bridge to handle
multiple wire shapes:

- `_edits` array with `_type: 2` entries (extHostTypes text edit) - `_range`
  uses `_start._line` / `_end._line` (0-based, converted to Monaco 1-based)
- `_edits` array with `_type: 1` entries (file operations: create, rename,
  delete)
- Serialised `vscode.Uri` objects (`_scheme` / `_path` fields)

`IBulkEditService` is tried first; if unavailable, the bridge falls back to
direct Monaco model operations.
