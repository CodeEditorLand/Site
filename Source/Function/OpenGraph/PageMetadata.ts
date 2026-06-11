/**
 * Static page metadata for OpenGraph image generation.
 *
 * Maps slug paths to their title, description, and section for the
 * OG image SVG template. Blog and Doc entries are resolved dynamically
 * from content collections in the endpoint; this covers static pages.
 */

interface PageMeta {
	Title: string;

	Description: string;

	Section?: string;
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
	},

	Blog: {
		Title: "Blog | Code Editor Land",

		Description:
			"Updates, tutorials, and insights from the Code Editor Land team.",

		Section: "Blog",
	},

	Doc: {
		Title: "Documentation | Code Editor Land",

		Description:
			"Guides, API references, and tutorials for Code Editor Land.",

		Section: "Doc",
	},

	Portal: {
		Title: "Portal | Code Editor Land",

		Description:
			"Sign in to your Code Editor Land account. Manage settings, sync, and cloud features.",

		Section: "Portal",
	},

	Contributing: {
		Title: "Contributing | Code Editor Land",

		Description:
			"Learn how to contribute to Code Editor Land. Guidelines, setup, and community resources.",

		Section: "Contributing",
	},

	License: {
		Title: "License | Code Editor Land",

		Description:
			"Code Editor Land licensing information. CC0 1.0 Universal public domain dedication.",

		Section: "License",
	},

	Dashboard: {
		Title: "Dashboard | Code Editor Land",

		Description:
			"Your Code Editor Land dashboard. Manage your account and settings.",

		Section: "Dashboard",
	},

	"Contact/Sale": {
		Title: "Contact Sales | Code Editor Land",

		Description:
			"Get in touch with our sales team for enterprise licensing and support.",

		Section: "Contact",
	},

	"Account/SignIn": {
		Title: "Sign In | Code Editor Land",

		Description: "Sign in to your Code Editor Land account.",

		Section: "Account",
	},

	"Account/SignUp": {
		Title: "Sign Up | Code Editor Land",

		Description: "Create a new Code Editor Land account.",

		Section: "Account",
	},

	"Account/ForgotPassword": {
		Title: "Forgot Password | Code Editor Land",

		Description: "Reset your Code Editor Land account password.",

		Section: "Account",
	},

	"Account/ResetPassword": {
		Title: "Reset Password | Code Editor Land",

		Description: "Set a new password for your Code Editor Land account.",

		Section: "Account",
	},

	"Legal/Term": {
		Title: "Terms of Service | Code Editor Land",

		Description: "Code Editor Land terms of service and usage agreement.",

		Section: "Legal",
	},

	"Legal/Privacy": {
		Title: "Privacy Policy | Code Editor Land",

		Description:
			"Code Editor Land privacy policy. How we handle your data.",

		Section: "Legal",
	},

	Verify: {
		Title: "Verify Email | Code Editor Land",

		Description: "Verify your Code Editor Land email address.",

		Section: "Account",
	},

	Visit: {
		Title: "Visit | Code Editor Land",

		Description: "Explore Code Editor Land features and capabilities.",

		Section: "Visit",
	},
};

export default PageMetadata;
