import type ContentSchema from "../Schema/Content.js";

export default interface Interface extends ContentSchema {
	Name: string;
	Size?: number;
	ClassName?: string;
}
