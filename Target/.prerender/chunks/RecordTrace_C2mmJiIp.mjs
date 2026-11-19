import { E as addAttribute, b as maybeRenderHead, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
// Source/Component/Record/RecordTrace.astro
createAstro("https://editor.land");
var $$RecordTrace = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordTrace;
	const { trace } = Astro.props;
	const { steps, label, source, state = "rest", empty } = trace;
	const Count = String(steps.length).padStart(2, "0");
	const Marker = state === "loading" ? "LOADING" : `${Count} STEPS`;
	const MarkerLine = label === void 0 ? `TRACE\u2001${Marker}` : `TRACE / ${label}\u2001${Marker}`;
	const Empty = state === "empty" || state !== "loading" && steps.length === 0;
	const EmptyText = empty ?? "No step is recorded on this trace. The marker still prints and the source below still names where the trace was read from, because a trace with nothing in it is still a claim about where the claim can be checked - and a reader who follows the source can see that it names none.";
	return renderTemplate`${maybeRenderHead($$result)}<div class="record-trace"${addAttribute(state, "data-state")}> <p class="record-trace__marker"># ${MarkerLine}</p> ${state === "loading" ? renderTemplate`<ol class="record-trace__steps" aria-busy="true"> ${[
		0,
		1,
		2
	].map((Index) => renderTemplate`<li class="record-trace__step record-trace__step--skeleton"> <span class="record-trace__index"> ${String(Index + 1).padStart(2, "0")} </span> <span class="record-trace__arrow" aria-hidden="true">
→
</span> <span class="record-trace__path"> <span class="record-trace__bar record-trace__bar--path" aria-hidden="true"></span> </span> <span class="record-trace__note"> <span class="record-trace__bar record-trace__bar--note" aria-hidden="true"></span> </span> </li>`)} </ol>` : Empty ? renderTemplate`<p class="record-trace__empty">${EmptyText}</p>` : renderTemplate`<ol class="record-trace__steps"> ${steps.map((Step) => renderTemplate`<li class="record-trace__step"> <span class="record-trace__index">${Step.index}</span> <span class="record-trace__arrow" aria-hidden="true">
→
</span> <span class="record-trace__path"> ${Step.href === void 0 ? renderTemplate`<code>${Step.path}</code>` : renderTemplate`<a class="record-trace__link"${addAttribute(Step.href, "href")}> <code>${Step.path}</code> </a>`} </span> <span class="record-trace__note"> <span class="record-trace__note-mark" aria-hidden="true">
↳
</span> ${Step.note} </span> </li>`)} </ol>`} <p class="record-trace__source"> <span class="record-trace__source-key">SOURCE:</span> ${source} </p> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordTrace.astro", void 0);
export { $$RecordTrace as t };
