"use client";

import type { LucideIcon } from "lucide-react";

import * as lucide from "lucide-react";

import * as React from "react";

import { SlipNote, SlipRegister, type SlipHead } from "./Slip";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./Tooltip.js";

/**
 * IconTooltip - the one place an icon states what it is.
 *
 * ─── A CAP FOR A MARK, A SLIP FOR A DOCUMENT ──────────────────────────────
 *
 * A tooltip is the smallest overlay in the family and the only one that must
 * not become a panel: a two-word gloss on a glyph, drawn as a white insert with
 * a register line, would be a paragraph where a caption belongs. So the family
 * rule is stated as a size rule rather than as an exception:
 *
 *   gloss      the ink cap - `bg-primary`, the site's inverted mark; one line
 *              is one cap, an array is the staccato stack
 *   detail     the slip - white insert, `--Divider` frame, a register line
 *
 * `Detail` is what switches between them. Without it the tooltip is the cap:
 * three layers of label exposure (the trigger's `aria-label`, its `title`, and
 * Radix's content), an array of lines rendered as the tilted caps, one line
 * rendered as a single cap. With it the tooltip is content - a head, a note, a
 * row set - and it wears the same surface every other overlay wears, because
 * content is what a slip is for.
 *
 * ─── THREE LAYERS OF LABEL EXPOSURE, AND WHY ALL THREE STAY ───────────────
 *
 * `aria-label` on the trigger is what a screen reader announces; `title` is the
 * native fallback for a pointer that never triggers Radix (a slow hover, a
 * keyboard reader in a browser that suppresses portals); the content is the
 * styled tooltip. Removing any one of them would be a different accessibility
 * claim, so none is removed.
 */
interface IconTooltipProperty {
	/** Human-readable label - drives aria-label, title, and tooltip text. Pass an array for multi-line tooltips. */
	Label: string | string[];

	/** Lucide icon component to render inside the trigger. */
	Icon?: LucideIcon;

	/** CSS color string for the icon stroke (Lucide only). */
	Color?: string;

	/** Icon size class - defaults to "h-4 w-4". */
	SizeClass?: string;

	/** Extra className forwarded to the icon element. */
	ClassName?: string;

	/**
	 * Reserved: the doc-link target. Accepted and not rendered.
	 *
	 * The prop is destructured and dropped, so a call site can pass the path today
	 * and a link arm can read it later without every call site changing. Nothing
	 * about the tooltip changes when it is given - a comment that promised a
	 * clickable link would be describing an arm that does not exist.
	 */
	DocHref?: string;

	/**
	 * Override children - useful for wrapping an <img> brand mark.
	 * When provided, Icon / Color / SizeClass are ignored.
	 */
	children?: React.ReactNode;

	/**
	 * The detail arm: content instead of a gloss, so the tooltip is a slip.
	 *
	 * When given, `Label` still drives `aria-label` and `title` - the announcement
	 * is the short name and the panel is the long one - and `Head` prints the
	 * register line above it.
	 */
	Detail?: React.ReactNode;

	/** The register line, in the detail arm: `# PROTOCOL / 04`. */
	Head?: SlipHead;

	/** The `↳` proposition, in the detail arm. */
	Note?: React.ReactNode;

	/**
	 * The glyph's own state, when it has one.
	 *
	 * `unavailable` prints `◎` before the label, which is the mark the item
	 * grammar uses for a row that exists and cannot be used - so a disabled icon
	 * says so in the tooltip rather than only in its own styling. The mark is
	 * drawn in the single-line cap only: the array arm and the detail arm print
	 * their own content and never read this prop.
	 */
	State?: "ready" | "unavailable";
}

/**
 * The component, in its two arms.
 *
 * The trigger is a `<span role="img">` carrying `aria-label` and `title` (the
 * first two layers above), at `tabIndex={-1}`: the label reaches a screen
 * reader, and the glyph does not join the tab order.
 *
 * With a Lucide icon:
 *   <IconTooltip Label="Sync" Icon={RefreshCw} />
 *
 * Wrapping a brand mark:
 *   <IconTooltip Label="GitHub">
 *     <img src="/Image/GitHub.svg" alt="GitHub" width="16" height="16" />
 *   </IconTooltip>
 *
 * With a detail - the tooltip becomes a slip:
 *   <IconTooltip Label="gRPC" Icon={Radio} Head={{ Name: "PROTOCOL", Count: 4 }}
 *     Detail={<p>…</p>} Note="The spine's transport." />
 *
 * `DocHref` is accepted and not rendered (see the prop); the inventory at the
 * foot of this file is the mapping a link arm would read.
 */
