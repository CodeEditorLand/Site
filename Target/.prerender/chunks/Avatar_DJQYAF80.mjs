import { Yt as cn } from "./Base_BVG1wSoZ.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
// Source/Component/UI/Skeleton.tsx
/**
* Skeleton - the shape of a record before its data arrives.
*
* ─── A GREY BOX IS NOT THIS SITE'S SKELETON ──────────────────────────────
* `Component/Motion/MotionSkeleton.astro` states the site's loading arm: a
* register line, the keys the arriving record will print, their values barred,
* and `WAITING ON:` naming what has not arrived. It is an `.astro` block, so a
* React island that has to wait needs the same anatomy as a primitive - which is
* what `SkeletonRecord` is, and why it is not a box.
*
* `SkeletonRecord` reads the same two tokens the block reads
* (`--motion-skeleton-bar` and `--motion-skeleton-ink`), so a busy button
* (`StateBusy`), a loading record (`MotionSkeleton`) and a waiting card are one
* object at three scales.
*
* ─── NO PULSE IN THE RECORD GRAMMAR, AND THE REASON IS NOT TASTE ─────────
* A pulse is a loop: motion with no state change, which the motion layer forbids
* and which tells the reader nothing they did not already know. The record's bars
* are static. What moves is the moment the record arrives - `resolve`, one
* printed state giving way to another - and that belongs to whatever replaces
* this skeleton, not to the skeleton.
*
* The `Skeleton` primitive below is the exception: it carries `animate-pulse` and
* `bg-accent`, so it is a green pulsing box - a loop, and the accent spent on a
* loading state. `SkeletonRecord`, `SkeletonMatrix` and `SkeletonLines` are the arms
* that follow the rule.
*
* ─── THE THREE SHAPES ────────────────────────────────────────────────────
*   SkeletonRecord   a record: register line, keys, barred values, the wait
*   SkeletonMatrix   a table that has not arrived: its head, and bars in the cells
*   SkeletonLines    prose that has not arrived: n lines at the measured width
*
* `Skeleton` has three call sites - `DynamicAuthStatus`, `DynamicAccountProfile` and
* `SidebarMenuSkeleton` - and all three want a shape rather than a schema, so
* removing their arm would be a regression, not an improvement. The three card
* compositions (`SkeletonCard`, `SkeletonFeatureCard`, `SkeletonPricingTier`) have
* no call site in `Source/`: they are layouts kept for a surface that has not been
* built.
*/
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "skeleton",
		className: cn("flat animate-pulse bg-accent", className),
		...props
	});
}
/**
* A bar's width, derived from the key's own name.
*
* A long key tends to name a long value (`SOURCE:`, `CHECKSUM:`) and a short key a
* short one, so the caller does not have to invent a width per field. Clamped to
* 24-72% so no bar is a dot and no bar is a full rule. `MotionSkeleton` prints the
* same bars from a `--bar` its caller hands it; this is the same arithmetic with the
* guess made once, from the key, instead of once per call site.
*/
var WidthOf = (Key) => Math.min(72, Math.max(24, 24 + Key.length * 3));
/**
* SkeletonRecord - a record that has not arrived, printed in its own grammar.
*
* The keys are the record's field names, so a reader waiting learns the schema
* while they wait - and a reader whose connection dies is left with a legible
* statement of what did not arrive rather than a hole.
*/
function SkeletonRecord({ marker, keys, waiting, age, className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("SkeletonRecord", className),
		"data-motion": "skeleton",
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "SkeletonRecord__Marker",
				children: marker
			}),
			/* @__PURE__ */ jsx("dl", {
				className: "SkeletonRecord__Rows",
				children: keys.map((Key) => /* @__PURE__ */ jsxs("div", {
					className: "SkeletonRecord__Row",
					children: [/* @__PURE__ */ jsx("dt", {
						className: "SkeletonRecord__Key",
						children: Key
					}), /* @__PURE__ */ jsx("dd", {
						className: "SkeletonRecord__Value",
						"aria-hidden": "true",
						children: /* @__PURE__ */ jsx("span", {
							className: "SkeletonRecord__Bar",
							style: { "--bar": `${WidthOf(Key)}%` }
						})
					})]
				}, Key))
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "SkeletonRecord__Wait",
				children: [
					/* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						children: "↳"
					}),
					" WAITING ON: ",
					waiting,
					age === void 0 ? null : /* @__PURE__ */ jsxs("span", {
						className: "SkeletonRecord__Age",
						children: [" / ", age]
					})
				]
			})
		]
	});
}
/**
* SkeletonMatrix - a table that has not arrived.
*
* The head prints, because the head is the schema and the schema is the one thing
* that is already true. The cells are bars, and they are `aria-hidden`: a screen
* reader hears the column names and one busy state, not twelve rectangles.
*/
function SkeletonMatrix({ columns, rows = 3, marker, className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("SkeletonMatrix", className),
		"aria-busy": "true",
		children: [
			marker === void 0 ? null : /* @__PURE__ */ jsx("p", {
				className: "SkeletonRecord__Marker",
				children: marker
			}),
			/* @__PURE__ */ jsx("div", {
				className: "SkeletonMatrix__Head",
				style: { "--columns": columns.length },
				children: columns.map((Column) => /* @__PURE__ */ jsx("span", { children: Column }, Column))
			}),
			Array.from({ length: rows }, (_, Index) => /* @__PURE__ */ jsxs("div", {
				className: "SkeletonMatrix__Row",
				style: { "--columns": columns.length },
				"aria-hidden": "true",
				children: [/* @__PURE__ */ jsx("span", {
					className: "SkeletonMatrix__Bar",
					style: { "--bar": "70%" }
				}), columns.map((Column) => /* @__PURE__ */ jsx("span", {
					className: "SkeletonMatrix__Bar",
					style: { "--bar": `${WidthOf(Column)}%` }
				}, Column))]
			}, Index))
		]
	});
}
// Source/Component/UI/Avatar.tsx
var Avatar = React$1.forwardRef(({ className, size, state, ...props }, Ref) => /* @__PURE__ */ jsx(AvatarPrimitive.Root, {
	ref: Ref,
	"data-slot": "avatar",
	"data-size": size,
	"data-state": state,
	className: cn("flat relative flex size-10 shrink-0 overflow-hidden", className),
	...props
}));
Avatar.displayName = "Avatar";
function AvatarImage({ className, ...props }) {
	return /* @__PURE__ */ jsx(AvatarPrimitive.Image, {
		"data-slot": "avatar-image",
		className: cn("aspect-square size-full", className),
		...props
	});
}
var AvatarFallback = React$1.forwardRef(({ className, empty, children, ...props }, Ref) => /* @__PURE__ */ jsx(AvatarPrimitive.Fallback, {
	ref: Ref,
	"data-slot": "avatar-fallback",
	"data-empty": empty ? "true" : void 0,
	className: cn("flat flex size-full items-center justify-center bg-muted", className),
	...props,
	children: empty ? /* @__PURE__ */ jsx("span", {
		"aria-hidden": "true",
		children: "◎"
	}) : children
}));
AvatarFallback.displayName = "AvatarFallback";
/**
* InitialsOf - the two letters an unknown face prints.
*
* First letter of the first word and first letter of the last, upper case. A name
* of one word prints one letter; a name with no letters prints nothing, and the
* caller passes `empty` instead - a fallback that invented letters would be a
* fallback that made up a person.
*/
var InitialsOf = (Name) => {
	const Words = Name.trim().split(/\s+/).filter((Word) => Word.length > 0);
	if (Words.length === 0) return "";
	return `${Words[0]?.[0] ?? ""}${Words.length > 1 ? Words.at(-1)?.[0] ?? "" : ""}`.toUpperCase();
};
/**
* AvatarGroup - a set of identities, and how many are not shown.
*
* The count is derived from the array, never passed: a `+N` that disagreed with
* the set would be the one figure on the row that lied.
*/
function AvatarGroup({ items, max = 4, size = "row", className }) {
	const Shown = items.slice(0, max);
	const Rest = items.length - Shown.length;
	return /* @__PURE__ */ jsxs("div", {
		className: cn("AvatarGroup", className),
		children: [Shown.map((Item) => /* @__PURE__ */ jsx("span", {
			className: "AvatarGroup__Item",
			children: /* @__PURE__ */ jsxs(Avatar, {
				size,
				children: [Item.src === void 0 ? null : /* @__PURE__ */ jsx(AvatarImage, {
					src: Item.src,
					alt: Item.name
				}), /* @__PURE__ */ jsx(AvatarFallback, {
					delayMs: 0,
					children: InitialsOf(Item.name)
				})]
			})
		}, Item.name)), Rest > 0 ? /* @__PURE__ */ jsx("span", {
			className: "AvatarGroup__More",
			title: `${Rest} more`,
			children: `+${Rest}`
		}) : null]
	});
}
export { Skeleton as a, AvatarImage as i, AvatarFallback as n, SkeletonMatrix as o, AvatarGroup as r, SkeletonRecord as s, Avatar as t };
