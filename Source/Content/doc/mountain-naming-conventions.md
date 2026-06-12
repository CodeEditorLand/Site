---
title: "Mountain - Naming Conventions"
section: "Reference"
order: 2
description:
    "PascalCase naming rules for all Rust code in Mountain, covering files,
    structs, traits, handlers, and the lib+bin Convention B layout."
---

Mountain uses PascalCase as the primary naming convention for all Rust elements,
diverging deliberately from Rust's idiomatic `snake_case`. The rationale is
cross-language DTO alignment: every struct field, method name, and file name
maps directly to TypeScript interfaces in Wind and Cocoon, and to Protocol
Buffer message fields in `Vine.proto`, without any `#[serde(rename)]` attributes
or custom codegen filters. The convention is declared at the top of every module
with `#![allow(non_snake_case, non_camel_case_types)]`.

## 📋　Complete naming table

| Element                 | Convention                 | Example                   |
| ----------------------- | -------------------------- | ------------------------- |
| Structs                 | PascalCase                 | `WorkSpaceFolderStateDTO` |
| Enums and variants      | PascalCase                 | `CommandHandler`          |
| Traits                  | PascalCase                 | `ConfigurationProvider`   |
| Functions               | PascalCase                 | `GetConfigurationValue`   |
| Methods                 | PascalCase                 | `CreateWorkSpace`         |
| Module names            | PascalCase                 | `ApplicationState`        |
| File names              | PascalCase                 | `ApplicationState.rs`     |
| Constants               | PascalCase                 | `MaxConnections`          |
| Static items            | PascalCase                 | `SidecarClients`          |
| Type aliases            | PascalCase                 | `CocoonClient`            |
| Generic type parameters | PascalCase with `T` prefix | `TCapabilityProvider`     |
| Struct fields           | PascalCase                 | `ActiveDocuments`         |
| Local variables         | PascalCase                 | `WorkSpaceIdentifier`     |
| Function parameters     | PascalCase                 | `ApplicationHandle`       |
| Lifetimes               | lowercase `'a` prefix      | `'a`, `'result`           |

## 📁　File naming — one struct per file, PascalCase filename

Every source file in Mountain contains exactly one primary struct (or enum) and
its `impl` block. The filename matches the type name exactly.

```
Source/
├── ApplicationState/
│   ├── ApplicationUserState.rs        - struct ApplicationUserState { … }
│   └── DTO/
│       ├── WorkSpaceFolderStateDTO.rs - struct WorkSpaceFolderStateDTO { … }
│       └── MergedConfigurationStateDTO.rs
├── Environment/
│   ├── CommandProvider.rs             - impl ConfigurationProvider for MountainEnvironment
│   └── TerminalProvider.rs
└── IPC/
    └── WindServiceHandlers/
        ├── mod.rs                     - dispatch table
        ├── NativeHost/
        │   ├── Quit.rs                - struct NativeQuit; handler fn
        │   └── Clipboard.rs
        └── Terminal/
            └── LocalPTYCreateProcess.rs
```

The `impl` block for a trait always lives in the same file as the struct, not in
a separate file.

## 📐　Module declaration pattern

Parent modules declare child modules with `mod Word1Word2;` matching the
filename exactly. There is no re-export (`pub use`) at the module level -
callers import the full path.

```rust
// In Source/Environment/mod.rs
mod CommandProvider;
mod ConfigurationProvider;
mod TerminalProvider;
// No `pub use CommandProvider::*;` - never.
```

> [!IMPORTANT] `pub use` re-exports are forbidden everywhere in the Mountain
> workspace. Use a type alias, a delegating function, or a fresh constant at the
> call site instead. The "no pub use" rule exists because re-exports obscure the
> canonical path in rustdoc and make it harder to trace a symbol to its
> definition file.

## 👁️　`pub` vs `pub(crate)`

| Visibility            | When to use                                                                             |
| --------------------- | --------------------------------------------------------------------------------------- |
| `pub`                 | DTOs and traits that cross the crate boundary into `Common` or are serialized over gRPC |
| `pub(crate)`          | Handler structs and helpers used only within Mountain                                   |
| private (no modifier) | Local helper functions inside a single file                                             |

## 📐　lib + bin Convention B

Mountain's `Cargo.toml` declares both a `[lib]` target and a `[[bin]]` target,
and both point at the same entry file `Source/Library.rs`. This is intentional
(Convention B) and causes a benign "multiple build targets share the same source
file" warning from Cargo - leave it alone.

```toml
[lib]
name    = "Mountain"
path    = "Source/Library.rs"

[[bin]]
name    = "Mountain"
path    = "Source/Library.rs"
```

The library target is used by integration tests and by `Common` when it needs
Mountain types at compile time. The binary target is what Tauri packages and
launches. Both compile the same code; the `cfg(test)` / `cfg(not(test))` gates
inside `Library.rs` control what each target exposes.

## 📂　Handler file atomization

The `WindServiceHandlers/` directory follows strict atomization: each IPC method
that requires more than ~30 lines gets its own file. The `mod.rs` dispatch table
imports the atom and calls it; nothing else lives in `mod.rs` except the
dispatch `match` arms and short inline stubs.

