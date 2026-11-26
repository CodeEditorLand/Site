import type * as React from "react";

import { cn } from "./Utility";

/**
 * Skeleton - the shape of a record before its data arrives.
 *
 * ─── A GREY BOX IS NOT THIS SITE'S SKELETON ──────────────────────────────
 * `Component/Motion/MotionSkeleton.astro` states the site's loading arm: a
 * register line, the keys the arriving record will print, their values barred,
 * and `WAITING ON:` naming what has not arrived. It is an `.astro` block, so a
 * React island that has to wait needs the same anatomy as a primitive - which is
 * what `SkeletonRecord` is, and why it is not a box.
 *
 * `SkeletonRecord` reads the same two tokens the block reads
 * (`--motion-skeleton-bar` and `--motion-skeleton-ink`), so a busy button
 * (`StateBusy`), a loading record (`MotionSkeleton`) and a waiting card are one
 * object at three scales.
 *
 * ─── NO PULSE IN THE RECORD GRAMMAR, AND THE REASON IS NOT TASTE ─────────
 * A pulse is a loop: motion with no state change, which the motion layer forbids
 * and which tells the reader nothing they did not already know. The record's bars
 * are static. What moves is the moment the record arrives - `resolve`, one
 * printed state giving way to another - and that belongs to whatever replaces
 * this skeleton, not to the skeleton.
 *
 * The `Skeleton` primitive below is the exception: it carries `animate-pulse` and
 * `bg-accent`, so it is a green pulsing box - a loop, and the accent spent on a
 * loading state. `SkeletonRecord`, `SkeletonMatrix` and `SkeletonLines` are the arms
 * that follow the rule.
 *
 * ─── THE THREE SHAPES ────────────────────────────────────────────────────
 *   SkeletonRecord   a record: register line, keys, barred values, the wait
 *   SkeletonMatrix   a table that has not arrived: its head, and bars in the cells
 *   SkeletonLines    prose that has not arrived: n lines at the measured width
 *
 * `Skeleton` has three call sites - `DynamicAuthStatus`, `DynamicAccountProfile` and
 * `SidebarMenuSkeleton` - and all three want a shape rather than a schema, so
 * removing their arm would be a regression, not an improvement. The three card
 * compositions (`SkeletonCard`, `SkeletonFeatureCard`, `SkeletonPricingTier`) have
 * no call site in `Source/`: they are layouts kept for a surface that has not been
 * built.
 */

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn("flat animate-pulse bg-accent", className)}
			{...props}
		/>
	);
}

/**
 * Generic card skeleton - header + two body lines.
 */
function SkeletonCard({ className }: React.ComponentProps<"div">) {
	return (
		<div className={cn("bg-card p-6", className)}>
			<Skeleton className="mb-4 h-6 w-3/4 bg-secondary" />
			<Skeleton className="mb-2 h-4 w-full bg-secondary" />
			<Skeleton className="h-4 w-5/6 bg-secondary" />
		</div>
	);
}

/**
 * Feature card skeleton - matches FeatureCard layout (title + icon header,
 * description lines, icon stack row).
 */
function SkeletonFeatureCard({ className }: React.ComponentProps<"div">) {
	return (
		<div className={cn("bg-card p-6", className)}>
			<div className="mb-4 flex items-start justify-between">
				<Skeleton className="h-6 w-1/2 bg-secondary" />
				<Skeleton className="h-10 w-10 shrink-0 bg-secondary" />
			</div>
			<Skeleton className="mb-2 h-4 w-full bg-secondary" />
			<Skeleton className="mb-2 h-4 w-5/6 bg-secondary" />
			<Skeleton className="h-4 w-4/6 bg-secondary" />
		</div>
	);
}

/**
 * Pricing tier skeleton - matches PricingCard layout (button, name, price,
 * feature list).
 */
function SkeletonPricingTier({ className }: React.ComponentProps<"div">) {
	return (
		<div className={cn("bg-card", className)}>
			<div className="p-6">
				<Skeleton className="mb-4 h-9 w-full bg-secondary" />
				<Skeleton className="mb-2 h-6 w-1/3 bg-secondary" />
				<Skeleton className="mb-4 h-4 w-2/3 bg-secondary" />
				<Skeleton className="h-10 w-1/3 bg-secondary" />
			</div>
			<div className="p-6">
				{[1, 2, 3, 4].map((Index) => (
					<Skeleton
						key={Index}

						className="mb-3 h-4 w-full bg-secondary"
					/>
				))}
			</div>
		</div>
	);
}

/**
 * A bar's width, derived from the key's own name.
 *
 * A long key tends to name a long value (`SOURCE:`, `CHECKSUM:`) and a short key a
 * short one, so the caller does not have to invent a width per field. Clamped to
 * 24-72% so no bar is a dot and no bar is a full rule. `MotionSkeleton` prints the
 * same bars from a `--bar` its caller hands it; this is the same arithmetic with the
 * guess made once, from the key, instead of once per call site.
 */
