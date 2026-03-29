import { DynamicButton } from "./DynamicButton";
import { DynamicTable } from "./DynamicTable";

interface ReleaseVersion {
	version: string;
	publishedAt: string;
	size: string;
	downloads: number;
	changelog?: string;
	assets: {
		platform: "macOS" | "Windows" | "Linux";
		url: string;
		sha256: string;
		signature?: string;
	}[];
}

interface PreviousReleasesContent {
	title: string;
	description?: string;
	releases: ReleaseVersion[];
	showChangelog?: boolean;
	onDownload?: (version: string, platform: string) => void;
	onViewChangelog?: (version: string) => void;
}

interface DynamicPreviousReleasesProps {
	content: PreviousReleasesContent;
	className?: string;
}

/**
 * Dynamic PreviousReleases component showing version history table
 * Displays table with version, date, size, downloads, and download buttons
 */
export function DynamicPreviousReleases({
	content,
	className,
}: DynamicPreviousReleasesProps) {
	const { title, description, releases, showChangelog = true } = content;

	const columns = [
		{
			key: "version" as const,
			header: "Version",
			render: (value: unknown, _row: ReleaseVersion) => (
				<span className="font-semibold text-primary">
					{String(value)}
				</span>
			),
		},
		{
			key: "publishedAt" as const,
			header: "Published",
			render: (value: unknown) => (
				<time dateTime={String(value)}>
					{new Date(String(value)).toLocaleDateString("en-US", {
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
			render: (value: unknown) => (
				<span className="text-muted-foreground">{String(value)}</span>
			),
		},
		{
			key: "downloads" as const,
			header: "Downloads",
			render: (value: unknown) => (
				<span className="text-muted-foreground">
					{(value as number).toLocaleString()}
				</span>
			),
		},
		{
			key: "actions" as const,
			header: "",
			render: (_value: unknown, row: ReleaseVersion) => (
				<div className="flex gap-2">
					{row.assets.map((asset) => (
						<DynamicButton
							key={asset.platform}
							content={{
								text: asset.platform,
								variant: "outline",
								size: "sm",
								icon:
									asset.platform === "macOS"
										? "Apple"
										: asset.platform === "Windows"
											? "Monitor"
											: "Terminal",
							}}
							onAction={() =>
								content.onDownload?.(
									row.version,
									asset.platform,
								)
							}
						/>
					))}
					{showChangelog && row.changelog && (
						<DynamicButton
							content={{
								text: "Changelog",
								variant: "ghost",
								size: "sm",
							}}
							onAction={() =>
								content.onViewChangelog?.(row.version)
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

				<div className="bg-white/92 mx-auto max-w-5xl overflow-hidden rounded-none border border-[var(--border)]">
					<DynamicTable<ReleaseVersion>
						content={{
							columns,
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

export type { ReleaseVersion, PreviousReleasesContent };
