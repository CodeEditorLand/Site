/**
 * Portal - the portal page's content table.
 *
 * Every fact the page prints lives here, not in the template: the four tiers,
 * their protocols, their feature sets, their capability lists, and the links
 * that leave the page. The page composes bands from this table and owns nothing
 * but the band order.
 *
 * Two rules this module keeps:
 *
 * - It takes `T` and never imports the i18n client. The page resolves the
 *   translator and hands it in, so this file stays a pure function of its
 *   arguments and can be read as data.
 * - It derives, it never invents. `index`, `href` and the status label are
 *   computed from the tier identifier the page already carried
 *   (`CLOUD_01`, `/Account/SignIn?connection=cloud`, `PLANNED`), so a tier's
 *   marker and its destination cannot drift apart.
 *
 * The strings a reader sees are the page's own: the tier copy is the
 * `account.portal.*` copy the page already resolved, and the sentences added
 * for the shell and the decision list are new keys under `portal.surface.*` in
 * `Locale/En/Account.json`.
 */
import type { TFunction } from "i18next";

import type {
	Band,
	Entry,
	LedgerRow,
	MatrixColumn,
	Stage,
	Tone,
} from "../../Component/Record/Type.js";

/** A row in a capability matrix: an ordinal and the capability itself. */
export interface PortalCapability {
	readonly label: string;
	readonly cells: readonly string[];
}

/** One authentication tier, as the page prints it. */
export interface PortalTier {
	/** `CLOUD_01` - the tier's record marker. */
	readonly index: string;

	/** `Cloud` - the identifier the connection parameter is built from. */
	readonly identifier: string;

	/** `Cloud Plan`. */
	readonly title: string;

	/**
	 * The tier's own copy, split on the blank line the source copy already
	 * carried: the first paragraph opens the band as its standfirst, the rest
	 * print under it. A two-paragraph subtitle stays two paragraphs instead of
	 * becoming one run-on sentence.
	 */
	readonly band: Band;

	/** Everything after the opening paragraph. */
	readonly rest: readonly string[];

	/** `Online`, `OAuth 2.0`, `Local-First`, `Planned`. */
	readonly badge: string;

	/** `HTTPS / TLS 1.3` and friends. */
	readonly protocol: string;

	/** `PLANNED` - the only status any tier carries today. */
	readonly status: string;

	/** The band surface this tier sits on. */
	readonly tone: Tone;

	/** PROTOCOL / BADGE / STATUS, in that order. */
	readonly facts: readonly LedgerRow[];

	/** The tier's feature set, one record per feature. */
	readonly features: readonly Entry[];

	/** The tier's capability list, one row per capability. */
	readonly capabilities: readonly PortalCapability[];

	/** The tier's sign-in link, with one line of what it opens. */
	readonly action: Entry;
}

/** The whole page, resolved. */
export interface PortalSurface {
	/** The page's single `h1`. */
	readonly title: string;

	/** `# PORTAL_01` - the page's record marker. */
	readonly index: string;

	/** One sentence under the `h1`. */
	readonly standfirst: string;

	/** The status ledger at the top of the page. */
	readonly status: readonly LedgerRow[];

	/** The roadmap band: what the four tiers are. */
	readonly roadmap: Band;

	/** The four tiers as an ordered rail, each linking to its sign-in route. */
	readonly stages: readonly Stage[];

	/** One band per tier. */
	readonly tiers: readonly PortalTier[];

	/** The decision band: every link on the page, with what it opens. */
	readonly actions: Band;

	/** The decision list itself. */
	readonly decisions: readonly Entry[];

	/** The two columns every capability matrix shares. */
	readonly capabilityColumns: readonly MatrixColumn[];
}

/** The marker a tier's record carries, keyed by the tier identifier. */
const TierIndex: Record<string, string> = {
	Cloud: "CLOUD_01",
	Provider: "PROVIDER_02",
	LocalFirst: "LOCALFIRST_03",
	Enterprise: "ENTERPRISE_04",
};

