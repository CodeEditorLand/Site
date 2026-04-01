import { DynamicButton } from "./DynamicButton";
import { DynamicTable } from "./DynamicTable";
import type Property from "./Interface/Property/Release/Previous.js";
import type ReleaseVersion from "./Interface/Version/Release.js";

/**
 * Dynamic PreviousReleases component showing version history table
 * Displays table with version, date, size, downloads, and download buttons
 */
export function DynamicPreviousReleases({ content, className }: Property) {
	const { title, description, releases, showChangelog = true } = content;

	const Columns = [
		{
			key: "version" as const,
			header: "Version",
			render: (Value: unknown, _Row: ReleaseVersion) => (
				<span className="font-semibold text-primary">
					{String(Value)}
				</span>
			),
		},
		{
			key: "publishedAt" as const,
			header: "Published",
			render: (Value: unknown) => (
				<time dateTime={String(Value)}>
					{new Date(String(Value)).toLocaleDateString("en-US", {
						year: "numeric",
						month: "short",
						day: "numeric",
					})}
				</time>
			),
		},
		{
			key: "size" as const,
			header: "Size",
			render: (Value: unknown) => (
				<span className="text-muted-foreground">{String(Value)}</span>
			),
		},
		{
			key: "downloads" as const,
			header: "Downloads",
			render: (Value: unknown) => (
				<span className="text-muted-foreground">
					{(Value as number).toLocaleString()}
				</span>
			),
		},
		{
			key: "actions" as const,
			header: "",
			render: (_Value: unknown, Row: ReleaseVersion) => (
				<div className="flex gap-2">
					{Row.assets.map((Asset) => (
						<DynamicButton
							key={Asset.platform}
							content={{
								text: Asset.platform,
								variant: "outline",
								size: "sm",
								icon:
									Asset.platform === "macOS"
										? "Apple"
										: Asset.platform === "Windows"
											? "Monitor"
											: "Terminal",
							}}
							onAction={() =>
								content.onDownload?.(
									Row.version,
									Asset.platform,
								)
							}
						/>
					))}
					{showChangelog && Row.changelog && (
						<DynamicButton
							content={{
								text: "Changelog",
								variant: "ghost",
								size: "sm",
							}}
							onAction={() =>
								content.onViewChangelog?.(Row.version)
							}
						/>
					)}
				</div>
			),
		},
	];

	return (
		<section
			className={`py-20 ${className || ""}`}
			aria-label="Previous releases">
			<div className="container mx-auto px-4">
				{(title || description) && (
					<div className="mb-16 text-center">
						{title && (
							<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
								{title}
							</h2>
						)}
						{description && (
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
								{description}
							</p>
						)}
					</div>
				)}

				<div className="StaccatoCard StaccatoBorderShimmer mx-auto max-w-5xl overflow-hidden rounded-none border border-[var(--Border)] bg-white">
					<DynamicTable<ReleaseVersion>
						content={{
							columns: Columns,
							data: releases,
							striped: true,
							hoverable: true,
							bordered: false, // Table already has outer border
							compact: false,
						}}
					/>
				</div>
			</div>
		</section>
	);
}
