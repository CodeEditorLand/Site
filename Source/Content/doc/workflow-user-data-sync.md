---
title: "User Data Synchronization"
section: "Workflow"
order: 18
description:
    "End-to-end sync of user settings: authentication, remote fetch, three-way
    merge, local apply, and notification of all components."
---

# User Data Synchronization

Describes the process of syncing user settings: user authentication, fetching
data from a remote store, three-way merge, applying changes locally, and
notifying all parts of the application.

Verify against `Mountain/Source/Environment/SynchronizationProvider.rs` for the
actual implementation.

## Data Flow

```
Phase 1: Authentication
  User clicks "Sign In"
  -> AuthenticationService triggers OAuth session request
  -> Cocoon AuthenticationProvider sends $getSession gRPC to Mountain
  -> Mountain handles OAuth flow (browser redirect, callback)
  -> Token stored securely in keyring via SecretsProvider
  -> User signed in, UserDataSyncAccountService has identity + token

Phase 2: Triggering Synchronization
  -> UserDataAutoSyncService triggered (after sign-in, manual, or interval)
  -> Calls UserDataSyncService.sync()
  -> Iterates through registered synchronizers (settings, extensions, etc.)

Phase 3: Synchronizing Settings
  -> SettingsSynchronizer.fetches remote settings via UserDataSyncStoreService
  -> GET request to cloud endpoint with OAuth token
  -> Remote server returns stored settings.json
  -> Mountain reads local settings.json via FsReader
  -> Three-way merge: local + remote + base (last sync state)
  -> Resolves conflicts intelligently

Phase 4: Applying Merged State
  -> FsWriter writes merged settings.json to disk
  -> ConfigurationService.reloadConfiguration()
  -> Re-reads config files, reconstructs effective configuration
  -> Updates AppState.Configuration
  -> $acceptConfigurationChanged gRPC to Cocoon
  -> sky://configuration/changed Tauri event to Wind

Phase 5: UI and Extension Host React
  -> Cocoon ConfigurationProvider updates cache
  -> Fires onDidChangeConfiguration (vscode.workspace.onDidChangeConfiguration)
  -> Wind settings UI re-renders with new values
  -> Editor applies settings like fontSize
  -> Extensions receive new settings, adjust behavior
```

## Phase 1: User Authentication (Wind/Sky -> Cocoon -> Mountain)

1. User clicks "Sign In" in the Account menu.
   `workbench.action.authentication.signIn` dispatched.
2. `AuthenticationService` in Wind triggers a request to Cocoon's
   `AuthenticationProvider`.
3. Cocoon makes `$getSession` gRPC to Mountain. Mountain handles OAuth flow
   (browser window, callback URI).
4. OAuth token stored in system keyring via `SecretsProvider`.
   `UserDataSyncAccountService` receives identity and token.

## Phase 2: Triggering Synchronization (Mountain)

5. `UserDataAutoSyncService` triggers (post-sign-in, manual, or scheduled).
   Orchestrates what to sync and in order.
6. Calls `UserDataSyncService.sync()`, which iterates through registered
   synchronizers (settings, extensions, keybindings, snippets).

## Phase 3: Three-Way Merge (Mountain)

7. `SettingsSynchronizer` fetches remote `settings.json` via authenticated GET
   to a cloud endpoint.
8. Reads local `settings.json` via `FsReader`.
9. Performs three-way merge: compares local, remote, and base versions (state
   from last successful sync, stored locally).
10. Intelligently combines changes: if user added settings on both machines,
    merge contains both. Direct conflicts flagged for user resolution.

## Phase 4: Applying Changes (Mountain)

11. `FsWriter` writes merged content back to local `settings.json`.
12. `ConfigurationService.reloadConfiguration()` re-reads all settings files,
    reconstructs effective configuration, updates `Configuration` in `AppState`.

## Phase 5: Notify Cocoon and Wind (Mountain -> All)

13. `ConfigurationService` sends `$acceptConfigurationChanged` gRPC to Cocoon
    with changed key summary.
14. Emits `sky://configuration/changed` Tauri event to Wind/Sky.
15. Cocoon's `ConfigurationProvider` updates its cache, fires
    `onDidChangeConfiguration` to extensions.
16. Wind components re-render with new values.

## Key Source Files

- `Mountain/Source/Environment/SynchronizationProvider.rs` -- sync
  implementation (verify)
- `vs/platform/userDataSync/common/settingsMerge.ts` -- merge logic

---

## See Also

- [Application Startup and Handshake](https://Editor.Land/Doc/workflow-startup)
- [Architecture Overview](https://Editor.Land/Doc/architecture)
