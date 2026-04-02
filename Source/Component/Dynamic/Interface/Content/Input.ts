import type ContentSchema from "../Schema/Content.js";

export default interface Interface extends ContentSchema {
	Label?: string;
	Placeholder?: string;
	Type?: "text" | "email" | "password" | "number" | "tel" | "url";
	Value?: string;
	DefaultValue?: string;
	OnChange?: (Value: string) => void;
	Error?: string;
	Disabled?: boolean;
	Required?: boolean;
	HelperText?: string;
}
