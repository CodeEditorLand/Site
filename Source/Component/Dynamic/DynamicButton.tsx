import { Loader2 } from "lucide-react";
import { useEffect, useState, type ComponentType } from "react";

import { Button } from "../UI/Button";
import type Property from "./Interface/Property/Button.js";

/**
 * Dynamic Button with simplex noise integration.
 * Wraps the base Button with StaccatoButton for organic hover/active/focus.
 * Loading state uses StaccatoSpinner for breathing opacity.
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

	const [IconComponent, SetIconComponent] = useState<ComponentType<{
		className?: string;
	}> | null>(null);

	useEffect(() => {
		if (icon) {
			import("lucide-react")
				.then((Icons) => {
					const Icon = (Icons as Record<string, unknown>)[
						icon as keyof typeof Icons
					] as ComponentType<{ className?: string }> | undefined;
					if (Icon) {
						SetIconComponent(() => Icon);
					}
				})
				.catch((ErrorInstance) => {
					console.error(`Failed to load icon ${icon}:`, ErrorInstance);
				});
		}
	}, [icon]);

	return (
		<Button
			variant={variant}
			size={size}
			type={type}
			disabled={disabled || isLoading}
			className={`StaccatoButton ${fullWidth ? "w-full" : ""} ${className || ""}`}
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
				<Loader2 className="StaccatoSpinner h-4 w-4 animate-spin" aria-hidden="true" />
			) : IconComponent ? (
				<IconComponent className="StaccatoIcon h-4 w-4" aria-hidden="true" />
			) : null}
			{text}
		</Button>
	);
}
