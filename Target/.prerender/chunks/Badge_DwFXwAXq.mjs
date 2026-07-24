import "./Base_CnqryvRS.mjs";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./Card_XrHkPAma.mjs";
import { t as DynamicButton } from "./DynamicButton_DlmoL9cj.mjs";
import { t as RichText } from "./RichText_Dlaq9vyt.mjs";
import React, { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { cva } from "class-variance-authority";
//#region Source/Component/Dynamic/DynamicCard.tsx
/**
* Dynamic Card with simplex noise integration.
* Applies StaccatoCard + StaccatoBorderShimmer + StaccatoShadowLift
* for organic hover lift and border breathing.
*/
var DynamicCard = ({ Sections, ClassName, OnClick, Style }) => {
	const { Header: HeaderSection, Body: BodySection, Footer: FooterSection } = Sections;
	return /* @__PURE__ */ jsxs(Card, {
		className: `${ClassName || ""}`,
		onClick: OnClick,
		style: {
			cursor: OnClick ? "pointer" : void 0,
			...Style || {}
		},
		children: [
			HeaderSection && /* @__PURE__ */ jsxs(CardHeader, { children: [
				HeaderSection.title && /* @__PURE__ */ jsx(CardTitle, { children: HeaderSection.title }),
				HeaderSection.content && /* @__PURE__ */ jsx("div", {
					className: "mt-2",
					children: HeaderSection.content
				}),
				HeaderSection.description && /* @__PURE__ */ jsx(CardDescription, { children: HeaderSection.description })
			] }),
			BodySection && /* @__PURE__ */ jsxs(CardContent, { children: [
				BodySection.title && /* @__PURE__ */ jsx("h3", {
					className: "mb-2 font-mono text-sm font-semibold",
					children: BodySection.title
				}),
				BodySection.description && /* @__PURE__ */ jsx("div", {
					className: "StaccatoBreath mb-4 text-muted-foreground",
					children: /* @__PURE__ */ jsx(RichText, { Text: BodySection.description })
				}),
				BodySection.content
			] }),
			FooterSection && /* @__PURE__ */ jsx(CardFooter, { children: FooterSection.content })
		]
	});
};
//#endregion
//#region Source/Component/Dynamic/DynamicPlatformGrid.tsx
/**
* DynamicPlatformGrid - download section with OS-specific cards.
*
* Auto-detects the user's platform and highlights the matching card.
* Each card shows version, file size, checksum, and direct download link.
*/
/**
* Semantic color map per platform name - maps each platform to its OS token.
* Applied as a top-border accent on each download card.
*/
var PlatformColorMap = {
	Apple: "var(--OSMacOS)",
	macOS: "var(--OSMacOS)",
	Windows: "var(--OSWindows)",
	Linux: "var(--OSLinux)"
};
/**
* Dynamic PlatformGrid component that displays download cards for each platform
* Supports fetching real download data from the Workers API
* Includes loading and error states
*/
var DynamicPlatformGrid = ({ Content, ClassName }) => {
	const { t: T } = useTranslation("download");
	const { Title, Subtitle, Platforms: ProvidedPlatforms, ShowVerification = true, OnDownload, ApiPlatform, Labels = {} } = Content;
	const { Version: VersionLabel = T("labels.version", { defaultValue: "Version:" }), Size: SizeLabel = T("labels.size", { defaultValue: "Size:" }), Requirements: RequirementsLabel = T("labels.requirements", { defaultValue: "Requirements:" }), Loading: LoadingLabel = T("labels.loading", { defaultValue: "Loading available downloads..." }), ErrorTitle: ErrorTitleLabel = T("labels.errorTitle", { defaultValue: "Could not load downloads" }), DownloadFailed: DownloadFailedLabel = T("labels.downloadFailed", { defaultValue: "Download failed. Please try again." }) } = Labels;
	const [Platforms, SetPlatforms] = useState(ProvidedPlatforms || []);
	const [Loading, SetLoading] = useState(!ProvidedPlatforms);
	const [ErrorMessage, SetErrorMessage] = useState(null);
	useEffect(() => {
		if (ProvidedPlatforms) {
			SetPlatforms(ProvidedPlatforms);
			return;
		}
		const FetchPlatforms = async () => {
			try {
				SetLoading(true);
				SetErrorMessage(null);
				const { GetWorkersClient } = await import("./WorkerClient_CUVA_0YJ.mjs");
				const Response = await GetWorkersClient().Download.GetLatest(ApiPlatform);
				if (!Response.success || !Response.data) throw new Error(Response.error || "Failed to fetch latest download");
				const Latest = Response.data;
				const CurrentPlatform = [];
				const FormatBytes = (Bytes) => {
					return `${(Bytes / (1024 * 1024)).toFixed(1)} MB`;
				};
				if (Latest.platform === "macos") CurrentPlatform.push({
					Id: Latest.id,
					Name: "Apple",
					Icon: "Apple",
					Description: "Universal Binary",
					Version: Latest.version,
					Size: Latest.fileSize ? FormatBytes(Latest.fileSize) : "45.2 MB",
					Checksum: Latest.sha256,
					...Latest.pgpSignature ? { Signature: Latest.pgpSignature } : {},
					Requirements: [
						"macOS 11.0 (Big Sur) or later",
						"4 GB RAM",
						"500 MB disk space"
					]
				});
				else if (Latest.platform === "windows") CurrentPlatform.push({
					Id: Latest.id,
					Name: "Windows",
					Icon: "Monitor",
					Description: "64-bit (x64)",
					Version: Latest.version,
					Size: Latest.fileSize ? FormatBytes(Latest.fileSize) : "48.7 MB",
					Checksum: Latest.sha256,
					...Latest.pgpSignature ? { Signature: Latest.pgpSignature } : {},
					Requirements: [
						"Windows 10 or later (64-bit)",
						"4 GB RAM",
						"500 MB disk space"
					]
				});
				else if (Latest.platform === "linux") CurrentPlatform.push({
					Id: Latest.id,
					Name: "Linux",
					Icon: "Terminal",
					Description: "DEB, RPM, AppImage",
					Version: Latest.version,
					Size: Latest.fileSize ? FormatBytes(Latest.fileSize) : "41.3 MB",
					Checksum: Latest.sha256,
					...Latest.pgpSignature ? { Signature: Latest.pgpSignature } : {},
					Requirements: [
						"glibc 2.28+",
						"4 GB RAM",
						"500 MB disk space"
					]
				});
				SetPlatforms(CurrentPlatform);
			} catch (FetchError) {
				SetErrorMessage(FetchError instanceof Error ? FetchError.message : "Failed to load downloads");
				console.error("Failed to fetch platform data:", FetchError);
			} finally {
				SetLoading(false);
			}
		};
		FetchPlatforms();
	}, [ProvidedPlatforms, ApiPlatform]);
	const GridReference = useRef(null);
	useEffect(() => {
		if (!GridReference.current || Loading) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ApplyScatter = async () => {
			(await (await import("./Attention_zLx5VfOw.mjs")).default).ApplyToSelector(".PlatformCard", 5, 3);
		};
		ApplyScatter();
	}, [Platforms, Loading]);
	const FormatFileSize = (SizeString) => {
		return SizeString;
	};
	const FormatVersion = (Version) => {
		return Version.startsWith("v") ? Version : `v${Version}`;
	};
	const HandleDownload = async (Platform) => {
		try {
			const { GetWorkersClient } = await import("./WorkerClient_CUVA_0YJ.mjs");
			const Workers = GetWorkersClient();
			const InfoResponse = await Workers.Download.GetInfo(Platform.Id);
			if (!InfoResponse.success || !InfoResponse.data) throw new Error(InfoResponse.error || "Failed to get download info");
			window.open(InfoResponse.data.downloadUrl, "_blank");
			await Workers.Download.TrackDownload(Platform.Id);
			OnDownload?.(Platform);
		} catch (DownloadError) {
			console.error("Download failed:", DownloadError);
			console.warn(DownloadFailedLabel);
		}
	};
	if (Loading) return /* @__PURE__ */ jsx("section", {
		className: `py-20 ${ClassName || ""}`,
		"aria-label": "Downloads",
		"aria-busy": "true",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto px-4",
			children: [/* @__PURE__ */ jsx("div", {
				className: "mb-16 text-center",
				role: "status",
				"aria-live": "polite",
				children: /* @__PURE__ */ jsx("h2", {
					className: "mb-4 font-serif text-4xl font-normal md:text-5xl lg:text-6xl",
					children: LoadingLabel
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3",
				children: [
					1,
					2,
					3
				].map((Index) => /* @__PURE__ */ jsx(DynamicCard, {
					Sections: {},
					ClassName: "animate-pulse"
				}, Index))
			})]
		})
	});
	if (ErrorMessage) return /* @__PURE__ */ jsx("section", {
		className: `py-20 ${ClassName || ""}`,
		"aria-label": "Downloads",
		children: /* @__PURE__ */ jsx("div", {
			className: "container mx-auto px-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mb-16 text-center",
				role: "alert",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "mb-4 font-serif text-4xl font-normal text-red-500 md:text-5xl lg:text-6xl",
					children: ErrorTitleLabel
				}), /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground",
					children: ErrorMessage
				})]
			})
		})
	});
	return /* @__PURE__ */ jsx("section", {
		id: "download",
		"aria-label": "Downloads",
		className: `w-full py-16 sm:py-20 ${ClassName || ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto px-4",
			children: [(Title || Subtitle) && /* @__PURE__ */ jsxs("div", {
				className: "mx-auto mb-10 max-w-2xl text-center",
				children: [
					/* @__PURE__ */ jsxs("p", {
						className: "mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-grpc",
								children: "//"
							}),
							" ",
							"Download"
						]
					}),
					Title && /* @__PURE__ */ jsx("h2", {
						className: "font-serif text-4xl font-normal tracking-tight sm:text-5xl",
						children: Title
					}),
					Subtitle && /* @__PURE__ */ jsx("div", {
						className: "mt-3 text-muted",
						children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle })
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				ref: GridReference,
				className: "mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3",
				children: Platforms.map((Platform) => {
					const HasVerification = ShowVerification && (Platform.Checksum || Platform.Signature);
					return /* @__PURE__ */ jsx(DynamicCard, {
						Sections: {
							Header: {
								title: Platform.Name,
								description: Platform.Description,
								content: /* @__PURE__ */ jsx("div", {
									className: "mt-3",
									children: /* @__PURE__ */ jsx(DynamicButton, {
										Content: {
											Text: T("labels.downloadFor", {
												defaultValue: "Download for {{platform}}",
												platform: Platform.Name || "this platform"
											}),
											Variant: "default",
											Size: "lg",
											FullWidth: true,
											Icon: "Download"
										},
										OnAction: () => HandleDownload(Platform)
									})
								})
							},
							Body: { content: /* @__PURE__ */ jsxs("div", {
								className: "space-y-2 font-mono text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsx("span", { children: VersionLabel }), /* @__PURE__ */ jsx("span", {
											className: "font-medium text-foreground",
											children: FormatVersion(Platform.Version)
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsx("span", { children: SizeLabel }), /* @__PURE__ */ jsx("span", {
											className: "font-medium text-foreground",
											children: FormatFileSize(Platform.Size)
										})]
									}),
									Platform.Requirements && Platform.Requirements.length > 0 && /* @__PURE__ */ jsxs("div", {
										className: "mt-2 border-t border-border pt-2",
										children: [/* @__PURE__ */ jsx("p", {
											className: "mb-1 font-medium text-foreground",
											children: RequirementsLabel
										}), /* @__PURE__ */ jsx("ul", {
											className: "list-inside list-disc space-y-1",
											children: Platform.Requirements.map((Requirement, RequirementIndex) => /* @__PURE__ */ jsx("li", {
												className: "",
												children: Requirement
											}, RequirementIndex))
										})]
									})
								]
							}) },
							...HasVerification ? { Footer: { content: /* @__PURE__ */ jsxs("div", {
								className: "font-mono text-xs text-muted-foreground",
								children: [Platform.Checksum && /* @__PURE__ */ jsxs("p", { children: [
									"SHA-256:",
									" ",
									Platform.Checksum.substring(0, 16),
									"..."
								] }), Platform.Signature && /* @__PURE__ */ jsx("p", { children: "Signature: available" })]
							}) } } : {}
						},
						ClassName: "PlatformCard flex flex-col",
						Style: {
							"--jelly-color-border-default": PlatformColorMap[Platform.Name] ?? "var(--PlatformDesktop)",
							"--jelly-fill": "var(--Card)",
							"--jelly-radius": "0",
							"--jelly-card-padding-block": "0",
							"--jelly-card-padding-inline": "0",
							"--jelly-card-font-size": "inherit"
						}
					});
				})
			})]
		})
	});
};
cva("inline-flex items-center rounded-none border px-4 py-1.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--Ring)] focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-fg hover:opacity-80",
		secondary: "border-transparent bg-secondary text-secondary-fg hover:opacity-80",
		destructive: "border-transparent bg-destruct text-destruct-fg hover:opacity-80",
		outline: "text-fg"
	} },
	defaultVariants: { variant: "default" }
});
var JellyBadgeVariant = {
	default: {
		variant: "graphite",
		fill: "var(--Primary)",
		label: "var(--PrimaryForeground)"
	},
	secondary: {
		variant: "platinum",
		fill: "var(--Secondary)",
		label: "var(--SecondaryForeground)"
	},
	destructive: {
		variant: "rose",
		fill: "var(--Destruct)",
		label: "var(--DestructForeground)"
	},
	outline: {
		variant: "platinum",
		fill: "transparent",
		label: "var(--Foreground)"
	}
};
var Badge = React.forwardRef(({ className, variant = "default", children, ...props }, ref) => {
	const jelly = JellyBadgeVariant[variant];
	return /* @__PURE__ */ jsx("jelly-badge", {
		ref,
		variant: jelly.variant,
		shape: "square",
		outline: variant === "outline" ? true : void 0,
		className,
		style: {
			"--jelly-fill": jelly.fill,
			"--jelly-label": jelly.label,
			"--jelly-badge-radius": "0px",
			"--jelly-badge-font-size": "inherit",
			"--jelly-color-border-default": variant === "outline" ? "var(--Border)" : "transparent"
		},
		...props,
		children
	});
});
Badge.displayName = "Badge";
//#endregion
export { DynamicPlatformGrid as n, Badge as t };
