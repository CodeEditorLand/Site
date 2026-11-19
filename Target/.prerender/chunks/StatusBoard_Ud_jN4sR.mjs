import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Zt as createAstro, bt as Tone, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
// Source/Component/More/StatusBoard.astro
createAstro("https://editor.land");
var $$StatusBoard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$StatusBoard;
	const { columns, caption, empty, class: Class } = Astro.props;
	const ToneOf = (State) => Tone(State.toUpperCase()) ?? "ink";
	const RowId = (Column, Row, Index) => `board-${Column.key}-${Index + 1}`;
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(["status-board", Class], "class:list")}> ${columns.length > 0 ? renderTemplate`<div class="status-board__shelves"> ${columns.map((Column) => renderTemplate`<section class="status-board__column"${addAttribute(`board-${Column.key}`, "id")}${addAttribute(`board-${Column.key}-head`, "aria-labelledby")}> <header class="status-board__head"> <p class="status-board__register"> <span class="status-board__mark" aria-hidden="true">
#
</span> <span class="status-board__label"${addAttribute(`board-${Column.key}-head`, "id")}> ${Column.label} </span> <span class="status-board__count"> ${Column.rows.length} </span> </p> <p class="status-board__words"> ${Column.words.join(" ")} </p> </header> <p class="status-board__note">${Column.note}</p> ${Column.rows.length > 0 ? renderTemplate`<ol class="status-board__rows"> ${Column.rows.map((Row, RowIndex) => renderTemplate`<li class="status-board__row"${addAttribute(RowId(Column, Row, RowIndex), "id")}> ${Row.href ? renderTemplate`<a class="status-board__link"${addAttribute(Row.href, "href")}> <span class="status-board__row-mark"> ${Row.mark} </span> <span class="status-board__row-body"> <span class="status-board__row-name"> ${Row.label} </span> <span class="status-board__row-meta"> ${Row.meta} </span> </span> <span${addAttribute(["status-board__row-state", `status-board__row-state--${ToneOf(Row.state)}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": ToneOf(Row.state)
	})} ${Row.state} </span> </a>` : renderTemplate`<span class="status-board__link status-board__link--statement"> <span class="status-board__row-mark"> ${Row.mark} </span> <span class="status-board__row-body"> <span class="status-board__row-name"> ${Row.label} </span> <span class="status-board__row-meta"> ${Row.meta} </span> </span> <span${addAttribute(["status-board__row-state", `status-board__row-state--${ToneOf(Row.state)}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": ToneOf(Row.state)
	})} ${Row.state} </span> </span>`} ${Row.note ? renderTemplate`<p class="status-board__row-note"> ${Row.note} </p>` : null} </li>`)} </ol>` : renderTemplate`<p class="status-board__empty">${Column.empty}</p>`} </section>`)} </div>` : empty ? renderTemplate`<p class="status-board__empty">${empty}</p>` : null} ${caption ? renderTemplate`<p class="status-board__caption">${caption}</p>` : null} </section>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/More/StatusBoard.astro", void 0);
export { $$StatusBoard as t };
