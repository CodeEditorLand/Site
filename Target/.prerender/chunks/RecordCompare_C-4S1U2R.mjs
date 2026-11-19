import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, bt as Tone, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Record/RecordCompare.astro
createAstro("https://editor.land");
var $$RecordCompare = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordCompare;
	const { compare, class: Class } = Astro.props;
	const Loading = compare.state === "loading";
	const Empty = !Loading && compare.stops.length === 0;
	const Single = !Loading && compare.stops.length === 1;
	const StopTone = (State) => State ? Tone(State.toUpperCase()) ?? "ink" : "ink";
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([
		"record-compare",
		Loading && "record-compare--loading",
		Empty && "record-compare--empty",
		Single && "record-compare--single",
		Class
	], "class:list")} role="group"${addAttribute(compare.label ?? `${compare.from} to ${compare.to}`, "aria-label")}${addAttribute(Loading ? "true" : void 0, "aria-busy")}${addAttribute(Loading ? "loading" : Empty ? "empty" : "rest", "data-state")}> ${compare.label ? renderTemplate`<p class="record-compare__label">${compare.label}</p>` : null} <p class="record-compare__axis"> <span class="record-compare__end">${compare.from}</span> ${renderComponent($$result, "Mark", $$Mark, { "kind": "arrow" })} <span class="record-compare__end">${compare.to}</span> </p> ${Loading ? renderTemplate`<ol class="record-compare__rail" style="--CompareStops:3"> ${[
		0,
		1,
		2
	].map(() => renderTemplate`<li class="record-compare__stop record-compare__stop--skeleton"> <span class="record-compare__tick" aria-hidden="true"></span> <span class="record-compare__bar record-compare__bar--label" aria-hidden="true"></span> <span class="record-compare__bar record-compare__bar--value" aria-hidden="true"></span> </li>`)} </ol>` : Empty ? renderTemplate`<p class="record-compare__empty"> <span aria-hidden="true">&#9678;</span>${" "} ${compare.empty ?? "No position is recorded on this axis yet. The rail prints its ends rather than a blank line, so a reader can see which order is being asked about."} </p>` : renderTemplate`<ol class="record-compare__rail"${addAttribute(`--CompareStops:${compare.stops.length}`, "style")}> ${compare.stops.map((Stop, Index) => renderTemplate`<li${addAttribute([
		"record-compare__stop",
		Stop.state && "record-compare__stop--unreached",
		Stop.equal === true && Index > 0 && "record-compare__stop--equal"
	], "class:list")}> <span class="record-compare__tick" aria-hidden="true"></span> <span class="record-compare__stop-label">${Stop.label}</span> ${Stop.state ? renderTemplate`<span${addAttribute(["record-compare__stop-state", `record-compare__stop-state--${StopTone(Stop.state)}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": StopTone(Stop.state)
	})}
STATUS: ${Stop.state.toUpperCase()} </span>` : null} <span class="record-compare__stop-value"> ${Stop.href ? renderTemplate`<a${addAttribute(Stop.href, "href")}>${Stop.value}</a>` : Stop.value} </span> ${Stop.note ? renderTemplate`<span class="record-compare__stop-note"> ${Stop.note} </span>` : null} </li>`)} </ol>`} ${Loading ? renderTemplate`<p class="record-compare__state">STATUS: LOADING</p>` : compare.caption ? renderTemplate`<p class="record-compare__caption">${compare.caption}</p>` : null} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordCompare.astro", void 0);
export { $$RecordCompare as t };
