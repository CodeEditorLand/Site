import { useState } from "react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../UI/Collapsible.js";

import type {
	DocGroup,
	DocItem,
	DocSection,
} from "./Interface/Content/Page/Doc.js";

const IsDocGroup = (Item: DocItem): Item is DocGroup => "Children" in Item;

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
 * The current page is marked three ways, because one of them is colour: the
 * `aria-current="page"` attribute, the ink and weight of `--active`, and a
 * hairline rule on the row's leading edge. Its ancestor section and group are
 * marked too, so a reader never has to hunt for where they are.
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

	const [CollapsedSections, SetCollapsedSections] = useState<Set<string>>(
		new Set(
			Sections.filter((S) => S.Id !== ActiveSectionId).map((S) => S.Id),
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
			AllGroups.filter((G) => G.Id !== ActiveGroupId).map((G) => G.Id),
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

	const Leaf = (Child: DocItem) => {
		const IsActive = ActiveId === Child.Id;

		return (
			<li key={Child.Id} class="doc-sidebar__item">
				<a
					href={`/Doc/${Child.Id}`}
					aria-current={IsActive ? "page" : undefined}
					className={`doc-sidebar__link${IsActive ? " doc-sidebar__link--active" : ""}`}
				>
					{Child.Label}
				</a>
			</li>
		);
	};

	const Nav = (
		<nav class="doc-sidebar" aria-label="Documentation sections">
			<ul role="list" class="doc-sidebar__list">
				{Sections.map((Section) => {
					const HasChildren =
						Section.Children && Section.Children.length > 0;

					const IsOpen = !CollapsedSections.has(Section.Id);

					const IsCurrent = ActiveSectionId === Section.Id;

					if (HasChildren) {
						return (
							<li key={Section.Id} class="doc-sidebar__item">
								<Collapsible
									open={IsOpen}
									onOpenChange={() =>
										ToggleSection(Section.Id)
									}
								>
									<CollapsibleTrigger
										className={`doc-sidebar__trigger doc-sidebar__trigger--section${IsCurrent ? " doc-sidebar__trigger--active" : ""}`}
									>
										<span class="doc-sidebar__label">
											{Section.Label}
										</span>
										<span
											aria-hidden="true"
											className={`doc-sidebar__marker${IsOpen ? " doc-sidebar__marker--open" : ""}`}
										>
											›
										</span>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<ul
											role="list"
											class="doc-sidebar__children"
										>
											{Section.Children!.map((Item) => {
												if (!IsDocGroup(Item)) {
													return Leaf(Item);
												}

												const IsGroupOpen =
													!CollapsedGroups.has(
														Item.Id,
													);

												const IsGroupCurrent =
													ActiveGroupId === Item.Id;

												return (
													<li
														key={Item.Id}
														class="doc-sidebar__item"
													>
														<Collapsible
															open={
																IsGroupOpen
															}
															onOpenChange={() =>
																ToggleGroup(
																	Item.Id,
																)
															}
														>
															<CollapsibleTrigger
																className={`doc-sidebar__trigger doc-sidebar__trigger--group${IsGroupCurrent ? " doc-sidebar__trigger--active" : ""}`}
															>
																<span class="doc-sidebar__label">
																	{
																		Item.Label
																	}
																</span>
																<span
																	aria-hidden="true"
																	className={`doc-sidebar__marker${IsGroupOpen ? " doc-sidebar__marker--open" : ""}`}
																>
																	›
																</span>
															</CollapsibleTrigger>
															<CollapsibleContent>
																<ul
																	role="list"
																	class="doc-sidebar__children"
																>
																	{Item.Children.map(
																		(
																			Child,
																		) => (
																			<Leaf
																				key={
																					Child.Id
																				}
																				{...Child}
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
					}

					return (
						<li key={Section.Id} class="doc-sidebar__item">
							<a
								href={`/Doc/${Section.Id}`}
								className="doc-sidebar__link doc-sidebar__link--section"
							>
								{Section.Label}
							</a>
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

	const ActiveLabel =
		AllLeaves.find((C) => C.Id === ActiveId)?.Label ??
		ActiveSectionId ??
		"Navigation";

	const [MobileOpen, SetMobileOpen] = useState(false);

	return (
		<div className="doc-sidebar doc-sidebar--mobile">
			<button
				type="button"
				onClick={() => SetMobileOpen((O) => !O)}
				className="doc-sidebar__toggle"
				aria-expanded={MobileOpen}
			>
				<span class="doc-sidebar__toggle-label">Docs</span>
				<span class="doc-sidebar__toggle-separator" aria-hidden="true">
					/
				</span>
				<span class="doc-sidebar__toggle-current">{ActiveLabel}</span>
				<span
					aria-hidden="true"
					className={`doc-sidebar__marker${MobileOpen ? " doc-sidebar__marker--open" : ""}`}
				>
					›
				</span>
			</button>

			{MobileOpen && <div class="doc-sidebar__panel">{Nav}</div>}
		</div>
	);
};

export { DynamicDocSidebar };

export default DynamicDocSidebar;
