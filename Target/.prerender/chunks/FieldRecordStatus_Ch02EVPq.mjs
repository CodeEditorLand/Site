import { Yt as cn } from "./Base_BVG1wSoZ.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
// Source/Component/Brand/FieldRecordStatus.tsx
/**
* FieldRecordStatus - the STATUS ledger row (C17 split).
*
* "STATUS:" stays dark ink; the VALUE is the fact and is set in the record's own
* ink, muted for a quiet (pending or retired) state.
*
* THE ATTESTED TONE IS A SHAPE, NOT A HUE. `DESIGN-COMPLETE.md` §1.5 asks
* ACTIVE and VERIFIED to carry a marker beside the word, because a status that
* renders exactly like an ordinary fact has lost its state. The marker used to
* be a hue - `specimen` printed the value in `--Accent` - which spent the site's
* authentication colour on a value on every page that carried a record head, and
* vanished for a reader who cannot see green. It is the mark layer's square
* (`Mark/_Square.scss`) at the attested step - half again the 4px a reporting
* state prints - in the value's own ink: one shape for a state everywhere on the
* site, and one that survives greyscale. The box and its gap are the ladder's
* and the token's (`MarkSquare`, `--mark-gap`), not this file's inline style,
* because a mark set that lives in seven inline styles is seven marks.
*/
var FieldRecordStatus = ({ status, tone = "ink", copy, className }) => {
	const IsAttested = status === "active" || status === "verified" || tone === "specimen";
	const ValueColor = tone === "quiet" ? "var(--MuteForeground)" : "var(--CardForeground)";
	const CopyValue = copy ? (copy.split(":")[1] ?? status.toUpperCase()).trim() : status.toUpperCase();
	return /* @__PURE__ */ jsxs("span", {
		className: cn("text-field-s font-mono uppercase tracking-wider", className),
		children: [/* @__PURE__ */ jsx("span", {
			style: { color: "var(--CardForeground)" },
			children: "STATUS:"
		}), /* @__PURE__ */ jsxs("span", {
			style: { color: ValueColor },
			children: [
				" ",
				IsAttested ? /* @__PURE__ */ jsx("span", {
					className: "MarkSquare",
					"data-mark-tone": "specimen",
					style: {
						color: ValueColor,
						marginInlineEnd: "var(--mark-gap)"
					},
					"aria-hidden": "true"
				}) : null,
				CopyValue
			]
		})]
	});
};
export { FieldRecordStatus as t };
