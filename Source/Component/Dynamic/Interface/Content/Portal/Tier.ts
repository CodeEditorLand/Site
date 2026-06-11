/**
 * A single feature row in a tier description panel.
 *
 * Icon[] accepts two kinds of values:
 * - Lucide registry key e.g. "Shield", "Cpu", "GitBranch"
 * - Public image path e.g. "/Image/GitHub.svg", "/Image/Rust.svg"
 * Both are resolved at render time by DynamicPortal's icon dispatch logic.
 */
export interface TierItem {
	Heading: string;

	Description: string;

	Icon?: string[];

	Status?: "Ready" | "ComingSoon" | "WIP";
}

export default interface Interface {
	Identifier: "Cloud" | "Provider" | "LocalFirst" | "Enterprise";

	Title: string;

	Subtitle: string;

	Color: string;

	BorderColor: string;

	/** Lucide registry key for the tier header icon. See TierIconRegistry in DynamicPortal.tsx. */
	Icon: string;

	Feature: TierItem[];

	Capability: string[];

	Status?: "Ready" | "ComingSoon" | "WIP";

	Protocol?: string;

	Badge?: string;

	/** Optional: highlight a specific release version in the tier panel */
	PreviousRelease?: string;
}
