"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import * as React from "react";

import { cn } from "./Utility";

/**
 * Avatar - one identity at the size of a seal.
 *
 * ─── SQUARE, AND WHY ─────────────────────────────────────────────────────
 * The site prints seals at 28px (`SpecimenLabel`, the field record) and they are
 * squares. A person is the same object: a mark that stands for a name. So the
 * avatar is square, flat, and it has three sizes that are the site's three marks
 * rather than an arbitrary scale - `seal` (28px, the register's size), `row` (32px,
 * the size a row's mark column wants) and `plate` (64px, the size an opening
 * artifact wants).
 *
 * ─── THE FALLBACK IS THE GRAMMAR ─────────────────────────────────────────
 * An identity that is known prints two initials. An identity that is not known
 * prints `◎` - the grammar's mark for a fallback - because an avatar that falls
 * back to a blank square is an avatar that says nothing about why.
 *
 * ─── THE SET, AND THE COUNT IT DOES NOT SHOW ─────────────────────────────
 * A set of identities overlaps by a quarter and prints `+N` for the ones it does
 * not show. The overlap is a negative margin, not a stack of shadows: this family
 * has no shadows, and a stack of them would be five boxes pretending to be a pile.
 */

/** The three sizes a mark may take on this site. */
type AvatarSize = "seal" | "row" | "plate";

interface AvatarProps extends React.ComponentPropsWithoutRef<
	typeof AvatarPrimitive.Root
> {
	/** The mark's size. Omitted means the kit's 40px, untouched. */
	size?: AvatarSize;

	/** `archived` keeps the mark and drops its ink - a tombstone at seal size. */
	state?: "active" | "archived";
}

const Avatar = React.forwardRef<
	React.ComponentRef<typeof AvatarPrimitive.Root>,
	AvatarProps
>(({ className, size, state, ...props }, Ref) => (
	<AvatarPrimitive.Root
		ref={Ref}
		data-slot="avatar"
		data-size={size}
		data-state={state}
		className={cn(
			"flat relative flex size-10 shrink-0 overflow-hidden",
			className,
		)}
		{...props}
	/>
));

Avatar.displayName = "Avatar";

function AvatarImage({
	className,
	...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn("aspect-square size-full", className)}
			{...props}
		/>
	);
}

interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<
	typeof AvatarPrimitive.Fallback
> {
	/**
	 * The identity is not known at all. Prints `◎` rather than an empty square,
	 * because the fallback's job is to say which fallback it is.
	 */
	empty?: boolean;
}

const AvatarFallback = React.forwardRef<
	React.ComponentRef<typeof AvatarPrimitive.Fallback>,
	AvatarFallbackProps
>(({ className, empty, children, ...props }, Ref) => (
	<AvatarPrimitive.Fallback
		ref={Ref}
		data-slot="avatar-fallback"
		data-empty={empty ? "true" : undefined}
		className={cn(
			"flat flex size-full items-center justify-center bg-muted",
			className,
		)}
		{...props}
	>
		{empty ? <span aria-hidden="true">◎</span> : children}
	</AvatarPrimitive.Fallback>
));

AvatarFallback.displayName = "AvatarFallback";

/**
 * InitialsOf - the two letters an unknown face prints.
 *
 * First letter of the first word and first letter of the last, upper case. A name
 * of one word prints one letter; a name with no letters prints nothing, and the
 * caller passes `empty` instead - a fallback that invented letters would be a
 * fallback that made up a person.
 */
const InitialsOf = (Name: string): string => {
	const Words = Name.trim()
		.split(/\s+/)
		.filter((Word) => Word.length > 0);

	if (Words.length === 0) return "";

	const First = Words[0]?.[0] ?? "";

	const Last = Words.length > 1 ? (Words.at(-1)?.[0] ?? "") : "";

	return `${First}${Last}`.toUpperCase();
};

interface AvatarGroupProps {
	/** The identities, in the order they are shown. */
	items: readonly {
		/** The name, for the alt text and the initials. */
		name: string;

		/** The image, when there is one. */
		src?: string;
	}[];

	/** How many marks are shown before the `+N`. Default 4. */
	max?: number;

	/** The mark's size. */
	size?: AvatarSize;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * AvatarGroup - a set of identities, and how many are not shown.
 *
 * The count is derived from the array, never passed: a `+N` that disagreed with
 * the set would be the one figure on the row that lied.
 */
function AvatarGroup({
	items,
	max = 4,
	size = "row",
	className,
}: AvatarGroupProps) {
	const Shown = items.slice(0, max);

	const Rest = items.length - Shown.length;

	return (
		<div className={cn("AvatarGroup", className)}>
			{Shown.map((Item) => (
				<span className="AvatarGroup__Item" key={Item.name}>
					<Avatar size={size}>
						{Item.src === undefined ? null : (
							<AvatarImage src={Item.src} alt={Item.name} />
						)}

						<AvatarFallback delayMs={0}>
							{InitialsOf(Item.name)}
						</AvatarFallback>
					</Avatar>
				</span>
			))}

			{Rest > 0 ? (
				<span className="AvatarGroup__More" title={`${Rest} more`}>
					{`+${Rest}`}
				</span>
			) : null}
		</div>
	);
}

export {
	type AvatarSize,
	Avatar,
	AvatarImage,
	AvatarFallback,
	AvatarGroup,
	InitialsOf,
};
