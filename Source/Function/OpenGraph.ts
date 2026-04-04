/**
 * OpenGraph SVG template generator.
 *
 * Produces a 1200x630 SVG string suitable for og:image / twitter:image
 * social sharing cards. Uses the Land brand glyph and white background
 * with dark text for maximum contrast on all platforms.
 */

/**
 * Wraps text into lines that fit within a given character width.
 * Respects PascalCase boundaries for natural line breaks.
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

	if (Current.length > 0) {
		Line.push(Current);
	}

	return Line;
};

/**
 * Escapes XML special characters in text content.
 */
const EscapeXML = (Text: string): string =>
	Text.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");

/**
 * Land logo glyph as an inline SVG group.
 * Two parallelogram shapes from the brand identity.
 */
const LogoGlyph = (X: number, Y: number, Scale: number): string =>
	`<g transform="translate(${X}, ${Y}) scale(${Scale})">
		<rect width="1005.28" height="620.771" rx="91.3889"
			transform="matrix(-0.93358 0.358368 0 1 940 0.240723)"
			fill="#151515" fill-opacity="0.15" />
		<rect width="1005.28" height="620.771" rx="91.3889"
			transform="matrix(-0.93358 0.358368 0 1 1880 618.204)"
			fill="#151515" fill-opacity="0.15" />
	</g>`;

/**
 * Generates an OpenGraph SVG card.
 *
 * @param Title    — Page title (displayed prominently)
 * @param Description — Page description (smaller text below title)
 * @param Section  — Optional section badge (e.g., "Blog", "Doc", "Home")
 * @returns SVG string with Content-Type image/svg+xml
 */
const GenerateOpenGraphSvg = (
	Title: string,
	Description: string,
	Section?: string,
): string => {
	const Width = 1200;
	const Height = 630;

	const TitleLine = WrapText(Title, 32);
	const DescriptionLine = WrapText(Description, 58);

	// Limit lines to prevent overflow
	const ClampedTitleLine = TitleLine.slice(0, 3);
	const ClampedDescriptionLine = DescriptionLine.slice(0, 3);

	const TitleFontSize = ClampedTitleLine.length > 2 ? 40 : 48;
	const TitleLineHeight = TitleFontSize * 1.25;
	const DescriptionFontSize = 20;
	const DescriptionLineHeight = DescriptionFontSize * 1.5;

	// Section badge
	const SectionBadge = Section
		? `<rect x="80" y="60" width="${Section.length * 14 + 32}" height="36" rx="6" fill="#151515" fill-opacity="0.08" />
		<text x="96" y="84" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="16" font-weight="600" fill="#555555" letter-spacing="0.08em">${EscapeXML(Section.toUpperCase())}</text>`
		: "";

	// Title Y offset depends on whether we have a section badge
	const TitleStartY = Section ? 140 : 100;

	const TitleElement = ClampedTitleLine.map(
		(Line, Index) =>
			`<text x="80" y="${TitleStartY + Index * TitleLineHeight}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${TitleFontSize}" font-weight="700" fill="#151515">${EscapeXML(Line)}</text>`,
	).join("\n\t\t");

	const DescriptionStartY =
		TitleStartY + ClampedTitleLine.length * TitleLineHeight + 24;

	const DescriptionElement = ClampedDescriptionLine.map(
		(Line, Index) =>
			`<text x="80" y="${DescriptionStartY + Index * DescriptionLineHeight}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${DescriptionFontSize}" font-weight="400" fill="#666666">${EscapeXML(Line)}</text>`,
	).join("\n\t\t");

	return `<svg width="${Width}" height="${Height}" viewBox="0 0 ${Width} ${Height}" xmlns="http://www.w3.org/2000/svg">
	<!-- Background -->
	<rect width="${Width}" height="${Height}" fill="#ffffff" />

	<!-- Top accent line -->
	<rect width="${Width}" height="4" fill="#151515" fill-opacity="0.12" />

	<!-- Logo glyph (bottom-right, decorative) -->
	${LogoGlyph(Width - 320, Height - 260, 0.16)}

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
	<text x="80" y="${Height - 22}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="16" font-weight="500" fill="#888888">editor.land</text>

	<!-- Brand name (bottom-right) -->
	<text x="${Width - 80}" y="${Height - 22}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="16" font-weight="600" fill="#888888" text-anchor="end">Code Editor Land</text>
</svg>`;
};

export default GenerateOpenGraphSvg;
