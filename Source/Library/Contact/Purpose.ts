/**
 * Purpose - what each Contact route is *for*, as data.
 *
 * ─── WHY THIS FILE EXISTS ─────────────────────────────────────────────────
 * The desk answers on fifteen routes and every one of them is a different
 * request. A slug cannot say what a route is for: `/Contact/Reach` reads like
 * "reach us" and is the subject-access request, `/Contact/Query` reads like a
 * question and is an objection to processing. A link picked by the nearest
 * `/Contact/...` path therefore promises something the form does not do.
 *
 * So the reason is data here, not an inference. Each route carries five facts a
 * link needs and cannot guess:
 *
 *   Intent    a closed vocabulary word - *why* a reader is going (`talk`,
 *             `support`, `access`, ...). A page asks by intent, never by slug.
 *   Purpose   the sentence the page itself declares, read out of `Request.ts`
 *             so a link cannot describe the route differently from the route.
 *   Audience  who should be sent there, in one clause.
 *   Label     the words a link to it carries: `<title> form (<CODE>)`.
 *   Statutory whether it is a right filed under an article, and which one.
 *
 * ─── THE RULE ─────────────────────────────────────────────────────────────
 * A link to a Contact route is built here - `LinkFor("talk")`, never
 * `href="/Contact/Hails"` written by hand. The label and the destination come
 * from one record, so the two cannot disagree, and a route that is a statutory
 * request cannot be reached through an affordance that promises a conversation.
 *
 * `LinkFor` throws when an intent has no canonical route, and
 * `Function/Route/Registry.ts` throws when a `/Contact` route has no entry here.
 * A future route therefore cannot be added without saying what it is for, and a
 * future page cannot pick one by name alone.
 *
 * ─── WHERE THE SENTENCES COME FROM ────────────────────────────────────────
 * Nothing in this file is invented prose about a route. `Purpose` is
 * `Requests[code].Subtitle` - the sentence the route's own page prints and the
 * one its share card carries. `Title`, `Basis` and `Days` are the same record's
 * fields. Only `Intent` and `Audience` are written here, because they are the
 * two facts the registry never had: why a reader would go, and who they are.
 */
import { Requests, type IncomeCode } from "./Request.js";

/**
 * The closed vocabulary of reasons a reader arrives at the desk.
 *
 * One word per purpose, and no synonyms: a page that wants "contact us" asks for
 * `talk`, which resolves to HAILS, and a page that wants a statutory right asks
 * for the right. `choose` is the hub itself - the route for a reader who does not
 * yet know which of the other fourteen is theirs.
 */
export type ContactIntent =
	| "choose"
	| "talk"
	| "support"
	| "security"
	| "copyright"
	| "legal"
	| "sales"
	| "access"
	| "correct"
	| "erase"
	| "restrict"
	| "object"
	| "consent"
	| "complaint";

/**
 * The fifteen paths the desk answers on: the hub, the sale page, and the
 * thirteen income codes. Listed as a union so this table cannot be given a path
 * the site does not serve, and cannot silently omit one it does.
 */
export type ContactRoutePath =
	| "/Contact"
	| "/Contact/Amend"
	| "/Contact/Claim"
	| "/Contact/Deals"
	| "/Contact/Erase"
	| "/Contact/Guard"
	| "/Contact/Hails"
	| "/Contact/Leave"
	| "/Contact/Legal"
	| "/Contact/Lodge"
	| "/Contact/Pause"
	| "/Contact/Query"
	| "/Contact/Reach"
	| "/Contact/Sale"
	| "/Contact/Scout";

/** One route, and everything a link to it needs to be honest. */
export interface ContactPurpose {
	/** Why a reader goes: the word a page asks for. */
	readonly Intent: ContactIntent;

	/** Where it goes, as a link writes it: `/Contact/Reach`. */
	readonly Href: ContactRoutePath;

	/** The route as the grammar prints it: `/CONTACT/REACH`. */
	readonly Route: string;

	/** The income code, or `SALE`/`REGISTER` for the two pages that are not codes. */
	readonly Code: string;

	/** The page's own `h1`. */
	readonly Title: string;

	/** What the route is for: the sentence the route's page declares. */
	readonly Purpose: string;

