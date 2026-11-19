import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, bt as Tone, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Record/RecordMargin.astro
createAstro("https://editor.land");
var $$RecordMargin = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordMargin;
	const { note, class: Class } = Astro.props;
	const StateTone = note.state ? Tone(note.state.toUpperCase()) ?? "ink" : void 0;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["record-margin", Class], "class:list")} role="note"${addAttribute(`Margin note ${note.index}${note.label ? `: ${note.label}` : ""}`, "aria-label")}> <p class="record-margin__head"> <span class="record-margin__index"># ${note.index}</span> ${note.label ? renderTemplate`<span class="record-margin__label">/ ${note.label}</span>` : null} </p> ${note.state || note.asOf ? renderTemplate`<p class="record-margin__register"> ${note.state ? renderTemplate`<span${addAttribute(["record-margin__state", `record-margin__state--${StateTone}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": StateTone
	})} <span class="record-margin__state-key">STATUS:</span> ${note.state.toUpperCase()} </span>` : null} ${note.asOf ? renderTemplate`<span class="record-margin__asof"> <span class="record-margin__asof-key">AS OF:</span> ${note.asOf} </span>` : null} </p>` : null} <p class="record-margin__body"> <span class="record-margin__arrow" aria-hidden="true">
&#8627;
</span> ${note.body} </p> ${note.link ? note.link.state === "gone" ? renderTemplate`<p class="record-margin__gone"> <span class="record-margin__gone-mark" aria-hidden="true">
&#9678;
</span> <span class="record-margin__gone-label">TARGET GONE:</span> ${note.link.label} <span class="record-margin__gone-route">${note.link.href}</span> </p>` : renderTemplate`<p class="record-margin__link"> <a${addAttribute(note.link.href, "href")}> <span aria-hidden="true">&#8594;</span> ${note.link.label} </a> </p>` : null} <p${addAttribute(["record-margin__source", !note.source && "record-margin__source--absent"], "class:list")}> <span class="record-margin__source-key">SOURCE:</span> ${note.source ?? "UNAVAILABLE"} </p> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordMargin.astro", void 0);
export { $$RecordMargin as t };
