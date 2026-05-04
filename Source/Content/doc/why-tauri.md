---
title: "Why Tauri"
section: "Technology"
order: 27
description: "The OS's own renderer instead of a bundled Chromium: 60-80% less RAM."
---

# Why Tauri

Electron ships a complete copy of Chromium and Node.js inside every
application. That architecture made sense when no alternative existed. It no
longer does. Tauri uses the operating system's native WebView, and the
difference is measured in hundreds of megabytes.

---

## No Bundled Chromium

An Electron application includes a full Chromium build, typically 120 to 150
megabytes of binary weight before the application code even begins. Every
running instance loads its own copy of the Chromium renderer into memory. On
a machine with three Electron applications open, that is three separate
Chromium processes consuming RAM.

Tauri uses the WebView that the operating system already provides: WKWebView on
macOS and WebView2 on Windows. The user already has this component installed
and running. Land does not need to bundle it, ship it, or update it
independently from the OS.

---

## Binary Size

A minimal Electron application produces a distributable of 150 to 200
megabytes. A minimal Tauri application produces a binary under 10 megabytes.
Land's production binary, including all Rust backend code, fits comfortably
within that envelope. Users download less. Disk usage drops. Startup time
improves because the OS does not need to load and initialize a private browser
engine.

---

## Memory Consumption

Electron applications commonly consume 300 to 500 megabytes of RAM at idle.
Tauri applications using the system WebView typically idle between 60 and 120
megabytes. This is the same 60 to 80 percent reduction the numbers predict.
For a code editor that users leave open all day alongside browsers, terminals,
and build tools, that difference reclaims real working memory.

---

## Rust Backend, Not Node.js

Electron applications run backend logic in Node.js. Tauri applications run
backend logic in Rust. This means Land's native layer - file system access,
process management, cryptographic operations, network communication - is
compiled to native code with no garbage collector, no event loop contention,
and no V8 overhead. The frontend communicates with this backend through
Tauri's IPC bridge, which Land extends with gRPC via the Vine element for
typed, schema-driven messaging.

---

## Plugin Architecture

Tauri 2.0 introduced a plugin system that allows Rust crates to extend the
native layer. Land uses Tauri plugins for deep OS integration: system tray
management, file dialogs, notification delivery, and auto-update. Each plugin
is a self-contained Rust crate with its own lifecycle, permissions, and API
surface.

---

## Where Tauri Appears in Land

The Mountain element is the Tauri application host. It manages the
application window, coordinates startup, initializes the IPC bridge, and
provides the native shell that all other elements run within. Every
interaction between the user interface and the operating system passes through
Mountain.

---

## Platform Support

Land currently builds, installs, and runs on **macOS 13+** (WKWebView) and
**Windows 10/11** (WebView2). Using the system WebView means Land depends on
the OS vendor's rendering engine, so Land targets a well-defined subset of web
platform features to ensure consistent behaviour across both platforms. Linux
(WebKitGTK) is the remaining platform on the roadmap. The trade-off is worth
it: users get a lighter, faster application, and Land avoids the maintenance
burden of bundling and patching a private browser engine.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Why Rust](/Doc/why-rust)
- [Why gRPC](/Doc/why-grpc)
