import { Yt as cn } from "./Base_BVG1wSoZ.mjs";
import "react";
import { jsx } from "react/jsx-runtime";
import * as lucide from "lucide-react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
// Source/Component/UI/Checkbox.tsx
function Checkbox({ className, ...props }) {
	return /* @__PURE__ */ jsx(CheckboxPrimitive.Root, {
		"data-slot": "checkbox",
		className: cn("border-divider peer size-4 shrink-0 rounded-none border bg-background outline-none transition-shadow focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-[color-mix(in_srgb,var(--Ring)_50%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground aria-invalid:border-destructive aria-invalid:ring-[color-mix(in_srgb,var(--Destruct)_20%,transparent)]", className),
		...props,
		children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, {
			"data-slot": "checkbox-indicator",
			className: "flex items-center justify-center text-current transition-none",
			children: /* @__PURE__ */ jsx(lucide.Check, { className: "size-3.5" })
		})
	});
}
export { Checkbox as t };