	/** Who should be sent there, in one clause. */
	readonly Audience: string;

	/** The words a link to this route carries: `Data Access & Export form (REACH)`. */
	readonly Label: string;

	/** Whether the request is a statutory right rather than a conversation. */
	readonly Statutory: boolean;

	/** The article the request is filed under, when it is statutory. */
	readonly Basis?: string;

	/** The window the route answers in, in days. */
	readonly Days?: number;

	/**
	 * Whether this is the route a link should use for its intent.
	 *
	 * Only the sales pair is not: `SALE` is the page that describes the offer and
	 * `DEALS` is the form that reaches `enterprise@editor.land`, so a link that
	 * means "talk to sales" resolves to `DEALS`.
	 */
	readonly Canonical: boolean;

	/** For a route that duplicates another's purpose: the route a link should use. */
	readonly DuplicateOf?: ContactRoutePath;
}

/** `REACH` -> `Reach`: the spelling the route file uses. */
const Cased = (Code: string): string =>
	`${Code.charAt(0)}${Code.slice(1).toLowerCase()}`;

/** The path a code is published on: `/Contact/Reach`. */
export const HrefOf = (Code: IncomeCode): ContactRoutePath =>
	`/Contact/${Cased(Code)}` as ContactRoutePath;

/** The route as the grammar prints it: `/CONTACT/REACH`. */
export const ContactRouteOf = (Code: IncomeCode): string => `/CONTACT/${Code}`;

/**
 * One income code, with the four facts its page already declares.
 *
 * `Purpose`, `Title`, `Basis` and `Days` are read, not retyped: the route's page,
 * its share card and its hub record all print the same `Requests[code]`, and a
 * link that described the route in its own words would be the fourth copy.
 */
const FromCode = (
	Code: IncomeCode,

	Intent: ContactIntent,

	Audience: string,
): ContactPurpose => {
	const Config = Requests[Code];

	return {
		Intent,

		Href: HrefOf(Code),

		Route: ContactRouteOf(Code),

		Code: Config.Code,

		Title: Config.Title,

		Purpose: Config.Subtitle,

		Audience,

		Label: `${Config.Title} form (${Config.Code})`,

		Statutory: Config.Article !== undefined,

		...(Config.Article === undefined ? {} : { Basis: Config.Article }),

		Days: Config.ResponseDays,

		Canonical: true,
	};
};

/** The hub: the register of routes, for a reader who does not know which is theirs. */
const Register: ContactPurpose = {
	Intent: "choose",

	Href: "/Contact",

	Route: "/CONTACT",

	Code: "REGISTER",

	Title: "Contact",

	Purpose:
		"Fourteen routes, one register: data requests, technical support, legal and enterprise. Each prints its five-letter code and the window it answers in.",

	Audience:
		"a reader who does not yet know which of the fourteen requests is theirs",

	Label: "Contact - the register of routes",

	Statutory: false,

	Canonical: true,
};

/**
 * The sale page: the enterprise offer, written as a letter.
 *
 * It is not an income code - it has no mailbox, no window and no article - and
 * its purpose is the one `DEALS` also serves. A link that means "talk to sales"
 * resolves to `DEALS`, the form that reaches a person; this page is what a
 * reader reads before they fill it in.
 */
const Sale: ContactPurpose = {
	Intent: "sales",

	Href: "/Contact/Sale",

	Route: "/CONTACT/SALE",

	Code: "SALE",

	Title: "Enterprise Inquiries",

	Purpose:
		"Enterprise adds support, an SLA and custom development. The code stays CC0. A request is filed as a GitHub issue, so the whole team reads it and the answer is public.",

	Audience:
		"a company reading what the enterprise offer includes before it makes contact",

	Label: "Enterprise inquiries (SALE)",

	Statutory: false,

	Canonical: false,

	DuplicateOf: "/Contact/Deals",
};

/**
 * The table. Order is the hub's own reading order - the register first, then the
 * routes alphabetically by slug - so a reader of this file meets the routes in
 * the order a reader of the site does.
 */
