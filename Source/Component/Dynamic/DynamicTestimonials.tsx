import * as lucide from "lucide-react";

import { Fragment, useEffect, useRef } from "react";

import { RichText } from "../UI/RichText.js";

import { FieldRecordSeal } from "../Brand/FieldRecordSeal.js";

import { SpecimenLabel } from "../Brand/SpecimenLabel.js";

import type { FieldRecord } from "../../Content/Record/FieldRecord.js";

import { Air } from "../../Content/Record/Air.js";

import { Cocoon } from "../../Content/Record/Cocoon.js";

import { Common } from "../../Content/Record/Common.js";

import { Echo } from "../../Content/Record/Echo.js";

import { Grove } from "../../Content/Record/Grove.js";

import { Maintain } from "../../Content/Record/Maintain.js";

import { Mist } from "../../Content/Record/Mist.js";

import { Mountain } from "../../Content/Record/Mountain.js";

import { Output } from "../../Content/Record/Output.js";

import { Rest } from "../../Content/Record/Rest.js";

import { SideCar } from "../../Content/Record/SideCar.js";

import { Sky } from "../../Content/Record/Sky.js";

import { Vine } from "../../Content/Record/Vine.js";

import { Wind } from "../../Content/Record/Wind.js";

import { Worker } from "../../Content/Record/Worker.js";

import { JellyCardStyle, JellyBadgeStyle } from "./Interface/Card/Jelly.js";

import type Item from "./Interface/Item/Testimonial.js";

import type Property from "./Interface/Property/Testimonial.js";

/**
 * Architecture-element glyph: the official emoji per element, sourced from the
 * element README header table (Land/Element/<Name>/README.md line 1 - the
 * Readme-Element standard's "emoji cell", the project's visual identity) and
 * corroborated by the per-element doc pages (WebSite/Source/Content/doc/*.md)
 * and the HomePage Testimonial Emoji data. Falls back to the spec's neutral ◎
 * (U+25CE) functional symbol for unknown names (design_system.md §Functional
 * symbols - design_system.md assigns SVG seals, not emoji, to the 8 core
 * records; the official emoji placement lives in the element READMEs).
 */
const ElementGlyph = ({ Name }: { Name?: string }) => {
	const Key = (Name ?? "").toLowerCase();

	const Map: Record<string, string> = {
		mountain: "⛰️",

		cocoon: "🦋",

		wind: "🍃",

		sky: "🌌",

		air: "🪁",

		echo: "📣",

		grove: "🌳",

		vine: "🌿",

		rest: "⛱️",

		worker: "🍩",

		common: "🧑🏼‍🏭",

		maintain: "💪🏼",

		mist: "🌫️",

		output: "⚫",

		sidecar: "🚃",
	};

	const Glyph = Map[Key] ?? "◎";

	return (
		<span
			aria-hidden="true"
			className="ml-2 inline-block text-lg leading-none"
		>
			{Glyph}
		</span>
	);
};

// ── Quasi-random row ratios ────────────────────────────────────────────────

/**
 * Halton base-2 low-discrepancy sequence.
 * Deterministic, covers [0,1) evenly, never truly repeats a value.
 * Used instead of simplex noise here because it guarantees all ratio
 * buckets are visited across a small number of rows.
 */
const Halton = (Index: number): number => {
	let F = 1;

	let R = 0;

	let I = Index;

	while (I > 0) {
		F /= 2;

		R += F * (I % 2);

		I = Math.floor(I / 2);
	}

	return R;
};

/**
 * Fixed width ratios expressed as column spans in a 12-column grid.
 * The Halton sequence distributes row indices across all five buckets
 * without any two identical ratios appearing on consecutive rows.
 *
 *  50/50  -> [6, 6]
 *  58/42  -> [7, 5]   ~= 3:2
 *  42/58  -> [5, 7]   ~= 2:3
 *  67/33  -> [8, 4]   = 2:1
 *  33/67  -> [4, 8]   = 1:2
 */
const ROW_RATIOS: readonly [number, number][] = [
	[5, 7], // 42/58 (Halton 0.5  -> bucket 2)

	[7, 5], // 58/42 (Halton 0.25 -> bucket 1)

	[8, 4], // 67/33 (Halton 0.75 -> bucket 3)

	[6, 6], // 50/50 (Halton 0.125-> bucket 0)

	[8, 4], // 67/33 (Halton 0.625-> bucket 3)

	[7, 5], // 58/42 (Halton 0.375-> bucket 1)

	[4, 8], // 33/67 (Halton 0.875-> bucket 4)

	[6, 6], // 50/50 (Halton 0.062-> bucket 0)
] as const;

/**
 * Returns the [left, right] column-span pair for a given row.
 * Indexing pre-computed via Halton to guarantee unique-ratio spread.
 */
