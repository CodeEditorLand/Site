import { useEffect, useState } from "react";
import { PlatformGrid } from "./PlatformGrid";
import { PreviousReleases } from "./PreviousReleases";
import { VerificationInfo } from "./VerificationInfo";
import { downloadsAPI } from "../../Lib/api/downloads";
import { toast } from "sonner";
import type { Download as DownloadType } from "../Lib/types";

interface GroupedVersion {
	version: string;
	publishedAt: string;
	size: string;
	downloads: number;
	changelog: string;
	assets: Array<{
		platform: "macOS" | "Windows" | "Linux";
		url: string;
		sha256: string;
		signature?: string;
	}>;
}

interface DownloadSectionProps {
	title?: string;
	subtitle?: string;
	showVerification?: boolean;
	className?: string;
}

export function DownloadSection({ title, subtitle, showVerification = true, className }: DownloadSectionProps) {
	const [downloads, setDownloads] = useState<DownloadType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchDownloads = async () => {
			try {
				const data = await downloadsAPI.getBinaries();
				setDownloads(data);
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : "An error occurred";
				setError(errorMessage);
			} finally {
				setIsLoading(false);
			}
		};

		fetchDownloads();
	}, []);

	const handleDownload = async (download: DownloadType) => {
		try {
			// Track the download
			await downloadsAPI.trackDownload(download.id);

			// Trigger file download
			const downloadUrl = `${import.meta.env.PUBLIC_DOWNLOAD_WORKER_URL}/downloads/${download.id}/file`;
			window.open(downloadUrl, '_blank');

			toast.success(`Downloading Land for ${download.platform}...`);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Download failed";
			toast.error(errorMessage);
		}
	};

	const handleDownloadSignature = async () => {
		try {
			// Download the PGP public key
			const keyUrl = "/Favicon/pgp-key.asc";
			window.open(keyUrl, '_blank');
			toast.success("Downloading PGP public key...");
		} catch (err) {
			toast.error("Failed to download PGP key");
		}
	};

	const handleVerify = async (checksum: string) => {
		try {
			// This would integrate with a verification utility
			toast.info("Verification tool coming soon!");
		} catch (err) {
			toast.error("Verification failed");
		}
	};

	const handleViewChangelog = (version: string) => {
		toast.info(`Changelog for version ${version} coming soon!`);
	};

	// Group downloads by version for previous releases
	const groupedByVersion = downloads.reduce((acc: Record<string, GroupedVersion>, download) => {
		if (!acc[download.version]) {
			acc[download.version] = {
				version: download.version,
				publishedAt: download.createdAt,
				size: `${(download.fileSize / 1024 / 1024).toFixed(1)} MB`,
				downloads: download.downloadCount,
				changelog: "",
				assets: [],
			};
		}
		acc[download.version].assets.push({
			platform: download.platform.charAt(0).toUpperCase() + download.platform.slice(1) as "macOS" | "Windows" | "Linux",
			url: `${import.meta.env.PUBLIC_DOWNLOAD_WORKER_URL}/downloads/${download.id}/file`,
			sha256: download.sha256,
			signature: download.pgpSignature,
		});
		return acc;
	}, {});

	const releases = Object.values(groupedByVersion)
		.sort((a: GroupedVersion, b: GroupedVersion) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
		.slice(0, 10); // Limit to 10 previous releases

	if (isLoading) {
		return (
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="text-center">
						<div className="animate-spin h-8 w-8 border border-primary border-t-transparent rounded-none mx-auto"></div>
						<p className="mt-4 text-muted-foreground">Loading downloads...</p>
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="text-center">
						<p className="text-destructive">Failed to load downloads: {error}</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<div className={className}>
			<PlatformGrid
				title={title}
				subtitle={subtitle}
				downloads={downloads}
				onDownload={handleDownload}
				showVerification={showVerification}
			/>

			{showVerification && downloads.length > 0 && (
				<VerificationInfo
					title="Verify Your Download"
					description="For security, we recommend verifying the integrity and authenticity of your download."
					downloadVerification={{
						sha256: downloads[0]?.sha256 || "",
						pgpSignature: downloads[0]?.pgpSignature || "",
						signingKeyId: "0x12345678",
					}}
					integrityVerification={{
						sha256: "Enter checksum to verify",
						pgpSignature: "Click to download signature file",
						verificationInstructions: "To verify: shasum -a 256 <filename> and compare output with the checksum above. For PGP: gpg --verify <file>.sig <file>",
					}}
					onDownloadSignature={handleDownloadSignature}
					onVerify={handleVerify}
				/>
			)}

			{releases.length > 1 && (
				<PreviousReleases
					title="Previous Releases"
					description="Download older versions if needed."
					releases={releases}
					onDownload={(version, platform) => {
						const download = downloads.find(d => d.version === version && d.platform === platform.toLowerCase());
						if (download) {
							handleDownload(download);
						}
					}}
					onViewChangelog={handleViewChangelog}
				/>
			)}
		</div>
	);
}

export default DownloadSection;
