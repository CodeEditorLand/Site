import { Apple, Monitor, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { DynamicButton } from "./DynamicButton";
import { DynamicCard } from "./DynamicCard";
import type CardSection from "./Interface/Section/Card.js";
import type PlatformInformation from "./Interface/Information/Platform.js";
import type Property from "./Interface/Property/Grid/Platform.js";

/**
 * Dynamic PlatformGrid component that displays download cards for each platform
 * Supports fetching real download data from the Workers API
 * Includes loading and error states
 */
export function DynamicPlatformGrid({
	content,
	className,
}: Property) {
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

				if (Latest.platform === "macos") {
					CurrentPlatform.push({
						id: Latest.id,
						name: "Apple",
						icon: "Apple",
						description: "Universal Binary",
						version: Latest.version,
						size: Latest.size || "45.2 MB",
						checksum: Latest.checksum,
						signature: Latest.signature,
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
						size: Latest.size || "48.7 MB",
						checksum: Latest.checksum,
						signature: Latest.signature,
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
						size: Latest.size || "41.3 MB",
						checksum: Latest.checksum,
						signature: Latest.signature,
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

	const IconMap = {
		Apple,
		Monitor,
		Terminal,
	};

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
					{Platforms.map((Platform) => {
						const Icon = IconMap[Platform.icon];

						const PlatformCardSection: CardSection = {
							header: {
								title: Platform.name,
								description: Platform.description,
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
															(Requirement, RequirementIndex) => (
																<li
																	key={RequirementIndex}
																	className="text-xs">
																	{Requirement}
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
											(Platform.checksum ||
												Platform.signature) && (
												<div className="mb-3 text-xs text-muted-foreground">
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
											)}
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
									</>
								),
							},
						};

						return (
							<DynamicCard
								key={Platform.id}
								sections={PlatformCardSection}
								className="flex flex-col"
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}
