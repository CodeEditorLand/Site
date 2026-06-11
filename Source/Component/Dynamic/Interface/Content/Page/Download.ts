import type { HeaderContent } from "../../../../Layout/Header.js";

import type PlatformGridContent from "../Grid/Platform.js";

import type VerificationInfoContent from "../Information/Verification.js";

import type PreviousReleasesContent from "../Release/Previous.js";

import type SystemRequirementsContent from "../Requirement/System.js";

export default interface Interface {
	PlatformGrid: PlatformGridContent;

	SystemRequirements: SystemRequirementsContent;

	VerificationInfo: VerificationInfoContent;

	PreviousReleases: PreviousReleasesContent;

	Header?: HeaderContent;

	Footer?: Record<string, unknown>;
}
