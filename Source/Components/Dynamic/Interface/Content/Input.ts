import type ContentSchema from "../Schema/Content.js";

export default interface Interface extends ContentSchema {
	label?: string;
	placeholder?: string;
	type?: "text" | "email" | "password" | "number" | "tel" | "url";
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	error?: string;
	disabled?: boolean;
	required?: boolean;
	helperText?: string;
}
