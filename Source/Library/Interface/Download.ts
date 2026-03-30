export default interface Download {
	id: string;
	version: string;
	platform: "windows" | "macos" | "linux";
	architecture: "x64" | "arm64" | "x86";
	fileName: string;
	fileSize: number;
	sha256: string;
	pgpSignature?: string;
	downloadCount: number;
	createdAt: string;
	updatedAt: string;
}
