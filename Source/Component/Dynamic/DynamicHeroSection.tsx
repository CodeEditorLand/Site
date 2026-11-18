import type { CSSProperties, ReactNode } from "react";

import { CORNER_GEOMETRY } from "../Brand/CornerMarks/Data.js";

import { FieldRecordEvidence } from "../Brand/FieldRecordEvidence.js";

import { FieldRecordSeal } from "../Brand/FieldRecordSeal.js";

import { FieldRecordStatus } from "../Brand/FieldRecordStatus.js";

import { RouteText, StampText } from "../Brand/SemanticLedger.js";

import { cn } from "../UI/Utility";

import {
	Box,
	Cpu,
	Globe,
	Layers3,
	Network,
	Puzzle,
	Server,
	Zap,
} from "lucide-react";

import { StackLabel, StackTiles } from "../../Content/Home/Stack.js";

import { HeroBandDefault } from "./Hero/Data.js";

import type Property from "./Interface/Property/Hero.js";

/**
 * DynamicHeroSection - the homepage hero: the canonical **two-panel artifact**.
 *
 * `DesignSystem-Pages.md` §1, `DesignSystem-Components.md` §1 "Two-panel
 * composition rules" and `DESIGN.md` §3.1 describe one shape, and this file
 * renders it:
 *
 *   ┌────────────────────────────┬──────────────────────────────┐
 *   │ FIELD RECORD (warm-white)  │ EVIDENCE (full-bleed, text-  │
 *   │  # LAND_01          [SEAL] │ free image, object-fit:cover) │
 *   │  〈RUST + TAURI〉          │                              │
 *   │  〈NO ELECTRON〉           │                              │
 *   │  /COMPAT: VS CODE          │                              │
 *   │  EXTENSIONS / UNMODIFIED   │                              │
 *   │  NATIVE␁OPEN␁CROSS-PLATFORM │                              │
 *   │  STATUS: SOURCE ACTIVE     │                              │
 *   │  [MAJOR BLANK BAND 15-25%] │                              │
 *   │  LAND:                     │                              │
 *   │  ↳EDITOR WITHOUT CHROMIUM  │                              │
 *   │  TARGET / LICENSE / SIGNAL │                              │
 *   │  [BUILD FROM SOURCE] /READ │                              │
 *   └────────────────────────────┴──────────────────────────────┘
 *
 * What each panel carries, and why the split is not decoration:
 *
 * 1. **The record panel** is the engineering: the index, the runtime claim, the
 *    compatibility route, the program line, the release status, the blank band,
 *    the subject, and the three metadata rows that say what the record is. One
 *    left alignment line, one seal, one action. It is the half a reader
 *    *reads*.
 * 2. **The evidence panel** is the living counterweight: one image, full height,
 *    `object-fit: cover`, with no text on it - `FieldRecordEvidence` "rejects
 *    text overlays" because a picture with a caption over it is a poster, not
 *    evidence. The caption and the provenance sit *below* the frame, where the
 *    `RecordFigure` contract puts them, so the image stays text-free and the
 *    claim of what it is evidence *of* still survives.
 *
 * The geometry is the documents', not this file's invention, and it lives in
 * `Stylesheet/System/Component/Dynamic/_Hero.scss` - this file names classes and
 * writes no style. `design_system.md`'s ratio blueprint sizes the pair: a
 * three-track grid, `49fr 1px 51fr`, so the record panel measures 48.95-48.97% and
 * the evidence panel 50.94-50.97% of the pair with the 1px hairline between them;
 * the pair is `80dvh` tall, padded `clamp(2rem, 5vw, 5rem)`, and the card is inset
 * `2.75rem` block / `1.5rem` inline. The blueprint's separate 1.8-2.3% panel gap
 * is not applied - its own panel ranges already sum past 100% with a gap between
 * them, so the ratio and the hairline win. The 15-25% blank band is `flex-grow`
 * over a floor of `--space-blank` - the token exists for exactly this band.
 *
 * On mobile the stack is card first, evidence second: the record arrives before
 * the evidence (`DesignSystem-Components.md` §1).
 *
 * What left this band, and where it went - the density budget
 * (`DesignSystem-Grammar.md` §8) allows the hero one field record, one evidence
 * image and one primary action, and nothing else:
 *
 * - the standfirst paragraph  -> `DynamicFeatures`, the `# OBSERVATION_01`
 *   band's opening (the plain-language explanation belongs to the document
 *   structure, `DesignSystem-Pages.md` §1);
 * - the three status chips    -> `DynamicPricing`, the `# CONDITIONS_01`
 *   manifest's status strip;
 * - `SPECIES` / `TEMP` / `WIND` -> `FeatureBand`, the `#features` band that
 *   succeeded the `# OBSERVATION_01` layer, as its filed specimen ledger
 *   (`Hero/Type.ts` `Metadata.observation`). The card keeps three rows; a
 *   fourth block in it would break `DesignSystem-Components.md` §1's
 *   `TARGET / LICENSE / SIGNAL` template and its four-row cap.
 *
 * The four-element rail is the one that came back, and it is restored where the
 * evidence is: Mountain → Cocoon → Sky → Wind is the hero's ordered process, so
 * it is printed as the evidence plate's `RecordStage` (`DESIGN-COMPLETE.md`
 * §5.2 row 3), above the plate and never on it. `FeatureBand` still prints its
 * own copy of the same four steps in the `#features` band; that duplication is
 * reported rather than removed, because removing a band's treatment is not this
 * file's decision to take.
 *
 * Every one of those is a move, not a deletion: the strings are the same
 * strings, printed by the band whose layer owns them.
 *
 * This stays a `.tsx` island because the page's `h1` and its record are one
 * artifact and an `.astro` block cannot be imported from a `.tsx` file: the
 * `Record*` blocks this record's ledger and evidence mount are `.astro`, and
 * splitting the hero across two files would split the two-panel pair the person
 * endorsed. The blocks therefore arrive as slots - `slot="ledger"` and
 * `slot="stage"` - which Astro renders to HTML and hands this component as
 * props (the React renderer's own slot bridge). The route carries the imports;
 * this file places them. `FeatureBand` mounts the two blocks the hero's card
 * cannot hold.
 */

