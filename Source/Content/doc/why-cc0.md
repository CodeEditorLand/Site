---
title: Why CC0
section: Why Land
order: 5
description:
    Land uses CC0 Universal - a public domain dedication with no attribution
    requirement, no conditions, and no patent clauses - because infrastructure
    for developers should have zero legal friction to use, fork, or embed.
---

Most open-source licenses require something from you: preserve a copyright
notice, include a license file, or avoid certain uses. CC0 Universal requires
nothing. It is not a license - it is a waiver. The authors irrevocably surrender
all copyright and related rights to the fullest extent permitted by applicable
law. The code belongs to everyone, unconditionally.

## What CC0 means in practice

CC0 1.0 Universal is a public domain dedication. In jurisdictions where full
waiver is not legally possible, it includes a fallback permissive license that
grants all rights unconditionally. Either way, the practical result is the same:

| What you want to do                       | MIT                        | Apache 2.0                       | CC0                     |
| ----------------------------------------- | -------------------------- | -------------------------------- | ----------------------- |
| Use in a proprietary product              | Yes, keep license notice   | Yes, keep notice + NOTICE file   | Yes, no notice required |
| Fork and sell under a new name            | Yes, keep license notice   | Yes, keep notices                | Yes, no conditions      |
| Embed in a government or regulated system | Yes, license review needed | Yes, patent clause review needed | Yes, no review needed   |
| Use without any copyright notice          | No - notice required       | No - notice required             | Yes                     |
| Modify without publishing changes         | Yes                        | Yes                              | Yes                     |

The "no copyright notice required" row is the practical difference between CC0
and every permissive license. MIT and Apache 2.0 both require attribution. At
scale - a product with hundreds of dependencies - that creates a cascade of
`NOTICES` files and legal compliance work. CC0 eliminates it entirely.

## CC0 vs MIT

MIT is permissive but has one condition: every binary that includes MIT-licensed
code must carry the original copyright notice and license text. For a project
like Land, which is designed to be reused - its Rust crates extracted into other
editors, its Effect-TS patterns embedded in other tools - the attribution
requirement creates friction for every downstream user. CC0 removes the
condition entirely. There is nothing to comply with.

## CC0 vs Apache 2.0

Apache 2.0 adds an explicit patent grant on top of MIT's attribution
requirement. The patent grant sounds protective but creates its own complexity:
it interacts with contributor license agreements, and the license's automatic
termination clause can trigger in ways that surprise downstream users who hold
patents in related areas. CC0 has no patent clauses to analyze, no contributor
agreements to negotiate, and no termination conditions to track.

## CC0 vs GPL

GPL requires that derivative works be released under GPL. This is incompatible
with the goal of infrastructure that can be embedded anywhere. A developer
building a proprietary code editor on Land's Rust crates should be able to do so
without GPL's copyleft requirement changing the terms of their own product. CC0
imposes no such constraint.

## What CC0 does not cover

CC0 waives copyright. It does not affect trademarks. The names FIDDEE and Land,
the logos, and the editor.land domain are not granted by CC0 - trademark rights
are separate from copyright and are not waived by a copyright dedication.
Someone who forks Land can use the code freely under any name but cannot ship it
as "FIDDEE" or "Land" without permission.

CC0 also does not grant patent licenses beyond what the waiver covers in
applicable jurisdictions. In practice, for a code editor and its supporting
libraries, this is not a significant concern - but it is the accurate legal
description.

## Alignment with NLnet NGI0 Commons Fund

Land is funded by the NLnet NGI0 Commons Fund, part of the European Commission's
Next Generation Internet initiative. NLnet funds software as public
infrastructure. CC0 is the natural legal expression of that position: if the
goal is to build infrastructure that belongs to everyone, the license should
reflect that literally rather than just in spirit. Releasing under CC0 with
NLnet funding means Land will remain in the public domain regardless of what
happens to PlayForm or any other contributor - there are no copyright holders
who could later change the terms.

> [!IMPORTANT] CC0 covers all repositories under the CodeEditorLand GitHub
> organization: all elements, the website, documentation, build tooling, and CI
> infrastructure. There are no dual-licensed components and no features gated
> behind a proprietary tier.
