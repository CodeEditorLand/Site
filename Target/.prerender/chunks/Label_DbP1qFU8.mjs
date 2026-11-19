import { Yt as cn } from "./Base_BVG1wSoZ.mjs";
import React from "react";
import { jsx } from "react/jsx-runtime";
// Source/Component/UI/Label.tsx
var Label = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("label", {
		ref,
		"data-slot": "label",
		className: cn("font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className),
		...props
	});
});
Label.displayName = "Label";
export { Label as t };
