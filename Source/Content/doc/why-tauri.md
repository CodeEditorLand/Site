---
title: "Why Tauri"
section: "Technology"
order: 27
description:
    "The operating system WebView instead of a bundled Chromium runtime."
---

# Why Tauri

Tauri is the reason Mountain can be a native desktop shell without shipping a
private Chromium runtime. Sky still renders web UI, but the WebView comes from
the operating system: WKWebView on macOS, WebView2 on Windows, and WebKitGTK on
Linux.

That is the source-backed claim. Exact RAM, binary-size, and startup numbers
belong in a published benchmark, not in a static documentation page.

---

## No Bundled Chromium

Electron applications include Chromium and Node.js as part of the app runtime.
Tauri uses the platform WebView and lets the native side live in Rust. For Land,
that means Mountain owns native desktop concerns while Sky remains a web UI and
Cocoon remains the Node.js extension-host compatibility path.

---

## Rust Backend

Mountain handles native work such as file access, process management, terminal
support, clipboard access, IPC, and Cocoon process lifecycle in Rust. The
frontend communicates with Mountain through Tauri IPC, and extension-host
communication uses Vine gRPC where that route is implemented.

---

## Platform Support

The repository contains Tauri configuration for macOS, Windows, Linux, iOS, and
Android. Public pages should describe macOS as the primary development path and
other platforms as configured or in validation unless a release artifact exists
for that platform.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Why Rust](/Doc/why-rust)
- [Why gRPC](/Doc/why-grpc)
