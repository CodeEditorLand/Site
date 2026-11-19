import { E as addAttribute, b as maybeRenderHead, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
// Source/Component/UI/Fold/Fold.astro
createAstro("https://editor.land");
var $$Fold = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Fold;
	const { Items, Name = "ON THIS PAGE", Wide = false, Empty, class: Class } = Astro.props;
	const Count = String(Items.length).padStart(2, "0");
	return renderTemplate`${maybeRenderHead($$result)}<details${addAttribute([
		"Fold",
		Wide && "Fold--wide",
		Class
	], "class:list")}> <summary class="Fold__Summary"> <span class="Fold__Mark" aria-hidden="true">
#
</span> <span class="Fold__Name">${Name}</span> <span class="Fold__Rule" aria-hidden="true">
/
</span> <span class="Fold__Count">${Count}</span> <span class="Fold__Word Fold__Word--open">OPEN</span> <span class="Fold__Word Fold__Word--close">CLOSE</span> <span class="Fold__Disclosure MarkFold" aria-hidden="true"></span> </summary> ${Items.length > 0 ? renderTemplate`<ol class="Fold__List"> ${Items.map((Item) => renderTemplate`<li> <a class="Fold__Row"${addAttribute(Item.Href, "href")}> <span class="Fold__Index">${Item.Index}</span> <span class="Fold__Label">${Item.Label}</span> ${Item.Meta ? renderTemplate`<span class="Fold__Meta">${Item.Meta}</span>` : null} </a> </li>`)} </ol>` : renderTemplate`<div class="Fold__Empty"> <p class="Fold__EmptyMark"> <b aria-hidden="true">◎</b> <span>NO SECTION</span> </p> <p class="Fold__EmptyLine"> <span aria-hidden="true">↳</span> ${Empty} </p> </div>`} </details>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/UI/Fold/Fold.astro", void 0);
export { $$Fold as t };