/** The card's frame ink: the record panel is a warm-white Jelly surface. */
const CardInk = {
	"--jelly-fill": "var(--Card)",
	"--jelly-radius": "0",
	"--jelly-color-border-default": "var(--Border)",
	"--jelly-card-padding-block": "0",
	"--jelly-card-padding-inline": "0",
	"--jelly-card-font-size": "inherit",
	"--jelly-label": "var(--CardForeground)",
} as CSSProperties;

/**
 * The action's Jelly ink.
 *
 * The same five properties `FieldRecordAction/Data.ts` hands the button arm.
 * They are repeated as a mapping rather than imported because that constant is
 * a *serialized CSS string* - the form an `.astro` element's `style` attribute
 * takes - and React needs a property map.
 */
const ActionInk = {
	"--jelly-button-radius": "var(--RadiusButton)",
	"--jelly-button-height": "44px",
	"--jelly-button-padding-inline": "2.6rem",
	"--jelly-button-min-width": "0px",
	"--jelly-color-background-accent": "var(--Foreground)",
	"--jelly-color-foreground-on-accent": "var(--Background)",
} as CSSProperties;

/** The four corners, in the order `CornerMarks` prints them. */
const CORNERS = ["tl", "tr", "bl", "br"] as const;

type Corner = (typeof CORNERS)[number];

/**
 * Where a corner anchors its two arms. The values are `CornerMarks/Data.ts`'s
 * own anchors, restated as the two style objects React needs; the *numbers*
 * (inset, arm length, thickness, stem, ink, opacity) are read from that module,
 * so the frame cannot drift from the block's.
 */
const ANCHOR: Record<
	Corner,
	{
		readonly block: "top" | "bottom";
		readonly inline: "left" | "right";
		readonly originH: string;
		readonly originV: string;
	}
> = {
	tl: { block: "top", inline: "left", originH: "0 50%", originV: "50% 0" },

	tr: {
		block: "top",
		inline: "right",
		originH: "100% 50%",
		originV: "50% 0",
	},

	bl: {
		block: "bottom",
		inline: "left",
		originH: "0 50%",
		originV: "50% 100%",
	},

	br: {
		block: "bottom",
		inline: "right",
		originH: "100% 50%",
		originV: "50% 100%",
	},
};

