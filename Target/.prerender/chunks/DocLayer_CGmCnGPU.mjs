import { E as addAttribute, b as maybeRenderHead, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
// Source/Component/Doc/DocLayer.astro
createAstro("https://editor.land");
var $$DocLayer = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DocLayer;
	const { label, heading, unit, unitOne, entries, activeId } = Astro.props;
	const Marker = (Position) => String(Position + 1).padStart(2, "0");
	const Unit = entries.length === 1 ? unitOne ?? unit : unit;
	return renderTemplate`${entries.length > 1 ? renderTemplate`${maybeRenderHead($$result)}<details class="doc-layer"> <summary class="doc-layer__summary"> <span class="doc-layer__label">${label}</span> <span class="doc-layer__value">${heading}</span> <span class="doc-layer__count"> ${entries.length} ${" "} ${Unit} </span> <span class="doc-layer__marker" aria-hidden="true">
›
</span> </summary> <div class="doc-layer__body"> <ol class="doc-layer__list"> ${entries.map((Entry, Position) => renderTemplate`<li class="doc-layer__item"> <a${addAttribute(["doc-layer__link", Entry.Id === activeId ? "doc-layer__link--current" : null], "class:list")}${addAttribute(Entry.Href, "href")}${addAttribute(Entry.Id === activeId ? "page" : void 0, "aria-current")}> <span class="doc-layer__index" aria-hidden="true"> ${Marker(Position)} </span> <span class="doc-layer__name">${Entry.Label}</span> </a> </li>`)} </ol> </div> </details>` : entries.length === 1 ? renderTemplate`<p class="doc-layer doc-layer--solo"> <span class="doc-layer__label">${label}</span> <span class="doc-layer__value">${heading}</span> <span class="doc-layer__count"> ${entries.length} ${" "} ${Unit} </span> </p>` : null}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Doc/DocLayer.astro", void 0);
export { $$DocLayer as t };
