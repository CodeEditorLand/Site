import { useEffect, useRef, useState } from "react";

import { RichText } from "../UI/RichText.js";

import { DynamicButton } from "./DynamicButton.js";

import { RouteText, StampText, StatusText } from "../Brand/SemanticLedger.js";

import { ElementInk, KeywordInk } from "../../Function/Theme/SemanticColor.js";

import { CornerMarks } from "../Brand/CornerMarks.js";

// RichText is used with Terms={true} throughout so element names, tool names,
// protocols, and licenses are auto-badged with logos from the term dictionary.
import type Property from "./Interface/Property/Pricing.js";

/**
 * Semantic color map for the elements (C17): canonical per-element inks
 * from Source/Function/Theme/SemanticColor.ts - Cocoon green, Echo yellow,
 * Mountain rust red, Vine gRPC green, Grove WASM purple, the service
 * family (Air/Mist/Worker/SideCar) blue, etc. Dark -600/-700 ink shades
 * on the white card, per the daylight rule.
 */
const GetElementColor = (Line: string): string => {
	const Name = Line.split(/[\s\u2001]/)[0];

	return ElementInk(Name) ?? "var(--Primary)";
};

/** Doc page paths for each element - used for quick links in pricing tiers. */
const ElementDocPath: Record<string, string> = {
	Mountain: "/Doc/mountain",

	Cocoon: "/Doc/cocoon",

	Wind: "/Doc/wind",

	Sky: "/Doc/sky",

	Air: "/Doc/air",

	Echo: "/Doc/echo",

	Vine: "/Doc/vine",

	Common: "/Doc/common",

	Grove: "/Doc/grove",

	Mist: "/Doc/mist",

	Rest: "/Doc/rest",

	Output: "/Doc/output",

	SideCar: "/Doc/sidecar",

	Maintain: "/Doc/maintain",

	Worker: "/Doc/worker",
};

/**
 * Release-manifest copy pass (DesignPass Track 3/4): the roadmap tiers render
 * as # RELEASE_<NN> manifest records. Phase labels come from the roadmap
 * subtitle's milestone vocabulary ("active source / integration work in
 * progress / release preparation"); STATUS follows the state vocabulary
 * (ACTIVE for the built source, LOADING for WIP); /CHANNEL derives from the
 * public CC0 source; TARGET:/SIGNAL: fragments condense each tier
 * description; Row[] converts each feature sentence into a manifest row
 * (LABEL: VALUE) without changing the facts.
 */
const ReleaseManifest: Record<
	string,
	{
		Phase: string;

		Status: string;

		Target: string;

		Signal: string;

		Row: string[];
	}
> = {
	free: {
		Phase: "ACTIVE SOURCE",

		Status: "ACTIVE",

		Target: "NATIVE DESKTOP PATH",

		Signal: "NO CHROMIUM / NO ELECTRON / CC0",

		Row: [
			"EXTENSIONS: UNMODIFIED / COCOON",

			"WEBVIEW: OS NATIVE / TAURI",

			"FIBERS: CANCELLABLE SERVICE WORK",

			"TELEMETRY: COMPILE-GATED / RUST",

			"LICENSE: CC0 / NO RESTRICTIONS",

			"TARGETS: MACOS / WINDOWS / LINUX",
		],
	},

	progress: {
		Phase: "INTEGRATION",

		Status: "LOADING",

		Target: "V1.0",

		Signal: "SIGNED INSTALLERS / VERIFIED DOWNLOADS",

		Row: [
			"MARKETPLACE: UNDER REVIEW",

			"COCOON: LONG-TAIL API COVERAGE",

			"VINE: TYPED IPC / EXPANDING",

			"INSTALLERS: CROSS-PLATFORM / TAURI",

			"ECHO: WORK-STEALING / TUNING",

			"DISTRIBUTION: VERIFICATION PUBLISHING",
		],
	},
};

/**
 * Dynamic Pricing - two-column layout (Free + Future).
 * Each tier card shows:
 * Elements section - colored multi-line rows (name / descriptor / detail)
 * Separator
 * Features section - icon checklist
 */
