import { a as cn } from "./Base_DSZ6CS4q.mjs";
import React from "react";
import { jsx } from "react/jsx-runtime";
//#region Source/Component/UI/Card.tsx
var Card = React.forwardRef(({ className, children, ...props }, ref) => {
	return /* @__PURE__ */ jsx("jelly-card", {
		ref,
		className: cn("text-card-fg", className),
		style: {
			"--jelly-fill": "var(--Card)",
			"--jelly-radius": "0px",
			"--jelly-card-color": "inherit",
			"--jelly-card-padding-block": "0px",
			"--jelly-card-padding-inline": "0px",
			"--jelly-card-font-size": "inherit"
		},
		...props,
		children
	});
});
Card.displayName = "Card";
var CardHeader = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("flex flex-col space-y-1.5 p-6", className),
		...props
	});
});
CardHeader.displayName = "CardHeader";
var CardTitle = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("h3", {
		ref,
		className: cn("font-mono text-sm font-semibold leading-snug tracking-tight", className),
		...props
	});
});
CardTitle.displayName = "CardTitle";
var CardDescription = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("p", {
		ref,
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
});
CardDescription.displayName = "CardDescription";
var CardContent = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("p-6 pt-0", className),
		...props
	});
});
CardContent.displayName = "CardContent";
var CardFooter = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("flex items-center p-6 pt-0", className),
		...props
	});
});
CardFooter.displayName = "CardFooter";
//#endregion
export { CardHeader as a, CardFooter as i, CardContent as n, CardTitle as o, CardDescription as r, Card as t };
