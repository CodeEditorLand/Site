import { E as addAttribute, b as maybeRenderHead, d as renderComponent, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Zt as createAstro, bt as Tone, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as FieldRecordEvidence } from "./FieldRecordEvidence_DTDj-aiI.mjs";
// Source/Component/Record/RecordPlateSet.astro
createAstro("https://editor.land");
var $$RecordPlateSet = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordPlateSet;
	const { set, class: Class } = Astro.props;
	const State = set.state ?? (set.plates.length === 0 ? "empty" : "rest");
	const Columns = set.columns ?? 3;
	const Printed = set.window !== void 0 ? set.plates.slice(0, set.window.showing) : set.plates;
	const Count = set.window?.total ?? String(set.plates.length);
	const Unit = set.plates.length === 1 ? "PLATE" : "PLATES";
	const EmptyText = set.empty ?? "No plate is filed for this set yet. The head still prints its index and its count, because the set exists and its captures do not - and a capture that is absent states its own reason in the cell rather than leaving a frame empty.";
	const Id = `plates-${set.index.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
	return renderTemplate`${maybeRenderHead($$result)}<figure${addAttribute([
		"record-plate-set",
		`record-plate-set--${Columns}`,
		State === "loading" && "record-plate-set--loading",
		State === "empty" && "record-plate-set--empty",
		Class
	], "class:list")}${addAttribute(Id, "id")}> <figcaption class="record-plate-set__head"> <span class="record-plate-set__head-main"> <span class="record-plate-set__index"># ${set.index}</span> ${set.label ? renderTemplate`<span class="record-plate-set__label">/ ${set.label}</span>` : null} </span> <span class="record-plate-set__count"> ${Count} <span class="record-plate-set__count-unit">${Unit}</span> </span> </figcaption> ${State === "empty" ? renderTemplate`<p class="record-plate-set__empty"> <span class="record-plate-set__empty-mark" aria-hidden="true">
