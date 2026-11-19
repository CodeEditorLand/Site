"use client";

import * as lucide from "lucide-react";

import * as React from "react";

import { DayPicker } from "react-day-picker";

import { ButtonVariants } from "./Button";

import { cn } from "./Utility";

/**
 * Calendar - a month, printed.
 *
 * ─── THE VERDICT, STATED WHERE IT IS MADE ────────────────────────────────
 * The calendar is the one component in the family the document has no surface for
 * yet, and the honest answer is not "delete it". A dossier of this kind carries
 * dated facts - release dates, the `as of` on every measurement, the age of a stale
 * record - and a date's meaning is its NEIGHBOURS. `14 NOV` is a fact; a month with
 * the 14th marked and the four days around it is the fact's context. So the month
 * stays, and it is given the form the rest of the document already uses: a matrix of
 * days, a head of weekday names, one hairline, no radius.
 *
 * ─── WHAT IT IS NOT FOR ──────────────────────────────────────────────────
 * Picking a booking. The site has no scheduling surface, no form asks for a date,
 * and a calendar in a filter would be a fifth control on a bar that has four. The
 * month is a PLATE - a figure of a period - and `CalendarPlate` is that form.
 *
 * ─── THE STATES ──────────────────────────────────────────────────────────
 *   empty      the month has no events: the days print and the plate says the month
 *              is empty, which is a fact about the period and not a failure.
 *   unavailable  the period's facts have not arrived: the plate prints
 *              `UNAVAILABLE` and the month still prints, because the calendar of a
 *              month is known even when what happened in it is not.
 *   disabled   a day outside the window: quiet, and it refuses the press.
 */

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: React.ComponentProps<typeof DayPicker>) {
	const DayPickerProps = {
		showOutsideDays,

		className: cn("p-3", className),

		classNames: {
			months: "flex flex-col sm:flex-row gap-2",

			month: "flex flex-col gap-4",

			caption: "flex justify-center pt-1 relative items-center w-full",

			caption_label: "font-medium",

			nav: "flex items-center gap-1",

			nav_button: cn(
				ButtonVariants({ variant: "outline" }),

				"size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
			),

			nav_button_previous: "absolute left-1",

			nav_button_next: "absolute right-1",

			table: "w-full border-collapse space-x-1",

			head_row: "flex",

			head_cell: "text-muted-foreground flat w-8 font-normal text-sm",

			row: "flex w-full mt-2",

			cell: cn(
				"relative p-0 text-center focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-none",

				props.mode === "range"
					? "[&:has(>.day-range-end)]:rounded-none [&:has(>.day-range-start)]:rounded-none first:[&:has([aria-selected])]:rounded-none last:[&:has([aria-selected])]:rounded-none"
					: "[&:has([aria-selected])]:rounded-none",
			),

			day: cn(
				ButtonVariants({ variant: "ghost" }),

				"size-8 p-0 font-normal aria-selected:opacity-100",
			),

			day_range_start:
				"day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",

			day_range_end:
				"day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",

			day_selected:
				"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",

			// The today mark is the site's current-position marker: `.CalendarDay--today`
			// draws a 2px accent square at the cell's leading edge as an inset rule. The
			// class also fills the cell with the accent and sets its label to
			// `--AccentForeground`, so the day is ruled and filled - the rule is the mark.
			day_today: "CalendarDay--today bg-accent text-accent-foreground",

			day_outside:
				"day-outside text-muted-foreground aria-selected:text-muted-foreground",

			day_disabled: "text-muted-foreground opacity-50",

			day_range_middle:
				"aria-selected:bg-accent aria-selected:text-accent-foreground",

			day_hidden: "invisible",
			...classNames,
		},

		icons: {
			Chevron: lucide.ChevronLeft,

			ChevronLeft: lucide.ChevronLeft,

			ChevronRight: lucide.ChevronRight,
		},
		...props,
	} as unknown as React.ComponentProps<typeof DayPicker>;

	return <DayPicker {...DayPickerProps} />;
}

interface CalendarPlateProps {
	/** The plate's register: `RELEASES` prints as `# RELEASES / NOV 2026`. */
	label: string;

	/** The period, printed after the register's rule. */
	period: string;

	/** The state the period's facts are in. */
	state?: "rest" | "empty" | "unavailable";

	/** What the plate says when it is empty or unavailable. */
	note?: string;

	/** The month itself. */
	children: React.ReactNode;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * CalendarPlate - the month as a plate, with its register and its adverse arms.
 *
 * The month always prints: which days a month has is known before what happened on
 * them is. What the state changes is the note beside the register - `◎ NO MARK` for
 * an empty month, `◎ UNAVAILABLE` for one whose facts have not arrived - and the
 * `note` prop prints the sentence at the plate's foot. An empty month is a fact
 * about the period, not a failure of the page.
 */
function CalendarPlate({
	label,
	period,
	state,
	note,
	children,
	className,
}: CalendarPlateProps) {
	return (
		<div className={cn("CalendarPlate", className)} data-state={state}>
			<div className="CalendarPlate__Head">
				<p className="DisplayRegister">
					<span className="DisplayRegister__Mark" aria-hidden="true">
						#
					</span>
					<span className="DisplayRegister__Label">{label}</span>
					<span className="DisplayRegister__Rule" aria-hidden="true">
						/
					</span>
					<span className="DisplayRegister__Value">{period}</span>
				</p>

				{state === undefined || state === "rest" ? null : (
					<span className="DisplayRegister__Note">
						{state === "empty" ? "◎ NO MARK" : "◎ UNAVAILABLE"}
					</span>
				)}
			</div>

			<div className="CalendarPlate__Body">{children}</div>

			{note === undefined ? null : (
				<p className="CalendarPlate__Empty">
					<span aria-hidden="true">↳</span> {note}
				</p>
			)}
		</div>
	);
}

export { Calendar, CalendarPlate };
