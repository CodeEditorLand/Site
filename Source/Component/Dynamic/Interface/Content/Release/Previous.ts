import type ReleaseVersion from "../../Version/Release.js";

export default interface Interface {
	Title: string;
	Description?: string;
	Releases: ReleaseVersion[];
	ShowChangelog?: boolean;
	OnDownload?: (Version: string, Platform: string) => void;
	OnViewChangelog?: (Version: string) => void;
}
