import { useEffect, useMemo, useRef, useState } from "react";

import { Chord } from "../UI/Slip";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../UI/Collapsible.js";

import type {
	DocGroup,
	DocItem,
	DocLeaf,
	DocSection,
} from "./Interface/Content/Page/Doc.js";

const IsDocGroup = (Item: DocItem): Item is DocGroup => "Children" in Item;

/**
 * One page in the rail: the leaf the reader clicks.
 *
 * Declared at module scope, not inside `DynamicDocSidebar`, so its identity is
 * stable across a toggle. A component defined during render is a new type on
 * every render, which makes React unmount and remount every leaf - and a
 * remount drops the focus the reader had on the row they just clicked past.
 */
const Leaf = ({
	Item,
	ActiveId,
}: {
	Item: DocLeaf;

	ActiveId: string | undefined;
}) => {
	const IsActive = ActiveId === Item.Id;

	return (
		<li className="doc-sidebar__item">
			<a
				href={`/Doc/${Item.Id}`}
				aria-current={IsActive ? "page" : undefined}
				className={
					IsActive
						? "doc-sidebar__link doc-sidebar__link--active"
						: "doc-sidebar__link"
				}
			>
				{Item.Label}
			</a>
		</li>
	);
};

/** Every leaf under a section, in reading order - groups flattened. */
const LeavesOf = (Section: DocSection): DocLeaf[] =>
	(Section.Children ?? []).flatMap((Item) =>
		IsDocGroup(Item) ? Item.Children : [Item],
	);

/**
 * Does a page answer the reader's filter?
 *
 * Label and id, because a reader who knows the title types the title and a reader
 * who has the address types the slug. Case-insensitive; no fuzzy scoring here -
 * the rail is a window, and a window that reorders itself under the reader's
 * hands is worse than one that hides rows.
 */
const Matches = (Query: string, Leaf: DocLeaf): boolean =>
	Query === "" ||
	Leaf.Label.toLowerCase().includes(Query) ||
	Leaf.Id.toLowerCase().includes(Query);

interface DynamicDocSidebarProps {
	Sections: DocSection[];

	ActiveId?: string;

