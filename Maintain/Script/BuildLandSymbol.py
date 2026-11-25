#!/usr/bin/env python3
"""Build the Land Symbol face - the three marks IBM Plex Mono does not carry.

Run from `WebSite/`:

    uv run --with fonttools --with brotli python Maintain/Script/BuildLandSymbol.py

Writes `Public/Font/Land-Symbol/LandSymbol-Medium.woff2` (1,444 bytes) and prints
the measurements the stylesheet's comment at `Type/_Face.scss` quotes. The TTF
intermediate goes to the system temp dir and is not part of the tree.

─── WHAT THIS FILE IS ──────────────────────────────────────────────────────
The site sets every line in IBM Plex Mono, and Plex Mono has no bullseye
(U+25CE) and no angle bracket (U+3008/U+3009): the whole U+25A0-25FF block is
absent and so is every bracket pair - U+2329/232A, U+3008/3009, U+27E8/27E9.
Both marks are the record grammar's, printed in 133 and 89 files respectively,
so they were being drawn by whatever face the visitor's browser substituted.

The fix is a second face for exactly those codepoints, and it is DRAWN rather
than cut from another foundry's file, because the marks have to sit on Plex
Mono's grid: same 600/1000 advance (1ch), same x-height (516) so
`font-size-adjust` cannot rescale them, same cap height (698), and a stroke
weight measured off the face itself (109 units for the vertical stem of `l`,
`i`, `I`; 94 for the em dash's horizontal bar - the rings and the bracket take
104, between the two, which is where a curved and a diagonal stroke belong).

Drawing also keeps the OFL clean: a *modified* Plex would have to drop the
Reserved Font Name "Plex", and the shipped Plex files stay unmodified so their
trace back to upstream stays true.

─── THE THREE MARKS ─────────────────────────────────────────────────────────
  U+25CE ◎  BULLSEYE          two concentric rings, centred on the face's own
                              symbol axis (y=350: the arrow `→` at weight 500
                              is centred at 348.5, the bullet at 304)
  U+3008 〈  ANGLE BRACKET     one miter-joined chevron, -182..812 (0.99em), so
                              it contains a cap-height run without leaving the
                              1em line box the L tier is set in
  U+3009 〉                   the same outline mirrored about x=300

U+2329/U+232A (the deprecated canonical equivalents of U+3008/U+3009) are mapped
to the same two outlines: Unicode normalisation says they are the same
character, and a font that draws one and not the other can produce two
renderings of one character.

─── AFTER RUNNING ──────────────────────────────────────────────────────────
Check the report against `Public/Font/IBM-Plex-Mono/IBMPlexMono-Medium.woff2`:
the vertical metrics must be identical (hhea 1025/-275/0, typo 780/-220/300,
win 1025/275, fsSelection bit 8) or the line box of any run containing a mark
grows. Then `npx sass --no-source-map Source/Stylesheet/System.scss /tmp/x.css`
and read the two `@font-face` blocks back out of the output.

─── THE BEARING IS THE POSITION ────────────────────────────────────────────
`hmtx.lsb` is not decoration: a rasteriser that finds it disagreeing with the
outline's `xMin` translates the drawing so the ink starts at the lsb, and every
mark then lands somewhere the stylesheet never asked for. So the build reads the
bearing back off the outline and the report refuses a file where the two
disagree. `〈` is placed 153..477 of its 600-unit advance and `〉` 123..447 - the
same 123-unit inset inside both marks and the same 153 outside both, which is
what makes the pair read as a container with the word centred between it.
"""

import math
import os
import sys
import tempfile

from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont
from fontTools.ttLib.woff2 import compress

# ─── THE FACE'S OWN NUMBERS ─────────────────────────────────────────────────
UPM = 1000          # Plex Mono's unitsPerEm
ADVANCE = 600       # every glyph in the face advances 0.6em - 1ch, the site's unit
X_HEIGHT = 516      # OS/2.sxHeight - the `--optical-x-height` the page adjusts to
CAP_HEIGHT = 698    # OS/2.sCapHeight
ASCENT = 1025       # hhea, copied from the face so a mark cannot grow a line box
DESCENT = -275
TYPO_ASCENT = 780
TYPO_DESCENT = -220
TYPO_GAP = 300

