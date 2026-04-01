"use client";

import { useTranslation } from "react-i18next";

import { Header } from "../Layout/Header";
import { DynamicPlatformGrid } from "./DynamicPlatformGrid";
import { DynamicPreviousReleases } from "./DynamicPreviousReleases";
import { DynamicSystemRequirements } from "./DynamicSystemRequirements";
import { DynamicVerificationInfo } from "./DynamicVerificationInfo";
import type Interface from "./Interface/Content/Page/Download.js";
import type Property from "./Interface/Property/Page/Download.js";

/**
 * Dynamic DownloadsPage composition
 * Assembles PlatformGrid, SystemRequirements, VerificationInfo, PreviousReleases
 * Content driven by translations (useTranslation) or explicit props
 */
export function DownloadsPage({ content, className }: Property) {
	const { t: T } = useTranslation(["download", "common"]);

	const ResolvedContent: Interface = content || {
		platformGrid: {
			title: T("download:page.title", {
				defaultValue: "Download Land",
			}),
			subtitle: T("download:page.subtitle", {
				defaultValue:
					"Available for macOS, Windows, and Linux.\nFast, native, and free.",
			}),
			platforms: [],
			showVerification: true,
			onDownload: async (Platform: { name: string; id?: string }) => {
				if (Platform.id) {
					try {
						const { default: DownloadAPI } = await import(
							"../../Library/API/Download.js"
						);
						const Information = await DownloadAPI.GetInfo(
							Platform.id,
						);
						window.open(Information.downloadUrl, "_blank");
						await DownloadAPI.TrackDownload(Platform.id);
					} catch (DownloadError) {
						console.error("Download failed:", DownloadError);
						alert("Download failed. Please try again.");
					}
				}
			},
		},
		systemRequirements: {
			title: T("download:systemRequirements.title", {
				defaultValue: "System Requirements",
			}),
			description: T("download:systemRequirements.subtitle", {
				defaultValue:
					"Ensure your system meets these requirements before downloading.",
			}),
			requirements: {
				minimum: [
					{
						id: "cpu-min",
						label: "Processor",
						value: "Intel Core i5 or AMD Ryzen 5 / Apple Silicon",
					},
					{ id: "ram-min", label: "Memory", value: "4 GB RAM" },
					{ id: "disk-min", label: "Disk Space", value: "500 MB" },
				],
				recommended: [
					{
						id: "cpu-rec",
						label: "Processor",
						value: "Intel Core i7 or AMD Ryzen 7",
					},
					{ id: "ram-rec", label: "Memory", value: "8 GB RAM" },
					{
						id: "disk-rec",
						label: "Disk Space",
						value: "1 GB SSD",
					},
				],
			},
			os: [
				"macOS 11+",
				"Windows 10+",
				"Ubuntu 20.04+ / Fedora 35+ / Debian 11+",
			],
		},
		verificationInfo: {
			title: T("download:verification.title", {
				defaultValue: "Verify Your Download",
			}),
			description: T("download:verification.description", {
				defaultValue:
					"Land releases are signed with PGP.\nVerify your download to ensure integrity.",
			}),
			downloadVerification: {
				sha256: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
				pgpSignature:
					"-----BEGIN PGP SIGNATURE-----\nVersion: OpenPGP.js v4.10.1\nComment: https://openpgpjs.org\n\n...",
				signingKeyId: "0x12345678",
				verificationInstructions:
					"Use the SHA-256 checksum to verify your download matches the original file.\nFor PGP verification, import our public key and verify the signature.",
			},
			integrityVerification: {
				sha256: "Enter checksum to verify",
				pgpSignature: "Click to download signature file",
				verificationInstructions:
					"To verify: shasum -a 256 <filename> and compare output with the checksum above.\nFor PGP: gpg --verify <file>.sig <file>",
			},
			downloadButton: {
				text: T("download:verification.downloadButton", {
					defaultValue: "Download PGP Public Key",
				}),
				variant: "outline",
				size: "default",
				fullWidth: false,
			},
			verifyButton: {
				text: T("download:verification.verifyButton", {
					defaultValue: "Verify Download",
				}),
				variant: "default",
				size: "default",
				fullWidth: false,
			},
		},
		previousReleases: {
			title: T("download:previousReleases.title", {
				defaultValue: "Previous Releases",
			}),
			description: T("download:previousReleases.description", {
				defaultValue: "Download older versions if needed.",
			}),
			releases: [
				{
					version: "v0.1.0",
					publishedAt: "2025-12-15T10:30:00Z",
					size: "44.8 MB",
					downloads: 15420,
					changelog: "Initial public release",
					assets: [
						{
							platform: "macOS",
							url: "/downloads/v0.1.0/macos",
							sha256: "abc123...",
							signature: "sig123...",
						},
						{
							platform: "Windows",
							url: "/downloads/v0.1.0/win64",
							sha256: "def456...",
							signature: "sig456...",
						},
						{
							platform: "Linux",
							url: "/downloads/v0.1.0/linux",
							sha256: "ghi789...",
							signature: "sig789...",
						},
					],
				},
			],
			showChangelog: true,
			onDownload: (Version: string, Platform: string) =>
				console.log(`Download ${Version} for ${Platform}`),
			onViewChangelog: (Version: string) =>
				console.log(`View changelog for ${Version}`),
		},
		header: undefined,
		footer: {},
	};

	const {
		platformGrid: PlatformGrid,
		systemRequirements: SystemRequirements,
		verificationInfo: VerificationInformation,
		previousReleases: PreviousReleases,
		header: HeaderContent,
	} = ResolvedContent;

	return (
		<div className={`flex min-h-screen flex-col ${className || ""}`}>
			{HeaderContent !== undefined && <Header content={HeaderContent} />}

			<div className="flex-1">
				<DynamicPlatformGrid content={PlatformGrid} />

				<DynamicSystemRequirements content={SystemRequirements} />

				<DynamicVerificationInfo content={VerificationInformation} />

				<DynamicPreviousReleases content={PreviousReleases} />
			</div>
		</div>
	);
}
