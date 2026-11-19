import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, ct as $$RecordLedger } from "./Base_BVG1wSoZ.mjs";
// Source/Component/More/QuietHead.astro
createAstro("https://editor.land");
var $$QuietHead = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$QuietHead;
	const { index, label, title, proposition, rows, empty, class: Class } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<header${addAttribute(["quiet-head", Class], "class:list")}> <p class="quiet-head__register"> <span class="quiet-head__mark" aria-hidden="true">
#
</span> <span class="quiet-head__index">${index}</span> <span class="quiet-head__label">${label}</span> </p> <h1 class="quiet-head__title">${title}</h1> <p class="quiet-head__proposition"> <span class="quiet-head__proposition-mark" aria-hidden="true">
↳
</span> ${proposition} </p> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
		"rows": rows,
		"columns": 2,
		"surface": "standard",
		"state": rows.length > 0 ? "rest" : "empty",
		"empty": empty,
		"class": "quiet-head__facts"
	})} </header>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/More/QuietHead.astro", void 0);
export { $$QuietHead as t };
