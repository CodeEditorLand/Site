import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Shell/ShellPanes.astro
createAstro("https://editor.land");
var $$ShellPanes = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ShellPanes;
	const { primary, secondary, ratio = "5/7", layout = "panes", drawer, dense = false, class: ClassName } = Astro.props;
	const HasDrawer = Astro.slots.has("drawer");
	const HasPrimary = Astro.slots.has("primary");
	const HasSecondary = Astro.slots.has("secondary");
	const StateOf = (Pane, HasSlot) => Pane.state ?? (HasSlot ? "rest" : "empty");
	const WordOf = (State) => State === "loading" ? "LOADING" : "UNAVAILABLE";
	const ToneOf = (State) => State === "loading" ? "quiet" : "ink";
	const PrimaryState = StateOf(primary, HasPrimary);
	const SecondaryState = StateOf(secondary, HasSecondary);
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([
		"ShellPanes",
		layout === "stack" ? "ShellPanes--stack" : `ShellPanes--${ratio.replace("/", "-")}`,
		dense ? "ShellPanes--dense" : null,
		ClassName
	], "class:list")}> <div class="ShellPanes__grid"> <section class="ShellPanes__pane ShellPanes__pane--primary"${addAttribute(PrimaryState, "data-state")}> <header class="ShellPanes__head"> <p class="ShellPanes__mark">${primary.mark}</p> <p class="ShellPanes__label">${primary.label}</p> ${primary.meta ? renderTemplate`<p class="ShellPanes__meta">${primary.meta}</p>` : null} </header> ${primary.note ? renderTemplate`<p class="ShellPanes__note">${primary.note}</p>` : null} <div class="ShellPanes__body"> ${PrimaryState === "rest" ? renderTemplate`${renderSlot($$result, $$slots["primary"])}` : renderTemplate`<div class="ShellPanes__absent"${addAttribute(PrimaryState, "data-state")}> <p${addAttribute(["ShellPanes__status", `ShellPanes__status--${ToneOf(PrimaryState)}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": ToneOf(PrimaryState)
	})} <span class="ShellPanes__status-key">STATUS:</span> ${WordOf(PrimaryState)} </p> ${PrimaryState === "loading" ? renderTemplate`<div class="ShellPanes__skeleton" aria-hidden="true"> ${(primary.keys?.length ? primary.keys : [
		"RECORD",
		"ROUTE",
		"STATE"
	]).map((Key, Index) => renderTemplate`<p class="ShellPanes__skeleton-row"> <span class="ShellPanes__skeleton-key">${Key}:</span> <span class="ShellPanes__bar"${addAttribute(`--bar:${[
		64,
		42,
		78,
		55,
		36,
		70
	][Index % 6]}%`, "style")}></span> </p>`)} </div>` : renderTemplate`<p class="ShellPanes__sentence"> ${primary.empty ?? "UNAVAILABLE"} </p>`} </div>`} </div> </section> <div class="ShellPanes__gutter" aria-hidden="true"></div> <section class="ShellPanes__pane ShellPanes__pane--secondary"${addAttribute(SecondaryState, "data-state")}> <header class="ShellPanes__head"> <p class="ShellPanes__mark">${secondary.mark}</p> <p class="ShellPanes__label">${secondary.label}</p> ${secondary.meta ? renderTemplate`<p class="ShellPanes__meta">${secondary.meta}</p>` : null} </header> ${secondary.note ? renderTemplate`<p class="ShellPanes__note">${secondary.note}</p>` : null} <div class="ShellPanes__body"> ${SecondaryState === "rest" ? renderTemplate`${renderSlot($$result, $$slots["secondary"])}` : renderTemplate`<div class="ShellPanes__absent"${addAttribute(SecondaryState, "data-state")}> <p${addAttribute(["ShellPanes__status", `ShellPanes__status--${ToneOf(SecondaryState)}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": ToneOf(SecondaryState)
	})} <span class="ShellPanes__status-key">STATUS:</span> ${WordOf(SecondaryState)} </p> ${SecondaryState === "loading" ? renderTemplate`<div class="ShellPanes__skeleton" aria-hidden="true"> ${(secondary.keys?.length ? secondary.keys : [
		"RECORD",
		"ROUTE",
		"STATE"
	]).map((Key, Index) => renderTemplate`<p class="ShellPanes__skeleton-row"> <span class="ShellPanes__skeleton-key">${Key}:</span> <span class="ShellPanes__bar"${addAttribute(`--bar:${[
		64,
		42,
		78,
		55,
		36,
		70
	][Index % 6]}%`, "style")}></span> </p>`)} </div>` : renderTemplate`<p class="ShellPanes__sentence"> ${secondary.empty ?? "UNAVAILABLE"} </p>`} </div>`} </div> </section> </div> ${drawer && HasDrawer ? renderTemplate`<details class="ShellPanes__drawer"${addAttribute(drawer.open, "open")}> <summary class="ShellPanes__drawer-summary"> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "fold",
		"class": "ShellPanes__drawer-mark"
	})} <span class="ShellPanes__drawer-label">${drawer.label}</span> ${drawer.note ? renderTemplate`<span class="ShellPanes__drawer-note">${drawer.note}</span>` : null} </summary> <div class="ShellPanes__drawer-body"> ${renderSlot($$result, $$slots["drawer"])} </div> </details>` : null} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Shell/ShellPanes.astro", void 0);
export { $$ShellPanes as t };
