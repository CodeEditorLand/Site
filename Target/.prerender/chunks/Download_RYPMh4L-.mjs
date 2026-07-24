import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_CE33w8TD.mjs";
import { t as createComponent } from "./astro-component_CRWsstEh.mjs";
import { a as cn, i as IconTooltip, n as GetI18n, r as ErrorBoundary, t as $$Base } from "./Base_COJ4buS_.mjs";
import "./Map_Bsl_SrZK.mjs";
import { t as Header } from "./Header_D8R5Cezc.mjs";
import { t as DynamicButton } from "./DynamicButton_BcHuxWSZ.mjs";
import { n as SkeletonCard } from "./Skeleton_BrbbDpt2.mjs";
import { t as RichText } from "./RichText_AAmKU29I.mjs";
import { n as DynamicPlatformGrid, t as Badge } from "./Badge_BTg2m8Z2.mjs";
import { useEffect, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import * as lucide from "lucide-react";
import { Download, Fingerprint, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
//#region Source/Component/UI/Table.tsx
function Table({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ jsx("table", {
			"data-slot": "table",
			className: cn("w-full caption-bottom", className),
			...props
		})
	});
}
function TableHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("thead", {
		"data-slot": "table-header",
		className: cn("[&_tr]:border-b-[3px]", className),
		...props
	});
}
function TableBody({ className, ...props }) {
	return /* @__PURE__ */ jsx("tbody", {
		"data-slot": "table-body",
		className: cn("[&_tr:last-child]:border-0", className),
		...props
	});
}
function TableRow({ className, ...props }) {
	return /* @__PURE__ */ jsx("tr", {
		"data-slot": "table-row",
		className: cn("hover:bg-muted/50 border-b transition-colors data-[state=selected]:bg-muted", className),
		...props
	});
}
function TableHead({ className, ...props }) {
	return /* @__PURE__ */ jsx("th", {
		"data-slot": "table-head",
		className: cn("h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
		...props
	});
}
function TableCell({ className, ...props }) {
	return /* @__PURE__ */ jsx("td", {
		"data-slot": "table-cell",
		className: cn("whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
		...props
	});
}
//#endregion
//#region Source/Component/Dynamic/DynamicTable.tsx
/**
* Dynamic Table component that accepts content schema
* Composes Table compound components based on columns and data
*/
var DynamicTable = ({ Content }) => {
	const { Columns: ColumnList, Data: DataList, Striped = false, Hoverable = false, Bordered: _Bordered = true, Compact: _Compact = false, OnRowClick, ClassName } = Content;
	return /* @__PURE__ */ jsx("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ jsxs(Table, {
			className: ClassName,
			children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsx(TableRow, { children: ColumnList.map((Column, Index) => /* @__PURE__ */ jsx(TableHead, {
				className: Column.ClassName,
				children: Column.Header
			}, Index)) }) }), /* @__PURE__ */ jsx(TableBody, { children: DataList.map((Row, RowIndex) => /* @__PURE__ */ jsx(TableRow, {
				className: ` ${Striped && RowIndex % 2 === 1 ? "bg-muted/50" : ""} ${Hoverable ? "hover:bg-muted/50" : ""} ${OnRowClick ? "cursor-pointer" : ""} `,
				onClick: () => OnRowClick?.(Row),
				children: ColumnList.map((Column, ColumnIndex) => /* @__PURE__ */ jsx(TableCell, {
					className: Column.ClassName,
					children: Column.Render ? Column.Render(Row[Column.Key], Row) : String(Row[Column.Key] ?? "")
				}, ColumnIndex))
			}, RowIndex)) })]
		})
	});
};
//#endregion
//#region Source/Component/Dynamic/DynamicPreviousReleases.tsx
var DynamicPreviousReleases = ({ Content, ClassName }) => {
	const { Title, Description, Releases, ShowChangelog = true } = Content;
	const SectionReference = useRef(null);
	useEffect(() => {
		const Section = SectionReference.current;
		if (!Section) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ApplyScatter = async () => {
			(await (await import("./Staccato_CIruj3za.mjs")).default).SeedElement(Section, 0);
		};
		ApplyScatter();
	}, []);
	return /* @__PURE__ */ jsx("section", {
		ref: SectionReference,
		className: `py-20 ${ClassName || ""}`,
		"aria-label": "Previous releases",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto px-4",
			children: [(Title || Description) && /* @__PURE__ */ jsxs("div", {
				className: "mb-16 text-center",
				children: [Title && /* @__PURE__ */ jsx("h2", {
					className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl",
					children: Title
				}), Description && /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-2xl text-lg text-muted-foreground",
					children: /* @__PURE__ */ jsx(RichText, { Text: Description })
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "StaccatoCard StaccatoBorderShimmer mx-auto max-w-5xl overflow-hidden flat bg-card",
				children: /* @__PURE__ */ jsx(DynamicTable, { Content: {
					Columns: [
						{
							Key: "Version",
							Header: "Version",
							Render: (Value, _Row) => /* @__PURE__ */ jsx("span", {
								className: "font-semibold text-primary",
								children: String(Value)
							})
						},
						{
							Key: "PublishedAt",
							Header: "Published",
							Render: (Value) => /* @__PURE__ */ jsx("time", {
								dateTime: String(Value),
								children: new Date(String(Value)).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric"
								})
							})
						},
						{
							Key: "Size",
							Header: "Size",
							Render: (Value) => /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: String(Value)
							})
						},
						{
							Key: "Downloads",
							Header: "Downloads",
							Render: (Value) => /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: Value.toLocaleString()
							})
						},
						{
							Key: "actions",
							Header: "",
							Render: (_Value, Row) => /* @__PURE__ */ jsxs("div", {
								className: "flex gap-2",
								children: [Row.Assets.map((Asset) => /* @__PURE__ */ jsx(DynamicButton, {
									Content: {
										Text: Asset.Platform,
										Variant: "outline",
										Size: "sm",
										Icon: Asset.Platform === "macOS" ? "Apple" : Asset.Platform === "Windows" ? "Monitor" : "Terminal"
									},
									OnAction: () => Content.OnDownload?.(Row.Version, Asset.Platform)
								}, Asset.Platform)), ShowChangelog && Row.Changelog && /* @__PURE__ */ jsx(DynamicButton, {
									Content: {
										Text: "Changelog",
										Variant: "ghost",
										Size: "sm"
									},
									OnAction: () => Content.OnViewChangelog?.(Row.Version)
								})]
							})
						}
					],
					Data: Releases,
					Striped: true,
					Hoverable: true,
					Bordered: false,
					Compact: false
				} })
			})]
		})
	});
};
//#endregion
//#region Source/Component/Dynamic/DynamicSystemRequirements.tsx
/**
* Dynamic SystemRequirements component for displaying platform requirements
* Shows minimum and recommended specs in Card format
*/
var DynamicSystemRequirements = ({ Content, ClassName }) => {
	const { t: T } = useTranslation("download");
	const { Title, Description, Requirements } = Content;
	const GridReference = useRef(null);
	useEffect(() => {
		const Grid = GridReference.current;
		if (!Grid) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ApplyScatter = async () => {
			const Attention = await (await import("./Attention_zLx5VfOw.mjs")).default;
			Grid.querySelectorAll(".StaccatoCard").forEach((Card, Index) => {
				Attention.ApplyToElement(Card, Index, 4, 3);
			});
		};
		ApplyScatter();
	}, [Requirements]);
	const RequirementList = ({ items: ItemList, variant: Variant = "minimum" }) => /* @__PURE__ */ jsx("div", {
		className: "space-y-3",
		children: ItemList.map((Requirement) => /* @__PURE__ */ jsxs("div", {
			className: "flex items-start",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex-1",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "font-medium",
							children: [Requirement.Label, ":"]
						}),
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: Requirement.Value
						})
					]
				}),
				" ",
				/* @__PURE__ */ jsx("div", {
					className: "mt-1 shrink-0",
					children: Variant === "minimum" ? /* @__PURE__ */ jsx(IconTooltip, {
						Label: "Your code runs at native CPU speed",
						Icon: lucide.Cpu,
						Color: "var(--PlatformDesktopFore)",
						SizeClass: "h-4 w-4"
					}) : /* @__PURE__ */ jsx(IconTooltip, {
						Label: "Span your work across every monitor",
						Icon: lucide.Monitor,
						Color: "var(--PlatformDesktopFore)",
						SizeClass: "h-4 w-4"
					})
				})
			]
		}, Requirement.Id))
	});
	return /* @__PURE__ */ jsx("section", {
		className: `py-20 ${ClassName || ""}`,
		"aria-label": "System requirements",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto px-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-16 text-center",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl",
						children: Title
					}), Description && /* @__PURE__ */ jsx("div", {
						className: "mx-auto max-w-2xl text-lg text-muted-foreground",
						children: /* @__PURE__ */ jsx(RichText, { Text: Description })
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					ref: GridReference,
					className: "mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "StaccatoCard StaccatoBorderShimmer flat bg-card p-6",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "mb-6 font-mono text-sm font-semibold",
							children: T("systemRequirements.minimum", "Minimum Requirements")
						}), /* @__PURE__ */ jsx(RequirementList, {
							items: Requirements.Minimum,
							variant: "minimum"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "StaccatoCard StaccatoBorderShimmer flat border border-primary bg-card p-6",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "mb-6 font-mono text-sm font-semibold",
							children: T("systemRequirements.recommended", "Recommended for the Best Experience")
						}), /* @__PURE__ */ jsx(RequirementList, {
							items: Requirements.Recommended,
							variant: "recommended"
						})]
					})]
				}),
				Content.Os && Content.Os.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "mt-12 text-center",
					children: [/* @__PURE__ */ jsx("h4", {
						className: "mb-4 font-mono text-sm font-semibold",
						children: T("systemRequirements.supportedOS", "Supported Operating Systems")
					}), /* @__PURE__ */ jsx("div", {
						className: "flex flex-wrap justify-center gap-4",
						children: Content.Os.map((OperatingSystem, Index) => /* @__PURE__ */ jsx("span", {
							className: "bg-secondary px-4 py-2 font-medium",
							children: OperatingSystem
						}, Index))
					})]
				})
			]
		})
	});
};
//#endregion
//#region Source/Component/Dynamic/DynamicVerificationInfo.tsx
/**
* Dynamic VerificationInfo component for displaying binary verification info
* Shows SHA-256 checksums and release signatures with copy functionality
*/
var DynamicVerificationInfo = ({ Content, OnVerify, ClassName }) => {
	const { t: T } = useTranslation("download");
	const { Title, Description, DownloadVerification, IntegrityVerification } = Content;
	const CopyToClipboard = (Text, Label) => {
		navigator.clipboard.writeText(Text).then(() => {
			alert(T("labels.copiedToClipboard", {
				defaultValue: "{{label}} copied to clipboard!",
				label: Label
			}));
		}).catch(() => {
			alert(T("labels.failedToCopy", {
				defaultValue: "Failed to copy {{label}}",
				label: Label
			}));
		});
	};
	const RenderVerificationBlock = (Information, Type) => /* @__PURE__ */ jsxs("div", {
		className: "space-y-4",
		children: [
			Information.SHA256 && /* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-semibold",
							children: T("labels.sha256Checksum", { defaultValue: "SHA-256 Checksum" })
						}),
						" ",
						/* @__PURE__ */ jsx(Fingerprint, {
							className: "h-4 w-4 shrink-0 text-primary",
							"aria-hidden": "true"
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "bg-muted/50 flex items-center gap-2 p-3",
					children: [/* @__PURE__ */ jsx("code", {
						className: "flex-1 truncate font-mono",
						children: Information.SHA256
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "px-3 py-1 transition-colors hover:bg-accent",
						"aria-label": "Copy SHA-256 checksum to clipboard",
						onClick: () => CopyToClipboard(Information.SHA256, T("labels.sha256Checksum", { defaultValue: "SHA-256 checksum" })),
						children: T("labels.copy", { defaultValue: "Copy" })
					})]
				})]
			}),
			Information.PGPSignature && /* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-semibold",
								children: T("labels.pgpSignature", { defaultValue: "Release Signature" })
							}),
							" ",
							/* @__PURE__ */ jsx(Shield, {
								className: "h-4 w-4 shrink-0 text-primary",
								"aria-hidden": "true"
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-muted/50 flex items-center gap-2 p-3",
						children: [/* @__PURE__ */ jsx("code", {
							className: "flex-1 truncate font-mono",
							children: Information.PGPSignature
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "px-3 py-1 transition-colors hover:bg-accent",
							"aria-label": "Copy release signature to clipboard",
							onClick: () => CopyToClipboard(Information.PGPSignature || "", T("labels.pgpSignature", { defaultValue: "release signature" })),
							children: T("labels.copy", { defaultValue: "Copy" })
						})]
					}),
					Information.SigningKeyId && /* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground",
						children: T("labels.signedWithKeyId", {
							defaultValue: "Signed with key ID: {{keyId}}",
							keyId: Information.SigningKeyId
						})
					})
				]
			}),
			Information.VerificationInstructions && /* @__PURE__ */ jsxs("div", {
				className: "border-t border-[var(--Border)] pt-4",
				children: [/* @__PURE__ */ jsx("h5", {
					className: "mb-2 font-semibold",
					children: T("labels.verificationInstructions", { defaultValue: "Verification Instructions" })
				}), /* @__PURE__ */ jsx("div", {
					className: "text-muted-foreground",
					children: /* @__PURE__ */ jsx(RichText, { Text: Information.VerificationInstructions })
				})]
			}),
			Type === "download" && Content.DownloadButton && /* @__PURE__ */ jsx("div", {
				className: "pt-4",
				children: /* @__PURE__ */ jsx(DynamicButton, { Content: {
					...Content.DownloadButton,
					FullWidth: true
				} })
			}),
			Type === "integrity" && Content.VerifyButton && /* @__PURE__ */ jsx("div", {
				className: "pt-4",
				children: /* @__PURE__ */ jsx(DynamicButton, {
					Content: {
						...Content.VerifyButton,
						FullWidth: true
					},
					OnAction: () => OnVerify?.(IntegrityVerification.SHA256 || "")
				})
			})
		]
	});
	return /* @__PURE__ */ jsx("section", {
		className: `py-20 ${ClassName || ""}`,
		"aria-label": "Download verification",
		children: /* @__PURE__ */ jsx("div", {
			className: "container mx-auto px-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-4xl",
				children: [(Title || Description) && /* @__PURE__ */ jsxs("div", {
					className: "mb-12 text-center",
					children: [Title && /* @__PURE__ */ jsx("h2", {
						className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl",
						children: Title
					}), Description && /* @__PURE__ */ jsx("div", {
						className: "mx-auto max-w-2xl text-lg text-muted-foreground",
						children: /* @__PURE__ */ jsx(RichText, { Text: Description })
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 gap-8 md:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "StaccatoCard StaccatoBorderShimmer flat bg-card p-6",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "mb-4 flex items-center font-mono text-sm font-semibold",
							children: [
								T("labels.downloadVerification", { defaultValue: "Download Verification" }),
								" ",
								/* @__PURE__ */ jsx(Download, {
									className: "h-5 w-5 shrink-0",
									"aria-hidden": "true"
								})
							]
						}), RenderVerificationBlock(DownloadVerification, "download")]
					}), /* @__PURE__ */ jsxs("div", {
						className: "StaccatoCard StaccatoBorderShimmer flat border border-primary bg-card p-6",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "mb-4 flex items-center font-mono text-sm font-semibold",
							children: [
								T("labels.integrityCheck", { defaultValue: "Integrity Check" }),
								" ",
								/* @__PURE__ */ jsx(Shield, {
									className: "h-5 w-5 shrink-0",
									"aria-hidden": "true"
								})
							]
						}), RenderVerificationBlock(IntegrityVerification, "integrity")]
					})]
				})]
			})
		})
	});
};
//#endregion
//#region Source/Component/Dynamic/DownloadsPage.tsx
/**
* Dynamic DownloadsPage composition
* Assembles PlatformGrid, SystemRequirements, VerificationInfo, PreviousReleases
* Content driven by translations (useTranslation) or explicit props
*/
var DownloadsPage = ({ Content, ClassName }) => {
	const { t: T } = useTranslation(["download", "common"]);
	const { PlatformGrid, SystemRequirements, VerificationInfo: VerificationInformation, PreviousReleases, Header: HeaderContent } = Content || {
		PlatformGrid: {
			Title: T("download:page.title", { defaultValue: "Download Land" }),
			Subtitle: T("download:page.subtitle", { defaultValue: "Source builds are active today. Public installers, signing, and verification artifacts are still being prepared." }),
			Platforms: [],
			ShowVerification: true,
			OnDownload: async (Platform) => {
				if (Platform.Id) try {
					const { default: DownloadAPI } = await import("./Download_CLeuVBt7.mjs");
					const Information = await DownloadAPI.GetInfo(Platform.Id);
					window.open(Information.downloadUrl, "_blank");
					await DownloadAPI.TrackDownload(Platform.Id);
				} catch (DownloadError) {
					console.error("Download failed:", DownloadError);
					alert(T("download:labels.downloadFailed", { defaultValue: "Download failed. Please try again." }));
				}
			}
		},
		SystemRequirements: {
			Title: T("download:systemRequirements.title", { defaultValue: "System Requirements" }),
			Description: T("download:systemRequirements.subtitle", { defaultValue: "A quick check before you download saves a reinstall later." }),
			Requirements: {
				Minimum: [
					{
						Id: "cpu-min",
						Label: "Processor",
						Value: "Intel Core i5 or AMD Ryzen 5 / Apple Silicon"
					},
					{
						Id: "ram-min",
						Label: "Memory",
						Value: "4 GB RAM"
					},
					{
						Id: "disk-min",
						Label: "Disk Space",
						Value: "500 MB"
					}
				],
				Recommended: [
					{
						Id: "cpu-rec",
						Label: "Processor",
						Value: "Intel Core i7 or AMD Ryzen 7"
					},
					{
						Id: "ram-rec",
						Label: "Memory",
						Value: "8 GB RAM"
					},
					{
						Id: "disk-rec",
						Label: "Disk Space",
						Value: "1 GB SSD"
					}
				]
			},
			Os: [
				"macOS 11+",
				"Windows 10+",
				"Ubuntu 20.04+ / Fedora 35+ / Debian 11+"
			]
		},
		VerificationInfo: {
			Title: T("download:verification.title", { defaultValue: "Verification Will Ship With Public Releases." }),
			Description: T("download:verification.description", { defaultValue: "Release downloads will publish checksum and signature material when public installers are available." }),
			DownloadVerification: {
				SHA256: "Available at first public release",
				PGPSignature: "Available at first public release",
				SigningKeyId: "Available at first public release",
				VerificationInstructions: "Verification instructions will be published beside the installer, checksum, and signature artifacts."
			},
			IntegrityVerification: {
				SHA256: "Available at first public release",
				PGPSignature: "Available at first public release",
				VerificationInstructions: "Air contains checksum and integrity code. Public release verification material will be published with the installers."
			},
			DownloadButton: {
				Text: T("download:verification.downloadButton", { defaultValue: "View Verification Plan" }),
				Variant: "outline",
				Size: "default",
				FullWidth: false
			},
			VerifyButton: {
				Text: T("download:verification.verifyButton", { defaultValue: "Verify Download" }),
				Variant: "default",
				Size: "default",
				FullWidth: false
			}
		},
		PreviousReleases: {
			Title: T("download:previousReleases.title", { defaultValue: "Previous Releases" }),
			Description: T("download:previousReleases.description", { defaultValue: "Download an older version if you need to pin to a specific release." }),
			Releases: [],
			ShowChangelog: false
		},
		Footer: {}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: `flex min-h-screen flex-col ${ClassName || ""}`,
		children: [HeaderContent !== void 0 && /* @__PURE__ */ jsx(Header, { Content: HeaderContent }), /* @__PURE__ */ jsxs("div", {
			className: "flex-1",
			children: [
				/* @__PURE__ */ jsx(DynamicPlatformGrid, { Content: PlatformGrid }),
				/* @__PURE__ */ jsx(ErrorBoundary, {
					FallbackComponent: () => /* @__PURE__ */ jsx(SkeletonCard, {}),
					children: /* @__PURE__ */ jsx(DynamicSystemRequirements, { Content: SystemRequirements })
				}),
				/* @__PURE__ */ jsx(ErrorBoundary, {
					FallbackComponent: () => /* @__PURE__ */ jsx(SkeletonCard, {}),
					children: /* @__PURE__ */ jsx(DynamicVerificationInfo, { Content: VerificationInformation })
				}),
				/* @__PURE__ */ jsx(ErrorBoundary, {
					FallbackComponent: () => /* @__PURE__ */ jsx(SkeletonCard, {}),
					children: /* @__PURE__ */ jsx(DynamicPreviousReleases, { Content: PreviousReleases })
				})
			]
		})]
	});
};
//#endregion
//#region Source/Component/Dynamic/DynamicTransparency.tsx
/**
* DynamicTransparency - build transparency section showing SBOM,
* dependency tree, and build reproducibility information.
*
* Renders categorized items with copy-to-clipboard and expandable
* details. Content is driven by the Transparency interface.
*/
var TransparencyIconRegistry = {
	Shield: lucide.Shield,
	Eye: lucide.Eye,
	EyeOff: lucide.EyeOff,
	Lock: lucide.Lock,
	Server: lucide.Server,
	Cpu: lucide.Cpu,
	Code: lucide.Code,
	Layers: lucide.Layers,
	Zap: lucide.Zap
};
var StatusColor = {
	Active: "bg-green-500",
	Disabled: "bg-green-500",
	Optional: "bg-yellow-500",
	Recommended: "bg-blue-500"
};
var StatusBadgeVariant = {
	Active: "default",
	Disabled: "secondary",
	Optional: "outline",
	Recommended: "default"
};
var VariantStatusColor = {
	Recommended: "bg-blue-500",
	Available: "bg-green-500",
	Legacy: "bg-yellow-500",
	Experimental: "bg-purple-500",
	Development: "bg-orange-500"
};
var DynamicTransparency = ({ Content, ClassName }) => {
	const { Title, Subtitle, Policy, Variant, Strategy, MatrixPermutation, SourceURL } = Content;
	const SectionReference = useRef(null);
	useEffect(() => {
		if (!SectionReference.current) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ApplyNoise = async () => {
			(await (await import("./Staccato_CIruj3za.mjs")).default).SeedSelector(".TransparencyCard");
		};
		ApplyNoise();
	}, []);
	const GetIcon = (IconName) => {
		return TransparencyIconRegistry[IconName] || null;
	};
	return /* @__PURE__ */ jsx("section", {
		id: "Transparency",
		"aria-label": "Build Transparency",
		className: `w-full py-20 ${ClassName || ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto px-4",
			children: [
				(Title || Subtitle) && /* @__PURE__ */ jsxs("div", {
					className: "StaccatoBreath mb-16 text-center",
					children: [Title && /* @__PURE__ */ jsx("h2", {
						className: "mb-4 text-3xl tracking-tight md:text-4xl lg:text-5xl",
						children: Title
					}), Subtitle && /* @__PURE__ */ jsx("div", {
						className: "mx-auto max-w-3xl text-lg text-muted-foreground",
						children: /* @__PURE__ */ jsx(RichText, { Text: Subtitle })
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-16",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "mb-2 text-2xl tracking-tight",
							children: "Telemetry Policy"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mb-8 text-muted-foreground",
							children: "Full disclosure on what Land collects - and what it does not."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
							children: Policy.map((Item) => {
								const Icon = GetIcon(Item.Icon);
								return /* @__PURE__ */ jsxs("div", {
									className: "TransparencyCard StaccatoCard StaccatoBorderShimmer flex flex-col space-y-4 flat bg-card p-6",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-start justify-between",
											children: [/* @__PURE__ */ jsx("h4", {
												className: "font-mono text-sm font-semibold",
												children: Item.Title
											}), /* @__PURE__ */ jsxs("div", {
												className: "ml-4 flex items-center gap-3",
												children: [/* @__PURE__ */ jsxs(Badge, {
													variant: StatusBadgeVariant[Item.Status],
													className: "StaccatoBadge",
													children: [
														Item.Status,
														" ",
														/* @__PURE__ */ jsx("span", {
															className: `StaccatoDot StaccatoRhythmDot h-2 w-2 flat ${StatusColor[Item.Status]}`,
															"aria-hidden": "true"
														})
													]
												}), Icon && /* @__PURE__ */ jsx("div", {
													className: "flex h-10 w-10 shrink-0 items-center justify-center flat bg-secondary",
													"aria-hidden": "true",
													children: /* @__PURE__ */ jsx(Icon, {
														className: "StaccatoIcon h-5 w-5 text-primary",
														"aria-hidden": "true"
													})
												})]
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "StaccatoBreath text-muted-foreground",
											children: /* @__PURE__ */ jsx(RichText, { Text: Item.Description })
										}),
										Item.Detail && /* @__PURE__ */ jsx("div", {
											className: "text-muted-foreground/70",
											children: /* @__PURE__ */ jsx(RichText, {
												Text: Item.Detail,
												Terms: true
											})
										})
									]
								}, Item.Identifier);
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-16",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "mb-2 text-2xl tracking-tight",
							children: "Build Variants"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mb-8 text-muted-foreground",
							children: [
								Variant.length,
								" named profiles across",
								" ",
								MatrixPermutation,
								" test permutations. Every combination verified."
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ jsxs("table", {
								className: "w-full border-collapse",
								children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
									className: "border-b border-[var(--Border)]",
									children: [
										/* @__PURE__ */ jsx("th", {
											className: "px-4 py-3 text-left font-semibold",
											children: "Profile"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-4 py-3 text-left font-semibold",
											children: "Tier"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-4 py-3 text-left font-semibold",
											children: "Workbench"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-4 py-3 text-left font-semibold",
											children: "Features"
										}),
										/* @__PURE__ */ jsx("th", {
											className: "px-4 py-3 text-left font-semibold",
											children: "Status"
										})
									]
								}) }), /* @__PURE__ */ jsx("tbody", { children: Variant.map((Item) => /* @__PURE__ */ jsxs("tr", {
									className: "border-b border-[var(--Border)] last:border-b-0",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 font-mono",
											children: Item.Name
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsx(Badge, {
												variant: "outline",
												className: "StaccatoBadge",
												children: Item.Tier
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: Item.Workbench
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3 text-muted-foreground",
											children: Item.Feature
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ jsxs(Badge, {
												className: "StaccatoBadge",
												children: [
													Item.Status,
													" ",
													/* @__PURE__ */ jsx("span", {
														className: `StaccatoDot h-2 w-2 flat ${VariantStatusColor[Item.Status]}`,
														"aria-hidden": "true"
													})
												]
											})
										})
									]
								}, Item.Identifier)) })]
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-16",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "mb-2 text-2xl tracking-tight",
							children: "Deployment Strategies"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mb-8 text-muted-foreground",
							children: "Four deployment modes from development to production."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 gap-6 md:grid-cols-2",
							children: Strategy.map((Item) => {
								const Icon = GetIcon(Item.Icon);
								return /* @__PURE__ */ jsxs("div", {
									className: "TransparencyCard StaccatoCard StaccatoBorderShimmer flex flex-col space-y-4 flat bg-card p-6",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-start justify-between",
											children: [/* @__PURE__ */ jsx("h4", {
												className: "font-mono text-sm font-semibold",
												children: Item.Name
											}), Icon && /* @__PURE__ */ jsx("div", {
												className: "ml-4 flex h-10 w-10 shrink-0 items-center justify-center flat bg-secondary",
												"aria-hidden": "true",
												children: /* @__PURE__ */ jsx(Icon, {
													className: "StaccatoIcon h-5 w-5 text-primary",
													"aria-hidden": "true"
												})
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "StaccatoBreath text-muted-foreground",
											children: /* @__PURE__ */ jsx(RichText, { Text: Item.Description })
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-baseline flat bg-secondary px-3 py-2",
											children: [/* @__PURE__ */ jsx("code", {
												className: "font-mono",
												children: Item.Command
											}), /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: async () => {
													try {
														await navigator.clipboard.writeText(Item.Command);
													} catch {}
												},
												"aria-label": "Copy command",
												title: "Copy command",
												className: "ml-2 inline-flex h-[1.1em] w-[1.1em] shrink-0 items-center justify-center flat bg-mute opacity-50 transition-opacity hover:opacity-100",
												children: /* @__PURE__ */ jsx(lucide.Copy, {
													className: "h-[0.65em] w-[0.65em]",
													"aria-hidden": "true"
												})
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex flex-wrap gap-2",
											children: Item.Feature.map((FeatureName, Index) => /* @__PURE__ */ jsx(Badge, {
												variant: "outline",
												className: "StaccatoBadge",
												children: FeatureName
											}, Index))
										})
									]
								}, Item.Identifier);
							})
						})
					]
				}),
				SourceURL && /* @__PURE__ */ jsx("div", {
					className: "text-center",
					children: /* @__PURE__ */ jsxs("a", {
						href: SourceURL,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center text-muted-foreground underline underline-offset-4 hover:text-foreground",
						children: ["Verify in source code", /* @__PURE__ */ jsx("span", {
							className: "InlineSeparator",
							children: /* @__PURE__ */ jsx(lucide.Code, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							})
						})]
					})
				})
			]
		})
	});
};
//#endregion
//#region Source/pages/Download.astro
var Download_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Download,
	file: () => $$file,
	url: () => $$url
});
var $$Download = createComponent(async ($$result, $$props, $$slots) => {
	const T = GetI18n();
	const TransparencyContent = {
		Title: T("download.transparency.title", { defaultValue: "Telemetry Is Compile-Gated in Land." }),
		Subtitle: T("download.transparency.subtitle", { defaultValue: "Telemetry and tracing are behind named Rust feature gates in the native layer. Nothing is emitted by default. Each build profile explicitly lists which paths are compiled in." }),
		Policy: [
			{
				Identifier: "no-telemetry-default",
				Title: "Compile-gated by default.",
				Description: "Telemetry and tracing code lives behind `cfg(feature)` gates. In a standard build those paths are not compiled in - no collection, no emission, no runtime cost.",
				Icon: "EyeOff",
				Status: "Disabled",
				Detail: "Telemetry feature paths are excluded from the default build profile."
			},
			{
				Identifier: "no-crash-reporter",
				Title: "No Microsoft endpoint dependency.",
				Description: "Land is built from a CC0 Code-OSS base with Microsoft service dependencies removed or replaced. The crash reporter, update service, and marketplace endpoints are all replaced with Land-owned wiring or left unconnected.",
				Icon: "Shield",
				Status: "Disabled",
				Detail: "CC0-licensed Code-OSS base with Land-owned service wiring."
			},
			{
				Identifier: "no-phone-home",
				Title: "Three separate systems, three separate controls.",
				Description: "Website analytics, account authentication, and editor telemetry are independent systems. Each is controlled by its own feature flag or environment configuration - none of the three implies the others are active.",
				Icon: "Lock",
				Status: "Disabled"
			},
			{
				Identifier: "zero-cost-noop",
				Title: "Disabled feature paths stay out of the runtime.",
				Description: "Rust `cfg(feature)` gates eliminate disabled code paths at compile time, not just at runtime. A published build profile is a verifiable record of exactly which features were included.",
				Icon: "Zap",
				Status: "Active",
				Detail: "Rust cfg(feature) gates eliminate dead code at compile time."
			},
			{
				Identifier: "opt-in-otel",
				Title: "Need traces? Opt in. Your infrastructure only.",
				Description: "OpenTelemetry tracing is available in source and activates only when a deployment explicitly enables it with a named feature flag and a configured endpoint. Trace data goes to your infrastructure.",
				Icon: "Eye",
				Status: "Optional",
				Detail: "cargo build --features Telemetry\nSub-features: MetricsCollection, DistributedTracing."
			},
			{
				Identifier: "effect-ts-local",
				Title: "Extension host timing stays in the process.",
				Description: "Cocoon has internal timing and service diagnostics for extension-host work. Unless a transport is configured, that data is local process instrumentation rather than an external product-analytics claim.",
				Icon: "Layers",
				Status: "Active",
				Detail: "Effect-TS TelemetryService with TelemetryMock layer for zero-overhead testing."
			}
		],
		Variant: [
			{
				Identifier: "debug",
				Name: "debug",
				Tier: "Debug",
				Workbench: "Browser",
				Feature: "Browser UI",
				Status: "Available"
			},
			{
				Identifier: "debug-mountain",
				Name: "debug-mountain",
				Tier: "Debug",
				Workbench: "Mountain",
				Feature: "Mountain UI",
				Status: "Recommended"
			},
			{
				Identifier: "debug-electron",
				Name: "debug-electron",
				Tier: "Debug",
				Workbench: "Electron",
				Feature: "Legacy Check",
				Status: "Legacy"
			},
			{
				Identifier: "production",
				Name: "production",
				Tier: "Release",
				Workbench: "Mountain",
				Feature: "Release Path",
				Status: "Recommended"
			},
			{
				Identifier: "release",
				Name: "release",
				Tier: "Release",
				Workbench: "Mountain",
				Feature: "Bundle Path",
				Status: "Available"
			},
			{
				Identifier: "web-browser",
				Name: "web-browser",
				Tier: "Release",
				Workbench: "Browser",
				Feature: "Web Path",
				Status: "Available"
			},
			{
				Identifier: "bundler-preparation",
				Name: "bundler-preparation",
				Tier: "Build",
				Workbench: "-",
				Feature: "-",
				Status: "Available"
			},
			{
				Identifier: "swc-bundle",
				Name: "swc-bundle",
				Tier: "Build",
				Workbench: "-",
				Feature: "-",
				Status: "Experimental"
			},
			{
				Identifier: "oxc-bundle",
				Name: "oxc-bundle",
				Tier: "Build",
				Workbench: "-",
				Feature: "-",
				Status: "Experimental"
			}
		],
		Strategy: [
			{
				Identifier: "dev-hot-reload",
				Name: "Development",
				Description: "Change a file, see it instantly. Hot-reload in Tauri with the Sky dev server. No manual rebuilds needed.",
				Icon: "Zap",
				Command: "bash Maintain/Dev-Mountain.sh",
				Feature: [
					"Hot Reload",
					"Instant Preview",
					"Development Server",
					"No Bundling"
				]
			},
			{
				Identifier: "debug-build",
				Name: "Debug Build",
				Description: "Full debug symbols for stepping through code. Three profiles: Browser, Mountain, and Electron.",
				Icon: "Code",
				Command: "bash Maintain/Debug/Build.sh --profile debug-mountain",
				Feature: [
					"Debug Symbols",
					"3 Profiles",
					"Source Maps",
					"File Watch"
				]
			},
			{
				Identifier: "production-release",
				Name: "Release Build",
				Description: "Optimized release packaging path. Public signing and published verification artifacts are still being prepared.",
				Icon: "Server",
				Command: "bash Maintain/Release/Build.sh --profile production",
				Feature: [
					"Optimized",
					"Signing Planned",
					"Clean Build",
					"Packaged"
				]
			},
			{
				Identifier: "web-only",
				Name: "Web Deployment",
				Description: "Run Land in the browser without installing anything. No native shell needed.",
				Icon: "Layers",
				Command: "bash Maintain/Release.sh --profile web-browser",
				Feature: [
					"No Install",
					"Browser Only",
					"Web Deploy",
					"OXC Bundled"
				]
			}
		],
		MatrixPermutation: 16,
		SourceURL: "https://github.com/CodeEditorLand/Land"
	};
	const DownloadContent = {
		PlatformGrid: {
			Title: T("download.page.title", { defaultValue: "Download Land" }),
			Subtitle: T("download.page.subtitle", { defaultValue: "Source builds are active today. Public installers, signing, and verification artifacts are still being prepared." }),
			Platforms: [],
			ShowVerification: true,
			OnDownload: async (Platform) => {
				if (Platform.Id) try {
					const { default: DownloadAPI } = await import("./Download_CLeuVBt7.mjs");
					const Information = await DownloadAPI.GetInfo(Platform.Id);
					window.open(Information.downloadUrl, "_blank");
					await DownloadAPI.TrackDownload(Platform.Id);
				} catch (DownloadError) {
					console.error("Download failed:", DownloadError);
				}
			}
		},
		SystemRequirements: {
			Title: T("download.systemRequirements.title", { defaultValue: "System Requirements" }),
			Description: T("download.systemRequirements.subtitle", { defaultValue: "A quick check before you download saves a reinstall later." }),
			Requirements: {
				Minimum: [
					{
						Id: "cpu-min",
						Label: "Processor",
						Value: "Intel Core i5 or AMD Ryzen 5 / Apple Silicon"
					},
					{
						Id: "ram-min",
						Label: "Memory",
						Value: "4 GB RAM"
					},
					{
						Id: "disk-min",
						Label: "Disk Space",
						Value: "500 MB"
					}
				],
				Recommended: [
					{
						Id: "cpu-rec",
						Label: "Processor",
						Value: "Intel Core i7 or AMD Ryzen 7"
					},
					{
						Id: "ram-rec",
						Label: "Memory",
						Value: "8 GB RAM"
					},
					{
						Id: "disk-rec",
						Label: "Disk Space",
						Value: "1 GB SSD"
					}
				]
			},
			Os: [
				"macOS 11+",
				"Windows 10+",
				"Ubuntu 20.04+ / Fedora 35+ / Debian 11+"
			]
		},
		VerificationInfo: {
			Title: T("download.verification.title", { defaultValue: "Verification Will Ship With Public Releases." }),
			Description: T("download.verification.description", { defaultValue: "Release downloads will publish checksum and signature material when public installers are available." }),
			DownloadVerification: {
				SHA256: "Available with public release artifacts",
				PGPSignature: "Available with public release artifacts",
				SigningKeyId: "Published with each release",
				VerificationInstructions: "Verification instructions will be published beside the installer, checksum, and signature artifacts."
			},
			IntegrityVerification: {
				SHA256: "Available with public release artifacts",
				PGPSignature: "Available with public release artifacts",
				VerificationInstructions: "Air contains checksum and integrity code. Public release verification material will be published with the installers."
			},
			DownloadButton: {
				Text: T("download.verification.downloadButton", { defaultValue: "View Verification Plan" }),
				Variant: "outline",
				Size: "default",
				FullWidth: false
			},
			VerifyButton: {
				Text: T("download.verification.verifyButton", { defaultValue: "Verify Download" }),
				Variant: "default",
				Size: "default",
				FullWidth: false
			}
		},
		PreviousReleases: {
			Title: T("download.previousReleases.title", { defaultValue: "Previous Releases" }),
			Description: T("download.previousReleases.description", { defaultValue: "Download an older version if you need to pin to a specific release." }),
			Releases: [],
			ShowChangelog: false
		},
		Header: void 0,
		Footer: {}
	};
	const MetaTitle = T("meta.downloads.title", { defaultValue: "Download Code Editor Land | Source Builds and Public Release Prep" });
	const MetaDescription = T("meta.downloads.description", { defaultValue: "Code Editor Land source builds target macOS, Windows, and Linux. Public installers, signing, and verification artifacts are still being prepared." });
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"Title": MetaTitle,
		"Description": MetaDescription
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Header", Header, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Layout/Header.tsx",
		"client:component-export": "Header"
	})} ${maybeRenderHead($$result)}<div class="container mx-auto flex flex-wrap items-center justify-center gap-3 px-4 pt-6 text-muted-foreground"> <picture> <source srcset="/Asset/Dark/Logo/Glyph/Land.svg" media="(prefers-color-scheme: dark)" data-theme-dark> <img alt="Land" src="/Asset/Logo/Glyph/Land.svg" width="24" height="24"> </picture> ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "mint",
		"shape": "square",
		"style": `--jelly-fill:var(--SpinegRPCMute);--jelly-label:var(--SpinegRPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Telemetry Feature Gated&#x2001;<span class="h-1.5 w-1.5 flat" style="background-color:var(--SpinegRPC)" aria-hidden="true"></span> ` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "mint",
		"shape": "square",
		"style": `--jelly-fill:var(--SpinegRPCMute);--jelly-label:var(--SpinegRPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
CC0 Licensed
` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "platinum",
		"shape": "square",
		"style": `--jelly-fill:var(--Mute);--jelly-label:var(--MuteForeground);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Signing Planned
` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "azure",
		"shape": "square",
		"style": `--jelly-fill:var(--SpineIPCMute);--jelly-label:var(--SpineIPCFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Native Rust&#x2001;<picture class="inline-flex align-middle"> <source srcset="/Dark/Image/Rust.svg" media="(prefers-color-scheme: dark)" data-theme-dark> <img src="/Image/Rust.svg" alt="" width="14" height="14" class="opacity-70" aria-hidden="true"> </picture> ` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "amber",
		"shape": "square",
		"style": `--jelly-fill:var(--ExtensionTauriMute);--jelly-label:var(--ExtensionTauriFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Tauri&#x2001;<picture class="inline-flex align-middle"> <source srcset="/Dark/Image/Tauri.svg" media="(prefers-color-scheme: dark)" data-theme-dark> <img src="/Image/Tauri.svg" alt="" width="14" height="14" class="opacity-70" aria-hidden="true"> </picture> ` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "platinum",
		"shape": "square",
		"style": `--jelly-fill:var(--ExtensionEffectTypeScriptMute);--jelly-label:var(--ExtensionEffectTypeScriptFore);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Effect-TS&#x2001;<picture class="inline-flex align-middle"> <source srcset="/Dark/Image/EffectTS.svg" media="(prefers-color-scheme: dark)" data-theme-dark> <img src="/Image/EffectTS.svg" alt="" width="14" height="14" class="opacity-70" aria-hidden="true"> </picture> ` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "platinum",
		"shape": "square",
		"style": `--jelly-fill:var(--Mute);--jelly-label:var(--MuteForeground);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
macOS + Windows + Linux Targets
` })} ${renderComponent($$result, "jelly-badge", "jelly-badge", {
		"variant": "platinum",
		"shape": "square",
		"style": `--jelly-fill:var(--Mute);--jelly-label:var(--MuteForeground);--jelly-badge-radius:0;--jelly-badge-font-size:11px`
	}, { "default": ($$result) => renderTemplate`
Unmodified Extensions
` })} </div> ${renderComponent($$result, "DownloadsPage", DownloadsPage, {
		"Content": DownloadContent,
		"MetaTitle": MetaTitle,
		"MetaDescription": MetaDescription
	})} ${renderComponent($$result, "DynamicTransparency", DynamicTransparency, {
		"Content": TransparencyContent,
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/Component/Dynamic/DynamicTransparency.tsx",
		"client:component-export": "DynamicTransparency"
	})} ` })}`;
}, "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Download.astro", void 0);
var $$file = "/Volumes/CORSAIR/Developer/macOS/Application/CodeEditorLand/WebSite/Source/pages/Download.astro";
var $$url = "/Download";
//#endregion
//#region \0virtual:astro:page:Source/pages/Download@_@astro
var page = () => Download_exports;
//#endregion
export { page };
