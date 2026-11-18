/**
 * DynamicTransparency - build transparency section showing SBOM,
 * dependency tree, and build reproducibility information.
 *
 * Renders categorized items with copy-to-clipboard and expandable
 * details. Content is driven by the Transparency interface.
 *
 * **What it costs, and when.** The section is the download page's closing
 * disclosure: everything in it is below the manifest band, so nothing here is
 * needed at first paint. Its only client work is four copy-to-clipboard
 * buttons, and its `client:load` directive is the page's to change (the exact
 * one-line change is in the card-13 ledger, §4.1).
 *
 * Inside the island, two things are this file's: the icon import, which was a
 * namespace import of the whole icon set and is now eleven named ones, and the
 * noise engine, which is gated on the section approaching the viewport rather
 * than on mount. The gate is defensive rather than a saving - see the note on
 * the effect, which records that the ref it reads is attached to no element,
 * so the engine has never been fetched at all.
 *
 * The markup, the centred heading, the three sub-blocks and the
 * `Verify in source code` link are unchanged.
 */
import {
	Code,
	Copy,
	Cpu,
	Eye,
	EyeOff,
	Layers,
	Lock,
	type LucideIcon,
	Server,
	Shield,
	Zap,
} from "lucide-react";

import { useEffect, useRef } from "react";

import { Badge } from "../UI/Badge";

import { RichText } from "../UI/RichText";

import type Property from "./Interface/Property/Transparency.js";

const TransparencyIconRegistry: Record<string, LucideIcon> = {
	Shield: Shield,

	Eye: Eye,

	EyeOff: EyeOff,

	Lock: Lock,

	Server: Server,

	Cpu: Cpu,

	Code: Code,

	Layers: Layers,

	Zap: Zap,
};

const StatusColor: Record<string, string> = {
	Active: "bg-green-500",

	Disabled: "bg-green-500",

	Optional: "bg-yellow-500",

	Recommended: "bg-blue-500",
};

const StatusBadgeVariant: Record<string, "default" | "secondary" | "outline"> =
	{
		Active: "default",

		Disabled: "secondary",

		Optional: "outline",

		Recommended: "default",
	};

const VariantStatusColor: Record<string, string> = {
	Recommended: "bg-blue-500",

	Available: "bg-green-500",

	Legacy: "bg-yellow-500",

	Experimental: "bg-purple-500",

	Development: "bg-orange-500",
};

