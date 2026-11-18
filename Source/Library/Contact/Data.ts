/**
 * Data - the Contact hub's index, derived from the request registry.
 *
 * The hub is one grid of fourteen records: thirteen income codes and the SALE
 * page. Nothing here retypes a fact - a code's slug, title and subtitle are read
 * out of `Request.ts`, and the route a code is published on is derived from the
 * code itself, so the grid cannot disagree with the registry.
 *
 * `SALE` is the one record that is a page rather than an income code, so it is
 * the one record whose words are carried here: the registry has no entry to read
 * them from, and both are the strings the card has always printed.
 *
 * The order is alphabetical by slug, which is the order the baseline grid
 * printed: AMEND, CLAIM, DEALS, ERASE, GUARD, HAILS, LEAVE, LEGAL, LODGE, PAUSE,
 * QUERY, REACH, SCOUT, SALE.
 */
import { Requests, type IncomeCode } from "./Request.js";

/**
 * One crumb: a label and where it leads. The last crumb is the current page.
 *
 * The shape is the Route surface's (`Component/Route/Type.ts`) - a trail is a
 * Route Strip artifact, not a Contact detail - and it is re-exported under its
 * historical name so every Contact caller keeps its import.
 */
export type { TrailItem as ContactTrailItem } from "../../Component/Route/Type.js";

import type { TrailItem } from "../../Component/Route/Type.js";

/** One record on the hub: its slug, its name, its sentence, and its route. */
export interface ContactEntry {
	/** The address the record answers on, slash-prefixed: `/AMEND`. */
	readonly slug: string;

	/** The record's `h2`. */
	readonly title: string;

	/** The one sentence under the title. */
	readonly subtitle: string;

	/** Where the card leads. */
	readonly href: string;
}

/**
 * The hub's trail. Two crumbs in the site's one breadcrumb grammar
 * (`DESIGN.md` §9 Q3): the mono `/LABEL` form, the leading slash the only
 * separator, so the strip reads `/HOME  /CONTACT` and no second `/` is drawn
 * between the two.
 */
export const ContactHubTrail: readonly TrailItem[] = [
	{ label: "/HOME", href: "/" },

	{ label: "/CONTACT" },
];

/**
 * The route a code is published on. A request route is a file named for its
 * code in title case (`REACH` -> `Contact/Reach.astro`), so the path is the
 * code rather than a second table that could disagree with the file list.
 */
const RouteOf = (code: IncomeCode): string =>
	`/Contact/${code.charAt(0)}${code.slice(1).toLowerCase()}`;

/**
 * The hub prints one sentence per card. A code whose route page carries a
 * longer standfirst keeps that longer copy on its own page; the baseline's hub
 * printed the shorter sentence, so it is carried here rather than inherited -
 * the grid stays even and nothing the route prints is lost.
 */
const HubSubtitle: Partial<Record<IncomeCode, string>> = {
	LODGE: "Lodge a formal complaint about how we have handled your personal data under GDPR Article 77.",
};

/** One request as a card: the code's slug, the registry's title and subtitle. */
const EntryOf = (code: IncomeCode): ContactEntry => {
	const config = Requests[code];

	return {
		slug: `/${config.Code}`,

		title: config.Title,

		subtitle: HubSubtitle[code] ?? config.Subtitle,

		href: RouteOf(code),
	};
};

/**
 * The SALE page as a card.
 *
 * It is not in the request registry - it is a page, not an income code - so
 * there is nothing to derive its title and subtitle from. They are carried here
 * verbatim, because the grid has always printed both and losing them would be
 * losing copy, not removing duplication.
 */
const SaleEntry: ContactEntry = {
	slug: "/SALE",

	title: "Enterprise Inquiries",

	subtitle:
		"Contact the Code Editor Land team for enterprise licensing, support, and deployment options.",

	href: "/Contact/Sale",
};

/** The thirteen income codes, alphabetical by slug. */
const Codes: readonly IncomeCode[] = [
	"AMEND",

	"CLAIM",

	"DEALS",

	"ERASE",

	"GUARD",

	"HAILS",

	"LEAVE",

	"LEGAL",

	"LODGE",

	"PAUSE",

	"QUERY",

	"REACH",

	"SCOUT",
];

/** The hub, in reading order: one flat grid of fourteen records. */
export const ContactEntries: readonly ContactEntry[] = [
	...Codes.map(EntryOf),

	SaleEntry,
];

/**
 * The address that closes the page: the one contact that does not go through a
 * form. `Community@PlayForm.Cloud` is a working mailbox, not a placeholder.
 *
 * It is a link, not an action - an address is not something the page performs -
 * so the hub prints it as one quiet line and spends its emphasis nowhere.
 */
export const ContactDirect = {
	label: "Prefer email",

	address: "Community@PlayForm.Cloud",
} as const;
