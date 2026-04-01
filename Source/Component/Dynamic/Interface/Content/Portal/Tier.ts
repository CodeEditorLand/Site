export interface TierItem {
	Heading: string;
	Description: string;
	Icon?: string;
}

export default interface Interface {
	Identifier: "Cloud" | "Provider" | "LocalFirst" | "Enterprise";
	Title: string;
	Subtitle: string;
	Color: string;
	BorderColor: string;
	Icon: string;
	Feature: TierItem[];
	Capability: string[];
	Protocol?: string;
	Badge?: string;
}
