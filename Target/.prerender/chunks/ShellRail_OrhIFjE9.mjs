import { E as addAttribute, b as maybeRenderHead, d as renderComponent, p as Fragment, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Shell/ShellRail.astro
createAstro("https://editor.land");
var $$ShellRail = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ShellRail;
	const { label, count, items = [], groups, foot, current = "location", state = "rest", empty, keys = [], sticky = true, dense = false, class: ClassName } = Astro.props;
	const Count = count === void 0 ? null : String(count);
	const Absent = state !== "rest";
	const Sections = groups !== void 0 && groups.length > 0 ? groups : [{
		label,
		items
	}];
	const Grouped = groups !== void 0 && groups.length > 0;
	return renderTemplate`${maybeRenderHead($$result)}<nav${addAttribute([
		"ShellRail",
		sticky ? "ShellRail--sticky" : null,
		dense ? "ShellRail--dense" : null,
		Grouped ? "ShellRail--grouped" : null,
		ClassName
	], "class:list")}${addAttribute(label, "aria-label")}${addAttribute(state, "data-state")}> <p class="ShellRail__head"> <span class="ShellRail__mark" aria-hidden="true">#</span> <span class="ShellRail__label">${label}</span> ${Count !== null ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <span class="ShellRail__sep" aria-hidden="true">${" "}</span> <span class="ShellRail__count">${Count}</span> ` })}` : null} </p> ${Absent ? renderTemplate`<div class="ShellRail__absent"${addAttribute(state, "data-state")}> <p${addAttribute(["ShellRail__status", `ShellRail__status--${state === "loading" ? "quiet" : "ink"}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": state === "loading" ? "quiet" : "ink"
	})} <span class="ShellRail__status-key">STATUS:</span> ${state === "loading" ? "LOADING" : "UNAVAILABLE"} </p> ${state === "loading" ? renderTemplate`<div class="ShellRail__skeleton" aria-hidden="true"> ${(keys.length > 0 ? keys : [
		"ROUTE",
		"PART",
		"SHEET"
	]).map((Key, Index) => renderTemplate`<p class="ShellRail__skeleton-row"> <span class="ShellRail__skeleton-key">${Key}:</span> <span class="ShellRail__bar"${addAttribute(`--bar:${[
		64,
		42,
		78,
		55,
		36,
		70
	][Index % 6]}%`, "style")}></span> </p>`)} </div>` : renderTemplate`<p class="ShellRail__sentence">${empty ?? "UNAVAILABLE"}</p>`} </div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${Sections.map((Section, SectionIndex) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${Grouped ? renderTemplate`<p class="ShellRail__group-head"> ${Section.mark ? renderTemplate`<span class="ShellRail__group-mark" aria-hidden="true"> ${Section.mark} </span>` : null} <span class="ShellRail__group-label">${Section.label}</span> <span class="ShellRail__group-sep" aria-hidden="true"> ${" "} </span> <span class="ShellRail__group-count"> ${String(Section.items.length).padStart(2, "0")} </span> </p>` : null} <ol class="ShellRail__list"${addAttribute(Grouped ? Section.label : void 0, "aria-label")}${addAttribute(Grouped ? void 0 : 1, "start")}${addAttribute(`${Section.label}-${SectionIndex}`, "key")}> ${Section.items.map((Item) => renderTemplate`<li class="ShellRail__item"> ${Item.href ? renderTemplate`<a class="ShellRail__row"${addAttribute(Item.href, "href")}${addAttribute(Item.current ? current : void 0, "aria-current")}> <span class="ShellRail__row-mark" aria-hidden="true"> ${Item.mark ?? ""} </span> <span class="ShellRail__row-body"> <span class="ShellRail__row-label"> ${Item.label} </span> ${Item.note ? renderTemplate`<span class="ShellRail__row-note"> ${Item.note} </span>` : null} </span> ${Item.meta ? renderTemplate`<span class="ShellRail__row-meta">${Item.meta}</span>` : null} </a>` : renderTemplate`<span class="ShellRail__row ShellRail__row--statement"${addAttribute(Item.current ? current : void 0, "aria-current")}> <span class="ShellRail__row-mark" aria-hidden="true"> ${Item.mark ?? ""} </span> <span class="ShellRail__row-body"> <span class="ShellRail__row-label"> ${Item.label} </span> ${Item.note ? renderTemplate`<span class="ShellRail__row-note"> ${Item.note} </span>` : null} </span> ${Item.meta ? renderTemplate`<span class="ShellRail__row-meta">${Item.meta}</span>` : null} </span>`} </li>`)} </ol> ` })}`)} ` })}`} ${foot ? renderTemplate`<p class="ShellRail__foot"> <a class="ShellRail__foot-link"${addAttribute(foot.href, "href")}> ${foot.label} ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "arrow",
		"class": "ShellRail__foot-arrow"
	})} </a> </p>` : null} </nav>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Shell/ShellRail.astro", void 0);
export { $$ShellRail as t };
