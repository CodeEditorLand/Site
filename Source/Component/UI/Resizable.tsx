"use client";

import * as lucide from "lucide-react";

import {
	Group,
	Panel,
	Separator,
	type GroupProps,
	type Layout,
	type PanelProps,
	type SeparatorProps,
} from "react-resizable-panels";

import * as React from "react";

import { cn } from "./Utility";

/**
 * Resizable - two panes and the seam a reader sets.
 *
 * ─── THE RATIO IS THE ONE FACT A SPLIT HAS ───────────────────────────────
 * The kit's handle is a 1px rule with a hit area. What it cannot say is the thing
 * the seam is for: how the panes are divided. So the group gains a register line -
 * `# PANES / 49 ␁ 51` - that is live, read from the library's own `onLayoutChange`
 * and printed at the meta register. Dragging the seam moves the figure, which is
 * the whole difference between a divider and an instrument.
 *
 * ─── THE SEAM IS A CONTROL, SO IT TAKES FOCUS ────────────────────────────
 * `react-resizable-panels` gives the separator arrow-key resizing and a roving
 * focus; what the kit's handle does not give it is a focus ring. It has one - the
 * same 2px accent ring at 4px offset every other control wears (`--state-ring-width`,
 * `--state-ring-offset`) - because a keyboard user who cannot see where they are is
 * not setting anything.
 *
 * ─── FIXED IS A STATE, NOT A DELETION ────────────────────────────────────
 * A layout that must not be resized keeps its seam and prints its ratio; the seam
 * refuses the drag (`disabled` on the separator) and says so with its cursor. A
 * seam removed from the page would leave two panes with no statement of their
 * relation.
 */

interface ResizablePanelGroupProps extends GroupProps {
	/**
	 * The register's label: `PANES` prints as `# PANES / 49 ␁ 51`. Omitted means no
	 * register, which is the kit's group.
	 */
	register?: string;
}

function ResizablePanelGroup({
	className,
	register,
	children,
	onLayoutChange,
	...props
}: ResizablePanelGroupProps) {
	const [Sizes, SetSizes] = React.useState<number[]>([]);

	const HandleLayout = React.useCallback(
		(Layout: Layout) => {
			SetSizes(Object.values(Layout));

			onLayoutChange?.(Layout);
		},

		[onLayoutChange],
	);

	const Group_ = (
		<Group
			data-slot="resizable-panel-group"
			onLayoutChange={HandleLayout}
			className={cn(
				"flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
				className,
			)}
			{...props}
		>
			{children}
		</Group>
	);

	if (register === undefined) return Group_;

	return (
		<div className="ResizableFrame">
			<p className="ResizableRatio">
				<span aria-hidden="true">#</span> {register}
				<span aria-hidden="true"> / </span>
				{Sizes.length === 0
					? "UNAVAILABLE"
					: Sizes.map((Size) =>
							String(Math.round(Size)).padStart(2, "0"),
						).join("\u2001")}
			</p>

			{Group_}
		</div>
	);
}

function ResizablePanel({ ...props }: PanelProps) {
	return <Panel data-slot="resizable-panel" {...props} />;
}

interface ResizableHandleProps extends SeparatorProps {
	withHandle?: boolean;

	/** The seam's accessible name: `RESIZE: LEDGER ␁ NOTES`. */
	label?: string;
}

function ResizableHandle({
	withHandle,
	label,
	className,
	...props
}: ResizableHandleProps) {
	return (
		<Separator
			data-slot="resizable-handle"
			aria-label={label}
			className={cn(
				"focus-visible:outline-hidden relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
				className,
			)}
			{...props}
		>
			{withHandle && (
				<div className="z-10 flex h-4 w-3 items-center justify-center rounded-none border bg-border">
					<lucide.GripVerticalIcon className="size-2.5" />
				</div>
			)}
		</Separator>
	);
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
