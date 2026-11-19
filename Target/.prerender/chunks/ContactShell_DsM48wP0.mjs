import { d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$ContactPage } from "./ContactPage_U0NHxsGj.mjs";
import { t as $$ContactWorkspace } from "./ContactWorkspace_q78-f8fZ.mjs";
import { l as Requests } from "./Purpose_DgbipYwf.mjs";
// Source/Component/Contact/ContactShell.astro
createAstro("https://editor.land");
var $$ContactShell = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ContactShell;
	const { code, state = "rest" } = Astro.props;
	const Config = Requests[code];
	const trail = [
		{
			label: "/HOME",
			href: "/"
		},
		{
			label: "/DASHBOARD",
			href: "/Dashboard"
		},
		{ label: `/${Config.Title.toUpperCase()}` }
	];
	return renderTemplate`${renderComponent($$result, "ContactPage", $$ContactPage, {
		"metaTitle": `${Config.Title} | Code Editor Land`,
		"metaDescription": Config.Subtitle,
		"trail": trail,
		"record": {
			code: Config.Code,
			article: Config.Article,
			route: "/CONTACT",
			window: Config.ResponseDays
		},
		"opening": "trail"
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "ContactWorkspace", $$ContactWorkspace, {
		"code": code,
		"state": state
	})} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Contact/ContactShell.astro", void 0);
export { $$ContactShell as t };