STROKE = 104        # between the vertical stem (109) and the horizontal bar (94)

# ─── THE BULLSEYE ───────────────────────────────────────────────────────────
# Radii, outward-in: ring 88, gap 85, ring 62, hole 55. The gap is wider than
# either ring on purpose: at 13px the whole mark is 7.5px across, and a narrower
# gap closes into one thick ring - which is a different character (fisheye).
BULLSEYE = dict(cx=300, cy=350, r=290, stroke=88, gap=85, inner_stroke=62)

# ─── THE BRACKET ────────────────────────────────────────────────────────────
# Centreline: apex at (210,315), arms to (430,790) and (430,-160). Ink then
# runs x 153..477, y -182..812 - 324 wide, 994 tall (0.99em), which contains a
# 698-unit cap run with 114 above and 182 below, the way a bracket hangs.
BRACKET = dict(apex=(210, 315), top=(430, 790), bottom=(430, -160), stroke=STROKE)

OUT = os.path.join("Public", "Font", "Land-Symbol", "LandSymbol-Medium.woff2")


def Circle(pen, cx, cy, r, seg=32, ccw=True):
    """One circle as `seg` quadratic arcs; error at r=290 is under 0.1 units."""
    arcs = []
    for i in range(seg):
        a0 = 2 * math.pi * i / seg
        a1 = 2 * math.pi * (i + 1) / seg
        p0 = (cx + r * math.cos(a0), cy + r * math.sin(a0))
        p1 = (cx + r * math.cos(a1), cy + r * math.sin(a1))
        tangent = (-math.sin(a0), math.cos(a0))
        k = r * math.tan((a1 - a0) / 2)
        arcs.append((p0, (p0[0] + k * tangent[0], p0[1] + k * tangent[1]), p1))
    if not ccw:
        arcs = [(end, ctrl, start) for (start, ctrl, end) in reversed(arcs)]
    pen.moveTo(arcs[0][0])
    for (_start, ctrl, end) in arcs:
        pen.qCurveTo(ctrl, end)
    pen.closePath()


def Bullseye(pen, cx, cy, r, stroke, gap, inner_stroke):
    Circle(pen, cx, cy, r, ccw=True)                     # outer edge
    Circle(pen, cx, cy, r - stroke, ccw=False)           # inner edge of the outer ring
    inner = r - stroke - gap
    Circle(pen, cx, cy, inner, ccw=True)                 # outer edge of the inner ring
    Circle(pen, cx, cy, inner - inner_stroke, ccw=False)  # the hole
    return inner - inner_stroke


def Chevron(pen, apex, tip_a, tip_b, stroke):
    """A V of constant stroke width: miter at the apex, butt caps at the arms."""
    half = stroke / 2
    d1 = _unit((apex[0] - tip_a[0], apex[1] - tip_a[1]))
    d2 = _unit((tip_b[0] - apex[0], tip_b[1] - apex[1]))

    def offset(p, d, s):
        return (p[0] - d[1] * s, p[1] + d[0] * s)

    def meet(p1, d1_, p2, d2_):
        den = d1_[0] * d2_[1] - d1_[1] * d2_[0]
        t = ((p2[0] - p1[0]) * d2_[1] - (p2[1] - p1[1]) * d2_[0]) / den
        return (p1[0] + t * d1_[0], p1[1] + t * d1_[1])

    left_a, right_a = offset(tip_a, d1, half), offset(tip_a, d1, -half)
    left_b, right_b = offset(tip_b, d2, half), offset(tip_b, d2, -half)
    left_joint = meet(left_a, d1, offset(apex, d2, half), d2)
    right_joint = meet(right_a, d1, offset(apex, d2, -half), d2)
    points = [left_a, left_joint, left_b, right_b, right_joint, right_a]
    pen.moveTo(points[0])
    for p in points[1:]:
        pen.lineTo(p)
    pen.closePath()
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    return (min(xs), min(ys), max(xs), max(ys))


