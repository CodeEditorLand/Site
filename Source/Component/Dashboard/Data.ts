/**
 * Data - the dashboard's privacy and data-rights directory, as data.
 *
 * Every destination here already existed in `DynamicPrivacyRequests.tsx` as a
 * card built inline: a title, a code badge, a statutory article, a paragraph
 * and a link to `/Contact/<Slug>`. The cards were markup; the facts were the
 * registry. This module reads the facts back out of `Library/Contact/Request`
 * so a request cannot be listed with the wrong article, the wrong address or a
 * link to a route that does not exist, and the template has nothing left to
 * decide.
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
 * The copy is literal English, exactly as the component it replaces carried
 * it: this surface was never routed through `T`, and inventing i18n keys for
 * it now would change what the page resolves without changing what it says.
 */
import { Requests } from "../../Library/Contact/Request.js";

import type { IncomeCode } from "../../Library/Contact/Request.js";

import type {
	EraseBlock,
	RequestGrid,
	RightsCard,
	SupportCard,
} from "./Type.js";

/** `/Contact/Reach` - the route a slug is spelled as on disk. */
const Route = (Slug: string): string =>
	`/Contact/${Slug.charAt(0).toUpperCase()}${Slug.slice(1)}`;

/** One right: the registry's title, article and sentence, over `Open form`. */
const Right = (Code: IncomeCode): RightsCard => {
	const Config = Requests[Code];

	return {
		title: Config.Title,
		code: Config.Code,
		article: Config.Article ?? Config.To,
		body: Config.Subtitle,
		href: Route(Config.Slug),
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
		href: Route(Config.Slug),
	};
};

/** The six statutory rights, in the order the baseline grid printed them. */
export const Rights: RequestGrid<RightsCard> = {
	label: "Your Rights Under GDPR",
	intro: "As a resident of the EU/EEA or a user of our service, you hold the following rights. Each link opens a dedicated form page that pre-fills your account details and generates a properly formatted, income-coded request.",
	cards: [
		Right("REACH"),
		Right("AMEND"),
		Right("PAUSE"),
		Right("QUERY"),
		Right("LEAVE"),
		Right("LODGE"),
	],
};

/** The four support channels, in the order the baseline grid printed them. */
export const Support: RequestGrid<SupportCard> = {
	label: "Support & Assistance",
	intro: "Direct channels for technical issues, security reports, copyright claims, and legal enquiries. Each form pre-fills your details and generates a plain-text, income-coded email.",
	cards: [
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
	href: Route("erase"),
};
