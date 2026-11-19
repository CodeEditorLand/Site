import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$AuthShell } from "./AuthShell_jEq8JTTy.mjs";
import { n as AuthFrameFor } from "./Data_DzJ24Zfb.mjs";
import { St as Header, rt as GetI18n, t as $$Base } from "./Base_BVG1wSoZ.mjs";
// Source/pages/Account/SignUp.astro
var SignUp_exports = /* @__PURE__ */ __exportAll({
	default: () => $$SignUp,
	file: () => $$file,
	url: () => $$url
});
var $$SignUp = createComponent(async ($$result, $$props, $$slots) => {
	const T = GetI18n();
	const MetaTitle = T("meta.account.signUp", { defaultValue: "Registration Is Not Open | Code Editor Land" });
	const MetaDescription = T("account.signUp.subtitle", { defaultValue: "Account creation is not open yet while the portal flow is being finished." });
	const { Auth0Domain, Auth0ClientIdentifier } = await import("./Auth_COyUGpTd.mjs");
	const Frame = AuthFrameFor("signUp", T);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription
	}, {
		"default": ($$result) => renderTemplate`  ${renderComponent($$result, "AuthShell", $$AuthShell, {
			"Label": "Create an account",
			"Frame": Frame
		}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Auth0Account", null, {
			"client:only": "react",
			"Route": "signup",
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
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/SignUp.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Account/SignUp.astro";
var $$url = "/Account/SignUp";
// \0virtual:astro:page:Source/pages/Account/SignUp@_@astro
var page = () => SignUp_exports;
export { page };
