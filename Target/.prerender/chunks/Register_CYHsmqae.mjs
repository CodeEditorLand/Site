import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, p as Fragment$2, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import { Bt as DoorContext, Ft as SlipFoot, Ht as UseDoorReturn, It as SlipLoading, Lt as SlipNote, Nt as SlipEmpty, Pt as SlipError, Rt as SlipRegister, Ut as UseSlipRoot, Vt as UseDoorRef, Yt as cn, Zt as createAstro, xt as $$Mark } from "./Base_BVG1wSoZ.mjs";
import "./Map_ChnMuG2V.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import * as PopoverPrimitive from "@radix-ui/react-popover";
// Source/Component/Motion/MotionExpand.astro
createAstro("https://editor.land");
var $$MotionExpand = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MotionExpand;
	const { marker: Marker, records: Records, empty: Empty, class: Class } = Astro.props;
	const Unknown = (Value) => Value.trim() === "UNAVAILABLE";
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["MotionExpand", Class], "class:list")} data-motion="expand"> <p class="MotionExpand__Marker">${Marker}</p> ${Records.length > 0 ? Records.map((Record) => Record.missing ? renderTemplate`<div class="MotionExpand__Gone"> <span class="MotionExpand__GoneMark" aria-hidden="true">
◎
</span> <span> <span class="MotionExpand__GoneName"> ${Record.name} </span> <span class="MotionExpand__GoneNote"> <span aria-hidden="true">↳</span> WAS:${" "} ${Record.missing} </span> </span> </div>` : renderTemplate`<details class="MotionExpand__Record" data-state="record"> <summary class="MotionExpand__Row"> <span class="MotionExpand__Index" aria-hidden="true"> ${Record.index} </span> <span class="MotionExpand__Name">${Record.name}</span> ${Record.fact ? renderTemplate`<span class="MotionExpand__Fact"> ${Record.fact} </span>` : null}  ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "fold",
		"class": "MotionExpand__Glyph"
	})} </summary> <div class="MotionExpand__Body">  ${Record.rows.length === 0 ? renderTemplate`<p class="MotionExpand__NoFact"> <span aria-hidden="true">◎</span> NO FACT
</p>` : renderTemplate`<dl class="MotionExpand__Register"> ${Record.rows.map((Fact) => renderTemplate`<div class="MotionExpand__Fact-row"> <dt class="MotionExpand__Key"> ${Fact.key} </dt> <dd${addAttribute(["MotionExpand__Value", Unknown(Fact.value) && "MotionExpand__Value--unknown"], "class:list")}> ${Fact.value} ${Fact.note ? renderTemplate`<span class="MotionExpand__Note"> <span aria-hidden="true">
↳
</span>${" "} ${Fact.note} </span>` : null} </dd> </div>`)} </dl>`} <p class="MotionExpand__Source">
SOURCE: ${Record.source} </p> </div> </details>`) : renderTemplate`<div class="MotionExpand__Empty"> <p class="MotionExpand__EmptyMark"> <b aria-hidden="true">◎</b> NO RECORD
</p> <p class="MotionExpand__EmptyLine"> <span aria-hidden="true">↳</span> ${Empty} </p> </div>`} </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Motion/MotionExpand.astro", void 0);
// Source/Component/Motion/MotionFold.astro
createAstro("https://editor.land");
var $$MotionFold = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MotionFold;
	const { name: Name, label: Label, count: CountProp, leaves: Leaves = [], empty: Empty, state: State = "rest", keys: Keys = [], waiting: Waiting, long: Long = false, more: More, class: Class } = Astro.props;
	const Count = CountProp ?? String(Leaves.length).padStart(2, "0");
	const Loading = State === "loading";
	const MarkOf = (Leaf) => Leaf.gone ? "◎" : Leaf.index ?? "";
	const ClassOf = (Leaf) => Leaf.gone ? "MotionFold__Leaf MotionFold__Leaf--gone" : "MotionFold__Leaf";
	return renderTemplate`${maybeRenderHead($$result)}<details${addAttribute(["MotionFold", Class], "class:list")} data-motion="fold"${addAttribute(State, "data-state")}> <summary class="MotionFold__Summary"> <span class="MotionFold__Mark" aria-hidden="true">
#
</span> <span class="MotionFold__Name">${Name}</span> ${Label ? renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate` <span class="MotionFold__Rule" aria-hidden="true">
/
</span> <span class="MotionFold__Count">${Label}</span> ` })}` : null} <span class="MotionFold__Rule" aria-hidden="true">
/
</span> <span class="MotionFold__Count">${Loading ? "UNAVAILABLE" : Count}</span> <span class="MotionFold__Words" aria-hidden="true"> <span class="MotionFold__Word MotionFold__Word--open">OPEN</span> <span class="MotionFold__Word MotionFold__Word--close">CLOSE</span> </span>  ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "fold",
		"class": "MotionFold__Glyph"
	})} </summary> ${Loading ? renderTemplate`<ol class="MotionFold__Leaves" aria-busy="true"> ${Keys.map((Key) => renderTemplate`<li class="MotionFold__Leaf"> <span class="MotionFold__LeafIndex" aria-hidden="true">
:
</span> <span class="MotionFold__Label">${Key}</span> <span class="MotionFold__Meta" aria-hidden="true"> <span class="MotionSkeleton__Bar" style="--bar: 38%"></span> </span> </li>`)} ${Waiting ? renderTemplate`<li class="MotionFold__Leaf"> <span class="MotionFold__LeafIndex" aria-hidden="true">
↳
</span> <span class="MotionFold__Label MotionFold__Note">
WAITING ON: ${Waiting} </span> </li>` : null}  ${Keys.length === 0 && !Waiting ? renderTemplate`<li class="MotionFold__Leaf"> <span class="MotionFold__LeafIndex" aria-hidden="true">
◎
</span> <span class="MotionFold__Label MotionFold__Note"> ${Empty} </span> </li>` : null} </ol>` : Leaves.length > 0 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate` <ol${addAttribute(["MotionFold__Leaves", Long && "MotionFold__Leaves--long"], "class:list")}> ${Leaves.map((Leaf) => renderTemplate`<li${addAttribute(ClassOf(Leaf), "class")}> <span class="MotionFold__LeafIndex" aria-hidden="true"> ${MarkOf(Leaf)} </span> <span class="MotionFold__Label"> ${Leaf.href && !Leaf.gone ? renderTemplate`<a class="MotionFold__Link"${addAttribute(Leaf.href, "href")}> ${Leaf.label} </a>` : Leaf.label} ${Leaf.note ? renderTemplate`<span class="MotionFold__Note"> <span aria-hidden="true">↳</span>${" "} ${Leaf.note} </span>` : null} </span> ${Leaf.meta ? renderTemplate`<span class="MotionFold__Meta">${Leaf.meta}</span>` : null} </li>`)} </ol> ${More ? renderTemplate`<p class="MotionFold__EmptyLine">${More}</p>` : null} ` })}` : renderTemplate`<div class="MotionFold__Empty"> <p class="MotionFold__EmptyMark"> <b aria-hidden="true">◎</b> NO LEAF
</p> <p class="MotionFold__EmptyLine"> <span aria-hidden="true">↳</span> ${Empty} </p> </div>`} </details>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Motion/MotionFold.astro", void 0);
// Source/Component/UI/Popover.tsx
var SizeClass = {
	sm: "Slip--sm",
	md: "Slip--md",
	lg: "Slip--lg"
};
function Popover({ open, defaultOpen, onOpenChange, ...props }) {
	const Root = UseSlipRoot({
		open,
		defaultOpen,
		onOpenChange
	});
	return /* @__PURE__ */ jsx(DoorContext.Provider, {
		value: Root.Door,
		children: /* @__PURE__ */ jsx(PopoverPrimitive.Root, {
			open: Root.Open,
			onOpenChange: Root.OnOpenChange,
			...props
		})
	});
}
function PopoverTrigger({ ...props }) {
	const Door = React$1.useContext(DoorContext);
	const Ref = UseDoorRef(Door);
	return /* @__PURE__ */ jsx(PopoverPrimitive.Trigger, {
		ref: Ref,
		"data-slot": "popover-trigger",
		...props
	});
}
function PopoverContent({ className, align = "center", sideOffset = 4, collisionPadding = 16, sticky = "always", avoidCollisions = true, hideWhenDetached = true, size, head, state = "ready", note, empty, error, foot, children, ...props }) {
	const Return = UseDoorReturn();
	const Head = head === void 0 ? void 0 : state === "loading" ? {
		...head,
		State: "LOADING"
	} : state === "error" ? {
		...head,
		State: "INTERRUPTED"
	} : head;
	return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsxs(PopoverPrimitive.Content, {
		"data-slot": "popover-content",
		"data-size": size,
		"data-body-state": state,
		align,
		sideOffset,
		collisionPadding,
		sticky,
		avoidCollisions,
		hideWhenDetached,
		"aria-label": Head?.Name,
		onOpenAutoFocus: Return.OnOpenAutoFocus,
		onCloseAutoFocus: Return.OnCloseAutoFocus,
		className: cn("Slip", "Slip--panel", size === void 0 ? void 0 : SizeClass[size], className),
		...props,
		children: [
			Head === void 0 ? null : /* @__PURE__ */ jsx(SlipRegister, { head: Head }),
			note === void 0 ? null : /* @__PURE__ */ jsx(SlipNote, { children: note }),
			state === "loading" ? /* @__PURE__ */ jsx(SlipLoading, {}) : null,
			state === "empty" ? /* @__PURE__ */ jsx(SlipEmpty, {
				Mark: empty?.Mark ?? "NO RECORD",
				Line: empty?.Line ?? "NOTHING IS FILED HERE YET"
			}) : null,
			state === "error" ? /* @__PURE__ */ jsx(SlipError, {
				Mark: error?.Mark ?? "INTERRUPTED",
				Line: error?.Line ?? "THE ACTION DID NOT COMPLETE",
				...error?.Cause === void 0 ? {} : { Cause: error.Cause },
				...error?.Next === void 0 ? {} : { Next: error.Next },
				OnRetry: error?.OnRetry,
				...error?.Retry === void 0 ? {} : { Retry: error.Retry }
			}) : null,
			children,
			foot === void 0 ? null : /* @__PURE__ */ jsx(SlipFoot, { Items: foot })
		]
	}) });
}
// Source/Component/Motion/MotionOrigin.tsx
/**
* MotionOrigin - the origin specimen: a real slip, opened from a real control.
*
* ─── WHY THIS IS A CONTROL AND NOT A PICTURE ──────────────────────────────
* The origin class is about the relation between a trigger and the surface it
* opens, and a drawing of that relation would be a drawing of something the
* reader can simply do. So the specimen is the thing itself: a button, a Radix
* popover, the site's own slip (`PopoverContent` already carries `.Slip`), and
* the arrival from the side Radix printed.
*
* ─── WHAT THE READER CAN SEE THAT A SCREENSHOT CANNOT ─────────────────────
* Open it, close it, and open it again from a different scroll position: the
* slip always leaves the button by the same 8px, because the distance is the
* side's and not the pointer's. That is the whole claim, and it is checkable in
* two clicks.
*
* ─── NO STATE OF ITS OWN ──────────────────────────────────────────────────
* Radix owns open/closed, focus return and dismissal; this file owns four rows
* and one sentence. A specimen that needed its own state machine would be
* demonstrating the wrong thing.
*/
var Sides = [
	{
		Mark: "↓",
		Label: "SIDE: BOTTOM",
		Meta: "FROM ABOVE"
	},
	{
		Mark: "↑",
		Label: "SIDE: TOP",
		Meta: "FROM BELOW"
	},
	{
		Mark: "→",
		Label: "SIDE: LEFT",
		Meta: "FROM THE RIGHT"
	},
	{
		Mark: "←",
		Label: "SIDE: RIGHT",
		Meta: "FROM THE LEFT"
	}
];
var MotionOrigin = () => /* @__PURE__ */ jsxs(Popover, { children: [/* @__PURE__ */ jsx(PopoverTrigger, {
	asChild: true,
	children: /* @__PURE__ */ jsxs("button", {
		type: "button",
		className: "MotionOrigin__Trigger",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "MotionOrigin__Label",
				children: "OPEN:"
			}),
			/* @__PURE__ */ jsx("span", {
				className: "MotionOrigin__Value",
				children: "A SLIP"
			}),
			/* @__PURE__ */ jsx("span", {
				className: "MotionOrigin__Mark MarkArrow",
				"aria-hidden": "true"
			})
		]
	})
}), /* @__PURE__ */ jsxs(PopoverContent, {
	head: {
		Name: "ORIGIN",
		Count: Sides.length
	},
	side: "bottom",
	align: "start",
	sideOffset: 8,
	children: [/* @__PURE__ */ jsx("ul", {
		className: "MotionOrigin__Rows",
		children: Sides.map((Side) => /* @__PURE__ */ jsxs("li", {
			className: "MotionOrigin__Row",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "MotionOrigin__RowMark",
					"aria-hidden": "true",
					children: Side.Mark
				}),
				/* @__PURE__ */ jsx("span", {
					className: "MotionOrigin__RowLabel",
					children: Side.Label
				}),
				/* @__PURE__ */ jsx("span", {
					className: "MotionOrigin__RowMeta",
					children: Side.Meta
				})
			]
		}, Side.Label))
	}), /* @__PURE__ */ jsxs("p", {
		className: "MotionOrigin__Note",
		children: [/* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			children: "↳"
		}), " This slip left the button above by 8px, on the side the control printed. The distance is the side's, never the pointer's, so it is the same at every scroll position."]
	})]
})] });
// Source/Component/Motion/MotionOrigin.astro
var $$MotionOrigin = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "MotionOrigin", MotionOrigin, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Motion/MotionOrigin.tsx",
		"client:component-export": "MotionOrigin"
	})}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Motion/MotionOrigin.astro", void 0);
// Source/Component/Motion/MotionSequence.astro
createAstro("https://editor.land");
var $$MotionSequence = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MotionSequence;
	const { sequence: SequenceData } = Astro.props;
	const { name: Name, nodes: Nodes, edges: Edges, source: Source, reduced: Reduced, empty: Empty } = SequenceData;
	const Count = String(Nodes.length).padStart(2, "0");
	const IntervalOf = (Value) => Value === void 0 || Value.trim().length === 0 ? "UNAVAILABLE" : Value;
	const UnknownInterval = (Value) => IntervalOf(Value) === "UNAVAILABLE";
	const Drawable = Nodes.length > 1 && Edges.length === Nodes.length - 1;
	const Steps = [];
	Nodes.forEach((Node, Position) => {
		Steps.push({
			kind: "node",
			...Node
		});
		const Edge = Edges[Position];
		if (Edge) Steps.push({
			kind: "edge",
			...Edge
		});
	});
	return renderTemplate`${maybeRenderHead($$result)}<div class="MotionSequence" data-motion="sequence"> <p class="MotionSequence__Marker">
