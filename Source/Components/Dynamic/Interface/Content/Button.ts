import type ContentSchema from "../Schema/Content.js";

export default interface Interface extends ContentSchema {
	text?: string;
	icon?: string;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	size?: "default" | "sm" | "lg" | "icon";
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	fullWidth?: boolean;
	onClick?: () => void;
	href?: string;
}
