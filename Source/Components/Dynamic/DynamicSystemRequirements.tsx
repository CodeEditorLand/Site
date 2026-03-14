import { Cpu, Monitor } from "lucide-react";
import React from "react";

interface RequirementItem {
	id: string;
	label: string;
	value: string;
}

interface SystemRequirementsContent {
	title: string;
	description?: string;
	requirements: {
		minimum: RequirementItem[];
		recommended: RequirementItem[];
	};
	os?: string[];
}

interface DynamicSystemRequirementsProps {
	content: SystemRequirementsContent;
	className?: string;
}

/**
 * Dynamic SystemRequirements component for displaying platform requirements
 * Shows minimum and recommended specs in Card format
 */
export function DynamicSystemRequirements({
	content,
	className,
}: DynamicSystemRequirementsProps) {
	const { title, description, requirements } = content;

	const RequirementList = ({
		items,
		variant = "minimum",
	}: {
		items: RequirementItem[];
		variant?: "minimum" | "recommended";
	}) => (
		<div className="space-y-3">
			{items.map((req) => (
				<div key={req.id} className="flex items-start gap-3">
					<div className="mt-1">
						{variant === "minimum" ? (
							<Cpu className="text-muted-foreground h-4 w-4" />
						) : (
							<Monitor className="text-muted-foreground h-4 w-4" />
						)}
					</div>
					<div className="flex-1">
						<span className="font-medium">{req.label}:</span>{" "}
						<span className="text-muted-foreground">
							{req.value}
						</span>
					</div>
				</div>
			))}
		</div>
	);

	return (
		<section className={`py-20 ${className || ""}`}>
			<div className="container mx-auto px-4">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
						{title}
					</h2>
					{description && (
						<p className="text-muted-foreground mx-auto max-w-2xl text-lg">
							{description}
						</p>
					)}
				</div>

				<div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
					{/* Minimum Requirements */}
					<div className="border-border !rounded-none border-[3px] p-6 shadow-lg">
						<h3 className="mb-6 text-xl font-semibold">
							Minimum Requirements
						</h3>
						<RequirementList
							items={requirements.minimum}
							variant="minimum"
						/>
					</div>

					{/* Recommended Requirements */}
					<div className="border-primary !rounded-none border-[3px] p-6 shadow-xl">
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
							{content.os.map((os, index) => (
								<span
									key={index}
									className="bg-secondary border-border border px-4 py-2 text-sm font-medium">
									{os}
								</span>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

export type { RequirementItem, SystemRequirementsContent };
