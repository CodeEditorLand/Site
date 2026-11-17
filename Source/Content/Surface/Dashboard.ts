/**
 * Dashboard - the dashboard page's content table.
 *
 * The page renders authenticated surfaces, but almost everything it *states*
 * about the account is server-known: which tiers exist, what the editor
 * connection is called when it is absent, what the build configuration holds,
 * how long a data request takes. Those facts are rows here. The one thing the
 * page cannot know server-side is who is signed in, so the account band hosts
 * the Auth0 island and this table carries only its heading and its copy.
 *
 * Two rules this module keeps:
 *
 * - It takes `T` and never imports the i18n client; the page resolves the
 *   translator and hands it in.
 * - Every value is a value the page already printed. Nothing here invents a
 *   plan, a usage figure or an account field - a row that has no source in the
 *   page's own copy does not exist.
 *
 * Band order is the page's own order: account first (the reason the reader
 * came), then access, data rights, the tooling the page reports, the editor
 * connection, settings, the exits, and the attribution.
 */
import type { TFunction } from "i18next";

import type {
	Band,
	Entry,
	LedgerRow,
	Stage,
} from "../../Component/Record/Type.js";

/** One labelled block of the page's copy: a heading, and the facts under it. */
export interface DashboardSurface {
	/** The page's single `h1`. */
	readonly title: string;

	/** `# DASHBOARD_01` - the page's record marker. */
	readonly index: string;

	/** One sentence under the `h1`. */
	readonly standfirst: string;

	/**
	 * The status ledger at the top of the page. Only fields the page actually
	 * has: the account itself is client-side, so it is not a row here - it is
	 * the first band.
	 */
	readonly status: readonly LedgerRow[];

	/** The account band: heading and copy around the Auth0 island. */
	readonly account: Band;

	/** The access band: the four tiers, as an ordered rail. */
	readonly access: Band;

	/** The tier rail itself. */
	readonly accessStages: readonly Stage[];

	/** The data-rights band: heading and copy around the request island. */
	readonly data: Band;

	/** The build-configuration band. */
	readonly build: Band;

	/** The build facts, twelve rows of them. */
	readonly buildFacts: readonly LedgerRow[];

	/** The telemetry band. */
	readonly telemetry: Band;

	/** The three telemetry paths, one record each. */
	readonly telemetryPaths: readonly Entry[];

	/** The editor-connection band. */
	readonly editor: Band;

	/** `Not Connected` - the state the page reports when no daemon answers. */
	readonly editorStatus: string;

	/** The connection's own facts: daemon, state, transport, cloud dependency. */
	readonly editorFacts: readonly LedgerRow[];

	/** What the connection does, and what it needs. */
	readonly editorDescription: readonly string[];

	/** The two things the reader can do about an absent daemon. */
	readonly editorActions: readonly {
		readonly label: string;
		readonly href: string;
	}[];

	/** The settings band. */
	readonly settings: Band;

	/** The three settings rows. */
	readonly settingsEntries: readonly Entry[];

	/** The exits band: downloads, docs, the issue tracker, contributing. */
	readonly start: Band;

	/** The four exits. */
	readonly startEntries: readonly Entry[];

	/** The attribution band. */
	readonly partners: Band;

	/** The three attributed organisations. */
	readonly partnersEntries: readonly Entry[];
}

