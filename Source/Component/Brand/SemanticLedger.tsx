import React from "react";

import {
	GLYPH_INK,
	INK,
	KeywordInk,
	PlatformDescriptionParts,
	ROUTE_KEYWORD_INK,
	StampWordInk,
} from "../../Function/Theme/SemanticColor";

/**
 * SemanticLedger - character-level color renderers for the field-record
 * grammar (C17 collage method).
 *
 * StampText:   〈KEYWORD〉 -> gray bracket glyphs, keyword-colored text.
 *              "RUST + TAURI" style joins color each side, the "+" separator
 *              in the glyph ink like the brackets.
 * RouteText:   /KEYWORD:VALUE -> gray slash, sky-blue keyword, ink rest.
 *              Lines without route shape render as plain muted ink.
 * StatusText:  "STATUS:" ink, the value ink - the attested tone is a shape,
 *              never a hue (`FieldRecordStatus` prints the 6px square).
 * PlatformDescriptionText: platform keyword chips colored per map.
 */

export interface StampTextProps {
	Line: string;

	className?: string;
}

/**
 * Render one stamp segment: exact keyword match first, then per-word ink
 * (SideCar PREBUILT/BINARY/TRIPLE/PER/TARGET), then ink fallback.
 */
const RenderStampSegment = (Segment: string): React.ReactNode => {
	const Whole = KeywordInk(Segment);

	if (Whole) {
		return <span style={{ color: Whole }}>{Segment}</span>;
	}

	const Words = Segment.split(/\s+/);

	const WordInks = Words.map((Word) => StampWordInk(Word));

	if (Words.length > 1 && WordInks.every((Ink) => Ink !== null)) {
		return Words.map((Word, WordIndex) => (
			<span key={WordIndex}>
				{WordIndex > 0 && " "}
				<span
					style={{
						color: WordInks[WordIndex] ?? "var(--CardForeground)",
					}}
				>
					{Word}
				</span>
			</span>
		));
	}

	return (
		<span
			style={{
				color: StampWordInk(Segment) ?? "var(--CardForeground)",
			}}
		>
			{Segment}
		</span>
	);
};

/** 〈KEYWORD〉 with gray brackets and keyword-colored text inside. */
export const StampText: React.FC<StampTextProps> = ({ Line, className }) => {
	const Segments = Line.split(" + ");

	return (
		<span className={className}>
			<span aria-hidden="true" style={{ color: GLYPH_INK }}>
				〈
			</span>
			{Segments.map((Segment, Index) => (
				<React.Fragment key={Index}>
					{Index > 0 && (
						<span aria-hidden="true" style={{ color: GLYPH_INK }}>
							{" + "}
						</span>
					)}

					{RenderStampSegment(Segment)}
				</React.Fragment>
			))}
			<span aria-hidden="true" style={{ color: GLYPH_INK }}>
				〉
			</span>
		</span>
	);
};

export interface RouteTextProps {
	Line: string;

	className?: string;
}

const ROUTE_SHAPE = /^\//;

/**
 * `/KEY:VALUE` route row: the mark layer's slash, the key in the route ink, the
 * mark layer's colon, the value in ink.
 *
 * The marks print their own `--mark-gap` (`Mark/_Punctuation.scss`): the slash
 * opens the line and the colon closes the key, so each takes one gap on one
 * side. This renderer prints no space of its own - the old one printed the
 * slash against the key (`/COMPAT: VS CODE`) while the roadmap printed it with
 * a word space (`/ CHANNEL`), and that is the drift the mark layer removes.
 */
export const RouteText: React.FC<RouteTextProps> = ({ Line, className }) => {
	if (!ROUTE_SHAPE.test(Line)) {
		return (
			<span className={className}>
				<span className="opacity-70">{Line}</span>
			</span>
		);
	}

	const Body = Line.slice(1);

	const ColonIndex = Body.indexOf(":");

	if (ColonIndex === -1) {
		return (
			<span className={className}>
				<span className="MarkSlash" aria-hidden="true" />
				<span style={{ color: ROUTE_KEYWORD_INK }}>{Body}</span>
			</span>
		);
	}

	return (
		<span className={className}>
			<span className="MarkSlash" aria-hidden="true" />
			<span style={{ color: ROUTE_KEYWORD_INK }}>
				{Body.slice(0, ColonIndex)}
			</span>
			<span
				className="MarkColon"
				style={{ color: ROUTE_KEYWORD_INK }}
				aria-hidden="true"
			/>
			<span style={{ color: "var(--CardForeground)" }}>
				{Body.slice(ColonIndex + 1)}
			</span>
		</span>
	);
};

export interface StatusTextProps {
	value: string;

	/** Green when active/specimen; callers decide via this prop. */
	active?: boolean;

	className?: string;
}

/** STATUS: ink label + the value in the record's ink. The attested tone is a
 *  shape (the 6px square `FieldRecordStatus` prints), never the accent - see
 *  that primitive for the argument. `active` is kept so a caller that has the
 *  fact can state it, and it no longer changes the ink.
 *
 *  The colon is the mark layer's (`Mark/_Punctuation.scss`) and prints the gap:
 *  this renderer writes no space, so the row reads `STATUS: VALUE` at
 *  `--mark-gap` like every other colon on the site. */
export const StatusText: React.FC<StatusTextProps> = ({ value, className }) => (
	<span className={className}>
		<span style={{ color: "var(--CardForeground)" }}>
			STATUS<span className="MarkColon" aria-hidden="true" />
		</span>
		<span style={{ color: "var(--CardForeground)" }}>{value}</span>
	</span>
);

export interface PlatformDescriptionTextProps {
	Text: string;

	className?: string;
}

/** Platform chips: keyword-colored segments, separators stay ink. */
export const PlatformDescriptionText: React.FC<
	PlatformDescriptionTextProps
> = ({ Text, className }) => (
	<span className={className}>
		{PlatformDescriptionParts(Text).map((Part, Index) => (
			<span
				key={Index}

				style={{
					color: Part.Ink ?? "var(--CardForeground)",
				}}
			>
				{Part.Text}
			</span>
		))}
	</span>
);

export { INK };
