/**
 * Portal - the portal page's content table.
 *
 * Every fact the page prints lives here, not in the template: the hero
 * record's opening type and its three metadata rows, the four tiers with
 * their protocols, their feature sets, their capability runs and their one
 * action each, and the two credit lines the page closes on. The page composes
 * the three movements from this table and owns nothing but their order.
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
 * The separators are U+2001 (EM QUAD), the field-record glyph the rest of the
 * site prints. They are written as escapes so no editor can silently fold them
 * into a middle dot, which `DESIGN.md` §1.5 forbids.
 */
import type { TFunction } from "i18next";

import type { FieldRecordElement } from "../../Component/Brand/FieldRecordSeal.js";
import type { SurfaceState as StateRow } from "../../Component/Surface/State.js";

/** The field-record separator: U+2001, never U+00B7. */
const Quad = "\u2001";

/**
 * One state of this surface, in the register's own shape: the key it is stated
 * under, the word, and the tone §1.5 gives that word.
 *
 * The tone is written here rather than looked up, because a surface states the
 * tone it means: `PLANNED` and `PREPARING` are both work-not-yet-done, and
 * §1.5 gives both the `quiet` tone. `--Accent` authenticates a live state
 * (ACTIVE, VERIFIED) and never a plan, which is what the hero printed before
 * this table carried a tone at all.
 */
const State = (Key: string, Word: string): StateRow => ({
	key: Key,
	value: Word,
	tone: "quiet",
});

/** One feature row: a name, and the one sentence that qualifies it. */
export interface PortalFeature {
	/**
	 * `01` - the feature's position in its tier's own list, zero-padded. A
	 * feature is one record of the tier's set, and a record carries a marker;
	 * the order is a fact of the table, so it is derived here rather than
	 * invented in the template. `RecordEntry` prints it verbatim.
	 */
	readonly marker: string;

	/** `Sync` - printed uppercase by the row's own class. */
	readonly name: string;

	/** `Planned workspace sync across devices`. */
	readonly description: string;
}

/** One authentication tier, as the page prints it. */
export interface PortalTier {
	/** `CLOUD_01` - the tier's record marker. */
	readonly index: string;

	/** The seal the card's upper-right corner prints. */
	readonly seal: FieldRecordElement;

	/** `CLOUD PLAN` - the card's `h2`, already uppercase. */
	readonly title: string;

	/** The ink the bracketed title prints in: a semantic token name. */
	readonly ink: string;

	/** `HTTPS / TLS 1.3` - what the tier speaks, after `PROTOCOL:`. */
	readonly protocol: string;

	/** `PLANNED` - the only status any tier carries today. */
	readonly status: string;

	/** The tier's one state, as the register prints it: `STATUS` over `PLANNED`. */
	readonly states: readonly StateRow[];

	/** `Online`, `OAuth 2.0`, `Local-First`, `Planned`. */
	readonly badge: string;

	/** The tier's feature set: every name with its description. */
	readonly features: readonly PortalFeature[];

	/** The tier's capability run, one mono line each. */
	readonly capabilities: readonly string[];

	/** The tier's sign-in button: `ENTER CLOUD` and where it goes. */
	readonly action: {
		readonly label: string;
		readonly href: string;
	};
}

/** One key/value row of the hero record's metadata list. */
export interface PortalMetadataRow {
	/** `TARGET` - the block prints the colon. */
	readonly label: string;

	/** `MACOS / WINDOWS / LINUX`. */
	readonly value: string;
}

/** The whole page, resolved. */
export interface PortalSurface {
	/** `PORTAL_01` - the record's marker, printed as `# PORTAL_01`. */
	readonly index: string;

	/** `AUTHENTICATION TIERS` - the page's single `h1`. */
	readonly heading: string;

	/** The ink the `h1` prints in: a semantic token name. */
	readonly headingInk: string;

	/** `FOUR MODES` - the line under the `h1`. */
	readonly subheading: string;

	/** The ink the subheading prints in: a semantic token name. */
	readonly subheadingInk: string;

	/** `HTTPS` - printed after `PROTOCOL`. */
	readonly protocol: string;

	/** `CLOUD PROVIDER LOCAL-FIRST ENTERPRISE`, em-quad separated. */
	readonly program: readonly string[];

	/** `NATIVE OPEN CROSS-PLATFORM`, em-quad separated. */
	readonly banner: readonly string[];

	/** `PREPARING` - the page's one state at the top. */
	readonly status: string;

	/** That state, as the register prints it: `STATUS` over `PREPARING`. */
	readonly states: readonly StateRow[];

	/** `LAND` - the title block; the template prints the colon. */
	readonly title: string;

	/** `EDITOR WITHOUT CHROMIUM` - the proposition under the title. */
	readonly relation: string;

