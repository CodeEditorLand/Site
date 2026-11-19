import { m as ContactEntries } from "./Base_BVG1wSoZ.mjs";
import { l as Requests } from "./Purpose_DgbipYwf.mjs";
// Source/Component/Contact/Register.ts
/**
* Register - the hub's index as records, with the two facts a reader chooses by.
*
* `Library/Contact/Data.ts` gives the hub one entry per route: slug, name,
* sentence, href. That is what the grid prints, and it is derived from the
* request registry so it cannot disagree with the routes. What it does not
* carry is the two facts that separate one request from another: the statutory
* basis the request is filed under, and how long the answer takes.
*
* Both are in the registry already (`Requests[code].Article`,
* `Requests[code].ResponseDays`), so this module reads them rather than
* restating them: an entry's basis and window are the registry's, or they are
* absent. Nothing here is typed twice, and the hub's card cannot promise a
* window the form does not.
*
* `SALE` is the one route that is a page rather than an income code, so it has
* no registry entry and therefore no basis and no window. It prints neither -
* an invented `〈 〉` on the one page that is not a statutory request would be
* the exact kind of pretending this surface is supposed to avoid.
*/
/**
* The registry key a hub slug names. A slug is `/REACH` and its code is `REACH`,
* so the slug is the key rather than a second table that could drift from it.
*/
var CodeOf = (Entry) => Entry.slug.replace(/^\//, "");
/** The fourteen records, in the hub's reading order, with their two facts. */
var RegisterEntries = ContactEntries.map((Entry) => {
	const Code = CodeOf(Entry);
	if (!(Code in Requests)) return Entry;
	const Config = Requests[Code];
	return {
		...Entry,
		...Config.Article ? { basis: Config.Article } : {},
		window: `${Config.ResponseDays}d`
	};
});
/**
* The two contacts that are not a request: the mailbox and the public thread.
*
* They are not routes, so they are not in the register - they are the desk
* behind it. Both are links, never actions: an address and a channel are things
* you write to, not things the page performs, so neither wears the ink-inverted
* action tier (`DESIGN.md` §5 A6, §7 DR-12).
*
* The thread is the one four of the thirteen requests already name as their
* `ConversationHref`, so the channel the hub prints is a channel the site
* already answers on.
*/
var ContactChannel = {
	label: "Or open a thread",
	text: "github.com/CodeEditorLand/Land/discussions",
	href: "https://github.com/CodeEditorLand/Land/discussions"
};
/**
* What happens after a request is sent: the desk's process, as four steps.
*
* The hub prints these as plates and a request route prints them as a rail
* beside its form - one process, two readings of it (a field the reader may
* refer back to, and a sequence they are about to enter). The copy lives here
* rather than in either page because two descriptions of one process is how the
* two pages would come to disagree about it.
*
* The steps are the registry's own facts, not a promise: the code in the subject
* line is `Request.ts`'s documented contract, the window is
* `Requests[code].ResponseDays`, and the closing sentence is what a closed
* request means. A route that answers in a different window overrides step 03
* with its own number - see `ContactShell.astro`.
*/
var ContactProcess = [
	{
		index: "01",
		label: "RECEIVE",
		line: "The request reaches the desk's mailbox with its income code in the subject line, so it is filed before anyone reads it."
	},
	{
		index: "02",
		label: "VERIFY",
		line: "Anything else the desk needs is asked for at the address the request came from - never by a link in a reply."
	},
	{
		index: "03",
		label: "ANSWER",
		line: "The answer arrives inside the window the route's own record prints, at the address you gave."
	},
	{
		index: "04",
		label: "CLOSE",
		line: "The thread closes on the answer. A follow-up is a new request, with its own code and its own window."
	}
];
export { ContactProcess as n, RegisterEntries as r, ContactChannel as t };
