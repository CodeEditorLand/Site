import { Badge } from "../UI/Badge";
import type Property from "./Interface/Property/Badge.js";

/**
 * Dynamic Badge with simplex noise integration.
 * Wraps the base Badge with StaccatoBadge for breathing scale.
 * The status dot pulses with StaccatoRhythm for a heartbeat effect.
 */
const DynamicBadge = ({ content, className }: Property) => {
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
			{text}
			{showDot && (
				<>
					{"\u2001"}
					<span
						className={`StaccatoDot StaccatoRhythmDot h-2 w-2 rounded-none ${DotColor[dotColor]}`}
						aria-hidden="true"
					/>
				</>
			)}
		</Badge>
	);
};

export { DynamicBadge };

export default DynamicBadge;
