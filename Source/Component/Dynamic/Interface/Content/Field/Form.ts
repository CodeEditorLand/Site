import type ContentSchema from "../../Schema/Content.js";

export default interface Interface extends ContentSchema {
	Label?: string;

	Error?: string;

	HelperText?: string;

	Required?: boolean;

	Orientation?: "vertical" | "horizontal";
}
