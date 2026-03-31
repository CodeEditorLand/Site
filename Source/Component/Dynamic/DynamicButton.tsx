import {
	ArrowRight,
	ChevronRight,
	Download,
	ExternalLink,
	GitFork,
	Globe,
	Heart,
	Loader2,
	LogIn,
	Mail,
	Search,
	Send,
	Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "../UI/Button";
import type Property from "./Interface/Property/Button.js";

/**
 * Icon registry — direct imports for instant render.
 * Covers all icons used in CTA buttons across the site.
 */
const ButtonIconRegistry: Record<string, LucideIcon> = {
	ArrowRight,
	ChevronRight,
	Download,
	ExternalLink,
	GitFork,
	Globe,
	Heart,
	LogIn,
	Mail,
	Search,
	Send,
	Sparkles,
};

/**
 * Dynamic Button with simplex noise integration.
 * Icons render immediately via direct imports (no dynamic import flash).
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

	const IconComponent = icon ? ButtonIconRegistry[icon] || null : null;

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
			{text}
			{isLoading ? (
				<>
					{"\u2001"}
					<Loader2 className="StaccatoSpinner h-4 w-4 animate-spin" aria-hidden="true" />
				</>
			) : IconComponent ? (
				<>
					{"\u2001"}
					<IconComponent className="StaccatoIcon h-4 w-4" aria-hidden="true" />
				</>
			) : null}
		</Button>
	);
}
