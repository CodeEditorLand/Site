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

```mermaid
flowchart TB
    subgraph C1["Phase 1: Registration & Discovery"]
        GA["Git Extension<br/>activate()"]
        CSC["vscode.scm.createSourceControl()"]
        CSP["ScmProvider Service"]
        M1["$registerScmProvider<br/>gRPC to Mountain"]
        WF["vscode.workspace.workspaceFolders"]
        STAT["vscode.workspace.fs.stat<br/>(.git directory)"]
        M2["tokio::fs::metadata<br/>native call"]
        CONF[".git exists"]
    end

    subgraph C2["Phase 2: Populate SCM View"]
        GS["git.status<br/>--porcelain -z"]
        API["vscode.git API"]
        M3["$gitExec<br/>gRPC to Mountain"]
        GP["GitProvider<br/>spawn git process"]
        STDOUT["stdout: raw output"]
        PARSE["Parse status<br/>build file list"]
        SRS["SourceControlResourceState<br/>URI + decorations"]
        RGS["resourceGroups.Changes<br/>update state"]
        M4["$updateScmGroup<br/>gRPC notification"]
        E1["sky://scm/update-group<br/>Tauri event"]
    end

    subgraph C3["Phase 3: UI Rendering"]
        SCM["SCM View Component"]
        LIST["Render file list<br/>e.g., M src/main.ts"]
    end

    subgraph C4["Phase 4: Diff View"]
        USR["User clicks file"]
        CMD["vscode.open<br/>with git: URI"]
        DEI["DiffEditorInput"]
        MOD["Modified side<br/>file:// URI<br/>IFileService.read"]
        ORIG["Original side<br/>git: URI<br/>Content Provider"]
        M5["$gitExec<br/>git show HEAD:file"]
        ORG_CONT["Original content<br/>from Mountain"]
        DIFF["DiffEditor<br/>side-by-side view"]
    end

    GA --> CSC
    CSC --> CSP
    CSP --> M1
    WF --> STAT
    STAT --> M2
    M2 --> CONF
    CONF --> GS
    GS --> API
    API --> M3
    M3 --> GP
    GP --> STDOUT
    STDOUT --> PARSE
    PARSE --> SRS
    SRS --> RGS
    RGS --> M4
    M4 --> E1
    E1 --> SCM
    SCM --> LIST
    LIST --> USR
    USR --> CMD
    CMD --> DEI
    DEI -->|load both sides| MOD
    DEI -->|load both sides| ORIG
    MOD -->|standard read| FS["IFileService"]
    ORIG --> M5
    M5 --> GP2["GitProvider<br/>git show"]
    GP2 --> ORG_CONT
    ORG_CONT --> ORIG
    FS --> MOD_CONT["Modified content"]
    MOD_CONT --> DIFF
    ORG_CONT --> DIFF
    DIFF -->|"side-by-side"| VIEW["User sees diff"]

    style C1 fill:#e1f5ff
    style C2 fill:#fff4e1
    style C3 fill:#ffe1f5
    style C4 fill:#e1ffe1
```

## Phase 1 — Registration and repository detection (Cocoon → Mountain)

1. On startup Cocoon activates the built-in Git extension. Its `activate()`
   function calls:

    ```ts
    vscode.scm.createSourceControl("git", "Git");
    ```

    This call is handled by the `ScmProvider` service in Cocoon, which manages
    state for all registered SCM providers.

2. Cocoon's `ScmProvider` service sends a **`$registerScmProvider` gRPC
   request** to Mountain, informing it that a provider for `"git"` is now
   managed by Cocoon.

3. The Git extension checks for a `.git` directory. Since it cannot use
   `require('fs')`, it uses the workspace filesystem API:

    ```ts
    vscode.workspace.fs.stat(Uri.joinPath(workspaceRoot, ".git"));
    ```

    This `stat` call traverses Cocoon's `FileSystemProvider` → gRPC → Mountain →
    `tokio::fs::metadata`. A successful result confirms the workspace is a Git
    repository.

## Phase 2 — Populating the SCM view (Cocoon → Mountain → Cocoon)

4. The Git extension needs changed-file status. It cannot spawn `git` directly,
   so it calls Mountain's `vscode.git` API which maps to a **`$gitExec` gRPC
   request**:

    ```
    $gitExec  { repoPath, args: ["status", "--porcelain", "-z"] }
    ```

5. Mountain's gRPC server receives the `$gitExec` request and dispatches it to a
   `GitProvider` implementation on `MountainEnvironment`. The handler safely
   spawns a native child process:

    ```rust
    std::process::Command::new("git")
        .args(["status", "--porcelain", "-z"])
        .current_dir(repo_path)
    ```

    It captures stdout and returns the raw string to Cocoon.

6. The Git extension parses the output ("M src/main.ts", "A new-file.txt", etc.),
   builds a `SourceControlResourceState` array (each entry carrying a file URI
   and decoration metadata such as `"M"` for modified), and sets it on the
   `resourceGroups.Changes` resource group.

7. Setting `resourceStates` on the source control object triggers Cocoon's
   `ScmProvider` to serialize the new states into DTOs and send a
   **`$updateScmGroup` gRPC notification** to Mountain, containing the provider
   ID, the group ID (`"Changes"`), and the resource state DTO list.

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

10. The user clicks a changed file in the SCM view. The click handler executes a
    command like `vscode.open` with a `git:` scheme URI encoding the HEAD
    revision, e.g. `git:/src/main.ts?{"ref":"HEAD"}`.

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

Four `SourceControl` setters are wired back to Mountain via a
**`$scm:updateSourceControl`** gRPC call (a `sendRequest` round-trip, not a
fire-and-forget notification) every time the extension sets any of these
properties:

| Setter                 | DTO field             | Value sent                   |
| ---------------------- | --------------------- | ---------------------------- |
| `inputBox.value`       | `InputBoxValue`       | `{ inputBoxValue: V }`       |
| `inputBox.placeholder` | `InputBoxPlaceholder` | `{ inputBoxPlaceholder: V }` |
| `commitTemplate`       | `InputBoxPlaceholder` | `{ commitTemplate: V }`      |
| `acceptInputCommand`   | `AcceptInputCommand`  | `{ acceptInputCommand: V }`  |

Changes to `inputBox.value` in Cocoon must go through the `ScmProvider` service
via the `$scm:updateSourceControl` call — direct DOM manipulation of the input
box will not propagate to the extension.

When Mountain receives `$scm:updateSourceControl` it emits
**`sky://scm/provider/changed`** to the Sky renderer with the updated provider
state. The `InstallScm.ts` bridge handler finds the matching shim by numeric
handle and applies `InputModel.setValue(newValue)` (or `applyEdits` as a
fallback) so the workbench commit input reflects the extension-set text, then
fires `provider.onDidChange` so the SCM panel re-renders.

## sky://scm/register retry

The `sky://scm/register` registration in the Sky bridge calls
`__CEL_SERVICES__.SCM.registerSCMProvider()`. Because `__CEL_SERVICES__.SCM` is
populated asynchronously by the Output service accessor, there is a potential
race on startup. The bridge retries registration up to **10 times with 200 ms
between attempts** before falling back to a DOM `CustomEvent` path, ensuring the
SCM viewlet populates even when the workbench service resolves late during
startup.

> [!IMPORTANT] gRPC traffic between Mountain and Cocoon for SCM flows over port
> 50051 (Mountain Vine server, Mountain → Cocoon direction). The reverse Cocoon →
> Mountain notification push uses port 50052.
