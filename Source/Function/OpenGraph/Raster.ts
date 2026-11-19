/**
 * OpenGraph raster - the step that puts the card in the site's own face.
 *
 * ── WHY THE CARD IS A PNG ────────────────────────────────────────────────────
 * A share card is not read by a browser. `og:image` is read by a platform's
 * scraper, and no major platform renders SVG: Facebook accepts JPEG, GIF and
 * PNG, and X's card documentation says SVG is not supported. So the two card
 * endpoints (`pages/OpenGraph.png.ts` and `pages/OpenGraph/[...Slug].png.ts`)
 * return PNG, rasterised here at build time from the same SVG string the
 * generators have always produced. The drawing did not move; only its delivery
 * format did - and with it the question of who supplies the typeface, which is
 * the whole point of this file.
 *
 * ── WHY THE FACE HAS TO BE HANDED OVER ───────────────────────────────────────
 * An SVG loaded as an image loads nothing else: it may not fetch an external
 * stylesheet and may not fetch a webfont. That is why `Ink.ts` used to omit
 * "Land Symbol" from `FONT` - naming a face the renderer cannot fetch would
 * only pretend the stamp was drawn in the site's own brackets. Rasterising
 * changes the premise: this module hands resvg the face files directly, so the
 * card is set in IBM Plex Mono at weight 400 and 500, and the `〈 〉` stamp is
 * drawn by `LandSymbol-Medium.woff2`'s own outlines rather than by whatever
 * mono the platform would have substituted.
 *
 * ── WHY NO SYSTEM FONTS ─────────────────────────────────────────────────────
 * `loadSystemFonts: false` is the load-bearing option, not a hardening
 * afterthought. With it the three files in `Face.ts` are the card's entire
 * typeface inventory: a build on this machine and a build on a Linux runner
 * produce the same bytes, and no character can silently fall back to a face
 * the site does not own. The price is that an uncovered character would print
 * as a blank rather than as a substitute, so `VerifyAlphabet` refuses to draw
 * the card instead - a card that silently loses a character is worse than a
 * build that stops and names it.
 *
 * ── WHAT IT COSTS ───────────────────────────────────────────────────────────
 * One native dependency (`@resvg/resvg-js`, resvg + napi) and one render per
 * card route: measured at 40 cards in about two seconds with node's own start
 * included (roughly 40 ms a card), ~50 KB each at 1200x675. The faces are the
 * ttf twins `Maintain/Script/BuildOpenGraphFont.py` cuts from the shipped woff2
 * - resvg cannot decode woff2 (measured: a woff2 handed to `font.fontFiles`
 * renders byte-identically to passing no font at all), and the header of that
 * script is the argument for the second format.
 */

import { createHash } from "node:crypto";

import { readFileSync } from "node:fs";

import { join } from "node:path";

import { Resvg } from "@resvg/resvg-js";

import {
	COVERED_RANGES,
	FACE_DIRECTORY,
	FACE_FILES,
	SOURCE_FILES,
	SOURCE_SHA256,
} from "./Face.js";

/**
 * The site root, which is also the process's working directory for both
 * `astro build` and `astro dev` - the only two places a card is ever drawn.
 * The face directory is relative to it, so the paths in `Face.ts` stay
 * readable in the source instead of being absolute on one machine.
 */
const SiteRoot = process.cwd();

/** Absolute path of one face, from its name in `Face.ts`. */
export const FacePath = (File: string): string =>
	join(SiteRoot, FACE_DIRECTORY, File);

/** Every codepoint the three faces carry, expanded once at module load. */
const Alphabet = new Set<number>();

for (const [From, To] of COVERED_RANGES) {
	for (let Point = From; Point <= To; Point += 1) Alphabet.add(Point);
}

let Verified = false;

/**
 * The ttf twins must still be the drawing the site ships.
 *
 * The woff2 files are the source: the ttf files are cut from them, so a face
 * that was rebuilt (or replaced) after the ttf was cut would leave the card
 * setting its text in the old drawing while every page used the new one -
 * silently, and only on social. Hashing the three shipped faces (92 KB) once
 * per build is cheap enough to make that impossible.
 */
const VerifyFaces = (): void => {
	if (Verified) return;

	for (const [Name, Path] of Object.entries(SOURCE_FILES)) {
		const Bytes = readFileSync(join(SiteRoot, Path));

		const Hash = createHash("sha256").update(Bytes).digest("hex");

		if (Hash !== SOURCE_SHA256[Name]) {
			throw new Error(
				`OpenGraph: ${Path} is not the face the card's ttf was cut from ` +
					`(sha256 ${Hash}, Face.ts records ${SOURCE_SHA256[Name]}). ` +
					`Run: uv run --with fonttools --with brotli python ` +
					`Maintain/Script/BuildOpenGraphFont.py`,
			);
		}
	}

	for (const File of FACE_FILES) {
		readFileSync(FacePath(File));
	}

	Verified = true;
};

/**
 * Refuse to draw a card that prints a character the faces do not carry.
 *
 * The check runs on what the `<text>` elements print - their content with the
 * `<tspan>` wrappers removed - because that is the only place a character can
 * come from. Scanning the whole file would flag the markup's own whitespace and
 * the ASCII of hex colours and coordinates; scanning the content of every text
 * element catches exactly the characters a run prints, and nothing else.
 * `EscapeXML` emits named entities rather than numeric ones, so an escaped
 * character arrives here as its ASCII spelling, which is covered.
 */
const VerifyAlphabet = (Svg: string, Card: string): void => {
	const Runs = [...Svg.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)].map(
		(Match) => (Match[1] ?? "").replace(/<[^>]*>/g, ""),
	);

	for (const Character of Runs.join("")) {
		const Point = Character.codePointAt(0) as number;

		if (!Alphabet.has(Point)) {
			throw new Error(
				`OpenGraph: ${Card} prints U+${Point.toString(16)
					.toUpperCase()
					.padStart(4, "0")} (${JSON.stringify(Character)}), which ` +
					`none of the card's faces carry. The card is drawn with ` +
					`loadSystemFonts: false, so that character would be blank. ` +
					`Either reword the card or extend the face - do not let it ` +
					`render empty.`,
			);
		}
	}
};

/**
 * One card SVG -> one PNG, at the card's own 1200x675.
 *
 * `Card` is the route the drawing belongs to (`OpenGraph.png`,
 * `OpenGraph/Blog/....png`) and is used only to name the failure.
 */
export const Rasterise = (
	Svg: string,

	Card: string,
): Uint8Array<ArrayBuffer> => {
	VerifyFaces();

	VerifyAlphabet(Svg, Card);

	// `fitTo: original` keeps the drawing at the size it was composed for, so
	// the file's real dimensions match the `og:image:width/height` the head
	// declares (`Component/Social/Tags.ts` prints 1200x675). A card that
	// declares one size and ships another is upscaled by the platform.
	const Png = new Resvg(Svg, {
		fitTo: { mode: "original" },
		font: {
			fontFiles: FACE_FILES.map(FacePath),
			loadSystemFonts: false,
			defaultFontFamily: "IBM Plex Mono",
		},
	})
		.render()
		.asPng();

	// resvg hands back a Buffer. Copying into a plain Uint8Array gives the
	// endpoints a body a `Response` accepts as-is, and detaches the bytes from
	// the renderer's buffer in the same move.
	return new Uint8Array(Png);
};
