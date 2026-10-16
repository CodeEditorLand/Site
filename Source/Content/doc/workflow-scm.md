---
title: "Source Control Management (SCM)"
section: "Workflows"
order: 7
description:
    "How the built-in Git extension registers an SCM provider in Cocoon, uses
    Mountain to run native git commands, and keeps the SCM view in Sky up to
    date."
---

SCM in [Land](https://github.com/CodeEditorLand/Land) is entirely extension-driven. The built-in Git extension in [Cocoon](https://github.com/CodeEditorLand/Cocoon)
owns all Git logic; [Mountain](https://github.com/CodeEditorLand/Mountain) provides two services it needs - a native
filesystem stat for repository detection and a `GitProvider` that safely spawns
`git` child processes. [Mountain](https://github.com/CodeEditorLand/Mountain) then brokers the resulting resource states to
[Sky](https://github.com/CodeEditorLand/Sky) via Tauri events.

<img src="/Mermaid/adbcc0a78658c231.svg" alt="Mermaid diagram" />
## Phase 1 - Registration and repository detection ([Cocoon](https://github.com/CodeEditorLand/Cocoon) → [Mountain](https://github.com/CodeEditorLand/Mountain))

1. On startup [Cocoon](https://github.com/CodeEditorLand/Cocoon) activates the built-in Git extension. Its `activate()`
   function calls:

    ```ts
    vscode.scm.createSourceControl("git", "Git");
    ```

    This call is handled by the `ScmProvider` service in [Cocoon](https://github.com/CodeEditorLand/Cocoon), which manages
    state for all registered SCM providers.

2. [Cocoon](https://github.com/CodeEditorLand/Cocoon)'s `ScmProvider` service sends a **`$registerScmProvider` gRPC
   request** to [Mountain](https://github.com/CodeEditorLand/Mountain), informing it that a provider for `"git"` is now
   managed by [Cocoon](https://github.com/CodeEditorLand/Cocoon).

3. The Git extension checks for a `.git` directory. Since it cannot use
   `require('fs')`, it uses the workspace filesystem API:

    ```ts
    vscode.workspace.fs.stat(Uri.joinPath(workspaceRoot, ".git"));
    ```

    This `stat` call traverses [Cocoon](https://github.com/CodeEditorLand/Cocoon)'s `FileSystemProvider` → gRPC → [Mountain](https://github.com/CodeEditorLand/Mountain) →
    `tokio::fs::metadata`. A successful result confirms the workspace is a Git
    repository.

## Phase 2 - Populating the SCM view ([Cocoon](https://github.com/CodeEditorLand/Cocoon) → [Mountain](https://github.com/CodeEditorLand/Mountain) → [Cocoon](https://github.com/CodeEditorLand/Cocoon))

4. The Git extension needs changed-file status. It cannot spawn `git` directly,
   so it calls [Mountain](https://github.com/CodeEditorLand/Mountain)'s `vscode.git` API which maps to a **`$gitExec` gRPC
   request**:

    ```
    $gitExec  { repoPath, args: ["status", "--porcelain", "-z"] }
    ```

5. [Mountain](https://github.com/CodeEditorLand/Mountain)'s gRPC server receives the `$gitExec` request and dispatches it to a
   `GitProvider` implementation on `MountainEnvironment`. The handler safely
   spawns a native child process:

    ```rust
    std::process::Command::new("git")
        .args(["status", "--porcelain", "-z"])
        .current_dir(repo_path)
    ```

    It captures stdout and returns the raw string to [Cocoon](https://github.com/CodeEditorLand/Cocoon).

6. The Git extension parses the output ("M src/main.ts", "A new-file.txt", etc.),
   builds a `SourceControlResourceState` array (each entry carrying a file URI
   and decoration metadata such as `"M"` for modified), and sets it on the
   `resourceGroups.Changes` resource group.

7. Setting `resourceStates` on the source control object triggers [Cocoon](https://github.com/CodeEditorLand/Cocoon)'s
   `ScmProvider` to serialize the new states into DTOs and send a
   **`$updateScmGroup` gRPC notification** to Mountain, containing the provider
   ID, the group ID (`"Changes"`), and the resource state DTO list.

8. [Mountain](https://github.com/CodeEditorLand/Mountain) updates `AppState.ActiveScmProviders` and emits a Tauri event to
   [Sky](https://github.com/CodeEditorLand/Sky):

    ```
    sky://scm/update-group  { providerId: "git", groupId: "Changes", resources: [...] }
    ```

## Phase 3 - SCM view rendering ([Sky](https://github.com/CodeEditorLand/Sky))

9. The SCM View component in [Wind](https://github.com/CodeEditorLand/Wind) is listening for `sky://scm/update-group`. It
   receives the resource DTOs, updates its state, and re-renders - the user sees
   the list of modified files (e.g. `M src/main.ts`).

## Phase 4 - Diff view ([Sky](https://github.com/CodeEditorLand/Sky) → [Wind](https://github.com/CodeEditorLand/Wind) → [Cocoon](https://github.com/CodeEditorLand/Cocoon) → [Mountain](https://github.com/CodeEditorLand/Mountain))

10. The user clicks a changed file in the SCM view. The click handler executes a
    command like `vscode.open` with a `git:` scheme URI encoding the HEAD
    revision, e.g. `git:/src/main.ts?{"ref":"HEAD"}`.

11. `EditorService` recognises the `git:` scheme and creates a `DiffEditorInput`
    with two sides:
    - **Modified** - loaded from the workspace `file://` URI via
      `IFileService.readFile()` (the standard read path described in
      [Opening a File](/Doc/workflow-open-file)).
    - **Original** - requested from the `TextDocumentContentProvider` registered
      for `git:` by the Git extension in Cocoon.

12. [Cocoon](https://github.com/CodeEditorLand/Cocoon)'s Git extension receives the content request for the `git:` URI and
    sends another **`$gitExec` gRPC request** to [Mountain](https://github.com/CodeEditorLand/Mountain):

    ```
    $gitExec  { repoPath, args: ["show", "HEAD:src/main.ts"] }
    ```

13. [Mountain](https://github.com/CodeEditorLand/Mountain) runs the command, captures the original file content, and returns
    it to [Cocoon](https://github.com/CodeEditorLand/Cocoon). [Cocoon](https://github.com/CodeEditorLand/Cocoon) returns it to [Wind](https://github.com/CodeEditorLand/Wind) as the `git:` document content.

14. `DiffEditorInput` now holds both sides. The editor opens the diff panel and
    the user sees the side-by-side comparison of their changes against HEAD.

## SCM input state synchronisation

Four `SourceControl` setters are wired back to [Mountain](https://github.com/CodeEditorLand/Mountain) via a
**`$scm:updateSourceControl`** gRPC call (a `sendRequest` round-trip, not a
fire-and-forget notification) every time the extension sets any of these
properties:

| Setter                 | DTO field             | Value sent                   |
| ---------------------- | --------------------- | ---------------------------- |
| `inputBox.value`       | `InputBoxValue`       | `{ inputBoxValue: V }`       |
| `inputBox.placeholder` | `InputBoxPlaceholder` | `{ inputBoxPlaceholder: V }` |
| `commitTemplate`       | `InputBoxPlaceholder` | `{ commitTemplate: V }`      |
| `acceptInputCommand`   | `AcceptInputCommand`  | `{ acceptInputCommand: V }`  |

Changes to `inputBox.value` in [Cocoon](https://github.com/CodeEditorLand/Cocoon) must go through the `ScmProvider` service
via the `$scm:updateSourceControl` call - direct DOM manipulation of the input
box will not propagate to the extension.

When [Mountain](https://github.com/CodeEditorLand/Mountain) receives `$scm:updateSourceControl` it emits
**`sky://scm/provider/changed`** to the [Sky](https://github.com/CodeEditorLand/Sky) renderer with the updated provider
state. The [`InstallScm.ts`](https://github.com/CodeEditorLand/Sky/tree/Current/Source/Function/Sky/Bridge.ts) bridge handler finds the matching shim by numeric
handle and applies `InputModel.setValue(newValue)` (or `applyEdits` as a
fallback) so the workbench commit input reflects the extension-set text, then
fires `provider.onDidChange` so the SCM panel re-renders.

## sky://scm/register retry

The `sky://scm/register` registration in the [Sky](https://github.com/CodeEditorLand/Sky) bridge calls
`__CEL_SERVICES__.SCM.registerSCMProvider()`. Because `__CEL_SERVICES__.SCM` is
populated asynchronously by the [Output](https://github.com/CodeEditorLand/Output) service accessor, there is a potential
race on startup. The bridge retries registration up to **10 times with 200 ms
between attempts** before falling back to a DOM `CustomEvent` path, ensuring the
SCM viewlet populates even when the workbench service resolves late during
startup.

> [!IMPORTANT] gRPC traffic between [Mountain](https://github.com/CodeEditorLand/Mountain) and [Cocoon](https://github.com/CodeEditorLand/Cocoon) for SCM flows over port
> 50051 ([Mountain](https://github.com/CodeEditorLand/Mountain) [Vine](https://github.com/CodeEditorLand/Vine) server, [Mountain](https://github.com/CodeEditorLand/Mountain) → [Cocoon](https://github.com/CodeEditorLand/Cocoon) direction). The reverse [Cocoon](https://github.com/CodeEditorLand/Cocoon) →
> [Mountain](https://github.com/CodeEditorLand/Mountain) notification push uses port 50052.
