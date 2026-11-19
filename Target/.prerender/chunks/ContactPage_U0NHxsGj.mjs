import { b as maybeRenderHead, d as renderComponent, g as renderSlot, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { St as Header, Zt as createAstro, t as $$Base } from "./Base_BVG1wSoZ.mjs";
import { t as $$ContactHead } from "./ContactHead_B8R9_e7f.mjs";
// Source/Component/Contact/ContactPage.astro
createAstro("https://editor.land");
var $$ContactPage = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ContactPage;
	const { metaTitle, metaDescription, trail, record, heading, standfirst, width = "wide", opening = "page", state = "rest", empty, mode } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": metaTitle,
		"Description": metaDescription,
		"Url": Astro.url.href,
		"Language": "en"
	}, {
		"default": ($$result) => renderTemplate`  ${maybeRenderHead($$result)}<div class="contact-page"> ${renderComponent($$result, "ContactHead", $$ContactHead, {
			"trail": trail,
			"record": record,
			"heading": heading,
			"standfirst": standfirst,
			"width": width,
			"opening": opening,
			"state": state,
			"empty": empty
		})} ${renderSlot($$result, $$slots["default"])} </div> `,
		"Header": ($$result) => renderTemplate`${renderComponent($$result, "Header", Header, {
			"client:load": true,
			...mode ? { Mode: mode } : {},
			"slot": "Header",
			"client:component-hydration": "load",
			"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
			"client:component-export": "Header"
		})}`
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Contact/ContactPage.astro", void 0);
export { $$ContactPage as t };
