---
title: "Opening a File from the UI"
section: "Workflow"
order: 10
description:
    "Flow from user clicking a file in explorer to content loaded from disk by
    Mountain and rendered in editor by Wind."
---

# Opening a File from the UI

Details the flow from a user clicking a file in the File Explorer to the file's
content being loaded into an editor.

## Data Flow

```
User clicks file in File Explorer
  -> IEditorService.openEditor({ resource: fileUri })
  -> TextEditorService resolves EditorInput
  -> EditorGroupsService finds target editor group
  -> TextFileEditorModel.load()
  -> IFileService.readFile(fileUri)
  -> TauriDiskFileSystemProvider.lookup(file: scheme)
  -> ReadFile Effect executes
  -> TauriInvoke('plugin:fs|ReadFile', { path: fileUri.fsPath })
  -> Mountain: tokio::fs::read(path)
  -> File content returned as Vec<u8>
  -> Uint8Array returned up the chain
  -> TextFileEditorModel hydrated
  -> TextEditorPane created in editor group
  -> Monaco editor receives text model
  -> User sees file open in editor
```

## Phase 1: UI Interaction (Wind/Sky)

1. User clicks a file `<div>` in the File Explorer. The `onClick` handler knows
   the file's URI.
2. `IEditorService.openEditor()` is called with `{ resource: fileUri }`. The
   effect resolves the input into a concrete `EditorInput` via
   `TextEditorService`, then finds the target editor group.

## Phase 2: Editor and Filesystem Logic (Wind -> Mountain)

3. `EditorGroupsService` checks if the file is already open. If not, it calls
   `EditorInput.resolve()` to load the underlying model.
4. `TextFileEditorModel.load()` needs file content. It calls
   `IFileService.readFile(fileUri)`.
5. `IFileService` looks up the provider for the `file:` scheme and finds
   `TauriDiskFileSystemProvider`.
6. `TauriDiskFileSystemProvider.readFile()` executes the `ReadFile` Effect from
   the Tauri Integration layer: `Effect.runPromise(ReadFile(fileUri))`.
7. The `ReadFile` Effect calls
   `TauriInvoke('plugin:fs|ReadFile', { path: fileUri.fsPath })`, sending the
   request from the webview to Mountain.

## Phase 3: Native File I/O (Mountain)

8. Tauri routes the command to `tauri-plugin-fs`. The plugin performs
   `tokio::fs::read(path)`.
9. File content (`Vec<u8>`) is read from disk, serialized, and returned as the
   promise resolution.

## Phase 4: UI Rendering (Wind)

10. The `TauriInvoke` promise resolves with file content as a `Uint8Array`.
11. `TextFileEditorModel.load()` succeeds. The model is hydrated.
12. `EditorGroupsService` creates a `TextEditorPane` and sets the
    `TextFileEditorModel` on the Monaco editor instance.
13. Monaco renders the text content to screen.

## Key Source Files

- `Wind/Source/Application/Editor/Definition.ts` -- editor service
- `Wind/Source/Application/FileSystem/Definition.ts` -- filesystem provider
- `Wind/Integration/Tauri/Wrap/ReadFile.ts` -- Tauri invoke effect
- `Mountain/src/main.rs` -- Tauri fs plugin

---

## See Also

- [Application Startup and Handshake](https://Editor.Land/Doc/workflow-startup)
- [Architecture Overview](https://Editor.Land/Doc/architecture)
