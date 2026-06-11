---
title: "Worker"
section: "Elements"
order: 14
description:
    "The Service Worker element that provides asset caching, dynamic CSS import
    handling, and offline support for the Land editor web shell."
---

Worker is the Service Worker element for Land. It intercepts fetch requests from
the webview, applies multi-tier caching strategies for application shell files
and static assets, and implements a two-phase CSS loading protocol that lets VS
Code's workbench bundle use standard `import './some.css'` syntax inside a
WebView environment. Sky loads Worker's registration script on every page.

## What Runs in Workers

Worker is a browser Service Worker, not a Web Worker. It runs in its own thread
alongside the webview page and intercepts all fetch requests within its scope
(`/Application`). The two main tasks it handles are:

**Asset caching.** The VS Code workbench loads several hundred JavaScript and
CSS files on first boot. Worker pre-caches the application shell at install time
and serves subsequent loads from the cache, cutting network round-trips to near
zero on warm starts.

**Dynamic CSS interception.** The VS Code workbench bundle uses
`import './component.css'` statements that the browser's native module loader
does not support for CSS files served as JavaScript modules. Worker intercepts
these requests and converts them into standard `<link rel="stylesheet">`
injections without modifying the workbench bundle.

## Caching Architecture

Worker maintains two independent caches with different strategies:

| Cache         | Scope                                     | Strategy      | Purpose                                                                        |
| ------------- | ----------------------------------------- | ------------- | ------------------------------------------------------------------------------ |
| `CACHE_CORE`  | `/Application/`, `Register.js`, `Load.js` | Network-first | Application shell; always fetch latest when online, fall back to cache offline |
| `CACHE_ASSET` | `/Static/Application/*` (JS, CSS, images) | Cache-first   | Static assets; serve from cache immediately, revalidate in background          |

Pre-caching happens at the Service Worker `install` event. The worker fetches
and caches the essential shell files before it activates, so the first
navigation after install is already cache-served.

## Dynamic CSS Loading Protocol

The workbench bundle emits `import '/Static/Application/component.css'`
statements that would normally fail because browsers cannot import CSS as
JavaScript modules. Worker intercepts these at the fetch layer and applies a
two-phase protocol:

**Phase 1 - JS module response.** Worker intercepts the CSS fetch, generates a
JavaScript module on the fly, and returns it as the response:

```javascript
window._LOAD_CSS_WORKER("/Static/Application/component.css");
export default {};
```

The `export default {}` satisfies the JavaScript module import contract. The
browser executes this response, which calls `window._LOAD_CSS_WORKER`.

**Phase 2 - Real CSS fetch.** `_LOAD_CSS_WORKER` (defined in
`Source/Worker/CSS/Load.ts` and loaded as `Load.js` before the main app) appends
`?Skip=Intercept` to the CSS URL and injects a `<link rel="stylesheet">` into
`<head>`. Worker intercepts this second fetch, detects the `?Skip=Intercept`
parameter, bypasses the JS generation logic, and serves the actual CSS content
from `CACHE_ASSET` with `Content-Type: text/css`.

The `?Skip=Intercept` parameter is the state transition that prevents infinite
interception loops. Without it, Worker would convert the real CSS fetch back
into a JS module, which would trigger another `_LOAD_CSS_WORKER` call, and so
on.

## Sky Integration

Sky's `Layout.astro` loads Worker's scripts in a strict order before the main
workbench bundle:

```html
<!-- 1. Defines window._LOAD_CSS_WORKER before any CSS imports run -->
<script src="/Worker/CSS/Load.js" type="module"></script>

<!-- 2. Sets window._WORKER path for Register.js -->
<script>
  window._WORKER = "/Worker.js";
</script>

<!-- 3. Registers the Service Worker at scope /Application -->
<script src="/Worker/Register.js" type="module"></script>

<!-- 4. Main workbench bundle - CSS imports are now interceptable -->
<script src="/Static/Application/workbench.js" type="module"></script>
```

`Register.ts` detects when a newly activated Service Worker version takes
control and triggers a controlled page reload so clients always run the latest
worker version without manual intervention.

## Build Configuration

Worker is built with ESBuild into two output files: `Worker.js` (the Service
Worker itself) and a small client-side `Load.js` / `Register.js` pair. The
ESBuild configuration lives in `Source/Configuration/ESBuild/`. Worker has no
runtime dependencies on Wind, Mountain, or the VS Code workbench - it operates
purely at the fetch layer and is intentionally decoupled from the editor's
service stack.

## Source Layout

```
Worker/Source/
├── Worker.ts                # Service Worker entry point
├── Worker/
│   ├── Policy.ts            # Fetch event handler, caching strategies
│   ├── Register.ts          # Registration, update detection, activation
│   └── CSS/
│       └── Load.ts          # window._LOAD_CSS_WORKER client function
├── Configuration/
│   └── ESBuild/             # ESBuild build configuration
└── Telemetry/
    └── Bridge.ts            # PostHog error reporting from worker context
```

## Related Documentation

- [Worker Deep Dive](https://Editor.Land/Doc/deep-dive-worker)
- [Sky UI layer](https://Editor.Land/Doc/sky)
- [Output build pipeline](https://Editor.Land/Doc/output)
- [Source Code](https://github.com/CodeEditorLand/Worker)
