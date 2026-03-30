import { Header } from "../Layout/Header";
import { DynamicPlatformGrid } from "./DynamicPlatformGrid";
import { DynamicPreviousReleases } from "./DynamicPreviousReleases";
import { DynamicSystemRequirements } from "./DynamicSystemRequirements";
import { DynamicVerificationInfo } from "./DynamicVerificationInfo";
import type Interface from "./Interface/Content/Page/Download.js";
import type Property from "./Interface/Property/Page/Download.js";

/**
 * Dynamic DownloadsPage composition
 * Assembles PlatformGrid, SystemRequirements, VerificationInfo, PreviousReleases
 */
export function DownloadsPage({ content, className }: Property) {
	const {
		platformGrid: PlatformGrid,
		systemRequirements: SystemRequirements,
		verificationInfo: VerificationInformation,
		previousReleases: PreviousReleases,
		header: HeaderContent,
	} = content;

	return (
		<div className={`flex min-h-screen flex-col ${className || ""}`}>
			<Header content={HeaderContent} />

			<div className="flex-1">
				<DynamicPlatformGrid content={PlatformGrid} />

				<DynamicSystemRequirements content={SystemRequirements} />

				<DynamicVerificationInfo content={VerificationInformation} />

				<DynamicPreviousReleases content={PreviousReleases} />
			</div>
		</div>
	);
}
