import type { CSSProperties } from "react";

import type Content from "./Interface/Content/Pricing.js";

import { Badge } from "../UI/Badge.js";

import { FieldRecordStatus } from "../Brand/FieldRecordStatus.js";

import { HeroBandDefault } from "./Hero/Data.js";

import type { HeroBand } from "./Hero/Type.js";

import {
	Kicker,
	ManifestLabel,
	ManifestNote,
	PhasesOf,
	StandfirstOf,
} from "./Roadmap/Data.js";

import type { Phase } from "./Roadmap/Type.js";

/**
 * `# CONDITIONS_01` - the release state: one manifest, printed in the two states
 * the offer has.
 *
 * The band is called Pricing in the tree and Roadmap on the page, and the
 * difference was the defect: a tier list is a comparison between things a
 * reader can buy, and there is nothing here to buy. Land is CC0, and the
 * content's own `Price` field says `{ Monthly: 0, Yearly: 0 }` on both tiers -
 * a price of nothing is not a price, it is a grammar with no referent. So the
 * pricing machinery is gone: no price, no currency, no monthly/yearly toggle,
 * no "Most Popular" badge, no highlighted tier.
 *
 * `DesignSystem-Grammar.md` §8 gives this layer **one manifest/table**, so what
 * the two tiers actually are - two states of the same free offer, `ACTIVE NOW`
 * and `V1.0` - is printed as one artifact: one `jelly-card`, one header row
 * carrying the record's status and the three qualifiers that say what is still
 * missing, and the two states as the manifest's two columns. Two cards would
 * have been two records where the budget allows one; a single comparison table
 * was rejected by `Roadmap/Data.ts` for a reason that still holds - the two
 * states do not share a row axis, because they speak to different capabilities.
 *
 * The ledger rows are the content's own: the six element strings, split at
 * their line breaks into name, role and detail, and the six capability
 * sentences, each under the label the page's manifest already gave it. Both
 * halves of every fact survive - the label and the sentence - where the old
 * band printed only the condensed half.
 *
 * The three status qualifiers in the header row (`PRE-RELEASE`,
 * `INSTALLERS PENDING`, `EXTENSION COVERAGE IN PROGRESS`) are the hero record's
 * own status chips, moved here by the density budget: the hero carries one
 * field record, one evidence image and one action, and a status that says what
 * is *missing* belongs to the layer that states the release conditions.
 *
 * The markup is the Record layer's published class API (`record-band`,
 * `record-ledger`) rather than the `.astro` blocks: this component is a child
 * of the page's `ErrorBoundary` inside `HomePage.tsx`, and an `.astro`
 * component cannot be imported from a `.tsx` file (BRIDGE §2.1).
 *
 * Nothing here hydrates and nothing here is interactive: the band is a printed
 * manifest, so it ships no state, no effect and no handler.
 */
interface Props {
	readonly Content: Content;

	/** The page record, whose status line and qualifiers the manifest prints. */
	readonly Band?: HeroBand;

	readonly ClassName?: string;
}

/** The one heading id the band's `aria-labelledby` points at. */
const HeadingId = "RoadmapHeading";

/** The manifest surface: white, flat, one inset. */
const ManifestInk = {
	"--jelly-fill": "var(--Card)",
	"--jelly-radius": "0",
	"--jelly-color-border-default": "var(--Border)",
	"--jelly-card-padding-block": "0",
	"--jelly-card-padding-inline": "0",
	"--jelly-card-font-size": "inherit",
} as CSSProperties;

/**
 * One state of the manifest: its marker and name, its own paragraph, its
 * standing as labelled facts, then the ledger of what it contains.
 *
 * The facts are chips rather than rows because they are one line of labels -
 * `PHASE: ACTIVE SOURCE`, `STATUS: ACTIVE`, `TARGET: ...`, `SIGNAL: ...` - and a
 * ledger row per label would spend four rows saying what four chips say in one
 * line. The label stays attached to its value inside the chip, so nothing is
 * lost by the compression.
 */
const StateBlock = ({ Phase }: { readonly Phase: Phase }) => (
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

const Roadmap = ({ Content, Band, ClassName }: Props) => {
	const { Title, Subtitle, Tier } = Content;

	const Record = Band ?? HeroBandDefault();

	const Standfirst = StandfirstOf(Subtitle);

	const Phases = PhasesOf(Tier ?? []);

	return (
		<section
			id="roadmap"
			aria-labelledby={HeadingId}
			className={`record-band record-band--canvas ${ClassName ?? ""}`.trim()}
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
					<jelly-card style={ManifestInk}>
						{/* ─── THE MANIFEST'S HEADER ROW ───────────────── */}
						<div
							className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3"
							style={{
								padding: "1.5rem",

								borderBlockEnd: "1px solid var(--Border)",
							}}
						>
							<div className="flex flex-wrap items-baseline gap-4">
								<p className="type-meta m-0">{ManifestLabel}</p>

								<FieldRecordStatus
									status="active"
									copy={Record.status.copy}
								/>
							</div>

							<div className="flex flex-wrap items-baseline gap-2">
								{Record.status.chips.map((Chip) => (
									<Badge
										key={Chip}
										variant="outline"
										className="type-meta"
									>
										{Chip}
									</Badge>
								))}
							</div>
						</div>

						<p
							className="type-meta m-0"
							style={{
								padding: "0.75rem 1.5rem",

								color: "var(--MuteForeground)",

								borderBlockEnd: "1px solid var(--Border)",
							}}
						>
							{ManifestNote}
						</p>

						{/* ─── THE TWO STATES ──────────────────────────── */}
						<div
							className="roadmap-phases"
							style={{ padding: "1.5rem" }}
						>
							{Phases.map((Phase) => (
								<StateBlock key={Phase.marker} Phase={Phase} />
							))}
						</div>
					</jelly-card>
				</div>
			</div>
		</section>
	);
};

export { Roadmap as DynamicPricing };

export default Roadmap;
