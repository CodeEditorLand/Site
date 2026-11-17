import { FieldRecordEvidence } from "../Brand/FieldRecordEvidence.js";

import { FieldRecordSeal } from "../Brand/FieldRecordSeal.js";

import { FieldRecordStatus } from "../Brand/FieldRecordStatus.js";

import { RouteText, StampText } from "../Brand/SemanticLedger.js";

import { Badge } from "../UI/Badge.js";

import { cn } from "../UI/Utility";

import { HeroBandDefault } from "./Hero/Data.js";

import type Property from "./Interface/Property/Hero.js";

/**
 * DynamicHeroSection - the homepage hero, as one band.
 *
 * The band says four things, in this order, and nothing else:
 *
 *   1. THE CLAIM     `# LAND_01` and the runtime assertion - `〈RUST + TAURI〉`
 *                    and `〈NO ELECTRON〉` on one line at `--type-display`, then
 *                    the compatibility route and the record's own subject,
 *                    `LAND: EDITOR WITHOUT CHROMIUM`. The band's one expressive
 *                    moment, and the page's only `h1`.
 *   2. THE STATUS    `STATUS: SOURCE ACTIVE`, plus what is still missing:
 *                    installers and extension coverage. At `--type-meta`, on the
 *                    `.emphasis-standard` tier - a chip row, not a shout.
 *   3. THE EVIDENCE  What runs today: the four-element rail (Mountain → Cocoon →
 *                    Sky → Wind), the record's own facts as a ledger, and the
 *                    evidence plate with its caption and provenance.
 *   4. THE ENTRY     Two destinations that exist: `/Doc` and `/Download`.
 *
 * What the band does not do, and why:
 *
 * - It reserves no blank zone. The area between the claim and the entry carries
 *   the evidence; air there is the defect this band replaces.
 * - It is not a click target. The old section was `role="button"` and sent the
 *   whole band - image included - to one destination, which hid the two real
 *   destinations behind a single guessed one. The two anchors are the only
 *   actions, and each says where it goes.
 * - It does not animate. The floating technology cards and their noise drift
 *   belonged to the blank zone they filled. Their subjects survive: four are the
 *   rail's steps, and the architecture band that now follows the hero carries
 *   every element at length.
 *
 * The evidence is rendered through the Record blocks' published class API
 * (`record-stage`, `record-ledger`, `record-figure`) rather than by mounting the
 * blocks: those are `.astro` components and an `.astro` component cannot be
 * imported from a `.tsx` island (BRIDGE §2.1) - and this band must stay a
 * `.tsx` island, because it is the child of the page's first `ErrorBoundary`
 * and a boundary cannot catch an error in a separate island root. The class
 * names, and therefore every declaration behind them, are the blocks' own; this
 * file adds none of them.
 */
const DynamicHeroSection = ({ Content, Band, ClassName }: Property) => {
	const Hero = Band ?? HeroBandDefault();

	/** The page's own primary action, when it sets one. */
	const Primary = Content.PrimaryCTA?.Href;

	const Entry = Hero.entry.map((Destination) =>
		Destination.primary && Primary
			? { ...Destination, href: Primary }
			: Destination,
	);

	return (
		<section
			id="hero"
			aria-labelledby="hero-marker hero-claim"
			className={cn("band band--flush hero-band", ClassName)}
		>
			<div className="band-inner hero-band__inner">
				{/* ─── 1. THE CLAIM ─────────────────────────────────────────── */}
				<header className="hero-band__claim">
					<div className="hero-band__mark">
						<p
							id="hero-marker"
							className="section-kicker hero-band__kicker"
						>
							{Hero.claim.kicker}
						</p>

						<FieldRecordSeal
							element="Land"
							size={48}
							className="hero-band__seal"
						/>
					</div>

					<h1
						id="hero-claim"
						className="type-display hero-band__display"
					>
						<StampText Line={Hero.claim.runtime} />{" "}
						<StampText Line={Hero.claim.engine} />
					</h1>

					<p className="type-sub hero-band__route">
						<RouteText Line={Hero.claim.route} />{" "}
						<span className="hero-band__compat">
							{Hero.claim.compat}
						</span>
					</p>

					<p className="type-body hero-band__standfirst">
						<span className="hero-band__relation">
							{Hero.claim.project} {Hero.claim.relation}
						</span>{" "}
						{Content.Subtitle || Hero.claim.standfirst}
					</p>
				</header>

				{/* ─── 2. THE STATUS ────────────────────────────────────────── */}
				<div className="emphasis-standard hero-band__status">
					<FieldRecordStatus
						status="active"
						copy={Hero.status.copy}
						className="hero-band__status-line"
					/>

					{Hero.status.chips.map((Chip) => (
						<Badge
							variant="outline"
							className="hero-band__chip"
							key={Chip}
						>
							{Chip}
						</Badge>
					))}
				</div>

				{/* ─── 3. THE EVIDENCE ──────────────────────────────────────── */}
				<div className="hero-band__evidence">
					<div className="hero-band__proof">
						<ol className="record-stage record-stage--stack hero-band__stage">
							{Hero.steps.map((Step) => (
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

						<dl className="record-ledger record-ledger--1 hero-band__facts">
							{Hero.facts.map((Fact) => (
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

					<figure className="record-figure hero-band__plate">
						<div className="record-figure__media hero-band__plate-frame">
							<FieldRecordEvidence
								src={Hero.plate.src}
								alt={Hero.plate.alt}
								position="center"
								className="hero-band__plate-image"
							/>
						</div>

						<figcaption className="record-figure__caption">
							<span className="record-figure__caption-text">
								{Hero.plate.caption}
							</span>

							<span className="record-figure__provenance">
								{Hero.plate.provenance}
							</span>
						</figcaption>
					</figure>
				</div>

				{/* ─── 4. THE ENTRY ─────────────────────────────────────────── */}
				<div className="hero-band__entry">
					<p className="hero-band__program">{Hero.program}</p>

					<div className="hero-band__destinations">
						{Entry.map((Destination) => (
							<a
								className="hero-band__destination"
								href={Destination.href}
								key={Destination.href}
							>
								{Destination.label}
							</a>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export { DynamicHeroSection };

export default DynamicHeroSection;
