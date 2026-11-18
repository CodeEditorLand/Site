import { Badge } from "../UI/Badge";

import type Property from "./Interface/Property/Badge.js";

/**
 * Dynamic Badge - one word in a Jelly badge, with an optional protocol dot.
 *
 * The badge is a Jelly element and takes its two inks from the host's own
 * properties (`--jelly-fill`, `--jelly-label`, set per instance by `UI/Badge`);
 * this adapter adds nothing to the surface, it only places the text and the dot.
 *
 * The dot is a MARK, not a pulse. It used to carry `StaccatoDot
 * StaccatoRhythmDot`, the noise system's live-opacity hooks, and the classes
 * outlived their engine: `_Noise.scss` documents its channels as "updated every
 * frame by Staccato.ts", no such script is in the tree, and the two classes were
 * therefore resolving to `opacity: 0.5` and `scale(0.9)` on a dot that never
 * moved - a mark rendered at half ink by a pulse that had stopped. The ink it
 * carries is `DotColor`'s protocol token, and that is the whole state.
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
