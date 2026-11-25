/**
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
export const FACE_FILES = [
	"IBMPlexMono-Regular.ttf",
	"IBMPlexMono-Medium.ttf",
	"LandSymbol-Medium.ttf",
] as const;

/** sha256 of each generated face - what the rasteriser actually reads. */
export const FACE_SHA256: Readonly<Record<string, string>> = {
	"IBMPlexMono-Regular.ttf":
		"d83a65ed142b355b9a419fe4696ad6ddbb37a33fa49143753d4e16ebd10bbea9",

	"IBMPlexMono-Medium.ttf":
		"073c6509382aaa36b2ce2199de611e8c4aea85927ba76c412b0c98efccc7ea27",

	"LandSymbol-Medium.ttf":
		"2a23051b3b1e6bd34ca11c11836e2436e841759a601a5d08ef83d932fea1e458",
};

/**
 * sha256 of the shipped woff2 each face was cut from.
 *
 * The rasteriser hashes those files at build time and refuses to draw the card
 * when one has moved: a rebuilt face must not leave a stale ttf setting the
 * card in the old drawing. The fix is always the same one command - this
 * script.
 */
export const SOURCE_SHA256: Readonly<Record<string, string>> = {
	"IBMPlexMono-Regular.woff2":
		"49ce58b41a0e1cb921c0f58d9a5b8b96a2cc21437c7066f3ba4f24873076d131",

	"IBMPlexMono-Medium.woff2":
		"8c2c290cbd998fa1f647e4572aca6ebbd72589551b0f3f9f8bb8628fbb8219d5",

	"LandSymbol-Medium.woff2":
		"5d513bbf16db46a57aea0d59588e2dd3d3113a95917bf52f79f0b16804cb17fe",
};

/** Where each source face lives, relative to the site root. */
export const SOURCE_FILES: Readonly<Record<string, string>> = {
	"IBMPlexMono-Regular.woff2":
		"Public/Font/IBM-Plex-Mono/IBMPlexMono-Regular.woff2",

	"IBMPlexMono-Medium.woff2":
		"Public/Font/IBM-Plex-Mono/IBMPlexMono-Medium.woff2",

	"LandSymbol-Medium.woff2":
		"Public/Font/Land-Symbol/LandSymbol-Medium.woff2",
};

/**
 * Every codepoint the three faces carry, as inclusive ranges.
 *
 * The union is 988 codepoints - Plex Mono's 983 plus the six the
 * symbol face adds - and it is the card's whole alphabet: `Raster.ts` refuses
 * to render a card that prints anything outside it, because with
 * `loadSystemFonts: false` an uncovered character is not a substitute face, it
 * is a blank.
 */
export const COVERED_RANGES: readonly (readonly [number, number])[] = [
	[0x0000, 0x0000],
	[0x000d, 0x000d],
	[0x0020, 0x007e],
	[0x00a0, 0x017f],
	[0x018f, 0x018f],
	[0x0192, 0x0192],
	[0x01a0, 0x01a1],
	[0x01af, 0x01b0],
	[0x01cd, 0x01dc],
	[0x01fa, 0x01ff],
	[0x0218, 0x021b],
	[0x0237, 0x0237],
	[0x0259, 0x0259],
	[0x02bb, 0x02bc],
	[0x02c6, 0x02c7],
	[0x02d8, 0x02dd],
	[0x0300, 0x0304],
	[0x0306, 0x030c],
	[0x0312, 0x0312],
	[0x0315, 0x0315],
	[0x031b, 0x031b],
	[0x0323, 0x0323],
	[0x0326, 0x0328],
	[0x03c0, 0x03c0],
	[0x0400, 0x045f],
	[0x0462, 0x0463],
	[0x046a, 0x046b],
	[0x0472, 0x0475],
	[0x0490, 0x04c2],
	[0x04cf, 0x04d9],
	[0x04dc, 0x04e9],
	[0x04ee, 0x04f9],
	[0x0524, 0x0525],
	[0x0e3f, 0x0e3f],
	[0x1e80, 0x1e85],
	[0x1e9e, 0x1e9e],
	[0x1ea0, 0x1ef9],
	[0x2000, 0x200d],
	[0x2010, 0x2015],
	[0x2018, 0x201a],
	[0x201c, 0x201e],
	[0x2020, 0x2022],
	[0x2026, 0x2026],
	[0x2028, 0x2029],
	[0x202f, 0x2030],
	[0x2032, 0x2033],
	[0x2039, 0x203a],
	[0x2044, 0x2044],
	[0x205f, 0x205f],
	[0x2070, 0x2070],
	[0x2074, 0x2079],
	[0x2080, 0x2089],
	[0x20a1, 0x20a1],
	[0x20a4, 0x20a4],
	[0x20a6, 0x20a6],
	[0x20a8, 0x20ae],
	[0x20b1, 0x20b2],
	[0x20b4, 0x20b5],
	[0x20b8, 0x20ba],
	[0x20bd, 0x20bd],
	[0x20bf, 0x20bf],
	[0x2113, 0x2113],
	[0x2116, 0x2116],
	[0x2122, 0x2122],
	[0x2126, 0x2126],
	[0x212e, 0x212e],
	[0x2150, 0x2151],
	[0x2153, 0x215e],
	[0x2190, 0x2199],
	[0x21a9, 0x21aa],
	[0x21b0, 0x21b3],
	[0x21b6, 0x21b7],
	[0x21ba, 0x21bb],
	[0x21c4, 0x21c4],
	[0x21c6, 0x21c6],
	[0x2202, 0x2202],
	[0x2206, 0x2206],
	[0x220f, 0x220f],
	[0x2211, 0x2212],
	[0x2215, 0x2215],
	[0x2219, 0x221a],
	[0x221e, 0x221e],
	[0x222b, 0x222b],
	[0x2236, 0x2236],
	[0x2248, 0x2248],
	[0x2260, 0x2260],
	[0x2264, 0x2265],
	[0x2329, 0x232a],
	[0x2500, 0x259f],
	[0x25ca, 0x25ca],
	[0x25ce, 0x25ce],
	[0x2713, 0x2713],
	[0x274c, 0x274c],
	[0x2b0e, 0x2b11],
	[0x3000, 0x3000],
	[0x3008, 0x3009],
	[0xf6d7, 0xf6d8],
	[0xfb01, 0xfb02],
	[0xfeff, 0xfeff],
	[0xfffd, 0xfffd],
];
