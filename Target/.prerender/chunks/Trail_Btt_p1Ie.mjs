import { E as addAttribute, b as maybeRenderHead, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
// Source/Component/Route/Trail.astro
createAstro("https://editor.land");
var $$Trail = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Trail;
	const { trail, label: Label = "Breadcrumb", class: Class } = Astro.props;
	const Last = trail.length - 1;
	return renderTemplate`${trail.length === 0 ? null : renderTemplate`${maybeRenderHead($$result)}<nav${addAttribute(["trail", Class], "class:list")}${addAttribute(Label, "aria-label")}> <ol class="trail__list"> ${trail.map((Item, Index) => renderTemplate`<li class="trail__item"> ${Item.href && Index !== Last ? renderTemplate`<a class="trail__link"${addAttribute(Item.href, "href")}> ${Item.label} </a>` : renderTemplate`<span class="trail__current" aria-current="page"> ${Item.label} </span>`} </li>`)} </ol> </nav>`}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Route/Trail.astro", void 0);
export { $$Trail as t };
