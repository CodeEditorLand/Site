import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, k as unescapeHTML, p as Fragment, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro, ct as $$RecordLedger, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
// Source/Component/Trust/TrustContentsList.astro
createAstro("https://editor.land");
var $$TrustContentsList = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TrustContentsList;
	const { items, empty } = Astro.props;
	const Absent = "UNAVAILABLE";
	return renderTemplate`${items.length > 0 ? renderTemplate`${maybeRenderHead($$result)}<ol class="trust-contents__list"> ${items.map((Item) => renderTemplate`<li class="trust-contents__item"> <a class="trust-contents__link"${addAttribute(Item.href, "href")}> <span class="trust-contents__number" data-trust-number> ${Item.number ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`&#167;${Item.number}` })}` : Absent} </span> <span class="trust-contents__name"> ${Item.label || Absent} </span> </a> </li>`)} </ol>` : empty ? renderTemplate`<p class="trust-contents__empty">${empty}</p>` : renderTemplate`<ol class="trust-contents__list"></ol>`}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Trust/TrustContentsList.astro", void 0);
// Source/Component/Trust/TrustContents.astro
createAstro("https://editor.land");
var $$TrustContents = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TrustContents;
	const { items, label, variant = "rail", empty, class: Class } = Astro.props;
	const Held = items.length > 0;
	return renderTemplate`${variant === "disclosure" ? renderTemplate`${maybeRenderHead($$result)}<details${addAttribute([
		"trust-contents",
		"trust-contents--disclosure",
		Class
	], "class:list")} data-trust-contents> <summary class="trust-contents__summary"> <span class="trust-contents__label">${label}</span> <span class="trust-contents__count">${items.length}</span> <span class="trust-contents__toggle" aria-hidden="true">
&#8595;
</span> </summary> ${Held ? renderTemplate`${renderComponent($$result, "TrustContentsList", $$TrustContentsList, { "items": items })}` : empty ? renderTemplate`<p class="trust-contents__empty">${empty}</p>` : renderTemplate`${renderComponent($$result, "TrustContentsList", $$TrustContentsList, { "items": items })}`} </details>` : renderTemplate`<nav${addAttribute([
		"trust-contents",
		"trust-contents--rail",
		Class
	], "class:list")} data-trust-contents${addAttribute(label, "aria-label")}> <p class="trust-contents__head"> <span class="trust-contents__label">${label}</span> <span class="trust-contents__count">${items.length}</span>  <span class="trust-contents__position" data-trust-position></span> </p> ${Held ? renderTemplate`${renderComponent($$result, "TrustContentsList", $$TrustContentsList, { "items": items })}` : empty ? renderTemplate`<p class="trust-contents__empty">${empty}</p>` : renderTemplate`${renderComponent($$result, "TrustContentsList", $$TrustContentsList, { "items": items })}`} </nav>`}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Trust/TrustContents.astro", void 0);
// Source/Component/Reading/ReadingDocument.astro
createAstro("https://editor.land");
var $$ReadingDocument = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ReadingDocument;
	const { kicker, heading, standfirst, standfirstHtml, rows, index, indexLabel, layout = "stack", ledgerSurface = "quiet", ledgerColumns = 1, measure = "prose", bodyClass, class: Class, state = "rest", empty, keys } = Astro.props;
	const LoadingKeys = keys ?? [
		"CLAUSE",
		"HEADING",
		"EFFECTIVE"
	];
	return renderTemplate`${maybeRenderHead($$result)}<article${addAttribute([
		"reading-document",
		`reading-document--${measure}`,
		layout === "rail" ? "reading-document--rail" : null,
		Class
	], "class:list")}> <header class="reading-document__head"> <p class="reading-document__kicker">${kicker}</p> <h1 class="reading-document__heading">${heading}</h1> ${standfirst && renderTemplate`<p class="reading-document__standfirst">${standfirst}</p>`} ${standfirstHtml && renderTemplate`<p class="reading-document__standfirst">${unescapeHTML(standfirstHtml)}</p>`} </header> <div class="reading-document__ledger"> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
		"rows": rows,
		"columns": ledgerColumns,
		"surface": ledgerSurface
	})} </div> ${index && index.length > 0 && layout === "rail" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "TrustContents", $$TrustContents, {
		"class": "reading-document__contents",
		"items": index,
		"label": indexLabel,
		"variant": "rail"
	})} ${renderComponent($$result, "TrustContents", $$TrustContents, {
		"class": "reading-document__contents-narrow",
		"items": index,
		"label": indexLabel,
		"variant": "disclosure"
	})} ` })}`} ${index && index.length > 0 && layout === "stack" && renderTemplate`<nav class="reading-document__index"${addAttribute(indexLabel, "aria-label")}> <p class="reading-document__index-label">${indexLabel}</p> <ol class="reading-document__index-list"> ${index.map((Item) => renderTemplate`<li class="reading-document__index-item"> <a class="reading-document__index-link"${addAttribute(Item.href, "href")}> <span class="reading-document__index-number">
&#167;${Item.number} </span> <span class="reading-document__index-name"> ${Item.label} </span> </a> </li>`)} </ol> </nav>`} <div${addAttribute([
		"reading-document__body",
		"prose-flow",
		bodyClass
	], "class:list")}${addAttribute(state, "data-state")}> ${state === "empty" ? renderTemplate`<div class="reading-document__absent" data-state="empty"> <p class="reading-document__absent-mark" aria-hidden="true">
◎
</p> <p class="reading-document__absent-value"> ${empty ?? "This document's text is not in this build: the facts and the index above are read from the record, and the clauses have not been set from their source."} </p> <p class="reading-document__absent-note">
STATUS:${" "}UNAVAILABLE
</p> </div>` : state === "loading" ? renderTemplate`<dl class="reading-document__keys" aria-busy="true"> ${LoadingKeys.map((Key) => renderTemplate`<div class="reading-document__key"> <dt class="reading-document__key-label">${Key}:</dt> <dd class="reading-document__key-value"> <span class="reading-document__bar" aria-hidden="true"></span> </dd> </div>`)} </dl>` : renderTemplate`${renderSlot($$result, $$slots["default"])}`} </div> </article>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Reading/ReadingDocument.astro", void 0);
// Source/Component/Trust/TrustClause.astro
createAstro("https://editor.land");
var $$TrustClause = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TrustClause;
	const { number, id, state = "rest", missing, class: Class } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<h2${addAttribute([
		"reading-clause",
		"reading-clause--cited",
		"trust-clause",
		state === "missing" && "trust-clause--missing",
		Class
	], "class:list")}${addAttribute(id, "id")}> <a class="trust-clause__cite"${addAttribute(`#${id}`, "href")}${addAttribute(`Clause §${number}`, "aria-label")}> <span class="trust-clause__mark" aria-hidden="true">
&#167;
</span> ${number} </a> <span class="trust-clause__name"> ${renderSlot($$result, $$slots["default"])} </span> </h2> ${state === "missing" ? renderTemplate`<div class="trust-clause__absent"> <p class="trust-clause__absent-status"> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": "quiet",
		"fill": "unknown"
	})} <span class="trust-clause__absent-key">STATUS:</span>
UNAVAILABLE
</p> <p class="trust-clause__absent-sentence"> ${missing ?? `The document's index names this clause, and the text this build carries does not include it. The number still resolves, so a citation to §${number} lands on this statement rather than on the next clause.`} </p> </div>` : null}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Trust/TrustClause.astro", void 0);
export { $$TrustContentsList as i, $$ReadingDocument as n, $$TrustContents as r, $$TrustClause as t };
