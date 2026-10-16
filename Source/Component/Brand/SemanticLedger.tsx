import React from "react";

import {
	ACCENT_GREEN,
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
 *              "RUST + TAURI" style joins color each side, "+" stays ink.
 * RouteText:   /KEYWORD:VALUE -> gray slash, sky-blue keyword, ink rest.
 *              Lines without route shape render as plain muted ink.
 * StatusText:  "STATUS:" ink, value green (ACTIVE/specimen) or ink.
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
const RenderStampSegment = (
	Segment: string,
): React.ReactNode => {
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
				<span style={{ color: WordInks[WordIndex] ?? "var(--CardForeground)" }}>
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
			<span
				aria-hidden="true"
				style={{ color: GLYPH_INK }}
			>
				〈
			</span>
			{Segments.map((Segment, Index) => (
				<React.Fragment key={Index}>
					{Index > 0 && (
						<span
							aria-hidden="true"
							style={{ color: GLYPH_INK }}
						>
							{" + "}
						</span>
					)}
					{RenderStampSegment(Segment)}
				</React.Fragment>
			))}
			<span
				aria-hidden="true"
				style={{ color: GLYPH_INK }}
			>
				〉
			</span>
		</span>
	);
};

export interface RouteTextProps {
	Line: string;

	className?: string;
}

const ROUTE_SHAPE = /^\/[A-Z0-9-]+:/;

/** /KEYWORD:VALUE route row: gray slash, sky keyword, ink colon+value. */
export const RouteText: React.FC<RouteTextProps> = ({ Line, className }) => {
	if (!ROUTE_SHAPE.test(Line)) {
		return (
			<span className={className}>
				<span className="opacity-70">{Line}</span>
			</span>
		);
	}

	const ColonIndex = Line.indexOf(":");

	return (
		<span className={className}>
			<span
				aria-hidden="true"
				style={{ color: GLYPH_INK }}
			>
				/
			</span>
			<span style={{ color: ROUTE_KEYWORD_INK }}>
				{Line.slice(1, ColonIndex)}
			</span>
			<span style={{ color: "var(--CardForeground)" }}>
				{Line.slice(ColonIndex)}
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

/** STATUS: ink label + colored value (green for ACTIVE, ink otherwise). */
export const StatusText: React.FC<StatusTextProps> = ({
	value,
	active = false,
	className,
}) => {
	const ValueColor = active ? ACCENT_GREEN : "var(--CardForeground)";

	return (
		<span className={className}>
			<span style={{ color: "var(--CardForeground)" }}>
				STATUS:
			</span>
			<span style={{ color: ValueColor }}>
				{" "}
				{value}
			</span>
		</span>
	);
};

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