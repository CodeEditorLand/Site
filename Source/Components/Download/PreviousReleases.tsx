import React from "react";

import type { Download as DownloadType } from "../Lib/types";

interface PreviousRelease {
	version: string;
	publishedAt: string;
	size: string;
	downloads: number;
	changelog?: string;
	assets: Array<{
		platform: "macOS" | "Windows" | "Linux";
		url: string;
		sha256: string;
		signature?: string;
	}>;
}

interface PreviousReleasesProps {
	releases: PreviousRelease[];
	onDownload: (version: string, platform: string) => void;
	onViewChangelog: (version: string) => void;
	title?: string;
	description?: string;
	className?: string;
}

/**
 * PreviousReleases component showing version history table
 * Displays table with version, date, size, downloads, and download buttons
 */
export function PreviousReleases({
	releases,
	onDownload,
	onViewChangelog,
	title = "Previous Releases",
	description,
	className,
}: PreviousReleasesProps) {
	const columns = [
		{
			key: "version" as const,
			header: "Version",
			render: (value: unknown) => (
				<span className="text-primary font-semibold">
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
			render: (_value: unknown, release: PreviousRelease) => (
				<div className="flex gap-2">
					{release.assets.map((asset) => (
						<button
							key={asset.platform}
							type="button"
							className="border-border hover:bg-accent inline-flex h-8 items-center justify-center gap-2 border px-3 text-xs font-medium transition-colors"
							onClick={() =>
								onDownload(release.version, asset.platform)
							}>
							{asset.platform}
						</button>
					))}
					{release.changelog && (
						<button
							type="button"
							className="border-border hover:bg-accent inline-flex h-8 items-center justify-center gap-2 border px-3 text-xs font-medium transition-colors"
							onClick={() => onViewChangelog(release.version)}>
							Changelog
						</button>
					)}
				</div>
			),
		},
	];

	return (
		<section className={`py-20 ${className || ""}`}>
			<div className="container mx-auto px-4">
				{(title || description) && (
					<div className="mb-16 text-center">
						{title && (
							<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
								{title}
							</h2>
						)}
						{description && (
							<p className="text-muted-foreground mx-auto max-w-2xl text-lg">
								{description}
							</p>
						)}
					</div>
				)}

				<div className="border-border mx-auto max-w-5xl overflow-hidden rounded-none border-[3px] shadow-lg">
					<table className="w-full">
						<thead className="bg-muted/50">
							<tr>
								{columns.map((col) => (
									<th
										key={col.key}
										className="px-6 py-4 text-left text-sm font-semibold">
										{col.header}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{releases.map((release, idx) => (
								<tr
									key={release.version}
									className={
										idx % 2 === 0
											? "bg-background"
											: "bg-muted/20"
									}>
									{columns.map((col) => (
										<td key={col.key} className="px-6 py-4">
											{col.render(
												release[
													col.key as keyof PreviousRelease
												],
												release,
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}

export default PreviousReleases;
