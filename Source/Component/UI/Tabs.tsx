"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";

import * as React from "react";

import { cn } from "./Utility";

/**
 * Tabs - sibling views of one subject, one visible at a time.
 *
 * ─── THE TWO STATES THE KIT DID NOT HAVE ─────────────────────────────────
 * Radix gives the strip its behaviour: one tab stop for the group, arrow keys,
 * Home and End, `aria-selected` on the chosen tab and `hidden` on every panel but
 * one. What it cannot give is the two states a strip meets on a real page:
 *
 *   NO TABS FIT     the labels are wider than the band. The strip scrolls
 *                   sideways, and a readout at its trailing edge prints how many
 *                   tabs are past the edge - measured, not guessed, from the
 *                   triggers' own rects. Zero hides the readout, because a strip
 *                   that says `→ 0 MORE` is a strip that talks to itself.
 *   KEYBOARD PAST THE EDGE   an arrow key can move the roving tab stop onto a tab
 *                   the strip is hiding, and a reader would then be typing into
 *                   something they cannot see. The trigger scrolls itself into
 *                   view on focus, so the keyboard path and the pointer path see
 *                   the same strip.
 *
 * ─── THE OVERFLOW IS A READOUT, NOT A CONTROL ────────────────────────────
 * A "more" button at the edge would be a second scroller, and the second scroller
 * would disagree with the first. The readout is `aria-hidden` and takes no
 * pointer: the tabs are all in the accessibility tree whether or not they are
 * past the edge, and the count is a visual affordance for the reader who can see
 * the strip is cut.
 *
 * ─── ON PAPER EVERY PANEL PRINTS ─────────────────────────────────────────
 * A tab strip is a control, and paper cannot be clicked. So the list is hidden in
 * print and every panel prints under its own name (`data-label`), which is why
 * `TabsContent` takes a `label`. Printing one panel of four would be printing a
 * quarter of the document.
 */

function Tabs({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			className={cn("flex flex-col gap-2", className)}
			{...props}
		/>
	);
}

interface TabsListProps extends React.ComponentPropsWithoutRef<
	typeof TabsPrimitive.List
> {
	/**
	 * What the strip does when its labels do not fit. `scroll` (the default)
	 * keeps one row and scrolls it; `wrap` lets the strip become two rows, which
	 * is right inside a card and wrong inside a band that must keep its height.
	 */
	overflow?: "scroll" | "wrap";

	/** The strip's accessible name, when the visible context does not give one. */
	label?: string;
}

const TabsList = React.forwardRef<
	React.ComponentRef<typeof TabsPrimitive.List>,
	TabsListProps
>(({ className, children, overflow = "scroll", label, ...props }, Ref) => {
	const ListRef = React.useRef<HTMLDivElement | null>(null);

	/** How many triggers are past the strip's trailing edge. */
	const [Past, SetPast] = React.useState(0);

	const Measure = React.useCallback(() => {
		const List = ListRef.current;

		if (!List) return;

		const Edge = List.getBoundingClientRect().right;

		const Triggers = [
			...List.querySelectorAll<HTMLElement>('[data-slot="tabs-trigger"]'),
		];

		SetPast(
			Triggers.filter(
				(Trigger) => Trigger.getBoundingClientRect().right > Edge + 1,
			).length,
		);
	}, []);

	React.useEffect(() => {
		Measure();

		const List = ListRef.current;

		if (!List) return;

		const Observer = new ResizeObserver(Measure);

		Observer.observe(List);

		List.addEventListener("scroll", Measure, { passive: true });

		return () => {
			Observer.disconnect();

			List.removeEventListener("scroll", Measure);
		};
	}, [Measure]);

	/**
	 * A focused tab is scrolled into the strip.
	 *
	 * The roving tab stop is Radix's, so an arrow key can land on a tab the strip
	 * is hiding. `nearest` moves the strip the shortest distance that makes the
	 * tab visible and does nothing when it already is - which is why this is not a
	 * `scrollIntoView` on every focus.
	 */
	const Reveal = React.useCallback(
		(Event: React.FocusEvent<HTMLDivElement>) => {
			const Target = Event.target as HTMLElement | null;

			if (Target?.dataset["slot"] !== "tabs-trigger") return;

			Target.scrollIntoView({ block: "nearest", inline: "nearest" });
		},

		[],
	);

	return (
		<div
			data-slot="tabs-track"
			data-overflow={overflow}
			className="relative flex items-stretch"
		>
			<TabsPrimitive.List
				ref={(Node) => {
					ListRef.current = Node;

					if (typeof Ref === "function") Ref(Node);
					else if (Ref) Ref.current = Node;
				}}
				data-slot="tabs-list"
				aria-label={label}
				onFocusCapture={Reveal}
				className={cn(
					"flat flex inline-flex h-9 w-fit items-center justify-center bg-muted p-1 text-muted-foreground",
					className,
				)}
				{...props}
			>
				{children}
			</TabsPrimitive.List>

			{/* The count is the strip's own measurement. Zero renders the element
			    with `data-count="0"` and the stylesheet hides it, so the DOM states
			    the fact instead of the component deciding to render nothing. */}
			<span
				data-slot="tabs-overflow"
				data-count={Past}
				aria-hidden="true"
			>
				<span aria-hidden="true">→</span>
				{` ${Past} MORE`}
			</span>
		</div>
	);
});

TabsList.displayName = "TabsList";

function TabsTrigger({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(
				"h-[calc(100% - 1px)] flat inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap border border-transparent px-2 py-1 font-medium text-foreground transition-[color,box-shadow] focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-[color-mix(in_srgb,var(--Ring)_50%,transparent)] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-card [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		/>
	);
}

interface TabsContentProps extends React.ComponentPropsWithoutRef<
	typeof TabsPrimitive.Content
> {
	/**
	 * The panel's name, printed above it on paper. Without it the printed panel is
	 * an unlabelled section, which is the one thing a printed document may not
	 * have.
	 */
	label?: string;
}

const TabsContent = React.forwardRef<
	React.ComponentRef<typeof TabsPrimitive.Content>,
	TabsContentProps
>(({ className, label, ...props }, Ref) => (
	<TabsPrimitive.Content
		ref={Ref}
		data-slot="tabs-content"
		data-label={label}
		className={cn("flex-1 outline-none", className)}
		{...props}
	/>
));

TabsContent.displayName = "TabsContent";

interface TabsEmptyProps {
	/** What would be here. */
	statement: string;

	/** Why it is not. */
	cause?: string;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * TabsEmpty - a strip with no views on it.
 *
 * An empty tab strip renders a track with nothing to choose, which is a control that
 * answers nothing. The empty arm replaces the track and says what the set would have
 * held - the same three-part absence the table's empty row prints.
 */
function TabsEmpty({ statement, cause, className }: TabsEmptyProps) {
	return (
		<div className={cn("DisplayAbsent", className)}>
			<span className="DisplayAbsent__Mark" aria-hidden="true">
				◎
			</span>
			<span className="DisplayAbsent__Word">NO VIEW</span>
			<p className="DisplayAbsent__Statement">
				{statement}
				{cause === undefined ? null : ` ${cause}`}
			</p>
		</div>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsEmpty };
