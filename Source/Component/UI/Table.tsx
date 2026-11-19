"use client";

import * as React from "react";

import { cn } from "./Utility";

/**
 * Table - rows against columns, with a head that names each column.
 *
 * ─── WHAT THIS FILE ADDED, AND WHY ───────────────────────────────────────
 * The kit shipped the six parts of a table and no table: no density, no pinned
 * head, no empty row, no register, and no way for a cell to say that it is a
 * figure rather than a word. The matrix on `/Specimen` printed all four absences
 * at once, so they are answered here rather than in a wrapper:
 *
 *   density      `comfortable` (the reading rhythm) or `dense` (half the row
 *                padding, and nothing else - density is rhythm, never size)
 *   sticky       a head that stays at the top of a frame with a height, so a
 *                twenty-row matrix keeps its column names
 *   pinFirst     the first column stays at the leading edge while the frame
 *                scrolls sideways - a five-column table in a 360px band is read
 *                one row at a time, with the row's name attached to its cells
 *   bordered     the frame's one hairline, on the scroll container and not on
 *                the table, because the scroll moves the table and the edge must
 *                not
 *   TableEmpty   the empty state: the head stays (the head is the schema, and the
 *                schema is still true when there are no rows) and the body prints
 *                what would be here, why it is not, and where to go
 *   TableRegister  the line above a table: `# TIERS / 04`
 *
 * ─── THE EMPTY ROW KEEPS THE HEAD ────────────────────────────────────────
 * A table that disappears when it has no rows is a table that hides the one fact
 * it still knows - what its columns are. So `TableEmpty` is a row, not a
 * replacement: the `<thead>` renders, and the body holds one cell spanning the
 * columns.
 *
 * ─── THE ONE-ROW STATE NEEDS NO CODE ─────────────────────────────────────
 * A table of one row is a table. It renders the head, one row and the register,
 * and the register is what makes the state legible: `# TIERS / 01` tells the
 * reader that the set is a set of one, which a bare row cannot.
 */

/** The row rhythm. `comfortable` is the reading rhythm; `dense` halves it. */
type TableDensity = "comfortable" | "dense";

interface TableProps extends React.ComponentProps<"table"> {
	/** The row rhythm. Omitted means the kit's own padding, untouched. */
	density?: TableDensity;

	/** Whether the head pins to the top of the frame. */
	sticky?: boolean;

	/** Whether the first column pins to the leading edge. */
	pinFirst?: boolean;

	/** Whether the scroll container draws the frame's one hairline. */
	bordered?: boolean;

	/**
	 * The frame's height, when the head pins. A sticky head needs a frame with a
	 * height to pin inside; the height belongs to the container, not the table,
	 * because the container is what scrolls.
	 */
	height?: string;
}

function Table({
	className,
	density,
	sticky,
	pinFirst,
	bordered,
	height,
	...props
}: TableProps) {
	return (
		<div
			data-slot="table-container"
			data-density={density}
			data-sticky={sticky ? "true" : undefined}
			data-pin-first={pinFirst ? "true" : undefined}
			data-bordered={bordered ? "true" : undefined}
			style={height === undefined ? undefined : { maxBlockSize: height }}
			className="relative w-full overflow-x-auto"
		>
			<table
				data-slot="table"
				className={cn("w-full caption-bottom", className)}
				{...props}
			/>
		</div>
	);
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
	return (
		<thead data-slot="table-header" className={cn(className)} {...props} />
	);
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
	return (
		<tbody
			data-slot="table-body"
			className={cn("[&_tr:last-child]:border-b-0", className)}
			{...props}
		/>
	);
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				"border-t border-[var(--Border)] bg-[color-mix(in_srgb,var(--CardForeground)_10%,transparent)] font-medium [&>tr]:last:border-b-0",
				className,
			)}
			{...props}
		/>
	);
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				"border-b border-[var(--Border)] transition-colors hover:bg-[color-mix(in_srgb,var(--CardForeground)_10%,transparent)] data-[state=selected]:bg-[color-mix(in_srgb,var(--CardForeground)_10%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				"h-10 whitespace-nowrap px-4 text-left align-middle font-mono text-sm font-medium uppercase tracking-rule text-card-foreground opacity-70 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
}