# SEQUENCE / ${Name} <span aria-hidden="true">${" "}</span> ${Count} STATES
</p> ${Drawable ? renderTemplate`<ol class="MotionSequence__Run"> ${Steps.map((Step) => Step.kind === "node" ? renderTemplate`<li class="MotionSequence__Step MotionSequence__Step--node"> <span class="MotionSequence__Index" aria-hidden="true"> ${Step.index} </span> <span class="MotionSequence__State">${Step.state}</span> ${Step.note ? renderTemplate`<span class="MotionSequence__Note"> ${Step.note} </span>` : null} </li>` : renderTemplate`<li class="MotionSequence__Step MotionSequence__Step--edge"> <span class="MotionSequence__Motion"> ${Step.motion} </span> <span class="MotionSequence__Line"> ${renderComponent($$result, "Mark", $$Mark, {
		"kind": "arrow",
		"class": "MotionSequence__Mark"
	})} </span> <span${addAttribute(["MotionSequence__Interval", UnknownInterval(Step.interval) && "MotionSequence__Interval--unknown"], "class:list")}> ${IntervalOf(Step.interval)} </span> </li>`)} </ol>` : renderTemplate`<div class="MotionSequence__Empty"> <p class="MotionSequence__EmptyMark"> <b aria-hidden="true">◎</b> NO TRANSITION
</p> <p class="MotionSequence__EmptyLine"> <span aria-hidden="true">↳</span> ${Empty} </p> </div>`} ${Reduced ? renderTemplate`<p class="MotionSequence__Reduced"> <span class="MotionSequence__ReducedKey">
AT REDUCED MOTION:
</span>${" "} <span class="MotionSequence__ReducedValue">${Reduced}</span> </p>` : null} <p class="MotionSequence__Source">SOURCE: ${Source}</p> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Motion/MotionSequence.astro", void 0);
// Source/Component/Motion/MotionSpecimen.astro
createAstro("https://editor.land");
var $$MotionSpecimen = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MotionSpecimen;
	const { motion: Motion, variant: Variant = "base", note: Note, class: Class } = Astro.props;
	const Span = Motion ? Math.max(2, Math.round(Motion.interval / 320 * 100)) : 0;
	return renderTemplate`${maybeRenderHead($$result)}<article${addAttribute([
		"MotionSpecimen",
		Variant !== "base" && `MotionSpecimen--${Variant}`,
		!Motion && "MotionSpecimen--plate",
		Class
	], "class:list")} data-motion="specimen"> ${Motion ? renderTemplate`<div class="MotionSpecimen__Register"> <p class="MotionSpecimen__Mark">
