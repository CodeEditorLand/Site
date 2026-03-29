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
		columns,
		data,
		striped = false,
		hoverable = false,
		bordered = true,
		compact = false,
		onRowClick,
		className,
	} = content;

	return (
		<div className="overflow-x-auto">
			<Table className={className}>
				<TableHeader>
					<TableRow>
						{columns.map((column, index) => (
							<TableHead key={index} className={column.className}>
								{column.header}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((row, rowIndex) => (
						<TableRow
							key={rowIndex}
							className={` ${striped && rowIndex % 2 === 1 ? "bg-muted/50" : ""} ${hoverable ? "hover:bg-muted/50" : ""} ${onRowClick ? "cursor-pointer" : ""} `}
							onClick={() => onRowClick?.(row)}>
							{columns.map((column, colIndex) => (
								<TableCell
									key={colIndex}
									className={column.className}>
									{column.render
										? column.render(row[column.key], row)
										: String(row[column.key] ?? "")}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export type { TableContent };
