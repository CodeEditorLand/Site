---
title: "User Data Synchronization"
section: "Workflows"
order: 8
description:
    "How settings, keybindings, and extension state are persisted via Mountain
    storage and optionally synchronised across sessions."
---

User data in Land has two layers: local persistence backed by Mountain's
`storage:set` / `storage:get` IPC (SQLite or keychain depending on sensitivity),
and optional remote synchronisation via authenticated HTTP calls to a cloud
endpoint. Both layers feed the same `ConfigurationService` reload path, so
extensions and the UI react identically regardless of whether a change came from
the local disk or a remote merge.

## Phase 1 - Local persistence (Cocoon → Mountain)

1. Extension context `workspaceState` and `globalState` are Memento objects
   backed by Mountain storage. Every `state.update(key, value)` call in an
   extension sends a `storage:set` IPC request to Mountain:

    ```ts
    TauriInvoke("storage:set", { key, value, scope });
    ```

2. Mountain persists the value to its storage backend. The same path is used for
   all Memento writes - workspace state, global state, and the VS Code
   `ConfigurationService` settings cache all go through `storage:set`.

3. Extension `secrets` follow the same path with an encryption layer:

    - `context.secrets.store(key, value)` calls Mountain `encryption:encrypt`
      with the plaintext value, then `storage:set` with the ciphertext.
    - `context.secrets.get(key)` calls `storage:get` for the ciphertext and
      then `encryption:decrypt` to recover the plaintext.
    - `context.secrets.delete(key)` calls `storage:set` with an empty string.

    Mountain encrypts with AES-256-GCM using a SHA-256 hash of the machine UUID
    as the key. The `onDidChange` event fires after every `store` or `delete`
    call. Secrets are never written to disk in plaintext.

## Phase 2 - User authentication (Wind → Cocoon → Mountain)

4. The user clicks "Sign In" in the Account menu. Wind dispatches
   `workbench.action.authentication.signIn`.

5. `AuthenticationService` in Wind triggers a request to Cocoon's
   `AuthenticationProvider`. Cocoon sends a **`$getSession` gRPC request** to
   Mountain.

6. Mountain's authentication handler opens a browser window for the OAuth flow
   and listens on a callback URI. On success, the OAuth token is stored in the
   system keyring via `SecretsProvider`. `UserDataSyncAccountService` in
   Mountain now holds the user identity and a valid token for authenticated API
   calls.

## Phase 3 - Sync trigger and orchestration (Mountain)

7. `UserDataAutoSyncService` is triggered after a successful sign-in. It can
   also be triggered manually or on a configurable interval.

8. The service calls `UserDataSyncService.sync()`, which iterates through all
   registered synchronisers in order: `SettingsSynchronizer`,
   `KeybindingsSynchronizer`, `ExtensionsSynchronizer`, and others.

## Phase 4 - Settings synchronisation and three-way merge (Mountain)

9. `SettingsSynchronizer` uses `UserDataSyncStoreService` (an HTTP client) to
   make an authenticated GET request to the configured cloud endpoint:

    ```
    GET /user/data/settings
    Authorization: Bearer <token>
    ```

10. The remote server validates the token and returns the stored `settings.json`
    content.

11. `SettingsSynchronizer` reads the local `settings.json` via the `FsReader`
    Effect, then performs a **three-way merge** comparing:
    - **Local** - current on-disk content.
    - **Remote** - content just fetched.
    - **Base** - the state from the last successful sync, stored locally as a
      reference point.

    Settings added on different machines are both preserved. A direct conflict
    on the same key is flagged for the user to resolve.

12. `FsWriter` writes the merged content back to `settings.json` on disk.

## Phase 5 - Configuration reload and notification (Mountain → Cocoon + Sky)

13. `ConfigurationService.reloadConfiguration()` re-reads all settings files,
    reconstructs the effective configuration, and updates
    `AppState.Configuration`.

14. Mountain sends a **`$acceptConfigurationChanged` gRPC notification** to
    Cocoon listing the changed keys.

15. Mountain emits a Tauri event to Sky:

    ```
    sky://configuration/changed  { changedKeys: […] }
    ```

16. Cocoon's `ConfigurationProvider` updates its internal cache and fires the
    `onDidChangeConfiguration` event, which extensions receive as
    `vscode.workspace.onDidChangeConfiguration`. Extensions call
    `vscode.workspace.getConfiguration()` to read their new values and adjust
    behaviour.

17. Wind components listening for `sky://configuration/changed` re-render - the
    Settings UI shows new values and the editor applies properties such as
    `editor.fontSize` immediately. The same pattern repeats for keybindings,
    snippets, and extension list synchronisers.

> [!IMPORTANT] The `TierAuth` tier variable defaults to `Node`, routing
> authentication requests to Cocoon. `TierEncryption` defaults to `Mountain`, so
> `secrets` storage always uses the native AES-256-GCM path regardless of the
> auth tier. Changing `TierAuth` to `Mountain` requires a corresponding
> Mountain-side OAuth handler to be present; the Cocoon path remains the
> reference implementation.
