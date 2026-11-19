"use client";

import * as SelectPrimitive from "@radix-ui/react-select";

import * as lucide from "lucide-react";

import * as React from "react";

import { SlipRegister, type SlipHead } from "./Slip";

import { cn } from "./Utility";

// ─── Scroll-lock Warning ─────────────────────────────────────────────────────
//
// @radix-ui/react-select unconditionally wraps its content with
// react-remove-scroll, which injects `overflow: hidden` on <body> via CSS.
// In Chrome this silently resets window.scrollY to 0 whenever the Select opens
// - there is no `modal` prop to disable it.
//
// DO NOT use this component in sticky-header pages or anywhere the user may
// have scrolled before interacting. Use DropdownMenu with modal={false} instead
// (see LocaleSwitcher.tsx for the established pattern).
//
// The command palette is the one surface where a lock is correct: it is a modal
// by nature, the reader's whole attention for as long as it is open, and it does
// not open from a scrolled reading position the way a header menu does. That lock
// is `Dialog`'s, not this primitive's - the palette never renders a Select. The
// two decisions are recorded together so neither reads as a bug in the other.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Select - a field that opens a slip, with one true value.
 *
 * The trigger is the site's `.SlipField`: white, one `--Divider` frame, a printed
 * `:` label, the value, and the disclosure `›` at the far end - the same glyph the
 * rail's sections use, because both mean "there is more behind this". The list is
 * the same `.Slip` a menu is, with the same register line at its head and the same
 * row grammar, so a select and a menu are visibly the same object at two sizes.
 *
 * Radix owns the behaviour: typeahead, arrow keys, Home/End, Escape, focus return.
 * Nothing about it is restated here.
 */

function Select({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
	return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return (
		<SelectPrimitive.Value
			data-slot="select-value"
			className="SlipField__Value"
			{...props}
		/>
	);
}

function SelectTrigger({
	className,
	size = "default",
	label,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
	size?: "sm" | "default";

	/** The compact field label - printed as `LABEL:`, with its colon. */
	label?: string | undefined;
}) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn("SlipField", className)}
			{...props}
		>
			{label ? <span className="SlipField__Label">{label}:</span> : null}
			{children}
			<SelectPrimitive.Icon asChild>
				<span className="SlipField__Mark" aria-hidden="true">
					›
				</span>
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	position = "popper",
	head,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
	/** The register line the slip opens with - `# SCOPE / 03`. */
	head?: SlipHead | undefined;
}) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot="select-content"
				aria-label={head?.Name}
				className={cn("Slip", className)}
				position={position}
				{...props}
			>
				{head ? <SlipRegister head={head} /> : null}
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(position === "popper" && "Slip__Viewport")}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
	return (
		<SelectPrimitive.Label
			data-slot="select-label"
			className={cn("Slip__Group", className)}
			{...props}
		/>
	);
}

function SelectItem({
	className,
	children,
	mark,
	meta,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item> & {
	/**
	 * The leading mark cell: `/` a route, `◎` a value that cannot be chosen.
	 * Drawn by the stylesheet's pseudo-element from `data-mark`, exactly as the
	 * dropdown's items are. The stylesheet overrides it with `✓` for the item in
	 * force (`[data-state="checked"]`), so the mark a caller passes is never the
	 * current-value mark - a select that could not print one would be the one
	 * control in the kit outside the row grammar.
	 */
	mark?: string | undefined;

	/** The trailing cell - a count, a code, a STATUS word. */
	meta?: string | undefined;
}) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			data-mark={mark}
			data-meta={meta}
			className={cn("Slip__Row", className)}
			{...props}
		>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn("Slip__Rule-H", className)}
			{...props}
		/>
	);
}

/**
 * The two scroll buttons are the slip's own edges: a hairline and a chevron, not
 * a pair of icon rows. They only exist when the list is taller than its box,
 * which is the one case a slip's frame is not enough to say "there is more".
 */
function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
	return (
		<SelectPrimitive.ScrollUpButton
			data-slot="select-scroll-up-button"
			className={cn("Slip__Scroll", className)}
			{...props}
		>
			<lucide.ChevronUp className="Slip__ScrollIcon" aria-hidden="true" />
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
	return (
		<SelectPrimitive.ScrollDownButton
			data-slot="select-scroll-down-button"
			className={cn("Slip__Scroll", className)}
			{...props}
		>
			<lucide.ChevronDown
				className="Slip__ScrollIcon"
				aria-hidden="true"
			/>
		</SelectPrimitive.ScrollDownButton>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};
