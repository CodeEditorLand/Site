---
title: "Worker"
section: "Element"
order: 24
description: "The planned Service Worker layer for authentication, caching, and offline support."
---

# Worker

> **Status: Planned.** Worker is not active in the current build. The design
> below describes the intended architecture for a future web deployment path.
> See the [Architecture Overview](/Doc/architecture) for the full element
> status table.

Worker is the planned Service Worker layer for Editor.Land's web deployment
path. Editor.Land today is a native desktop application built with Tauri.
Worker is designed for a future scenario where Land runs in a browser or
hybrid context - handling authentication, request signing, caching, and
offline support in a background thread that never blocks the editor UI.

---

## The Problem Worker Is Designed to Solve

Web-based editors handle authentication in the main thread. Token refresh
interrupts the user. Network failures surface as cryptic error modals. Storing
tokens in localStorage or cookies exposes them to XSS attacks. Every request
carrying a plain-text bearer token is one compromised endpoint away from full
account takeover.

---

## How Worker Is Designed to Eliminate It

Worker will encrypt all authentication tokens with AES-GCM before storing
them. The encryption key will never leave the Service Worker scope, making
tokens inaccessible to page-level JavaScript.

Every outbound request will be HMAC-signed. The server will be able to verify
that a request originated from an authenticated Worker instance, not from a
replayed token or a forged client.

Token refresh will happen automatically in the background. Worker will also
cache critical assets and API responses so the editor can continue working when
the network is unavailable, synchronising silently when connectivity returns.

---

## What Worker Will Enable

When Worker is implemented for the web deployment path, the authentication
experience will be seamless: open the editor, already authenticated, no
re-login prompts mid-session. Dynamic CSS imports (theme files, syntax
highlighting stylesheets) will load through Worker's cache, eliminating
flash-of-unstyled-content on slow connections.

---

## Key Technologies

Service Workers, AES-GCM Encryption, HMAC Request Signing, SubtleCrypto,
Cache API, Offline-First Architecture.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Air](/Doc/air)
- [Source Code](https://github.com/CodeEditorLand/Worker)