const DynamicTransparency = ({ Content, ClassName }: Property) => {
	const {
		Title,

		Subtitle,

		Policy,

		Variant,

		Strategy,

		MatrixPermutation,

		SourceURL,
	} = Content;

	const SectionReference = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const Section = SectionReference.current;

		if (!Section) return;

		const ReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (ReducedMotion) return;

		let Cancelled = false;

		/**
		 * The engine is fetched when the section is about to be read, not when
		 * the island hydrates.
		 *
		 * `Function/Noise/Staccato` is three chunks (`Staccato` 1.7 kB,
		 * `Noise` 0.2 kB, `simplex-noise` 0.9 kB), and it writes CSS custom
		 * properties from a global frame loop - so it is worth fetching late
		 * and worth fetching only once. The root margin starts the fetch a
		 * viewport early, so the drift is already running by the time the
		 * section is on screen.
		 *
		 * **This effect has never run, and this change does not make it run.**
		 * `SectionReference` is attached to no element - the `<section>` below
		 * carries no `ref` - so the guard returns on every mount, before and
		 * after this card. Wiring it is one attribute, and it is deliberately
		 * not added here: `Staccato` writes to `document.documentElement` from
		 * its own `requestAnimationFrame` loop, so turning it on would *add* a
		 * per-frame cost to `/Download` in a card whose subject is removing
		 * one. The gate is kept because it is the only version of this effect
		 * that is safe to wire; the finding is recorded in the ledger (§5.6).
		 */
		const ApplyNoise = async (): Promise<void> => {
			const StaccatoModule = await import("../../Function/Noise/Staccato.js");

			const Engine = await StaccatoModule.default;

			if (Cancelled) return;

			Engine.SeedSelector(".TransparencyCard");
		};

		if (typeof IntersectionObserver === "undefined") {
			void ApplyNoise();

			return;
		}

		const Observer = new IntersectionObserver(
			(Entries) => {
				for (const Entry of Entries) {
					if (!Entry.isIntersecting) continue;

					Observer.disconnect();

					void ApplyNoise();
				}
			},
			{ rootMargin: "100% 0px" },
		);

		Observer.observe(Section);

		return () => {
			Cancelled = true;

			Observer.disconnect();
		};
	}, []);

	const GetIcon = (IconName: string): LucideIcon | null => {
		return TransparencyIconRegistry[IconName] || null;
	};

	return (
		<section
			id="Transparency"
			aria-label="Build Transparency"
			className={`w-full py-20 ${ClassName || ""}`}
		>
			<div className="container mx-auto px-4">
				{(Title || Subtitle) && (
					<div className="StaccatoBreath mb-16 text-center">
						{Title && (
							<h2 className="type-section mb-4">
								{Title}
							</h2>
						)}

						{Subtitle && (
							<div className="mx-auto max-w-3xl text-lg text-muted-foreground opacity-70">
								<RichText Text={Subtitle} />
							</div>
						)}
					</div>
				)}

				{/* Telemetry Policy */}
				<div className="mb-16">
					<h3 className="mb-2 text-foreground">
						Telemetry Policy
					</h3>
					<p className="mb-8 text-muted-foreground">
						Full disclosure on what Land collects - and what it does
						not.
					</p>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{Policy.map((Item) => {
							const Icon = GetIcon(Item.Icon);

							return (
								<div
									key={Item.Identifier}
									className="TransparencyCard StaccatoCard StaccatoBorderShimmer flat flex flex-col space-y-4 bg-card p-6"
								>
									<div className="flex items-start justify-between">
										<h4 className="font-mono text-sm font-medium text-card-foreground">
											{Item.Title}
										</h4>
										<div className="ml-4 flex items-center gap-3">
											<Badge
												variant={
													StatusBadgeVariant[
														Item.Status
													]
												}
												className="StaccatoBadge"
											>
												{Item.Status}
												{"\u2001"}
												<span
													className={`StaccatoDot StaccatoRhythmDot flat h-2 w-2 ${StatusColor[Item.Status]}`}
													aria-hidden="true"
												/>
											</Badge>
											{Icon && (
												<div
													className="flat flex h-10 w-10 shrink-0 items-center justify-center bg-secondary"
													aria-hidden="true"
												>
													<Icon
														className="StaccatoIcon text-secondary-fg h-5 w-5"
														aria-hidden="true"
													/>
												</div>
											)}
										</div>
									</div>
									<div className="StaccatoBreath text-card-foreground opacity-70">
										<RichText Text={Item.Description} />
									</div>
									{Item.Detail && (
										<div className="text-card-foreground opacity-50">
											<RichText
												Text={Item.Detail}

												Terms
											/>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>

				{/* Build Variants */}
				<div className="mb-16">
					<h3 className="mb-2 text-foreground">
						Build Variants
					</h3>
					<p className="mb-8 text-foreground opacity-70">
						{Variant.length} named profiles across{" "}
						{MatrixPermutation} test permutations. Every combination
						verified.
					</p>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-[var(--Border)]">
									<th className="px-4 py-3 text-left font-mono text-sm uppercase tracking-rule text-muted-foreground">
										Profile
									</th>
									<th className="px-4 py-3 text-left font-mono text-sm uppercase tracking-rule text-muted-foreground">
										Tier
									</th>
									<th className="px-4 py-3 text-left font-mono text-sm uppercase tracking-rule text-muted-foreground">
										Workbench
									</th>
									<th className="px-4 py-3 text-left font-mono text-sm uppercase tracking-rule text-muted-foreground">
										Features
									</th>
									<th className="px-4 py-3 text-left font-mono text-sm uppercase tracking-rule text-muted-foreground">
										Status
									</th>
								</tr>
							</thead>
							<tbody>
								{Variant.map((Item) => (
									<tr
										key={Item.Identifier}

										className="border-b border-[var(--Border)] last:border-b-0"
									>
										<td className="px-4 py-3 font-mono text-foreground">
											{Item.Name}
										</td>
										<td className="px-4 py-3 text-foreground">
											<Badge
												variant="outline"
												className="StaccatoBadge"
											>
												{Item.Tier}
											</Badge>
										</td>
										<td className="px-4 py-3 text-foreground">
											{Item.Workbench}
										</td>
										<td className="px-4 py-3 text-foreground opacity-70">
											{Item.Feature}
										</td>
										<td className="px-4 py-3 text-foreground">
											<Badge className="StaccatoBadge">
												{Item.Status}

												{"\u2001"}

												<span
													className={`StaccatoDot flat h-2 w-2 ${VariantStatusColor[Item.Status]}`}

													aria-hidden="true"
												/>
											</Badge>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Deployment Strategies */}
				<div className="mb-16">
					<h3 className="mb-2 text-foreground">
						Deployment Strategies
					</h3>
					<p className="mb-8 text-foreground opacity-70">
						Four deployment modes from development to production.
					</p>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{Strategy.map((Item) => {
							const Icon = GetIcon(Item.Icon);

							return (
								<div
									key={Item.Identifier}
									className="TransparencyCard StaccatoCard StaccatoBorderShimmer flat flex flex-col space-y-4 bg-card p-6"
								>
									<div className="flex items-start justify-between">
										<h4 className="font-mono text-sm font-medium text-card-foreground">
											{Item.Name}
										</h4>
										{Icon && (
											<div
												className="flat ml-4 flex h-10 w-10 shrink-0 items-center justify-center bg-secondary"
												aria-hidden="true"
											>
												<Icon
													className="StaccatoIcon text-secondary-fg h-5 w-5"
													aria-hidden="true"
												/>
											</div>
										)}
									</div>
									<div className="StaccatoBreath text-card-foreground opacity-70">
										<RichText Text={Item.Description} />
									</div>
									<div className="flat flex items-baseline bg-secondary px-3 py-2">
										<code className="text-secondary-fg font-mono">
											{Item.Command}
										</code>
										<button
											type="button"
											onClick={async () => {
												try {
													await navigator.clipboard.writeText(
														Item.Command,
													);
												} catch {
													// clipboard unavailable
												}
											}}
											aria-label="Copy command"
											title="Copy command"
											className="flat RichTextCopyButton ml-2 inline-flex h-[1.1em] w-[1.1em] shrink-0 items-center justify-center opacity-50 transition-opacity hover:opacity-100"
										>
											<Copy
												className="h-[0.65em] w-[0.65em]"
												aria-hidden="true"
											/>
										</button>
									</div>
									<div className="flex flex-wrap gap-2">
										{Item.Feature.map(
											(FeatureName, Index) => (
												<Badge
													key={Index}
													variant="outline"
													className="StaccatoBadge"
												>
													{FeatureName}
												</Badge>
											),
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Source Verification */}
				{SourceURL && (
					<div className="text-center">
						<a
							href={SourceURL}

							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center text-foreground underline underline-offset-4 opacity-70 hover:opacity-100"
						>
							Verify in source code
							<span className="InlineSeparator">
								<Code
									className="h-4 w-4"
									aria-hidden="true"
								/>
							</span>
						</a>
					</div>
				)}
			</div>
		</section>
	);
};

export { DynamicTransparency };

export default DynamicTransparency;
