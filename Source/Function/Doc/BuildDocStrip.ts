/**
 * BuildDocStrip - the mono metadata strip above documentation prose.
 *
 * `DesignSystem-Pages.md` §5 fixes the five fields and their order: `STATUS`,
 * `LAYER`, `SOURCE`, `COMPAT`, `UPDATED`. This module is the one place that
 * order is written, so the three documentation surfaces cannot drift into three
 * different strips (DESIGN.md §7 DR-7).
 *
 * Two rules it holds:
 *
 * - **A field with no value is a named state, never a blank.** The `doc`
 *   collection's schema carries title, section, order, description, navTitle
 *   and group (`Source/content.config.ts`) - no compatibility target and no
 *   revision date - so `COMPAT` and `UPDATED` render `UNAVAILABLE` in the quiet
 *   ink, the grammar's own word for a field that is not available
 *   (`DesignSystem-Grammar.md` §2: `CHANNEL: UNAVAILABLE`,
 *   `EVIDENCE: UNAVAILABLE`). A key printed with an invented value is a false
 *   claim; a key silently dropped loses the shape §5 requires; a state printed
 *   in the surface ink reads as an ordinary fact (DESIGN.md §1.5).
 * - **Extras come after the five, never inside them.** A page that can prove
 *   more about itself - a page count, an order number, a group - appends it, so
 *   the documented five keep their positions on every surface.
 *
 * One key this module prints through the pair, not as a field of its own:
 * `strip.published`. It is the status field's pre-split form - `STATUS:
 * PUBLISHED` as one string - and it carries the same fact as `strip.status` +
 * `strip.state`, which print it with the label's muted ink and the value's
 * surface ink. Printing the combined string as well would print `STATUS:` twice
 * on every documentation page; printing it instead of the pair would collapse
 * two inks into one and lose the `UNAVAILABLE`-style tone split. The key stays
 * in every locale (a key is never deleted) and the fact it carries prints
 * through the pair. This note is here so a later card does not "fix" the
 * orphan by duplicating the field.
 *
 * The items are structured (`Label` + `Value` + optional `Tone`), not one
 * pre-joined string: the shell renders each field as its own element with U+2001
 * between them, so a screen reader announces fields rather than one run-on line,
 * and the label can carry muted ink while the value carries the surface's.
 * U+2001 is the site's only visual separator (`DesignSystem-Grammar.md` §3), so
 * no centre dot and no collapsible ASCII space appears here.
 *
 * Copy comes from the `doc` namespace through the `T` the page passes in; this
 * module never imports the i18n client.
 */
import type { DocStripItem, DocTranslate } from "../../Component/Doc/Type.js";

/** What a page can prove about itself, beyond the five documented fields. */
export interface DocStripInput {
	/** The layer the page sits in, as the sidebar names it (`Elements`). */
	readonly Layer: string;

	/** Where the page's content comes from: a markdown file, a collection. */
	readonly Source: string;

	/** Facts beyond §5's five, appended in the order given. */
	readonly Extras?: readonly DocStripItem[];
}

const BuildDocStrip = (
	Input: DocStripInput,

	T: DocTranslate,
): readonly DocStripItem[] => {
	const Copy = (Key: string, Default: string) =>
		T(Key, { ns: "doc", defaultValue: Default });

	/** A field whose value the tree can supply. */
	const Field = (Name: string, Value: string): DocStripItem => ({
		Label: Copy(`strip.${Name}`, `${Name.toUpperCase()}:`),
		Value,
	});

	/**
	 * A field no schema field can fill. `UNAVAILABLE` is the grammar's documented
	 * empty state and it renders quiet, so an absent fact never reads as a claim.
	 */
	const Empty = (Name: string): DocStripItem => ({
		Label: Copy(`strip.${Name}`, `${Name.toUpperCase()}:`),
		Value: Copy("strip.unavailable", "UNAVAILABLE"),
		Tone: "quiet",
	});

	return [
		{
			Label: Copy("strip.status", "STATUS:"),

			Value: Copy("strip.state", "PUBLISHED"),
		},

		Field("layer", Input.Layer.toUpperCase()),

		Field("source", Input.Source),

		Empty("compat"),

		Empty("updated"),
		...(Input.Extras ?? []),
	];
};

export default BuildDocStrip;
