import { Footer } from "../Layout/Footer";
import { Header } from "../Layout/Header";
import { DynamicPlatformGrid } from "./DynamicPlatformGrid";
import { DynamicPreviousReleases } from "./DynamicPreviousReleases";
import { DynamicSystemRequirements } from "./DynamicSystemRequirements";
import { DynamicVerificationInfo } from "./DynamicVerificationInfo";
import type { PlatformGridContent } from "./DynamicPlatformGrid";
import type { PreviousReleasesContent } from "./DynamicPreviousReleases";
import type { SystemRequirementsContent } from "./DynamicSystemRequirements";
import type { VerificationInfoContent } from "./DynamicVerificationInfo";
import type { HeaderContent } from "../Layout/Header";
import type { FooterContent } from "../Layout/Footer";

interface DownloadsPageContent {
	platformGrid: PlatformGridContent;
	systemRequirements: SystemRequirementsContent;
	verificationInfo: VerificationInfoContent;
	previousReleases: PreviousReleasesContent;
	header?: HeaderContent;
	footer?: FooterContent;
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
		footer,
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
							{ label: "Docs", href: "/docs" },
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

			<main className="flex-1">
				<DynamicPlatformGrid content={platformGrid} />

				<DynamicSystemRequirements content={systemRequirements} />

				<DynamicVerificationInfo content={verificationInfo} />

				<DynamicPreviousReleases content={previousReleases} />
			</main>

			<Footer content={footer || {}} />
		</div>
	);
}

export type { DownloadsPageContent };
