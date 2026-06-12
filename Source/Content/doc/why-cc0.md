---
title: Why CC0
section: Why Land
order: 5
description:
    Land uses CC0 1.0 Universal - a public domain dedication with no attribution
    requirement, no conditions, and no patent clauses - because infrastructure
    for developers should have zero legal friction to use, fork, or embed.
---

Most open-source licenses require something: preserve a copyright notice,
include a license file, or avoid certain uses. CC0 Universal requires nothing.
It is a waiver, not a license. The authors irrevocably surrender all copyright
and related rights. The code belongs to everyone, unconditionally.

## What CC0 means in practice

CC0 eliminates the one condition every permissive license imposes: attribution.
MIT requires the copyright notice in every binary. Apache 2.0 adds a NOTICE file
and patent grant complexity. At scale - a product with hundreds of dependencies -
that creates a cascade of legal compliance work. CC0 removes it entirely.

| What you want to do              | MIT              | Apache 2.0                | CC0                |
| -------------------------------- | ---------------- | ------------------------- | ------------------ |
| Use in proprietary product       | Yes, keep notice | Yes, keep notice + NOTICE | Yes, no notice     |
| Fork and sell under new name     | Yes, keep notice | Yes, keep notices         | Yes, no conditions |
| Embed in regulated system        | License review   | Patent clause review      | No review needed   |
| Use without any copyright notice | No               | No                        | **Yes**            |

## CC0 vs MIT vs Apache 2.0 vs GPL

MIT has one condition: every binary carrying MIT code must include the copyright
notice. Land is designed to be reused - its Rust crates extracted into other
editors, its Effect-TS patterns embedded in other tools. The attribution
requirement creates friction for every downstream user. CC0 removes it.

Apache 2.0 adds an explicit patent grant on MIT's attribution requirement. The
patent grant interacts with CLA agreements, and the automatic termination clause
can surprise downstream users. CC0 has no patent clauses, no CLAs, and no
termination conditions.

GPL requires derivative works to be GPL'd. Land's purpose is infrastructure
that can be embedded anywhere, including proprietary products. CC0 imposes no
copyleft constraint.

## What CC0 does not cover

CC0 waives copyright, not trademarks. The names FIDDEE and Land, the logos, and
the editor.land domain are not granted by CC0 - trademark rights are separate.
Someone who forks Land can use the code freely but cannot ship it as "FIDDEE"
or "Land" without permission.

CC0 also does not grant patent licenses beyond what the waiver covers in
applicable jurisdictions. For a code editor, this is not a practical concern.

## NLnet NGI0 alignment

Land is funded by the NLnet NGI0 Commons Fund, part of the European
Commission's Next Generation Internet initiative. NLnet funds software as
public infrastructure. CC0 is the natural legal expression: if the goal is
infrastructure that belongs to everyone, the license should say so literally.
Releasing under CC0 ensures Land remains in the public domain regardless of
what happens to any contributor - there are no copyright holders who can later
change the terms.

> **IMPORTANT**: CC0 covers all repositories under the CodeEditorLand GitHub
> organization: all elements, the website, documentation, build tooling, and CI
> infrastructure. No dual-licensed components exist.

## Related Documentation

- [Why Rust](https://Editor.Land/Doc/why-rust)
- [Why Tauri](https://Editor.Land/Doc/why-tauri)
- [Architecture](https://Editor.Land/Doc/architecture)
