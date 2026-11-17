import { useTranslation } from "react-i18next";

import type Content from "../Interface/Content/Feature.js";

import { EntriesOf, Heading, Kicker } from "./Properties/Data.js";

/**
 * The six properties - one band, six records.
 *
 * The band used to print six `SpecimenLabel` ledgers of *element* records
 * (Mountain, Cocoon, Wind, Sky, Air, Echo) in feature order, which meant the
 * six properties' own titles and paragraphs - `home:features.item.*`, the copy
 * this band exists for - were never rendered at all. They are now the records:
 * the claim is the record's name and the paragraph is its body, quoted whole.
 *
 * The band heading is `home:features.heading` rather than the old
 * `features.title`, because a heading has to say what its own band is; the old
 * title restated the hero's claim one section below the hero. Both the key and
 * its `defaultValue` are present - the JSON in
 * `Source/Library/I18n/Locale/En/Home.json` and the constant in `Data.ts` - so
 * neither silently overrides the other (BRIDGE §8.6).
 *
 * The markup is the Record layer's published class API rather than the
 * `.astro` blocks: this component is a child of the page's `ErrorBoundary`
 * inside `HomePage.tsx`, and an `.astro` component cannot be imported from a
 * `.tsx` file (BRIDGE §2.1).
 *
 * The band is printed, not driven: no state, no effect, no handler. The noise
 * scatter the old cards ran is gone with them - it moved decoration over six
 * cards whose copy was not being read.
 */
interface Props {
	readonly Content: Content;

	readonly ClassName?: string;
}

/** The one heading id the band's `aria-labelledby` points at. */
const HeadingId = "FeaturesHeading";

const Features = ({ Content, ClassName }: Props) => {
	const { t: T } = useTranslation(["home", "common"]);

	const { Subtitle, Feature } = Content;

	const HeadingText = T("home:features.heading", { defaultValue: Heading });

	const Entries = EntriesOf(Feature ?? []);

	return (
		<section
			id="features"
			aria-labelledby={HeadingId}
			className={`record-band record-band--canvas ${ClassName ?? ""}`.trim()}
		>
			<div className="record-band__inner">
				<p className="record-band__kicker">{Kicker}</p>
				<h2 id={HeadingId} className="record-band__heading">
					{HeadingText}
				</h2>
				{Subtitle ? (
					<p className="record-band__standfirst">{Subtitle}</p>
				) : null}

				<div className="record-band__body">
					<div className="properties-grid">
						{Entries.map((Entry) => (
							<article
								className="record-entry properties-entry"
								key={Entry.index}
							>
								<p className="record-entry__index">
									{Entry.index}
								</p>
								<h3 className="record-entry__name">
									{Entry.name}
								</h3>
								<p className="record-entry__body">
									{Entry.body}
								</p>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export { Features as DynamicFeatures };

export default Features;
