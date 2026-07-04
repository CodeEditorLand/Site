---
title: "User Data Synchronization"
section: "Workflows"
order: 8
description:
    "How settings, keybindings, and extension state are persisted via Mountain
    storage and optionally synchronised across sessions."
---

## Overview

A user logs into their account on a new machine. The application automatically
downloads their settings (`settings.json`), keybindings, and list of installed
extensions from a remote server and applies them to the new installation.

The full flow involves six phases:

1. Local persistence (Cocoon → Mountain)
2. User authentication (Wind → Cocoon → Mountain)
3. Sync trigger and orchestration (Mountain)
4. Settings synchronisation and three-way merge (Mountain)
5. Configuration reload and notification (Mountain → Cocoon + Sky)
6. UI and extension host reaction

---

## Phase 1 - Local persistence (Cocoon → Mountain)

1. Extension context `workspaceState` and `globalState` are Memento objects
   backed by Mountain storage. Every `state.update(key, value)` call sends a
   `storage:set` IPC request to Mountain:

    ```ts
    TauriInvoke("storage:set", { key, value, scope });
    ```

2. Mountain persists the value to its storage backend. The same path is used for
   all Memento writes - workspace state, global state, and the VS Code
   `ConfigurationService` settings cache all go through `storage:set`.

3. Extension `secrets` follow the same path with an encryption layer:
    - `context.secrets.store(key, value)` calls Mountain `encryption:encrypt`
      with the plaintext value, then `storage:set` with the ciphertext.
    - `context.secrets.get(key)` calls `storage:get` for the ciphertext and then
      `encryption:decrypt` to recover the plaintext.
    - `context.secrets.delete(key)` calls `storage:set` with an empty string
      rather than removing the key entirely. This means a `secrets.get(key)`
      after `secrets.delete(key)` returns `undefined` (the empty string is
      interpreted as a tombstone), but the storage record itself is not removed
      - the key still exists in the backing store with an empty ciphertext
      value.

    Mountain encrypts with AES-256-GCM using a SHA-256 hash of the machine UUID
    as the key, derived in `Encryption/Key.rs`. This makes the key machine-stable
    across sessions. The `onDidChange` event fires synchronously after every
    `store` or `delete` call, but only if the underlying value actually changed
    - calls setting the same value as the current state are silently coalesced.
    Secrets are never written to disk in plaintext.

### Extension storage via Mountain

Extension `workspaceState` and `globalState` (`Memento`) are backed by Mountain
`storage:get` / `storage:set` IPC rather than a local file. The `Memento`
implementation reads initial values via `storage:get` during activation and
writes through `storage:set` on every `update()` call. This means extension
state persists across Cocoon restarts without the extension needing to manage
its own storage file.

### Extension secrets via Mountain encryption

`context.secrets` uses Mountain's AES-256-GCM encryption layer rather than
plaintext storage:

- `secrets.store(key, value)` calls Mountain `encryption:encrypt` with the
  plaintext value, then `storage:set` with the ciphertext.
- `secrets.get(key)` calls `storage:get` for the ciphertext and then
  `encryption:decrypt` to recover the plaintext.
- `secrets.delete(key)` calls `storage:set` with an empty string - a tombstone
  marker rather than a key removal. After a delete, `secrets.get(key)` returns
  `undefined`, but the backing store still holds the record.

The encryption key is derived from a SHA-256 hash of the machine UUID
(`Encryption/Key.rs`), making it machine-stable across sessions. Secrets are
never written to disk in plaintext. The `onDidChange` event fires synchronously
after every `store` or `delete` call, but only if the underlying value actually
changed - calls setting the same value as the current state are silently
coalesced to avoid spurious notifications.

---

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

---

## Phase 3 - Sync trigger and orchestration (Mountain)

7. `UserDataAutoSyncService` is triggered after a successful sign-in. It can
   also be triggered manually or on a configurable interval.

8. The service calls `UserDataSyncService.sync()`, which iterates through all
   registered synchronisers in order: `SettingsSynchronizer`,
   `KeybindingsSynchronizer`, `ExtensionsSynchronizer`, and others.

