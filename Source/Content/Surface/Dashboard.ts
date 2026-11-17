/**
 * Dashboard - the dashboard page's content table.
 *
 * The page renders authenticated surfaces, but almost everything it *states*
 * about the account is server-known: which tiers exist, what the editor
 * connection is called when it is absent, what the build configuration holds,
 * how long a data request takes. Those facts are rows here. The one thing the
 * page cannot know server-side is who is signed in, so the account panel hosts
 * the Auth0 island and this table carries only its heading.
 *
 * Two rules this module keeps:
 *
 * - It takes `T` and never imports the i18n client; the page resolves the
 *   translator and hands it in.
 * - Every value is a value the page already printed. Nothing here invents a
 *   plan, a usage figure or an account field - a row that has no source in the
 *   page's own copy does not exist.
 *
 * Section order is the page's own order: the opening grid (account, downloads,
 * quick links), then telemetry, the build configuration, the four tiers, the
 * editor connection, the partners, the data-rights directory, and settings.
 * The separators are U+2001 (EM QUAD), written as escapes so no editor can
 * fold them into a middle dot, which `DESIGN.md` §1.5 forbids.
 */
import type { TFunction } from "i18next";

import type { BadgeTone } from "../../Component/Surface/Badge.js";

/** The field-record separator: U+2001, never U+00B7. */
const Quad = "\u2001";

/** A state word and the tint it carries. */
export interface DashboardBadge {
	/** `Disabled`, `Online`, `Coming Soon`. */
	readonly label: string;

	/** The semantic token the badge is tinted from. */
	readonly tone: BadgeTone;

	/** Whether the badge reports a live state and so carries its dot. */
	readonly dot?: boolean;
}

/** One telemetry path: its badges, its sentence, and what it does. */
export interface TelemetryPath {
	/** `Disabled` + `Feature Gated`, or `Optional`, or `Active`. */
	readonly badges: readonly DashboardBadge[];

	/** `Feature-gated by build profile.` - the row's `h3`. */
	readonly heading: string;

	/** The sentence under it, with its terms badged. */
	readonly text: string;
}

/** One key/value row inside a build-configuration card. */
export interface BuildRow {
	/** `Profile`, `Workbench`, `Permutations`. */
	readonly key: string;

	/** `production`, `Mountain`, `16 verified`. */
	readonly value: string;

	/** Print the value as a code token. */
	readonly mono?: boolean;

	/** Print the value at medium weight. */
	readonly strong?: boolean;
}

/** One build-configuration card. */
export interface BuildCard {
	/** `Active Profile`, `Deployment Mode`, `Test Matrix`. */
	readonly title: string;

	/** `Recommended`, `Active`, `16 Permutations`. */
	readonly badge: DashboardBadge;

	/** The four rows the card justifies. */
	readonly rows: readonly BuildRow[];
}

/** One authentication tier, as a link card. */
export interface TierCard {
	/** `Cloud`, `Provider`, `Local-First`, `Enterprise`. */
	readonly title: string;

	/** `Auth0 / HTTPS / TLS 1.3`, em-quad separated. */
	readonly protocol: string;

	/** `Online`, `OAuth`, `Local`, `SSO`. */
	readonly badge: DashboardBadge;

	/** The glyph in the pastel tile. */
	readonly glyph: string;

	/** The tile's pastel classes. */
	readonly tile: string;

	/** The glyph's ink. */
	readonly ink: string;

	/** The border the card takes on hover. */
	readonly hover: string;
}

/** One partner card. */
export interface PartnerCard {
	/** `Code Editor Land`, `PlayForm`, `NLnet Foundation`. */
	readonly name: string;

	/** `Organization / GitHub`, em-quad separated. */
	readonly line: string;

	/** Where the card goes. */
	readonly href: string;

	/** The logo the card prints, when it has one. */
	readonly logo?: string;

	/** The two-letter tile the card prints instead of a logo. */
	readonly tile?: string;
}

/** One row of the settings card. */
export interface SettingsRow {
	/** `Sync Settings`, `Extension Sync`, `Account`. */
	readonly title: string;

	/** One sentence: what the setting does. */
	readonly body: string;

	/** `Coming Soon`, when the row is not live. */
	readonly badge?: DashboardBadge;

	/** `Manage`, when the row is live. */
	readonly action?: {
		readonly label: string;
		readonly href: string;
	};
}

/** One quick link in the opening grid. */
export interface QuickLink {
	/** `Documentation`, `Report an Issue`, `Contribute`. */
	readonly label: string;

	/** Where it goes. */
	readonly href: string;
}

/** The whole page, resolved. */
export interface DashboardSurface {
	/** The page's single `h1`. */
	readonly title: string;

	/** One sentence under the `h1`. */
	readonly standfirst: string;

	/** The four badges in the header run. */
	readonly badges: readonly DashboardBadge[];

