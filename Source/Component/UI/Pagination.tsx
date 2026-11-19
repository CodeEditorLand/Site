import * as lucide from "lucide-react";

import * as React from "react";

import { Button, ButtonVariants } from "./Button";

import { cn } from "./Utility";

/**
 * Pagination - which slice of a long set is printed.
 *
 * ─── THE FIGURE IS THE POINT ─────────────────────────────────────────────
 * The kit's pagination is a row of links. A reader who cannot see the total cannot
 * tell whether they are near the end, so the family's form is a register line and
 * then the row: `# PAGE / 03 OF 12` with the slice it is showing
 * (`SHOWING 25-36 OF 137`). `PaginationStatus` is that line, and it prints
 * `UNAVAILABLE` for a total the page does not know - never `0`, never a guess.
 *
 * ─── THE STATES ──────────────────────────────────────────────────────────
 *
 *   ONE PAGE    `PAGE / 01 OF 01`, both arrows disabled. A control that hides
 *               itself when there is one page is a control the reader has to
 *               learn twice; it stays and states the set's size.
 *   MANY PAGES  a window of five numbers with an ellipsis at each open end -
 *               `PaginationRange`, derived from the total, so a set of two hundred
 *               prints the same seven cells as a set of twelve.
 *   UNKNOWN     the total has not arrived: the arrows are offered, the figure says
 *               `UNAVAILABLE`, and the count is not invented.
 *
 * ─── ON PAPER ────────────────────────────────────────────────────────────
 * A pagination control prints links to pages that are not printed. The printed
 * sheet prints all its rows instead, so the control is hidden in print and the
 * table's register carries the figure.
 */

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			role="navigation"
			aria-label="pagination"
			data-slot="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	);
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn("flex flex-row items-center gap-1", className)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
	return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
	React.ComponentProps<"a">;

function PaginationLink({
	className,
	isActive,
	size = "icon",
	...props
}: PaginationLinkProps) {
	return (
		<a
			aria-current={isActive ? "page" : undefined}
			data-slot="pagination-link"
			data-active={isActive}
			className={cn(
				ButtonVariants({
					variant: isActive ? "outline" : "ghost",
					size,
				}),
				className,
			)}
			{...props}
		/>
	);
}

function PaginationPrevious({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn(
				"gap-1 px-[var(--Spacing2Point5)] sm:pl-[var(--Spacing2Point5)]",
				className,
			)}
			{...props}
		>
			<lucide.ChevronLeft />
			<span className="hidden sm:block">Previous</span>
		</PaginationLink>
	);
}

function PaginationNext({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn(
				"gap-1 px-[var(--Spacing2Point5)] sm:pr-[var(--Spacing2Point5)]",
				className,
			)}
			{...props}
		>
			<span className="hidden sm:block">Next</span>
			<lucide.ChevronRight />
		</PaginationLink>
	);
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn("flex size-9 items-center justify-center", className)}
			{...props}
		>
			<lucide.MoreHorizontal className="size-4" />
			<span className="sr-only">More pages</span>
		</span>
	);
}

interface PaginationStatusProps {
	/** The page being printed, one-based. */
	page: number;

	/** How many pages there are. `undefined` prints `UNAVAILABLE`. */
	total?: number;

	/** The slice's own figures: `SHOWING 25-36 OF 137`. */
	range?: string;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * PaginationStatus - the register line above the row.
 *
 * `# PAGE / 03 OF 12` is a register, so it prints the mark, the label, the rule and
 * the count in that order. The count is the caller's, because only the caller knows
 * whether the total is known - and a total it does not know prints `UNAVAILABLE`.
 */
function PaginationStatus({
	page,
	total,
	range,
	className,
}: PaginationStatusProps) {
	const Pad = (Value: number): string => String(Value).padStart(2, "0");

	return (
		<div className={cn("PaginationStatus", className)}>
			<p className="DisplayRegister">
				<span className="DisplayRegister__Mark" aria-hidden="true">
					#
				</span>
				<span className="DisplayRegister__Label">PAGE</span>
				<span className="DisplayRegister__Rule" aria-hidden="true">
					/
				</span>
				<span className="DisplayRegister__Value">
					{Pad(page)} OF{" "}
					{total === undefined ? "UNAVAILABLE" : Pad(total)}
				</span>
			</p>

			{range === undefined ? null : (
				<span className="PaginationStatus__Range">{range}</span>
			)}
		</div>
	);
}

interface PaginationRangeProps {
	/** The page being printed, one-based. */
	page: number;

	/** How many pages there are. */
	total: number;

	/** How many numbers are printed around the current one. Default 1 each side. */
	window?: number;

	/** The href for a page number. */
	hrefOf: (Page: number) => string;
}

/**
 * PaginationRange - the window of numbers, and the ellipses it needs.
 *
 * A set of two hundred prints seven cells: the first, an ellipsis, three around the
 * current page, an ellipsis, the last. The ellipsis is a glyph and not a control -
 * a "jump" that asked for a number would be a second way to do what the numbers
 * already do.
 */
function PaginationRange({
	page,
	total,
	window = 1,
	hrefOf,
}: PaginationRangeProps) {
	const Pages = new Set<number>([1, total]);

	for (let Offset = -window; Offset <= window; Offset += 1) {
		const Candidate = page + Offset;

		if (Candidate >= 1 && Candidate <= total) Pages.add(Candidate);
	}

	const Sorted = [...Pages].sort((A, B) => A - B);

	const Rows: React.ReactNode[] = [];

	Sorted.forEach((Value, Index) => {
		const Previous = Sorted[Index - 1];

		if (Previous !== undefined && Value - Previous > 1) {
			Rows.push(
				<PaginationItem key={`gap-${Value}`}>
					<PaginationEllipsis />
				</PaginationItem>,
			);
		}

		Rows.push(
			<PaginationItem key={Value}>
				<PaginationLink href={hrefOf(Value)} isActive={Value === page}>
					{String(Value).padStart(2, "0")}
				</PaginationLink>
			</PaginationItem>,
		);
	});

	return <>{Rows}</>;
}

export {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
	PaginationStatus,
	PaginationRange,
};
