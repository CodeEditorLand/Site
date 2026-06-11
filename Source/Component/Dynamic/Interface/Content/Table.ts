import type TableColumn from "../Column/Table.js";

import type ContentSchema from "../Schema/Content.js";

export default interface Interface<
	T = Record<string, unknown>,
> extends ContentSchema {
	Columns: TableColumn<T>[];

	Data: T[];

	Striped?: boolean;

	Hoverable?: boolean;

	Bordered?: boolean;

	Compact?: boolean;

	OnRowClick?: (Row: T) => void;
}
