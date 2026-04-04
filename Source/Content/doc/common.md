---
title: "Common"
section: "Element"
order: 19
description:
    "The abstract foundation that makes every element testable in isolation."
---

# Common

Every Element in Code Editor Land depends on shared contracts: data types, error
enums, configuration schemas, trait definitions. Common is the crate that holds
all of them, and it holds nothing else. No concrete implementations, no runtime
behavior, no side effects.

## The Problem

VS Code modules import concrete implementations directly. Testing a single
component means mocking entire subsystems: the file system, the window manager,
the extension host. A unit test that should take milliseconds instead launches
half the editor.

This tight coupling also means that changing one module can silently break
another. There is no compile-time guarantee that a contract is being respected,
because there is no formal contract to begin with.

## How Common Eliminates It

Common defines pure abstract traits for every cross-element boundary. Each trait
specifies inputs, outputs, and error types. Zero concrete code lives in this
crate.

When Element A depends on Element B, it depends on the trait defined in Common,
not on B's implementation. The Rust compiler enforces the contract at build
time. If B changes its signature, every consumer fails to compile immediately,
not at runtime six months later.

## What You Experience

You can test any Element in complete isolation. Mock any trait, inject it into
the component under test, and verify behavior without launching a window, a
WebView, or a sidecar process. Tests run in milliseconds.

Refactoring becomes safe. Rename a method on a trait and the compiler tells you
every call site that needs updating. No grep, no "find all references" in an
editor that may miss dynamic calls.

## Key Technologies

Rust, Trait Objects, Zero-Cost Abstractions, Compile-Time Contract Enforcement.

## See Also

- [Architecture Overview](/Doc/architecture)
- [Mountain](/Doc/mountain)
- [Source Code](https://github.com/CodeEditorLand/Common)
