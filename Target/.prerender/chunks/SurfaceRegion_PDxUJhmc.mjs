import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, p as Fragment, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro, bt as Tone, ft as RegisterOf, lt as $$Register, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
import { i as HrefOf, l as Requests } from "./Purpose_DgbipYwf.mjs";
// Source/Component/Surface/SurfaceAbsent.astro
createAstro("https://editor.land");
var $$SurfaceAbsent = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SurfaceAbsent;
	const { status, wouldBe, whyNot, next, retry, note, dense = false, class: ClassName } = Astro.props;
	const Resolved = Tone(status) ?? "ink";
	return renderTemplate`${maybeRenderHead($$result)}<aside${addAttribute([
		"surface-absent",
		dense && "surface-absent--dense",
		ClassName
	], "class:list")}${addAttribute(`${status}: ${wouldBe}`, "aria-label")}> <p${addAttribute(["surface-absent__status", `surface-absent__status--${Resolved}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": Resolved
	})} <span class="surface-absent__status-key">STATUS:</span> ${status} </p> <dl class="surface-absent__rows"> <div class="surface-absent__row"> <dt class="surface-absent__key">WOULD BE HERE:</dt> <dd class="surface-absent__value">${wouldBe}</dd> </div> <div class="surface-absent__row"> <dt class="surface-absent__key">WHY NOT:</dt> <dd class="surface-absent__value">${whyNot}</dd> </div> <div class="surface-absent__row"> <dt class="surface-absent__key">NEXT:</dt> <dd class="surface-absent__value"> <a class="surface-absent__action"${addAttribute(next.href, "href")}> ${next.label} ${renderComponent($$result, "Mark", $$Mark, { "kind": "arrow" })} </a> </dd> </div> ${retry ? renderTemplate`<div class="surface-absent__row"> <dt class="surface-absent__key">RETRY:</dt> <dd class="surface-absent__value"> <a class="surface-absent__action"${addAttribute(retry.href, "href")}> ${retry.label} ${renderComponent($$result, "Mark", $$Mark, { "kind": "arrow" })} </a> </dd> </div>` : null} </dl> ${note ? renderTemplate`<p class="surface-absent__note">${note}</p>` : null} </aside>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Surface/SurfaceAbsent.astro", void 0);