	/** The downloads panel: one button and one line. */
	readonly downloads: {
		readonly label: string;
		readonly href: string;
		readonly line: string;
	};

	/** The three quick links. */
	readonly quickLinks: readonly QuickLink[];

	/** The telemetry section: three paths in one wide card. */
	readonly telemetry: {
		readonly heading: string;
		readonly paths: readonly TelemetryPath[];
	};

	/** The build-configuration section: three cards in one grid. */
	readonly build: {
		readonly heading: string;
		readonly subtitle: string;
		readonly cards: readonly BuildCard[];
	};

	/** The tier section: four link cards in one grid. */
	readonly tiers: {
		readonly heading: string;
		readonly subtitle: string;
		readonly cards: readonly TierCard[];
	};

	/** The editor-connection section: one card. */
	readonly editor: {
		readonly heading: string;
		readonly subtitle: string;
		readonly name: string;
		readonly status: string;
		readonly text: string;
		readonly scan: {
			readonly label: string;
			readonly href: string;
		};
		readonly connect: {
			readonly label: string;
			readonly href: string;
		};
		readonly note: string;
	};

	/** The partners section: three cards in one grid. */
	readonly partners: {
		readonly heading: string;
		readonly cards: readonly PartnerCard[];
	};

	/** The data-rights section: one heading and one sentence over the directory. */
	readonly privacy: {
		readonly heading: string;
		readonly subtitle: string;
	};

	/** The settings section: three rows in one card. */
	readonly settings: {
		readonly heading: string;
		readonly rows: readonly SettingsRow[];
	};
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
		Downloads: "Downloads",
		QuickLinks: "Quick Links",
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