const IconTooltip = ({
	Label,
	Icon,
	Color,
	SizeClass = "h-4 w-4",
	ClassName = "",
	DocHref: _DocHref,
	children,
	Detail,
	Head,
	Note,
	State = "ready",
}: IconTooltipProperty) => {
	const LabelFlat = Array.isArray(Label) ? Label.join(" ") : Label;

	if (process.env.NODE_ENV === "development" && !LabelFlat) {
		console.warn("IconTooltip: Label (aria-label) is required");
	}

	const Content =
		children ??
		(Icon ? (
			<Icon
				className={`${SizeClass} ${ClassName}`}
				style={Color ? { color: Color } : undefined}
				aria-hidden="true"
			/>
		) : null);

	if (!Content) return null;

	/* ─── the detail arm: the tooltip is content, so it is a slip ─────────── */

	if (Detail !== undefined) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild tabIndex={-1}>
						<span
							className="inline-flex items-center"
							aria-label={LabelFlat}
							title={LabelFlat}
							role="img"
						>
							{Content}
						</span>
					</TooltipTrigger>

					<TooltipContent
						className="Slip Slip--panel Slip--tip [&>svg]:hidden"
						sideOffset={6}
					>
						{Head === undefined ? null : (
							<SlipRegister head={Head} />
						)}
						{Note === undefined ? null : (
							<SlipNote>{Note}</SlipNote>
						)}
						{Detail}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}

	/* ─── the cap arm: one line, or the staccato stack ────────────────────── */

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild tabIndex={-1}>
					<span
						className="inline-flex items-center"
						aria-label={LabelFlat}
						title={LabelFlat}
						role="img"
					>
						{Content}
					</span>
				</TooltipTrigger>
				{Array.isArray(Label) ? (
					<TooltipContent className="flex flex-col items-center gap-0 bg-transparent p-0 [&>svg]:hidden">
						{Label.map((Line, Index) => {
							// Deterministic hash so SSR and client hydration match
							const Hash = (S: string): number => {
								let H = 0;

								for (let I = 0; I < S.length; I++) {
									H = ((H << 5) - H + S.charCodeAt(I)) | 0;
								}

								return H / 2147483647;
							};

							const Seed = Hash(`ts-${Index}`).toFixed(3);

							const Phase = Hash(`tp-${Index}`).toFixed(3);

							return (
								<p
									key={Index}
									className="StaccatoCard flat w-fit bg-primary px-3 py-1 text-primary-foreground"
									style={
										{
											"--StaccatoSeed": Seed,
											"--StaccatoSeedPhase": Phase,
											transform: `translate(calc(var(--StaccatoSeed) * 7px), calc(var(--StaccatoSeedPhase) * 5px)) rotate(calc(var(--StaccatoSeed) * 1.5deg)) scale(1)`,
										} as React.CSSProperties
									}
								>
									{Line}
								</p>
							);
						})}
					</TooltipContent>
				) : (
					<TooltipContent>
						{State === "unavailable" ? (
							<span className="Slip__TipMark" aria-hidden="true">
								◎{" "}
							</span>
						) : null}

						{Label}
					</TooltipContent>
				)}
			</Tooltip>
		</TooltipProvider>
	);
};

/**
 * DocHref inventory - the icon-to-doc mapping a link arm would read.
 *
 * `DocHref` is not rendered (see the prop above); this table is the data it
 * would take, with paths relative to the site root (`/Doc/{slug}`).
 *
 * Lucide Icon | Label | DocHref
 * --------------|------------------|---------------------------
 * Code | Code | /Doc/Architecture
 * Cpu | CPU | /Doc/Architecture
 * Terminal | Terminal | /Doc/Getting-Started
 * Puzzle | Extensions | /Doc/Extension-Development
 * Settings | Configuration | /Doc/Configuration
 * Lock | Encryption | /Doc/Local-First-Protocol
 * Shield | Security | /Doc/Local-First-Protocol
 * KeyRound | Single Sign-On | /Doc/API-Reference
 * RefreshCw | Sync | /Doc/Local-First-Protocol
 * GitBranch | Repository | /Doc/Contributing
 *
 * Brand SVGs (img children, not Lucide):
 * GitHub | GitHub | https://github.com/CodeEditorLand
 * GitLab | GitLab | /Doc/Contributing
 * Okta | Okta | /Doc/API-Reference
 * Microsoft | Microsoft Azure AD | /Doc/API-Reference
 * Google | Google | /Doc/API-Reference
 */

export { IconTooltip };

export type { IconTooltipProperty };

export default IconTooltip;
