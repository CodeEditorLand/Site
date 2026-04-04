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
			"Sign in once and every device is in sync \u2014 workspace state encrypted end to end, never readable in transit.",
		Color: "var(--TierCloud)",
		BorderColor: "var(--TierCloudFore)",
		Icon: "Cloud",
		Badge: "Hosted",
		Protocol: "HTTPS \u00b7 WebSocket \u00b7 JWT RS256",
		Feature: [
			{
				Heading: "Your data never leaves in plaintext",
				Description:
					"AES-256-GCM encrypts all workspace state in transit and at rest \u2014 the relay sees only ciphertext.",
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
					"Changes reach your cloud environment in seconds \u2014 no manual deploy steps, no waiting for a CI queue.",
				Icon: ["Rocket", "GitBranch", "Timer"],
			},
			{
				Heading: "Every action on record",
				Description:
					"Login events, extension installs, and settings changes are all captured in the audit log \u2014 nothing hidden.",
				Icon: ["FileText", "Activity", "Search"],
			},
		],
		Capability: [
			"WebSocket reconnect with exponential back-off \u2014 drops heal automatically",
			"JWT RS256 \u2014 15 min access \u00b7 30 day refresh, rotated on sign-in",
			"Rate-limited per IP and per account \u2014 brute force blocked at the gateway",
			"CORS-hardened API gateway \u2014 no cross-origin leakage",
			"Global CDN edge caching \u2014 assets served fast regardless of region",
		],
	},

	Provider: {
		Identifier: "Provider",
		Title: "Provider",
		Subtitle:
			"Use the developer identity you already have \u2014 we request only your email, never repository or org access.",
		Color: "var(--TierProvider)",
		BorderColor: "var(--TierProviderFore)",
		Icon: "GitFork",
		Badge: "OAuth",
		Protocol: "OAuth 2.0 \u00b7 PKCE \u00b7 OpenID Connect",
		Feature: [
			{
				Heading: "No new password to remember",
				Description:
					"Authenticate via your existing GitHub account. Repository scopes are never requested \u2014 only your identity.",
				Icon: ["/Image/GitHub.svg", "GitBranch", "FolderGit"],
			},
			{
				Heading: "Use your Google account, nothing extra granted",
				Description:
					"Sign in with Google using only the email and profile scopes \u2014 Drive, Docs, and everything else stays untouched.",
				Icon: ["/Image/Google.svg", "Globe", "Fingerprint"],
			},
			{
				Heading: "Self-hosted or gitlab.com \u2014 both work",
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
				Heading: "We see your email \u2014 nothing else",
				Description:
					"CEL requests only read:user and user:email. No repository data, no org membership, no billing info \u2014 ever.",
				Icon: ["Lock", "Shield", "CheckCircle"],
			},
		],
		Capability: [
			"PKCE S256 code challenge \u2014 auth code interception is impossible",
			"State parameter CSRF protection \u2014 phishing tokens are rejected",
			"Tokens in HttpOnly Secure cookies \u2014 JavaScript can\u2019t touch them",
			"Provider token never stored server-side \u2014 no server breach risk",
			"Account merge across providers \u2014 one identity regardless of how you sign in",
		],
	},

	LocalFirst: {
		Identifier: "LocalFirst",
		Title: "Local-First",
		Subtitle:
			"No internet? No problem. The Air Daemon runs entirely on your machine \u2014 your code and credentials never leave it.",
		Color: "var(--TierLocalFirst)",
		BorderColor: "var(--TierLocalFirstFore)",
		Icon: "Wifi",
		Badge: "Offline",
		Protocol: "Air Daemon \u00b7 mTLS \u00b7 JWT ES384",
		Feature: [
			{
				Heading: "Connects over loopback \u2014 never leaves your machine",
				Description:
					"The browser talks to your Air Daemon over a loopback WebSocket secured by mTLS \u2014 traffic never hits the network.",
				Icon: ["Wifi", "Network", "Radio"],
			},
			{
				Heading: "Cryptographic trust, no cloud CA needed",
				Description:
					"The daemon issues short-lived ES384 JWT certificates locally \u2014 no certificate authority call ever leaves your machine.",
				Icon: ["Key", "Fingerprint", "Lock"],
			},
			{
				Heading: "Full editor power, internet optional",
				Description:
					"Editing, terminal, debugger, and extensions all function with zero internet \u2014 ideal for secure or air-gapped environments.",
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
			"mTLS mutual auth \u2014 both daemon and browser verify each other",
			"JWT ES384 \u2014 5 min expiry, rotated on every reconnect",
			"Loopback-only binding \u2014 your LAN and internet never see the port",
			"Auto-restart via launchd / systemd / WinSVC on crash or reboot",
			"CRL revocation on daemon uninstall \u2014 old certificates instantly invalidated",
		],
	},

	Enterprise: {
		Identifier: "Enterprise",
		Title: "Enterprise",
		Subtitle:
			"Your IT team controls every seat \u2014 OIDC, SAML 2.0, and SCIM mean zero manual provisioning and full directory governance.",
		Color: "var(--PlatformDesktopFore)",
		BorderColor: "var(--PlatformDesktop)",
		Icon: "Building2",
		Badge: "Enterprise",
		Protocol: "OIDC \u00b7 SAML 2.0 \u00b7 SCIM 2.0",
		Feature: [
			{
				Heading: "One login unlocks every tool",
				Description:
					"Federate via Okta, Azure AD, PingFederate, or any OIDC / SAML 2.0-compliant IdP \u2014 developers never manage a separate CEL password.",
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
					"SCIM syncs users and groups automatically \u2014 create, update, or deactivate seats straight from your corporate directory.",
				Icon: ["UserPlus", "Users", "Building2"],
			},
			{
				Heading: "Least privilege, enforced automatically",
				Description:
					"IdP groups map directly to CEL roles. Access is scoped at the API gateway \u2014 no manual role assignment, no privilege drift.",
				Icon: ["Layers", "Lock", "Blocks"],
			},
			{
				Heading: "SOC 2 logs flow straight to your SIEM",
				Description:
					"Every sign-in, role change, and extension install is exported in CEF or JSON \u2014 your security team gets exactly what auditors require.",
				Icon: ["FileText", "AlertTriangle", "Info"],
			},
			{
				Heading: "Personal accounts can\u2019t touch org workspaces",
				Description:
					"Login is locked to verified corporate domains \u2014 contractors and personal accounts are blocked at the identity layer.",
				Icon: ["Hash", "Globe", "CheckCircle"],
			},
		],
		Capability: [
			"OIDC Discovery \u2014 auto-configured from your IdP metadata URL, zero manual setup",
			"SAML 2.0 SP-initiated and IdP-initiated flows \u2014 both supported out of the box",
			"SCIM 2.0 Groups + Users with patch \u2014 directory changes reflect instantly",
			"Session duration enforced by IdP policy \u2014 IT controls how long tokens live",
			"Force MFA via IdP authentication context \u2014 second factor is never optional",
		],
	},
};

export { PortalData };

export default PortalData;
