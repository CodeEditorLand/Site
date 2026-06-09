---
title: Rest - Deep Dive
section: Deep Dive
order: 9
description:
    OXC integration internals, VS Code platform code selection, module rewrite
    rules, console stripping, platform marker injection, binary distribution,
    and performance benchmarks.
---

Rest is a Rust binary that drives four OXC crates-`oxc_parser`, `oxc_semantic`,
`oxc_transformer`, and `oxc_codegen`-through a sequential compilation pipeline
to produce VS Code-compatible JavaScript from TypeScript source. This page
covers the internals of each stage and the integration points with the Output
element's build pipeline.

## OXC crate integration

Each OXC crate is used independently, giving Rest precise control over
intermediate representations between stages.

| Crate             | Version | Role in Rest                                                            |
| :---------------- | :------ | :---------------------------------------------------------------------- |
| `oxc_allocator`   | 0.48    | Arena allocator shared across all OXC passes for a single file          |
| `oxc_parser`      | 0.48    | Parses TypeScript source into an owned AST                              |
| `oxc_semantic`    | 0.48    | Resolves symbols, scopes, and references against the AST                |
| `oxc_transformer` | 0.48    | Applies TypeScript-to-JavaScript transformations                        |
| `oxc_codegen`     | 0.48    | Emits JavaScript text and optional source maps from the transformed AST |
| `oxc_span`        | 0.48    | Source span types shared between all crates                             |
| `rayon`           | latest  | Parallel file dispatch across logical CPU cores                         |

The arena allocator is constructed once per source file and shared across
parser, semantic, and transformer. This eliminates per-node heap allocations and
is the primary reason OXC is faster than Node.js-hosted compilers for large
TypeScript codebases.

## VS Code platform code selection

Rest is invoked against the VS Code Dependency submodule, specifically the
TypeScript source under `Element/Microsoft/Dependency/Editor/src/vs/`. Not all
files in that tree are compiled on every invocation. The Output element's
`RestPlugin` intercepts individual `.ts` file loads from esbuild's module graph,
so only files actually reachable from the workbench entry point are compiled by
Rest. This avoids compiling dead-code files in the VS Code tree that are never
imported.

The subset includes:

- Core platform services (`vs/platform/`)
- Workbench services (`vs/workbench/`)
- Base utilities (`vs/base/`)
- Editor model and controller (`vs/editor/`)

## Module rewrite rules

The OXC transformer stage handles path alias resolution and platform shims. VS
Code's TypeScript source uses path aliases defined in its `tsconfig.json` (e.g.
`vs/base/common/uri` instead of a relative path). Rest's
`Struct/CompilerConfig.rs` carries a path alias map that the transformer uses to
rewrite import specifiers to relative paths before code generation.

Platform shims are injected at this stage for APIs that differ between Node.js,
browser, and the Land hybrid environment. The shim layer rewrites imports to
`vs/base/parts/sandbox/electron-sandbox/globals` and similar browser-compatible
paths where the Node.js path would fail inside Sky's WebView context.

## Decorator metadata and class field behavior

Two settings control VS Code compatibility in `Struct/CompilerConfig.rs`:

**`emitDecoratorMetadata = true`**

VS Code's service locator pattern uses `@injectable()` and constructor injection
with `reflect-metadata`. When a class is decorated, TypeScript emits
`Reflect.metadata("design:paramtypes", [...])` calls listing the constructor
parameter types. OXC's transformer emits these calls correctly. Without them,
dependency injection silently fails-services are constructed with `undefined`
arguments.

**`useDefineForClassFields = false`**

VS Code was written before native class fields were standardized and relies on
the TypeScript-legacy behavior where `class Foo { x = 1 }` compiles to a
constructor assignment (`this.x = 1`) rather than `Object.defineProperty`. OXC
exposes this as a transformer option. With `useDefineForClassFields = true` (the
modern default), prototype-chain assignment patterns in VS Code break at
runtime.

## Console stripping

The transformer stage removes all `console.log`, `console.warn`, and
`console.error` calls from production builds. This matches the behavior of VS
Code's own gulp build pipeline, which uses a custom transform to strip console
calls from shipped bundles. In Land's build, the `drop: ["console"]` option is
passed to OXC's codegen for release builds; debug builds retain console calls
and add inline source maps.

## Platform marker injection

After code generation, Rest injects a small header into each output file that
identifies the compilation context:

