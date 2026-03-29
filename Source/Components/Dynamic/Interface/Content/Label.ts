import type ContentSchema from "../Schema/Content.js";

export default interface Interface extends ContentSchema {
	text: string;
	htmlFor?: string;
	required?: boolean;
	disabled?: boolean;
}
