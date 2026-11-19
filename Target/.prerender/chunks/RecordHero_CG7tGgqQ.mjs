import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { t as $$FieldRecordAction } from "./FieldRecordAction_BQ8iiqlX.mjs";
import { t as $$FieldRecordDataCard } from "./FieldRecordDataCard_-tmxJz7v.mjs";
import { t as $$FieldRecordIndex } from "./FieldRecordIndex_B-25WaIo.mjs";
import { t as FieldRecordEvidence } from "./FieldRecordEvidence_DTDj-aiI.mjs";
import { t as FieldRecordSeal } from "./FieldRecordSeal_BQ3rw_aG.mjs";
import { t as FieldRecordStatus } from "./FieldRecordStatus_Ch02EVPq.mjs";
import { n as StampText, t as RouteText } from "./SemanticLedger_yaZHo2du.mjs";
import { Zt as createAstro, bt as Tone, ct as $$RecordLedger } from "./Base_BVG1wSoZ.mjs";
// Source/Component/Record/RecordHero.astro
createAstro("https://editor.land");
var $$RecordHero = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RecordHero;
	const { index, claim, route, status, relation, proposition, metadata, evidence, seal, action, class: Class } = Astro.props;
	const Marker = index.replace(/^#\s*/, "");
	const Composed = Astro.slots.has("default");
	const HasEvidence = evidence !== void 0 || Composed;
	const SEAL = "m";
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(["record-hero", Class], "class:list")}> <div${addAttribute(["record-hero__pair", HasEvidence ? null : "record-hero__pair--single"], "class:list")}> <div class="record-hero__record"> ${renderComponent($$result, "FieldRecordDataCard", $$FieldRecordDataCard, { "className": "record-hero__card" }, { "default": ($$result) => renderTemplate` <div class="record-hero__inset"> <div class="record-hero__mark"> ${renderComponent($$result, "FieldRecordIndex", $$FieldRecordIndex, { "index": Marker })} ${seal && renderTemplate`${renderComponent($$result, "FieldRecordSeal", FieldRecordSeal, {
		"element": seal,
		"size": SEAL,
		"className": "record-hero__seal"
	})}`} </div> <h1 class="type-display record-hero__claim"> ${renderComponent($$result, "StampText", StampText, { "Line": claim })} </h1> ${route && renderTemplate`<p class="record-hero__route"> ${renderComponent($$result, "RouteText", RouteText, { "Line": route })} </p>`} <div class="record-hero__status"> ${renderComponent($$result, "FieldRecordStatus", FieldRecordStatus, {
		"status": status.state,
		"tone": status.tone,
		"copy": status.copy
	})} </div> ${renderComponent($$result, "RecordLedger", $$RecordLedger, {
		"rows": metadata,
		"class": "record-hero__facts"
	})} <div class="record-hero__blank" aria-hidden="true"></div> ${relation && renderTemplate`<p class="record-hero__relation">${relation}</p>`} ${proposition && renderTemplate`<p class="record-hero__proposition"> <span class="record-hero__proposition-mark" aria-hidden="true">
↳
</span> ${proposition} </p>`} ${action && renderTemplate`<div class="record-hero__action"> ${renderComponent($$result, "FieldRecordAction", $$FieldRecordAction, {
		"label": action.label,
		"href": action.href,
		"variant": action.variant ?? "button"
	})} </div>`} </div> ` })} </div> ${HasEvidence && renderTemplate`<div class="record-hero__gutter" aria-hidden="true"></div>`} ${HasEvidence && renderTemplate`<div class="record-hero__evidence"> ${evidence?.state ? renderTemplate`<div class="record-hero__tombstone"> <span class="record-hero__tombstone-mark" aria-hidden="true">
&#9678;
</span> <span${addAttribute(["record-hero__tombstone-state", `record-hero__tombstone-state--${Tone(evidence.state.toUpperCase()) ?? "ink"}`], "class:list")}> <span class="record-hero__tombstone-key">
STATUS:
</span> ${evidence.state.toUpperCase()} </span> ${evidence.next ? renderTemplate`<span class="record-hero__tombstone-next"> <span class="record-hero__tombstone-key">
NEXT:
</span> ${evidence.next} </span>` : null} </div>` : evidence?.src && evidence.alt ? renderTemplate`${renderComponent($$result, "FieldRecordEvidence", FieldRecordEvidence, {
		"src": evidence.src,
		"alt": evidence.alt,
		"position": evidence.position,
		"className": "record-hero__plate"
	})}` : renderTemplate`${renderSlot($$result, $$slots["default"])}`} </div>`} </div> </section>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Record/RecordHero.astro", void 0);
export { $$RecordHero as t };
