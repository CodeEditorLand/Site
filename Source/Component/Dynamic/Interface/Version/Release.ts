export default interface Interface {
	[Key: string]: unknown;

	Version: string;

	PublishedAt: string;

	Size: string;

	Downloads: number;

	Changelog?: string;

	Assets: {
		Platform: "macOS" | "Windows" | "Linux";

		URL: string;

		SHA256: string;

		Signature?: string;
	}[];
}