&#9678;
</span> ${EmptyText} </p>` : renderTemplate`<ol class="record-plate-set__field"> ${Printed.map((Cell) => {
		const Tone_ = Cell.state ? Tone(Cell.state.toUpperCase()) ?? "ink" : void 0;
		return renderTemplate`<li class="record-plate-set__cell"> <p class="record-plate-set__cell-head"> <span class="record-plate-set__cell-index"> ${Cell.index} </span> ${Cell.state ? renderTemplate`<span${addAttribute(["record-plate-set__cell-state", `record-plate-set__cell-state--${Tone_}`], "class:list")}> <span class="record-plate-set__cell-marker" aria-hidden="true"></span> ${Cell.state.toUpperCase()} </span>` : null} </p> <div${addAttribute(["record-plate-set__frame", Cell.state && "record-plate-set__frame--absent"], "class:list")}> ${Cell.state ? renderTemplate`<span class="record-plate-set__absent" aria-hidden="true">
&#9678;
</span>` : State === "loading" ? renderTemplate`<span class="record-plate-set__skeleton" aria-hidden="true"></span>` : Cell.src !== void 0 && Cell.alt !== void 0 ? Cell.href === void 0 ? renderTemplate`${renderComponent($$result, "FieldRecordEvidence", FieldRecordEvidence, {
			"src": Cell.src,
			"alt": Cell.alt,
			"className": "record-plate-set__picture"
		})}` : renderTemplate`<a class="record-plate-set__link"${addAttribute(Cell.href, "href")}> ${renderComponent($$result, "FieldRecordEvidence", FieldRecordEvidence, {
			"src": Cell.src,
			"alt": Cell.alt,
			"className": "record-plate-set__picture"
		})} </a>` : renderTemplate`<span class="record-plate-set__absent" aria-hidden="true">
&#9678;
</span>`} </div> <p class="record-plate-set__subject"> <span class="record-plate-set__arrow" aria-hidden="true">
&#8627;
</span> ${Cell.subject} </p> ${Cell.note ? renderTemplate`<p class="record-plate-set__note">${Cell.note}</p>` : null} </li>`;
	})} </ol>`} ${set.caption || set.source || set.window ? renderTemplate`<figcaption class="record-plate-set__foot"> ${set.caption ? renderTemplate`<span class="record-plate-set__caption">${set.caption}</span>` : null} ${set.window ? renderTemplate`<span class="record-plate-set__window"> <span class="record-plate-set__window-key">SHOWING:</span> ${set.window.showing} <span class="record-plate-set__window-of">OF</span> ${set.window.total} </span>` : null} ${set.source ? renderTemplate`<span class="record-plate-set__source"> <span class="record-plate-set__source-key">SOURCE:</span> ${set.source} </span>` : null} </figcaption>` : null} </figure>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordPlateSet.astro", void 0);
// Source/Component/Record/RecordStamp.astro
createAstro("https://editor.land");
var $$RecordStamp = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordStamp;
	const { stamp, class: Class } = Astro.props;
	const StateTone = stamp.state ? Tone(stamp.state.toUpperCase()) ?? "ink" : void 0;
	const Withdrawn = stamp.revoked !== void 0;
	const Id = `stamp-${stamp.index.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
	return renderTemplate`${maybeRenderHead($$result)}<aside${addAttribute([
		"record-stamp",
		Withdrawn && "record-stamp--withdrawn",
		Class
	], "class:list")}${addAttribute(`${Id}-mark`, "aria-labelledby")}${addAttribute(Id, "id")}> <p class="record-stamp__head"> <span class="record-stamp__index"># ${stamp.index}</span> ${stamp.label ? renderTemplate`<span class="record-stamp__label">/ ${stamp.label}</span>` : null} ${stamp.state ? renderTemplate`<span${addAttribute(["record-stamp__state", `record-stamp__state--${StateTone}`], "class:list")}> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "square",
		"tone": StateTone
	})} <span class="record-stamp__state-key">STATUS:</span> ${stamp.state.toUpperCase()} </span>` : null} </p> <p class="record-stamp__mark"${addAttribute(`${Id}-mark`, "id")}> ${stamp.mark} </p> ${Withdrawn ? renderTemplate`<p class="record-stamp__revoked"> <span class="record-stamp__revoked-mark" aria-hidden="true">
&#9678;
</span> <span class="record-stamp__revoked-key">WITHDRAWN:</span> ${stamp.revoked} </p>` : stamp.route ? renderTemplate`<p class="record-stamp__route">${stamp.route}</p>` : null} ${stamp.rows.length > 0 || stamp.expires ? renderTemplate`<dl class="record-stamp__rows"> ${stamp.rows.map((Row) => renderTemplate`<div class="record-stamp__row"> <dt class="record-stamp__row-key">${Row.key}:</dt> <dd${addAttribute(["record-stamp__row-value", Row.code && "record-stamp__row-value--code"], "class:list")}> ${Row.value} </dd> </div>`)} ${stamp.expires ? renderTemplate`<div class="record-stamp__row record-stamp__row--expires"> <dt class="record-stamp__row-key">EXPIRES:</dt> <dd class="record-stamp__row-value"> ${stamp.expires} </dd> </div>` : null} </dl>` : null} <p class="record-stamp__authority"> <span class="record-stamp__authority-key">AUTHORITY:</span> ${stamp.authority} </p> ${stamp.verify && !Withdrawn ? renderTemplate`<p class="record-stamp__verify"> <a${addAttribute(stamp.verify.href, "href")}> <span aria-hidden="true">→</span> ${" "} ${stamp.verify.label} </a> </p>` : null} ${stamp.note ? renderTemplate`<p class="record-stamp__note">${stamp.note}</p>` : null} </aside>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordStamp.astro", void 0);
export { $$RecordPlateSet as n, $$RecordStamp as t };
