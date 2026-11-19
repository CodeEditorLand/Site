import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
// Source/Function/Theme/SemanticColor.ts
/**
* C17 semantic color system (Daylight Field Record).
*
* One deterministic keyword->ink and element->fill map for the whole site.
* Collage method: every stamp keyword, route keyword, platform keyword and
* element card gets the color that fits what it MEANS and how it reads in
* the page flow. Character-level granularity: bracket glyphs (〈 〉) and the
* route slash (/) stay neutral gray; the semantic color sits on the text
* inside. Light fills + dark -600/-700 ink shades only; radius stays 0.
*
* Existing tokens (Base.css) are used wherever they are already dark-ink
* correct; the few hues whose *Fore token is a dark-theme light color get
* new daylight ink tokens (--Semantic*) defined in Base.css.
*/
var GLYPH_INK = "var(--MuteForeground)";
var INK = {
	Red: "var(--SemanticRed)",
	Teal: "var(--SemanticTeal)",
	Sky: "var(--SemanticSky)",
	BlueDeep: "var(--SemanticBlueDeep)",
	Yellow: "var(--SemanticYellow)",
	GrayDeep: "var(--SemanticGrayDeep)",
	Gray: "var(--MuteForeground)"
};
var SPINE_GREEN_INK = "var(--SpinegRPCFore)";
var SPINE_BLUE_INK = "var(--SpineIPCFore)";
var SPINE_ORANGE_INK = "var(--SpineTCPFore)";
var SPINE_PURPLE_INK = "var(--SpineWASMFore)";
var TAURI_AMBER_INK = "var(--ExtensionTauriFore)";
var EFFECT_TS_CYAN_INK = "var(--ExtensionEffectTypeScriptFore)";
var KEYWORD_INK = {
	"EXTENSION HOST": SPINE_BLUE_INK,
	"CAPABILITY HOST": SPINE_BLUE_INK,
	"DUAL-TRACK": SPINE_ORANGE_INK,
	WORKBENCH: INK.Gray,
	"EFFECT-TS": EFFECT_TS_CYAN_INK,
	"EFFECT-TS LAYERS": EFFECT_TS_CYAN_INK,
	"WORK-STEALING": SPINE_BLUE_INK,
	SCHEDULER: SPINE_ORANGE_INK,
	RUST: INK.Red,
	TAURI: TAURI_AMBER_INK,
	"NATIVE BACKEND": SPINE_BLUE_INK,
	"RUST-NATIVE": INK.Red,
	"OXC PIPELINE": SPINE_ORANGE_INK,
	"REST SELECTABLE": SPINE_ORANGE_INK,
	"NO ELECTRON": INK.Teal,
	"ASTRO UI": SPINE_PURPLE_INK,
	"WEBVIEW BRIDGE": INK.Sky,
	"WASM SANDBOX": SPINE_PURPLE_INK,
	"BACKGROUND SERVICES": SPINE_BLUE_INK,
	DAEMON: SPINE_BLUE_INK,
	"LOCAL AUTHORITY": SPINE_BLUE_INK,
	"DNS SANDBOX": SPINE_BLUE_INK,
	"SERVICE WORKER": SPINE_BLUE_INK,
	"OFFLINE SHELL": SPINE_BLUE_INK,
	"PURE ABSTRACT": INK.Gray,
	"CONTRACT CRATE": INK.Gray,
	DETERMINISTIC: SPINE_GREEN_INK,
	"BUILD ORCHESTRATOR": SPINE_ORANGE_INK,
	"ESBUILD PRIMARY": INK.Yellow,
	"GRPC BACKBONE": SPINE_GREEN_INK,
	"CONTRACT-FIRST": SPINE_GREEN_INK,
	"AUTHENTICATION TIERS": SPINE_BLUE_INK,
	"FOUR MODES": SPINE_ORANGE_INK,
	"NOT FOUND": INK.Gray,
	MACOS: INK.Gray,
	WINDOWS: SPINE_BLUE_INK,
	LINUX: INK.Yellow,
	"ACTIVE SOURCE": SPINE_GREEN_INK,
	INTEGRATION: SPINE_BLUE_INK,
	"RELEASE PREPARATION": SPINE_ORANGE_INK,
	"CLOUD PLAN": SPINE_BLUE_INK,
	"PROVIDER PLAN": SPINE_PURPLE_INK,
	"LOCAL-FIRST PLAN": SPINE_ORANGE_INK,
	"ENTERPRISE PLAN": INK.Gray
};
/** Exact-match lookup; unknown keywords stay ink (null). */
var KeywordInk = (Keyword) => {
	return KEYWORD_INK[Keyword.toUpperCase()] ?? null;
};
/**
* Stamp WORD ink (user, SideCar): multi-word stamps color per word.
* PREBUILT -> orange, BINARY -> blue, TRIPLE -> orange,
* PER / TARGET -> gray (so "PER TARGET" reads gray, "TRIPLE" orange).
*/
var STAMP_WORD_INK = {
	PREBUILT: SPINE_ORANGE_INK,
	BINARY: SPINE_BLUE_INK,
	TRIPLE: SPINE_ORANGE_INK,
	PER: INK.Gray,
	TARGET: INK.Gray
};
var StampWordInk = (Word) => {
	return STAMP_WORD_INK[Word.toUpperCase()] ?? null;
};
INK.Gray, INK.Red, INK.Gray, INK.Yellow, INK.Gray, INK.Yellow;
var ELEMENT_FILL = {
	Land: "var(--Mute)",
	Mountain: "var(--ExtensionRustMute)",
	Cocoon: "var(--SpinegRPCMute)",
	Wind: "var(--OSMacOSMute)",
	Sky: "var(--SpineIPCMute)",
	Air: "var(--Card)",
	Echo: "var(--OSLinuxMute)",
	Grove: "var(--SpineWASMMute)",
	Common: "var(--Mute)",
	Maintain: "var(--SpineTCPMute)",
	Mist: "var(--Card)",
	Output: "var(--ToolEsBuildMute)",
	Rest: "var(--ToolOxcMute)",
	SideCar: "var(--Card)",
	Vine: "var(--SpinegRPCMute)",
	Worker: "var(--Card)"
};
/** Case-insensitive element fill lookup; null keeps hash fallback. */
var ElementFill = (Name) => {
	const Key = Name.toLowerCase();
	const Direct = ELEMENT_FILL[Name];
	if (Direct) return Direct;
	const Hit = Object.keys(ELEMENT_FILL).find((Element) => Element.toLowerCase() === Key);
	return Hit ? ELEMENT_FILL[Hit] : null;
};
var ROUTE_KEYWORD_INK = INK.Sky;
INK.Gray, INK.GrayDeep, INK.BlueDeep, INK.BlueDeep, INK.Yellow, INK.Red, INK.GrayDeep, INK.Gray;
// Source/Component/Brand/SemanticLedger.tsx
/**
* Render one stamp segment: exact keyword match first, then per-word ink
* (SideCar PREBUILT/BINARY/TRIPLE/PER/TARGET), then ink fallback.
*/
var RenderStampSegment = (Segment) => {
	const Whole = KeywordInk(Segment);
	if (Whole) return /* @__PURE__ */ jsx("span", {
		style: { color: Whole },
		children: Segment
	});
	const Words = Segment.split(/\s+/);
	const WordInks = Words.map((Word) => StampWordInk(Word));
	if (Words.length > 1 && WordInks.every((Ink) => Ink !== null)) return Words.map((Word, WordIndex) => /* @__PURE__ */ jsxs("span", { children: [WordIndex > 0 && " ", /* @__PURE__ */ jsx("span", {
		style: { color: WordInks[WordIndex] ?? "var(--CardForeground)" },
		children: Word
	})] }, WordIndex));
	return /* @__PURE__ */ jsx("span", {
		style: { color: StampWordInk(Segment) ?? "var(--CardForeground)" },
		children: Segment
	});
};
/** 〈KEYWORD〉 with gray brackets and keyword-colored text inside. */
var StampText = ({ Line, className }) => {
	const Segments = Line.split(" + ");
	return /* @__PURE__ */ jsxs("span", {
		className,
		children: [
			/* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				style: { color: GLYPH_INK },
				children: "〈"
			}),
			Segments.map((Segment, Index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [Index > 0 && /* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				style: { color: "var(--MuteForeground)" },
				children: " + "
			}), RenderStampSegment(Segment)] }, Index)),
			/* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				style: { color: GLYPH_INK },
				children: "〉"
			})
		]
	});
};
var ROUTE_SHAPE = /^\/[A-Z0-9-]+:/;
/** /KEYWORD:VALUE route row: gray slash, sky keyword, ink colon+value. */
var RouteText = ({ Line, className }) => {
	if (!ROUTE_SHAPE.test(Line)) return /* @__PURE__ */ jsx("span", {
		className,
		children: /* @__PURE__ */ jsx("span", {
			className: "opacity-70",
			children: Line
		})
	});
	const ColonIndex = Line.indexOf(":");
	return /* @__PURE__ */ jsxs("span", {
		className,
		children: [
			/* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				style: { color: GLYPH_INK },
				children: "/"
			}),
			/* @__PURE__ */ jsx("span", {
				style: { color: ROUTE_KEYWORD_INK },
				children: Line.slice(1, ColonIndex)
			}),
			/* @__PURE__ */ jsx("span", {
				style: { color: "var(--CardForeground)" },
				children: Line.slice(ColonIndex)
			})
		]
	});
};
/** STATUS: ink label + the value in the record's ink. The attested tone is a
*  shape (the 6px square `FieldRecordStatus` prints), never the accent - see
*  that primitive for the argument. `active` is kept so a caller that has the
*  fact can state it, and it no longer changes the ink. */
var StatusText = ({ value, className }) => /* @__PURE__ */ jsxs("span", {
	className,
	children: [/* @__PURE__ */ jsx("span", {
		style: { color: "var(--CardForeground)" },
		children: "STATUS:"
	}), /* @__PURE__ */ jsxs("span", {
		style: { color: "var(--CardForeground)" },
		children: [" ", value]
	})]
});
export { ElementFill as i, StampText as n, StatusText as r, RouteText as t };
