---
title: Rest
section: Elements
order: 9
description:
    Rest uses OXC to compile and bundle the VS Code platform TypeScript source
    into the Output element, replacing the esbuild TypeScript loader with a
    Rust-powered 4-stage pipeline that runs 2-3x faster.
---

Rest is a Rust binary and library that compiles TypeScript to JavaScript using
the OXC (Oxidation Compiler) toolchain. It is the build-time compiler for the VS
Code platform code that Cocoon loads at startup: the input is the VS Code
Dependency submodule, and the output is the bundled JavaScript that the Output
element packages for distribution. OXC was chosen specifically because VS Code
uses OXC internally, which guarantees that decorator handling and class field
semantics match the upstream build exactly.

## Why OXC instead of esbuild

Three aspects of the VS Code codebase require exact compiler behavior that
esbuild does not fully support:

- **`emitDecoratorMetadata`** - VS Code's dependency injection system relies on
  TypeScript emitting `Reflect.metadata` calls for decorated classes. OXC
  handles this correctly. esbuild's support is limited.
- **`useDefineForClassFields = false`** - VS Code requires the legacy class
  field assignment semantics for ES5 compatibility. OXC's codegen exposes this
  as a configuration option; esbuild's behavior is implicit and cannot be
  overridden.
- **OXC is used by VS Code upstream** - Using the same compiler that VS Code's
  own build pipeline uses means Rest produces byte-for-byte compatible output
  without approximation.

## 4-stage compilation pipeline

TypeScript input passes through four sequential OXC stages:

| Stage                | Crate             | Work performed                                                                                                          |
| :------------------- | :---------------- | :---------------------------------------------------------------------------------------------------------------------- |
| 1. Parse             | `oxc_parser`      | Produces AST with full source location tracking; handles TypeScript syntax, decorators, JSX                             |
| 2. Semantic analysis | `oxc_semantic`    | Symbol resolution, scope analysis, binding and reference tracking                                                       |
| 3. Transform         | `oxc_transformer` | Decorator lowering, class field transformations, TypeScript type stripping, JSX to `createElement`, ES version lowering |
| 4. Code generation   | `oxc_codegen`     | JavaScript source output, VLQ-encoded source maps, optional minification via `oxc_minifier`                             |

Parallel processing uses `rayon`: files in a directory are compiled across all
logical CPU cores simultaneously when `--Parallel` is specified.

## Input and output

| Side   | Description                                                                                                   |
| :----- | :------------------------------------------------------------------------------------------------------------ |
| Input  | VS Code Dependency submodule (`Element/Microsoft/Dependency/Editor/src/vs/`) - the TypeScript platform source |
| Output | Compiled `.js` files consumed by the Output element's esbuild bundler via `RestPlugin`                        |

Rest does not replace esbuild as the bundler. It replaces only the
TypeScript-to-JavaScript transform step. The Output element's esbuild pipeline
invokes Rest through `RestPlugin`, which intercepts `.ts` file loads and
delegates them to the Rest binary.

## Performance

Benchmarks measured on Apple M1 Max with 8 worker threads:

| Operation                     | esbuild | Rest (OXC) | Improvement |
| :---------------------------- | :------ | :--------- | :---------- |
| Parse + transform 1 000 files | 2.4 s   | 0.9 s      | 2.7×        |
| Full bundle (100 K LOC)       | 1.8 s   | 0.7 s      | 2.6×        |
| Minified bundle               | 3.1 s   | 1.3 s      | 2.4×        |
| Source map generation         | 0.8 s   | 0.4 s      | 2.0×        |

## When Rest needs to re-run

Rest must be re-run when the VS Code Dependency submodule is updated (i.e.,
after a `git submodule update` that advances the VS Code platform version). It
does not need to re-run for changes to Cocoon, Mountain, or any other Land
element. The compiled output is cached by the Output build pipeline; incremental
re-compilation only reprocesses files whose source has changed.

## CLI usage

```bash
# Compile a directory
rest --entry ./Source --out-dir ./Target

# With parallel compilation
rest --entry ./Source --out-dir ./Target --Parallel

# Production build with minification
rest --entry src/index.ts --out-dir dist/ --minify --target es2021

# With source maps (development)
rest --entry src/index.ts --out-dir dist/ --sourcemap
```

Via the Output element build pipeline:

```bash
# Activate Rest as the TypeScript compiler
export Compiler=Rest
npm run prepublishOnly
```

## Source files

| File                              | Role                                                    |
| :-------------------------------- | :------------------------------------------------------ |
| `Source/Library.rs`               | Binary entry point, CLI parsing                         |
| `Source/Fn/OXC/Compiler.rs`       | Main pipeline orchestration                             |
| `Source/Fn/OXC/Parser.rs`         | OXC parser wrapper with error normalization             |
| `Source/Fn/OXC/Transformer.rs`    | AST transformation: decorators, class fields, JSX       |
| `Source/Fn/OXC/Codegen.rs`        | JavaScript generation from transformed AST              |
| `Source/Fn/Build.rs`              | Directory-based compilation with structure preservation |
| `Source/Fn/Worker/`               | Parallel worker pool using `rayon`                      |
| `Source/Struct/CompilerConfig.rs` | Configuration types: decorators, class fields, target   |
