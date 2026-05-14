---
title: "Why CC0"
section: "License"
order: 30
description:
    "Public domain dedication: fork it, ship it, sell it, no restrictions."
---

# Why CC0

`Editor.Land` is released under CC0 1.0 Universal, a public domain dedication.
This is the most permissive option available. There are no conditions on use,
modification, distribution, or commercialization. No attribution is required. No
license notice must be preserved. No patent clauses apply. The code belongs to
everyone.

---

## What CC0 Means in Practice

CC0 is not a license in the traditional sense. It is a waiver. The author
irrevocably surrenders all copyright and related rights to the fullest extent
permitted by law. In jurisdictions where full waiver is not legally possible,
CC0 includes a fallback permissive license that grants all rights
unconditionally.

For users, this means:

- You can fork Land and sell it under any name.
- You can embed Land's code in proprietary products.
- You can modify Land without publishing your changes.
- You can use Land in government, military, healthcare, or any regulated
  environment without legal review of license compatibility.
- You do not need to include a copyright notice, license file, or attribution of
  any kind.

---

## Why Not MIT

MIT is permissive, but it still requires attribution. Every binary that includes
MIT-licensed code must ship a copy of the license text and the original
copyright notice. For a project with hundreds of dependencies, this creates a
cascade of `NOTICES` files and legal compliance work. CC0 eliminates that burden
entirely.

---

## Why Not Apache 2.0

Apache 2.0 includes an explicit patent grant, which sounds protective but
creates complexity. The patent clause interacts with contributor agreements, and
the license's termination provisions can trigger in ways that surprise
downstream users. CC0's simplicity avoids these entanglements. There are no
patent clauses to analyze, no contributor license agreements to negotiate, and
no termination conditions to track.

---

## License Compatibility

CC0 is compatible with every license in existence. MIT, Apache, GPL, LGPL, MPL,
BSD, proprietary, and everything else. CC0 code can be included in any project
without creating a license conflict. This is particularly valuable for Land's
elements, which are designed to be reusable. Any developer can extract a crate
or package from Land and use it in their own project without checking a
compatibility matrix.

---

## How NLnet Makes This Possible

Releasing a large project under CC0 is financially possible because Land is
funded by the NLnet NGI0 Commons Fund, part of the European Commission's Next
Generation Internet initiative. NLnet's mission is to fund software that belongs
to the public. CC0 is the natural expression of that mission. The funding model
replaces the need for restrictive licensing as a revenue protection mechanism.

---

## Where CC0 Applies

CC0 covers the entire Land project: all 16 elements, the website, the
documentation, the build tooling, and the CI/CD infrastructure. Every repository
under the CodeEditorLand GitHub organization carries the same dedication. There
are no dual-licensed components, no "community edition" restrictions, and no
features gated behind a proprietary license.

---

## The Philosophical Position

Software tools should not restrict the people who use them. A code editor is
infrastructure. It is a means to an end, not an end in itself. Placing
infrastructure in the public domain ensures that it remains available to
everyone, permanently, without conditions. That is the purpose of CC0, and it is
the reason Land uses it.

---

## See Also

- [Contributing](https://Editor.Land/Doc/contributing)
- [Architecture Overview](https://Editor.Land/Doc/architecture)
