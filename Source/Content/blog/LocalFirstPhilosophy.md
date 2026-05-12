---
title: "Local-First Philosophy"
summary:
    "How Land keeps the editor path local-first while sync and portal features
    stay explicit."
publishedAt: "2026-04-02"
tags: ["Local-First", "Architecture", "Privacy"]
author: "CodeEditorLand"
readTime: 5
---

# Local-First Philosophy

Land's editor direction is local-first: the core editor should remain useful
without a portal account or cloud sync. That is different from saying every
planned sync feature is already shipped.

## Source-Backed Today

- Mountain owns native file, terminal, process, clipboard, IPC, and extension
  integration paths.
- Cocoon runs installed VS Code extensions without rewriting their source when
  the APIs they use are implemented.
- Air contains background service code for updates, downloads, authentication,
  indexing, health, security, and Vine IPC.
- Portal and cloud sync surfaces should be labeled `Coming Soon` until the
  user-facing flow is complete.

## Coming Soon

- Browser-to-daemon portal control.
- Peer or cloud sync flows with documented transport and encryption.
- Self-hosted marketplace and registry configuration.
- Public release artifacts that name exactly which services are enabled.

Local-first is the design constraint. The website should keep that constraint
separate from unfinished product features.
