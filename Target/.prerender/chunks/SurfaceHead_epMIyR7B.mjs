import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, ct as $$RecordLedger } from "./Base_BVG1wSoZ.mjs";
import { t as $$SurfaceLife } from "./SurfaceLife_Ci25FCf-.mjs";
import { t as $$SurfaceStatusLine } from "./SurfaceStatusLine_BA5-UTi2.mjs";
// Source/Component/Surface/SurfaceHead.astro
createAstro("https://editor.land");
var $$SurfaceHead = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SurfaceHead;
	const { index, title, proposition, states = [], declarations = [], rows = [], life, lifeNote, display = false, class: ClassName } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<header${addAttribute(["surface-head", ClassName], "class:list")}> <div class="surface-head__inner"> <div class="surface-head__plate"> <p class="surface-head__index">${index}</p> ${renderSlot($$result, $$slots["mark"])} </div> <h1${addAttribute(["surface-head__title", display && "surface-head__title--display"], "class:list")}> ${title} </h1> ${proposition ? renderTemplate`<p class="surface-head__proposition">${proposition}</p>` : null} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "SurfaceStatusLine", $$SurfaceStatusLine, {
		"states": states,
		"declarations": declarations
	})} ${life ? renderTemplate`${renderComponent($$result, "SurfaceLife", $$SurfaceLife, {
		"term": life,
		"note": lifeNote
	})}` : null} ${rows.length ? renderTemplate`${renderComponent($$result, "RecordLedger", $$RecordLedger, {
		"class": "surface-head__facts",
		"rows": rows,
		"columns": 2
	})}` : null} </div> </header>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Surface/SurfaceHead.astro", void 0);
export { $$SurfaceHead as t };
