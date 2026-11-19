import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Xt as renderScript, Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
// Source/Component/Record/RecordTranscript.astro
createAstro("https://editor.land");
var $$RecordTranscript = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordTranscript;
	const { transcript, class: Class } = Astro.props;
	const State = transcript.state ?? "rest";
	const Printed = transcript.window !== void 0 ? transcript.turns.slice(0, transcript.window.showing) : transcript.turns;
	const Count = transcript.window?.total ?? String(transcript.turns.length);
	const Unit = transcript.turns.length === 1 ? "TURN" : "TURNS";
	const Payload = transcript.turns.map((Turn) => `${Turn.speaker}> ${Turn.line}`).join("\n");
	const CopyLabel = `Copy ${transcript.index} to the clipboard`;
	const Copy = transcript.copy ?? true;
	const Id = `transcript-${transcript.index.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
	return renderTemplate`${maybeRenderHead($$result)}<figure${addAttribute([
		"record-transcript",
		State === "loading" && "record-transcript--loading",
		State === "empty" && "record-transcript--empty",
		Class
	], "class:list")}${addAttribute(Id, "id")}> <figcaption class="record-transcript__bar"> <span class="record-transcript__head"> <span class="record-transcript__index"># ${transcript.index}</span> ${transcript.label ? renderTemplate`<span class="record-transcript__label">
/ ${transcript.label} </span>` : null} </span> ${transcript.asOf ? renderTemplate`<span class="record-transcript__asof"> <span class="record-transcript__asof-key">AS OF:</span> ${transcript.asOf} </span>` : null} <span class="record-transcript__count"> ${Count} <span class="record-transcript__count-unit">${Unit}</span> </span> ${Copy && State !== "empty" ? renderTemplate`${renderComponent($$result, "jelly-icon-button", "jelly-icon-button", {
		"class": "record-transcript__copy",
		"data-record-transcript-copy": true,
		"data-copy-payload": Payload,
		"size": "small",
		"shape": "square",
		"label": CopyLabel,
		"aria-label": CopyLabel,
		"title": CopyLabel,
		"style": "--jelly-fill: var(--Mute); --jelly-label: var(--Foreground); --jelly-icon-button-radius: 0px; --jelly-ring: var(--Accent);"
	}, { "default": ($$result) => renderTemplate` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--jelly-label)" aria-hidden="true"> <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect> <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path> </svg> ` })}` : null} </figcaption> ${State === "empty" ? renderTemplate`<p class="record-transcript__empty"> <span class="record-transcript__empty-mark" aria-hidden="true">
&#9678;
</span> ${transcript.empty} </p>` : renderTemplate`<ol class="record-transcript__turns"> ${Printed.map((Turn) => renderTemplate`<li${addAttribute(["record-transcript__turn", Turn.state && "record-transcript__turn--state"], "class:list")}${addAttribute(Turn.mark, "data-mark")}> <span class="record-transcript__mark" aria-hidden="true"> ${Turn.mark} </span> <span class="record-transcript__speaker"> ${Turn.speaker} </span> <span class="record-transcript__line"> ${State === "loading" ? renderTemplate`<span class="record-transcript__skeleton" aria-hidden="true"></span>` : Turn.line} </span> <span class="record-transcript__stamp"> ${Turn.state ? Turn.state.toUpperCase() : Turn.stamp ?? ""} </span> ${Turn.state && (Turn.cause || Turn.next) ? renderTemplate`<p class="record-transcript__turn-fail"> ${Turn.cause ? renderTemplate`<span class="record-transcript__turn-fail-row"> <span class="record-transcript__turn-fail-key">
CAUSE:
</span> ${Turn.cause} </span>` : null} ${Turn.next ? renderTemplate`<span class="record-transcript__turn-fail-row"> <span class="record-transcript__turn-fail-key">
NEXT:
</span> ${Turn.next} </span>` : null} </p>` : null} </li>`)} </ol>`} ${transcript.window !== void 0 || transcript.note || transcript.retry ? renderTemplate`<p class="record-transcript__foot"> ${transcript.window !== void 0 ? renderTemplate`<span class="record-transcript__window"> <span class="record-transcript__window-key">SHOWING:</span> ${transcript.window.showing} <span class="record-transcript__window-of">OF</span> ${transcript.window.total} </span>` : null} ${transcript.note ? renderTemplate`<span class="record-transcript__note">${transcript.note}</span>` : null} ${transcript.retry ? renderTemplate`<span class="record-transcript__retry"> <a${addAttribute(transcript.retry.href, "href")}> <span aria-hidden="true">→</span> ${" "} ${transcript.retry.label} </a> </span>` : null} </p>` : null} <p class="record-transcript__source"> <span class="record-transcript__source-key">SOURCE:</span> ${transcript.source} </p> </figure>${renderScript($$result, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordTranscript.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordTranscript.astro", void 0);
export { $$RecordTranscript as t };