const DynamicPricing = ({ Content, ClassName }: Property) => {
	const GridReference = useRef<HTMLDivElement>(null);

	const {
		Title,

		Subtitle,

		Tier: Tiers,

		ShowMonthlyYearlyToggle = false,

		DefaultYearly = false,
	} = Content;

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
			className={`w-full py-16 sm:py-20 ${ClassName || ""}`}
		>
			<div className="container mx-auto px-4">
				{(Title || Subtitle) && (
					<div className="mx-auto mb-10 max-w-2xl text-center">
						<p className="mb-4 font-mono text-sm uppercase tracking-[0.25em] text-muted">
							Roadmap
						</p>
						{Title && (
							<h2
								id="PricingHeading"
								className="text-4xl font-normal tracking-tight sm:text-5xl"
							>
								{Title}
							</h2>
						)}

						{Subtitle && (
							<div className="mt-3 flex flex-col gap-1 font-mono text-sm font-medium uppercase tracking-[0.2em] text-muted">
								<span>FUNDING: NLNET / NGI0 COMMONS FUND</span>

								<span className="opacity-70">
									PHASE:{" "}
									<span
										style={{
											color:
												KeywordInk("ACTIVE SOURCE") ??
												"var(--CardForeground)",
										}}
									>
										ACTIVE SOURCE
									</span>
									{" / "}
									<span
										style={{
											color:
												KeywordInk("INTEGRATION") ??
												"var(--CardForeground)",
										}}
									>
										INTEGRATION
									</span>
									{" / "}
									<span
										style={{
											color:
												KeywordInk(
													"RELEASE PREPARATION",
												) ?? "var(--CardForeground)",
										}}
									>
										RELEASE PREPARATION
									</span>
								</span>
							</div>
						)}
					</div>
				)}

				<div
					ref={GridReference}
					className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2"
				>
					{DisplayTier.map((Tier, TierIndex) => {
						const Manifest =
							ReleaseManifest[Tier.Identifier] ??
							ReleaseManifest.free;

						return (
							<jelly-card
								key={Tier.Identifier}
								className={`PricingCard flat relative ${
									Tier.Highlighted || Tier.Popular ? "" : ""
								} ${
									Tier.Status && Tier.Status !== "Ready"
										? "opacity-75"
										: ""
								}`}
								style={
									{
										"--jelly-fill": "var(--Card)",
										"--jelly-radius": "0",
										"--jelly-card-padding-block": "2.75rem",
										"--jelly-card-padding-inline": "0",
									} as React.CSSProperties
								}
								aria-disabled={
									Tier.Status && Tier.Status !== "Ready"
										? true
										: undefined
								}
							>
								{/* C19: picture-frame corner marks inside the tier card shell */}
								<CornerMarks />
								<div className="flex flex-col">
									{/* ── Card header - release manifest ─────────── */}
									<div className="border-b border-[color-mix(in_srgb,var(--CardForeground)_8%,transparent)] px-8 pb-6 pt-0">
										<div className="mb-4 flex flex-col gap-1 font-mono text-sm font-medium uppercase tracking-[0.2em] text-card-foreground">
											<span>
												# RELEASE_
												{String(TierIndex + 1).padStart(
													2,
													"0",
												)}
											</span>

											<span className="opacity-70">
												<StampText
													Line={Manifest.Phase}
												/>
											</span>

											<span className="opacity-70">
												<RouteText Line="/CHANNEL: PUBLIC" />
											</span>

											<span>
												<StatusText
													value={Manifest.Status}
													active={
														Manifest.Status ===
														"ACTIVE"
													}
												/>
											</span>

											<span className="opacity-70">
												TARGET: {Manifest.Target}
											</span>

											<span className="opacity-70">
												SIGNAL: {Manifest.Signal}
											</span>
										</div>

										<div className="mb-4">
											<DynamicButton
												Content={{
													...Tier.CTA,
													FullWidth: true,
												}}
											/>
										</div>

										<h3 className="mb-2 text-lg font-medium text-card-foreground">
											{Tier.Name}
										</h3>
									</div>

									{/* ── Card body ─────────────────────────────── */}
									<div className="flex flex-1 flex-col px-8 pb-0 pt-6">
										{/* Elements section */}
										{Tier.Element &&
											Tier.Element.length > 0 && (
												<>
													<p className="mb-3 font-mono text-sm font-medium uppercase tracking-wider text-card-foreground opacity-70">
														Elements
													</p>
													<ul className="space-y-3">
														{Tier.Element.map(
															(
																Element,

																Index,
															) => {
																const Parts =
																	Element.split(
																		"\n",
																	);

																const NameLine =
																	Parts[0] ??
																	"";

																const Sub1 =
																	Parts[1];

																const Sub2 =
																	Parts[2];

																const AccentColor =
																	GetElementColor(
																		NameLine,
																	);

																return (
																	<li
																		key={
																			Index
																		}
																		className={`flex flex-col gap-0.5 ${
																			Tier.Status &&
																			Tier.Status !==
																				"Ready"
																				? "opacity-70"
																				: ""
																		}`}
																	>
																		<a
																			href={
																				ElementDocPath[
																					NameLine
																				] ??
																				`/Doc/${NameLine.toLowerCase()}`
																			}
																			className="font-mono text-sm font-medium transition-colors hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--Primary)]"
																			style={{
																				color: AccentColor,
																			}}
																		>
																			<RichText
																				Text={
																					NameLine
																				}
																				Terms={
																					true
																				}
																			/>
																		</a>
																		{Sub1 && (
																			<span className="font-mono text-sm text-card-foreground">
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
																			<span className="font-mono text-sm text-card-foreground opacity-50">
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
													{Tier.Feature.length >
														0 && (
														<hr className="my-5 border-[var(--Border)]" />
													)}
												</>
											)}

										{/* Manifest rows (features → LABEL: VALUE) */}
										{Manifest.Row.length > 0 && (
											<>
												{Tier.Element &&
													Tier.Element.length > 0 && (
														<p className="mb-3 font-mono text-sm font-medium uppercase tracking-wider text-card-foreground opacity-70">
															Manifest
														</p>
													)}

												<ul className="space-y-2">
													{Manifest.Row.map(
														(Row, RowIndex) => (
															<li
																key={RowIndex}
																className="flex items-start justify-between gap-2 font-mono text-sm font-medium uppercase tracking-[0.2em] text-card-foreground"
															>
																<span className="min-w-0 flex-1">
																	{Row}
																</span>
															</li>
														),
													)}
												</ul>
											</>
										)}
									</div>
								</div>
							</jelly-card>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export { DynamicPricing };

export default DynamicPricing;
