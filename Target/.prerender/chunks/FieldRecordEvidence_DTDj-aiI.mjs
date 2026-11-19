import { Yt as cn } from "./Base_BVG1wSoZ.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
// Source/Component/Brand/FieldRecordEvidence.tsx
/** Whether the plate has an image at all. */
var HasPlate = (src) => typeof src === "string" && src.trim().length > 0;
var FieldRecordEvidence = ({ src, alt, position = "center", state, className }) => {
	const Arm = state ?? (HasPlate(src) ? "rest" : "absent");
	if (Arm === "rest" && HasPlate(src)) return /* @__PURE__ */ jsx("div", {
		className: cn("overflow-hidden", className),
		style: { borderRadius: 0 },
		"data-plate": "rest",
		children: /* @__PURE__ */ jsx("img", {
			src,
			alt,
			className: "block h-full w-full",
			style: {
				objectFit: "cover",
				objectPosition: position,
				borderRadius: 0
			}
		})
	});
	/**
	* The two arms that have no photograph share one frame: the plate's own box,
	* a hairline, and the grammar. They differ in what the middle says -
	* `UNAVAILABLE` with the description under it, or `LOADING` with the drawing
	* barred - and in nothing else, so a plate that is late and a plate that will
	* never come are read at the same measure.
	*/
	return /* @__PURE__ */ jsxs("div", {
		className: cn("FieldRecordPlate", className),
		"data-plate": Arm,
		role: "img",
		"aria-label": Arm === "loading" ? `Plate loading: ${alt}` : alt,
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "FieldRecordPlate__mark",
				"aria-hidden": "true",
				children: "◎"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "FieldRecordPlate__line",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "FieldRecordPlate__key",
						children: "PLATE:"
					}),
					" ",
					Arm === "loading" ? "LOADING" : "UNAVAILABLE"
				]
			}),
			Arm === "loading" ? /* @__PURE__ */ jsxs("div", {
				className: "FieldRecordPlate__bars",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ jsx("span", { className: "FieldRecordPlate__bar" }),
					/* @__PURE__ */ jsx("span", { className: "FieldRecordPlate__bar" }),
					/* @__PURE__ */ jsx("span", { className: "FieldRecordPlate__bar" })
				]
			}) : /* @__PURE__ */ jsx("p", {
				className: "FieldRecordPlate__note",
				children: alt
			})
		]
	});
};
export { FieldRecordEvidence as t };
