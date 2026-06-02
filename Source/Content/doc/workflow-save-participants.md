---
title: "Saving a File with Save Participants"
section: "Workflow"
order: 15
description:
    "Intercepting a save event, allowing an extension to modify a file (e.g.
    formatting) before Mountain writes it to disk."
---

# Saving a File with Save Participants

Explains the process of intercepting a save event, allowing an extension in
Cocoon to modify a file (e.g. for formatting) before Mountain writes it to disk.

## Data Flow

```
User presses Ctrl+S (editor is dirty)
  -> workbench.action.files.save command
  -> IEditorService.save()
  -> TextFileEditorModelManager.save()
  -> WorkingCopyFileService.runSaveParticipants()
  -> Gather ISaveParticipants
  -> ExtHostSaveParticipant.participate()
  -> Wind sends $participateInSave gRPC to Cocoon

Cocoon:
  -> ExtHostDocumentSaveParticipant fires onWillSaveTextDocument
  -> Prettier extension calculates formatting edits
  -> Extension returns Promise<TextEdit[]>
  -> All extensions resolve, edits collected
  -> Serialize TextEdits to DTOs
  -> Return array of TextEdit DTOs to Wind

Wind/UI:
  -> BulkEditService applies TextEdits to document model in memory
  -> TextFileEditorModelManager proceeds to save
  -> IFileService.writeFile()
  -> TauriDiskFileSystemProvider -> WriteFile Effect -> TauriInvoke

Mountain:
  -> FsWriter receives call
  -> tokio::fs::write(path, content)
  -> Success returned up the chain

Wind/UI:
  -> TextFileEditorModel no longer dirty
  -> UI removes filled-circle indicator from editor tab
  -> Save complete
```

## Phase 1: User Action and Initial Save Trigger (Wind/Sky)

1. User presses `Ctrl+S` in a dirty editor. `workbench.action.files.save`
   dispatched.
2. `IEditorService.save()` identifies the active editor and calls `save` on its
   `EditorInput`.
3. `TextFileEditorModelManager` does not immediately write to disk. It enters
   the Save Participants phase.
4. Emits a `willSave` event, orchestrated by `IWorkingCopyFileService`.

## Phase 2: Orchestration via Save Participants (Wind -> Cocoon -> Wind)

5. `WorkingCopyFileService.runSaveParticipants()` gathers all registered
   `ISaveParticipants`. One is `ExtHostSaveParticipant`, responsible for
   communicating with extensions in Cocoon.
6. Calls `participate()` on `ExtHostSaveParticipant`, which makes a
   `$participateInSave` gRPC request to Cocoon with the document URI and save
   reason.

## Phase 3: Extension Execution (Cocoon)

7. Cocoon's gRPC server dispatches to `ExtHostDocumentSaveParticipant`.
8. Service fires `onWillSaveTextDocument` event to all subscribed extensions.
9. Prettier extension calculates formatting edits, returns
   `Promise<TextEdit[]>`.
10. Service collects all results, serializes `TextEdit` objects to DTOs via
    `TypeConverter`, returns to Wind.

## Phase 4: Applying Edits and Final Save (Wind -> Mountain -> Disk)

11. gRPC call resolves with text edits from extensions.
12. `BulkEditService` applies the `TextEdit`s to the document model in memory.
    Editor content now reflects formatted code.
13. `TextFileEditorModelManager` proceeds to call `IFileService.writeFile()`.
14. Save follows the same path as Opening a File (Workflow #2): `IFileService`
    -> `TauriDiskFileSystemProvider` -> `WriteFile` Effect -> `TauriInvoke` ->
    Mountain.
15. `tokio::fs::write(path, content)` writes the formatted document to disk.
16. `TextFileEditorModel` is no longer dirty. UI removes the dirty indicator.

## Key Source Files

- `Wind/Source/Application/BulkEdit/Live.ts` -- bulk edit service
- `Wind/Source/Application/File/Live.ts` -- file service
- `Mountain/Source/FileSystem/` -- filesystem providers

---

## See Also

- [Opening a File from the UI](https://land.playform.cloud/Doc/workflow-open-file)
- [Architecture Overview](https://land.playform.cloud/Doc/architecture)