/** The page's copy, resolved once. */
export const DashboardPage = (T: TFunction): DashboardSurface => {
	const Copy = {
		Title: T("common.dashboard.pageTitle", { defaultValue: "Dashboard" }),
		Subtitle: T("common.dashboard.pageSubtitle", {
			defaultValue:
				"Your Land account, downloads, and editor connection.",
		}),
		Account: T("common.dashboard.account.heading", {
			defaultValue: "Account",
		}),
		Access: T("common.dashboard.portal.heading", {
			defaultValue: "Authentication Tiers",
		}),
		AccessSubtitle: T("common.dashboard.portal.subtitle", {
			defaultValue:
				"Your current authentication method and available tiers.",
		}),
		Data: T("common.dashboard.privacy.heading", {
			defaultValue: "Privacy & Data Rights",
		}),
		DataSubtitle: T("common.dashboard.privacy.subtitle", {
			defaultValue:
				"Exercise your GDPR rights, request data exports, or delete your account. All requests are sent directly to our privacy team and handled within 30 days.",
		}),
		Build: T("common.dashboard.buildLog.heading", {
			defaultValue: "Build Configuration",
		}),
		BuildSubtitle: T("common.dashboard.buildLog.subtitle", {
			defaultValue:
				"Active build variant and deployment mode.\n\nAvailable via Local-First Air Daemon connection.",
		}),
		Telemetry: T("common.dashboard.telemetry.heading", {
			defaultValue: "Telemetry Architecture",
		}),
		Editor: T("common.dashboard.editor.heading", {
			defaultValue: "Editor Connection",
		}),
		EditorSubtitle: T("common.dashboard.editor.subtitle", {
			defaultValue:
				"Connect the website to your running Land editor instance.",
		}),
		EditorStatus: T("common.dashboard.editor.status", {
			defaultValue: "Not Connected",
		}),
		EditorDescription: T("common.dashboard.editor.description", {
			defaultValue:
				"The Air Daemon connects this dashboard to a running Land editor via WebSocket.\n\nLaunch Land to enable real-time build logs, telemetry, and configuration management.",
		}),
		Settings: T("common.dashboard.settings.heading", {
			defaultValue: "Settings",
		}),
		Partners: T("common.dashboard.partners.heading", {
			defaultValue: "Partners & Attribution",
		}),
		ComingSoon: T("common.comingSoon", { defaultValue: "Coming Soon" }),
	};

	/** One line of copy from the surface namespace, with its English default. */
	const Surface = (Name: string, Fallback: string): string =>
		T(`account:dashboardPage.surface.${Name}`, { defaultValue: Fallback });

	return {
		title: Copy.Title,
		index: "# DASHBOARD_01",
		standfirst: Copy.Subtitle,
		status: [
			{ key: "ACCESS", value: "AUTH0 UNIVERSAL LOGIN", note: Copy.AccessSubtitle },
			{ key: "PLAN", value: "FREE / ENTERPRISE" },
			{ key: "DATA REQUESTS", value: "GDPR · ANSWERED WITHIN 30 DAYS" },
			{
				key: "EDITOR",
				value: Copy.EditorStatus.toUpperCase(),
				note: "Air Daemon · WebSocket loopback",
			},
			{ key: "TELEMETRY", value: "FEATURE GATED" },
			{ key: "BUILD", value: "PRODUCTION · MOUNTAIN · ESBUILD" },
			{ key: "TEST MATRIX", value: "16 VERIFIED PERMUTATIONS" },
		],
		account: {
			kicker: "/ACCOUNT",
			heading: Copy.Account,
			standfirst: Surface(
				"account",
				"Read from your Auth0 session in the browser. Signing in, signing out and data requests are unchanged.",
			),
			tone: "flush",
		},
		access: {
			kicker: "/ACCESS",
			heading: Copy.Access,
			standfirst: Copy.AccessSubtitle,
			footnote: Surface(
				"access.footnote",
				"Every tier is described on the portal page; this rail only shows which route your session uses.",
			),
			tone: "paper",
		},
		accessStages: [
			{ index: "01", label: "Cloud", line: "Auth0 · HTTPS / TLS 1.3", href: "/Portal" },
			{ index: "02", label: "Provider", line: "OAuth 2.0 · PKCE", href: "/Portal" },
			{
				index: "03",
				label: "Local-First",
				line: "mTLS · CRDTs · WebSocket",
				href: "/Portal",
			},
			{
				index: "04",
				label: "Enterprise",
				line: "OIDC · SAML 2.0 · SCIM",
				href: "/Portal",
			},
		],
		data: {
			kicker: "/DATA",
			heading: Copy.Data,
			standfirst: Copy.DataSubtitle,
			tone: "canvas",
		},
		build: {
			kicker: "/BUILD",
			heading: Copy.Build,
			standfirst: Copy.BuildSubtitle.split("\n\n").filter((Line) => Line.length > 0).join(" "),
			tone: "paper",
		},
		buildFacts: [
			{ key: "PROFILE", value: "production" },
			{ key: "WORKBENCH", value: "Mountain" },
			{ key: "FEATURES", value: "Active Source Path" },
			{ key: "COMPILER", value: "esbuild" },
			{ key: "MODE", value: "Production Release" },
			{ key: "NODE_ENV", value: "production" },
			{ key: "RUST_LOG", value: "info" },
			{ key: "BUNDLE", value: "Full" },
			{ key: "PROFILES", value: "9 named" },
			{ key: "WORKBENCHES", value: "5 variants" },
			{ key: "COMPILERS", value: "esbuild, OXC" },
			{ key: "PERMUTATIONS", value: "16 verified" },
		],
		telemetry: {
			kicker: "/TELEMETRY",
			heading: Copy.Telemetry,
			standfirst: Surface(
				"telemetry",
				"Three paths, one default: nothing leaves the process unless you build it in and point it somewhere.",
			),
			tone: "canvas",
		},
		telemetryPaths: [
			{
				index: "# 01",
				name: T("common.dashboard.telemetry.production.title", {
					defaultValue: "Feature-gated by build profile.",
				}),
				chips: ["Disabled", "Feature Gated"],
				body: T("common.dashboard.telemetry.production.description", {
					defaultValue:
						"Telemetry and tracing are behind named Rust feature gates. The build profile determines what is compiled in - nothing is emitted unless a specific feature path is enabled.",
				}),
			},
			{
				index: "# 02",
				name: T("common.dashboard.telemetry.otel.title", {
					defaultValue:
						"Opt-in OpenTelemetry. Your infrastructure only.",
				}),
				chips: ["Optional"],
				body: T("common.dashboard.telemetry.otel.description", {
					defaultValue:
						"OpenTelemetry tracing is available in source. Activating it requires an explicit feature flag and a configured endpoint - trace data goes only to infrastructure you control.",
				}),
			},
			{
				index: "# 03",
				name: T("common.dashboard.telemetry.effect.title", {
					defaultValue:
						"Extension host timing. Stays in the process.",
				}),
				chips: ["Active"],
				body: T("common.dashboard.telemetry.effect.description", {
					defaultValue:
						"Cocoon has internal timing and service diagnostics for extension-host work. Unless a transport is configured, that data is local process instrumentation.",
				}),
			},
		],
		editor: {
			kicker: "/EDITOR",
			heading: Copy.Editor,
			standfirst: Copy.EditorSubtitle,
			tone: "paper",
		},
		editorStatus: Copy.EditorStatus,
		editorFacts: [
			{ key: "DAEMON", value: "Air Daemon" },
			{ key: "STATUS", value: Copy.EditorStatus },
			{ key: "TRANSPORT", value: "mTLS · CRDTs · WebSocket" },
			{ key: "CLOUD DEPENDENCY", value: "Zero cloud dependency" },
		],
		editorActions: [
			{
				label: T("common.dashboard.editor.scanButton", {
					defaultValue: "Scan for Daemon",
				}),
				href: "/Dashboard?mode=local",
			},
			{
				label: T("common.dashboard.editor.connect", {
					defaultValue: "Connect via Portal",
				}),
				href: "/Portal",
			},
		],
		editorDescription: Copy.EditorDescription.split("\n\n").filter(
			(Line) => Line.length > 0,
		),
		settings: {
			kicker: "/SETTINGS",
			heading: Copy.Settings,
			standfirst: Surface(
				"settings",
				"Two settings are planned; the account page behind the third row is live.",
			),
			tone: "canvas",
		},
		settingsEntries: [
			{
				index: "# 01",
				name: T("common.dashboard.settings.sync.title", {
					defaultValue: "Sync Settings",
				}),
				chips: [Copy.ComingSoon],
				body: T("common.dashboard.settings.sync.description", {
					defaultValue:
						"Your editor preferences follow you across every device automatically.",
				}),
			},
			{
				index: "# 02",
				name: T("common.dashboard.settings.extensionSync.title", {
					defaultValue: "Extension Sync",
				}),
				chips: [Copy.ComingSoon],
				body: T("common.dashboard.settings.extensionSync.description", {
					defaultValue:
						"Your installed extensions stay in sync across all machines.",
				}),
			},
			{
				index: "# 03",
				name: T("common.dashboard.settings.account.title", {
					defaultValue: "Account",
				}),
				href: "/Account",
				body: T("common.dashboard.settings.account.description", {
					defaultValue: "Update your profile and manage your account.",
				}),
			},
		],
		start: {
			kicker: "/START",
			heading: Surface("start.heading", "Downloads & Quick Links"),
			standfirst: Surface(
				"start",
				"Where the account ends and the rest of the site begins.",
			),
			tone: "paper",
		},
		startEntries: [
			{
				index: "# 01",
				name: T("common.dashboard.downloads.goButton", {
					defaultValue: "Go to Downloads",
				}),
				href: "/Download",
				body: T("common.dashboard.downloads.description", {
					defaultValue:
						"Get the latest Land build for your platform. Native on macOS, Windows, and Linux.",
				}),
			},
			{
				index: "# 02",
				name: T("common.dashboard.quickLinks.docs", {
					defaultValue: "Documentation",
				}),
				href: "/Doc",
				body: Surface(
					"start.docs",
					"The reference for every element, protocol and platform Land implements.",
				),
			},
			{
				index: "# 03",
				name: T("common.dashboard.quickLinks.reportIssue", {
					defaultValue: "Report an Issue",
				}),
				href: "https://github.com/CodeEditorLand/Land/issues",
				body: Surface(
					"start.issue",
					"Opens the Land issue tracker on GitHub in a new tab.",
				),
			},
			{
				index: "# 04",
				name: T("common.dashboard.quickLinks.contribute", {
					defaultValue: "Contribute",
				}),
				href: "/Contributing",
				body: Surface(
					"start.contribute",
					"How to build Land from source and send a change back.",
				),
			},
			{
				index: "# 05",
				name: T("common.breadcrumb.home", { defaultValue: "Home" }),
				href: "/",
				body: Surface(
					"start.home",
					"Returns to the site's front page.",
				),
			},
		],
		partners: {
			kicker: "/PARTNERS",
			heading: Copy.Partners,
			standfirst: Surface(
				"partners",
				"The organisations that host and fund the work.",
			),
			tone: "canvas",
		},
		partnersEntries: [
			{
				index: "# 01",
				name: "Code Editor Land",
				href: "https://github.com/CodeEditorLand",
				body: "Organization · GitHub",
			},
			{
				index: "# 02",
				name: "PlayForm",
				href: "https://PlayForm.Cloud",
				body: "Platform · PlayForm.Cloud",
			},
			{
				index: "# 03",
				name: "NLnet Foundation",
				href: "https://nlnet.nl/project/Land/",
				body: "NGI0 Commons Fund",
			},
		],
	};
};
