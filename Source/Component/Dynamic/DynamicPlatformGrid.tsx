import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton";
import { DynamicCard } from "./DynamicCard";
import type PlatformInformation from "./Interface/Information/Platform.js";
import type Property from "./Interface/Property/Grid/Platform.js";
import type CardSection from "./Interface/Section/Card.js";

/**
 * Semantic color map per platform name — maps each platform to its OS token.
 * Applied as a top-border accent on each download card.
 */
const PlatformColorMap: Record<string, string> = {
	Apple: "var(--OSMacOS)",
	macOS: "var(--OSMacOS)",
	Windows: "var(--OSWindows)",
	Linux: "var(--OSLinux)",
};

/**
 * Dynamic PlatformGrid component that displays download cards for each platform
 * Supports fetching real download data from the Workers API
 * Includes loading and error states
 */
const DynamicPlatformGrid = ({ content, className }: Property) => {
	const { t: T } = useTranslation("download");
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
		version: VersionLabel = T("labels.version", {
			defaultValue: "Version:",
		}),
		size: SizeLabel = T("labels.size", { defaultValue: "Size:" }),
		requirements: RequirementsLabel = T("labels.requirements", {
			defaultValue: "Requirements:",
		}),
		loading: LoadingLabel = T("labels.loading", {
			defaultValue: "Loading downloads...",
		}),
		errorTitle: ErrorTitleLabel = T("labels.errorTitle", {
			defaultValue: "Unable to load downloads",
		}),
		downloadFailed: DownloadFailedLabel = T("labels.downloadFailed", {
			defaultValue: "Download failed. Please try again.",
		}),
	} = labels;

	const [Platforms, SetPlatforms] = useState<PlatformInformation[]>(
		providedPlatforms || [],
	);
	const [Loading, SetLoading] = useState(!providedPlatforms);
	const [ErrorMessage, SetErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		if (providedPlatforms) {
			SetPlatforms(providedPlatforms);
			return;
		}

		const FetchPlatforms = async () => {
			try {
				SetLoading(true);
				SetErrorMessage(null);

				// Import workers client directly for platform data
				const { GetWorkersClient } =
					await import("../../Library/WorkerClient");
				const Workers = GetWorkersClient();
				const Response = await Workers.Download.GetLatest(apiPlatform);
				if (!Response.success || !Response.data) {
					throw new Error(
						Response.error || "Failed to fetch latest download",
					);
				}
				const Latest = Response.data;
				const CurrentPlatform: PlatformInformation[] = [];

				const FormatBytes = (Bytes: number): string => {
					const MB = Bytes / (1024 * 1024);
					return `${MB.toFixed(1)} MB`;
				};

				if (Latest.platform === "macos") {
					CurrentPlatform.push({
						id: Latest.id,
						name: "Apple",
						icon: "Apple",
						description: "Universal Binary",
						version: Latest.version,
						size: Latest.fileSize
							? FormatBytes(Latest.fileSize)
							: "45.2 MB",
						checksum: Latest.sha256,
						...(Latest.pgpSignature
							? { signature: Latest.pgpSignature }
							: {}),
						requirements: [
							"macOS 11.0 (Big Sur) or later",
							"4 GB RAM",
							"500 MB disk space",
						],
					});
				} else if (Latest.platform === "windows") {
					CurrentPlatform.push({
						id: Latest.id,
						name: "Windows",
						icon: "Monitor",
						description: "64-bit (x64)",
						version: Latest.version,
						size: Latest.fileSize
							? FormatBytes(Latest.fileSize)
							: "48.7 MB",
						checksum: Latest.sha256,
						...(Latest.pgpSignature
							? { signature: Latest.pgpSignature }
							: {}),
						requirements: [
							"Windows 10 or later (64-bit)",
							"4 GB RAM",
							"500 MB disk space",
						],
					});
				} else if (Latest.platform === "linux") {
					CurrentPlatform.push({
						id: Latest.id,
						name: "Linux",
						icon: "Terminal",
						description: "DEB, RPM, AppImage",
						version: Latest.version,
						size: Latest.fileSize
							? FormatBytes(Latest.fileSize)
							: "41.3 MB",
						checksum: Latest.sha256,
						...(Latest.pgpSignature
							? { signature: Latest.pgpSignature }
							: {}),
						requirements: [
							"glibc 2.28+",
							"4 GB RAM",
							"500 MB disk space",
						],
					});
				}

				SetPlatforms(CurrentPlatform);
			} catch (FetchError) {
				SetErrorMessage(
					FetchError instanceof Error
						? FetchError.message
						: "Failed to load downloads",
				);
				console.error("Failed to fetch platform data:", FetchError);
			} finally {
				SetLoading(false);
			}
		};

		FetchPlatforms();
	}, [providedPlatforms, apiPlatform]);

	const GridReference = useRef<HTMLDivElement>(null);

	// Apply attention scatter to platform download cards
	useEffect(() => {
		const Grid = GridReference.current;
		if (!Grid || Loading) return;

		const ReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (ReducedMotion) return;

		const ApplyScatter = async () => {
			const AttentionModule =
				await import("../../Function/Noise/Attention.js");
			const Attention = await AttentionModule.default;
			Attention.ApplyToSelector(".PlatformCard", 5, 3);
		};

		ApplyScatter();
	}, [Platforms, Loading]);

	const FormatFileSize = (SizeString: string) => {
		return SizeString;
	};

	const FormatVersion = (Version: string) => {
		return Version.startsWith("v") ? Version : `v${Version}`;
	};

	const HandleDownload = async (Platform: PlatformInformation) => {
		try {
			// Use workers client directly
			const { GetWorkersClient } =
				await import("../../Library/WorkerClient");
			const Workers = GetWorkersClient();
			const InfoResponse = await Workers.Download.GetInfo(Platform.id);
			if (!InfoResponse.success || !InfoResponse.data) {
				throw new Error(
					InfoResponse.error || "Failed to get download info",
				);
			}
			window.open(InfoResponse.data.downloadUrl, "_blank");
			await Workers.Download.TrackDownload(Platform.id);
			onDownload?.(Platform);
		} catch (DownloadError) {
			console.error("Download failed:", DownloadError);
			console.warn(DownloadFailedLabel);
		}
	};

	if (Loading) {
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
							{LoadingLabel}
						</h2>
					</div>
					<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
						{[1, 2, 3].map((Index) => (
							<DynamicCard
								key={Index}
								sections={{}}
								className="flex animate-pulse flex-col"
							/>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (ErrorMessage) {
		return (
			<section
				className={`py-20 ${className || ""}`}
				aria-label="Downloads">
				<div className="container mx-auto px-4">
					<div className="mb-16 text-center" role="alert">
						<h2 className="mb-4 text-3xl tracking-tight text-red-500 md:text-4xl lg:text-5xl">
							{ErrorTitleLabel}
						</h2>
						<p className="text-muted-foreground">{ErrorMessage}</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id="download"
			aria-label="Downloads"
			className={`flex min-h-[100dvh] w-full flex-col justify-center py-16 ${className || ""}`}>
			<div className="container mx-auto px-4">
				{(title || subtitle) && (
					<div className="StaccatoBreath mb-16 text-center">
						{title && (
							<h2 className="mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl">
								{title}
							</h2>
						)}
						{subtitle && (
							<p className="mx-auto max-w-2xl text-lg text-muted-foreground whitespace-pre-line">
								{subtitle}
							</p>
						)}
					</div>
				)}

				<div
					ref={GridReference}
					className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
					{Platforms.map((Platform) => {
						const HasVerification =
							showVerification &&
							(Platform.checksum || Platform.signature);

						const PlatformCardSection: CardSection = {
							header: {
								title: Platform.name,
								description: Platform.description,
								content: (
									<div className="mt-3">
										<DynamicButton
											content={{
												text: T("labels.downloadFor", {
													defaultValue:
														"Download for {{platform}}",
													platform:
														Platform.name ||
														"this platform",
												}),
												variant: "default",
												size: "lg",
												fullWidth: true,
												icon: "Download",
											}}
											onAction={() =>
												HandleDownload(Platform)
											}
										/>
									</div>
								),
							},
							body: {
								content: (
									<div className="space-y-2 text-sm text-muted-foreground">
										<div className="flex justify-between">
											<span>{VersionLabel}</span>
											<span className="font-medium text-foreground">
												{FormatVersion(
													Platform.version,
												)}
											</span>
										</div>
										<div className="flex justify-between">
											<span>{SizeLabel}</span>
											<span className="font-medium text-foreground">
												{FormatFileSize(Platform.size)}
											</span>
										</div>
										{Platform.requirements &&
											Platform.requirements.length >
												0 && (
												<div className="mt-2 border-t border-border pt-2">
													<p className="mb-1 font-medium text-foreground">
														{RequirementsLabel}
													</p>
													<ul className="list-inside list-disc space-y-1">
														{Platform.requirements.map(
															(
																Requirement,
																RequirementIndex,
															) => (
																<li
																	key={
																		RequirementIndex
																	}
																	className="text-xs">
																	{
																		Requirement
																	}
																</li>
															),
														)}
													</ul>
												</div>
											)}
									</div>
								),
							},
							...(HasVerification
								? {
										footer: {
											content: (
												<div className="text-xs text-muted-foreground">
													{Platform.checksum && (
														<p>
															SHA-256:{" "}
															{Platform.checksum.substring(
																0,
																16,
															)}
															...
														</p>
													)}
													{Platform.signature && (
														<p>PGP Signed: ✓</p>
													)}
												</div>
											),
										},
									}
								: {}),
						};

						const PlatformAccentColor =
							PlatformColorMap[Platform.name] ??
							"var(--PlatformDesktop)";

						return (
							<div
								key={Platform.id}
								style={{ borderTopColor: PlatformAccentColor, borderTopWidth: "2px", borderTopStyle: "solid" }}>
								<DynamicCard
									sections={PlatformCardSection}
									className="PlatformCard flex flex-col"
								/>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export { DynamicPlatformGrid };

export default DynamicPlatformGrid;
