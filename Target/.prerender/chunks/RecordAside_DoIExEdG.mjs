import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, ct as $$RecordLedger, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Record/RecordAside.astro
createAstro("https://editor.land");
var $$RecordAside = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordAside;
	const { aside, class: Class } = Astro.props;
	const HasSlot = Astro.slots.has("default");
	const Paragraphs = (Body) => Body.split(/\n{2,}/).map((Paragraph) => Paragraph.trim()).filter(Boolean);
	const Prose = (aside.body ?? "") !== "";
	const Rows = aside.rows !== void 0 && aside.rows.length > 0;
	if ([
		HasSlot,
		Rows,
		Prose
	].filter(Boolean).length > 1) console.warn("RecordAside: the aside carries more than one body - the slot wins, then rows, then prose.");
	const HasBody = HasSlot || Rows || Prose || (aside.empty ?? "") !== "" || aside.state === "loading";
	const State = aside.state ?? "rest";
	const Count = aside.count ?? (Rows ? String((aside.rows ?? []).length) : Prose ? String(Paragraphs(aside.body ?? "").length) : void 0);
	return renderTemplate`${HasBody ? renderTemplate`${maybeRenderHead($$result)}<details${addAttribute([
		"record-aside",
		State === "loading" && "record-aside--loading",
		Class
	], "class:list")}${addAttribute(aside.open, "open")}${addAttribute(State, "data-state")}> <summary class="record-aside__summary"> <span class="record-aside__index"># ${aside.index}</span> <span class="record-aside__label">/ ${aside.label}</span> ${Count !== void 0 ? renderTemplate`<span class="record-aside__count">〈${Count}〉</span>` : null} ${State === "loading" ? renderTemplate`<span class="record-aside__state"> <span class="record-aside__state-key">STATUS:</span>
LOADING
</span>` : null} ${renderComponent($$result, "Mark", $$Mark, { "kind": "fold" })} </summary> <div class="record-aside__body"> ${aside.line ? renderTemplate`<p class="record-aside__line"> <span aria-hidden="true">&#8627;</span> ${aside.line} </p>` : null} ${State === "loading" ? renderTemplate`<div class="record-aside__skeleton" aria-hidden="true"> <span class="record-aside__skeleton-bar"></span> <span class="record-aside__skeleton-bar"></span> <span class="record-aside__skeleton-bar"></span> </div>` : HasSlot ? renderTemplate`${renderSlot($$result, $$slots["default"])}` : Rows ? renderTemplate`${renderComponent($$result, "RecordLedger", $$RecordLedger, { "rows": aside.rows ?? [] })}` : Prose ? Paragraphs(aside.body ?? "").map((Paragraph) => renderTemplate`<p class="record-aside__paragraph">${Paragraph}</p>`) : renderTemplate`<p class="record-aside__empty"> <span aria-hidden="true">&#9678;</span> ${aside.empty} </p>`} ${aside.source ? renderTemplate`<p class="record-aside__source"> <span class="record-aside__source-key">SOURCE:</span> ${aside.source} </p>` : null} </div> </details>` : null}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordAside.astro", void 0);
export { $$RecordAside as t };
