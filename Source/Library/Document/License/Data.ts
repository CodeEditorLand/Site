/**
 * License - the License page's own rows.
 *
 * The license page carries no dates, so its EFFECTIVE row is not a date either:
 * it is the rule the page's own CC0 text states for when the dedication takes
 * effect, quoted rather than guessed. `VERSION`, `APPLIES TO` and `LICENSE` are
 * the page's own phrases.
 */
import type { ReadingIndexItem } from "../../../Component/Reading/Type.js";

import type { LedgerRow } from "../../../Component/Record/Type.js";

export const Ledger: readonly LedgerRow[] = [
	{
		key: "EFFECTIVE:",

		value: "The date CC0 was applied to the Work",

		note: "CC0 1.0 Universal, 3. Public License Fallback",
	},

	{
		key: "VERSION:",

		value: "CC0 1.0 Universal",

		note: "Creative Commons Legal Code",
	},

	{
		key: "APPLIES TO:",

		value: "The Code Editor Land project, including all source code, documentation, and related materials",

		note: "dedicated to the public domain",
	},

	{
		key: "LICENSE:",

		value: "Creative Commons CC0 1.0 Universal",

		note: "public domain dedication with a fallback license",
	},
];

export const Index: readonly ReadingIndexItem[] = [
	{
		number: "01",

		label: "CC0 1.0 Universal",

		href: "#cc0-1-0-universal",
	},

	{ number: "02", label: "Full License Text", href: "#full-license-text" },

	{ number: "03", label: "Key Points", href: "#key-points" },

	{
		number: "04",

		label: "Third-Party Licenses",

		href: "#third-party-licenses",
	},

	{ number: "05", label: "Why CC0?", href: "#why-cc0" },

	{ number: "06", label: "Contact", href: "#contact" },
];
