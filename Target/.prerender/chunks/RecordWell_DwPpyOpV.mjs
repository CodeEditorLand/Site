import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Xt as renderScript, Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
// Source/Component/Record/RecordWell.astro
createAstro("https://editor.land");
var $$RecordWell = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordWell;
	const { label, language, lines, copy = true, source, wrap = false, window: Window, state, empty, note, class: Class } = Astro.props;
	const Prompt = /^\$ /;
	const Annotation = /\s+(?:#|\/\/).*$/;
	const State = state ?? (lines.length === 0 ? "empty" : "rest");
	const Absent = State !== "rest";
	const Absence = empty ?? "UNAVAILABLE";
	const AbsenceTone = State === "loading" ? "quiet" : "ink";
	const Shown = Window === void 0 ? lines : lines.slice(0, Window.showing);
	const Printed = Shown.map((Line, Index) => Index === Shown.length - 1 ? Line.replace(Prompt, "") : `${Line.replace(Prompt, "")}\n`);
	const Payload = lines.map((Line) => Line.replace(Prompt, "").replace(Annotation, "").trimEnd()).join("\n");
	const CopyLabel = `Copy ${label} to the clipboard`;
	const HasFoot = Window !== void 0 || note !== void 0 || source !== void 0;
	return renderTemplate`${maybeRenderHead($$result)}<figure${addAttribute([
		"record-well",
		wrap && "record-well--wrap",
		Absent && "record-well--absent",
		Class
	], "class:list")}${addAttribute(State, "data-state")}> <figcaption class="record-well__bar"> <span class="record-well__label">${label}</span> ${language && renderTemplate`<span class="record-well__lang">${language}</span>`} ${copy && !Absent && renderTemplate`${renderComponent($$result, "jelly-icon-button", "jelly-icon-button", {
		"class": "record-well__copy",
		"data-record-well-copy": true,
		"data-copy-payload": Payload,
		"size": "small",
		"shape": "square",
		"label": CopyLabel,
		"aria-label": CopyLabel,
		"title": CopyLabel,
		"style": "--jelly-fill: var(--Mute); --jelly-label: var(--Foreground); --jelly-icon-button-radius: 0px; --jelly-ring: var(--Accent);"
	}, { "default": ($$result) => renderTemplate` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--jelly-label)" aria-hidden="true"> <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect> <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path> </svg> ` })}`} </figcaption> ${Absent ? renderTemplate`<p class="record-well__absent" role="status"> <span class="record-well__absent-mark" aria-hidden="true">
&#9678;
</span> <span class="record-well__absent-key">STATUS:</span> <span${addAttribute(["record-well__absent-state", `record-well__absent-state--${AbsenceTone}`], "class:list")}> ${State.toUpperCase()} </span> <span class="record-well__absent-line">${Absence}</span> </p>` : renderTemplate`<pre class="record-well__body"><code>${Printed.map((Line) => renderTemplate`<span class="record-well__line">${Line}</span>`)}</code></pre>`} ${HasFoot && renderTemplate`<div class="record-well__foot"> ${Window !== void 0 && renderTemplate`<p class="record-well__window"> <span class="record-well__window-key">SHOWING:</span> ${Window.showing} <span class="record-well__window-of">OF</span> ${Window.total} </p>`} ${note && renderTemplate`<p class="record-well__note">${note}</p>`} ${source && renderTemplate`<p class="record-well__source"> <span class="record-well__source-key">SOURCE:</span> ${source} </p>`} </div>`} </figure>${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordWell.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordWell.astro", void 0);
export { $$RecordWell as t };
