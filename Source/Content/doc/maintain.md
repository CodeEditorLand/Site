---
title: "Maintain"
section: "Element"
order: 25
description:
    "The build orchestrator with Rhai scripting and deterministic output."
---

# Maintain

Maintain is the build orchestrator for Editor.Land. It coordinates Rest, Output,
and other build-time elements into a single reproducible pipeline. Build logic
is written in Rhai scripts rather than shell scripts, and configurations are
validated at compile time.

---

## The Problem

Build pipelines that depend on environment variables, shell conditionals, and
platform-specific scripts become difficult to debug. A build passes on one
machine and fails on another because of a missing `$PATH` entry or a difference
in how `sed` handles newlines across platforms. VS Code's build system spans
Gulp tasks, shell scripts, and Node.js scripts scattered across dozens of files.
Reproducing a failure requires replicating the exact environment.

---

## How Maintain Eliminates It

Maintain replaces shell scripts with Rhai, an embedded scripting language
designed for Rust applications. Rhai scripts are sandboxed and cross-platform by
design. They cannot access the file system, network, or environment variables
unless explicitly granted permission through Maintain's capability system.

Build configurations are Rust structs validated at compile time. A typo in a
configuration key fails the build before any artifact is produced, not after
twenty minutes of compilation.

Maintain orchestrates the pipeline: Rest compiles TypeScript, Output stores
artifacts. Each step receives typed inputs and produces typed outputs. If a step
fails, the error message identifies the exact input that caused the failure.

---

## What You Experience

You run a single command and the build either succeeds or fails with a clear,
actionable error. Build scripts are readable: Rhai's syntax is close to Rust, so
anyone who can read the application code can read the build logic.

Editor.Land currently builds and runs on **macOS 13+** and **Windows 10/11**.
Linux (WebKitGTK) build support is part of the roadmap but not yet active.

---

## Key Technologies

Rust, Rhai Scripting, Compile-Time Configuration Validation, Deterministic
Orchestration, Capability-Based Sandboxing.

---

## See Also

- [Architecture Overview](/Doc/architecture)
- [Output](/Doc/output)
- [Source Code](https://github.com/CodeEditorLand/Maintain)
