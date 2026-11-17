import type Content from "../Interface/Content/Pricing.js";

import { Kicker, PhasesOf, StandfirstOf } from "./Roadmap/Data.js";

import type { Phase } from "./Roadmap/Type.js";

/**
 * The roadmap - one offer, printed in its two states.
 *
 * The band is called Pricing in the tree and Roadmap on the page, and the
 * difference was the defect: a tier list is a comparison between things a
 * reader can buy, and there is nothing here to buy. Land is CC0, and the
 * content's own `Price` field says `{ Monthly: 0, Yearly: 0 }` on both tiers -
 * a price of nothing is not a price, it is a grammar with no referent. So the
 * pricing machinery is gone: no price, no currency, no monthly/yearly toggle,
 * no "Most Popular" badge, no highlighted tier. What is left is what the two
 * tiers actually are - two states of the same free offer, `ACTIVE NOW` and
 * `V1.0` - and each one prints as a ledger of what it contains.
 *
 * The ledger rows are the content's own: the six element strings, split at
 * their line breaks into name, role and detail, and the six capability
 * sentences, each under the label the page's manifest already gave it. Both
 * halves of every fact survive - the label and the sentence - where the old
 * band printed only the condensed half.
 *
 * The markup is the Record layer's published class API (`record-band`,
 * `record-ledger`) rather than the `.astro` blocks: this component is a child
 * of the page's `ErrorBoundary` inside `HomePage.tsx`, and an `.astro`
 * component cannot be imported from a `.tsx` file (BRIDGE §2.1).
 *
 * Nothing here hydrates and nothing here is interactive: the band is a printed
 * ledger, so it ships no state, no effect and no handler.
 */
interface Props {
	readonly Content: Content;

	readonly ClassName?: string;
}

/** The one heading id the band's `aria-labelledby` points at. */
const HeadingId = "RoadmapHeading";

/**
 * One phase: its marker and name, its own paragraph, its standing as labelled
 * facts, then the ledger of what it contains.
 *
 * The facts are chips rather than rows because they are one line of labels -
 * `PHASE: ACTIVE SOURCE`, `STATUS: ACTIVE`, `TARGET: ...`, `SIGNAL: ...` - and a
 * ledger row per label would spend four rows saying what four chips say in one
 * line. The label stays attached to its value inside the chip, so nothing is
 * lost by the compression.
 */
const PhaseBlock = ({ Phase }: { readonly Phase: Phase }) => (
	<div className="roadmap-phase">
		<div className="roadmap-phase__head">
			<p className="type-meta roadmap-phase__marker">{Phase.marker}</p>
			<h3 className="roadmap-phase__name">{Phase.name}</h3>
		</div>

		{Phase.body ? (
			<p className="type-body roadmap-phase__body">{Phase.body}</p>
		) : null}

		<ul className="roadmap-phase__facts">
			{Phase.facts.map((Fact) => (
				<li className="roadmap-phase__fact" key={Fact}>
					{Fact}
				</li>
			))}
		</ul>

		<dl className="record-ledger record-ledger--1">
			{Phase.rows.map((Row) => (
				<div className="record-ledger__row" key={Row.key}>
					<dt className="record-ledger__key">
						{Row.href ? (
							<a className="roadmap-phase__link" href={Row.href}>
								{Row.key}
							</a>
						) : (
							Row.key
						)}
					</dt>
					<dd className="record-ledger__value">
						{Row.value}
						{Row.note ? (
							<span className="record-ledger__note">
								{Row.note}
							</span>
						) : null}
					</dd>
				</div>
			))}
		</dl>

		{Phase.cta ? (
			<a className="roadmap-phase__cta" href={Phase.cta.href}>
				<span className="roadmap-phase__arrow" aria-hidden="true">
					→
				</span>{" "}
				{Phase.cta.label}
			</a>
		) : null}
	</div>
);

const Roadmap = ({ Content, ClassName }: Props) => {
	const { Title, Subtitle, Tier } = Content;

	const Standfirst = StandfirstOf(Subtitle);

	const Phases = PhasesOf(Tier ?? []);

	return (
		<section
			id="roadmap"
			aria-labelledby={HeadingId}
			className={`record-band record-band--paper ${ClassName ?? ""}`.trim()}
		>
			<div className="record-band__inner">
				<p className="record-band__kicker">{Kicker}</p>
				<h2 id={HeadingId} className="record-band__heading">
					{Title}
				</h2>
				{Standfirst.map((Paragraph) => (
					<p className="record-band__standfirst" key={Paragraph}>
						{Paragraph}
					</p>
				))}

				<div className="record-band__body">
					<div className="roadmap-phases">
						{Phases.map((Phase) => (
							<PhaseBlock key={Phase.marker} Phase={Phase} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export { Roadmap as DynamicPricing };

export default Roadmap;
