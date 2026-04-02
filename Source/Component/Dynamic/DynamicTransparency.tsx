import * as lucide from "lucide-react";
import { useEffect, useRef } from "react";

import { Badge } from "../UI/Badge";
import type Property from "./Interface/Property/Transparency.js";

const TransparencyIconRegistry: Record<string, lucide.LucideIcon> = {
	Shield: lucide.Shield,
	Eye: lucide.Eye,
	EyeOff: lucide.EyeOff,
	Lock: lucide.Lock,
	Server: lucide.Server,
	Cpu: lucide.Cpu,
	Code: lucide.Code,
	Layers: lucide.Layers,
	Zap: lucide.Zap,
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

const DynamicTransparency = ({ content, className }: Property) => {
	const {
		Title,
		Subtitle,
		Policy,
		Variant,
		Strategy,
		MatrixPermutation,
		SourceURL,
	} = content;

	const SectionReference = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const Section = SectionReference.current;
		if (!Section) return;

		const ReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (ReducedMotion) return;

		const ApplyNoise = async () => {
			const StaccatoModule =
				await import("../../Function/Noise/Staccato.js");
			const Engine = await StaccatoModule.default;
			Engine.SeedSelector(".TransparencyCard");
		};

		ApplyNoise();
	}, []);

	const GetIcon = (IconName: string): lucide.LucideIcon | null => {
		return TransparencyIconRegistry[IconName] || null;
	};

	return (
		<section
			id="Transparency"
			aria-label="Build Transparency"
			className={`flex min-h-[100dvh] w-full flex-col justify-center py-20 ${className || ""}`}>
			<div className="container mx-auto px-4">
				{(Title || Subtitle) && (
					<div className="StaccatoBreath mb-16 text-center">
						{Title && (
							<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
								{Title}
							</h2>
						)}
						{Subtitle && (
							<p className="mx-auto max-w-3xl text-lg text-muted-foreground whitespace-pre-line">
								{Subtitle}
							</p>
						)}
					</div>
				)}

				{/* Telemetry Policy */}
				<div className="mb-16">
					<h3 className="mb-2 text-2xl tracking-tight">
						Telemetry Policy
					</h3>
					<p className="mb-8 text-muted-foreground">
						Full disclosure on what Land collects — and what it does
						not.
					</p>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{Policy.map((Item) => {
							const Icon = GetIcon(Item.Icon);
							return (
								<div
									key={Item.Identifier}
									className="TransparencyCard StaccatoCard StaccatoBorderShimmer flex flex-col space-y-4 rounded-none border border-[var(--Border)] bg-white p-6">
									<div className="flex items-start justify-between">
										<h4 className="text-lg font-semibold">
											{Item.Title}
										</h4>
										<div className="ml-4 flex items-center gap-3">
											<Badge
												variant={
													StatusBadgeVariant[
														Item.Status
													]
												}
												className="StaccatoBadge">
												{Item.Status}
												{"\u2001"}
												<span
													className={`StaccatoDot StaccatoRhythmDot h-2 w-2 rounded-none ${StatusColor[Item.Status]}`}
													aria-hidden="true"
												/>
											</Badge>
											{Icon && (
												<div
													className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-[var(--Border)] bg-secondary"
													aria-hidden="true">
													<Icon
														className="StaccatoIcon h-5 w-5 text-primary"
														aria-hidden="true"
													/>
												</div>
											)}
										</div>
									</div>
									<p className="StaccatoBreath text-muted-foreground whitespace-pre-line">
										{Item.Description}
									</p>
									{Item.Detail && (
										<p className="text-muted-foreground/70 text-xs">
											{Item.Detail}
										</p>
									)}
								</div>
							);
						})}
					</div>
				</div>

				{/* Build Variants */}
				<div className="mb-16">
					<h3 className="mb-2 text-2xl tracking-tight">
						Build Variants
					</h3>
					<p className="mb-8 text-muted-foreground">
						{Variant.length} named profiles across{" "}
						{MatrixPermutation} test permutations. Every combination
						verified.
					</p>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b border-[var(--Border)]">
									<th className="px-4 py-3 text-left text-sm font-semibold">
										Profile
									</th>
									<th className="px-4 py-3 text-left text-sm font-semibold">
										Tier
									</th>
									<th className="px-4 py-3 text-left text-sm font-semibold">
										Workbench
									</th>
									<th className="px-4 py-3 text-left text-sm font-semibold">
										Features
									</th>
									<th className="px-4 py-3 text-left text-sm font-semibold">
										Status
									</th>
								</tr>
							</thead>
							<tbody>
								{Variant.map((Item) => (
									<tr
										key={Item.Identifier}
										className="border-b border-[var(--Border)] last:border-b-0">
										<td className="px-4 py-3 font-mono text-sm">
											{Item.Name}
										</td>
										<td className="px-4 py-3 text-sm">
											<Badge
												variant="outline"
												className="StaccatoBadge">
												{Item.Tier}
											</Badge>
										</td>
										<td className="px-4 py-3 text-sm">
											{Item.Workbench}
										</td>
										<td className="px-4 py-3 text-sm text-muted-foreground">
											{Item.Feature}
										</td>
										<td className="px-4 py-3 text-sm">
											<Badge className="StaccatoBadge">
												{Item.Status}
												{"\u2001"}
												<span
													className={`StaccatoDot h-2 w-2 rounded-none ${VariantStatusColor[Item.Status]}`}
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
					<h3 className="mb-2 text-2xl tracking-tight">
						Deployment Strategies
					</h3>
					<p className="mb-8 text-muted-foreground">
						Four deployment modes from development to production.
					</p>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{Strategy.map((Item) => {
							const Icon = GetIcon(Item.Icon);
							return (
								<div
									key={Item.Identifier}
									className="TransparencyCard StaccatoCard StaccatoBorderShimmer flex flex-col space-y-4 rounded-none border border-[var(--Border)] bg-white p-6">
									<div className="flex items-start justify-between">
										<h4 className="text-lg font-semibold">
											{Item.Name}
										</h4>
										{Icon && (
											<div
												className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-[var(--Border)] bg-secondary"
												aria-hidden="true">
												<Icon
													className="StaccatoIcon h-5 w-5 text-primary"
													aria-hidden="true"
												/>
											</div>
										)}
									</div>
									<p className="StaccatoBreath text-muted-foreground whitespace-pre-line">
										{Item.Description}
									</p>
									<code className="block rounded-none border border-[var(--Border)] bg-secondary px-3 py-2 text-xs">
										{Item.Command}
									</code>
									<div className="flex flex-wrap gap-2">
										{Item.Feature.map(
											(FeatureName, Index) => (
												<Badge
													key={Index}
													variant="outline"
													className="StaccatoBadge text-xs">
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
							className="inline-flex items-center text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
							Verify in source code
							<span className="InlineSeparator">
								<lucide.Code className="h-4 w-4" aria-hidden="true" />
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
