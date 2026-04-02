import { Badge } from "../UI/Badge";
import type Property from "./Interface/Property/Badge.js";

/**
 * Dynamic Badge with simplex noise integration.
 * Wraps the base Badge with StaccatoBadge for breathing scale.
 * The status dot pulses with StaccatoRhythm for a heartbeat effect.
 */
const DynamicBadge = ({ Content, ClassName }: Property) => {
	const {
		Text,
		Variant = "default",
		ShowDot = false,
		DotColor = "green",
		ClassName: ContentClassName,
		...props
	} = Content;

	const DotColorMap: Record<string, string> = {
		green: "bg-green-500",
		yellow: "bg-yellow-500",
		red: "bg-red-500",
		blue: "bg-blue-500",
	};

	return (
		<Badge
			variant={Variant}
			className={`StaccatoBadge ${ContentClassName || ""} ${ClassName || ""}`}
			{...props}>
			{Text}
			{ShowDot && (
				<>
					{"\u2001"}
					<span
						className={`StaccatoDot StaccatoRhythmDot h-2 w-2 rounded-none ${DotColorMap[DotColor]}`}
						aria-hidden="true"
					/>
				</>
			)}
		</Badge>
	);
};

export { DynamicBadge };

export default DynamicBadge;
