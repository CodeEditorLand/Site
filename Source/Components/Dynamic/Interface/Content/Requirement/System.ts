import type RequirementItem from "../../Item/Requirement.js";

export default interface Interface {
	title: string;
	description?: string;
	requirements: {
		minimum: RequirementItem[];
		recommended: RequirementItem[];
	};
	os?: string[];
}
