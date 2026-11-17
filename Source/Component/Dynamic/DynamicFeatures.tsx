import type { CSSProperties } from "react";

import { useTranslation } from "react-i18next";

import type Content from "../Interface/Content/Feature.js";

import type { HeroBand } from "./Hero/Type.js";

import { HeroBandDefault } from "./Hero/Data.js";

import { JellyCardFill } from "./Interface/Card/Jelly.js";

import {
	ClaimsOf,
	EntriesOf,
	FiledLabel,
	FiledOf,
	Heading,
	Kicker,
	ObservationLabel,
	RailLabel,
} from "./Properties/Data.js";

/**
 * `# OBSERVATION_01` - the proof band: what the record observes, and what backs
 * it.
 *
 * This is the second layer of the homepage
 * (`DesignSystem-Grammar.md` §8: "trust/proof = three source-backed claims, one
 * editor screenshot or architecture proof"). It carries exactly three things
 * and no fourth:
 *
 * 1. **Three source-backed claims.** The six properties' own titles and
 *    paragraphs - the copy this band exists for - of which the first three, in
 *    the content's own order, are the claims the layer is allowed. Each sits on
 *    a `jelly-card` filled with its element's own semantic tint
 *    (`ElementOrder`), so the six cards keep the per-element identity they had
 *    before the band was rebuilt.
 * 2. **One architecture proof.** The four-element runtime path the hero's claim
 *    asserts - Mountain → Cocoon → Sky → Wind - one line per element. It is the
 *    "architecture proof" arm of the budget's "one editor screenshot or
 *    architecture proof", and it is printed as a `record-stage`, the block
 *    layer's own ordered rail.
 * 3. **The specimen observation.** `SPECIES` / `TEMP` / `WIND`, the second
 *    metadata block the field record has always printed beside its facts. The
 *    hero card carries three rows (`DESIGN.md` §3.1), so the observation is
 *    printed here, in the band that is an observation.
 *
 * The remaining three properties are **filed, not dropped**: `FiledOf` returns
 * them and the strip prints their titles against the documentation page that
 * argues each one at length (`Properties/Data.ts` `DocOf`). A band that printed
 * all six would be six claims where the layer allows three; a band that dropped
 * three would lose facts. The strip is the third option the density budget
 * names.
 *
 * The markup is the Record layer's published class API rather than the `.astro`
 * blocks: this component is a child of the page's `ErrorBoundary` inside
 * `HomePage.tsx`, and an `.astro` component cannot be imported from a `.tsx`
 * file (BRIDGE §2.1).
 *
 * The band is printed, not driven: no state, no effect, no handler.
 */
interface Props {
	readonly Content: Content;

	/**
	 * The resolved record band. The rail and the observation are the record's
	 * own rows (`Hero/Data.ts`), so they travel with the record rather than
	 * being restated here. Optional so a caller that hands only `Content` still
	 * renders the band's real proof.
	 */
	readonly Band?: HeroBand;

	/**
	 * The page's own plain-language explanation, when it sets one
	 * (`Content.Subtitle` on the hero). It takes the place of the record's
	 * default sentence; the hero card has no standfirst slot to print it in
	 * (`DESIGN.md` §3.1), so it opens this band instead.
	 */
	readonly Explanation?: string;

	readonly ClassName?: string;
}

/** The one heading id the band's `aria-labelledby` points at. */
const HeadingId = "FeaturesHeading";

/**
 * The element each claim is about, in the properties' own order:
 *   performance    -> Mountain (native backend)
 *   compatibility  -> Cocoon (extension host)
 *   architecture   -> Wind (workbench shell)
 *   cross-platform -> Sky (UI layer)
 *   tooling        -> Air (background services)
 *   opensource     -> Echo (scheduler primitives)
 *
 * Only the Jelly surface reads it: `JellyCardFill` resolves an element name
 * case-insensitively over the element set, so each claim's card keeps the
 * semantic tint that element has everywhere else on the site. The pairing is
 * positional because the six properties are a set with no names of their own -
 * the same reason `EntriesOf` derives the marker from the position.
 */
