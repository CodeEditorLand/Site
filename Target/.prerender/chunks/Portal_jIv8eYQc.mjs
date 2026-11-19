import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$FieldRecordAction } from "./FieldRecordAction_BQ8iiqlX.mjs";
import { t as $$FieldRecordDataCard } from "./FieldRecordDataCard_-tmxJz7v.mjs";
import { t as FieldRecordEvidence } from "./FieldRecordEvidence_DTDj-aiI.mjs";
import { t as FieldRecordSeal } from "./FieldRecordSeal_BQ3rw_aG.mjs";
import { St as Header, Zt as createAstro, it as LoadServerNamespace, rt as GetI18n, t as $$Base, yt as Row } from "./Base_BVG1wSoZ.mjs";
import { t as $$SurfaceBadge } from "./SurfaceBadge_B9i5j2zn.mjs";
import { t as $$SurfaceHead } from "./SurfaceHead_epMIyR7B.mjs";
import { t as $$SurfaceStatusLine } from "./SurfaceStatusLine_BA5-UTi2.mjs";
import { t as SurfaceLives } from "./Life_BQ93jaTL.mjs";
// Source/Content/Surface/Portal.ts
/** The field-record separator: U+2001, never U+00B7. */
var Quad = " ";
/**
* One state of this surface, in the register's own shape: the key it is stated
* under, the word, and the tone §1.5 gives that word.
*
* The tone is looked up by `Row()` and never written here: a surface states a
* word from the eight, and the table decides its tone. `PLANNED` is not one of
* the eight, so writing it here with a hand-set `quiet` tone would render a plan
* as a state the vocabulary does not own - it prints as a `PLAN:` declaration
* beside the real state instead.
*/
var State = (Key, Word) => Row(Key, Word);
/** The marker a tier's record carries, keyed by the tier identifier. */
var TierIndex = {
	Cloud: "CLOUD_01",
	Provider: "PROVIDER_02",
	LocalFirst: "LOCALFIRST_03",
	Enterprise: "ENTERPRISE_04"
};
/** The seal a tier's card carries, keyed by the tier identifier. */
var TierSeal = {
	Cloud: "Mountain",
	Provider: "Cocoon",
	LocalFirst: "Wind",
	Enterprise: "Sky"
};
/** The ink a tier's bracketed title prints in, keyed by identifier. */
var TierInk = {
	Cloud: "SpineIPCFore",
	Provider: "SpineWASMFore",
	LocalFirst: "CardForeground",
	Enterprise: "MuteForeground"
};
/** The status every tier carries today: planned, never shipped. The word is
*  §1.5's `PREPARING` (quiet); the plan itself prints as the `PLAN:` declaration
*  beside it, because `PLANNED` is not a state in the fixed vocabulary. */
var TierStatus = "PREPARING";
/** The label a tier's sign-in button carries: `ENTER CLOUD`. */
var ActionLabel = (Identifier) => `ENTER ${Identifier.toUpperCase()}`;
/** The destination a tier's sign-in button carries. */
var ActionHref = (Identifier) => `/Account/SignIn?connection=${Identifier.toLowerCase()}`;
/** A tier's features, one record each. */
var Features = (T, Tier, Rows) => Rows.map((Row, Position) => ({
	marker: String(Position + 1).padStart(2, "0"),
	name: Row.Heading,
	description: T(`account:portal.${Tier}.feature.${Row.Key}`, { defaultValue: Row.Fallback })
}));
/** A tier's capability run, one line each. */
var Capabilities = (T, Tier, Rows) => Rows.map((Row) => T(`account:portal.${Tier}.capability.${Row.Key}`, { defaultValue: Row.Fallback }));
/** One tier, assembled from the copy and the facts the page already held. */
var Tier = (Content) => ({
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
		href: ActionHref(Content.Identifier)
	}
});
/** The status the page's hero states: work under way, nothing shipped. */
var HeroStatus = "PREPARING";
/**
* The page, as a function of the translator. Nothing here is conditional on a
* locale: the page renders English server-side, and the translator is handed in
* rather than imported so the module stays readable as data.
*/
var PortalPage = (T) => {
	const Cloud = Tier({
		Identifier: "Cloud",
		Title: T("account:portal.cloud.title", { defaultValue: "Cloud Plan" }),
		Badge: "Online",
		Protocol: "HTTPS / TLS 1.3",
		Features: Features(T, "cloud", [
			{
				Heading: "Sync",
				Key: "sync",
				Fallback: "Workspace sync across devices, planned"
			},
			{
				Heading: "Backup",
				Key: "backup",
				Fallback: "Encrypted backup for selected configuration, planned"
			},
			{
				Heading: "Team",
				Key: "team",
				Fallback: "Shared team workspace support, planned"
			},
			{
				Heading: "Extensions",
				Key: "extension",
				Fallback: "Marketplace installation, planned once local extension paths stabilize"
			},
			{
				Heading: "Remote",
				Key: "remote",
				Fallback: "Remote development integration, planned"
			}
		]),
		Capabilities: Capabilities(T, "cloud", [
			{
				Key: "jwt",
				Fallback: "JWT account tokens for hosted services, issued on sign-in"
			},
			{
				Key: "okta",
				Fallback: "Okta SSO belongs to the enterprise plan"
			},
			{
				Key: "mfa",
				Fallback: "MFA support depends on the configured identity provider"
			},
			{
				Key: "rbac",
				Fallback: "Gateway RBAC, planned"
			},
			{
				Key: "audit",
				Fallback: "Audit logging, planned"
			},
			{
				Key: "cert",
				Fallback: "Developer certificate automation, planned"
			}
		])
	});
	const Provider = Tier({
		Identifier: "Provider",
		Title: T("account:portal.provider.title", { defaultValue: "Provider Plan" }),
		Badge: "OAuth 2.0",
		Protocol: "OAuth 2.0 / PKCE",
		Features: Features(T, "provider", [
			{
				Heading: "GitHub",
				Key: "github",
				Fallback: "Identity, planned as a low-friction sign-in option"
			},
			{
				Heading: "SSO",
				Key: "sso",
				Fallback: "Single sign-on across Land services, planned"
			},
			{
				Heading: "Repository",
				Key: "repo",
				Fallback: "Settings sync tied to provider identity, planned"
			},
			{
				Heading: "Team",
				Key: "team",
				Fallback: "Organization and team membership sync, planned"
			},
			{
				Heading: "CI/CD",
				Key: "ci",
				Fallback: "CI/CD integration belongs to later portal work"
			}
		]),
		Capabilities: Capabilities(T, "provider", [
			{
				Key: "oauth",
				Fallback: "OAuth 2.0 / PKCE support where provider flows are enabled"
			},
			{
				Key: "scope",
				Fallback: "Minimal OAuth scopes: only what each provider integration requires"
			},
			{
				Key: "token",
				Fallback: "Refresh token handling depends on provider configuration"
			},
			{
				Key: "webhook",
				Fallback: "Webhook subscriptions, planned"
			},
			{
				Key: "org",
				Fallback: "Organization-level access policies, planned"
			},
			{
				Key: "cert",
				Fallback: "Developer certificate automation, planned"
			}
		])
	});
	const LocalFirst = Tier({
		Identifier: "LocalFirst",
		Title: T("account:portal.localfirst.title", { defaultValue: "Local-First" }),
		Badge: "Local-First",
		Protocol: "mTLS active / WebSocket planned",
		Features: Features(T, "localfirst", [
			{
				Heading: "Air Daemon",
				Key: "daemon",
				Fallback: "Loopback control from the browser, planned"
			},
			{
				Heading: "Build",
				Key: "build",
				Fallback: "Builds launched from the website console, planned"
			},
			{
				Heading: "Deploy",
				Key: "deploy",
				Fallback: "Changes deployed into a running editor, planned"
			},
			{
				Heading: "Configure",
				Key: "configure",
				Fallback: "Editor configuration management, planned"
			},
			{
				Heading: "Extensions",
				Key: "parity",
				Fallback: "Installed VS Code extensions run unmodified through the Cocoon path when their APIs are implemented"
			},
			{
				Heading: "Offline",
				Key: "offline",
				Fallback: "Local editor operation should not require a cloud login"
			},
			{
				Heading: "Embedded SaaS",
				Key: "bake",
				Fallback: "Portal surfaces embedded into the editor, planned"
			}
		]),
		Capabilities: Capabilities(T, "localfirst", [
			{
				Key: "jwt",
				Fallback: "Local session tokens with short expiry, managed by the daemon"
			},
			{
				Key: "mtls",
				Fallback: "mTLS mutual authentication is enabled by default for daemon connections"
			},
			{
				Key: "crdt",
				Fallback: "CRDT state synchronization, planned for conflict-free offline edits"
			},
			{
				Key: "team",
				Fallback: "Fully local team management, planned"
			},
			{
				Key: "cert",
				Fallback: "Local certificate management, planned; daemon credential storage is active"
			},
			{
				Key: "ws",
				Fallback: "WebSocket loopback connection, planned"
			},
			{
				Key: "rbac",
				Fallback: "Local RBAC policies, planned"
			},
			{
				Key: "backup",
				Fallback: "Encrypted local backup, planned"
			}
		])
	});
	const Enterprise = Tier({
		Identifier: "Enterprise",
		Title: T("account:portal.enterprise.title", { defaultValue: "Enterprise Plan" }),
		Badge: "Planned",
		Protocol: "OIDC / SAML 2.0 / SCIM planned",
		Features: Features(T, "enterprise", [
			{
				Heading: "Okta",
				Key: "okta",
				Fallback: "SSO integration, planned"
			},
			{
				Heading: "Azure AD",
				Key: "azure",
				Fallback: "Entra ID integration, planned"
			},
			{
				Heading: "SAML 2.0",
				Key: "saml",
				Fallback: "SAML 2.0 support, planned"
			},
			{
				Heading: "SCIM",
				Key: "scim",
				Fallback: "SCIM provisioning, planned"
			},
			{
				Heading: "Groups",
				Key: "group",
				Fallback: "IdP group to Land role mapping, planned"
			},
			{
				Heading: "Audit",
				Key: "audit",
				Fallback: "Audit export, planned"
			}
		]),
		Capabilities: Capabilities(T, "enterprise", [
			{
				Key: "oidc",
				Fallback: "OIDC discovery is handled by the configured identity provider"
			},
			{
				Key: "jit",
				Fallback: "Just-in-time provisioning happens through the configured identity provider"
			},
			{
				Key: "mfa",
				Fallback: "MFA enforcement depends on the configured IdP"
			},
			{
				Key: "session",
				Fallback: "Session duration follows the configured tenant policy"
			},
			{
				Key: "ca",
				Fallback: "Organization CA certificate management, planned"
			},
			{
				Key: "compliance",
				Fallback: "Compliance documentation, planned"
			}
		])
	});
	return {
		index: "PORTAL_01",
		heading: "AUTHENTICATION TIERS",
		headingInk: "SpineIPCFore",
		subheading: "FOUR MODES",
		subheadingInk: "SpineTCPFore",
		protocol: "HTTPS",
		program: [
			"CLOUD",
			"PROVIDER",
			"LOCAL-FIRST",
			"ENTERPRISE"
		],
		banner: [
			"NATIVE",
			"OPEN",
			"CROSS-PLATFORM"
		],
		status: HeroStatus,
		states: [State("STATUS", HeroStatus)],
		title: "LAND",
		relation: "EDITOR WITHOUT CHROMIUM",
		metadata: [
			{
				label: "TARGET",
				value: "MACOS / WINDOWS / LINUX"
			},
			{
				label: "LICENSE",
				value: "CC0"
			},
			{
				label: "SIGNAL",
				value: "LOCAL-FIRST"
			}
		],
		evidence: {
			src: "/Evidence/Land/NightGlass-01.png",
			alt: "Rain-speckled glass reflecting a green light at night",
			position: "right"
		},
		tiers: [
			Cloud,
			Provider,
			LocalFirst,
			Enterprise
		],
		credits: [["CODEEDITORLAND PORTAL", "CC0 LICENSED"].join(Quad), [
			"TELEMETRY FEATURE GATED",
			"AUTH0 + OAUTH 2.0",
			"OIDC / SAML PLANNED"
		].join(Quad)],
		returnLabel: "↳RETURN TO INDEX",
		returnHref: "/"
	};
};
// Source/pages/Portal.astro
var Portal_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Portal,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://editor.land");
var $$Portal = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Portal;
	LoadServerNamespace("account");
	const T = GetI18n();
	const MetaTitle = T("meta.portal.title", { defaultValue: "Editor Portal | Code Editor Land" });
	const MetaDescription = T("meta.portal.description", { defaultValue: "CodeEditorLand account sign-in and planned portal modes for cloud, provider, local-first, and enterprise workflows." });
	const Page = PortalPage(T);
	const Declarations = [
		{
			key: "ROUTE",
			value: Astro.url.pathname.toUpperCase()
		},
		{
			key: "SOURCE",
			value: "RELEASE RECORD"
		},
		{
			key: "AS OF",
			value: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		}
	];
	const Facts = Page.metadata.map((Row) => ({
		key: `${Row.label}:`,
		value: Row.value
	}));
	const Plan = [{
		key: "PLAN",
		value: "PLANNED"
	}];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription
	}, {
		"default": ($$result) => renderTemplate`    ${maybeRenderHead($$result)}<section class="w-full overflow-hidden relative" aria-label="Portal Hero"> <div class="absolute inset-0 pointer-events-none" style="background-color: var(--Background);"></div> <div class="flex flex-col md:flex-row min-h-[60dvh] mx-auto relative" style="padding: clamp(2rem, 5vw, 5rem); gap: clamp(0.5rem, 1.5vw, 1.875rem);"> <div class="flex flex-col flex-1 justify-center"> ${renderComponent($$result, "FieldRecordDataCard", $$FieldRecordDataCard, { "className": "h-full" }, { "default": ($$result) => renderTemplate` <div class="flex flex-col h-full justify-between"> ${renderComponent($$result, "SurfaceHead", $$SurfaceHead, {
			"class": "portal-head",
			"index": `# ${Page.index}`,
			"title": Page.heading,
			"display": true,
			"states": Page.states,
			"declarations": Declarations,
			"life": SurfaceLives.PORTAL.term,
			"lifeNote": SurfaceLives.PORTAL.source,
			"rows": Facts
		}, {
			"default": ($$result) => renderTemplate`  <p class="portal-head__claim"> <span style="color:var(--MuteForeground)">
〈
</span> <span${addAttribute(`color:var(--${Page.subheadingInk})`, "style")}> ${Page.subheading} </span> <span style="color:var(--MuteForeground)">
〉
</span> </p> <p class="portal-head__protocol"> <span style="color:var(--MuteForeground)">
/
</span> <span style="color:var(--SemanticSky)">
PROTOCOL
</span> <span style="color:var(--CardForeground)">
:${Page.protocol} </span> </p> <p class="portal-head__program"> ${Page.program.join(" ")} </p> <p class="portal-head__banner"> ${Page.banner.join(" ")} </p> `,
			"mark": ($$result) => renderTemplate`${renderComponent($$result, "FieldRecordSeal", FieldRecordSeal, {
				"slot": "mark",
				"element": "Land",
				"size": "l"
			})}`
		})} <div class="flex-1 my-12" aria-hidden="true"></div> <div> <p class="font-mono text-card-foreground font-normal text-field-l leading-[1.08]"> ${Page.title}:
</p> <p class="font-mono text-card-foreground font-normal leading-[1.1] opacity-70 text-field-s mt-3">
↳${Page.relation} </p> </div> </div> ` })} </div> <!-- The gutter is the keeper's: the site's divider ink, not the creme
			 field. At \`var(--Background)\` the rule was present in the DOM and
			 invisible to the eye - the exact weakness KEEPERS.md names. It names
			 \`--Divider\` now instead of restating the 20 % mix, because the
			 homepage's hero and the Record layer's hero read the same token and
			 three restatements of one ink is how they drift apart. --> <div class="hidden md:block w-px" style="background-color: var(--Divider);"></div> <div class="flex items-center justify-center flex-1"> ${renderComponent($$result, "FieldRecordEvidence", FieldRecordEvidence, {
			"src": Page.evidence.src,
			"alt": Page.evidence.alt,
			"position": Page.evidence.position,
			"className": "portal-hero__evidence h-full w-full min-h-[40dvh]"
		})} </div> </div> </section>  <section id="portal-tiers" aria-label="Authentication Tiers" class="w-full py-16 sm:py-20"> <div class="container mx-auto px-4"> <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2"> ${Page.tiers.map((Tier) => renderTemplate`<article${addAttribute(`tier-${Tier.index.split("_")[0].toLowerCase()}`, "id")} class="flex h-full flex-col border border-border p-5"> <div class="flex items-start justify-between gap-3"> <span class="font-mono type-meta uppercase tracking-rule text-[var(--Mark)]">
# ${Tier.index} </span> ${renderComponent($$result, "FieldRecordSeal", FieldRecordSeal, {
			"element": Tier.seal,
			"size": "s"
		})} </div>  <div class="PortalTierRule mt-3 pt-3"> <h2 class="font-mono text-card-foreground font-medium uppercase tracking-row"> <span style="color:var(--MuteForeground)">