const GetRowRatio = (RowIndex: number): [number, number] => {
	const Noise = Halton(RowIndex + 1); // skip 0 -> starts at 0.5

	const BucketIndex = Math.min(Math.floor(Noise * 5), 4);

	const BUCKETS: readonly [number, number][] = [
		[6, 6],

		[7, 5],

		[5, 7],

		[8, 4],

		[4, 8],
	];

	return BUCKETS[BucketIndex];
};

// ── Field-record layer ─────────────────────────────────────────────────────

/**
 * Per-element field records (Source/Content/Record/*.ts) keyed by element name.
 * All 15 architecture cards carry a record: the 8 core records (Land,
 * Mountain, Cocoon, Wind, Sky, Air, Echo, Grove) plus the extended
 * architecture elements (Common, Maintain, Mist, Output, Rest, SideCar, Vine,
 * Worker), each with its full ledger (stamp, route, status, metadata). The
 * extended elements use the spec's ◎ (U+25CE) neutral fallback seal - no
 * dedicated seal SVG for them.
 */
const ElementRecords: Record<string, FieldRecord> = {
	Air,

	Cocoon,

	Common,

	Echo,

	Grove,

	Maintain,

	Mist,

	Mountain,

	Output,

	Rest,

	SideCar,

	Sky,

	Vine,

	Wind,

	Worker,
};

/**
 * Specimen-label card body: the field-record grammar (# INDEX, 〈stamp〉,
 * /ROUTE, STATUS:, metadata rows, small seal anchor) rendered as an
 * ink-on-creme ledger with hairline rules - the same artifact family as
 * the Features series (SpecimenLabel), NOT the white jelly-card. The
 * element name + glyph + role chips sit above the ledger, and the FULL
 * quote renders with preserved line breaks and bullet lines.
 */
const RenderTestimonialBody = ({ Testimonial }: { Testimonial: Item }) => {
	const ElementRecord = ElementRecords[Testimonial.Author];

	const Index =
		ElementRecord?.Index ?? `# ${Testimonial.Author.toUpperCase()}_01`;

	return (
		<div className="flex flex-col">
			{/* Record index + upper-right seal (SVG where Public/Seal has one, else ◎) */}
			<div className="flex items-start justify-between gap-3">
				<span className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-card-foreground">
					{Index}
				</span>
				{ElementRecord ? (
					<FieldRecordSeal
						element={ElementRecord.Seal}

						size={28}

						className="shrink-0"
					/>
				) : (
					<span
						aria-hidden="true"
						className="font-mono text-base leading-none text-card-foreground opacity-60"
					>
						◎
					</span>
				)}
			</div>

			{/* Name + glyph + GitHub link */}
			<div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
				<div className="flex items-center gap-1.5">
					<span className="font-mono text-lg font-medium text-card-foreground">
						{Testimonial.Href ? (
							<a
								href={Testimonial.Href}

								target="_blank"
								rel="noopener noreferrer"
								className="hover:underline"
							>
								{Testimonial.Author}
							</a>
						) : (
							Testimonial.Author
						)}
					</span>
					{Testimonial.Author && (
						<ElementGlyph Name={Testimonial.Author} />
					)}
				</div>
				{Testimonial.Href && (
					<a
						href={Testimonial.Href}

						target="_blank"
						rel="noopener noreferrer"
						aria-label={`Open ${Testimonial.Author} source`}

						className="inline-flex items-center text-[color-mix(in_srgb,var(--CardForeground)_50%,transparent)] transition-colors hover:text-card-foreground"
					>
						<lucide.ExternalLink
							className="h-3 w-3 shrink-0"
							aria-hidden="true"
						/>
					</a>
				)}
			</div>

			{/* Role → keyword chips split by em-space (U+2001) or legacy " - " */}
			{Testimonial.Role && (
				<div className="mt-3 mb-2 flex flex-wrap gap-y-2 text-card-foreground">
					{Testimonial.Role.split(/\u2001| - /).map(
						(Tag, TagIndex) => (
							<Fragment key={TagIndex}>
								{TagIndex > 0 && "\u2001"}
								<jelly-badge
									className="flat font-mono text-sm"
									style={JellyBadgeStyle(Tag)}
								>
									{Tag}
								</jelly-badge>
							</Fragment>
						),
					)}
				</div>
			)}

			{/* Field-record ledger rows from the element record (all 15 elements) */}
			{ElementRecord && (
				<SpecimenLabel
					record={ElementRecord}

					showHeader={false}

					showTitle={false}

					className="mt-3"
				/>
			)}

			{/* Full quote - preserved line breaks and bullet lines */}
			<p className="mt-3 whitespace-pre-line border-t border-border pt-3 font-mono text-sm leading-relaxed text-card-foreground">
				{Testimonial.Quote}
			</p>
		</div>
	);
};

