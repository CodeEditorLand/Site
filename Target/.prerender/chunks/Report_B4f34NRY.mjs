import { Yt as cn } from "./Base_BVG1wSoZ.mjs";
import { r as StateBadge } from "./DynamicStateReport_CppvWskY.mjs";
import React from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { CircleAlert, CircleCheck, Loader2, Mail } from "lucide-react";
// Source/Component/UI/Input.tsx
var Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
	return /* @__PURE__ */ jsx("input", {
		ref,
		type,
		"data-slot": "input",
		className: cn("bg-mute px-3 py-2 ring-offset-[var(--Background)] file:border-0 file:bg-transparent file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--Ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
});
Input.displayName = "Input";
// Source/Component/Auth/Report.tsx
var Glyphs = {
	alert: CircleAlert,
	check: CircleCheck,
	loading: Loader2,
	mail: Mail
};
var AuthReport = ({ State, Title, Sentence, Glyph, Heading = 2, Facts, Action, Role, children }) => {
	const Icon = Glyph ? Glyphs[Glyph] : null;
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex flex-col space-y-1.5 p-6 text-center",
		children: [
			State && /* @__PURE__ */ jsx("div", {
				className: "auth-shell__status mb-3 flex justify-center",
				children: /* @__PURE__ */ jsx(StateBadge, { Label: State })
			}),
			Glyph === "loading" ? /* @__PURE__ */ jsxs("div", {
				className: "StateBusy StateBusy--stack flat mx-auto mb-4 w-40 justify-center bg-[color-mix(in_srgb,var(--Primary)_10%,transparent)] p-4",
				"aria-busy": "true",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ jsx("span", {
					className: "StateBusy__Bar",
					style: { "--bar": "100%" }
				}), /* @__PURE__ */ jsx("span", {
					className: "StateBusy__Bar",
					style: { "--bar": "62%" }
				})]
			}) : Icon ? /* @__PURE__ */ jsx("div", {
				className: "flat mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-[color-mix(in_srgb,var(--Primary)_10%,transparent)]",
				children: /* @__PURE__ */ jsx(Icon, {
					"aria-hidden": "true",
					className: "h-6 w-6 text-primary"
				})
			}) : null,
			/* @__PURE__ */ jsx(Heading === 3 ? "h3" : "h2", {
				className: "type-heading",
				children: Title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-card-foreground opacity-70",
				children: Sentence
			}),
			Facts && Facts.length > 0 ? /* @__PURE__ */ jsx("dl", {
				className: "auth-shell__facts",
				children: Facts.map((Fact) => /* @__PURE__ */ jsxs("div", {
					className: "auth-shell__fact",
					children: [/* @__PURE__ */ jsx("dt", {
						className: "auth-shell__fact-key",
						children: Fact.key
					}), /* @__PURE__ */ jsx("dd", {
						className: "auth-shell__fact-value",
						children: Fact.code ? /* @__PURE__ */ jsx("code", { children: Fact.value }) : Fact.value
					})]
				}, Fact.key))
			}) : null
		]
	}), children ? /* @__PURE__ */ jsx("div", {
		className: "space-y-6 p-6 pt-0",
		role: Role ?? void 0,
		"aria-live": "polite",
		children
	}) : Action ? /* @__PURE__ */ jsx("div", {
		className: "space-y-6 p-6 pt-0",
		role: Role ?? void 0,
		"aria-live": "polite",
		children: /* @__PURE__ */ jsxs("a", {
			className: "auth-shell__primary auth-shell__report-action",
			href: Action.href,
			children: [
				Action.label,
				/* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					children: " "
				}),
				/* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					children: "→"
				})
			]
		})
	}) : null] });
};
export { Input as n, AuthReport as t };
