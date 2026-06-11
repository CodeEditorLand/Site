import type RequirementItem from "../../Item/Requirement.js";

export default interface Interface {
	Title: string;

	Description?: string;

	Requirements: {
		Minimum: RequirementItem[];

		Recommended: RequirementItem[];
	};

	Os?: string[];
}