// ── Component ──────────────────────────────────────────────────────────────

const DynamicTestimonials = ({ Content, ClassName }: Property) => {
	const {
		Title,

		Subtitle,

		Testimonial: Testimonials,

		Column: Columns = 3,
	} = Content;

	const GridReference = useRef<HTMLDivElement>(null);

	const IsMasonry = Columns === "masonry";

	const ColumnClass: Record<number, string> = {
		1: "grid-cols-1 max-w-3xl",

		2: "grid-cols-1 md:grid-cols-2 max-w-5xl",

		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl",

		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl",

		5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl",

		6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 max-w-7xl",
	};

	useEffect(() => {
		const Grid = GridReference.current;

		if (!Grid) return;

		const ReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (ReducedMotion) return;

		const ApplyScatter = async () => {
			const AttentionModule =
				await import("../../Function/Noise/Attention.js");

			const Attention = await AttentionModule.default;

			const Cards =
				Grid.querySelectorAll<HTMLElement>(".TestimonialCard");

			Cards.forEach((Card, Index) => {
				Attention.ApplyToElement(Card, Index, 5, 3);
			});

			const StaccatoModule =
				await import("../../Function/Noise/Staccato.js");

			const Engine = await StaccatoModule.default;

			Engine.SeedSelector(".TestimonialCard");
		};

		ApplyScatter();
	}, [Testimonials]);

	const RenderStars = (Rating: number = 0) => {
		if (Rating <= 0) return null;

		return (
			<div role="img" aria-label={`Rating: ${Rating} out of 5 stars`}>
				{Array.from({ length: 5 }).map((_, Index) => (
					<span
						key={Index}

						className="StaccatoStar StarRatingSymbol text-yellow-400"
						aria-hidden="true"
					>
						{Index < Rating ? "\u2605" : "\u2606"}
					</span>
				))}
			</div>
		);
	};

	if (IsMasonry) {
		return (
			<section
				id="testimonials"
				aria-label="Architecture"
				className={`w-full py-16 sm:py-20 ${ClassName || ""}`}
			>
				<div className="container mx-auto px-4">
					{(Title || Subtitle) && (
						<div className="mx-auto mb-10 max-w-2xl text-center">
							<p className="mb-4 font-mono text-sm uppercase tracking-[0.25em] text-muted">
								Architecture
							</p>
							{Title && (
								<h2 className="text-4xl font-normal tracking-tight sm:text-5xl">
									{Title}
								</h2>
							)}

							{Subtitle && (
								<div className="mt-3 text-muted">
									<RichText Text={Subtitle} />
								</div>
							)}
						</div>
					)}

					<div
						ref={GridReference}
						className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-12"
					>
						{Testimonials.map((Testimonial, Index) => {
							const Row = Math.floor(Index / 2);

							const IsLeft = Index % 2 === 0;

							const IsLastOdd =
								Index === Testimonials.length - 1 &&
								Testimonials.length % 2 === 1;

							const [ColA, ColB] = GetRowRatio(Row);

							const ColSpan = IsLastOdd
								? 8
								: IsLeft
									? ColA
									: ColB;

							return (
								<jelly-card
									key={Testimonial.Id}
									className="MasonryCard TestimonialCard p-5 flat"
									style={
										{
											...JellyCardStyle(Testimonial.Id),
											"--masonry-col": ColSpan,
										} as React.CSSProperties
									}
								>
									<RenderTestimonialBody
										Testimonial={Testimonial}
									/>
								</jelly-card>
							);
						})}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id="testimonials"
			aria-label="Architecture"
			className={`w-full py-16 sm:py-20 ${ClassName || ""}`}
		>
			<div className="container mx-auto px-4">
				{(Title || Subtitle) && (
					<div className="mx-auto mb-10 max-w-2xl text-center">
						<p className="mb-4 font-mono text-sm uppercase tracking-[0.25em] text-muted">
							Architecture
						</p>
						{Title && (
							<h2 className="text-4xl font-normal tracking-tight sm:text-5xl">
								{Title}
							</h2>
						)}

						{Subtitle && (
							<div className="mt-3 text-muted">
								<RichText Text={Subtitle} />
							</div>
						)}
					</div>
				)}

				<div
					ref={GridReference}
					className={`StaccatoMorphGap grid ${ColumnClass[Columns as number] ?? ColumnClass[3]} mx-auto gap-12`}
				>
					{Testimonials.map((Testimonial) => {
						return (
												<jelly-card
													key={Testimonial.Id}
													className="TestimonialCard p-5 flat"
													style={JellyCardStyle(Testimonial.Id)}
												>
													<RenderTestimonialBody
														Testimonial={Testimonial}
													/>
												</jelly-card>
											);
					})}
				</div>
			</div>
		</section>
	);
};

export { DynamicTestimonials };

export default DynamicTestimonials;
