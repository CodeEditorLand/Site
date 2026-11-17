// Header - the shapes its data module publishes.
//
// One nav, one action row, one status line. These definitions carry no markup and
// import no i18n client (BRIDGE 2.2): the caller resolves the labels, so the same
// rows render in the bar and in the panel without a second copy of anything.

/** Where a link sends the reader: the same tab, or a new one. */
export type HeaderLinkTarget = "self" | "blank";

/** One destination in the header's single nav. */
export interface HeaderLink {
	/** i18n key in the `header` namespace; absent on a caller-supplied row. */
	readonly Key?: string;

	/** English label - the call site's `defaultValue`, replaced by the translation. */
	readonly Label: string;

	readonly Href: string;

	/** The in-page anchor this link points at, when it is a section link. */
	readonly Section?: string;

	readonly Target?: HeaderLinkTarget;
}

/** The variants the bar's buttons may wear - the UI/Button surface. */
export type HeaderActionVariant = "ghost" | "default" | "outline";

/** One button in the header's action row. */
export interface HeaderAction {
	/** i18n key in the `header` namespace; absent on a caller-supplied row. */
	readonly Key?: string;

	readonly Label: string;

	readonly Href: string;

	readonly Variant: HeaderActionVariant;

	readonly Target?: HeaderLinkTarget;
}

/** `active` marks the destination the reader is on; every other link is `idle`. */
export type HeaderLinkActivity = "active" | "idle";

/**
 * A destination a caller supplies instead of the site's own four. The homepage
 * and the auth header hand their navigation in this shape, so the resolver reads
 * one interface whichever source it was given.
 */
export interface HeaderNavigationLink {
	readonly Label: string;

	readonly Href: string;
}

/** An action a caller supplies instead of the site's own three. */
export interface HeaderContentAction {
	readonly Text: string;

	readonly Variant?: string;

	readonly Href?: string;

	/** Only the mobile menu carries a `Type`; the bar's actions never do. */
	readonly Type?: string;
}

/**
 * The content a caller may pass to the header. Every field is optional: absent
 * means "use the site's own rows", which is what every page that renders
 * `<Header />` with no props gets.
 */
export interface HeaderContent {
	readonly Logo?: { readonly Text: string };

	readonly Navigation?: readonly HeaderNavigationLink[];

	readonly Actions?: readonly HeaderContentAction[];
}

/** What the bar renders, after the caller's content and the defaults are resolved. */
export interface HeaderView {
	readonly Logo: string;

	readonly Links: readonly HeaderLink[];

	readonly Actions: readonly HeaderAction[];
}

/** A translator that resolves one key with an English default. */
export type HeaderTranslate = (
	Key: string,
	Options: { readonly defaultValue: string },
) => string;
