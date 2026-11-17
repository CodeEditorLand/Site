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
 *   basis, response window, contact address and slug all come from
 *   `Requests[code]`. The only strings written here are the group labels and
 *   the sentences that introduce them, which are the page's own copy.
 * - The link is built the way the routes are spelled: `/Contact/Reach`,
 *   `/Contact/Erase`. A lower-case slug would 404, so the capitalisation is
 *   derived once, here, instead of at each call site.
 * - A group carries its own empty sentence, so no branch of the directory can
 *   render a blank panel.
 *
 * The copy is literal English, exactly as the component it replaces carried
 * it: this surface was never routed through `T`, and inventing i18n keys for
 * it now would change what the page resolves without changing what it says.
 */
import { Requests, type IncomeCode } from "../../Library/Contact/Request.js";

import type { Entry } from "../Record/Type.js";

import type { RequestGroup } from "./Type.js";

/** `/Contact/Reach` - the route a slug is spelled as on disk. */
const Route = (Slug: string): string =>
	`/Contact/${Slug.charAt(0).toUpperCase()}${Slug.slice(1)}`;

/**
 * One request destination: the code as its marker, the title as its name, the
 * registry's own description as its line, and the statutory basis and response
 * window as chips.
 *
 * The window is a real number from the registry (`ResponseDays`), never a
 * rounded or typical one - a three-day security report and a thirty-day access
 * request are different promises and both are printed.
 */
const Destination = (Code: IncomeCode): Entry => {
	const Config = Requests[Code];

	return {
		index: `# ${Config.Code}`,
		name: Config.Title,
		body: Config.Subtitle,
		chips: [
			...(Config.Article ? [Config.Article] : [Config.To]),
			`${Config.ResponseDays}-day window`,
		],
		href: Route(Config.Slug),
	};
};

/** The six GDPR rights, in the order the page offers them. */
const Rights: readonly IncomeCode[] = [
	"REACH",
	"AMEND",
	"PAUSE",
	"QUERY",
	"LEAVE",
	"LODGE",
];

/** The four support channels, in the order the page offers them. */
const Support: readonly IncomeCode[] = ["SCOUT", "GUARD", "CLAIM", "LEGAL"];

/**
 * The directory, in three groups: what the reader is entitled to ask for, who
 * answers a problem, and the one entry that ends the account.
 */
export const RequestGroups: readonly RequestGroup[] = [
	{
		label: "Your Rights Under GDPR",
		intro: "As a resident of the EU/EEA or a user of our service, you hold the following rights. Each link opens a dedicated form page that pre-fills your account details and generates a properly formatted, income-coded request.",
		links: Rights.map(Destination),
		empty: `No rights forms are listed here. Write to ${Requests.REACH.To} to make a request directly.`,
	},
	{
		label: "Support & Assistance",
		intro: "Direct channels for technical issues, security reports, copyright claims, and legal enquiries. Each form pre-fills your details and generates a plain-text, income-coded email.",
		links: Support.map(Destination),
		empty: `No support channels are listed here. Write to ${Requests.SCOUT.To} directly.`,
	},
	{
		label: "Delete Account",
		intro: "Permanently delete your account and all associated personal data under GDPR Article 17. This action is irreversible.",
		links: [
			{
				index: `# ${Requests.ERASE.Code}`,
				name: "Permanent Account Deletion",
				body: "Opens a structured erasure request form. The generated email includes income code [ERASE] and covers Auth0, PostHog, Cloudflare, and all backup copies - citing GDPR Art. 17 with a 30-day response requirement.",
				chips: [
					Requests.ERASE.Article ?? "GDPR Art. 17",
					"Irreversible",
					`${Requests.ERASE.ResponseDays}-day window`,
				],
				href: Route(Requests.ERASE.Slug),
			},
		],
		empty: `No erasure form is listed here. Write to ${Requests.ERASE.To} to request deletion directly.`,
		danger: true,
	},
];
