import type Download from "../Interface/Download.js";
import type DownloadEvent from "../Interface/DownloadEvent.js";
import { GetWorkersClient } from "../WorkerClient";

/**
 * Downloads API adapter
 * Provides clean, type-safe interface for download operations
 */
export class DownloadsAPI {
	private Workers = GetWorkersClient();

	async GetBinaries(
		Platform?: string,
		Architecture?: string,
	): Promise<Download[]> {
		const Response = await this.Workers.Download.GetBinaries(
			Platform,
			Architecture,
		);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch binaries");
		}
		return Response.data;
	}

	async GetVersionList(Limit?: number): Promise<Download[]> {
		const Response = await this.Workers.Download.GetVersionList(Limit);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch version list");
		}
		return Response.data;
	}

	async GetDownload(Identifier: string): Promise<Download> {
		const Response = await this.Workers.Download.GetDownload(Identifier);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch download");
		}
		return Response.data;
	}

	async GetSHA256(Identifier: string): Promise<{ sha256: string }> {
		const Response = await this.Workers.Download.GetSHA256(Identifier);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch checksum");
		}
		return Response.data;
	}

	async GetSignature(Identifier: string): Promise<{ signature: string }> {
		const Response = await this.Workers.Download.GetSignature(Identifier);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch signature");
		}
		return Response.data;
	}

	async GetInfo(Identifier: string): Promise<
		Download & {
			downloadUrl: string;
			sha256Url: string;
			signatureUrl: string | null;
		}
	> {
		const Response = await this.Workers.Download.GetInfo(Identifier);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch download info");
		}
		return Response.data;
	}

	async GetByVersion(
		Version: string,
		Platform?: string,
		Architecture?: string,
	): Promise<Download[]> {
		const Response = await this.Workers.Download.GetByVersion(
			Version,
			Platform,
			Architecture,
		);
		if (!Response.success || !Response.data) {
			throw new Error(
				Response.error || "Failed to fetch downloads by version",
			);
		}
		return Response.data;
	}

	async GetLatest(
		Platform?: string,
		Architecture?: string,
	): Promise<Download> {
		const Response = await this.Workers.Download.GetLatest(
			Platform,
			Architecture,
		);
		if (!Response.success || !Response.data) {
			throw new Error(
				Response.error || "Failed to fetch latest download",
			);
		}
		return Response.data;
	}

	async TrackDownload(Identifier: string): Promise<{ eventId: string }> {
		const Response = await this.Workers.Download.TrackDownload(Identifier);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to track download");
		}
		return Response.data;
	}

	async GetAnalytics(
		Limit?: number,
		Offset?: number,
	): Promise<{
		events: DownloadEvent[];
		stats: {
			total: number;
			byPlatform: Record<string, number>;
			byVersion: Record<string, number>;
		};
	}> {
		const Response = await this.Workers.Download.GetAnalytics(
			Limit,
			Offset,
		);
		if (!Response.success || !Response.data) {
			throw new Error(Response.error || "Failed to fetch analytics");
		}
		return Response.data;
	}
}

export default new DownloadsAPI();
