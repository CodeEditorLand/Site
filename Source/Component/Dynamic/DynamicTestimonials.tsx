import type Content from "../Interface/Content/Testimonial.js";

import {
	Families,
	FamilyEntriesOf,
	Kicker,
	Lead,
} from "./Architecture/Data.js";

import type { ElementEntry } from "./Architecture/Type.js";

/**
 * The architecture record - what runs, in sixteen records.
 *
 * The band used to present each element as a quotation with an author byline:
 * an author name, a role and a quote. A reader promised endorsement and handed
 * documentation has been misled, and none of those three fields is an
 * endorsement - they are the element's name, its role and its description. The
 * byline grammar is gone. What is left is what the content actually holds, a set
 * of element records, and each one now reads as a record: its marker, its glyph,
 * its name, the role chips and the description, which is quoted whole.
 * (`HomePage.tsx` imports this module by the band's old name, so the file keeps
 * it; nothing the band renders does.)
 *
 * The markup is the Record layer's published class API (`record-band`,
 * `record-entry`) rather than the `.astro` blocks themselves: this component is
 * a child of the page's `ErrorBoundary` inside `HomePage.tsx`, and an `.astro`
 * component cannot be imported from a `.tsx` file (BRIDGE §2.1). Every class
 * used below is published by `System/Record/_Band.scss` and `_Entry.scss`, so
 * the band renders with the same stylesheet as the blocks do.
 *
 * Nothing here hydrates and nothing here is interactive: the band is a printed
 * record, so it ships no state, no effect and no handler.
 */
interface Props {
	readonly Content: Content;

	readonly ClassName?: string;
}

/** The one heading id the band's `aria-labelledby` points at. */
const HeadingId = "ArchitectureHeading";

/**
 * One record, rendered with the published `RecordEntry` class API.
 *
 * Two links, and they are different links: the name opens the element's
 * documentation page, and the `SOURCE` chip opens the element's repository. The
 * arrow in front of the name is decorative - the name is the label.
 */
const Entry = ({
	Record,
	ClassName,
}: {
	readonly Record: ElementEntry;
	readonly ClassName?: string;
}) => (
	<article className={`record-entry ${ClassName ?? ""}`.trim()}>
		<p className="record-entry__index">{Record.index}</p>
		<span className="record-entry__glyph" aria-hidden="true">
			{Record.glyph}
		</span>
		<h3 className="record-entry__name">
			{Record.href ? (
				<a className="record-entry__link" href={Record.href}>
					<span className="record-entry__arrow" aria-hidden="true">
						→
					</span>{" "}
					{Record.name}
				</a>
			) : (
				Record.name
			)}
		</h3>
		<ul className="record-entry__chips">
			{Record.chips.map((Chip) => (
				<li className="record-entry__chip" key={Chip}>
					{Chip}
				</li>
			))}
			{Record.source ? (
				<li className="record-entry__chip">
					<a
						className="architecture-entry__source"
						href={Record.source}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`Open the ${Record.name} repository`}
					>
						SOURCE
					</a>
				</li>
			) : null}
		</ul>
		<p className="record-entry__body">{Record.body}</p>
	</article>
);

const Architecture = ({ Content, ClassName }: Props) => {
	const { Title, Subtitle, Testimonial: Elements } = Content;

	const Items = Elements ?? [];

	// The grid is grouped by family, and every name in a family is one of the
	// sixteen records. The groups are built once, so the footnote's count is the
	// number of records the band actually printed rather than the number the
	// content happens to carry - a family whose names all missed would otherwise
	// inflate it.
	const Groups = Families.map((Family) => ({
		Family,
		Records: FamilyEntriesOf(Family, Items),
	})).filter((Group) => Group.Records.length > 0);

	const Count = Groups.reduce(
		(Total, Group) => Total + Group.Records.length,
		1,
	);

	return (
		<section
			id="architecture"
			aria-labelledby={HeadingId}
			className={`record-band record-band--paper ${ClassName ?? ""}`.trim()}
		>
			<div className="record-band__inner">
				<p className="record-band__kicker">{Kicker}</p>
				<h2 id={HeadingId} className="record-band__heading">
					{Title}
				</h2>
				{Subtitle ? (
					<p className="record-band__standfirst">{Subtitle}</p>
				) : null}

				<div className="record-band__body">
					<Entry
						Record={Lead}
						ClassName="architecture-entry architecture-entry--lead"
					/>

					{Groups.map(({ Family, Records }) => (
						<div className="architecture-family" key={Family.label}>
							<p className="type-meta architecture-family__label">
								{Family.label}
							</p>
							<div className="architecture-family__grid">
								{Records.map((Record) => (
									<Entry
										key={Record.index}
										Record={Record}
										ClassName="architecture-entry"
									/>
								))}
							</div>
						</div>
					))}
				</div>

				<p className="record-band__footnote">
					{`${Count} records. Each name opens the element's documentation page; ` +
						"each SOURCE chip opens the element's repository."}
				</p>
			</div>
		</section>
	);
};

export { Architecture as DynamicTestimonials };

export default Architecture;
