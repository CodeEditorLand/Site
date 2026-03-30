import { Badge } from "../UI/Badge";
import type Property from "./Interface/Property/Badge.js";

/**
 * Dynamic Badge with simplex noise integration.
 * Wraps the base Badge with StaccatoBadge for breathing scale.
 * The status dot pulses with StaccatoRhythm for a heartbeat effect.
 */
export function DynamicBadge({ content, className }: Property) {
	const {
		text,
		variant = "default",
		showDot = false,
		dotColor = "green",
		className: ContentClassName,
		...props
	} = content;

	const DotColor: Record<string, string> = {
		green: "bg-green-500",
		yellow: "bg-yellow-500",
		red: "bg-red-500",
		blue: "bg-blue-500",
	};

	return (
		<Badge
			variant={variant}
			className={`StaccatoBadge ${ContentClassName || ""} ${className || ""}`}
			{...props}>
			{showDot && (
				<span
					className={`StaccatoDot StaccatoRhythmDot mr-2 h-2 w-2 rounded-none ${DotColor[dotColor]}`}
					aria-hidden="true"
				/>
			)}
			{text}
		</Badge>
	);
}
