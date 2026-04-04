import type PlatformInformation from "../../Information/Platform.js";
import type PlatformGridLabels from "../../Label/Grid/Platform.js";

export default interface Interface {
	Title?: string;
	Subtitle?: string;
	Platforms?: PlatformInformation[];
	ShowVerification?: boolean;
	OnDownload?: (Platform: PlatformInformation) => void;
	ApiPlatform?: "macos" | "windows" | "linux";
	Labels?: PlatformGridLabels;
}
