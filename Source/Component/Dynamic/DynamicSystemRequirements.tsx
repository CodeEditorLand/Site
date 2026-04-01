import { Cpu, Monitor } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import type RequirementItem from "./Interface/Item/Requirement.js";
import type Property from "./Interface/Property/Requirement/System.js";

/**
 * Dynamic SystemRequirements component for displaying platform requirements
 * Shows minimum and recommended specs in Card format
 */
const DynamicSystemRequirements = ({ content, className }: Property) => {
	const { t: T } = useTranslation("download");
	const { title, description, requirements } = content;

	const GridReference = useRef<HTMLDivElement>(null);

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
			const Cards = Grid.querySelectorAll<HTMLElement>(".StaccatoCard");
			Cards.forEach((Card, Index) => {
				Attention.ApplyToElement(Card, Index, 4, 3);
			});
		};

		ApplyScatter();
	}, [requirements]);

	const RequirementList = ({
		items: ItemList,
		variant: Variant = "minimum",
	}: {
		items: RequirementItem[];
		variant?: "minimum" | "recommended";
	}) => (
		<div className="space-y-3">
			{ItemList.map((Requirement) => (
				<div key={Requirement.id} className="flex items-start">
					<div className="flex-1">
						<span className="font-medium">
							{Requirement.label}:
						</span>{" "}
						<span className="text-muted-foreground">
							{Requirement.value}
						</span>
					</div>
					{" "}
					<div className="mt-1 shrink-0">
						{Variant === "minimum" ? (
							<Cpu className="h-4 w-4 text-muted-foreground" />
						) : (
							<Monitor className="h-4 w-4 text-muted-foreground" />
						)}
					</div>
				</div>
			))}
		</div>
	);

	return (
		<section
			className={`py-20 ${className || ""}`}
			aria-label="System requirements">
			<div className="container mx-auto px-4">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
						{title}
					</h2>
					{description && (
						<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
							{description}
						</p>
					)}
				</div>

				<div
					ref={GridReference}
					className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
					{/* Minimum Requirements */}
					<div className="StaccatoCard StaccatoBorderShimmer rounded-none border border-[var(--Border)] bg-white p-6">
						<h3 className="mb-6 text-xl font-semibold">
							{T(
								"systemRequirements.minimum",
								"Minimum Requirements",
							)}
						</h3>
						<RequirementList
							items={requirements.minimum}
							variant="minimum"
						/>
					</div>

					{/* Recommended Requirements */}
					<div className="StaccatoCard StaccatoBorderShimmer rounded-none border border-primary bg-white p-6">
						<h3 className="mb-6 text-xl font-semibold">
							{T("systemRequirements.recommended", "Recommended")}
						</h3>
						<RequirementList
							items={requirements.recommended}
							variant="recommended"
						/>
					</div>
				</div>

				{/* OS Support */}
				{content.os && content.os.length > 0 && (
					<div className="mt-12 text-center">
						<h4 className="mb-4 text-lg font-semibold">
							{T(
								"systemRequirements.supportedOS",
								"Supported Operating Systems",
							)}
						</h4>
						<div className="flex flex-wrap justify-center gap-4">
							{content.os.map((OperatingSystem, Index) => (
								<span
									key={Index}
									className="border border-[var(--Border)] bg-secondary px-4 py-2 text-sm font-medium">
									{OperatingSystem}
								</span>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export { DynamicSystemRequirements };

export default DynamicSystemRequirements;
