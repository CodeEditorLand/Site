// Source/Library/I18n/Locale/En/Common.json
var actions = { "signIn": "Sign In" };
var brand = {
	"name": "Code Editor Land",
	"tagline": "Rust and Tauri editor stack. VS Code API compatibility in progress. CC0 1.0 Universal: no restrictions, no attribution."
};
var breadcrumb = {
	"account": "Account",
	"dashboard": "Dashboard",
	"home": "Home"
};
var button = {
	"backToHome": "Return to Homepage",
	"backToTop": "Back to top",
	"download": "Download Land Free",
	"learnMore": "See What Makes Land Different",
	"signIn": "Sign In to Your Account",
	"signUp": "Create Your Free Account"
};
var comingSoon = "PLANNED";
var error = {
	"404": "404: No Record At This Address",
	"pageNotFound": "No record is filed at this address, and no redirect covers it. The address is well formed; nothing was ever filed under it.\n\n/Contents lists every route the build emits, so a link that used to work can be found there by name.\n\nIf a page of this site sent you here, /Contact takes the report and the path you came from."
};
var label = {
	"email": "Email Address",
	"password": "Password"
};
var nav = {
	"docs": "Documentation",
	"downloads": "Download",
	"github": "GitHub Repository"
};
var docs = {
	"pageTitle": "Documentation",
	"pageSubtitle": "81 pages in 10 sections, from /START to the deep dives. Each page names the file it describes; the strip above it prints the layer, the order and the count.",
	"gettingStarted": {
		"title": "Get Started in Minutes",
		"description": "The README walks you through installation, first build, and the fifteen-element architecture. No prior Rust or Tauri knowledge required."
	},
	"issueTracker": {
		"title": "Report a Bug or Request a Feature",
		"description": "Open an issue on GitHub. The team monitors daily and labels good-first-issue tasks for new contributors."
	},
	"architecture": {
		"heading": "How Land Replaces VS Code's Electron Stack",
		"intro": "VS Code runs on Electron: a Chromium browser, a Node.js runtime, and an extension-host model. Land replaces those pieces with independent elements while preserving the VS Code extension API as the compatibility target. Browse individual elements in the Element section above, or explore the workspace on GitHub."
	},
	"workers": {
		"analytics": "Privacy-first usage telemetry routed through Cloudflare Analytics Engine",
		"auth": "OAuth 2.0, JWT session tokens, and Auth0 integration",
		"download": "Binary distribution, release metadata, and update checks",
		"heading": "Backend Services",
		"intro": "Four Cloudflare Workers power the Land backend infrastructure:",
		"status": "Health checks and uptime monitoring"
	},
	"deployments": {
		"heading": "Live Deployments",
		"intro": "Public website and documentation surfaces are deployed separately from the local editor runtime:",
		"knowledge": "Knowledge Base",
		"rustAir": "Rust API: Air",
		"rustCommon": "Rust API: Common",
		"rustEcho": "Rust API: Echo",
		"rustInteractive": "Rust API (Interactive)",
		"rustLand": "Rust API: Land (Workspace)",
		"rustMaintain": "Rust API: Maintain",
		"rustMountain": "Rust API: Mountain",
		"rustRest": "Rust API: Rest",
		"rustSideCar": "Rust API: SideCar",
		"status": "Status",
		"website": "editor.land"
	},
	"rustApi": {
		"title": "Rust API Reference",
		"description": "Browse generated rustdoc output for Mountain, Echo, Air, and 7 more Rust crates."
	},
	"repositories": { "viewAll": "View all repositories" }
};
var blog = {
	"pageTitle": "Blog",
	"pageSubtitle": "Architecture deep-dives, development updates, and technical articles from the Land team.",
	"comingSoonHeading": "Articles Coming Soon",
	"comingSoonText": "We are preparing in-depth articles on the architecture, development process, and roadmap.\n\nCheck back soon or follow progress on GitHub.",
	"joinDiscussions": "Join the Community",
	"followGitHub": "Follow on GitHub",
	"reportIssue": "Report an Issue",
	"followNote": "Follow progress on GitHub or check back here for published articles.",
	"topic": {
		"architecture": "How Mountain, Cocoon, Wind, Sky, Air, and Echo replace Electron one element at a time",
		"effectTS": "Why Effect-TS powers the UI layer: typed services, structured concurrency, and traced errors",
		"grpc": "gRPC IPC at native speed: how Rust and TypeScript communicate without overhead",
		"extensions": "Running VS Code extensions without modification: how Cocoon achieves high-fidelity compatibility",
		"ngi": "Building with the NGI0 Commons Fund: open-source sustainability and the European open internet initiative"
	},
	"upcomingTopicsHeading": "Upcoming Topics"
};
var contact = {
	"pageSubtitle": "14 routes, one register: data requests, technical support, legal and enterprise. Each prints its five-letter code and the window it answers in; the 7 statutory routes name the article they answer under.",
	"pageTitle": "Contact"
};
var contributing = {
	"indexLabel": "Parts",
	"kicker": "/CONTRIBUTING",
	"pageTitle": "Contributing",
	"pageSubtitle": "Land is CC0 and built in public.\n\nA change is a branch, a test and one sentence about why. The guide names the files, the toolchain and the branch convention; the four ways in are code, documentation, testing and design.",
	"guide": {
		"title": "Contributing Guide",
		"description": "Read CONTRIBUTING.md on GitHub for the full setup walkthrough: environment, branch conventions, and how to submit changes."
	},
	"goodFirstIssues": {
		"title": "Good First Issues",
		"description": "Browse issues labeled \"good first issue\" to find approachable tasks for new contributors. The team triages and labels these weekly."
	},
	"elements": {
		"heading": "Fifteen Elements, One Editor",
		"description": "Land is built from fifteen modular Elements, each a standalone Rust crate or TypeScript package. Each element can be developed, tested, and published independently without touching the others.",
		"docs": "Every Element has its own README with architecture details. Find them in Land/Element/"
	},
	"howToContribute": { "heading": "How to Contribute" },
	"step1": {
		"title": "Fork and Clone",
		"description": "Fork the Land repository on GitHub and clone it locally with submodules:"
	},
	"step2": {
		"title": "Set Up the Environment",
		"description": "Install Rust 1.95.0+, Node.js, and pnpm. Then run:"
	},
	"step3": {
		"title": "Make Your Changes",
		"description": "Create a branch, make your changes, and follow the PascalCase naming convention used throughout the project."
	},
	"quickLinks": { "heading": "Quick Links" },
	"stepTest": {
		"title": "Test",
		"description": "Write tests, reproduce reported bugs, or help triage open issues."
	},
	"step4": {
		"title": "Submit a Pull Request",
		"description": "Push your branch and open a pull request against the Current branch.\n\nDescribe what changed and why. One sentence is enough."
	},
	"ways": {
		"heading": "Ways to Contribute",
		"code": {
			"title": "Code",
			"description": "Fix bugs, implement features, or improve performance in Rust or TypeScript."
		},
		"documentation": {
			"title": "Documentation",
			"description": "Improve guides, add examples, or translate existing content into other languages."
		},
		"testing": {
			"title": "Testing",
			"description": "Write tests, reproduce reported bugs, or help triage open issues."
		},
		"design": {
			"title": "Design",
			"description": "Contribute UI and UX improvements, icons, or visual design work for the editor or website."
		}
	},
	"funding": {
		"heading": "Funding",
		"description": "Land is funded through the NLnet NGI0 Commons Fund.\n\nThis grant enables full-time open-source development on the project.",
		"nlnetIntro": "Code Editor Land has been funded through the",
		"nlnetFundName": "NGI0 Commons Fund",
		"nlnetEstablishedBy": ", a fund established by",
		"nlnetSuffix": "with financial support from the European Commission's Next Generation Internet programme, under grant agreement No. 101135429.\n\nThis funding enables sustained open-source development on the project.",
		"playformInfo": "The project is operated by PlayForm, a company based in Sofia, Bulgaria.\n\nPlayForm acts as the open-source steward for Code Editor Land under the NGI0 Commons Fund grant.",
		"viewProject": "View the",
		"nlnetProjectPage": "NLnet project page",
		"viewProjectSuffix": "for more details about the grant and objectives."
	},
	"conduct": {
		"heading": "Code of Conduct",
		"description": "All participants in the Land community are expected to be respectful and constructive.\n\nRead the full Code of Conduct on GitHub."
	}
};
var sales = {
	"pageTitle": "Enterprise Inquiries",
	"pageSubtitle": "Enterprise adds support, an SLA and custom development. The code stays CC0. A request is filed as a GitHub issue, so the whole team reads it and the answer is public.",
	"features": {
		"heading": "What Enterprise Includes",
		"prioritySupport": "Priority support and SLA",
		"customDeployment": "Custom deployment options: cloud, on-prem, or air-gapped",
		"volumeLicensing": "Volume licensing for large teams",
		"accountManagement": "Direct contact with the maintainers",
		"securityReview": "Security review and compliance documentation",
		"customIntegrations": "Custom integrations and development work"
	},
	"contact": {
		"heading": "How to Reach Us",
		"directHeading": "Direct Contact",
		"description": "Prefer email? Reach us directly:",
		"githubNote": "Enterprise requests are filed as GitHub issues: the thread is the record, the whole team reads it, and the answer stays public.",
		"openIssueHeading": "Open a GitHub Issue",
		"openIssueDescription": "Open an issue on the Land repository with the organisation, the team size, the use case and the deployment target.\n\nA request that names those four can be answered in one reply; one that does not needs a thread.",
		"openIssueButton": "Open GitHub Issue",
		"issueIncludeLabel": "What to include in your issue:",
		"issueIncludeText": "Company name, team size, intended use case, deployment environment, timeline, and any specific support or compliance requirements.",
		"operatedBy": "Operated by PlayForm, Sofia, Bulgaria"
	},
	"openSource": {
		"heading": "Still Open Source",
		"description": "Enterprise plans add support, SLA, and custom development.\n\nThe code itself remains CC0. Fork it, read it, ship it."
	}
};
var oauth = {
	"completing": "The provider has returned you here. The code in the query string is being exchanged for a session.",
	"failed": "Sign-In Interrupted",
	"errorGeneric": "The exchange did not complete, and the provider named no reason.",
	"errorExpired": "The sign-in session expired before the provider returned.",
	"errorProvider": "The provider returned an error instead of a code.",
	"errorNoToken": "The callback carried no token and no code.",
	"failure": {
		"expired": { "cause": "The state parameter in the callback no longer matches the session that started the sign-in: the window closed, or the attempt was started in a second tab." },
		"provider": { "cause": "The identity provider refused the request before it reached Land: a cancelled consent screen, a disabled connection, or a tenant rule." },
		"absent": { "cause": "The address reached this page without the query string the exchange reads, so there was nothing to exchange." },
		"unknown": { "cause": "The callback was read and produced neither a session nor an error parameter. The account is not the fault: the attempt can be repeated." }
	},
	"backToSignIn": "SIGN IN AGAIN",
	"goToDashboard": "OPEN THE DASHBOARD",
	"success": {
		"title": "Session Written",
		"redirect": "The dashboard opens next. The session lasts seven days."
	}
};
var dashboard = {
	"pageTitle": "Dashboard",
	"pageSubtitle": "Your Land account, downloads, and editor connection.",
	"breadcrumbLabel": "Dashboard",
	"account": {
		"heading": "Account",
		"nameLabel": "Name",
		"emailLabel": "Email",
		"planLabel": "Plan",
		"planFree": "Free",
		"planEnterprise": "Enterprise",
		"providerLabel": "Provider",
		"organizationLabel": "Organization",
		"memberSinceLabel": "Member Since",
		"notSignedIn": "Sign in to see your account details.",
		"signInButton": "Sign In",
		"emailNotVerified": "Email not verified. Check your inbox.",
		"enterpriseSSO": "Enterprise SSO active",
		"emailVerifiedTitle": "Email verified",
		"emailVerifiedBadge": "Verified",
		"signOutButton": "Sign Out"
	},
	"downloads": {
		"heading": "Downloads",
		"description": "The latest Land build for each platform. Native on macOS, Windows and Linux.",
		"goButton": "Go to Downloads"
	},
	"quickLinks": {
		"heading": "Quick Links",
		"docs": "Documentation",
		"community": "Community",
		"reportIssue": "Report an Issue",
		"contribute": "Contribute"
	},
	"settings": {
		"heading": "Settings",
		"sync": {
			"title": "Sync Settings",
			"description": "Editor preferences follow the account across every device, automatically."
		},
		"extensionSync": {
			"title": "Extension Sync",
			"description": "Installed extensions stay in sync across all machines."
		},
		"account": {
			"title": "Account",
			"description": "Update your profile and manage your account.",
			"manageButton": "Manage"
		}
	},
	"telemetry": {
		"heading": "Telemetry Architecture",
		"production": {
			"title": "Absent from the binary. Not just disabled.",
			"description": "VS Code's telemetry can be reduced via settings, but the code paths remain in the binary.\n\nThe Telemetry Cargo feature is not in Land's default features. All tracing compiles to zero-cost no-ops. Nothing is sent anywhere because there is nothing to send."
		},
		"otel": {
			"title": "Opt-in OpenTelemetry. Your infrastructure only.",
			"description": "Distributed traces for a deployment are opt-in: enable with `cargo build --features Telemetry`.\n\nLocal-only OTEL tracing, metrics and spans. No external transmission; all data stays on your infrastructure."
		},
		"effect": {
			"title": "Extension host timing. Stays in the process.",
			"description": "Cocoon uses TelemetryService for internal RPC and bootstrap timing; the data is used for performance diagnostics only.\n\nAll of it stays local, and a TelemetryMock layer is available for zero-overhead testing."
		}
	},
	"buildLog": {
		"heading": "Build Configuration",
		"subtitle": "Active build variant and deployment mode.\n\nAvailable over a Local-First Air Daemon connection.",
		"profile": { "heading": "Active Profile" },
		"deployment": { "heading": "Deployment Mode" },
		"matrix": { "heading": "Test Matrix" }
	},
	"portal": {
		"heading": "Authentication Tiers",
		"subtitle": "The current authentication method and the tiers the account can reach."
	},
	"editor": {
		"heading": "Editor Connection",
		"subtitle": "Connect the website to a running Land editor instance.",
		"status": "Not Connected",
		"description": "The Air Daemon connects this dashboard to a running Land editor over WebSocket.\n\nLaunch Land for real-time build logs, telemetry and configuration management.",
		"connect": "Connect via Portal",
		"scanButton": "Scan for Daemon"
	},
	"partners": { "heading": "Partners & Attribution" },
	"localFirst": {
		"title": "Air Daemon",
		"scanning": "Scanning",
		"connected": "Connected",
		"notFound": "Not Detected",
		"scanDescription": "Checking ws://localhost:7979 and ws://localhost:7878",
		"connectedMessage": "Connected to Air Daemon",
		"portLabel": "Port",
		"versionLabel": "Version",
		"protocolLabel": "Protocol",
		"notFoundMessage": "Air Daemon not detected. Launch Code Editor Land to enable local-first features.",
		"downloadButton": "Download Land",
		"retryButton": "Retry Scan"
	},
	"privacy": {
		"heading": "Privacy & Data Rights",
		"subtitle": "Exercise GDPR rights, request a data export, or delete the account. Requests go straight to our privacy team; each is answered within 30 days."
	}
};
var tryAgain = "Try again";
var Common_default = {
	actions,
	brand,
	breadcrumb,
	button,
	comingSoon,
	error,
	label,
	nav,
	docs,
	blog,
	contact,
	contributing,
	sales,
	oauth,
	dashboard,
	tryAgain
};
export { tryAgain as _, breadcrumb as a, contact as c, docs as d, error as f, sales as g, oauth as h, brand as i, contributing as l, nav as m, actions as n, button as o, label as p, blog as r, comingSoon as s, Common_default as t, dashboard as u };
