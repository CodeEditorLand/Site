/**
 * Data - the Contact hub's decision surface, derived from the request registry.
 *
 * The hub used to hold its own copy of every request title and subtitle, which
 * meant the same sentence lived twice and could drift. Nothing here retypes a
 * fact: a family names the codes it carries, and every title, subtitle, handler
 * address, legal basis and response window is read out of `Request.ts`.
 *
 * The registry has no `Family` field, so the grouping is this module's one
 * decision. It groups by what the reader is trying to do, and each band's
 * standfirst states the handler inbox and response window that its codes share
 * - every number in it is a `To` or a `ResponseDays` in the registry.
 *
 * `Ready` is the one fact the registry does not carry: what the reader needs in
 * hand before starting. Each string restates that request's own required fields
 * (`Requests[code].Fields`), which is why it is written per code rather than
 * derived from a label.
 */
import type { Entry, Tone } from "../../Component/Record/Type.js";

import { Requests, type IncomeCode } from "./Request.js";

/** One band of the hub: a decision the reader is making, and the codes it carries. */
export interface ContactFamily {
	/** The `/SECTION LABEL` opening the band. Supplied in the site's nav grammar. */
	readonly kicker: string;

	/** The band's single `h2`. */
	readonly heading: string;

	/** One sentence: the handler inbox and response window the family shares. */
	readonly standfirst: string;

	/** Band surface. The hub alternates so no two bands share a surface. */
	readonly tone: Tone;

	/** The requests on this route, in the order the reader should consider them. */
	readonly requests: readonly Entry[];
}

/** One crumb: a label in the site's mono nav grammar, and where it leads. */
export interface ContactTrailItem {
	readonly label: string;

	/** Absent on the last crumb - the current page is not a link. */
	readonly href?: string;
}

/**
 * The hub's trail. Every destination the page had before is kept: `/` and
 * `/Contact`, the second one being this page.
 */
export const ContactHubTrail: readonly ContactTrailItem[] = [
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
 * What the reader needs in hand, per code. Each entry restates that request's
 * own required fields and nothing else - a request that asks for a company size
 * says so here, and one that accepts anonymous reports says that too.
 */
const Ready: Record<IncomeCode, string> = {
	REACH: "your account email and the export format you want",
	AMEND:
		"the field to correct, its current value and the value it should hold",
	ERASE: "your account ID - deletion is permanent and cannot be undone",
	PAUSE:
		"your grounds for restriction and which processing activities to limit",
	QUERY: "the processing activities you object to and your grounds",
	LEAVE: "which consent you are withdrawing",
	LODGE:
		"the nature of the complaint, the outcome you want and whether you contacted us before",
	SCOUT: "your platform, the category of failure and steps to reproduce",
	HAILS: "a subject and your message",
	GUARD:
		"the affected component, the vulnerability type and steps to reproduce; anonymous reports are accepted",
	CLAIM:
		"the copyrighted work, where the infringing material sits and the two statutory statements",
	LEGAL: "the nature of the enquiry, a subject line and the facts",
	DEALS: "company name, team size, use case and evaluation timeline",
};

/**
 * One request as a record: the code as its marker, the title as its name, the
 * registry's subtitle verbatim followed by what to have ready, and the handler,
 * legal basis and window as chips.
 */
const EntryOf = (code: IncomeCode): Entry => {
	const config = Requests[code];

	return {
		index: `# ${code}`,
		name: config.Title,
		chips: [
			config.To,
			...(config.Article ? [config.Article] : []),
			`${config.ResponseDays}d SLA`,
		],
		body: `${config.Subtitle} Have ready: ${Ready[code]}.`,
		href: RouteOf(code),
	};
};

/**
 * The hub, in reading order: the seven GDPR rights first because they are the
 * largest family and the one with statutory deadlines, then support, then the
 * routes that carry obligations, then enterprise.
 */
export const ContactFamilies: readonly ContactFamily[] = [
	{
		kicker: "/YOUR DATA",
		heading: "Your data, and the rights you can exercise",
		standfirst:
			"Seven routes under the GDPR, all answered by privacy@editor.land within 30 days.",
		tone: "flush",
		requests: (
			["REACH", "AMEND", "ERASE", "PAUSE", "QUERY", "LEAVE", "LODGE"] as const
		).map(EntryOf),
	},
	{
		kicker: "/SUPPORT",
		heading: "Technical support and general questions",
		standfirst:
			"support@editor.land answers build failures within 7 days and general questions within 14.",
		tone: "paper",
		requests: (["SCOUT", "HAILS"] as const).map(EntryOf),
	},
	{
		kicker: "/SECURITY AND LEGAL",
		heading: "Security reports, copyright claims and legal notices",
		standfirst:
			"Three routes with obligations attached: security@editor.land within 3 days, copyright@editor.land and legal@editor.land within 14.",
		tone: "canvas",
		requests: (["GUARD", "CLAIM", "LEGAL"] as const).map(EntryOf),
	},
	{
		kicker: "/ENTERPRISE",
		heading: "Enterprise deployment",
		standfirst:
			"Enterprise Sales answers within 3 days from enterprise@editor.land; the SALE page carries the deployment options.",
		tone: "paper",
		requests: (["DEALS"] as const).map(EntryOf),
	},
];

/**
 * The band that closes the hub: the address a reader writes to when no route
 * above fits. `Community@PlayForm.Cloud` is a working address, not a
 * placeholder - it is the one contact that does not go through a form.
 */
export const ContactDirect = {
	kicker: "/DIRECT",
	heading: "Prefer email",
	standfirst:
		"One address for anything the thirteen routes above do not cover.",
	address: "Community@PlayForm.Cloud",
} as const;