// Source/Component/Dashboard/Data.ts
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
/** `/Contact/Reach` - the route a slug is spelled as on disk. */
var Route = (Code) => HrefOf(Code);
/** One right: the registry's title, article and sentence, over `Open form`. */
var Right = (Code) => {
	const Config = Requests[Code];
	return {
		title: Config.Title,
		code: Config.Code,
		article: Config.Article ?? Config.To,
		body: Config.Subtitle,
		href: Route(Code)
	};
};
/** One support channel: the registry's title and sentence, over its address. */
var Channel = (Code) => {
	const Config = Requests[Code];
	return {
		title: Config.Title,
		code: Config.Code,
		body: Config.Subtitle,
		address: Config.To,
		href: Route(Code)
	};
};
/** The six statutory rights, in the order the baseline grid printed them. */
var Rights = {
	label: "Your Rights Under GDPR",
	intro: "As a resident of the EU/EEA or a user of our service, you hold the following rights. Each link opens a dedicated form page that pre-fills your account details and generates a properly formatted, income-coded request.",
	empty: "No right is filed for this build. The six are read from the contact registry (`Library/Contact/Request.ts`) and the registry answered with none, so this grid states the absence rather than printing six empty cards.",
	cards: [
		Right("REACH"),
		Right("AMEND"),
		Right("PAUSE"),
		Right("QUERY"),
		Right("LEAVE"),
		Right("LODGE")
	]
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
var Support = {
	label: "Support & Assistance",
	intro: "Direct channels for general questions, technical issues, security reports, copyright claims, and legal enquiries. Each form pre-fills your details and generates a plain-text, income-coded email.",
	empty: "No channel is filed for this build. The five are the contact registry's support entries, and the registry answered with none - so the desk's own addresses are the way to reach it, and this grid says so instead of printing five empty cards.",
	cards: [
		Channel("HAILS"),
		Channel("SCOUT"),
		Channel("GUARD"),
		Channel("CLAIM"),
		Channel("LEGAL")
	]
};
/**
* The erasure block. Its sentence is the page's own, not the registry's: the
* baseline card states what the generated request contains - every processor
* it covers and the article it cites - and the registry entry does not.
*/
var Erase = {
	label: "Delete Account",
	intro: "Permanently delete your account and all associated personal data under GDPR Article 17. This action is irreversible.",
	title: "Permanent Account Deletion",
	code: "ERASE",
	body: "Opens a structured erasure request form. The generated email includes income code [ERASE] and covers Auth0, PostHog, Cloudflare, and all backup copies - citing GDPR Art. 17 with a 30-day response requirement.",
	href: Route("ERASE")
};
// Source/Component/Dashboard/PrivacyRequests.astro
createAstro("https://editor.land");
var $$PrivacyRequests = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PrivacyRequests;
	const { rights: Rights$1 = Rights, support: Support$1 = Support, erase: Erase$1 = Erase, state = "rest", denied = "The directory is read with the session that owns the account. This browser has no session the dashboard recognises, so the six rights and the five channels are not being listed - they have not gone anywhere." } = Astro.props;
	const RightsLine = RegisterOf("THE RIGHTS", Rights$1.cards);
	const SupportLine = RegisterOf("THE CHANNELS", Support$1.cards);
	const EraseLine = RegisterOf("THE ERASURE", Erase$1 ? [Erase$1] : []);
	return renderTemplate`${maybeRenderHead($$result)}<div class="privacy-requests space-y-12"> ${state === "denied" ? renderTemplate`${renderComponent($$result, "SurfaceAbsent", $$SurfaceAbsent, {
		"status": "UNAVAILABLE",
		"wouldBe": "The six statutory rights, the five support channels and the one erasure entry, each opening the form that files it.",
		"whyNot": denied,
		"next": {
			label: "SIGN IN",
			href: "/Account/SignIn"
		},
		"retry": {
			label: "READ THE ACCOUNT PAGE",
			href: "/Account"
		},
		"note": "SOURCE: SOURCE/COMPONENT/DASHBOARD/DATA.TS"
	})}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <div> ${renderComponent($$result, "Register", $$Register, {
		"register": RightsLine,
		"class": "privacy-requests__register"
	})} <h3 class="font-medium font-mono mb-2">${Rights$1.label}</h3> <p class="mb-6 text-muted-foreground">${Rights$1.intro}</p> ${Rights$1.cards.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3"> ${Rights$1.cards.map((Card) => renderTemplate`<a class="flex StaccatoBorderShimmer StaccatoCard bg-card transition-all p-5 flex-col focus:outline-2 focus:outline-[var(--Primary)] focus:outline-offset-2 hover:bg-secondary"${addAttribute(Card.href, "href")}> <div class="flex justify-between gap-2 items-start mb-3"> <h4 class="text-card-foreground font-medium leading-snug"> ${Card.title} </h4> <div class="flex flex-col gap-1 items-end shrink-0"> <span class="font-medium text-sm font-mono tracking-widest bg-[var(--SpineIPCSurface)] border border-[color:var(--SpineIPCMute)] px-2 py-0.5 text-[color:var(--SpineIPCFore)]"> ${Card.code} </span> <span class="text-card-foreground text-sm font-mono opacity-70"> ${Card.article} </span> </div> </div> <p class="text-card-foreground text-sm flex-1 leading-relaxed mb-4"> ${Card.body} </p> <span class="text-card-foreground font-medium text-sm inline-flex items-center mt-auto">
Open form<span class="ml-1">→</span> </span> </a>`)} </div>` : renderTemplate`<p class="privacy-requests__empty"> <span class="privacy-requests__empty-mark" aria-hidden="true">
◎
</span> <span class="privacy-requests__empty-sentence"> ${Rights$1.empty} </span> <span class="privacy-requests__empty-status">
STATUS: UNAVAILABLE
</span> </p>`} </div> <div> ${renderComponent($$result, "Register", $$Register, {
		"register": SupportLine,
		"class": "privacy-requests__register"
	})} <h3 class="font-medium font-mono mb-2">${Support$1.label}</h3> <p class="mb-6 text-muted-foreground">${Support$1.intro}</p> ${Support$1.cards.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4"> ${Support$1.cards.map((Card) => renderTemplate`<a class="flex StaccatoBorderShimmer StaccatoCard bg-card transition-all p-5 flex-col focus:outline-2 focus:outline-[var(--Primary)] focus:outline-offset-2 hover:bg-secondary"${addAttribute(Card.href, "href")}> <div class="flex items-center justify-between gap-2 mb-2"> <h4 class="text-card-foreground font-medium"> ${Card.title} </h4> <span class="text-card-foreground font-medium text-sm font-mono shrink-0 tracking-widest"> ${Card.code} </span> </div> <p class="text-card-foreground text-sm flex-1 leading-relaxed mb-4"> ${Card.body} </p> <span class="text-card-foreground text-sm font-mono mt-auto"> ${Card.address} </span> </a>`)} </div>` : renderTemplate`<p class="privacy-requests__empty"> <span class="privacy-requests__empty-mark" aria-hidden="true">
◎
</span> <span class="privacy-requests__empty-sentence"> ${Support$1.empty} </span> <span class="privacy-requests__empty-status">
STATUS: UNAVAILABLE
</span> </p>`} </div> ${Erase$1 ? renderTemplate`<div> ${renderComponent($$result, "Register", $$Register, {
		"register": EraseLine,
		"class": "privacy-requests__register"
	})} <h3 class="font-medium font-mono mb-2">${Erase$1.label}</h3> <p class="mb-6 text-muted-foreground">${Erase$1.intro}</p> <a class="bg-card StaccatoCard transition-all focus:outline-2 focus:outline-offset-2 block border border-[color:var(--DestructMute)] focus:outline-[var(--Destruct)] hover:bg-[var(--DestructSurface)] p-6"${addAttribute(Erase$1.href, "href")}> <div class="flex items-start gap-4 mb-4"> <div class="flex items-center justify-center shrink-0 border h-10 w-10 bg-[var(--DestructSurface)] border-[color:var(--DestructMute)] text-[color:var(--Destruct)]"> <svg aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="20"> <path d="M3 6h18"></path> <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path> <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path> <line x1="10" x2="10" y1="11" y2="17"></line> <line x1="14" x2="14" y1="11" y2="17"></line> </svg> </div> <div class="flex-1"> <div class="flex items-center gap-2 mb-1"> <h4 class="font-medium text-[color:var(--DestructFore)]"> ${Erase$1.title} </h4> <span class="font-medium text-sm font-mono tracking-widest text-[color:var(--DestructFore)]"> ${Erase$1.code} </span> </div> <p class="text-card-foreground text-sm">${Erase$1.body}</p> </div> <span class="font-medium text-[color:var(--Destruct)] shrink-0">
→
</span> </div> </a> </div>` : null} ` })}`} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dashboard/PrivacyRequests.astro", void 0);
// Source/Component/Surface/SurfaceRegion.astro
createAstro("https://editor.land");
var $$SurfaceRegion = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SurfaceRegion;
	const { index, id, title, standfirst, state = "rest", empty, keys = [], dense = false, class: ClassName } = Astro.props;
	const Absent = state !== "rest";
	const Resolved = Tone(state === "loading" ? "LOADING" : "UNAVAILABLE") ?? "ink";
	const Statement = empty ?? "UNAVAILABLE";
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute([
		"surface-region",
		dense && "surface-region--dense",
		Absent && `surface-region--${state}`,
		ClassName
	], "class:list")}${addAttribute(id, "id")} data-region${addAttribute(state, "data-state")}${addAttribute(`${id}-title`, "aria-labelledby")}> <div class="surface-region__head"> <p class="surface-region__index">${index}</p> <h2 class="surface-region__title"${addAttribute(`${id}-title`, "id")}> ${title} </h2> </div> ${standfirst ? renderTemplate`<p class="surface-region__standfirst">${standfirst}</p>` : null} ${Absent ? renderTemplate`<div class="surface-region__absent"${addAttribute(state, "data-state")}> <p${addAttribute(["surface-region__status", `surface-region__status--${Resolved}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": Resolved
	})} <span class="surface-region__status-key">STATUS:</span> ${state === "loading" ? "LOADING" : "UNAVAILABLE"} </p> ${state === "loading" ? renderTemplate`<div class="surface-region__skeleton" aria-hidden="true"> ${(keys.length > 0 ? keys : [
		"RECORD",
		"ROUTE",
		"STATE"
	]).map((Key, Index) => renderTemplate`<p class="surface-region__skeleton-row"> <span class="surface-region__skeleton-key">${Key}:</span> <span class="surface-region__bar"${addAttribute(`--bar:${[
		64,
		42,
		78,
		55,
		36,
		70
	][Index % 6]}%`, "style")}></span> </p>`)} </div>` : renderTemplate`<p class="surface-region__sentence">${Statement}</p>`} </div>` : renderTemplate`${renderSlot($$result, $$slots["default"])}`} </section>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Surface/SurfaceRegion.astro", void 0);
export { $$SurfaceAbsent as a, Support as i, $$PrivacyRequests as n, Rights as r, $$SurfaceRegion as t };
