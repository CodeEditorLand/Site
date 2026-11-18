/**
 * The route registry - the site's route set, in one file.
 *
 * ─── WHAT THIS IS ─────────────────────────────────────────────────────────
 * Every page entry under `Source/pages` is listed here once, with the four
 * facts a route audit needs and cannot get from a directory listing:
 *
 *   Path      the canonical path the build emits (PascalCase, no trailing slash)
 *   File      the page entry, relative to `Source/pages`
 *   Kind      `page` (one built path), `collection` (a template that expands to
 *             one built path per content entry), `dispatch` (a rewrite target)
 *   Canonical whether the path takes part in PascalCase variant generation
 *             (`Map.ts` derives `CanonicalPath` from this flag, so the set has
 *             one definition instead of two)
 *   Baseline  whether the path existed at `57c16c23f`, the fidelity baseline.
 *             These are the 37 routes the behaviour checklist covers.
 *   Heading   the component that prints the page's one `h1`, or `null` when the
 *             route is a trampoline that is never read as a page
 *   Card      the programme card on the website board that owns the page body
 *             (the frame, the head and this registry are card 12's)
 *
 * ─── WHY IT EXISTS ────────────────────────────────────────────────────────
 * The audit card must enumerate the site without grepping the filesystem, and
 * two readers must agree about what a canonical path is: `Map.ts` (redirects,
 * variants, the dispatch page) and `Layout/Base.astro` (the canonical URL and
 * the OpenGraph image a page advertises). Before this file the canonical set was
 * hand-maintained in `Map.ts` and drifted: `/Motion` and `/Specimen` were added
 * to it by the cards that built those pages, and `/Compare`, `/Contents`,
 * `/Glossary` and `/Status` were not.
 *
 * ─── THE RULE ─────────────────────────────────────────────────────────────
 * A new page file is added here in the same change that adds it under
 * `Source/pages`. A path that is not in this registry is not a route the site
 * claims, and `Base.astro` treats it as unknown (the canonical URL falls back to
 * the request URL and the OpenGraph image to the section's).
 *
 * Collections are listed once, not expanded: `Source/Content/doc` and
 * `Source/Content/blog` are the sources of truth for their own slugs, and a
 * static list of 86 built paths would be a second copy of the content tree.
 */

/** What kind of built path a page entry produces. */
export type RouteKind = "page" | "collection" | "dispatch";

/** One route, with the facts an audit needs. */
export interface RouteEntry {
	/** The canonical path the build emits: PascalCase, no trailing slash. */
	readonly Path: string;

	/** The page entry, relative to `Source/pages`. */
	readonly File: string;

	/** `page` | `collection` | `dispatch`. */
	readonly Kind: RouteKind;

	/** Whether `Map.ts` derives this path into `CanonicalPath`. */
	readonly Canonical: boolean;

	/** Whether the path existed at the fidelity baseline `57c16c23f`. */
	readonly Baseline: boolean;

	/** The component that prints the page's one `h1`, or `null`. */
	readonly Heading: string | null;

	/** The programme card that owns the page body. */
	readonly Card: string;

	/** For `collection`: the content directory whose entries become paths. */
	readonly Collection?: string;
}

/**
 * The registry. Order is the board's order - home first, then the destinations,
 * then the record, then the account surfaces, then the dispatch target.
 *
 * `Canonical` is true for the hand-listed PascalCase pages only: those are the
 * paths a person types, so they get the full variant set (case, plural, kebab,
 * flat). A collection path gets case-only variants (`GenerateSlugVariants`) to
 * keep the Cloudflare rule count bounded, and `/404` and `/Visit` get none.
 */
