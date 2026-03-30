import type FeatureItem from "../Item/Feature.js";

export default interface Interface {
	title?: string;
	subtitle?: string;
	features: FeatureItem[];
	columns?: 1 | 2 | 3 | 4 | 5 | 6;
	gap?: "sm" | "md" | "lg" | "xl";
}
