import React from "react";

/**
 * SealNeutral - the seal's FORM, with no device in it.
 *
 * ─── WHY THE FORM NEEDS A NAME ────────────────────────────────────────────
 * The eight element seals in `Brand/FieldRecordSeal` share one 64-unit viewBox
 * and one ink pair: a seal whose device is a roundel draws the same outer ring
 * at r=28 and stroke 1, the same inner rings, and the same four cardinal ticks.
 * Each element replaces the centre.
 *
 * The case with no device (`Common`) is this one. A `◎` in a box would be a
 * glyph in a box and not a seal - two forms for one mark, and a box at a size
 * no roundel beside it on the same wall shares.
 *
 * So this is that case, drawn: the roundel with an EMPTY field, and the
 * grammar's `◎` (U+25CE, the fallback mark) set in the field as the honest
 * statement that there is no device. Nothing is lost - the `◎` still prints -
 * and the wall carries one form at one size.
 *
 * ─── THE INKS ARE TOKENS ──────────────────────────────────────────────────
 * `--Accent` for the outer ring, the field's two rings and the four ticks. No
 * literal colour: the identity forbids a mark to carry one
 * (`DESIGN-COMPLETE.md` §1.6 - "a block never carries a literal colour").
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
