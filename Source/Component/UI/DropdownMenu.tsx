"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import * as React from "react";

import { DoorContext, UseDoorRef, UseSlipRoot } from "./Overlay";

import {
	SlipEmpty,
	SlipFoot,
	SlipRegister,
	type SlipFootItem,
	type SlipHead,
} from "./Slip";

import { cn } from "./Utility";

/**
 * DropdownMenu - the menu primitive, wearing the slip.
 *
 * Behaviour is Radix's and is not restated here: arrow keys, Home/End, typeahead,
 * Escape, outside-click, focus return to the trigger, the roving tabindex. What
 * this file decides is the *surface* and the *row grammar*, and it decides them
 * by handing the site's classes and two data attributes to the primitive:
 *
 *   `data-mark`  the row's leading glyph - `→` action, `/` route, `✓` current,
 *                `◎` unavailable. The stylesheet draws it in the reserved
 *                1.25rem column, so no caller can misalign a label.
 *   `data-meta`  the row's trailing cell - a chord, a section, a STATUS word.
 *
 * The attributes rather than spans are what let `asChild` keep working: an item
 * whose body is the caller's own `<a>` cannot have children injected into it, and
 * forking the primitive to add two spans is how five controls become five
 * grammars. See `Stylesheet/System/UI/_Item.scss`.
 */

/**
 * The register line a slip opens with: `# LOCALE / 05`.
 *
 * `SlipRegister` and the `SlipHead` shape live in `./Slip` with the rest of the
 * grammar's small parts, so the palette, the select and the menu print the same
 * line from one implementation.
 */

