/**
 * Data - the Contact hub's index, derived from the purpose table.
 *
 * The hub is one grid of fourteen records: thirteen income codes and the SALE
 * page. Nothing here retypes a fact - a code's slug, title, sentence and route
 * all come from `Purpose.ts`, which reads the words out of `Request.ts` and
 * carries the spelling of the route, so a card cannot print one purpose and link
 * to a form that answers another.
 *
 * `SALE` is the one record that is a page rather than an income code, so it is
 * the one record whose words are carried here: the purpose table has no route
 * sentence for it beyond the page's own standfirst, and these two strings are
 * what the card has always printed. Its route still comes from the table.
 *
 * The order is alphabetical by slug, which is the order the baseline grid
 * printed: AMEND, CLAIM, DEALS, ERASE, GUARD, HAILS, LEAVE, LEGAL, LODGE, PAUSE,
 * QUERY, REACH, SCOUT, SALE.
 */
import type { IncomeCode } from "./Request.js";

import { ContactPurposeAt, ContactPurposeFor } from "./Purpose.js";

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
 * The hub prints one sentence per card. A code whose route page carries a
 * longer standfirst keeps that longer copy on its own page; the baseline's hub
 * printed the shorter sentence, so it is carried here rather than inherited -
 * the grid stays even and nothing the route prints is lost.
 */
const HubSubtitle: Partial<Record<IncomeCode, string>> = {
	LODGE: "Lodge a formal complaint about how we have handled your personal data under GDPR Article 77.",
};

/**
 * One request as a card: the route's own record, read once.
 *
 * The slug, the title, the sentence and the href all come from the purpose table
 * now - the same record a link elsewhere reads - so a card cannot print one
 * purpose and link to a route that answers another.
 */
const EntryOf = (code: IncomeCode): ContactEntry => {
	const Record = ContactPurposeFor(code);

	return {
		slug: `/${Record.Code}`,

		title: Record.Title,

		subtitle: HubSubtitle[code] ?? Record.Purpose,

		href: Record.Href,
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

	href: ContactPurposeAt("/Contact/Sale").Href,
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
