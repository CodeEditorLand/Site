import { Apple, Monitor, Terminal } from "lucide-react";
import React, { useEffect, useState } from "react";

import { DynamicButton } from "./DynamicButton";
import { DynamicCard } from "./DynamicCard";
import type { ButtonContent, CardSection, PlatformInfo } from "./types";

interface PlatformGridContent {
	title?: string;
	subtitle?: string;
	platforms?: PlatformInfo[]; // Optional - will fetch from API if not provided
	showVerification?: boolean;
	onDownload?: (platform: PlatformInfo) => void;
	apiPlatform?: "macos" | "windows" | "linux"; // Optional: specify which platform to show (defaults to all)
}

interface DynamicPlatformGridProps {
	content: PlatformGridContent;
	className?: string;
}

/**
 * Dynamic PlatformGrid component that displays download cards for each platform
 * Supports fetching real download data from the Workers API
 * Includes loading and error states
 */
export function DynamicPlatformGrid({
	content,
	className,
}: DynamicPlatformGridProps) {
	const {
		title,
		subtitle,
		platforms: providedPlatforms,
		showVerification = true,
		onDownload,
		apiPlatform,
	} = content;

	const [platforms, setPlatforms] = useState<PlatformInfo[]>(
		providedPlatforms || [],
	);
	const [loading, setLoading] = useState(!providedPlatforms);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (providedPlatforms) {
			setPlatforms(providedPlatforms);
			return;
		}

		const fetchPlatforms = async () => {
			try {
				setLoading(true);
				setError(null);

				// Import workers client directly for platform data
				const { getWorkersClient } =
					await import("../../Lib/workers-client");
				const workers = getWorkersClient();
				const response = await workers.download.getLatest(apiPlatform);
				if (!response.success || !response.data) {
					throw new Error(
						response.error || "Failed to fetch latest download",
					);
				}
				const latest = response.data;
				const currentPlatforms: PlatformInfo[] = [];

				if (latest.platform === "macos") {
					currentPlatforms.push({
						id: latest.id,
						name: "Apple",
						icon: "Apple",
						description: "Universal Binary",
						version: latest.version,
						size: latest.size || "45.2 MB",
						checksum: latest.checksum,
						signature: latest.signature,
						requirements: [
							"macOS 11.0 (Big Sur) or later",
							"4 GB RAM",
							"500 MB disk space",
						],
					});
				} else if (latest.platform === "windows") {
					currentPlatforms.push({
						id: latest.id,
						name: "Windows",
						icon: "Monitor",
						description: "64-bit (x64)",
						version: latest.version,
						size: latest.size || "48.7 MB",
						checksum: latest.checksum,
						signature: latest.signature,
						requirements: [
							"Windows 10 or later (64-bit)",
							"4 GB RAM",
							"500 MB disk space",
						],
					});
				} else if (latest.platform === "linux") {
					currentPlatforms.push({
						id: latest.id,
						name: "Linux",
						icon: "Terminal",
						description: "DEB, RPM, AppImage",
						version: latest.version,
						size: latest.size || "41.3 MB",
						checksum: latest.checksum,
						signature: latest.signature,
						requirements: [
							"glibc 2.28+",
							"4 GB RAM",
							"500 MB disk space",
						],
					});
				}

				setPlatforms(currentPlatforms);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Failed to load downloads",
				);
				console.error("Failed to fetch platform data:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPlatforms();
	}, [providedPlatforms, apiPlatform]);

	const iconMap = {
		Apple,
		Monitor,
		Terminal,
	};

	const formatFileSize = (sizeStr: string) => {
		return sizeStr;
	};

	const formatVersion = (version: string) => {
		return version.startsWith("v") ? version : `v${version}`;
	};

	const handleDownload = async (platform: PlatformInfo) => {
		try {
			// Use workers client directly
			const { getWorkersClient } =
				await import("../../Lib/workers-client");
			const workers = getWorkersClient();
			const infoResponse = await workers.download.getInfo(platform.id);
			if (!infoResponse.success || !infoResponse.data) {
				throw new Error(
					infoResponse.error || "Failed to get download info",
				);
			}
			window.open(infoResponse.data.downloadUrl, "_blank");
			await workers.download.trackDownload(platform.id);
			onDownload?.(platform);
		} catch (err) {
			console.error("Download failed:", err);
			alert("Download failed. Please try again.");
		}
	};

	if (loading) {
		return (
			<section className={`py-20 ${className || ""}`}>
				<div className="container mx-auto px-4">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
							Loading downloads...
						</h2>
					</div>
					<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
						{[1, 2, 3].map((i) => (
							<DynamicCard
								key={i}
								sections={{}}
								className="flex animate-pulse flex-col"
							/>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className={`py-20 ${className || ""}`}>
				<div className="container mx-auto px-4">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl tracking-tight text-red-500 md:text-4xl lg:text-5xl">
							Unable to load downloads
						</h2>
						<p className="text-muted-foreground">{error}</p>
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
					{platforms.map((platform) => {
						const Icon = iconMap[platform.icon];

						const cardSections: CardSection = {
							header: {
								title: platform.name,
								description: platform.description,
							},
							body: {
								content: (
									<div className="text-muted-foreground space-y-2 text-sm">
										<div className="flex justify-between">
											<span>Version:</span>
											<span className="text-foreground font-medium">
												{formatVersion(
													platform.version,
												)}
											</span>
										</div>
										<div className="flex justify-between">
											<span>Size:</span>
											<span className="text-foreground font-medium">
												{formatFileSize(platform.size)}
											</span>
										</div>
										{platform.requirements &&
											platform.requirements.length >
												0 && (
												<div className="border-border mt-2 border-t pt-2">
													<p className="text-foreground mb-1 font-medium">
														Requirements:
													</p>
													<ul className="list-inside list-disc space-y-1">
														{platform.requirements.map(
															(req, idx) => (
																<li
																	key={idx}
																	className="text-xs">
																	{req}
																</li>
															),
														)}
													</ul>
												</div>
											)}
									</div>
								),
							},
							footer: {
								content: (
									<>
										{showVerification &&
											(platform.checksum ||
												platform.signature) && (
												<div className="text-muted-foreground mb-3 text-xs">
													{platform.checksum && (
														<p>
															SHA-256:{" "}
															{platform.checksum.substring(
																0,
																16,
															)}
															...
														</p>
													)}
													{platform.signature && (
														<p>PGP Signed: ✓</p>
													)}
												</div>
											)}
										<DynamicButton
											content={{
												text: `Download for ${platform.name || "this platform"}`,
												variant: "default",
												size: "lg",
												fullWidth: true,
												icon: "Download",
											}}
											onAction={() =>
												handleDownload(platform)
											}
										/>
									</>
								),
							},
						};

						return (
							<DynamicCard
								key={platform.id}
								sections={cardSections}
								className="flex flex-col"
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export type { PlatformInfo, PlatformGridContent };
