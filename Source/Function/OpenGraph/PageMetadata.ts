/**
 * Static page metadata for OpenGraph image generation.
 *
 * Maps slug paths to their title, description, and section for the
 * OG image SVG template. Status / License / Target are the field-record
 * info lines rendered on the artifact card (STATUS: / LICENSE: / TARGET:).
 * Blog and Doc entries are resolved dynamically from content collections
 * in the endpoint; this covers static pages.
 */

import { Requests } from "../../Library/Contact/Request.js";

interface PageMeta {
	Title: string;

	Description: string;

	Section?: string;

	Status?: string;

	License?: string;

	Target?: string;
}

const PageMetadata: Record<string, PageMeta> = {
	"": {
		Title: "Land | The Next-Generation Code Editor",

		Description:
			"A high-performance, resource-efficient code editor built with Rust and Tauri. Experience VS Code compatibility without the Electron bloat.",

		Section: "Home",
	},

	Download: {
		Title: "Download Land",

		Description:
			"Download Land for Windows, macOS, and Linux. Free and open-source.",

		Section: "Download",

		Status: "READY",

		License: "CC0",

		Target: "MACOS / WINDOWS / LINUX",
	},

	Blog: {
		Title: "Blog | Code Editor Land",

		Description:
			"Updates, tutorials, and insights from the Code Editor Land team.",

		Section: "Blog",

		Status: "READY",

		License: "CC0",

		Target: "PUBLIC",
	},

	Specimen: {
		Title: "Specimen | Code Editor Land",

		Description:
			"The document's own parts, printed: twelve components at 1:1 with their contracts, three stated absences, the nine adverse states, and the six things the site is printed with.",

		Section: "Specimen",

		Status: "VERIFIED",

		License: "CC0",

		Target: "PUBLIC",
	},

	Doc: {
		Title: "Documentation | Code Editor Land",

		Description:
			"Guides, API references, and tutorials for Code Editor Land.",

		Section: "Doc",

		Status: "READY",

		License: "CC0",

		Target: "GUIDES / API / REFERENCE",
	},

	Portal: {
		Title: "Portal | Code Editor Land",

		Description:
			"Sign in to your Code Editor Land account. Manage settings, sync, and cloud features.",

		Section: "Portal",

		Status: "READY",

		License: "CC0",

		Target: "CLOUD / SYNC",
	},

	Contributing: {
		Title: "Contributing | Code Editor Land",

		Description:
			"Learn how to contribute to Code Editor Land. Guidelines, setup, and community resources.",

		Section: "Contributing",

		Status: "READY",

		License: "CC0",

		Target: "GITHUB",
	},

	License: {
		Title: "License | Code Editor Land",

		Description:
			"Code Editor Land licensing information. CC0 1.0 Universal public domain dedication.",

		Section: "License",

		Status: "PUBLIC DOMAIN",

		License: "CC0",

		Target: "CC0 1.0",
	},

	Dashboard: {
		Title: "Dashboard | Code Editor Land",

		Description:
			"Your Code Editor Land dashboard. Manage your account and settings.",

		Section: "Dashboard",

		Status: "READY",

		License: "CC0",

		Target: "ACCOUNT",
	},

	"Contact/Sale": {
		Title: "Contact Sales | Code Editor Land",

		Description:
			"Get in touch with our sales team for enterprise licensing and support.",

		Section: "Contact",

		Status: "READY",

		License: "CC0",

		Target: "SALES",
	},

	"Account/SignIn": {
		Title: "Sign In | Code Editor Land",

		Description: "Sign in to your Code Editor Land account.",

		Section: "Account",

		Status: "READY",

		License: "CC0",

		Target: "ACCOUNT",
	},

	"Account/SignUp": {
		Title: "Sign Up | Code Editor Land",

		Description: "Create a new Code Editor Land account.",

		Section: "Account",

		Status: "READY",

		License: "CC0",

		Target: "ACCOUNT",
	},

	"Account/ForgotPassword": {
		Title: "Forgot Password | Code Editor Land",

		Description: "Reset your Code Editor Land account password.",

		Section: "Account",

		Status: "READY",

		License: "CC0",

		Target: "ACCOUNT",
	},

	"Account/ResetPassword": {
		Title: "Reset Password | Code Editor Land",

		Description: "Set a new password for your Code Editor Land account.",

		Section: "Account",

		Status: "READY",

		License: "CC0",

		Target: "ACCOUNT",
	},

	"Legal/Term": {
		Title: "Terms of Service | Code Editor Land",

		Description: "Code Editor Land terms of service and usage agreement.",

		Section: "Legal",

		Status: "READY",

		License: "CC0",

		Target: "LEGAL",
	},

	"Legal/Privacy": {
		Title: "Privacy Policy | Code Editor Land",

		Description:
			"Code Editor Land privacy policy. How we handle your data.",

		Section: "Legal",

		Status: "READY",

		License: "CC0",

		Target: "LEGAL",
	},

	Verify: {
		Title: "Verify Email | Code Editor Land",

		Description: "Verify your Code Editor Land email address.",

		Section: "Account",

		Status: "READY",

		License: "CC0",

		Target: "EMAIL",
	},

	Visit: {
		Title: "Visit | Code Editor Land",

		Description: "Explore Code Editor Land features and capabilities.",

		Section: "Visit",

		Status: "READY",

		License: "CC0",

		Target: "FEATURES",
	},

	/**
	 * The index. It is a reference page, so its card names the three things the
	 * page is: the forms, the routes and the extent - not a product claim.
	 */
	Contents: {
		Title: "Contents | Code Editor Land",

		Description:
			"The index of this document: every information type and the form it takes, every address the build answers on, and the extent of the tree.",

		Section: "Contents",

		Status: "VERIFIED",

		License: "CC0",

		Target: "FORMS / ROUTES / REGISTER",
	},

	/**
	 * The motion register. Its card names the three figures the page is built
	 * from - classes, intervals, curves - because the page's whole claim is that
	 * the paper moves in thirteen named ways and no more.
	 */
	Motion: {
		Title: "Motion | Code Editor Land",

		Description:
			"The paper's motion register: thirteen interaction classes, three intervals, three curves, the artifact each one is for, and the nine adverse states this document prints without moving at all.",

		Section: "Motion",

		Status: "VERIFIED",

		License: "CC0",

		Target: "CLASSES / INTERVALS / CURVES",
	},

	/**
	 * The status board. Its card names the four columns, because the board's
	 * whole answer is its shape: sixteen in force, four on the way, none
	 * retired, one claimed and not measured.
	 */
	Status: {
		Title: "Status | Code Editor Land",

		Description:
			"Every record this site files with a state, under the four columns of the state vocabulary: what is in force, what is on the way, what is retired, and what is claimed but not measured.",

		Section: "Status",

		Status: "ACTIVE",

		License: "CC0",

		Target: "IN FORCE / ON THE WAY / RETIRED / NOT MEASURED",
	},

	/**
	 * The lexicon. A reference page's card says what it defines, not what it
	 * claims - the page makes no claim.
	 */
	Glossary: {
		Title: "Glossary | Code Editor Land",

		Description:
			"The document's own words: the fifteen elements, the grammar's nouns, and the five words this site used and retired.",

		Section: "Glossary",

		Status: "READY",

		License: "CC0",

		Target: "ELEMENTS / GRAMMAR / RETIRED",
	},

	/**
	 * The comparison. The card names the two things the page has: eight
	 * substitutions and one measurement.
	 */
	Compare: {
		Title: "Compare | Code Editor Land",

		Description:
			"Land against the editor it replaces, aspect by aspect: eight substitutions quoted from the project's own document, what carries over, and the five figures nobody has measured.",

		Section: "Compare",

		Status: "ACTIVE",

		License: "CC0",

		Target: "8 SUBSTITUTIONS / 1 MEASURE",
	},

	/** The account hub - the one account route the table did not carry. */
	Account: {
		Title: "Account | Code Editor Land",

		Description:
			"Your Code Editor Land account: sign in, register, recover a password.",

		Section: "Account",

		Status: "READY",

		License: "CC0",

		Target: "ACCOUNT",
	},

	/** The Rust API reference, which is its own route rather than a doc entry. */
	"Doc/Rust": {
		Title: "Rust API Documentation | Code Editor Land",

		Description:
			"The generated Rust API documentation for the Land crates.",

		Section: "Doc",

		Status: "READY",

		License: "CC0",

		Target: "RUSTDOC",
	},

	"OAuth/Success": {
		Title: "Authentication Successful | Code Editor Land",

		Description: "Your Code Editor Land sign-in completed.",

		Section: "Account",

		Status: "READY",

		License: "CC0",

		Target: "OAUTH",
	},

	/**
	 * The contact hub itself. Its fourteen request routes are added below from
	 * `Library/Contact/Request.ts` - the registry the hub, the shell and the
	 * dashboard already read - so a request route's share card cannot disagree
	 * with the page it shares.
	 */
	Contact: {
		Title: "Contact | Code Editor Land",

		Description:
			"Fourteen request routes, each a code: correct your data, claim a record, erase it, pause processing.",

		Section: "Contact",

		Status: "READY",

		License: "CC0",

		Target: "REQUESTS",
	},
};

/**
 * The thirteen request routes, derived from the registry.
 *
 * Each one is a page whose whole content is `<ContactShell code="AMEND" />`, so
 * its title and its sentence live in `Request.ts` and nowhere else. Writing them
 * again here would be the second copy that drifts - and this table had already
 * drifted: thirteen routes had no share card at all, which is a page that looks
 * unloved the moment someone pastes its link.
 */
for (const Request of Object.values(Requests)) {
	PageMetadata[
		`Contact/${Request.Code.charAt(0)}${Request.Code.slice(1).toLowerCase()}`
	] = {
		Title: `${Request.Title} | Code Editor Land`,

		Description: Request.Subtitle,

		Section: "Contact",

		Status: "READY",

		License: "CC0",

		Target: Request.Article ?? "REQUEST",
	};
}

export default PageMetadata;
