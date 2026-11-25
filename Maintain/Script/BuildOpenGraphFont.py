#!/usr/bin/env python3
"""Cut the share card's faces into the one format its rasteriser can read.

Run from `WebSite/`:

    uv run --with fonttools --with brotli python Maintain/Script/BuildOpenGraphFont.py

Writes `Maintain/Font/OpenGraph/*.ttf` (three faces) and
`Source/Function/OpenGraph/Face.ts` (the same faces as the card's rasteriser
sees them: their file names, their hashes, and the codepoints they cover).

─── WHY A SECOND FORMAT EXISTS AT ALL ──────────────────────────────────────
The share card is an `og:image`, and an `og:image` is read by a platform's
scraper, not by a browser. No major platform renders SVG: Facebook's accepted
types are JPEG, GIF and PNG, and X's card documentation says SVG is not
supported. So `/OpenGraph.png` and `/OpenGraph/<Route>.png` are the delivery
format, and the card is rasterised at build time from the same SVG string the
generators have always produced (`Function/OpenGraph.ts`,
`pages/OpenGraph.png.ts`).

The rasteriser is `@resvg/resvg-js` (resvg + napi). It is handed font files by
path and it reads ttf/otf/ttc - **not woff2**. That is measured, not assumed: a
woff2 passed to `font.fontFiles` produces a PNG byte-identical to passing no
font at all, because fontdb has no woff2 decoder. The site ships woff2, because
that is what a browser wants; the rasteriser needs ttf. This script is the
bridge between the two consumers of one source.

─── WHY THE BRIDGE IS ASSERTED, NOT COPIED ─────────────────────────────────
A second copy of the glyph data is only honest if it is provably the same
drawing. So every face is decompressed and then checked: same unitsPerEm
(1000), same glyph count (1125 / 1125 / 5), same codepoint count (983 / 983 /
6), same weight class (400 / 500 / 500), same family names, and - the one the
card actually depends on - **every glyph's advance is 600/1000**, i.e. exactly
1`ch`. That is the number `WrapText` counts characters with and the number the
42-glyph line was measured in; a card set in anything else overflows the frame
it was composed for. The script fails if a single advance disagrees.

`Source/Function/OpenGraph/Raster.ts` closes the loop at build time: it hashes
the shipped woff2 and refuses to render if a hash has moved away from the one
recorded here. A rebuilt face therefore cannot leave a stale ttf quietly
setting the card in the old drawing - the build stops and names this script.

─── WHAT THE FACES ARE ─────────────────────────────────────────────────────
  IBMPlexMono-Regular.ttf   400  the card's body runs (stamp, route, relation,
                                 info rows, credits)
  IBMPlexMono-Medium.ttf    500  index, title, seal label - the card's
                                 hierarchy is weight, never size alone
  LandSymbol-Medium.ttf     500  `〈 〉` and `◎` only, the three-glyph face
                                 drawn by `BuildLandSymbol.py`, cut to the same
                                 600/1000 advance so it composes into a mono run

─── AFTER RUNNING ──────────────────────────────────────────────────────────
`npx sass --no-source-map Source/Stylesheet/System.scss /tmp/x.css` still has
to exit 0 (nothing here touches the stylesheet, but the card's tokens are
mirrored in `Ink.ts`), and a site build must emit one PNG per card route under
`Target/OpenGraph/`.
"""

from __future__ import annotations

import hashlib
import json
import pathlib
import shutil
import subprocess
import sys
import unicodedata

from fontTools.ttLib import TTFont
from fontTools.ttLib.woff2 import decompress

ROOT = pathlib.Path(__file__).resolve().parents[2]

PUBLIC = ROOT / "Public" / "Font"

OUT_DIR = ROOT / "Maintain" / "Font" / "OpenGraph"

FACE_MODULE = ROOT / "Source" / "Function" / "OpenGraph" / "Face.ts"

# The three faces, in the order the rasteriser loads them. `Expect` is what the
# card's composition assumes; the script refuses to write a face that disagrees.
FACES = [
    {
        "File": "IBMPlexMono-Regular.ttf",
        "Source": PUBLIC / "IBM-Plex-Mono" / "IBMPlexMono-Regular.woff2",
        "Expect": {
            "UnitsPerEm": 1000,
            "Weight": 400,
            "Glyphs": 1125,
            "Codepoints": 983,
            "Family": "IBM Plex Mono",
        },
    },
    {
        "File": "IBMPlexMono-Medium.ttf",
        "Source": PUBLIC / "IBM-Plex-Mono" / "IBMPlexMono-Medium.woff2",
        "Expect": {
            "UnitsPerEm": 1000,
            "Weight": 500,
            "Glyphs": 1125,
            "Codepoints": 983,
            "Family": "IBM Plex Mono",
        },
    },
    {
        "File": "LandSymbol-Medium.ttf",
        "Source": PUBLIC / "Land-Symbol" / "LandSymbol-Medium.woff2",
        "Expect": {
            "UnitsPerEm": 1000,
            "Weight": 500,
            "Glyphs": 5,
            "Codepoints": 6,
            "Family": "Land Symbol",
        },
    },
]

