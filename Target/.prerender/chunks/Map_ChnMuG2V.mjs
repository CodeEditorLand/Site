import "./jsx-runtime_Cm1SQqpF.mjs";
import { n as Lab, r as LabRoute } from "./Lab_C7Fe6NZ4.mjs";
import { t as ContactPurposeAt } from "./Purpose_DgbipYwf.mjs";
// Source/Function/Route/Registry.ts
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
*   Purpose   on a `/Contact` route, what the route is for, who should be sent
*             there and the label a link to it carries (`Library/Contact/
*             Purpose.ts`). Absent on every other route, and required on those:
*             a contact route's meaning is not in its file name, so a page that
*             linked one by slug alone sent readers to the wrong form
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
/**
* The purpose table is the contact library's, and it is read here rather than
* restated: one record per `/Contact` route, carrying what the route is for, who
* should be sent there and the label a link to it carries
* (`Library/Contact/Purpose.ts`).
*/
/**
* The lab switch: whether this build carries the exploratory surfaces. The
* decision and the route list live in `Function/Configuration/Lab.mjs`; this
* file reads the answer once, below, and every derived table inherits it.
*/
/**
* Every route the tree declares, before the build decides which of them it
* serves. Order is the board's order - home first, then the destinations, then
* the record, then the account surfaces, then the dispatch target.
*
* `Canonical` is true for the hand-listed PascalCase pages only: those are the
* paths a person types, so they get the full variant set (case, plural, kebab,
* flat). A collection path gets case-only variants (`GenerateSlugVariants`) to
* keep the Cloudflare rule count bounded, and `/404` and `/Visit` get none.
*
* `Lab` marks an exploratory surface: `/Specimen` prints the document's own parts
* so the owner and the agents can compose from primitives, and it is served in
* development and absent from production (`Function/Configuration/Lab.mjs`). The
* flag is on the entry rather than in a second list, so the route that is removed
* is the route that says it may be.
*/
var Declared = [
	{
		Path: "/",
		File: "index.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Dynamic/DynamicHeroSection.tsx",
		Card: "2"
	},
	{
		Path: "/404",
		File: "404.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Record/RecordHero.astro",
		Card: "3"
	},
	{
		Path: "/Download",
		File: "Download.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Dynamic/DownloadMasthead.astro",
		Card: "4"
	},
	{
		Path: "/Doc",
		File: "Doc.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Doc/DocArticle.astro",
		Card: "3"
	},
	{
		Path: "/Doc/[...Slug]",
		File: "Doc/[...Slug].astro",
		Kind: "collection",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Doc/DocArticle.astro",
		Card: "3",
		Collection: "Source/Content/doc"
	},
	{
		Path: "/Doc/Rust",
		File: "Doc/Rust.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Doc/DocArticle.astro",
		Card: "3"
	},
	{
		Path: "/Blog",
		File: "Blog.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Blog/BlogIndex.astro",
		Card: "3"
	},
	{
		Path: "/Blog/[Slug]",
		File: "Blog/[Slug].astro",
		Kind: "collection",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Blog/BlogArticle.astro",
		Card: "3",
		Collection: "Source/Content/blog"
	},
	{
		Path: "/Portal",
		File: "Portal.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Surface/SurfaceHead.astro",
		Card: "6"
	},
	{
		Path: "/Dashboard",
		File: "Dashboard.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Surface/SurfaceHead.astro",
		Card: "6"
	},
	{
		Path: "/Verify",
		File: "Verify.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Surface/SurfaceHead.astro",
		Card: "6"
	},
	{
		Path: "/License",
		File: "License.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Reading/ReadingDocument.astro",
		Card: "5"
	},
	{
		Path: "/Contributing",
		File: "Contributing.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Reading/ReadingDocument.astro",
		Card: "5"
	},
	{
		Path: "/Legal/Term",
		File: "Legal/Term.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Reading/ReadingDocument.astro",
		Card: "5"
	},
	{
		Path: "/Legal/Privacy",
		File: "Legal/Privacy.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Reading/ReadingDocument.astro",
		Card: "5"
	},
	{
		Path: "/Contact",
		File: "Contact/index.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Contact/ContactPage.astro",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact")
	},
	{
		Path: "/Contact/Sale",
		File: "Contact/Sale.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Contact/ContactPage.astro",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact/Sale")
	},
	{
		Path: "/Contact/Amend",
		File: "Contact/Amend.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Dynamic/DynamicContactForm.tsx",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact/Amend")
	},
	{
		Path: "/Contact/Claim",
		File: "Contact/Claim.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Dynamic/DynamicContactForm.tsx",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact/Claim")
	},
	{
		Path: "/Contact/Deals",
		File: "Contact/Deals.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Dynamic/DynamicContactForm.tsx",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact/Deals")
	},
	{
		Path: "/Contact/Erase",
		File: "Contact/Erase.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Dynamic/DynamicContactForm.tsx",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact/Erase")
	},
	{
		Path: "/Contact/Guard",
		File: "Contact/Guard.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Dynamic/DynamicContactForm.tsx",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact/Guard")
	},
	{
		Path: "/Contact/Hails",
		File: "Contact/Hails.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Dynamic/DynamicContactForm.tsx",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact/Hails")
	},
	{
		Path: "/Contact/Leave",
		File: "Contact/Leave.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Dynamic/DynamicContactForm.tsx",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact/Leave")
	},
	{
		Path: "/Contact/Legal",
		File: "Contact/Legal.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Dynamic/DynamicContactForm.tsx",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact/Legal")
	},
	{
		Path: "/Contact/Lodge",
		File: "Contact/Lodge.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Dynamic/DynamicContactForm.tsx",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact/Lodge")
	},
	{
		Path: "/Contact/Pause",
		File: "Contact/Pause.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Dynamic/DynamicContactForm.tsx",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact/Pause")
	},
	{
		Path: "/Contact/Query",
		File: "Contact/Query.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Dynamic/DynamicContactForm.tsx",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact/Query")
	},
	{
		Path: "/Contact/Reach",
		File: "Contact/Reach.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Dynamic/DynamicContactForm.tsx",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact/Reach")
	},
	{
		Path: "/Contact/Scout",
		File: "Contact/Scout.astro",
		Kind: "page",
		Canonical: false,
		Baseline: true,
		Heading: "Component/Dynamic/DynamicContactForm.tsx",
		Card: "5",
		Purpose: ContactPurposeAt("/Contact/Scout")
	},
	{
		Path: "/Account",
		File: "Account/index.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Surface/SurfaceHead.astro",
		Card: "6"
	},
	{
		Path: "/Account/SignIn",
		File: "Account/SignIn.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Auth/AuthShell.astro",
		Card: "6"
	},
	{
		Path: "/Account/SignUp",
		File: "Account/SignUp.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Auth/AuthShell.astro",
		Card: "6"
	},
	{
		Path: "/Account/ForgotPassword",
		File: "Account/ForgotPassword.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Auth/AuthShell.astro",
		Card: "6"
	},
	{
		Path: "/Account/ResetPassword",
		File: "Account/ResetPassword.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Auth/AuthShell.astro",
		Card: "6"
	},
	{
		Path: "/OAuth/Success",
		File: "OAuth/Success.astro",
		Kind: "page",
		Canonical: true,
		Baseline: true,
		Heading: "Component/Auth/AuthShell.astro",
		Card: "6"
	},
	{
		Path: "/Visit",
		File: "Visit.astro",
		Kind: "dispatch",
		Canonical: false,
		Baseline: true,
		Heading: null,
		Card: "13"
	},
	{
		Path: "/Specimen",
		File: "Specimen.astro",
		Kind: "page",
		Canonical: true,
		Baseline: false,
		Heading: "Component/Surface/SurfaceHead.astro",
		Card: "post-baseline",
		Lab: true
	},
	{
		Path: "/Specimen/States",
		File: "Specimen/States.astro",
		Kind: "page",
		Canonical: true,
		Baseline: false,
		Heading: "Component/Surface/SurfaceHead.astro",
		Card: "post-baseline",
		Lab: true
	},
	{
		Path: "/Specimen/Reference",
		File: "Specimen/Reference.astro",
		Kind: "page",
		Canonical: true,
		Baseline: false,
		Heading: "Component/Surface/SurfaceHead.astro",
		Card: "post-baseline",
		Lab: true
	},
	{
		Path: "/Motion",
		File: "Motion.astro",
		Kind: "page",
		Canonical: true,
		Baseline: false,
		Heading: "Component/More/QuietHead.astro",
		Card: "9"
	},
	{
		Path: "/Compare",
		File: "Compare.astro",
		Kind: "page",
		Canonical: true,
		Baseline: false,
		Heading: "Component/Record/RecordHero.astro",
		Card: "post-baseline"
	},
	{
		Path: "/Contents",
		File: "Contents.astro",
		Kind: "page",
		Canonical: true,
		Baseline: false,
		Heading: "Component/Record/RecordHero.astro",
		Card: "post-baseline"
	},
	{
		Path: "/Glossary",
		File: "Glossary.astro",
		Kind: "page",
		Canonical: true,
		Baseline: false,
		Heading: "Component/More/QuietHead.astro",
		Card: "post-baseline"
	},
	{
		Path: "/Status",
		File: "Status.astro",
		Kind: "page",
		Canonical: true,
		Baseline: false,
		Heading: "Component/Surface/SurfaceHead.astro",
		Card: "post-baseline"
	}
];
/**
* The lab list and the entries that claim it, and the rule that keeps them equal.
*
* A lab route is named twice, and the two names do different jobs:
* `Function/Configuration/Lab.mjs`'s `LabRoute` is what the build step removes and
* what the sitemap filter reads, and `Lab: true` on an entry here is what removes
* it from every table derived from this registry. A route in one and not the other
* would be a page the build deletes and the site still links (or the reverse), so
* the two sets are compared at module load and a disagreement fails the build
* naming itself - the same guard, for the same reason, as the contact purposes
* below.
*/
var LabEntry = Declared.filter((Entry) => Entry.Lab === true).map((Entry) => Entry.Path);
var LabMismatch = [...LabEntry.filter((Path) => !LabRoute.includes(Path)), ...LabRoute.filter((Path) => !LabEntry.includes(Path))];
if (LabMismatch.length > 0) throw new Error(`Route/Registry: ${LabMismatch.length} lab route(s) disagree between this registry and Function/Configuration/Lab.mjs: ${LabMismatch.join(", ")}. Mark the entry \`Lab: true\` and list the path in \`LabRoute\`.`);
/**
* The routes this build serves - the set every derived table reads.
*
* `RoutePath`, `RouteSet`, `CanonicalRoute`, `BaselineRoute`, `AddedRoute`,
* `CollectionRoute`, `RouteOf`, `RouteByCase`, `IsRoute`, `ClaimsPath` and
* `RouteManifest` all come from this array, and `Map.ts` derives the redirect
* table and the service worker's route map from `CanonicalRoute`. So a lab route
* is removed from the nav, the sitemap's canonical rewriting, the variants, the
* palette and the canonical check in the same filter - a build that does not
* serve the page cannot list it, link it or redirect to it.
*
* In development the array is untouched, which is the whole point of a lab
* surface: `dum Run` serves every specimen exactly as it did before this filter
* existed.
*/
var Route = Lab ? Declared : Declared.filter((Entry) => Entry.Lab !== true);
var Unpurposed = Route.filter((Entry) => Entry.Path === "/Contact" || Entry.Path.startsWith("/Contact/")).filter((Entry) => Entry.Purpose === void 0).map((Entry) => Entry.Path);
if (Unpurposed.length > 0) throw new Error(`Route/Registry: ${Unpurposed.length} contact route(s) carry no purpose: ${Unpurposed.join(", ")}. Add them to Library/Contact/Purpose.ts.`);
/** Every canonical path, in registry order. */
var RoutePath = Route.map((Entry) => Entry.Path);
/** The registry as a set, for `IsRoute` and the frame's canonical check. */
var RouteSet = new Set(RoutePath);
/** The paths `Map.ts` derives into `CanonicalPath` - the hand-listed pages. */
var CanonicalRoute = Route.filter((Entry) => Entry.Canonical);
Route.filter((Entry) => Entry.Baseline);
Route.filter((Entry) => !Entry.Baseline);
/** The routes whose paths are templates rather than one built path. */
var CollectionRoute = Route.filter((Entry) => Entry.Kind === "collection");
/**
* One entry by path, ignoring case.
*
* The form a typed or crawled URL arrives in: `/contact/amend`, `/DASHBOARD`,
* `/doc/rust`. The registry's own paths are canonical, so this is a lookup, not
* a normalisation - `CanonicalizePath` uses it as the last step before giving up
* and returning the path as it came.
*/
var RouteByCase = (Path) => {
	const Lower = Path.toLowerCase();
	return Route.find((Entry) => Entry.Path.toLowerCase() === Lower);
};
/**
* The path prefix a collection owns: `/Doc/[...Slug]` owns `/Doc/`.
*
* A collection expands to one built path per content entry, so the registry
* cannot list them; the prefix is what lets a reader ask "is this path the
* site's?" without knowing the content tree.
*/
var RoutePrefix = CollectionRoute.map((Entry) => Entry.Path.replace(/\/\[.*$/, "/"));
/**
* Whether the site claims this path - an exact registered route or a path under
* a collection's prefix (`/Doc/sky`, `/Blog/LocalFirstPhilosophy`).
*
* `Layout/Base.astro` asks this before it writes a canonical URL: a path the
* site does not claim advertises the request URL it arrived on.
*/
var ClaimsPath = (Path) => RouteSet.has(Path) || RoutePrefix.some((Prefix) => Path.startsWith(Prefix) && Path.length > Prefix.length);
// Source/Function/Route/Map.ts
var { readdir: ReadDirectory } = await import("node:fs/promises");
var { join: Join, relative: Relative } = await import("node:path");
var CanonicalPath = new Set(CanonicalRoute.map((Entry) => Entry.Path));
var PascalCaseCanonical = Object.fromEntries([...CanonicalPath].map((PascalPath) => [PascalPath.toLowerCase(), PascalPath]));
var SemanticAlias = {
	"/downloads": "/Download",
	"/down": "/Download",
	"/get": "/Download",
	"/fetch": "/Download",
	"/install": "/Download",
	"/setup": "/Download",
	"/doc/webassembly": "/Doc/why-wasm",
	"/doc/why-webassembly": "/Doc/why-wasm",
	"/documentation": "/Doc",
	"/reference": "/Doc",
	"/help": "/Doc",
	"/guide": "/Doc",
	"/manual": "/Doc",
	"/api": "/Doc",
	"/login": "/Account/SignIn",
	"/log-in": "/Account/SignIn",
	"/sign-in": "/Account/SignIn",
	"/authenticate": "/Account/SignIn",
	"/auth": "/Account/SignIn",
	"/register": "/Account/SignUp",
	"/sign-up": "/Account/SignUp",
	"/join": "/Account/SignUp",
	"/create-account": "/Account/SignUp",
	"/forgot-password": "/Account/ForgotPassword",
	"/forgot": "/Account/ForgotPassword",
	"/password-reset": "/Account/ForgotPassword",
	"/recover": "/Account/ForgotPassword",
	"/recover-password": "/Account/ForgotPassword",
	"/reset-password": "/Account/ResetPassword",
	"/reset": "/Account/ResetPassword",
	"/new-password": "/Account/ResetPassword",
	"/change-password": "/Account/ResetPassword",
	"/tos": "/Legal/Term",
	"/terms-of-service": "/Legal/Term",
	"/eula": "/Legal/Term",
	"/conditions": "/Legal/Term",
	"/privacy-policy": "/Legal/Privacy",
	"/gdpr": "/Legal/Privacy",
	"/data-policy": "/Legal/Privacy",
	"/sale": "/Contact/Sale",
	"/sales-contact": "/Contact/Sale",
	"/contact-sales": "/Contact/Sale",
	"/pricing": "/Contact/Sale",
	"/enterprise": "/Contact/Sale",
	"/buy": "/Contact/Sale",
	"/contribute": "/Contributing",
	"/contributors": "/Contributing",
	"/dev": "/Contributing",
	"/develop": "/Contributing",
	"/opensource": "/Contributing",
	"/open-source": "/Contributing",
	"/home": "/",
	"/main": "/",
	"/index": "/",
	"/start": "/",
	"/welcome": "/",
	"/visit": "/",
	"/verify-email": "/Verify",
	"/email-verification": "/Verify",
	"/confirm": "/Verify",
	"/confirm-email": "/Verify",
	"/activate": "/Verify",
	"/app": "/Portal",
	"/launch": "/Portal",
	"/open": "/Portal",
	"/panel": "/Dashboard",
	"/admin": "/Dashboard",
	"/overview": "/Dashboard",
	"/mit": "/License",
	"/licensing": "/License",
	"/news": "/Blog",
	"/articles": "/Blog",
	"/posts": "/Blog",
	"/updates": "/Blog",
	"/changelog": "/Blog",
	"/callback": "/OAuth/Success",
	"/oauth-callback": "/OAuth/Success",
	"/auth-callback": "/OAuth/Success"
};
var CanonicalizePath = (Path) => {
	const Clean = Path === "/" ? "/" : Path.replace(/\/+$/, "");
	const Lower = Clean.toLowerCase();
	return PascalCaseCanonical[Clean] ?? PascalCaseCanonical[Lower] ?? SemanticAlias[Clean] ?? SemanticAlias[Lower] ?? RouteByCase(Clean)?.Path ?? Clean;
};
var SegmentCases = (Segment) => {
	const Lower = Segment.toLowerCase();
	const Upper = Segment.toUpperCase();
	const Title = Segment.charAt(0).toUpperCase() + Segment.slice(1).toLowerCase();
	return [.../* @__PURE__ */ new Set([
		Lower,
		Upper,
		Segment,
		Title
	])];
};
var SegmentNumber = (Lower) => {
	const Result = /* @__PURE__ */ new Set([Lower]);
	if (Lower.endsWith("ies") && Lower.length > 4) Result.add(Lower.slice(0, -3) + "y");
	else if (/(?:ses|xes|zes|ches|shes)$/.test(Lower)) Result.add(Lower.slice(0, -2));
	else if (Lower.endsWith("s") && !/(?:ss|us|is)$/.test(Lower) && Lower.length > 2) Result.add(Lower.slice(0, -1));
	if (!Lower.endsWith("s")) Result.add(Lower + "s");
	return [...Result];
};
var SegmentCompound = (Segment) => {
	const Words = Segment.match(/[A-Z][a-z]*/g);
	if (!Words || Words.length < 2) return [];
	const Lower = Words.map((W) => W.toLowerCase());
	return [
		Lower.join("-"),
		Lower.join("_"),
		Lower.join(""),
		Lower.join(".")
	];
};
var GeneratePathVariant = (CanonicalPath) => {
	if (CanonicalPath === "/") return [];
	const Segments = CanonicalPath.slice(1).split("/");
	const Result = /* @__PURE__ */ new Set();
	if (Segments.length === 1) {
		const Seg = Segments[0];
		const Lower = Seg.toLowerCase();
		for (const C of SegmentCases(Seg)) Result.add("/" + C);
		for (const N of SegmentNumber(Lower)) {
			Result.add("/" + N);
			Result.add("/" + N.toUpperCase());
		}
		for (const V of SegmentCompound(Seg)) Result.add("/" + V);
	} else {
		const LowerSegs = Segments.map((S) => S.toLowerCase());
		Result.add("/" + LowerSegs.join("/"));
		Result.add("/" + Segments.map((S) => S.toUpperCase()).join("/"));
		for (let I = 0; I < Segments.length; I++) {
			const Seg = Segments[I];
			for (const C of SegmentCases(Seg)) {
				const Parts = [...LowerSegs];
				Parts[I] = C;
				Result.add("/" + Parts.join("/"));
			}
			for (const V of SegmentCompound(Seg)) {
				const Parts = [...LowerSegs];
				Parts[I] = V;
				Result.add("/" + Parts.join("/"));
			}
		}
		Result.add("/" + LowerSegs.join(""));
		Result.add("/" + LowerSegs.join("-"));
		Result.add("/" + LowerSegs.join("_"));
	}
	for (const Path of [...Result]) if (!Path.endsWith("/")) Result.add(Path + "/");
	Result.delete(CanonicalPath);
	return [...Result];
};
export { ClaimsPath as a, SemanticAlias as i, CanonicalizePath as n, GeneratePathVariant as r, CanonicalPath as t };
