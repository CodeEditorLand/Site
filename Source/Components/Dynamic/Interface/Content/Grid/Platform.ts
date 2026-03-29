import type PlatformInformation from "../../Information/Platform.js";

export default interface Interface {
	title?: string;
	subtitle?: string;
	platforms: PlatformInformation[];
	showVerification?: boolean;
	onDownload?: (platform: PlatformInformation) => void;
}
