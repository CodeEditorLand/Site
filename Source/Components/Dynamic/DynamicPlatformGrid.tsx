import { Apple, Monitor, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton";
import { DynamicCard } from "./DynamicCard";
import type CardSection from "./Interface/Section/Card.js";
import type PlatformInformation from "./Interface/Information/Platform.js";

interface PlatformGridLabels {
	version?: string;
	size?: string;
	requirements?: string;
	loading?: string;
	errorTitle?: string;
	downloadFailed?: string;
}

interface PlatformGridContent {
	title?: string;
	subtitle?: string;
	platforms?: PlatformInformation[];
	showVerification?: boolean;
	onDownload?: (platform: PlatformInformation) => void;
	apiPlatform?: "macos" | "windows" | "linux";
	labels?: PlatformGridLabels;
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
	const { t } = useTranslation("download");
	const {
		title,
		subtitle,
		platforms: providedPlatforms,
		showVerification = true,
		onDownload,
		apiPlatform,
		labels = {},
	} = content;
	const {
		version: versionLabel = t("labels.version", {
			defaultValue: "Version:",
		}),
		size: sizeLabel = t("labels.size", { defaultValue: "Size:" }),
		requirements: requirementsLabel = t("labels.requirements", {
			defaultValue: "Requirements:",
		}),
		loading: loadingLabel = t("labels.loading", {
			defaultValue: "Loading downloads...",
		}),
		errorTitle: errorTitleLabel = t("labels.errorTitle", {
			defaultValue: "Unable to load downloads",
		}),
		downloadFailed: downloadFailedLabel = t("labels.downloadFailed", {
			defaultValue: "Download failed. Please try again.",
		}),
	} = labels;

	const [platforms, setPlatforms] = useState<PlatformInformation[]>(
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
				const currentPlatforms: PlatformInformation[] = [];

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

	const handleDownload = async (platform: PlatformInformation) => {
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
			console.warn(downloadFailedLabel);
		}
	};

	if (loading) {
		return (
			<section
				className={`py-20 ${className || ""}`}
				aria-label="Downloads"
				aria-busy="true">
				<div className="container mx-auto px-4">
					<div
						className="mb-16 text-center"
						role="status"
						aria-live="polite">
						<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
							{loadingLabel}
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
			<section
				className={`py-20 ${className || ""}`}
				aria-label="Downloads">
				<div className="container mx-auto px-4">
					<div className="mb-16 text-center" role="alert">
						<h2 className="mb-4 text-3xl tracking-tight text-red-500 md:text-4xl lg:text-5xl">
							{errorTitleLabel}
						</h2>
						<p className="text-muted-foreground">{error}</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id="download"
			aria-label="Downloads"
			className={`py-20 ${className || ""}`}>
			<div className="container mx-auto px-4">
				{(title || subtitle) && (
					<div className="mb-16 text-center">
						{title && (
							<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
								{title}
							</h2>
						)}
						{subtitle && (
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
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
									<div className="space-y-2 text-sm text-muted-foreground">
										<div className="flex justify-between">
											<span>{versionLabel}</span>
											<span className="font-medium text-foreground">
												{formatVersion(
													platform.version,
												)}
											</span>
										</div>
										<div className="flex justify-between">
											<span>{sizeLabel}</span>
											<span className="font-medium text-foreground">
												{formatFileSize(platform.size)}
											</span>
										</div>
										{platform.requirements &&
											platform.requirements.length >
												0 && (
												<div className="mt-2 border-t border-border pt-2">
													<p className="mb-1 font-medium text-foreground">
														{requirementsLabel}
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
												<div className="mb-3 text-xs text-muted-foreground">
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
												text: t("labels.downloadFor", {
													defaultValue:
														"Download for {{platform}}",
													platform:
														platform.name ||
														"this platform",
												}),
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

export type { PlatformInformation, PlatformGridContent };