export const Route: readonly RouteEntry[] = [
	{
		Path: "/",

		File: "index.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Dynamic/DynamicHeroSection.tsx",

		Card: "2",
	},

	{
		Path: "/404",

		File: "404.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Record/RecordHero.astro",

		Card: "3",
	},

	// ─── Destinations ─────────────────────────────────────────────────────
	{
		Path: "/Download",

		File: "Download.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Dynamic/DownloadMasthead.astro",

		Card: "4",
	},

	{
		Path: "/Doc",

		File: "Doc.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Doc/DocArticle.astro",

		Card: "3",
	},

	{
		Path: "/Doc/[...Slug]",

		File: "Doc/[...Slug].astro",

		Kind: "collection",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Doc/DocArticle.astro",

		Card: "3",

		Collection: "Source/Content/doc",
	},

	{
		Path: "/Doc/Rust",

		File: "Doc/Rust.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Doc/DocArticle.astro",

		Card: "3",
	},

	{
		Path: "/Blog",

		File: "Blog.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Blog/BlogIndex.astro",

		Card: "3",
	},

	{
		Path: "/Blog/[Slug]",

		File: "Blog/[Slug].astro",

		Kind: "collection",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Blog/BlogArticle.astro",

		Card: "3",

		Collection: "Source/Content/blog",
	},

	{
		Path: "/Portal",

		File: "Portal.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Surface/SurfaceHead.astro",

		Card: "6",
	},

	{
		Path: "/Dashboard",

		File: "Dashboard.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Surface/SurfaceHead.astro",

		Card: "6",
	},

	{
		Path: "/Verify",

		File: "Verify.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Surface/SurfaceHead.astro",

		Card: "6",
	},

	// ─── The record: license, contributing, the legal set ─────────────────
	{
		Path: "/License",

		File: "License.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Reading/ReadingDocument.astro",

		Card: "5",
	},

	{
		Path: "/Contributing",

		File: "Contributing.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Reading/ReadingDocument.astro",

		Card: "5",
	},

	{
		Path: "/Legal/Term",

		File: "Legal/Term.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Reading/ReadingDocument.astro",

		Card: "5",
	},

	{
		Path: "/Legal/Privacy",

		File: "Legal/Privacy.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Reading/ReadingDocument.astro",

		Card: "5",
	},

	// ─── The front desk ───────────────────────────────────────────────────
	{
		Path: "/Contact",

		File: "Contact/index.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Contact/ContactPage.astro",

		Card: "5",
	},

	{
		Path: "/Contact/Sale",

		File: "Contact/Sale.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Contact/ContactPage.astro",

		Card: "5",
	},

	{
		Path: "/Contact/Amend",

		File: "Contact/Amend.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Dynamic/DynamicContactForm.tsx",

		Card: "5",
	},

	{
		Path: "/Contact/Claim",

		File: "Contact/Claim.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Dynamic/DynamicContactForm.tsx",

		Card: "5",
	},

	{
		Path: "/Contact/Deals",

		File: "Contact/Deals.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Dynamic/DynamicContactForm.tsx",

		Card: "5",
	},

	{
		Path: "/Contact/Erase",

		File: "Contact/Erase.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Dynamic/DynamicContactForm.tsx",

		Card: "5",
	},

	{
		Path: "/Contact/Guard",

		File: "Contact/Guard.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Dynamic/DynamicContactForm.tsx",

		Card: "5",
	},

	{
		Path: "/Contact/Hails",

		File: "Contact/Hails.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Dynamic/DynamicContactForm.tsx",

		Card: "5",
	},

	{
		Path: "/Contact/Leave",

		File: "Contact/Leave.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Dynamic/DynamicContactForm.tsx",

		Card: "5",
	},

	{
		Path: "/Contact/Legal",

		File: "Contact/Legal.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Dynamic/DynamicContactForm.tsx",

		Card: "5",
	},

	{
		Path: "/Contact/Lodge",

		File: "Contact/Lodge.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Dynamic/DynamicContactForm.tsx",

		Card: "5",
	},

	{
		Path: "/Contact/Pause",

		File: "Contact/Pause.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Dynamic/DynamicContactForm.tsx",

		Card: "5",
	},

	{
		Path: "/Contact/Query",

		File: "Contact/Query.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Dynamic/DynamicContactForm.tsx",

		Card: "5",
	},

	{
		Path: "/Contact/Reach",

		File: "Contact/Reach.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Dynamic/DynamicContactForm.tsx",

		Card: "5",
	},

	{
		Path: "/Contact/Scout",

		File: "Contact/Scout.astro",

		Kind: "page",

		Canonical: false,

		Baseline: true,

		Heading: "Component/Dynamic/DynamicContactForm.tsx",

		Card: "5",
	},

	// ─── The account surfaces ─────────────────────────────────────────────
	{
		Path: "/Account",

		File: "Account/index.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Surface/SurfaceHead.astro",

		Card: "6",
	},

	{
		Path: "/Account/SignIn",

		File: "Account/SignIn.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Auth/AuthShell.astro",

		Card: "6",
	},

	{
		Path: "/Account/SignUp",

		File: "Account/SignUp.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Auth/AuthShell.astro",

		Card: "6",
	},

	{
		Path: "/Account/ForgotPassword",

		File: "Account/ForgotPassword.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Auth/AuthShell.astro",

		Card: "6",
	},

	{
		Path: "/Account/ResetPassword",

		File: "Account/ResetPassword.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Auth/AuthShell.astro",

		Card: "6",
	},

	{
		Path: "/OAuth/Success",

		File: "OAuth/Success.astro",

		Kind: "page",

		Canonical: true,

		Baseline: true,

		Heading: "Component/Auth/AuthShell.astro",

		Card: "6",
	},

	// ─── The dispatch target ──────────────────────────────────────────────
	{
		Path: "/Visit",

		File: "Visit.astro",

		Kind: "dispatch",

		Canonical: false,

		Baseline: true,

		Heading: null,

		Card: "13",
	},

	// ─── Added after the baseline ─────────────────────────────────────────
	{
		Path: "/Specimen",

		File: "Specimen.astro",

		Kind: "page",

		Canonical: true,

		Baseline: false,

		Heading: "Component/Surface/SurfaceHead.astro",

		Card: "post-baseline",
	},

	{
		Path: "/Motion",

		File: "Motion.astro",

		Kind: "page",

		Canonical: true,

		Baseline: false,

		Heading: "Component/More/QuietHead.astro",

		Card: "9",
	},

	{
		Path: "/Compare",

		File: "Compare.astro",

		Kind: "page",

		Canonical: true,

		Baseline: false,

		Heading: "Component/Record/RecordHero.astro",

		Card: "post-baseline",
	},

	{
		Path: "/Contents",

		File: "Contents.astro",

		Kind: "page",

		Canonical: true,

		Baseline: false,

		Heading: "Component/Record/RecordHero.astro",

		Card: "post-baseline",
	},

	{
		Path: "/Glossary",

		File: "Glossary.astro",

		Kind: "page",

		Canonical: true,

		Baseline: false,

		Heading: "Component/More/QuietHead.astro",

		Card: "post-baseline",
	},

	{
		Path: "/Status",

		File: "Status.astro",

		Kind: "page",

		Canonical: true,

		Baseline: false,

		Heading: "Component/Surface/SurfaceHead.astro",

		Card: "post-baseline",
	},
];

