import { Loader2 } from "lucide-react";
import { useEffect, useState, type ComponentType } from "react";

import { Button } from "../UI/Button";
import type Property from "./Interface/Property/Button.js";

/**
 * Dynamic Button component that accepts content schema
 * Wraps the base Button component with prop-based configuration
 */
export function DynamicButton({
	content,
	onAction,
	isLoading = false,
}: Property) {
	const {
		text,
		icon,
		variant = "default",
		size = "default",
		type = "button",
		disabled = false,
		fullWidth = false,
		className,
		...props
	} = content;

	const [IconComponent, setIconComponent] = useState<ComponentType<{
		className?: string;
	}> | null>(null);

	useEffect(() => {
		if (icon) {
			// Dynamically import the icon from lucide-react
			import("lucide-react")
				.then((icons) => {
					const Icon = (icons as Record<string, unknown>)[
						icon as keyof typeof icons
					] as ComponentType<{ className?: string }> | undefined;
					if (Icon) {
						setIconComponent(() => Icon);
					}
				})
				.catch((error) => {
					console.error(`Failed to load icon ${icon}:`, error);
				});
		}
	}, [icon]);

	return (
		<Button
			variant={variant}
			size={size}
			type={type}
			disabled={disabled || isLoading}
			className={fullWidth ? "w-full" : className}
			aria-busy={isLoading || undefined}
			onClick={() => {
				if (!isLoading && onAction) {
					onAction();
				}
				if (!isLoading && content.onClick) {
					content.onClick();
				}
			}}
			{...props}>
			{isLoading ? (
				<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
			) : IconComponent ? (
				<IconComponent className="h-4 w-4" aria-hidden="true" />
			) : null}
			{text}
		</Button>
	);
}
