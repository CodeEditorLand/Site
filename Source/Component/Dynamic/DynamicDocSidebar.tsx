import { useState } from "react";

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

interface DynamicDocSidebarProps {
	Sections: DocSection[];

	ActiveId?: string;

	/** Rendered inline as a mobile panel (no sticky wrapper, full width) */
	Mobile?: boolean;
}

/**
 * DynamicDocSidebar - the documentation rail.
 *
 * The interaction is unchanged from the version this replaces: one collapsible
 * per section, one per group inside it, the section and group holding the
 * current page opened on load and everything else collapsed, and a single
 * disclosure panel above the content below the rail's breakpoint.
 *
 * What changed is the styling contract. Every class is the component's own
 * (`doc-sidebar__*`, owned by `System/Component/Doc/_Sidebar.scss`) instead of a
 * Tailwind string, so the type roles, the nesting rules and the current-page
 * state are one partial's business.
 *
 * The current page is marked three ways, and only one of them is colour: the
 * `aria-current="page"` attribute, the ink and weight of `--active`, and a
 * hairline rule on the row's leading edge. Its ancestor section and group are
 * marked too (ink and weight, no rule), so a reader never has to hunt for where
 * they are - and a reader who cannot see colour still reads the same three
 * signals.
 */
const DynamicDocSidebar = ({
	Sections,
	ActiveId,
	Mobile = false,
}: DynamicDocSidebarProps) => {
	// Auto-expand the section that contains the active page; collapse all others.
	const ActiveSectionId = Sections.find((S) =>
		S.Children?.some((Item) =>
			IsDocGroup(Item)
				? Item.Children.some((C) => C.Id === ActiveId)
				: Item.Id === ActiveId,
		),
	)?.Id;

	// The index page has no current page to open, and a rail of ten closed
	// headings beside a map of 81 rows is not a rail - so with no `ActiveId` every
	// section opens and the tree is readable at a glance. On a page, the section
	// and the group holding it open and everything else stays closed: the reader
	// is already where they are going.
	const OpenByDefault = ActiveId === undefined;

	/** One rule for both levels: closed unless it is the one holding the page. */
	const StartsCollapsed = (Id: string, Keep: string | undefined) =>
		!OpenByDefault && Id !== Keep;

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
	const AllGroups = Sections.flatMap((S) => S.Children ?? []).filter(
		IsDocGroup,
	);

	const ActiveGroupId = AllGroups.find((G) =>
		G.Children.some((C) => C.Id === ActiveId),
	)?.Id;

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

	const Nav = (
		<nav className="doc-sidebar" aria-label="Documentation sections">
			<ul role="list" className="doc-sidebar__list">
				{Sections.map((Section) => {
					const HasChildren =
						Section.Children && Section.Children.length > 0;

					const IsOpen = !CollapsedSections.has(Section.Id);

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
										className={
											IsOpen
												? "doc-sidebar__marker doc-sidebar__marker--open"
												: "doc-sidebar__marker"
										}
									>
										›
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
																className={
																	IsGroupOpen
																		? "doc-sidebar__marker doc-sidebar__marker--open"
																		: "doc-sidebar__marker"
																}
															>
																›
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
		</nav>
	);

	if (!Mobile) return Nav;

	// Mobile: wrap in a collapsible panel
	const AllLeaves = Sections.flatMap((S) => S.Children ?? []).flatMap(
		(Item) => (IsDocGroup(Item) ? Item.Children : [Item]),
	);

	// The disclosure's second half names where the reader is: the page they are
	// on, else the section that holds it. It falls back to the section's LABEL,
	// never to its id - `ActiveSectionId` is a slug (`deep-dive`), and printing a
	// slug in the rail is the one thing this row must not do. A page with no
	// current entry (the index itself) renders the label alone, with no separator
	// and no placeholder word.
	const ActiveLabel =
		AllLeaves.find((C) => C.Id === ActiveId)?.Label ??
		Sections.find((S) => S.Id === ActiveSectionId)?.Label;

	const [MobileOpen, SetMobileOpen] = useState(false);

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
							? "doc-sidebar__marker doc-sidebar__marker--open"
							: "doc-sidebar__marker"
					}
				>
					›
				</span>
			</button>

			{MobileOpen && <div className="doc-sidebar__panel">{Nav}</div>}
		</div>
	);
};

export { DynamicDocSidebar };

export default DynamicDocSidebar;
