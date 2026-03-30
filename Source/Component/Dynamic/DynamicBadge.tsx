import { Badge } from "../UI/Badge";
import type Property from "./Interface/Property/Badge.js";

/**
 * Dynamic Badge component that accepts content schema
 * Wraps the base Badge component with prop-based configuration
 */
export function DynamicBadge({ content }: Property) {
	const {
		text,
		variant = "default",
		showDot = false,
		dotColor = "green",
		className,
		...props
	} = content;

	const DotColor: Record<string, string> = {
		green: "bg-green-500",
		yellow: "bg-yellow-500",
		red: "bg-red-500",
		blue: "bg-blue-500",
	};

	return (
		<Badge variant={variant} className={className} {...props}>
			{showDot && (
				<span
					className={`mr-2 h-2 w-2 rounded-none ${DotColor[dotColor]}`}
					aria-hidden="true"
				/>
			)}
			{text}
		</Badge>
	);
}
