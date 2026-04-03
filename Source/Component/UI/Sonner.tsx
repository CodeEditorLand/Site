"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

// ─── Theme note ───────────────────────────────────────────────────────────────
// The site uses a fixed flat-white theme with no dark mode. next-themes is not
// wired up (no ThemeProvider in the Astro root), so theme is hardcoded "light".
// ─────────────────────────────────────────────────────────────────────────────

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			theme="light"
			className="toaster group"
			style={
				{
					"--normal-bg": "var(--Popover)",
					"--normal-text": "var(--PopoverForeground)",
					"--normal-border": "var(--Border)",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
};

export { Toaster };
