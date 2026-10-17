/**
 * The code-mention pass for the CodeEditorLand site - the Aphrodite/Site
 * pattern adapted to the C15 link registry (Source/Library/Links.ts).
 *
 * Given a prose string, whole-word mentions of the mapped terms resolve to
 * their registry URLs: the product "Land" (ExternalLinks.Repository), the
 * sixteen element names (ElementRepos), "PlayForm" (ExternalLinks.PlayForm),
 * "editor.land" (the repository's site), and the technical symbols in
 * TechnicalMentions (symbols that clearly denote a linkable project or
 * export - "Effect-TS", "ManagedRuntime", "LandWorkbenchRuntime").
 *
 * The term source is the shared runtime index (Source/Library/LinkIndex.ts -
 * MentionMap + TechnicalMentions, registry-composed) and the compiled
 * matcher is the shared cache (Source/Library/LinkMatcher.ts - ProseMatcher,
 * built once at module load), so this pass and the markdown remark plugin
 * (Source/Function/Markdown/CodeMentions.ts) never diverge.
 *
 * The transform is boundary-aware: matches require word boundaries, the
 * brand compounds "Code Editor Land"/"CodeEditorLand" are never linked,
 * text inside <pre>/<code>/<a>/<script>/<style>/<title>/<textarea> and
 * headings is never prose-matched (no nested anchors, no links inside code
 * blocks), and the label is re-emitted byte-for-byte.
 *
 * Applied at render time on the hand-written prose pages (Contributing,
 * Rust), where the pages wrap their prose strings with LinkMentions() so
 * the anchor URLs are always composed from the registry - never hardcoded.
 * Markdown content (doc pages, blog posts) is linked at render time by the
 * remark plugin; frontmatter fields are never linked (they render as plain
 * text).
 */

import { MentionMap, Protected, TechnicalMentions } from "./LinkIndex";

import { ProseMatcher } from "./LinkMatcher";

export { LinkIndex, MentionMap, TechnicalMentions } from "./LinkIndex";

const AllMentions: Readonly<Record<string, string>> = {
	...MentionMap,

	...TechnicalMentions,
};

/** Wrap one mention: protected compounds re-emit unchanged, everything else becomes an external anchor to its registry URL. */
const WrapMention = (Term: string): string => {
	switch ((Protected as readonly string[]).includes(Term)) {
		case true:
			return Term;

		default:
			break;
	}

	const Url = AllMentions[Term];

	return `<a class="code-link" href="${Url}" target="_blank" rel="noopener noreferrer">${Term}</a>`;
};

/** Text inside these elements is never prose-matched. */
const SkipTags = /^(code|a|pre|script|style|title|textarea|h1|h2|h3|h4|h5|h6)$/;

const TagOrText = /<[^>]+>|[^<]+/g;

/**
 * Link the mapped mentions in one prose string. Only text nodes are
 * transformed: text inside <code>, <a>, <pre>, <script>, <style>, <title>,
 * <textarea> and headings is skipped, so code spans, existing links (no
 * nested anchors) and fenced code stay untouched. The compiled ProseMatcher
 * (longest-first + boundary regex, built once at module load) does the
 * matching.
 */
export const LinkMentions = (Html: string): string => {
	let Depth = 0;

	return Html.replace(TagOrText, (Token: string): string => {
		switch (Token[0] === "<") {
			case true: {
				const Closing = Token[1] === "/";

				const Name =
					(Closing ? Token.slice(2) : Token.slice(1))
						.match(/^[a-zA-Z0-9-]+/)?.[0]
						?.toLowerCase() ?? "";

				const SelfClosing = Token.endsWith("/>");

				switch (Closing) {
					case false:
						switch (!SelfClosing && SkipTags.test(Name)) {
							case true:
								Depth++;

								break;

							default:
								break;
						}

						break;

					default:
						switch (SkipTags.test(Name) && Depth > 0) {
							case true:
								Depth--;

								break;

							default:
								break;
						}

						break;
				}

				return Token;
			}

			default:
				return Depth === 0
					? Token.replace(ProseMatcher.Regex, WrapMention)
					: Token;
		}
	});
};
