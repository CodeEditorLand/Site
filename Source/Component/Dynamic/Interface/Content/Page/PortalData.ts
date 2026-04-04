import type PortalContent from "./Portal.js";

/**
 * Default English Portal tier data.
 *
 * Consumed by pages/Portal.astro (and its i18n variants) as the base
 * PortalContent prop. Translated pages override Title/Subtitle/Feature
 * strings via i18n; Icon arrays are locale-invariant.
 *
 * Color palette aligns with Protocol Spine identity:
 *   Cloud      → IPC blue     #3b82f6 / #2563eb
 *   Provider   → WASM purple  #8b5cf6 / #7c3aed
 *   LocalFirst → TCP orange   #f97316 / #ea580c
 *   Enterprise → charcoal     #374151 / #1f2937
 *
 * Feature.Icon[] values reference either:
 *   - A key in TierIconRegistry (DynamicPortal.tsx) - e.g. "Shield", "Cpu"
 *   - A Public image path - e.g. "/Image/GitHub.svg"
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
			"Secure online login. Your workspace syncs across every device via the CEL cloud relay.",
		Color: "var(--TierCloud)",
		BorderColor: "var(--TierCloudFore)",
		Icon: "Cloud",
		Badge: "Hosted",
		Protocol: "HTTPS \u00b7 WebSocket \u00b7 JWT RS256",
		Feature: [
			{
				Heading: "Encrypted sync",
				Description:
					"All workspace state is end-to-end encrypted in transit and at rest via AES-256-GCM.",
				Icon: ["Lock", "Shield", "Zap"],
			},
			{
				Heading: "Multi-device sessions",
				Description:
					"One account, unlimited devices. Session tokens rotate on every sign-in.",
				Icon: ["Monitor", "Laptop", "RefreshCw"],
			},
			{
				Heading: "Extension marketplace",
				Description:
					"Install, update, and publish extensions from the CEL marketplace with one click.",
				Icon: ["Puzzle", "Package", "Download"],
			},
			{
				Heading: "Continuous delivery",
				Description:
					"Push to deploy \u2014 changes reach your cloud environment in under 60 seconds.",
				Icon: ["Rocket", "GitBranch", "Timer"],
			},
			{
				Heading: "Audit trail",
				Description:
					"Every login event, extension install, and settings change is recorded in the audit log.",
				Icon: ["FileText", "Activity", "Search"],
			},
		],
		Capability: [
			"WebSocket reconnection with exponential back-off",
			"JWT RS256 \u2014 15 min access \u00b7 30 day refresh",
			"Rate-limited per IP and per account",
			"CORS-hardened API gateway",
			"Global CDN edge caching",
		],
	},

	Provider: {
		Identifier: "Provider",
		Title: "Provider",
		Subtitle:
			"Sign in with your existing developer identity. OAuth 2.0 scopes request only the minimum required.",
		Color: "var(--TierProvider)",
		BorderColor: "var(--TierProviderFore)",
		Icon: "GitFork",
		Badge: "OAuth",
		Protocol: "OAuth 2.0 \u00b7 PKCE \u00b7 OpenID Connect",
		Feature: [
			{
				Heading: "GitHub identity",
				Description:
					"Authenticate via GitHub OAuth. Repository access scopes are never requested.",
				Icon: ["/Image/GitHub.svg", "GitBranch", "FolderGit"],
			},
			{
				Heading: "Google identity",
				Description:
					"Sign in with a Google account. Only email and profile scopes are requested.",
				Icon: ["/Image/Google.svg", "Globe", "Fingerprint"],
			},
			{
				Heading: "GitLab identity",
				Description:
					"Connect a GitLab account \u2014 self-hosted or gitlab.com \u2014 via OAuth 2.0 PKCE.",
				Icon: ["/Image/GitLab.svg", "GitCommit", "GitPullRequest"],
			},
			{
				Heading: "Linked preferences",
				Description:
					"Theme, keybindings, and layout preferences travel with your provider identity.",
				Icon: ["Settings", "Sliders", "RefreshCw"],
			},
			{
				Heading: "Minimal scopes",
				Description:
					"CEL requests only read:user and user:email \u2014 no repository or org access ever.",
				Icon: ["Lock", "Shield", "CheckCircle"],
			},
		],
		Capability: [
			"PKCE S256 code challenge on every OAuth flow",
			"State parameter CSRF protection",
			"Token storage in HttpOnly Secure cookies",
			"Provider token never stored server-side",
			"Account merge across providers",
		],
	},

	LocalFirst: {
		Identifier: "LocalFirst",
		Title: "Local-First",
		Subtitle:
			"Zero cloud dependency. The Air Daemon runs on your machine and issues mTLS certificates locally.",
		Color: "var(--TierLocalFirst)",
		BorderColor: "var(--TierLocalFirstFore)",
		Icon: "Wifi",
		Badge: "Offline",
		Protocol: "Air Daemon \u00b7 mTLS \u00b7 JWT ES384",
		Feature: [
			{
				Heading: "Air Daemon connection",
				Description:
					"The browser connects to your local Air Daemon over a loopback WebSocket secured by mTLS.",
				Icon: ["Wifi", "Network", "Radio"],
			},
			{
				Heading: "Local certificate authority",
				Description:
					"The daemon issues short-lived ES384 JWT certificates \u2014 no CA calls leave your machine.",
				Icon: ["Key", "Fingerprint", "Lock"],
			},
			{
				Heading: "Offline-capable workspaces",
				Description:
					"Full editing, terminal, and extension functionality with no internet connection required.",
				Icon: ["WifiOff", "HardDrive", "Cpu"],
			},
			{
				Heading: "Local extension registry",
				Description:
					"Mirror the CEL marketplace locally. Extensions install from disk without contacting the cloud.",
				Icon: ["PackageOpen", "Box", "Terminal"],
			},
			{
				Heading: "Daemon health monitor",
				Description:
					"Real-time daemon status pulsed in the status bar \u2014 reconnects automatically on wake.",
				Icon: ["Activity", "Timer", "RefreshCcw"],
			},
		],
		Capability: [
			"mTLS mutual authentication \u2014 daemon + browser both verified",
			"JWT ES384 \u2014 5 min expiry, rotated on reconnect",
			"Loopback-only binding \u2014 port never exposed to LAN",
			"Automatic daemon restart via launchd / systemd / WinSVC",
			"CRL revocation on daemon uninstall",
		],
	},

	Enterprise: {
		Identifier: "Enterprise",
		Title: "Enterprise",
		Subtitle:
			"OIDC Discovery, SAML 2.0, and SCIM provisioning. Managed by your IT team.",
		Color: "var(--PlatformDesktopFore)",
		BorderColor: "var(--PlatformDesktop)",
		Icon: "Building2",
		Badge: "Enterprise",
		Protocol: "OIDC \u00b7 SAML 2.0 \u00b7 SCIM 2.0",
		Feature: [
			{
				Heading: "Single Sign-On",
				Description:
					"Federate via Okta, Azure AD, PingFederate, or any SAML 2.0 / OIDC-compliant IdP.",
				Icon: [
					"/Image/Okta.svg",
					"/Image/Microsoft.svg",
					"KeyRound",
					"Shield",
				],
			},
			{
				Heading: "SCIM provisioning",
				Description:
					"Automate user and group lifecycle \u2014 create, update, and deactivate from your directory.",
				Icon: ["UserPlus", "Users", "Building2"],
			},
			{
				Heading: "Role-based access",
				Description:
					"Map IdP groups to CEL roles. Least-privilege enforced at the API gateway layer.",
				Icon: ["Layers", "Lock", "Blocks"],
			},
			{
				Heading: "Audit and compliance",
				Description:
					"SOC 2 Type II event logs exported to your SIEM in CEF or JSON format.",
				Icon: ["FileText", "AlertTriangle", "Info"],
			},
			{
				Heading: "Domain enforcement",
				Description:
					"Lock login to verified corporate domains. Personal accounts cannot access org workspaces.",
				Icon: ["Hash", "Globe", "CheckCircle"],
			},
		],
		Capability: [
			"OIDC Discovery endpoint \u2014 auto-configured from IdP metadata URL",
			"SAML 2.0 SP-initiated and IdP-initiated flows",
			"SCIM 2.0 Groups + Users with patch operations",
			"Session duration enforced by IdP policy",
			"Force MFA via IdP authentication context class",
		],
	},
};

export { PortalData };

export default PortalData;
