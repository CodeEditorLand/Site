import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import type Property from "./Interface/Property/Table.js";

/**
 * Dynamic Table component that accepts content schema
 * Composes Table compound components based on columns and data
 */
export function DynamicTable<T extends Record<string, unknown>>({
	content,
}: Property<T>) {
	const {
		columns: ColumnList,
		data: DataList,
		striped: Striped = false,
		hoverable: Hoverable = false,
		bordered: Bordered = true,
		compact: Compact = false,
		onRowClick: OnRowClick,
		className: ClassName,
	} = content;

	return (
		<div className="overflow-x-auto">
			<Table className={ClassName}>
				<TableHeader>
					<TableRow>
						{ColumnList.map((Column, Index) => (
							<TableHead key={Index} className={Column.className}>
								{Column.header}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{DataList.map((Row, RowIndex) => (
						<TableRow
							key={RowIndex}
							className={` ${Striped && RowIndex % 2 === 1 ? "bg-muted/50" : ""} ${Hoverable ? "hover:bg-muted/50" : ""} ${OnRowClick ? "cursor-pointer" : ""} `}
							onClick={() => OnRowClick?.(Row)}>
							{ColumnList.map((Column, ColumnIndex) => (
								<TableCell
									key={ColumnIndex}
									className={Column.className}>
									{Column.render
										? Column.render(Row[Column.key], Row)
										: String(Row[Column.key] ?? "")}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
