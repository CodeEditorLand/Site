import React from "react";

import { cn } from "../UI/Utility";

/**
 * FieldRecordEvidence - the evidence plate: one image, and the two states it has
 * when there is no image.
 *
 * ─── A PLATE IS EVIDENCE, NOT DECORATION ──────────────────────────────────
 * The block renders one photograph, `object-fit: cover`, with no text on it. It
 * is the counterweight to a record's claim: the record says what is true and the
 * plate shows what was seen. `RecordFigure`'s contract already forbids a text
 * overlay - a picture with a caption across it is a poster - which is why the
 * caption and the provenance are the *caller's* figcaption and never this
 * block's.
 *
 * ─── AND A PLATE THAT IS NOT THERE IS STILL A PLATE ───────────────────────
 * The composition family's matrix printed a hero with no evidence image, and the
 * render was the honest failure of every component that treats an image as a
 * fact: `<img src="">` drew a broken-image glyph inside a 40dvh panel, the
 * caption underneath described a plate that was not there, and the panel's whole
 * 51% of the pair became a browser error message. A broken glyph is not an
 * adverse state; it is an absence the design never drew.
 *
 * So the block has three states, and two of them are compositions:
 *
 *   rest     the photograph, as it has always rendered;
 *   absent   `src` is missing or empty: the plate keeps its frame, its measure
 *            and its place in the pair, prints the grammar's `◎`, the row
 *            `PLATE: UNAVAILABLE` and - under it - the description that would
 *            have been the image's alt text. Nothing is invented and nothing is
 *            lost: the sentence a reader needs ("what would be here") is the
 *            sentence the alt already carried.
 *   loading  the plate has not arrived: the same frame, the same measure, and
 *            three barred lines where the drawing will be. No spinner - the
 *            brief is explicit that the skeleton is drawn in the record grammar,
 *            and a spinner in a 51% panel is a machine apologising.
 *
 * The absence is announced with `role="img"` and the description as its
 * accessible name, because that is exactly what an image is to a screen reader:
 * one thing, named. A reader who cannot see the panel gets the same sentence
 * either way, which is the test the whole adverse-state rule exists for.
 *
 * ─── ONE FIX CARRIED OVER ─────────────────────────────────────────────────
 * The image used to carry `aria-label` beside its `alt`, which is the same
 * sentence twice: `aria-label` wins, so the `alt` was dead weight in the
 * accessible tree. The alt is the description and now the only one.
 *
 * ─── NO NUMBER, NO INK, NO MOTION ─────────────────────────────────────────
 * Nothing here paints a colour: the frame is the surface hairline, the `◎` is
 * the mark layer's fallback glyph in the muted ink, and the two words are the
 * vocabulary's. A plate that has failed is not allowed to invent an urgency of
 * its own - `UNAVAILABLE` is the word the site uses for a fact that exists and
 * is empty, and a plate that is not there is that fact.
 */

export interface FieldRecordEvidenceProps {
	/**
	 * The image. Optional on purpose: a record whose evidence has not been shot
	 * passes nothing and gets the absent arm rather than a broken glyph.
	 */
	src?: string;

	/**
	 * The image's description - and, when there is no image, the description of
	 * what the plate would have shown. Required in both states: an uncaptioned
	 * figure is decoration, and an unexplained absence is a hole.
	 */
	alt: string;

	/** The crop's anchor, for the `object-position` of a real photograph. */
	position?: string;

	/**
	 * The plate's state, where the caller knows it. `absent` is also derived
	 * from an empty `src`, so a caller that has nothing to pass passes nothing.
	 */
	state?: "rest" | "loading" | "absent";

	className?: string;
}

/** Whether the plate has an image at all. */
const HasPlate = (src: string | undefined): src is string =>
	typeof src === "string" && src.trim().length > 0;

const FieldRecordEvidence: React.FC<FieldRecordEvidenceProps> = ({
	src,
	alt,
	position = "center",
	state,
	className,
}) => {
	const Arm = state ?? (HasPlate(src) ? "rest" : "absent");

	if (Arm === "rest" && HasPlate(src)) {
		return (
			<div
				className={cn("overflow-hidden", className)}
				style={{ borderRadius: 0 }}
				data-plate="rest"
			>
				<img
					src={src}
					alt={alt}
					className="block h-full w-full"
					style={{
						objectFit: "cover",
						objectPosition: position,
						borderRadius: 0,
					}}
				/>
			</div>
		);
	}

	/**
	 * The two arms that have no photograph share one frame: the plate's own box,
	 * a hairline, and the grammar. They differ in what the middle says -
	 * `UNAVAILABLE` with the description under it, or `LOADING` with the drawing
	 * barred - and in nothing else, so a plate that is late and a plate that will
	 * never come are read at the same measure.
	 */
	return (
		<div
			className={cn("FieldRecordPlate", className)}
			data-plate={Arm}
			role="img"
			aria-label={Arm === "loading" ? `Plate loading: ${alt}` : alt}
		>
			<p className="FieldRecordPlate__mark" aria-hidden="true">
				◎
			</p>

			<p className="FieldRecordPlate__line">
				<span className="FieldRecordPlate__key">PLATE:</span>{" "}
				{Arm === "loading" ? "LOADING" : "UNAVAILABLE"}
			</p>

			{Arm === "loading" ? (
				<div className="FieldRecordPlate__bars" aria-hidden="true">
					<span className="FieldRecordPlate__bar" />
					<span className="FieldRecordPlate__bar" />
					<span className="FieldRecordPlate__bar" />
				</div>
			) : (
				<p className="FieldRecordPlate__note">{alt}</p>
			)}
		</div>
	);
};

export { FieldRecordEvidence };

export default FieldRecordEvidence;