	/** `TARGET:` / `LICENSE:` / `SIGNAL:`. */
	readonly metadata: readonly PortalMetadataRow[];

	/** The evidence panel's image and its crop. */
	readonly evidence: {
		readonly src: string;
		readonly alt: string;
		readonly position: string;
	};

	/** The four tiers, in the order the grid prints them. */
	readonly tiers: readonly PortalTier[];

	/** The two credit lines the page closes on, em-quad separated. */
	readonly credits: readonly string[];

	/** `↳RETURN TO INDEX` - the footer's one link. */
	readonly returnLabel: string;

	/** `/` - where that link goes. */
	readonly returnHref: string;
}

/** The marker a tier's record carries, keyed by the tier identifier. */
const TierIndex: Record<string, string> = {
	Cloud: "CLOUD_01",
	Provider: "PROVIDER_02",
	LocalFirst: "LOCALFIRST_03",
	Enterprise: "ENTERPRISE_04",
};

/** The seal a tier's card carries, keyed by the tier identifier. */
const TierSeal: Record<string, FieldRecordElement> = {
	Cloud: "Mountain",
	Provider: "Cocoon",
	LocalFirst: "Wind",
	Enterprise: "Sky",
};

/** The ink a tier's bracketed title prints in, keyed by identifier. */
const TierInk: Record<string, string> = {
	Cloud: "SpineIPCFore",
	Provider: "SpineWASMFore",
	LocalFirst: "CardForeground",
	Enterprise: "MuteForeground",
};

/** The status every tier carries today: planned, never shipped. */
const TierStatus = "PLANNED";

/** The label a tier's sign-in button carried: `ENTER CLOUD`. */
const ActionLabel = (Identifier: string): string =>
	`ENTER ${Identifier.toUpperCase()}`;

/** The destination a tier's sign-in button carried. */
const ActionHref = (Identifier: string): string =>
	`/Account/SignIn?connection=${Identifier.toLowerCase()}`;

/** One row of a tier's feature copy, before it is resolved. */
interface PortalFeatureCopy {
	readonly Heading: string;
	readonly Key: string;
	readonly Fallback: string;
}

/** One row of a tier's capability copy, before it is resolved. */
interface PortalCapabilityCopy {
	readonly Key: string;
	readonly Fallback: string;
}

/** A tier's features, one record each. */
const Features = (
	T: TFunction,
	Tier: "cloud" | "provider" | "localfirst" | "enterprise",
	Rows: readonly PortalFeatureCopy[],
): readonly PortalFeature[] =>
	Rows.map((Row, Position) => ({
		marker: String(Position + 1).padStart(2, "0"),
		name: Row.Heading,
		description: T(`account.portal.${Tier}.feature.${Row.Key}`, {
			defaultValue: Row.Fallback,
		}),
	}));

/** A tier's capability run, one line each. */
const Capabilities = (
	T: TFunction,
	Tier: "cloud" | "provider" | "localfirst" | "enterprise",
	Rows: readonly PortalCapabilityCopy[],
): readonly string[] =>
	Rows.map((Row) =>
		T(`account.portal.${Tier}.capability.${Row.Key}`, {
			defaultValue: Row.Fallback,
		}),
	);

/** One tier, assembled from the copy and the facts the page already held. */
const Tier = (Content: {
	readonly Identifier: string;
	readonly Title: string;
	readonly Badge: string;
	readonly Protocol: string;
	readonly Features: readonly PortalFeature[];
	readonly Capabilities: readonly string[];
}): PortalTier => ({
	index: TierIndex[Content.Identifier] ?? Content.Identifier.toUpperCase(),
	seal: TierSeal[Content.Identifier] ?? "Land",
	title: Content.Title.toUpperCase(),
	ink: TierInk[Content.Identifier] ?? "CardForeground",
	protocol: Content.Protocol,
	status: TierStatus,
	states: [State("STATUS", TierStatus)],
	badge: Content.Badge,
	features: Content.Features,
	capabilities: Content.Capabilities,
	action: {
		label: ActionLabel(Content.Identifier),
		href: ActionHref(Content.Identifier),
	},
});

/** The status the page's hero states: work under way, nothing shipped. */
const HeroStatus = "PREPARING";

/**
 * The page, as a function of the translator. Nothing here is conditional on a
 * locale: the page renders English server-side and the strings are the same
 * ones it rendered before.
 */
