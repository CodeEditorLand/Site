export default interface Interface {
	version: string;
	publishedAt: string;
	size: string;
	downloads: number;
	changelog?: string;
	assets: {
		platform: "macOS" | "Windows" | "Linux";
		url: string;
		sha256: string;
		signature?: string;
	}[];
}
