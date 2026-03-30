import type ContentSchema from "../Schema/Content.js";

export default interface Interface extends ContentSchema {
	text: string;
	variant?: "default" | "secondary" | "destructive" | "outline";
	showDot?: boolean;
	dotColor?: "green" | "yellow" | "red" | "blue";
}
