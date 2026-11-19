/**
 * Data - the dashboard's privacy and data-rights directory, as data.
 *
 * A request card is a title, a code badge, a statutory article, a paragraph and
 * a link to `/Contact/<Slug>`. The cards are markup; the facts are the registry.
 * This module reads the facts out of `Library/Contact/Request` so a request
 * cannot be listed with the wrong article, the wrong address or a link to a
 * route that does not exist, and the template has nothing left to decide.
 *
 * Three rules this module keeps:
 *
 * - It derives, it never invents. The code, title, description, statutory
 *   basis, contact address and slug all come from `Requests[code]`. The only
 *   strings written here are the three block labels, the sentences that
 *   introduce them, and the erasure card's own copy, which the baseline page
 *   printed in its own words rather than the registry's.
 * - The link is built the way the routes are spelled: `/Contact/Reach`,
 *   `/Contact/Erase`. A lower-case slug would 404, so the capitalisation is
 *   derived once, here, instead of at each call site.
 * - The three blocks are published as three exports, because they are three
 *   shapes: a right ends in `Open form`, a support channel ends in a mailbox,
 *   and the erasure block is one red card.
 *
 * The copy is literal English: this surface is not routed through `T`, and
 * inventing i18n keys for it would change what the page resolves without
 * changing what it says.
 */
import { Requests } from "../../Library/Contact/Request.js";

import { HrefOf } from "../../Library/Contact/Purpose.js";

import type { IncomeCode } from "../../Library/Contact/Request.js";

import type {
	EraseBlock,
	RequestGrid,
	RightsCard,
	SupportCard,
} from "./Type.js";

/** `/Contact/Reach` - the route a slug is spelled as on disk. */
const Route = (Code: IncomeCode): string => HrefOf(Code);

/** One right: the registry's title, article and sentence, over `Open form`. */
const Right = (Code: IncomeCode): RightsCard => {
	const Config = Requests[Code];

	return {
		title: Config.Title,

		code: Config.Code,

		article: Config.Article ?? Config.To,

		body: Config.Subtitle,

		href: Route(Code),
	};
};

/** One support channel: the registry's title and sentence, over its address. */
const Channel = (Code: IncomeCode): SupportCard => {
	const Config = Requests[Code];

	return {
		title: Config.Title,

		code: Config.Code,

		body: Config.Subtitle,

		address: Config.To,

		href: Route(Code),
	};
};

/** The six statutory rights, in the order the baseline grid printed them. */
export const Rights: RequestGrid<RightsCard> = {
	label: "Your Rights Under GDPR",

	intro: "As a resident of the EU/EEA or a user of our service, you hold the following rights. Each link opens a dedicated form page that pre-fills your account details and generates a properly formatted, income-coded request.",

	empty: "No right is filed for this build. The six are read from the contact registry (`Library/Contact/Request.ts`) and the registry answered with none, so this grid states the absence rather than printing six empty cards.",

	cards: [
		Right("REACH"),

		Right("AMEND"),

		Right("PAUSE"),

		Right("QUERY"),

		Right("LEAVE"),

		Right("LODGE"),
	],
};

/**
 * The five support channels: the general inquiry first, then the four that
 * answer a named kind of trouble.
 *
 * The order is the point. `HAILS` is the only general door on the site, so a
 * reader whose reason is "I want to ask the team something" must find a card
 * before the four that name a trouble. The intro names five kinds because there
 * are five cards, and a count written beside a list has to be the list's own.
 */
export const Support: RequestGrid<SupportCard> = {
	label: "Support & Assistance",

	intro: "Direct channels for general questions, technical issues, security reports, copyright claims, and legal enquiries. Each form pre-fills your details and generates a plain-text, income-coded email.",

	empty: "No channel is filed for this build. The five are the contact registry's support entries, and the registry answered with none - so the desk's own addresses are the way to reach it, and this grid says so instead of printing five empty cards.",

	cards: [
		Channel("HAILS"),

		Channel("SCOUT"),

		Channel("GUARD"),

		Channel("CLAIM"),

		Channel("LEGAL"),
	],
};

/**
 * The erasure block. Its sentence is the page's own, not the registry's: the
 * baseline card states what the generated request contains - every processor
 * it covers and the article it cites - and the registry entry does not.
 */
export const Erase: EraseBlock = {
	label: "Delete Account",

	intro: "Permanently delete your account and all associated personal data under GDPR Article 17. This action is irreversible.",

	title: "Permanent Account Deletion",

	code: "ERASE",

	body: "Opens a structured erasure request form. The generated email includes income code [ERASE] and covers Auth0, PostHog, Cloudflare, and all backup copies - citing GDPR Art. 17 with a 30-day response requirement.",

	href: Route("ERASE"),
};
