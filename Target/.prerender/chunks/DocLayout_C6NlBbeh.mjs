import { E as addAttribute, b as maybeRenderHead, d as renderComponent, g as renderSlot, y as renderTemplate } from "./jsx-runtime_Cm1SQqpF.mjs";
import { t as createComponent } from "./astro-component_CwlruS7b.mjs";
import "./Map_ChnMuG2V.mjs";
import { Yt as cn, Zt as createAstro, jt as Chord, rt as GetI18n } from "./Base_BVG1wSoZ.mjs";
import { n as $$DocContents } from "./DocArticle_C120auSM.mjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
// Source/Component/UI/Collapsible.tsx
/**
* Collapsible - one region, one trigger, no stack.
*
* ─── WHY IT IS NOT AN ACCORDION ──────────────────────────────────────────
* The family keeps the two apart: an accordion is a set of siblings where opening
* one may close another, and a collapsible is a single region that is either
* there or not. That is why `Collapsible` has no `many items` state - a set of
* regions is the accordion, and a component that did both would be one component
* pretending to be two.
*
* ─── THE MARK THE TRIGGER CARRIES ────────────────────────────────────────
* A collapsible trigger is a button with no icon of its own, so the kit's markup
* says nothing about which way the panel is going. The grammar answers that with
* two glyphs: `→` while the region is closed (there is more, that way) and `↳`
* while it is open (this is the content of the line above).
* `CollapsibleTrigger` prints the slot and `System/UI/_Display.scss` draws the
* glyph from `data-state`, so no caller has to remember which one goes where and
* the two states cannot be swapped by a page.
*
* ─── THE SAME REDUCED-MOTION PATH AS THE ACCORDION ───────────────────────
* Radix publishes `--radix-collapsible-content-height`, the stylesheet animates
* from nothing to it, and `prefers-reduced-motion: reduce` removes the interval
* and keeps the end state. One grammar, two components.
*/
function Collapsible({ ...props }) {
	return /* @__PURE__ */ jsx(CollapsiblePrimitive.Root, {
		"data-slot": "collapsible",
		...props
	});
}
function CollapsibleTrigger({ className, children, mark = true, ...props }) {
	return /* @__PURE__ */ jsxs(CollapsiblePrimitive.CollapsibleTrigger, {
		"data-slot": "collapsible-trigger",
		className: cn("flex w-full items-baseline justify-between gap-4", className),
		...props,
		children: [children, mark ? /* @__PURE__ */ jsx("span", {
			"data-slot": "disclosure-mark",
			"aria-hidden": "true"
		}) : null]
	});
}
function CollapsibleContent({ className, ...props }) {
	return /* @__PURE__ */ jsx(CollapsiblePrimitive.CollapsibleContent, {
		"data-slot": "collapsible-content",
		className: cn("overflow-hidden", className),
		...props
	});
}
// Source/Component/Dynamic/DynamicDocSidebar.tsx
var IsDocGroup = (Item) => "Children" in Item;
/**
* One page in the rail: the leaf the reader clicks.
*
* Declared at module scope, not inside `DynamicDocSidebar`, so its identity is
* stable across a toggle. A component defined during render is a new type on
* every render, which makes React unmount and remount every leaf - and a
* remount drops the focus the reader had on the row they just clicked past.
*/
var Leaf = ({ Item, ActiveId }) => {
	const IsActive = ActiveId === Item.Id;
	return /* @__PURE__ */ jsx("li", {
		className: "doc-sidebar__item",
		children: /* @__PURE__ */ jsx("a", {
			href: `/Doc/${Item.Id}`,
			"aria-current": IsActive ? "page" : void 0,
			className: IsActive ? "doc-sidebar__link doc-sidebar__link--active" : "doc-sidebar__link",
			children: Item.Label
		})
	});
};
/** Every leaf under a section, in reading order - groups flattened. */
var LeavesOf = (Section) => (Section.Children ?? []).flatMap((Item) => IsDocGroup(Item) ? Item.Children : [Item]);
/**
* Does a page answer the reader's filter?
*
* Label and id, because a reader who knows the title types the title and a reader
* who has the address types the slug. Case-insensitive; no fuzzy scoring here -
* the rail is a window, and a window that reorders itself under the reader's
* hands is worse than one that hides rows.
*/
var Matches = (Query, Leaf) => Query === "" || Leaf.Label.toLowerCase().includes(Query) || Leaf.Id.toLowerCase().includes(Query);
/**
* DynamicDocSidebar - the documentation rail, as a control.
*
* The tree is the manual, and it is the one control a reader uses on eighty-one
* pages. It already answered *where am I* (the current page is marked three ways,
* only one of them colour) and *what else is here* (one collapsible per section
* and per group). This version adds the two things a tree of eighty-one rows
* needs before it is a control rather than a list:
*
* - **A filter.** `FILTER:` at the head of the register, the same `.SlipField`
*   the palette's query line is, so the two controls are visibly one input in two
*   places. Typing prunes the tree to matching pages and keeps their sections and
*   groups as headings - a result with no context is a search result, not a map.
*   While a filter is active every matching disclosure is open, because a filter
*   that hides its own matches behind a closed disclosure has done nothing.
*
* - **A count per section.** A closed section prints how many pages are behind it.
*   That is the difference between "there is more" and "there are twelve more", and
*   it is what lets a reader decide whether to open it.
*
* When the manual has no match, the rail does not stop at "no results": it prints
* `◎ NO PAGE` and a `→ FIND ALL RECORDS 〈⌘K〉` row that opens the palette with the
* same query. A local index that hands off to the global one is what an editor
* does when a file filter finds nothing - and it is how the palette becomes
* discoverable from the one place a lost reader actually is.
*
* The interaction is the component's own: one collapsible per section, one per
* group inside it, the section and group holding the current page opened on
* load and everything else collapsed, and a single disclosure panel above the
* content below the rail's breakpoint. The styling contract is the component's
* own (`doc-sidebar__*`, owned by `Doc/_Sidebar.scss`); the control states come
* from `Stylesheet/System/UI/_Rail.scss`, which is where the filter, the counts
* and the row states live.
*/
var DynamicDocSidebar = ({ Sections, ActiveId, Mobile = false }) => {
	/**
	* The tree is walked once, not once per render.
	*
	* `Sections` is deserialized once from the island's props, so these three
	* answers cannot change while the component is mounted. Without the memo
	* they would be recomputed on every keystroke in the filter and every
	* toggle: ten sections, eighty-one leaves, three walks each. The rail is a
	* control a reader types into; the type-in path should not re-derive the
	* manual.
	*/
	const ActiveSectionId = useMemo(() => Sections.find((S) => S.Children?.some((Item) => IsDocGroup(Item) ? Item.Children.some((C) => C.Id === ActiveId) : Item.Id === ActiveId))?.Id, [Sections, ActiveId]);
	/** How many pages sit behind each section - the count the trigger prints. */
	const LeafCounts = useMemo(() => new Map(Sections.map((Section) => [Section.Id, LeavesOf(Section).length])), [Sections]);
	/** Every page in the manual, in reading order - the mobile label's index. */
	const AllLeaves = useMemo(() => Sections.flatMap((S) => S.Children ?? []).flatMap((Item) => IsDocGroup(Item) ? Item.Children : [Item]), [Sections]);
	/** One rule for both levels: closed unless it is the one holding the page. */
	const StartsCollapsed = (Id, Keep) => Id !== Keep;
	const Ids = (Items) => Items.map((Item) => Item.Id);
	const [CollapsedSections, SetCollapsedSections] = useState(new Set(Ids(Sections.filter((S) => StartsCollapsed(S.Id, ActiveSectionId)))));
	const ToggleSection = (Id) => {
		SetCollapsedSections((Previous) => {
			const Next = new Set(Previous);
			if (Next.has(Id)) Next.delete(Id);
			else Next.add(Id);
			return Next;
		});
	};
	const AllGroups = useMemo(() => Sections.flatMap((S) => S.Children ?? []).filter(IsDocGroup), [Sections]);
	const ActiveGroupId = useMemo(() => AllGroups.find((G) => G.Children.some((C) => C.Id === ActiveId))?.Id, [AllGroups, ActiveId]);
	const [CollapsedGroups, SetCollapsedGroups] = useState(new Set(Ids(AllGroups.filter((G) => StartsCollapsed(G.Id, ActiveGroupId)))));
	const ToggleGroup = (Id) => {
		SetCollapsedGroups((Previous) => {
			const Next = new Set(Previous);
			if (Next.has(Id)) Next.delete(Id);
			else Next.add(Id);
			return Next;
		});
	};
	const [Query, SetQuery] = useState("");
	const Needle = Query.trim().toLowerCase();
	const Filtered = useMemo(() => {
		if (Needle === "") return Sections;
		return Sections.map((Section) => ({
			...Section,
			Children: (Section.Children ?? []).map((Item) => {
				if (!IsDocGroup(Item)) return Matches(Needle, Item) ? Item : null;
				const Children = Item.Children.filter((Leaf) => Matches(Needle, Leaf));
				return Children.length > 0 ? {
					...Item,
					Children
				} : null;
			}).filter((Item) => Item !== null)
		})).filter((Section) => (Section.Children ?? []).length > 0);
	}, [Needle, Sections]);
	const FilteredCount = Filtered.reduce((Total, Section) => Total + LeavesOf(Section).length, 0);
	/**
	* The handoff. The palette owns the chord and the register, so the rail does
	* not open anything itself: it announces the reader's words and lets the one
	* control that can answer them answer. `detail.query` is the reader's text,
	* unchanged - the palette filters it exactly as the rail did.
	*/
	const Handoff = () => {
		window.dispatchEvent(new CustomEvent("palette:open", { detail: { query: Query } }));
	};
	/**
	* The rail is a window onto eighty-one rows, and the one row that matters is
	* the page the reader is on. Without this the window opens at the top of the
	* tree and the current page sits below the fold - which is the orientation the
	* rail exists to give, lost. Centring the row keeps the section header above it
	* in view, so "where am I" arrives with "in what".
	*
	* It scrolls the nearest scrolling ancestor and nothing else: on a wide
	* viewport that is the rail's tree register, and inside the mobile panel the
	* panel is not mounted until the reader opens it, so this is a no-op there.
	*/
	const NavRef = useRef(null);
	useEffect(() => {
		/**
		* Centre the current row - in a frame, and only when it moves.
		*
		* Run synchronously in the mount effect, it would put a `querySelector`, an
		* ancestor walk that reads `getComputedStyle` at every step, two
		* `getBoundingClientRect` calls and a `scrollTop` write inside the commit
		* hydration is already paying for - a forced layout before the page's first
		* idle moment, on every doc route. It is one deferred frame, the reads
		* happen before the write so there is one layout rather than two, and a row
		* that is already where it belongs costs no write at all.
		*/
		const Frame = requestAnimationFrame(() => {
			const Active = NavRef.current?.querySelector("[aria-current=\"page\"]");
			if (!Active) return;
			let Box = Active.parentElement;
			while (Box && !(Box.scrollHeight > Box.clientHeight + 1 && getComputedStyle(Box).overflowY !== "visible")) Box = Box.parentElement;
			if (!Box || Box === document.body || Box === document.documentElement) return;
			const Row = Active.getBoundingClientRect();
			const FrameBox = Box.getBoundingClientRect();
			const Delta = Row.top - FrameBox.top - (FrameBox.height - Row.height) / 2;
			if (Math.abs(Delta) < 1) return;
			Box.scrollTop += Delta;
		});
		return () => cancelAnimationFrame(Frame);
	}, []);
	const Nav = /* @__PURE__ */ jsxs("nav", {
		ref: NavRef,
		className: "doc-sidebar",
		"aria-label": "Documentation sections",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "RailFilter",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "RailFilter__Box SlipField",
					children: [/* @__PURE__ */ jsx("span", {
						className: "SlipField__Label",
						children: "FILTER:"
					}), /* @__PURE__ */ jsx("input", {
						type: "search",
						className: "SlipInput",
						value: Query,
						onChange: (Event) => SetQuery(Event.target.value),
						placeholder: "page name",
						"aria-label": "Filter documentation pages"
					})]
				}), Query ? /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "RailFilter__Clear",
					onClick: () => SetQuery(""),
					"aria-label": "Clear the filter",
					children: "×"
				}) : null]
			}),
			/* @__PURE__ */ jsx("ul", {
				role: "list",
				className: "doc-sidebar__list",
				children: Filtered.map((Section) => {
					const HasChildren = Section.Children && Section.Children.length > 0;
					const IsOpen = Needle !== "" || !CollapsedSections.has(Section.Id);
					const IsCurrent = ActiveSectionId === Section.Id;
					if (!HasChildren) return /* @__PURE__ */ jsx("li", {
						className: "doc-sidebar__item",
						children: /* @__PURE__ */ jsx("a", {
							href: `/Doc/${Section.Id}`,
							className: "doc-sidebar__link doc-sidebar__link--section",
							children: Section.Label
						})
					}, Section.Id);
					return /* @__PURE__ */ jsx("li", {
						className: "doc-sidebar__item",
						children: /* @__PURE__ */ jsxs(Collapsible, {
							open: IsOpen,
							onOpenChange: () => ToggleSection(Section.Id),
							children: [/* @__PURE__ */ jsxs(CollapsibleTrigger, {
								className: IsCurrent ? "doc-sidebar__trigger doc-sidebar__trigger--section doc-sidebar__trigger--active" : "doc-sidebar__trigger doc-sidebar__trigger--section",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "doc-sidebar__label",
										children: Section.Label
									}),
									/* @__PURE__ */ jsx("span", {
										"aria-hidden": "true",
										className: "doc-sidebar__count",
										children: String(LeafCounts.get(Section.Id) ?? 0).padStart(2, "0")
									}),
									/* @__PURE__ */ jsx("span", {
										"aria-hidden": "true",
										className: IsOpen ? "doc-sidebar__marker MarkFold" : "doc-sidebar__marker MarkFold"
									})
								]
							}), /* @__PURE__ */ jsx(CollapsibleContent, { children: /* @__PURE__ */ jsx("ul", {
								role: "list",
								className: "doc-sidebar__children",
								children: Section.Children.map((Item) => {
									if (!IsDocGroup(Item)) return /* @__PURE__ */ jsx(Leaf, {
										Item,
										ActiveId
									}, Item.Id);
									const IsGroupOpen = Needle !== "" || !CollapsedGroups.has(Item.Id);
									const IsGroupCurrent = ActiveGroupId === Item.Id;
									return /* @__PURE__ */ jsx("li", {
										className: "doc-sidebar__item",
										children: /* @__PURE__ */ jsxs(Collapsible, {
											open: IsGroupOpen,
											onOpenChange: () => ToggleGroup(Item.Id),
											children: [/* @__PURE__ */ jsxs(CollapsibleTrigger, {
												className: IsGroupCurrent ? "doc-sidebar__trigger doc-sidebar__trigger--group doc-sidebar__trigger--active" : "doc-sidebar__trigger doc-sidebar__trigger--group",
												children: [
													/* @__PURE__ */ jsx("span", {
														className: "doc-sidebar__label",
														children: Item.Label
													}),
													/* @__PURE__ */ jsx("span", {
														"aria-hidden": "true",
														className: "doc-sidebar__count",
														children: String(Item.Children.length).padStart(2, "0")
													}),
													/* @__PURE__ */ jsx("span", {
														"aria-hidden": "true",
														className: IsGroupOpen ? "doc-sidebar__marker MarkFold" : "doc-sidebar__marker MarkFold"
													})
												]
											}), /* @__PURE__ */ jsx(CollapsibleContent, { children: /* @__PURE__ */ jsx("ul", {
												role: "list",
												className: "doc-sidebar__children",
												children: Item.Children.map((Child) => /* @__PURE__ */ jsx(Leaf, {
													Item: Child,
													ActiveId
												}, Child.Id))
											}) })]
										})
									}, Item.Id);
								})
							}) })]
						})
					}, Section.Id);
				})
			}),
			Needle !== "" && FilteredCount === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "doc-sidebar__empty",
				children: [
					/* @__PURE__ */ jsxs("p", {
						className: "doc-sidebar__empty-mark",
						children: [/* @__PURE__ */ jsx("b", {
							"aria-hidden": "true",
							children: "◎"
						}), /* @__PURE__ */ jsx("span", { children: "NO PAGE" })]
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "doc-sidebar__empty-line",
						children: [
							"↳ NOTHING IN THE MANUAL MATCHES 〈",
							Query.trim(),
							"〉"
						]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "doc-sidebar__handoff",
						onClick: Handoff,
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "doc-sidebar__handoff-mark MarkArrow",
								"data-place": "lead",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ jsx("span", { children: "FIND ALL RECORDS" }),
							/* @__PURE__ */ jsx("span", {
								className: "doc-sidebar__handoff-chord",
								children: /* @__PURE__ */ jsx(Chord, { children: "⌘K" })
							})
						]
					})
				]
			}) : null
		]
	});
	const [MobileOpen, SetMobileOpen] = useState(false);
	if (!Mobile) return Nav;
	const ActiveLabel = AllLeaves.find((C) => C.Id === ActiveId)?.Label ?? Sections.find((S) => S.Id === ActiveSectionId)?.Label;
	return /* @__PURE__ */ jsxs("div", {
		className: "doc-sidebar doc-sidebar--mobile",
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => SetMobileOpen((O) => !O),
			className: "doc-sidebar__toggle",
			"aria-expanded": MobileOpen,
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "doc-sidebar__toggle-label",
					children: "Docs"
				}),
				ActiveLabel ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
					className: "doc-sidebar__toggle-separator",
					"aria-hidden": "true",
					children: "/"
				}), /* @__PURE__ */ jsx("span", {
					className: "doc-sidebar__toggle-current",
					children: ActiveLabel
				})] }) : null,
				/* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					className: MobileOpen ? "doc-sidebar__marker MarkFold" : "doc-sidebar__marker MarkFold"
				})
			]
		}), MobileOpen && /* @__PURE__ */ jsx("div", {
			className: "doc-sidebar__panel",
			children: Nav
		})]
	});
};
// Source/Component/Doc/DocLayout.astro
createAstro("https://editor.land");
var $$DocLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DocLayout;
	const { sections, activeId, mobile = true, contents, contentsFold = "auto", contentsDense = "auto", id = "top" } = Astro.props;
	const FoldFloor = 24;
	const ContentsCount = contents?.Items.length ?? 0;
	const FoldContents = contentsFold === "auto" ? ContentsCount > FoldFloor : contentsFold;
	const DenseContents = contentsDense === "auto" ? ContentsCount > FoldFloor : contentsDense;
	const HasMargin = Astro.slots.has("margin");
	const T = GetI18n();
	const SidebarTitle = T("sidebar.title", {
		ns: "doc",
		defaultValue: "Documentation"
	});
	const SidebarEmpty = T("sidebar.empty", {
		ns: "doc",
		defaultValue: "The manual's tree has not been read in this build, so the rail lists no page."
	});
	return renderTemplate`${maybeRenderHead($$result)}<div class="doc-layout"${addAttribute(id, "id")}> <div class="doc-layout__shell"> <aside class="doc-layout__aside" aria-label="Documentation navigation"> <div class="doc-layout__sticky"> ${contents && contents.Items.length > 0 ? renderTemplate`<div class="doc-layout__head"> ${renderComponent($$result, "DocContents", $$DocContents, {
		"toc": contents,
		"variant": "rail",
		"collapsible": FoldContents,
		"dense": DenseContents
	})} </div>` : null} <div class="doc-layout__tree"> <p class="doc-layout__title">${SidebarTitle}</p> ${sections.length > 0 ? renderTemplate`${renderComponent($$result, "DynamicDocSidebar", DynamicDocSidebar, {
		"Sections": sections,
		"ActiveId": activeId,
		"client:media": "(min-width:1024px)",
		"client:component-hydration": "media",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
		"client:component-export": "DynamicDocSidebar"
	})}` : renderTemplate`<p class="doc-layout__absent" data-state="empty"> <span class="doc-layout__absent-mark" aria-hidden="true">
