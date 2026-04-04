import type ContentSchema from "../Schema/Content.js";

export default interface Interface extends ContentSchema {
	Text?: string;
	Icon?: string;
	Variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	Size?: "default" | "sm" | "lg" | "icon";
	Type?: "button" | "submit" | "reset";
	Disabled?: boolean;
	FullWidth?: boolean;
	OnClick?: () => void;
	Href?: string;
}