def _unit(v):
    length = math.hypot(*v)
    return (v[0] / length, v[1] / length)


def Glyphs():
    out = {}
    pen = TTGlyphPen(None)
    Bullseye(pen, **BULLSEYE)
    out["uni25CE"] = pen.glyph()

    pen = TTGlyphPen(None)
    left = Chevron(pen, BRACKET["apex"], BRACKET["top"], BRACKET["bottom"], BRACKET["stroke"])
    out["uni3008"] = pen.glyph()

    pen = TTGlyphPen(None)
    apex = (ADVANCE - BRACKET["apex"][0], BRACKET["apex"][1])
    top = (ADVANCE - BRACKET["top"][0], BRACKET["top"][1])
    bottom = (ADVANCE - BRACKET["bottom"][0], BRACKET["bottom"][1])
    right = Chevron(pen, apex, top, bottom, BRACKET["stroke"])
    out["uni3009"] = pen.glyph()

    # A visible .notdef: the one thing this face must never draw is nothing.
    pen = TTGlyphPen(None)
    x0, y0, x1, y1, t = 100, 0, 500, 700, 56
    for (a, b, c, d) in [(x0, y0, x1, y0 + t), (x1 - t, y0, x1, y1),
                         (x1, y1 - t, x0, y1), (x0, y1, x0 + t, y0)]:
        pen.moveTo((a, b))
        pen.lineTo((c, b))
        pen.lineTo((c, d))
        pen.lineTo((a, d))
        pen.closePath()
    out[".notdef"] = pen.glyph()

    out["space"] = TTGlyphPen(None).glyph()
    return out, left, right


def Build(path):
    glyphs, left, right = Glyphs()
    order = [".notdef", "space", "uni25CE", "uni3008", "uni3009"]
    builder = FontBuilder(UPM, isTTF=True)
    builder.setupGlyphOrder(order)
    builder.setupCharacterMap({
        0x20: "space",
        0x25CE: "uni25CE",
        0x3008: "uni3008",
        0x3009: "uni3009",
        0x2329: "uni3008",   # deprecated canonical equivalent of U+3008
        0x232A: "uni3009",   # deprecated canonical equivalent of U+3009
    })
    builder.setupGlyf({name: glyphs[name] for name in order})
    # ─── THE SIDE BEARING IS THE POSITION, NOT A DECORATION ─────────────────
    # `hmtx.lsb` must equal the outline's own `xMin`. The outline's coordinates
    # are absolute, and a rasteriser that finds the two disagreeing translates
    # the drawing so its ink starts at the lsb - FreeType does exactly this, and
    # so does every browser on this platform. Writing 0 for every glyph did not
    # mean "no bearing": it meant "shift each mark left by its own xMin", which
    # set `〈` and `〉` flush against their advance box's left edge. The pair then
    # had no air on the outside of the opening mark, none on the inside of the
    # closing one, and a wide gap on the two remaining sides - lopsided at every
    # size, in both the span-composed and the single-string renderers, because
    # it was a metric rather than a rule. So the bearing is read back off the
    # drawing it places.
    glyf = builder.font["glyf"]
    metrics = {}
    for name in order:
        glyph = glyf[name]
        glyph.recalcBounds(glyf)
        metrics[name] = (ADVANCE, glyph.xMin if glyph.numberOfContours else 0)
    builder.setupHorizontalMetrics(metrics)
    builder.setupHorizontalHeader(ascent=ASCENT, descent=DESCENT, lineGap=0)
    builder.setupNameTable({
        "familyName": "Land Symbol",
        "styleName": "Medium",
        "uniqueFontIdentifier": "Land Symbol Medium; 1.000; LAND",
        "fullName": "Land Symbol Medium",
        "psName": "LandSymbol-Medium",
        "version": "Version 1.000",
        "copyright": "Copyright 2026 CodeEditorLand. Drawn for this site to the metrics of IBM Plex Mono.",
        "licenseDescription": "This Font Software is licensed under the SIL Open Font License, Version 1.1.",
        "licenseInfoURL": "https://openfontlicense.org",
        "manufacturer": "CodeEditorLand",
        "designer": "CodeEditorLand",
        "description": (
            "Three marks of the record grammar that IBM Plex Mono does not carry: U+25CE "
            "BULLSEYE and U+3008/U+3009 LEFT/RIGHT ANGLE BRACKET (with the deprecated "
            "canonical equivalents U+2329/U+232A mapped to the same outlines). Drawn at the "
            "face's own advance (600/1000), x-height (516), cap height (698) and stroke "
            "weight (104/1000)."
        ),
    })
    builder.setupOS2(version=4,
                     sTypoAscender=TYPO_ASCENT, sTypoDescender=TYPO_DESCENT,
                     sTypoLineGap=TYPO_GAP, usWinAscent=ASCENT, usWinDescent=-DESCENT,
                     sxHeight=X_HEIGHT, sCapHeight=CAP_HEIGHT, usWeightClass=500,
                     usWidthClass=5, achVendID="LAND", fsType=0,
                     fsSelection=0b100000000)   # USE_TYPO_METRICS, as the face sets it
    builder.setupPost(keepGlyphNames=False)
    builder.font["head"].created = 0
    builder.font["head"].modified = 0
    builder.font["OS/2"].recalcUnicodeRanges(builder.font)
    builder.font["OS/2"].xAvgCharWidth = ADVANCE
    builder.save(path)
    return left, right


