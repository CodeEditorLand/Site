---
title: "Mountain - Naming Conventions"
section: "Deep Dive"
order: 217
description:
    "PascalCase naming conventions for cross-language interoperability across
    the Land ecosystem"
---

# Mountain - Naming Conventions

Mountain adopts PascalCase as the primary naming convention for nearly all Rust
elements, diverging from Rust traditional snake_case. This intentional choice
serves critical ecosystem requirements.

## Rationale

The Land ecosystem consists of multiple language-specific components that must
interoperate seamlessly:

| Component | Language           | Naming Convention |
| :-------- | :----------------- | :---------------- |
| Mountain  | Rust               | PascalCase        |
| Cocoon    | Node.js/TypeScript | PascalCase        |
| Wind      | TypeScript/React   | PascalCase        |
| Common    | Rust (shared)      | PascalCase        |
| Vine gRPC | Protocol Buffers   | PascalCase        |

Using PascalCase across all components eliminates cognitive overhead during
cross-language development and ensures type safety in gRPC interfaces.

Each module that follows this convention includes:

```rust
#![allow(non_snake_case, non_camel_case_types)]
```

## DTO Alignment

Data Transfer Objects in Rust map directly to Protocol Buffer messages,
TypeScript interfaces, and JSON schemas without field name mapping:

```rust
// Rust DTO
pub struct WorkSpaceFolderStateDTO {
    pub URI: url::Url,
    pub Name: String,
    pub Index: usize,
}
```

Direct correspondence with protobuf and TypeScript eliminates serde rename
attributes and custom protobuf code generation filters.

## Complete Naming Patterns

| Element Type    | Convention | Example                        |
| :-------------- | :--------- | :----------------------------- |
| Structs         | PascalCase | WorkSpaceFolderStateDTO        |
| Enums           | PascalCase | CommandHandler                 |
| Traits          | PascalCase | ConfigurationProvider          |
| Functions       | PascalCase | GetConfigurationValue          |
| Methods         | PascalCase | CreateWorkSpace                |
| Modules         | PascalCase | ApplicationState               |
| Constants       | PascalCase | MAX_CONNECTIONS                |
| Static Items    | PascalCase | SIDECAR_CLIENTS                |
| Type Aliases    | PascalCase | CocoonClient                   |
| Generics        | PascalCase | TCapabilityProvider (T prefix) |
| Lifetimes       | lowercase  | 'a, 'result (standard Rust)    |
| Local Variables | PascalCase | WorkSpaceIdentifier            |
| Parameters      | PascalCase | ApplicationHandle              |
| Fields          | PascalCase | ActiveDocuments                |
| File Names      | PascalCase | ApplicationState.rs            |

## Allowed Exceptions

1. **External crate types**: tokio, tauri, serde_json retain their original
   conventions
2. **Standard library types**: std types and methods use Rust conventions
3. **Lifetime parameters**: Standard Rust convention (lowercase with prefix)
4. **Attributes and macros**: Built-in attributes like derive, async_trait
   retain Rust conventions
5. **Raw identifiers**: r#async and system-level constants may use lowercase

## Migration Guidelines

New code must follow PascalCase. Checklist:

1. Add allow attribute at module top
2. Use PascalCase for struct/enum/trait names
3. Use PascalCase for all functions and methods
4. Use PascalCase for all fields and variables
5. Align DTO fields with Protocol Buffer message fields
6. Use PascalCase for generic type parameters with T prefix
7. Use PascalCase for file names

## Implementation Status

All core modules follow PascalCase:

- ApplicationState - complete
- Environment - complete (24 providers)
- RunTime - complete
- Track - complete
- Vine - complete
- IPC - complete
- WorkSpace - complete
- All DTOs - complete (13 DTO types)

## Related

- [Mountain overview](/doc/mountain)
- [Mountain deep dive](/doc/deep-dive-mountain)
- [Common service contracts](/doc/deep-dive-common)
