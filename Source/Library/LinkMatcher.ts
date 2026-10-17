/**
 * The compiled matcher cache for the link passes - the "cache inside
 * ./WebSite/". Built ONCE at module load: every term is sorted
 * longest-first and compiled into a single boundary-aware alternation regex
 * (the CodeMentions.ts pattern), so every subsequent render hits the
 * precompiled matcher and never re-scans the full index.
 *
 * Two compiled matchers share this module:
 *  - MarkdownMatcher - the full LinkIndex (elements, technical symbols,
 *    Phase 2 file paths and symbols, extHost API names) used by the remark
 *    plugin (Source/Function/Markdown/CodeMentions.ts).
 *  - ProseMatcher - the curated MentionMap + TechnicalMentions subset used
 *    by the hand-written prose pass (Source/Library/CodeMentions.ts), so
 *    the Contributing/Rust pages keep their exact current behavior.
 *
 * The protected brand compounds ("CodeEditorLand", "Code Editor Land") are
 * part of both compiled term lists: longest-first order consumes them whole
 * before a bare element name can match inside, and Scan() returns them with
 * Url undefined so callers re-emit them unchanged.
 */

import {
	LinkIndex,
	MentionMap,
	TechnicalMentions,
	Protected,
} from "./LinkIndex";

/** One boundary-aware match: the term, its URL (undefined = protected), and its span in the scanned text. */
export interface Match {
	Term: string;

	Url: string | undefined;

	Start: number;

	End: number;
}

/** A compiled matcher: longest-first terms plus the boundary regex, frozen after construction. */
export interface Matcher {
	Terms: readonly string[];

	Regex: RegExp;

	/** Scan one text value for every non-overlapping match, longest-first, boundary-aware. */
	Scan(Text: string): Match[];
}

const Escape = (Term: string): string =>
	Term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Compile a term list into a cached matcher: longest-first sort + whole-word boundary regex. */
const Compile = (Terms: readonly string[]): Matcher => {
	const Sorted = [...Terms].sort((A, B) => B.length - A.length);

	const Regex = new RegExp(
		`(?<![A-Za-z0-9_])(?:${Sorted.map(Escape).join("|")})(?![A-Za-z0-9_])`,

		"g",
	);

	const Scan = (Text: string): Match[] => {
		const Out: Match[] = [];

		for (const M of Text.matchAll(Regex)) {
			const Term = M[0];

			Out.push({
				Term,

				Url: LinkIndex[Term],

				Start: M.index,

				End: M.index + Term.length,
			});
		}

		return Out;
	};

	return { Terms: Sorted, Regex, Scan };
};

/** The markdown-pass cache: the full researched index, compiled once at module load. */
export const MarkdownMatcher: Matcher = Compile([
	...Protected,

	...Object.keys(LinkIndex),
]);

/** The prose-pass cache: the curated registry subset, compiled once at module load. */
export const ProseMatcher: Matcher = Compile([
	...Protected,

	...Object.keys(MentionMap),

	...Object.keys(TechnicalMentions),
]);

/**
 * Exact whole-span lookup for inline code: a code span whose text IS a term
 * (file paths, symbols, API names) resolves to its URL; multi-token spans
 * and protected compounds resolve to undefined and stay plain code.
 */
export const Lookup = (Term: string): string | undefined => LinkIndex[Term];

/** The size of the full index, for diagnostics. */
export const LinkCount = Object.keys(LinkIndex).length;