const Purposes: Record<ContactRoutePath, ContactPurpose> = {
	"/Contact": Register,

	"/Contact/Amend": FromCode(
		"AMEND",

		"correct",

		"a reader whose stored details are wrong or incomplete",
	),

	"/Contact/Claim": FromCode(
		"CLAIM",

		"copyright",

		"a copyright owner, or an agent acting for one, whose work was copied",
	),

	"/Contact/Deals": FromCode(
		"DEALS",

		"sales",

		"a company buying for a team: deployment, integrations, support contracts, volume licensing",
	),

	"/Contact/Erase": FromCode(
		"ERASE",

		"erase",

		"a reader who wants their account and its data permanently gone",
	),

	"/Contact/Guard": FromCode(
		"GUARD",

		"security",

		"anyone reporting a vulnerability, a breach or unauthorised access - anonymously if they prefer",
	),

	"/Contact/Hails": FromCode(
		"HAILS",

		"talk",

		"anyone who wants to talk to the team and whose reason is not one of the other thirteen",
	),

	"/Contact/Leave": FromCode(
		"LEAVE",

		"consent",

		"a reader withdrawing consent for processing that relies on it",
	),

	"/Contact/Legal": FromCode(
		"LEGAL",

		"legal",

		"a lawyer, a regulator, or a partner whose matter needs legal review",
	),

	"/Contact/Lodge": FromCode(
		"LODGE",

		"complaint",

		"a reader complaining about how we have handled their personal data",
	),

	"/Contact/Pause": FromCode(
		"PAUSE",

		"restrict",

		"a reader in a dispute who wants processing limited while it is assessed",
	),

	"/Contact/Query": FromCode(
		"QUERY",

		"object",

		"a reader objecting to a particular purpose we process their data for",
	),

	"/Contact/Reach": FromCode(
		"REACH",

		"access",

		"a reader exercising subject access: what we hold, and a portable copy of it",
	),

	"/Contact/Sale": Sale,

	"/Contact/Scout": FromCode(
		"SCOUT",

		"support",

		"a user with something broken: a build, a crash, an extension, performance",
	),
};

/** Every route, in reading order. */
export const ContactPurposes: readonly ContactPurpose[] =
	Object.values(Purposes);

/** Every contact path, in reading order. */
export const ContactRoutes: readonly ContactRoutePath[] = Object.keys(
	Purposes,
) as ContactRoutePath[];

/** One route by path, or `undefined` when the path is not a contact route. */
export const ContactPurposeOf = (Path: string): ContactPurpose | undefined =>
	Object.prototype.hasOwnProperty.call(Purposes, Path)
		? Purposes[Path as ContactRoutePath]
		: undefined;

/**
 * One route by path, for a caller that has the path in hand.
 *
 * Throws rather than returning `undefined`: the registry calls this once per
 * `/Contact` entry at module load, so a route with no purpose fails the build
 * with its own name in the message instead of shipping a link that cannot say
 * what it leads to.
 */
export const ContactPurposeAt = (Path: ContactRoutePath): ContactPurpose => {
	const Entry = ContactPurposeOf(Path);

	if (Entry === undefined) {
		throw new Error(
			`Contact/Purpose: ${Path} is not a route this table describes.`,
		);
	}

	return Entry;
};

/** One route by income code. */
export const ContactPurposeFor = (Code: IncomeCode): ContactPurpose =>
	ContactPurposeAt(HrefOf(Code));

/**
 * The route a link should use for a purpose.
 *
 * This is the only way a page should reach a Contact route. `talk` is HAILS, the
 * general inquiry; `access` is REACH, the subject-access request; `sales` is
 * DEALS, the form, not SALE, the page. A page that asks for an intent cannot land
 * a reader on a form whose purpose contradicts the label, because the label comes
 * back from the same record as the destination.
 */
export const LinkFor = (Intent: ContactIntent): ContactPurpose => {
	const Match = ContactPurposes.filter(
		(Entry) => Entry.Intent === Intent && Entry.Canonical,
	);

	const Only = Match.length === 1 ? Match[0] : undefined;

	if (Only === undefined) {
		throw new Error(
			`Contact/Purpose: ${Match.length} canonical routes answer "${Intent}" - exactly one must.`,
		);
	}

	return Only;
};

export default Purposes;