const ElementOrder = [
	"Mountain",
	"Cocoon",
	"Wind",
	"Sky",
	"Air",
	"Echo",
] as const;

const Features = ({ Content, Band, Explanation, ClassName }: Props) => {
	const { t: T } = useTranslation(["home", "common"]);

	const { Subtitle, Feature } = Content;

	const HeadingText = T("home:features.heading", { defaultValue: Heading });

	const Record = Band ?? HeroBandDefault();

	const Entries = EntriesOf(Feature ?? []);

	const Claims = ClaimsOf(Entries);

	const Filed = FiledOf(Entries);

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

				{/*
				 * The record's plain-language explanation, moved out of the hero
				 * card: `DesignSystem-Pages.md` §1 puts the product explanation
				 * "in the document structure", and the hero's two-panel card has
				 * no standfirst slot. Same sentence, one layer down.
				 */}
				<p className="record-band__standfirst">
					{Explanation || Record.claim.standfirst}
				</p>

				<div className="record-band__body">
					<div className="properties-grid">
						{Claims.map((Entry, Index) => (
							<jelly-card
								key={Entry.index}
								style={
									{
										"--jelly-fill": JellyCardFill(
											ElementOrder[
												Index % ElementOrder.length
											],
										),
										"--jelly-radius": "0",
										"--jelly-color-border-default":
											"var(--Border)",
										"--jelly-card-padding-block": "0",
										"--jelly-card-padding-inline": "0",
										"--jelly-card-font-size": "inherit",
									} as CSSProperties
								}
							>
								<article className="record-entry properties-entry">
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
							</jelly-card>
						))}
					</div>

					{/* ─── THE ONE ARCHITECTURE PROOF ──────────────────── */}
					<div
						className="grid grid-cols-1 gap-8 md:grid-cols-2"
						style={{
							marginBlockStart: "var(--space-group)",
						}}
					>
						<div>
							<p className="type-meta m-0 mb-3">{RailLabel}</p>

							<ol className="record-stage record-stage--stack">
								{Record.steps.map((Step) => (
									<li
										className="record-stage__item"
										key={Step.index}
									>
										<span className="record-stage__index">
											{Step.index}
										</span>

										<span className="record-stage__label">
											{Step.label}
										</span>

										<span className="record-stage__line">
											{Step.line}
										</span>
									</li>
								))}
							</ol>
						</div>

						{/* ─── THE SPECIMEN OBSERVATION ────────────────── */}
						<div>
							<p className="type-meta m-0 mb-3">
								{ObservationLabel}
							</p>

							<dl className="record-ledger record-ledger--1 m-0">
								{Record.observation.map((Fact) => (
									<div
										className="record-ledger__row"
										key={Fact.key}
									>
										<dt className="record-ledger__key">
											{Fact.key}
										</dt>

										<dd className="record-ledger__value">
											{Fact.value}
										</dd>
									</div>
								))}
							</dl>
						</div>
					</div>

					{/* ─── THE FILED INDEX ─────────────────────────────── */}
					{Filed.length > 0 ? (
						<nav
							aria-label={FiledLabel}
							className="record-band__index"
							style={{
								marginBlockStart: "var(--space-group)",
							}}
						>
							<p className="type-meta m-0 mb-3">{FiledLabel}</p>

							{Filed.map((Entry) =>
								Entry.href ? (
									<a
										className="record-band__index-item"
										href={Entry.href}
										key={Entry.id}
									>
										{Entry.name}
									</a>
								) : (
									<span
										className="record-band__index-item"
										key={Entry.id}
									>
										{Entry.name}
									</span>
								),
							)}
						</nav>
					) : null}
				</div>
			</div>
		</section>
	);
};

export { Features as DynamicFeatures };

export default Features;
