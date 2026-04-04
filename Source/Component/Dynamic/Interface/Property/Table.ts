import type TableContent from "../Content/Table.js";

export default interface Interface<T extends Record<string, unknown>> {
	Content: TableContent<T>;
	ClassName?: string;
}
