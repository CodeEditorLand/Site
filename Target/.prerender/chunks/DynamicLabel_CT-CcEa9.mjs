import { t as Label } from "./Label_DbP1qFU8.mjs";
import { jsx } from "react/jsx-runtime";
// Source/Component/Dynamic/DynamicLabel.tsx
/**
* Dynamic Label component that accepts content schema
* Wraps the base Label with prop-based configuration
*/
var DynamicLabel = ({ Content, HTMLFor }) => {
	const { Text, Required = false, Disabled = false, ClassName, ...props } = Content;
	return /* @__PURE__ */ jsx(Label, {
		htmlFor: HTMLFor,
		"aria-required": Required,
		"aria-disabled": Disabled,
		className: ClassName,
		...props,
		children: Text
	});
};
export { DynamicLabel as t };