function DropdownMenu({
	open,
	defaultOpen,
	onOpenChange,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
	const Root = UseSlipRoot({ open, defaultOpen, onOpenChange });

	return (
		<DoorContext.Provider value={Root.Door}>
			<DropdownMenuPrimitive.Root
				data-slot="dropdown-menu"
				open={Root.Open}
				onOpenChange={Root.OnOpenChange}
				{...props}
			/>
		</DoorContext.Provider>
	);
}

function DropdownMenuPortal({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
	return (
		<DropdownMenuPrimitive.Portal
			data-slot="dropdown-menu-portal"
			{...props}
		/>
	);
}

function DropdownMenuTrigger({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
	const Door = React.useContext(DoorContext);

	const Ref = UseDoorRef(Door);

	return (
		<DropdownMenuPrimitive.Trigger
			ref={Ref}
			data-slot="dropdown-menu-trigger"
			{...props}
		/>
	);
}

/**
 * `children` is destructured here, and that is load-bearing, not style.
 *
 * The register line is written as a JSX child in the element body, and a body
 * child is a `createElement` argument of its own - React assigns it over the
 * `children` that `{...props}` carried (`react.development.js`: `if (1 ===
 * childrenLength) props.children = children;`). So a caller's rows, arriving
 * through the spread, were silently replaced by the one register line: the
 * locale slip opened on `# LOCALE / 05` and nothing else, and every other
 * dropdown on the site (the account menu included) did the same. `PopoverContent`
 * and `SelectContent` already destructure `children` for exactly this reason;
 * this one did not.
 *
 * Rendering it explicitly, after the head, is also the grammar's order: the
 * register line is the slip's first line and its rows follow it.
 */
function DropdownMenuContent({
	className,
	sideOffset = 4,
	dense = false,
	head,
	empty,
	foot,
	children,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> & {
	/**
	 * The tight rhythm - `data-density="dense"`, read by the row grammar.
	 *
	 * For a set the reader *scans* rather than picks: forty locales, a page
	 * index, the two hundred rows of a register. It moves the row floor from
	 * 2rem to 1.5rem and leaves the type, the mark column and the hairline
	 * alone, so a dense menu is the same instrument at a shorter stride.
	 */
	dense?: boolean;

	/** The register line the slip opens with. Omitted only by a slip with no rows. */
	head?: SlipHead | undefined;

	/** The `empty` arm: a menu with no rows says so instead of opening blank. */
	empty?: { Mark?: string; Line: string } | undefined;

	/** The keyboard path, when the menu states one. */
	foot?: readonly SlipFootItem[] | undefined;
}) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				data-slot="dropdown-menu-content"
				data-density={dense ? "dense" : undefined}
				sideOffset={sideOffset}
				aria-label={head?.Name}
				className={cn("Slip", className)}
				{...props}
			>
				{head ? <SlipRegister head={head} /> : null}
				{children}
				{empty === undefined ? null : (
					<SlipEmpty
						Mark={empty.Mark ?? "NO RECORD"}

						Line={empty.Line}
					/>
				)}
				{foot === undefined ? null : <SlipFoot Items={foot} />}
			</DropdownMenuPrimitive.Content>
		</DropdownMenuPrimitive.Portal>
	);
}

function DropdownMenuGroup({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
	return (
		<DropdownMenuPrimitive.Group
			data-slot="dropdown-menu-group"
			{...props}
		/>
	);
}

function DropdownMenuItem({
	className,
	inset,
	variant = "default",
	mark = "→",
	meta,
	reason,
	current,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
	inset?: boolean;

	variant?: "default" | "destructive";

	/** The leading glyph. `→` acts, `/` navigates. */
	mark?: string | undefined;

	/** The trailing cell - a chord, a count, a STATUS word. */
	meta?: string | undefined;

	/**
	 * Why the row cannot be used, printed in the meta cell.
	 *
	 * `_Item.scss` states the rule and could not keep it: a disabled row takes
	 * `◎` and keeps full legibility, and its meta cell is supposed to print the
	 * reason from the STATUS vocabulary - but the reason had no prop, so a
	 * disabled row either said nothing or said whatever the caller happened to
	 * put in `meta`. One prop, one cell, and the reason is a fact the row
	 * carries rather than a sentence in a comment.
	 */
	reason?: string | undefined;

	/**
	 * This row is the value in force - the locale the reader is on, the route they
	 * are at. It draws the leading accent rule and the `✓` the stylesheet owns,
	 * rather than asking the caller to pick a colour class that only works on a
	 * white surface.
	 */
	current?: boolean;
}) {
	return (
		<DropdownMenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-inset={inset}
			data-variant={variant}
			data-mark={mark}
			data-meta={meta}
			data-reason={reason}
			data-current={current ? "true" : undefined}
			className={cn("Slip__Row", className)}
			{...props}
		/>
	);
}

function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	meta,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
	meta?: string | undefined;
}) {
	return (
		<DropdownMenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			// No `data-mark`: an unchecked box has no mark, and the reserved column
			// keeps the label aligned with the rows that do. `✓` is drawn by
			// `[data-state="checked"]` in the stylesheet.
			data-meta={meta}
			className={cn("Slip__Row", className)}
			checked={checked ?? false}
			{...props}
		>
			{children}
		</DropdownMenuPrimitive.CheckboxItem>
	);
}

function DropdownMenuRadioGroup({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
	return (
		<DropdownMenuPrimitive.RadioGroup
			data-slot="dropdown-menu-radio-group"
			{...props}
		/>
	);
}

function DropdownMenuRadioItem({
	className,
	children,
	meta,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
	meta?: string | undefined;
}) {
	return (
		<DropdownMenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			data-meta={meta}
			className={cn("Slip__Row", className)}
			{...props}
		>
			{children}
		</DropdownMenuPrimitive.RadioItem>
	);
}

/**
 * A label *inside* a slip - a register divider, not a row. It is the site's
 * `Slip__Group`: 13px, tracked, muted, with a rule above it when another group
 * precedes it. The kit's `font-medium px-2 py-1.5` is a row's metrics applied to
 * something that is not a row.
 */
function DropdownMenuLabel({
	className,
	inset,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
	inset?: boolean;
}) {
	return (
		<DropdownMenuPrimitive.Label
			data-slot="dropdown-menu-label"
			data-inset={inset}
			className={cn("Slip__Group", className)}
			{...props}
		/>
	);
}

function DropdownMenuSeparator({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
	return (
		<DropdownMenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cn("Slip__Rule-H", className)}
			{...props}
		/>
	);
}

/**
 * The shortcut cell. A chord is printed in the grammar's containment mark -
 * `〈⌘K〉` - so it is the same object the palette's foot uses, and a reader learns
 * the notation once.
 */
function DropdownMenuShortcut({
	className,
	children,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={cn("Slip__Meta", className)}
			{...props}
		>
			〈{children}〉
		</span>
	);
}

function DropdownMenuSub({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
	return (
		<DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
	);
}

function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
	inset?: boolean;
}) {
	return (
		<DropdownMenuPrimitive.SubTrigger
			data-slot="dropdown-menu-sub-trigger"
			data-inset={inset}
			data-meta="›"
			className={cn("Slip__Row", className)}
			{...props}
		>
			{children}
		</DropdownMenuPrimitive.SubTrigger>
	);
}

function DropdownMenuSubContent({
	className,
	head,
	children,
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent> & {
	/** The register line, carrying the path that got here - `# LOCALE ↳ OTHER / 03`. */
	head?: SlipHead | undefined;
}) {
	return (
		<DropdownMenuPrimitive.SubContent
			data-slot="dropdown-menu-sub-content"
			aria-label={head?.Name}
			className={cn("Slip", className)}
			{...props}
		>
			{head === undefined ? null : <SlipRegister head={head} />}
			{children}
		</DropdownMenuPrimitive.SubContent>
	);
}

export {
	DropdownMenu,
	DropdownMenuPortal,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
};
