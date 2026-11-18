import React from "react";

/**
 * SealNeutral - the seal's FORM, with no device in it.
 *
 * ─── WHY THE FORM NEEDS A NAME ────────────────────────────────────────────
 * The site strikes one roundel: concentric rings, four cardinal ticks, the
 * element's device in the middle, in the accent with `--AccentDetail` for the
 * detail. The eight element seals are variations of it - the same 64-unit
 * viewBox, the same outer ring at r=28 and stroke 1, the same inner ring at
 * stroke 0.5, the same ticks. Each replaces the centre.
 *
 * The ninth case is the element whose record carries no device (`Common`). It
 * used to print `◎` in a 36px box, which is a glyph in a box and not a seal -
 * two forms for one mark, and the box was a different size from every roundel
 * beside it on the same wall.
 *
 * This is that case, drawn: the roundel with an EMPTY field, and the grammar's
 * `◎` (U+25CE, the fallback mark) set in the field as the honest statement that
 * there is no device. Nothing is lost - the `◎` still prints - and the wall now
 * carries one form at one size.
 *
 * ─── THE INKS ARE TOKENS ──────────────────────────────────────────────────
 * `--Accent` for the rings and the ticks, `--AccentDetail` for the one detail
 * stroke. No literal colour: the file this replaces carried `#D6B947` and
 * `var(--Accent, #1E742A)` inline, which is the one thing the identity forbids
 * a mark to do (`DESIGN-COMPLETE.md` §1.6 - "a block never carries a literal
 * colour").
 *
 * No script, no state: a seal is struck once.
 */
const SealNeutral: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		viewBox="0 0 64 64"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		aria-hidden="true"
		focusable="false"
	>
		{/* The outer ring: the seal's edge, the same r and stroke as every device */}
		<circle
			cx="32"
			cy="32"
			r="28"
			fill="none"
			stroke="var(--Accent)"
			strokeWidth="1"
		/>

		{/* The inner ring: the field the device would be struck in */}
		<circle
			cx="32"
			cy="32"
			r="20"
			fill="none"
			stroke="var(--Accent)"
			strokeWidth="0.5"
		/>

		{/* The field's own edge, one step further in */}
		<circle
			cx="32"
			cy="32"
			r="12"
			fill="none"
			stroke="var(--Accent)"
			strokeWidth="0.5"
		/>

		{/* The four cardinal registry ticks, outward from the outer ring */}
		<path
			d="M32 4 L32 8 M52 32 L56 32 M32 56 L32 60 M8 32 L4 32"
			stroke="var(--Accent)"
			strokeWidth="0.5"
		/>

		{/* The empty field: the grammar's fallback, printed because there is no
		    device to strike. The face and the ink are the mark layer's
		    (`.MarkSeal__field`), because an SVG presentation attribute cannot
		    resolve a custom property. */}
		<text
			x="32"
			y="32"
			textAnchor="middle"
			dominantBaseline="central"
			fontSize="11"
			letterSpacing="0"
			className="MarkSeal__field"
		>
			◎
		</text>
	</svg>
);

export { SealNeutral };

export default SealNeutral;