const WidthOf = (Key: string): number =>
	Math.min(72, Math.max(24, 24 + Key.length * 3));

interface SkeletonRecordProps {
	/** The register line: `# LOADING / 04`. */
	marker: string;

	/** The keys the arriving record will print, in its own order. */
	keys: readonly string[];

	/** What has not arrived. Printed as `WAITING ON:`. */
	waiting: string;

	/** How long it has been waiting, when that is known: `318 DAYS`. */
	age?: string;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * SkeletonRecord - a record that has not arrived, printed in its own grammar.
 *
 * The keys are the record's field names, so a reader waiting learns the schema
 * while they wait - and a reader whose connection dies is left with a legible
 * statement of what did not arrive rather than a hole.
 */
function SkeletonRecord({
	marker,
	keys,
	waiting,
	age,
	className,
}: SkeletonRecordProps) {
	return (
		<div
			className={cn("SkeletonRecord", className)}
			data-motion="skeleton"
			aria-busy="true"
		>
			<p className="SkeletonRecord__Marker">{marker}</p>

			<dl className="SkeletonRecord__Rows">
				{keys.map((Key) => (
					<div className="SkeletonRecord__Row" key={Key}>
						<dt className="SkeletonRecord__Key">{Key}</dt>
						<dd
							className="SkeletonRecord__Value"
							aria-hidden="true"
						>
							<span
								className="SkeletonRecord__Bar"
								style={
									{
										"--bar": `${WidthOf(Key)}%`,
									} as React.CSSProperties
								}
							/>
						</dd>
					</div>
				))}
			</dl>

			<p className="SkeletonRecord__Wait">
				<span className="MarkRelation" aria-hidden="true" />WAITING ON: {waiting}
				{age === undefined ? null : (
					<span className="SkeletonRecord__Age"> / {age}</span>
				)}
			</p>
		</div>
	);
}

interface SkeletonMatrixProps {
	/** The column names, which are the schema and are printed. */
	columns: readonly string[];

	/** How many rows are expected. A guess, and the bar count states it. */
	rows?: number;

	/** The line above the frame: `# TIERS / 04`. */
	marker?: string;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * SkeletonMatrix - a table that has not arrived.
 *
 * The head prints, because the head is the schema and the schema is the one thing
 * that is already true. The cells are bars, and they are `aria-hidden`: a screen
 * reader hears the column names and one busy state, not twelve rectangles.
 */
function SkeletonMatrix({
	columns,
	rows = 3,
	marker,
	className,
}: SkeletonMatrixProps) {
	return (
		<div className={cn("SkeletonMatrix", className)} aria-busy="true">
			{marker === undefined ? null : (
				<p className="SkeletonRecord__Marker">{marker}</p>
			)}

			<div
				className="SkeletonMatrix__Head"
				style={{ "--columns": columns.length } as React.CSSProperties}
			>
				{columns.map((Column) => (
					<span key={Column}>{Column}</span>
				))}
			</div>

			{Array.from({ length: rows }, (_, Index) => (
				<div
					className="SkeletonMatrix__Row"
					key={Index}

					style={
						{ "--columns": columns.length } as React.CSSProperties
					}

					aria-hidden="true"
				>
					<span
						className="SkeletonMatrix__Bar"
						style={{ "--bar": "70%" } as React.CSSProperties}
					/>
					{columns.map((Column) => (
						<span
							className="SkeletonMatrix__Bar"
							key={Column}

							style={
								{
									"--bar": `${WidthOf(Column)}%`,
								} as React.CSSProperties
							}
						/>
					))}
				</div>
			))}
		</div>
	);
}

interface SkeletonLinesProps {
	/** How many lines of prose are expected. */
	lines?: number;

	/** The register line, when the prose belongs to a named block. */
	marker?: string;

	/** Extra classes from the caller. */
	className?: string;
}

/**
 * SkeletonLines - prose that has not arrived.
 *
 * The last line is short, because a paragraph's last line is short; a block of
 * equal bars would be a block of equal sentences, which prose never is.
 */
function SkeletonLines({ lines = 3, marker, className }: SkeletonLinesProps) {
	return (
		<div className={cn("SkeletonRecord", className)} aria-busy="true">
			{marker === undefined ? null : (
				<p className="SkeletonRecord__Marker">{marker}</p>
			)}

			<div className="SkeletonRecord__Rows" aria-hidden="true">
				{Array.from({ length: lines }, (_, Index) => (
					<div className="SkeletonRecord__Row" key={Index}>
						<span
							className="SkeletonRecord__Bar"
							style={
								{
									"--bar":
										Index === lines - 1
											? "38%"
											: `${88 - Index * 4}%`,
								} as React.CSSProperties
							}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export {
	Skeleton,
	SkeletonCard,
	SkeletonFeatureCard,
	SkeletonPricingTier,
	SkeletonRecord,
	SkeletonMatrix,
	SkeletonLines,
};
