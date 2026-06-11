import type ContentSchema from "../Schema/Content.js";

export default interface Interface extends ContentSchema {
	Text: string;

	Variant?: "default" | "secondary" | "destructive" | "outline";

	ShowDot?: boolean;

	DotColor?: "green" | "yellow" | "red" | "blue";
}
