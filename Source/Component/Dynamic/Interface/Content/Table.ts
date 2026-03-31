import type TableColumn from "../Column/Table.js";
import type ContentSchema from "../Schema/Content.js";

export default interface Interface<
	T = Record<string, unknown>,
> extends ContentSchema {
	columns: TableColumn<T>[];
	data: T[];
	striped?: boolean;
	hoverable?: boolean;
	bordered?: boolean;
	compact?: boolean;
	onRowClick?: (row: T) => void;
}
