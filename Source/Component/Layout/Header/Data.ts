// Header data - the four destinations, the three actions and the status line,
// plus the two derivations the bar needs: translated labels and active state.
//
// No JSX, no DOM access, no i18n import (BRIDGE 2.2). The module takes a
// translator and a path and returns values, so the component renders what it is
// given and nothing here knows that a browser exists.

import type {
	HeaderAction,
	HeaderActionVariant,
	HeaderContent,
	HeaderContentAction,
	HeaderLink,
	HeaderLinkActivity,
	HeaderLinkTarget,
	HeaderNavigationLink,
	HeaderTranslate,
	HeaderView as HeaderViewType,
} from "./Type.js";

/**
 * The destinations the header has always carried, in the order they are read.
 * `Section` marks an in-page anchor: that link is active only while its own
 * section is the one in view on the page the anchor belongs to.
 */
export const HeaderLinkList: readonly HeaderLink[] = [
	{
		Key: "nav.features",

		Label: "Features",

		Href: "/#features",

		Section: "features",
	},

	{ Key: "nav.download", Label: "Download", Href: "/Download" },

	{ Key: "nav.docs", Label: "Documentation", Href: "/Doc" },

	{
		Key: "nav.github",

		Label: "GitHub",

		Href: "https://github.com/CodeEditorLand/Land",

		Target: "blank",
	},
];

/**
 * The action row the bar has always carried. No destination is added and none is
 * dropped - the bar states where the reader can go, it does not invent a CTA.
 */
export const HeaderActionList: readonly HeaderAction[] = [
	{
		Key: "actions.signIn",

		Label: "Sign In",

		Href: "/Account/SignIn",

		Variant: "ghost",
	},

	{
		Key: "actions.editorPortal",

		Label: "Editor Portal",

		Href: "/Portal",

		Variant: "ghost",
	},

	{
		Key: "actions.getStarted",

		Label: "Get Land",

		Href: "/Download",

		Variant: "default",
	},
];

/** The section ids the nav watches, in document order. */
export const HeaderSections = (
	Links: readonly HeaderLink[],
): readonly string[] =>
	Links.flatMap((Link) => (Link.Section === undefined ? [] : [Link.Section]));

/**
 * The status line is the product's own state in the vocabulary the design
 * system fixes (`DesignSystem-Components.md` §7: `STATUS:` plus one term from
 * `READY`/`ACTIVE`/`LOADING`/`PREPARING`/`VERIFIED`/`UNAVAILABLE`/
 * `INTERRUPTED`/`ARCHIVED`). `ACTIVE` is the record's tone as well
 * (`Source/Content/Record/Land.ts` `Status.Tone` is `specimen`), and
 * `PRE-RELEASE` is the homepage's `softwareVersion`, kept as the qualifier after
 * the em quad so a reader landing on any page learns this is not a shipped
 * installer. U+2001 is the only separator the grammar allows - never a middle
 * dot.
 */
export const HeaderStatus = `STATUS: ACTIVE\u2001PRE-RELEASE`;

/** Resolve the default labels: one translator in, the same rows out. */
const ResolveLinks = (T: HeaderTranslate): readonly HeaderLink[] =>
	HeaderLinkList.map((Link) => ({
		...Link,
		Label: T(Link.Key ?? Link.Label, { defaultValue: Link.Label }),
	}));

/** Resolve the default action labels the same way. */
const ResolveActions = (T: HeaderTranslate): readonly HeaderAction[] =>
	HeaderActionList.map((Action) => ({
		...Action,
		Label: T(Action.Key ?? Action.Label, { defaultValue: Action.Label }),
	}));

/** An href that leaves this site opens in a second tab. */
const TargetOf = (Href: string): HeaderLinkTarget =>
	Href.startsWith("http") ? "blank" : "self";

/** The in-page anchor an href names, when it names one. */
const SectionOf = (Href: string): string | undefined => {
	const Anchor = Href.split("#")[1];

	return Anchor === undefined || Anchor === "" ? undefined : Anchor;
};

/** The button variants the bar may wear; anything else is the default weight. */
const ActionVariant = (Variant: string | undefined): HeaderActionVariant =>
	Variant === "ghost" || Variant === "outline" ? Variant : "default";

/** A caller's destination, in the same row shape the defaults use. */
const ContentLink = (Link: HeaderNavigationLink): HeaderLink => {
	const Section = SectionOf(Link.Href);

	return {
		Label: Link.Label,

		Href: Link.Href,
		...(Section === undefined ? {} : { Section }),
		...(TargetOf(Link.Href) === "self" ? {} : { Target: "blank" as const }),
	};
};

/** A caller's action, in the same row shape the defaults use. */
const ContentAction = (Action: HeaderContentAction): HeaderAction => {
	const Href = Action.Href ?? "#";

	return {
		Label: Action.Text,

		Href,

		Variant: ActionVariant(Action.Variant),
		...(TargetOf(Href) === "self" ? {} : { Target: "blank" as const }),
	};
};

/**
 * The bar's content, resolved once: a caller's `Content` when it has that part,
 * the site's own rows otherwise. Both arms return the same shapes, so the
 * component has one nav to render and one action row - never a second copy for
 * the other breakpoint, and never a branch inside the markup.
 */
export const HeaderView = (
	Content: HeaderContent | undefined,

	T: HeaderTranslate,
): HeaderViewType => ({
	Logo: Content?.Logo?.Text ?? T("logo", { defaultValue: "Land" }),

	Links:
		Content?.Navigation === undefined
			? ResolveLinks(T)
			: Content.Navigation.map(ContentLink),

	Actions:
		Content?.Actions === undefined
			? ResolveActions(T)
			: Content.Actions.map(ContentAction),
});

/** A path without its trailing slash, with `/` kept for the root. */
const Normalize = (Path: string): string => {
	const Trimmed = Path.replace(/\/+$/, "");

	return Trimmed === "" ? "/" : Trimmed;
};

/** Does the reader stand on this route, or under it? */
const OnRoute = (Route: string, Current: string): boolean =>
	Route === "/"
		? Current === "/"
		: Current === Route || Current.startsWith(`${Route}/`);

/**
 * Active state, computed from the current path and - for an in-page anchor - the
 * section in view. A section link is never active on another page, and an
 * off-site link is never active at all: an href comparison alone cannot tell the
 * two apart, which is why the path and the section are separate inputs.
 */
export const HeaderLinkState = (
	Link: HeaderLink,

	Path: string,

	Section: string,
): HeaderLinkActivity => {
	if (Link.Target === "blank") return "idle";

	const [Base = "/", Anchor] = Link.Href.split("#");

	if (!OnRoute(Normalize(Base), Normalize(Path))) return "idle";

	return Anchor === undefined || Anchor === Section ? "active" : "idle";
};

/** The attributes an off-site link needs; a same-tab link needs none. */
export const HeaderLinkAttributes = (
	Target: HeaderLinkTarget | undefined,
): Record<string, string> =>
	Target === "blank" ? { target: "_blank", rel: "noopener noreferrer" } : {};
