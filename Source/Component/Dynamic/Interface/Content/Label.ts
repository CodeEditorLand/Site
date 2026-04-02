import type ContentSchema from "../Schema/Content.js";

export default interface Interface extends ContentSchema {
	Text: string;
	HtmlFor?: string;
	Required?: boolean;
	Disabled?: boolean;
}
