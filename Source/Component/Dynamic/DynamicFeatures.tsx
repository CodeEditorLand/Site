import { useEffect, useRef } from "react";

import { RichText } from "../UI/RichText.js";

import { SpecimenLabel } from "../Brand/SpecimenLabel.js";

import { Mountain } from "../../Content/Record/Mountain.js";

import { Cocoon } from "../../Content/Record/Cocoon.js";

import { Wind } from "../../Content/Record/Wind.js";

import { Sky } from "../../Content/Record/Sky.js";

import { Air } from "../../Content/Record/Air.js";

import { Echo } from "../../Content/Record/Echo.js";

import { JellyCardStyle } from "./Interface/Card/Jelly.js";

import type Property from "./Interface/Property/Feature.js";

/**
 * Element records behind the six feature cards, in feature order:
 *   performance → Mountain (native backend)
 *   compatibility → Cocoon (extension host)
 *   architecture → Wind (workbench shell)
 *   cross-platform → Sky (UI layer)
 *   tooling → Air (background services)
 *   opensource → Echo (scheduler primitives)
 */
const ElementRecords = [Mountain, Cocoon, Wind, Sky, Air, Echo];

/**
 * Dynamic Features - Daylight Field Record series.
 * Six feature cards render as per-element SPECIMEN-LABEL ledgers
 * (Source/Component/Brand/SpecimenLabel.tsx) driven by
 * Source/Content/Record/<Element>.ts (index, stamp, route, status,
 * metadata, seal). Ink-on-creme ledger cards with hairline rules -
 * deliberately distinct from the white FieldRecord boxes used by the
 * hero, 404 and Portal. The section header and the simplex-noise scatter
 * (Staccato + Attention) are preserved unchanged.
 */
const DynamicFeatures = ({ Content, ClassName }: Property) => {
	const {
		Title,

		Subtitle,

		Feature: Features,

		Columns = 3,

		Gap = "lg",
	} = Content;

	const GridReference = useRef<HTMLDivElement>(null);

	const GapClass = {
		sm: "gap-4",

		md: "gap-6",

		lg: "gap-8",

		xl: "gap-12",
	};

	const ColumnClass: Record<number, string> = {
		1: "grid-cols-1",

		2: "grid-cols-1 md:grid-cols-2",

		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",

		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",

		5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",

		6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
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

			const Cards = Grid.querySelectorAll<HTMLElement>(".FeatureCard");

			Cards.forEach((Card, Index) => {
				Attention.ApplyToElement(Card, Index, 6, 4);
			});

			const StaccatoModule =
				await import("../../Function/Noise/Staccato.js");

			const Engine = await StaccatoModule.default;

			Engine.SeedSelector(".FeatureCard");
		};

		ApplyScatter();
	}, [Features]);

	return (
		<section
			id="features"
			aria-labelledby="FeaturesHeading"
			className={`w-full py-16 sm:py-20 ${ClassName || ""}`}
		>
			<div className="container mx-auto px-4">
				{(Title || Subtitle) && (
					<div className="mx-auto mb-10 max-w-2xl text-center">
						<p className="mb-4 font-mono text-sm uppercase tracking-[0.25em] text-muted">
							Features
						</p>
						{Title && (
							<h2
								id="FeaturesHeading"
								className="font-mono text-4xl font-normal tracking-tight sm:text-5xl"
							>
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
					className={`StaccatoMorphGap grid min-h-0 items-start ${
						ColumnClass[Columns]
					} ${GapClass[Gap]} mx-auto max-w-6xl`}
				>
					{Features.map((Feature, Index) => {
						const Record =
							ElementRecords[Index % ElementRecords.length];

						return (
							<jelly-card
								key={Record.Id}
								className="FeatureCard flat min-h-0 p-5"
								style={JellyCardStyle(Record.Id)}
							>
								<SpecimenLabel
									record={Record}
									className="h-full"
								/>
							</jelly-card>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export { DynamicFeatures };

export default DynamicFeatures;
