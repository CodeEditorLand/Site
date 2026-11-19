import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$AuthShell } from "./AuthShell_jEq8JTTy.mjs";
import { n as AuthFrameFor } from "./Data_DzJ24Zfb.mjs";
import { St as Header, rt as GetI18n, t as $$Base } from "./Base_BVG1wSoZ.mjs";
// Source/pages/Account/SignIn.astro
var SignIn_exports = /* @__PURE__ */ __exportAll({
	default: () => $$SignIn,
	file: () => $$file,
	url: () => $$url
});
var $$SignIn = createComponent(async ($$result, $$props, $$slots) => {
	const T = GetI18n();
	const MetaTitle = T("meta.account.signIn", { defaultValue: "Sign In - Code Editor Land" });
	const MetaDescription = T("account.signIn.subtitle", { defaultValue: "Sign in to your Land workspace." });
	const { Auth0Domain, Auth0ClientIdentifier } = await import("./Auth_COyUGpTd.mjs");
	const Frame = AuthFrameFor("signIn", T);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "AuthShell", $$AuthShell, {
			"Label": "Sign in",
			"Frame": Frame
		}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Auth0Account", null, {
			"client:only": "react",
			"Route": "signin",
			"Domain": Auth0Domain,
			"ClientIdentifier": Auth0ClientIdentifier,
			"client:component-hydration": "only",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/Auth0Account.tsx",
			"client:component-export": "default"
		})} ` })} `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			"Mode": "functional",
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/SignIn.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/SignIn.astro";
var $$url = "/Account/SignIn";
// \0virtual:astro:page:Source/pages/Account/SignIn@_@astro
var page = () => SignIn_exports;
export { page };
