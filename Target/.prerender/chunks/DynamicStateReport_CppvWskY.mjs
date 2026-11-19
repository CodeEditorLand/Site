import { bt as Tone } from "./Base_BVG1wSoZ.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
// Source/Component/Surface/StateBadge.tsx
/** One tone as the Jelly badge's two properties. Both are tokens. */
var ToneStyle = {
	ink: {
		"--jelly-fill": "var(--Mute)",
		"--jelly-label": "var(--Foreground)"
	},
	specimen: {
		"--jelly-fill": "var(--SpinegRPCMute)",
		"--jelly-label": "var(--SpinegRPCFore)"
	},
	quiet: {
		"--jelly-fill": "var(--Mute)",
		"--jelly-label": "var(--MuteForeground)"
	}
};
/** The badge's own variant name for a tone; the fill above is what paints it. */
var ToneVariant = {
	ink: "platinum",
	specimen: "mint",
	quiet: "platinum"
};
/** The mark's ink, as the tone's - the badge's `--jelly-label` paints the label,
* and the square is the state's SHAPE so it takes the same ink the word does. */
var ToneInk = {
	ink: "var(--Foreground)",
	specimen: "var(--state-ink-attested)",
	quiet: "var(--MuteForeground)"
};
var StateBadge = ({ Label }) => {
	const Resolved = Tone(Label) ?? "ink";
	return /* @__PURE__ */ jsxs("jelly-badge", {
		shape: "square",
		variant: ToneVariant[Resolved],
		style: {
			...ToneStyle[Resolved],
			"--jelly-badge-radius": "0",
			"--jelly-badge-font-size": "13px"
		},
		children: [/* @__PURE__ */ jsx("span", {
			className: "MarkSquare",
			"data-mark-size": "badge",
			"data-mark-tone": Resolved,
			style: { color: ToneInk[Resolved] },
			"aria-hidden": "true"
		}), Label]
	});
};
// Source/Component/Dynamic/DynamicStateReport.tsx
/**
* DynamicStateReport - the one shape every account, verify and dashboard state
* branch renders.
*
* `DESIGN-COMPLETE.md` §1.5 fixes the vocabulary and the presentation: a coded
* label (`STATUS: <TERM>`, `/ACCESS: ...`, `RECORD: ...`), one plain sentence
* saying what happened, and the one action that is actually available. The
* label is a Jelly badge, so the state is carried by a design-system element
* rather than a styled span, and a loading state may show a restrained linear
* indicator because motion is a signal there.
*
* Three rules this file exists to keep:
*
* - The label is never written at a call site. `StateLabel` below is the only
*   place the vocabulary appears, and it is built from `State.ts`'s eight
*   terms - so a branch cannot invent a status string, and this file cannot
*   drift from the table the register reads.
* - The tone is never a prop. `StateBadge` reads it from the table by the word
*   the label carries. There is no `Tone` prop and no fourth `strong` value:
*   §1.5 gives INTERRUPTED `ink` like every other non-achievement, and a
*   failure's urgency belongs to `Role="alert"`, not to a second colour.
* - A caller owns the sentence and the action, because only the caller knows
*   what happened and what the reader can do next. This component owns the
*   grammar.
*/
/** `STATUS: <TERM>` - the label a state of this register prints. */
var Status = (Term) => `STATUS: ${Term}`;
/** The eight terms of the status vocabulary, plus the two edge labels. */
var StateLabel = {
	Ready: Status("READY"),
	Active: Status("ACTIVE"),
	Loading: Status("LOADING"),
	Preparing: Status("PREPARING"),
	Verified: Status("VERIFIED"),
	Unavailable: Status("UNAVAILABLE"),
	Interrupted: Status("INTERRUPTED"),
	Archived: Status("ARCHIVED"),
	Empty: "RECORD: EMPTY",
	SignInRequired: "/ACCESS: SIGN IN REQUIRED"
};
/** The indicator: a 1px ink rule with one accent segment tracking along it. */
var Indicator = () => /* @__PURE__ */ jsx("span", {
	"aria-hidden": "true",
	style: {
		display: "block",
		blockSize: "2px",
		inlineSize: "100%",
		background: "color-mix(in srgb, var(--Foreground) 20%, transparent)"
	},
	children: /* @__PURE__ */ jsx("span", { style: {
		display: "block",
		blockSize: "var(--state-busy-bar)",
		inlineSize: "33%",
		background: "currentColor",
		opacity: "var(--state-busy-ink)"
	} })
});
var DynamicStateReport = ({ Label, Sentence, Action, Role = "status", Loading = false }) => /* @__PURE__ */ jsxs("div", {
	className: "auth-shell__report",
	role: Role,
	children: [
		/* @__PURE__ */ jsx("div", {
			className: "auth-shell__status",
			children: /* @__PURE__ */ jsx(StateBadge, { Label })
		}),
		Loading ? /* @__PURE__ */ jsx(Indicator, {}) : null,
		/* @__PURE__ */ jsx("p", {
			className: "auth-shell__report-sentence",
			children: Sentence
		}),
		Action
	]
});
export { StateLabel as n, StateBadge as r, DynamicStateReport as t };