/** The status every tier carries today: planned, never shipped. */
const TierStatus = "PLANNED";

/** The label a tier's sign-in button carried: `ENTER CLOUD`. */
const ActionLabel = (Identifier: string): string =>
	`ENTER ${Identifier.toUpperCase()}`;

/** The destination a tier's sign-in button carried. */
const ActionHref = (Identifier: string): string =>
	`/Account/SignIn?connection=${Identifier.toLowerCase()}`;

/** Two digits, so a feature's marker keeps its column. */
const Ordinal = (Position: number): string =>
	String(Position + 1).padStart(2, "0");

/** One row of a tier's feature copy, before it is resolved. */
export interface PortalFeatureCopy {
	readonly Heading: string;
	readonly Key: string;
	readonly Fallback: string;
}

/** One row of a tier's capability copy, before it is resolved. */
export interface PortalCapabilityCopy {
	readonly Key: string;
	readonly Fallback: string;
}

/** A tier's features, one record each. */
const Features = (
	T: TFunction,
	Tier: "cloud" | "provider" | "localfirst" | "enterprise",
	Rows: readonly PortalFeatureCopy[],
): readonly Entry[] =>
	Rows.map((Row, Position) => ({
		index: `# ${Ordinal(Position)}`,
		name: Row.Heading,
		body: T(`account.portal.${Tier}.feature.${Row.Key}`, {
			defaultValue: Row.Fallback,
		}),
	}));

/** A tier's capability list, one matrix row each. */
const Capabilities = (
	T: TFunction,
	Tier: "cloud" | "provider" | "localfirst" | "enterprise",
	Rows: readonly PortalCapabilityCopy[],
): readonly PortalCapability[] =>
	Rows.map((Row, Position) => ({
		label: Ordinal(Position),
		cells: [
			T(`account.portal.${Tier}.capability.${Row.Key}`, {
				defaultValue: Row.Fallback,
			}),
		],
	}));

/** One tier, assembled from the copy and the facts the page already held. */
const Tier = (
	Content: {
		readonly Identifier: string;
		readonly Title: string;
		readonly Subtitle: string;
		readonly Badge: string;
		readonly Protocol: string;
		readonly Tone: Tone;
		readonly Features: readonly Entry[];
		readonly Capabilities: readonly PortalCapability[];
		readonly ActionBody: string;
	},
): PortalTier => {
	const Paragraphs = Content.Subtitle.split("\n\n").filter(
		(Line) => Line.length > 0,
	);
	const Opening = Paragraphs.at(0);
	const Marker =
		TierIndex[Content.Identifier] ?? Content.Identifier.toUpperCase();

	return {
		index: Marker,
		identifier: Content.Identifier,
		title: Content.Title,
		band: {
			kicker: `# ${Marker}`,
			heading: Content.Title,
			...(Opening === undefined ? {} : { standfirst: Opening }),
			footnote: `${Content.Badge} · ${Content.Protocol}`,
			tone: Content.Tone,
		},
		rest: Paragraphs.slice(1),
		badge: Content.Badge,
		protocol: Content.Protocol,
		status: TierStatus,
		tone: Content.Tone,
		facts: [
			{ key: "PROTOCOL", value: Content.Protocol },
			{ key: "BADGE", value: Content.Badge },
			{ key: "STATUS", value: TierStatus },
		],
		features: Content.Features,
		capabilities: Content.Capabilities,
		action: {
			index: "# ACTION",
			name: ActionLabel(Content.Identifier),
			body: Content.ActionBody,
			href: ActionHref(Content.Identifier),
		},
	};
};

/**
 * The page, as a function of the translator. Nothing here is conditional on a
 * locale: the page renders English server-side and the strings are the same
 * ones it rendered before.
 */
