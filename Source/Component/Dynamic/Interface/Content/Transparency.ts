import type TransparencyItem from "../Item/Transparency.js";
import type BuildVariantItem from "../Item/BuildVariant.js";
import type DeploymentStrategyItem from "../Item/DeploymentStrategy.js";

export default interface Interface {
	readonly Title?: string;
	readonly Subtitle?: string;
	readonly Policy: readonly TransparencyItem[];
	readonly Variant: readonly BuildVariantItem[];
	readonly Strategy: readonly DeploymentStrategyItem[];
	readonly MatrixPermutation: number;
	readonly SourceURL?: string;
}
