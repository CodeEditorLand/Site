import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, lt as $$Register, ut as Padded, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Detail/Leader.astro
createAstro("https://editor.land");
var $$Leader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Leader;
	const { items, register, columns = 1, state = "rest", empty, limit, more, class: Class } = Astro.props;
	const Count = Padded(items.length);
	const Line = register === void 0 ? void 0 : {
		...register,
		count: Count
	};
	const Truncated = limit !== void 0 && items.length > limit;
	const Shown = Truncated ? items.slice(0, limit) : items;
	const SkeletonRows = items.length > 0 ? items.length : 6;
	const Bars = [
		64,
		42,
		78,
		55,
		36,
		70
	];
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["detail-leader", Class], "class:list")}${addAttribute(state, "data-state")}> ${Line && renderTemplate`${renderComponent($$result, "Register", $$Register, {
		"register": Line,
		"state": state,
		"class": "detail-leader__register"
	})}`} ${state === "empty" ? empty && renderTemplate`<p class="detail-leader__empty">${empty}</p>` : renderTemplate`<ol${addAttribute(["detail-leader__list", `detail-leader__list--${columns}`], "class:list")}${addAttribute(state === "loading" ? "true" : void 0, "aria-busy")}> ${state === "loading" ? Array.from({ length: SkeletonRows }, (_, Index) => renderTemplate`<li class="detail-leader__row detail-leader__row--skeleton"> <span class="detail-leader__line"> <span class="detail-leader__label"> <span class="detail-leader__bar"${addAttribute(`--bar:${Bars[Index % Bars.length]}%`, "style")} aria-hidden="true"></span> </span> <span class="detail-leader__dots" aria-hidden="true"></span> <span class="detail-leader__meta"> <span class="detail-leader__bar"${addAttribute(`--bar:${Bars[(Index + 3) % Bars.length]}%`, "style")} aria-hidden="true"></span> </span> </span> </li>`) : Shown.map((Item) => renderTemplate`<li class="detail-leader__row"${addAttribute(Item.state ?? "rest", "data-state")}> <span class="detail-leader__line"> ${Item.href ? renderTemplate`<a class="detail-leader__label"${addAttribute(Item.href, "href")}> ${Item.label} </a>` : renderTemplate`<span class="detail-leader__label"> ${Item.label} </span>`} <span class="detail-leader__dots" aria-hidden="true"></span> <span class="detail-leader__meta"> ${Item.state === "unavailable" ? "UNAVAILABLE" : Item.meta ?? "◎"} </span> </span> ${Item.note && renderTemplate`<span class="detail-leader__note">
↳ ${Item.note} </span>`} </li>`)} </ol>`} ${Truncated && renderTemplate`<p class="detail-leader__more">
SHOWING: ${Shown.length} OF ${items.length} ${more && renderTemplate`<a class="detail-leader__more-link"${addAttribute(more.href, "href")}> ${more.label} ${renderComponent($$result, "Mark", $$Mark, { "kind": "arrow" })} </a>`} </p>`} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Detail/Leader.astro", void 0);
export { $$Leader as t };
