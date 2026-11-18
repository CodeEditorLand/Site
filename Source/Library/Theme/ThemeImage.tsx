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
 * Every surface is light (creme canvas, white cards) - use the LIGHT
 * image variant (dark glyph).
 *
 * Convention:
 *   Light: /Image/Foo.svg or /Asset/Foo.svg
 *   (/Dark/Image/ and /Asset/Dark/ are obsolete - 2026-10-14)
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
