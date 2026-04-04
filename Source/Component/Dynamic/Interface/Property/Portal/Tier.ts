import type TierContent from "../../Content/Portal/Tier.js";

export default interface Property {
	Content: TierContent;
	Index: number;
	OnAction?: () => void;
	ClassName?: string;
}
