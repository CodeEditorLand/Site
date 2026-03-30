import type PlatformInformation from "../../Information/Platform.js";
import type PlatformGridLabels from "../../Label/Grid/Platform.js";

export default interface Interface {
	title?: string;
	subtitle?: string;
	platforms?: PlatformInformation[];
	showVerification?: boolean;
	onDownload?: (platform: PlatformInformation) => void;
	apiPlatform?: "macos" | "windows" | "linux";
	labels?: PlatformGridLabels;
}
