import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$AuthShell } from "./AuthShell_jEq8JTTy.mjs";
import { n as AuthFrameFor } from "./Data_DzJ24Zfb.mjs";
import { St as Header, Xt as renderScript, it as LoadServerNamespace, rt as GetI18n, t as $$Base, yt as Row } from "./Base_BVG1wSoZ.mjs";
import { t as $$PageShell } from "./PageShell_CE6u9sfu.mjs";
import { t as $$ShellPlate } from "./ShellPlate_CgGj6t1n.mjs";
import { t as $$ShellState } from "./ShellState_WzePgCwv.mjs";
import { n as $$SurfaceState } from "./SurfaceStatusLine_BA5-UTi2.mjs";
import { n as Auth0ClientIdentifier_default, t as Auth0Domain_default } from "./Auth0Domain_Nfysvg1u.mjs";
// Source/Content/Layout/OAuth.ts
/** Resolve the route's failure copy through the page's translator. */
var OAuthResult = (T) => ({
	heading: T("common.oauth.failed", { defaultValue: "Sign-In Interrupted" }),
	next: {
		label: T("common.oauth.backToSignIn", { defaultValue: "SIGN IN AGAIN" }),
		href: "/Account/SignIn"
	},
	arms: {
		expired: {
			state: "INTERRUPTED",
			statement: T("common.oauth.errorExpired", { defaultValue: "The sign-in session expired before the provider returned." }),
			cause: T("common.oauth.failure.expired.cause", { defaultValue: "The state parameter in the callback no longer matches the session that started the sign-in: the window closed, or the attempt was started in a second tab." }),
			note: "STATE: NO MATCH"
		},
		provider: {
			state: "INTERRUPTED",
			statement: T("common.oauth.errorProvider", { defaultValue: "The provider returned an error instead of a code." }),
			cause: T("common.oauth.failure.provider.cause", { defaultValue: "The identity provider refused the request before it reached Land: a cancelled consent screen, a disabled connection, a tenant rule." }),
			note: "CODE: ABSENT"
		},
		absent: {
			state: "INTERRUPTED",
			statement: T("common.oauth.errorNoToken", { defaultValue: "The callback carried no token and no code." }),
			cause: T("common.oauth.failure.absent.cause", { defaultValue: "The address reached this page without the query string the exchange reads, so there was nothing to exchange." }),
			note: "QUERY: EMPTY"
		},
		unknown: {
			state: "INTERRUPTED",
			statement: T("common.oauth.errorGeneric", { defaultValue: "The exchange did not complete, and the provider named no reason." }),
			cause: T("common.oauth.failure.unknown.cause", { defaultValue: "The callback was read and produced neither a session nor an error parameter. The account is not at fault; the attempt can be repeated." }),
			note: "REASON: UNRECORDED"
		}
	},
	fallback: "unknown"
});
// Source/pages/OAuth/Success.astro
var Success_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Success,
	file: () => $$file,
	url: () => $$url
});
var $$Success = createComponent(($$result, $$props, $$slots) => {
	LoadServerNamespace("account");
	const T = GetI18n();
	const Frame = AuthFrameFor("oauthSuccess", T);
	const MetaTitle = T("meta.oauth.success", { defaultValue: "Authentication Successful - Code Editor Land" });
	const MetaDescription = T("meta.oauth.successDescription", { defaultValue: "You have been authenticated successfully." });
	const CompletingText = T("common.oauth.completing", { defaultValue: "The provider has returned you here. The code in the query string is being exchanged for a session." });
	const SuccessTitle = T("common.oauth.success.title", { defaultValue: "Session Written" });
	const SuccessRedirect = T("common.oauth.success.redirect", { defaultValue: "The dashboard opens next. The session lasts seven days." });
	const GoToDashboardText = T("common.oauth.goToDashboard", { defaultValue: "OPEN THE DASHBOARD" });
	const Failure = OAuthResult(T);
	const FailureCodes = [
		"expired",
		"provider",
		"absent",
		"unknown"
	];
	const LoadingWords = [Row("STATUS", "LOADING")];
	const SignedInWords = [Row("STATUS", T("account:auth.oauthSuccess.signedInStatus", { defaultValue: "STATUS: ACTIVE" }))];
	const ErrorWords = [Row("STATUS", "INTERRUPTED")];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription,
		"noIndex": true
	}, {
		"default": ($$result) => renderTemplate`   ${renderComponent($$result, "Auth0CallbackHandler", null, {
			"client:only": "react",
			"Domain": Auth0Domain_default,
			"ClientIdentifier": Auth0ClientIdentifier_default,
			"client:component-hydration": "only",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0CallbackHandler.tsx",
			"client:component-export": "default"
		})}  ${renderComponent($$result, "PageShell", $$PageShell, {
			"index": "# PLATE_03",
			"label": "THE EXCHANGE"
		}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "AuthShell", $$AuthShell, {
			"Label": "Sign-in result",
			"Frame": Frame
		}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div id="LoadingState" class="flex flex-col items-center gap-4 p-8 text-center"> ${renderComponent($$result, "SurfaceState", $$SurfaceState, { "states": LoadingWords })}  ${renderComponent($$result, "ShellState", $$ShellState, {
			"surface": "bare",
			"kind": "loading",
			"index": "EXCHANGE / 00",
			"statement": CompletingText,
			"cause": T("layout.oauth.loading.cause", { defaultValue: "The callback's query string, read in the browser." }),
			"keys": [
				"CODE:",
				"STATE:",
				"SESSION:"
			]
		})} </div> <div id="SuccessState" class="hidden flex-col items-center gap-4 p-8 text-center"> ${renderComponent($$result, "SurfaceState", $$SurfaceState, { "states": SignedInWords })} <div class="flex h-12 w-12 items-center justify-center rounded-none border-2 border-[color:var(--Accent)] text-[color:var(--Accent)]"> <svg aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="24"> <polyline points="20 6 9 17 4 12"></polyline> </svg> </div> <h3 class="type-heading">${SuccessTitle}</h3> <p class="text-card-foreground">${SuccessRedirect}</p> <a href="/Dashboard" id="DashboardFallback" class="StaccatoButton mt-2 inline-flex h-10 items-center justify-center bg-primary px-4 py-2 font-medium text-primary-fg transition-all hover:opacity-90 focus:outline-2 focus:outline-[var(--Primary)] focus:outline-offset-2"> ${GoToDashboardText} ${" "} <span aria-hidden="true">&rarr;</span> </a> </div> <div id="ErrorState" class="hidden p-8"> ${renderComponent($$result, "SurfaceState", $$SurfaceState, { "states": ErrorWords })} <h3 class="type-heading mt-4 mb-6">${Failure.heading}</h3>  ${FailureCodes.map((Code, Position) => renderTemplate`<div class="oauth-failure"${addAttribute(Code, "data-failure")} hidden> ${renderComponent($$result, "ShellState", $$ShellState, {
			"surface": "bare",
			"kind": "error",
			"index": `FAILURE / ${String(Position + 1).padStart(2, "0")}`,
			"statement": Failure.arms[Code].statement,
			"cause": Failure.arms[Code].cause,
			"note": Failure.arms[Code].note,
			"rows": [
				{
					key: "ARM:",
					value: Code.toUpperCase()
				},
				{
					key: "EXCHANGE:",
					value: "/OAUTH/SUCCESS",
					code: true
				},
				{
					key: "SESSION:",
					value: "NOT WRITTEN"
				}
			],
			"next": Failure.next
		})} </div>`)} </div> ` })} ${renderComponent($$result, "ShellPlate", $$ShellPlate, {
			"index": "01",
			"figure": T("layout.oauth.plate.figure", { defaultValue: "THE CALLBACK ROUTE" }),
			"source": "AUTH0",
			"state": "READY",
			"proposition": T("layout.oauth.plate.proposition", { defaultValue: "The provider returns here with a code; the exchange runs in the browser and the card above is its receipt." }),
			"trace": {
				mark: "→",
				value: "/OAuth/Success",
				note: T("layout.oauth.plate.note", { defaultValue: "THE PROVIDER RETURNS HERE" })
			},
			"height": "clamp(11rem, 24vh, 17rem)"
		})} ` })} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/OAuth/Success.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/OAuth/Success.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/OAuth/Success.astro";
var $$url = "/OAuth/Success";
// \0virtual:astro:page:Source/pages/OAuth/Success@_@astro
var page = () => Success_exports;
export { page };
