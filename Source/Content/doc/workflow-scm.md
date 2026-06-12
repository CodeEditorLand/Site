---
title: "Source Control Management (SCM)"
section: "Workflows"
order: 7
description:
    "How the built-in Git extension registers an SCM provider in Cocoon, uses
    Mountain to run native git commands, and keeps the SCM view in Sky up to
    date."
---

SCM in Land is entirely extension-driven. The built-in Git extension in Cocoon
owns all Git logic; Mountain provides two services it needs — a native
filesystem stat for repository detection and a `GitProvider` that safely spawns
`git` child processes. Mountain then brokers the resulting resource states to
Sky via Tauri events.

## Phase 1 — Registration and repository detection (Cocoon → Mountain)

1. On startup Cocoon activates the built-in Git extension. Its `activate()`
   function calls:

    ```ts
    vscode.scm.createSourceControl("git", "Git");
    ```

2. Cocoon's `ScmProvider` service sends a **`$registerScmProvider` gRPC
   request** to Mountain, recording that a provider identified as `"git"` is
   managed by `"cocoon-main"`.

3. The Git extension checks for a `.git` directory:

    ```ts
    vscode.workspace.fs.stat(Uri.joinPath(workspaceRoot, ".git"));
    ```

    This traverses Cocoon's `FileSystemProvider` → gRPC → Mountain →
    `tokio::fs::metadata`. A successful result confirms the workspace is a Git
    repository.

## Phase 2 — Populating the SCM view (Cocoon → Mountain → Cocoon)

4. The Git extension needs changed-file status. It calls Mountain's `vscode.git`
   API which maps to a **`$gitExec` gRPC request**:

    ```
    $gitExec  { repoPath, args: ["status", "--porcelain", "-z"] }
    ```

5. Mountain's `GitProvider` handler receives the request and spawns a native
   child process:

    ```rust
    std::process::Command::new("git")
        .args(["status", "--porcelain", "-z"])
        .current_dir(repo_path)
    ```

    It captures stdout and returns the raw string to Cocoon.

6. The Git extension parses the output, builds a `SourceControlResourceState`
   array (each entry carrying a file URI and decoration metadata such as `"M"`
   for modified), and sets it on the `resourceGroups.Changes` resource group.

7. Setting `resourceStates` on the source control object causes Cocoon's
   `ScmProvider` to serialise the new states into DTOs and send a
   **`$updateScmGroup` gRPC notification** to Mountain.

8. Mountain updates `AppState.ActiveScmProviders` and emits a Tauri event to
   Sky:

    ```
    sky://scm/update-group  { providerId: "git", groupId: "Changes", resources: [...] }
    ```

## Phase 3 — SCM view rendering (Sky)

9. The SCM View component in Wind is listening for `sky://scm/update-group`. It
   receives the resource DTOs, updates its state, and re-renders — the user sees
   the list of modified files (e.g. `M src/main.ts`).

## Phase 4 — Diff view (Sky → Wind → Cocoon → Mountain)

10. The user clicks a changed file in the SCM view. The click handler opens the
    file with a `git:` scheme URI encoding the HEAD revision, e.g.
    `git:/src/main.ts?{"ref":"HEAD"}`.

11. `EditorService` recognises the `git:` scheme and creates a `DiffEditorInput`
    with two sides:
    - **Modified** — loaded from the workspace `file://` URI via
      `IFileService.readFile()` (the standard read path described in
      [Opening a File](/Doc/workflow-open-file)).
    - **Original** — requested from the `TextDocumentContentProvider` registered
      for `git:` by the Git extension in Cocoon.

12. Cocoon's Git extension receives the content request for the `git:` URI and
    sends another **`$gitExec` gRPC request** to Mountain:

    ```
    $gitExec  { repoPath, args: ["show", "HEAD:src/main.ts"] }
    ```

13. Mountain runs the command, captures the original file content, and returns
    it to Cocoon. Cocoon returns it to Wind as the `git:` document content.

14. `DiffEditorInput` now holds both sides. The editor opens the diff panel and
    the user sees the side-by-side comparison of their changes against HEAD.

## SCM input state synchronisation

The `inputBox.value`, `inputBox.placeholder`, `commitTemplate`, and
`acceptInputCommand` setters on the `SourceControl` object are wired back to
Mountain via a **`$scm:updateSourceControl`** gRPC call (carrying a
`SourceControlUpdateDTO`) every time the extension sets any of these properties.
Mountain updates `AppState.ActiveScmProviders` and emits a
`sky://scm/provider/changed` Tauri event so the Sky workbench input model stays
in sync with the extension's values.

- `inputBox.value` sends `{ inputBoxValue: V }` to Mountain, which updates the
  workbench commit input box.
- `inputBox.placeholder` sends `{ inputBoxPlaceholder: V }` and maps to
  `SourceControlUpdateDTO.InputBoxPlaceholder`.
- `commitTemplate` sends `{ commitTemplate: V }` and maps to
  `SourceControlUpdateDTO.InputBoxPlaceholder` on the Mountain side.
- `acceptInputCommand` sends `{ acceptInputCommand: V }` and maps to
  `SourceControlUpdateDTO.AcceptInputCommand`.
- Changes to `inputBox.value` in Cocoon must go through the `ScmProvider`
  service — direct DOM manipulation of the input box will not propagate to the
  extension.

When Mountain receives `$scm:updateSourceControl` it emits
`sky://scm/provider/changed` to the Sky renderer. The `InstallScm.ts` bridge
handler finds the matching shim by numeric handle and applies
`InputModel.setValue(newValue)` (or `applyEdits` as a fallback) so the workbench
commit input reflects the extension-set text, then fires `provider.onDidChange`
so the SCM panel re-renders.

The `sky://scm/register` bridge registration retries up to 10 times with 200 ms
between attempts before falling back to a DOM `CustomEvent` path, ensuring the
SCM viewlet populates even when the `__CEL_SERVICES__.SCM` workbench service
resolves late during startup.

> [!IMPORTANT] gRPC traffic between Mountain and Cocoon for SCM flows over port
> 50051 (Mountain Vine server, Mountain → Cocoon direction). The reverse Cocoon →
> Mountain notification push uses port 50052.
