import type ReleaseVersion from "../../Version/Release.js";

export default interface Interface {
	title: string;
	description?: string;
	releases: ReleaseVersion[];
	showChangelog?: boolean;
	onDownload?: (version: string, platform: string) => void;
	onViewChangelog?: (version: string) => void;
}
