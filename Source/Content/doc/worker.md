---
title: "Worker"
section: "Element"
order: 24
description: "The Service Worker that serves VS Code application assets inside WKWebView and WebView2."
---

# Worker

Worker is the Service Worker layer for Editor.Land. It runs inside the
WebView (WKWebView on macOS, WebView2 on Windows) and intercepts all
requests for the `/Static/Application/` asset tree - serving them from
cache with a cache-first strategy, handling CSS-as-JS-module conversion,
and notifying the editor when a new build version is available.

Worker is implemented and active in the current `debug-mountain` build.
The main implementation is `Source/Worker.ts` (~11 KB).

---

## Why a Service Worker Inside a Native App

Editor.Land serves the VS Code workbench from a local HTTP server run by
Mountain. The workbench consists of thousands of files in
`/Static/Application/`. Loading all of them from the local server on every
launch would be slow and redundant.

By running a Service Worker inside the WebView, Worker intercepts those
requests and serves assets directly from the browser cache after the first
load. The result is a near-instant workbench on every launch after the initial
cache warm.

---

## Cache Architecture

Worker maintains two versioned cache stores. Both are stamped with a build
`INCREMENT` constant injected at compile time:

| Cache | Purpose |
|---|---|
| `Core-{INCREMENT}` | Navigation responses - workbench HTML shell |
| `Asset-{INCREMENT}` | Application asset files under `/Static/Application/` |

When a new build is deployed, the `INCREMENT` changes. On activate, Worker
deletes all caches whose names are not in the current set, removing stale
assets automatically. Clients receive a `{ Version: "New" }` postMessage when
a new version activates, so the editor can prompt for a refresh.

---

## Fetch Strategies

Worker applies three distinct strategies based on request type:

**Navigation requests** (the workbench HTML shell) use **network-first**:
fetch from Mountain's local server, cache the response, fall back to cache
if the network is unavailable.

**`/Static/Application/` asset requests** use **cache-first**: serve from
`Asset-{INCREMENT}` if present; fetch from the local server and cache on miss.

**`/Static/Application/*.css` requests** are intercepted and converted to JS
modules: Worker synthesises a JavaScript response containing
`window._LOAD_CSS_WORKER('{path}'); export default {};` and caches it. This
is the runtime side of the CSS loading mechanism Output's `StripCSSImport`
plugin sets up - the static import chain becomes a runtime loader call
handled by the WebView's own CSS injection path.

---

## Source Structure

| Path | Role |
|---|---|
| `Source/Worker.ts` | Main Service Worker implementation (~11 KB) |
| `Source/Worker/` | Sub-modules (cache utilities, strategy helpers) |
| `Source/Configuration/` | Build-time configuration injection |
| `Source/Run.sh` | Development runner |
| `Source/prepublishOnly.sh` | Publish pipeline script |

---

## Security Boundary

Worker validates the origin of every `message` event - messages from origins
that are neither `self.location.origin` nor the configured `BASE_REMOTE` are
discarded. This prevents page-level code from arbitrary origin from
manipulating the Service Worker's cache.

---

## Key Technologies

Service Workers, Cache API, CSS-as-JS-Module Interception, Cache Versioning,
Client Version Notification.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Output: Build Pipeline](/Doc/output)
- [Mountain: Native Kernel](/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Worker)
