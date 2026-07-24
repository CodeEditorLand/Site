import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
//#region Source/Component/UI/Collapsible.tsx
function Collapsible({ ...props }) {
	return /* @__PURE__ */ jsx(CollapsiblePrimitive.Root, {
		"data-slot": "collapsible",
		...props
	});
}
function CollapsibleTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(CollapsiblePrimitive.CollapsibleTrigger, {
		"data-slot": "collapsible-trigger",
		...props
	});
}
function CollapsibleContent({ ...props }) {
	return /* @__PURE__ */ jsx(CollapsiblePrimitive.CollapsibleContent, {
		"data-slot": "collapsible-content",
		...props
	});
}
//#endregion
//#region Source/Component/Dynamic/DynamicDocSidebar.tsx
var IsDocGroup = (Item) => "Children" in Item;
var DynamicDocSidebar = ({ Sections, ActiveId, Mobile = false }) => {
	const ActiveSectionId = Sections.find((S) => S.Children?.some((Item) => IsDocGroup(Item) ? Item.Children.some((C) => C.Id === ActiveId) : Item.Id === ActiveId))?.Id;
	const [CollapsedSections, SetCollapsedSections] = useState(new Set(Sections.filter((S) => S.Id !== ActiveSectionId).map((S) => S.Id)));
	const ToggleSection = (Id) => {
		SetCollapsedSections((Previous) => {
			const Next = new Set(Previous);
			if (Next.has(Id)) Next.delete(Id);
			else Next.add(Id);
			return Next;
		});
	};
	const AllGroups = Sections.flatMap((S) => S.Children ?? []).filter(IsDocGroup);
	const ActiveGroupId = AllGroups.find((G) => G.Children.some((C) => C.Id === ActiveId))?.Id;
	const [CollapsedGroups, SetCollapsedGroups] = useState(new Set(AllGroups.filter((G) => G.Id !== ActiveGroupId).map((G) => G.Id)));
	const ToggleGroup = (Id) => {
		SetCollapsedGroups((Previous) => {
			const Next = new Set(Previous);
			if (Next.has(Id)) Next.delete(Id);
			else Next.add(Id);
			return Next;
		});
	};
	const Nav = /* @__PURE__ */ jsx("nav", {
		"aria-label": "Documentation sections",
		className: Mobile ? "pt-2" : void 0,
		children: /* @__PURE__ */ jsx("ul", {
			role: "list",
			className: "space-y-0.5",
			children: Sections.map((Section) => {
				const HasChildren = Section.Children && Section.Children.length > 0;
				const IsOpen = !CollapsedSections.has(Section.Id);
				if (HasChildren) return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Collapsible, {
					open: IsOpen,
					onOpenChange: () => ToggleSection(Section.Id),
					children: [/* @__PURE__ */ jsxs(CollapsibleTrigger, {
						className: "flex w-full items-center justify-between flat px-2 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-mono",
							children: Section.Label
						}), /* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							className: `transition-transform duration-150 ${IsOpen ? "rotate-90" : ""}`,
							children: "›"
						})]
					}), /* @__PURE__ */ jsx(CollapsibleContent, { children: /* @__PURE__ */ jsx("ul", {
						role: "list",
						className: "ml-2 mt-0.5 space-y-0.5 border-l border-border pl-3",
						children: Section.Children.map((Item) => {
							if (IsDocGroup(Item)) {
								const IsGroupOpen = !CollapsedGroups.has(Item.Id);
								return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Collapsible, {
									open: IsGroupOpen,
									onOpenChange: () => ToggleGroup(Item.Id),
									children: [/* @__PURE__ */ jsxs(CollapsibleTrigger, {
										className: "flex w-full items-center justify-between flat px-2 py-1 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
										children: [/* @__PURE__ */ jsx("span", { children: Item.Label }), /* @__PURE__ */ jsx("span", {
											"aria-hidden": "true",
											className: `transition-transform duration-150 ${IsGroupOpen ? "rotate-90" : ""}`,
											children: "›"
										})]
									}), /* @__PURE__ */ jsx(CollapsibleContent, { children: /* @__PURE__ */ jsx("ul", {
										role: "list",
										className: "ml-2 mt-0.5 space-y-0.5 border-l border-border pl-3",
										children: Item.Children.map((Child) => {
											const IsActive = ActiveId === Child.Id;
											return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
												href: `/Doc/${Child.Id}`,
												"aria-current": IsActive ? "page" : void 0,
												className: `block flat px-2 py-1 text-sm transition-colors hover:bg-secondary hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)] ${IsActive ? "bg-secondary font-medium text-foreground" : "text-muted-foreground"}`,
												children: Child.Label
											}) }, Child.Id);
										})
									}) })]
								}) }, Item.Id);
							}
							const IsActive = ActiveId === Item.Id;
							return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
								href: `/Doc/${Item.Id}`,
								"aria-current": IsActive ? "page" : void 0,
								className: `block flat px-2 py-1 text-sm transition-colors hover:bg-secondary hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)] ${IsActive ? "bg-secondary font-medium text-foreground" : "text-muted-foreground"}`,
								children: Item.Label
							}) }, Item.Id);
						})
					}) })]
				}) }, Section.Id);
				return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
					href: `/Doc/${Section.Id}`,
					className: "block flat px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
					children: Section.Label
				}) }, Section.Id);
			})
		})
	});
	if (!Mobile) return Nav;
	const ActiveLabel = Sections.flatMap((S) => S.Children ?? []).flatMap((Item) => IsDocGroup(Item) ? Item.Children : [Item]).find((C) => C.Id === ActiveId)?.Label ?? ActiveSectionId ?? "Navigation";
	const [MobileOpen, SetMobileOpen] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "border-b border-border pb-3 lg:hidden",
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => SetMobileOpen((O) => !O),
			className: "flex w-full items-center justify-between px-1 py-2 text-sm font-medium text-foreground hover:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]",
			"aria-expanded": MobileOpen,
			children: [/* @__PURE__ */ jsxs("span", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
						children: "Docs"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: "/"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "truncate",
						children: ActiveLabel
					})
				]
			}), /* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				className: `ml-2 shrink-0 transition-transform duration-150 ${MobileOpen ? "rotate-90" : ""}`,
				children: "›"
			})]
		}), MobileOpen && /* @__PURE__ */ jsx("div", {
			className: "mt-2 border-t border-border pt-2",
			children: Nav
		})]
	});
};
//#endregion
//#region Source/Function/Doc/BuildDocSidebar.ts
var SectionOrder = [
	"Start",
	"Guide",
	"Elements",
	"Deep Dive",
	"Workflows",
	"Why Land",
	"Reference",
	"Development",
	"Telemetry",
	"Low-Level Shim",
	"Coverage"
];
var Slugify = (Value) => Value.toLowerCase().replace(/\s+/g, "-");
var BuildDocSidebar = (Entries) => {
	const EntriesBySection = /* @__PURE__ */ new Map();
	for (const Entry of Entries) {
		const Section = Entry.data.section ?? "Other";
		if (!EntriesBySection.has(Section)) EntriesBySection.set(Section, []);
		EntriesBySection.get(Section).push(Entry);
	}
	return SectionOrder.filter((Section) => EntriesBySection.has(Section)).map((Section) => {
		const Items = [];
		const GroupsByLabel = /* @__PURE__ */ new Map();
		for (const Entry of EntriesBySection.get(Section)) {
			const Label = Entry.data.navTitle ?? Entry.data.title;
			const Group = Entry.data.group;
			if (!Group) {
				Items.push({
					Id: Entry.id,
					Label
				});
				continue;
			}
			let GroupItem = GroupsByLabel.get(Group);
			if (!GroupItem) {
				GroupItem = {
					Id: Slugify(Group),
					Label: Group,
					Children: []
				};
				GroupsByLabel.set(Group, GroupItem);
				Items.push(GroupItem);
			}
			GroupItem.Children.push({
				Id: Entry.id,
				Label
			});
		}
		return {
			Id: Slugify(Section),
			Label: Section,
			Children: Items
		};
	});
};
//#endregion
export { SectionOrder as n, DynamicDocSidebar as r, BuildDocSidebar as t };
