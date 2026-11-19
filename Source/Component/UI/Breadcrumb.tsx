import { Slot } from "@radix-ui/react-slot";

import * as lucide from "lucide-react";

import * as React from "react";

import { cn } from "./Utility";

/**
 * Breadcrumb - where this page sits in the document.
 *
 * ─── THE SITE'S TRAIL IS THE PRINTED FORM ────────────────────────────────
 * `Component/Route/Trail.astro` prints `/HOME → /DOC → /LAYER` and it is the
 * document's own statement of position. The kit's breadcrumb is the same statement
 * with the kit's markup, so it wears the trail's register rather than a web nav's:
 * mono, tracked, `/` before every place, `→` between them (drawn by the
 * stylesheet, so a call site cannot lose the grammar).
 *
 * ─── THE THREE STATES THE KIT DID NOT HAVE ───────────────────────────────
 *
 *   MISSING   a crumb whose route is gone. The place is named, the link is not
 *             offered, and the mark is a strikethrough - a tombstone in the record
 *             grammar, never a dead link.
 *   TOO MANY  a trail of nine places does not fit a 360px band. `BreadcrumbCollapse`
 *             prints the first, an ellipsis and the last three, and the ellipsis is
 *             a real button whose title lists the places it folded away - because a
 *             collapse that cannot be undone is a trail that lost the middle of the
 *             document.
 *   CURRENT   the page itself: ink, and the 2px accent bar at its foot, which is the
 *             site's active-route marker and a keeper.
 */

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
	return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(
				"flex flex-wrap items-center gap-1.5 break-words text-muted-foreground sm:gap-2.5",
				className,
			)}
			{...props}
		/>
	);
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={cn("inline-flex items-center gap-0", className)}
			{...props}
		/>
	);
}

interface BreadcrumbLinkProps extends React.ComponentProps<"a"> {
	asChild?: boolean;

	/** `missing` is a tombstone: named, not offered. */
	state?: "missing" | undefined;
}

function BreadcrumbLink({
	asChild,
	className,
	state,
	...props
}: BreadcrumbLinkProps) {
	const Comp = asChild ? Slot : "a";

	return (
		<Comp
			data-slot="breadcrumb-link"
			data-state={state}
			className={cn("transition-colors hover:text-foreground", className)}
			{...props}
		/>
	);
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="breadcrumb-page"
			role="link"
			aria-disabled="true"
			aria-current="page"
			className={cn("font-normal text-foreground", className)}
			{...props}
		/>
	);
}

function BreadcrumbSeparator({
	children,
	className,
	...props
}: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="breadcrumb-separator"
			role="presentation"
			aria-hidden="true"
			className={cn("[&>svg]:size-3.5", className)}
			{...props}
		>
			{children ?? <lucide.ChevronRight />}
		</li>
	);
}

function BreadcrumbEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="breadcrumb-ellipsis"
			role="presentation"
			aria-hidden="true"
			className={cn("flex size-9 items-center justify-center", className)}
			{...props}
		>
			<lucide.MoreHorizontal className="size-4" />
			<span className="sr-only">More</span>
		</span>
	);
}

/** One place in a trail. A place is a label and a route, never a route alone. */
interface Crumb {
	/** The place's name, printed with its `/`. */
	label: string;

	/** Where it goes. Absent means the place is the current one. */
	href?: string;

	/** The route is gone: named, not offered. */
	missing?: boolean;
}

interface BreadcrumbCollapseProps {
	/** The trail, in reading order. */
	items: readonly Crumb[];

	/**
	 * How many places are printed after the fold. The first place and the last
	 * `tail` are kept, and everything between them becomes the ellipsis. Default 2,
	 * so a trail of five keeps its start, its end and one parent.
	 */
	tail?: number;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * BreadcrumbCollapse - the trail that does not fit.
 *
 * The ellipsis is a button, not a glyph: its `title` names the places it folded, so
 * the middle of the trail is one hover away rather than gone. It is not a
 * disclosure - a trail is a statement of position, and opening it would move the
 * page - so the hidden places are named in the title and nowhere else.
 */
function BreadcrumbCollapse({
	items,
	tail = 2,
	className,
}: BreadcrumbCollapseProps) {
	// Nothing to fold: a trail of three or fewer prints whole.
	const Fits = items.length <= tail + 2;

	const Head = items[0];

	const Rest = Fits ? items.slice(1) : items.slice(-tail);

	const Folded = Fits ? [] : items.slice(1, items.length - tail);

	const Place = (Item: Crumb, Last: boolean) => (
		<React.Fragment key={`${Item.label}-${Item.href ?? "here"}`}>
			<BreadcrumbItem>
				{Item.href === undefined || Last ? (
					<BreadcrumbPage>{Item.label}</BreadcrumbPage>
				) : (
					<BreadcrumbLink
						href={Item.href}

						state={Item.missing ? "missing" : undefined}
					>
						{Item.label}
					</BreadcrumbLink>
				)}
			</BreadcrumbItem>
			{Last ? null : <BreadcrumbSeparator />}
		</React.Fragment>
	);

	return (
		<Breadcrumb className={className}>
			<BreadcrumbList>
				{Head === undefined ? null : Place(Head, items.length === 1)}

				{Folded.length === 0 ? null : (
					<>
						<BreadcrumbItem>
							<button
								type="button"
								className="BreadcrumbCollapse__More"
								title={Folded.map((Item) => Item.label).join(
									" / ",
								)}
							>
								⋯
								<span className="sr-only">
									{`${Folded.length} more places`}
								</span>
							</button>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
					</>
				)}

				{Rest.map((Item, Index) =>
					Place(Item, Index === Rest.length - 1),
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export {
	type Crumb,
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
	BreadcrumbCollapse,
};