```rust
// mod.rs - correct pattern
mod NativeHost {
    mod Quit;
    mod Clipboard;
}

// dispatch arm - calls the atom
"nativeHost:quit" => NativeHost::Quit::NativeQuit::Handle(Environment).await,
```

Never inline a handler that has its own file. Never create a file for a handler
that is a one-liner - keep those inline in `mod.rs`.

## 🔗　DTO alignment example

The PascalCase convention eliminates all field rename annotations when
serializing over gRPC or JSON:

```rust
// Rust - Mountain/Source/ApplicationState/DTO/WorkSpaceFolderStateDTO.rs
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct WorkSpaceFolderStateDTO {
    pub URI: url::Url,
    pub Name: String,
    pub Index: usize,
}
```

```protobuf
// Vine.proto
message WorkSpaceFolderStateDTO {
    string URI   = 1;
    string Name  = 2;
    uint32 Index = 3;
}
```

```typescript
// Wind or Cocoon TypeScript
interface WorkSpaceFolderStateDTO {
	URI: string;
	Name: string;
	Index: number;
}
```

All three representations use identical field names. Adding
`#[serde(rename = "uri")]` or a proto field alias is a violation of this
convention.

## 📋　Module header

Every `.rs` file begins with the allow attribute and a module doc comment:

```rust
#![allow(non_snake_case, non_camel_case_types)]

//! Brief description of what this module does.
```

The allow attribute must be the first line (before any `use` statements).
Omitting it causes Rust's `non_snake_case` lint to fire on every identifier.

## ✅　Allowed exceptions

The following do **not** follow PascalCase and should not be changed:

- **External crate API** - `tokio::spawn`, `tauri::AppHandle`,
  `serde_json::Value` retain their upstream names.
- **Standard library types and methods** - `HashMap`, `Arc`, `PathBuf`,
  `.read_to_string()`.
- **Lifetime parameters** - always lowercase `'a`, `'b`, `'result`.
- **Macro-generated identifiers** - `#[derive(Debug, Clone, Serialize)]`,
  `#[async_trait]`, `#[command]`.
- **Environment variable reads** - `std::env::var("TAURI_PRIVATE_KEY")` -
  external tool vars stay in their canonical form; Land-internal vars are
  PascalCase in `.env.Land` and `turbo.json`.

## 🚫　What not to do

```rust
// Wrong - snake_case struct
pub struct my_handler { … }

// Wrong - pub use re-export
pub use CommandProvider::GetConfigurationValue;

// Wrong - separate file for trait impl
// CommandProviderImpl.rs containing `impl ConfigurationProvider for MountainEnvironment`
// The impl belongs in CommandProvider.rs alongside the struct.

// Wrong - inline a 200-line handler in mod.rs
"nativeHost:moveItemToTrash" => {
    // 200 lines here
}
// Correct: move to NativeHost/MoveItemToTrash.rs and call it from mod.rs
```

## 📘　TypeScript conventions (Wind, Cocoon, Output)

The TypeScript elements of Land (Wind, Cocoon, Output) share a companion set of
conventions that mirror the Rust rules where possible.

### File naming and exports

- **PascalCase filenames** - every `.ts` / `.tsx` file uses PascalCase
  (`CommandProvider.ts`, `ExtensionHost.ts`). No `kebab-case` or `camelCase`
  filenames.
- **Single `export default` per file, anonymous** - the exported value is not
  named at the declaration site:

    ```typescript
    // Correct
    export default {
    	activate,
    	deactivate,
    } satisfies ExtensionModule;

    // Wrong - named default export
    export default class CommandProvider { … }
    ```

### Import discipline

- **`import type` for types only** - type-only imports must use `import type`:

    ```typescript
    import type { ExtensionContext } from "vscode";
    import { Effect } from "effect"; // value import - no `type`
    ```

- **`await import()` for value imports that must be deferred** - dynamic imports
  use `await import()`, never `require()`:

    ```typescript
    const { activate } = await import("./Extension/Host/Service.js");
    ```

### Function style

- **Arrow-async functions** - all async functions at module scope and as object
  methods are written as arrow functions:

    ```typescript
    // Correct
    const activate = async (context: ExtensionContext): Promise<void> => {
    	…
    };

    // Wrong - async function declaration
    async function activate(context: ExtensionContext): Promise<void> { … }
    ```

### Type narrowing

- **`satisfies` pattern** - use `satisfies` to narrow the type of an object
  literal without widening it to the declared type. This catches excess property
  errors at the definition site rather than at the call site:

    ```typescript
    const config = {
    	MaxRetries: 3,
    	TimeoutMs: 5000,
    } satisfies ConnectionConfig;
    ```

### Formatting

- **Tabs** - indentation uses tab characters, not spaces. The Biome formatter
  enforces this; do not override it with `.editorconfig` space settings.
- **Line width 80** - Biome wraps at 80 characters.
- **Biome** is the single formatter and linter for all TypeScript source. Do not
  add ESLint, Prettier, or other formatters alongside it.

### Separator character

- **Em quad U+2001 as the only separator** - when a display string requires a
  visual separator between two items, use the em quad character (` `, U+2001).
  Standard ASCII space, en dash, or pipe are not used as separators in UI
  strings. Icons and emoji are placed on the **right** side of the text content,
  after the em quad.