export const PortalPage = (T: TFunction): PortalSurface => {
	const Title = T("account.portal.title", {
		defaultValue: "CodeEditorLand Portal Roadmap",
	});

	const Subtitle = T("account.portal.subtitle", {
		defaultValue:
			"Land is organized around four authentication tiers: Cloud account sign-in, OAuth provider identity, local-first Air daemon control, and enterprise SSO. The local editor works without any of them.",
	});

	const Labels = {
		Included: T("account.portal.labels.included", {
			defaultValue: "Included",
		}),
		Capabilities: T("account.portal.labels.capabilities", {
			defaultValue: "Capabilities",
		}),
		Protocol: T("account.portal.labels.protocol", {
			defaultValue: "Protocol:",
		}),
		SettingsManaged: T("account.portal.labels.settingsManaged", {
			defaultValue: "Settings Managed",
		}),
		AllTiers: T("account.portal.labels.allTiers", {
			defaultValue: "Included in all tiers",
		}),
	};

	const Cloud = Tier({
		Identifier: "Cloud",
		Title: T("account.portal.cloud.title", { defaultValue: "Cloud Plan" }),
		Subtitle: T("account.portal.cloud.subtitle", {
			defaultValue:
				"Sign in with a hosted account through Auth0 Universal Login. Workspace sync, backup, and team features are planned.\n\nThe local editor remains fully usable without an account.",
		}),
		Badge: "Online",
		Protocol: "HTTPS / TLS 1.3",
		Tone: "paper",
		Features: Features(T, "cloud", [
			{
				Heading: "Sync",
				Key: "sync",
				Fallback: "Planned workspace sync across devices",
			},
			{
				Heading: "Backup",
				Key: "backup",
				Fallback: "Planned encrypted backup for selected configuration",
			},
			{
				Heading: "Team",
				Key: "team",
				Fallback: "Planned shared team workspace support",
			},
			{
				Heading: "Extensions",
				Key: "extension",
				Fallback:
					"Marketplace installation is planned after local extension paths stabilize",
			},
			{
				Heading: "Remote",
				Key: "remote",
				Fallback: "Remote development integration is planned",
			},
		]),
		Capabilities: Capabilities(T, "cloud", [
			{
				Key: "jwt",
				Fallback: "JWT account tokens for hosted services, issued on sign-in",
			},
			{ Key: "okta", Fallback: "Okta SSO belongs to the enterprise plan" },
			{
				Key: "mfa",
				Fallback: "MFA support depends on the configured identity provider",
			},
			{ Key: "rbac", Fallback: "Gateway RBAC is planned" },
			{ Key: "audit", Fallback: "Audit logging is planned" },
			{
				Key: "cert",
				Fallback: "Developer certificate automation is planned",
			},
		]),
		ActionBody: T("account:portal.surface.action.cloud", {
			defaultValue:
				"Opens Auth0 Universal Login on the hosted-account connection.",
		}),
	});

	const Provider = Tier({
		Identifier: "Provider",
		Title: T("account.portal.provider.title", {
			defaultValue: "Provider Plan",
		}),
		Subtitle: T("account.portal.provider.subtitle", {
			defaultValue:
				"Sign in with GitHub, GitLab, or Google through OAuth 2.0 PKCE via Auth0. Which provider connections are available depends on tenant configuration; linking sessions to repositories is planned.",
		}),
		Badge: "OAuth 2.0",
		Protocol: "OAuth 2.0 / PKCE",
		Tone: "canvas",
		Features: Features(T, "provider", [
			{
				Heading: "GitHub",
				Key: "github",
				Fallback: "GitHub identity is planned as a low-friction sign-in option",
			},
			{
				Heading: "SSO",
				Key: "sso",
				Fallback: "Single sign-on across Land services is planned",
			},
			{
				Heading: "Repository",
				Key: "repo",
				Fallback: "Settings sync tied to provider identity is planned",
			},
			{
				Heading: "Team",
				Key: "team",
				Fallback: "Organization and team membership sync is planned",
			},
			{
				Heading: "CI/CD",
				Key: "ci",
				Fallback: "CI/CD integration belongs to later portal work",
			},
		]),
		Capabilities: Capabilities(T, "provider", [
			{
				Key: "oauth",
				Fallback: "OAuth 2.0 / PKCE support where provider flows are enabled",
			},
			{
				Key: "scope",
				Fallback:
					"Minimal OAuth scopes - only what each provider integration requires",
			},
			{
				Key: "token",
				Fallback: "Refresh token handling depends on provider configuration",
			},
			{ Key: "webhook", Fallback: "Webhook subscriptions are planned" },
			{
				Key: "org",
				Fallback: "Organization-level access policies are planned",
			},
			{
				Key: "cert",
				Fallback: "Developer certificate automation is planned",
			},
		]),
		ActionBody: T("account:portal.surface.action.provider", {
			defaultValue:
				"Opens Auth0 Universal Login on the OAuth provider connection.",
		}),
	});

	const LocalFirst = Tier({
		Identifier: "LocalFirst",
		Title: T("account.portal.localfirst.title", {
			defaultValue: "Local-First",
		}),
		Subtitle: T("account.portal.localfirst.subtitle", {
			defaultValue:
				"The Air daemon runs as a persistent background process handling updates, file indexing, signing, and health monitoring.\n\nThe portal surface for browser-to-daemon control is in development - the daemon itself is active source today.",
		}),
		Badge: "Local-First",
		Protocol: "mTLS active / WebSocket planned",
		Tone: "paper",
		Features: Features(T, "localfirst", [
			{
				Heading: "Air Daemon",
				Key: "daemon",
				Fallback: "Browser-to-daemon loopback control is planned",
			},
			{
				Heading: "Build",
				Key: "build",
				Fallback: "Launching builds from the website console is planned",
			},
			{
				Heading: "Deploy",
				Key: "deploy",
				Fallback: "Deploying changes into a running editor is planned",
			},
			{
				Heading: "Configure",
				Key: "configure",
				Fallback: "Editor configuration management is planned",
			},
			{
				Heading: "Extensions",
				Key: "parity",
				Fallback:
					"Installed VS Code extensions run unmodified through the Cocoon path when their APIs are implemented",
			},
			{
				Heading: "Offline",
				Key: "offline",
				Fallback: "Local editor operation should not require a cloud login",
			},
			{
				Heading: "Embedded SaaS",
				Key: "bake",
				Fallback: "Embedding portal surfaces into the editor is planned",
			},
		]),
		Capabilities: Capabilities(T, "localfirst", [
			{
				Key: "jwt",
				Fallback:
					"Local session tokens with short expiry, managed by the daemon",
			},
			{
				Key: "mtls",
				Fallback:
					"mTLS mutual authentication is enabled by default for daemon connections",
			},
			{
				Key: "crdt",
				Fallback:
					"CRDT state synchronization - planned for conflict-free offline edits",
			},
			{ Key: "team", Fallback: "Fully local team management is planned" },
			{
				Key: "cert",
				Fallback:
					"Local certificate management is planned; daemon credential storage is active",
			},
			{ Key: "ws", Fallback: "WebSocket loopback connection is planned" },
			{ Key: "rbac", Fallback: "Local RBAC policies are planned" },
			{ Key: "backup", Fallback: "Encrypted local backup is planned" },
		]),
		ActionBody: T("account:portal.surface.action.localfirst", {
			defaultValue:
				"Opens Auth0 Universal Login on the local-first connection.",
		}),
	});

	const Enterprise = Tier({
		Identifier: "Enterprise",
		Title: T("account.portal.enterprise.title", {
			defaultValue: "Enterprise Plan",
		}),
		Subtitle: T("account.portal.enterprise.subtitle", {
			defaultValue:
				"Connect Land to your organisation's identity infrastructure through Auth0 enterprise connections for Okta, Azure AD, and SAML 2.0. SCIM directory provisioning is planned.",
		}),
		Badge: "Planned",
		Protocol: "OIDC / SAML 2.0 / SCIM planned",
		Tone: "canvas",
		Features: Features(T, "enterprise", [
			{ Heading: "Okta", Key: "okta", Fallback: "Okta SSO integration is planned" },
			{
				Heading: "Azure AD",
				Key: "azure",
				Fallback: "Azure AD / Entra ID integration is planned",
			},
			{ Heading: "SAML 2.0", Key: "saml", Fallback: "SAML 2.0 support is planned" },
			{ Heading: "SCIM", Key: "scim", Fallback: "SCIM provisioning is planned" },
			{
				Heading: "Groups",
				Key: "group",
				Fallback: "IdP group to Land role mapping is planned",
			},
			{ Heading: "Audit", Key: "audit", Fallback: "Audit export is planned" },
		]),
		Capabilities: Capabilities(T, "enterprise", [
			{
				Key: "oidc",
				Fallback:
					"OIDC discovery is handled by the configured identity provider",
			},
			{
				Key: "jit",
				Fallback:
					"Just-in-time provisioning happens through the configured identity provider",
			},
			{
				Key: "mfa",
				Fallback: "MFA enforcement depends on the configured IdP",
			},
			{
				Key: "session",
				Fallback: "Session duration follows the configured tenant policy",
			},
			{
				Key: "ca",
				Fallback: "Organization CA certificate management is planned",
			},
			{ Key: "compliance", Fallback: "Compliance documentation is planned" },
		]),
		ActionBody: T("account:portal.surface.action.enterprise", {
			defaultValue:
				"Opens Auth0 Universal Login on the enterprise connection.",
		}),
	});

	const Tiers = [Cloud, Provider, LocalFirst, Enterprise] as const;

	return {
		title: "AUTHENTICATION TIERS",
		index: "# PORTAL_01",
		standfirst: Subtitle,
		status: [
			{
				key: "TIERS",
				value: "CLOUD · PROVIDER · LOCAL-FIRST · ENTERPRISE",
			},
			{
				key: "PROTOCOL",
				value: "HTTPS / TLS 1.3 · OAuth 2.0 / PKCE · mTLS · OIDC / SAML 2.0",
			},
			{ key: "STATUS", value: TierStatus },
			{ key: "SIGN-IN", value: "Auth0 Universal Login" },
			{ key: "TARGET", value: "MACOS / WINDOWS / LINUX" },
			{ key: "LICENSE", value: "CC0" },
			{ key: "SIGNAL", value: "LOCAL-FIRST" },
			{ key: "PROGRAM", value: "NATIVE · OPEN · CROSS-PLATFORM" },
		],
		roadmap: {
			kicker: "/ROADMAP",
			heading: Title,
			standfirst: T("account:portal.surface.roadmap", {
				defaultValue:
					"Each tier opens the same Auth0 Universal Login; the connection parameter picks the identity route.",
			}),
			footnote: `${Labels.SettingsManaged} · ${Labels.AllTiers}`,
			tone: "flush",
		},
		stages: Tiers.map((Rail) => ({
			index: Rail.index.slice(-2),
			label: Rail.title,
			line: `${Rail.badge} · ${Rail.protocol}`,
			href: ActionHref(Rail.identifier),
		})),
		tiers: Tiers,
		actions: {
			kicker: "/ACTIONS",
			heading: T("account:portal.surface.actions.heading", {
				defaultValue: "What you can do from here",
			}),
			standfirst: T("account:portal.surface.actions.standfirst", {
				defaultValue:
					"Every link on this page, in the order the page offers it, with what it opens.",
			}),
			footnote:
				"CODEEDITORLAND PORTAL · CC0 LICENSED · TELEMETRY FEATURE GATED · AUTH0 + OAUTH 2.0 · OIDC / SAML PLANNED",
			tone: "canvas",
		},
		decisions: [
			...Tiers.map((Entry, Position) => ({
				...Entry.action,
				index: `# ${Ordinal(Position)}`,
			})),
			{
				index: `# ${Ordinal(Tiers.length)}`,
				name: "RETURN TO INDEX",
				body: T("account:portal.surface.action.index", {
					defaultValue: "Goes back to the site's front page.",
				}),
				href: "/",
			},
		],
		capabilityColumns: [
			{ label: "#" },
			{
				label: Labels.Capabilities,
				ink: "MuteForeground",
			},
		],
	};
};
