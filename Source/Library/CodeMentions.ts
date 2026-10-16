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
 * The transform is boundary-aware: matches require word boundaries, the
 * brand compounds "Code Editor Land"/"CodeEditorLand" are never linked,
 * text inside <pre>/<code>/<a>/<script>/<style>/<title>/<textarea> and
 * headings is never prose-matched (no nested anchors, no links inside code
 * blocks), and the label is re-emitted byte-for-byte.
 *
 * Applied at render time on the hand-written prose pages (Contributing,
 * Rust), where the pages wrap their prose strings with LinkMentions() so
 * the anchor URLs are always composed from the registry - never hardcoded.
 * Markdown content (doc pages, blog posts) is linked by direct markdown-link
 * edits in the source files (the manual per-page pass); frontmatter fields
 * are never linked (they render as plain text).
 */

import { ElementRepos, ExternalLinks } from "./Links";

/**
 * The mention map: term -> target URL, composed ONLY from the C15 registry
 * (Links.ts) - never a hardcoded URL. "editor.land" is the repository's
 * site; the element names resolve to their repository homes.
 */
export const MentionMap: Readonly<Record<string, string>> = {
	"editor.land": ExternalLinks.Repository,

	Land: ExternalLinks.Repository,

	PlayForm: ExternalLinks.PlayForm,

	Air: ElementRepos.Air.Base,

	Cocoon: ElementRepos.Cocoon.Base,

	Common: ElementRepos.Common.Base,

	Echo: ElementRepos.Echo.Base,

	Grove: ElementRepos.Grove.Base,

	Maintain: ElementRepos.Maintain.Base,

	Mist: ElementRepos.Mist.Base,

	Mountain: ElementRepos.Mountain.Base,

	Output: ElementRepos.Output.Base,

	Rest: ElementRepos.Rest.Base,

	SideCar: ElementRepos.SideCar.Base,

	Sky: ElementRepos.Sky.Base,

	Vine: ElementRepos.Vine.Base,

	Wind: ElementRepos.Wind.Base,

	Worker: ElementRepos.Worker.Base,
};

/**
 * Technical symbols in the prose that clearly denote a linkable project or
 * export: "Effect-TS" (the Effect project - the blog already anchors it to
 * https://effect.website), "ManagedRuntime" (Effect-TS's runtime export,
 * same canonical home), and "LandWorkbenchRuntime" (the Wind workbench's
 * ManagedRuntime export - the Wind repository via the registry). Terms too
 * generic to add navigation value (run*, gRPC, Rust, Tauri, VS Code) are
 * deliberately not mapped.
 */
export const TechnicalMentions: Readonly<Record<string, string>> = {
	"Effect-TS": "https://effect.website",

	ManagedRuntime: "https://effect.website",

	LandWorkbenchRuntime: ElementRepos.Wind.Base,
};

/** Brand compounds that embed a mapped term but are not repository mentions. */
const Protected = ["Code Editor Land", "CodeEditorLand"] as const;

/** Every term the prose pass can emit an anchor for (protected ones re-emit unchanged). */
const AllMentions: Readonly<Record<string, string>> = {
	...MentionMap,
	...TechnicalMentions,
};

const Terms = [...Protected, ...Object.keys(AllMentions)].sort(
	(A, B) => B.length - A.length,
);

const Escape = (Term: string): string =>
	Term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Whole-word mention match: brand compounds first, longest terms first, so
 * "editor.land" is consumed before "Land" can match inside it and
 * "Code Editor Land"/"CodeEditorLand" never leave a bare "Land" behind.
 */
const MentionRegex = new RegExp(
	`(?<![A-Za-z0-9_])(?:${Terms.map(Escape).join("|")})(?![A-Za-z0-9_])`,

	"g",
);

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
 * nested anchors) and fenced code stay untouched.
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
					? Token.replace(MentionRegex, WrapMention)
					: Token;
		}
	});
};

/**
 * The full-page rewrite is intentionally NOT wired into the build: markdown
 * content (doc pages, blog posts) is linked by direct markdown-link edits in
 * the source files (the manual per-page pass), so no post-render pass runs.
 * LinkMentions() is the render-time call the hand-written pages make.
 */
