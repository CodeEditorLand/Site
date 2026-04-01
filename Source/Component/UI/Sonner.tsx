"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme } = useTheme();

	return (
		<Sonner
			theme={(theme ?? "system") as "light" | "dark" | "system"}
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
