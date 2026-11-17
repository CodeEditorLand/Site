import type { CSSProperties } from "react";

import type Content from "../Interface/Content/Testimonial.js";

import {
	FeaturedOf,
	FiledGroupsOf,
	FiledLabel,
	Kicker,
	LeadLine,
} from "./Architecture/Data.js";

import type { ElementEntry } from "./Architecture/Type.js";

/**
 * `# CLASSIFICATION_01` - the architecture record: what runs, as one archive
 * index of seven records and one filed strip of eight.
 *
 * The band used to present each element as a quotation with an author byline:
 * an author name, a role and a quote. A reader promised endorsement and handed
 * documentation has been misled, and none of those three fields is an
 * endorsement - they are the element's name, its role and its description. The
 * byline grammar is gone. What is left is what the content actually holds, a set
 * of element records, and each printed one reads as a record: its marker, its
 * glyph, its name, the role chips and the description, quoted whole.
 * (`HomePage.tsx` imports this module by the band's old name, so the file keeps
 * it; nothing the band renders does.)
 *
 * **The seven-element budget.** `DesignSystem-Grammar.md` §8 gives this layer
 * seven elements, one short record each, and the set is fifteen. So seven print
 * (`Architecture/Data.ts` `Featured` - the runtime path the hero asserts plus
 * the three services that make it true) and eight are filed: the strip prints
 * each filed element's name against its documentation page and its `SOURCE`
 * against its repository, grouped by the stack family the band always used. No
 * element loses its name or either of its links; what changes is that a reader
 * gets seven records to read instead of sixteen equal cards.
 *
 * That is also why the records are a **ledger and not a card wall**
 * (`DesignSystem-Pages.md` §1: "one Archive Index of element records (Specimen
 * Label form), not a card wall"). One `jelly-card` is the surface - creme, so
 * the index is ink-on-creme and the white boxes are the page's cards, not this
 * band's - and the `record-entry` blocks inside it drop their own surface paint
 * to become hairline-ruled rows. The Jelly card is the surface; the Record block
 * is the structure inside it, which is the rule this component is here to keep.
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

/** The index surface: creme, flat, one inset - the ledger is ink on creme. */
const IndexInk = {
	"--jelly-fill": "var(--Mute)",
	"--jelly-radius": "0",
	"--jelly-color-border-default": "var(--Border)",
	"--jelly-card-padding-block": "1.5rem",
	"--jelly-card-padding-inline": "1.5rem",
	"--jelly-card-font-size": "inherit",
} as CSSProperties;

/**
 * One printed row: the block's own anatomy, with the block's surface paint
 * removed so the row is a ruled line on the index rather than a card inside a
 * card (`DESIGN.md` §1.3: no cards-within-cards).
 */
const RowInk = {
	background: "transparent",
	border: "none",
	borderBlockEnd: "1px solid var(--Border)",
} as CSSProperties;

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
	Ink,
}: {
	readonly Record: ElementEntry;
	readonly ClassName?: string;
	readonly Ink?: CSSProperties;
}) => (
	<article className={`record-entry ${ClassName ?? ""}`.trim()} style={Ink}>
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

	/**
	 * The seven the layer prints, and the eight it files. Both are derived from
	 * the content, so the band cannot print a record the content does not carry
	 * and cannot file one it does.
	 */
	const Printed = FeaturedOf(Items);

	const Filed = FiledGroupsOf(Items);

	const FiledCount = Filed.reduce(
		(Total, Group) => Total + Group.records.length,
		0,
	);

	return (
		<section
			id="architecture"
			aria-labelledby={HeadingId}
			className={`record-band record-band--canvas ${ClassName ?? ""}`.trim()}
		>
			<div className="record-band__inner">
				<p className="record-band__kicker">{Kicker}</p>
				<h2 id={HeadingId} className="record-band__heading">
					{Title}
				</h2>
				{Subtitle ? (
					<p className="record-band__standfirst">{Subtitle}</p>
				) : null}

				{/* The product's own one-line statement, which the lead record
				    used to carry above the families. */}
				<p className="record-band__standfirst">{LeadLine}</p>

				<div className="record-band__body">
					<jelly-card style={IndexInk}>
						<div className="grid grid-cols-1">
							{Printed.map((Record) => (
								<Entry
									ClassName="architecture-entry"
									Ink={RowInk}
									key={Record.index}
									Record={Record}
								/>
							))}
						</div>
					</jelly-card>

					{/* ─── THE FILED INDEX ─────────────────────────────── */}
					{FiledCount > 0 ? (
						<nav
							aria-label={FiledLabel}
							className="record-band__index"
						>
							<p className="type-meta m-0 w-full">{FiledLabel}</p>

							{Filed.map((Group) => (
								<div
									className="flex flex-wrap items-baseline gap-x-4 gap-y-2"
									key={Group.label}
								>
									<span className="type-meta">
										{Group.label}
									</span>

									{Group.records.map((Record) => (
										<span
											className="flex items-baseline gap-2"
											key={Record.index}
										>
											<a
												className="record-band__index-item"
												href={Record.href}
											>
												{Record.name}
											</a>

											{Record.source ? (
												<a
													aria-label={`Open the ${Record.name} repository`}
													className="type-meta"
													href={Record.source}
													rel="noopener noreferrer"
													target="_blank"
												>
													SOURCE
												</a>
											) : null}
										</span>
									))}
								</div>
							))}
						</nav>
					) : null}
				</div>

				<p className="record-band__footnote">
					{`${Printed.length} records printed, ${FiledCount} filed above. ` +
						"Each name opens the element's documentation page; each " +
						"SOURCE chip opens the element's repository."}
				</p>
			</div>
		</section>
	);
};

export { Architecture as DynamicTestimonials };

export default Architecture;
