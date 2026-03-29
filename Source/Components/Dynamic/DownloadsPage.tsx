import { Header, type HeaderContent } from "../Layout/Header";
import {
	DynamicPlatformGrid,
	type PlatformGridContent,
} from "./DynamicPlatformGrid";
import {
	DynamicPreviousReleases,
	type PreviousReleasesContent,
} from "./DynamicPreviousReleases";
import {
	DynamicSystemRequirements,
	type SystemRequirementsContent,
} from "./DynamicSystemRequirements";
import {
	DynamicVerificationInfo,
	type VerificationInfoContent,
} from "./DynamicVerificationInfo";

interface DownloadsPageContent {
	platformGrid: PlatformGridContent;
	systemRequirements: SystemRequirementsContent;
	verificationInfo: VerificationInfoContent;
	previousReleases: PreviousReleasesContent;
	header?: HeaderContent;
	footer?: Record<string, unknown>;
}

interface DownloadsPageProps {
	content: DownloadsPageContent;
	className?: string;
}

/**
 * Dynamic DownloadsPage composition
 * Assembles PlatformGrid, SystemRequirements, VerificationInfo, PreviousReleases
 */
export function DownloadsPage({ content, className }: DownloadsPageProps) {
	const {
		platformGrid,
		systemRequirements,
		verificationInfo,
		previousReleases,
		header,
	} = content;

	return (
		<div className={`flex min-h-screen flex-col ${className || ""}`}>
			<Header
				content={
					header || {
						logo: { text: "Land" },
						navigation: [
							{
								label: "Downloads",
								href: "/downloads",
							},
							{
								label: "Docs",
								href: "https://github.com/CodeEditorLand/Land#readme",
							},
							{ label: "Support", href: "/support" },
						],
						actions: [
							{ type: "mobile-menu" as const },
							{
								text: "Sign In",
								variant: "ghost",
								href: "/account/signin",
							},
						],
					}
				}
			/>

			<div className="flex-1">
				<DynamicPlatformGrid content={platformGrid} />

				<DynamicSystemRequirements content={systemRequirements} />

				<DynamicVerificationInfo content={verificationInfo} />

				<DynamicPreviousReleases content={previousReleases} />
			</div>
		</div>
	);
}

export type { DownloadsPageContent };
