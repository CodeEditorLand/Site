---
title: "Worker - Deep Dive"
section: "Deep Dive"
order: 14
description:
    "Worker registration pattern, fetch interception message protocol, ESBuild
    bundle configuration, and service worker lifecycle stages."
---

Worker is the Service Worker element for Land. This page covers the worker
registration pattern, the fetch interception protocol between the Service Worker
and client page, the ESBuild bundle configuration, and the full service worker
lifecycle. For an overview, see the
[Worker element page](https://Editor.Land/Doc/worker).

## Worker Registration Pattern

`Source/Worker/Register.ts` handles Service Worker registration, update
detection, and controlled activation. The registration flow:

1. `Register.ts` checks `navigator.serviceWorker` availability and reads the
   worker script path from `window._WORKER` (set by an inline script in Sky's
   layout before `Register.js` loads).
2. `navigator.serviceWorker.register(window._WORKER, { scope: '/Application' })`
   registers the worker confined to the `/Application` scope so it only
   intercepts requests relevant to the editor shell.
3. On `updatefound`, `Register.ts` attaches a `statechange` listener to the
   installing worker. When the new worker reaches `installed` state, it posts a
   `SKIP_WAITING` message to make the new worker activate immediately rather
   than waiting for all tabs to close.
4. `navigator.serviceWorker.addEventListener('controllerchange', ...)` detects
   when the new worker takes control and triggers a single `location.reload()`
   to ensure the page runs under the updated worker.

The reload is guarded by a flag so it fires at most once per registration cycle,
preventing reload loops when multiple tabs are open.

## Message Protocol Between Main Thread and Worker

Worker uses two message channels:

### Client → Worker: SKIP_WAITING

Sent by `Register.ts` when a new worker reaches `installed` state:

```javascript
// Register.ts
installingWorker.postMessage({ type: "SKIP_WAITING" });
```

The Service Worker (`Policy.ts`) listens for this in its `message` event handler
and calls `self.skipWaiting()` to activate immediately.

### Worker → Client: SW_ACTIVATED

After the worker activates and calls `self.clients.claim()`, it broadcasts to
all controlled clients:

```javascript
// Policy.ts (inside 'activate' event)
self.clients.matchAll({ type: "window" }).then((clients) => {
	clients.forEach((client) => client.postMessage({ type: "SW_ACTIVATED" }));
});
```

`Register.ts` receives this message and confirms the worker is in control,
completing the update handshake.

## Fetch Interception State Machine

`Source/Worker/Policy.ts` implements the fetch event handler. Every intercepted
request passes through a decision tree:

```
fetch(request)
  │
  ├─ URL path starts with /Application/ or is Register.js or Load.js?
  │    └─ Yes → CACHE_CORE network-first handler
  │         ├─ fetch from network, cache on success → return network response
  │         └─ network fails → return cached response (offline fallback)
  │
  ├─ URL path starts with /Static/Application/ AND ends with .css
  │    AND does NOT contain ?Skip=Intercept?
  │    └─ Yes → CSS interception handler
  │         ├─ Generate JS module: "window._LOAD_CSS_WORKER(url); export default {};"
  │         ├─ Cache JS module in CACHE_ASSET under original CSS URL
  │         └─ Return JS module with Content-Type: application/javascript
  │
  ├─ URL path starts with /Static/Application/ AND contains ?Skip=Intercept?
  │    └─ Yes → CSS passthrough handler
  │         ├─ Strip ?Skip=Intercept from URL for cache key
  │         ├─ Check CACHE_ASSET for real CSS content
  │         ├─ Cache hit → return cached CSS with Content-Type: text/css
  │         └─ Cache miss → fetch real CSS, cache it, return it
  │
  └─ URL path starts with /Static/Application/ (JS, images, fonts)?
       └─ Yes → CACHE_ASSET cache-first handler
            ├─ Check CACHE_ASSET → cache hit: return immediately
            └─ Cache miss → fetch from network, cache on success, return
```

Requests outside these patterns are passed through to the network without
caching.

## ESBuild Worker Bundle Configuration

`Source/Configuration/ESBuild/` contains two separate ESBuild configurations:

**Worker bundle** (`Worker.ts` → `Worker.js`):

- `platform: 'browser'`
- `format: 'iife'` - Service Workers do not support ES modules in all target
  browsers
- `target: ['chrome90', 'safari14']` - matches Tauri's WKWebView / WebView2
  minimum versions
- `bundle: true`, `minify: true` for production
- No external dependencies - the worker is fully self-contained

**Client bundle** (`Register.ts` + `CSS/Load.ts` → `Register.js` + `Load.js`):

- `platform: 'browser'`
- `format: 'esm'` - loaded as `type="module"` scripts in Sky's layout
- `splitting: false` - each client script is a single file with no dynamic
  imports to ensure load order is deterministic

The Telemetry bridge (`Source/Telemetry/Bridge.ts`) is bundled into `Worker.js`
and uses `fetch()` to report errors to PostHog from within the worker context,
since Service Workers have no access to `window` or the page's PostHog instance.

Worker is compiled via ESBuild and registered by Sky at workbench boot. Build
output lands in `Element/Worker/Target/`. The Sky layout references the compiled
`Worker.js` path via `window._WORKER` before `Register.js` loads, ensuring the
Service Worker is registered as early as possible in the page lifecycle.

## Service Worker Lifecycle Stages

The full lifecycle from first install to active caching:

| Stage      | Trigger                                                  | What happens                                                                                       |
| ---------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `install`  | First registration or new version detected               | Pre-cache shell files into `CACHE_CORE`; call `self.skipWaiting()` on `SKIP_WAITING` message       |
| `waiting`  | New worker installed, old worker still controlling pages | Worker waits; `Register.ts` sends `SKIP_WAITING` to advance immediately                            |
| `activate` | `skipWaiting()` called or all old clients closed         | Delete stale cache versions; call `self.clients.claim()` to take control of open pages immediately |
| `fetch`    | Any network request within `/Application` scope          | Apply caching strategy per URL pattern (see decision tree above)                                   |
| `message`  | Client posts `SKIP_WAITING`                              | Call `self.skipWaiting()`                                                                          |

Cache versioning uses a build-time constant embedded in `Worker.js`. When a new
worker activates, its `activate` handler deletes any cache entries whose version
key does not match the current build constant. This ensures stale assets from a
previous deploy are evicted on the first activation of a new worker version.

## CSS Loader Client Function

`Source/Worker/CSS/Load.ts` exports and installs `window._LOAD_CSS_WORKER`. The
function must be available synchronously before any workbench module executes:

```typescript
// Source/Worker/CSS/Load.ts
window._LOAD_CSS_WORKER = (cssUrl: string): void => {
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = cssUrl + "?Skip=Intercept";
	document.head.appendChild(link);
};
```

Sky's layout loads `Load.js` as the first `<script type="module">` tag.
Workbench CSS imports that fire during module evaluation find `_LOAD_CSS_WORKER`
already defined and call it immediately. The `?Skip=Intercept` suffix is
appended by the client function, not by the caller, so workbench source never
needs to know about the interception protocol.

## Related Documentation

- [Worker overview](https://Editor.Land/Doc/worker)
- [Sky UI layer](https://Editor.Land/Doc/sky)
- [Output build pipeline](https://Editor.Land/Doc/deep-dive-output)
