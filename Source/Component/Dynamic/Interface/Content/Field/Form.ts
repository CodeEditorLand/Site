import type ContentSchema from "../../Schema/Content.js";

export default interface Interface extends ContentSchema {
	label?: string;
	error?: string;
	helperText?: string;
	required?: boolean;
	orientation?: "vertical" | "horizontal";
}
