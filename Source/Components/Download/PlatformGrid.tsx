import React from "react";

import type { Download as DownloadType } from "../Lib/types";
import { DownloadCard } from "./DownloadCard";

interface PlatformGridProps {
	title?: string;
	subtitle?: string;
	downloads: DownloadType[];
	onDownload: (download: DownloadType) => void;
	showVerification?: boolean;
	className?: string;
}

/**
 * PlatformGrid component displaying a grid of DownloadCard components
 * Shows all available platform downloads with verification info
 */
export function PlatformGrid({
	title,
	subtitle,
	downloads,
	onDownload,
	showVerification = true,
	className,
}: PlatformGridProps) {
	// Group downloads by platform to get the latest version for each
	const latestPerPlatform = React.useMemo(() => {
		const platformMap = new Map<string, DownloadType>();
		downloads.forEach((download) => {
			const existing = platformMap.get(download.platform);
			if (
				!existing ||
				new Date(download.createdAt) > new Date(existing.createdAt)
			) {
				platformMap.set(download.platform, download);
			}
		});
		return Array.from(platformMap.values());
	}, [downloads]);

	if (latestPerPlatform.length === 0) {
		return (
			<section className={`py-20 ${className || ""}`}>
				<div className="container mx-auto px-4">
					<div className="text-center">
						<p className="text-muted-foreground">
							No downloads available
						</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className={`py-20 ${className || ""}`}>
			<div className="container mx-auto px-4">
				{(title || subtitle) && (
					<div className="mb-16 text-center">
						{title && (
							<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
								{title}
							</h2>
						)}
						{subtitle && (
							<p className="text-muted-foreground mx-auto max-w-2xl text-lg">
								{subtitle}
							</p>
						)}
					</div>
				)}

				<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
					{latestPerPlatform.map((download) => (
						<DownloadCard
							key={download.id}
							download={download}
							onDownload={onDownload}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export default PlatformGrid;
