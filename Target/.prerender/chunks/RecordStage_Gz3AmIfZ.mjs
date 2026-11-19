import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, bt as Tone, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Record/RecordStage.astro
createAstro("https://editor.land");
var $$RecordStage = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordStage;
	const { stages, orientation, variant = "rail", current, state, empty } = Astro.props;
	const State = state ?? "rest";
	const Absent = State !== "rest" || stages.length === 0;
	const Absence = empty ?? "UNAVAILABLE";
	const AbsenceTone = State === "loading" ? "quiet" : "ink";
	const IsCurrent = (stage) => current !== void 0 && stage.index === current;
	const ToneOf = (stage) => stage.state ? Tone(stage.state.toUpperCase()) ?? "ink" : "ink";
	return renderTemplate`${Absent ? renderTemplate`${maybeRenderHead($$result)}<div class="record-stage__absent" role="status"${addAttribute(State, "data-state")}> <p class="record-stage__absent-head"> <span class="record-stage__absent-mark" aria-hidden="true">
&#9678;
</span> <span class="record-stage__absent-key">STATUS:</span> <span${addAttribute(["record-stage__absent-state", `record-stage__absent-state--${AbsenceTone}`], "class:list")}> ${State === "rest" ? "EMPTY" : State.toUpperCase()} </span> </p> <p class="record-stage__absent-line">${Absence}</p> </div>` : variant === "plates" ? renderTemplate`<ol class="record-stage record-stage--plates"> ${stages.map((stage) => renderTemplate`<li${addAttribute([
		"record-stage__plate",
		IsCurrent(stage) && "record-stage__plate--current",
		stage.state && "record-stage__plate--state"
	], "class:list")}${addAttribute(IsCurrent(stage) ? "step" : void 0, "aria-current")}${addAttribute(stage.state?.toUpperCase(), "data-state")}> <span class="record-stage__plate-index"> ${IsCurrent(stage) ? renderTemplate`${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"size": "attested",
		"tone": ToneOf(stage)
	})}` : null} ${stage.index} </span> <div class="record-stage__plate-body"> ${stage.href ? renderTemplate`<a class="record-stage__plate-label"${addAttribute(stage.href, "href")}> ${stage.label} </a>` : renderTemplate`<span class="record-stage__plate-label"> ${stage.label} </span>`} ${stage.state ? renderTemplate`<span${addAttribute(["record-stage__state", `record-stage__state--${ToneOf(stage)}`], "class:list")}> <span class="record-stage__state-key">STATUS:</span> ${stage.state.toUpperCase()} </span>` : null} ${stage.detail ? renderTemplate`<details class="record-stage__detail"> <summary class="record-stage__plate-line record-stage__summary"> ${stage.line} ${renderComponent($$result, "Mark", $$Mark, { "kind": "fold" })} </summary> <p class="record-stage__detail-body">${stage.detail}</p> </details>` : renderTemplate`<span class="record-stage__plate-line">${stage.line}</span>`} </div> </li>`)} </ol>` : renderTemplate`<ol${addAttribute(`record-stage record-stage--${orientation ?? "row"}`, "class")}> ${stages.map((stage) => renderTemplate`<li${addAttribute([
		"record-stage__item",
		IsCurrent(stage) && "record-stage__item--current",
		stage.state && "record-stage__item--state"
	], "class:list")}${addAttribute(IsCurrent(stage) ? "step" : void 0, "aria-current")}${addAttribute(stage.state?.toUpperCase(), "data-state")}> <span class="record-stage__index"> ${IsCurrent(stage) ? renderTemplate`${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"size": "attested",
		"tone": ToneOf(stage)
	})}` : null} ${stage.index} </span> ${stage.href ? renderTemplate`<a class="record-stage__label"${addAttribute(stage.href, "href")}> ${stage.label} </a>` : renderTemplate`<span class="record-stage__label">${stage.label}</span>`} ${stage.state ? renderTemplate`<span${addAttribute(["record-stage__state", `record-stage__state--${ToneOf(stage)}`], "class:list")}> <span class="record-stage__state-key">STATUS:</span> ${stage.state.toUpperCase()} </span>` : null} ${stage.detail ? renderTemplate`<details class="record-stage__detail"> <summary class="record-stage__line record-stage__summary"> ${stage.line} ${renderComponent($$result, "Mark", $$Mark, { "kind": "fold" })} </summary> <p class="record-stage__detail-body">${stage.detail}</p> </details>` : renderTemplate`<span class="record-stage__line">${stage.line}</span>`} </li>`)} </ol>`}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordStage.astro", void 0);
export { $$RecordStage as t };
