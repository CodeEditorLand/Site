/**
 * OpenGraph SVG template generator.
 *
 * Produces a 1200×675 (16:9) SVG string suitable for og:image / twitter:image
 * social sharing cards. The Land brand glyph (Glyph/Land.svg, 1880×1600
 * intrinsic) is scaled to 0.36 and placed right-side-center, bleeding
 * slightly off the right edge. Text occupies the left ~520 px.
 */

const WrapText = (Text: string, MaxCharacter: number): string[] => {
	const Word = Text.split(" ");
	const Line: string[] = [];
	let Current = "";

	for (const W of Word) {
		if (
			Current.length + W.length + 1 > MaxCharacter &&
			Current.length > 0
		) {
			Line.push(Current);
			Current = W;
		} else {
			Current = Current.length > 0 ? `${Current} ${W}` : W;
		}
	}

	if (Current.length > 0) Line.push(Current);

	return Line;
};

const EscapeXML = (Text: string): string =>
	Text.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");

/**
 * Land brand glyph — two skewed parallelogram rects matching Glyph/Land.svg.
 * Intrinsic viewBox: 1880×1600. Caller supplies translate + uniform scale.
 */
const LogoGlyph = (X: number, Y: number, Scale: number): string =>
	`<g transform="translate(${X}, ${Y}) scale(${Scale})">
		<rect width="1005.28" height="620.771" rx="91.3889"
			transform="matrix(-0.93358 0.358368 0 1 940 0.240723)"
			fill="#151515" fill-opacity="0.22" />
		<rect width="1005.28" height="620.771" rx="91.3889"
			transform="matrix(-0.93358 0.358368 0 1 1880 618.204)"
			fill="#151515" fill-opacity="0.22" />
	</g>`;

/**
 * Generates an OpenGraph SVG card at 1200×675 (exact 16:9).
 *
 * @param Title       Page title displayed prominently on the left
 * @param Description Smaller text below the title
 * @param Section     Optional badge label (e.g. "Blog", "Doc", "Home")
 */
const GenerateOpenGraphSvg = (
	Title: string,
	Description: string,
	Section?: string,
): string => {
	const Width = 1200;
	const Height = 675; // 16:9

	// Text column width ~520 px — glyph left edge starts at ~623
	const TitleLine = WrapText(Title, 22);
	const DescriptionLine = WrapText(Description, 48);

	const ClampedTitleLine = TitleLine.slice(0, 3);
	const ClampedDescriptionLine = DescriptionLine.slice(0, 3);

	const TitleFontSize = ClampedTitleLine.length > 2 ? 40 : 48;
	const TitleLineHeight = TitleFontSize * 1.3;
	const DescriptionFontSize = 20;
	const DescriptionLineHeight = DescriptionFontSize * 1.6;

	const SectionBadge = Section
		? `<rect x="72" y="56" width="${Section.length * 13 + 28}" height="32" rx="4" fill="#151515" fill-opacity="0.08" />
		<text x="86" y="78" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#555555" letter-spacing="0.1em">${EscapeXML(Section.toUpperCase())}</text>`
		: "";

	const TitleStartY = Section ? 138 : 110;

	const TitleElement = ClampedTitleLine.map(
		(Line, Index) =>
			`<text x="72" y="${TitleStartY + Index * TitleLineHeight}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${TitleFontSize}" font-weight="700" fill="#151515">${EscapeXML(Line)}</text>`,
	).join("\n\t\t");

	const DescriptionStartY =
		TitleStartY + ClampedTitleLine.length * TitleLineHeight + 20;

	const DescriptionElement = ClampedDescriptionLine.map(
		(Line, Index) =>
			`<text x="72" y="${DescriptionStartY + Index * DescriptionLineHeight}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${DescriptionFontSize}" font-weight="400" fill="#666666">${EscapeXML(Line)}</text>`,
	).join("\n\t\t");

	// Glyph: scale 0.36 → 677×576 px. Centred vertically; bleeds ~100 px off right edge.
	const GlyphScale = 0.36;
	const GlyphX = Math.round(Width - 1880 * GlyphScale + 100); // 623
	const GlyphY = Math.round((Height - 1600 * GlyphScale) / 2); // 50

	return `<svg width="${Width}" height="${Height}" viewBox="0 0 ${Width} ${Height}" xmlns="http://www.w3.org/2000/svg">
	<!-- Background -->
	<rect width="${Width}" height="${Height}" fill="#ffffff" />

	<!-- Top accent line -->
	<rect width="${Width}" height="4" fill="#151515" fill-opacity="0.12" />

	<!-- Land logo glyph (right side, brand proportions) -->
	${LogoGlyph(GlyphX, GlyphY, GlyphScale)}

	<!-- Section badge -->
	${SectionBadge}

	<!-- Title -->
	${TitleElement}

	<!-- Description -->
	${DescriptionElement}

	<!-- Bottom bar -->
	<rect y="${Height - 56}" width="${Width}" height="56" fill="#fafafa" />
	<line x1="0" y1="${Height - 56}" x2="${Width}" y2="${Height - 56}" stroke="#e5e5e5" stroke-width="1" />

	<!-- URL (bottom-left) -->
	<text x="72" y="${Height - 20}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="16" font-weight="500" fill="#888888">editor.land</text>

	<!-- Brand name (bottom-right) -->
	<text x="${Width - 72}" y="${Height - 20}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="16" font-weight="600" fill="#888888" text-anchor="end">Code Editor Land</text>
</svg>`;
};

export default GenerateOpenGraphSvg;