interface TableCellProps extends React.ComponentProps<"td"> {
	/** A figure column: right-aligned and tabular. */
	numeric?: boolean;

	/** A column that may wrap - the long-text column. */
	wrap?: boolean;

	/** A value the table does not have. It prints a word, never an empty cell. */
	empty?: boolean;
}

function TableCell({
	className,
	numeric,
	wrap,
	empty,
	...props
}: TableCellProps) {
	return (
		<td
			data-slot="table-cell"
			data-numeric={numeric ? "true" : undefined}
			data-wrap={wrap ? "true" : undefined}
			data-empty={empty ? "true" : undefined}
			className={cn(
				"whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
}

interface TableCaptionProps extends React.ComponentProps<"caption"> {
	/**
	 * The caption's own register, printed before its sentence: `# TIERS / 04`.
	 * A caption without a register is the kit's caption, unchanged.
	 */
	register?: React.ReactNode;
}

function TableCaption({
	className,
	register,
	children,
	...props
}: TableCaptionProps) {
	return (
		<caption
			data-slot="table-caption"
			className={cn("mt-4 text-card-foreground opacity-70", className)}
			{...props}
		>
			{register === undefined ? null : (
				<span className="TableRegister">{register}</span>
			)}
			{children}
		</caption>
	);
}

interface TableEmptyProps {
	/** How many columns the empty row spans. */
	colSpan: number;

	/** The state word. `◎` is the grammar's mark for an absence. */
	mark?: string;

	/** What would be here. */
	statement: string;

	/** Why it is not. */
	cause: string;

	/** Where to go. Printed as the row's one action. */
	next?: { label: string; href: string };

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * TableEmpty - the empty state, as a row.
 *
 * The head above it is the schema and it stays; this row says what the schema
 * would have held. The three parts are the same three every absence on this site
 * prints (`SurfaceAbsent`, `ShellState`): what would be here, why it is not, and
 * where to read the thing itself.
 */
function TableEmpty({
	colSpan,
	mark = "◎",
	statement,
	cause,
	next,
	className,
}: TableEmptyProps) {
	return (
		<tr data-slot="table-empty" className={className}>
			<td colSpan={colSpan}>
				<div className="TableEmpty">
					<p className="TableEmpty__Head">
						<span className="TableEmpty__Mark" aria-hidden="true">
							{mark}
						</span>
						<span className="TableEmpty__Word">NO ROW</span>
					</p>

					<p className="TableEmpty__Statement">{statement}</p>

					<p className="TableEmpty__Cause">{cause}</p>

					{next === undefined ? null : (
						<a className="TableEmpty__Next" href={next.href}>
							<span aria-hidden="true">↳</span> {next.label}
						</a>
					)}
				</div>
			</td>
		</tr>
	);
}

interface TableRegisterProps {
	/** The set's name. `TIERS` prints as `# TIERS / 04`. */
	label: string;

	/** The set's own length. Zero-padded by the caller where the site pads. */
	count: string | number;

	/** What the figure counts, when that is not obvious. */
	note?: string;
}

/**
 * TableRegister - the line above a table: `# TIERS / 04`.
 *
 * The mark, the label, U+2001's job done by the rule, and the count. It is the
 * same register a `RecordBand` prints, at the table's scale, so a table on this
 * site opens the way every other set does.
 */
function TableRegister({ label, count, note }: TableRegisterProps) {
	return (
		<p className="TableRegister">
			<span className="TableRegister__Mark" aria-hidden="true">
				#
			</span>
			<span className="TableRegister__Label">{label}</span>
			<span className="TableRegister__Rule" aria-hidden="true">
				/
			</span>
			<span className="TableRegister__Count">{count}</span>
			{note === undefined ? null : (
				<span className="TableRegister__Note">{note}</span>
			)}
		</p>
	);
}

export {
	type TableDensity,
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
	TableEmpty,
	TableRegister,
};
