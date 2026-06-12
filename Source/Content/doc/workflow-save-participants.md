---
title: "Saving a File with Save Participants"
section: "Workflows"
order: 3
description:
    "How Ctrl+S triggers save participants in Cocoon before Mountain writes the
    final formatted content to disk."
---

A save with participants involves two distinct network round-trips before the
file is written: Wind asks Cocoon to run all `onWillSaveTextDocument` handlers
and collect their edits, then the merged edits are applied in-memory before the
normal write path to Mountain executes. The extension author sees only a single
`onWillSaveTextDocument` event; the IPC machinery is invisible.

## Phase 1 - User action and save trigger (Wind/Sky)

1. The user presses `Ctrl+S` in an editor with unsaved changes. The keybinding
   system dispatches `workbench.action.files.save`.

2. `IEditorService.save()` identifies the active editor and calls `save` on its
   `EditorInput`.

3. `TextFileEditorModelManager` intercepts the save before any disk write. It
   emits a `willSave` event and passes control to `IWorkingCopyFileService` to
   run all registered save participants.

## Phase 2 - Save participant orchestration (Wind -> Cocoon -> Wind)

4. `WorkingCopyFileService.runSaveParticipants()` gathers every registered
   `ISaveParticipant`. The relevant one here is `ExtHostSaveParticipant`, which
   bridges to Cocoon.

5. `ExtHostSaveParticipant.participate()` sends a **`$participateInSave` gRPC
   request** to Cocoon, carrying the document URI and save reason (e.g.
   `explicit`). Wind then `await`s the response.

## Phase 3 - Extension execution (Cocoon)

6. Cocoon's gRPC server receives `$participateInSave` and dispatches it to
   `ExtHostDocumentSaveParticipant`.

7. The service constructs a `WillSaveTextDocumentEvent` and fires the
   `onWillSaveTextDocument` event emitter, delivering it to every subscribed
   extension.

8. Each participating extension (for example, a Prettier formatter) receives the
   event, calculates its edits for the document, and returns a
   `Promise<TextEdit[]>`.

9. `ExtHostDocumentSaveParticipant` awaits all returned promises, collects the
   `TextEdit` arrays, serialises them into DTOs via `TypeConverter`, and returns
   the full array to Wind as the `$participateInSave` gRPC response.

## Phase 4 - Apply edits and write to disk (Wind -> Mountain)

10. The `$participateInSave` gRPC call resolves in Wind.
    `WorkingCopyFileService` passes the collected edits to `IBulkEditService`.

    `workspace.applyEdit()` is fully awaitable: the call is a `sendRequest`
    round-trip to Mountain rather than a fire-and-forget notification. The
    caller receives confirmation that the edit was applied to the in-memory
    model before proceeding. This matters for save participants that
    conditionally apply further edits based on whether a previous edit
    succeeded.

11. `BulkEditService` applies every `TextEdit` to the document model in memory.
    The in-editor content now reflects the formatted code without any disk I/O
    yet.

12. With all participants complete and edits applied,
    `TextFileEditorModelManager` proceeds to the actual write. It calls
    `IFileService.writeFile()`.

13. The write follows the same provider chain as reading: `IFileService` ->
    `TauriDiskFileSystemProvider` -> `WriteFile` Effect ->
    `TauriInvoke("plugin:fs|WriteFile")` -> Mountain.

14. Mountain receives the call and executes:

    ```rust
    tokio::fs::write(path, content)
    ```

    The formatted document is now on disk. Success propagates back up the chain.

15. `TextFileEditorModel` transitions out of the dirty state. The filled-circle
    indicator disappears from the editor tab. The save is complete.

> [!IMPORTANT] Save participants can return edits that themselves trigger
> further change notifications. `BulkEditService` applies edits atomically to
> the in-memory model, so extensions that listen to `onDidChangeTextDocument`
> will see a single composite change event rather than one event per `TextEdit`.

## workspace.saveAll

`workspace.saveAll()` calls `Workspace.SaveAll` on Mountain, which iterates
every open dirty document and flushes each through the standard
`IFileService.writeFile()` path. An earlier stub incorrectly called
`Document.Save` with no arguments (which always errored); the current
implementation routes through `Workspace.SaveAll` and resolves with a boolean
indicating whether any document was saved.

`workspace.save(uri)` routes to `sky://workspace/save` and saves the specific
document via `ITextFileService.save` or the workbench save command as a
fallback. `workspace.saveAs(uri)` routes to `sky://workspace/saveAs` and opens
the native save-as dialog. Both are round-trip request channels that resolve
the extension's awaited promise.
