/**
 * OpenGraph SVG template generator.
 *
 * Produces a 1200×675 (16:9) SVG string suitable for og:image / twitter:image
 * social sharing cards. Text occupies the left ~620 px; the Land brand glyph
 * occupies the right column (x 690–1160, y 138–538).
 *
 * The glyph uses two pre-baked <polygon> elements — no SVG transforms, no
 * matrix operations — so it renders identically in every crawler, bot, and
 * minimal SVG renderer. Coordinates are the four corners of each parallelogram
 * at 0.25× scale + translate(690, 138) of the 1880×1600 intrinsic viewBox:
 *
 *   matrix(-0.93358 0.358368 0 1 940  0.24)  → upper parallelogram
 *   matrix(-0.93358 0.358368 0 1 1880 618.2) → lower parallelogram
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
 * Land brand glyph — two parallelograms pre-baked at OG card pixel coords.
 *
 * Pre-computed from Glyph/Land.svg (1880×1600) at scale=0.25, translate(690,138):
 *   Upper: corners (925,138) (690,228) (690,383) (925,293)
 *   Lower: corners (1160,293) (925,383) (925,538) (1160,448)
 *
 * No transforms used — direct <polygon> for maximum renderer compatibility.
 */
const LogoGlyph = (): string =>
	`<polygon points="925,138 690,228 690,383 925,293" fill="#151515" fill-opacity="0.20" />
	<polygon points="1160,293 925,383 925,538 1160,448" fill="#151515" fill-opacity="0.20" />`;

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

	// Text column: x 72–660. Glyph starts at x=690.
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

	return `<svg width="${Width}" height="${Height}" viewBox="0 0 ${Width} ${Height}" xmlns="http://www.w3.org/2000/svg">
	<!-- Background -->
	<rect width="${Width}" height="${Height}" fill="#ffffff" />

	<!-- Top accent line -->
	<rect width="${Width}" height="4" fill="#151515" fill-opacity="0.12" />

	<!-- Land logo glyph: upper + lower parallelogram, x 690–1160, y 138–538 -->
	${LogoGlyph()}

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
