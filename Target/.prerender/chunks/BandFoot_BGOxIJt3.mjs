import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, nt as $$Folio } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Detail/See.astro
createAstro("https://editor.land");
var $$See = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$See;
	const { items, label = "SEE", ariaLabel = "Cross-references", class: Class, state = "rest", keys } = Astro.props;
	const LoadingKeys = keys ?? ["ROUTE", "REASON"];
	const References = items.filter((Item) => Item.reason.trim().length > 0);
	return renderTemplate`${state === "loading" ? renderTemplate`${maybeRenderHead($$result)}<nav${addAttribute(["detail-see", Class], "class:list")}${addAttribute(ariaLabel, "aria-label")} data-state="loading" aria-busy="true"> <p class="detail-see__register"> <span class="detail-see__mark" aria-hidden="true">
↳
</span> ${label} </p> <ul class="detail-see__list"> ${LoadingKeys.map((Key) => renderTemplate`<li class="detail-see__row detail-see__row--loading"> <span class="detail-see__route">${Key}:</span> <span class="detail-see__bar" aria-hidden="true"></span> </li>`)} </ul> </nav>` : References.length > 0 ? renderTemplate`<nav${addAttribute(["detail-see", Class], "class:list")}${addAttribute(ariaLabel, "aria-label")}> <p class="detail-see__register"> <span class="detail-see__mark" aria-hidden="true">
↳
</span> ${label} </p> <ul class="detail-see__list"> ${References.map((Item) => renderTemplate`<li class="detail-see__row"> <a class="detail-see__route"${addAttribute(Item.href, "href")}> ${Item.route} </a> <span class="detail-see__reason">${Item.reason}</span> </li>`)} </ul> </nav>` : null}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Detail/See.astro", void 0);
// Source/Component/Detail/BandFoot.astro
createAstro("https://editor.land");
var $$BandFoot = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BandFoot;
	const { index, part, see, seeLabel, seeState = "rest", seeKeys, figure, count, asOf, source, surface = "band", class: Class } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["detail-foot", Class], "class:list")}${addAttribute(surface, "data-surface")}> <div class="detail-foot__row"> ${seeState === "loading" ? renderTemplate`${renderComponent($$result, "See", $$See, {
		"class": "detail-foot__see",
		"items": see ?? [],
		"label": seeLabel,
		"state": "loading",
		"keys": seeKeys
	})}` : see && see.length > 0 ? renderTemplate`${renderComponent($$result, "See", $$See, {
		"class": "detail-foot__see",
		"items": see,
		"label": seeLabel
	})}` : null} ${renderComponent($$result, "Folio", $$Folio, {
		"class": "detail-foot__folio",
		"index": index,
		"part": part,
		"figure": figure,
		"count": count,
		"asOf": asOf,
		"source": source
	})} </div> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Detail/BandFoot.astro", void 0);
export { $$See as n, $$BandFoot as t };