◎
</span> ${SidebarEmpty} </p>`} </div> <div class="doc-layout__foot"> <a class="doc-layout__rust" href="/Doc/Rust">
Rust API${" "} <span aria-hidden="true">↗</span> </a> </div> </div> </aside> <div class="doc-layout__main"> ${mobile && sections.length > 0 ? renderTemplate`${renderComponent($$result, "DynamicDocSidebar", DynamicDocSidebar, {
		"Sections": sections,
		"ActiveId": activeId,
		"Mobile": true,
		"client:media": "(max-width:1023.98px)",
		"client:component-hydration": "media",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicDocSidebar.tsx",
		"client:component-export": "DynamicDocSidebar"
	})}` : mobile ? renderTemplate`<p class="doc-layout__absent doc-layout__absent--panel" data-state="empty"> <span class="doc-layout__absent-mark" aria-hidden="true">
◎
</span> ${SidebarEmpty} </p>` : null} ${renderSlot($$result, $$slots["default"])} </div> ${HasMargin ? renderTemplate`<aside class="doc-layout__margin" aria-label="Page apparatus"> ${renderSlot($$result, $$slots["margin"])} </aside>` : null} </div> </div>`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Doc/DocLayout.astro", void 0);
export { CollapsibleTrigger as i, Collapsible as n, CollapsibleContent as r, $$DocLayout as t };