# ${Motion.name} / ${Motion.index} </p> <h3 class="MotionSpecimen__Name">${Motion.name}</h3> <p class="MotionSpecimen__Explains"> <span class="MotionSpecimen__ExplainsMark" aria-hidden="true">
↳
</span> ${Motion.explains} </p> <div class="MotionSpecimen__Measure"> <span class="MotionSpecimen__Track" aria-hidden="true"> <span class="MotionSpecimen__Bar"${addAttribute(`--span: ${Span}%`, "style")}></span> </span> <span${addAttribute(["MotionSpecimen__Interval", Motion.intervalText.trim() === "UNAVAILABLE" && "MotionSpecimen__Interval--unknown"], "class:list")}> ${Motion.intervalText} </span> </div> <dl class="MotionSpecimen__Ledger"> <div class="MotionSpecimen__Row"> <dt class="MotionSpecimen__Key">CURVE:</dt> <dd class="MotionSpecimen__Value"> ${Motion.curve} <code>${Motion.curveValue}</code> </dd> </div> <div class="MotionSpecimen__Row"> <dt class="MotionSpecimen__Key">MOVES:</dt> <dd class="MotionSpecimen__Value">${Motion.moves}</dd> </div> <div class="MotionSpecimen__Row"> <dt class="MotionSpecimen__Key">KEEPS:</dt> <dd class="MotionSpecimen__Value">${Motion.keeps}</dd> </div> </dl> </div>` : null} ${Motion ? renderTemplate`<div class="MotionSpecimen__Gutter" aria-hidden="true"></div>` : null} <div class="MotionSpecimen__Stage"> ${renderSlot($$result, $$slots["default"])} ${Note ? renderTemplate`<p class="MotionSpecimen__StageNote">${Note}</p>` : null} </div> </article>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Motion/MotionSpecimen.astro", void 0);
// Source/Content/Motion/Register.ts
/**
* Register - the site's interaction classes, as data.
*
* ─── WHY THIS IS DATA AND NOT PROSE ───────────────────────────────────────
* The motion layer makes thirteen claims - one per class - and a claim printed in
* two places drifts. This module is the single statement of each class: what
* occasion it belongs to, which relationship from `System/_Motion.scss` it
* composes, what interval and curve it costs, what it explains and the one rule
* it keeps. `/Motion` renders this table; the specimen sheet reads the same
* records; a future block that needs to name a motion reads it here rather than
* writing a fourteenth sentence about it.
*
* ─── THE THREE INTERVALS AND THREE CURVES ARE NOT MINE TO CHANGE ──────────
* `quick 150`, `speak 200`, `settle 320`; `arrive`, `line`, `return`. They are
* `System/_Motion.scss`'s, derived from Jelly's own engine, and this module
* restates them only so a page can print them. A class that needed a fourth
* interval would be a class whose state change has not been named.
*
* ─── THE REGISTER IS CLOSED ───────────────────────────────────────────────
* Thirteen is not a round number; it is what the interface actually does. Adding
* a class means finding a state change nothing here acknowledges - and the
* register law's test is one question: name the state change, or do not write the
* rule.
*/
/** The three intervals, in milliseconds, and what each one is for. */
var Intervals = [
	{
		key: "QUICK:",
		value: "150 MS",
		note: "Input registration, and refusal. Nothing the reader did with their hand waits longer than this."
	},
	{
		key: "SPEAK:",
		value: "200 MS",
		note: "An affordance arriving, a disclosure opening, a rule drawn. The interval of something being said."
	},
	{
		key: "SETTLE:",
		value: "320 MS",
		note: "A change finishing, a state resolving, a page handing over. The longest interval the site has."
	}
];
/** The three curves, as printed, with the literal each one is. */
var Curves = [
	{
		key: "ARRIVE:",
		value: "CUBIC-BEZIER(0.16, 0.82, 0.28, 1)",
		note: "Fast start, soft stop. A thing that is arriving must be seen arriving."
	},
	{
		key: "LINE:",
		value: "CUBIC-BEZIER(0.2, 0.7, 0.2, 1)",
		note: "Nearly linear. A rule drawn at speed reads as a glitch."
	},
	{
		key: "RETURN:",
		value: "CUBIC-BEZIER(0.4, 0, 0.5, 1)",
		note: "Spread evenly. A thing going back to rest is not in a hurry."
	}
];
var Arrive = "CUBIC-BEZIER(0.16, 0.82, 0.28, 1)";
var Line = "CUBIC-BEZIER(0.2, 0.7, 0.2, 1)";
var Return = "CUBIC-BEZIER(0.4, 0, 0.5, 1)";
/**
* The thirteen classes, in the order a reader meets them: the five the paper's
* grammar names (enter, press, trace, settle, resolve), the two that acknowledge a
* refusal or an inspection, then the six the interaction layer adds.
*/
var Classes = [
	{
		index: "01",
		name: "ENTER",
		occasion: "A thing can be touched",
		relationship: "ENTER",
		interval: 200,
		intervalText: "200 MS",
		curve: "ARRIVE",
		curveValue: Arrive,
		moves: "TRANSFORM",
		explains: "That this thing can be touched, and which way it leads.",
		keeps: "2px of pull and no more. A row that moved further would be a thing that ran away.",
		surface: "EVERY LINKED RECORD NAME, EVERY LEDGER VALUE THAT LEADS"
	},
	{
		index: "02",
		name: "PRESS",
		occasion: "The input landed",
		relationship: "PRESS",
		interval: 150,
		intervalText: "150 MS",
		curve: "ARRIVE",
		curveValue: Arrive,
		moves: "TRANSFORM",
		explains: "That the input registered, not that it succeeded.",
		keeps: "1px of travel under the pointer. A mono fact has no shape to compress, only a position to register.",
		surface: "THE LEDGER VALUE, THE ACTION, EVERY FORM CONTROL"
	},
	{
		index: "03",
		name: "TRACE",
		occasion: "A row is pointed at",
		relationship: "TRACE",
		interval: 200,
		intervalText: "200 MS",
		curve: "LINE",
		curveValue: Line,
		moves: "TRANSFORM",
		explains: "Which name the rule under it belongs to.",
		keeps: "The line is at full width in both states and only its scale changes, so the row cannot reflow.",
		surface: "THE LEDGER KEY, ON EVERY ROW WHOSE VALUE IS A LINK"
	},
	{
		index: "04",
		name: "SETTLE",
		occasion: "The change finished",
		relationship: "SETTLE",
		interval: 320,
		intervalText: "320 MS",
		curve: "RETURN",
		curveValue: Return,
		moves: "TRANSFORM, OPACITY",
		explains: "That the thing has arrived and is not still going.",
		keeps: "The return is longer than the arrival. A thing going back to rest is not in a hurry.",
		surface: "THE SECOND LEG OF EVERY TWO-LEG MOTION"
	},
	{
		index: "05",
		name: "RESOLVE",
		occasion: "One printed state gives way",
		relationship: "RESOLVE",
		interval: 320,
		intervalText: "320 MS",
		curve: "RETURN",
		curveValue: Return,
		moves: "OPACITY, TRANSFORM, COLOUR",
		explains: "That a word was replaced, not that a second word arrived.",
		keeps: "The only class allowed to move an ink, and only because a resolution that snaps is a flicker.",
		surface: "THE COPY AFFORDANCE, EVERY DISCLOSURE'S OPEN/CLOSE WORD"
	},
	{
		index: "06",
		name: "INTERRUPT",
		occasion: "The action was refused",
		relationship: "INTERRUPT",
		interval: 150,
		intervalText: "150 MS",
		curve: "ARRIVE",
		curveValue: Arrive,
		moves: "TRANSFORM",
		explains: "That the action was refused, and where.",
		keeps: "2px, once, and only after the field loses focus. Never a shake, never a loop, never while the reader is correcting.",
		surface: "EVERY CONTROL CARRYING aria-invalid, AND THE CONTACT FORM'S RECEIPT"
	},
	{
		index: "07",
		name: "CROP",
		occasion: "Evidence is inspected",
		relationship: "CROP",
		interval: 320,
		intervalText: "320 MS",
		curve: "RETURN",
		curveValue: Return,
		moves: "TRANSFORM",
		explains: "That you are looking closer, not that the picture changed.",
		keeps: "1.5% of scale inside a frame that does not move, so the page does not move either.",
		surface: "THE PORTAL'S EVIDENCE PLATE"
	},
	{
		index: "08",
		name: "FOLD",
		occasion: "A disclosure opens",
		relationship: "REVEAL",
		interval: 200,
		intervalText: "200 MS",
		curve: "ARRIVE",
		curveValue: Arrive,
		moves: "OPACITY, TRANSFORM",
		explains: "That there is more behind this line, and that it was there all along.",
		keeps: "The leaves move; the box does not. A fold that grew would reflow the page under the reader's eye.",
		surface: "MotionFold, ON EVERY BAND THAT KEEPS SOMETHING CLOSED"
	},
	{
		index: "09",
		name: "EXPAND",
		occasion: "A record opens in place",
		relationship: "REVEAL, THEN SETTLE",
		interval: 320,
		intervalText: "320 MS",
		curve: "RETURN",
		curveValue: Return,
		moves: "OPACITY, TRANSFORM",
		explains: "That the record did not move, it got deeper.",
		keeps: "The row's box is identical in both states. Only the facts underneath it arrive, 4px and 20ms apart.",
		surface: "MotionExpand, WHEREVER A SET OF RECORDS CARRIES PROVENANCE"
	},
	{
		index: "10",
		name: "HANDOVER",
		occasion: "A page gives way to another",
		relationship: "RESOLVE",
		interval: 320,
		intervalText: "320 MS",
		curve: "LINE",
		curveValue: Line,
		moves: "OPACITY, TRANSFORM",
		explains: "That you are in the same document, one part along.",
		keeps: "The record's name stays in place and the body steps. Direction is printed from the navigation, not guessed.",
		surface: "EVERY ROUTE, THROUGH THE BROWSER'S OWN VIEW TRANSITION"
	},
	{
		index: "11",
		name: "SORT",
		occasion: "A set re-orders",
		relationship: "SETTLE",
		interval: 320,
		intervalText: "320 MS",
		curve: "RETURN",
		curveValue: Return,
		moves: "TRANSFORM",
		explains: "That the set did not change, only its order.",
		keeps: "Rows travel; the table does not crossfade. A re-sort is a settlement, not an arrival.",
		surface: "EVERY MATRIX THE CONTROL RE-ORDERS"
	},
	{
		index: "12",
		name: "ORIGIN",
		occasion: "A control's surface arrives",
		relationship: "ENTER",
		interval: 200,
		intervalText: "200 MS",
		curve: "ARRIVE",
		curveValue: Arrive,
		moves: "OPACITY, TRANSFORM",
		explains: "Which control this surface came from.",
		keeps: "8px from the side the control already printed. A slip that flew would be a thing arriving, not a thing opening where it was asked for.",
		surface: "EVERY SLIP THE KIT OPENS, AND THE PALETTE'S OWN LEAN"
	},
	{
		index: "13",
		name: "SKELETON",
		occasion: "Data has not arrived",
		relationship: "REVEAL, ON WHAT REPLACES IT",
		interval: 320,
		intervalText: "320 MS",
		curve: "ARRIVE",
		curveValue: Arrive,
		moves: "OPACITY, ON THE BLOCK THAT REPLACES IT",
		explains: "That the shape is known and the values are not.",
		keeps: "It does not move at all. A pulse is a loop and a fade is an entrance; the motion belongs to the record that ends the wait.",
		surface: "MotionSkeleton, AND THE .MotionResolve CLASS IT HANDS OVER TO"
	}
];
/** One class, by name. Throws rather than answering `undefined` - a page that
*  asks for a class the register does not carry has a bug, not a gap. */
var ClassOf = (Name) => {
	const Found = Classes.find((Entry) => Entry.name === Name);
	if (!Found) throw new Error(`No interaction class named ${Name}.`);
	return Found;
};
/** The count a page prints. Derived, so it cannot drift from the register. */
var ClassCount = Classes.length;
export { Intervals as a, $$MotionOrigin as c, PopoverTrigger as d, $$MotionFold as f, Curves as i, Popover as l, ClassOf as n, $$MotionSpecimen as o, $$MotionExpand as p, Classes as r, $$MotionSequence as s, ClassCount as t, PopoverContent as u };
