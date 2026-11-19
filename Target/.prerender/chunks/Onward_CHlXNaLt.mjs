import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/More/Onward.astro
createAstro("https://editor.land");
var $$Onward = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Onward;
	const { rows, copy, current, class: Class } = Astro.props;
	const IsCurrent = (Row) => current !== void 0 && Row.href === current;
	return renderTemplate`${maybeRenderHead($$result)}<nav${addAttribute(["onward", Class], "class:list")}${addAttribute(copy.label.replace(/^\//, ""), "aria-label")}> <p class="onward__register"> <span class="onward__mark" aria-hidden="true">
#
</span> <span class="onward__index">${copy.index}</span> <span class="onward__label">${copy.label}</span> </p> <p class="onward__statement">${copy.statement}</p> ${rows.length > 0 ? renderTemplate`<ol class="onward__rows"> ${rows.map((Row) => renderTemplate`<li class="onward__row"> ${IsCurrent(Row) ? renderTemplate`<span class="onward__link onward__link--current" aria-current="page"> <span class="onward__row-mark" aria-hidden="true"> ${Row.mark} </span> <span class="onward__want">${Row.want}</span> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "arrow",
		"class": "onward__arrow"
	})} <span class="onward__where">${Row.where}</span> <span class="onward__current">YOU ARE HERE</span> </span>` : renderTemplate`<a class="onward__link"${addAttribute(Row.href, "href")}> <span class="onward__row-mark" aria-hidden="true"> ${Row.mark} </span> <span class="onward__want">${Row.want}</span> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "arrow",
		"class": "onward__arrow"
	})} <span class="onward__where">${Row.where}</span> </a>`} ${Row.note ? renderTemplate`<p class="onward__note">${Row.note}</p>` : null} </li>`)} </ol>` : renderTemplate`<p class="onward__empty">${copy.empty}</p>`} ${copy.note ? renderTemplate`<p class="onward__source">${copy.note}</p>` : null} </nav>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/More/Onward.astro", void 0);
export { $$Onward as t };