```js
// [Land/Rest] compiled by OXC 0.48 - do not edit
```

This marker is used by the Output element's post-processing step to verify that
files in the build cache were produced by Rest and not left over from a previous
esbuild-only build. If a file in the output directory lacks the marker, the
Output pipeline treats it as stale and recompiles from source.

## Binary distribution

Rest is distributed as a standalone native binary compiled for each target
triple. The binary is not a Node.js package-it requires no npm install and no
Node.js runtime to execute. The Output element invokes it via `process.spawn`
from `RestPlugin`:

```typescript
// Output/ESBuild/Rest/Plugin.ts (simplified)
build.onLoad({ filter: /\.ts$/ }, async (args) => {
	const result = await rest.compile(args.path, config);
	return { contents: result.code, loader: "js" };
});
```

For CI and release builds, the Rest binary is compiled alongside Mountain using
`cargo build -p Rest --release` and copied into the build artifacts. The
`Compiler=Rest` environment variable activates `RestPlugin` inside the Output
element; without it, esbuild's built-in TypeScript loader is used instead.

## Parallel compilation

When `--Parallel` is passed, Rest uses `rayon`'s parallel iterator over the
input file list:

```rust
input_files.par_iter().map(|file| {
    compile_file(file, &config)
}).collect::<Result<Vec<Output>>>()
```

Each file gets its own OXC arena allocator, so there is no shared mutable state
between worker threads. Rayon distributes work across logical CPU cores using a
work-stealing deque. The default thread count is the number of logical cores;
`--workers N` overrides it.

## Performance benchmarks

Measured on Apple M1 Max with 8 worker threads against esbuild 0.20:

| Operation                     | esbuild | Rest (OXC) | Improvement |
| :---------------------------- | :------ | :--------- | :---------- |
| Parse + transform 1 000 files | 2.4 s   | 0.9 s      | 2.7×        |
| Full bundle (100 K LOC)       | 1.8 s   | 0.7 s      | 2.6×        |
| Minified bundle               | 3.1 s   | 1.3 s      | 2.4×        |
| Source map generation         | 0.8 s   | 0.4 s      | 2.0×        |

The improvement comes primarily from two sources: the arena allocator
eliminating per-node heap allocations, and Rust's lack of garbage collection
pauses during the transformation pass.

## CLI configuration reference

| Flag             | Env variable        | Default   | Description                      |
| :--------------- | :------------------ | :-------- | :------------------------------- |
| `--entry`        | `REST_ENTRY`        | required  | Entry file or directory          |
| `--out-dir`      | `REST_OUT_DIR`      | `dist/`   | Output directory                 |
| `--target`       | `REST_TARGET`       | `es2022`  | Target ECMAScript version        |
| `--sourcemap`    | `REST_SOURCEMAP`    | `false`   | Emit inline source maps          |
| `--minify`       | `REST_MINIFY`       | `false`   | Minify output via `oxc_minifier` |
| `--workers`      | `REST_WORKERS`      | CPU count | Parallel worker thread count     |
| `--decorators`   | `REST_DECORATORS`   | `legacy`  | Decorator metadata mode          |
| `--class-fields` | `REST_CLASS_FIELDS` | `define`  | Class field emit mode            |
| `--Parallel`     | -                   | off       | Enable multi-core compilation    |

## Module map

| File                              | Role                                                                         |
| :-------------------------------- | :--------------------------------------------------------------------------- |
| `Source/Library.rs`               | Binary entry point, CLI argument parsing via `clap`                          |
| `Source/Fn/OXC/Compiler.rs`       | Pipeline orchestration: allocator, parser, semantic, transformer, codegen    |
| `Source/Fn/OXC/Parser.rs`         | `oxc_parser` wrapper, error normalization to compiler diagnostics            |
| `Source/Fn/OXC/Transformer.rs`    | TypeScript-to-JavaScript transform, decorator and class field options        |
| `Source/Fn/OXC/Codegen.rs`        | JavaScript text emission, source map generation                              |
| `Source/Fn/Build.rs`              | Directory traversal, output structure preservation                           |
| `Source/Fn/Bundle/`               | Module bundling utilities                                                    |
| `Source/Fn/Worker/`               | `rayon` parallel worker pool                                                 |
| `Source/Fn/NLS/`                  | Natural Language Support string extraction for VS Code NLS pipeline          |
| `Source/Struct/CompilerConfig.rs` | Configuration struct: path aliases, decorator mode, class field mode, target |
