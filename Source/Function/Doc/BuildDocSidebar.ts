import type { CollectionEntry } from "astro:content";

import type {
	DocGroup,
	DocItem,
	DocSection,
} from "../../Component/Dynamic/Interface/Content/Page/Doc.js";

export const SectionOrder = [
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
	"Coverage",
];

const Slugify = (Value: string) => Value.toLowerCase().replace(/\s+/g, "-");

const BuildDocSidebar = (Entries: CollectionEntry<"doc">[]): DocSection[] => {
	const EntriesBySection = new Map<string, CollectionEntry<"doc">[]>();

	for (const Entry of Entries) {
		const Section = Entry.data.section ?? "Other";

		if (!EntriesBySection.has(Section)) EntriesBySection.set(Section, []);

		EntriesBySection.get(Section)!.push(Entry);
	}

	return SectionOrder.filter((Section) => EntriesBySection.has(Section)).map(
		(Section) => {
			const Items: DocItem[] = [];
			const GroupsByLabel = new Map<string, DocGroup>();

			for (const Entry of EntriesBySection.get(Section)!) {
				const Label = Entry.data.navTitle ?? Entry.data.title;
				const Group = Entry.data.group;

				if (!Group) {
					Items.push({ Id: Entry.id, Label });
					continue;
				}

				let GroupItem = GroupsByLabel.get(Group);

				if (!GroupItem) {
					GroupItem = {
						Id: Slugify(Group),
						Label: Group,
						Children: [],
					};
					GroupsByLabel.set(Group, GroupItem);
					Items.push(GroupItem);
				}

				GroupItem.Children.push({ Id: Entry.id, Label });
			}

			return {
				Id: Slugify(Section),
				Label: Section,
				Children: Items,
			};
		},
	);
};

export default BuildDocSidebar;