/** Every canonical path, in registry order. */
export const RoutePath: readonly string[] = Route.map((Entry) => Entry.Path);

/** The registry as a set, for `IsRoute` and the frame's canonical check. */
export const RouteSet: ReadonlySet<string> = new Set(RoutePath);

/** The paths `Map.ts` derives into `CanonicalPath` - the hand-listed pages. */
export const CanonicalRoute: readonly RouteEntry[] = Route.filter(
	(Entry) => Entry.Canonical,
);

/** The 37 routes that existed at `57c16c23f` - the behaviour checklist's set. */
export const BaselineRoute: readonly RouteEntry[] = Route.filter(
	(Entry) => Entry.Baseline,
);

/** The routes added after the baseline, so an audit can say so. */
export const AddedRoute: readonly RouteEntry[] = Route.filter(
	(Entry) => !Entry.Baseline,
);

/** The routes whose paths are templates rather than one built path. */
export const CollectionRoute: readonly RouteEntry[] = Route.filter(
	(Entry) => Entry.Kind === "collection",
);

/** One entry by canonical path, or `undefined` when the path is not a route. */
export const RouteOf = (Path: string): RouteEntry | undefined =>
	Route.find((Entry) => Entry.Path === Path);

/**
 * One entry by path, ignoring case.
 *
 * The form a typed or crawled URL arrives in: `/contact/amend`, `/DASHBOARD`,
 * `/doc/rust`. The registry's own paths are canonical, so this is a lookup, not
 * a normalisation - `CanonicalizePath` uses it as the last step before giving up
 * and returning the path as it came.
 */
export const RouteByCase = (Path: string): RouteEntry | undefined => {
	const Lower = Path.toLowerCase();

	return Route.find((Entry) => Entry.Path.toLowerCase() === Lower);
};

/** Whether the registry claims this path. */
export const IsRoute = (Path: string): boolean => RouteSet.has(Path);

/**
 * The path prefix a collection owns: `/Doc/[...Slug]` owns `/Doc/`.
 *
 * A collection expands to one built path per content entry, so the registry
 * cannot list them; the prefix is what lets a reader ask "is this path the
 * site's?" without knowing the content tree.
 */
export const RoutePrefix: readonly string[] = CollectionRoute.map((Entry) =>
	Entry.Path.replace(/\/\[.*$/, "/"),
);

/**
 * Whether the site claims this path - an exact registered route or a path under
 * a collection's prefix (`/Doc/sky`, `/Blog/LocalFirstPhilosophy`).
 *
 * `Layout/Base.astro` asks this before it writes a canonical URL: a path the
 * site does not claim advertises the request URL it arrived on.
 */
export const ClaimsPath = (Path: string): boolean =>
	RouteSet.has(Path) ||
	RoutePrefix.some(
		(Prefix) => Path.startsWith(Prefix) && Path.length > Prefix.length,
	);

/**
 * The registry as a plain manifest - what a build script or an audit reads.
 *
 * Counts are derived here, not typed: `37` baseline routes and `43` page entries
 * are facts about the array above, and a number written twice is a number that
 * drifts.
 */
export const RouteManifest = () => ({
	Entries: Route.length,
	Baseline: BaselineRoute.length,
	Added: AddedRoute.length,
	Canonical: CanonicalRoute.length,
	Collections: CollectionRoute.length,
	Routes: Route,
});
