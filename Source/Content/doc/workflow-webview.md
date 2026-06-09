---
title: "Creating and Interacting with a Webview Panel"
section: "Workflow"
order: 13
description:
    "Extension-contributed webview lifecycle: Cocoon requests panel, Mountain
    manages native webview, messages proxy back and forth."
---

# Creating and Interacting with a Webview Panel

Details the full lifecycle of extension-contributed UI, from Cocoon requesting a
panel to Mountain managing the native webview and proxying messages.

## Lifecycle

```
Extension calls createWebviewPanel(viewType, title, viewColumn, options)
  -> Cocoon WebviewPanelProvider.CreateWebviewPanel Effect
  -> IpcProvider sends $createWebviewPanel gRPC to Mountain
  -> Mountain generates unique handle (UUID)
  -> Mountain creates WebviewStateDto, stores in AppState.ActiveWebviews
  -> Mountain emits Tauri event: sky://webview/create
  -> Mountain sends handle back to Cocoon as gRPC response

Cocoon:
  -> Creates WebviewPanelShim and WebviewShim, stores handle
  -> Returns WebviewPanelShim to extension

Wind/UI:
  -> WebviewManagementService receives sky://webview/create
  -> Dynamically creates TauriWebviewWindow or iframe, associates with handle

Extension sets content:
  -> panel.webview.html = "<h1>Hello</h1>"
  -> WebviewShim sends $setWebviewHtml gRPC to Mountain
  -> Mountain emits sky://webview/set-html event
  -> Wind sets inner HTML of webview element
  -> User sees content

User interaction:
  -> User clicks button in webview
  -> vscode.postMessage({ command: 'doSomething' })
  -> Wind sends TauriInvoke('mountain://webview/on-message')
  -> Mountain looks up webview's owner sidecar
  -> Mountain sends $onDidReceiveMessage gRPC to Cocoon
  -> Cocoon WebviewPanelProvider fires onDidReceiveMessage event
  -> Extension receives message payload
```

## Phase 1: Extension Creates the Webview (Cocoon)

1. Extension's `activate()` runs. Calls
   `window.createWebviewPanel(viewType, title, viewColumn, options)`.
2. `WebviewPanelProvider` in Cocoon constructs a DTO with all panel options,
   extension ID, and `localResourceRoots` location.
3. Sends `$createWebviewPanel` gRPC request to Mountain, awaits a unique handle.

## Phase 2: Host Creates the Native Webview (Mountain)

4. `$createWebviewPanel` request dispatched to `WebviewProvider` trait.
5. `WebviewProvider.CreateWebviewPanel()` generates a UUID handle, creates
   `WebviewStateDto`, stores in `AppState.ActiveWebviews`.
6. Emits `sky://webview/create` Tauri event to Sky frontend.
7. Sends the handle back to Cocoon as the gRPC response.

## Phase 3: UI Renders the Webview (Wind/Sky)

8. `WebviewManagementService` receives the `sky://webview/create` event.
9. Creates a new `TauriWebviewWindow` or iframe within the main window's DOM,
   associated with the handle.

## Phase 4: Content and Interaction (Cocoon <-> Mountain <-> Wind)

10. Cocoon creates `WebviewPanelShim` and `WebviewShim` with the handle, returns
    it to the extension.
11. Extension sets `panel.webview.html`. The Shim sends `$setWebviewHtml` gRPC
    to Mountain.
12. Mountain emits `sky://webview/set-html` event. Wind sets the inner HTML of
    the webview.
13. User clicks a button in the webview, calling `vscode.postMessage()`.
14. Wind sends
    `TauriInvoke('mountain://webview/on-message', { Handle, Message })`.
15. Mountain looks up the webview's owner sidecar and sends
    `$onDidReceiveMessage` gRPC to Cocoon.
16. Cocoon fires `onDidReceiveMessage` event. Extension receives the message
    payload.

## Key Source Files

- `Mountain/Source/Environment/WebviewProvider.rs` -- webview creation and HTML
  management
- `Cocoon/src/Service/WebviewPanel.ts` -- webview panel provider
- `Cocoon/src/Service/Ipc.ts` -- IPC provider

---

## See Also

- [Architecture Overview](https://editor.land/Doc/architecture)
