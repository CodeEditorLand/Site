/**
 * The palette's filter, and nothing else.
 *
 * ─── WHY THIS FILE IS SEPARATE FROM `Data.ts` ──────────────────────────────
 *
 * `Data.ts` builds the register on the server: it reads `FrameSections`, the
 * lexicon and the generated record index. `Palette.tsx` is a client island and
 * needs the *filter* only - the register arrives as props. Importing both from
 * one module would pull the lexicon, fifteen element records and a JSON index
 * into the island's bundle to rank ninety rows, which is a cost the control
 * cannot see and the reader pays on every page.
 *
 * So: one module with no imports but a type, and one module that reads the tree.
 *
 * ─── THE RANK ─────────────────────────────────────────────────────────────
 *
 * Case-insensitive, and it matches the label, the section and the slug - so
 * "telemetry", "Mountain" and "deep-dive-mountain" all reach the same page. The
 * score is what orders the rows: a label that starts with the query beats a label
 * that contains it, which beats a section that contains it, which beats a
 * subsequence. Without an order a fuzzy list is a bag, and the reader's eye has
 * to search the search.
 *
 * `0` means no match; anything above it is a rank, higher first.
 */
import type { PaletteEntry } from "./Type.js";

export const MatchEntry = (Query: string, Entry: PaletteEntry): number => {
	/**
	 * The site prints every route with a leading `/` (`/DOCS`, `/CONTENTS`), so a
	 * reader who types the grammar must not be told there is no such row: the
	 * marker is the grammar, not part of the name. Strip it before matching, and
	 * `/contents` ranks exactly as `contents` does.
	 */
	const Needle = Query.trim().toLowerCase().replace(/^\/+/, "");

	if (Needle === "") return 1;

	const Label = Entry.Label.toLowerCase();

	const Section = (Entry.Section ?? "").toLowerCase();

	const Slug = Entry.Id.replace(
		/^(page|part|record|term|action)-/,

		"",
	).toLowerCase();

	if (Label === Needle) return 100;

	if (Label.startsWith(Needle)) return 80;

	if (Label.includes(Needle)) return 60;

	// A word start inside the label: "footprint" finds "Filesystem Footprint".
	if (Label.split(/[\s/]+/).some((Word) => Word.startsWith(Needle)))
		return 70;

	if (Section.startsWith(Needle)) return 40;

	if (Section.includes(Needle)) return 30;

	if (Slug.includes(Needle)) return 20;

	return Subsequence(Needle, `${Label} ${Section} ${Slug}`) ? 10 : 0;
};

/**
 * Every character of the needle, in order, somewhere in the haystack. Cheap, and
 * enough for a register of a hundred and sixty rows: it catches "fsfp" for
 * "Filesystem Footprint" without pulling a scoring library into the island.
 */
const Subsequence = (Needle: string, Haystack: string): boolean => {
	let At = 0;

	for (const Character of Haystack) {
		if (Character === Needle[At]) At += 1;

		if (At === Needle.length) return true;
	}

	return Needle.length === 0;
};

/** Filter and order one group's rows. */
export const FilterEntries = (
	Query: string,

	Entries: PaletteEntry[],
): PaletteEntry[] =>
	Entries.map((Entry, Index) => ({
		Entry,
		Index,
		Rank: MatchEntry(Query, Entry),
	}))
		.filter(({ Rank }) => Rank > 0)
		.sort((A, B) => B.Rank - A.Rank || A.Index - B.Index)
		.map(({ Entry }) => Entry);
