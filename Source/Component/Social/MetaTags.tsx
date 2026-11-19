/**
 * The document head - the one place a route's metadata is written.
 *
 * ─── THE CONTRACT ─────────────────────────────────────────────────────────
 * `Layout/Base.astro` owns the shell and passes the route's facts here: the
 * title, the description, the card image, the canonical URL, the type, the
 * language and the noindex flag. This module is the only writer of `<title>`,
 * `<meta name="description">`, `<link rel="canonical">` and the `og:` /
 * `twitter:` families, and it writes each of them ONCE:
 *
 *   - one canonical, and it is the canonical path, not the request URL;
 *   - one title, in one pattern (`<page> | Code Editor Land`), normalised here so
 *     a page cannot invent a second pattern by passing its own suffix;
 *   - one description per route, from the page or the frame's default;
 *   - one `og:` pair per fact - `og:title`/`og:description`/`og:url`/`og:image`
 *     each appear once, and `og:image:*` describes the one image;
 *   - NO `<meta name="viewport">`: the frame writes it (`Base.astro`), and a
 *     second copy in the head is a duplicate the validator flags.
 *
 * ─── THIS FILE RENDERS; `Tags.ts` DECIDES ────────────────────────────────
 * The list of tags is `TagsOf()`'s, and it is data: the specimen sheet prints it
 * as a register, so the head's contract is inspectable without a browser. This
 * file's whole job is to turn that list into elements - which is what lets the
 * head express two absences a JSX return cannot: no card image (the `og:image`
 * family is omitted rather than pointed at nothing) and no canonical target (no
 * `href=""`).
 *
 * The two `og:locale:alternate` rows are the languages the site publishes, not
 * duplicates of `og:locale` (which is the page's own language).
 */
import { TagsOf, type HeadFacts } from "./Tags.js";

export type MetaTagsProperty = HeadFacts;

export default (Facts: MetaTagsProperty) => {
	const Tags = TagsOf(Facts);

	return (
		<>
			{Tags.map((Tag, Index) =>
				Tag.kind === "title" ? (
					<title key={`title:${Index}`}>{Tag.value}</title>
				) : Tag.kind === "link" ? (
					<link
						key={`link:${Tag.key}:${Index}`}
						rel={Tag.key}
						href={Tag.value}
					/>
				) : Tag.kind === "jsonld" ? (
					<script
						key={`jsonld:${Index}`}
						type={Tag.key}
						dangerouslySetInnerHTML={{ __html: Tag.value }}
					/>
				) : (
					<meta
						key={`meta:${Tag.attribute}:${Tag.key}:${Index}`}
						{...{ [Tag.attribute ?? "name"]: Tag.key }}
						content={Tag.value}
					/>
				),
			)}
		</>
	);
};