/** One tick's box: its anchored edge, its arm span, and its slide origin. */
const TickStyle = (Corner: Corner, Axis: "h" | "v"): CSSProperties => {
	const Anchor = ANCHOR[Corner];

	const Inset = `${CORNER_GEOMETRY.Inset}px`;

	return {
		position: "absolute",

		backgroundColor: CORNER_GEOMETRY.Color,

		opacity: CORNER_GEOMETRY.Opacity,

		top: Anchor.block === "top" ? Inset : undefined,

		bottom: Anchor.block === "bottom" ? Inset : undefined,

		left: Anchor.inline === "left" ? Inset : undefined,

		right: Anchor.inline === "right" ? Inset : undefined,

		width:
			Axis === "h"
				? `${CORNER_GEOMETRY.Horizontal}px`
				: `${CORNER_GEOMETRY.StemWidth}px`,

		height:
			Axis === "h"
				? `${CORNER_GEOMETRY.Thickness}px`
				: `${CORNER_GEOMETRY.Vertical}px`,

		transformOrigin: Axis === "h" ? Anchor.originH : Anchor.originV,
	};
};

/** The eight ticks: per corner the horizontal arm first, then the vertical. */
const FRAME = CORNERS.flatMap((Corner) =>
	(["h", "v"] as const).map((Axis) => ({
		corner: Corner,

		axis: Axis,

		style: TickStyle(Corner, Axis),
	})),
);

/** The record panel's picture-frame crosshairs (C19). */
const CornerFrame = () => (
	<div
		aria-hidden="true"
		className="CornerMarks pointer-events-none absolute inset-0"
	>
		{FRAME.map((Tick) => (
			<span
				className="CornerMarkTick"
				data-corner={Tick.corner}
				data-axis={Tick.axis}
				key={`${Tick.corner}-${Tick.axis}`}
				style={Tick.style}
			/>
		))}
	</div>
);

/**
 * The two blocks the hero composes but cannot import.
 *
 * `RecordLedger` and `RecordStage` are `.astro` components, and an `.astro`
 * component cannot be imported from a `.tsx` island (BRIDGE §2.1). The route
 * therefore renders them and hands them over as slots; Astro renders a
 * `slot="ledger"` / `slot="stage"` child to HTML and passes the framework
 * component that HTML as a prop, which is the bridge this file places them
 * through. `Type.ts` carries no shape for a React child, so the two props are
 * declared here as the local type `DESIGN.md` §4.2 asks for rather than forced
 * into the shared prop interface another page already imports.
 */
type HeroSlots = {
	/** The record's facts, mounted as `RecordLedger` by the route. */
	readonly ledger?: ReactNode;

	/** The runtime path, mounted as `RecordStage` by the route. */
	readonly stage?: ReactNode;
};

