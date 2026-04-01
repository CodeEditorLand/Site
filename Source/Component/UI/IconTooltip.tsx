"use client";

import type { LucideIcon } from "lucide-react";
import * as React from "react";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./Tooltip.js";

interface IconTooltipProperty {
	/** Human-readable label — drives aria-label, title, and tooltip text. */
	Label: string;
	/** Lucide icon component to render inside the trigger. */
	Icon?: LucideIcon;
	/** CSS color string for the icon stroke (Lucide only). */
	Color?: string;
	/** Icon size class — defaults to "h-4 w-4". */
	SizeClass?: string;
	/** Extra className forwarded to the icon element. */
	ClassName?: string;
	/**
	 * Reserved: future doc-link href.
	 * When provided the tooltip will render a clickable link.
	 */
	DocHref?: string;
	/**
	 * Override children — useful for wrapping an <img> brand mark.
	 * When provided, Icon / Color / SizeClass are ignored.
	 */
	children?: React.ReactNode;
}

/**
 * IconTooltip — single source of truth for icon accessibility across the site.
 *
 * Provides three layers of label exposure:
 *   1. aria-label on the trigger <span>  — screen readers announce the label
 *   2. title on the trigger <span>       — native browser tooltip fallback
 *   3. Radix TooltipContent              — styled hover tooltip for sighted users
 *
 * Usage with Lucide icon:
 *   <IconTooltip Label="Sync" Icon={RefreshCw} Color="#3b82f6" />
 *
 * Usage wrapping an <img> brand mark:
 *   <IconTooltip Label="GitHub">
 *     <img src="/Image/GitHub.svg" alt="GitHub" width="16" height="16"
 *          className="h-4 w-4" />
 *   </IconTooltip>
 *
 * DocHref is reserved for future documentation links — pass it now so
 * the data is threaded through and the tooltip can evolve to a link
 * without changing every call site.
 */
const IconTooltip = ({
	Label,
	Icon,
	Color,
	SizeClass = "h-4 w-4",
	ClassName = "",
	DocHref: _DocHref,
	children,
}: IconTooltipProperty) => {
	const Content = children ?? (
		Icon ? (
			<Icon
				className={`${SizeClass} ${className}`}
				style={Color ? { color: Color } : undefined}
				aria-hidden="true"
			/>
		) : null
	);

	if (!Content) return null;

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					asChild
					tabIndex={-1}>
					<span
						className="inline-flex items-center"
						aria-label={Label}
						title={Label}
						role="img">
						{Content}
					</span>
				</TooltipTrigger>
				<TooltipContent>
					{Label}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export { IconTooltip };
export type { IconTooltipProperty };
export default IconTooltip;
