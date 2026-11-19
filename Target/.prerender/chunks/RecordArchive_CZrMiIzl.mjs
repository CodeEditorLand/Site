import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$FieldRecordIndex } from "./FieldRecordIndex_B-25WaIo.mjs";
// Source/Component/Record/RecordArchive.astro
createAstro("https://editor.land");
var $$RecordArchive = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordArchive;
	const { entries, index, heading, count, state, empty, window: Window, note, class: Class } = Astro.props;
	const Printed = Window === void 0 ? entries : entries.slice(0, Window.showing);
	const State = state ?? (entries.length === 0 ? "empty" : "rest");
	const Absent = State !== "rest";
	const Absence = empty ?? "UNAVAILABLE";
	const AbsenceTone = State === "loading" ? "quiet" : "ink";
	const RunsOf = (Items) => Items.reduce((Runs, Entry) => {
		const Last = Runs[Runs.length - 1];
		return Last !== void 0 && Last.label === Entry.group ? [...Runs.slice(0, -1), {
			label: Last.label,
			entries: [...Last.entries, Entry]
		}] : [...Runs, {
			label: Entry.group,
			entries: [Entry]
		}];
	}, []);
	const Runs = RunsOf(Printed);
	const Marked = Printed.some((Entry) => Entry.marker !== void 0);
	const Count = count ?? String(entries.length);
	const Marker = index?.replace(/^#\s*/, "");
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute([
		"record-archive",
		Marked ? "record-archive--marked" : null,
		Class
	], "class:list")}> <header class="record-archive__head"> <div class="record-archive__record"> ${Marker ? renderTemplate`${renderComponent($$result, "FieldRecordIndex", $$FieldRecordIndex, { "index": Marker })}` : null} ${heading ? renderTemplate`<h2 class="record-archive__heading">${heading}</h2>` : null} </div> <p class="record-archive__count">${Count}</p> </header> ${Absent ? renderTemplate`<div class="record-archive__absent" role="status"${addAttribute(State, "data-state")}> <p class="record-archive__absent-head"> <span class="record-archive__absent-mark" aria-hidden="true">
&#9678;
</span> <span class="record-archive__absent-key">STATUS:</span> <span${addAttribute(["record-archive__absent-state", `record-archive__absent-state--${AbsenceTone}`], "class:list")}> ${State.toUpperCase()} </span> </p> <p class="record-archive__absent-line">${Absence}</p> </div>` : Printed.length > 0 ? renderTemplate`<div class="record-archive__body"> ${Runs.map((Run) => renderTemplate`<div class="record-archive__run"> ${Run.label ? renderTemplate`<p class="record-archive__label">${Run.label}</p>` : null} <ul class="record-archive__list"> ${Run.entries.map((Entry) => renderTemplate`<li class="record-archive__row"> ${Entry.state === "gone" ? renderTemplate`<span class="record-archive__gone"> <span class="record-archive__gone-mark" aria-hidden="true">
&#9678;
</span> ${Entry.marker ? renderTemplate`<span class="record-archive__marker"> ${Entry.marker} </span>` : null} <span class="record-archive__title"> ${Entry.title} </span> ${Entry.note ? renderTemplate`<span class="record-archive__note"> ${Entry.note} </span>` : null} <span class="record-archive__gone-route">
TARGET GONE:
${Entry.href} </span> </span>` : renderTemplate`<a class="record-archive__link"${addAttribute(Entry.href, "href")}> ${Entry.marker ? renderTemplate`<span class="record-archive__marker"> ${Entry.marker} </span>` : null} <span class="record-archive__title"> ${Entry.title} </span> ${Entry.note ? renderTemplate`<span class="record-archive__note"> ${Entry.note} </span>` : null} </a>`} </li>`)} </ul> </div>`)} </div>` : null} ${Window !== void 0 || note ? renderTemplate`<p class="record-archive__foot"> ${Window !== void 0 ? renderTemplate`<span class="record-archive__window"> <span class="record-archive__window-key">SHOWING:</span> ${Window.showing} <span class="record-archive__window-of">OF</span> ${Window.total} </span>` : null} ${note ? renderTemplate`<span class="record-archive__note-line">${note}</span>` : null} </p>` : null} </section>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordArchive.astro", void 0);
export { $$RecordArchive as t };