const DynamicHeroSection = ({
	Content,
	Band,
	ClassName,
	ledger,
	stage,
}: Property & HeroSlots) => {
	const Hero = Band ?? HeroBandDefault();

	/** The page's own primary action, when it sets one. */
	const Primary = Content.PrimaryCTA?.Href;

	const Entry = Hero.entry.map((Destination) =>
		Destination.primary && Primary
			? { ...Destination, href: Primary }
			: Destination,
	);

	/**
	 * The record offers one primary action (`DesignSystem-Grammar.md` §8) and
	 * any further destination as a route line. Exactly one entry is marked
	 * primary; the rest keep the `/LABEL` voice and read as routes, which is
	 * what the field-record grammar has for a secondary destination.
	 *
	 * `at(0)` rather than `[0]` so a band handed no entries at all renders no
	 * action instead of throwing on an undefined one.
	 */
	const Action =
		Entry.find((Destination) => Destination.primary) ?? Entry.at(0);

	const Routes = Entry.filter((Destination) => Destination !== Action);

	return (
		<section
			id="hero"
			aria-labelledby="hero-marker hero-claim"
			className={cn("hero-band", ClassName)}
		>
			<div className="hero-band__pair">
				{/* ══ PANEL 1 - THE FIELD RECORD ═════════════════════════════ */}
				<div className="hero-band__record">
					<jelly-card className="hero-band__card" style={CardInk}>
						<div className="CornerMarkShell hero-band__inset">
							<CornerFrame />

							{/* 1. Index left, one seal upper-right. */}
							<div className="hero-band__mark">
								<p
									id="hero-marker"
									className="section-kicker hero-band__kicker"
								>
									{Hero.claim.kicker}
								</p>

								<FieldRecordSeal element="Land" size={48} />
							</div>

							{/* 2-3. The oversized runtime claim, then what it is not. */}
							<h1
								id="hero-claim"
								className="type-display hero-band__claim"
							>
								<StampText Line={Hero.claim.runtime} />
							</h1>

							<p className="type-section hero-band__engine">
								<StampText Line={Hero.claim.engine} />
							</p>

							{/* 4-5. The compatibility route and what it means. */}
							<p className="type-section hero-band__route">
								<RouteText Line={Hero.claim.route} />
							</p>

							<p className="type-meta hero-band__compat">
								{Hero.claim.compat}
							</p>

							{/* 6. The program line, em-quad separated. */}
							<p className="type-meta hero-band__program">
								{Hero.program}
							</p>

							{/* 7. The release state. */}
							<div className="hero-band__status">
								<FieldRecordStatus
									status="active"
									copy={Hero.status.copy}
								/>
							</div>

							{/*
							 * 8. THE BLANK INTERVAL. `aria-hidden`, because it
							 * is a reserved region rather than content: it
							 * grows into the 15-25% of the card the system
							 * requires and never shrinks below
							 * `--space-blank` - "delete, don't shrink".
							 */}
							<div
								aria-hidden="true"
								className="hero-band__blank"
							/>

							{/* 9-10. The subject, and its one-line proposition. */}
							<p className="type-section hero-band__subject">
								{Hero.claim.project}
							</p>

							<p className="type-meta hero-band__relation">
								<span aria-hidden="true">↳</span>
								{Hero.claim.relation}
							</p>

							{/*
							 * 11. The record's three metadata rows, mounted as
							 * `RecordLedger` by the route (`slot="ledger"`):
							 * the block is `.astro` and this island is `.tsx`,
							 * so the page imports it and this file places it.
							 * The labels arrive with their colons - `TARGET:`,
							 * `LICENSE:`, `SIGNAL:` - because `Hero/Data.ts`
							 * prints the colon as grammar.
							 *
							 * The fallback below renders the same rows from
							 * `Hero.facts` for a render that hands no slot (the
							 * unit test, or a page that passes none); the route
							 * always passes the block, so the live page never
							 * prints this copy.
							 */}
							{ledger ?? (
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
							)}

							{/* 12. One action, and the routes beside it. */}
							<div className="hero-band__action">
								{Action ? (
									<a
										className="inline-block"
										href={Action.href}
										{...(Action.href.startsWith("http")
											? {
													target: "_blank",

													rel: "noopener noreferrer",
												}
											: {})}
									>
										<jelly-button squish style={ActionInk}>
											<span className="hero-band__action-label">
												{Action.label}
											</span>
										</jelly-button>
									</a>
								) : null}

								{Routes.map((Destination) => (
									<a
										className="type-meta hero-band__destination"
										href={Destination.href}
										key={Destination.href}
									>
										{Destination.label}
									</a>
								))}
							</div>
						</div>
					</jelly-card>
				</div>

				{/* ══ THE HAIRLINE GUTTER ════════════════════════════════════ */}
				<div aria-hidden="true" className="hero-band__gutter" />

				{/* ══ PANEL 2 - THE EVIDENCE ═════════════════════════════════ */}
				<figure className="hero-band__evidence">
					{/*
					 * The plate's proof: the hero's ordered process, mounted
					 * as `RecordStage` by the route (`slot="stage"`) - the
					 * four-element runtime path the claim above asserts,
					 * printed as a Signal Trace. It sits ABOVE the plate and
					 * never on it: the image stays text-free, which is what
					 * makes it evidence rather than a poster.
					 */}
					{stage}

					<FieldRecordEvidence
						alt={Hero.plate.alt}
						className="hero-band__plate"
						position="right"
						src={Hero.plate.src}
					/>

					<figcaption className="type-meta hero-band__caption">
						<span>{Hero.plate.caption}</span>

						<span>{Hero.plate.provenance}</span>
					</figcaption>
				</figure>
			</div>

			{/* ══ THE TECH-STACK STRIP ═══════════════════════════════════ */}
			<div className="hero-band__stack">
				<p className="hero-band__stack-label">{StackLabel}</p>

				<div aria-hidden="true" className="hero-band__stack-grid">
					{StackTiles.map((Tile) => {
						const Glyph =
							StackGlyphs[Tile.Icon as keyof typeof StackGlyphs] ??
							Cpu;

						return (
							<div
								className="hero-band__stack-tile"
								key={Tile.Name}
							>
								<div className="hero-band__stack-inner">
									<Glyph
										aria-hidden="true"
										className="hero-band__stack-icon"
										size={20}
										strokeWidth={1.5}
										style={{ color: Tile.Ink }}
									/>

									<span className="hero-band__stack-name">
										{Tile.Name}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

/** The eight tile glyphs, by the name the strip's data carries. */
const StackGlyphs = {
	Box,
	Cpu,
	Globe,
	Layers3,
	Network,
	Puzzle,
	Server,
	Zap,
} as const;

export { DynamicHeroSection };

export default DynamicHeroSection;
