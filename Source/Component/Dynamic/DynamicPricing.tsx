import * as lucide from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { IconTooltip } from "../UI/IconTooltip.js";
import { RichText } from "../UI/RichText.js";
import { DynamicButton } from "./DynamicButton.js";
// RichText is used with Terms={true} throughout so element names, tool names,
// protocols, and licenses are auto-badged with logos from the term dictionary.
import type Property from "./Interface/Property/Pricing.js";

/**
 * Semantic color map for the six core elements.
 * Extracts the element name from the first segment before the emoji.
 */
const ElementColorMap: Record<string, string> = {
	Mountain: "var(--ExtensionRust)",
	Cocoon: "var(--ExtensionEffectTypeScript)",
	Wind: "var(--LanguageTypeScript)",
	Sky: "var(--ExtensionAstro)",
	Air: "var(--ExtensionTauri)",
	Echo: "var(--SpineTCP)",
	Common: "var(--LanguageRust)",
	Vine: "var(--SpinegRPC)",
	Grove: "var(--SpineWASM)",
	Mist: "var(--SpineIPC)",
	Rest: "var(--ToolOxc)",
	Output: "var(--ToolEsBuild)",
	SideCar: "var(--RuntimeNode)",
	Worker: "var(--LanguageJavaScript)",
	Maintain: "var(--ToolBiome)",
};

const GetElementColor = (Line: string): string => {
	const Name = Line.split(/[\s\u2001]/)[0];
	return ElementColorMap[Name] ?? "var(--Primary)";
};

/**
 * Dynamic Pricing - two-column layout (Free + Future).
 * Each tier card shows:
 * Elements section - colored multi-line rows (name / descriptor / detail)
 * Separator
 * Features section - icon checklist
 */
