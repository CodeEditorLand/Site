---
title: "Source Control Management (SCM)"
section: "Workflow"
order: 17
description:
    "Git extension in Cocoon uses Mountain to run native git commands and
    populate the SCM view in the UI."
---

# Source Control Management (SCM)

Outlines how the built-in Git extension in Cocoon uses Mountain as a service to
run native `git` commands and populate the SCM view in the UI.

Verify against `Cocoon/Source/Services/Extension.ts` for extension activation
and Mountain's Git provider implementation.

## Data Flow

```
Phase 1: Registration and Discovery
  Git Extension activate()
  -> vscode.scm.createSourceControl('git', 'Git')
  -> ScmProvider service in Cocoon sends $registerScmProvider gRPC to Mountain
  -> vscode.workspace.workspaceFolders API to get root path
  -> vscode.workspace.fs.stat(Uri.joinPath(root, '.git')) -- gRPC to Mountain
  -> Mountain: tokio::fs::metadata -- .git directory confirmed

Phase 2: Populate SCM View
  -> Git extension runs: git status --porcelain -z
  -> $gitExec gRPC to Mountain
  -> Mountain GitProvider spawns git process, captures stdout
  -> Returns raw output to Cocoon
  -> Git extension parses output, builds list of changed files
  -> Creates SourceControlResourceState objects (URI + decorations)
  -> Updates SourceControl resourceGroups
  -> $updateScmGroup gRPC notification to Mountain
  -> Mountain emits sky://scm/update-group Tauri event

Phase 3: UI Rendering
  -> SCM View component receives update-group event
  -> UI re-renders file list (e.g. "M src/main.ts")

Phase 4: Diff View
  User clicks changed file
  -> vscode.open with git: URI (e.g. git:/src/main.ts?{"ref":"HEAD"})
  -> EditorService creates DiffEditorInput
  -> Modified side: file:// URI, IFileService.read (standard read)
  -> Original side: git: URI, Content Provider calls $gitExec
  -> Mountain: git show HEAD:file
  -> Returns original content to Wind
  -> DiffEditor opens with both sides
  -> User sees side-by-side diff
```

## Phase 1: Extension Registration and Repository Discovery (Cocoon)

1. Cocoon activates the built-in Git extension.
2. Git extension calls `vscode.scm.createSourceControl('git', 'Git')`.
   `ScmProvider` service manages state and sends `$registerScmProvider` gRPC to
   Mountain.
3. Git extension uses `vscode.workspace.workspaceFolders` to get root path. Then
   checks for `.git` directory via `vscode.workspace.fs.stat(...)`, which routes
   through Cocoon's FileSystemProvider over gRPC to Mountain's
   `tokio::fs::metadata`.

## Phase 2: Populating the SCM View (Cocoon -> Mountain)

4. Git extension needs file status. Uses a custom `vscode.git` API exposed by
   Mountain, which translates to a `$gitExec` gRPC request.
5. Mountain's `GitProvider` safely spawns a native `git` child process with the
   provided arguments, captures stdout, returns raw string.
6. Git extension parses `git status` output, creates
   `SourceControlResourceState` objects, updates `resourceGroups`.
7. `ScmProvider` in Cocoon serializes changes and sends `$updateScmGroup` gRPC
   notification to Mountain.
8. Mountain updates `AppState.ActiveScmProviders` and emits
   `sky://scm/update-group` Tauri event.

## Phase 3: Rendering the SCM View (Wind/Sky)

9. SCM View component in Wind receives the `sky://scm/update-group` event and
   re-renders with the list of modified files.

## Phase 4: Viewing a Diff

10. User clicks a changed file in the SCM view. `vscode.open` executes with a
    `git:` scheme URI.
11. `EditorService` creates a `DiffEditorInput`:
    - Modified side: loads from workspace `file://` URI via `IFileService`
      (standard read).
    - Original side: `git:` scheme Content Provider sends `$gitExec` to Mountain
      with `git show HEAD:path/to/file`.
12. Mountain runs the command, returns original content. DiffEditor opens with
    both sides.

## Key Source Files

- `Cocoon/Source/Services/Extension.ts` -- extension activation
- `Mountain/Source/Environment/SynchronizationProvider.rs` -- Git provider
  (verify)
- `Mountain/Source/Environment/LanguageFeatureProvider/Registration.rs` --
  provider registry

---

## See Also

- [Architecture Overview](https://land.playform.cloud/Doc/architecture)
- [VS Code API Coverage](https://land.playform.cloud/Doc/vscode-api-coverage)
