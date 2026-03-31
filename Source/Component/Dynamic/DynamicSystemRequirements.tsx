import { Cpu, Monitor } from "lucide-react";
import React from "react";
import type RequirementItem from "./Interface/Item/Requirement.js";
import type Property from "./Interface/Property/Requirement/System.js";

/**
 * Dynamic SystemRequirements component for displaying platform requirements
 * Shows minimum and recommended specs in Card format
 */
export function DynamicSystemRequirements({
	content,
	className,
}: Property) {
	const { title, description, requirements } = content;

	const RequirementList = ({
		items: ItemList,
		variant: Variant = "minimum",
	}: {
		items: RequirementItem[];
		variant?: "minimum" | "recommended";
	}) => (
		<div className="space-y-3">
			{ItemList.map((Requirement) => (
				<div key={Requirement.id} className="flex items-start gap-3">
					<div className="mt-1">
						{Variant === "minimum" ? (
							<Cpu className="h-4 w-4 text-muted-foreground" />
						) : (
							<Monitor className="h-4 w-4 text-muted-foreground" />
						)}
					</div>
					<div className="flex-1">
						<span className="font-medium">{Requirement.label}:</span>{" "}
						<span className="text-muted-foreground">
							{Requirement.value}
						</span>
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

				<div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
					{/* Minimum Requirements */}
					<div className="bg-white/92 rounded-none border border-[var(--Border)] p-6">
						<h3 className="mb-6 text-xl font-semibold">
							Minimum Requirements
						</h3>
						<RequirementList
							items={requirements.minimum}
							variant="minimum"
						/>
					</div>

					{/* Recommended Requirements */}
					<div className="bg-white/92 rounded-none border border-primary p-6">
						<h3 className="mb-6 text-xl font-semibold">
							Recommended
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
							Supported Operating Systems
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
}
