# Documentation

The site's own documentation: the documents a person reads **before** touching
the site, as opposed to `/Doc`, which is the manual the site _prints_ for its
readers.

| Document                                                             | What it is                                                                                                                                                     | How it is made                                   |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [`Component-Reference.md`](Component-Reference.md)                   | One entry per component family: what it is for, its slots, the states and combinations it is asked, what it may never be, and the specimen row that proves it. | Generated - `node Maintain/Script/Reference.mjs` |
| [`../Maintain/JELLY_CONVERSION.md`](../Maintain/JELLY_CONVERSION.md) | The Jelly surface family's conversion notes.                                                                                                                   | Hand-written                                     |

## `Component-Reference.md` is generated, and that is the point

The reference is the last page of the component wave and the first page a
contributor reads, and the one thing such a document must never do is disagree
with the code it describes. So it is not written by hand:

```
Source/Content/Specimen/<Family>.ts     the ten family matrices, specimens and improvements
        │
        ├── Reference.ts                reads them into one entry per family
        │        │
        │        ├── /Specimen/Reference        the same model, printed (lab surface)
        │        └── Maintain/Script/Reference.mjs
        │                 │
        │                 └── Documentation/Component-Reference.md
        │
        └── Gallery.ts                  folds the same tables onto one spine of conditions
                 │
                 └── /Specimen/States   the states gallery
```

A cell in the reference and a cell on the family's own matrix are the same cell,
read twice: `Reference.ts` calls each family's `MatrixCell`, and so does the
family's plate. A component added to `Frame.ts` moves the reference's figures,
its slot table, its matrix, its prohibition numbering and the markdown document
in the same edit.

**Do not edit `Component-Reference.md`.** An edit there is a second opinion about
a component, and the next regeneration deletes it. Change the family module, then
run the script. The generated file says the same thing at its head.

## Regenerating

```sh
node Maintain/Script/Reference.mjs
```

No Astro, no Vite, no build: the script bundles `Reference.ts` with the `esbuild`
the site already depends on, imports it, and writes one file. It is safe to run
while a dev server is up.

## What the reference is not

- **It is not the states gallery.** `/Specimen/States` prints every component
  against one spine of twenty-two conditions, so two families can be compared.
  The reference prints each family against **its own** columns, so its own
  questions can be read with their prohibitions beside them. The two counts are
  printed separately everywhere they appear, because they share their rows and
  not their columns.
- **It is not a style guide.** It states what a family claims, what it survives
  and what it forbids. Taste is not in the tables, and the document says so in
  its closing register.
- **It is not the component contract.** The seven laws of what a block may be
  are `DESIGN-COMPLETE.md` §4.2-§4.4; the reference restates them as a table with
  a check per law, and links back to the sections rather than replacing them.
