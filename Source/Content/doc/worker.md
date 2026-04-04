---
title: "Worker"
section: "Element"
order: 24
description:
    "The Service Worker that keeps the editor authenticated and offline-capable."
---

# Worker

Worker is the Service Worker layer for Code Editor Land. It manages
authentication, request signing, caching, offline support, and dynamic
CSS imports, all running in a background thread that never blocks the
editor UI.

## The Problem

Traditional web-based editors handle authentication in the main thread.
Token refresh interrupts the user. Network failures surface as cryptic
error modals. Storing tokens in localStorage or cookies exposes them to
XSS attacks. Every request carrying a plain-text bearer token is one
compromised endpoint away from full account takeover.

## How Worker Eliminates It

Worker encrypts all authentication tokens with AES-GCM before storing
them. The encryption key never leaves the Service Worker scope,
making tokens inaccessible to page-level JavaScript and immune to XSS
extraction.

Every outbound request is HMAC-signed. The server can verify that a request
originated from an authenticated Worker instance, not from a replayed token
or a forged client.

Token refresh happens automatically in the background. When a token
approaches expiry, Worker obtains a new one, encrypts it, and swaps it in.
The editor never pauses and never shows a re-login prompt. Worker also
caches critical assets and API responses. When the network is unavailable,
the editor continues with cached data. When connectivity returns, Worker
synchronizes silently.

## What You Experience

You open the editor and you are authenticated. You lose network and the
editor keeps working. You regain network and everything synchronizes. You
never see a login prompt mid-session. You never lose work to a dropped
connection.

Dynamic CSS imports (theme files, syntax highlighting stylesheets) load
through Worker's cache, eliminating flash-of-unstyled-content on slow
connections.

## Key Technologies

Service Workers, AES-GCM Encryption, HMAC Request Signing, SubtleCrypto,
Cache API, Offline-First Architecture.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Air](/Doc/air)
- [Source Code](https://github.com/CodeEditorLand/Worker)
