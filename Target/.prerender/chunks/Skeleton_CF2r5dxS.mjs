import { a as cn } from "./Base_Ch2j7K-P.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
//#region Source/Component/UI/Skeleton.tsx
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "skeleton",
		className: cn("animate-pulse flat bg-accent", className),
		...props
	});
}
/**
* Generic card skeleton - header + two body lines.
*/
function SkeletonCard({ className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("bg-card p-6", className),
		children: [
			/* @__PURE__ */ jsx(Skeleton, { className: "mb-4 h-6 w-3/4 bg-secondary" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "mb-2 h-4 w-full bg-secondary" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-5/6 bg-secondary" })
		]
	});
}
/**
* Feature card skeleton - matches FeatureCard layout (title + icon header,
* description lines, icon stack row).
*/
function SkeletonFeatureCard({ className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("bg-card p-6", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-4 flex items-start justify-between",
				children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-1/2 bg-secondary" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-10 shrink-0 bg-secondary" })]
			}),
			/* @__PURE__ */ jsx(Skeleton, { className: "mb-2 h-4 w-full bg-secondary" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "mb-2 h-4 w-5/6 bg-secondary" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-4/6 bg-secondary" })
		]
	});
}
/**
* Pricing tier skeleton - matches PricingCard layout (button, name, price,
* feature list).
*/
function SkeletonPricingTier({ className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("bg-card", className),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "p-6",
			children: [
				/* @__PURE__ */ jsx(Skeleton, { className: "mb-4 h-9 w-full bg-secondary" }),
				/* @__PURE__ */ jsx(Skeleton, { className: "mb-2 h-6 w-1/3 bg-secondary" }),
				/* @__PURE__ */ jsx(Skeleton, { className: "mb-4 h-4 w-2/3 bg-secondary" }),
				/* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-1/3 bg-secondary" })
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "p-6",
			children: [
				1,
				2,
				3,
				4
			].map((Index) => /* @__PURE__ */ jsx(Skeleton, { className: "mb-3 h-4 w-full bg-secondary" }, Index))
		})]
	});
}
//#endregion
export { SkeletonPricingTier as i, SkeletonCard as n, SkeletonFeatureCard as r, Skeleton as t };
