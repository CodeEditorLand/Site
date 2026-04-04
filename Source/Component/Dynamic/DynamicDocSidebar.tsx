import { useState } from "react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../UI/Collapsible.js";
import type { DocSection } from "./Interface/Content/Page/Doc.js";

const DynamicDocSidebar = ({
	Sections,
	ActiveId,
}: {
	Sections: DocSection[];
	ActiveId?: string;
}) => {
	const [OpenSection, SetOpenSection] = useState<string | null>(null);

	return (
		<nav aria-label="Documentation sections">
			<ul role="list" className="space-y-1">
				{Sections.map((Section) => {
					const IsActive = ActiveId === Section.Id;
					const HasChildren =
						Section.Children && Section.Children.length > 0;
					const IsOpen = OpenSection === Section.Id;

					if (HasChildren) {
						return (
							<li key={Section.Id}>
								<Collapsible
									open={IsOpen}
									onOpenChange={(Open) =>
										SetOpenSection(Open ? Section.Id : null)
									}>
									<CollapsibleTrigger
										className={`flex w-full items-center justify-between px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--ColorSecondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--ColorPrimary)] ${
											IsActive
												? "bg-[var(--ColorSecondary)]"
												: ""
										}`}
										aria-current={
											IsActive ? "page" : undefined
										}>
										<span>{Section.Label}</span>
										<span
											aria-hidden="true"
											className={`transition-transform ${IsOpen ? "rotate-90" : ""}`}>
											›
										</span>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<ul
											role="list"
											className="ml-3 mt-1 space-y-1 border-l border-[var(--ColorBorder)] pl-3">
											{Section.Children!.map((Child) => {
												const IsChildActive =
													ActiveId === Child.Id;
												return (
													<li key={Child.Id}>
														<a
															href={`#${Child.Id}`}
															aria-current={
																IsChildActive
																	? "page"
																	: undefined
															}
															className={`block px-2 py-1 text-sm transition-colors hover:bg-[var(--ColorSecondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--ColorPrimary)] ${
																IsChildActive
																	? "bg-[var(--ColorSecondary)] font-medium"
																	: "text-muted-foreground"
															}`}>
															{Child.Label}
														</a>
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
						<li key={Section.Id}>
							<a
								href={`#${Section.Id}`}
								aria-current={IsActive ? "page" : undefined}
								className={`block px-3 py-2 text-sm transition-colors hover:bg-[var(--ColorSecondary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--ColorPrimary)] ${
									IsActive
										? "bg-[var(--ColorSecondary)] font-medium"
										: "text-muted-foreground"
								}`}>
								{Section.Label}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export { DynamicDocSidebar };
export default DynamicDocSidebar;