const DynamicPricing = ({ Content, ClassName }: Property) => {
	const { t: T } = useTranslation("home");
	const GridReference = useRef<HTMLDivElement>(null);
	const {
		Title,
		Subtitle,
		Tiers,
		ShowMonthlyYearlyToggle = false,
		DefaultYearly = false,
		Labels = {},
	} = Content;

	const PopularLabel =
		Labels.Popular ??
		T("pricing.labels.popular", { defaultValue: "Most Popular" });

	const [IsYearly, SetIsYearly] = useState(DefaultYearly);

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
			const Cards = Grid.querySelectorAll<HTMLElement>(".PricingCard");
			Cards.forEach((Card, Index) => {
				Attention.ApplyToElement(Card, Index, 4, 3);
			});
		};
		ApplyScatter();
	}, [Tiers]);

	const DisplayTier = Tiers.map((Tier) => ({
		...Tier,
		currentPrice: IsYearly ? Tier.Price.Yearly : Tier.Price.Monthly,
	}));

	return (
		<section
			id="pricing"
			aria-labelledby="PricingHeading"
			className={`flex min-h-[100dvh] w-full flex-col justify-center py-24 sm:py-32 ${
				ClassName || ""
			}`}>
			<div className="container mx-auto px-4">
				{(Title || Subtitle) && (
					<div className="StaccatoBreath mx-auto mb-24 max-w-2xl text-center">
						{Title && (
							<h2
								id="PricingHeading"
								className="text-2xl font-semibold tracking-tight sm:text-3xl">
								{Title}
							</h2>
						)}
						{Subtitle && (
							<div className="mt-3 text-[var(--MuteForeground)]">
								<RichText Text={Subtitle} />
							</div>
						)}
					</div>
				)}

				<div
					ref={GridReference}
					className="mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
					{DisplayTier.map((Tier) => (
						<div
							key={Tier.Id}
							className={`PricingCard StaccatoCard flex flex-col rounded-none bg-white ${
								Tier.Highlighted || Tier.Popular
									? ""
									: ""
							} ${
								Tier.Status && Tier.Status !== "Ready"
									? "opacity-75"
									: ""
							}`}
							aria-disabled={
								Tier.Status && Tier.Status !== "Ready"
									? true
									: undefined
							}>
							{/* ── Card header ───────────────────────────── */}
							<div className="border-b border-[var(--Border)] p-8">
								{Tier.Popular && (
									<div className="mb-2">
										<span className="StaccatoBadge StaccatoRhythmBeat font-semibold uppercase tracking-wider text-primary">
											{PopularLabel}
										</span>
									</div>
								)}
								{Tier.Status && Tier.Status !== "Ready" && (
									<div className="mb-2">
										<span className="StaccatoBadge bg-[var(--Mute)] px-2 py-0.5 font-semibold uppercase tracking-wider text-muted-foreground">
											{Tier.Status === "WIP"
												? "WIP"
												: "Coming Soon"}
										</span>
									</div>
								)}
								<div className="mb-4">
									<DynamicButton
										Content={{
											...Tier.CTA,
											FullWidth: true,
										}}
									/>
								</div>
								<h3 className="mb-2 text-2xl font-bold">
									{Tier.Name}
								</h3>
								{Tier.Description && (
									<div className="StaccatoBreath text-muted-foreground">
										<RichText Text={Tier.Description} />
									</div>
								)}
							</div>

							{/* ── Card body ─────────────────────────────── */}
							<div className="flex flex-1 flex-col p-8">
								{/* Elements section */}
								{Tier.Elements && Tier.Elements.length > 0 && (
									<>
										<p className="mb-3 font-semibold uppercase tracking-wider text-muted-foreground">
											Elements
										</p>
										<ul className="space-y-3">
											{Tier.Elements.map(
												(Element, Index) => {
													const Parts =
														Element.split("\n");
													const NameLine =
														Parts[0] ?? "";
													const Sub1 = Parts[1];
													const Sub2 = Parts[2];
													const AccentColor =
														GetElementColor(
															NameLine,
														);
													return (
														<li
															key={Index}
															className={`flex flex-col gap-0.5 ${
																Tier.Status &&
																Tier.Status !==
																	"Ready"
																	? "opacity-70"
																	: ""
															}`}>
															<span
																className="font-semibold"
																style={{
																	color: AccentColor,
																}}>
																<RichText
																	Text={
																		NameLine
																	}
																	Terms={true}
																/>
															</span>
															{Sub1 && (
																<span className="text-foreground">
																	<RichText
																		Text={
																			Sub1
																		}
																		Terms={
																			true
																		}
																	/>
																</span>
															)}
															{Sub2 && (
																<span className="text-muted-foreground">
																	<RichText
																		Text={
																			Sub2
																		}
																		Terms={
																			true
																		}
																	/>
																</span>
															)}
														</li>
													);
												},
											)}
										</ul>
										{Tier.Features.length > 0 && (
											<hr className="my-5 border-[var(--Border)]" />
										)}
									</>
								)}

								{/* Features section */}
								{Tier.Features.length > 0 && (
									<>
										{Tier.Elements &&
											Tier.Elements.length > 0 && (
												<p className="mb-3 font-semibold uppercase tracking-wider text-muted-foreground">
													Roadmap
												</p>
											)}
										<ul className="space-y-3">
											{Tier.Features.map(
												(Feature, FeatureIndex) => (
													<li
														key={FeatureIndex}
														className={`flex items-start justify-between gap-2 ${
															Tier.Status &&
															Tier.Status !==
																"Ready"
																? "opacity-70"
																: ""
														}`}>
														<span className="min-w-0 flex-1">
															<RichText
																Text={Feature}
																Terms={true}
															/>
														</span>
														{Tier.Status &&
														Tier.Status !==
															"Ready" ? (
															<span className="StaccatoBadge shrink-0 bg-[var(--Mute)] px-2 py-0.5 font-medium text-muted-foreground">
																{Tier.Status ===
																"WIP"
																	? "WIP"
																	: "Coming Soon"}
															</span>
														) : (
															<IconTooltip
																Label="Included"
																Icon={
																	lucide.Check
																}
																SizeClass="h-4 w-4 shrink-0"
																ClassName="StaccatoCheckmark mt-0.5 text-primary"
															/>
														)}
													</li>
												),
											)}
										</ul>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export { DynamicPricing };

export default DynamicPricing;
