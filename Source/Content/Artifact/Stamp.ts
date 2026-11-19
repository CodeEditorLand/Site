/**
 * Stamp - the two marks the document issues, as data.
 *
 * A stamp is the block that answers "is this what it says it is", and a stamp is
 * only worth printing if its authority is a real place a reader can check. Both
 * marks below name one:
 *
 * - **`ReleaseStamp`** (`/Download`) - the edition mark. Its authority is
 *   `/Verify`, the page that prints a checksum and a signature for every artifact
 *   the release ships; the release ships none today, so the mark is `PREPARING`
 *   and says in its note that it authenticates the record rather than an
 *   artifact.
 * - **`DocumentStamp`** (`/Contents`) - the document's own mark. Its authority is
 *   `Source/Script/Register.ts`, the generator every figure on the index is read
 *   from, so the stamp authenticates the *reading* rather than the prose. Its
 *   rows are the register's own totals, passed in rather than restated, so a
 *   stamp cannot drift from the table it marks.
 *
 * ─── WHAT A STAMP MAY NOT DO ──────────────────────────────────────────────
 * It may not claim more than the site can verify. Neither mark says "signed",
 * "certified" or "official": the release's says `PREPARING` and prints
 * `HOLDING: NONE PUBLISHED`, and the document's prints the date it was built and
 * the route it can be re-read at. A mark that overstates its authority is worse
 * than no mark, because it looks like a guarantee.
 */

import type { Stamp } from "../../Component/Record/Type.js";

/** The field-record separator: U+2001, never U+00B7. */
const Quad = "\u2001";

/**
 * The release's edition mark.
 *
 * `VERSION` and `ISSUED` are `UNAVAILABLE` rather than a plausible number: no
 * public release exists, so there is no version to stamp and no date on which one
 * was issued. The three facts the record *does* hold - what is being held, the
 * targets it reaches and the channel - are printed in full, because a stamp with
 * nothing in it is a decoration.
 */
export const ReleaseStamp: Stamp = {
	index: "STAMP_01",

	label: "EDITION",

	mark: "\u3008EDITION 01\u3009",

	route: "/CHANNEL:PUBLIC",

	rows: [
		{ key: "VERSION", value: "UNAVAILABLE" },

		{ key: "ISSUED", value: "UNAVAILABLE" },

		{ key: "HOLDING", value: "NONE PUBLISHED" },

		{ key: "REACHES", value: `MACOS${Quad}WINDOWS${Quad}LINUX` },

		{ key: "CHANNEL", value: "PUBLIC" },
	],

	authority:
		"/VERIFY - THE PAGE PRINTS A CHECKSUM AND A SIGNATURE FOR EVERY ARTIFACT THE RELEASE SHIPS, AND CHECKS THE TEMPLATE IT WOULD USE.",

	state: "preparing",

	note: "The mark authenticates the record, not an artifact: no public artifact exists for it to be stamped on. VERSION and ISSUED stay UNAVAILABLE until one does.",
};

/**
 * The document's own mark, printed on the index.
 *
 * The rows are the register's totals, so the stamp is the one place on `/Contents`
 * that prints a figure the page did not derive itself - it was handed the totals
 * and it prints them, exactly as the register band does.
 */
export const DocumentStamp = (
	Totals: {
		readonly Routes: number;

		readonly Documents: number;

		readonly Elements: number;

		readonly Blocks: number;

		readonly Modules: number;
	},

	AsOf: string,
): Stamp => ({
	index: "STAMP_01",
	label: "DOCUMENT",
	mark: "\u3008FIELD MANUAL\u3009",
	route: "/CONTENTS",
	rows: [
		{ key: "EDITION", value: "01" },
		{ key: "BUILT", value: AsOf },
		{ key: "HOLDING", value: `${Totals.Routes}${Quad}ROUTES` },
		{ key: "READS", value: `${Totals.Documents}${Quad}DOCUMENTS` },
		{ key: "FORMS", value: `${Totals.Blocks}${Quad}BLOCKS` },
		{
			key: "DECLARED",
			value: `${Totals.Modules}${Quad}MODULES OUTSIDE BULK`,
		},
	],
	authority:
		"SOURCE/SCRIPT/REGISTER.TS - EVERY FIGURE ON THIS PAGE IS COUNTED FROM THE TREE AND READ BACK THROUGH LIBRARY/INDEX/REGISTER.TS, SO THE STAMP AUTHENTICATES THE READING AND NOT THE PROSE.",
	state: "verified",
	note: `The mark is issued by the generator, not by an editor: ${Totals.Elements} element records, ${Totals.Blocks} blocks and ${Totals.Routes} routes were counted on the run that wrote this build.`,
});