export const PortalPage = (T: TFunction): PortalSurface => {
	const Cloud = Tier({
		Identifier: "Cloud",
		Title: T("account.portal.cloud.title", { defaultValue: "Cloud Plan" }),
		Badge: "Online",
		Protocol: "HTTPS / TLS 1.3",
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
				Fallback:
					"JWT account tokens for hosted services, issued on sign-in",
			},
			{
				Key: "okta",
				Fallback: "Okta SSO belongs to the enterprise plan",
			},
			{
				Key: "mfa",
				Fallback:
					"MFA support depends on the configured identity provider",
			},
			{ Key: "rbac", Fallback: "Gateway RBAC is planned" },
			{ Key: "audit", Fallback: "Audit logging is planned" },
			{
				Key: "cert",
				Fallback: "Developer certificate automation is planned",
			},
		]),
	});

	const Provider = Tier({
		Identifier: "Provider",
		Title: T("account.portal.provider.title", {
			defaultValue: "Provider Plan",
		}),
		Badge: "OAuth 2.0",
		Protocol: "OAuth 2.0 / PKCE",
		Features: Features(T, "provider", [
			{
				Heading: "GitHub",
				Key: "github",
				Fallback:
					"GitHub identity is planned as a low-friction sign-in option",
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
				Fallback:
					"OAuth 2.0 / PKCE support where provider flows are enabled",
			},
			{
				Key: "scope",
				Fallback:
					"Minimal OAuth scopes - only what each provider integration requires",
			},
			{
				Key: "token",
				Fallback:
					"Refresh token handling depends on provider configuration",
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
	});

	const LocalFirst = Tier({
		Identifier: "LocalFirst",
		Title: T("account.portal.localfirst.title", {
			defaultValue: "Local-First",
		}),
		Badge: "Local-First",
		Protocol: "mTLS active / WebSocket planned",
		Features: Features(T, "localfirst", [
			{
				Heading: "Air Daemon",
				Key: "daemon",
				Fallback: "Browser-to-daemon loopback control is planned",
			},
			{
				Heading: "Build",
				Key: "build",
				Fallback:
					"Launching builds from the website console is planned",
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
				Fallback:
					"Local editor operation should not require a cloud login",
			},
			{
				Heading: "Embedded SaaS",
				Key: "bake",
				Fallback:
					"Embedding portal surfaces into the editor is planned",
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
	});

	const Enterprise = Tier({
		Identifier: "Enterprise",
		Title: T("account.portal.enterprise.title", {
			defaultValue: "Enterprise Plan",
		}),
		Badge: "Planned",
		Protocol: "OIDC / SAML 2.0 / SCIM planned",
		Features: Features(T, "enterprise", [
			{
				Heading: "Okta",
				Key: "okta",
				Fallback: "Okta SSO integration is planned",
			},
			{
				Heading: "Azure AD",
				Key: "azure",
				Fallback: "Azure AD / Entra ID integration is planned",
			},
			{
				Heading: "SAML 2.0",
				Key: "saml",
				Fallback: "SAML 2.0 support is planned",
			},
			{
				Heading: "SCIM",
				Key: "scim",
				Fallback: "SCIM provisioning is planned",
			},
			{
				Heading: "Groups",
				Key: "group",
				Fallback: "IdP group to Land role mapping is planned",
			},
			{
				Heading: "Audit",
				Key: "audit",
				Fallback: "Audit export is planned",
			},
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
				Fallback:
					"Session duration follows the configured tenant policy",
			},
			{
				Key: "ca",
				Fallback: "Organization CA certificate management is planned",
			},
			{
				Key: "compliance",
				Fallback: "Compliance documentation is planned",
			},
		]),
	});

	return {
		index: "PORTAL_01",
		heading: "AUTHENTICATION TIERS",
		headingInk: "SpineIPCFore",
		subheading: "FOUR MODES",
		subheadingInk: "SpineTCPFore",
		protocol: "HTTPS",
		program: ["CLOUD", "PROVIDER", "LOCAL-FIRST", "ENTERPRISE"],
		banner: ["NATIVE", "OPEN", "CROSS-PLATFORM"],
		status: HeroStatus,
		states: [State("STATUS", HeroStatus)],
		title: "LAND",
		relation: "EDITOR WITHOUT CHROMIUM",
		metadata: [
			{ label: "TARGET", value: "MACOS / WINDOWS / LINUX" },
			{ label: "LICENSE", value: "CC0" },
			{ label: "SIGNAL", value: "LOCAL-FIRST" },
		],
		evidence: {
			src: "/Evidence/Land/NightGlass-01.png",
			alt: "Rain-speckled glass reflecting a green light at night",
			position: "right",
		},
		tiers: [Cloud, Provider, LocalFirst, Enterprise],
		credits: [
			["CODEEDITORLAND PORTAL", "CC0 LICENSED"].join(Quad),
			[
				"TELEMETRY FEATURE GATED",
				"AUTH0 + OAUTH 2.0",
				"OIDC / SAML PLANNED",
			].join(Quad),
		],
		returnLabel: "↳RETURN TO INDEX",
		returnHref: "/",
	};
};
