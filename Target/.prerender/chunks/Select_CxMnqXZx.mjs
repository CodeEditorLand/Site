import { Rt as SlipRegister, Yt as cn } from "./Base_BVG1wSoZ.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import * as lucide from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
// Source/Component/UI/Select.tsx
/**
* Select - a field that opens a slip, with one true value.
*
* The trigger is the site's `.SlipField`: white, one `--Divider` frame, a printed
* `:` label, the value, and the disclosure `›` at the far end - the same glyph the
* rail's sections use, because both mean "there is more behind this". The list is
* the same `.Slip` a menu is, with the same register line at its head and the same
* row grammar, so a select and a menu are visibly the same object at two sizes.
*
* Radix owns the behaviour: typeahead, arrow keys, Home/End, Escape, focus return.
* Nothing about it is restated here.
*/
function Select({ ...props }) {
	return /* @__PURE__ */ jsx(SelectPrimitive.Root, {
		"data-slot": "select",
		...props
	});
}
function SelectGroup({ ...props }) {
	return /* @__PURE__ */ jsx(SelectPrimitive.Group, {
		"data-slot": "select-group",
		...props
	});
}
function SelectValue({ ...props }) {
	return /* @__PURE__ */ jsx(SelectPrimitive.Value, {
		"data-slot": "select-value",
		className: "SlipField__Value",
		...props
	});
}
function SelectTrigger({ className, size = "default", label, children, ...props }) {
	return /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
		"data-slot": "select-trigger",
		"data-size": size,
		className: cn("SlipField", className),
		...props,
		children: [
			label ? /* @__PURE__ */ jsxs("span", {
				className: "SlipField__Label",
				children: [label, ":"]
			}) : null,
			children,
			/* @__PURE__ */ jsx(SelectPrimitive.Icon, {
				asChild: true,
				children: /* @__PURE__ */ jsx("span", {
					className: "SlipField__Mark",
					"aria-hidden": "true",
					children: "›"
				})
			})
		]
	});
}
function SelectContent({ className, children, position = "popper", head, ...props }) {
	return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
		"data-slot": "select-content",
		"aria-label": head?.Name,
		className: cn("Slip", className),
		position,
		...props,
		children: [
			head ? /* @__PURE__ */ jsx(SlipRegister, { head }) : null,
			/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
			/* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
				className: cn(position === "popper" && "Slip__Viewport"),
				children
			}),
			/* @__PURE__ */ jsx(SelectScrollDownButton, {})
		]
	}) });
}
function SelectLabel({ className, ...props }) {
	return /* @__PURE__ */ jsx(SelectPrimitive.Label, {
		"data-slot": "select-label",
		className: cn("Slip__Group", className),
		...props
	});
}
function SelectItem({ className, children, mark, meta, ...props }) {
	return /* @__PURE__ */ jsx(SelectPrimitive.Item, {
		"data-slot": "select-item",
		"data-mark": mark,
		"data-meta": meta,
		className: cn("Slip__Row", className),
		...props,
		children: /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
	});
}
/**
* The two scroll buttons are the slip's own edges: a hairline and a chevron, not
* a pair of icon rows. They only exist when the list is taller than its box,
* which is the one case a slip's frame is not enough to say "there is more".
*/
function SelectScrollUpButton({ className, ...props }) {
	return /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
		"data-slot": "select-scroll-up-button",
		className: cn("Slip__Scroll", className),
		...props,
		children: /* @__PURE__ */ jsx(lucide.ChevronUp, {
			className: "Slip__ScrollIcon",
			"aria-hidden": "true"
		})
	});
}
function SelectScrollDownButton({ className, ...props }) {
	return /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
		"data-slot": "select-scroll-down-button",
		className: cn("Slip__Scroll", className),
		...props,
		children: /* @__PURE__ */ jsx(lucide.ChevronDown, {
			className: "Slip__ScrollIcon",
			"aria-hidden": "true"
		})
	});
}
export { SelectLabel as a, SelectItem as i, SelectContent as n, SelectTrigger as o, SelectGroup as r, SelectValue as s, Select as t };