	return {
		title: Copy.Title,
		standfirst: Copy.Subtitle,
		badges: [
			{ label: "Telemetry Feature Gated", tone: "grpc", dot: true },
			{ label: "CC0 Licensed", tone: "mute" },
			{ label: "Signing Planned", tone: "mute" },
			{ label: "Mountain Workbench", tone: "ipc", dot: true },
		],
		downloads: {
			label: T("common.dashboard.downloads.goButton", {
				defaultValue: "Go to Downloads",
			}),
			href: "/Download",
			line: T("common.dashboard.downloads.description", {
				defaultValue:
					"Get the latest Land build for your platform. Native on macOS, Windows, and Linux.",
			}),
		},
		quickLinks: [
			{
				label: T("common.dashboard.quickLinks.docs", {
					defaultValue: "Documentation",
				}),
				href: "/Doc",
			},
			{
				label: T("common.dashboard.quickLinks.reportIssue", {
					defaultValue: "Report an Issue",
				}),
				href: "https://github.com/CodeEditorLand/Land/issues",
			},
			{
				label: T("common.dashboard.quickLinks.contribute", {
					defaultValue: "Contribute",
				}),
				href: "/Contributing",
			},
		],
		telemetry: {
			heading: Copy.Telemetry,
			paths: [
				{
					badges: [
						{ label: "Disabled", tone: "grpc", dot: true },
						{ label: "Feature Gated", tone: "mute" },
					],
					heading: T("common.dashboard.telemetry.production.title", {
						defaultValue: "Feature-gated by build profile.",
					}),
					text: T(
						"common.dashboard.telemetry.production.description",
						{
							defaultValue:
								"Telemetry and tracing are behind named Rust feature gates. The build profile determines what is compiled in - nothing is emitted unless a specific feature path is enabled.",
						},
					),
				},
				{
					badges: [{ label: "Optional", tone: "tauri", dot: true }],
					heading: T("common.dashboard.telemetry.otel.title", {
						defaultValue:
							"Opt-in OpenTelemetry. Your infrastructure only.",
					}),
					text: T("common.dashboard.telemetry.otel.description", {
						defaultValue:
							"OpenTelemetry tracing is available in source. Activating it requires an explicit feature flag and a configured endpoint - trace data goes only to infrastructure you control.",
					}),
				},
				{
					badges: [{ label: "Active", tone: "ipc", dot: true }],
					heading: T("common.dashboard.telemetry.effect.title", {
						defaultValue:
							"Extension host timing. Stays in the process.",
					}),
					text: T("common.dashboard.telemetry.effect.description", {
						defaultValue:
							"Cocoon has internal timing and service diagnostics for extension-host work. Unless a transport is configured, that data is local process instrumentation.",
					}),
				},
			],
		},
		build: {
			heading: Copy.Build,
			subtitle: Copy.BuildSubtitle.split("\n\n")
				.filter((Line) => Line.length > 0)
				.join(" "),
			cards: [
				{
					title: "Active Profile",
					badge: { label: "Recommended", tone: "ipc", dot: true },
					rows: [
						{ key: "Profile", value: "production", mono: true },
						{ key: "Workbench", value: "Mountain", strong: true },
						{ key: "Features", value: "Active Source Path" },
						{ key: "Compiler", value: "esbuild", mono: true },
					],
				},
				{
					title: "Deployment Mode",
					badge: { label: "Active", tone: "grpc", dot: true },
					rows: [
						{
							key: "Mode",
							value: "Production Release",
							strong: true,
						},
						{ key: "NODE_ENV", value: "production", mono: true },
						{ key: "RUST_LOG", value: "info", mono: true },
						{ key: "Bundle", value: "Full" },
					],
				},
				{
					title: "Test Matrix",
					badge: { label: "16 Permutations", tone: "mute" },
					rows: [
						{ key: "Profiles", value: "9 named" },
						{ key: "Workbenches", value: "5 variants" },
						{ key: "Compilers", value: "esbuild, OXC" },
						{
							key: "Permutations",
							value: "16 verified",
							strong: true,
						},
					],
				},
			],
		},
		tiers: {
			heading: Copy.Access,
			subtitle: Copy.AccessSubtitle,
			cards: [
				{
					title: "Cloud",
					protocol: ["Auth0", "HTTPS / TLS 1.3"].join(` ${Quad} `),
					badge: { label: "Online", tone: "ipc", dot: true },
					glyph: "☁",
					tile: "bg-blue-50 border-blue-200",
					ink: "text-blue-600",
					hover: "hover:border-blue-300",
				},
				{
					title: "Provider",
					protocol: ["OAuth 2.0", "PKCE"].join(` ${Quad} `),
					badge: { label: "OAuth", tone: "wasm", dot: true },
					glyph: "♧",
					tile: "bg-purple-50 border-purple-200",
					ink: "text-purple-600",
					hover: "hover:border-purple-300",
				},
				{
					title: "Local-First",
					protocol: ["mTLS", "CRDTs", "WebSocket"].join(` ${Quad} `),
					badge: { label: "Local", tone: "tcp", dot: true },
					glyph: "⚙",
					tile: "bg-orange-50 border-orange-200",
					ink: "text-orange-600",
					hover: "hover:border-orange-300",
				},
				{
					title: "Enterprise",
					protocol: ["OIDC", "SAML 2.0", "SCIM"].join(` ${Quad} `),
					badge: { label: "SSO", tone: "grpc", dot: true },
					glyph: "☋",
					tile: "bg-green-50 border-green-200",
					ink: "text-green-600",
					hover: "hover:border-green-300",
				},
			],
		},
		editor: {
			heading: Copy.Editor,
			subtitle: Copy.EditorSubtitle,
			name: "Air Daemon",
			status: Copy.EditorStatus,
			text: Copy.EditorDescription,
			scan: {
				label: T("common.dashboard.editor.scanButton", {
					defaultValue: "Scan for Daemon",
				}),
				href: "/Dashboard?mode=local",
			},
			connect: {
				label: T("common.dashboard.editor.connect", {
					defaultValue: "Connect via Portal",
				}),
				href: "/Portal",
			},
			note: ["mTLS", "CRDTs", "WebSocket", "Zero cloud dependency"].join(
				` ${Quad} `,
			),
		},
		partners: {
			heading: Copy.Partners,
			cards: [
				{
					name: "Code Editor Land",
					line: ["Organization", "GitHub"].join(` ${Quad} `),
					href: "https://github.com/CodeEditorLand",
					logo: "/Asset/Logo/Glyph/Land.svg",
				},
				{
					name: "PlayForm",
					line: ["Platform", "PlayForm.Cloud"].join(` ${Quad} `),
					href: "https://PlayForm.Cloud",
					logo: "/Image/PlayForm.svg",
				},
				{
					name: "NLnet Foundation",
					line: "NGI0 Commons Fund",
					href: "https://nlnet.nl/project/Land/",
					tile: "NL",
				},
			],
		},
		privacy: {
			heading: Copy.Data,
			subtitle: Copy.DataSubtitle,
		},
		settings: {
			heading: Copy.Settings,
			rows: [
				{
					title: T("common.dashboard.settings.sync.title", {
						defaultValue: "Sync Settings",
					}),
					body: T("common.dashboard.settings.sync.description", {
						defaultValue:
							"Your editor preferences follow you across every device automatically.",
					}),
					badge: { label: Copy.ComingSoon, tone: "mute" },
				},
				{
					title: T("common.dashboard.settings.extensionSync.title", {
						defaultValue: "Extension Sync",
					}),
					body: T(
						"common.dashboard.settings.extensionSync.description",
						{
							defaultValue:
								"Your installed extensions stay in sync across all machines.",
						},
					),
					badge: { label: Copy.ComingSoon, tone: "mute" },
				},
				{
					title: T("common.dashboard.settings.account.title", {
						defaultValue: "Account",
					}),
					body: T("common.dashboard.settings.account.description", {
						defaultValue:
							"Update your profile and manage your account.",
					}),
					action: { label: "Manage", href: "/Account" },
				},
			],
		},
	};
};
