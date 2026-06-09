---
title: "Output - Deep Dive"
section: "Deep Dive"
order: 41
description:
    "Build artifact management, esbuild pipeline, and Rest compiler integration"
---

# Output - Deep Dive

Output is a JavaScript/TypeScript build package that wraps esbuild. It compiles
VSCode TypeScript source and CodeEditorLand editor code into JavaScript bundles
consumed by Sky, Wind, and Cocoon.

## Architecture 🏗️

Two compiler modes: default esbuild pipeline and optional Rest (OXC-based)
pipeline, selectable via environment variable.

### Modules

| Path                                                                               |
| ---------------------------------------------------------------------------------- |
| `Source/prepublishOnly.sh` - Main build entry script                               |
| `Source/Run.sh` - Development watch script                                         |
| `Source/ESBuild/Output.ts` - esbuild programmatic configuration                    |
| `Source/ESBuild/RestPlugin.ts` - esbuild plugin delegating to Rest binary          |
| `Source/ESBuild/Microsoft/` - VSCode platform bundle entry points                  |
| `Source/ESBuild/CodeEditorLand/` - Editor customization bundles                    |
| `Source/ESBuild/Exclude/` - Module exclusion rules                                 |
| `Configuration/ESBuild/Microsoft/VSCode.js` - esbuild config for VSCode dependency |
| `Configuration/ESBuild/CodeEditorLand/Editor.js` - esbuild config for editor       |

## Build Pipeline 🔧

Default path (esbuild):

1. esbuild reads TypeScript source from `Dependency/Microsoft/VSCode/`
2. esbuild resolves, bundles, tree-shakes
3. Output written to `Target/Microsoft/VSCode/`

Rest path (`Compiler=Rest`):

1. Rest binary compiles TypeScript to `Target/Rest/Microsoft/VSCode/`
2. `RestPlugin.ts` intercepts `.ts` files, invokes Rest subprocess
3. esbuild reads Rest output, applies bundling and merging
4. Final artifacts land in `Target/Microsoft/VSCode/`

## Integration 🔗

| Element | Direction | Mechanism                                 |
| ------- | --------- | ----------------------------------------- |
| Rest    | Consumer  | Process invocation via RestPlugin         |
| Sky     | Provider  | `@codeeditorland/output` npm package      |
| Wind    | Provider  | `@codeeditorland/output` npm package      |
| Cocoon  | Provider  | File path reference from Target directory |

## Configuration ⚙️

| Variable           | Default      | Description                       |
| ------------------ | ------------ | --------------------------------- |
| `Compiler`         | `esbuild`    | Set to `Rest` for OXC compilation |
| `REST_BINARY_PATH` | auto-detect  | Override Rest binary location     |
| `REST_VERBOSE`     | `false`      | Enable verbose Rest logging       |
| `NODE_ENV`         | `production` | `development` enables source maps |

Rest mode runs 2-3x faster on TypeScript-heavy codebases but requires the Rest
binary in the build environment.

## Related Documentation 📖

- [Output overview](https://editor.land/Doc/output)
- [Rest compiler reference](https://editor.land/Doc/deep-dive-rest)
- [Sky UI layer](https://editor.land/Doc/deep-dive-sky)
- [Wind service layer](https://editor.land/Doc/deep-dive-wind)
