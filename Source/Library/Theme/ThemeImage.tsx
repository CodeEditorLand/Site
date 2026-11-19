export interface ThemeImageProps {
	src: string;

	alt?: string;

	width?: number | string;

	height?: number | string;

	className?: string;

	[key: string]: unknown;
}

/**
 * ThemeImage - Daylight Field Record (single theme).
 *
 * A plain <img>: no <picture>, no media query, no OS-based switching. Every
 * surface is light (creme canvas, white cards), so the src is always the
 * LIGHT variant - the dark glyph.
 *
 * Convention:
 *   Light: /Image/Foo.svg or /Asset/Foo.svg
 *   (/Dark/Image/ and /Asset/Dark/ must never be referenced)
 */
export function ThemeImage({
	src,
	alt = "",
	width,
	height,
	className,
	...props
}: ThemeImageProps) {
	return (
		<img
			src={src}
			alt={alt}
			width={width}
			height={height}
			className={className}
			{...props}
		/>
	);
}

export default ThemeImage;
