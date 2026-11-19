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
 * Escape, outside-click, focus return to the trigger, the roving tabindex. The
 * family adds the door and nothing else - `UseSlipRoot` in the root, `UseDoorRef`
 * on the trigger - so a menu whose trigger is removed closes rather than floats
 * over the place a button used to be (`./Overlay`). What this file decides is the
 * *surface* and the *row grammar*, and it decides them by handing the site's
 * classes and four data attributes to the primitive:
 *
 *   `data-mark`  the row's leading glyph - `→` action, `/` route, `◎`
 *                unavailable. The stylesheet draws it in the reserved 1.25rem
 *                column, so no caller can misalign a label.
 *   `data-meta`  the row's trailing cell - a chord, a section, a STATUS word.
 *   `data-reason` the STATUS word a disabled row owes the reader; it wins over
 *                `data-meta`.
 *   `data-current` the value in force - the stylesheet prints `✓` and the 2px
 *                leading accent rule over whatever `data-mark` said.
 *
 * The attributes rather than spans are what let `asChild` keep working: an item
 * whose body is the caller's own `<a>` cannot have children injected into it, and
 * forking the primitive to add two spans is how five controls become five
 * grammars. See `Stylesheet/System/UI/_Item.scss`.
 */

/**
 * The root: Radix's open state, mirrored, plus the door the trigger fills.
 *
 * `UseSlipRoot` hands the primitive the same `open`/`onOpenChange` it was given
 * and builds the `Door` this root provides; the trigger writes its element into
 * it, and `UseTriggerGuard` closes the slip when that element leaves the tree.
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
 * childrenLength) props.children = children;`). A caller's rows arriving through
 * the spread would be replaced by the one register line, and the slip would open
 * on `# LOCALE / 05` and nothing else. Destructuring `children` and rendering it
 * explicitly after the head is what keeps the rows, and it is also the grammar's
 * order: the register line is the slip's first line and its rows follow it.
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
	 * `_Item.scss` gives a disabled row `◎` and keeps it fully legible, and
	 * reserves its meta cell for the reason from the STATUS vocabulary. `reason`
	 * is that cell's only honest source: `data-reason` overrides `data-meta`, so
	 * a row that cannot be used prints why rather than its shortcut.
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
 * `Slip__Group`: 13px, tracked, muted, with a rule above it when a group or a
 * row precedes it. A label is not a row, so it takes none of a row's metrics -
 * no `2rem` floor, no hover wash, no reserved mark column.
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
 * `〈⌘K〉` - in the row's meta cell, which is where every trailing fact sits. The
 * brackets are the literal's own mark; the `Chord` part in `./Slip` is the same
 * notation for the foot, where the key is the subject rather than the note.
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
