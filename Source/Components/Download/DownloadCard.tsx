import { Apple, Monitor, Terminal } from "lucide-react";
import React from "react";

import type { Download as DownloadType } from "../Lib/types";

interface DownloadCardProps {
	download: DownloadType;
	onDownload: (download: DownloadType) => void;
}

/**
 * DownloadCard component displaying a single platform download
 * Shows platform info, version, size, checksum, and signature
 */
export function DownloadCard({ download, onDownload }: DownloadCardProps) {
	const iconMap: Record<string, "Apple" | "Monitor" | "Terminal"> = {
		macos: "Apple",
		windows: "Monitor",
		linux: "Terminal",
	};

	const Icon = iconMap[download.platform] || "Terminal";

	const platformName = (download.platform.charAt(0).toUpperCase() +
		download.platform.slice(1)) as "macOS" | "Windows" | "Linux";
	const sizeMB = (download.fileSize / 1024 / 1024).toFixed(1);

	return (
		<div className="border-border flex flex-col rounded-none border-[3px] p-6 shadow-lg">
			<div className="mb-4 flex items-center gap-3">
				{Icon === "Apple" && <Apple className="h-6 w-6" />}
				{Icon === "Monitor" && <Monitor className="h-6 w-6" />}
				{Icon === "Terminal" && <Terminal className="h-6 w-6" />}
				<div>
					<h3 className="text-xl font-semibold">{platformName}</h3>
					<p className="text-muted-foreground text-sm">
						{download.description}
					</p>
				</div>
			</div>

			<div className="text-muted-foreground flex-1 space-y-2 text-sm">
				<div className="flex justify-between">
					<span>Version:</span>
					<span className="text-foreground font-medium">
						{download.version}
					</span>
				</div>
				<div className="flex justify-between">
					<span>Size:</span>
					<span className="text-foreground font-medium">
						{sizeMB} MB
					</span>
				</div>
				{download.architecture && (
					<div className="flex justify-between">
						<span>Architecture:</span>
						<span className="text-foreground font-medium">
							{download.architecture}
						</span>
					</div>
				)}
			</div>

			<div className="mt-4 space-y-2">
				<button
					type="button"
					className="border-border bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center gap-2 border-[3px] px-4 py-2 text-sm font-medium transition-all"
					onClick={() => onDownload(download)}>
					Download for {platformName || "this platform"}
				</button>

				{(download.sha256 || download.pgpSignature) && (
					<div className="text-muted-foreground mt-3 space-y-1 text-xs">
						{download.sha256 && (
							<p className="truncate">
								<strong>SHA-256:</strong>{" "}
								{download.sha256.substring(0, 16)}...
							</p>
						)}
						{download.pgpSignature && (
							<p className="text-green-600 dark:text-green-400">
								✓ PGP Signed
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default DownloadCard;
