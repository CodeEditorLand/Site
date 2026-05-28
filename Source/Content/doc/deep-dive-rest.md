---
title: "Rest - Deep Dive"
section: "Deep Dive"
order: 40
description:
    "OXC-based TypeScript compiler with parallel execution and VSCode
    compatibility"
---

# Rest - Deep Dive

Rest is a Rust binary that uses the OXC toolchain to compile TypeScript 2-3x
faster than esbuild while producing output compatible with VSCode's build
process.

## Architecture 🏗️

Compilation pipeline: source files pass through OXC parser, transformer, and
code generator in sequence. Optional parallel mode processes multiple files
concurrently.

### Modules

| Path                                                                                     |
| ---------------------------------------------------------------------------------------- |
| `Source/Library.rs` - Binary entry point, CLI parsing, compiler dispatch                 |
| `Source/Fn/OXC/Compiler.rs` - Main orchestration: parser, transformer, codegen           |
| `Source/Fn/OXC/Parser.rs` - Wraps `oxc_parser` with error normalization                  |
| `Source/Fn/OXC/Transformer.rs` - TypeScript-to-JavaScript AST transformations            |
| `Source/Fn/OXC/Codegen.rs` - JavaScript generation from transformed AST                  |
| `Source/Fn/Build.rs` - Directory-based compilation preserving structure                  |
| `Source/Fn/Bundle/` - Bundling utilities                                                 |
| `Source/Fn/NLS/` - Natural Language Support string extraction                            |
| `Source/Fn/SWC/` - SWC integration shims (alternative transformer path)                  |
| `Source/Fn/Worker/` - Worker thread support for parallel compilation                     |
| `Source/Struct/CompilerConfig.rs` - Configuration: decorators, class fields, source maps |

## Compilation Flow 🔄

```
CLI / RestPlugin -> Compiler
  -> Parser (OXC Parser) -> AST + diagnostics
  -> Transformer -> Transformed AST
  -> Codegen -> JavaScript text
  -> Write .js file to output directory
```

Transformer applies:

- `emitDecoratorMetadata` (VSCode compatibility)
- `useDefineForClassFields=false` (matches VSCode gulp build)
- TypeScript type stripping

When `--Parallel` is specified, file compilation fans out across Tokio worker
threads.

## VSCode Compatibility Settings ⚙️

| Option             | Value            | Description                              |
| ------------------ | ---------------- | ---------------------------------------- |
| Decorator metadata | `true`           | Required for VSCode dependency injection |
| Class fields mode  | `false`          | Matches VSCode's gulp build behavior     |
| Source maps        | development only | Inline maps for debug builds             |

## Configuration ⚙️

| CLI Flag     | Default  | Description                         |
| ------------ | -------- | ----------------------------------- |
| `--Input`    | required | Directory or file to compile        |
| `--Output`   | required | Destination for compiled JavaScript |
| `--Parallel` | off      | Multi-core parallel compilation     |

## Integration 🔗

| Element | Direction | Mechanism                                     |
| ------- | --------- | --------------------------------------------- |
| Output  | Consumer  | Process invocation / esbuild plugin           |
| Cocoon  | Indirect  | Loads JS from `Target/Microsoft/VSCode/`      |
| Sky     | Indirect  | Loads VSCode UI components via Output package |

## Related Documentation 📖

- [Rest overview](https://Editor.Land/Doc/rest)
- [Output build orchestration](https://Editor.Land/Doc/deep-dive-output)