def Report(woff2, left, right):
    font = TTFont(woff2)
    os2 = font["OS/2"]
    glyf = font["glyf"]
    print("wrote", woff2, os.path.getsize(woff2), "bytes")
    print("codepoints", {f"U+{c:04X}": n for c, n in sorted(font.getBestCmap().items())})
    print("advances", {n: font["hmtx"][n][0] for n in font.getGlyphOrder()})
    print("bracket ink  U+3008", tuple(round(v) for v in left),
          "| U+3009", tuple(round(v) for v in right))
    # The one number a rasteriser uses to place the drawing must agree with the
    # drawing. A glyph whose lsb is not its xMin is moved by whoever draws it,
    # and the mark lands somewhere the stylesheet never asked for.
    bearings = {}
    for name in font.getGlyphOrder():
        glyph = glyf[name]
        glyph.recalcBounds(glyf)
        lsb = font["hmtx"][name][1]
        if glyph.numberOfContours:
            if lsb != glyph.xMin:
                sys.exit(f"{name}: hmtx.lsb {lsb} != outline xMin {glyph.xMin} - "
                         "the rasteriser would move this glyph")
            bearings[name] = f"{lsb}..{lsb + (glyph.xMax - glyph.xMin)} of {ADVANCE}"
        else:
            bearings[name] = f"blank of {ADVANCE}"
    print("bearings  ", bearings)
    print("vertical   hhea", font["hhea"].ascent, font["hhea"].descent, font["hhea"].lineGap,
          "| typo", os2.sTypoAscender, os2.sTypoDescender, os2.sTypoLineGap,
          "| win", os2.usWinAscent, os2.usWinDescent,
          "| x-height", os2.sxHeight, "| cap", os2.sCapHeight,
          "| weight", os2.usWeightClass, "| fsSelection", bin(os2.fsSelection))


if __name__ == "__main__":
    if not os.path.isdir(os.path.dirname(OUT)):
        sys.exit(f"run me from WebSite/ - {os.path.dirname(OUT)} does not exist")
    with tempfile.TemporaryDirectory() as tmp:
        ttf = os.path.join(tmp, "LandSymbol-Medium.ttf")
        left, right = Build(ttf)
        compress(ttf, OUT)
    Report(OUT, left, right)