# The advance every glyph in every face must carry: 600/1000 = 0.6em = 1ch.
ADVANCE = 600

# The marks the card's stamp is built from, checked by name so a face that
# quietly loses one fails here rather than printing a blank on a share card.
REQUIRED = {
    "IBMPlexMono-Regular.ttf": "#/:_\u2001\u21b3\u2192",
    "IBMPlexMono-Medium.ttf": "#/:_\u2001\u21b3\u2192",
    "LandSymbol-Medium.ttf": "\u3008\u3009\u25ce",
}


def sha256(path: pathlib.Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def ranges(codepoints: set[int]) -> list[list[int]]:
    """Collapse a codepoint set into inclusive [start, end] ranges."""
    out: list[list[int]] = []
    for point in sorted(codepoints):
        if out and point == out[-1][1] + 1:
            out[-1][1] = point
        else:
            out.append([point, point])
    return out


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    covered: set[int] = set()
    files: list[str] = []
    ttf_hashes: dict[str, str] = {}
    source_hashes: dict[str, str] = {}
    source_paths: dict[str, str] = {}

    for face in FACES:
        name: str = face["File"]
        source: pathlib.Path = face["Source"]
        expect: dict = face["Expect"]
        target = OUT_DIR / name

        if not source.exists():
            print(f"missing source face: {source}", file=sys.stderr)
            return 1

        decompress(str(source), str(target))

        font = TTFont(str(target))
        upm = font["head"].unitsPerEm
        weight = font["OS/2"].usWeightClass
        cmap = font.getBestCmap()
        glyphs = font.getGlyphOrder()
        hmtx = font["hmtx"]

        # The family the card names in `font-family` is the typographic one
        # (name ID 16), which is also what a font matcher resolves: the Medium
        # face's *legacy* family (ID 1) is "IBM Plex Mono Medm", a name no
        # stylesheet writes and no run should have to know. Regular carries no
        # ID 16, so it falls back to ID 1 - both spell "IBM Plex Mono".
        family = font["name"].getDebugName(16) or font["name"].getDebugName(1)

        measured = {
            "UnitsPerEm": upm,
            "Weight": weight,
            "Glyphs": len(glyphs),
            "Codepoints": len(cmap),
            "Family": family,
        }

        for key, want in expect.items():
            if measured[key] != want:
                print(
                    f"{name}: {key} is {measured[key]!r}, the card assumes {want!r}",
                    file=sys.stderr,
                )
                return 1

        # The grid claim, in both directions: no character sits off the 600-unit
        # grid, and nothing that a run can space over carries a zero advance.
        # Zero is legitimate only for characters Unicode defines as
        # non-spacing - marks, format characters, separators, controls, and the
        # private-use combining composites Plex ships.
        ZERO = ("Mn", "Me", "Cf", "Zl", "Zp", "Cc", "Co")

        bad = [
            (f"U+{point:04X}", cmap[point], hmtx[cmap[point]][0])
            for point in cmap
            if hmtx[cmap[point]][0] != ADVANCE
            and not (
                hmtx[cmap[point]][0] == 0 and unicodedata.category(chr(point)) in ZERO
            )
        ]

        if bad:
            print(
                f"{name}: {len(bad)} codepoint(s) sit off the {ADVANCE}/1000 grid: {bad[:5]}",
                file=sys.stderr,
            )
            return 1

        # Printed so the zero-advance set is visible rather than implied.
        marks = [point for point in cmap if hmtx[cmap[point]][0] == 0]

        for char in REQUIRED[name]:
            if ord(char) not in cmap:
                print(
                    f"{name}: the card prints U+{ord(char):04X} and this face has no glyph for it",
                    file=sys.stderr,
                )
                return 1

        covered |= set(cmap)

        files.append(name)
        ttf_hashes[name] = sha256(target)
        source_hashes[source.name] = sha256(source)
        source_paths[source.name] = str(source.relative_to(ROOT))

        print(
            f"{name}: {target.stat().st_size:,} B  upm={upm} weight={weight} "
            f"glyphs={len(glyphs)} codepoints={len(cmap)} family={family!r} "
            f"advance={ADVANCE}/{upm} (1ch) marks={len(marks)} "
            f"sha256={ttf_hashes[name][:16]}"
        )

    dumped_files = json.dumps(files, indent="\t")
    dumped_ttf = json.dumps(ttf_hashes, indent="\t")
    dumped_source = json.dumps(source_hashes, indent="\t")
    dumped_paths = json.dumps(source_paths, indent="\t")

    # One range per entry, eight to a line: readable as hex, and short enough
    # that the module stays a data file rather than a wall of brackets.
    pairs = [f"[0x{start:04X}, 0x{end:04X}]" for start, end in ranges(covered)]
    lines = [
        "\t" + ", ".join(pairs[at : at + 8]) + "," for at in range(0, len(pairs), 8)
    ]
    dumped_ranges = "[\n" + "\n".join(lines) + "\n]"

    body = f"""/**
 * The share card's faces, as its rasteriser sees them.
 *
 * GENERATED - do not edit. `Maintain/Script/BuildOpenGraphFont.py` writes this
 * file and the three ttf files it names; re-run it when a shipped woff2
 * changes. The header of that script is the argument: why the card is
 * rasterised at all, why the rasteriser needs a second format, and why the
 * second format is asserted rather than trusted.
 *
 * `Source/Function/OpenGraph/Raster.ts` is the only reader. It hands
 * `FacePath()` to resvg with `loadSystemFonts: false`, so these three files are
 * the card's entire typeface inventory: no system font can be reached, and a
 * character they do not cover cannot be silently substituted.
 */

/** Directory holding the faces, relative to the site root (`WebSite/`). */
export const FACE_DIRECTORY = "Maintain/Font/OpenGraph";

/** The faces, in the order the rasteriser loads them. */
export const FACE_FILES = {dumped_files} as const;

/** sha256 of each generated face - what the rasteriser actually reads. */
export const FACE_SHA256: Readonly<Record<string, string>> = {dumped_ttf};

/**
 * sha256 of the shipped woff2 each face was cut from.
 *
 * The rasteriser hashes those files at build time and refuses to draw the card
 * when one has moved: a rebuilt face must not leave a stale ttf setting the
 * card in the old drawing. The fix is always the same one command - this
 * script.
 */
export const SOURCE_SHA256: Readonly<Record<string, string>> = {dumped_source};

/** Where each source face lives, relative to the site root. */
export const SOURCE_FILES: Readonly<Record<string, string>> = {dumped_paths};

/**
 * Every codepoint the three faces carry, as inclusive ranges.
 *
 * The union is {len(covered)} codepoints - Plex Mono's 983 plus the six the
 * symbol face adds - and it is the card's whole alphabet: `Raster.ts` refuses
 * to render a card that prints anything outside it, because with
 * `loadSystemFonts: false` an uncovered character is not a substitute face, it
 * is a blank.
 */
export const COVERED_RANGES: readonly (readonly [number, number])[] = {dumped_ranges};
"""

    FACE_MODULE.write_text(body, encoding="utf-8")

    Format(FACE_MODULE)

    print(
        f"\nwrote {len(files)} faces to {OUT_DIR.relative_to(ROOT)}/ "
        f"and {FACE_MODULE.relative_to(ROOT)} "
        f"({len(covered)} codepoints, {len(ranges(covered))} ranges)"
    )

    return 0


def Format(target: pathlib.Path) -> None:
    """Leave the generated module in the tree's own format.

    `Maintain/Format.sh` runs the blank-line pass and then Prettier over the
    whole tree, and it warns when a file still wants a blank line Prettier
    strips - the drift that once made every Format run rewrite 1,600 files.
    A generated file that ignored that pipeline would be the one file the next
    `npm run Format` always rewrites, so the same two passes run here, on this
    file only. Missing tooling is reported, not fatal: the module is valid
    TypeScript either way.
    """
    steps = [
        [sys.executable, "Maintain/Format/TypeScript.py", str(target)],
        [
            str(ROOT / "node_modules" / ".bin" / "prettier"),
            "--write",
            str(target),
        ],
    ]

    for command in steps:
        if not pathlib.Path(command[0]).exists() and not shutil.which(command[0]):
            print(f"format skipped (not installed): {command[0]}", file=sys.stderr)
            continue

        result = subprocess.run(command, cwd=ROOT, capture_output=True, text=True)

        if result.returncode != 0:
            print(
                f"format step failed: {' '.join(command)}\n{result.stderr}",
                file=sys.stderr,
            )


if __name__ == "__main__":
    raise SystemExit(main())