---

## Phase 4 - Settings synchronisation and three-way merge (Mountain)

9. `SettingsSynchronizer` uses `UserDataSyncStoreService` (an HTTP client) to
   make an authenticated GET request to the configured cloud endpoint:

    ```
    GET /user/data/settings
    Authorization: Bearer ***
    ```

10. The remote server validates the token and returns the stored `settings.json`
    content.

11. `SettingsSynchronizer` reads the local `settings.json` via the `FsReader`
    Effect, then performs a **three-way merge** comparing:
    - **Local** - current on-disk content.
    - **Remote** - content just fetched from the cloud.
    - **Base** - the state from the last successful sync, stored locally as a
      reference point.

    The merge logic (modelled on
    `vs/platform/userDataSync/common/settingsMerge.ts`) intelligently combines
    changes. It processes each setting key individually:
    - **Key present only in Local:** the local value is carried forward - this
      is a setting added on the current machine since the last sync.
    - **Key present only in Remote:** the remote value is adopted - this is a
      setting added on another machine that needs to arrive on this one.
    - **Key present in both Local and Remote, same value:** accepted as-is.
    - **Key present in both Local and Remote, changed from Base in only one:**
      the changed value wins (fast-forward merge).
    - **Key present in both Local and Remote, changed from Base in both to
      different values:** a direct conflict. The merge produces a marker entry
      with both values, and the conflict is flagged for the user to resolve
      through the Settings UI. The synchroniser stores the conflicting state
      rather than silently overwriting.

    The same three-way merge strategy is applied independently for settings,
    keybindings, snippets, and the extension list - each with its own
    synchroniser and its own base checkpoint.

12. `FsWriter` writes the merged content back to `settings.json` on disk,
    overwriting the previous local file atomically.

---

## Phase 5 - Configuration reload and notification (Mountain → Cocoon + Sky)

13. `ConfigurationService.reloadConfiguration()` re-reads all settings files
    from disk, reconstructs the effective configuration by merging layer by
    layer (defaults, user settings, workspace settings, machine overrides), and
    updates `AppState.Configuration`.

14. Mountain sends a **`$acceptConfigurationChanged` gRPC notification** to
    Cocoon listing the changed keys. This allows Cocoon's internal
    `ConfigurationProvider` to update its cache without waiting for extensions
    to request it lazily.

15. Mountain emits a Tauri event to Sky:

    ```
    sky://configuration/changed  { changedKeys: [...] }
    ```

16. Cocoon's `ConfigurationProvider` receives the gRPC notification, updates
    its internal configuration cache, and fires the
    `onDidChangeConfiguration` event. This event is exposed to every extension
    as `vscode.workspace.onDidChangeConfiguration`. The event payload includes
    an `affectsConfiguration(section)` function so extensions can efficiently
    check whether their own setting namespace was touched without parsing the
    full changed-keys list.

17. Wind components listening for `sky://configuration/changed` re-render - the
    Settings UI shows new values and the editor applies properties such as
    `editor.fontSize` immediately. The same pattern repeats for keybindings,
    snippets, and extension list synchronisers.

18. Extensions that registered a listener for `onDidChangeConfiguration`
    receive the event. A typical extension response is:

    ```ts
    context.subscriptions.push(
    	vscode.workspace.onDidChangeConfiguration((e) => {
    		if (e.affectsConfiguration("myExtension")) {
    			const config = vscode.workspace.getConfiguration("myExtension");
    			// Apply new config values
    		}
    	}),
    );
    ```

    This ensures extensions adapt to synced settings in real time without
    requiring a reload or restart.

---

> [!IMPORTANT]
> The `TierAuth` tier variable defaults to `Node`, routing authentication
> requests to Cocoon. `TierEncryption` defaults to `Mountain`, so `secrets`
> storage always uses the native AES-256-GCM path regardless of the auth tier.
> Changing `TierAuth` to `Mountain` requires a corresponding Mountain-side OAuth
> handler to be present; the Cocoon path remains the reference implementation.
