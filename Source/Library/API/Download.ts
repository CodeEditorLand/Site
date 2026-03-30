import type Download from "../Interface/Download.js";
import type DownloadEvent from "../Interface/DownloadEvent.js";
import { getWorkersClient } from "../WorkerClient";

/**
 * Downloads API adapter
 * Provides clean, type-safe interface for download operations
 */
export class DownloadsAPI {
	private workers = getWorkersClient();

	async getBinaries(
		platform?: string,
		architecture?: string,
	): Promise<Download[]> {
		const response = await this.workers.download.getBinaries(
			platform,
			architecture,
		);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch binaries");
		}
		return response.data;
	}

	async getVersionList(limit?: number): Promise<Download[]> {
		const response = await this.workers.download.getVersionList(limit);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch version list");
		}
		return response.data;
	}

	async getDownload(id: string): Promise<Download> {
		const response = await this.workers.download.getDownload(id);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch download");
		}
		return response.data;
	}

	async getSha256(id: string): Promise<{ sha256: string }> {
		const response = await this.workers.download.getSha256(id);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch checksum");
		}
		return response.data;
	}

	async getSignature(id: string): Promise<{ signature: string }> {
		const response = await this.workers.download.getSignature(id);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch signature");
		}
		return response.data;
	}

	async getInfo(id: string): Promise<
		Download & {
			downloadUrl: string;
			sha256Url: string;
			signatureUrl: string | null;
		}
	> {
		const response = await this.workers.download.getInfo(id);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch download info");
		}
		return response.data;
	}

	async getByVersion(
		version: string,
		platform?: string,
		architecture?: string,
	): Promise<Download[]> {
		const response = await this.workers.download.getByVersion(
			version,
			platform,
			architecture,
		);
		if (!response.success || !response.data) {
			throw new Error(
				response.error || "Failed to fetch downloads by version",
			);
		}
		return response.data;
	}

	async getLatest(
		platform?: string,
		architecture?: string,
	): Promise<Download> {
		const response = await this.workers.download.getLatest(
			platform,
			architecture,
		);
		if (!response.success || !response.data) {
			throw new Error(
				response.error || "Failed to fetch latest download",
			);
		}
		return response.data;
	}

	async trackDownload(id: string): Promise<{ eventId: string }> {
		const response = await this.workers.download.trackDownload(id);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to track download");
		}
		return response.data;
	}

	async getAnalytics(
		limit?: number,
		offset?: number,
	): Promise<{
		events: DownloadEvent[];
		stats: {
			total: number;
			byPlatform: Record<string, number>;
			byVersion: Record<string, number>;
		};
	}> {
		const response = await this.workers.download.getAnalytics(
			limit,
			offset,
		);
		if (!response.success || !response.data) {
			throw new Error(response.error || "Failed to fetch analytics");
		}
		return response.data;
	}
}

export const downloadsAPI = new DownloadsAPI();
