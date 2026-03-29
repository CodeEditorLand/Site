import type ContentSchema from "../Schema/Content.js";

export default interface Interface extends ContentSchema {
	name: string;
	size?: number;
	className?: string;
}
