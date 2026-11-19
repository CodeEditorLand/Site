import { E as addAttribute, b as maybeRenderHead, d as renderComponent, p as Fragment, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, bt as Tone, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Shell/ShellState.astro
createAstro("https://editor.land");
var $$ShellState = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ShellState;
	const { kind, index, status, statement, cause, next, note, rows = [], shown, total, value, limit, asOf, age, keys = [], surface = "box", dense = false, class: ClassName } = Astro.props;
	const DefaultStatus = {
		empty: "PREPARING",
		loading: "LOADING",
		partial: "UNAVAILABLE",
		error: "INTERRUPTED",
		stale: "ARCHIVED",
		"too-much": "READY",
		"too-long": "READY",
		missing: "UNAVAILABLE",
		denied: "UNAVAILABLE"
	};
	const StatementKey = {
		empty: "WOULD BE HERE:",
		loading: "READING:",
		partial: "KNOWN:",
		error: "WHAT FAILED:",
		stale: "LAST KNOWN:",
		"too-much": "SET:",
		"too-long": "VALUE:",
		missing: "WAS:",
		denied: "WHAT:"
	};
	const CauseKey = {
		empty: "WHY NOT:",
		loading: "WAITING ON:",
		partial: "UNAVAILABLE:",
		error: "CAUSE:",
		stale: "AGE:",
		"too-much": "ORDER:",
		"too-long": "LIMIT:",
		missing: "TARGET:",
		denied: "WHY:"
	};
	const Word = status ?? DefaultStatus[kind];
	const Resolved = Tone(Word) ?? "ink";
	const Age = (() => {
		if (age !== void 0) return age;
		if (asOf === void 0) return void 0;
		const Then = (/* @__PURE__ */ new Date(`${asOf}T00:00:00Z`)).getTime();
		if (Number.isNaN(Then)) return void 0;
		return `${Math.max(0, Math.round((Date.now() - Then) / 864e5))} DAYS`;
	})();
	const IsStale = kind === "stale";
	const IsTooMuch = kind === "too-much";
	const IsTooLong = kind === "too-long";
	const IsLoading = kind === "loading";
	return renderTemplate`${maybeRenderHead($$result)}<aside${addAttribute([
		"ShellState",
		`ShellState--${kind}`,
		surface === "bare" ? "ShellState--bare" : null,
		dense ? "ShellState--dense" : null,
		ClassName
	], "class:list")}${addAttribute(kind, "data-state")}${addAttribute(surface, "data-surface")}${addAttribute(`${Word}: ${statement}`, "aria-label")}> <p class="ShellState__register"> <span class="ShellState__mark" aria-hidden="true">
#
</span> <span class="ShellState__index">${index}</span> </p> <p${addAttribute(["ShellState__status", `ShellState__status--${Resolved}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": Resolved
	})} <span class="ShellState__status-key">STATUS:</span> <span class="ShellState__status-word">${Word}</span> </p> <dl class="ShellState__rows"> <div class="ShellState__row"> <dt class="ShellState__key">${StatementKey[kind]}</dt> <dd class="ShellState__value"> ${IsTooLong && value ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <span class="ShellState__clip"${addAttribute(value, "title")}> ${value.length > 72 ? `${value.slice(0, 72)}…` : value} </span> <span class="ShellState__clip-meta"> <span class="ShellState__clip-key">FULL:</span> ${`${value.length} CHARACTERS`} </span> ` })}` : statement} </dd> </div> ${cause ? renderTemplate`<div class="ShellState__row"> <dt class="ShellState__key">${CauseKey[kind]}</dt> <dd class="ShellState__value">${cause}</dd> </div>` : null} ${IsTooMuch && shown !== void 0 && total !== void 0 ? renderTemplate`<div class="ShellState__row"> <dt class="ShellState__key">SHOWING:</dt> <dd class="ShellState__value ShellState__value--figure"> ${shown} <span class="ShellState__of">OF</span> ${total} </dd> </div>` : null}  ${IsTooMuch && shown !== void 0 && total !== void 0 && total > shown ? renderTemplate`<div class="ShellState__row"> <dt class="ShellState__key">ALL:</dt> <dd class="ShellState__value ShellState__value--figure"> ${total - shown} <span class="ShellState__of">MORE</span> </dd> </div>` : null} ${IsStale && asOf ? renderTemplate`<div class="ShellState__row"> <dt class="ShellState__key">AS OF:</dt> <dd class="ShellState__value"> ${asOf} ${Age ? renderTemplate`<span class="ShellState__age">${Age}</span>` : null} </dd> </div>` : null} ${IsTooLong && limit ? renderTemplate`<div class="ShellState__row"> <dt class="ShellState__key">LIMIT:</dt> <dd class="ShellState__value">${limit}</dd> </div>` : null} ${next ? renderTemplate`<div class="ShellState__row"> <dt class="ShellState__key"> ${kind === "error" ? "RETRY:" : "NEXT:"} </dt> <dd class="ShellState__value"> <a class="ShellState__action"${addAttribute(next.href, "href")}> ${next.label} ${renderComponent($$result, "Mark", $$Mark, { "kind": "arrow" })} </a> </dd> </div>` : null} </dl> ${IsLoading ? renderTemplate`<div class="ShellState__skeleton" aria-hidden="true"> ${(keys.length > 0 ? keys : [
		"RECORD",
		"ROUTE",
		"STATE"
	]).map((Key, Index) => renderTemplate`<p class="ShellState__skeleton-row"> <span class="ShellState__skeleton-key">${Key}:</span> <span class="ShellState__bar"${addAttribute(`--bar:${[
		64,
		42,
		78,
		55,
		36,
		70
	][Index % 6]}%`, "style")}></span> </p>`)} </div>` : null} ${rows.length > 0 ? renderTemplate`<dl class="ShellState__facts"> ${rows.map((Row) => renderTemplate`<div class="ShellState__fact"> <dt class="ShellState__fact-key">${Row.key}</dt> <dd${addAttribute(["ShellState__fact-value", Row.code ? "ShellState__fact-value--code" : null], "class:list")}> ${Row.value} </dd> </div>`)} </dl>` : null} ${note ? renderTemplate`<p class="ShellState__note">${note}</p>` : null} </aside>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Shell/ShellState.astro", void 0);
export { $$ShellState as t };
