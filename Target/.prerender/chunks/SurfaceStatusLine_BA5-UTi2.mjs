import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Surface/SurfaceState.astro
createAstro("https://editor.land");
var $$SurfaceState = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SurfaceState;
	const { states, columns = 1, dense = false, class: ClassName } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<ul${addAttribute([
		"surface__states",
		columns === 2 && "surface__states--two",
		dense && "surface__states--dense",
		ClassName
	], "class:list")}> ${states.map((Row) => renderTemplate`<li class="surface__state-row"> <span class="surface__state-key">${Row.key}:</span> <span${addAttribute(["surface__state-word", `surface__state-word--${Row.tone}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": Row.tone
	})} ${Row.value} </span> </li>`)} </ul>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Surface/SurfaceState.astro", void 0);
// Source/Component/Surface/SurfaceStatusLine.astro
createAstro("https://editor.land");
var $$SurfaceStatusLine = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SurfaceStatusLine;
	const { states = [], declarations = [], class: ClassName } = Astro.props;
	return renderTemplate`${states.length || declarations.length ? renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["surface__statusline", ClassName], "class:list")}> ${states.length ? renderTemplate`${renderComponent($$result, "SurfaceState", $$SurfaceState, { "states": states })}` : null} ${declarations.length ? renderTemplate`<dl class="surface__declares"> ${declarations.map((Entry) => renderTemplate`<div class="surface__declare"> <dt class="surface__declare-key">${Entry.key}:</dt> <dd class="surface__declare-value">${Entry.value}</dd> </div>`)} </dl>` : null} </div>` : null}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Surface/SurfaceStatusLine.astro", void 0);
export { $$SurfaceState as n, $$SurfaceStatusLine as t };
