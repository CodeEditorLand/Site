export default interface DownloadEvent {
	id: string;

	downloadId: string;

	version: string;

	platform: string;

	architecture: string;

	ip: string;

	userAgent?: string;

	country?: string;

	timestamp: string;
}