	/** Rendered inline as a mobile panel (no sticky wrapper, full width) */
	Mobile?: boolean;
}

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
const DynamicDocSidebar = ({
	Sections,
	ActiveId,
	Mobile = false,
}: DynamicDocSidebarProps) => {
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
	const ActiveSectionId = useMemo(
		() =>
			Sections.find((S) =>
				S.Children?.some((Item) =>
					IsDocGroup(Item)
						? Item.Children.some((C) => C.Id === ActiveId)
						: Item.Id === ActiveId,
				),
			)?.Id,

		[Sections, ActiveId],
	);

	/** How many pages sit behind each section - the count the trigger prints. */
	const LeafCounts = useMemo(
		() =>
			new Map(
				Sections.map((Section) => [
					Section.Id,

					LeavesOf(Section).length,
				]),
			),

		[Sections],
	);

	/** Every page in the manual, in reading order - the mobile label's index. */
	const AllLeaves = useMemo(
		() =>
			Sections.flatMap((S) => S.Children ?? []).flatMap((Item) =>
				IsDocGroup(Item) ? Item.Children : [Item],
			),

		[Sections],
	);

	// The index page has no current page to open, and the baseline rail showed
	// ten closed headings beside its card grid: every section starts collapsed
	// there too, because the page's own cards are the navigation. On a page, the
	// section and the group holding it open and everything else stays closed:
	// the reader is already where they are going.
	/** One rule for both levels: closed unless it is the one holding the page. */
	const StartsCollapsed = (Id: string, Keep: string | undefined) =>
		Id !== Keep;

	const Ids = (Items: readonly { Id: string }[]) =>
		Items.map((Item) => Item.Id);

	const [CollapsedSections, SetCollapsedSections] = useState<Set<string>>(
		new Set(
			Ids(Sections.filter((S) => StartsCollapsed(S.Id, ActiveSectionId))),
		),
	);

	const ToggleSection = (Id: string) => {
		SetCollapsedSections((Previous) => {
			const Next = new Set(Previous);

			if (Next.has(Id)) {
				Next.delete(Id);
			} else {
				Next.add(Id);
			}

			return Next;
		});
	};

	// Same auto-expand behavior one level deeper, for groups nested inside a section.
	const AllGroups = useMemo(
		() => Sections.flatMap((S) => S.Children ?? []).filter(IsDocGroup),

		[Sections],
	);

	const ActiveGroupId = useMemo(
		() =>
			AllGroups.find((G) => G.Children.some((C) => C.Id === ActiveId))
				?.Id,

		[AllGroups, ActiveId],
	);

	const [CollapsedGroups, SetCollapsedGroups] = useState<Set<string>>(
		new Set(
			Ids(AllGroups.filter((G) => StartsCollapsed(G.Id, ActiveGroupId))),
		),
	);

	const ToggleGroup = (Id: string) => {
		SetCollapsedGroups((Previous) => {
			const Next = new Set(Previous);

			if (Next.has(Id)) {
				Next.delete(Id);
			} else {
				Next.add(Id);
			}

			return Next;
		});
	};

	// ─── The filter ────────────────────────────────────────────────────────

	const [Query, SetQuery] = useState("");

	const Needle = Query.trim().toLowerCase();

	const Filtered = useMemo(() => {
		if (Needle === "") return Sections;

		return Sections.map((Section) => ({
			...Section,
			Children: (Section.Children ?? [])
				.map((Item) => {
					if (!IsDocGroup(Item)) {
						return Matches(Needle, Item) ? Item : null;
					}

					const Children = Item.Children.filter((Leaf) =>
						Matches(Needle, Leaf),
					);

					return Children.length > 0 ? { ...Item, Children } : null;
				})
				.filter((Item): Item is DocItem => Item !== null),
		})).filter((Section) => (Section.Children ?? []).length > 0);
	}, [Needle, Sections]);

	const FilteredCount = Filtered.reduce(
		(Total, Section) => Total + LeavesOf(Section).length,

		0,
	);

	/**
	 * The handoff. The palette owns the chord and the register, so the rail does
	 * not open anything itself: it announces the reader's words and lets the one
	 * control that can answer them answer. `detail.query` is the reader's text,
	 * unchanged - the palette filters it exactly as the rail did.
	 */
	const Handoff = () => {
		window.dispatchEvent(
			new CustomEvent("palette:open", { detail: { query: Query } }),
		);
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
	const NavRef = useRef<HTMLElement>(null);

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
			const Active = NavRef.current?.querySelector<HTMLElement>(
				'[aria-current="page"]',
			);

			if (!Active) return;

			let Box: HTMLElement | null = Active.parentElement;

			while (
				Box &&
				!(
					Box.scrollHeight > Box.clientHeight + 1 &&
					getComputedStyle(Box).overflowY !== "visible"
				)
			)
				Box = Box.parentElement;

			if (
				!Box ||
				Box === document.body ||
				Box === document.documentElement
			)
				return;

			const Row = Active.getBoundingClientRect();

			const FrameBox = Box.getBoundingClientRect();

			const Delta =
				Row.top - FrameBox.top - (FrameBox.height - Row.height) / 2;

			if (Math.abs(Delta) < 1) return;

			Box.scrollTop += Delta;
		});

		return () => cancelAnimationFrame(Frame);
	}, []);

	const Nav = (
		<nav
			ref={NavRef}
			className="doc-sidebar"
			aria-label="Documentation sections"
		>
			<div className="RailFilter">
				<label className="RailFilter__Box SlipField">
					<span className="SlipField__Label">FILTER:</span>
					<input
						type="search"
						className="SlipInput"
						value={Query}
						onChange={(Event) => SetQuery(Event.target.value)}
						placeholder="page name"
						aria-label="Filter documentation pages"
					/>
				</label>

				{Query ? (
					<button
						type="button"
						className="RailFilter__Clear"
						onClick={() => SetQuery("")}

						aria-label="Clear the filter"
					>
						×
					</button>
				) : null}
			</div>

			<ul role="list" className="doc-sidebar__list">
				{Filtered.map((Section) => {
					const HasChildren =
						Section.Children && Section.Children.length > 0;

					// A filter opens what it matched: a match hidden behind a closed
					// disclosure is a match the reader cannot see.
					const IsOpen =
						Needle !== "" || !CollapsedSections.has(Section.Id);

					const IsCurrent = ActiveSectionId === Section.Id;

					if (!HasChildren) {
						return (
							<li key={Section.Id} className="doc-sidebar__item">
								<a
									href={`/Doc/${Section.Id}`}
									className="doc-sidebar__link doc-sidebar__link--section"
								>
									{Section.Label}
								</a>
							</li>
						);
					}

					return (
						<li key={Section.Id} className="doc-sidebar__item">
							<Collapsible
								open={IsOpen}
								onOpenChange={() => ToggleSection(Section.Id)}
							>
								<CollapsibleTrigger
									className={
										IsCurrent
											? "doc-sidebar__trigger doc-sidebar__trigger--section doc-sidebar__trigger--active"
											: "doc-sidebar__trigger doc-sidebar__trigger--section"
									}
								>
									<span className="doc-sidebar__label">
										{Section.Label}
									</span>
									<span
										aria-hidden="true"
										className="doc-sidebar__count"
									>
										{String(
											LeafCounts.get(Section.Id) ?? 0,
										).padStart(2, "0")}
									</span>
									<span
										aria-hidden="true"
										className={
											IsOpen
												? "doc-sidebar__marker MarkFold"
												: "doc-sidebar__marker MarkFold"
										}
									>
										{/* the glyph is the mark's (`Mark/_Arrow.scss`): an empty
										    span, so the fold cannot print two `›`s or a
										    different glyph from the rest of the site */}
									</span>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<ul
										role="list"
										className="doc-sidebar__children"
									>
										{Section.Children!.map((Item) => {
											if (!IsDocGroup(Item)) {
												return (
													<Leaf
														key={Item.Id}
														Item={Item}
														ActiveId={ActiveId}
													/>
												);
											}

											const IsGroupOpen =
												Needle !== "" ||
												!CollapsedGroups.has(Item.Id);

											const IsGroupCurrent =
												ActiveGroupId === Item.Id;

											return (
												<li
													key={Item.Id}
													className="doc-sidebar__item"
												>
													<Collapsible
														open={IsGroupOpen}
														onOpenChange={() =>
															ToggleGroup(Item.Id)
														}
													>
														<CollapsibleTrigger
															className={
																IsGroupCurrent
																	? "doc-sidebar__trigger doc-sidebar__trigger--group doc-sidebar__trigger--active"
																	: "doc-sidebar__trigger doc-sidebar__trigger--group"
															}
														>
															<span className="doc-sidebar__label">
																{Item.Label}
															</span>
															<span
																aria-hidden="true"
																className="doc-sidebar__count"
															>
																{String(
																	Item
																		.Children
																		.length,
																).padStart(
																	2,
																	"0",
																)}
															</span>
															<span
																aria-hidden="true"
																className={
																	IsGroupOpen
																		? "doc-sidebar__marker MarkFold"
																		: "doc-sidebar__marker MarkFold"
																}
															>
																{/* the glyph is the mark's (`Mark/_Arrow.scss`) */}
															</span>
														</CollapsibleTrigger>
														<CollapsibleContent>
															<ul
																role="list"
																className="doc-sidebar__children"
															>
																{Item.Children.map(
																	(Child) => (
																		<Leaf
																			key={
																				Child.Id
																			}
																			Item={
																				Child
																			}
																			ActiveId={
																				ActiveId
																			}
																		/>
																	),
																)}
															</ul>
														</CollapsibleContent>
													</Collapsible>
												</li>
											);
										})}
									</ul>
								</CollapsibleContent>
							</Collapsible>
						</li>
					);
				})}
			</ul>

			{Needle !== "" && FilteredCount === 0 ? (
				<div className="doc-sidebar__empty">
					<p className="doc-sidebar__empty-mark">
						<b aria-hidden="true">◎</b>
						<span>NO PAGE</span>
					</p>
					<p className="doc-sidebar__empty-line">
						↳ NOTHING IN THE MANUAL MATCHES 〈{Query.trim()}〉
					</p>
					<button
						type="button"
						className="doc-sidebar__handoff"
						onClick={Handoff}
					>
						<span
							className="doc-sidebar__handoff-mark MarkArrow"
							data-place="lead"
							aria-hidden="true"
						/>
						<span>FIND ALL RECORDS</span>
						<span className="doc-sidebar__handoff-chord">
							<Chord>⌘K</Chord>
						</span>
					</button>
				</div>
			) : null}
		</nav>
	);

	/* Declared before the mobile early-return: a hook below a conditional
	   return is a hook React can be asked to skip, and this one used to sit
	   under `if (!Mobile) return Nav`. */
	const [MobileOpen, SetMobileOpen] = useState(false);

	if (!Mobile) return Nav;

	// Mobile: wrap in a collapsible panel
	// The disclosure's second half names where the reader is: the page they are
	// on, else the section that holds it. It falls back to the section's LABEL,
	// never to its id - `ActiveSectionId` is a slug (`deep-dive`), and printing a
	// slug in the rail is the one thing this row must not do. A page with no
	// current entry (the index itself) renders the label alone, with no separator
	// and no placeholder word.
	const ActiveLabel =
		AllLeaves.find((C) => C.Id === ActiveId)?.Label ??
		Sections.find((S) => S.Id === ActiveSectionId)?.Label;

	return (
		<div className="doc-sidebar doc-sidebar--mobile">
			<button
				type="button"
				onClick={() => SetMobileOpen((O) => !O)}
				className="doc-sidebar__toggle"
				aria-expanded={MobileOpen}
			>
				<span className="doc-sidebar__toggle-label">Docs</span>
				{ActiveLabel ? (
					<>
						<span
							className="doc-sidebar__toggle-separator"
							aria-hidden="true"
						>
							/
						</span>
						<span className="doc-sidebar__toggle-current">
							{ActiveLabel}
						</span>
					</>
				) : null}
				<span
					aria-hidden="true"
					className={
						MobileOpen
							? "doc-sidebar__marker MarkFold"
							: "doc-sidebar__marker MarkFold"
					}
				>
					{/* the glyph is the mark's (`Mark/_Arrow.scss`) */}
				</span>
			</button>

			{MobileOpen && <div className="doc-sidebar__panel">{Nav}</div>}
		</div>
	);
};

export { DynamicDocSidebar };

export default DynamicDocSidebar;
