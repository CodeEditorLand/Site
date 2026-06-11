import type PortalContent from "./Portal.js";

/**
 * Default English Portal tier data.
 *
 * Consumed by pages/Portal.astro (and its i18n variants) as the base
 * PortalContent prop. Translated pages override Title/Subtitle/Feature
 * strings via i18n; Icon arrays are locale-invariant.
 *
 * Color palette aligns with Protocol Spine identity:
 * Cloud → IPC blue #3b82f6 / #2563eb
 * Provider → WASM purple #8b5cf6 / #7c3aed
 * LocalFirst → TCP orange #f97316 / #ea580c
 * Enterprise → charcoal #374151 / #1f2937
 *
 * Feature.Icon[] values reference either:
 * - A key in TierIconRegistry (DynamicPortal.tsx) - e.g. "Shield", "Cpu"
 * - A Public image path - e.g. "/Image/GitHub.svg"
 */
const PortalData: PortalContent = {
	Title: "Sign In to CodeEditorLand",

	Subtitle: "Choose the connection tier that matches your deployment model.",

	Labels: {
		Included: "Included",

		Capabilities: "Capabilities",

		Protocol: "Protocol:",

		SettingsManaged: "Settings Managed",

		AllTiers: "Included in all tiers",
	},

	Cloud: {
		Identifier: "Cloud",

		Title: "Cloud",

		Subtitle:
			"Sign in once and every device is in sync. Workspace state encrypted end to end, never readable in transit.",

		Color: "var(--TierCloud)",

		BorderColor: "var(--TierCloudFore)",

		Icon: "Cloud",

		Badge: "Hosted",

		Protocol: "HTTPS \u2001 WebSocket \u2001 JWT RS256",

		Feature: [
			{
				Heading: "Your data never leaves in plaintext",

				Description:
					"AES-256-GCM encrypts all workspace state in transit and at rest. The relay sees only ciphertext.",

				Icon: ["Lock", "Shield", "Zap"],
			},

			{
				Heading: "Every device in sync, instantly",

				Description:
					"One account connects unlimited devices. Session tokens rotate on every sign-in so stale credentials can\u2019t be replayed.",

				Icon: ["Monitor", "Laptop", "RefreshCw"],
			},

			{
				Heading: "One click to install any extension",

				Description:
					"Browse, install, update, and publish extensions from the CEL marketplace without leaving the editor.",

				Icon: ["Puzzle", "Package", "Download"],
			},

			{
				Heading: "Push once, live in under 60 s",

				Description:
					"Changes reach your cloud environment in seconds. No manual deploy steps, no waiting for a CI queue.",

				Icon: ["Rocket", "GitBranch", "Timer"],
			},

			{
				Heading: "Every action on record",

				Description:
					"Login events, extension installs, and settings changes are all captured in the audit log. Nothing hidden.",

				Icon: ["FileText", "Activity", "Search"],
			},
		],

		Capability: [
			"WebSocket reconnect with exponential back-off: drops heal automatically",

			"JWT RS256: 15 min access \u2001 30 day refresh, rotated on sign-in",

			"Rate-limited per IP and per account: brute force blocked at the gateway",

			"CORS-hardened API gateway: no cross-origin leakage",

			"Global CDN edge caching: assets served fast regardless of region",
		],
	},

	Provider: {
		Identifier: "Provider",

		Title: "Provider",

		Subtitle:
			"Use the developer identity you already have. We request only your email. We never request repository or org access.",

		Color: "var(--TierProvider)",

		BorderColor: "var(--TierProviderFore)",

		Icon: "GitFork",

		Badge: "OAuth",

		Protocol: "OAuth 2.0 \u2001 PKCE \u2001 OpenID Connect",

		Feature: [
			{
				Heading: "No new password to remember",

				Description:
					"Authenticate via your existing GitHub account. Repository scopes are never requested. Only your identity.",

				Icon: ["/Image/GitHub.svg", "GitBranch", "FolderGit"],
			},

			{
				Heading: "Use your Google account, nothing extra granted",

				Description:
					"Sign in with Google using only the email and profile scopes. Drive, Docs, and everything else stays untouched.",

				Icon: ["/Image/Google.svg", "Globe", "Fingerprint"],
			},

			{
				Heading: "Self-hosted or gitlab.com. Both work",

				Description:
					"Connect any GitLab instance via OAuth 2.0 PKCE. Your company\u2019s self-hosted GitLab works out of the box.",

				Icon: ["/Image/GitLab.svg", "GitCommit", "GitPullRequest"],
			},

			{
				Heading: "Your theme and keybindings follow you",

				Description:
					"Preferences are linked to your provider identity so switching devices never means resetting your setup.",

				Icon: ["Settings", "Sliders", "RefreshCw"],
			},

			{
				Heading: "We see your email. Nothing else",

				Description:
					"CEL requests only read:user and user:email. No repository data, no org membership, no billing info. Ever.",

				Icon: ["Lock", "Shield", "CheckCircle"],
			},
		],

		Capability: [
			"PKCE S256 code challenge: auth code interception is impossible",

			"State parameter CSRF protection: phishing tokens are rejected",

			"Tokens in HttpOnly Secure cookies: JavaScript can\u2019t touch them",

			"Provider token never stored server-side: no server breach risk",

			"Account merge across providers: one identity regardless of how you sign in",
		],
	},

	LocalFirst: {
		Identifier: "LocalFirst",

		Title: "Local-First",

		Subtitle:
			"No internet? No problem. The Air Daemon runs entirely on your machine. Your code and credentials never leave it.",

		Color: "var(--TierLocalFirst)",

		BorderColor: "var(--TierLocalFirstFore)",

		Icon: "Wifi",

		Badge: "Offline",

		Protocol: "Air Daemon \u2001 mTLS \u2001 JWT ES384",

		Feature: [
			{
				Heading: "Connects over loopback. Never leaves your machine",

				Description:
					"The browser talks to your Air Daemon over a loopback WebSocket secured by mTLS. Traffic never hits the network.",

				Icon: ["Wifi", "Network", "Radio"],
			},

			{
				Heading: "Cryptographic trust, no cloud CA needed",

				Description:
					"The daemon issues short-lived ES384 JWT certificates locally. No certificate authority call ever leaves your machine.",

				Icon: ["Key", "Fingerprint", "Lock"],
			},

			{
				Heading: "Full editor power, internet optional",

				Description:
					"Editing, terminal, debugger, and extensions all function with zero internet. Ideal for secure or air-gapped environments.",

				Icon: ["WifiOff", "HardDrive", "Cpu"],
			},

			{
				Heading: "Extensions install from disk, zero cloud",

				Description:
					"Mirror the CEL marketplace locally so extensions install instantly from disk without touching the cloud.",

				Icon: ["PackageOpen", "Box", "Terminal"],
			},

			{
				Heading: "Auto-reconnects the moment your machine wakes",

				Description:
					"The status bar pulses daemon health in real time and reconnects automatically after sleep or network flaps.",

				Icon: ["Activity", "Timer", "RefreshCcw"],
			},
		],

		Capability: [
			"mTLS mutual auth: both daemon and browser verify each other",

			"JWT ES384: 5 min expiry, rotated on every reconnect",

			"Loopback-only binding: your LAN and internet never see the port",

			"Auto-restart via launchd / systemd / WinSVC on crash or reboot",

			"CRL revocation on daemon uninstall: old certificates instantly invalidated",
		],
	},

	Enterprise: {
		Identifier: "Enterprise",

		Title: "Enterprise",

		Subtitle:
			"Your IT team controls every seat. OIDC, SAML 2.0, and SCIM mean zero manual provisioning and full directory governance.",

		Color: "var(--PlatformDesktopFore)",

		BorderColor: "var(--PlatformDesktop)",

		Icon: "Building2",

		Badge: "Enterprise",

		Protocol: "OIDC \u2001 SAML 2.0 \u2001 SCIM 2.0",

		Feature: [
			{
				Heading: "One login unlocks every tool",

				Description:
					"Federate via Okta, Azure AD, PingFederate, or any OIDC / SAML 2.0-compliant IdP. Developers never manage a separate CEL password.",

				Icon: [
					"/Image/Okta.svg",

					"/Image/Microsoft.svg",

					"KeyRound",

					"Shield",
				],
			},

			{
				Heading: "New developers ready in minutes, not days",

				Description:
					"SCIM syncs users and groups automatically. Create, update, or deactivate seats straight from your corporate directory.",

				Icon: ["UserPlus", "Users", "Building2"],
			},

			{
				Heading: "Least privilege, enforced automatically",

				Description:
					"IdP groups map directly to CEL roles. Access is scoped at the API gateway. No manual role assignment, no privilege drift.",

				Icon: ["Layers", "Lock", "Blocks"],
			},

			{
				Heading: "SOC 2 logs flow straight to your SIEM",

				Description:
					"Every sign-in, role change, and extension install is exported in CEF or JSON. Your security team gets exactly what auditors require.",

				Icon: ["FileText", "AlertTriangle", "Info"],
			},

			{
				Heading: "Personal accounts can\u2019t touch org workspaces",

				Description:
					"Login is locked to verified corporate domains. Contractors and personal accounts are blocked at the identity layer.",

				Icon: ["Hash", "Globe", "CheckCircle"],
			},
		],

		Capability: [
			"OIDC Discovery: auto-configured from your IdP metadata URL, zero manual setup",

			"SAML 2.0 SP-initiated and IdP-initiated flows: both supported out of the box",

			"SCIM 2.0 Groups + Users with patch: directory changes reflect instantly",

			"Session duration enforced by IdP policy: IT controls how long tokens live",

			"Force MFA via IdP authentication context: second factor is never optional",
		],
	},
};

export { PortalData };

export default PortalData;
