import { Badge } from "../UI/Badge";

import type Property from "./Interface/Property/Badge.js";

/**
 * Dynamic Badge - one word in a `UI/Badge`, with an optional protocol dot.
 *
 * The surface is `UI/Badge`'s: its ink pair comes from the component's own
 * variant and tone map, and this adapter adds nothing to it - it places the text
 * and the dot.
 *
 * The dot is a MARK, not a pulse. It carries no noise-system hooks
 * (`StaccatoDot` / `StaccatoRhythmDot` would resolve to a stopped pulse's last
 * frame - `opacity: 0.5` and `scale(0.9)` - on a dot that never moves). The ink
 * it carries is `DotColor`'s protocol token, and that is the whole state.
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

	const DotColorTokenMap: Record<string, string> = {
		green: "var(--SpinegRPC)",

		yellow: "var(--SpineTCP)",

		red: "var(--Destruct)",

		blue: "var(--SpineIPC)",
	};

	return (
		<Badge
			variant={Variant}
			className={`${ContentClassName || ""} ${ClassName || ""}`}
			{...props}
		>
			{Text}
			{ShowDot && (
				<>
					{"\u2001"}

					{/* The badge's protocol mark: the state square at the badge's
					    step, in the spine's own ink (`Mark/_Square.scss`). It used to
					    be `flat h-2 w-2` - an 8px Tailwind box, the largest of the
					    site's five dot sizes, on a mark whose ladder tops out at 6px
					    beside 13px type. */}
					<span
						className="MarkSquare"
						data-mark-size="badge"
						style={{
							color:
								DotColorTokenMap[DotColor] ??
								"var(--SpinegRPC)",
						}}
						aria-hidden="true"
					/>
				</>
			)}
		</Badge>
	);
};

export { DynamicBadge };

export default DynamicBadge;
