---
title: "Creating and Interacting with a Webview Panel"
section: "Workflows"
order: 5
description:
    "How an extension creates a native webview panel via Cocoon and Mountain,
    sets HTML content, and exchanges messages with the host."
---

Webview panels let extensions embed arbitrary HTML inside the editor. The panel
itself is a native Tauri webview managed by Mountain; Cocoon holds a lightweight
shim that proxies property assignments and message events across gRPC. Every
`panel.webview.html` assignment and every `postMessage` call crosses the full
Cocoon → Mountain → Sky path.

## Phase 1 — Extension creates the panel (Cocoon → Mountain)

1. The extension's `activate()` function runs and calls:

    ```ts
    vscode.window.createWebviewPanel(viewType, title, viewColumn, options);
    ```

2. Cocoon's `WebviewPanelProvider` constructs a creation DTO containing all
   panel options, the extension ID, and the extension's on-disk location (used
   to resolve `localResourceRoots`).

3. Cocoon sends a **`$createWebviewPanel` gRPC request** to Mountain and awaits
   a unique handle in the response.

## Phase 2 — Mountain allocates the native handle (Mountain → Sky)

4. Mountain's Vine gRPC server dispatches the request to
   `WebviewProvider.CreateWebviewPanel()` on the `MountainEnvironment`.

5. The method generates a UUID handle, creates a `WebviewStateDto` with the
   received options, and stores it in `AppState.ActiveWebviews` keyed on the
   handle.

6. Mountain emits a Tauri event to the Sky frontend:

    ```
    sky://webview/create  { handle, title, viewColumn, ... }
    ```

7. Mountain returns the handle to Cocoon as the gRPC response.

## Phase 3 — Sky renders the empty panel (Sky)

8. A listener in Wind's `WebviewManagementService` receives the
   `sky://webview/create` event, creates a new `TauriWebviewWindow` or an
   `<iframe>` element inside the main window's DOM, and associates it with the
   handle. The webview is initially empty.

## Phase 4 — Extension sets content (Cocoon → Mountain → Sky)

9. Cocoon receives the handle from the gRPC response and constructs a
   `WebviewPanelShim` and `WebviewShim` that store the handle internally. It
   returns the `WebviewPanelShim` to the extension.

10. The extension sets the panel's HTML:

    ```ts
    panel.webview.html = "<h1>Hello World</h1>";
    ```

    The `set html` accessor on `WebviewShim` sends a **`$setWebviewHtml` gRPC
    request** to Mountain carrying the handle and the HTML string.

11. Mountain's `WebviewProvider` receives `$setWebviewHtml`, looks up the handle
    in `AppState.ActiveWebviews`, then emits:

    ```
    sky://webview/set-html  { handle, html }
    ```

12. Wind's webview manager receives the event, finds the element associated with
    the handle, and sets its HTML. "Hello World" is now visible in the panel.

## Phase 5 — Bidirectional message passing (Sky → Mountain → Cocoon)

13. The user clicks a button inside the webview. The webview's content script
    calls `vscode.postMessage({ command: "doSomething" })` using the `vscode`
    object injected by the preload script.

14. Wind intercepts the message and calls:

    ```ts
    TauriInvoke("mountain://webview/on-message", { handle, message });
    ```

15. Mountain receives the command, looks up the owning sidecar (`"cocoon-main"`)
    for the handle in `AppState.ActiveWebviews`, and sends a
    **`$onDidReceiveMessage` gRPC notification** to Cocoon with the handle and
    message payload.

16. Cocoon's `WebviewPanelProvider` finds the `WebviewShim` for the handle and
    fires its `onDidReceiveMessage` event emitter. The extension's listener
    receives `{ command: "doSomething" }` and reacts accordingly. The
    communication loop is complete.

## Phase 6 — Disposal

17. The extension calls `panel.dispose()` or the user closes the webview tab.
    Cocoon sends a **`$disposeWebviewPanel` gRPC request** to Mountain. Mountain
    removes the entry from `AppState.ActiveWebviews`, emits a Tauri close event
    to Sky, and Wind tears down the webview DOM element.

> [!WARNING] The webview messaging bridge (`$onDidReceiveMessage` gRPC) requires
> the `Environment/WebviewProvider/Messaging.rs` handler to be present in the
> Mountain build. If `setup_webview_message_listener_impl` is absent, messages
> posted from the webview content are silently dropped and the extension never
> receives them. This affects all panel-based extensions including Roo, Continue,
> and Continue.