〈
</span> <span${addAttribute(`color:var(--${Tier.ink})`, "style")}> ${Tier.title} </span> <span style="color:var(--MuteForeground)">
〉
</span> </h2> <p class="font-mono text-card-foreground type-meta uppercase tracking-rule mt-1"> <span style="color:var(--MuteForeground)">
/
</span> <span style="color:var(--SemanticSky)">
PROTOCOL
</span> <span style="color:var(--CardForeground)">
: ${Tier.protocol} </span> </p> </div>  <div class="PortalTierDivider" aria-hidden="true"></div> <div class="portal-tier__status"> ${renderComponent($$result, "SurfaceStatusLine", $$SurfaceStatusLine, {
			"states": Tier.states,
			"declarations": Plan
		})} </div> <div class="PortalTierDivider" aria-hidden="true"></div> <div> <p class="font-mono type-meta text-muted-foreground tracking-rule uppercase">
BADGE:
</p> <div class="mt-2"> ${renderComponent($$result, "SurfaceBadge", $$SurfaceBadge, {
			"label": Tier.badge,
			"tone": "mute"
		})} </div> </div>  <div class="PortalTierDivider" aria-hidden="true"></div> <div> <p class="font-mono type-meta text-muted-foreground tracking-rule uppercase">
FEATURES:
</p> <ul class="portal-tier__features mt-2"> ${Tier.features.map((Feature) => renderTemplate`<li class="portal-tier__feature"> <span class="portal-tier__feature-index" aria-hidden="true"> ${Feature.marker} </span> <span class="portal-tier__feature-name"> ${Feature.name} </span> <span class="portal-tier__feature-description"> ${Feature.description} </span> </li>`)} </ul> </div> <div class="PortalTierDivider" aria-hidden="true"></div> <div> <p class="font-mono type-meta text-muted-foreground tracking-rule uppercase">
CAPABILITIES:
</p> <ul class="portal-tier__capabilities mt-2"> ${Tier.capabilities.map((Capability) => renderTemplate`<li class="portal-tier__capability"> ${Capability} </li>`)} </ul> </div> <div class="PortalTierDivider" aria-hidden="true"></div> <div class="mt-auto pt-3"> ${renderComponent($$result, "FieldRecordAction", $$FieldRecordAction, {
			"label": Tier.action.label,
			"href": Tier.action.href,
			"variant": "button"
		})} </div> </article>`)} </div> </div> </section>  <section id="portal-footer" aria-label="Portal Credits" class="w-full py-12" style="border-top: var(--BorderWidth) solid color-mix(in srgb, var(--CardForeground) 20%, transparent);"> <div class="container mx-auto px-4"> <div class="mx-auto max-w-3xl"> <div class="flex flex-col items-center gap-4 text-center"> ${Page.credits.map((Line) => renderTemplate`<p class="font-mono text-field-s uppercase tracking-wider text-muted-foreground"> ${Line} </p>`)} <div class="flex items-center gap-4 mt-4"> <a class="font-mono text-field-s uppercase tracking-wider hover:underline text-accent underline-offset-4"${addAttribute(Page.returnHref, "href")}> ${Page.returnLabel} </a> </div> </div> </div> </div> </section> `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"Mode": "functional",
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Portal.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Portal.astro";
var $$url = "/Portal";
// \0virtual:astro:page:Source/pages/Portal@_@astro
var page = () => Portal_exports;
export { page };
