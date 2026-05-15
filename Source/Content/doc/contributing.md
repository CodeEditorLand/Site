---
title: "Contributing"
section: "Community"
order: 9
description:
    "How to contribute code, documentation, or translations to Editor.Land."
---

# Contributing to Editor.Land

`Editor.Land` is open source and welcomes contributions. The full contributing
guide is at
[CONTRIBUTING.md](https://github.com/CodeEditorLand/Land/tree/Current/CONTRIBUTING.md)
on GitHub.

---

## Quick Start

1. **Fork and clone** the repository with submodules:

    ```bash
    git clone --recurse-submodules https://github.com/YOUR_USERNAME/Land.git
    cd Land
    ```

2. **Install `Node.js` dependencies:**

    ```bash
    pnpm install
    ```

3. **Start the development build:**

    ```bash
    pnpm cross-env \
    	NODE_ENV=development \
    	NODE_VERSION=22 \
    	Clean=true \
    	Browser=true \
    	Dependency=Microsoft/VSCode \
    	Bundle=false \
    	Compile=false \
    	NODE_OPTIONS=--max-old-space-size=16384 \
    	pnpm tauri dev
    ```

    This compiles `Mountain` and opens the editor window. The first run
    downloads and compiles `Rust` dependencies from scratch - allow a few
    minutes on a fresh checkout. Subsequent builds use `Cargo`'s incremental
    compilation cache and are significantly faster.

4. **Create a branch** from `Current` and make your changes. The project uses
   PascalCase naming for files, identifiers, and settings keys throughout the
   codebase.

5. **Open a pull request** against the `Current` branch with a clear description
   of what changed and why.

---

## Ways to Contribute

- **Code** - `Rust` or `TypeScript` fixes, features, or performance improvements
- **Documentation** - Correcting inaccuracies, adding missing context, or
  improving clarity on any doc page
- **Testing** - Bug reports with reproductions, test coverage for `Cocoon` or
  `Mountain`
- **Design** - UI/UX improvements for the editor or this website

---

## Submodule Workflow

Each Land element (`Mountain`, `Cocoon`, `Sky`, `Wind`, `Vine`, `Air`, `Echo`,
and others) is a separate Git repository referenced as a submodule. When working
on a specific element:

```bash
cd Land/Mountain # or whichever element
git checkout -b MyFeatureBranch
# make changes
git commit -m "Description"
```

Then update the submodule reference in the parent Land repo and open pull
requests against both the element repo and the Land repo if the change affects
the pinned submodule commit.

---

## Code of Conduct

All participants are expected to be respectful. Read the full
[Code of Conduct](https://github.com/CodeEditorLand/Land/tree/Current/CODE_OF_CONDUCT.md)
before engaging.

---

## Funding

`Editor.Land` is funded through the
[NGI0 Commons Fund](https://nlnet.nl/commonsfund/) (grant No. 101135429),
operated by [PlayForm](https://playform.cloud) (Sofia, Bulgaria) under the
[NLnet Foundation](https://nlnet.nl).

---

## See Also

- [Getting Started](https://Editor.Land/Doc/getting-started)
- [Installation](https://Editor.Land/Doc/installation)
- [Architecture Overview](https://Editor.Land/Doc/architecture)
